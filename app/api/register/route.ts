import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_PAT = process.env.HUBSPOT_PAT || "";
const KI_LIST_ID = "1015"; // Kingdom Intelligence Masterclass — April 2026

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, phone } = await req.json();

    const contactBody = {
      properties: [
        { property: "email", value: email },
        { property: "firstname", value: firstName },
        { property: "lastname", value: lastName },
        { property: "phone", value: phone || "" },
        { property: "hs_lead_status", value: "NEW" },
        { property: "lifecyclestage", value: "lead" },
      ],
    };

    // Step 1: Create or update contact
    const contactRes = await fetch(
      "https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/" + encodeURIComponent(email),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUBSPOT_PAT}`,
        },
        body: JSON.stringify(contactBody),
      }
    );

    if (!contactRes.ok) {
      const err = await contactRes.text();
      console.error("HubSpot contact error:", err);
      return NextResponse.json({ error: "HubSpot failed" }, { status: 500 });
    }

    const contactData = await contactRes.json();
    const vid = contactData.vid;

    // Step 2: Add contact to KI Masterclass list (list ID 1015) using v3 API
    if (vid) {
      await fetch(
        `https://api.hubapi.com/crm/v3/lists/${KI_LIST_ID}/memberships/add`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HUBSPOT_PAT}`,
          },
          body: JSON.stringify([String(vid)]),
        }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
