import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const registration = { firstName: "Test", lastName: "Leader", email: "test@example.invalid", phone: "", leaderType: "Founder or CEO", agreed: true };

test("confirmation page renders workshop details and next steps without conversion side effects", () => {
  const path = "app/workshop/thank-you/page.tsx";
  let source = "";
  assert.doesNotThrow(() => { source = readFileSync(path, "utf8"); }, "dedicated page must exist");
  const module = { exports: {} as any };
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require: (name: string) => name.endsWith(".css") ? { default: {} } : require(name) });
  const html = require("react-dom/server").renderToStaticMarkup(module.exports.default());
  for (const text of ["You Are Registered", "Tuesday, October 13, 2026", "11am CT / 12pm ET", "Payton Wallace", "Andy Lee", "Zoom access and reminders", "60 minutes", "2026-10-13T16:00:00.000Z"]) assert.ok(html.includes(text), text);
  assert.equal(module.exports.metadata.alternates.canonical, "https://www.kingdomintel.com/workshop/thank-you");
  assert.equal(module.exports.metadata.robots.index, false);
  assert.doesNotMatch(source, /fbq|gtag|trackEvent|fetch\(|useEffect|use client/);
  assert.doesNotMatch(html, /zoom\.us|<form/);
});

// Execute the real submit handler, mocking only React state and the network/browser boundary.
function harness(response: () => Promise<Response>, agreed = true) {
  const destinations: string[] = [];
  const states: unknown[] = [];
  const requests: any[] = [];
  const source = readFileSync("app/workshop/WorkshopLanding.tsx", "utf8") + "\nexport { RegistrationCard };";
  const module = { exports: {} as any };
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, {
    module, exports: module.exports, AbortController,
    require: (name: string) => name.endsWith(".css") ? { default: {} } : name === "react" ? {
      useState: (initial: unknown) => [typeof initial === "object" ? { ...registration, agreed } : initial, (state: unknown) => states.push(state)],
    } : require(name),
    window: { setTimeout, clearTimeout, location: { pathname: "/workshop", search: "?utm_source=test", assign: (url: string) => destinations.push(url) } },
    fetch: async (url: string, init: RequestInit) => { requests.push({ url, body: JSON.parse(String(init.body)) }); return response(); },
  });
  return { destinations, states, requests, submit: () => module.exports.RegistrationCard().props.onSubmit({ preventDefault() {} }) };
}

test("confirmed workshop registration navigates to the dedicated page without personal data", async () => {
  const h = harness(async () => Response.json({ ok: true }));
  await h.submit();
  assert.deepEqual(h.destinations, ["/workshop/thank-you"]);
  assert.equal(h.requests[0].url, "/api/workshop/register");
  assert.equal(h.requests[0].body.event, "Kingdom Intel Workshop - October 13, 2026");
});

for (const [label, response] of [
  ["API rejection", async () => Response.json({ ok: false }, { status: 503 })],
  ["200 without success", async () => Response.json({})],
  ["200 with false success", async () => Response.json({ ok: false })],
  ["truthy but nonboolean success", async () => Response.json({ ok: "true" })],
  ["malformed JSON", async () => new Response("not json")],
  ["network failure", async () => { throw new TypeError("network unavailable"); }],
  ["timeout", async () => { throw new DOMException("aborted", "AbortError"); }],
] as const) {
  test(`${label} keeps registration retryable and never redirects`, async () => {
    const h = harness(response);
    await h.submit();
    assert.deepEqual(h.destinations, []);
    assert.equal(h.states.at(-1), "error");
    assert.ok(h.states.every(state => typeof state === "string"), "must not clear entered form data");
  });
}

test("missing consent does not submit or redirect", async () => {
  const h = harness(async () => Response.json({ ok: true }), false);
  await h.submit();
  assert.deepEqual(h.destinations, []);
  assert.equal(h.requests.length, 0);
  assert.equal(h.states.at(-1), "error");
});
