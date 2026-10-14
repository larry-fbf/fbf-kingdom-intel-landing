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
  for (const env of [{}, {ATTIO_MASTERCLASS_LIST_ID:'old',BREVO_MASTERCLASS_LIST_ID:'19'}, {KI_NOVEMBER_2026_VERIFIED:'true'}]) {
    assert.equal(getLaunchConfig('regular',env),null);
    assert.equal(getLaunchConfig('vip',env),null);
  }
});

test('well-formed but wrong cohort IDs fail closed', () => {
 const {getLaunchConfig}=config();
 const env={KI_NOVEMBER_2026_VERIFIED:'november-2026',KI_NOVEMBER_2026_ATTIO_LIST_ID:'11111111-2222-4333-8444-555555555555',KI_NOVEMBER_2026_ATTIO_EVENT_OPTION_ID:'e4039e80-b639-4481-b24d-c00aa5b6390d',KI_NOVEMBER_2026_BREVO_LIST_ID:'26',KI_NOVEMBER_2026_SIMPLETEXTING_LIST_ID:'6ab168287c960c8a3dff232b'};
 assert.equal(getLaunchConfig('regular',env),null);
});
