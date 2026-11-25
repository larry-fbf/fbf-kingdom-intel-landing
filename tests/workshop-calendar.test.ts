import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
test('thank-you preview supplies an honest calendar handoff without an invented duration',()=>{
 assert.ok(existsSync('app/lib/workshop-calendar.ts'), 'workshop-owned calendar must exist');
 const source=readFileSync('app/lib/workshop-calendar.ts','utf8');
 assert.match(source,/20261209T180000Z/);
 assert.doesNotMatch(source,/DTEND|DURATION|zoom\.us/);
 assert.ok(existsSync('app/workshop/thank-you/preview/page.tsx'));
 const landing=readFileSync('app/workshop/WorkshopLanding.tsx','utf8');
 assert.doesNotMatch(landing,/Registration details<\/a>/);
 assert.match(landing,/Register for the workshop/);
});
