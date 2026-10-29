import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const source = readFileSync(new URL('../app/api/workbook/route.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const payload = {firstName:' Test ',lastName:' Person ',email:' TEST@example.invalid ',phone:'3122346789',company:'Test',whichOfTheFollowingBestDescribesYou:'CEO',oneThing:'Test',outcomeImpact:'Test',otherDecisionMakers:'None',wantResults:'ASAP',helpAreas:['Operations'],attendedWorkshop:'Yes',monthlyIncomeRange:'Under $5,000/month'};
function harness(configured = true, failAt = '', ambiguous: boolean | 'claim' | 'receipt' | 'receipt-read' | 'slack' = false) {
 const events = new Set(['earlier-event']);
 const calls: string[] = [];
 const requests: {url:string, method:string|undefined, body:any}[] = [];
 const ledger = new Map<string, {id:{entry_id:string},entry_values:Record<string, {value:string}[]>}>();
 let notes=0, slack=0;
 const fetch = async(url: string, init: RequestInit) => {
  calls.push(url);const body=init.body?JSON.parse(String(init.body)):null;
  requests.push({url,method:init.method,body});
  if(failAt && url.includes(failAt))return Response.json({}, {status:503});
  if(url.includes('matching_attribute=email_addresses')) {assert.equal(body.data.values.events_registered,undefined);return Response.json({data:{id:{record_id:'person'}}});}
  if(url.endsWith('/objects/people/records/person')) {assert.equal(init.method,'PATCH');for(const id of body.data.values.events_registered)events.add(id);return Response.json({data:{}});}
  if(url.includes('/lists/kim_workbook_delivery_ledger/entries')) {
   if(url.endsWith('/query'))return Response.json({data:[...ledger.values()].filter(e=>e.entry_values.delivery_key[0].value===body.filter.delivery_key)});
   if(init.method==='POST'){const key=body.data.entry_values.delivery_key; if(ledger.has(key))return Response.json({code:'unique_value_conflict'},{status:400});const entry={id:{entry_id:key},entry_values:{delivery_key:[{value:key}],delivery_state:[{value:'pending'}]}};ledger.set(key,entry);if(ambiguous==='claim')throw Error('Claim response lost');return Response.json({data:entry});}
   const entry=ledger.get(decodeURIComponent(url.split('/').pop()!));assert.ok(entry);
   if(init.method==='PATCH'){if(ambiguous==='receipt')throw Error('Receipt write failed');entry.entry_values.delivery_state=[{value:body.data.entry_values.delivery_state}];}
   if(init.method==='GET' && ambiguous==='receipt-read')throw Error('Receipt read unavailable');
   return Response.json({data:entry});
  }
  if(url==='https://slack.invalid/test'){slack++;if(ambiguous==='slack')throw Error('Slack response lost');return Response.json({ok:true});}
  if(url.includes('/lists/')) return Response.json({data:{}});
  if(url.endsWith('/notes')) {assert.match(body.data.content,/Workbook delivery reference: [a-f0-9]{64}:note/);notes++;if(ambiguous===true)throw Error('Response lost after save');return Response.json({data:{id:{note_id:'note'}}});}
  throw Error('Unexpected network call');
 };
 const loadRoute = () => {
 const module={exports:{} as {POST:(req:unknown)=>Promise<Response>}};
 vm.runInNewContext(code,{module,exports:module.exports,require:(id:string)=>id==='next/server'?{NextResponse:{json:Response.json}}:require(id),process:{env:{ATTIO_API_KEY:configured?'synthetic':'',SLACK_WORKBOOK_WEBHOOK_URL:'https://slack.invalid/test'}},fetch,console:{error:()=>{}},AbortSignal});
 return module.exports;
 };
 // Every request runs in a new module context, sharing only the mocked external provider.
 return {events,calls,requests,ledger,counts:()=>({notes,slack}),post:(body=payload)=>loadRoute().POST({json:async()=>body})};
}
test('identical sequential and concurrent retries do not duplicate side effects',async()=>{
 const h=harness();await Promise.all([h.post(),h.post()]);assert.equal((await h.post()).status,200);assert.deepEqual(h.counts(),{notes:1,slack:1});
 assert.equal((await h.post({...payload,oneThing:'Updated answer'})).status,200);assert.deepEqual(h.counts(),{notes:2,slack:2});
});
test('ambiguous note delivery stays pending and is not replayed',async()=>{
 const h=harness(true,'',true);assert.equal((await h.post()).status,503);assert.equal((await h.post()).status,503);assert.deepEqual(h.counts(),{notes:1,slack:0});
});
test('ledger failure prevents notes and notifications',async()=>{const h=harness(true,'kim_workbook_delivery_ledger');assert.equal((await h.post()).status,503);assert.deepEqual(h.counts(),{notes:0,slack:0});});
test('notification failure does not misreport CRM failure or retry notification',async()=>{const h=harness(true,'slack.invalid');for(let i=0;i<2;i++){const r=await h.post();assert.equal(r.status,200);assert.ok((await r.json()).results.slack.error);}assert.equal(h.calls.filter(u=>u==='https://slack.invalid/test').length,1);});
test('distinct answer arrays cannot collide through display formatting',async()=>{const h=harness();await h.post({...payload,helpAreas:['A, B']});await h.post({...payload,helpAreas:['A','B']});assert.equal(h.counts().notes,2);});
test('claim and receipt failures remain safe across cold starts',async()=>{for(const fault of ['claim','receipt','receipt-read'] as const){const h=harness(true,'',fault);assert.equal((await h.post()).status,503);const again=await h.post();assert.equal(again.status,fault==='receipt-read'?200:503);assert.equal(h.counts().notes,fault==='claim'?0:1);}});
test('accepted Slack response loss is never blindly replayed',async()=>{const h=harness(true,'','slack');await h.post();await h.post();assert.deepEqual(h.counts(),{notes:1,slack:1});});
test('transient attribution and reordered fields do not bypass retry identity',async()=>{const h=harness();await h.post({...payload,helpAreas:['A','B']});await h.post({...payload,email:'test@example.invalid',phone:'+1 (312) 234-6789',helpAreas:['B','A'],attribution:{capturedAt:'changed'}} as typeof payload);assert.deepEqual(h.counts(),{notes:1,slack:1});});
test('Attio failures are not success',async()=>{
 for(const h of [harness(false),harness(true,'matching_attribute'),harness(true,'/records/person'),harness(true,'/notes')]) {const r=await h.post();assert.equal(r.status,503);assert.equal((await r.json()).ok,false);}
});
test('workbook additively appends the existing November option',async()=>{
 const h=harness();assert.equal((await h.post()).status,200);
 assert.deepEqual([...h.events],['earlier-event','e4039e80-b639-4481-b24d-c00aa5b6390d']);
});

test('removed connection question is absent from UI and submitted form state',()=>{
 const page=readFileSync(new URL('../app/workbook/page.tsx',import.meta.url),'utf8');
 assert.doesNotMatch(page,/sessionConnectionPreference|How would you like for us to connect with you for this session|Phone or Zoom/);
});

test('omitted connection succeeds without obsolete downstream summary rows',async()=>{
 const h=harness();const response=await h.post();
 assert.equal(response.status,200);assert.equal((await response.json()).ok,true);
 const note=h.requests.find(r=>r.url.endsWith('/notes'))!.body.data.content;
 assert.doesNotMatch(note,/Preferred session connection|sessionConnectionPreference/);
 const slack=h.requests.find(r=>r.url==='https://slack.invalid/test')!.body;
 assert.doesNotMatch(JSON.stringify(slack),/Preferred session connection|sessionConnectionPreference/);
 assert.deepEqual(h.counts(),{notes:1,slack:1});
});

test('legacy empty connection and omission retain the pinned historical delivery key',async()=>{
 const h=harness();await h.post({...payload,sessionConnectionPreference:''} as typeof payload);await h.post();
 assert.deepEqual([...h.ledger.keys()].sort(),[
  '7c496ac27419e156f6d28563808d77ded5ffa15cb8373e3ca5074f8b8a1d80c1:note',
  '7c496ac27419e156f6d28563808d77ded5ffa15cb8373e3ca5074f8b8a1d80c1:slack',
 ]);
 assert.deepEqual(h.counts(),{notes:1,slack:1});
});
test('legacy nonempty connection remains accepted and retry-stable without a summary row',async()=>{
 const h=harness();const legacy={...payload,sessionConnectionPreference:'Zoom'} as typeof payload;
 assert.equal((await h.post(legacy)).status,200);assert.equal((await h.post(legacy)).status,200);
 assert.deepEqual(h.counts(),{notes:1,slack:1});
 assert.doesNotMatch(h.requests.find(r=>r.url.endsWith('/notes'))!.body.data.content,/Preferred session connection/);
});

const householdRanges = ['Under $5,000/month', '$5K - $10K/month', '$10K - $15K/month', '$15K - $25K/month', '$25K - $50K/month', '$50K or more per month'];
test('UI uses exact household question, helper and required label-as-value options',()=>{
 const page=readFileSync(new URL('../app/workbook/page.tsx',import.meta.url),'utf8');
 assert.deepEqual(JSON.parse(page.match(/const incomeRanges = (\[[^;]+\]);/)![1]),householdRanges);
 assert.ok(page.includes('<legend>Which range best represents your current monthly household income before taxes? *</legend>'));
 assert.ok(page.includes('(Include income from all household earners, not total business revenue.)'));
 assert.match(page,/<fieldset className=\{styles.checkboxFieldset\} aria-describedby="household-income-help">/);
 assert.match(page,/<input required type="radio" name="monthlyIncomeRange" value=\{option\} checked=\{form.monthlyIncomeRange === option\}/);
 assert.ok(page.includes('income_range: form.monthlyIncomeRange'));
 assert.ok(page.includes('body: JSON.stringify({ ...form, attribution: getStoredAttribution() })'));
});
test('missing, obsolete and unknown income answers fail before any provider call',async()=>{
 for(const monthlyIncomeRange of ['', ' ', 'Under $10K/month', '$10K–$50K/month', '$50K–$100K/month', '$100K–$500K/month', '$500K-$1 Mill/month', '$1 Mill +/month', 'unknown']) {
  const h=harness();const response=await h.post({...payload,monthlyIncomeRange});
  assert.equal(response.status,400);assert.deepEqual((await response.json()).fields,['monthlyIncomeRange']);
  assert.deepEqual(h.calls,[]);
 }
});
for (const monthlyIncomeRange of householdRanges) {
 test(`household income preserves exact downstream answer: ${monthlyIncomeRange}`, async()=>{
  const h=harness();const response=await h.post({...payload,monthlyIncomeRange});
  assert.equal(response.status,200);assert.equal((await response.json()).ok,true);
  const note=h.requests.find(r=>r.url.endsWith('/notes'))!.body.data;
  assert.equal(note.format,'plaintext');
  assert.ok(note.content.includes(`**Monthly household income range before taxes:** ${monthlyIncomeRange}\n`));
  const slack=h.requests.find(r=>r.url==='https://slack.invalid/test')!.body;
  assert.ok(slack.text.includes(`Monthly household income before taxes: ${monthlyIncomeRange}\n`));
  assert.ok(slack.blocks.flatMap((b:any)=>b.fields||[]).some((f:any)=>f.text===`*Monthly household income before taxes:*\n${monthlyIncomeRange}`));
  assert.deepEqual(h.counts(),{notes:1,slack:1});
  const person=h.requests.find(r=>r.url.includes('matching_attribute'))!.body.data.values;
  assert.deepEqual(Object.keys(person).sort(),['email_addresses','name','phone_numbers']);
  const entry=h.requests.find(r=>r.url.includes('/lists/')&&!r.url.includes('delivery_ledger'))!;
  assert.deepEqual(entry.body.data.entry_values,{});
  assert.deepEqual([...h.events],['earlier-event','e4039e80-b639-4481-b24d-c00aa5b6390d']);
 });
}
