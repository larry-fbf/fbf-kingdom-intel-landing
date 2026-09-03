import type { Metadata } from "next";
import ClarityPageViewEvent from "../components/ClarityPageViewEvent";
import TrackedClarityLink from "../components/TrackedClarityLink";
import ShareMasterclassButton from "./ShareMasterclassButton";

export const metadata: Metadata = {
  title: "Event Dashboard | Kingdom Intelligence Masterclass",
  description:
    "Access the live Zoom room, workbook, VIP upgrade, and replay updates for the Kingdom Intelligence Masterclass.",
  alternates: {
    canonical: "https://www.kingdomintel.com/dashboard",
  },
};

const WORKBOOK_URL = "/workbook";
const VIP_URL = "/vip";
const REGISTRATION_URL = "https://www.kingdomintel.com/";
const ZOOM_URL = "https://us02web.zoom.us/webinar/register/WN_36fBt-YSQ5qZgI0h8waQcQ";
const COMMUNITY_URL = "https://www.facebook.com/groups/fueledbyfirecommunity/";
const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbDiXJN7T8bbQGSxqt2H";

const replays = [
  {
    day: "Day 1",
    title: "Replay Coming Soon",
  },
  {
    day: "Day 2",
    title: "Replay Coming Soon",
  },
  {
    day: "Day 3",
    title: "Replay Coming Soon",
  },
];

