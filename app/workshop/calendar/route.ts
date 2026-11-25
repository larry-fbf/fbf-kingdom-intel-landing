import { workshopCalendarIcs } from '../../lib/workshop-calendar';
export function GET() {
 return new Response(workshopCalendarIcs(), {headers:{'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':'attachment; filename="build-without-borrowing.ics"','Cache-Control':'no-store'}});
}
