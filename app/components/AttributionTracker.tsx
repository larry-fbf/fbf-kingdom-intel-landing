"use client";

import { useEffect } from "react";
import { captureAttributionFromCurrentUrl } from "../lib/attribution";

export default function AttributionTracker() {
  useEffect(() => {
    captureAttributionFromCurrentUrl();
  }, []);

  return null;
}
