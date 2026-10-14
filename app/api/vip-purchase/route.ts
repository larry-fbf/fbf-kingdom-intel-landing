import { NextResponse } from "next/server";

// Legacy browser return, NOT a Stripe webhook. Payton confirms external Zapier
// owns paid fulfillment. No second writer, Stripe key, or inferred entitlement.
export async function POST() {
  return NextResponse.json({ ok: false, status: "unverified", retryable: false,
    message: "This page cannot verify payment or VIP access. Check your receipt and access email; contact support if missing. Do not purchase again.",
  }, { status: 202, headers: { "Cache-Control": "no-store" } });
}
