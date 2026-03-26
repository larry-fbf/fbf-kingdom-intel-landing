"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const REGISTER_URL = "#register";

/* -- REGISTRATION MODAL -- */
function RegisterModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", phone: "", agreed: false });
  const [status, setStatus] = useState<"idle"|"loading"|"error">("idle");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) { alert("Please agree to receive communications to continue."); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/thank-you");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", borderRadius: "6px",
    border: "1px solid #E0E0E0", fontSize: "15px",
    fontFamily: "'Work Sans', sans-serif", color: "#111",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.78)", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "20px",
      backdropFilter: "blur(4px)",
    }}>
      <div onClick={e => e.stopPropagation()} className="modal-inner" style={{
        background: "#FFFFFF", borderRadius: "16px", padding: "48px 40px",
        maxWidth: "540px", width: "100%", position: "relative",
        maxHeight: "92vh", overflowY: "auto",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)"
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "20px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#aaa", lineHeight: 1, fontWeight: 700 }}>X</button>

        <>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <img src="/images/fbf-logo-black.png" alt="FBF" style={{ height: "36px", marginBottom: "20px", display: "inline-block" }} />
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 900, color: "#111", lineHeight: 1.2, marginBottom: "8px" }}>
                Join the FREE Kingdom Intelligence<br />Masterclass · April 14&ndash;16, 2026
              </h2>
              <p style={{ fontSize: "14px", color: "#CC0000", fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                Your decision to join has the potential to be the biggest choice you make in 2026.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#111", display: "block", marginBottom: "6px", fontFamily: "'Work Sans', sans-serif" }}>Email *</label>
                <input required type="email" style={inputStyle} value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
              </div>
              <div className="modal-name-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#111", display: "block", marginBottom: "6px", fontFamily: "'Work Sans', sans-serif" }}>First Name *</label>
                  <input required type="text" style={inputStyle} value={form.firstName} onChange={e => setForm(f => ({...f, firstName: e.target.value}))} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#111", display: "block", marginBottom: "6px", fontFamily: "'Work Sans', sans-serif" }}>Last Name *</label>
                  <input required type="text" style={inputStyle} value={form.lastName} onChange={e => setForm(f => ({...f, lastName: e.target.value}))} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#111", display: "block", marginBottom: "6px", fontFamily: "'Work Sans', sans-serif" }}>Mobile Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
              </div>

              <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: "16px" }}>
                <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.6, marginBottom: "12px", fontFamily: "'Work Sans', sans-serif" }}>
                  Fueled By Fire, LLC values your privacy. We&rsquo;ll use your info to manage your account and deliver the services you&rsquo;ve asked for.
                </p>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.agreed} onChange={e => setForm(f => ({...f, agreed: e.target.checked}))} style={{ marginTop: "3px", flexShrink: 0, width: "16px", height: "16px", accentColor: "#CC0000" }} />
                  <span style={{ fontSize: "13px", color: "#444", fontFamily: "'Work Sans', sans-serif", lineHeight: 1.5 }}>
                    I agree to receive emails and, optionally, SMS from Fueled By Fire, LLC.*
                  </span>
                </label>
              </div>

              <button type="submit" disabled={status === "loading"} style={{
                background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
                color: "#120800", fontWeight: 800, padding: "16px", borderRadius: "6px",
                border: "none", fontSize: "16px", cursor: "pointer", letterSpacing: "0.08em",
                textTransform: "uppercase" as const, fontFamily: "'Work Sans', sans-serif",
                opacity: status === "loading" ? 0.7 : 1,
              }}>
                {status === "loading" ? "Registering..." : "RSVP NOW"}
              </button>

              {status === "error" && (
                <p style={{ fontSize: "13px", color: "#CC0000", textAlign: "center", fontFamily: "'Work Sans', sans-serif" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
        </>
      </div>
    </div>
  );
}

/* -- SCROLL REVEAL -- */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* -- CTA BUTTON -- */
function CTAButton({ text = "SAVE MY SEAT", dark = false, onOpen }: { text?: string; dark?: boolean; onOpen?: () => void }) {
  return (
    <div className="cta-wrapper" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <button onClick={onOpen} className="cta-btn" style={{
        background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
        color: "#120800", fontWeight: 800, padding: "18px 48px", borderRadius: "5px",
        fontSize: "18px", cursor: "pointer", textTransform: "uppercase" as const,
        letterSpacing: "0.08em", boxShadow: "0 6px 24px rgba(185,148,90,0.45)",
        fontFamily: "'Work Sans', sans-serif", border: "none",
      }}>
        {text}
      </button>
      <span style={{ fontSize: "13px", color: dark ? "#888" : "rgba(255,255,255,0.55)", fontStyle: "italic" }}>
        $7,500 Value. Limited seats. Live online event.
      </span>
    </div>
  );
}

/* -- HERO -- */
function Hero({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="hero-section" style={{ background: "#0d0d0d", position: "relative", overflow: "hidden", backgroundImage: "url(/images/hero-ai-bg.png)", backgroundSize: "cover", backgroundPosition: "center center" }}>
      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(105deg, rgba(13,13,13,0.92) 38%, rgba(13,13,13,0.75) 55%, rgba(13,13,13,0.55) 100%)",
        zIndex: 2, pointerEvents: "none",
      }} />


      {/* FBF Logo */}
      <div className="hero-logo-bar">
        <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" className="hero-logo" />
      </div>

      {/* Main content row */}
      <div className="hero-content-row" style={{ position: "relative", zIndex: 3 }}>

        {/* Photo col */}
        <div className="hero-photo-col">
          <img
            src="/images/staci-larry-hero-2026.png"
            alt="Staci and Larry Wallace"
            className="hero-photo"
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, transparent 60%, #0d0d0d 100%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Text col */}
        <div className="hero-text-col">

          {/* Headline */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{
              fontSize: "clamp(72px, 10.5vw, 148px)", fontWeight: 400, color: "#FFFFFF",
              lineHeight: 0.88, textTransform: "uppercase" as const, letterSpacing: "0.01em",
              fontFamily: "'Anton', sans-serif",
            }}>KINGDOM</div>
            <div style={{
              fontSize: "clamp(48px, 6.8vw, 100px)", fontWeight: 400, color: "#BB945A",
              lineHeight: 0.92, textTransform: "uppercase" as const, letterSpacing: "0.08em",
              fontFamily: "'Bebas Neue', sans-serif",
            }}>INTELLIGENCE</div>
            <div style={{
              fontSize: "clamp(16px, 2vw, 28px)", fontWeight: 400, color: "rgba(255,255,255,0.75)",
              lineHeight: 1.2, textTransform: "uppercase" as const, letterSpacing: "0.4em",
              fontFamily: "'Bebas Neue', sans-serif", marginTop: "10px",
            }}>MASTERCLASS</div>
          </div>

          {/* Divider */}
          <div style={{ width: "60px", height: "2px", background: "#BB945A", margin: "0 auto 28px" }} />

          {/* Subline */}
          <p style={{
            fontSize: "clamp(14px, 1.4vw, 18px)", color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7, marginBottom: "36px", fontFamily: "'Work Sans', sans-serif", maxWidth: "480px",
          }}>
            AI accelerates speed, but Kingdom Intelligence governs it with discernment.{" "}<span style={{ color: "#BB945A", fontWeight: 700 }}>Learn how to scale your business with Spirit-led strategy, operational efficiency, and predictable cash flow in the AI era.</span>
          </p>

          <CTAButton onOpen={onOpen} />

          {/* Event details bar */}
          <div className="hero-event-bar">
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#BB945A", fontFamily: "'Work Sans', sans-serif", fontWeight: 700, marginBottom: "4px" }}>Date</div>
              <div style={{ fontSize: "clamp(13px, 1.2vw, 16px)", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>April 14–16 @ 12 PM Central</div>
            </div>
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#BB945A", fontFamily: "'Work Sans', sans-serif", fontWeight: 700, marginBottom: "4px" }}>Register</div>
              <div style={{ fontSize: "clamp(13px, 1.2vw, 16px)", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>www.kingdomintel.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -- EVENT DETAILS -- */
function EventDetails() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#111111", lineHeight: 1.15, marginBottom: "28px" }}>
          We Are Entering the Most Disruptive Economic Shift in Modern History.
        </h2>
        <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.85, marginBottom: "24px", maxWidth: "780px", margin: "0 auto 24px", fontFamily: "'Work Sans', sans-serif" }}>
          AI is accelerating business at a pace the world has never seen. Yet most leaders still don&rsquo;t know how to position their companies for what&rsquo;s coming.
        </p>
        <p style={{ fontSize: "18px", color: "#111111", lineHeight: 1.85, marginBottom: "32px", maxWidth: "780px", margin: "0 auto 32px", fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
          That&rsquo;s why Larry and Staci Wallace created the Kingdom Intelligence Masterclass, a free three-day live event where they teach the E.C.H.O. Framework and show leaders how to scale operations, increase sales, and build profitable businesses through Spirit-led wisdom, without sacrificing what matters most.
        </p>
        <div className="event-details-row" style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", marginBottom: "32px" }}>
          {[
            { label: "Date", value: "April 14\u201316, 2026" },
            { label: "Time", value: "12:00 PM CST Daily" },
            { label: "Format", value: "Free Live Online Event" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#CC0000", marginBottom: "6px", fontFamily: "'Work Sans', sans-serif" }}>{item.label}</p>
              <p style={{ fontSize: "18px", fontWeight: 700, color: "#111111" }}>{item.value}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "19px", color: "#CC0000", fontStyle: "italic", fontWeight: 700 }}>FREE For A Limited Time Only (A $7,500 Value)</p>
      </div>
    </section>
  );
}

/* -- VSL -- */
function VSLSection({ onOpen }: { onOpen: () => void }) {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: "16px", fontFamily: "'Work Sans', sans-serif" }}>Watch This First</p>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: "#FFFFFF", marginBottom: "40px", lineHeight: 1.15 }}>
          See Why Thousands of Kingdom CEOs<br />Are Going ALL IN
        </h2>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "12px", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", border: "1px solid rgba(201,165,90,0.2)", background: "#111" }}>
          <iframe src="https://player.vimeo.com/video/1177090365?badge=0&autopause=0&player_id=0&app_id=58479" title="Kingdom Intelligence Masterclass" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} />
        </div>
        <div style={{ marginTop: "40px" }}>
          <CTAButton text="SAVE MY SEAT" onOpen={onOpen} />
        </div>
      </div>
    </section>
  );
}

