import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
export const base='0705cf89c0a0e90afe3f8d9caf839ec493f21d7a';
export const baseline=execFileSync('git',['show',`${base}:app/vip/VIPUpsellPage.tsx`],{encoding:'utf8'});
assert.equal(createHash('sha256').update(baseline).digest('hex'),'142578527df9bd91c2e906c82d1b84da6d5662b80905028152838d8ae9df536c');
const paragraph='              <p>\r\n                Right now, while you are here, you have the opportunity to upgrade to VIP status in\r\n                the Kingdom Intelligence Masterclass.\r\n              </p>\r\n';
const bullets='  "The Kingdom Intelligence Masterclass workbook",\n  "The S.W.E.E.T. Spot Audit",\n  "Lifetime access to the Kingdom Intelligence Masterclass replays in the FBF Vault",\n';
export const lightCSS='.coachingLight {\r\n  background: #f4f2ee;\r\n}\r\n\r\n.coachingLight .copyStack h2 {\r\n  color: #121212;\r\n}\r\n\r\n.coachingLight .copyStack p {\r\n  color: #3a352f;\r\n}\r\n\r\n';
import {beforeVIPGold} from './vip-gold-preservation.ts';
export function beforeVIPCoachingLight(source: string) {
  source=beforeVIPGold(source);
  assert.equal(baseline.split(paragraph).length,2);
  assert.equal(baseline.split(bullets).length,2);
  const expected=baseline.replace(paragraph,'').replace(bullets,'').replace('className={styles.sectionWhite}','className={`${styles.sectionWhite} ${styles.coachingLight}`}');
  assert.equal(source,expected,'only exact paragraph/list deletions and coaching class may change');
  return baseline;
}
