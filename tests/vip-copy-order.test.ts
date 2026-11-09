import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { beforeVIPCopyOrder, baselineHash } from './vip-copy-order-preservation.ts';
test('the exact approved edits invert to hash-pinned immediate main', () => {
  assert.equal(baselineHash, '25cc5aae317a35e8c52628899b886b8c5da44fe2bc45248bb5bafdf2a09cc603');
  beforeVIPCopyOrder(readFileSync('app/vip/VIPUpsellPage.tsx', 'utf8'));
});
const page = readFileSync('app/vip/VIPUpsellPage.tsx', 'utf8');
const title = 'Get personal coaching inside the November 11th and 12th VIP rooms.';
test('personal coaching and its intact offer card immediately follow the complete hero', () => {
  const sections = [...page.matchAll(/      <section className=\{styles\.\w+\}>[\s\S]*?      <\/section>/g)].map(m => m[0]);
  assert.match(sections[0], /styles.hero/);
  assert.match(sections[1], /styles.copyStack/);
  assert(sections[1].includes(`<h2>${title}</h2>`));
  assert.match(sections[1], /<OfferCard \/>/);
  assert.match(sections[2], /styles.splitWithImage/);
});
test('redundant coaching intro, PLUS band and the entire reasons section are removed', () => {
  assert.equal(page.split(title).length - 1, 1);
  assert.doesNotMatch(page, /styles\.(coachingIntro|urgencyBand|reasonGrid)|Friend, let me cut to the chase\.|Why this matters|Two reasons you do not want to miss this\.|This level of access is rare\.|Proximity can compress years\./);
});
