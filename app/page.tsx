"use client";

import { useEffect, useRef } from "react";

const REGISTER_URL = "https://fbfchallenge.com";

/* ── SCROLL REVEAL HOOK ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── CTA BUTTON ── */
function CTAButton({ text = "REGISTER FOR FREE", dark = false }: { text?: string; dark?: boolean }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <a
        href={REGISTER_URL}
        className="cta-btn"
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #C9A55A 0%, #E8D080 45%, #BB945A 100%)",
          color: "#120800",
          fontWeight: 800,
          padding: "18px 48px",
          borderRadius: "5px",
          fontSize: "18px",
          textDecoration: "none",
          cursor: "pointer",
          textTransform: "uppercase" as const,
          letterSpacing: "0.08em",
          boxShadow: "0 6px 24px rgba(185,148,90,0.45)",
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        {text}
      </a>
      <span style={{ fontSize: "13px", color: dark ? "#888" : "rgba(255,255,255,0.55)", fontStyle: "italic" }}>
        No cost. Limited seats. Live online event.
      </span>
    </div>
  );
}

/* ── SECTION 1: HERO ── */
function Hero() {
  return (
    <section
      className="hero-split"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div className="hero-logo-bar" style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10, padding: "24px 8vw" }}>
        <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" className="hero-logo" style={{ height: "48px", width: "auto", display: "block" }} />
      </div>

      <div className="hero-content-row" style={{ display: "flex", flex: 1, minHeight: "100vh" }}>
        {/* LEFT */}
        <div
          className="hero-left"
          style={{ flex: "0 0 55%", display: "flex", alignItems: "center", padding: "120px 48px 60px 8vw", position: "relative", zIndex: 2 }}
        >
          <div style={{
            position: "absolute", top: "40%", left: "30%", width: "600px", height: "600px",
            borderRadius: "50%", background: "radial-gradient(circle, rgba(201,165,90,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="hero-reveal" style={{ position: "relative", maxWidth: "580px" }}>
            {/* Badge */}
            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(201,165,90,0.4)",
              borderRadius: "50px",
              padding: "10px 24px",
              marginBottom: "24px",
            }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", fontFamily: "'Work Sans', sans-serif" }}>
                Free 3-Day Live Event · April 14–16, 2026 · 12:00 PM CST
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontSize: "clamp(42px, 6vw, 76px)",
              fontWeight: 900,
              lineHeight: 0.95,
              color: "#FFFFFF",
              marginBottom: "20px",
              textTransform: "uppercase" as const,
              letterSpacing: "-0.02em",
            }}>
              Kingdom<br />Intelligence<br />
              <span style={{ color: "#CC0000" }}>Masterclass</span>
            </h1>

            {/* Power line */}
            <p style={{
              fontSize: "17px",
              color: "#C9A55A",
              lineHeight: 1.5,
              marginBottom: "16px",
              fontFamily: "'Work Sans', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.01em",
            }}>
              AI Increases Speed. Kingdom Intelligence Determines Dominion.
            </p>

            {/* Subhead */}
            <p style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              marginBottom: "36px",
              fontFamily: "'Work Sans', sans-serif",
              fontWeight: 400,
            }}>
              The leaders who will thrive in this next decade aren&rsquo;t just adopting new tools —
              they&rsquo;re developing the Spirit-led wisdom and leadership structure
              required to steward growth well.
            </p>

            <CTAButton />
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="hero-right" style={{ flex: "0 0 45%", position: "relative", overflow: "hidden", minHeight: "100vh" }}>
          <img
            src="/images/staci-larry-hero.avif"
            alt="Staci and Larry Wallace"
            className="hero-photo"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.45) 0%, transparent 35%)" }} />
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 2: EVENT DETAILS ── */
function EventDetails() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#CC0000", marginBottom: "16px", fontFamily: "'Work Sans', sans-serif" }}>
          What This Is
        </p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#111111", lineHeight: 1.15, marginBottom: "28px" }}>
          We Are Entering the Most Disruptive Economic Shift in Modern History.
        </h2>
        <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.85, marginBottom: "24px", maxWidth: "780px", margin: "0 auto 24px", fontFamily: "'Work Sans', sans-serif" }}>
          AI is accelerating business at a pace the world has never seen. Ideas are generated instantly.
          Automation is reshaping entire industries. Yet most leaders still don&rsquo;t know how to position
          their companies for what&rsquo;s coming.
        </p>
        <p style={{ fontSize: "18px", color: "#111111", lineHeight: 1.85, marginBottom: "32px", maxWidth: "780px", margin: "0 auto 32px", fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
          That&rsquo;s why Larry &amp; Staci Wallace created the Kingdom Intelligence Masterclass —
          a FREE 3-day live event built to give faith-driven leaders the E.C.H.O. Framework, the
          G.R.O.W.T.H. Method, and the spiritual intelligence to scale without sacrificing
          what matters most.
        </p>
        <div className="event-details-row" style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", marginBottom: "32px" }}>
          {[
            { label: "Date", value: "April 14–16, 2026" },
            { label: "Time", value: "12:00 PM CST Daily" },
            { label: "Format", value: "Free Live Online Event" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#CC0000", marginBottom: "6px", fontFamily: "'Work Sans', sans-serif" }}>{item.label}</p>
              <p style={{ fontSize: "18px", fontWeight: 700, color: "#111111" }}>{item.value}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "19px", color: "#CC0000", fontStyle: "italic", fontWeight: 700 }}>
          FREE For A Limited Time Only (A $7,500 Value)
        </p>
      </div>
    </section>
  );
}

/* ── SECTION 2b: VSL ── */
function VSLSection() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: "16px", fontFamily: "'Work Sans', sans-serif" }}>
          Watch This First
        </p>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: "#FFFFFF", marginBottom: "40px", lineHeight: 1.15 }}>
          See Why Thousands of Kingdom CEOs<br />Are Going ALL IN
        </h2>
        <div style={{
          position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden",
          borderRadius: "12px", boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          border: "1px solid rgba(201,165,90,0.2)", background: "#111",
        }}>
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_HERE?rel=0&modestbranding=1"
            title="Kingdom Intelligence Masterclass"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
        <div style={{ marginTop: "40px" }}>
          <CTAButton text="RESERVE MY FREE SEAT" />
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 3: TESTIMONIALS (3 cards) ── */
const testimonials3 = [
  {
    name: "Kyler Kropf",
    title: "Founder, SaddleBrookeLife",
    quote: "I was an 8th-grade dropout with zero business experience. Larry & Staci helped our company grow to $13 million in 9 months and over $60 million in 3 years!",
  },
  {
    name: "Dallas Marley",
    title: "Entrepreneur",
    quote: "In less than 12 months, we paid off over $2 million in debt, moved to Ecuador, and stepped into the life of our dreams.",
  },
  {
    name: "Vangel Roberts",
    title: "CMO, Wade Roberts Plumbing",
    quote: "Our company is thriving, but the greatest transformation has been in our marriage and with our kids. Having coaches walk with us weekly and call us to a higher level has been a game-changer.",
  },
];

