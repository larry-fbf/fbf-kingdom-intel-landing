import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, phone } = await req.json();

  const payload = {
    properties: {
      email,
      firstname: firstName,
      lastname: lastName,
      phone: phone || "",
      lifecyclestage: "lead",
      hs_lead_status: "NEW",
      lead_source: "Kingdom Intelligence Masterclass Landing Page",
    },
  };

  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HUBSPOT_PAT}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.ok || res.status === 409) {
    // 409 = contact already exists — still a success
    return NextResponse.json({ ok: true });
  }

  const err = await res.text();
  console.error("HubSpot error:", err);
  return NextResponse.json({ ok: false }, { status: 500 });
}
