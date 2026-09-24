import { NextResponse } from "next/server";

// Paid November activation is intentionally held. A legacy payment-link return
// cannot prove the purchased event, consent, or fulfillment. Never remap a
// September payment into November. Restore fulfillment only after independently
// verified paid-session/product/cohort mapping and idempotent provider delivery.
export async function POST() {
  return NextResponse.json({
    ok: false,
    status: "on_hold",
    retryable: false,
    error: "VIP access is not confirmed here. If you paid, contact support@fueledbyfire.com with your receipt. Do not purchase again.",
  }, { status: 503 });
}
