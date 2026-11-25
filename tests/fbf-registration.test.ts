import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { EVENT_STARTS } from '../app/lib/event-time.ts';
import { signRegistrationConfirmation, REGISTRATION_CONFIRMATION_COOKIE } from '../app/lib/registration-confirmation.ts';

const registrationId = '11111111-1111-4111-8111-111111111111';
const form = { email: 'synthetic@customer.invalid', firstName: 'Synthetic', lastName: 'Test', agreed: 'on', phone: '', timeZone: 'America/Chicago', website: '' };
function postRequest(fields = form, headers: Record<string, string> = {}) {
  return new NextRequest(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/x-www-form-urlencoded', 'Sec-Fetch-Mode': 'navigate', 'Sec-Fetch-Dest': 'document', ...headers }, body: new URLSearchParams(fields) });
}
function success() {
  const response = NextResponse.json({ ok: true, registrationId });
  response.cookies.set(REGISTRATION_CONFIRMATION_COOKIE, signRegistrationConfirmation(registrationId, secret), { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 3600 });
  return response;
}
function requestCookies(response: any) { return response.cookies.getAll().map((cookie: any) => `${cookie.name}=${cookie.value}`).join('; '); }


const require = createRequire(import.meta.url);
const { NextRequest, NextResponse } = require('next/server');
const origin = 'https://fueledbyfire.com';
const url = 'https://www.kingdomintel.com/api/fbf-registration';
const secret = 'synthetic-fbf-test-secret-not-for-deployment';
function harness(register = async (_req: Request) => NextResponse.json({ ok: false }, { status: 503 })) {
  const calls: Request[] = [];
  function load(file: string): any {
    if (file.endsWith('/api/register/route.ts')) return { POST: async (req: Request) => { calls.push(req); return register(req); } };
    const module = { exports: {} };
    const code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(code, { module, exports: module.exports, require: (id: string) => id.startsWith('.') ? load(resolve(dirname(file), id + '.ts')) : require(id), process: { env: { NODE_ENV: 'production', REGISTRATION_CONFIRMATION_SECRET: secret } }, Response, Request, Headers, URL, URLSearchParams, TextDecoder, Buffer, crypto, console, fetch: () => { throw new Error('Network forbidden'); } }, { filename: file });
    return module.exports;
  }
  const path = resolve('app/api/fbf-registration/route.ts');
  assert.ok(existsSync(path), 'production FBF route must exist');
  return { route: load(path), calls, load };
}

test('build guard includes the new API and HEAD cannot consume a handoff', async () => {
  assert.ok(readFileSync('scripts/verify-critical-routes.mjs', 'utf8').includes('"/api/fbf-registration"'));
  const h = harness();
  assert.equal(typeof h.route.HEAD, 'function');
  const response = await h.route.HEAD(new NextRequest(`${url}?complete=1`));
  assert.equal(response.headers.get('set-cookie'), null);
  assert.equal(await response.text(), '');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});

test('public contract uses the same live event instants and exact existing consent, with public credential-free CORS', async () => {
  const h = harness();
  const response = await h.route.GET(new NextRequest(url));
  const body = await response.json();
  assert.deepEqual(Object.keys(body).sort(), ['eventName', 'start', 'end', 'registrationUrl', 'dashboardUrl', 'consent', 'privacyUrl', 'termsUrl'].sort());
  assert.equal(body.eventName, 'Kingdom Intelligence Masterclass');
  assert.equal(body.start, EVENT_STARTS.regular[0]);
  assert.equal(body.end, EVENT_STARTS.regular.at(-1));
  assert.equal(body.registrationUrl, url);
  assert.equal(body.dashboardUrl, 'https://www.kingdomintel.com/dashboard#bonus-heading');
  const homepage = readFileSync('app/page.tsx', 'utf8');
  assert.ok(homepage.includes(body.consent.replace('&', '&amp;')));
  for (const key of ['privacyUrl', 'termsUrl']) assert.ok(homepage.includes(body[key]));
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), '*');
  assert.equal(response.headers.get('Access-Control-Allow-Credentials'), null);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(h.calls.length, 0);
});