/* -- TESTIMONIALS 3 -- */
const testimonials3 = [
  { name: "Kyler Kropf", title: "Founder, SaddleBrookeLife", quote: "I was an 8th-grade dropout with zero business experience. Larry & Staci helped our company grow to $13 million in 9 months and over $60 million in 3 years!", photo: "/images/kyler-headshot.png" },
  { name: "Dallas Marley", title: "Marketing Specialist & Entrepreneur", quote: "In less than 12 months, we paid off over $2 million in debt, moved to Ecuador, and stepped into the life of our dreams.", photo: "/images/dallas-headshot.jpg" },
  { name: "Vangel Roberts", title: "CMO, Wade Roberts Plumbing", quote: "Our company is thriving, but the greatest transformation has been in our marriage and with our kids. Having coaches walk with us weekly has been a game-changer.", photo: "/images/vangel-headshot.jpg" },
];

function TestimonialCard({ t }: { t: { name: string; title: string; quote: string; photo?: string } }) {
  return (
    <div className="testimonial-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(204,0,0,0.2)", borderRadius: "16px", padding: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
        {t.photo && <img src={t.photo} alt={t.name} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid rgba(201,165,90,0.4)" }} />}
        <p style={{ fontSize: "14px", color: "#ccc", fontFamily: "'Work Sans', sans-serif" }}>
          <strong style={{ color: "#FFFFFF", display: "block", fontSize: "15px" }}>{t.name}</strong>
          <span style={{ color: "#666" }}>{t.title}</span>
        </p>
      </div>
      <span style={{ fontSize: "48px", fontFamily: "'Frank Ruhl Libre', Georgia, serif", color: "#CC0000", lineHeight: 1, display: "block", marginBottom: "-8px" }}>&ldquo;</span>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, fontStyle: "italic", fontFamily: "'Work Sans', sans-serif" }}>{t.quote}</p>
    </div>
  );
}

