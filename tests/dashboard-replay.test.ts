import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../app/dashboard/page.tsx', import.meta.url), 'utf8');

test('Day 1 offers the approved Vimeo replay while later days remain coming soon', () => {
  assert.match(source, /day: "Day 1",\s+title: "Watch the Replay",\s+videoUrl: "https:\/\/player\.vimeo\.com\/video\/1227087561"/);
  for (const day of [2, 3]) assert.match(source, new RegExp(`day: "Day ${day}",\\s+title: "Replay Coming Soon",\\s+}`));
  assert.match(source, /replay\.videoUrl && \(\s*<iframe[\s\S]*?src=\{replay\.videoUrl\}[\s\S]*?title=\{`\$\{replay\.day\} replay`\}[\s\S]*?allowFullScreen/);
  assert.match(source, /<h2 className="section-title">Session Replays<\/h2>/);
});
