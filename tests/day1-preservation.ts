import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const hash = (s: string) => createHash('sha256').update(s).digest('hex');
export function beforeDay1(source: string) {
  const raw = readFileSync(new URL('./fixtures/dashboard-day1-edits.json', import.meta.url), 'utf8');
  assert.equal(hash(raw), '72288058c7c046501a171557f22f403000f2212f9e855d89c177ce65995135f9');
  const edits = JSON.parse(raw);
  for (const {before, after} of edits.changes) {
    assert.equal(source.split(after).length, 2);
    source = source.replace(after, before);
  }
  assert.equal(hash(source), 'd3b3f111a1f46802453de8e6d70cd501c166ece2b939e6b1050b222d270689ad');
  return source;
}
