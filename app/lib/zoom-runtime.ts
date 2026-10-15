import { createZoomProvider } from "./zoom-provider.ts";
import { registerZoomSignup, type ZoomContact, type ZoomOutcome, type ZoomTarget } from "./zoom-signup.ts";

// Server-only configuration: no default event, public env, storage, or queue.
export async function registerWebsiteZoom(contact: ZoomContact, env: Record<string, string | undefined> = process.env): Promise<ZoomOutcome> {
  if (contact.agreed !== true) return { status: "not_consented" };
  try {
    const required = ["ZOOM_ACCOUNT_ID", "ZOOM_CLIENT_ID", "ZOOM_CLIENT_SECRET", "ZOOM_SIGNUP_TARGET"];
    if (required.some(name => !env[name])) return { status: "unavailable" };
    const target = JSON.parse(env.ZOOM_SIGNUP_TARGET!) as ZoomTarget;
    if (![target.webinarId, target.topic, target.timezone, target.occurrenceId, target.startTime].every(value => typeof value === "string" && value)) return { status: "unavailable" };
    // Date-shift binding: occurrence IDs must come from verified provider metadata,
    // never from timestamp arithmetic. Old/incomplete environment targets fail closed.
    const starts = ["2026-11-10T18:00:00Z", "2026-11-11T18:00:00Z", "2026-11-12T18:00:00Z"];
    if (target.webinarId !== "81823603475" || target.topic !== "Kingdom Intelligence Masterclass" ||
        target.timezone !== "America/Chicago" || target.startTime !== starts[2] ||
        !Array.isArray(target.occurrences) || target.occurrences.length !== starts.length ||
        target.occurrences.some((o, i) => !o || o.startTime !== starts[i] || typeof o.occurrenceId !== "string" || !o.occurrenceId.trim()) ||
        new Set(target.occurrences.map(o => o.occurrenceId)).size !== starts.length ||
        target.occurrences[2].occurrenceId !== target.occurrenceId) return { status: "unavailable" };
    const provider = createZoomProvider({ accountId: env.ZOOM_ACCOUNT_ID!, clientId: env.ZOOM_CLIENT_ID!, clientSecret: env.ZOOM_CLIENT_SECRET! });
    return await registerZoomSignup(contact, target, provider);
  } catch { return { status: "unavailable" }; }
}
