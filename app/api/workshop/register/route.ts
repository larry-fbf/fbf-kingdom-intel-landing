import { NextRequest, NextResponse } from "next/server";

const ATTIO_API_KEY = process.env.ATTIO_API_KEY || "";
const ATTIO_WORKSHOP_LIST_ID = process.env.ATTIO_KI_WORKSHOP_AUGUST_2026_LIST_ID || "";
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_WORKSHOP_LIST_ID = Number(process.env.BREVO_KI_WORKSHOP_AUGUST_2026_LIST_ID || "0");
const SIMPLETEXTING_API_KEY = process.env.SIMPLETEXTING_API_KEY || "";
const SIMPLETEXTING_WORKSHOP_LIST_ID =
  process.env.SIMPLETEXTING_KI_WORKSHOP_AUGUST_2026_LIST_ID || "";
const SIMPLETEXTING_WORKSHOP_LIST_NAME =
  process.env.SIMPLETEXTING_KI_WORKSHOP_AUGUST_2026_LIST_NAME || "K.I.W. - Aug 2026";

type WorkshopRegistrationPayload = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  leaderType?: string;
  agreed?: boolean;
  event?: string;
  sourcePath?: string;
  queryString?: string;
};

function clean(value = "") {
  return value.trim();
}

function normalizeEmail(value = "") {
  return clean(value).toLowerCase();
}

function isValidNanpPhone(e164Phone: string) {
  const match = e164Phone.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  if (!match) return false;

  const [, areaCode, exchange] = match;
  if (/^[01]/.test(areaCode) || /^[01]/.test(exchange)) return false;
  if (areaCode === "555" || exchange === "555") return false;

  return true;
}

function normalizePhone(phone = "") {
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
  if (!res.ok) throw new Error(`${label} failed (${res.status}): ${await readError(res)}`);

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function parseSimpleTextingResponse(bodyText: string) {
  try {
    return JSON.parse(bodyText) as { code?: number; message?: string };
  } catch {
    const code = bodyText.match(/<code>(-?\d+)<\/code>/)?.[1];
    const message = bodyText.match(/<message>(.*?)<\/message>/)?.[1];
    return {
      code: code ? Number(code) : undefined,
      message: message ? message.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : bodyText,
    };
  }
}

function buildNote(payload: WorkshopRegistrationPayload, contact: { email: string; firstName: string; lastName: string; phone: string }) {
  return [
    "# Called, But Stuck workshop registration",
    "",
    `Name: ${contact.firstName} ${contact.lastName}`.trim(),
    `Email: ${contact.email}`,
    `Phone: ${contact.phone || "Not provided"}`,
    `Leader type: ${clean(payload.leaderType) || "Not provided"}`,
    "Event: Tuesday, August 18 at 11am CT / 12pm ET",
    `SMS consent: ${payload.agreed ? "yes" : "no"}`,
    `Source path: ${clean(payload.sourcePath) || "Not provided"}`,
    `Query string: ${clean(payload.queryString) || "Not provided"}`,
  ].join("\n");
}

async function upsertAttioContact(payload: WorkshopRegistrationPayload, contact: { email: string; firstName: string; lastName: string; phone: string }) {
  if (!ATTIO_API_KEY) return { skipped: true, reason: "missing ATTIO_API_KEY" };

  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: contact.email }],
    name: [
      {
        first_name: contact.firstName,
        last_name: contact.lastName,
        full_name: `${contact.firstName} ${contact.lastName}`.trim(),
      },
    ],
  };

  if (contact.phone) values.phone_numbers = [{ original_phone_number: contact.phone, country_code: "US" }];

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
    "Attio workshop contact",
  );

  const recordId = person?.data?.id?.record_id;
  if (!recordId) throw new Error("Attio workshop contact failed: missing record id");

  if (ATTIO_WORKSHOP_LIST_ID) {
    await fetchJson(
      `https://api.attio.com/v2/lists/${encodeURIComponent(ATTIO_WORKSHOP_LIST_ID)}/entries`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${ATTIO_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ data: { parent_record_id: recordId, parent_object: "people", entry_values: {} } }),
      },
      "Attio workshop list entry",
    );
  }

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
          title: "Called, But Stuck workshop registration",
          format: "plaintext",
          content: buildNote(payload, contact),
        },
      }),
    },
    "Attio workshop note",
  );

  return { skipped: false, recordId, listAdded: Boolean(ATTIO_WORKSHOP_LIST_ID) };
}

async function upsertBrevoContact(contact: { email: string; firstName: string; lastName: string; phone: string }) {
  if (!BREVO_API_KEY || !BREVO_WORKSHOP_LIST_ID) {
    return { skipped: true, reason: "missing Brevo workshop config" };
  }

  const attributes: Record<string, string> = {
    FIRSTNAME: contact.firstName,
    LASTNAME: contact.lastName,
    WORKSHOP: "Called, But Stuck - August 18",
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
        listIds: [BREVO_WORKSHOP_LIST_ID],
        updateEnabled: true,
      }),
    },
    "Brevo workshop contact",
  );

  return { skipped: false };
}

async function upsertSimpleTextingContact(contact: { email: string; firstName: string; lastName: string; phone: string }) {
  const group = SIMPLETEXTING_WORKSHOP_LIST_NAME || SIMPLETEXTING_WORKSHOP_LIST_ID;
  if (!SIMPLETEXTING_API_KEY || !group || !contact.phone) {
    return { skipped: true, reason: "missing SimpleTexting workshop config or phone" };
  }

  const body = new URLSearchParams({
    token: SIMPLETEXTING_API_KEY,
    group,
    phone: contact.phone,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    comment: "Called, But Stuck workshop - August 18 registration",
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
  const responseBody = parseSimpleTextingResponse(bodyText);

  if (responseBody.code === -607) return { skipped: false, alreadyInList: true };
  if (!res.ok || (typeof responseBody.code === "number" && responseBody.code < 0)) {
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
    const payload = (await req.json()) as WorkshopRegistrationPayload;
    const email = normalizeEmail(payload.email);
    const firstName = clean(payload.firstName);
    const lastName = clean(payload.lastName);
    const phone = normalizePhone(payload.phone);

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contact = { email, firstName, lastName, phone };
    const results: Record<string, unknown> = {};

    results.attio = await captureIntegration("Attio", () => upsertAttioContact(payload, contact));
    results.brevo = await captureIntegration("Brevo", () => upsertBrevoContact(contact));

    if (payload.agreed && phone) {
      results.simpleTexting = await captureIntegration("SimpleTexting", () => upsertSimpleTextingContact(contact));
    } else {
      results.simpleTexting = { skipped: true, reason: "missing sms consent or phone" };
    }

    return NextResponse.json({ ok: true, results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Workshop registration failed" }, { status: 500 });
  }
}