function Testimonials3() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#FFFFFF", textAlign: "center", marginBottom: "48px", lineHeight: 1.15, textTransform: "uppercase" as const, letterSpacing: "0.02em" }}>RESULTS MATTER...</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {testimonials3.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}

/* -- INVITATION -- */
function Invitation({ onOpen }: { onOpen: () => void }) {
  const ref = useScrollReveal();
  const ref2 = useScrollReveal();
  return (
    <section style={{ background: "#0d0d0d", overflow: "hidden" }}>
      <div ref={ref} className="section-reveal invitation-split" style={{ display: "flex", minHeight: "80vh" }}>
        <div className="invitation-photo" style={{ flex: "0 0 45%", position: "relative", overflow: "hidden", minHeight: "600px" }}>
          <img src="/images/staci-larry-split.webp" alt="Larry and Staci Wallace" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #0d0d0d 100%)" }} />
        </div>
        <div className="invitation-content" style={{ flex: "0 0 55%", display: "flex", alignItems: "center", padding: "80px 8vw 80px 48px" }}>
          <div style={{ maxWidth: "520px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: "12px", fontFamily: "'Work Sans', sans-serif" }}>A Personal Word From Larry &amp; Staci</p>
            <h2 style={{ fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "28px" }}>
              A Kingdom Blueprint for Scaling Business Without Sacrificing Family, Peace, or Purpose.
            </h2>
            <div style={{ width: "48px", height: "2px", background: "#CC0000", marginBottom: "28px", borderRadius: "2px" }} />
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
              While AI increases speed, <span style={{ color: "#C9A55A", fontWeight: 700, fontSize: "19px" }}>Kingdom Intelligence determines dominion, authority, and long-term impact in the marketplace.</span> The leaders who will thrive are not simply adopting new tools. They are developing the Spirit-led wisdom, operational foresight, and leadership structure required to steward growth well.
            </p>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
              This three-day immersive experience is designed for faith-driven leaders who are ready to build highly profitable, purpose-driven companies without sacrificing their peace, family, or calling.
            </p>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.82)", lineHeight: 1.85, marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
              Each day will guide you through our <span style={{ color: "#C9A55A", fontWeight: 700, fontSize: "19px" }}>E.C.H.O. Framework</span>: a step-by-step process that fuses spiritual alignment with practical business strategy. When your life and leadership align with your divine mandate, you stop chasing money and begin igniting movements.
            </p>
            <p style={{ fontSize: "19px", color: "#FFFFFF", lineHeight: 1.7, marginBottom: "28px", fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontWeight: 700, fontStyle: "italic" }}>
              What will your echo be? Playing small has never built a Kingdom.<br />Now is the moment to go ALL IN.
            </p>
            <p style={{ fontSize: "17px", fontStyle: "italic", color: "rgba(255,255,255,0.5)", marginBottom: "32px", fontFamily: "'Frank Ruhl Libre', Georgia, serif" }}>
              Blessings,<br /><strong style={{ color: "#FFFFFF", fontStyle: "normal" }}>Larry &amp; Staci Wallace</strong>
            </p>
            <CTAButton text="SAVE MY SEAT" onOpen={onOpen} />
          </div>
        </div>
      </div>

      <div ref={ref2} className="section-reveal" style={{ background: "#CC0000", padding: "80px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)", fontSize: "260px", color: "rgba(255,255,255,0.05)", fontFamily: "'Frank Ruhl Libre', Georgia, serif", lineHeight: 1, pointerEvents: "none", userSelect: "none" as const }}>&ldquo;</div>
        <p className="warriors-quote" style={{ fontSize: "clamp(28px, 5vw, 60px)", fontWeight: 900, color: "#FFFFFF", fontStyle: "italic", lineHeight: 1.1, letterSpacing: "-0.01em", position: "relative", zIndex: 1, textTransform: "uppercase" as const }}>
          Warriors don&rsquo;t retreat.<br />They reload.
        </p>
        <div style={{ width: "60px", height: "3px", background: "rgba(255,255,255,0.4)", margin: "24px auto 16px", borderRadius: "2px" }} />
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, position: "relative", zIndex: 1, fontFamily: "'Work Sans', sans-serif" }}>&ndash; Staci Wallace</p>
      </div>
    </section>
  );
}

