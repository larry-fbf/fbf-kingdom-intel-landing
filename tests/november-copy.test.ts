import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p: string) => readFileSync(p, 'utf8');
test('November masterclass copy is consistent across the public journey without relabeling September replays', () => {
  const pages = ['app/page.tsx', 'app/layout.tsx', 'app/thank-you/page.tsx', 'app/dashboard/ShareMasterclassButton.tsx'];
  for (const p of pages) {
    const text = read(p);
    assert.match(text, /November 3(?:-|&ndash;|\\u2013)5/, p);
    assert.doesNotMatch(text, /September 15|Sept 15/, p);
  }
  const home = read('app/page.tsx');
  assert.match(home, /Nov 3-5/);
  assert.match(home, /12:00 PM CST/);
  for (const p of ['app/vip/page.tsx', 'app/vip/VIPUpsellPage.tsx']) {
    assert.match(read(p), /November 4th and 5th/, p);
    assert.doesNotMatch(read(p), /September 16th/, p);
  }
  const dashboard = read('app/dashboard/page.tsx');
  assert.match(dashboard, /November 3-5 \| 12 PM Central/);
  assert.match(dashboard, /November 3 to 5 \| 12 PM Central/);
  assert.match(dashboard, /November 4-5 \| 7 PM Central/);
  assert.match(dashboard, /September 2026 Session Replays/);
  assert.match(dashboard, /These recordings are from September 15–17, 2026, not the upcoming November sessions\./);
  for (const id of ['1227087561', '1227491620', '1227853840']) assert.ok(dashboard.includes(id));
});
