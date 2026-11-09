import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {beforeVIPGold} from './vip-gold-preservation.ts';
const page=beforeVIPGold(readFileSync('app/vip/VIPUpsellPage.tsx','utf8'),'app/vip/VIPUpsellPage.tsx');
const css=beforeVIPGold(readFileSync('app/vip/page.module.css','utf8'),'app/vip/page.module.css');
test('VIP uses a compact secondary line, larger video and red neutral palette', () => {
  assert.doesNotMatch(css, /#(?:d9bd72|c9a55a|e6c979|e8d080|bb945a)|rgba\((?:217, 189, 114|201, 165, 90|185, 148, 90)/i);
  assert.match(css, /font-size: clamp\(20px, 2vw, 28px\)/);
  assert.match(css, /width: min\(900px, 100%\)/);
  assert.match(css, /background: #CC0000;/);
});
test('existing offer stack follows the hero before proof without adding copy', () => {
  assert(page.indexOf('className={styles.splitWithImage}') < page.indexOf('className={styles.featuredTestimonialSection}'));
  assert(page.indexOf('className={styles.bonusSection}') < page.indexOf('className={styles.featuredTestimonialSection}'));
});
test('VIP does not mount the browser-only resetting countdown or its false expiry claim', () => {
  assert.doesNotMatch(page, /CountdownTimer/);
});
