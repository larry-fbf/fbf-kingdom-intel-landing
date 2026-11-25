import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { beforeLocalTime } from './local-time-preservation.ts';
import { beforeDecember } from './december-launch-preservation.ts';
import { beforeFbfHandoff } from './fbf-preservation.ts';
test('device-time changes preserve every existing runtime, asset, configuration and calendar byte outside exact display substitutions', () => {
 const manifest=JSON.parse(readFileSync('tests/fixtures/local-time-edits.json','utf8'));
 const paths=execFileSync('git',['ls-tree','-r','--name-only',manifest.base],{encoding:'utf8'}).trim().split('\n');
 for(const path of paths.filter(p=>!p.startsWith('tests/')&&!p.startsWith('scripts/'))) {
  const baseline=execFileSync('git',['show',`${manifest.base}:${path}`],{maxBuffer:64*1024*1024});
  const current=beforeFbfHandoff(path,beforeDecember(path,readFileSync(path)));
  if(manifest.files[path]) assert.equal(beforeLocalTime(path,current.toString()),baseline.toString());
  else assert.deepEqual(current,baseline,path);
 }
});
