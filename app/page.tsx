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

/* ── CTA BUTTON (Red) ── */
function CTAButton({ text = "REGISTER FOR FREE" }: { text?: string }) {
  return (
    <a
      href={REGISTER_URL}
      className="cta-btn"
      style={{
        display: "inline-block",
        background: "#CC0000",
        color: "#FFFFFF",
        fontWeight: 700,
        padding: "13px 36px",
        borderRadius: "4px",
        border: "none",
        fontSize: "15px",
        textDecoration: "none",
        cursor: "pointer",
        textTransform: "uppercase" as const,
        letterSpacing: "0.08em",
      }}
    >
      {text}
    </a>
  );
}

/* ── NAVBAR ── */
function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        background: "rgba(255,255,255,0.95)",
        borderBottom: "1px solid #E5E5E5",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontSize: "22px",
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
        }}
      >
        FBF
      </span>
      <a
        href={REGISTER_URL}
        className="nav-register"
        style={{
          background: "#CC0000",
          color: "#FFFFFF",
          padding: "10px 28px",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          textDecoration: "none",
          transition: "background 0.2s",
        }}
      >
        Register Free
      </a>
    </nav>
  );
}

/* ── SECTION 1: HERO (stays dark/gold, red CTAs) ── */
function Hero() {
  const ref = useScrollReveal();
  return (
    <section
      className="hero-split"
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        display: "flex",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDE — text content */}
      <div
        className="hero-left"
        style={{
          flex: "0 0 55%",
          display: "flex",
          alignItems: "center",
          padding: "60px 48px 60px 8vw",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Subtle gold radial glow behind left content */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "30%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,165,90,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          ref={ref}
          className="section-reveal"
          style={{ position: "relative", maxWidth: "560px" }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(201,165,90,0.4)",
              borderRadius: "50px",
              padding: "10px 24px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#D4A017",
              }}
            >
              BIG BUSINESS. BOLD FAITH. NO COMPROMISE.
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#FFFFFF",
              marginBottom: "20px",
              textTransform: "uppercase" as const,
              background:
                "linear-gradient(90deg, #FFFFFF 30%, #D4A017 50%, #FFFFFF 70%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmerText 6s linear infinite",
            }}
          >
            KINGDOM INTELLIGENCE MASTER CLASS
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontSize: "19px",
              color: "#D4A017",
              lineHeight: 1.6,
              marginBottom: "20px",
            }}
          >
            Where High-Performing Leaders Scale Profitable Companies Without
            Compromising Their Faith, Family or Freedom
          </p>

          {/* Event line */}
          <p
            style={{
              fontSize: "16px",
              color: "#C8C8C8",
              marginBottom: "36px",
            }}
          >
            Free 3-Day Live Event &mdash; April 14-16, 2026 @ 12:00 PM CST
          </p>

          {/* CTA */}
          <div>
            <CTAButton />
          </div>

          {/* Fine print */}
          <p
            style={{
              fontSize: "13px",
              color: "#666",
              marginTop: "16px",
            }}
          >
            No cost. Limited seats. Live online event.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — photo */}
      <div
        className="hero-right"
        style={{
          flex: "0 0 45%",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        <img
          src="/images/staci-larry-hero.avif"
          alt="Staci and Larry Wallace"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        {/* Subtle left edge fade to blend with dark background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 30%)",
          }}
        />
      </div>
    </section>
  );
}

/* ── SECTION 2: EVENT DETAILS ── */
function EventDetails() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#CC0000",
            marginBottom: "16px",
          }}
        >
          EVENT DETAILS
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.2,
            marginBottom: "32px",
          }}
        >
          FREE 3-Day Kingdom Intelligence Master Class &mdash; April 14-16 @
          12:00 PM CST
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#444444",
            lineHeight: 1.8,
            marginBottom: "32px",
            maxWidth: "800px",
            margin: "0 auto 32px",
          }}
        >
          Discover how to build a Purpose-Driven, HIGHLY PROFITABLE life and
          business God&rsquo;s way! Walk through the Kingdom Intelligence
          Framework &mdash; a proven step-by-step blueprint that has helped
          thousands of business owners grow multi-million dollar companies
          without sacrificing Faith, Family, or Freedom.
        </p>
        <p
          style={{
            fontSize: "20px",
            color: "#CC0000",
            fontStyle: "italic",
            fontWeight: 600,
          }}
        >
          FREE For A LIMITED TIME ONLY (A $1,500 VALUE)
        </p>
      </div>
    </section>
  );
}