function TestimonialCard({ t }: { t: { name: string; title: string; quote: string } }) {
  return (
    <div className="testimonial-card" style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(204,0,0,0.2)",
      borderRadius: "16px", padding: "32px",
    }}>
      <span style={{ fontSize: "56px", fontFamily: "'Frank Ruhl Libre', Georgia, serif", color: "#CC0000", lineHeight: 1, display: "block", marginBottom: "-8px" }}>
        &ldquo;
      </span>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "24px", fontFamily: "'Work Sans', sans-serif" }}>
        {t.quote}
      </p>
      <p style={{ fontSize: "14px", color: "#ccc", fontFamily: "'Work Sans', sans-serif" }}>
        <span style={{ color: "#CC0000" }}>&mdash;</span>{" "}
        <strong style={{ color: "#FFFFFF" }}>{t.name}</strong>
        <span style={{ color: "#666", marginLeft: "8px" }}>{t.title}</span>
      </p>
    </div>
  );
}

function Testimonials3() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", textAlign: "center", marginBottom: "12px", fontFamily: "'Work Sans', sans-serif" }}>
          What Our Clients Are Saying
        </p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#FFFFFF", textAlign: "center", marginBottom: "48px", lineHeight: 1.15 }}>
          Real People. Real Results.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {testimonials3.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}

