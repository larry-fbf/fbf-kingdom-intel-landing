import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const PERSON = "11111111-1111-4111-8111-111111111111";
const EVENT = "K.I.M Sept 2026";
const payload = { email: " Alex@customer.invalid ", firstName: " Alex ", lastName: " Rivera ", phone: "3122346789", agreed: true, timeZone: "America/Chicago" };

// Execute the real handler and helpers, replacing only the network boundary and
// environment. No real credentials, requests, CRM writes, or messages are used.
function harness({ events = ["Earlier event"], failPatch = false, failBrevo = false, failAttio = false, zoomStatus = "registered", zoomThrows = false } = {}) {
  const calls: { url: string; method: string; body: any }[] = [];
  const state = { events: [...events], registered: "Legacy event" };
  const warnings: unknown[][] = [];
  const fetch = async (url: string, init: RequestInit = {}) => {
    const method = init.method || "GET";
    const body = init.body instanceof URLSearchParams ? Object.fromEntries(init.body) : init.body ? JSON.parse(String(init.body)) : null;
    calls.push({ url, method, body });
    if (url.startsWith("https://api.attio.com/") && failAttio) return Response.json({}, { status: 503 });
    if (url.includes("/objects/people/records")) {
      if (method === "PATCH" && failPatch) return Response.json({}, { status: 422 });
      const values = body?.data?.values || {};
      // Model Attio's documented PATCH-append / PUT-replace semantics.
      if (values.events_registered) state.events = method === "PATCH" ? [...new Set([...state.events, ...values.events_registered])] : [...values.events_registered];
      if (values.registered) state.registered = values.registered;
      return Response.json({ data: { id: { record_id: PERSON }, values: {} } });
    }
    if (url.includes("/objects/deals/records")) return Response.json({ data: { id: { record_id: "forbidden-deal" } } });
    if (url.includes("/lists/") && url.endsWith("/entries")) return Response.json({ data: {} });
    if (url === "https://api.brevo.com/v3/contacts") return Response.json({}, { status: failBrevo ? 503 : 201 });
    if (url === "https://app2.simpletexting.com/v1/group/contact/add") return Response.json({ code: 1 });
    throw new Error(`Unexpected network request blocked: ${method} ${url}`);
  };
  const env = { ATTIO_API_KEY: "test-only", BREVO_API_KEY: "test-only", SIMPLETEXTING_API_KEY: "test-only", REGISTRATION_CONFIRMATION_SECRET: "test-only-confirmation-secret", NODE_ENV: "production" };
  function load(file: string): any {
    if (file.endsWith("/zoom-runtime.ts")) return { registerWebsiteZoom: async (contact: any) => {
      calls.push({ url: "zoom-service-fixture", method: "SERVICE", body: contact });
      if (zoomThrows) throw new Error("private provider diagnostic");
      return { status: zoomStatus };
    } };
    const module = { exports: {} };
    const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(code, { module, exports: module.exports, require: (id: string) => id.startsWith(".") ? load(resolve(dirname(file), id + ".ts")) : require(id), process: { env }, fetch, Response, Headers, URLSearchParams, AbortSignal, crypto, Buffer, setTimeout, clearTimeout, console: { error: (...args: unknown[]) => warnings.push(args), warn: (...args: unknown[]) => warnings.push(args) } }, { filename: file });
    return module.exports;
  }
  const route = load(resolve("app/api/register/route.ts"));
  return { calls, state, warnings, post: (body = payload) => route.POST(new Request("https://local.invalid/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })) };
}

test("registration creates a Person and fulfills registration without creating a Deal", async () => {
  const h = harness();
  const response = await h.post();
  assert.equal(response.status, 200);
  assert.equal(h.calls.filter(c => c.url.includes("/objects/deals/")).length, 0, "registration must never call the Deals API");
  const person = h.calls.find(c => c.method === "PUT" && c.url.includes("/objects/people/"))!;
  assert.equal(person.body.data.values.email_addresses[0].email_address, "alex@customer.invalid");
  assert.equal(person.body.data.values.name[0].full_name, "Alex Rivera");
  assert.equal(person.body.data.values.phone_numbers[0].original_phone_number, "+13122346789");
  assert.equal(person.body.data.values.time_zone, "America/Chicago");
  assert.ok(h.calls.some(c => c.method === "PUT" && c.url.includes("/lists/") && c.body.data.parent_record_id === PERSON));
  assert.ok(h.calls.some(c => c.url.includes("brevo.com") && c.body.listIds.includes(19)));
  assert.ok(h.calls.some(c => c.url.includes("simpletexting.com") && c.body.phone === "+13122346789"));
  assert.match(response.headers.get("set-cookie"), /HttpOnly/i);
  assert.match(response.headers.get("set-cookie"), /Path=\/thank-you/i);
  assert.equal((await response.json()).degraded, false);
});

for (const existing of [[], ["Earlier event", "Another event"], ["Earlier event", EVENT]]) {
  test(`appends exact September event without replacing history: ${JSON.stringify(existing)}`, async () => {
    const h = harness({ events: existing });
    for (let attempt = 0; attempt < 2; attempt++) {
      assert.equal((await h.post()).status, 200);
      assert.deepEqual(h.state.events, [...new Set([...existing, EVENT])]);
    }
    const patches = h.calls.filter(c => c.method === "PATCH");
    assert.equal(patches.length, 2);
    assert.equal(patches[0].url, `https://api.attio.com/v2/objects/people/records/${PERSON}`);
    assert.deepEqual(patches[0].body, { data: { values: { events_registered: [EVENT] } } });
    for (const call of h.calls.filter(c => c.method === "PUT" && c.url.includes("/objects/people/"))) {
      assert.equal(Object.hasOwn(call.body.data.values, "events_registered"), false);
      assert.equal(Object.hasOwn(call.body.data.values, "registered"), false);
    }
    assert.equal(h.state.registered, "Legacy event");
  });
}

test("event append failure preserves list enrollment and other fulfillment, reports degraded acceptance", async () => {
  const h = harness({ failPatch: true });
  const response = await h.post();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).degraded, true);
  assert.deepEqual(h.state.events, ["Earlier event"]);
  assert.ok(h.calls.some(c => c.url.includes("/lists/")));
  assert.ok(h.calls.some(c => c.url.includes("brevo.com")));
  assert.ok(h.calls.some(c => c.url.includes("simpletexting.com")));
  assert.ok(h.warnings.length);
});

test("all durable integrations failing still returns retryable 503 without confirmation", async () => {
  const h = harness({ failAttio: true, failBrevo: true });
  const response = await h.post();
  assert.equal(response.status, 503);
  assert.equal((await response.json()).retryable, true);
  assert.equal(response.headers.get("set-cookie"), null);
});

for (const zoomStatus of ["registered", "pending", "held", "unavailable"]) {
  test(`Zoom ${zoomStatus} preserves exactly one CRM/Brevo/SMS fulfillment and truthful acceptance`, async () => {
    const h = harness({ zoomStatus }); const response = await h.post(); const body = await response.json();
    assert.equal(response.status, 200); assert.equal(body.ok, true);
    assert.equal(body.zoom.status, zoomStatus); assert.equal(body.degraded, zoomStatus !== "registered");
    assert.equal(body.retryable, undefined);
    assert.equal(h.calls.filter(c => c.url.includes("brevo.com")).length, 1);
    assert.equal(h.calls.filter(c => c.url.includes("simpletexting.com")).length, 1);
    const zoom = h.calls.filter(c => c.url === "zoom-service-fixture");
    assert.equal(zoom.length, 1); assert.equal(zoom[0].body.agreed, true);
    assert.equal(zoom[0].body.email, "alex@customer.invalid");
  });
}
test("unexpected Zoom exception cannot turn CRM success into retryable failure or leak diagnostics", async () => {
  const h = harness({ zoomThrows: true }); const response = await h.post();
  assert.equal(response.status, 200);
  const body = await response.json(); assert.equal(body.zoom.status, "unavailable");
  assert.equal(JSON.stringify([body, h.warnings]).includes("private provider diagnostic"), false);
});

test("missing affirmative consent rejects registration before any integration", async () => {
  const h = harness();
  const response = await h.post({ ...payload, agreed: false });
  assert.equal(response.status, 400);
  assert.equal(h.calls.length, 0);
});
