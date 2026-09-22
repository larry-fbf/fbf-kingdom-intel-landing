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

test('stale September environment target cannot reach Zoom', async () => {
 const original=globalThis.fetch;let calls=0;
 globalThis.fetch=async()=>{calls++;throw Error('unexpected network');};
 try {
  await registerWebsiteZoom(contact,{ZOOM_ACCOUNT_ID:'fixture',ZOOM_CLIENT_ID:'fixture',ZOOM_CLIENT_SECRET:'fixture',ZOOM_SIGNUP_TARGET:JSON.stringify({webinarId:'87621606558',topic:'Kingdom Intelligence Masterclass',timezone:'America/Chicago',occurrenceId:'1789664400000',startTime:'2026-09-17T17:00:00Z'})});
  assert.equal(calls,0);
 } finally {globalThis.fetch=original;}
});