/* -- ABOUT STACI -- */
function AboutStaci() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal about-flex" style={{ maxWidth: "1020px", margin: "0 auto", display: "flex", alignItems: "flex-start", gap: "56px", flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 auto" }}>
          <img src="/images/staci-headshot-best.jpg" alt="Staci Wallace" className="about-photo" style={{ width: "100%", maxWidth: "380px", height: "auto", display: "block", borderRadius: "12px", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }} />
        </div>
        <div style={{ flex: "1 1 380px", minWidth: "280px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#CC0000", marginBottom: "8px", fontFamily: "'Work Sans', sans-serif" }}>Your Host</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#111111", marginBottom: "6px" }}>STACI WALLACE</h2>
          <p style={{ fontSize: "15px", fontWeight: 700, color: "#CC0000", marginBottom: "28px", textTransform: "uppercase" as const, letterSpacing: "0.05em", fontFamily: "'Work Sans', sans-serif" }}>CEO, Fueled By Fire &bull; 8x Best-Selling Author</p>
          <p style={{ fontSize: "17px", color: "#444444", lineHeight: 1.85, marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
            After 29 years of marriage and nearly four decades of building businesses together, Staci and Larry Wallace have built multiple companies from startup to 7, 8, and 9 figures while raising their family and keeping faith at the center of everything they do. For over a decade, they have used automation, systems, and artificial intelligence to scale companies, streamline operations, and build lean, highly profitable businesses. Today, they teach leaders how to combine Kingdom Intelligence with modern technology to scale their businesses without sacrificing their faith, family, or purpose.
          </p>
          <p style={{ fontSize: "17px", color: "#444444", lineHeight: 1.85, marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
            
          </p>
          <p style={{ fontSize: "17px", color: "#444444", lineHeight: 1.85, marginBottom: "28px", fontFamily: "'Work Sans', sans-serif" }}>
            <strong style={{ color: "#111" }}>Multiplying what God has entrusted to your stewardship is not just a good idea. It is a divine mandate.</strong>
          </p>
          <p style={{ fontSize: "19px", fontWeight: 700, fontStyle: "italic", color: "#CC0000" }}>&ldquo;A dream without a plan of action is nothing but wishful thinking.&rdquo; &ndash; Staci Wallace</p>
        </div>
      </div>
    </section>
  );
}

/* -- ECHO BLUEPRINT -- */
const echoItems = [
  { letter: "E", label: "Economic Stewardship", tagline: "ECONOMIC STEWARDSHIP", description: "Design profitable systems and financial architecture that fund and sustain your God-sized vision." },
  { letter: "C", label: "Culture Architecture", tagline: "CULTURE ARCHITECTURE", description: "Create an environment that attracts, develops, and multiplies leaders who carry the vision without you becoming the bottleneck." },
  { letter: "H", label: "Human Infrastructure", tagline: "HUMAN INFRASTRUCTURE", description: "Transition from founder-dependent to team-managed. Your company should scale beyond you, not because of you." },
  { letter: "O", label: "Operational Excellence", tagline: "OPERATIONAL EXCELLENCE", description: "Deploy AI, automation, and operational architecture that removes friction, increases speed, and allows your company to grow without chaos." },
];

function ECHOBlueprint({ onOpen }: { onOpen: () => void }) {
  const ref = useScrollReveal();
  const [active, setActive] = useState(0);
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#CC0000", marginBottom: "16px", textAlign: "center", fontFamily: "'Work Sans', sans-serif", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 16px" }}>Learn to govern AI using our signature <strong style={{ color: "#FFFFFF" }}>E.C.H.O. Framework</strong> to build a team and business that scale, operate, and grow even when you&rsquo;re not in the room.</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#FFFFFF", marginBottom: "12px", textAlign: "center", lineHeight: 1.1 }}>The E.C.H.O. Blueprint</h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: "56px", fontFamily: "'Work Sans', sans-serif", maxWidth: "560px", margin: "0 auto 56px" }}>
          Learn to govern AI using our signature E.C.H.O. Framework to build a team and business that scale, operate, and grow even when you&rsquo;re not in the room.
        </p>
        <div className="echo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" }}>
          {echoItems.map((item, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ background: active === i ? "rgba(201,165,90,0.12)" : "rgba(255,255,255,0.03)", border: active === i ? "1px solid rgba(201,165,90,0.6)" : "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "32px 20px", cursor: "pointer", textAlign: "center", transition: "all 0.25s ease", outline: "none" }}>
              <div style={{ fontSize: "clamp(52px, 6vw, 72px)", fontWeight: 900, lineHeight: 1, color: active === i ? "#FFFFFF" : "rgba(255,255,255,0.15)", fontFamily: "'Frank Ruhl Libre', Georgia, serif", transition: "color 0.25s ease", marginBottom: "12px" }}>{item.letter}</div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: active === i ? "#C9A55A" : "rgba(255,255,255,0.35)", fontFamily: "'Work Sans', sans-serif", transition: "color 0.25s ease", lineHeight: 1.4 }}>{item.label}</p>
            </button>
          ))}
        </div>
        <div className="echo-detail" style={{ background: "rgba(201,165,90,0.06)", border: "1px solid rgba(201,165,90,0.2)", borderRadius: "16px", padding: "40px 48px", minHeight: "140px" }}>
          
          <h3 style={{ fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 900, color: "#FFFFFF", marginBottom: "14px", lineHeight: 1.2 }}>{echoItems[active].tagline}</h3>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.72)", lineHeight: 1.8, fontFamily: "'Work Sans', sans-serif", maxWidth: "700px" }}>{echoItems[active].description}</p>
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button onClick={onOpen} className="cta-btn" style={{ background: "linear-gradient(135deg, #AA0000 0%, #CC0000 50%, #AA0000 100%)", color: "#FFFFFF", fontWeight: 800, padding: "18px 48px", borderRadius: "5px", fontSize: "18px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", boxShadow: "0 6px 24px rgba(204,0,0,0.45)", fontFamily: "'Work Sans', sans-serif", border: "none" }}>SAVE MY SEAT</button>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontStyle: "italic", marginTop: "10px" }}>$7,500 Value. Limited seats. Live online event.</div>
        </div>
      </div>
    </section>
  );
}

