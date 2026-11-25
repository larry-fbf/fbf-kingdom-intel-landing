import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
function load(path:string):any {const module={exports:{} as any};const code=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInNewContext(code,{module,exports:module.exports,Intl,Date,require:(name:string)=>load('app/lib/'+name.replace('./','')+'.ts')});return module.exports;}
test('December workshop has its own confirmed start and explicitly pending fulfillment',()=>{
 assert.ok(existsSync('app/lib/workshop-event.ts'),'dedicated workshop config is required');
 const {WORKSHOP}=load('app/lib/workshop-event.ts');
 assert.equal(WORKSHOP.startsAt,'2026-12-09T18:00:00Z');
 assert.equal(WORKSHOP.timeZone,'America/Chicago');
 assert.equal(WORKSHOP.registrationStatus,'closed');
 for(const key of ['endsAt','price','replay','zoom','attioListId','brevoListId','smsListId'])assert.equal(WORKSHOP[key],null,key);
});
test('workshop time localizes dates without inventing an end time',()=>{
 const {formatWorkshopTime}=load('app/lib/workshop-event.ts');
 assert.match(formatWorkshopTime('America/Chicago').schedule,/December 9, 2026.*12:00 PM CST/);
 assert.match(formatWorkshopTime('Asia/Tokyo').schedule,/December 10, 2026.*3:00 AM/);
 assert.match(formatWorkshopTime('Europe/London').schedule,/December 9, 2026.*6:00 PM/);
 assert.equal(formatWorkshopTime('invalid').timeZone,'America/Chicago');
 assert.equal(formatWorkshopTime().timeZone,'America/Chicago');
});
