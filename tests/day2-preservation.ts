import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { beforeDay3 } from './day3-preservation.ts';
export function beforeDay2(source: string) {
  source = beforeDay3(source);
  const before = '    day: "Day 2",\r\n    title: "Replay Coming Soon",';
  const after = '    day: "Day 2",\r\n    title: "Watch the Replay",\r\n    videoUrl: "https://player.vimeo.com/video/1245979460",';
  assert.equal(source.split(after).length, 2);
  source = source.replace(after, before);
  assert.equal(createHash('sha256').update(source).digest('hex'), 'c455c878afc6fce3967bafe52b0752e830bdc7b6a46b5e658d2acc6eeaad04ee');
  return source;
}
