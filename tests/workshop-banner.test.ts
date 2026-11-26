import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {beforeBannerHero} from './workshop-banner-preservation.ts';
const subtitle="A God-sized vision shouldn’t feel out of reach because of debt. Learn how to scale without having to leverage other people's money.";
test('expanded workshop invitation and organizational experience are exact',()=>{
 const source=readFileSync('app/workshop/WorkshopLanding.tsx','utf8');
 assert.ok(source.includes(subtitle));
 assert.ok(source.includes('We’ve helped business owners scale their companies. But what matters most is building a business and a life with both peace and profits.'));
 assert.ok(!source.includes('Borrowing may feel like the obvious next step.'));
 assert.ok(readFileSync('app/workshop/page.tsx','utf8').includes(subtitle));
 assert.ok(source.includes('styles.reviewBar'));
 assert.ok(!source.includes('styles.logoBar'));
});
test('banner revision preserves immediate baseline outside exact approved edits',()=>{
 const fixture=JSON.parse(readFileSync('tests/fixtures/workshop-banner-edits.json','utf8'));
 for(const [path,entry] of Object.entries(fixture) as [string,{before:string,beforeSha256:string}][]){
 assert.equal(createHash('sha256').update(entry.before).digest('hex'),entry.beforeSha256);
 assert.equal(beforeBannerHero(path,readFileSync(path)).toString(),entry.before);
 }
});
