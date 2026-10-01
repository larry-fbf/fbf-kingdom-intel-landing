import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const payload = { email: " Registrant@example.invalid ", firstName: "Real", lastName: "Registrant", agreed: false };
function harness(overrides: Record<string, string> = {}, fail = "") {
  const calls: { url: string; body: any; method: string }[] = [];
  const env = {
    ATTIO_API_KEY: "mock", BREVO_API_KEY: "mock", SIMPLETEXTING_API_KEY: "mock",
    ATTIO_KI_WORKSHOP_OCTOBER_2026_LIST_ID: "october-attio",
    BREVO_KI_WORKSHOP_OCTOBER_2026_LIST_ID: "28",
    ATTIO_KI_WORKSHOP_AUGUST_2026_LIST_ID: "forbidden-august", BREVO_KI_WORKSHOP_AUGUST_2026_LIST_ID: "25",
    ...overrides,
  };
  const fetch = async (url: string, init: RequestInit = {}) => {
    const body = init.body instanceof URLSearchParams ? Object.fromEntries(init.body) : JSON.parse(String(init.body));
    calls.push({url,body,method:init.method || "GET"});
    if (fail && url.includes(fail)) return Response.json({}, { status: 503 });
    if (url.includes("/objects/people/records")) return Response.json({ data: { id: { record_id: "person-id" } } });
    if (url.includes("simpletexting.com")) return Response.json({code: 1});
    return Response.json({data:{}});
  };
  const module = { exports: {} as any };
  const code = ts.transpileModule(readFileSync("app/api/workshop/register/route.ts", "utf8"), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(code, {module,exports:module.exports,require,process:{env},fetch,Response,URLSearchParams,console:{error:()=>{}}});
  return {calls,post:(body: any=payload)=>module.exports.POST(new Request("https://local.invalid/api/workshop/register",{method:"POST",body:JSON.stringify(body)}))};
}

test("October workshop signup enrolls only in the separate October lists without changing opt-outs", async () => {
  const h=harness(); const res=await h.post();
  assert.equal(res.status,200);
  assert.ok(h.calls.some(c=>c.url.endsWith("/lists/october-attio/entries")));
  const brevo=h.calls.find(c=>c.url.includes("brevo.com"))!;
  assert.deepEqual(brevo.body.listIds,[28]);
  assert.equal(brevo.body.attributes.WORKSHOP,"Called, But Stuck - October 13, 2026");
  assert.equal(Object.hasOwn(brevo.body,"emailBlacklisted"),false);
  assert.equal(Object.hasOwn(brevo.body,"smsBlacklisted"),false);
  assert.ok(h.calls.every(c=>!c.url.includes("forbidden-august") && !c.url.includes("simpletexting.com")));
  assert.equal((await res.json()).ok,true);
});

for (const missing of ["ATTIO_API_KEY", "BREVO_API_KEY", "ATTIO_KI_WORKSHOP_OCTOBER_2026_LIST_ID", "BREVO_KI_WORKSHOP_OCTOBER_2026_LIST_ID"]) {
  test(`missing ${missing} rejects before any write rather than silently accepting`, async () => {
    const h=harness({[missing]:""}); const res=await h.post();
    assert.equal(res.status,503);
    assert.notEqual((await res.json()).ok,true);
    assert.equal(h.calls.length,0);
  });
}
for (const fail of ["api.attio.com", "api.brevo.com"]) {
  test(`${fail} failure is retryable, not a false registration confirmation`, async () => {
    const h=harness({},fail); const res=await h.post();
    assert.equal(res.status,503);
    assert.notEqual((await res.json()).ok,true);
    assert.ok(h.calls.some(c=>c.url.includes("attio.com")));
    assert.ok(h.calls.some(c=>c.url.includes("brevo.com")));
  });
}
