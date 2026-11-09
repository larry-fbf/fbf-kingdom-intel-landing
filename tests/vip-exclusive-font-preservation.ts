import {beforeVIPHeaderSize} from './vip-header-size-preservation.ts';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
export const exclusiveBase='21b7a4fc637f01775d180895531f7bd1c3473d78';
export function beforeVIPExclusiveFont(source:string,file='app/vip/VIPUpsellPage.tsx') {
 source=beforeVIPHeaderSize(source,file);
 const base=execFileSync('git',['show',`${exclusiveBase}:${file}`],{encoding:'utf8'});
 if(source===base)return source;
 const old=file.endsWith('.tsx')?'Exlusive Access to':'.heroCopy > p.supportingLine { margin: -12px auto 24px; font-family: "Anton", Impact, sans-serif;';
 const next=file.endsWith('.tsx')?'Exclusive Access to':'.heroCopy > p.supportingLine { margin: -12px auto 24px; font-family: inherit;';
 assert.equal(base.split(old).length,2,'one approved original occurrence');
 assert.equal(source,base.replace(old,next),'only exact approved correction against immediate main');
 return base;
}
