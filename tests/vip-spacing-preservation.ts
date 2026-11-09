import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
export const spacingBase='22caaed738501865ad856074928e82eebe165c78';
const approved=JSON.parse(readFileSync('tests/vip-spacing-approved.json','utf8'));
const hash=(s:string)=>createHash('sha256').update(s).digest('hex');
export function beforeVIPSpacing(source:string,file='app/vip/VIPUpsellPage.tsx') {
 const spec=approved[file];
 const base=execFileSync('git',['show',`${spacingBase}:${file}`],{encoding:'utf8'});
 assert.equal(hash(base),spec.baseHash);
 if(source===base)return source;
 assert.equal(hash(source),spec.candidateHash,'reviewed spacing candidate bytes only');
 for(const change of [...spec.changes].reverse()) {
  assert.equal(source.slice(change.newStart,change.newStart+change.new.length),change.new);
  source=source.slice(0,change.newStart)+change.old+source.slice(change.newStart+change.new.length);
 }
 assert.equal(source,base,'spacing inverse restores entire immediate-main file');
 return source;
}
