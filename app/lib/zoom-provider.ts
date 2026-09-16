import type { ZoomProvider, ZoomRow, ZoomTarget } from "./zoom-signup.ts";
export type ZoomCredentials = { accountId: string; clientId: string; clientSecret: string };
const scopes = ["webinar:write:registrant:admin", "webinar:read:webinar:admin", "webinar:read:list_registrants:admin", "webinar:read:registrant:admin", "webinar:read:list_registration_questions:admin", "user:read:user:admin"];

// Positive projection: never return raw Zoom registrant responses, even on errors.
function identity(row: any): ZoomRow {
  return { id: row.id, email: row.email, first_name: row.first_name, last_name: row.last_name, status: row.status };
}
export function createZoomProvider(credentials: ZoomCredentials, fetcher: typeof fetch = fetch): ZoomProvider {
  // Request-local token only, never persisted, logged, or shared with clients.
  let access = "";
  async function json(url: string, init: RequestInit, signal: AbortSignal) {
    try {
      signal.throwIfAborted();
      const response = await fetcher(url, { ...init, signal, redirect: "error", cache: "no-store" });
      if (!response.ok) { await response.body?.cancel(); throw new Error("provider_http"); }
      return await response.json();
    } catch { throw new Error("zoom_unavailable"); }
  }
  async function token(signal: AbortSignal) {
    if (access) return access;
    const data = await json("https://zoom.us/oauth/token", {
      method: "POST",
      headers: { Authorization: `Basic ${Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "account_credentials", account_id: credentials.accountId }),
    }, signal);
    if (typeof data.access_token !== "string" || !data.access_token || !scopes.every(scope => String(data.scope).split(" ").includes(scope))) throw new Error("zoom_scope_missing");
    access = data.access_token;
    return access;
  }
  function base(target: ZoomTarget) {
    if (!/^[0-9]{9,11}$/.test(target.webinarId)) throw new Error("invalid_webinar");
    return `https://api.zoom.us/v2/webinars/${target.webinarId}`;
  }
  async function request(url: string, signal: AbortSignal, body?: unknown) {
    return json(url, { method: body === undefined ? "GET" : "POST", headers: { Authorization: `Bearer ${await token(signal)}`, "Content-Type": "application/json" }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) }, signal);
  }
  return {
    async metadata(target, signal) {
      const raw = await request(base(target), signal);
      if (typeof raw.host_id !== "string" || !raw.host_id) throw new Error("missing_host");
      const host = await request(`https://api.zoom.us/v2/users/${encodeURIComponent(raw.host_id)}`, signal);
      const q = await request(`${base(target)}/registrants/questions`, signal);
      const s = raw.settings;
      return { accountMatches: host.account_id === credentials.accountId, questions: { questions: q.questions, custom_questions: q.custom_questions }, webinar: {
        id: raw.id, topic: raw.topic, type: raw.type, timezone: raw.timezone,
        occurrences: Array.isArray(raw.occurrences) ? raw.occurrences.map((o: any) => ({ occurrence_id: o.occurrence_id, start_time: o.start_time, status: o.status })) : null,
        settings: { registration_type: s?.registration_type, approval_type: s?.approval_type, registrants_confirmation_email: s?.registrants_confirmation_email, meeting_authentication: s?.meeting_authentication, close_registration: s?.close_registration },
      } };
    },
    async page(status, cursor, target, signal) {
      if (!["approved", "pending", "denied"].includes(status)) throw new Error("invalid_status");
      const query = new URLSearchParams({ status, page_size: "300", ...(cursor ? { next_page_token: cursor } : {}) });
      const raw = await request(`${base(target)}/registrants?${query}`, signal);
      if (!Array.isArray(raw.registrants)) throw new Error("invalid_page");
      return { total_records: raw.total_records, next_page_token: raw.next_page_token, registrants: raw.registrants.map(identity) };
    },
    async post(contact, target, signal) {
      const raw = await request(`${base(target)}/registrants`, signal, { email: contact.email, first_name: contact.firstName, last_name: contact.lastName });
      // Deliberately discard join_url. Do not add a spread/raw response here.
      if (typeof raw.registrant_id !== "string" || !raw.registrant_id) throw new Error("invalid_registration");
      return { registrantId: raw.registrant_id };
    },
    async get(id, target, signal) {
      if (!id) throw new Error("missing_registrant");
      return identity(await request(`${base(target)}/registrants/${encodeURIComponent(id)}`, signal));
    },
  };
}
