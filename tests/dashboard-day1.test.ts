import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync('app/dashboard/page.tsx', 'utf8');
test('Day 1 is the supplied responsive, non-autoplay Vimeo replay; Day 3 stays a placeholder', () => {
  assert.match(page, /day: "Day 1",\s+title: "Watch the Replay",\s+videoUrl: "https:\/\/player.vimeo.com\/video\/1245584339"/);
  for (const day of [3]) assert.match(page, new RegExp(`day: "Day ${day}",\\s+title: "Replay Coming Soon",\\s+}`));
  assert.equal(page.split('1245584339').length, 2);
  assert.match(page, /src=\{replay.videoUrl\}/);
  assert.match(page, /title=\{`\$\{replay.day\} — Kingdom Intelligence Masterclass Replay`\}/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /aspectRatio: "16 \/ 9"/);
  assert.match(page, /allowFullScreen/);
  assert.doesNotMatch(page, /autoplay/);
});
