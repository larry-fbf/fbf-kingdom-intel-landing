// Display-only instants. Provider configuration and calendar exports stay independent.
export const CENTRAL_ZONE = 'America/Chicago';
export const EVENT_STARTS = {
  regular: ['2027-01-05T18:00:00Z', '2027-01-06T18:00:00Z', '2027-01-07T18:00:00Z'],
  vip: ['2027-01-07T01:00:00Z', '2027-01-08T01:00:00Z'],
} as const;
export type EventKind = keyof typeof EVENT_STARTS;

export function resolveDeviceZone(readZone = (): string | undefined => Intl.DateTimeFormat().resolvedOptions().timeZone) {
  try {
    const zone = readZone();
    if (zone) {
      new Intl.DateTimeFormat('en-US', { timeZone: zone }).format(0);
      return zone;
    }
  } catch { /* Missing or invalid device zone: retain the canonical fallback. */ }
  return CENTRAL_ZONE;
}

export function formatEventTime(event: EventKind, requestedZone?: string) {
  const timeZone = resolveDeviceZone(() => requestedZone);
  const starts = EVENT_STARTS[event].map(value => new Date(value));
  const format = (date: Date, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-US', { ...options, timeZone }).format(date);
  const first = starts[0], last = starts[starts.length - 1];
  const month = format(first, { month: 'long' });
  const dates = `${month} ${format(first, { day: 'numeric' })}–${format(last, { day: 'numeric' })}, ${format(first, { year: 'numeric' })}`;
  const time = format(first, { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
  const end = new Date(first.getTime() + 60 * 60 * 1000);
  const nextDay = format(first, { day: 'numeric' }) !== format(end, { day: 'numeric' });
  const range = event === 'vip' ? time : `${format(first, { hour: 'numeric', minute: '2-digit' })}–${format(end, { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}${nextDay ? ' (next day)' : ''}`;
  const fullDates = starts.map(date => format(date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })).join(' & ');
  const accessible = starts.map(date => format(date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'long' })).join('; ');
  const accessibleRange = event === 'vip' ? accessible : `${accessible}. Each session lasts one hour; ${range}.`;
  return { dates, shortDates: dates.replace(month, format(first, { month: 'short' })).replace(/, \d{4}$/, ''), time, range, fullDates, accessible, accessibleRange, schedule: `${dates} · ${time}`, timeZone };
}
