import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';

const expectedDescription = `Welcome to the 3-Day Kingdom Intelligence Masterclass

I am so excited to see you registered for our 3 day Kingdom Intel Masterclass!!

This 3-day event will happen LIVE by Zoom. Accepting this invite will add our free event to your Google calendar so you can make sure you don't miss anything!\u0020

If you haven't already recieved an email from zoom for the masterclass, here is the link: https://us02web.zoom.us/webinar/register/WN_PljsUSceQdWHip96F1O18g

Important details:

- You will be sent the Zoom link daily by email, and by texts if you opted into text messaging.

- If you miss any of the classes, you will have access to the replays during the week on your www.kingdomintel.com/dashboard.

- It is important to watch live if possible because we will be giving away over $10,000 in prizes and scholarships.

- For those who are serious about scaling to the next level, on day 2 & 3 of our challenge we will have a VIP room for Q & A.

FAQ:

Q: How do I connect with someone?
A: You should have received a text message, DM, and/or email from your "Advocate". Type the word advocate as a comment on any of the live videos and your advocate will send you a message for more help. Feel free to email us at anytime at support@fbfmastery.com

Q: I filled out the form for the workbook. Where can I find it?
A: Check your junk or spam mail. Or try again at kingdomintel.com/workbook

Q: How can I learn more about Fueled by Fire?
A: Go to www.fbfmastery.com`;

test('ICS has one valid, stable recurring event with CRLF, folded lines and escaped text', async () => {
  const calendar = await import(moduleUrl.href);
  assert.equal(typeof calendar.calendarIcs, 'function');
  const ics = calendar.calendarIcs();
  assert.equal(ics, calendar.calendarIcs());
  assert.ok(ics.endsWith('\r\n'));
  assert.doesNotMatch(ics.replaceAll('\r\n', ''), /[\r\n]/);
  for (const line of ics.split('\r\n')) assert.ok(Buffer.byteLength(line) <= 75);
  const unfolded = ics.replace(/\r\n[ \t]/g, '');
  assert.match(unfolded, /^BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:/);
  assert.ok(unfolded.endsWith('END:VCALENDAR\r\n'));
  const events = [...unfolded.matchAll(/BEGIN:VEVENT\r\n([\s\S]*?)END:VEVENT\r\n/g)];
  assert.equal(events.length, 1);
  const uids = new Set();
  events.forEach(([_, event], i) => {
    const fields = Object.fromEntries(event.trim().split('\r\n').map((line: string) => { const at=line.indexOf(':'); return [line.slice(0,at),line.slice(at+1)]; }));
    assert.equal(fields.DTSTART, `202611${10+i}T180000Z`);
    assert.equal(fields.DTEND, `202611${10+i}T190000Z`);
    assert.equal(fields.UID, 'kingdom-intelligence-20261110-series@kingdomintel.com');
    assert.equal(fields.RRULE, 'FREQ=DAILY;COUNT=3');
    assert.match(fields.DTSTAMP, /^\d{8}T\d{6}Z$/);
    assert.equal(fields.URL, calendar.dashboardUrl);
    assert.equal(fields.DESCRIPTION, calendar.escapeIcsText(calendar.description));
    const decodedDescription = fields.DESCRIPTION.replace(/\\([nN,;\\])/g, (_: string, escaped: string) => /[nN]/.test(escaped) ? '\n' : escaped);
    assert.equal(decodedDescription, expectedDescription);
    uids.add(fields.UID);
  });
  assert.equal(uids.size, 1);
  assert.doesNotMatch(unfolded, /^(ATTENDEE|ORGANIZER)[;:]/im);
  assert.equal(calendar.escapeIcsText('a,b;c\\d\ne'), 'a\\,b\\;c\\\\d\\ne');
  const folded = calendar.foldIcsLine('DESCRIPTION:' + 'é😀'.repeat(50));
  assert.equal(folded.replace(/\r\n /g,''), 'DESCRIPTION:' + 'é😀'.repeat(50));
  folded.split('\r\n').forEach((line: string) => assert.ok(Buffer.byteLength(line) <= 75));
});

test('dashboard mounts a native calendar disclosure with one action and exactly three provider choices', () => {
  const page = readFileSync(new URL('../app/dashboard/page.tsx', import.meta.url), 'utf8');
  assert.match(page, /<AddToCalendar \/>/);
  assert.doesNotMatch(page, /className="action-card whatsapp-card"/);
  const card = readFileSync(new URL('../app/dashboard/AddToCalendar.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(card, /<section/, 'nested card must avoid global mobile section padding');
  assert.doesNotMatch(card, /Save each|Save all|Download all|Import the|download=|sessions.map/i);
  assert.equal((card.match(/<a /g) || []).length, 3);
  for (const marker of ['<details', '<summary className="action-cta">Add to Calendar</summary>', '12–1 PM Central', '>Google Calendar</a>', '>Apple Calendar</a>', '>Outlook</a>', 'noopener noreferrer']) assert.ok(card.includes(marker), marker);
});

test('calendar endpoint delivers an inline handoff containing the generated calendar', async () => {
  const routeUrl = new URL('../app/dashboard/calendar.ics/route.ts', import.meta.url);
  assert.ok(existsSync(routeUrl), 'download route must exist');
  const { GET } = await import(routeUrl.href);
  const { calendarIcs } = await import(moduleUrl.href);
  const response = GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/calendar; charset=utf-8');
  assert.equal(response.headers.get('content-disposition'), 'inline; filename="kingdom-intelligence-november-2026.ics"');
  assert.equal(await response.text(), calendarIcs());
});

const moduleUrl = new URL('../app/dashboard/calendar.ts', import.meta.url);
test('Google URL carries the recurring series with Chicago timezone', async () => {
  assert.ok(existsSync(moduleUrl), 'calendar module must exist');
  const { googleCalendarUrl } = await import(moduleUrl.href);
  {
    const session = { start: '20261110T180000Z', end: '20261110T190000Z', title: 'Kingdom Intelligence Masterclass' };
    const url = new URL(googleCalendarUrl());
    assert.equal(url.origin + url.pathname, 'https://calendar.google.com/calendar/r/eventedit');
    assert.equal(url.searchParams.get('action'), 'TEMPLATE');
    assert.equal(url.searchParams.get('dates'), `${session.start}/${session.end}`);
    assert.equal(url.searchParams.get('stz'), 'America/Chicago');
    assert.equal(url.searchParams.get('etz'), 'America/Chicago');
    assert.equal(url.searchParams.get('text'), session.title);
    assert.equal(url.searchParams.get('details'), expectedDescription);
    assert.equal(url.searchParams.get('recur'), 'RRULE:FREQ=DAILY;COUNT=3');
    assert.equal(url.searchParams.get('ctz'), 'America/Chicago');

    assert.match(url.href, /%2F/);
  }
});
