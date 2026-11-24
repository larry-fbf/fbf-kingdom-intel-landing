import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';

test('invalid and missing device zones safely fall back to Central', async () => {
 const m = await import('../app/lib/event-time.ts');
 assert.equal(m.formatEventTime('regular', 'invalid/zone').time, '12:00 PM CST');
 assert.equal(m.formatEventTime('regular', undefined).timeZone, 'America/Chicago');
 assert.equal(typeof m.resolveDeviceZone, 'function');
 assert.equal(m.resolveDeviceZone(() => undefined), 'America/Chicago');
 assert.equal(m.resolveDeviceZone(() => { throw Error('unavailable'); }), 'America/Chicago');
 assert.equal(m.resolveDeviceZone(() => 'bad'), 'America/Chicago');
});
test('regular ranges distinguish an end after local midnight without inventing a VIP duration', async () => {
 const m=await import('../app/lib/event-time.ts');
 assert.equal(m.formatEventTime('regular','Asia/Kolkata').range,'11:30 PM–12:30 AM GMT+5:30 (next day)');
 assert.equal(m.formatEventTime('vip','Asia/Kolkata').range,'6:30 AM GMT+5:30');
});
test('January uses event-date DST and every UTC start remains fixed', async () => {
 const m = await import('../app/lib/event-time.ts');
 for (const [zone,time,dates,vipTime,vipDates] of [
 ['America/Chicago','12:00 PM CST','January 5–7, 2027','7:00 PM CST','January 6–7, 2027'],
 ['America/New_York','1:00 PM EST','January 5–7, 2027','8:00 PM EST','January 6–7, 2027'],
 ['America/Los_Angeles','10:00 AM PST','January 5–7, 2027','5:00 PM PST','January 6–7, 2027'],
 ['Europe/London','6:00 PM GMT','January 5–7, 2027','1:00 AM GMT','January 7–8, 2027'],
 ['Asia/Tokyo','3:00 AM GMT+9','January 6–8, 2027','10:00 AM GMT+9','January 7–8, 2027'],
 ['Australia/Sydney','5:00 AM GMT+11','January 6–8, 2027','12:00 PM GMT+11','January 7–8, 2027'],
 ]) {
  assert.equal(m.formatEventTime('regular',zone).time,time);
  assert.equal(m.formatEventTime('regular',zone).dates,dates);
  assert.equal(m.formatEventTime('vip',zone).time,vipTime);
  assert.equal(m.formatEventTime('vip',zone).dates,vipDates);
 }
 assert.deepEqual(m.EVENT_STARTS.regular,['2027-01-05T18:00:00Z','2027-01-06T18:00:00Z','2027-01-07T18:00:00Z']);
 assert.deepEqual(m.EVENT_STARTS.vip,['2027-01-07T01:00:00Z','2027-01-08T01:00:00Z']);
});
test('client display uses deterministic SSR state, effect-only device resolution and accessible series', () => {
 assert.ok(existsSync('app/components/EventTime.tsx'), 'client display exists');
 const source=readFileSync('app/components/EventTime.tsx','utf8');
 assert.match(source,/useState\(CENTRAL_ZONE\)/);
 assert.match(source,/useEffect/); assert.match(source,/aria-label/);
 assert.doesNotMatch(source,/geolocation|suppressHydrationWarning/);
});
test('January instants display in the requested device zone, with overseas date rollover', async () => {
 assert.ok(existsSync('app/lib/event-time.ts'), 'local event formatter exists');
 const eventTime = await import('../app/lib/event-time.ts');
 const regular = eventTime.formatEventTime('regular', 'Asia/Tokyo');
 assert.equal(regular.dates, 'January 6–8, 2027');
 assert.equal(regular.time, '3:00 AM GMT+9');
 assert.equal(eventTime.formatEventTime('vip', 'Europe/London').dates, 'January 7–8, 2027');
});
