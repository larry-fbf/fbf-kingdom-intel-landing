import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const read = (p: string) => readFileSync(p,'utf8');
test('VIP browser return is informational only, never a second fulfillment writer', async () => {
 const source=read('app/api/vip-purchase/route.ts');
 const module={exports:{} as any}; let calls=0;
 vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{module,exports:module.exports,require:(id:string)=>id==='next/server'?{NextResponse:{json:Response.json}}:require(id),process:{env:{}},fetch:()=>{calls++;throw Error('No external requests allowed');}});
 for(const sessionId of [undefined,'fake','cs_old_paid','cs_unpaid']) {
  const response=await module.exports.POST({json:async()=>({sessionId})});
  assert.equal(response.status,202); const body=await response.json();
  assert.equal(body.ok,false);assert.equal(body.status,'unverified');
 }
 assert.equal(calls,0);
 const page=read('app/vip/thank-you/page.tsx');
 assert.doesNotMatch(page,/purchase_success|sync_success|invitation_token|VIP access confirmed|VIP upgrade complete|You are in\./);
 assert.match(page,/This page does not verify payment/);
 assert.match(read('app/vip/VIPUpsellPage.tsx'),/https:\/\/buy.stripe.com\/8x2dRabIR7JA3qQ88t5kk0i/);
});

test('workbook advertises download, not unimplemented email delivery', () => {
 assert.doesNotMatch(read('app/dashboard/page.tsx'),/get your workbook sent to you/);
 assert.match(read('app/dashboard/page.tsx'),/download your workbook/);
});
