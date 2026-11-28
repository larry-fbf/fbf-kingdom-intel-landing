import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
test('workshop Zoom preserves immediate main outside the exact approved runtime edits',()=>{
 const base='08f083c9a1613c5aa2a6ffa17c2c8a4734035f80';
 const edits=JSON.parse(readFileSync('tests/fixtures/workshop-zoom-edits.json','utf8'));
 const files=execFileSync('git',['ls-tree','-r','--name-only',base],{encoding:'utf8'}).trim().split('\n');
 for(const path of files.filter(p=>!p.startsWith('tests/')&&p!=='docs/workshop-registration.md')){
 const bytes=readFileSync(path);
 const original=execFileSync('git',['show',`${base}:${path}`],{maxBuffer:64*1024*1024});
 if(edits[path]){assert.deepEqual(Buffer.from(edits[path].before),original);assert.equal(createHash('sha256').update(bytes).digest('hex'),edits[path].sha256,path);}
 else assert.deepEqual(bytes,original,path);
 }
 const runtime=readFileSync('app/lib/workshop-zoom.ts','utf8');assert.match(runtime,/webinarId:'81398970006'/);assert.match(runtime,/webinarType:5/);assert.doesNotMatch(runtime,/process\.env\.ZOOM_SIGNUP_TARGET|env\.ZOOM_SIGNUP_TARGET/);
 for(const path of ['app/workshop/WorkshopLanding.tsx','app/workshop/WorkshopRegistration.tsx','app/lib/workshop-calendar.ts','app/lib/workshop-zoom.ts'])assert.doesNotMatch(readFileSync(path,'utf8'),/zoom\.us\/j\//);
});
