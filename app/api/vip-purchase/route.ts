import { NextRequest, NextResponse } from "next/server";

const ATTIO_API_KEY = process.env.ATTIO_API_KEY || "";
const ATTIO_VIP_LIST_ID = process.env.ATTIO_KIM_VIP_JULY_2026_LIST_ID || "d60168f2-ec59-4c60-ac9d-40d55f3d9b22";
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_MASTERCLASS_LIST_ID = Number(process.env.BREVO_KIM_JULY_2026_LIST_ID || process.env.BREVO_MASTERCLASS_LIST_ID || "19");
const SIMPLETEXTING_API_KEY = process.env.SIMPLETEXTING_API_KEY || "";
const SIMPLETEXTING_MASTERCLASS_LIST_NAME =
  process.env.SIMPLETEXTING_KIM_JULY_2026_LIST_NAME || process.env.SIMPLETEXTING_MASTERCLASS_LIST_NAME || "K.I.M. - July 2026";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

type StripeSession = {
  id?: string;
  customer_details?: {
    email?: string | null;
    name?: string | null;
    phone?: string | null;
  } | null;
  customer_email?: string | null;
  payment_status?: string | null;
};

type Contact = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

function normalizeEmail(email = "") {
  return email.trim().toLowerCase();
}

function splitName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "VIP",
    lastName: parts.slice(1).join(" ") || "Guest",
  };
}

function normalizePhoneForSync(phone = "") {
  const raw = phone.trim();
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (raw.startsWith("+") && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return "";
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

async function getStripeSession(sessionId: string): Promise<StripeSession | null> {
  if (!STRIPE_SECRET_KEY || !sessionId) return null;

  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Stripe session lookup failed (${res.status}): ${await readError(res)}`);
  }

  return (await res.json()) as StripeSession;
}

async function upsertAttioVipContact(contact: Contact) {
  if (!ATTIO_API_KEY || !ATTIO_VIP_LIST_ID) return { skipped: true, reason: "missing_attio_env" };

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
    "Attio VIP contact"
  );

  const recordId = person?.data?.id?.record_id;
  if (!recordId) throw new Error("Attio VIP contact failed: missing record id");

  await fetchJson(
    `https://api.attio.com/v2/lists/${encodeURIComponent(ATTIO_VIP_LIST_ID)}/entries`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: {
          parent_record_id: recordId,
          parent_object: "people",
          entry_values: {},
        },
      }),
    },
    "Attio VIP list entry"
  );

  return { skipped: false, recordId };
}

async function upsertBrevoReminderContact(contact: Contact) {
  if (!BREVO_API_KEY || !BREVO_MASTERCLASS_LIST_ID) return { skipped: true, reason: "missing_brevo_env" };

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
        attributes: {
          FIRSTNAME: contact.firstName,
          LASTNAME: contact.lastName,
          ...(contact.phone ? { SMS: contact.phone } : {}),
        },
        listIds: [BREVO_MASTERCLASS_LIST_ID],
        updateEnabled: true,
      }),
    },
    "Brevo VIP reminder contact"
  );

  return { skipped: false };
}

async function upsertSimpleTextingReminderContact(contact: Contact) {
  if (!SIMPLETEXTING_API_KEY || !SIMPLETEXTING_MASTERCLASS_LIST_NAME || !contact.phone) {
    return { skipped: true, reason: "missing_sms_env_or_phone" };
  }

  const body = new URLSearchParams({
    token: SIMPLETEXTING_API_KEY,
    group: SIMPLETEXTING_MASTERCLASS_LIST_NAME,
    phone: contact.phone,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    comment: "Kingdom Intelligence Masterclass VIP July 2026 purchase",
  });

  const res = await fetch("https://app2.simpletexting.com/v1/group/contact/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const text = await res.text();
  if (!res.ok && !text.includes("<code>-607</code>")) {
    throw new Error(`SimpleTexting VIP contact failed (${res.status}): ${text}`);
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
    const payload = (await req.json()) as { sessionId?: string };
    const session = await getStripeSession(payload.sessionId || "");

    if (!session) {
      return NextResponse.json({ ok: true, skipped: true, reason: "missing_stripe_env_or_session" });
    }

    if (session.payment_status && session.payment_status !== "paid") {
      return NextResponse.json({ ok: true, skipped: true, reason: "payment_not_paid" });
    }

    const email = normalizeEmail(session.customer_details?.email || session.customer_email || "");
    if (!email) {
      return NextResponse.json({ ok: true, skipped: true, reason: "missing_customer_email" });
    }

    const name = splitName(session.customer_details?.name || "");
    const contact = {
      email,
      firstName: name.firstName,
      lastName: name.lastName,
      phone: normalizePhoneForSync(session.customer_details?.phone || ""),
    };

    const results: Record<string, unknown> = {};
    results.attio = await captureIntegration("Attio VIP", () => upsertAttioVipContact(contact));
    results.brevo = await captureIntegration("Brevo VIP reminder", () => upsertBrevoReminderContact(contact));
    results.simpleTexting = await captureIntegration("SimpleTexting VIP reminder", () => upsertSimpleTextingReminderContact(contact));

    return NextResponse.json({ ok: true, results });
  } catch (error) {
    console.error("VIP purchase sync failed", error);
    return NextResponse.json({ ok: true, warning: "VIP purchase accepted with processing errors" });
  }
}
