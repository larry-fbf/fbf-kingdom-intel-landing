import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import * as postJson from "../app/lib/post-json.ts";

// Execute the actual modal with deterministic hooks; only browser/framework and
// fetch boundaries are replaced. Complemented by isolated Chromium checks.
function harness(fetcher: typeof fetch) {
  const slots: any[] = [];
  let cursor = 0;
  const events: string[] = [];
  const redirects: string[] = [];
  const hooks = {
    useState(initial: any) { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], (v: any) => { slots[i] = typeof v === "function" ? v(slots[i]) : v; }]; },
    useRef(initial: any) { const i = cursor++; return slots[i] ??= { current: initial }; },
    useEffect() {},
  };
  const jsx = (type: any, props: any) => ({ type, props });
  const source = readFileSync("app/page.tsx", "utf8") + "\nexports.TestModal = RegisterModal;";
  const module = { exports: {} as any };
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText, {
    module, exports: module.exports, Intl, Error,
    window: { sessionStorage: { setItem() {} } },
    require(id: string) {
      if (id === "react") return hooks;
      if (id === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (id === "next/navigation") return { useRouter: () => ({ push: (url: string) => redirects.push(url) }) };
      if (id === "./lib/post-json") return { ...postJson, postJsonWithTimeout: (url: string, body: unknown) => postJson.postJsonWithTimeout(url, body, fetcher, 5) };
      if (id === "./lib/clarity-events") return { trackClarityEvent: (e: string) => events.push(e) };
      if (id === "./lib/funnel-events") return { FUNNEL_EVENTS: { registrationConfirmed: "confirmed" } };
      if (id === "./lib/attribution") return { captureAttributionFromCurrentUrl() {}, getStoredAttribution: () => ({}) };
      return {};
    },
  });
  function render() { cursor = 0; return module.exports.TestModal({ onClose() {} }); }
  function nodes(root = render()): any[] { return !root || typeof root !== "object" ? [] : Array.isArray(root) ? root.flatMap(n => nodes(n)) : [root, ...nodes(root.props?.children ?? null)]; }
  function get(type: string) { return nodes().find(n => n.type === type); }
  function fill() {
    for (const [id, value] of [["registration-email", "synthetic@example.invalid"], ["registration-first-name", "Test"], ["registration-last-name", "Only"]]) {
      nodes().find(n => n.props?.id === id).props.onChange({ target: { value } });
    }
  }
  return { nodes, get, fill, events, redirects, agree: () => nodes().find(n => n.props?.type === "checkbox").props.onChange({ target: { checked: true } }), submit: () => get("form").props.onSubmit({ preventDefault() {} }) };
}

test("lost response leaves a retained, locked pending-verification form without success", async () => {
  let posts = 0;
  const h = harness(async () => { posts++; throw new TypeError("Response lost after synthetic save"); });
  h.fill(); h.agree();
  await h.submit();
  const button = h.nodes().find(n => n.props?.type === "submit");
  assert.equal(button.props.disabled, true);
  assert.match(button.props.children, /pending verification/i);
  assert.match(h.nodes().find(n => n.props?.role === "alert").props.children, /Do not resubmit/);
  assert.equal(h.nodes().find(n => n.props?.id === "registration-email").props.value, "synthetic@example.invalid");
  await h.submit();
  assert.equal(posts, 1);
  assert.equal(h.redirects.length, 0);
  assert.ok(!h.events.includes("confirmed"));
});

test("predispatch consent validation remains safely correctable", async () => {
  let posts = 0;
  const h = harness(async () => { posts++; return Response.json({ ok: true }); });
  h.fill(); await h.submit();
  assert.equal(posts, 0);
  assert.equal(h.nodes().find(n => n.props?.type === "submit").props.disabled, false);
  h.agree(); await h.submit();
  assert.equal(posts, 1);
  assert.deepEqual(h.redirects, ["/thank-you"]);
});

for (const retryable of [true, false]) {
  test(`server retryable ${retryable} controls form while preserving explanation`, async () => {
    const h = harness(async () => Response.json({ ok: false, error: "Server explanation", retryable }, { status: 503 }));
    h.fill(); h.agree(); await h.submit();
    assert.equal(h.nodes().find(n => n.props?.type === "submit").props.disabled, !retryable);
    assert.equal(h.nodes().find(n => n.props?.role === "alert").props.children, "Server explanation");
  });
}
