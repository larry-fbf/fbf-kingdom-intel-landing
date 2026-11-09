import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {execFileSync} from 'node:child_process';
import {base,beforeVIPCoachingLight,lightCSS} from './vip-coaching-light-preservation.ts';
test('immediate base bytes differ only by the approved copy and scoped palette',()=>{
  beforeVIPCoachingLight(page);
  assert.equal(css.split(lightCSS).length,2);
  assert.equal(css.replace(lightCSS,''),execFileSync('git',['show',`${base}:app/vip/page.module.css`],{encoding:'utf8'}));
});
const page=readFileSync('app/vip/VIPUpsellPage.tsx','utf8');
const css=readFileSync('app/vip/page.module.css','utf8');
test('remove only the specified paragraph and three redundant inclusions, not bonuses',()=>{
  assert.doesNotMatch(page,/Right now, while you are here/);
  const includes=page.match(/const vipIncludes = \[([\s\S]*?)\];/)![1];
  assert.equal((includes.match(/  "/g)||[]).length,3);
  assert.doesNotMatch(includes,/workbook|S\.W\.E\.E\.T\.|Lifetime access/);
  const bonuses=page.match(/const bonuses = \[([\s\S]*?)\];/)![1];
  assert.equal((bonuses.match(/title:/g)||[]).length,3);
  assert.match(bonuses,/The Kingdom Intelligence Masterclass workbook/);
  assert.match(bonuses,/The S\.W\.E\.E\.T\. Spot Audit/);
  assert.match(bonuses,/Lifetime access to the Kingdom Intelligence Masterclass replays/);
});
test('only coaching section uses dashboard light palette, leaving offer styles untouched',()=>{
  assert.equal(page.split('styles.coachingLight').length-1,1);
  assert.match(page,/className=\{`\$\{styles.sectionWhite\} \$\{styles.coachingLight\}`\}/);
  assert.match(css,/\.coachingLight\s*\{\s*background: #f4f2ee;\s*\}/);
  assert.match(css,/\.coachingLight \.copyStack h2\s*\{\s*color: #121212;\s*\}/);
  assert.match(css,/\.coachingLight \.copyStack p\s*\{\s*color: #3a352f;\s*\}/);
});
