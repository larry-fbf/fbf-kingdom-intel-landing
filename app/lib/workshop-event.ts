import { CENTRAL_ZONE, resolveDeviceZone } from './event-time';

// Workshop-owned configuration. Never fall back to October or January lists.
// Confirmed by Payton: December 9, 2026, noon America/Chicago. No end supplied.
// Filling these placeholders does NOT activate registration; release needs a
// separately reviewed adapter, consent, confirmation proof and fulfillment test.
export const WORKSHOP = {
  id: 'build-without-borrowing-december-2026',
  title: 'Build Without Borrowing',
  startsAt: '2026-12-09T18:00:00Z',
  timeZone: CENTRAL_ZONE,
  registrationStatus: 'closed',
  endsAt: null,
  price: null,
  replay: null,
  zoom: null,
  attioListId: null,
  brevoListId: null,
  smsListId: null,
} as const;

export function formatWorkshopTime(requestedZone?: string) {
  const timeZone = resolveDeviceZone(() => requestedZone);
  const start = new Date(WORKSHOP.startsAt);
  const format = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { ...options, timeZone }).format(start);
  const date = format({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const time = format({ hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
  return { date, time, schedule: `${date} · ${time}`, timeZone, accessible: format({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'long' }) };
}
