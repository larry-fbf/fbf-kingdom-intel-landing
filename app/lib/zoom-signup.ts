// Best-effort direct registration. No durable deduplication or automatic retry.
// Native Zoom confirmation owns join-link delivery; never expose personal URLs.
export type ZoomContact = { email: string; firstName: string; lastName: string; agreed: unknown };
export type ZoomTarget = { webinarId: string; topic: string; timezone: string; occurrenceId: string; startTime: string };
export type ZoomOutcome = { status: "registered" | "pending" | "held" | "unavailable" | "not_consented" };
export type ZoomRow = { id: string; email: string; first_name?: string; last_name?: string; status: string };
export interface ZoomProvider {
  metadata(target: ZoomTarget, signal: AbortSignal): Promise<{ webinar: any; questions: any; accountMatches: boolean }>;
  page(status: string, token: string, target: ZoomTarget, signal: AbortSignal): Promise<{ total_records: number; registrants: ZoomRow[]; next_page_token: string }>;
  post(contact: ZoomContact, target: ZoomTarget, signal: AbortSignal): Promise<{ registrantId: string }>;
  get(id: string, target: ZoomTarget, signal: AbortSignal): Promise<ZoomRow>;
}
const normalize = (email: string) => email.trim().toLowerCase();

// Below the existing form's 15-second timeout; CRM runs in parallel.
export async function registerZoomSignup(contact: ZoomContact, target: ZoomTarget, provider: ZoomProvider, signal = AbortSignal.timeout(12000)): Promise<ZoomOutcome> {
  if (contact.agreed !== true) return { status: "not_consented" };
  let postAttempted = false;
  let onAbort!: () => void;
  const deadline = new Promise<ZoomOutcome>(resolve => {
    onAbort = () => resolve({ status: postAttempted ? "pending" : "unavailable" });
    signal.addEventListener("abort", onAbort, { once: true });
    if (signal.aborted) onAbort();
  });
  try {
    return await Promise.race([run(contact, target, provider, signal, () => { postAttempted = true; }), deadline]);
  } finally { signal.removeEventListener("abort", onAbort); }
}

async function run(contact: ZoomContact, target: ZoomTarget, provider: ZoomProvider, signal: AbortSignal, markPost: () => void): Promise<ZoomOutcome> {
  let postAttempted = false;
  try {
    const email = normalize(contact.email);
    if (!/^[0-9]{9,11}$/.test(target.webinarId) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !contact.firstName.trim() || !contact.lastName.trim()) return { status: "held" };
    signal.throwIfAborted();
    const { webinar: w, questions: q, accountMatches } = await provider.metadata(target, signal);
    const s = w.settings;
    if (!accountMatches || String(w.id) !== target.webinarId || w.topic !== target.topic || w.type !== 9 || w.timezone !== target.timezone ||
        s?.registration_type !== 1 || s?.approval_type !== 0 || s?.registrants_confirmation_email !== true || s?.meeting_authentication !== false || s?.close_registration !== false ||
        !Array.isArray(w.occurrences) || !w.occurrences.some((o: any) => o.occurrence_id === target.occurrenceId && o.start_time === target.startTime && o.status === "available" && Date.parse(o.start_time) > Date.now()) ||
        !Array.isArray(q.questions) || !Array.isArray(q.custom_questions) || q.custom_questions.length !== 0 ||
        q.questions.some((question: any) => question.required !== false && !["email", "first_name", "last_name"].includes(question.field_name))) return { status: "held" };
    const rows: ZoomRow[] = [];
    const ids = new Set<string>();
    let pageCount = 0;
    for (const status of ["approved", "pending", "denied"]) {
      let token = "", count = 0, expected: number | undefined;
      const tokens = new Set<string>();
      do {
        signal.throwIfAborted();
        // A resource budget, not a claim about account-level Zoom quota.
        if (++pageCount > 20) throw new Error("inventory_budget");
        const page = await provider.page(status, token, target, signal);
        if (!Number.isSafeInteger(page.total_records) || page.total_records < 0 || !Array.isArray(page.registrants) || typeof page.next_page_token !== "string") throw new Error("inventory_shape");
        expected ??= page.total_records;
        if (expected !== page.total_records) throw new Error("inventory_drift");
        for (const row of page.registrants) {
          if (typeof row.id !== "string" || !row.id || ids.has(row.id) || typeof row.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalize(row.email)) || row.status !== status) throw new Error("inventory_identity");
          ids.add(row.id); rows.push(row); count++;
        }
        token = page.next_page_token;
        if (token && tokens.has(token)) throw new Error("inventory_cycle");
        tokens.add(token);
      } while (token);
      if (count !== expected) throw new Error("inventory_incomplete");
    }
    const matches = rows.filter(row => normalize(row.email) === email);
    if (matches.length > 1 || (matches.length === 1 && matches[0].status !== "approved")) return { status: "held" };
    if (matches.length === 1) return { status: "registered" };
    signal.throwIfAborted();
    if (!(Date.parse(target.startTime) > Date.now())) return { status: "held" };
    postAttempted = true;
    markPost();
    const created = await provider.post({ ...contact, email }, target, signal);
    signal.throwIfAborted();
    const row = await provider.get(created.registrantId, target, signal);
    if (!created.registrantId || row.id !== created.registrantId || normalize(row.email) !== email || row.first_name !== contact.firstName || row.last_name !== contact.lastName || row.status !== "approved") return { status: "pending" };
    return { status: "registered" };
  } catch {
    // Pending means uncertain, NOT queued. Never issue a recovery mutation.
    return { status: postAttempted ? "pending" : "unavailable" };
  }
}
