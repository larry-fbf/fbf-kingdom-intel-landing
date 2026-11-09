import {beforeVIPSpacing} from './vip-spacing-preservation.ts';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
export const goldBase='749e5b4667ceee2e901aaf826944ed7e6c028880';
const approved=JSON.parse(readFileSync('tests/vip-gold-approved.json','utf8'));
const hash=(s:string)=>createHash('sha256').update(s).digest('hex');
export function beforeVIPGold(source:string,file='app/vip/VIPUpsellPage.tsx') {
 const spec=approved[file];
 const base=execFileSync('git',['show',`${goldBase}:${file}`],{encoding:'utf8'});
 assert.equal(hash(base),spec.baseHash);
 // Historical tests may chain this restoration twice; only exact base is accepted.
 if(source===base)return source;
 source=beforeVIPSpacing(source,file);
 assert.equal(hash(source),spec.candidateHash,'reviewed candidate bytes only');
 for(const change of [...spec.changes].reverse()) {
  assert.equal(source.slice(change.newStart,change.newStart+change.new.length),change.new);
  source=source.slice(0,change.newStart)+change.old+source.slice(change.newStart+change.new.length);
 }
 assert.equal(source,base,'inverse restores entire immediate-main file');
 return source;
}
