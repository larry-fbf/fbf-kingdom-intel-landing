import assert from 'node:assert/strict';
import { beforeLocalTime } from './local-time-preservation.ts';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
// Exact authorized January inverse. Never relax existing preservation guards.
export function beforeJanuary(path: string, source: string) {
 source = beforeLocalTime(path, source);
 const raw=readFileSync(new URL('./fixtures/january-launch-edits.json',import.meta.url),'utf8');
 assert.equal(createHash('sha256').update(raw).digest('hex'),'6fe0a145d6bcd96716e5422736e508c1bd10aaa182f505f477484bb9bf4c7208');
 const manifest=JSON.parse(raw); const entry=manifest.files[path]; assert.ok(entry,path);
 const baseline=execFileSync('git',['show',`${manifest.base}:${path}`],{encoding:'utf8'});
 assert.equal(createHash('sha256').update(baseline).digest('hex'),entry.baseline);
 let expected=baseline;
 for (const {before,after} of entry.changes) { assert.equal(expected.split(before).length,2); expected=expected.replace(before,after); }
 assert.equal(source,expected,`only authorized January changes: ${path}`);
 assert.equal(createHash('sha256').update(source).digest('hex'),entry.candidate);
 return baseline;
}
