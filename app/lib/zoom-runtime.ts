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
    const provider = createZoomProvider({ accountId: env.ZOOM_ACCOUNT_ID!, clientId: env.ZOOM_CLIENT_ID!, clientSecret: env.ZOOM_CLIENT_SECRET! });
    return await registerZoomSignup(contact, target, provider);
  } catch { return { status: "unavailable" }; }
}
