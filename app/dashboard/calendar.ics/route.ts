import { calendarIcs } from '../calendar.ts';

export const dynamic = 'force-static';

export function GET() {
  return new Response(calendarIcs(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="kingdom-intelligence-november-2026.ics"',
    },
  });
}
