"use client";

import { useEffect } from "react";
import { FUNNEL_EVENTS } from "../lib/funnel-events";
import { trackClarityEvent } from "../lib/clarity-events";

type FacebookPixel = (command: "track", eventName: string) => void;

// Mount only behind the server-verified registration confirmation gate.
export default function ConfirmedRegistrationAnalytics({ trackThankYouView = true }: { trackThankYouView?: boolean } = {}) {
  useEffect(() => {
    let confirmed = false;
    try {
      confirmed = window.sessionStorage.getItem("kim_registration_confirmed") === "true";
      if (confirmed) window.sessionStorage.removeItem("kim_registration_confirmed");
    } catch {
      // Fail closed if the per-tab deduplication marker cannot be consumed.
      confirmed = false;
    }

    if (trackThankYouView) trackClarityEvent(FUNNEL_EVENTS.thankYouView, {
      confirmed_registration: confirmed ? "true" : "false",
    });

    if (confirmed) {
      const fbq = (window as Window & { fbq?: FacebookPixel }).fbq;
      if (typeof fbq === "function") fbq("track", "CompleteRegistration");
    }
  }, []);

  return null;
}