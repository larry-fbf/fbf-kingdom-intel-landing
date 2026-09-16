import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

const ATTIO_API_KEY = process.env.ATTIO_API_KEY || "";
const ATTIO_KIM_QUALIFICATION_LIST_ID = process.env.ATTIO_KIM_QUALIFICATION_LIST_ID || "cd32653d-1176-454d-9e35-dc258b85a3ae";
const SLACK_WORKBOOK_WEBHOOK_URL = process.env.SLACK_WORKBOOK_WEBHOOK_URL || "";

type WorkbookPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  whichOfTheFollowingBestDescribesYou?: string;
  oneThing?: string;
  outcomeImpact?: string;
  otherDecisionMakers?: string;
  wantResults?: string;
  helpAreas?: string[];
  sessionConnectionPreference?: string;
  attendedWorkshop?: string;
  monthlyIncomeRange?: string;
  stageOfGrowth?: string;
  leadershipExperience?: string;
  kingdomAlignment?: string;
  readyToInvest?: string;
  attribution?: AttributionPayload;
};

type WorkbookContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
};

type AttributionPayload = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  utmId?: string;
  ad?: string;
  adId?: string;
  adset?: string;
  adsetId?: string;
  campaignId?: string;
  fbclid?: string;
  gclid?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt?: string;
};

function clean(value = "") {
  return value.trim();
}

function normalizeEmail(value = "") {
  return value.trim().toLowerCase();
}

function isValidNanpPhone(e164Phone: string) {
  const match = e164Phone.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  if (!match) return false;

  const [, areaCode, exchange] = match;
  if (/^[01]/.test(areaCode) || /^[01]/.test(exchange)) return false;
  if (areaCode === "555" || exchange === "555") return false;

  return true;
}

