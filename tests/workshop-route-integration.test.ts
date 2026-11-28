import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname,resolve} from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
const require=createRequire(import.meta.url);
class FixtureDate extends Date {constructor(value:string|number='2026-11-27T00:00:00Z'){super(value)} static now(){return Date.parse('2026-11-27T00:00:00Z')}}
for(const scenario of ['new','existing','pending','uncertain','unavailable','list-failure','wrong-time','wrong-host','email-disabled','wrong-url','missing-credentials','readback-mismatch'])test(`actual workshop route/provider synthetic: ${scenario}`,async()=>{
 const env:Record<string,string|undefined>={ATTIO_API_KEY:'fixture',BREVO_API_KEY:'fixture',REGISTRATION_CONFIRMATION_SECRET:'synthetic-local-only',ZOOM_ACCOUNT_ID:'fixture',ZOOM_CLIENT_ID:'fixture',ZOOM_CLIENT_SECRET:scenario==='missing-credentials'?undefined:'fixture',ZOOM_SIGNUP_TARGET:'JANUARY_MUST_NOT_BE_READ'};
 const calls:{url:string,method:string}[]=[];let registered=scenario==='existing'||scenario==='pending';
 const row={id:'rid',email:'test@example.invalid',first_name:'Test',last_name:'Only',status:'approved',join_url:'PRIVATE_JOIN_SENTINEL'};
 const fetch=async(url:string,init:RequestInit={})=>{
 const method=init.method||'GET';calls.push({url,method});
 if(url.includes('api.attio.com')){if(scenario==='list-failure')throw Error('provider');return Response.json({data:{id:{record_id:'person',entry_id:'entry'},parent_record_id:'person'}})}
 if(url.includes('api.brevo.com'))return Response.json({listIds:[34]});
 if(url==='https://zoom.us/oauth/token')return Response.json({access_token:'fixture',scope:'webinar:write:registrant:admin webinar:read:webinar:admin webinar:read:list_registrants:admin webinar:read:registrant:admin webinar:read:list_registration_questions:admin user:read:user:admin'});
 if(url.includes('/users/'))return Response.json({account_id:'fixture'});
 if(url.endsWith('/questions'))return Response.json({questions:[{field_name:'last_name',required:true}],custom_questions:[]});
 if(url.endsWith('/registrants')&&method==='POST'){if(scenario==='uncertain')throw Error('timeout');registered=true;return Response.json({registrant_id:'rid',join_url:row.join_url});}
 if(url.endsWith('/registrants/rid'))return Response.json({...row,email:scenario==='readback-mismatch'?'wrong@example.invalid':row.email});
 if(url.includes('/registrants?')){if(scenario==='unavailable')return Response.json({}, {status:429});const status=scenario==='pending'?'pending':'approved';const rows=registered&&url.includes(`status=${status}`)?[{...row,status}]:[];return Response.json({total_records:rows.length,registrants:rows,next_page_token:''});}
 if(url==='https://api.zoom.us/v2/webinars/81398970006')return Response.json({id:81398970006,topic:'Kingdom Intelligence Workshop',type:5,host_id:scenario==='wrong-host'?'wrong':'BvkkU0IDT7mg8KrjcCbIyQ',start_time:scenario==='wrong-time'?'2026-12-10T18:00:00Z':'2026-12-09T18:00:00Z',timezone:'America/Chicago',registration_url:scenario==='wrong-url'?'https://example.invalid':'https://us02web.zoom.us/webinar/register/WN_komAAW4PRZKv8rUSSej2Ug',settings:{approval_type:0,registrants_confirmation_email:scenario!=='email-disabled',meeting_authentication:false,close_registration:false}});
 throw Error('unexpected network blocked');
 };
 function load(file:string):any{const module={exports:{}};const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInNewContext(code,{module,exports:module.exports,require:(id:string)=>id.startsWith('.')?load(resolve(dirname(file),id.endsWith('.ts')?id:id+'.ts')):require(id),process:{env},Date:FixtureDate,Error,fetch,URL,Request,Response,Headers,URLSearchParams,AbortSignal,AbortController,Buffer,setTimeout,clearTimeout,console},{filename:file});return module.exports;}
 const route=load(resolve('app/api/workshop/register/route.ts'));
 const response=await route.POST(new Request('https://fixture.invalid/api/workshop/register',{method:'POST',body:JSON.stringify({email:row.email,firstName:'Test',lastName:'Only'})}));
 const result=await response.json();const success=['new','existing'].includes(scenario);
 assert.equal(response.status,success?200:503);assert.equal(result.ok,success);
 assert.equal(!!response.headers.get('set-cookie'),success);
 if(success)assert.ok(response.headers.get('set-cookie')?.includes('workshop_dec_2026_zoom='));
 else assert.equal(result.retryable,['unavailable','list-failure','missing-credentials'].includes(scenario));
 assert.equal(calls.filter(c=>c.method==='POST'&&c.url.endsWith('/registrants')).length,['new','uncertain','list-failure','readback-mismatch'].includes(scenario)?1:0);
 if(scenario==='missing-credentials')assert.equal(calls.length,0);
 assert.ok(calls.every(c=>!c.url.includes('87364502476')&&!c.url.includes('simpletexting')&&!c.url.includes('/smtp/')));
 assert.equal(JSON.stringify(result).includes('PRIVATE_JOIN_SENTINEL'),false);
});