test('native POST dispatches existing handler once, preserves its cookie, and first-party GET consumes a signed pending handoff', async () => {
  const registered = success();
  const h = harness(async () => registered);
  assert.equal(typeof h.route.POST, 'function', 'native POST must be implemented');
  const response = await h.route.POST(postRequest());
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), `${url}?complete=1`);
  assert.equal(h.calls.length, 1);
  assert.ok(h.calls[0] instanceof NextRequest);
  assert.deepEqual(await h.calls[0].json(), { email: form.email, firstName: form.firstName, lastName: form.lastName, agreed: true, phone: '', timeZone: 'America/Chicago' });
  assert.ok(response.headers.getSetCookie().includes(registered.headers.get('set-cookie')), 'forward the genuine original cookie');
  const pending = response.cookies.get('kim_fbf_pending');
  assert.ok(pending?.value);
  assert.equal(pending.httpOnly, true);
  assert.equal(pending.secure, true);
  assert.equal(pending.sameSite, 'lax');
  assert.equal(pending.path, '/api/fbf-registration');
  const complete = await h.route.GET(new NextRequest(`${url}?complete=1`, { headers: { Cookie: requestCookies(response) } }));
  assert.equal(complete.status, 200);
  assert.equal(complete.cookies.get('kim_fbf_pending').maxAge, 0);
  const html = await complete.text();
  assert.match(html, /kim_registration_confirmed/);
  assert.match(html, /kim_registration_welcome/);
  assert.match(html, /location\.replace\("\/dashboard#bonus-heading"\)/);
  assert.ok(!html.includes(form.email));
  assert.ok(!html.includes(pending.value));
  assert.equal(complete.headers.get('Access-Control-Allow-Origin'), null);
  assert.equal(complete.headers.get('Cache-Control'), 'no-store');
  assert.equal(complete.headers.get('Referrer-Policy'), 'no-referrer');
  assert.equal(complete.headers.get('X-Frame-Options'), 'DENY');
  assert.equal(complete.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.match(complete.headers.get('X-Robots-Tag'), /noindex/);
  assert.match(complete.headers.get('Content-Security-Policy'), /script-src 'sha256-/);
});

for (const kind of ['throw', 'http-failure', 'ok-false', 'malformed', 'missing-cookie', 'forged', 'expired', 'wrong-id']) {
  test(`uncertain ${kind} never sets success and redirects to a safe non-resubmitting error GET`, async () => {
    const h = harness(async () => {
      if (kind === 'throw') throw new Error('PRIVATE provider detail');
      if (kind === 'malformed') return new NextResponse('PRIVATE bad json');
      const response = NextResponse.json({ ok: kind !== 'ok-false', registrationId: kind === 'wrong-id' ? 'other' : registrationId }, { status: kind === 'http-failure' ? 503 : 200 });
      if (kind !== 'missing-cookie') response.cookies.set(REGISTRATION_CONFIRMATION_COOKIE,
        kind === 'forged' ? 'forged' : signRegistrationConfirmation(registrationId, secret, kind === 'expired' ? Date.now() - 3600001 : Date.now()), { path: '/', httpOnly: true });
      return response;
    });
    const result = await h.route.POST(postRequest());
    assert.equal(h.calls.length, 1, 'no automatic retries');
    assert.equal(result.status, 303);
    assert.equal(result.headers.get('location'), `${url}?error=uncertain`);
    assert.equal(result.cookies.get(REGISTRATION_CONFIRMATION_COOKIE), undefined);
    assert.equal(result.cookies.get('kim_fbf_pending')?.maxAge, 0);
    const error = await h.route.GET(new NextRequest(result.headers.get('location')));
    assert.equal(error.status, 503);
    const html = await error.text();
    assert.match(html, /check your email or contact support/i);
    assert.match(html, /Do not submit again/);
    assert.doesNotMatch(html, /<script|PRIVATE|kim_registration_/);
  });
}

test('completion rejects missing, forged, expired, mismatched and consumed proofs without marker code', async () => {
  const h = harness(async () => success());
  const posted = await h.route.POST(postRequest());
  const pending = posted.cookies.get('kim_fbf_pending').value;
  const confirmation = posted.cookies.get(REGISTRATION_CONFIRMATION_COOKIE).value;
  const other = signRegistrationConfirmation('22222222-2222-4222-8222-222222222222', secret);
  const { createHmac } = require('node:crypto');
  const parts = pending.split('.'); parts[0] = String(Date.now() - 300001);
  const expiredPayload = parts.slice(0, 3).join('.');
  const expiredPending = `${expiredPayload}.${createHmac('sha256', secret).update(`kim-fbf-handoff-v1:${expiredPayload}`).digest('hex')}`;
  for (const cookie of ['', `${REGISTRATION_CONFIRMATION_COOKIE}=${confirmation}`, `kim_fbf_pending=${pending}`, `kim_fbf_pending=${pending}; ${REGISTRATION_CONFIRMATION_COOKIE}=${other}`, `kim_fbf_pending=${pending.slice(0, -1)}x; ${REGISTRATION_CONFIRMATION_COOKIE}=${confirmation}`, `kim_fbf_pending=${expiredPending}; ${REGISTRATION_CONFIRMATION_COOKIE}=${confirmation}`]) {
    const response = await h.route.GET(new NextRequest(`${url}?complete=1&redirect=https://evil.invalid`, { headers: { Cookie: cookie } }));
    assert.equal(response.status, 400);
    assert.equal(response.cookies.get('kim_fbf_pending').maxAge, 0);
    assert.doesNotMatch(await response.text(), /<script|kim_registration_|evil.invalid|Registration confirmed/);
  }
});

