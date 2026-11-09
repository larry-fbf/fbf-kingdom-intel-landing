import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
const css=readFileSync('app/vip/page.module.css','utf8');
test('gold actions and accents restore original gradient and keep only VIP titles red',()=>{
 assert.match(css,/background: linear-gradient\(135deg, #c9a55a 0%, #e8d080 45%, #bb945a 100%\);/);
 assert.match(css,/color: #120800;/);
 assert.match(css,/0 16px 46px rgba\(185, 148, 90, 0.5\)/);
 assert.match(css,/\.heroLead strong \{ color: #e6c979; \}/);
 assert.equal((css.match(/#CC0000/g)||[]).length,2);
 assert.doesNotMatch(css,/#cc0000|rgba\(204, 0, 0/);
 assert.match(css,/\.topAnnouncement, \.accessLine, \.supportingLine \{ text-transform: none; \}/);
});
const page=readFileSync('app/vip/VIPUpsellPage.tsx','utf8');
test('bonuses contain masterclass replays, unchanged audit, then VIP recordings',()=>{
 const bonuses=page.match(/const bonuses = \[([\s\S]*?)\];/)![1];
 assert.deepEqual([...bonuses.matchAll(/title: "([^"]+)"/g)].map(m=>m[1]),[
  'Lifetime access to the Kingdom Intelligence Masterclass replays',
  'The S.W.E.E.T. Spot Audit',
  'Lifetime access to the VIP session recordings',
 ]);
 assert.doesNotMatch(bonuses,/workbook/);
 assert.match(bonuses,/Revisit both VIP sessions for coaching insights you can keep putting into practice\./);
});
test('VIP hero preserves the exact supplied spelling and accessible spaces',()=>{
 assert.match(page, /<span>Upgrade your experience<\/span>/);
 assert.match(page, /<span className=\{styles.accessLine\}>Exlusive Access to\{' '\}<\/span>/);
 assert.match(page, /<span className=\{styles.goldUnderline\}>VIP MASTERMIND<\/span>/);
 assert.match(page, /<\/h1>\s*<p className=\{styles.supportingLine\}>One-on-one coaching &amp; Q&amp;A<\/p>/);
 const hero=page.split('            ) : (')[1].split('            )}')[0];
 assert.doesNotMatch(hero,/Exclusive|Upgrade To|Business Reset/);
});