function normalizeE164Phone(phone = "") {
  const raw = clean(phone);
  if (!raw) return "";

  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  let normalized = "";
  if (raw.startsWith("+") && digits.length >= 8 && digits.length <= 15) normalized = `+${digits}`;
  if (raw.startsWith("00") && digits.length > 2 && digits.length <= 17) normalized = `+${digits.slice(2)}`;
  if (digits.length === 10) normalized = `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) normalized = `+${digits}`;

  if (!normalized) return "";
  if (normalized.startsWith("+1") && !isValidNanpPhone(normalized)) return "";

  return normalized;
}

async function readError(res: Response) {
  const text = await res.text();
  try {
    return JSON.stringify(JSON.parse(text));
  } catch {
    return text;
  }
}

async function fetchJson(url: string, init: RequestInit, label: string) {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`${label} failed (${res.status}): ${await readError(res)}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function required(value: string | string[] | undefined) {
  return Array.isArray(value) ? value.length > 0 : Boolean(clean(value || ""));
}

function answer(value?: string) {
  return clean(value || "") || "Not provided";
}

function attributionAnswer(value?: string) {
  return clean(value || "") || "Not captured";
}

function normalizeSelect(value?: string, options: string[] = []) {
  const raw = clean(value || "");
  if (!raw) return raw;
  const comparable = raw.toLowerCase().replace(/[–—−?]/g, "-").replace(/\s+/g, " ");
  return options.find((option) => option.toLowerCase().replace(/[–—−?]/g, "-").replace(/\s+/g, " ") === comparable) || raw;
}

function normalizedPayload(payload: WorkbookPayload): WorkbookPayload {
  return {
    ...payload,
    monthlyIncomeRange: normalizeSelect(payload.monthlyIncomeRange, [
      "Under $10K/month",
      "$10K–$50K/month",
      "$50K–$100K/month",
      "$100K–$500K/month",
      "$500K-$1 Mill/month",
      "$1 Mill +/month",
    ]),
  };
}

function formatWorkbookNote(payload: WorkbookPayload, contact: WorkbookContact) {
  const attribution = payload.attribution || {};

  return [
    "# Kingdom Intelligence Masterclass qualification form",
    "",
    `**Name:** ${[contact.firstName, contact.lastName].filter(Boolean).join(" ")}`,
    `**Email:** ${contact.email}`,
    `**Phone:** ${contact.phone}`,
    `**Company:** ${contact.company}`,
    `**Best describes them:** ${answer(payload.whichOfTheFollowingBestDescribesYou)}`,
    `**One thing they want help achieving:** ${answer(payload.oneThing)}`,
    `**How that outcome improves business/life:** ${answer(payload.outcomeImpact)}`,
    `**Other decision makers / emails:** ${answer(payload.otherDecisionMakers)}`,
    `**How soon they want help:** ${answer(payload.wantResults)}`,
    `**Area needing most help:** ${payload.helpAreas?.length ? payload.helpAreas.join(", ") : "Not provided"}`,
    `**Preferred session connection:** ${answer(payload.sessionConnectionPreference)}`,
    `**Attended a free workshop/masterclass:** ${answer(payload.attendedWorkshop)}`,
    `**Monthly business/household income range:** ${answer(payload.monthlyIncomeRange)}`,
    "",
    "## Attribution",
    `**UTM source:** ${attributionAnswer(attribution.utmSource)}`,
    `**UTM medium:** ${attributionAnswer(attribution.utmMedium)}`,
    `**UTM campaign:** ${attributionAnswer(attribution.utmCampaign)}`,
    `**UTM content / audience:** ${attributionAnswer(attribution.utmContent)}`,
    `**UTM term / ad set ID:** ${attributionAnswer(attribution.utmTerm)}`,
    `**UTM ID / campaign ID:** ${attributionAnswer(attribution.utmId)}`,
    `**Ad:** ${attributionAnswer(attribution.ad)}`,
    `**Ad ID:** ${attributionAnswer(attribution.adId)}`,
    `**Ad set:** ${attributionAnswer(attribution.adset)}`,
    `**Ad set ID:** ${attributionAnswer(attribution.adsetId)}`,
    `**Campaign ID:** ${attributionAnswer(attribution.campaignId)}`,
    `**FB click ID:** ${attributionAnswer(attribution.fbclid)}`,
    `**Google click ID:** ${attributionAnswer(attribution.gclid)}`,
    `**Landing page:** ${attributionAnswer(attribution.landingPage)}`,
    `**Referrer:** ${attributionAnswer(attribution.referrer)}`,
    `**Captured at:** ${attributionAnswer(attribution.capturedAt)}`,
  ].join("\n");
}

function attioPersonValues(contact: WorkbookContact) {
  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: contact.email }],
    name: [{
      first_name: contact.firstName,
      last_name: contact.lastName,
      full_name: `${contact.firstName} ${contact.lastName}`.trim(),
    }],
  };

  const normalizedPhone = normalizeE164Phone(contact.phone);
  if (normalizedPhone) {
    values.phone_numbers = [{ original_phone_number: normalizedPhone }];
  }

  return values;
}

async function upsertAttioPerson(payload: WorkbookPayload, contact: WorkbookContact) {
  if (!ATTIO_API_KEY) throw new Error("ATTIO_API_KEY is not configured");

  const person = await fetchJson(
    "https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: { values: attioPersonValues(contact) } }),
    },
    "Attio qualification contact"
  );

  const recordId = person?.data?.id?.record_id;
  if (!recordId) throw new Error("Attio qualification contact failed: missing record id");

  return { recordId };
}

async function addAttioQualificationListEntry(recordId: string) {
  if (!ATTIO_KIM_QUALIFICATION_LIST_ID) return { skipped: true };

  await fetchJson(
    `https://api.attio.com/v2/lists/${encodeURIComponent(ATTIO_KIM_QUALIFICATION_LIST_ID)}/entries`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: { parent_record_id: recordId, parent_object: "people", entry_values: {} } }),
    },
    "Attio K.I.M. qualification list entry"
  );

  return { skipped: false };
}

async function createAttioWorkbookNote(recordId: string, payload: WorkbookPayload, contact: WorkbookContact) {
  await fetchJson(
    "https://api.attio.com/v2/notes",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: {
          parent_object: "people",
          parent_record_id: recordId,
          title: "Kingdom Intelligence Masterclass qualification form",
          format: "plaintext",
          content: `${formatWorkbookNote(payload, contact)}\n\nWorkbook delivery reference: ${submissionKey(payload, contact)}:note`,
        },
      }),
    },
    "Attio qualification note"
  );
}

