import type { CSSProperties } from "react";
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

const pageStyle: CSSProperties = {
  background: "#080808",
  color: "#ffffff",
  fontFamily: "'Work Sans', Arial, sans-serif",
  overflowX: "hidden",
};

const containerStyle: CSSProperties = {
  width: "100%",
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "0 24px",
  boxSizing: "border-box",
};

const goldButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "54px",
  background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
  color: "#120800",
  fontWeight: 800,
  padding: "16px 30px",
  borderRadius: "6px",
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  boxShadow: "0 8px 28px rgba(185,148,90,0.38)",
  textDecoration: "none",
};

const redButtonStyle: CSSProperties = {
  ...goldButtonStyle,
  background: "linear-gradient(135deg, #AA0000 0%, #CC0000 50%, #AA0000 100%)",
  color: "#FFFFFF",
  boxShadow: "0 8px 28px rgba(204,0,0,0.34)",
};

const sectionLabelStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#C9A55A",
  marginBottom: "14px",
};

const actionCards = [
  {
    label: "Workbook",
    title: "Grab your workbook",
    body:
      "Use the Kingdom Intelligence Workbook to follow each lesson, capture notes, set action steps, and track your progress.",
    href: WORKBOOK_URL,
    cta: "Get Workbook",
    variant: "gold",
  },
  {
    label: "Live sessions",
    title: "Enter the live Zoom room",
    body:
      "Use this link when it is time to join the live masterclass sessions. Keep it handy for all three days.",
    href: ZOOM_URL,
    cta: "Join Live Room",
    variant: "red",
  },
  {
    label: "VIP",
    title: "Upgrade your experience",
    body:
      "Step into the VIP rooms for direct coaching, additional support, bonus resources, and lifetime replay access.",
    href: VIP_URL,
    cta: "View VIP Upgrade",
    variant: "gold",
  },
];

const replayCards = [
  {
    day: "Day 1",
    title: "Replay coming soon",
    body: "The Day 1 replay will be posted here after the live session is processed.",
  },
  {
    day: "Day 2",
    title: "Replay coming soon",
    body: "The Day 2 replay will be posted here after the live session is processed.",
  },
  {
    day: "Day 3",
    title: "Replay coming soon",
    body: "The Day 3 replay will be posted here after the live session is processed.",
  },
];

function DashboardFooter() {
  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "48px 20px",
        textAlign: "center",
      }}
    >
      <img
        src="/images/fbf-logo-white.png"
        alt="Fueled By Fire"
        style={{ height: "58px", width: "auto", display: "inline-block", marginBottom: "22px" }}
      />
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.32)", marginBottom: "8px" }}>
        Fueled By Fire, LLC | Copyright 2026 | All Rights Reserved
      </p>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.22)", marginBottom: "20px" }}>
        10% of every program fee supports Epiphany Global and EMwomen.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
        <a href="https://www.fbfchallenge.com/privacy" style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
          Privacy Policy
        </a>
        <a href="https://www.fbfchallenge.com/terms" style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
          Terms of Service
        </a>
        <a href="https://www.fbfchallenge.com/disclaimer" style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
          Disclaimer
        </a>
      </div>
    </footer>
  );
}