/* -- PREPARE -- */
const prepSteps = [
  { number: "01", title: "Block Your Calendar", body: "All sessions are LIVE April 14\u201316, 12:00 PM CST. Set your notifications and treat these three days like a board meeting, not a webinar." },
  { number: "02", title: "Bring Your Biggest Challenge", body: "Come with the one thing that's been holding your business back. We built this Masterclass to solve real problems in real time." },
  { number: "03", title: "Invite Collaborators", body: "Bring your team or key leaders so implementation happens immediately after the event." },
];

function NoteSection({ onOpen }: { onOpen: () => void }) {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "960px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#CC0000", marginBottom: "16px", textAlign: "center", fontFamily: "'Work Sans', sans-serif" }}>Before You Arrive</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#111111", marginBottom: "12px", textAlign: "center", lineHeight: 1.15 }}>How to Prepare for the 3 Days</h2>
        <p style={{ fontSize: "17px", color: "#888", textAlign: "center", marginBottom: "52px", fontFamily: "'Work Sans', sans-serif", maxWidth: "560px", margin: "0 auto 52px" }}>
          Leaders who come prepared get the most out of every session.
        </p>
        <div className="prep-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "56px" }}>
          {prepSteps.map((step, i) => (
            <div key={i} style={{ borderTop: "3px solid #CC0000", paddingTop: "24px" }}>
              <p style={{ fontSize: "32px", fontWeight: 900, color: "rgba(0,0,0,0.08)", fontFamily: "'Frank Ruhl Libre', Georgia, serif", lineHeight: 1, marginBottom: "8px" }}>{step.number}</p>
              <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#111111", marginBottom: "10px", lineHeight: 1.2 }}>{step.title}</h3>
              <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.7, fontFamily: "'Work Sans', sans-serif" }}>{step.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={onOpen} className="cta-btn" style={{ background: "linear-gradient(135deg, #AA0000 0%, #CC0000 50%, #AA0000 100%)", color: "#FFFFFF", fontWeight: 800, padding: "18px 48px", borderRadius: "5px", fontSize: "18px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", boxShadow: "0 6px 24px rgba(204,0,0,0.45)", fontFamily: "'Work Sans', sans-serif", border: "none" }}>SAVE MY SEAT</button>
          <div style={{ fontSize: "13px", color: "#888", fontStyle: "italic", marginTop: "10px" }}>$7,500 Value. Limited seats. Live online event.</div>
        </div>
      </div>
    </section>
  );
}

