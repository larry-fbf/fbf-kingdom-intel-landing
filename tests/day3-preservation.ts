import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
export function beforeDay3(source: string) {
  const before = '    day: "Day 3",\r\n    title: "Replay Coming Soon",';
  const after = '    day: "Day 3",\r\n    title: "Watch the Replay",\r\n    videoUrl: "https://player.vimeo.com/video/1246403206",';
  assert.equal(source.split(after).length, 2);
  source = source.replace(after, before);
  assert.equal(createHash('sha256').update(source).digest('hex'), '62593d70813e975db9a0e2b6acf868580175b0661ad32257ccd5a003752c83a8');
  return source;
}
