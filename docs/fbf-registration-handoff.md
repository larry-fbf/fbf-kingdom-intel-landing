# FBF registration handoff

## Status and release gate

Implemented as an additive route plus an exact-fragment welcome cleanup. No production deployment or provider delivery is represented by the synthetic tests.

The parent resolved the demonstrated post-welcome scroll gap within Payton's approved resource-landing outcome: after restoring body styles and focus, only when `window.location.hash === '#bonus-heading'`, scroll that heading into view. Ordinary `/dashboard` behavior remains unchanged. Runtime cleanup tests cover direct, unrelated-fragment and exact-fragment cases; historical guards strip only that exact addition and assert the unchanged original hashes. The retained browser script requires the bonus heading to be visible after closing welcome on desktop/mobile.

## Public contract

`GET https://www.kingdomintel.com/api/fbf-registration` returns public JSON with `Cache-Control: no-store`, `Access-Control-Allow-Origin: *`, and **no** credential allowance:

- `eventName`: `Kingdom Intelligence Masterclass`
- `start`: first `EVENT_STARTS.regular` instant
- `end`: last `EVENT_STARTS.regular` instant (**last session start**, not session end)
- `registrationUrl`: `https://www.kingdomintel.com/api/fbf-registration`
- `dashboardUrl`: `https://www.kingdomintel.com/dashboard#bonus-heading`
- `consent`: exact existing homepage SMS consent paragraph, excluding the separately linked Privacy Policy / Terms labels
- `privacyUrl`, `termsUrl`: existing homepage policy destinations

The actual shared export is `EVENT_STARTS.regular`, not the proposed `EVENT_SESSIONS`. No dates or provider IDs are copied. A contract test pins consent against the unchanged homepage.

FBF fetches with `credentials: 'omit'`, formats both instants in the device timezone, and fails closed if the contract cannot be loaded. Do not independently enroll contacts in a newsletter/provider.

## Native form POST

Use an ordinary **top-level**, same-tab `<form method="post" enctype="application/x-www-form-urlencoded" action={registrationUrl}>`. Do not use cross-origin AJAX, iframe targets, `_blank`, or a JavaScript request followed by a fabricated success redirect. Do not suppress Origin using `Referrer-Policy: no-referrer` on the FBF form document; the route rejects missing/null origins.

Exact allowed origins:

- `https://fbfwebsite-git-review-fbf-team-preview-2026-11-18-paytonwallace.vercel.app`
- `https://fueledbyfire.com`
- `https://www.fueledbyfire.com`

Fields:

| Name | Rule |
|---|---|
| `email` | Required; max 254 characters |
| `firstName`, `lastName` | Required; max 100 each |
| `agreed` | Required checkbox; native checked value exactly `on` |
| `phone` | Optional; max 64; existing KI normalization still owns provider behavior |
| `timeZone` | Optional; max 64; device IANA zone; existing handler normalizes it and retains Vercel timezone fallback |
| `website` | Optional honeypot; must remain empty; hide accessibly and exclude from keyboard navigation |

Body capped at 8192 actual bytes while reading, independent of Content-Length. Duplicate, unknown, control-character, overlong, and invalid required fields reject before dispatch. No `redirect`, provider ID, or attribution extension is accepted. Browser validation should match these limits. Use a synchronous submit lock; once native dispatch starts, never auto-retry or reset/reopen into a second submit after an uncertain navigation. FBF owns that client-side policy.

## Confirmation and uncertainty

POST invokes the existing `/api/register` exported POST exactly once **in process** with a JSON `NextRequest`. It does not network-fetch the route or reimplement providers. The original registration handler and all provider configuration stay byte-identical.

Only genuine HTTP success + JSON `ok: true` + a valid signed confirmation cookie whose ID matches the result can advance. The actual original cookie is forwarded with its attributes. A separate 5-minute HttpOnly/Secure/SameSite=Lax `kim_fbf_pending` cookie is scoped to this endpoint. Its domain-separated HMAC binds the exact confirmation-cookie digest, timestamp and random nonce using the existing confirmation secret resolver. No new secret/env configuration is needed.

A 303 redirects to the fixed canonical endpoint `?complete=1`. GET verifies both cookies, clears pending, and returns no-store/noindex HTML. Only the verified branch contains the SHA-256-CSP-authorized inline bridge. It marks the opaque per-registration consumed key first, sets the existing independent `kim_registration_confirmed` / `kim_registration_welcome` per-tab markers, then `location.replace('/dashboard#bonus-heading')`. Storage errors fail closed. An unverified/unrelated/consumed completion does not render marker code. HEAD is explicit so Next cannot implicitly invoke consuming GET.

This is normal-browser cookie consumption plus per-tab replay suppression, **not** a distributed exactly-once registration or token revocation database. Copied cookies, deliberate storage clearing, concurrent tabs and repeated separately submitted forms are not globally deduplicated. No new durable storage was authorized.

Pre-dispatch validation returns a safe static correction page. Any exception, malformed response, missing/expired/forged proof or unsuccessful registration result redirects 303 to a fixed `?error=uncertain` GET. It displays check-email/contact-support guidance and no success cookie, markers or provider diagnostics. Refresh of this GET cannot repeat the POST. Browser/network loss before receiving the 303 remains uncertain and must not prompt automatic resubmission.

## Reproduction (no service credentials)

From this checkout:

```sh
env -i PATH="$PATH" HOME="$HOME" TMPDIR=/Users/paytonwallace/.hermes/cache/scratch npm test
env -i PATH="$PATH" HOME="$HOME" TMPDIR=/Users/paytonwallace/.hermes/cache/scratch npm run build
```

Start the compiled app in a dedicated terminal with **only the synthetic signing secret**:

```sh
env -i PATH="$PATH" HOME="$HOME" TMPDIR=/Users/paytonwallace/.hermes/cache/scratch \
  REGISTRATION_CONFIRMATION_SECRET=synthetic-fbf-test-secret-not-for-deployment \
  npm run start -- --hostname 127.0.0.1 --port 3217
```

Then use the existing local Playwright installation (no dependency or browser install needed):

```sh
env -i PATH="$PATH" HOME="$HOME" USER="$USER" LOGNAME="$LOGNAME" \
  TMPDIR=/Users/paytonwallace/.hermes/cache/scratch \
  PLAYWRIGHT_MODULE=/Users/paytonwallace/MrWallace/projects/mw-command/app/node_modules/playwright/index.mjs \
  FBF_TEST_CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  node scripts/test-fbf-handoff-browser.mjs
```

Optional: `FBF_TEST_BASE` (loopback only), `FBF_TEST_OUTPUT` (default `../browser-evidence`). The browser fixture intercepts POST and executes the real new route with only its existing-register dependency replaced by a synthetic signed response. Actual compiled completion GET and dashboard run on loopback. The fixture rebinds the downgrade's `Origin: null` to its known allowed HTTPS FBF origin, and substitutes only the canonical redirect host with loopback. Those exact production values are independently tested by the handler suite. Browser DNS blocks nonlocal destinations, all external assets/analytics are blocked, and no provider call is made. This establishes the first-party proof/marker/dashboard behavior, not a live cross-site HTTPS submission or real provider delivery. Screenshots intentionally show unloaded external video posters.

Before release: independent source/security review; run full tests/build/browser including the bonus-scroll acceptance; commit/push/preview/guarded merge owned by parent; verify canonical GET/no-proof completion and existing homepage/dashboard anonymously on exact deployment; verify new API in build manifest. Existing provider/env routing must remain unchanged. A real registration, message delivery, physical iOS Safari and external Ads Manager URL rules require separate approved verification.
