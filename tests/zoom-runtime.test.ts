import assert from 'node:assert/strict';
import test from 'node:test';
import { registerWebsiteZoom } from '../app/lib/zoom-runtime.ts';
const contact = { email: 'alex@example.invalid', firstName: 'Alex', lastName: 'Rivera', agreed: true };
test('runtime needs explicit server-only credentials and target, never a default event', async () => {
  const original = globalThis.fetch; let calls = 0;
  globalThis.fetch = async () => { calls++; throw Error('unexpected network'); };
  try {
    for (const env of [{}, { ZOOM_SIGNUP_TARGET: 'not-json' }, { ZOOM_ACCOUNT_ID: 'fixture', ZOOM_CLIENT_ID: 'fixture', ZOOM_CLIENT_SECRET: 'fixture', ZOOM_SIGNUP_TARGET: '{}' }]) {
      assert.deepEqual(await registerWebsiteZoom(contact, env), { status: 'unavailable' });
    }
    assert.deepEqual(await registerWebsiteZoom({ ...contact, agreed: false }, {}), { status: 'not_consented' });
    assert.equal(calls, 0);
  } finally { globalThis.fetch = original; }
});

for (const target of [
 { occurrenceId: '1793901600000', startTime: '2026-11-05T18:00:00Z' },
 { occurrenceId: '1794506400000', startTime: '2026-11-05T18:00:00Z' },
 { occurrenceId: '1793901600000', startTime: '2026-11-12T18:00:00Z' },
]) {
 test(`runtime rejects stale or mismatched final occurrence ${JSON.stringify(target)}`, async () => {
  const original = globalThis.fetch; let calls = 0;
  globalThis.fetch = async () => { calls++; throw Error('blocked'); };
  try {
   const env = { ZOOM_ACCOUNT_ID: 'fixture', ZOOM_CLIENT_ID: 'fixture', ZOOM_CLIENT_SECRET: 'fixture', ZOOM_SIGNUP_TARGET: JSON.stringify({ webinarId: '81823603475', topic: 'Kingdom Intelligence Masterclass', timezone: 'America/Chicago', ...target }) };
   assert.deepEqual(await registerWebsiteZoom(contact, env), { status: 'unavailable' });
   assert.equal(calls, 0);
  } finally { globalThis.fetch = original; }
 });
}

test('runtime rejects a different campaign before any network request', async () => {
 const original=globalThis.fetch; let calls=0;
 globalThis.fetch=async()=>{calls++;throw Error('blocked');};
 try {
  const env={ZOOM_ACCOUNT_ID:'fixture',ZOOM_CLIENT_ID:'fixture',ZOOM_CLIENT_SECRET:'fixture',ZOOM_SIGNUP_TARGET:JSON.stringify({webinarId:'87621606558',topic:'Kingdom Intelligence Masterclass',timezone:'America/Chicago',occurrenceId:'old',startTime:'2099-01-01T17:00:00Z'})};
  assert.deepEqual(await registerWebsiteZoom(contact,env),{status:'unavailable'}); assert.equal(calls,0);
 } finally {globalThis.fetch=original;}
});
