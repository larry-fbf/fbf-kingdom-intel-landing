import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const read = (f: string) => readFileSync(new URL('../'+f, import.meta.url), 'utf8');

test('unverified November paid activation never reads a payment or fulfills any cohort', async () => {
 const code = ts.transpileModule(read('app/api/vip-purchase/route.ts'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const module = {exports:{} as any}; let calls=0;
 vm.runInNewContext(code, {module,exports:module.exports,require,process:{env:{STRIPE_SECRET_KEY:'fixture'}},fetch:async()=>{calls++;throw Error('network forbidden');},console:{error:()=>{}},AbortSignal});
 for (const sessionId of [undefined, 'cs_old_september', 'cs_unknown_november']) {
  const res=await module.exports.POST({json:async()=>({sessionId})});
  assert.equal(res.status,503);
  assert.equal((await res.json()).ok,false);
 }
 assert.equal(calls,0);
});
test('VIP hold has no checkout link or automatic payment-sync and cannot claim success', () => {
 const offer=read('app/vip/VIPUpsellPage.tsx');
 assert.equal(offer.includes('href={PAYMENT_LINK}'),false);
 assert.ok(offer.includes('November VIP checkout is not open yet'));
 assert.equal(offer.includes('<CountdownTimer'),false);
 const page=read('app/vip/thank-you/page.tsx');
 assert.equal(/kim_vip_purchase_success|VIP upgrade complete|You are in\.|fetch\(/.test(page),false);
 assert.ok(page.includes('VIP access is not confirmed'));
});
