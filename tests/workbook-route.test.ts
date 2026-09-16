import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const source = readFileSync(new URL('../app/api/workbook/route.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const payload = {firstName:' Test ',lastName:' Person ',email:' TEST@example.invalid ',phone:'3122346789',company:'Test',whichOfTheFollowingBestDescribesYou:'CEO',oneThing:'Test',outcomeImpact:'Test',otherDecisionMakers:'None',wantResults:'ASAP',helpAreas:['Operations'],attendedWorkshop:'Yes',monthlyIncomeRange:'Under $10K/month'};
function harness(configured = true, failAt = '', ambiguous: boolean | 'claim' | 'receipt' | 'receipt-read' | 'slack' = false) {
 const events = new Set(['earlier-event']);
 const calls: string[] = [];
 const ledger = new Map<string, {id:{entry_id:string},entry_values:Record<string, {value:string}[]>}>();
 let notes=0, slack=0;
 const fetch = async(url: string, init: RequestInit) => {
  calls.push(url);const body=init.body?JSON.parse(String(init.body)):null;
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
 return {events,calls,ledger,counts:()=>({notes,slack}),post:(body=payload)=>loadRoute().POST({json:async()=>body})};
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
test('workbook additively appends the existing September option',async()=>{
 const h=harness();assert.equal((await h.post()).status,200);
 assert.deepEqual([...h.events],['earlier-event','ede3e1e7-e233-4e5b-9b61-fcf315c31e1d']);
});
