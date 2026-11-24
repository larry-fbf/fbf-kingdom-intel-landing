import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function config() {
  assert.ok(existsSync('app/lib/launch-config.ts'), 'explicit launch configuration is required');
  const module = {exports: {} as any};
  vm.runInNewContext(ts.transpileModule(readFileSync('app/lib/launch-config.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText, {module,exports:module.exports,require,process:{env:{}},URL});
  return module.exports;
}
test('launch config rejects missing, legacy-only, and unverified cohort mappings', () => {
  const {getLaunchConfig} = config();
  for (const env of [{}, {ATTIO_MASTERCLASS_LIST_ID:'old',BREVO_MASTERCLASS_LIST_ID:'19'}, {KI_JANUARY_2027_VERIFIED:'true'}]) {
    assert.equal(getLaunchConfig('regular',env),null);
    assert.equal(getLaunchConfig('vip',env),null);
  }
});

test('well-formed but wrong cohort IDs fail closed', () => {
 const {getLaunchConfig}=config();
 const env={KI_JANUARY_2027_VERIFIED:'january-2027',KI_JANUARY_2027_ATTIO_LIST_ID:'11111111-2222-4333-8444-555555555555',KI_JANUARY_2027_ATTIO_EVENT_OPTION_ID:'031718af-253b-44c8-9c5f-20875993a3f7',KI_JANUARY_2027_BREVO_LIST_ID:'32',KI_JANUARY_2027_SIMPLETEXTING_LIST_ID:'6b05bd3e9a5e81ffa61b9352'};
 assert.equal(getLaunchConfig('regular',env),null);
});
