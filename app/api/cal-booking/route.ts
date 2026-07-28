import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const SLACK_CAL_BOOKING_WEBHOOK_URL = process.env.SLACK_CAL_BOOKING_WEBHOOK_URL || process.env.SLACK_WORKBOOK_WEBHOOK_URL || "";
const CALCOM_WEBHOOK_SECRET = process.env.CALCOM_WEBHOOK_SECRET || "";
const CALCOM_ALLOWED_EVENT_TYPE_SLUG = process.env.CALCOM_ALLOWED_EVENT_TYPE_SLUG || "consultation-call";

type CalPerson = {
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string | null;
  timeZone?: string;
};

type CalResponseValue = {
  label?: string;
  value?: unknown;
  isHidden?: boolean;
};

type CalBookingPayload = {
  triggerEvent?: string;
  createdAt?: string;
  payload?: {
    title?: string;
    eventTitle?: string;
    type?: string;
    startTime?: string;
    endTime?: string;
    attendees?: CalPerson[];
    organizer?: CalPerson;
    responses?: Record<string, CalResponseValue>;
    customInputs?: Record<string, unknown>;
    userFieldsResponses?: Record<string, unknown>;
    additionalNotes?: string;
    bookingId?: number;
    uid?: string;
    status?: string;
  };
};

function verifyCalSignature(body: string, signature: string | null) {
  if (!CALCOM_WEBHOOK_SECRET) return true;
  if (!signature) return false;

  const digest = crypto.createHmac("sha256", CALCOM_WEBHOOK_SECRET).update(body).digest("hex");
  const expected = Buffer.from(digest);
  const received = Buffer.from(signature);

  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function formatCentralTime(value?: string) {
  if (!value) return "Not provided";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function responseValue(responses: Record<string, CalResponseValue> | undefined, key: string) {
  const response = responses?.[key];
  if (!response || response.isHidden) return "";

  if (typeof response.value === "string") return response.value.trim();
  if (Array.isArray(response.value)) return response.value.join(", ");
  if (response.value && typeof response.value === "object") return JSON.stringify(response.value);

  return "";
}

function firstAnswer(responses: Record<string, CalResponseValue> | undefined, keys: string[]) {
  for (const key of keys) {
    const value = responseValue(responses, key);
    if (value) return value;
  }

  return "";
}

function visibleResponses(responses: Record<string, CalResponseValue> | undefined) {
  if (!responses) return [];

  return Object.entries(responses)
    .filter(([, response]) => !response.isHidden)
    .map(([key, response]) => {
      const label = clean(response.label) || key;
      const value =
        typeof response.value === "string"
          ? response.value.trim()
          : Array.isArray(response.value)
            ? response.value.join(", ")
            : response.value && typeof response.value === "object"
              ? JSON.stringify(response.value)
              : "";

      return value ? { label, value } : null;
    })
    .filter(Boolean)
    .slice(0, 8) as { label: string; value: string }[];
}

async function notifySlack(payload: NonNullable<CalBookingPayload["payload"]>) {
  if (!SLACK_CAL_BOOKING_WEBHOOK_URL) return { skipped: true, reason: "Slack webhook is not configured" };

  const attendee = payload.attendees?.[0] || {};
  const name = clean(attendee.name) || [clean(attendee.firstName), clean(attendee.lastName)].filter(Boolean).join(" ") || firstAnswer(payload.responses, ["name"]);
  const email = clean(attendee.email) || firstAnswer(payload.responses, ["email"]);
  const phone = clean(attendee.phoneNumber) || firstAnswer(payload.responses, ["attendeePhoneNumber", "phone"]);
  const title = clean(payload.eventTitle) || clean(payload.title) || "Consultation Call";
  const notes = clean(payload.additionalNotes) || firstAnswer(payload.responses, ["notes"]);
  const answers = visibleResponses(payload.responses).filter(({ label }) => !["name", "email", "phone_number", "location"].includes(label.toLowerCase()));

  const fields = [
    { type: "mrkdwn", text: `*Name:*\n${name || "Not provided"}` },
    { type: "mrkdwn", text: `*Email:*\n${email || "Not provided"}` },
    { type: "mrkdwn", text: `*Phone:*\n${phone || "Not provided"}` },
    { type: "mrkdwn", text: `*Call:*\n${title}` },
    { type: "mrkdwn", text: `*Starts:*\n${formatCentralTime(payload.startTime)}` },
    { type: "mrkdwn", text: `*Organizer:*\n${payload.organizer?.name || payload.organizer?.email || "Not provided"}` },
  ];

  const blocks: unknown[] = [
    { type: "header", text: { type: "plain_text", text: "New consultation call booked" } },
    { type: "section", text: { type: "mrkdwn", text: `*${name || "A prospect"}* booked a Fueled by Fire consultation call.` } },
    { type: "section", fields },
  ];

  if (notes) {
    blocks.push({ type: "section", text: { type: "mrkdwn", text: `*Notes:*\n${notes}` } });
  }

  if (answers.length) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: ["*Booking form answers:*", ...answers.map(({ label, value }) => `*${label}:* ${value}`)].join("\n"),
      },
    });
  }

  const res = await fetch(SLACK_CAL_BOOKING_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New consultation call booked: ${name || "prospect"}${email ? ` <${email}>` : ""}`,
      blocks,
    }),
  });

  if (!res.ok) throw new Error(`Slack notification failed (${res.status}): ${await res.text()}`);
  return { skipped: false };
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-cal-signature-256");

    if (!verifyCalSignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid Cal.com signature" }, { status: 401 });
    }

    const body = JSON.parse(rawBody) as CalBookingPayload;
    const booking = body.payload;

    if (body.triggerEvent !== "BOOKING_CREATED" || !booking) {
      return NextResponse.json({ ok: true, skipped: true, reason: "Ignored non-booking-created webhook" });
    }

    if (CALCOM_ALLOWED_EVENT_TYPE_SLUG && booking.type && booking.type !== CALCOM_ALLOWED_EVENT_TYPE_SLUG) {
      return NextResponse.json({ ok: true, skipped: true, reason: "Ignored different event type" });
    }

    const slack = await notifySlack(booking);
    return NextResponse.json({ ok: true, slack });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Cal.com booking webhook failed" }, { status: 500 });
  }
}