async function notifySlack(payload: WorkbookPayload, contact: WorkbookContact) {
  if (!SLACK_WORKBOOK_WEBHOOK_URL) return { skipped: true };

  const text = [
    "New Kingdom Intelligence Masterclass qualification form submission",
    `Name: ${contact.firstName} ${contact.lastName}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    `Company: ${contact.company}`,
    `Income: ${answer(payload.monthlyIncomeRange)}`,
    `Best describes them: ${answer(payload.whichOfTheFollowingBestDescribesYou)}`,
    `Wants help with: ${payload.helpAreas?.length ? payload.helpAreas.join(", ") : "Not provided"}`,
    `Timeline: ${answer(payload.wantResults)}`,
  ].join("\n");

  const res = await fetch(SLACK_WORKBOOK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      blocks: [
        { type: "header", text: { type: "plain_text", text: "New KIM qualification form" } },
        { type: "section", text: { type: "mrkdwn", text: `*${contact.firstName} ${contact.lastName}* submitted the KIM qualification form.` } },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Email:*\n${contact.email}` },
            { type: "mrkdwn", text: `*Phone:*\n${contact.phone}` },
            { type: "mrkdwn", text: `*Company:*\n${contact.company}` },
            { type: "mrkdwn", text: `*Income:*\n${answer(payload.monthlyIncomeRange)}` },
            { type: "mrkdwn", text: `*Best describes them:*\n${answer(payload.whichOfTheFollowingBestDescribesYou)}` },
            { type: "mrkdwn", text: `*Timeline:*\n${answer(payload.wantResults)}` },
            { type: "mrkdwn", text: `*Needs help with:*\n${payload.helpAreas?.length ? payload.helpAreas.join(", ") : "Not provided"}` },
            { type: "mrkdwn", text: `*Attended before:*\n${answer(payload.attendedWorkshop)}` },
          ],
        },
        { type: "section", text: { type: "mrkdwn", text: `*One thing they want help achieving:*\n${answer(payload.oneThing)}` } },
      ],
    }),
  });

  if (!res.ok) throw new Error(`Slack notification failed (${res.status}): ${await res.text()}`);
  return { skipped: false };
}

const DELIVERY_LEDGER = "https://api.attio.com/v2/lists/kim_workbook_delivery_ledger/entries";

// A provider-enforced unique text attribute is the durable claim, never process memory.
// Pending claims are deliberately never expired/replayed: a timed-out POST may have succeeded.
// Resolve pending rows by checking the provider before an operator marks them complete.
async function deliverOnce(recordId: string, key: string, deliver: () => Promise<unknown>) {
  const headers = { Authorization: `Bearer ${ATTIO_API_KEY}`, "Content-Type": "application/json" };
  const find = async () => {
    const found = await fetchJson(`${DELIVERY_LEDGER}/query`, {
      method: "POST", headers, body: JSON.stringify({ filter: { delivery_key: key }, limit: 2, offset: 0 }),
    }, "Workbook delivery lookup");
    if (!Array.isArray(found?.data) || found.data.length > 1) throw new Error("Invalid delivery ledger");
    return found.data[0];
  };
  const completed = (entry: { entry_values?: { delivery_state?: { value: string }[] } }) =>
    entry?.entry_values?.delivery_state?.[0]?.value === "complete";
  const existing = await find();
  if (existing) {
    if (completed(existing)) return;
    throw new Error("Workbook delivery pending verification");
  }
  let claim;
  try {
    claim = await fetchJson(DELIVERY_LEDGER, {
      method: "POST", headers,
      body: JSON.stringify({ data: { parent_object: "people", parent_record_id: recordId,
        entry_values: { delivery_key: key, delivery_state: "pending" } } }),
    }, "Workbook delivery claim");
  } catch {
    // Also covers an ambiguous transport failure. Do not claim ownership by reading a pending row.
    if (completed(await find())) return;
    throw new Error("Workbook delivery claim unavailable");
  }
  const entryId = claim?.data?.id?.entry_id;
  if (!entryId) throw new Error("Missing delivery claim id");
  await deliver();
  const entryUrl = `${DELIVERY_LEDGER}/${encodeURIComponent(entryId)}`;
  await fetchJson(entryUrl, { method: "PATCH", headers,
    body: JSON.stringify({ data: { entry_values: { delivery_state: "complete" } } }),
  }, "Workbook delivery receipt");
  const receipt = await fetchJson(entryUrl, { method: "GET", headers, cache: "no-store" }, "Workbook delivery verification");
  if (!completed(receipt?.data)) throw new Error("Workbook delivery receipt not confirmed");
}

