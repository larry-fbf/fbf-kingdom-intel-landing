// Regular masterclass only. November dates are CST (UTC-06), after DST ends.
export const dashboardUrl = 'https://www.kingdomintel.com/dashboard';
export const description = `Welcome to the 3-Day Kingdom Intelligence Masterclass

I am so excited to see you registered for our 3 day Kingdom Intel Masterclass!!

This 3-day event will happen LIVE by Zoom. Accepting this invite will add our free event to your Google calendar so you can make sure you don't miss anything!\u0020

If you haven't already recieved an email from zoom for the masterclass, here is the link: https://us02web.zoom.us/webinar/register/WN_PljsUSceQdWHip96F1O18g

Important details:

- You will be sent the Zoom link daily by email, and by texts if you opted into text messaging.

- If you miss any of the classes, you will have access to the replays during the week on your www.kingdomintel.com/dashboard.

- It is important to watch live if possible because we will be giving away over $10,000 in prizes and scholarships.

- For those who are serious about scaling to the next level, on day 2 & 3 of our challenge we will have a VIP room for Q & A.

FAQ:

Q: How do I connect with someone?
A: You should have received a text message, DM, and/or email from your "Advocate". Type the word advocate as a comment on any of the live videos and your advocate will send you a message for more help. Feel free to email us at anytime at support@fbfmastery.com

Q: I filled out the form for the workbook. Where can I find it?
A: Check your junk or spam mail. Or try again at kingdomintel.com/workbook

Q: How can I learn more about Fueled by Fire?
A: Go to www.fbfmastery.com`;
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