function Invitation() {
  const ref = useScrollReveal();
  const ref2 = useScrollReveal();
  return (
    <section style={{ background: "#0d0d0d", overflow: "hidden" }}>

      {/* SPLIT: photo left, content right */}
      <div ref={ref} className="section-reveal invitation-split" style={{ display: "flex", minHeight: "80vh" }}>

        {/* LEFT — photo */}
        <div className="invitation-photo" style={{ flex: "0 0 45%", position: "relative", overflow: "hidden", minHeight: "600px" }}>
          <img
            src="/images/staci-larry-split.webp"
            alt="Larry and Staci Wallace"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
          {/* Right edge fade */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #0d0d0d 100%)" }} />
        </div>

        {/* RIGHT — content */}
        <div className="invitation-content" style={{ flex: "0 0 55%", display: "flex", alignItems: "center", padding: "80px 8vw 80px 48px" }}>
          <div style={{ maxWidth: "520px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
              This Is For You If...
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.05, marginBottom: "40px", textTransform: "uppercase" as const }}>
              NOW IS THE TIME<br />TO GO <span style={{ color: "#CC0000" }}>ALL IN</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: "44px" }}>
              {[
                "You feel called to build something bigger — a legacy, not just a business.",
                "You refuse to sacrifice faith, family, or freedom to get there.",
                "You're scaling fast but know your infrastructure hasn't kept up.",
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "18px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <span style={{ color: "#CC0000", fontWeight: 900, fontSize: "18px", lineHeight: 1.5, flexShrink: 0 }}>{i + 1}.</span>
                  <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.65, fontFamily: "'Work Sans', sans-serif", margin: 0 }}>{line}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "#C9A55A", marginBottom: "32px", lineHeight: 1.3 }}>
              The answer is YES — and we are living proof.
            </p>

            <CTAButton />
          </div>
        </div>
      </div>

      {/* WARRIORS BANNER */}
      <div ref={ref2} className="section-reveal" style={{ background: "#CC0000", padding: "80px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)",
          fontSize: "260px", color: "rgba(255,255,255,0.05)",
          fontFamily: "'Frank Ruhl Libre', Georgia, serif",
          lineHeight: 1, pointerEvents: "none", userSelect: "none" as const,
        }}>
          &ldquo;
        </div>
        <p className="warriors-quote" style={{
          fontSize: "clamp(28px, 5vw, 60px)", fontWeight: 900, color: "#FFFFFF",
          fontStyle: "italic", lineHeight: 1.1, letterSpacing: "-0.01em",
          position: "relative", zIndex: 1, textTransform: "uppercase" as const,
        }}>
          Warriors don&rsquo;t retreat.<br />They reload.
        </p>
        <div style={{ width: "60px", height: "3px", background: "rgba(255,255,255,0.4)", margin: "24px auto 16px", borderRadius: "2px" }} />
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, position: "relative", zIndex: 1, fontFamily: "'Work Sans', sans-serif" }}>
          — Staci Wallace
        </p>
      </div>
    </section>
  );
}

