# October 13, 2026 workshop registration

The `/workshop` form POSTs to `/api/workshop/register`. A successful confirmation
requires both Attio and Brevo enrollment. This is website **dual-write**, not a
background Attio-to-Brevo synchronization service.

## Production configuration

- `ATTIO_KI_WORKSHOP_OCTOBER_2026_LIST_ID`: October workshop Attio People list.
- `BREVO_KI_WORKSHOP_OCTOBER_2026_LIST_ID`: October workshop Brevo list (positive integer).
- Existing `ATTIO_API_KEY` and `BREVO_API_KEY` remain in use.
- Brevo's normal text attribute `WORKSHOP` must exist for the event annotation.
- No August list fallback is allowed. Missing required configuration returns HTTP
  503 before any writes. Either CRM/email-provider failure also returns 503, so the
  form does not display a false success. The other system may already have accepted
  a partial registration; retrying uses person/list/contact upserts. Attio notes
  are append-only and can repeat on retries.

## Scope and safety

- No email sequence, campaign, webhook, or scheduled sync is installed or activated.
- Brevo opt-out/blacklist fields are omitted, not reset. List membership does not
  override unsubscribe status or guarantee delivery.
- Manual/imported Attio list additions and edits are **not** automatically copied
  to Brevo. A separate ongoing sync would be required for that workflow.
- Existing consent-gated SimpleTexting contact enrollment remains on the previous
  August configuration; SMS migration was not requested. CRM/Brevo failures now
  stop before the SMS call, avoiding SMS enrollment on a failed confirmation.
- Do not exercise the production happy path with fabricated contacts. Unit tests
  execute the real handler with an isolated environment and mocked network only.

## Event rollover checklist

1. Discover lists, avoid duplicates, and compare Attio list attributes and access.
2. Create event-specific empty lists; preserve the historical cohort.
3. Set the new production environment variables before merging to `main`.
4. Run all tests and build; verify the production deployment commit and aliases.
5. Reconcile only registrants supported by event-specific registration evidence
   since the live date-change deployment. Existing-list entry dates alone miss
   repeat registrants; also inspect registration notes and Brevo contact changes.
6. Do not send messages or change subscription status while reconciling.
