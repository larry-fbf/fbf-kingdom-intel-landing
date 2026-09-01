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

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(300px, 0.68fr) minmax(0, 1.72fr);
          gap: 20px;
          align-items: start;
        }

        .main-feature {
          min-width: 0;
        }

        .side-actions {
          display: grid;
          gap: 16px;
        }

        .action-card {
          min-width: 0;
          min-height: 210px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 18px;
          border: 1px solid #ddd8ce;
          border-radius: 8px;
          background: #fff;
          padding: 22px;
          color: #121212;
          text-decoration: none;
          overflow: hidden;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .action-card:hover {
          transform: translateY(-2px);
          border-color: #c9a55a;
          box-shadow: 0 16px 34px rgba(0,0,0,0.12);
        }

        .workbook-card {
          background: #090909;
          border-color: #222;
          padding-bottom: 18px;
        }

        .workbook-card .action-eyebrow,
        .workbook-card .action-title,
        .workbook-card .action-detail {
          color: #fff;
          text-shadow: none;
        }

        .vip-card {
          background: #090909;
          border-color: #222;
          color: #fff;
        }

        .action-eyebrow {
          margin: 0 0 8px;
          color: #5a3300;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .vip-card .action-eyebrow {
          color: #e00000;
        }

        .vip-card .action-title,
        .vip-card .action-detail {
          color: #fff;
        }

        .action-title {
          margin: 0 0 8px;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(24px, 2vw, 31px);
          font-weight: 900;
          letter-spacing: 0;
          line-height: 0.98;
        }

        .action-detail {
          margin: 0;
          color: #3b2c14;
          font-size: 14px;
          line-height: 1.5;
          overflow-wrap: break-word;
        }

        .action-date {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          max-width: 100%;
          margin-top: 18px;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px;
          padding: 10px 15px;
          color: rgba(255,255,255,0.86);
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
          background: #111;
          color: #fff;
          padding: 10px 16px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .vip-card .action-cta {
          background: #cc0000;
          color: #fff;
        }

        .workbook-card .action-cta {
          background: #cc0000;
          color: #fff;
        }

        .hero-image-card {
          border: 1px solid #d6caae;
          border-radius: 8px;
          background: #0b0b0b;
          box-shadow: 0 18px 44px rgba(0,0,0,0.16);
          overflow: hidden;
        }

        .hero-image {
          display: block;
          width: 100%;
          height: auto;
        }

        .join-strip {
          margin-top: 18px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 22px;
          border: 1px solid #ddd8ce;
          border-radius: 8px;
          background: #fff;
          padding: 20px 22px;
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
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(25px, 2.4vw, 35px);
          font-weight: 900;
          line-height: 1;
        }

        .join-detail {
          margin: 8px 0 0;
          color: #5d5a55;
          font-size: 14px;
          line-height: 1.5;
        }

        .join-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
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
          border: 1px solid #d8d3c9;
          border-radius: 999px;
          padding: 10px 16px;
          color: #3a352f;
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
          .hero-grid {
            grid-template-columns: 1fr;
          }

          .side-actions {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: auto;
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
          }

          .dashboard-title {
            font-size: 38px;
            margin-bottom: 18px;
          }

          .schedule-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            margin-bottom: 18px;
          }

          .schedule-pill {
            min-width: 0;
            border-radius: 8px;
            padding: 12px 12px;
            font-size: 11px;
            letter-spacing: 0.01em;
          }

          .hero-grid {
            display: contents;
          }

          .hero-image-card {
            order: 1;
          }

          .main-feature {
            order: 1;
            width: 100%;
            max-width: 100%;
          }

          .join-strip {
            order: 2;
            margin-top: 14px;
            grid-template-columns: 1fr;
            gap: 16px;
            width: 100%;
            max-width: 100%;
          }

          .side-actions {
            grid-template-columns: 1fr;
            order: 3;
            margin-top: 16px;
            width: 100%;
            max-width: 100%;
          }

          .action-card {
            min-height: 210px;
            width: 100%;
            max-width: 100%;
          }

          .action-date {
            margin-top: 20px;
            white-space: normal;
          }

          .hero-image-card {
            min-height: auto;
            width: 100%;
            max-width: 100%;
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
            <ShareMasterclassButton />
          </div>

          <div className="hero-grid">
            <div className="side-actions">
              <TrackedClarityLink
                className="action-card workbook-card"
                eventName="kim_dashboard_workbook_click"
                href={WORKBOOK_URL}
              >
                <div>
                  <p className="action-eyebrow">Workbook</p>
                  <h2 className="action-title">Grab Your Workbook</h2>
                  <p className="action-detail">Complete the form and get your workbook sent to you.</p>
                </div>
                <span className="action-cta">Get Workbook</span>
              </TrackedClarityLink>

              <TrackedClarityLink
                className="action-card vip-card"
                eventName="kim_dashboard_vip_click"
                href={VIP_URL}
              >
                <div>
                  <p className="action-eyebrow">VIP</p>
                  <h2 className="action-title">VIP Upgrade</h2>
                  <p className="action-detail">
                    Unlock the VIP room, direct coaching, bonuses, and replay access.
                  </p>
                  <div className="action-date">September 16-17 | 7 PM Central</div>
                </div>
                <span className="action-cta">Upgrade to VIP</span>
              </TrackedClarityLink>
            </div>

            <div className="main-feature">
              <div
                className="hero-image-card"
                role="img"
                aria-label="Kingdom Intelligence Masterclass"
              >
                <img
                  className="hero-image"
                  src="/images/kingdom-intel-dashboard-header.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="join-strip">
            <div>
              <p className="join-label">Live Room</p>
              <h2 className="join-title">Join the Room</h2>
              <p className="join-detail">Enter the live Zoom room for each masterclass session.</p>
              <div className="date-pill">September 15-17 | 12 PM Central</div>
            </div>
            <TrackedClarityLink
              className="join-button"
              eventName="kim_dashboard_zoom_click"
              eventTags={{ destination: "zoom" }}
              href={ZOOM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Room
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

          <div className="community-strip">
            <div>
              <p className="community-label">FB Community</p>
              <h2 className="community-title">Join the FB Community</h2>
              <p className="community-detail">
                Connect with other faith-driven business owners in the Facebook group, then join
                the WhatsApp channel for live updates, links, and resources during the masterclass.
              </p>
            </div>
            <div className="community-actions">
              <TrackedClarityLink
                className="community-button"
                eventName="kim_dashboard_facebook_click"
                eventTags={{ destination: "facebook_group" }}
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Community
              </TrackedClarityLink>
              <TrackedClarityLink
                className="community-button whatsapp-button"
                eventName="kim_dashboard_whatsapp_click"
                eventTags={{ destination: "whatsapp_channel" }}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join WhatsApp
              </TrackedClarityLink>
            </div>
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
