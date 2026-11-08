import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { signRegistrationConfirmation, verifyRegistrationConfirmation } from '../app/lib/registration-confirmation.ts';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function load(file: string, mocks: Record<string, any>, globals: Record<string, any> = {}, append = ''): any {
  const module = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(file, 'utf8') + append, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText,
    { module, exports: module.exports, require: (id: string) => id in mocks ? mocks[id] : require(id), ...globals });
  return module.exports;
}
function nodes(tree: any): any[] {
  if (!tree || typeof tree !== 'object') return [];
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  return [tree, ...nodes(tree.props?.children)];
}
function storage() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value), removeItem: (key: string) => values.delete(key) };
}
async function submit(fail = false, brokenStorage = false) {
  const store = storage(); const events: string[] = []; const paths: string[] = [];
  const react = { ...require('react'), useEffect: () => {}, useRef: () => ({current:null}), useState: (initial: any) => [typeof initial === 'object' ? {email:'synthetic@example.invalid', firstName:'Test',lastName:'Only',phone:'',agreed:true} : initial, () => {}] };
  class RequestError extends Error {}
  const page = load('app/page.tsx', {
    react, 'next/navigation': {useRouter: () => ({push:(path: string) => paths.push(path)})}, 'next/image': {default: () => null},
    './lib/clarity-events': {trackClarityEvent:(event: string) => events.push(event)},
    './lib/funnel-events': {FUNNEL_EVENTS:{registrationSubmitAttempt:'attempt', registrationConfirmed:'confirmed',registrationFailed:'failed'}},
    './lib/post-json': {RegistrationRequestError:RequestError, postJsonWithTimeout:async () => {if(fail) throw new RequestError('synthetic failure');return {ok:true};}},
    './lib/attribution': {captureAttributionFromCurrentUrl:()=>{},getStoredAttribution:()=>({})},
    './components/TrackedVimeoVideo': {default:()=>null},
  }, {window:{sessionStorage:brokenStorage ? {setItem:()=>{throw Error('disabled');}} : store}}, '\nexport { RegisterModal };');
  const form = nodes(page.RegisterModal({onClose:()=>{}})).find(n=>n.type==='form');
  await form.props.onSubmit({preventDefault:()=>{}});
  return {store,events,paths};
}
test('real successful registration handler sets independent flags then navigates to dashboard', async () => {
  const result = await submit();
  assert.deepEqual(result.paths, ['/dashboard']);
  assert.equal(result.store.getItem('kim_registration_confirmed'),'true');
  assert.equal(result.store.getItem('kim_registration_welcome'),'true');
  assert.deepEqual(result.events,['attempt','confirmed']);
});
test('real failed registration never sets either flag or navigates', async () => {
  const result = await submit(true);
  assert.deepEqual(result.paths, []);
  assert.equal(result.store.getItem('kim_registration_confirmed'),null);
  assert.equal(result.store.getItem('kim_registration_welcome'),null);
  assert.deepEqual(result.events,['attempt','failed']);
});
test('storage unavailable does not prevent successful dashboard navigation', async () => {
  assert.deepEqual((await submit(false,true)).paths,['/dashboard']);
});

function analytics(store: any, thankYouView = false) {
  const calls: any[] = []; const events: any[] = [];
  const component = load('app/components/ConfirmedRegistrationAnalytics.tsx', {
    react: {useEffect:(fn:()=>void)=>fn()},
    '../lib/funnel-events': {FUNNEL_EVENTS:{thankYouView:'thank-you'}},
    '../lib/clarity-events': {trackClarityEvent:(...args:any[])=>events.push(args)},
  }, {window:{sessionStorage:store,fbq:(...args:any[])=>calls.push(args)}}).default;
  component({trackThankYouView:thankYouView});
  return {calls,events};
}
test('dashboard analytics consumes conversion once independently, no false thank-you views', () => {
  const store = storage(); store.setItem('kim_registration_confirmed','true'); store.setItem('kim_registration_welcome','true');
  const first = analytics(store);
  assert.deepEqual(first.calls,[['track','CompleteRegistration']]);
  assert.deepEqual(first.events,[]);
  assert.equal(store.getItem('kim_registration_welcome'),'true');
  assert.deepEqual(analytics(store).calls,[]);
  assert.deepEqual(analytics(store,true).calls,[]);
});
test('analytics fails closed when consumed-marker removal fails', () => {
  assert.deepEqual(analytics({getItem:()=> 'true',removeItem:()=>{throw Error('disabled');}}).calls,[]);
});