test('verified bridge is per-registration consumed, fails closed with restricted storage, and only uses a fixed destination', async () => {
  const h = harness(async () => success());
  const post = await h.route.POST(postRequest());
  const response = await h.route.GET(new NextRequest(`${url}?complete=1`, { headers: { Cookie: requestCookies(post) } }));
  const html = await response.text();
  const script = html.match(/<script>([\s\S]*?)<\/script>/)![1];
  const { createHash } = require('node:crypto');
  assert.ok(response.headers.get('Content-Security-Policy').includes(createHash('sha256').update(script).digest('base64')));
  const stored = new Map<string, string>();
  let navigations = 0;
  const context = { sessionStorage: { getItem: (k: string) => stored.get(k), setItem: (k: string, v: string) => stored.set(k, v), removeItem: (k: string) => stored.delete(k) }, location: { replace: (to: string) => { assert.equal(to, '/dashboard#bonus-heading'); navigations++; } } };
  vm.runInNewContext(script, context);
  assert.equal(stored.get('kim_registration_confirmed'), 'true');
  assert.equal(stored.get('kim_registration_welcome'), 'true');
  stored.delete('kim_registration_confirmed'); stored.delete('kim_registration_welcome');
  vm.runInNewContext(script, context);
  assert.equal(stored.has('kim_registration_confirmed'), false);
  assert.equal(stored.has('kim_registration_welcome'), false);
  assert.equal(navigations, 2);
  for (const failing of ['getItem', 'setItem']) {
    const isolated = new Map();
    vm.runInNewContext(script, { ...context, sessionStorage: { getItem: () => { if (failing === 'getItem') throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); }, removeItem: (k: string) => isolated.delete(k) } });
    assert.equal(isolated.size, 0);
  }
});


for (const badOrigin of ['', 'null', 'http://fueledbyfire.com', 'https://fueledbyfire.com/', 'https://fueledbyfire.com.evil.invalid', 'https://www.kingdomintel.com']) {
  test(`rejects unapproved exact Origin before dispatch: ${badOrigin}`, async () => {
    const h = harness(async () => success());
    const result = await h.route.POST(postRequest(form, { Origin: badOrigin }));
    assert.equal(result.status, 403);
    assert.equal(h.calls.length, 0);
    assert.equal(result.cookies.get(REGISTRATION_CONFIRMATION_COOKIE), undefined);
    assert.ok(!(await result.text()).includes(badOrigin || 'null'));
  });
}
for (const approved of ['https://fueledbyfire.com', 'https://www.fueledbyfire.com', 'https://fbfwebsite-git-review-fbf-team-preview-2026-11-18-paytonwallace.vercel.app']) {
  test(`accepts approved native form origin: ${approved}`, async () => {
    const h = harness(async () => success());
    assert.equal((await h.route.POST(postRequest(form, { Origin: approved }))).status, 303);
    assert.equal(h.calls.length, 1);
  });
}
for (const [name, value] of Object.entries({ email: 'not-email', firstName: ' ', lastName: '', agreed: 'true', website: 'bot', phone: 'x'.repeat(65), timeZone: 'x'.repeat(65) })) {
  test(`invalid ${name} rejects before dispatch and offers correction, without reflecting input`, async () => {
    const h = harness(async () => success());
    const result = await h.route.POST(postRequest({ ...form, [name]: value }));
    assert.equal(result.status, 400);
    assert.equal(h.calls.length, 0);
    const html = await result.text();
    assert.match(html, /not submitted/);
    assert.match(html, /correct/i);
    assert.doesNotMatch(html, /kim_registration_confirmed|synthetic@customer/);
  });
}
for (const [label, body, extraHeaders, status] of [
  ['duplicate', new URLSearchParams(form).toString() + '&email=second%40customer.invalid', {}, 400],
  ['unknown', new URLSearchParams(form).toString() + '&redirect=https://evil.invalid', {}, 400],
  ['oversize', 'email=' + 'x'.repeat(8193), {}, 413],
  ['lying size', 'email=' + 'x'.repeat(8193), { 'Content-Length': '1' }, 413],
  ['json', JSON.stringify(form), { 'Content-Type': 'application/json' }, 415],
  ['fetch', new URLSearchParams(form).toString(), { 'Sec-Fetch-Mode': 'cors' }, 403],
  ['iframe', new URLSearchParams(form).toString(), { 'Sec-Fetch-Dest': 'iframe' }, 403],
] as const) {
  test(`${label} is bounded/rejected before dispatch`, async () => {
    const h = harness(async () => success());
    const result = await h.route.POST(new NextRequest(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/x-www-form-urlencoded', ...extraHeaders }, body }));
    assert.equal(result.status, status);
    assert.equal(h.calls.length, 0);
    assert.equal(result.headers.get('Access-Control-Allow-Origin'), null);
  });
}
