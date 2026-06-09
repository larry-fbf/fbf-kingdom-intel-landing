import { NextRequest, NextResponse } from "next/server";

const ATTIO_API_KEY = process.env.ATTIO_API_KEY || "";
const ATTIO_MASTERCLASS_LIST_ID = process.env.ATTIO_MASTERCLASS_LIST_ID || "";
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_MASTERCLASS_LIST_ID = Number(process.env.BREVO_MASTERCLASS_LIST_ID || "0");
const SIMPLETEXTING_API_KEY = process.env.SIMPLETEXTING_API_KEY || "";
const SIMPLETEXTING_MASTERCLASS_LIST_ID = process.env.SIMPLETEXTING_MASTERCLASS_LIST_ID || "";
const SIMPLETEXTING_MASTERCLASS_LIST_NAME = process.env.SIMPLETEXTING_MASTERCLASS_LIST_NAME || "";

type RegistrationPayload = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  agreed?: boolean;
};

function normalizeEmail(email = "") {
  return email.trim().toLowerCase();
}

function normalizeName(value = "") {
  return value.trim();
}

function normalizeUsPhone(phone = "") {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone.trim();
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

async function upsertAttioContact(contact: Required<Pick<RegistrationPayload, "email" | "firstName" | "lastName">> & { phone: string }) {
  if (!ATTIO_API_KEY || !ATTIO_MASTERCLASS_LIST_ID) return { skipped: true };

  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: contact.email }],
    name: [{ first_name: contact.firstName, last_name: contact.lastName, full_name: `${contact.firstName} ${contact.lastName}`.trim() }],
  };

  if (contact.phone) {
    values.phone_numbers = [{ original_phone_number: contact.phone, country_code: "US" }];
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
    "Attio contact"
  );

  const recordId = person?.data?.id?.record_id;
  if (!recordId) throw new Error("Attio contact failed: missing record id");

  await fetchJson(
    `https://api.attio.com/v2/lists/${encodeURIComponent(ATTIO_MASTERCLASS_LIST_ID)}/entries`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: { parent_record_id: recordId, parent_object: "people", entry_values: {} } }),
    },
    "Attio list entry"
  );

  return { skipped: false, recordId };
}

async function upsertBrevoContact(contact: Required<Pick<RegistrationPayload, "email" | "firstName" | "lastName">> & { phone: string }) {
  if (!BREVO_API_KEY || !BREVO_MASTERCLASS_LIST_ID) return { skipped: true };

  const sendToBrevo = async (includeSms: boolean) => {
    const attributes: Record<string, string> = {
      FIRSTNAME: contact.firstName,
      LASTNAME: contact.lastName,
    };
    if (includeSms && contact.phone) attributes.SMS = contact.phone;

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: contact.email,
        attributes,
        listIds: [BREVO_MASTERCLASS_LIST_ID],
        updateEnabled: true,
      }),
    });

    const text = await res.text();
    const responseBody = text ? JSON.parse(text) : null;

    if (!res.ok) {
      return { ok: false, status: res.status, body: responseBody };
    }

    return { ok: true, status: res.status, body: responseBody };
  };

  const withSms = await sendToBrevo(Boolean(contact.phone));
  if (withSms.ok) return { skipped: false };

  const duplicateSms =
    withSms.status === 400 &&
    withSms.body?.code === "duplicate_parameter" &&
    typeof withSms.body?.message === "string" &&
    withSms.body.message.toLowerCase().includes("sms is already associated");

  if (duplicateSms && contact.phone) {
    const withoutSms = await sendToBrevo(false);
    if (withoutSms.ok) return { skipped: false, smsSkipped: "duplicate_sms" };
  }

  throw new Error(`Brevo contact failed (${withSms.status}): ${JSON.stringify(withSms.body)}`);
}

async function upsertSimpleTextingContact(contact: Required<Pick<RegistrationPayload, "email" | "firstName" | "lastName">> & { phone: string }) {
  const simpleTextingGroup = SIMPLETEXTING_MASTERCLASS_LIST_NAME || SIMPLETEXTING_MASTERCLASS_LIST_ID;
  if (!SIMPLETEXTING_API_KEY || !simpleTextingGroup || !contact.phone) return { skipped: true };

  const body = new URLSearchParams({
    token: SIMPLETEXTING_API_KEY,
    group: simpleTextingGroup,
    phone: contact.phone,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    comment: "Kingdom Intelligence Masterclass - June 2026 registration",
  });

  const res = await fetch("https://app2.simpletexting.com/v1/group/contact/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const bodyText = await res.text();
  let responseBody: { code?: number; message?: string } | string = bodyText;
  try {
    responseBody = JSON.parse(bodyText);
  } catch {
    // keep raw text
  }

  if (typeof responseBody === "object" && responseBody.code === -607) {
    return { skipped: false, alreadyInList: true };
  }

  if (!res.ok || (typeof responseBody === "object" && typeof responseBody.code === "number" && responseBody.code < 0)) {
    throw new Error(`SimpleTexting contact failed (${res.status}): ${JSON.stringify(responseBody)}`);
  }

  return { skipped: false };
}

async function captureIntegration<T>(label: string, task: () => Promise<T>) {
  try {
    return await task();
  } catch (error) {
    console.error(`${label} integration failed`, error);
    return { skipped: false, error: `${label} integration failed` };
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as RegistrationPayload;
    const email = normalizeEmail(payload.email);
    const firstName = normalizeName(payload.firstName);
    const lastName = normalizeName(payload.lastName);
    const phone = normalizeUsPhone(payload.phone);

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contact = { email, firstName, lastName, phone };
    const results: Record<string, unknown> = {};

    results.attio = await captureIntegration("Attio", () => upsertAttioContact(contact));
    results.brevo = await captureIntegration("Brevo", () => upsertBrevoContact(contact));

    if (payload.agreed && phone) {
      results.simpleTexting = await captureIntegration("SimpleTexting", () => upsertSimpleTextingContact(contact));
    } else {
      results.simpleTexting = { skipped: true, reason: "missing sms consent or phone" };
    }

    return NextResponse.json({ ok: true, results });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: true, warning: "Registration accepted with processing errors" });
  }
}
