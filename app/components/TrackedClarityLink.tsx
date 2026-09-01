"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackClarityEvent, type ClarityTags } from "../lib/clarity-events";

type TrackedClarityLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventName: string;
  eventTags?: ClarityTags;
};

export default function TrackedClarityLink({
  children,
  eventName,
  eventTags,
  onClick,
  ...props
}: TrackedClarityLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackClarityEvent(eventName, eventTags);
    onClick?.(event);
  }

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
