import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const source = readFileSync(new URL('../app/dashboard/page.tsx', import.meta.url), 'utf8');
test('authorized November dashboard takes down public replay embeds only', () => {
  assert.equal(source.includes('<iframe'), false);
  assert.equal(source.includes('player.vimeo.com'), false);
  assert.ok(source.includes('Upcoming masterclass'));
});