/* ── SECTION 5: ABOUT STACI ── */
function AboutStaci() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal about-flex" style={{ maxWidth: "1020px", margin: "0 auto", display: "flex", alignItems: "flex-start", gap: "56px", flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 auto" }}>
          <img
            src="/images/staci-headshot-best.jpg"
            alt="Staci Wallace"
            className="about-photo"
            style={{ width: "100%", maxWidth: "380px", height: "auto", display: "block", borderRadius: "12px", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
          />
        </div>
        <div style={{ flex: "1 1 380px", minWidth: "280px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#CC0000", marginBottom: "8px", fontFamily: "'Work Sans', sans-serif" }}>
            Your Host
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#111111", marginBottom: "6px" }}>
            STACI WALLACE
          </h2>
          <p style={{ fontSize: "15px", fontWeight: 700, color: "#CC0000", marginBottom: "28px", textTransform: "uppercase" as const, letterSpacing: "0.05em", fontFamily: "'Work Sans', sans-serif" }}>
            CEO, Fueled By Fire &bull; 8x Best-Selling Author
          </p>
          <p style={{ fontSize: "17px", color: "#444444", lineHeight: 1.85, marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
            After 28 years of marriage and nearly four decades of growing companies from scratch,
            Staci and Larry Wallace have built multiple 7, 8, and 9-figure businesses — all while
            raising their family and keeping faith at the center of everything they do.
          </p>
          <p style={{ fontSize: "17px", color: "#444444", lineHeight: 1.85, marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
            Staci has shared stages with 5 U.S. Presidents, coached tens of thousands of business
            owners, and built one of the nation&rsquo;s top faith-based business coaching companies.
            The Kingdom Intelligence Framework was forged over decades of real wins, real losses,
            and the relentless pursuit of building something that truly matters.
          </p>
          <p style={{ fontSize: "17px", color: "#444444", lineHeight: 1.85, marginBottom: "28px", fontFamily: "'Work Sans', sans-serif" }}>
            <strong style={{ color: "#111" }}>Multiplying what God has given you stewardship over
            is not just a good idea &mdash; it&rsquo;s a divine mandate.</strong>
          </p>
          <p style={{ fontSize: "19px", fontWeight: 700, fontStyle: "italic", color: "#CC0000" }}>
            &ldquo;A dream without a plan of action is nothing but wishful thinking.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 6: WHAT YOU WILL LEARN (E.C.H.O. aligned) ── */
const learnItems = [
  { tag: "E — Economic Stewardship", text: "Install the Four Pillars of Economic Infrastructure: Vision & Strategy, Operational Systems, Leadership Infrastructure, and Financial Intelligence." },
  { tag: "C — Culture Architecture", text: "Build a team culture that attracts, develops, and multiplies leaders who carry your vision — without you becoming the bottleneck." },
  { tag: "H — Human Infrastructure", text: "Transition from founder-dependent to team-managed — so your company can scale beyond you, not because of you." },
  { tag: "O — Operational Excellence", text: "Install systems, AI, and automation that remove friction, increase speed, and allow your company to scale with precision." },
  { tag: "Kingdom Intelligence", text: "Discover the Intelligence Hierarchy — how AI, Human Intelligence, and Spirit-led Kingdom Intelligence work together for dominion in the marketplace." },
  { tag: "G.R.O.W.T.H. Method", text: "Walk through the full G.R.O.W.T.H. framework: God-Sized Vision · Revenue Architecture · Operational Excellence · Wise Counsel · Team Multiplication · Habit Discipline." },
  { tag: "S.W.E.E.T. Spot Audit", text: "Clarify your #1 Profit-Making Activity (PMA) and identify exactly where your time, energy, and team need to be focused for maximum scale." },
  { tag: "The Thresher Principle", text: "Learn why pressure doesn't create cracks — it exposes them. Find and fix the small structural blind spots that could sink your ship before they become catastrophic." },
];

function GoldCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
      <circle cx="11" cy="11" r="10.5" stroke="#C9A55A" strokeWidth="1.2"/>
      <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="#C9A55A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WhatYouLearn() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "960px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: "16px", textAlign: "center", fontFamily: "'Work Sans', sans-serif" }}>
          What You Will Learn
        </p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#FFFFFF", marginBottom: "12px", textAlign: "center", lineHeight: 1.2 }}>
          The Complete E.C.H.O. Blueprint
        </h2>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: "48px", fontFamily: "'Work Sans', sans-serif", maxWidth: "680px", margin: "0 auto 48px" }}>
          During this 3-day transformational event, you&rsquo;ll install the exact architecture required
          to build a company that ECHOS beyond your lifetime.
        </p>
        <div className="learn-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {learnItems.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "14px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,165,90,0.15)",
              borderRadius: "12px", padding: "20px 22px",
            }}>
              <GoldCheck />
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#C9A55A", letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "5px", fontFamily: "'Work Sans', sans-serif" }}>
                  {item.tag}
                </p>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, fontFamily: "'Work Sans', sans-serif" }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 7: NOTE / QUALIFIER ── */
function NoteSection() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
        <div className="note-inner" style={{ background: "#0a0a0a", borderRadius: "12px", padding: "48px 40px", marginBottom: "48px", border: "1px solid rgba(201,165,90,0.2)" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: "16px", fontFamily: "'Work Sans', sans-serif" }}>
            A Word of Honesty
          </p>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontFamily: "'Work Sans', sans-serif" }}>
            This Masterclass is <strong style={{ color: "#FFFFFF" }}>NOT</strong> for money-chasers, passive dreamers, or leaders
            unwilling to build the infrastructure real scale demands.
          </p>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginTop: "16px", fontFamily: "'Work Sans', sans-serif" }}>
            But it <strong style={{ color: "#CC0000" }}>IS</strong> for the entrepreneur who knows
            they carry a God-given business the world desperately needs — and is ready to build it
            the right way.
          </p>
        </div>
        <h2 style={{ fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 900, color: "#111111", marginBottom: "12px" }}>
          This Is Your Moment.
        </h2>
        <p style={{ fontSize: "18px", color: "#666", marginBottom: "36px", fontFamily: "'Work Sans', sans-serif" }}>
          Knowledge alone doesn&rsquo;t build companies. Implementation does — and implementation
          requires the right room.
        </p>
        <CTAButton dark={true} />
      </div>
    </section>
  );
}

