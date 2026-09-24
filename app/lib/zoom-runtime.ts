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
    // Pin runtime configuration to the independently verified November series.
    // Stale September environment values must never enroll the wrong event.
    if (target.webinarId !== "81823603475" || target.topic !== "Kingdom Intelligence Masterclass" || target.timezone !== "America/Chicago" || target.occurrenceId !== "1793901600000" || target.startTime !== "2026-11-05T18:00:00Z") return { status: "unavailable" };
    const provider = createZoomProvider({ accountId: env.ZOOM_ACCOUNT_ID!, clientId: env.ZOOM_CLIENT_ID!, clientSecret: env.ZOOM_CLIENT_SECRET! });
    return await registerZoomSignup(contact, { ...target, occurrences: [
      { occurrenceId: "1793728800000", startTime: "2026-11-03T18:00:00Z" },
      { occurrenceId: "1793815200000", startTime: "2026-11-04T18:00:00Z" },
      { occurrenceId: "1793901600000", startTime: "2026-11-05T18:00:00Z" },
    ] }, provider);
  } catch { return { status: "unavailable" }; }
}
