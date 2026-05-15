import { NextRequest, NextResponse } from "next/server";

const ATTIO_API_KEY = process.env.ATTIO_API_KEY || "";
const ATTIO_KIM_QUALIFICATION_LIST_ID = process.env.ATTIO_KIM_QUALIFICATION_LIST_ID || "cd32653d-1176-454d-9e35-dc258b85a3ae";
const SLACK_WORKBOOK_WEBHOOK_URL = process.env.SLACK_WORKBOOK_WEBHOOK_URL || "";

type WorkbookPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
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
};

type WorkbookContact = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
};

function clean(value = "") {
  return value.trim();
}

function normalizeEmail(value = "") {
  return value.trim().toLowerCase();
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

function normalizeSelect(value?: string, options: string[] = []) {
  const raw = clean(value || "");
  if (!raw) return raw;
  const comparable = raw.toLowerCase().replace(/[–—−]/g, "-").replace(/\s+/g, " ");
  return options.find((option) => option.toLowerCase().replace(/[–—−]/g, "-").replace(/\s+/g, " ") === comparable) || raw;
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
  return [
    "# Kingdom Intelligence Masterclass qualification form",
    "",
    `**Name:** ${[contact.firstName, contact.lastName].filter(Boolean).join(" ")}`,
    `**Email:** ${contact.email}`,
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
  ].join("\n");
}

function attioPersonValues(payload: WorkbookPayload, contact: WorkbookContact) {
  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: contact.email }],
    name: [{
      first_name: contact.firstName,
      last_name: contact.lastName,
      full_name: `${contact.firstName} ${contact.lastName}`.trim(),
    }],
    description: `Company: ${contact.company}`,
    which_of_the_following_best_describes_you_1776883175: payload.whichOfTheFollowingBestDescribesYou,
    if_we_could_help_you_achieve_one_thing_what_would_it_be_1776883138: payload.oneThing,
    how_would_achieving_this_outcome_improve_your_business_or_life_1776883137: payload.outcomeImpact,
    any_other_decision_makers_1776883126: payload.otherDecisionMakers,
    want_results_1776883169: payload.wantResults,
    what_area_do_you_need_the_most_help_with_1776883171: payload.helpAreas || [],
    how_would_you_like_for_us_to_connect_with_you_for_this_session_phone_or_zoom_1776883137: payload.sessionConnectionPreference || "",
    have_you_attended_one_of_our_free_online_workshops_or_masterclasses_1776883136: payload.attendedWorkshop,
    which_range_best_represents_your_current_monthly_business_or_household_income_1776883177: payload.monthlyIncomeRange,
  };

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
      body: JSON.stringify({ data: { values: attioPersonValues(payload, contact) } }),
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
          content: formatWorkbookNote(payload, contact),
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

export async function POST(req: NextRequest) {
  try {
    if (!ATTIO_API_KEY) {
      return NextResponse.json({ error: "Attio is not configured" }, { status: 500 });
    }

    const payload = normalizedPayload((await req.json()) as WorkbookPayload);
    const contact = {
      firstName: clean(payload.firstName),
      lastName: clean(payload.lastName),
      email: normalizeEmail(payload.email),
      company: clean(payload.company),
    };

    const missing = [
      ["firstName", contact.firstName],
      ["lastName", contact.lastName],
      ["email", contact.email],
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

    const attio = await upsertAttioPerson(payload, contact);
    results.attio = { skipped: false, recordId: attio.recordId };

    results.attioList = await addAttioQualificationListEntry(attio.recordId);

    await createAttioWorkbookNote(attio.recordId, payload, contact);
    results.attioNote = { skipped: false };

    try {
      results.slack = await notifySlack(payload, contact);
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
