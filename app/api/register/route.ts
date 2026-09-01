import { NextRequest, NextResponse } from "next/server";

const ATTIO_API_KEY = process.env.ATTIO_API_KEY || "";
const ATTIO_MASTERCLASS_LIST_ID =
  process.env.ATTIO_KIM_SEPTEMBER_2026_LIST_ID ||
  process.env.ATTIO_KIM_JULY_2026_LIST_ID ||
  process.env.ATTIO_MASTERCLASS_LIST_ID ||
  "979ff89f-4f9e-4af6-828f-9cfd48be52de";
const ATTIO_DEFAULT_DEAL_OWNER_ID =
  process.env.ATTIO_KIM_SEPTEMBER_2026_DEAL_OWNER_ID ||
  process.env.ATTIO_DEFAULT_DEAL_OWNER_ID ||
  "166ff2ea-b9ce-4caa-b06a-4d64c555d5da";
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_MASTERCLASS_LIST_ID = Number(
  process.env.BREVO_KIM_SEPTEMBER_2026_LIST_ID ||
    process.env.BREVO_KIM_JULY_2026_LIST_ID ||
    process.env.BREVO_MASTERCLASS_LIST_ID ||
    "19",
);
const SIMPLETEXTING_API_KEY = process.env.SIMPLETEXTING_API_KEY || "";
const SIMPLETEXTING_KIM_SEPTEMBER_2026_LIST_ID = process.env.SIMPLETEXTING_KIM_SEPTEMBER_2026_LIST_ID || "";
const SIMPLETEXTING_KIM_SEPTEMBER_2026_LIST_NAME = process.env.SIMPLETEXTING_KIM_SEPTEMBER_2026_LIST_NAME || "";
const SIMPLETEXTING_MASTERCLASS_LIST_ID =
  SIMPLETEXTING_KIM_SEPTEMBER_2026_LIST_ID ||
  process.env.SIMPLETEXTING_KIM_JULY_2026_LIST_ID ||
  process.env.SIMPLETEXTING_MASTERCLASS_LIST_ID ||
  "6a3186065d1d20e476b5c75d";
const SIMPLETEXTING_MASTERCLASS_LIST_NAME =
  SIMPLETEXTING_KIM_SEPTEMBER_2026_LIST_NAME ||
  process.env.SIMPLETEXTING_KIM_JULY_2026_LIST_NAME ||
  process.env.SIMPLETEXTING_MASTERCLASS_LIST_NAME ||
  "K.I.M. - September 2026";

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

function isValidNanpPhone(e164Phone: string) {
  const match = e164Phone.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  if (!match) return false;

  const [, areaCode, exchange] = match;
  if (/^[01]/.test(areaCode) || /^[01]/.test(exchange)) return false;
  if (areaCode === "555" || exchange === "555") return false;

  return true;
}

