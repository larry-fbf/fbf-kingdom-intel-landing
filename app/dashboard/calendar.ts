// Regular masterclass only. November dates are CST (UTC-06), after DST ends.
export const dashboardUrl = 'https://www.kingdomintel.com/dashboard';
export const description = `Use your personal Zoom join link from your confirmation email.\nDashboard: ${dashboardUrl}`;
export const sessions = [10, 11, 12].map((date, index) => ({
  day: index + 1,
  date,
  title: `Kingdom Intelligence Masterclass - Day ${index + 1}`,
  start: `202611${date}T180000Z`,
  end: `202611${date}T190000Z`,
  uid: `kingdom-intelligence-202611${date}@kingdomintel.com`,
}));

// RFC 5545 TEXT escaping and UTF-8-safe 75-octet content-line folding.
export function escapeIcsText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

export function foldIcsLine(value: string) {
  const lines: string[] = [];
  let line = '';
  for (const character of value) {
    if (Buffer.byteLength(line + character, 'utf8') > 75) {
      lines.push(line);
      line = ' ';
    }
    line += character;
  }
  return [...lines, line].join('\r\n');
}

export function calendarIcs() {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fueled By Fire//Kingdom Intelligence//EN', 'CALSCALE:GREGORIAN'];
  for (const session of sessions) {
    lines.push('BEGIN:VEVENT', `UID:${session.uid}`, 'DTSTAMP:20261023T000000Z',
      `DTSTART:${session.start}`, `DTEND:${session.end}`,
      `SUMMARY:${escapeIcsText(session.title)}`, `DESCRIPTION:${escapeIcsText(description)}`,
      'LOCATION:Online via Zoom', `URL:${dashboardUrl}`, 'END:VEVENT');
  }
  return [...lines, 'END:VCALENDAR'].map(foldIcsLine).join('\r\n') + '\r\n';
}

// Google's documented one-off template; each event needs its own save.
// https://developers.google.com/workspace/calendar/api/concepts/inviting-attendees-to-events
export function googleCalendarUrl(session: typeof sessions[number]) {
  const params = new URLSearchParams({
    action: 'TEMPLATE', dates: `${session.start}/${session.end}`,
    stz: 'America/Chicago', etz: 'America/Chicago',
    text: session.title, details: description, location: 'Online via Zoom',
  });
  return `https://calendar.google.com/calendar/r/eventedit?${params}`;
}
