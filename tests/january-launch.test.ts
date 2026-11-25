import assert from 'node:assert/strict';
import test from 'node:test';
import { getLaunchConfig } from '../app/lib/launch-config.ts';
import { calendarIcs } from '../app/dashboard/calendar.ts';
import { readFileSync } from 'node:fs';
const env = {
 KI_JANUARY_2027_VERIFIED: 'january-2027',
 KI_JANUARY_2027_ATTIO_LIST_ID: 'dd7e0de7-26c7-43a8-b319-ea4b5f454e3c',
 KI_JANUARY_2027_ATTIO_EVENT_OPTION_ID: '031718af-253b-44c8-9c5f-20875993a3f7',
 KI_JANUARY_2027_BREVO_LIST_ID: '32',
 KI_JANUARY_2027_SIMPLETEXTING_LIST_ID: '6b05bd3e9a5e81ffa61b9352',
};
test('January accepts only independently verified January destinations', () => {
 assert.deepEqual(getLaunchConfig('regular', env), {attioList:env.KI_JANUARY_2027_ATTIO_LIST_ID,eventOption:env.KI_JANUARY_2027_ATTIO_EVENT_OPTION_ID,brevoList:32,smsList:env.KI_JANUARY_2027_SIMPLETEXTING_LIST_ID});
 assert.equal(getLaunchConfig('regular',{...env,KI_JANUARY_2027_ATTIO_EVENT_OPTION_ID:'e4039e80-b639-4481-b24d-c00aa5b6390d'}),null);
});
test('January calendar is a fresh three-day noon to one Central series',()=>{
 const ics=calendarIcs().replace(/\r\n /g,'');
 for (const value of ['DTSTART:20270105T180000Z','DTEND:20270105T190000Z','UID:kingdom-intelligence-20270105-series@kingdomintel.com','RRULE:FREQ=DAILY;COUNT=3','WN_ZwyUtBhmTzeerZ1Wy9LLPw']) assert.ok(ics.includes(value),value);
 assert.doesNotMatch(ics,/202611|WN_Pljs/);
});
test('January dashboard resets only masterclass replay players, retaining bonus mount',()=>{
 const page=readFileSync('app/dashboard/page.tsx','utf8');
 assert.equal((page.match(/title: "Replay Coming Soon"/g)||[]).length,3);
 assert.doesNotMatch(page,/<iframe|videoUrl|1245584339|1245979460|1246403206/);
 assert.match(page,/<BonusContent \/>/);
 assert.match(page,/<EventTime \/>/); assert.match(page,/<EventTime event="vip" \/>/);
});

// Every edited application file must equal only the reviewed forward edits on main.
import { beforeJanuary } from './january-preservation.ts';
import { beforeDecember } from './december-launch-preservation.ts';
import { beforeFbfHandoff } from './fbf-preservation.ts';
import { execFileSync } from 'node:child_process';
test('full application, assets and configuration scope remains exact',()=>{
 const manifest=JSON.parse(readFileSync('tests/fixtures/january-launch-edits.json','utf8'));
 const files=execFileSync('git',['ls-tree','-r','--name-only',manifest.base],{encoding:'utf8'}).trim().split('\n');
 for(const path of files.filter((p:string)=>!p.startsWith('tests/')&&!p.startsWith('scripts/'))) {
  const actual=beforeFbfHandoff(path,beforeDecember(path,readFileSync(path)));
  if(manifest.files[path]) beforeJanuary(path,actual.toString());
  else assert.deepEqual(actual,execFileSync('git',['show',`${manifest.base}:${path}`],{maxBuffer:64*1024*1024}),path);
 }
});

test('mobile banner and registration modal have no stale event year or month',()=>{
 const page=readFileSync('app/page.tsx','utf8');
 assert.ok(page.includes('Free Event &middot; <EventTime variant="shortDates" />'));
 assert.ok(page.includes('biggest choice you make in 2027.'));
 assert.doesNotMatch(page,/Nov(?:ember)? 10/);
});
