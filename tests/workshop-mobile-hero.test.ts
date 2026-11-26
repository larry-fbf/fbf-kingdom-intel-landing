import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {beforeMobileHero} from './workshop-mobile-preservation.ts';
test('mobile hero retains the approved invitation and contextual proof without redundant chrome',()=>{
 const source=readFileSync('app/workshop/WorkshopLanding.tsx','utf8');
 assert.ok(!source.includes('styles.logoBar'));
 assert.ok(!source.includes('More voices from the broader FBF community.'));
 assert.ok(source.includes('A God-sized vision shouldn’t feel out of reach because of debt.'));
 assert.ok(source.includes('These stories describe their broader Fueled By Fire experience, not this workshop or a promised result.'));
 assert.equal((source.match(/context:/g)||[]).length,4);
 assert.ok(source.includes('/images/kingdom-intel-network-hero.jpg'));
});
test('mobile preservation fixture binds the exact immediate source baseline',()=>{
 const fixture=JSON.parse(readFileSync('tests/fixtures/workshop-mobile-edits.json','utf8'));
 for(const [path,entry] of Object.entries(fixture) as [string,{before:string,beforeSha256:string}][]) {
  assert.equal(createHash('sha256').update(entry.before).digest('hex'),entry.beforeSha256,path);
  assert.equal(beforeMobileHero(path,readFileSync(path)).toString(),entry.before,path);
 }
});
