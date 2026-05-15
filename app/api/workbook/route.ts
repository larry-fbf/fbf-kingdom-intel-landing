import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_WORKBOOK_LIST_ID = Number(process.env.BREVO_WORKBOOK_LIST_ID || process.env.BREVO_KIM_WORKBOOK_LIST_ID || "15");
const ATTIO_API_KEY = process.env.ATTIO_API_KEY || "";
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

function formatWorkbookNote(payload: WorkbookPayload, contact: WorkbookContact) {
  return [
    "# Kingdom Intelligence Masterclass workbook form",
    "",
    `**Name:** ${[contact.firstName, contact.lastName].filter(Boolean).join(" ") || "Not provided"}`,
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

async function upsertBrevoWorkbookContact(contact: WorkbookContact) {
  const attributes: Record<string, string> = {
    FIRSTNAME: contact.firstName,
    LASTNAME: contact.lastName,
    COMPANY: contact.company,
  };

  await fetchJson(
    "https://api.brevo.com/v3/contacts",
    {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: contact.email,
        attributes,
        listIds: [BREVO_WORKBOOK_LIST_ID],
        updateEnabled: true,
      }),
    },
    "Brevo workbook contact"
  );
}

async function upsertAttioPerson(contact: WorkbookContact) {
  if (!ATTIO_API_KEY) return { skipped: true };

  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: contact.email }],
  };

  if (contact.firstName || contact.lastName) {
    values.name = [{
      first_name: contact.firstName,
      last_name: contact.lastName,
      full_name: [contact.firstName, contact.lastName].filter(Boolean).join(" "),
    }];
  }

  if (contact.company) {
    values.description = `Company: ${contact.company}`;
  }

  const person = await fetchJson(
    "https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: { values } }),
    },
    "Attio workbook contact"
  );

  const recordId = person?.data?.id?.record_id;
  if (!recordId) throw new Error("Attio workbook contact failed: missing record id");

  return { skipped: false, recordId };
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
          title: "Kingdom Intelligence Masterclass workbook form",
          format: "plaintext",
          content: formatWorkbookNote(payload, contact),
        },
      }),
    },
    "Attio workbook note"
  );
}

async function notifySlack(payload: WorkbookPayload, contact: WorkbookContact) {
  if (!SLACK_WORKBOOK_WEBHOOK_URL) return { skipped: true };

  const text = [
    "New Kingdom Intelligence Masterclass workbook form submission",
    `Name: ${[contact.firstName, contact.lastName].filter(Boolean).join(" ") || "Not provided"}`,
    `Email: ${contact.email}`,
    `Company: ${contact.company}`,
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
        { type: "header", text: { type: "plain_text", text: "New KIM workbook submission" } },
        { type: "section", text: { type: "mrkdwn", text: `*${[contact.firstName, contact.lastName].filter(Boolean).join(" ") || contact.email}* submitted the workbook form.` } },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Email:*\n${contact.email}` },
            { type: "mrkdwn", text: `*Company:*\n${contact.company}` },
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
    if (!BREVO_API_KEY || !BREVO_WORKBOOK_LIST_ID) {
      return NextResponse.json({ error: "Workbook form is not configured" }, { status: 500 });
    }

    const payload = (await req.json()) as WorkbookPayload;
    const contact = {
      firstName: clean(payload.firstName),
      lastName: clean(payload.lastName),
      email: normalizeEmail(payload.email),
      company: clean(payload.company),
    };

    const missing = [
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

    await upsertBrevoWorkbookContact(contact);
    results.brevo = { skipped: false };

    try {
      const attio = await upsertAttioPerson(contact);
      results.attio = attio;
      if (!attio.skipped && attio.recordId) {
        await createAttioWorkbookNote(attio.recordId, payload, contact);
        results.attioNote = { skipped: false };
      }
    } catch (error) {
      console.error(error);
      results.attio = { skipped: false, error: "Attio sync failed" };
    }

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
