import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You Are Registered! | Kingdom Intelligence Masterclass",
  description: "You are registered for the Kingdom Intelligence Masterclass. Join our community and invite your friends.",
};

const COMMUNITY_URL = "https://www.facebook.com/groups/fueledbyfirealliance";
const LANDING_URL = "https://fbfchallenge.com";

export default function ThankYou() {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;700;900&family=Work+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Work Sans', sans-serif; background: #0a0a0a; color: #FFFFFF; overflow-x: hidden; }
          h1, h2, h3 { font-family: 'Frank Ruhl Libre', Georgia, serif; }
          a { text-decoration: none; color: inherit; }
          @media (max-width: 640px) {
            .hero-split { flex-direction: column !important; }
            .hero-photo-col { width: 100% !important; max-height: 360px !important; min-height: 280px !important; }
            .hero-text-col { padding: 36px 20px !important; }
            .invite-inner { padding: 48px 20px !important; }
            .gold-btn { width: 100% !important; text-align: center !important; }
          }
        `}</style>
      </head>
      <body>

        {/* ── LOGO BAR ── */}
        <div style={{ background: "#0a0a0a", padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" style={{ height: "44px", display: "block" }} />
        </div>

        {/* ── REGISTERED BANNER ── */}
        <div style={{ background: "#CC0000", padding: "18px 20px", textAlign: "center" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}>
            You Are Registered &mdash; April 14&ndash;16, 2026 &middot; 12:00 PM CST
          </p>
        </div>

        {/* ── SECTION 1: HERO SPLIT ── */}
        <section style={{ background: "#0a0a0a" }}>
          <div className="hero-split" style={{ display: "flex", maxWidth: "1100px", margin: "0 auto", minHeight: "500px" }}>

            {/* Photo */}
            <div className="hero-photo-col" style={{ flex: "0 0 42%", position: "relative", overflow: "hidden", minHeight: "480px" }}>
              <img
                src="/images/staci-headshot-best.jpg"
                alt="Staci Wallace"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", position: "absolute", top: 0, left: 0 }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 65%, #0a0a0a 100%)" }} />
            </div>

            {/* Text */}
            <div className="hero-text-col" style={{ flex: "1 1 58%", display: "flex", alignItems: "center", padding: "60px 56px 60px 48px" }}>
              <div style={{ maxWidth: "520px" }}>
                <h1 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "24px" }}>
                  Let&rsquo;s get your journey started and build a life and business you love.
                </h1>
                <div style={{ width: "56px", height: "3px", background: "#CC0000", marginBottom: "28px", borderRadius: "2px" }} />
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "20px" }}>
                  Please make sure to <strong style={{ color: "#FFFFFF" }}>check your email</strong> for an important welcome email from Staci regarding the &ldquo;Kingdom Intelligence Masterclass&rdquo;. (*If you don&rsquo;t see it please check your spam/promotions/junk folders.)
                </p>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "36px" }}>
                  Also &mdash; make sure to join our Kingdom Intelligence Community and get your workbook to ensure you get the most out of your 3-day Masterclass and start <strong style={{ color: "#C9A55A" }}>TODAY</strong> creating a new season of increase, clarity, and impact.
                </p>
                <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="gold-btn" style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
                  color: "#120800", fontWeight: 800, padding: "16px 40px",
                  borderRadius: "6px", fontSize: "15px",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  boxShadow: "0 6px 24px rgba(185,148,90,0.4)",
                  fontFamily: "'Work Sans', sans-serif",
                }}>
                  Join the Community &amp; Get Bonus Videos
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: INVITE YOUR FRIENDS ── */}
        <section style={{ background: "#111111" }}>
          <div className="invite-inner" style={{ maxWidth: "860px", margin: "0 auto", padding: "72px 40px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A55A", marginBottom: "16px" }}>Share the Mission</p>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, color: "#FFFFFF", marginBottom: "40px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Invite Your Friends!
            </h2>

            <div style={{ borderLeft: "3px solid #CC0000", paddingLeft: "24px", textAlign: "left", marginBottom: "40px" }}>
              <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.85, fontStyle: "italic" }}>
                &ldquo;If you&rsquo;re anything like me, you are deeply passionate about helping others live a purpose-driven life and build a lasting legacy for their families. So, let&rsquo;s work together to reach even more lives with the Fueled by Fire message and Kingdom Intelligence Masterclass. Give your friends, family and colleagues a powerful gift worth $7,500 by inviting them to sign up today.
              </p>
              <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.85, fontStyle: "italic", marginTop: "16px" }}>
                You will think of many people during the three days that need to hear the messages I will be sharing &mdash; so why not now? Make a list of who you want to impact, and send them to the website below!&rdquo;
              </p>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#C9A55A", marginTop: "20px", fontStyle: "normal" }}>&mdash; Staci Wallace</p>
            </div>

            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "36px" }}>
              This one decision today could change their life and business forever!
            </p>

            <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" className="gold-btn" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
              color: "#120800", fontWeight: 800, padding: "18px 48px",
              borderRadius: "6px", fontSize: "16px",
              textTransform: "uppercase", letterSpacing: "0.08em",
              boxShadow: "0 6px 24px rgba(185,148,90,0.4)",
              fontFamily: "'Work Sans', sans-serif",
            }}>
              Send Them to the Masterclass
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "40px 20px", textAlign: "center" }}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" style={{ height: "36px", display: "inline-block", marginBottom: "16px" }} />
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "8px", fontFamily: "'Work Sans', sans-serif" }}>
            Fueled By Fire&reg; LLC. &nbsp;|&nbsp; Copyright &copy;2020&ndash;2026 &nbsp;|&nbsp; All Rights Reserved
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "8px" }}>
            <a href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Work Sans', sans-serif" }}>Privacy Policy</a>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>-</span>
            <a href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Work Sans', sans-serif" }}>Terms of Service</a>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>-</span>
            <a href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Work Sans', sans-serif" }}>Disclaimer</a>
          </div>
        </footer>

      </body>
    </html>
  );
}
