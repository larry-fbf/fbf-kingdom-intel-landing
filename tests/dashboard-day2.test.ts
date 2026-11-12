import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createHash } from 'node:crypto';

import { beforeDay3 } from './day3-preservation.ts';
const page = beforeDay3(readFileSync('app/dashboard/page.tsx', 'utf8'));
test('Day 2 uses the exact supplied replay in its existing slot without other dashboard changes', () => {
  const before = '    day: "Day 2",\r\n    title: "Replay Coming Soon",';
  const after = '    day: "Day 2",\r\n    title: "Watch the Replay",\r\n    videoUrl: "https://player.vimeo.com/video/1245979460",';
  assert.equal(page.split(after).length, 2);
  assert.equal(page.split('1245979460').length, 2);
  assert.doesNotMatch(page, /autoplay/);
  const original = readFileSync(new URL('./fixtures/dashboard-day2-base.sha256', import.meta.url), 'utf8').trim();
  assert.equal(createHash('sha256').update(page.replace(after, before)).digest('hex'), original);
});
