import assert from 'node:assert/strict';
import test from 'node:test';
import { registerZoomSignup } from '../app/lib/zoom-signup.ts';
export const target = { webinarId: '87621606558', topic: 'Fixture', timezone: 'America/Chicago', occurrenceId: 'last', startTime: '2099-09-17T17:00:00Z' };
export const contact = { email: 'alex@example.invalid', firstName: 'Alex', lastName: 'Rivera', agreed: true };
export const row = { id: 'rid', email: contact.email, first_name: 'Alex', last_name: 'Rivera', status: 'approved' };
export function fixture() {
  const calls: string[] = [];
  const metadata = { accountMatches: true, webinar: { id: target.webinarId, topic: target.topic, timezone: target.timezone, type: 9, occurrences: [{ occurrence_id: target.occurrenceId, start_time: target.startTime, status: 'available' }], settings: { registration_type: 1, approval_type: 0, registrants_confirmation_email: true, meeting_authentication: false, close_registration: false } }, questions: { questions: [{ field_name: 'last_name', required: true }], custom_questions: [] as any[] } };
  const provider = {
    metadata: async () => { calls.push('metadata'); return metadata; },
    page: async (status: string, cursor: string) => { calls.push(status + cursor); return { total_records: 0, next_page_token: '', registrants: [] as any[] }; },
    post: async () => { calls.push('POST'); return { registrantId: 'rid' }; },
    get: async () => { calls.push('GET'); return row; },
  };
  return { calls, metadata, provider };
}
test('direct signup checks all statuses then one POST and identity readback without a store', async () => {
  const m = await import('../app/lib/zoom-signup.ts').catch(() => ({} as any));
  assert.equal(typeof m.registerZoomSignup, 'function');
  const f = fixture();
  assert.deepEqual(await m.registerZoomSignup(contact, target, f.provider), { status: 'registered' });
  assert.deepEqual(f.calls, ['metadata', 'approved', 'pending', 'denied', 'POST', 'GET']);
});

test('abort bounds an uncooperative provider and prevents a delayed POST', async () => {
  const f = fixture(); const controller = new AbortController();
  let finish!: (value: any) => void;
  f.provider.metadata = () => new Promise(resolve => { finish = resolve; });
  const pending = registerZoomSignup(contact, target, f.provider, controller.signal);
  controller.abort();
  const result = await Promise.race([pending, new Promise(resolve => setTimeout(() => resolve('hung'), 30))]);
  assert.deepEqual(result, { status: 'unavailable' });
  finish(f.metadata); await new Promise(resolve => setTimeout(resolve, 5));
  assert.equal(f.calls.includes('POST'), false);
});

