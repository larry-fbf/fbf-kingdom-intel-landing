import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {workshopCalendarIcs,workshopGoogleCalendarUrl} from '../app/lib/workshop-calendar.ts';
test('every calendar uses public webinar registration and unique email join guidance',()=>{
 const url='https://us02web.zoom.us/webinar/register/WN_komAAW4PRZKv8rUSSej2Ug';
 const google=new URL(workshopGoogleCalendarUrl());
 assert.equal(google.searchParams.get('location'),url);
 assert.ok(google.searchParams.get('details')?.includes('Check your Zoom confirmation email for your unique join link.'));
 const ics=workshopCalendarIcs().replace(/\r\n[ \t]/g,'');
 assert.ok(ics.includes(`LOCATION:${url}`));assert.ok(ics.includes(`URL:${url}`));
 assert.ok(ics.includes('DTSTART:20261209T180000Z'));assert.doesNotMatch(ics,/DTEND|DURATION|zoom\.us\/j\//);
});
test('thank-you preview supplies an honest calendar handoff without an invented duration',()=>{
 assert.ok(existsSync('app/lib/workshop-calendar.ts'), 'workshop-owned calendar must exist');
 const source=readFileSync('app/lib/workshop-calendar.ts','utf8');
 assert.match(source,/20261209T180000Z/);
 assert.doesNotMatch(source,/DTEND|DURATION|zoom\.us\/j\//);
 assert.ok(existsSync('app/workshop/thank-you/preview/page.tsx'));
 const landing=readFileSync('app/workshop/WorkshopLanding.tsx','utf8');
 assert.doesNotMatch(landing,/Registration details<\/a>/);
 assert.match(landing,/Register for the workshop/);
});
