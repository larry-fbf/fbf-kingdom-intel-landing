import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You Are Registered | Kingdom Intelligence Masterclass",
  description: "Welcome to the Kingdom Intelligence community. Join us and start your journey today.",
};

const COMMUNITY_URL = "https://www.facebook.com/groups/fueledbyfirecommunity/";
const LANDING_URL = "/";

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
          body { font-family: 'Work Sans', sans-serif; background: #080808; color: #FFFFFF; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
          h1, h2, h3 { font-family: 'Frank Ruhl Libre', Georgia, serif; }
          a { text-decoration: none; color: inherit; }
          .gold-btn { transition: filter 0.2s, transform 0.2s, box-shadow 0.2s; }
          .gold-btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 12px 36px rgba(185,148,90,0.5); }
          .feature-card { transition: border-color 0.3s; }
          .feature-card:hover { border-color: rgba(201,165,90,0.5) !important; }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          .animate { animation: fadeInUp 0.7s ease both; }
          .animate-2 { animation: fadeInUp 0.7s 0.15s ease both; }
          .animate-3 { animation: fadeInUp 0.7s 0.3s ease both; }
          @media (max-width: 768px) {
            .hero-split { flex-direction: column !important; }
            .hero-photo { height: 320px !important; min-height: 320px !important; width: 100% !important; }
            .hero-text { padding: 40px 20px 56px !important; }
            .features-grid { grid-template-columns: 1fr !important; }
            .invite-grid { flex-direction: column !important; }
            .gold-btn { width: 100% !important; text-align: center !important; display: block !important; }
          }
        `}</style>
      </head>
      <body>

        {/* ── REGISTERED BANNER ── */}
        <div style={{ background: "linear-gradient(90deg, #AA0000 0%, #CC0000 50%, #AA0000 100%)", padding: "14px 20px", textAlign: "center" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFFFFF" }}>
            &#10003; &nbsp;You Are Registered &mdash; April 14&ndash;16, 2026 &nbsp;&middot;&nbsp; 12:00 PM CST &nbsp;&middot;&nbsp; Free Live Online Event
          </p>
        </div>

        {/* ── LOGO BAR ── */}
        <header style={{ background: "#080808", padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" style={{ height: "44px", display: "block" }} />
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            Kingdom Intelligence Masterclass
          </p>
        </header>

        {/* ── SECTION 1: HERO ── */}
        <section style={{ background: "#080808", position: "relative", overflow: "hidden" }}>
          {/* Subtle gold glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "800px", height: "600px", background: "radial-gradient(ellipse, rgba(201,165,90,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="hero-split" style={{ display: "flex", maxWidth: "1160px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            {/* Photo */}
            <div className="hero-photo" style={{ flex: "0 0 44%", position: "relative", overflow: "hidden", minHeight: "560px" }}>
              <img src="/images/staci-larry-split.webp" alt="Larry and Staci Wallace" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 55%, #080808 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 70%, #080808 100%)" }} />
            </div>

            {/* Text */}
            <div className="hero-text" style={{ flex: "1 1 56%", display: "flex", alignItems: "center", padding: "72px 64px 72px 40px" }}>
              <div className="animate" style={{ maxWidth: "540px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A55A", marginBottom: "20px" }}>
                  Welcome to the Fueled By Fire Community
                </p>
                <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "8px" }}>
                  One More Step Before You Go.
                </h1>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: "#CC0000", lineHeight: 1.2, marginBottom: "32px" }}>
                  Join Our Free Facebook Community.
                </h2>
                <div style={{ width: "48px", height: "3px", background: "#C9A55A", marginBottom: "32px", borderRadius: "2px" }} />
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.85, marginBottom: "16px" }}>
                  Make sure to <strong style={{ color: "#FFFFFF" }}>check your email</strong> for a welcome message from Staci with everything you need. (Check spam/promotions if you don&rsquo;t see it.)
                </p>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.85, marginBottom: "40px" }}>
                  Join the <strong style={{ color: "#C9A55A" }}>Fueled By Fire Community</strong> on Facebook — 30,000 faith-driven leaders building God-sized businesses. Connect, grow, and stay updated with everything happening in the Masterclass.
                </p>
                <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="gold-btn" style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
                  color: "#120800", fontWeight: 800, padding: "18px 44px",
                  borderRadius: "6px", fontSize: "16px",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  boxShadow: "0 6px 24px rgba(185,148,90,0.45)",
                }}>
                  Join the Facebook Community
                </a>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginTop: "12px", fontStyle: "italic" }}>Free access included with your registration.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: WHAT YOU GET ── */}
        <section style={{ background: "#111111", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A55A", textAlign: "center", marginBottom: "16px" }}>Inside the Community</p>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, color: "#FFFFFF", textAlign: "center", marginBottom: "52px", lineHeight: 1.15 }}>
              What Awaits You in the Kingdom Intel Network
            </h2>
            <div className="features-grid animate-2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {[
                { icon: "▶", title: "Bonus Training Videos", body: "3 exclusive bonus sessions on Mindset, Economy, and Time Expansion &mdash; only available to registered members." },
                { icon: "🤝", title: "Kingdom CEO Community", body: "Connect with hundreds of faith-driven leaders scaling businesses without sacrificing what matters most." },
                { icon: "📖", title: "Daily Encouragement", body: "Spirit-led content, frameworks, and insights delivered directly to your feed to keep you moving forward." },
                { icon: "⚡", title: "Live Event Access", body: "Get all Masterclass links, reminders, and updates through the community so you never miss a session." },
                { icon: "🌍", title: "Kingdom Impact Network", body: "Connect with leaders across industries who are using business as a platform for generosity and global impact." },
                { icon: "📋", title: "Masterclass Workbook", body: "Download the Kingdom Intelligence workbook inside the community and come prepared for every session." },
              ].map((f, i) => (
                <div key={i} className="feature-card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "28px 24px" }}>
                  <div style={{ fontSize: "28px", marginBottom: "14px", lineHeight: 1 }}>{f.icon}</div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px", fontFamily: "'Work Sans', sans-serif" }}>{f.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{f.body}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "48px" }}>
              <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="gold-btn" style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
                color: "#120800", fontWeight: 800, padding: "18px 48px",
                borderRadius: "6px", fontSize: "16px",
                textTransform: "uppercase", letterSpacing: "0.08em",
                boxShadow: "0 6px 24px rgba(185,148,90,0.45)",
              }}>
                Join Now &mdash; It&rsquo;s Free
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: INVITE FRIENDS ── */}
        <section style={{ background: "#080808", padding: "80px 24px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A55A", marginBottom: "16px" }}>Share the Mission</p>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, color: "#FFFFFF", marginBottom: "40px", textTransform: "uppercase" }}>
              Invite Your Friends!
            </h2>
            <div style={{ borderLeft: "3px solid #CC0000", paddingLeft: "28px", textAlign: "left", marginBottom: "40px" }}>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, fontStyle: "italic" }}>
                &ldquo;If you&rsquo;re anything like me, you are deeply passionate about helping others live a purpose-driven life and build a lasting legacy for their families. Give your friends, family, and colleagues a powerful gift worth $7,500 by inviting them to sign up today.
              </p>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, fontStyle: "italic", marginTop: "16px" }}>
                You will think of many people during the three days that need to hear these messages &mdash; so why not start now? Make a list and send them to the link below.&rdquo;
              </p>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#C9A55A", marginTop: "20px", fontStyle: "normal" }}>&mdash; Staci Wallace</p>
            </div>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "32px" }}>
              This one decision today could change their life and business forever.
            </p>
            <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" className="gold-btn" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
              color: "#120800", fontWeight: 800, padding: "18px 48px",
              borderRadius: "6px", fontSize: "16px",
              textTransform: "uppercase", letterSpacing: "0.08em",
              boxShadow: "0 6px 24px rgba(185,148,90,0.45)",
            }}>
              Share the Masterclass
            </a>
          </div>
        </section>

        {/* ── WARRIORS QUOTE ── */}
        <div style={{ background: "#CC0000", padding: "64px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", fontSize: "220px", color: "rgba(255,255,255,0.05)", fontFamily: "'Frank Ruhl Libre', Georgia, serif", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>&ldquo;</div>
          <p style={{ fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 900, color: "#FFFFFF", fontStyle: "italic", lineHeight: 1.15, position: "relative", zIndex: 1, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
            Warriors don&rsquo;t retreat.<br />They reload.
          </p>
          <div style={{ width: "48px", height: "3px", background: "rgba(255,255,255,0.4)", margin: "20px auto 14px", borderRadius: "2px" }} />
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", position: "relative", zIndex: 1 }}>&mdash; Staci Wallace</p>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 20px", textAlign: "center" }}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" style={{ height: "40px", display: "inline-block", marginBottom: "20px" }} />
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)", marginBottom: "6px" }}>Fueled By Fire&reg; LLC &nbsp;|&nbsp; Copyright &copy; 2020&ndash;2026 &nbsp;|&nbsp; All Rights Reserved</p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.2)", marginBottom: "16px" }}>10% of every program fee supports Epiphany Global (Uganda) &amp; EMwomen.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "Disclaimer"].map((t, i) => (
              <a key={i} href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>{t}</a>
            ))}
          </div>
        </footer>

      </body>
    </html>
  );
}
