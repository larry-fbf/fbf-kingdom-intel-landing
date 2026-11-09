import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
export function beforeVIPHeaderSize(source:string,file:string) {
 const base=execFileSync('git',['show',`6ca3b7e2f5358d024b21591f28798c6e6ef4d71d:${file}`],{encoding:'utf8'});
 if(source===base)return source;
 assert.equal(file,'app/vip/page.module.css');
 const old='.goldUnderline { margin-bottom: 12px; border-bottom: 0; }';
 const next='.goldUnderline { font-size: clamp(36px, 1.2em, 70px); margin-bottom: 12px; border-bottom: 0; }';
 assert.equal(source,base.replace(old,next),'only approved title sizing against immediate main');
 return base;
}
