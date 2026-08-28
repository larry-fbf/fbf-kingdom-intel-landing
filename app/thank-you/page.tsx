import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import ShareMasterclassSection from "../components/ShareMasterclassSection";

export const metadata: Metadata = {
  title: "You Are Registered | Kingdom Intelligence Masterclass",
  description:
    "Your seat is confirmed for the Kingdom Intelligence Masterclass. Join the FBF community and check your email for next steps.",
};

const COMMUNITY_URL = "https://www.facebook.com/groups/fueledbyfirecommunity/";
const WORKBOOK_URL = "/workbook";

const shareSteps = [
  {
    title: "Watch your email and texts.",
    body: "You will receive reminder details and your Zoom link before the masterclass.",
  },
  {
    title: "Join the community.",
    body: "The community is the home base for updates, conversation, and masterclass resources.",
  },
  {
    title: "Bring your real question.",
    body: "Come ready with the business challenge you want feedback on during the masterclass.",
  },
];

const pageStyle: CSSProperties = {
  background: "#080808",
  color: "#ffffff",
  fontFamily: "'Work Sans', Arial, sans-serif",
  overflowX: "hidden",
};

const goldButtonStyle: CSSProperties = {
  display: "inline-block",
  background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
  color: "#120800",
  fontWeight: 800,
  padding: "18px 44px",
  borderRadius: "6px",
  fontSize: "16px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  boxShadow: "0 6px 24px rgba(185,148,90,0.45)",
  textDecoration: "none",
};

const sectionLabelStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#C9A55A",
  marginBottom: "16px",
};

const features = [
  {
    title: "Community updates",
    body: "Stay close to announcements, reminders, and conversation around the Kingdom Intelligence Masterclass.",
  },
  {
    title: "Kingdom CEO connection",
    body: "Step into a community of faith-driven leaders who are building businesses with God-sized vision.",
  },
  {
    title: "Next-step reminders",
    body: "Watch your email and texts for the dashboard link, workbook access, VIP invitation, live Zoom link, and replay updates.",
  },
];

function VimeoWelcomeVideo() {
  return (
    <div className="welcome-video" aria-label="A welcome message from Staci Wallace">
      <iframe
        src="https://player.vimeo.com/video/1194072208?badge=0&autopause=0&player_id=0&app_id=58479"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title="KIM Final Registration Welcome"
      />
    </div>
  );
}