for (const status of ['approved', 'pending', 'denied']) {
  test(`existing ${status} is never re-registered and every status is read`, async () => {
    const f = fixture();
    f.provider.page = async (s, token) => { f.calls.push(s); return { total_records: s === status ? 1 : 0, next_page_token: '', registrants: s === status ? [{ ...row, status }] : [] }; };
    assert.equal((await registerZoomSignup(contact, target, f.provider)).status, status === 'approved' ? 'registered' : 'held');
    assert.deepEqual(f.calls, ['metadata', 'approved', 'pending', 'denied']);
  });
}
for (const agreed of [false, 'true', 1, undefined]) {
  test(`nonliteral consent ${agreed} never reaches Zoom`, async () => {
    const f = fixture();
    assert.equal((await registerZoomSignup({ ...contact, agreed }, target, f.provider)).status, 'not_consented');
    assert.equal(f.calls.length, 0);
  });
}
for (const mutation of ['account', 'topic', 'type', 'timezone', 'registration_type', 'approval_type', 'registrants_confirmation_email', 'meeting_authentication', 'close_registration', 'custom', 'required', 'occurrence', 'expired']) {
  test(`changed target/settings ${mutation} fails closed`, async () => {
    const f = fixture(); const w: any = f.metadata.webinar;
    if (mutation === 'account') f.metadata.accountMatches = false;
    else if (mutation === 'custom') f.metadata.questions.custom_questions.push({});
    else if (mutation === 'required') f.metadata.questions.questions.push({ field_name: 'phone', required: true });
    else if (mutation === 'occurrence') w.occurrences[0].occurrence_id = 'other';
    else if (mutation === 'expired') w.occurrences[0].start_time = '2000-01-01T17:00:00Z';
    else if (mutation in w.settings) w.settings[mutation] = 'changed';
    else w[mutation] = 'changed';
    assert.equal((await registerZoomSignup(contact, target, f.provider)).status, 'held');
    assert.equal(f.calls.includes('POST'), false);
  });
}
test('realistic 789-person inventory across five pages is fully checked', async () => {
  const f = fixture(); let pages = 0;
  f.provider.page = async (status, cursor) => {
    pages++;
    const start = Number(cursor || 0); const size = status === 'approved' ? Math.min(300, 789 - start) : 0;
    return { total_records: status === 'approved' ? 789 : 0, next_page_token: status === 'approved' && start + size < 789 ? String(start + size) : '', registrants: Array.from({ length: size }, (_, i) => ({ ...row, id: String(start + i), email: `person${start + i}@example.invalid` })) };
  };
  assert.equal((await registerZoomSignup(contact, target, f.provider)).status, 'registered');
  assert.equal(pages, 5); assert.equal(f.calls.filter(x => x === 'POST').length, 1);
});
for (const failure of ['later-page', 'drift', 'incomplete', 'cycle', 'duplicate-id', 'missing-email', 'wrong-status', 'conflicting-email', 'budget']) {
  test(`pagination ${failure} never permits a mutation`, async () => {
    const f = fixture(); let page = 0;
    f.provider.page = async (status, cursor) => {
      page++;
      if (failure === 'later-page' && cursor) throw Error('private');
      if (failure === 'conflicting-email') return { total_records: status === 'denied' ? 0 : 1, registrants: status === 'denied' ? [] : [{ ...row, id: status, status }], next_page_token: '' };
      if (failure === 'duplicate-id') return { total_records: 2, registrants: [row, row], next_page_token: '' };
      if (failure === 'missing-email') return { total_records: 1, registrants: [{ ...row, email: '' }], next_page_token: '' };
      if (failure === 'wrong-status') return { total_records: 1, registrants: [{ ...row, status: 'denied' }], next_page_token: '' };
      if (failure === 'incomplete') return { total_records: 2, registrants: [row], next_page_token: '' };
      return { total_records: failure === 'drift' ? page : 100, registrants: [{ ...row, id: String(page), email: `p${page}@example.invalid` }], next_page_token: failure === 'cycle' ? 'same' : String(page) };
    };
    assert.ok(['held', 'unavailable'].includes((await registerZoomSignup(contact, target, f.provider)).status));
    assert.equal(f.calls.includes('POST'), false); assert.ok(page <= 20);
  });
}
for (const failure of ['post', 'get', 'wrong-email', 'wrong-id', 'wrong-name', 'not-approved']) {
  test(`uncertain ${failure} yields pending without another mutation`, async () => {
    const f = fixture();
    if (failure === 'post') f.provider.post = async () => { f.calls.push('POST'); throw Error('private'); };
    else f.provider.get = async () => {
      if (failure === 'get') throw Error('private');
      return { ...row, ...(failure === 'wrong-email' ? { email: 'other@example.invalid' } : {}), ...(failure === 'wrong-id' ? { id: 'other' } : {}), ...(failure === 'wrong-name' ? { first_name: 'Other' } : {}), ...(failure === 'not-approved' ? { status: 'pending' } : {}) };
    };
    assert.deepEqual(await registerZoomSignup(contact, target, f.provider), { status: 'pending' });
    assert.equal(f.calls.filter(x => x === 'POST').length, 1);
  });
}
test('series expiry crossing during inventory prevents a late registration', async () => {
  const f = fixture(); const originalNow = Date.now;
  const before = Date.parse(target.startTime) - 1000;
  Date.now = () => before;
  f.provider.page = async () => { Date.now = () => before + 2000; return { total_records: 0, registrants: [], next_page_token: '' }; };
  try {
    assert.equal((await registerZoomSignup(contact, target, f.provider)).status, 'held');
    assert.equal(f.calls.includes('POST'), false);
  } finally { Date.now = originalNow; }
});

test('POST timeout is pending and late success never triggers a retry or readback', async () => {
  const f = fixture(); const controller = new AbortController();
  f.provider.post = async () => { f.calls.push('POST'); controller.abort(); return { registrantId: 'rid' }; };
  assert.deepEqual(await registerZoomSignup(contact, target, f.provider, controller.signal), { status: 'pending' });
  assert.equal(f.calls.filter(x => x === 'POST').length, 1); assert.equal(f.calls.includes('GET'), false);
});