/* -- GALLERY SLIDER -- */
const testimonials4 = [
  { name: "Kolton Kropf", title: "CEO, SaddlebrookeLife", quote: "Our business was headed toward bankruptcy and after only 9 months, we turned it into an 8-figure success story on target to surpass $100 million in revenue.", photo: "/images/kolton-headshot.png" },
  { name: "Delbert Friesen", title: "President, Earthmax", quote: "I've never heard anyone bridge the gap between elite business training and Kingdom principles like Staci. Staci and Larry are the best in the world at Kingdom Business Mastery.", photo: "/images/delbert-headshot.png" },
  { name: "Eric Moland", title: "CEO, Black Dog Insurance", quote: "In one month, my income jumped 35%. The next month, the largest commission sales month in 40 years. Our entire business profit is up over 50% this year alone.", photo: "/images/eric-headshot.jpg" },
  { name: "Alex & Irina Chifor", title: "Commercial Investors", quote: "FBF has had a monumental impact on our lives. We've built an 8-figure commercial investment business while keeping faith and family first.", photo: "/images/irina-alex.webp" },
  { name: "Rogelio & Brandi Del Rio", title: "CEO, Del Rio Landscape", quote: "FBF Platinum has forever changed our lives! Our business is now 100% debt-free and continues to scale. Our marriage has been totally restored.", photo: "/images/rogelio-brandi.webp" },
  { name: "Drew & Tina Shabo", title: "Dentistry Business Owners", quote: "We've clarified God's plan for our portfolio of dentistry businesses and our family has been restored to full alignment. We are crystal clear about our GOD-SIZED vision.", photo: "/images/drew-tina.jpg" },
  { name: "Jamie Dahl", title: "Business Owner", quote: "Since aligning with Staci's coaching, God has enabled me to write and publish my first book, achieve the top sales position in my company, and launch a brand making a difference.", photo: "/images/jamie-dahl.jpeg" },
  { name: "Kristina Hess", title: "KR Hess Law, P.C.", quote: "Since joining Fueled by Fire, my husband got baptized, we are expanding our law firm nationally, and God has been downloading BIG audacious goals for our future.", photo: "/images/kristina-hess.png" },
  { name: "Lynn Vennefron", title: "FBF Client", quote: "Since graduating from the Smart Money Makeover course, we have paid off all of our debt other than our mortgage. For the first time in our married life, we are debt free.", photo: "/images/lynn-headshot.jpg" },
];

