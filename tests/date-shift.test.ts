import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { registerWebsiteZoom } from '../app/lib/zoom-runtime.ts';

test('November dates change without moving regular noon or last-two-evening VIP cadence', () => {
  for (const file of ['app/page.tsx','app/layout.tsx','app/dashboard/page.tsx','app/dashboard/ShareMasterclassButton.tsx','app/thank-you/page.tsx']) {
    const text=readFileSync(file,'utf8');
    assert.match(text,/November 10/ ,file);
    assert.doesNotMatch(text,/November [34](?:-|&ndash;|\\u2013|–| to |th)/,file);
  }
  for (const file of ['app/vip/page.tsx','app/vip/VIPUpsellPage.tsx','app/vip/thank-you/page.tsx']) {
    const text=readFileSync(file,'utf8');
    assert.match(text,/November 11/,file);
    assert.doesNotMatch(text,/November 4/,file);
  }
  assert.match(readFileSync('app/dashboard/page.tsx','utf8'),/November 11-12 \| 7 PM Central/);
});

test('old Zoom dates and incomplete new date bindings fail before provider calls', async () => {
  const original=globalThis.fetch; let calls=0;
  globalThis.fetch=async()=>{calls++;throw Error('network must not run');};
  const base={webinarId:'81823603475',topic:'Kingdom Intelligence Masterclass',timezone:'America/Chicago',occurrenceId:'1793901600000',startTime:'2026-11-05T18:00:00Z'};
  try {
    for(const target of [base,{...base,startTime:'2026-11-12T18:00:00Z'},{...base,startTime:'2026-11-12T18:00:00Z',occurrences:[{occurrenceId:'fixture',startTime:'2026-11-10T18:00:00Z'}]}]) {
      const env={ZOOM_ACCOUNT_ID:'fixture',ZOOM_CLIENT_ID:'fixture',ZOOM_CLIENT_SECRET:'fixture',ZOOM_SIGNUP_TARGET:JSON.stringify(target)};
      assert.deepEqual(await registerWebsiteZoom({email:'alex@example.invalid',firstName:'Alex',lastName:'Rivera',agreed:true},env),{status:'unavailable'});
    }
    assert.equal(calls,0);
  } finally {globalThis.fetch=original;}
});
