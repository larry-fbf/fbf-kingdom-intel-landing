// Offline synthetic acceptance. No application POST or external request escapes
// interception; the actual compiled GET bridge and dashboard run on loopback.
// Start the built app with ONLY the synthetic secret below (never service keys).
// PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node scripts/test-fbf-handoff-browser.mjs
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { createHmac } from 'node:crypto';

const base = process.env.FBF_TEST_BASE || 'http://127.0.0.1:3217';
assert.ok(['127.0.0.1', 'localhost'].includes(new URL(base).hostname), 'loopback only');
const output = resolve(process.env.FBF_TEST_OUTPUT || '../browser-evidence');
mkdirSync(output, { recursive: true });
const playwright = process.env.PLAYWRIGHT_MODULE;
assert.ok(playwright, 'Set PLAYWRIGHT_MODULE to the locally installed Playwright index.mjs');
const { chromium } = await import(playwright);
const require = createRequire(import.meta.url);
const { NextRequest, NextResponse } = require('next/server');
const secret = 'synthetic-fbf-test-secret-not-for-deployment';
const ki = base; // Real loopback origin: redirected browser requests must never reach a live host.
const endpoint = `${ki}/api/fbf-registration`;
let dispatches = 0;
let failProvider = false;
let interceptedPosts = 0;
function load(file) {
  if (file.endsWith('/api/register/route.ts')) return { POST: async () => {
    dispatches++;
    if (failProvider) throw new Error('synthetic uncertain dispatch');
    const id = crypto.randomUUID();
    const payload = `${Date.now()}.${id}`;
    const proof = `${payload}.${createHmac('sha256', secret).update(payload).digest('base64url')}`;
    const response = NextResponse.json({ ok: true, registrationId: id, degraded: true });
    response.cookies.set('kim_registration_confirmation', proof, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 3600 });
    return response;
  } };
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require: id => id.startsWith('.') ? load(resolve(dirname(file), id + '.ts')) : require(id), process: { env: { NODE_ENV: 'production', REGISTRATION_CONFIRMATION_SECRET: secret } }, Response, Request, Headers, URL, URLSearchParams, TextDecoder, Buffer, crypto, console, fetch: () => { throw new Error('Network forbidden in handler'); } }, { filename: file });
  return module.exports;
}
const route = load(resolve('app/api/fbf-registration/route.ts'));
const formHtml = `<!doctype html><meta charset="utf-8"><title>Synthetic FBF test form</title><h1>Synthetic FBF registration — offline test</h1><form method="post" action="${endpoint}"><input name="email" type="email" required value="synthetic@customer.invalid"><input name="firstName" required value="Synthetic"><input name="lastName" required value="Test"><input name="phone"><input name="timeZone" type="hidden" value="America/Chicago"><input name="website" tabindex="-1" hidden><label><input name="agreed" type="checkbox" required><span id="consent"></span></label><button type="submit">Register synthetic fixture</button></form><script>fetch(${JSON.stringify(endpoint)}, {credentials:'omit'}).then(r=>r.json()).then(data=>{document.querySelector('#consent').textContent=data.consent;document.body.dataset.start=data.start;document.body.dataset.ready='true'});</script>`;
const browser = await chromium.launch({ headless: true, timeout: 20000, args: ['--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost'], ...(process.env.FBF_TEST_CHROME ? { executablePath: process.env.FBF_TEST_CHROME } : {}) });
const results = [];
const acceptanceFailures = [];
async function fulfill(response, interception) {
  const headers = Object.fromEntries(response.headers.entries());
  delete headers['content-encoding']; delete headers['content-length']; delete headers['transfer-encoding'];
  if (response.headers.getSetCookie().length) headers['set-cookie'] = response.headers.getSetCookie().join('\n');
  return interception.fulfill({ status: response.status, headers, body: Buffer.from(await response.arrayBuffer()) });
}
async function contextFor(viewport) {
  const context = await browser.newContext({ viewport, serviceWorkers: 'block' });
  const errors = [];
  context.on('page', page => page.on('pageerror', error => errors.push(String(error))));
  await context.addInitScript(() => {
    window.fbq = (...args) => {
      if (args[0] === 'track' && args[1] === 'CompleteRegistration') {
        sessionStorage.setItem('synthetic_conversion_count', String(Number(sessionStorage.getItem('synthetic_conversion_count') || 0) + 1));
      }
    };
  });
  await context.route('**/*', async interception => {
    const request = interception.request();
    const target = new URL(request.url());
    if (request.url() === 'https://fueledbyfire.com/' && request.method() === 'GET') return interception.fulfill({ contentType: 'text/html', body: formHtml });
    if (target.origin !== ki) return interception.abort();
    if (target.pathname === '/api/fbf-registration' && request.method() === 'POST') {
      interceptedPosts++;
      const browserHeaders = await request.allHeaders();
      // HTTPS virtual form -> HTTP loopback is a test-only downgrade: Chromium
      // sends Origin:null. Rebind only this synthetic request to the fixture's
      // known HTTPS origin; production exact-Origin rejection is unit-tested.
      assert.equal(browserHeaders.origin, 'null');
      browserHeaders.origin = 'https://fueledbyfire.com';
      const response = await route.POST(new NextRequest(endpoint, { method: 'POST', headers: browserHeaders, body: request.postData() }));
      // The handler's canonical production Location is asserted in unit tests.
      // Browser-only fixture substitutes loopback so redirect interception cannot
      // accidentally escape to the live website (Playwright skips redirect legs).
      const location = response.headers.get('location');
      if (location) {
        assert.ok(location.startsWith('https://www.kingdomintel.com/api/fbf-registration?'));
        response.headers.set('location', location.replace('https://www.kingdomintel.com', base));
      }
      return fulfill(response, interception);
    }
    if (request.method() !== 'GET' && request.method() !== 'HEAD') throw new Error(`Unexpected write blocked: ${request.method()} ${target.pathname}`);
    if (target.pathname.startsWith('/api/') && target.pathname !== '/api/fbf-registration') return interception.abort();
    if (target.pathname === '/_next/image' && /^https?:/.test(target.searchParams.get('url') || '')) return interception.abort();
    const headers = await request.allHeaders();
    delete headers.host;
    const response = await fetch(`${base}${target.pathname}${target.search}`, { headers, redirect: 'manual' });
    return fulfill(response, interception);
  });
  return { context, errors };
}
async function conversionCount(page) { return page.evaluate(() => Number(sessionStorage.getItem('synthetic_conversion_count') || 0)); }
try {
  assert.equal((await fetch(`${base}/api/fbf-registration`)).status, 200, 'compiled loopback server ready');
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const { context, errors } = await contextFor(viewport);
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    await page.goto(`${endpoint}?complete=1`);
    assert.equal(await page.locator('script').count(), 0);
    await page.goto(`${ki}/dashboard#bonus-heading`);
    await page.waitForTimeout(700);
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.equal(await conversionCount(page), 0);
    await page.goto('https://fueledbyfire.com/');
    await page.waitForSelector('body[data-ready="true"]');
    const before = dispatches;
    await page.getByRole('button', { name: 'Register synthetic fixture' }).click();
    assert.equal(dispatches, before, 'native consent validation before any dispatch');
    await page.locator('input[name=agreed]').check();
    await page.getByRole('button', { name: 'Register synthetic fixture' }).click();
    await page.waitForURL(`${ki}/dashboard#bonus-heading`);
    await page.locator('dialog[open]').waitFor();
    assert.equal(dispatches, before + 1);
    assert.equal(await conversionCount(page), 1);
    const cookies = await context.cookies(ki);
    assert.ok(cookies.some(cookie => cookie.name === 'kim_registration_confirmation' && cookie.httpOnly && cookie.secure && cookie.path === '/'));
    assert.ok(!cookies.some(cookie => cookie.name === 'kim_fbf_pending'));
    await page.screenshot({ path: `${output}/synthetic-${viewport.width}-welcome.png` });
    await page.getByRole('button', { name: 'Close welcome video' }).click();
    await page.waitForTimeout(300);
    const bonus = await page.locator('#bonus-heading').evaluate(el => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, height: window.innerHeight, hash: location.hash }; });
    assert.equal(bonus.hash, '#bonus-heading');
    const bonusVisibleAfterClose = bonus.top >= -5 && bonus.bottom <= bonus.height;
    if (!bonusVisibleAfterClose) acceptanceFailures.push({ viewport, check: 'bonus heading visible after welcome closes', actual: bonus });
    await page.screenshot({ path: `${output}/synthetic-${viewport.width}-bonus.png` });
    await page.reload();
    await page.waitForTimeout(700);
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.equal(await conversionCount(page), 1);
    await page.getByRole('button', { name: 'Watch the welcome video' }).click();
    await page.locator('dialog[open]').waitFor();
    assert.equal(await conversionCount(page), 1);
    await page.reload();
    await page.waitForTimeout(700);
    assert.equal(await page.locator('dialog[open]').count(), 0);
    await page.goto(`${ki}/thank-you`);
    await page.waitForTimeout(700);
    assert.equal(await conversionCount(page), 1);
    await page.goto(`${endpoint}?complete=1`);
    assert.equal(await page.locator('script').count(), 0);
    assert.equal(await conversionCount(page), 1);
    assert.deepEqual(errors, []);
    results.push({ viewport, handoffSuccess: true, bonusVisibleAfterClose, dispatches: 1, conversions: 1, bonus, checks: ['cross-origin public GET CORS', 'native consent prevention', 'native POST synthetic handler interception', 'real compiled proof verification', 'consumed cookie', 'automatic welcome', 'refresh no rearm', 'manual welcome no conversion', 'legacy no duplicate', 'plain completion no script'] });
    await context.close();
  }
  const { context, errors } = await contextFor({ width: 1280, height: 900 });
  const page = await context.newPage();
  failProvider = true;
  await page.goto('https://fueledbyfire.com/');
  await page.waitForSelector('body[data-ready="true"]');
  await page.locator('input[name=agreed]').check();
  const before = dispatches;
  await page.getByRole('button', { name: 'Register synthetic fixture' }).click();
  await page.waitForURL(`${endpoint}?error=uncertain`);
  assert.match(await page.locator('body').innerText(), /Do not submit again/);
  await page.reload();
  assert.equal(dispatches, before + 1);
  assert.equal(await conversionCount(page), 0);
  assert.ok(!(await context.cookies(ki)).some(cookie => cookie.name === 'kim_registration_confirmation'));
  assert.deepEqual(errors, []);
  results.push({ uncertain: true, dispatches: 1, conversions: 0, refreshDoesNotResubmit: true });
  await context.close();
  writeFileSync(`${output}/results.json`, JSON.stringify({ base, syntheticOnly: true, externalRequestsBlocked: true, interceptedPosts, dispatches, results, acceptanceFailures }, null, 2));
  console.log(JSON.stringify({ output, interceptedPosts, dispatches, results, acceptanceFailures }, null, 2));
  assert.deepEqual(acceptanceFailures, [], 'All browser acceptance criteria must pass');
} catch (error) {
  const pages = browser.contexts().flatMap(context => context.pages());
  for (const [i, page] of pages.entries()) {
    console.error('Synthetic failure page:', page.url(), await page.locator('body').innerText().catch(() => 'unavailable'));
    console.error('Synthetic cookie names:', (await page.context().cookies()).map(c => c.name));
    await page.screenshot({ path: `${output}/failure-${i}.png` }).catch(() => {});
  }
  throw error;
} finally { await browser.close(); }