function MoreTestimonials() {
  const ref = useScrollReveal();
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(testimonials4.length / perPage);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % pages), 8000);
    return () => clearInterval(timer);
  }, [pages]);

  const visible = testimonials4.slice(current * perPage, current * perPage + perPage);

  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", textAlign: "center", marginBottom: "12px", fontFamily: "'Work Sans', sans-serif" }}>Kingdom Leaders</p>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#FFFFFF", textAlign: "center", marginBottom: "48px", lineHeight: 1.15 }}>Lives Changed. Businesses Built.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "36px" }} className="slider-grid">
          {visible.map((t, i) => (
            <div key={`${current}-${i}`} className="testimonial-card" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden", animation: "fadeInUp 0.4s ease both" }}>
              {t.photo && (
                <div className="slider-photo" style={{ width: "100%", height: "200px", overflow: "hidden", position: "relative" }}>
                  <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #0a0a0a 100%)" }} />
                </div>
              )}
              <div style={{ padding: "16px 20px 24px" }}>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", marginBottom: "2px" }}>{t.name}</p>
                <p style={{ fontSize: "11px", color: "#C9A55A", marginBottom: "12px", fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.04em" }}>{t.title}</p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontStyle: "italic", fontFamily: "'Work Sans', sans-serif" }}>&ldquo;{t.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <button onClick={() => setCurrent(c => (c - 1 + pages) % pages)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", color: "#FFFFFF", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>&#8249;</button>
          <div style={{ display: "flex", gap: "8px" }}>
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === current ? "#C9A55A" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
            ))}
          </div>
          <button onClick={() => setCurrent(c => (c + 1) % pages)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", color: "#FFFFFF", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>&#8250;</button>
        </div>
      </div>
    </section>
  );
}

/* -- FINAL CTA -- */
function FinalCTA({ onOpen }: { onOpen: () => void }) {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#FFFFFF", padding: "100px 20px", position: "relative", overflow: "hidden" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#CC0000", marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>April 14&ndash;16, 2026 &middot; Free Live Event</p>
        <h2 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 900, color: "#111111", marginBottom: "20px", lineHeight: 1.1 }}>
          Playing Small Has Never<br />Changed The World.
        </h2>
        <p style={{ fontSize: "19px", color: "#444444", lineHeight: 1.7, fontFamily: "'Work Sans', sans-serif", maxWidth: "640px", margin: "0 auto 16px" }}>
          You were not built for business as usual. You were built for an ECHO:
          leadership that outlives the founder, vision that multiplies through culture,
          impact that reverberates through generations.
        </p>
        <p style={{ fontSize: "17px", color: "#C9A55A", marginBottom: "40px", fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
          Join thousands of Kingdom CEOs building with Kingdom Intelligence, without sacrificing what matters most.
        </p>
        <button onClick={onOpen} className="cta-btn" style={{ background: "linear-gradient(135deg, #AA0000 0%, #CC0000 50%, #AA0000 100%)", color: "#FFFFFF", fontWeight: 800, padding: "18px 48px", borderRadius: "5px", fontSize: "18px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", boxShadow: "0 6px 24px rgba(204,0,0,0.45)", fontFamily: "'Work Sans', sans-serif", border: "none" }}>SAVE MY SEAT</button>
          <div style={{ fontSize: "13px", color: "#888", fontStyle: "italic", marginTop: "10px" }}>$7,500 Value. Limited seats. Live online event.</div>
      </div>
    </section>
  );
}

