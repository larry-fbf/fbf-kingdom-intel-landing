import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import vm from "node:vm";
import ts from "typescript";
const require = createRequire(import.meta.url);

for (const scenario of ['new', 'existing', 'pending', 'uncertain', 'unavailable']) {
test(`actual route + direct runtime + provider: ${scenario}, without private links`, async () => {

    const target = { webinarId: "87621606558", topic: "Fixture event", timezone: "America/Chicago", occurrenceId: "fixture", startTime: "2099-01-01T17:00:00Z" };
    const env = { ATTIO_API_KEY: "fixture", BREVO_API_KEY: "fixture", SIMPLETEXTING_API_KEY: "fixture", REGISTRATION_CONFIRMATION_SECRET: "fixture-confirmation-secret", NODE_ENV: "production", ZOOM_ACCOUNT_ID: "fixture", ZOOM_CLIENT_ID: "fixture", ZOOM_CLIENT_SECRET: "fixture", ZOOM_SIGNUP_TARGET: JSON.stringify(target) };
    const calls: { url: string; method: string; body: any }[] = [], logs: unknown[] = [];
    let registered = scenario === 'existing' || scenario === 'pending';
    const row = { id: "rid", email: "alex@example.invalid", first_name: "Alex", last_name: "Rivera", status: "approved", join_url: "https://example.invalid/PRIVATE_JOIN_SENTINEL" };
    const fetch = async (url: string, init: RequestInit = {}) => {
      const method = init.method || "GET";
      const body = init.body instanceof URLSearchParams ? Object.fromEntries(init.body) : init.body ? JSON.parse(String(init.body)) : null;
      calls.push({ url, method, body });
      if (url.includes("api.attio.com")) return Response.json({ data: { id: { record_id: "person" } } });
      if (url.includes("api.brevo.com")) return Response.json({});
      if (url.includes("simpletexting.com")) return Response.json({ code: 1 });
      if (url === "https://zoom.us/oauth/token") return Response.json({ access_token: "fixture-token", scope: "webinar:write:registrant:admin webinar:read:webinar:admin webinar:read:list_registrants:admin webinar:read:registrant:admin webinar:read:list_registration_questions:admin user:read:user:admin" });
      if (url.includes("/users/")) return Response.json({ account_id: "fixture" });
      if (url.endsWith("/questions")) return Response.json({ questions: [{ field_name: "last_name", required: true }], custom_questions: [] });
      if (url.endsWith("/registrants") && method === "POST") {
        if (scenario === 'uncertain') throw Error('PRIVATE_JOIN_SENTINEL');
        registered = true; return Response.json({ registrant_id: "rid", join_url: row.join_url });
      }
      if (url.endsWith("/registrants/rid")) return Response.json(row);
      if (url.includes("/registrants?")) {
        if (scenario === 'unavailable') return Response.json({ message: 'PRIVATE_JOIN_SENTINEL' }, { status: 429 });
        const status = scenario === 'pending' ? 'pending' : 'approved';
        const rows = registered && url.includes(`status=${status}`) ? [{ ...row, status }] : [];
        return Response.json({ total_records: rows.length, registrants: rows, next_page_token: "" });
      }
      if (url === "https://api.zoom.us/v2/webinars/87621606558") return Response.json({ id: 87621606558, host_id: "host", topic: target.topic, timezone: target.timezone, type: 9, occurrences: [{ occurrence_id: target.occurrenceId, start_time: target.startTime, status: "available" }], settings: { registration_type: 1, approval_type: 0, registrants_confirmation_email: true, meeting_authentication: false, close_registration: false } });
      throw Error("unexpected network blocked");
    };
    function load(file: string): any {
      const module = { exports: {} };
      const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
      vm.runInNewContext(code, { module, exports: module.exports, require: (id: string) => {
        return id.startsWith(".") ? load(resolve(dirname(file), id.endsWith(".ts") ? id : id + ".ts")) : require(id);
      }, process: { env }, fetch, URL, Response, Headers, URLSearchParams, AbortSignal, AbortController, crypto, Buffer, setTimeout, clearTimeout, console: { error: (...args: unknown[]) => logs.push(args), warn: (...args: unknown[]) => logs.push(args) } }, { filename: file });
      return module.exports;
    }
    const route = load(resolve("app/api/register/route.ts"));
    const payload = { email: "alex@example.invalid", firstName: "Alex", lastName: "Rivera", agreed: true, phone: "3122346789" };
    const response = await route.POST(new Request("https://fixture.invalid/api/register", { method: "POST", body: JSON.stringify(payload) }));
    const result = await response.json();
    const expected = ({ new: 'registered', existing: 'registered', pending: 'held', uncertain: 'pending', unavailable: 'unavailable' } as Record<string, string>)[scenario];
    assert.equal(response.status, 200); assert.equal(result.ok, true); assert.equal(result.zoom.status, expected); assert.equal(result.degraded, expected !== 'registered');
    assert.equal(result.retryable, undefined);
    assert.equal(calls.filter(c => c.url.includes("brevo.com")).length, 1);
    assert.equal(calls.filter(c => c.url.includes("simpletexting.com")).length, 1);
    assert.equal(calls.filter(c => c.method === "POST" && c.url.endsWith("/registrants")).length, ['new', 'uncertain'].includes(scenario) ? 1 : 0);
    assert.equal(JSON.stringify([logs, result, calls]).includes("PRIVATE_JOIN_SENTINEL"), false);
});
}
