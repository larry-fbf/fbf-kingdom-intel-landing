import { googleCalendarUrl, sessions } from './calendar';

export default function AddToCalendar() {
  return (
    <div className="action-card calendar-card" role="group" aria-labelledby="calendar-title">
      <style>{`
        .calendar-card summary { cursor: pointer; list-style: none; }
        .calendar-card summary::-webkit-details-marker { display: none; }
        .calendar-card summary::after { content: ' +'; margin-left: 8px; }
        .calendar-card details[open] summary::after { content: ' −'; }
        .calendar-card summary:focus-visible, .calendar-card a:focus-visible {
          outline: 3px solid #121212; outline-offset: 3px;
        }
        .calendar-options { margin-top: 16px; }
        .calendar-options p { margin: 12px 0 4px; }
        .calendar-options a {
          display: block; padding: 10px 0; color: #a80000;
          font-size: 14px; font-weight: 700; line-height: 1.5;
          text-decoration: underline; text-underline-offset: 3px;
        }
      `}</style>
      <div>
        <div className="action-meta"><span className="action-step">Step 4</span></div>
        <p className="action-eyebrow">Calendar</p>
        <h2 className="action-title" id="calendar-title">Add to Calendar</h2>
        <p className="action-detail">November 10–12, 2026<br />12–1 PM Central each day.</p>
      </div>
      <details>
        <summary className="action-cta">Choose Calendar</summary>
        <div className="calendar-options">
          <p className="action-detail"><strong>Google Calendar</strong><br />Save each day separately:</p>
          {sessions.map(session => (
            <a key={session.uid} href={googleCalendarUrl(session)} target="_blank" rel="noopener noreferrer">
              Day {session.day} · November {session.date}
            </a>
          ))}
          <p className="action-detail"><strong>Apple / Outlook</strong></p>
          <a href="/dashboard/calendar.ics" download="kingdom-intelligence-november-2026.ics">Download all 3 sessions (.ics)</a>
          <p className="action-detail">Import the downloaded file into your calendar. Use your personal Zoom join link from your confirmation email.</p>
        </div>
      </details>
    </div>
  );
}