/* ── SECTION 8: MORE TESTIMONIALS ── */
const testimonials4 = [
  {
    name: "Kolton Kropf",
    title: "CEO, SaddlebrookeLife",
    quote: "Our business was headed toward bankruptcy and after only 9 months, we turned it into an 8-figure success story on target to surpass $100 million in revenue. We've built a Christ-centered team culture and are paying off our new 85,000 sq ft facility.",
  },
  {
    name: "Delbert Friesen",
    title: "President, Earthmax",
    quote: "I've never heard anyone bridge the gap between elite business training and Kingdom principles like Staci. She has helped us scale profits while building Kingdom generosity and legacy impact. Staci and Larry are the best in the world at Kingdom Business Mastery.",
  },
  {
    name: "Eric Moland",
    title: "CEO, Black Dog Insurance",
    quote: "In one month, my income jumped 35%. The next month, the largest commission sales month in 40 years — more than double the previous year. Our entire business profit is up over 50% this year alone.",
  },
  {
    name: "Alex & Irina Chifor",
    title: "Commercial Investors",
    quote: "FBF has had a monumental impact on our lives. We've built an 8-figure commercial investment business while keeping faith and family first.",
  },
];

function MoreTestimonials() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div ref={ref} className="section-reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", textAlign: "center", marginBottom: "12px", fontFamily: "'Work Sans', sans-serif" }}>
          Testimonials
        </p>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#FFFFFF", textAlign: "center", marginBottom: "48px", lineHeight: 1.15 }}>
          RESULTS MATTER...
        </h2>
        <div className="testimonial-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {testimonials4.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 9: FINAL CTA ── */
function FinalCTA() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#0a0a0a", padding: "100px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, rgba(201,165,90,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div ref={ref} className="section-reveal" style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
          April 14–16, 2026 · Free Live Event
        </p>
        <h2 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 900, color: "#FFFFFF", marginBottom: "20px", lineHeight: 1.1 }}>
          Playing Small Has Never<br />Built a Kingdom.
        </h2>
        <p style={{ fontSize: "19px", color: "rgba(255,255,255,0.65)", marginBottom: "12px", lineHeight: 1.7, fontFamily: "'Work Sans', sans-serif", maxWidth: "640px", margin: "0 auto 12px" }}>
          You were not built for business as usual. You were built for an ECHO —
          leadership that outlives the founder, vision that multiplies through culture,
          impact that reverberates through generations.
        </p>
        <p style={{ fontSize: "17px", color: "#C9A55A", marginBottom: "40px", fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
          Join thousands of Kingdom CEOs who are building God-sized businesses —<br />without sacrificing what matters most.
        </p>
        <CTAButton text="CLAIM YOUR FREE SEAT" />
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "24px", fontFamily: "'Work Sans', sans-serif" }}>
          Free for a limited time. Live online event April 14–16, 2026.
        </p>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "48px 20px", textAlign: "center" }}>
      <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" style={{ height: "40px", width: "auto", display: "inline-block", marginBottom: "20px" }} />
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)", marginBottom: "6px", fontFamily: "'Work Sans', sans-serif" }}>
        &copy; 2026 Fueled By Fire. All Rights Reserved.
      </p>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.2)", marginBottom: "20px", fontFamily: "'Work Sans', sans-serif" }}>
        10% of every program fee supports Epiphany Global (Uganda) &amp; EMwomen.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "28px" }}>
        <a href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Work Sans', sans-serif" }}>Privacy Policy</a>
        <a href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Work Sans', sans-serif" }}>Terms of Service</a>
        <a href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'Work Sans', sans-serif" }}>Contact</a>
      </div>
    </footer>
  );
}

/* ── PAGE ── */
export default function Home() {
  return (
    <main>
      <Hero />
      <EventDetails />
      <VSLSection />
      <Testimonials3 />
      <Invitation />
      <AboutStaci />
      <WhatYouLearn />
      <NoteSection />
      <MoreTestimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
