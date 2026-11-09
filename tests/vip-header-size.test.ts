import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const base='6ca3b7e2f5358d024b21591f28798c6e6ef4d71d';
export const oldTitle='.goldUnderline { margin-bottom: 12px; border-bottom: 0; }';
export const newTitle='.goldUnderline { font-size: clamp(36px, 1.2em, 70px); margin-bottom: 12px; border-bottom: 0; }';
test('enlarge only the red hero title by 20% with bounded responsive sizing',()=>{
 const file='app/vip/page.module.css';
 const original=execFileSync('git',['show',`${base}:${file}`],{encoding:'utf8'});
 assert.equal(original.split(oldTitle).length,2);
 assert.equal(readFileSync(file,'utf8'),original.replace(oldTitle,newTitle),'exact CSS inverse preserves every other declaration');
});
