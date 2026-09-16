import assert from "node:assert/strict";
import test from "node:test";

test("real Zoom transport exchanges S2S OAuth and strips every private URL at boundary", async () => {
  const module = await import("../app/lib/zoom-provider.ts").catch(() => ({} as any));
  assert.equal(typeof module.createZoomProvider, "function");
  const calls: { url: string; init: RequestInit }[] = [];
  const target = { webinarId: "87621606558", occurrenceId: "not-sent", topic: "Test", timezone: "America/Chicago", startTime: "2099-01-01T17:00:00Z" };
  const fetcher = async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    assert.equal(init.redirect, "error"); assert.equal(init.cache, "no-store"); assert.ok(init.signal);
    if (url === "https://zoom.us/oauth/token") return Response.json({ access_token: "fixture-access", scope: "webinar:write:registrant:admin webinar:read:webinar:admin webinar:read:list_registrants:admin webinar:read:registrant:admin webinar:read:list_registration_questions:admin user:read:user:admin", expires_in: 3600 });
    if (url.includes("/users/")) return Response.json({ account_id: "fixture-account" });
    if (url.endsWith("/questions")) return Response.json({ questions: [], custom_questions: [] });
    const privateData = { join_url: "https://example.invalid/private-do-not-save", tracking_url: "private-do-not-save", id: "rid", email: "alex@example.invalid", first_name: "Alex", last_name: "Rivera", status: "approved" };
    if (init.method === "POST") return Response.json({ ...privateData, registrant_id: "rid" });
    if (url.includes("/registrants?")) return Response.json({ total_records: 1, registrants: [privateData], next_page_token: "" });
    if (url.endsWith("/registrants/rid")) return Response.json(privateData);
    return Response.json({ id: 87621606558, host_id: "host", settings: {}, occurrences: [] });
  };
  const provider = module.createZoomProvider({ accountId: "fixture-account", clientId: "fixture-client", clientSecret: "fixture-secret" }, fetcher);
  const signal = AbortSignal.timeout(10000);
  const m = await provider.metadata(target, signal);
  assert.equal(m.accountMatches, true);
  const p = await provider.page("denied", "cursor", target, signal);
  const r = await provider.post({ email: "alex@example.invalid", firstName: "Alex", lastName: "Rivera", agreed: true }, target, signal);
  const g = await provider.get("rid", target, signal);
  assert.equal(JSON.stringify({ m, p, r, g }).includes("private-do-not-save"), false);
  assert.deepEqual(r, { registrantId: "rid" });
  assert.equal(calls.filter(c => c.url === "https://zoom.us/oauth/token").length, 1);
  const post = calls.find(c => c.init.method === "POST" && c.url.includes("/registrants"))!;
  assert.equal(post.url, "https://api.zoom.us/v2/webinars/87621606558/registrants");
  assert.deepEqual(JSON.parse(String(post.init.body)), { email: "alex@example.invalid", first_name: "Alex", last_name: "Rivera" });
  assert.ok(calls.some(c => c.url.includes("status=denied") && c.url.includes("next_page_token=cursor")));
  const failed = module.createZoomProvider({ accountId: "fixture-account", clientId: "fixture-client", clientSecret: "fixture-secret" }, async () => Response.json({ message: "private-do-not-save" }, { status: 429 }));
  await assert.rejects(failed.page("approved", "", target, signal), (e: Error) => !e.message.includes("private-do-not-save"));
});