export default function DashboardPage() {
  return (
    <main style={pageStyle}>
      <style>{`
        .dashboard-topbar { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 28px 0; }
        .dashboard-container { width: 100%; box-sizing: border-box; }
        .dashboard-toplinks { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; }
        .dashboard-link { color: rgba(255,255,255,0.72); font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .dashboard-link:hover { color: #C9A55A; }
        .dashboard-hero-grid { display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr); gap: 48px; align-items: center; padding: 48px 0 76px; }
        .dashboard-hero-grid > * { min-width: 0; }
        .dashboard-title { font-size: clamp(44px, 7vw, 86px); font-weight: 400; color: #FFFFFF; line-height: 0.95; margin-bottom: 22px; font-family: 'Anton', Arial, sans-serif; text-transform: uppercase; letter-spacing: 0.01em; }
        .dashboard-title span { display: block; }
        .dashboard-section-title { font-size: clamp(30px, 4.5vw, 50px); font-weight: 900; line-height: 1.1; text-align: center; margin-bottom: 42px; }
        .dashboard-actions { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .dashboard-card { background: #111111; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 28px; min-height: 100%; }
        .dashboard-card:hover { border-color: rgba(201,165,90,0.45); }
        .dashboard-cta { transition: filter 0.2s, transform 0.2s, box-shadow 0.2s; }
        .dashboard-cta:hover { filter: brightness(1.08); transform: translateY(-2px); }
        .dashboard-replays { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
        .replay-thumb { aspect-ratio: 16 / 9; border-radius: 10px; background: radial-gradient(circle at 50% 30%, rgba(201,165,90,0.18), transparent 45%), linear-gradient(135deg, #151515, #050505); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
        .replay-thumb::after { content: ""; position: absolute; inset: 0; background-image: url('/images/hero-ai-bg.png'); background-size: cover; background-position: center; opacity: 0.24; }
        .play-mark { position: relative; z-index: 1; width: 64px; height: 64px; border-radius: 50%; background: rgba(204,0,0,0.92); display: flex; align-items: center; justify-content: center; }
        .play-mark::before { content: ""; width: 0; height: 0; border-top: 12px solid transparent; border-bottom: 12px solid transparent; border-left: 18px solid #fff; margin-left: 5px; }
        @media (max-width: 860px) {
          .dashboard-topbar { flex-direction: column; align-items: flex-start; padding: 22px 0; }
          .dashboard-container { max-width: 100vw !important; padding-left: 20px !important; padding-right: 20px !important; }
          .dashboard-toplinks { width: 100%; gap: 12px; }
          .dashboard-link { font-size: 12px; }
          .dashboard-hero-grid { grid-template-columns: 1fr; gap: 32px; padding: 32px 0 56px; }
          .dashboard-hero-grid p { max-width: 330px !important; font-size: 16px !important; overflow-wrap: break-word; }
          .dashboard-section-title { max-width: 330px !important; overflow-wrap: break-word; }
          .dashboard-card h3, .dashboard-card p { max-width: 300px !important; overflow-wrap: break-word; }
          .dashboard-title { font-size: clamp(42px, 11.8vw, 54px); line-height: 0.98; }
          .dashboard-section-title { font-size: 28px; }
          .dashboard-actions { grid-template-columns: 1fr; }
          .dashboard-replays { grid-template-columns: 1fr; }
          .dashboard-card { padding: 24px; }
          .dashboard-cta { width: 100%; max-width: calc(100vw - 40px); }
        }
      `}</style>

      <section
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(8,8,8,0.72), #080808 94%), url('/images/hero-ai-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="dashboard-container" style={containerStyle}>
          <div className="dashboard-topbar">
            <a href="/" aria-label="Kingdom Intelligence Masterclass home">
              <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" style={{ height: "56px", display: "block" }} />
            </a>
            <nav className="dashboard-toplinks" aria-label="Dashboard links">
              <a className="dashboard-link" href={WORKBOOK_URL}>
                Workbook
              </a>
              <a className="dashboard-link" href={VIP_URL}>
                VIP
              </a>
              <a className="dashboard-link" href={ZOOM_URL} target="_blank" rel="noopener noreferrer">
                Live Zoom Room
              </a>
            </nav>
          </div>

          <div className="dashboard-hero-grid">
            <div>
              <p style={sectionLabelStyle}>September 15-17, 2026 | 12 PM Central</p>
              <h1 className="dashboard-title">
                <span>Kingdom</span>
                <span>Intelligence</span>
                <span>Dashboard</span>
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.74)",
                  lineHeight: 1.8,
                  maxWidth: "580px",
                  marginBottom: "34px",
                }}
              >
                This is your hub for the free masterclass. Grab your workbook, join the live Zoom
                room, explore the VIP upgrade, and check back here after each session for replays.
              </p>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a className="dashboard-cta" href={ZOOM_URL} target="_blank" rel="noopener noreferrer" style={redButtonStyle}>
                  Enter Live Zoom Room
                </a>
                <a className="dashboard-cta" href={WORKBOOK_URL} style={goldButtonStyle}>
                  Grab Workbook
                </a>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                borderRadius: "14px",
                overflow: "hidden",
                minHeight: "420px",
                border: "1px solid rgba(201,165,90,0.24)",
                boxShadow: "0 28px 80px rgba(0,0,0,0.48)",
              }}
            >
              <img
                src="/images/staci-larry-hero-2026.png"
                alt="Staci and Larry Wallace"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.9), transparent 58%)" }} />
              <div style={{ position: "absolute", left: "28px", right: "28px", bottom: "26px" }}>
                <p style={{ fontSize: "12px", color: "#C9A55A", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Free live online event
                </p>
                <p style={{ fontSize: "22px", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.15 }}>
                  Build a company that can carry the weight of what you are praying for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", color: "#111111", padding: "76px 0" }}>
        <div className="dashboard-container" style={containerStyle}>
          <p style={{ ...sectionLabelStyle, color: "#CC0000", textAlign: "center" }}>Start here</p>
          <h2 className="dashboard-section-title">
            Your Masterclass Links
          </h2>
          <div className="dashboard-actions">
            {actionCards.map((card) => (
              <article key={card.title} className="dashboard-card" style={{ background: "#F8F8F8", borderColor: "#E6E6E6" }}>
                <p style={{ fontSize: "11px", color: "#CC0000", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "10px" }}>
                  {card.label}
                </p>
                <h3 style={{ fontSize: "22px", color: "#111111", lineHeight: 1.15, marginBottom: "12px", fontWeight: 900 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#555555", lineHeight: 1.7, marginBottom: "24px" }}>
                  {card.body}
                </p>
                <a
                  className="dashboard-cta"
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={card.variant === "red" ? redButtonStyle : goldButtonStyle}
                >
                  {card.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#080808", padding: "82px 0" }}>
        <div className="dashboard-container" style={containerStyle}>
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 44px" }}>
            <p style={sectionLabelStyle}>Replay library</p>
            <h2
              style={{
                fontSize: "clamp(34px, 5vw, 58px)",
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.05,
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              Replays Coming Soon
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.68)", lineHeight: 1.75 }}>
              After each live session, the replay will be posted here so you can revisit the
              teaching and share it with your team.
            </p>
          </div>
          <div className="dashboard-replays">
            {replayCards.map((replay) => (
              <article key={replay.day} className="dashboard-card">
                <div className="replay-thumb" aria-hidden="true">
                  <span className="play-mark" />
                </div>
                <p style={{ fontSize: "12px", color: "#C9A55A", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "22px", marginBottom: "8px" }}>
                  {replay.day}
                </p>
                <h3 style={{ fontSize: "22px", color: "#FFFFFF", marginBottom: "10px", lineHeight: 1.2 }}>
                  {replay.title}
                </h3>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.62)", lineHeight: 1.7 }}>
                  {replay.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#111111", padding: "72px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="dashboard-container" style={{ ...containerStyle, textAlign: "center", maxWidth: "860px" }}>
          <p style={sectionLabelStyle}>Before the first session</p>
          <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", color: "#FFFFFF", lineHeight: 1.12, marginBottom: "18px" }}>
            Keep this dashboard link handy.
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "32px" }}>
            You will receive this page by SMS and email. Use it as the central place for your
            workbook, live room, VIP upgrade, and replay access.
          </p>
          <a className="dashboard-cta" href={VIP_URL} style={goldButtonStyle}>
            See VIP Details
          </a>
        </div>
      </section>

      <DashboardFooter />
    </main>
  );
}
