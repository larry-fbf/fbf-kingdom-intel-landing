# December 9, 2026 workshop registration

The existing `/workshop` name/email form POSTs to `/api/workshop/register`.
Successful confirmation now requires verified Attio membership, Brevo membership,
and approved Zoom webinar registration. No second form or public Join button is added.

## Verified target and configuration

- Attio People list: `2658fa07-a5d6-47f3-9818-da2c82883e41`; Brevo list: `34`.
- Webinar: `81398970006`, **Kingdom Intelligence Workshop**, type 5 (single scheduled webinar).
- Public registration: https://us02web.zoom.us/webinar/register/WN_komAAW4PRZKv8rUSSej2Ug
- Start: `2026-12-09T18:00:00Z`, noon America/Chicago, 1 PM Eastern.
- Host account: Larry Wallace; host ID `BvkkU0IDT7mg8KrjcCbIyQ`; Payton is configured as alternative host.
- Read-only metadata confirms automatic approval, native confirmation email enabled,
  no meeting authentication, registration open, required last name and no custom questions.
- Provider duration is 60 minutes, but public calendar remains start-only; no owner-approved end time has been added.
- This webinar registration URL supersedes the earlier supplied meeting-style URL, which is not used.
- Existing production credentials: `ATTIO_API_KEY`, `BREVO_API_KEY`,
  `REGISTRATION_CONFIRMATION_SECRET`, `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`.
- Workshop target is server-owned in `app/lib/workshop-zoom.ts`. It never reads or changes
  January `ZOOM_SIGNUP_TARGET`. Missing credentials fail before any provider call.

## Fulfillment and uncertainty

List upserts and Zoom run concurrently. List requests have six-second deadlines;
Zoom has a twelve-second total deadline, below the forty-five-second browser timeout.
Zoom revalidates identity/schedule/settings and checks complete approved/pending/denied
inventories before at most one POST. Existing uniquely approved email is reused without
another confirmation POST. New registrations require individual identity/status readback.
Personal join URLs are discarded at the provider boundary; Zoom's native confirmation
owns unique-link delivery. There is no separate email/SMS send or event-history overwrite.

An uncertain Zoom POST/readback, held registration or rejected Zoom operation cannot
issue the success cookie and is non-retryable in the current form. Transport ambiguity
also locks submission across modal close/reopen; no success redirect or automatic retry.
Safe pre-POST outages and list failures remain explicitly retryable with idempotent list
upserts and another complete Zoom lookup. Partial list/Zoom writes are possible.
This reuses the approved best-effort direct architecture: it is NOT durable cross-instance
idempotency. Concurrent tabs/instances and a reload after an ambiguous write are not
strictly deduplicated; do not claim exactly-once delivery or automatically replay a failed write.

The signed confirmation uses a new `kiw-dec-2026-zoom` proof namespace and
`workshop_dec_2026_zoom` cookie. Old list-only proofs cannot certify Zoom enrollment.
Prior list-only registrants are not backfilled by this release; any backfill requires
separate approval and read-only reconciliation first.

## Calendar and presentation

The approved bright compact thank-you and one calendar chooser are unchanged.
Google, Apple ICS and Outlook ICS include the public webinar registration URL and
instruct attendees to use the unique join link in their Zoom confirmation email.
A public registration URL is not labeled as a join link. No attendee/host link is public.
Saved calendars do not automatically update. The neutral noindex preview stays neutral.

## Verification and publication boundary

Unit/integration tests use only synthetic providers and browser-intercepted submissions.
Read-only Zoom metadata and production credential-key presence are verified separately.
No real lead, registration, email, SMS, calendar save, or Zoom setting change was made.
Native confirmation enabled does not establish actual inbox delivery; reminder emails
are disabled in the observed webinar metadata. External Brevo automation/templates
were not edited. Parent owns independent review, merge and production verification.