/* -- FOOTER -- */
function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "48px 20px", textAlign: "center" }}>
      <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" style={{ height: "72px", width: "auto", display: "inline-block", marginBottom: "24px" }} />
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)", marginBottom: "6px", fontFamily: "'Work Sans', sans-serif" }}>&copy; 2026 Fueled By Fire. All Rights Reserved.</p>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.2)", marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>10% of every program fee supports Epiphany Global (Uganda) &amp; EMwomen.</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "28px" }}>
        <a href="https://www.fbfchallenge.com/privacy" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Work Sans', sans-serif" }}>Privacy Policy</a>
        <a href="https://www.fbfchallenge.com/terms" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Work Sans', sans-serif" }}>Terms of Service</a>
        <a href="https://www.fbfchallenge.com/disclaimer" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Work Sans', sans-serif" }}>Disclaimer</a>
      </div>
    </footer>
  );
}

/* -- STICKY TOP BANNER -- */
function TopBanner({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 9998,
        background: "linear-gradient(90deg, #AA0000 0%, #CC0000 50%, #AA0000 100%)",
        border: "none", cursor: "pointer", padding: "11px 20px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
        transition: "filter 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.1)")}
      onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
    >
      <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FFFFFF", fontFamily: "'Work Sans', sans-serif" }}>
        Free 3-Day Live Event &nbsp;&middot;&nbsp; April 14&ndash;16, 2026 &nbsp;&middot;&nbsp; 12:00 PM CST &nbsp;&middot;&nbsp;
        <span style={{ color: "#FFE599", textDecoration: "underline" }}>Register Now &rarr;</span>
      </span>
    </button>
  );
}

/* -- PAGE -- */
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <>
      {modalOpen && <RegisterModal onClose={close} />}
      <TopBanner onOpen={open} />
      <main style={{ paddingTop: "43px" }}>
        <Hero onOpen={open} />
        <EventDetails />
        <VSLSection onOpen={open} />
        <Testimonials3 />
        <Invitation onOpen={open} />
        <AboutStaci />
        <ECHOBlueprint onOpen={open} />
        <NoteSection onOpen={open} />
        <MoreTestimonials />
        <FinalCTA onOpen={open} />
        <Footer />
      </main>
    </>
  );
}