function normalizePhoneForSync(phone = "") {
  const raw = phone.trim();
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

async function fetchJson(url: string, init: RequestInit, label: string) {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`${label} failed (${res.status}): ${await readError(res)}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function firstRecordValue(record: { values?: Record<string, unknown[]> } | null | undefined, slug: string) {
  return record?.values?.[slug]?.[0] as Record<string, unknown> | undefined;
}

function recordRefs(record: { values?: Record<string, unknown[]> } | null | undefined, slug: string) {
  return (record?.values?.[slug] || [])
    .map((item) => (item as { target_record_id?: string }).target_record_id)
    .filter(Boolean) as string[];
}

function attioTextValue(item: Record<string, unknown> | undefined) {
  const value =
    item?.value ||
    item?.title ||
    (item?.status as { title?: string } | undefined)?.title ||
    item?.full_name ||
    "";
  return String(value).replace(/\s+/g, " ").trim();
}

function attioFullName(record: { values?: Record<string, unknown[]> } | null | undefined, fallback: string) {
  const name = firstRecordValue(record, "name");
  return attioTextValue(name) || fallback;
}

function isStaffOrTestContact(contact: { email: string; firstName: string; lastName: string }) {
  const [localPart = "", domain = ""] = contact.email.split("@");
  const name = `${contact.firstName} ${contact.lastName}`.toLowerCase();
  const staffDomains = new Set(["fbfmastery.com", "paytonwallace.com", "christianeelizabeth.com"]);

  return (
    staffDomains.has(domain) ||
    ["example.com", "example.org", "test.com"].includes(domain) ||
    /\b(test|dummy|sample)\b/i.test(localPart.replace(/[._+-]/g, " ")) ||
    /\b(test|dummy|sample)\b/i.test(name)
  );
}

function isClientOrDoNotContact(record: { values?: Record<string, unknown[]> } | null | undefined) {
  const status = attioTextValue(firstRecordValue(record, "lead_status_1")).toLowerCase();
  return ["client", "onboarding", "alumni/past client", "past client", "do not contact"].includes(status);
}

async function getAttioPerson(recordId: string) {
  const person = await fetchJson(
    `https://api.attio.com/v2/objects/people/records/${encodeURIComponent(recordId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        Accept: "application/json",
      },
    },
    "Attio person lookup",
  );

  return person?.data;
}

async function createAttioDealForRegistrant(
  contact: Required<Pick<RegistrationPayload, "email" | "firstName" | "lastName">> & { phone: string },
  recordId: string,
) {
  if (!ATTIO_DEFAULT_DEAL_OWNER_ID) return { skipped: true, reason: "missing deal owner" };

  const person = await getAttioPerson(recordId);

  if (isStaffOrTestContact(contact)) return { skipped: true, reason: "staff_or_test" };
  if (isClientOrDoNotContact(person)) return { skipped: true, reason: "client_or_do_not_contact" };
  if (recordRefs(person, "associated_deals").length > 0) return { skipped: true, reason: "existing_deal" };

  const companyId = recordRefs(person, "company")[0] || "";
  const fullName = attioFullName(person, `${contact.firstName} ${contact.lastName}`.trim());
  const values: Record<string, unknown> = {
    name: `${fullName} - KIM Sept 2026`,
    stage: "Outreach",
    owner: {
      referenced_actor_type: "workspace-member",
      referenced_actor_id: ATTIO_DEFAULT_DEAL_OWNER_ID,
    },
    associated_people: [
      {
        target_object: "people",
        target_record_id: recordId,
      },
    ],
  };

  if (companyId) {
    values.associated_company = {
      target_object: "companies",
      target_record_id: companyId,
    };
  }

  const deal = await fetchJson(
    "https://api.attio.com/v2/objects/deals/records",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: { values } }),
    },
    "Attio deal",
  );

  return { skipped: false, recordId: deal?.data?.id?.record_id };
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

  const deal = await createAttioDealForRegistrant(contact, recordId);

  return { skipped: false, recordId, deal };
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
  const simpleTextingGroup =
    SIMPLETEXTING_KIM_SEPTEMBER_2026_LIST_ID ||
    SIMPLETEXTING_KIM_SEPTEMBER_2026_LIST_NAME ||
    SIMPLETEXTING_MASTERCLASS_LIST_ID ||
    SIMPLETEXTING_MASTERCLASS_LIST_NAME;
  if (!SIMPLETEXTING_API_KEY || !simpleTextingGroup || !contact.phone) return { skipped: true };

  const body = new URLSearchParams({
    token: SIMPLETEXTING_API_KEY,
    group: simpleTextingGroup,
    phone: contact.phone,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    comment: "Kingdom Intelligence Masterclass - September 2026 registration",
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

  if (responseBody.code === -607) {
    return { skipped: false, alreadyInList: true };
  }

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
    const payload = (await req.json()) as RegistrationPayload;
    const email = normalizeEmail(payload.email);
    const firstName = normalizeName(payload.firstName);
    const lastName = normalizeName(payload.lastName);
    const phone = normalizePhoneForSync(payload.phone);

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
