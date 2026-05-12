import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_PAT = process.env.HUBSPOT_PAT || "";
const HUBSPOT_LIST_ID = "1015";

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

  const attributes: Record<string, string> = {
    FIRSTNAME: contact.firstName,
    LASTNAME: contact.lastName,
  };
  if (contact.phone) attributes.SMS = contact.phone;

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
        listIds: [BREVO_MASTERCLASS_LIST_ID],
        updateEnabled: true,
      }),
    },
    "Brevo contact"
  );

  return { skipped: false };
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

async function upsertHubSpotContact(contact: Required<Pick<RegistrationPayload, "email" | "firstName" | "lastName">> & { phone: string }) {
  if (!HUBSPOT_PAT) return { skipped: true };

  const contactBody = {
    properties: [
      { property: "email", value: contact.email },
      { property: "firstname", value: contact.firstName },
      { property: "lastname", value: contact.lastName },
      { property: "phone", value: contact.phone || "" },
      { property: "hs_lead_status", value: "NEW" },
      { property: "lifecyclestage", value: "lead" },
    ],
  };

  const contactData = await fetchJson(
    "https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/" + encodeURIComponent(contact.email),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HUBSPOT_PAT}`,
      },
      body: JSON.stringify(contactBody),
    },
    "HubSpot contact"
  );

  if (contactData?.vid) {
    await fetchJson(
      `https://api.hubapi.com/crm/v3/lists/${HUBSPOT_LIST_ID}/memberships/add`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUBSPOT_PAT}`,
        },
        body: JSON.stringify([String(contactData.vid)]),
      },
      "HubSpot list"
    );
  }

  return { skipped: false, vid: contactData?.vid };
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

    results.attio = await upsertAttioContact(contact);
    results.brevo = await upsertBrevoContact(contact);

    if (payload.agreed && phone) {
      results.simpleTexting = await upsertSimpleTextingContact(contact);
    } else {
      results.simpleTexting = { skipped: true, reason: "missing sms consent or phone" };
    }

    results.hubSpot = await upsertHubSpotContact(contact);

    return NextResponse.json({ ok: true, results });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
