"use client";

import Image from "next/image";
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── CTA BUTTON ── */
function CTAButton({ text = "REGISTER FOR FREE" }: { text?: string }) {
  return (
    <a
      href={REGISTER_URL}
      className="cta-btn"
      style={{
        display: "inline-block",
        background: "#BB945A",
        color: "#000",
        fontWeight: 700,
        padding: "18px 60px",
        borderRadius: "4px",
        border: "none",
        fontSize: "18px",
        textDecoration: "none",
        cursor: "pointer",
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
      }}
    >
      {text}
    </a>
  );
}

/* ── SECTION 1: HERO ── */
function Hero() {
  const ref = useScrollReveal();
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/staci-larry-hero.avif"
        alt="Staci and Larry Wallace"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />
      <div
        ref={ref}
        className="section-reveal"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          width: "100%",
          padding: "0 20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#D4A017",
            marginBottom: "24px",
          }}
        >
          BIG BUSINESS. BOLD FAITH. NO COMPROMISE.
        </p>
        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 80px)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#FFFFFF",
            marginBottom: "24px",
            textTransform: "uppercase" as const,
          }}
        >
          KINGDOM INTELLIGENCE MASTER CLASS
        </h1>
        <p
          style={{
            fontSize: "22px",
            color: "#D4A017",
            lineHeight: 1.5,
            marginBottom: "24px",
            maxWidth: "700px",
          }}
        >
          Where High-Performing Leaders Scale Profitable Companies Without
          Compromising Their Faith, Family or Freedom
        </p>
        <p
          style={{
            fontSize: "18px",
            color: "#FFFFFF",
            marginBottom: "40px",
          }}
        >
          Free 3-Day Live Event &mdash; April 14-16, 2026 @ 12:00 PM CST
        </p>
        <CTAButton />
        <div style={{ marginTop: "16px" }}>
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 2: EVENT DETAILS ── */
function EventDetails() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            color: "#D4A017",
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
            color: "#FFFFFF",
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
            color: "#D4A017",
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

function Testimonials3() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {testimonials3.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "32px",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontSize: "80px",
                  fontFamily: "Georgia, serif",
                  color: "#D4A017",
                  lineHeight: 1,
                  display: "block",
                  marginBottom: "-20px",
                  opacity: 0.6,
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
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                {t.name}
              </p>
              <p style={{ fontSize: "14px", color: "#888" }}>{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 4: THE INVITATION (NOW IS THE TIME) ── */
function Invitation() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            color: "#D4A017",
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
          <p style={{ fontSize: "18px", color: "#FFFFFF", lineHeight: 1.8 }}>
            <strong style={{ color: "#D4A017" }}>DO</strong> you feel called to
            something bigger &mdash; a God-given mission to build a business
            that creates real impact, generational wealth, and a lasting legacy
            for your family?
          </p>
          <p style={{ fontSize: "18px", color: "#FFFFFF", lineHeight: 1.8 }}>
            <strong style={{ color: "#D4A017" }}>ARE</strong> you passionate
            about growing your company but refuse to compromise your faith,
            your family, or your freedom in the process?
          </p>
          <p style={{ fontSize: "18px", color: "#FFFFFF", lineHeight: 1.8 }}>
            Perhaps you&rsquo;ve lived in{" "}
            <strong style={{ color: "#D4A017" }}>BEAST mode</strong> for so
            long that your health, relationships, and spiritual life have paid
            the price. You&rsquo;re exhausted, overwhelmed, and wondering if
            there&rsquo;s a better way...
          </p>
        </div>

        <h3
          style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
            color: "#FFFFFF",
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
            color: "#D4A017",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          The answer is &lsquo;YES&rsquo; and we are living proof!
        </p>
        <p
          style={{
            fontSize: "18px",
            color: "#FFFFFF",
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
            color: "#D4A017",
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
            color: "#D4A017",
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
    <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-start",
          gap: "48px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "0 1 320px",
            minWidth: "250px",
          }}
        >
          <Image
            src="/images/staci-headshot-best.jpg"
            alt="Staci Wallace"
            width={320}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ flex: "1 1 400px", minWidth: "280px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "#D4A017",
              marginBottom: "8px",
            }}
          >
            HI, I AM STACI WALLACE
          </h2>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "24px",
              textTransform: "uppercase" as const,
            }}
          >
            CEO, FUELED BY FIRE AND 8X BEST-SELLING AUTHOR
          </p>
          <p
            style={{
              fontSize: "17px",
              color: "#ccc",
              lineHeight: 1.8,
              marginBottom: "24px",
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
              color: "#ccc",
              lineHeight: 1.8,
              marginBottom: "24px",
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
              color: "#ccc",
              lineHeight: 1.8,
              marginBottom: "24px",
            }}
          >
            If you&rsquo;re a leader who refuses to choose between success and
            significance &mdash; this Master Class was built for you.
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

function WhatYouLearn() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#111111", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "48px",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          During this 3-day transformational event, you&rsquo;ll learn how
          to...
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {learnItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  color: "#D4A017",
                  lineHeight: 1.4,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <p
                style={{
                  fontSize: "18px",
                  color: "#FFFFFF",
                  lineHeight: 1.7,
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 7: NOT FOR / FOR (NOTE) ── */
function NoteSection() {
  const ref = useScrollReveal();
  return (
    <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
      >
        <div
          style={{
            border: "2px solid #D4A017",
            borderRadius: "8px",
            padding: "48px 40px",
            marginBottom: "48px",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              color: "#FFFFFF",
              lineHeight: 1.8,
            }}
          >
            <strong style={{ color: "#D4A017" }}>NOTE:</strong> This course is
            NOT for money-chasers or passive dreamers. But it IS for the
            entrepreneur who knows they have a God-given business the world
            desperately needs.
          </p>
        </div>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "#D4A017",
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

/* ── SECTION 8: MORE TESTIMONIALS ── */
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
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "#D4A017",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          RESULTS MATTER...
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {testimonials4.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "32px",
              }}
            >
              <span
                style={{
                  fontSize: "80px",
                  fontFamily: "Georgia, serif",
                  color: "#D4A017",
                  lineHeight: 1,
                  display: "block",
                  marginBottom: "-20px",
                  opacity: 0.6,
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
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                {t.name}
              </p>
              <p style={{ fontSize: "14px", color: "#888" }}>{t.title}</p>
            </div>
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
    <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
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

/* ── FOOTER ── */
function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid #222",
        padding: "32px 20px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "14px", color: "#666" }}>
        &copy; 2026 Fueled By Fire. All Rights Reserved.
      </p>
    </footer>
  );
}

/* ── PAGE ── */
export default function Home() {
  return (
    <main>
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
