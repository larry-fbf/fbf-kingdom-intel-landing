import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createHash } from 'node:crypto';

const page = readFileSync('app/dashboard/page.tsx', 'utf8');
test('Day 3 uses the exact supplied replay in its existing slot without other dashboard changes', () => {
  const before = '    day: "Day 3",\r\n    title: "Replay Coming Soon",';
  const after = '    day: "Day 3",\r\n    title: "Watch the Replay",\r\n    videoUrl: "https://player.vimeo.com/video/1246403206",';
  assert.equal(page.split(after).length, 2);
  assert.equal(page.split('1246403206').length, 2);
  assert.doesNotMatch(page, /autoplay/);
  const original = readFileSync(new URL('./fixtures/dashboard-day3-base.sha256', import.meta.url), 'utf8').trim();
  assert.equal(createHash('sha256').update(page.replace(after, before)).digest('hex'), original);
});