/* ── SECTION 3: TESTIMONIALS (3 cards) ── */
const testimonials3 = [
  {
    name: "Kyler Kropf",
    title: "Business Owner",
    quote:
      "I was an 8th-grade dropout... company grew to $1 million in 9 months and over $10 million in 3 years!",
  },
  {
    name: "Dallas Marley",
    title: "Entrepreneur",
    quote:
      "In less than 12 months, we paid off over $1 million in debt, moved to Ecuador...",
  },
  {
    name: "Vangel Roberts",
    title: "Wade Roberts Plumbing",
    quote:
      "Over the last 8 months, we've experienced transformation in every area of our lives...",
  },
];

function TestimonialCard({ t }: { t: { name: string; title: string; quote: string } }) {
  return (
    <div
      className="testimonial-card"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(204,0,0,0.2)",
        borderRadius: "16px",
        padding: "32px",
      }}
    >
      <span
        style={{
          fontSize: "64px",
          fontFamily: "Georgia, serif",
          color: "#CC0000",
          lineHeight: 1,
          display: "block",
          marginBottom: "-10px",
        }}
      >
        &ldquo;
      </span>
      <p
        style={{
          fontSize: "16px",
          color: "#FFFFFF",
          lineHeight: 1.7,
          fontStyle: "italic",
          marginBottom: "24px",
        }}
      >
        {t.quote}
      </p>
      <p style={{ fontSize: "15px", color: "#ccc" }}>
        <span style={{ color: "#CC0000" }}>&mdash;</span>{" "}
        <strong style={{ color: "#FFFFFF" }}>{t.name}</strong>
        <span style={{ color: "#888", marginLeft: "6px" }}>{t.title}</span>
      </p>
    </div>
  );
}

