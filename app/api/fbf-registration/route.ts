import { NextRequest, NextResponse } from 'next/server';
import { EVENT_STARTS } from '../../lib/event-time';
import { createHash, createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { POST as register } from '../register/route';
import { getRegistrationConfirmationSecret, REGISTRATION_CONFIRMATION_COOKIE, verifyRegistrationConfirmation } from '../../lib/registration-confirmation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ENDPOINT = 'https://www.kingdomintel.com/api/fbf-registration';
const DASHBOARD = '/dashboard#bonus-heading';
const safetyHeaders = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
};

const PENDING = 'kim_fbf_pending';
const pendingOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/api/fbf-registration', maxAge: 300 };
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const mac = (value: string, secret: string) => createHmac('sha256', secret).update(`kim-fbf-handoff-v1:${value}`).digest('hex');
function pendingProof(confirmation: string, secret: string) {
  const payload = `${Date.now()}.${randomUUID()}.${digest(confirmation)}`;
  return `${payload}.${mac(payload, secret)}`;
}
function validPending(pending: string, confirmation: string, secret: string) {
  const match = /^(\d{13})\.([a-f0-9-]{36})\.([a-f0-9]{64})\.([a-f0-9]{64})$/.exec(pending);
  if (!match || !verifyRegistrationConfirmation(confirmation, secret)) return false;
  const [, timestamp, nonce, binding, signature] = match;
  const age = Date.now() - Number(timestamp);
  return age >= 0 && age <= 300_000 && binding === digest(confirmation) &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(mac(`${timestamp}.${nonce}.${binding}`, secret)));
}
function htmlResponse(content: string, status = 200, script = '') {
  const hash = createHash('sha256').update(script).digest('base64');
  const csp = `default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; script-src ${script ? `'sha256-${hash}'` : "'none'"}`;
  return new NextResponse(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Kingdom Intelligence registration</title></head><body><main>${content}</main>${script ? `<script>${script}</script>` : ''}</body></html>`, {
    status, headers: { ...safetyHeaders, 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': csp },
  });
}
function complete(req: NextRequest) {
  const confirmation = req.cookies.get(REGISTRATION_CONFIRMATION_COOKIE)?.value || '';
  const pending = req.cookies.get(PENDING)?.value || '';
  const verified = validPending(pending, confirmation, getRegistrationConfirmationSecret());
  // Only this server-verified branch can render marker-setting code. The opaque
  // per-registration key also prevents cached/Back script re-execution rearming.
  const script = verified ? `(() => {\n  try {\n    const key = "kim_fbf_consumed_${digest(confirmation)}";\n    if (sessionStorage.getItem(key) !== "true") {\n      sessionStorage.setItem(key, "true");\n      sessionStorage.setItem("kim_registration_confirmed", "true");\n      sessionStorage.setItem("kim_registration_welcome", "true");\n    }\n  } catch {\n    try { sessionStorage.removeItem("kim_registration_confirmed"); sessionStorage.removeItem("kim_registration_welcome"); } catch {}\n  }\n  location.replace("/dashboard#bonus-heading");\n})();` : '';
  const response = htmlResponse(verified
    ? `<h1>Registration confirmed</h1><p>Opening your dashboard.</p><a href="${DASHBOARD}">Continue to the dashboard</a>`
    : `<h1>Confirmation unavailable</h1><p>This handoff has already been used or could not be verified. Check your email or contact support before submitting again.</p><a href="${DASHBOARD}">Open the dashboard</a>`, verified ? 200 : 400, script);
  response.cookies.set(PENDING, '', { ...pendingOptions, maxAge: 0 });
  return response;
}

const ALLOWED_ORIGINS = new Set([
  'https://fbfwebsite-git-review-fbf-team-preview-2026-11-18-paytonwallace.vercel.app',
  'https://fueledbyfire.com',
  'https://www.fueledbyfire.com',
]);
const FIELD_LIMITS: Record<string, number> = { email: 254, firstName: 100, lastName: 100, phone: 64, timeZone: 64, agreed: 2, website: 0 };
class InputError extends Error {
  constructor(public status: number) { super('Invalid registration form'); }
}
async function readFields(req: NextRequest) {
  const mode = req.headers.get('sec-fetch-mode');
  const destination = req.headers.get('sec-fetch-dest');
  if (!ALLOWED_ORIGINS.has(req.headers.get('origin') || '') || (mode && mode !== 'navigate') || (destination && destination !== 'document')) throw new InputError(403);
  if (!/^application\/x-www-form-urlencoded(?:\s*;\s*charset=utf-8)?$/i.test(req.headers.get('content-type') || '')) throw new InputError(415);
  const declaredLength = req.headers.get('content-length');
  if (declaredLength && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > 8192)) throw new InputError(413);
  // Do not call text()/formData() before enforcing the actual streaming byte cap.
  const reader = req.body?.getReader();
  if (!reader) throw new InputError(400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) {
        await reader.cancel();
        throw new InputError(413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const text = new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks));
  if (/%(?![a-f0-9]{2})/i.test(text)) throw new InputError(400);
  const fields = new URLSearchParams(text);
  const seen = new Set<string>();
  for (const [name, value] of fields) {
    if (!Object.hasOwn(FIELD_LIMITS, name) || seen.has(name) || value.length > FIELD_LIMITS[name] || /[\u0000-\u001f\u007f]/.test(value)) throw new InputError(400);
    seen.add(name);
  }
  const payload = Object.fromEntries(['email', 'firstName', 'lastName', 'phone', 'timeZone'].map(name => [name, (fields.get(name) || '').trim()]));
  if (!/^\S+@\S+\.\S+$/.test(payload.email) || !payload.firstName || !payload.lastName || fields.get('agreed') !== 'on') throw new InputError(400);
  return { ...payload, agreed: true };
}

export async function POST(req: NextRequest) {
  let payload;
  try { payload = await readFields(req); } catch (error) {
    return htmlResponse('<h1>Please correct your registration</h1><p>Your information was not submitted. Use your browser’s Back button to return to the FBF form, check the required fields and consent, and correct your information.</p>', error instanceof InputError ? error.status : 400);
  }
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const zone = req.headers.get('x-vercel-ip-timezone');
  if (zone) headers.set('x-vercel-ip-timezone', zone);
  try {
    // One in-process invocation of the unchanged route. Never fetch our own API,
    // duplicate provider logic, retry, or interpret a degraded acceptance anew.
    const result = await register(new NextRequest('https://www.kingdomintel.com/api/register', {
      method: 'POST', headers, body: JSON.stringify(payload),
    }));
    const body = await result.json();
    const cookie = result.cookies.get(REGISTRATION_CONFIRMATION_COOKIE);
    const secret = getRegistrationConfirmationSecret();
    if (!result.ok || body?.ok !== true || !cookie || !verifyRegistrationConfirmation(cookie.value, secret) || cookie.value.split('.')[1] !== body.registrationId) {
      return uncertainRedirect();
    }
    const response = safeRedirect(`${ENDPOINT}?complete=1`);
    response.cookies.set(cookie);
    response.cookies.set(PENDING, pendingProof(cookie.value, secret), pendingOptions);
    return response;
  } catch {
    // Dispatch may already have written. Do not expose provider diagnostics or
    // leave a POST error document whose refresh can resubmit the registration.
    return uncertainRedirect();
  }
}
function safeRedirect(destination: string) {
  const response = NextResponse.redirect(destination, 303);
  for (const [name, value] of Object.entries(safetyHeaders)) response.headers.set(name, value);
  return response;
}
function uncertainRedirect() {
  const response = safeRedirect(`${ENDPOINT}?error=uncertain`);
  response.cookies.set(PENDING, '', { ...pendingOptions, maxAge: 0 });
  return response;
}

// Next otherwise aliases HEAD to GET, which would consume the pending cookie.
export async function HEAD() {
  return new NextResponse(null, { headers: safetyHeaders });
}

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.has('error')) return htmlResponse('<h1>Confirmation unavailable</h1><p>We could not confirm registration. Please check your email or contact support before submitting again. Do not submit again until your registration status is confirmed.</p>', 503);
  if (req.nextUrl.searchParams.get('complete') === '1') return complete(req);
  return NextResponse.json({
    eventName: 'Kingdom Intelligence Masterclass',
    start: EVENT_STARTS.regular[0],
    end: EVENT_STARTS.regular[EVENT_STARTS.regular.length - 1],
    registrationUrl: ENDPOINT,
    dashboardUrl: `https://www.kingdomintel.com${DASHBOARD}`,
    // Kept byte-for-byte in sync by the homepage consent contract test.
    consent: 'By checking this box, I consent to receive text messages from Fueled By Fire, LLC about event reminders and customer care updates. Reply STOP to opt out at any time. Reply HELP for assistance. Msg & data rates may apply. Message frequency varies.',
    privacyUrl: 'https://www.fbfchallenge.com/privacy',
    termsUrl: 'https://www.fbfchallenge.com/terms',
  }, { headers: { ...safetyHeaders, 'Access-Control-Allow-Origin': '*' } });
}
