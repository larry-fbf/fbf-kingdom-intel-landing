// Regular masterclass only. November dates are CST (UTC-06), after DST ends.
export const dashboardUrl = 'https://www.kingdomintel.com/dashboard';
export const description = `Use your personal Zoom join link from your confirmation email.\nDashboard: ${dashboardUrl}`;
const series = {
  title: 'Kingdom Intelligence Masterclass',
  start: '20261110T180000Z',
  end: '20261110T190000Z',
  uid: 'kingdom-intelligence-20261110-series@kingdomintel.com',
  recurrence: 'RRULE:FREQ=DAILY;COUNT=3',
};

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
  lines.push('BEGIN:VEVENT', `UID:${series.uid}`, 'DTSTAMP:20261029T000000Z',
    `DTSTART:${series.start}`, `DTEND:${series.end}`, series.recurrence,
    `SUMMARY:${escapeIcsText(series.title)}`, `DESCRIPTION:${escapeIcsText(description)}`,
    'LOCATION:Online via Zoom', `URL:${dashboardUrl}`, 'END:VEVENT');
  return [...lines, 'END:VCALENDAR'].map(foldIcsLine).join('\r\n') + '\r\n';
}

// Google web template recurrence matches add2cal/add-to-calendar-button's
// src/generators/google.ts at 7d689427941be7f05318f1199436c81d505dafa1.
// Keep HTTPS: native app handling (especially iOS recurrence) is platform-dependent.
export function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE', dates: `${series.start}/${series.end}`,
    stz: 'America/Chicago', etz: 'America/Chicago',
    ctz: 'America/Chicago', recur: series.recurrence,
    text: series.title, details: description, location: 'Online via Zoom',
  });
  return `https://calendar.google.com/calendar/r/eventedit?${params}`;
}