function submissionKey(payload: WorkbookPayload, contact: WorkbookContact) {
  // Stable answer order, normalized identity, and no transient attribution timestamp.
  // Changed answers are a new qualification; identical answers are retries even after a cold start.
  const fields = ["whichOfTheFollowingBestDescribesYou", "oneThing", "outcomeImpact",
    "otherDecisionMakers", "wantResults", "sessionConnectionPreference", "attendedWorkshop",
    "monthlyIncomeRange", "stageOfGrowth", "leadershipExperience", "kingdomAlignment", "readyToInvest"] as const;
  const answers = fields.map(field => clean(payload[field]));
  const canonical = JSON.stringify(["kim-september-2026-v1", contact.firstName, contact.lastName,
    contact.email, normalizeE164Phone(contact.phone) || contact.phone, contact.company,
    answers, [...(payload.helpAreas || [])].map(value => clean(value)).sort()]);
  return createHash("sha256").update(canonical).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const payload = normalizedPayload((await req.json()) as WorkbookPayload);
    const contact = {
      firstName: clean(payload.firstName),
      lastName: clean(payload.lastName),
      email: normalizeEmail(payload.email),
      phone: clean(payload.phone),
      company: clean(payload.company),
    };

    const missing = [
      ["firstName", contact.firstName],
      ["lastName", contact.lastName],
      ["email", contact.email],
      ["phone", contact.phone],
      ["company", contact.company],
      ["whichOfTheFollowingBestDescribesYou", payload.whichOfTheFollowingBestDescribesYou],
      ["oneThing", payload.oneThing],
      ["outcomeImpact", payload.outcomeImpact],
      ["otherDecisionMakers", payload.otherDecisionMakers],
      ["wantResults", payload.wantResults],
      ["helpAreas", payload.helpAreas],
      ["attendedWorkshop", payload.attendedWorkshop],
      ["monthlyIncomeRange", payload.monthlyIncomeRange],
    ].filter(([, value]) => !required(value as string | string[] | undefined));

    if (missing.length > 0) {
      return NextResponse.json({ error: "Missing required fields", fields: missing.map(([name]) => name) }, { status: 400 });
    }

    const results: Record<string, unknown> = {};
    const key = submissionKey(payload, contact);
    let personId = "";

    if (!ATTIO_API_KEY) {
      return NextResponse.json({ ok: false, error: "Workbook saving is temporarily unavailable. Please try again." }, { status: 503 });
    } else {
      try {
        const attio = await upsertAttioPerson(payload, contact);
        personId = attio.recordId;
        results.attio = { skipped: false, recordId: attio.recordId };

        await fetchJson(`https://api.attio.com/v2/objects/people/records/${encodeURIComponent(attio.recordId)}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${ATTIO_API_KEY}`, "Content-Type": "application/json" },
          // Explicit September cohort. PATCH appends; PUT would replace event history.
          body: JSON.stringify({ data: { values: { events_registered: ["ede3e1e7-e233-4e5b-9b61-fcf315c31e1d"] } } }),
        }, "Attio September workbook event");
        results.attioList = await addAttioQualificationListEntry(attio.recordId);

        await deliverOnce(attio.recordId, `${key}:note`, () => createAttioWorkbookNote(attio.recordId, payload, contact));
        results.attioNote = { skipped: false };
      } catch (error) {
        console.error("Workbook Attio persistence failed");
        return NextResponse.json({ ok: false, error: "We could not confirm your workbook was saved. Retry once; if this persists, contact support so we can check the saved submission." }, { status: 503 });
      }
    }

    try {
      if (SLACK_WORKBOOK_WEBHOOK_URL) {
        await deliverOnce(personId, `${key}:slack`, () => notifySlack(payload, contact));
        results.slack = { skipped: false };
      } else results.slack = { skipped: true };
    } catch (error) {
      console.error(error);
      results.slack = { skipped: false, error: "Slack notification failed" };
    }

    return NextResponse.json({ ok: true, results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Workbook form submission failed" }, { status: 500 });
  }
}
