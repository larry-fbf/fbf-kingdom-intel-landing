import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../app/dashboard/page.tsx', import.meta.url), 'utf8');

test('Days 1, 2 and 3 offer their approved Vimeo replays', () => {
  assert.match(source, /day: "Day 1",\s+title: "Watch the Replay",\s+videoUrl: "https:\/\/player\.vimeo\.com\/video\/1227087561"/);
  assert.match(source, /day: "Day 2",\s+title: "Watch the Replay",\s+videoUrl: "https:\/\/player\.vimeo\.com\/video\/1227491620"/);
  assert.match(source, /day: "Day 3",\s+title: "Watch the Replay",\s+videoUrl: "https:\/\/player\.vimeo\.com\/video\/1227853840"/);
  assert.match(source, /replay\.videoUrl && \(\s*<iframe[\s\S]*?src=\{replay\.videoUrl\}[\s\S]*?title=\{`\$\{replay\.day\} replay`\}[\s\S]*?allowFullScreen/);
  assert.match(source, /<h2 className="section-title">Session Replays<\/h2>/);
});
