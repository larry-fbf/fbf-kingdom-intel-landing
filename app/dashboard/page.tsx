import type { Metadata } from "next";

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

const actions = [
  {
    eyebrow: "Workbook",
    title: "Grab Your Workbook",
    detail: "Complete the form and get your workbook sent to you.",
    href: WORKBOOK_URL,
    cta: "Get Workbook",
    tone: "gold",
  },
  {
    eyebrow: "Live Room",
    title: "Join the Room",
    detail: "Enter the live Zoom room for each masterclass session.",
    href: ZOOM_URL,
    cta: "Join Live",
    tone: "dark",
  },
  {
    eyebrow: "VIP",
    title: "VIP Upgrade",
    detail: "Unlock the VIP room, direct coaching, bonuses, and replay access.",
    href: VIP_URL,
    cta: "Upgrade to VIP",
    tone: "red",
  },
];

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

        .dashboard-top {
          background: #f4f2ee;
          color: #121212;
        }

        .dashboard-bar,
        .dashboard-wrap {
          width: calc(100% - 48px);
          max-width: 1180px;
          margin: 0 auto;
        }

        .dashboard-bar {
          min-height: 132px;
          display: grid;
          grid-template-columns: 96px minmax(0, 1fr) 96px;
          align-items: center;
          gap: 20px;
          padding: 24px 0 10px;
        }

        .dashboard-logo {
          height: 52px;
          width: auto;
          display: block;
        }

        .dashboard-kicker {
          margin: 0 0 4px;
          color: #8d7338;
          font-size: clamp(14px, 1.25vw, 18px);
          font-weight: 800;
          letter-spacing: 0.1em;
          text-align: center;
        }

        .dashboard-title {
          margin: 0;
          color: #cc0000;
          font-family: 'Anton', Arial, sans-serif;
          font-size: clamp(54px, 6vw, 88px);
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 0.94;
          text-align: center;
        }

        .hero-block {
          padding: 8px 0 22px;
          background: #f4f2ee;
        }

        .hero-image {
          display: block;
          width: 780px;
          max-width: 100%;
          margin: 0 auto;
          height: auto;
          border: 1px solid #d6caae;
          box-shadow: 0 18px 44px rgba(0,0,0,0.16);
        }

        .quick-links {
          margin-top: -1px;
          padding: 0 0 48px;
          background: #f4f2ee;
        }

        .quick-links-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 12px;
        }

        .section-label {
          margin: 0 0 7px;
          color: #cc0000;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
        }

        .section-title {
          margin: 0;
          color: #121212;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 900;
          letter-spacing: 0;
          line-height: 1;
        }

        .date-pill {
          flex: 0 0 auto;
          border: 1px solid #d8d3c9;
          border-radius: 999px;
          padding: 10px 16px;
          color: #3a352f;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .action-card {
          width: 100%;
          min-width: 0;
          min-height: 148px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid #ddd8ce;
          border-radius: 8px;
          background: #fff;
          padding: 22px;
          color: #121212;
          text-decoration: none;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .action-card:hover {
          transform: translateY(-2px);
          border-color: #c9a55a;
          box-shadow: 0 16px 34px rgba(0,0,0,0.12);
        }

        .action-card.dark {
          background: #fff;
          border-color: #ddd8ce;
          color: #121212;
        }

        .action-card.red {
          background: #cc0000;
          border-color: #e33a32;
          color: #fff;
        }

        .action-card.gold {
          background: linear-gradient(135deg, #c9a55a 0%, #e8d080 52%, #bb945a 100%);
          border-color: #c9a55a;
        }

        .action-eyebrow {
          margin: 0 0 8px;
          color: #cc0000;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .action-card.red .action-eyebrow {
          color: rgba(255,255,255,0.84);
        }

        .action-card.gold .action-eyebrow {
          color: #4c2b00;
        }

        .action-title {
          margin: 0 0 8px;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(22px, 1.8vw, 26px);
          font-weight: 900;
          line-height: 1;
        }

        .action-detail {
          margin: 0 0 16px;
          color: #5d5a55;
          font-size: 14px;
          line-height: 1.55;
          overflow-wrap: break-word;
        }

        .action-card.red .action-detail {
          color: rgba(255,255,255,0.82);
        }

        .action-card.gold .action-detail {
          color: #3b2c14;
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
        }

        .action-card.red .action-cta {
          background: #fff;
          color: #cc0000;
        }

        .action-card.gold .action-cta {
          background: #fff;
          color: #111;
        }

        .replays-section {
          background: #080808;
          padding: 54px 0 64px;
          color: #fff;
        }

        .replay-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 22px;
          margin-bottom: 20px;
        }

        .replay-head .section-title {
          color: #fff;
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

        .replay-day {
          margin: 0 0 12px;
          color: #c9a55a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.18em;
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

        @media (max-width: 860px) {
          .dashboard-top {
            padding: 0 !important;
          }

          .dashboard-bar,
          .dashboard-wrap {
            width: calc(100vw - 36px) !important;
            max-width: calc(100vw - 36px) !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .dashboard-bar {
            display: flex;
            flex-direction: column;
            min-height: auto;
            align-items: center;
            gap: 8px;
            padding: 18px 0 8px;
          }

          .dashboard-bar > span {
            display: none;
          }

          .dashboard-title {
            max-width: 100%;
            font-size: 48px;
            line-height: 0.95;
          }

          .dashboard-kicker {
            max-width: 100%;
            font-size: 13px;
            letter-spacing: 0.08em;
            overflow-wrap: break-word;
          }

          .dashboard-logo {
            height: 36px;
          }

          .hero-block {
            padding: 10px 0 18px !important;
          }

          .hero-image {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
          }

          .quick-links {
            padding: 0 0 40px !important;
          }

          .replays-section {
            padding: 44px 0 54px !important;
          }

          .quick-links-head,
          .replay-head {
            display: block;
          }

          .date-pill {
            display: inline-flex;
            margin-top: 14px;
            white-space: normal;
            line-height: 1.4;
          }

          .action-grid,
          .replay-grid {
            grid-template-columns: 1fr;
          }

          .action-card {
            min-height: 146px;
            overflow: hidden;
          }

          .replay-note {
            text-align: left;
            margin-top: 12px;
          }
        }
      `}</style>

      <section className="dashboard-top">
        <div className="dashboard-bar">
          <a href="/" aria-label="Kingdom Intelligence Masterclass home">
            <img className="dashboard-logo" src="/images/fbf-logo-black.png" alt="Fueled By Fire" />
          </a>
          <div>
            <p className="dashboard-kicker">Kingdom Intelligence Masterclass</p>
            <h1 className="dashboard-title">Event Dashboard</h1>
          </div>
          <span aria-hidden="true" />
        </div>
      </section>

      <section className="hero-block">
        <div className="dashboard-wrap">
          <img
            className="hero-image"
            src="/images/kingdom-intel-dashboard-header.jpg"
            alt="Kingdom Intelligence Masterclass"
          />
        </div>
      </section>

      <section className="quick-links">
        <div className="dashboard-wrap">
          <div className="quick-links-head">
            <div>
              <p className="section-label">Start Here</p>
              <h2 className="section-title">Your Masterclass Links</h2>
            </div>
            <div className="date-pill">September 15-17 | 12 PM Central</div>
          </div>

          <div className="action-grid">
            {actions.map((action) => (
              <a
                key={action.title}
                className={`action-card ${action.tone}`}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <div>
                  <p className="action-eyebrow">{action.eyebrow}</p>
                  <h3 className="action-title">{action.title}</h3>
                  <p className="action-detail">{action.detail}</p>
                </div>
                <span className="action-cta">{action.cta}</span>
              </a>
            ))}
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
