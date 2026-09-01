"use client";

import { useEffect } from "react";
import { trackClarityEvent, type ClarityTags } from "../lib/clarity-events";

type ClarityPageViewEventProps = {
  eventName: string;
  eventTags?: ClarityTags;
};

export default function ClarityPageViewEvent({
  eventName,
  eventTags,
}: ClarityPageViewEventProps) {
  useEffect(() => {
    trackClarityEvent(eventName, eventTags);
  }, [eventName, eventTags]);

  return null;
}