function Testimonials3() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {testimonials3.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 4: THE INVITATION ── */
function Invitation() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#F5F5F5", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#CC0000",
            marginBottom: "16px",
          }}
        >
          THE INVITATION
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "48px",
            textTransform: "uppercase" as const,
          }}
        >
          NOW IS THE TIME TO GO ALL IN!!
        </h2>

        <div
          style={{
            textAlign: "left",
            maxWidth: "750px",
            margin: "0 auto 48px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.8 }}>
            <strong style={{ color: "#CC0000" }}>DO</strong> you feel called to
            something bigger &mdash; a God-given mission to build a business
            that creates real impact, generational wealth, and a lasting legacy
            for your family?
          </p>
          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.8 }}>
            <strong style={{ color: "#CC0000" }}>ARE</strong> you passionate
            about growing your company but refuse to compromise your faith, your
            family, or your freedom in the process?
          </p>
          <p style={{ fontSize: "18px", color: "#444444", lineHeight: 1.8 }}>
            Perhaps you&rsquo;ve lived in{" "}
            <strong style={{ color: "#CC0000" }}>BEAST mode</strong> for so long
            that your health, relationships, and spiritual life have paid the
            price. You&rsquo;re exhausted, overwhelmed, and wondering if
            there&rsquo;s a better way...
          </p>
        </div>

        <h3
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "24px",
            lineHeight: 1.3,
          }}
        >
          IS IT POSSIBLE TO HAVE IT ALL WITHOUT FORSAKING YOUR FAMILY, FAITH,
          OR FREEDOM?
        </h3>
        <p
          style={{
            fontSize: "24px",
            color: "#CC0000",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          The answer is &lsquo;YES&rsquo; and we are living proof!
        </p>
        <p
          style={{
            fontSize: "18px",
            color: "#444444",
            marginBottom: "40px",
            lineHeight: 1.7,
          }}
        >
          That is why we&rsquo;ve created the Kingdom Intelligence Master Class
          for leaders like YOU!
        </p>
        <p
          style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "48px",
            lineHeight: 1.4,
          }}
        >
          Get the Exact Blueprint We&rsquo;ve Used to Build Multiple 7-9 Figure
          Companies And A Family Legacy &mdash; God&rsquo;s Way!
        </p>
        <p
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700,
            color: "#CC0000",
            fontStyle: "italic",
          }}
        >
          &ldquo;WARRIORS DON&rsquo;T RETREAT, THEY RELOAD!&rdquo;
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
      <div
        ref={ref}
        className="section-reveal about-flex"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-start",
          gap: "48px",
          flexWrap: "wrap",
        }}
      >
        {/* Photo LEFT */}
        <div style={{ flex: "0 0 auto" }}>
          <img
            src="/images/staci-headshot-best.jpg"
            alt="Staci Wallace"
            className="about-photo"
            width={400}
            style={{
              width: "400px",
              height: "auto",
              display: "block",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            }}
          />
        </div>

        {/* Bio RIGHT */}
        <div style={{ flex: "1 1 400px", minWidth: "280px" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "#CC0000",
              marginBottom: "8px",
            }}
          >
            YOUR HOST
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "#111111",
              marginBottom: "8px",
            }}
          >
            STACI WALLACE
          </h2>
          <p
            style={{
              fontSize: "17px",
              fontWeight: 600,
              color: "#CC0000",
              marginBottom: "28px",
              textTransform: "uppercase" as const,
              letterSpacing: "0.04em",
            }}
          >
            CEO, FUELED BY FIRE &bull; 8X BEST-SELLING AUTHOR
          </p>
          <p
            style={{
              fontSize: "17px",
              color: "#444444",
              lineHeight: 1.8,
              marginBottom: "20px",
            }}
          >
            For over four decades, I&rsquo;ve been building companies from the
            ground up. My husband Larry and I have been married 28 years, and
            together we&rsquo;ve built multiple 7, 8, and 9-figure businesses
            &mdash; all while raising our family and keeping our faith at the
            center of everything we do.
          </p>
          <p
            style={{
              fontSize: "17px",
              color: "#444444",
              lineHeight: 1.8,
              marginBottom: "20px",
            }}
          >
            I&rsquo;ve had the honor of sharing stages with 5 U.S. Presidents,
            coaching tens of thousands of business owners, and leading one of
            the nation&rsquo;s top faith-based business coaching companies.
            The Kingdom Intelligence Framework was born out of real experience
            &mdash; decades of wins, losses, and the relentless pursuit of
            building something that truly matters.
          </p>
          <p
            style={{
              fontSize: "17px",
              color: "#444444",
              lineHeight: 1.8,
              marginBottom: "28px",
            }}
          >
            If you&rsquo;re a leader who refuses to choose between success and
            significance &mdash; this Master Class was built for you.
          </p>
          <p
            style={{
              fontSize: "20px",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#CC0000",
            }}
          >
            &ldquo;Your business should fund your calling, not replace it.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 6: WHAT YOU WILL LEARN ── */
const learnItems = [
  "Identify your #1 Profit-Making Activity (PMA) and create a plan to hire the team to scale it",
  "Increase profitability and build a thriving business without losing peace",
  "Build better relationships with family, team, and spouse",
  "Craft your unique brand strategy for magnetic marketing",
  "Implement the Kingdom Intelligence Framework for scalable operations",
  "Clarify your super-powers with our signature S.W.E.E.T. Spot Audit",
  "Apply the 1% Method of Micro-progress",
  "Ignite a purpose-driven life your family wants to champion",
];

