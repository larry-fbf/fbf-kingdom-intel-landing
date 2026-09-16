# Direct Zoom signup — release checklist

## Approved scope

Payton explicitly selected best-effort direct registration, no database or queue.
This implementation has no journal, worker, scheduled job, retry, recovery mutation,
personal join-link storage/delivery, dashboard edit, or historical-contact replay.
Zoom native confirmation remains enabled; Brevo dashboard confirmation and existing
Attio/SMS behavior are unchanged. A registration failure does not make an otherwise
CRM-accepted request retryable.

There is **no cross-request or cross-instance idempotency guarantee**. Two concurrent
requests can both observe absence and POST. A later independent form submission
can repeat an uncertain write if Zoom has not made it visible. Process restart loses
all request state. Nothing retries automatically; `pending` means uncertain, NOT
queued. `registered` means existing approved match or verified POST/readback, not
email delivery. `held` means consented identity/target/settings/conflict prevented
registration; `unavailable` means pre-POST failure or missing configuration.

## Production binding (required, no database gate)

Existing project `prj_JtRzrangAxKuBl4E6AvADw2bAG84`, team
`team_eurjazgrjxvfGNXMO0ktC8ln`, GitHub `larry-fbf/fbf-kingdom-intel-landing`,
production branch `main`.

Production binding was completed through the authorized Vercel dashboard on
2026-09-16 UTC. A subsequent names/targets/types-only HTTP 200 readback verified
all four variables below as Production-only; all three credential fields are
sensitive. This supersedes the earlier unbound-environment observation.
Supported project Settings → Environment Variables page:
https://vercel.com/larry-3174s-projects/fbf-kingdom-intel-landing/settings/environment-variables

Bind these names to **Production only**, server-only, never `NEXT_PUBLIC_*`:

- `ZOOM_ACCOUNT_ID`
- `ZOOM_CLIENT_ID`
- `ZOOM_CLIENT_SECRET` (sensitive)
- `ZOOM_SIGNUP_TARGET` (exact JSON below)

The parent/operator completed secure binding through supported controls.
Do not paste values in chat, commit .env files, use the denied CLI path,
or manually refresh OAuth. No credential values are in this repository.
Payton explicitly accepted the existing credentials; rotation was not performed
or claimed and is not a release blocker. Fresh OAuth/GET verification succeeded.
No new app, paid service, database, queue, or permission expansion is needed.
Values remain concealed. Environment
updates require a new deployment to take effect. Do not copy production credentials
to preview; keep previews without live integration writes.

```json
{"webinarId":"87621606558","topic":"Kingdom Intelligence Masterclass","timezone":"America/Chicago","occurrenceId":"1789664400000","startTime":"2026-09-17T17:00:00Z"}
```

This is the approved September 15–17 series (`registration_type: 1`), NOT Day 2
only. The occurrence is an expiry/metadata anchor, not a POST occurrence filter.
Registration stops at the September 17 noon Central start. For a future event,
authorized staff must authenticate and verify its numeric webinar ID, host account,
series registration, confirmation/settings/questions, and final occurrence before
updating this server-owned JSON and releasing it. Update only future new signups;
never enumerate/replay historical contacts into the new event.

## Operation budget and quotas

Every consented attempt performs fresh OAuth + webinar/host/questions GETs, complete
approved/pending/denied inventories, at most one POST, and an individual identity GET.
At the freshly verified 789 approved / 0 pending / 0 denied, inventory is five pages:
nine requests including OAuth before a possible POST; eleven with POST/readback.
The real read-only check took 1.342 seconds (one sample, not a latency guarantee).

Inventory is capped at 20 pages of 300; a complete inventory requiring more is
unavailable, never assumed absent. Whole Zoom operation deadline is 12 seconds,
below the unchanged form's 15-second timeout; CRM runs in parallel. No background
continuation is relied on. All HTTP calls share the abort signal, disable redirects,
and have no retries. 429s fail closed; ambiguous POST failures return pending.

Official docs checked 2026-09-16:
- https://developers.zoom.us/docs/api/meetings/ — list registrants MEDIUM;
  add/get registrant, webinar detail and registration questions LIGHT.
- https://developers.zoom.us/docs/api/rate-limits/ — quotas shared account-wide,
  Pro LIGHT 30/sec and MEDIUM 20/sec; Business+ LIGHT 80/sec and MEDIUM 60/sec.
  Three registration requests/day UTC for the same registrant/webinar. Webinar API
  prerequisite is Pro or higher with Webinar add-on; actual billing tier not read.

There is no fabricated two-signups/minute limit and no distributed quota enforcement.
Other apps and burst traffic can exhaust quotas; best-effort can lose registration.
20 pages is a resource/completeness cap, NOT a throughput quota. Larger sustained
traffic/reliable recovery is later work, not an implicit infrastructure prerequisite.

## Review and release

1. Independently review this exact diff and tests. Nothing is published yet.
2. Confirm secure binding and runtime duration supports the 12-second path.
3. Recheck fresh GitHub main and both production hostnames against the pinned base;
   preserve/review concurrent work if changed.
4. Authorized Git release branch → READY preview on exact existing project → safe
   read-only UI/routes/tracking verification → exact-head reviewed PR merge.
5. Verify production READY commit and both hostname resolutions, route manifest,
   dashboard/registration tracking, and production binding names.
6. Only after approval of an exact owned test identity, perform ONE controlled signup:
   it triggers CRM, Brevo, SMS (if phone supplied), and Zoom native email. Verify Zoom
   identity with GET and inspect receipt privately. No customer identity is invented.
7. Keep the pre-change READY deployment as rollback anchor. Do not replay uncertain
   signups; any operator investigation is GET-only and separate from CRM fulfillment.

Unit/fixture tests and build do not establish production registration or inbox delivery.
