import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync('app/dashboard/RegistrationWelcome.tsx', 'utf8');
const cleanup = source.split('    return () => {\n      dialog.close();')[1]?.split('    };')[0];
assert.ok(cleanup, 'exercise the real welcome cleanup');
for (const hash of ['', '#other', '#bonus-heading']) {
  test(`welcome cleanup preserves scroll except explicit bonus handoff ${hash || '(direct)'}`, () => {
    const calls: string[] = [];
    const body = { style: { position: 'fixed', top: '-123px', width: '100%' } };
    const root = { style: { overflow: 'hidden' } };
    runInNewContext(cleanup, {
      body, root, saved: { position: '', top: '', width: '', overflow: '' }, y: 123,
      previousFocus: null, openerRef: { current: { focus: () => calls.push('focus') } },
      window: { location: { hash }, scrollTo: ({ top }: {top:number}) => { assert.equal(top,123); calls.push('restore'); } },
      document: { getElementById: (id: string) => {
        assert.equal(id, 'bonus-heading'); assert.equal(body.style.position, ''); assert.equal(root.style.overflow, '');
        return { scrollIntoView: ({ behavior }: {behavior:string}) => { assert.equal(behavior,'instant'); calls.push('bonus'); } };
      } },
    });
    assert.deepEqual(calls, hash === '#bonus-heading' ? ['restore','focus','bonus'] : ['restore','focus']);
  });
}
