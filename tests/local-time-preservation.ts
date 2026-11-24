import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
export function beforeLocalTime(path: string, source: string) {
 const raw=readFileSync(new URL('./fixtures/local-time-edits.json',import.meta.url),'utf8');
 assert.equal(createHash('sha256').update(raw).digest('hex'),'629655abd647b558f81ad30eb6362e68044ec01ea30e0cf066bcfd57b59f2172');
 const manifest=JSON.parse(raw), entry=manifest.files[path];
 if (!entry) return source;
 const baseline=execFileSync('git',['show',`${manifest.base}:${path}`],{encoding:'utf8'});
 assert.equal(createHash('sha256').update(baseline).digest('hex'),entry.baseline);
 let expected=baseline;
 for(const {before,after} of entry.changes) {
  assert.equal(expected.split(before).length,2,`unique display replacement: ${path}`);
  expected=expected.replace(before,after);
 }
 assert.equal(source,expected,`only authorized local display changes: ${path}`);
 assert.equal(createHash('sha256').update(source).digest('hex'),entry.candidate);
 return baseline;
}