export default function ThankYou() {
  return (
    <main style={pageStyle}>
      <Script id="fb-complete-registration" strategy="afterInteractive">
        {`if (window.fbq) window.fbq("track", "CompleteRegistration");`}
      </Script>
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Frank+Ruhl+Libre:wght@400;700;900&family=Work+Sans:wght@400;500;600;700;800&display=swap');
        .thank-you-hero { display: flex; max-width: 1160px; margin: 0 auto; position: relative; z-index: 1; }
        .thank-you-photo { flex: 0 0 44%; position: relative; overflow: hidden; min-height: 560px; }
        .thank-you-copy { flex: 1 1 56%; display: flex; align-items: center; min-width: 0; padding: 72px 64px 72px 40px; }
        .thank-you-copy-inner { width: 100%; max-width: 540px; min-width: 0; }
        .thank-you-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .thank-you-card { background: #F8F8F8; border: 1px solid #E8E8E8; border-radius: 10px; padding: 28px 24px; }
        .welcome-video { position: relative; width: 100%; max-width: 560px; aspect-ratio: 16 / 9; overflow: hidden; border: 1px solid rgba(201,165,90,0.35); border-radius: 8px; background: #000000; box-shadow: 0 18px 54px rgba(0,0,0,0.45); margin: 0 0 30px; }
        .welcome-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
        .workbook-section { background: #111111; padding: 88px 24px; }
        .workbook-panel { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 48px; align-items: center; max-width: 1060px; margin: 0 auto; }
        .workbook-cover-wrap { display: flex; justify-content: center; }
        .workbook-cover { width: min(100%, 360px); border-radius: 12px; box-shadow: 0 24px 70px rgba(0,0,0,0.5); border: 1px solid rgba(201,165,90,0.25); }
        .thank-you-gold-btn { transition: filter 0.2s, transform 0.2s, box-shadow 0.2s; }
        .thank-you-gold-btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 12px 36px rgba(185,148,90,0.5); }
        @media (max-width: 768px) {
          .thank-you-hero { flex-direction: column; width: 100%; max-width: 100%; padding-left: 0 !important; padding-right: 0 !important; overflow: hidden; }
          .thank-you-photo { height: 320px; min-height: 320px; width: 100%; }
          .thank-you-photo-gradient-side { display: none; }
          .thank-you-copy { width: 100%; max-width: 100%; box-sizing: border-box; padding: 40px 32px 56px; }
          .thank-you-copy-inner { width: 100%; max-width: 100%; }
          .welcome-video { max-width: 100%; }
          .registered-banner { padding: 12px 18px !important; }
          .registered-banner-text { font-size: 11px !important; letter-spacing: 0.1em !important; line-height: 1.35 !important; }
          .thank-you-features { grid-template-columns: 1fr; }
          .workbook-section { padding: 64px 20px; }
          .workbook-panel { grid-template-columns: 1fr; gap: 34px; }
          .workbook-cover { width: min(100%, 300px); }
          .thank-you-gold-btn { width: 100%; text-align: center; }
        }
      `}</style>

      <div
        className="registered-banner"
        style={{
          background: "linear-gradient(90deg, #AA0000 0%, #CC0000 50%, #AA0000 100%)",
          padding: "14px 20px",
          textAlign: "center",
        }}
      >
        <p
          className="registered-banner-text"
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          You are registered | September 15-17, 2026 | 12:00 PM Central | Free live online event
        </p>
      </div>

      <section style={{ background: "#080808", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "600px",
            background: "radial-gradient(ellipse, rgba(201,165,90,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="thank-you-hero">
          <div className="thank-you-photo">
            <img
              src="/images/staci-larry-split.webp"
              alt="Larry and Staci Wallace"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
            <div
              className="thank-you-photo-gradient-side"
              style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 55%, #080808 100%)" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 70%, #080808 100%)" }} />
          </div>

          <div className="thank-you-copy">
            <div className="thank-you-copy-inner">
              <p style={{ ...sectionLabelStyle, marginBottom: "20px" }}>Welcome to the FBF community</p>
              <h1
                style={{
                  fontSize: "clamp(38px, 6vw, 72px)",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  lineHeight: 1,
                  marginBottom: "12px",
                  fontFamily: "'Anton', Arial, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.01em",
                }}
              >
                One More Thing Before You Go.
              </h1>
              <h2
                style={{
                  fontSize: "clamp(22px, 3vw, 34px)",
                  fontWeight: 700,
                  color: "#CC0000",
                  lineHeight: 1.2,
                  marginBottom: "32px",
                  fontFamily: "'Frank Ruhl Libre', Georgia, serif",
                }}
              >
                Join the free FBF community.
              </h2>
              <div style={{ width: "48px", height: "3px", background: "#C9A55A", marginBottom: "32px", borderRadius: "2px" }} />
              <p style={sectionLabelStyle}>A message from Staci</p>
              <VimeoWelcomeVideo />
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.76)", lineHeight: 1.85, marginBottom: "20px" }}>
                Make sure to <strong style={{ color: "#FFFFFF" }}>check your email</strong> for your
                confirmation and next steps. If you do not see it, check spam or promotions.
              </p>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.76)", lineHeight: 1.85, marginBottom: "40px" }}>
                While you are here, join the <strong style={{ color: "#C9A55A" }}>Fueled By Fire
                community</strong> so you can stay connected with other faith-driven leaders and keep
                momentum going before the masterclass begins.
              </p>
              <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="thank-you-gold-btn" style={goldButtonStyle}>
                Join the FBF Community
              </a>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", marginTop: "12px", fontStyle: "italic" }}>
                Your dashboard, workbook, VIP invite, and live Zoom link will come by email and text.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <p style={{ ...sectionLabelStyle, color: "#CC0000", textAlign: "center" }}>What happens next</p>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 900,
              color: "#111111",
              textAlign: "center",
              marginBottom: "52px",
              lineHeight: 1.15,
              fontFamily: "'Frank Ruhl Libre', Georgia, serif",
            }}
          >
            Watch Your Email and Text Messages.
          </h2>
          <div className="thank-you-features">
            {features.map((feature) => (
              <article key={feature.title} className="thank-you-card">
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#111111",
                    marginBottom: "8px",
                    fontFamily: "'Work Sans', Arial, sans-serif",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#555555", lineHeight: 1.7 }}>{feature.body}</p>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="thank-you-gold-btn" style={goldButtonStyle}>
              Join Now - It&apos;s Free
            </a>
          </div>
        </div>
      </section>

      <section className="workbook-section">
        <div className="workbook-panel">
          <div className="workbook-cover-wrap">
            <img
              src="/images/kingdom-intelligence-workbook-cover.png"
              alt="Kingdom Intelligence Masterclass workbook"
              className="workbook-cover"
            />
          </div>
          <div>
            <p style={sectionLabelStyle}>Grab your workbook</p>
            <h2
              style={{
                fontSize: "clamp(30px, 4.5vw, 50px)",
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.1,
                marginBottom: "24px",
                fontFamily: "'Frank Ruhl Libre', Georgia, serif",
              }}
            >
              Take Your Masterclass Experience Deeper.
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.78)", lineHeight: 1.85, marginBottom: "18px" }}>
              Enhance your experience with the exclusive Kingdom Intelligence Workbook. This
              companion will guide you step by step through each lesson, helping you dive deeper
              into the strategies and principles you learn each day.
            </p>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.78)", lineHeight: 1.85, marginBottom: "34px" }}>
              Use it to reinforce your learning, set actionable goals, and track your progress
              throughout the masterclass. Fill out the form and we will send your workbook.
            </p>
            <a href={WORKBOOK_URL} className="thank-you-gold-btn" style={goldButtonStyle}>
              Grab Your Workbook
            </a>
          </div>
        </div>
      </section>

      <ShareMasterclassSection steps={shareSteps} />

      <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 20px", textAlign: "center" }}>
        <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" style={{ height: "40px", display: "inline-block", marginBottom: "20px" }} />
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)", marginBottom: "6px" }}>
          Fueled By Fire, LLC | Copyright 2026 | All Rights Reserved
        </p>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.2)", marginBottom: "16px" }}>
          10% of every program fee supports Epiphany Global and EMwomen.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          <a href="https://www.fbfchallenge.com/privacy" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
            Privacy Policy
          </a>
          <a href="https://www.fbfchallenge.com/terms" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
            Terms of Service
          </a>
          <a href="https://www.fbfchallenge.com/disclaimer" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
            Disclaimer
          </a>
        </div>
      </footer>
    </main>
  );
}
