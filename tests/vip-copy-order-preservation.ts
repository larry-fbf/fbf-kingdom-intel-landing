import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
export const base = 'af80dab28aec2f7333fff67d8dc0d6fd0f4c182d';
export const file = 'app/vip/VIPUpsellPage.tsx';
export const baseline = execFileSync('git', ['show', `${base}:${file}`], { encoding: 'utf8' });
const sections = baseline.match(/      <section className=\{styles\.\w+\}>[\s\S]*?      <\/section>\r\n\r\n/g)!;
const coaching = sections.find(s => s.includes('styles.copyStack'))!;
const moved = coaching.replace('<h3>Friend, let me cut to the chase.</h3>', '<h2>Get personal coaching inside the November 11th and 12th VIP rooms.</h2>');
const removed = sections.filter(s => /styles\.(coachingIntro|urgencyBand|reasonGrid)/.test(s));
import { beforeVIPCoachingLight } from './vip-coaching-light-preservation.ts';
export function beforeVIPCopyOrder(source: string) {
  source = beforeVIPCoachingLight(source);
  assert.equal(removed.length, 3);
  assert.equal(source.split(moved).length, 2, 'exact moved body, title and offer markup');
  let restored = source.replace(moved, '');
  restored = restored.replace('      <section className={styles.featuredTestimonialSection}>', removed.find(s => s.includes('styles.urgencyBand'))! + '      <section className={styles.featuredTestimonialSection}>');
  restored = restored.replace('      <section className={styles.quoteBand}>', removed.find(s => s.includes('styles.coachingIntro'))! + coaching + removed.find(s => s.includes('styles.reasonGrid'))! + '      <section className={styles.quoteBand}>');
  assert.equal(restored, baseline, 'only the approved move, title and three removals; all newlines preserved');
  return restored;
}
export const baselineHash = createHash('sha256').update(baseline).digest('hex');