export default function DashboardPage() {
  return (
    <main className="dashboard-shell">
      <ClarityPageViewEvent eventName="kim_dashboard_visit" />
      <style>{`
        .dashboard-shell {
          min-height: 100vh;
          background: #f4f2ee;
          color: #121212;
          font-family: 'Work Sans', Arial, sans-serif;
          overflow-x: hidden;
        }

        .dashboard-shell * {
          box-sizing: border-box;
        }

        .dashboard-wrap {
          width: calc(100% - 48px);
          max-width: 1220px;
          margin: 0 auto;
        }

        .dashboard-top {
          background: #f4f2ee;
          padding: 26px 0 46px;
          position: relative;
        }

        .dashboard-title {
          margin: 0 auto 22px;
          color: #cc0000;
          font-family: 'Anton', Arial, sans-serif;
          font-size: clamp(54px, 7.4vw, 104px);
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 0.92;
          text-align: center;
        }

        .schedule-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin: 0 auto 24px;
        }

        .schedule-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 44px;
          border: 1px solid #d8d3c9;
          border-radius: 999px;
          background: #fff;
          padding: 12px 18px;
          color: #24201b;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.02em;
          line-height: 1.25;
          text-align: center;
        }

        .schedule-pill strong {
          color: #cc0000;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .top-action-group {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(270px, 0.55fr);
          gap: 20px;
          align-items: stretch;
          margin-bottom: 20px;
        }

        .main-feature {
          display: flex;
          min-width: 0;
        }

        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin: 0 0 20px;
          align-items: stretch;
          min-width: 0;
        }

        .action-card {
          min-width: 0;
          max-width: 100%;
          min-height: 196px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          border: 1px solid #ddd8ce;
          border-radius: 8px;
          background: #fff;
          padding: 20px;
          color: #121212;
          text-decoration: none;
          overflow: hidden;
          overflow-wrap: anywhere;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .action-card:hover {
          transform: translateY(-2px);
          border-color: #c9a55a;
          box-shadow: 0 16px 34px rgba(0,0,0,0.12);
        }

        .workbook-card,
        .vip-card,
        .community-card,
        .whatsapp-card {
          background: #fff;
          border-color: #ddd8ce;
        }

        .action-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .action-step {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          min-height: 24px;
          border-radius: 999px;
          background: #f4f2ee;
          color: #635a4d;
          padding: 0 10px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .action-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: #f4f2ee;
          color: #1877f2;
        }

        .whatsapp-card .action-icon {
          color: #1f7a4f;
        }

        .action-eyebrow {
          margin: 0 0 8px;
          color: #5a3300;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .vip-card .action-eyebrow,
        .workbook-card .action-eyebrow {
          color: #5a3300;
        }

        .action-title {
          margin: 0 0 8px;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(24px, 2vw, 31px);
          font-weight: 900;
          letter-spacing: 0;
          line-height: 0.98;
          overflow-wrap: anywhere;
        }

        .action-detail {
          margin: 0;
          color: #3b2c14;
          font-size: 14px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .action-date {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          max-width: 100%;
          margin-top: 18px;
          border: 1px solid #d8d3c9;
          border-radius: 999px;
          padding: 10px 15px;
          color: #3a352f;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.04em;
          line-height: 1.25;
          text-align: center;
          text-transform: uppercase;
        }

        .action-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          min-height: 38px;
          border-radius: 5px;
          background: #cc0000;
          color: #fff;
          padding: 10px 16px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-image-card {
          display: block;
          width: 100%;
          height: 100%;
          border: 1px solid #d6caae;
          border-radius: 8px;
          background: #0b0b0b;
          box-shadow: 0 18px 44px rgba(0,0,0,0.16);
          overflow: hidden;
          text-decoration: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        }

        .hero-image-card:hover {
          transform: translateY(-2px);
          border-color: #c9a55a;
          box-shadow: 0 20px 48px rgba(0,0,0,0.2);
        }

        .hero-image-card:focus-visible {
          outline: 3px solid #cc0000;
          outline-offset: 4px;
        }

        .hero-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .join-strip {
          min-height: 100%;
          display: grid;
          grid-template-columns: 1fr;
          align-content: space-between;
          gap: 18px;
          border: 1px solid #222;
          border-radius: 8px;
          background: #090909;
          color: #fff;
          padding: 24px;
        }

        .join-label {
          margin: 0 0 5px;
          color: #cc0000;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .join-title {
          margin: 0;
          color: #fff;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(25px, 2.4vw, 35px);
          font-weight: 900;
          line-height: 1;
        }

        .join-detail {
          margin: 10px 0 0;
          color: rgba(255,255,255,0.76);
          font-size: 14px;
          line-height: 1.6;
        }

        .join-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-width: 0;
          min-height: 52px;
          border-radius: 5px;
          background: #cc0000;
          color: #fff;
          padding: 14px 24px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-align: center;
          text-decoration: none;
          text-transform: uppercase;
        }

        .date-pill {
          display: inline-flex;
          margin-top: 16px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 10px 16px;
          color: rgba(255,255,255,0.88);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .replays-section {
          background: #080808;
          padding: 54px 0 64px;
          color: #fff;
        }

        .section-label {
          margin: 0 0 7px;
          color: #cc0000;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .section-title {
          margin: 0;
          color: #fff;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 900;
          letter-spacing: 0;
          line-height: 1;
        }

        .replay-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 22px;
          margin-bottom: 20px;
        }

        .replay-note {
          max-width: 390px;
          margin: 0;
          color: rgba(255,255,255,0.64);
          font-size: 14px;
          line-height: 1.6;
          text-align: right;
        }

        .replay-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .replay-card {
          min-height: 138px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background: linear-gradient(135deg, #151515, #070707);
          padding: 22px;
          position: relative;
          overflow: hidden;
        }

        .replay-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('/images/kingdom-intel-dashboard-header.jpg');
          background-position: center;
          background-size: cover;
          opacity: 0.13;
        }

        .replay-card > * {
          position: relative;
          z-index: 1;
        }

        .community-strip {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(214px, auto);
          align-items: center;
          gap: 22px;
          margin-top: 18px;
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 8px;
          background: #101010;
          padding: 22px;
          overflow: hidden;
        }

        .community-label {
          margin: 0 0 7px;
          color: #c9a55a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .community-title {
          margin: 0;
          color: #fff;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(24px, 2.4vw, 34px);
          font-weight: 900;
          letter-spacing: 0;
          line-height: 1;
          overflow-wrap: break-word;
        }

        .community-detail {
          max-width: 660px;
          margin: 8px 0 0;
          color: rgba(255,255,255,0.62);
          font-size: 14px;
          line-height: 1.55;
          overflow-wrap: break-word;
        }

        .community-actions {
          display: grid;
          gap: 10px;
          min-width: 0;
        }

        .community-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 214px;
          min-height: 48px;
          border-radius: 5px;
          background: #cc0000;
          color: #fff;
          padding: 13px 20px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1.15;
          text-align: center;
          text-decoration: none;
          text-transform: uppercase;
        }

        .whatsapp-button {
          background: #1f7a4f;
        }

        .replay-day {
          margin: 0 0 12px;
          color: #c9a55a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .replay-title {
          margin: 0;
          color: #fff;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: 26px;
          font-weight: 900;
          line-height: 1;
        }

        .footer {
          background: #050505;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 38px 20px;
          text-align: center;
        }

        .footer img {
          height: 44px;
          width: auto;
          margin-bottom: 18px;
        }

        .footer p {
          margin: 0 0 8px;
          color: rgba(255,255,255,0.32);
          font-size: 12px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 16px;
        }

        .footer-links a {
          color: rgba(255,255,255,0.36);
          font-size: 12px;
          text-decoration: none;
        }

        @media (max-width: 980px) {
          .workflow-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-image-card {
            min-height: 420px;
          }
        }

        @media (max-width: 720px) {
          .dashboard-wrap {
            width: calc(100vw - 36px) !important;
            max-width: calc(100vw - 36px) !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .dashboard-top {
            padding: 22px 0 38px !important;
          }

          .dashboard-top > .dashboard-wrap {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .dashboard-title {
            order: 1;
            font-size: 38px;
            margin-bottom: 14px;
          }

          .schedule-row {
            order: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            flex-wrap: nowrap;
            width: 100%;
            margin: 0 0 14px;
          }

          .schedule-pill {
            flex: 1 1 auto;
            min-width: 0;
            border-radius: 8px;
            padding: 11px 10px;
            font-size: 10px;
            letter-spacing: 0.01em;
            white-space: nowrap;
          }

          .top-action-group {
            flex: 0 0 auto;
            width: auto;
            gap: 10px;
            flex-wrap: nowrap;
          }

          .hero-grid {
            display: contents;
          }

          .hero-image-card {
            order: 3;
          }

          .main-feature {
            order: 3;
            width: 100%;
            max-width: 100%;
          }

          .join-strip {
            order: 4;
            margin-top: 14px;
            grid-template-columns: 1fr;
            gap: 16px;
            width: 100%;
            max-width: 100%;
          }

          .workflow-grid {
            grid-template-columns: 1fr;
            order: 5;
            margin-top: 0;
            margin-bottom: 16px;
            width: 100%;
            max-width: 100%;
          }

          .action-card {
            min-height: auto;
            width: 100%;
            max-width: 100%;
            padding: 20px;
          }

          .action-title {
            font-size: 26px;
            line-height: 1;
          }

          .action-detail {
            font-size: 14px;
            line-height: 1.45;
          }

          .action-date {
            margin-top: 20px;
            white-space: normal;
          }

          .hero-image-card {
            min-height: auto;
            width: 100%;
            max-width: 100%;
            height: auto;
          }

          .hero-image {
            height: auto;
            object-fit: contain;
          }

          .join-button {
            width: 100%;
            min-width: 0;
          }

          .date-pill {
            white-space: normal;
            line-height: 1.4;
          }

          .replays-section {
            padding: 44px 0 54px !important;
          }

          .replay-head {
            display: block;
          }

          .replay-note {
            text-align: left;
            margin-top: 12px;
          }

          .replay-grid {
            grid-template-columns: 1fr;
          }

          .community-strip {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 20px;
          }

          .community-button {
            width: 100%;
            min-width: 0;
          }
        }
      `}</style>

      <section className="dashboard-top">
        <div className="dashboard-wrap">
          <h1 className="dashboard-title">Event Dashboard</h1>
          <div className="schedule-row" aria-label="Event schedule">
            <div className="schedule-pill">
              <span>September 15-17 | 12 PM Central</span>
            </div>
            <div className="top-action-group">
              <ShareMasterclassButton />
            </div>
          </div>

          <div className="hero-grid">
            <div className="main-feature">
              <TrackedClarityLink
                className="hero-image-card"
                aria-label="Kingdom Intelligence Masterclass"
                eventName="kim_dashboard_registration_image_click"
                eventTags={{ destination: "registration" }}
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="hero-image"
                  src="/images/kingdom-intel-dashboard-header.jpg"
                  alt="Kingdom Intelligence Masterclass"
                />
              </TrackedClarityLink>
            </div>

            <div className="join-strip">
              <div>
                <p className="join-label">Live Room</p>
                <h2 className="join-title">Join the Room</h2>
                <p className="join-detail">
                  Your seat is ready. Join us live for three days of Kingdom-centered strategy,
                  practical implementation, and real-time coaching.
                </p>
                <p className="join-detail">
                  Bring your workbook, arrive a few minutes early, and come prepared to turn insight
                  into action.
                </p>
                <div className="date-pill">September 15 to 17 | 12 PM Central</div>
              </div>
              <TrackedClarityLink
                className="join-button"
                eventName="kim_dashboard_zoom_click"
                eventTags={{ destination: "zoom" }}
                href={ZOOM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enter the Live Room
              </TrackedClarityLink>
            </div>
          </div>

          <div className="workflow-grid" aria-label="Priority dashboard workflow">
            <TrackedClarityLink
              className="action-card workbook-card"
              eventName="kim_dashboard_workbook_click"
              href={WORKBOOK_URL}
            >
              <div>
                <div className="action-meta">
                  <span className="action-step">Step 1</span>
                </div>
                <div>
                  <p className="action-eyebrow">Workbook</p>
                  <h2 className="action-title">Grab Your Workbook</h2>
                  <p className="action-detail">Complete the form and get your workbook sent to you.</p>
                </div>
              </div>
              <span className="action-cta">Get Workbook</span>
            </TrackedClarityLink>

            <TrackedClarityLink
              className="action-card vip-card"
              eventName="kim_dashboard_vip_click"
              href={VIP_URL}
            >
              <div>
                <div className="action-meta">
                  <span className="action-step">Step 2</span>
                </div>
                <div>
                  <p className="action-eyebrow">VIP</p>
                  <h2 className="action-title">VIP Upgrade</h2>
                  <p className="action-detail">
                    Unlock the VIP room, direct coaching, bonuses, and replay access.
                  </p>
                  <div className="action-date">September 16-17 | 7 PM Central</div>
                </div>
              </div>
              <span className="action-cta">Upgrade to VIP</span>
            </TrackedClarityLink>

            <TrackedClarityLink
              className="action-card community-card"
              eventName="kim_dashboard_facebook_click"
              eventTags={{ destination: "facebook_group", placement: "priority_workflow" }}
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="action-meta">
                  <span className="action-step">Step 3</span>
                  <span className="action-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.77 7.46h-3.52V5.51c0-.91.6-1.12 1.02-1.12h2.44V.15L15.35.14c-3.73 0-4.58 2.8-4.58 4.58v2.74H7.83v4.38h2.94V24h4.48V11.84h3.02l.5-4.38z" />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="action-eyebrow">Facebook</p>
                  <h2 className="action-title">Join the Community</h2>
                  <p className="action-detail">
                    Say hello, meet the other business owners in the room, and get to know the team before we go live.
                  </p>
                </div>
              </div>
              <span className="action-cta">Join Facebook</span>
            </TrackedClarityLink>

            <TrackedClarityLink
              className="action-card whatsapp-card"
              eventName="kim_dashboard_whatsapp_click"
              eventTags={{ destination: "whatsapp_channel", placement: "priority_workflow" }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="action-meta">
                  <span className="action-step">Step 4</span>
                  <span className="action-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44Zm-8.46 18.32h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.22-3.73.98 1-3.64-.24-.37a9.85 9.85 0 0 1-1.5-5.27c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c-.01 5.45-4.44 9.89-9.9 9.89Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.42-.07-.12-.27-.19-.57-.34Z" />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="action-eyebrow">WhatsApp</p>
                  <h2 className="action-title">Join the Group</h2>
                  <p className="action-detail">
                    Get session reminders, links, and extra free resources sent straight to your phone.
                  </p>
                </div>
              </div>
              <span className="action-cta">Join WhatsApp</span>
            </TrackedClarityLink>
          </div>
        </div>
      </section>

      <section className="replays-section">
        <div className="dashboard-wrap">
          <div className="replay-head">
            <div>
              <p className="section-label">Replay Library</p>
              <h2 className="section-title">Coming Soon</h2>
            </div>
            <p className="replay-note">
              Replays will be posted here after each live session is processed.
            </p>
          </div>

          <div className="replay-grid">
            {replays.map((replay) => (
              <article className="replay-card" key={replay.day}>
                <p className="replay-day">{replay.day}</p>
                <h3 className="replay-title">{replay.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" />
        <p>Fueled By Fire, LLC | Copyright 2026 | All Rights Reserved</p>
        <p>10% of every program fee supports Epiphany Global and EMwomen.</p>
        <div className="footer-links">
          <a href="https://www.fbfchallenge.com/privacy">Privacy Policy</a>
          <a href="https://www.fbfchallenge.com/terms">Terms of Service</a>
          <a href="https://www.fbfchallenge.com/disclaimer">Disclaimer</a>
        </div>
      </footer>
    </main>
  );
}