const secret = 'synthetic-unit-test-only';
for (const [name, token, expected] of [
  ['valid', signRegistrationConfirmation('synthetic',secret),true],
  ['missing',undefined,false], ['invalid','forged',false],
  ['expired',signRegistrationConfirmation('synthetic',secret,Date.now()-3600001),false],
  ['unavailable','throws',false],
  ['no-secret',signRegistrationConfirmation('synthetic',secret),false],
] as const) {
  test(`real public dashboard server gate: ${name} confirmation`, async () => {
    const Welcome = () => null; const Analytics = () => null;
    const page = load('app/dashboard/page.tsx', {
      './BonusContent': {default:()=>null},
      './AddToCalendar': {default:()=>null}, './calendar':{googleCalendarUrl:()=>''},
      '../components/ClarityPageViewEvent':{default:()=>null}, '../components/TrackedClarityLink':{default:()=>null},
      './ShareMasterclassButton':{default:()=>null}, './RegistrationWelcome':{default:Welcome},
      '../components/ConfirmedRegistrationAnalytics':{default:Analytics},
      'next/headers':{cookies:async()=>{if(token==='throws')throw Error('unavailable'); return {get:()=>token ? {value:token} : undefined};}},
      '../lib/registration-confirmation':{REGISTRATION_CONFIRMATION_COOKIE:'kim_registration_confirmation', getRegistrationConfirmationSecret:()=>name==='no-secret' ? '' : secret,verifyRegistrationConfirmation},
    });
    const tree = await page.default();
    assert.equal(tree.type,'main','dashboard stays public');
    const welcome = nodes(tree).find(n=>n.type===Welcome);
    assert.ok(welcome,'public dashboard must retain manual welcome control');
    assert.equal(welcome.props.confirmedRegistration,expected);
    assert.equal(nodes(tree).filter(n=>n.type===Analytics).length,expected ? 1 : 0);
    if(expected) assert.equal(nodes(tree).find(n=>n.type===Analytics).props.trackThankYouView,false);
  });
}
test('welcome consumes its own flag before first display, never the conversion marker', () => {
  assert.ok(existsSync('app/dashboard/RegistrationWelcome.tsx'),'welcome component exists');
  const store=storage();store.setItem('kim_registration_welcome','true');store.setItem('kim_registration_confirmed','true');
  let opens=0;
  const component=load('app/dashboard/RegistrationWelcome.tsx',{
    react:{useState:()=>[false,(value:boolean)=>{if(value)opens++;}],useRef:()=>({current:null}),useEffect:(fn:()=>void)=>fn()},
    '../components/TrackedVimeoVideo':{default:()=>null}, '../components/TrackedClarityLink':{default:()=>null},
    '../lib/funnel-events':{FUNNEL_EVENTS:{}},
  },{window:{sessionStorage:store,addEventListener:()=>{},removeEventListener:()=>{}}}).default;
  component({confirmedRegistration:false});assert.equal(opens,0);
  component({confirmedRegistration:true});assert.equal(opens,1);
  assert.equal(store.getItem('kim_registration_welcome'),null);
  assert.equal(store.getItem('kim_registration_confirmed'),'true');
  component({confirmedRegistration:true});assert.equal(opens,1);
  const tree=component({confirmedRegistration:false});
  nodes(tree).find(n=>n.type==='button').props.onClick();assert.equal(opens,2);
  assert.equal(store.getItem('kim_registration_confirmed'),'true');
});
for(const failure of ['get','remove']) test(`welcome fails closed on storage ${failure} failure but manual reopen works`, () => {
  let opens=0;
  const component=load('app/dashboard/RegistrationWelcome.tsx',{
    react:{useState:()=>[false,(value:boolean)=>{if(value)opens++;}],useRef:()=>({current:null}),useEffect:(fn:()=>void)=>fn()},
    '../components/TrackedVimeoVideo':{default:()=>null}, '../components/TrackedClarityLink':{default:()=>null},
    '../lib/funnel-events':{FUNNEL_EVENTS:{}},
  },{window:{sessionStorage:{getItem:()=>{if(failure==='get')throw Error('disabled');return 'true';},removeItem:()=>{throw Error('disabled');}},addEventListener:()=>{},removeEventListener:()=>{}}}).default;
  const tree=component({confirmedRegistration:true});assert.equal(opens,0);
  nodes(tree).find(n=>n.type==='button').props.onClick();assert.equal(opens,1);
});
