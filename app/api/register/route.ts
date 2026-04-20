import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_PAT = process.env.HUBSPOT_PAT || "";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, phone } = await req.json();

    const body = {
      properties: [
        { property: "email", value: email },
        { property: "firstname", value: firstName },
        { property: "lastname", value: lastName },
        { property: "phone", value: phone || "" },
        { property: "hs_lead_status", value: "NEW" },
        { property: "lifecyclestage", value: "lead" },
      ],
    };

    const res = await fetch("https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/" + encodeURIComponent(email), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HUBSPOT_PAT}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("HubSpot error:", err);
      return NextResponse.json({ error: "HubSpot failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