function RedCheck() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
      <circle cx="14" cy="14" r="14" fill="rgba(204,0,0,0.1)" />
      <path d="M8 14.5L12 18.5L20 10.5" stroke="#CC0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatYouLearn() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#F5F5F5", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#CC0000",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          WHAT YOU WILL LEARN
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "48px",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          During This 3-Day Transformational Event, You&rsquo;ll Learn How
          To...
        </h2>
        <div
          className="learn-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {learnItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <RedCheck />
              <p
                style={{
                  fontSize: "17px",
                  color: "#444444",
                  lineHeight: 1.6,
                }}
              >
                {item}
              </p>
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

/* ── SECTION 7: NOT FOR / FOR (NOTE) ── */
function NoteSection() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
      >
        <div
          style={{
            border: "2px solid #CC0000",
            borderRadius: "12px",
            padding: "48px 40px",
            marginBottom: "48px",
            background: "#FFFFFF",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              color: "#444444",
              lineHeight: 1.8,
            }}
          >
            <strong style={{ color: "#CC0000" }}>NOTE:</strong> This course is
            NOT for money-chasers or passive dreamers. But it IS for the
            entrepreneur who knows they have a God-given business the world
            desperately needs.
          </p>
        </div>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "32px",
          }}
        >
          Are You Ready to Go ALL IN?
        </h2>
        <CTAButton />
      </div>
    </section>
  );
}

/* ── SECTION 8: MORE TESTIMONIALS (2x2) ── */
const testimonials4 = [
  {
    name: "Kolton Kropf",
    title: "Business Owner",
    quote:
      "Our business was headed toward bankruptcy... turned into an 8-figure success story. The Kingdom Intelligence Framework changed everything for our family and our company.",
  },
  {
    name: "Delbert Friesen",
    title: "Entrepreneur",
    quote:
      "I've never heard anyone bridge the gap between elite business training with Kingdom principles the way Staci and Larry do. This is world-class.",
  },
  {
    name: "Eric Moland",
    title: "Sales Professional",
    quote:
      "In one month, my income jumped 35%. Next month, largest commission sales in 40 years of my career. The frameworks are that powerful.",
  },
  {
    name: "Alex & Irina Chifor",
    title: "Commercial Investors",
    quote:
      "FBF has had a monumental impact on our lives. We've built an 8-figure commercial investment business while keeping faith and family first.",
  },
];

function MoreTestimonials() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#CC0000",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          TESTIMONIALS
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          RESULTS MATTER...
        </h2>
        <div
          className="testimonial-grid-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
          }}
        >
          {testimonials4.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 9: FINAL CTA ── */
function FinalCTA() {
  const ref = useScrollReveal();
  return (
    <section
      style={{
        background: "#111111",
        padding: "100px 20px",
      }}
    >
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
      >
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
          }}
        >
          Are You Ready to Go ALL IN?
        </h2>
        <p
          style={{
            fontSize: "20px",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "40px",
            lineHeight: 1.6,
          }}
        >
          Join thousands of faith-driven leaders who are building God-sized
          businesses &mdash; without sacrificing what matters most.
        </p>
        <CTAButton text="CLAIM YOUR FREE SEAT NOW" />
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.4)",
            marginTop: "20px",
          }}
        >
          Free for a limited time. Live online event April 14-16, 2026.
        </p>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer
      style={{
        background: "#111111",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "20px",
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: "0.15em",
          marginBottom: "12px",
        }}
      >
        FBF
      </p>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
        &copy; 2026 Fueled By Fire. All Rights Reserved.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "8px" }}>
        <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Privacy Policy</a>
        <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Terms of Service</a>
        <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Contact</a>
      </div>
    </footer>
  );
}

/* ── PAGE ── */
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EventDetails />
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
