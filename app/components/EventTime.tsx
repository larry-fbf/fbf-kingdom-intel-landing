'use client';

import { useEffect, useState } from 'react';
import { CENTRAL_ZONE, formatEventTime, resolveDeviceZone, type EventKind } from '../lib/event-time';

export function useEventTime(event: EventKind = 'regular') {
  // The server and first client render are identical, including without JavaScript.
  const [zone, setZone] = useState(CENTRAL_ZONE);
  useEffect(() => { setZone(resolveDeviceZone()); }, []);
  return formatEventTime(event, zone);
}

type EventTimeProps = {
  event?: EventKind;
  variant?: 'dates' | 'shortDates' | 'time' | 'range' | 'fullDates' | 'schedule';
};

export default function EventTime({ event = 'regular', variant = 'schedule' }: EventTimeProps) {
  const display = useEventTime(event);
  return <span role="group" data-event-time={event} data-event-variant={variant} data-time-zone={display.timeZone} aria-label={variant === 'range' ? display.accessibleRange : display.accessible}>{display[variant]}</span>;
}
