"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

const REGISTER_URL = "https://fbfchallenge.com";

const lightCard = {
  background: "#FFFFFF",
  border: "1px solid #E8E4DC",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
} as const;

const glassCardDark = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "16px",
} as const;

/* ── SECTION LABEL ── */
function SectionLabel({
  children,
  center,
  dark,
}: {
  children: React.ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <p
      style={{
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#B8943F",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "24px",
          height: "2px",
          background: "#B8943F",
          flexShrink: 0,
        }}
      />
      {children}
    </p>
  );
}

/* ── INTERSECTION OBSERVER HOOK ── */
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ── ANIMATED COUNTER ── */
function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.round(eased * value);
            el.textContent = start + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ── NAV (Light background) ── */
function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px clamp(20px, 5vw, 80px)",
        background: "rgba(250,250,248,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #E8E4DC",
      }}
    >
      <span className="fbf-logo">FBF</span>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <a href="#learn-more" className="nav-link">
          About
        </a>
        <a href="#testimonials" className="nav-link">
          Results
        </a>
        <a
          href={REGISTER_URL}
          style={{
            display: "inline-block",
            padding: "10px 28px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#0d0d0d",
            textDecoration: "none",
            borderRadius: "50px",
            border: "none",
            background: "linear-gradient(135deg, #B8943F, #D4AD4A)",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
          }}
        >
          Register Free
        </a>
      </div>
    </nav>
  );
}

/* ── HERO (Full-bleed photo, centered layout) ── */
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
        padding: "120px clamp(20px, 5vw, 80px) 80px",
      }}
    >
      {/* Full-bleed background photo */}
      <Image
        src="/images/staci-larry-hero.avif"
        alt="Staci and Larry Wallace"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(5,33,52,0.8) 100%)",
          zIndex: 1,
        }}
      />
      {/* Content */}
      <div
        ref={ref}
        className="section-reveal"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: "50px",
            background: "rgba(184,148,63,0.15)",
            border: "1px solid rgba(184,148,63,0.35)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#D4AD4A",
            }}
          >
            FREE &mdash; APRIL 14&ndash;16, 2026
          </span>
        </div>
        {/* Tagline */}
        <p
          style={{
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D4AD4A",
            marginBottom: "20px",
          }}
        >
          Big Business. Bold Faith. No Compromise.
        </p>
        {/* Main headline */}
        <h1
          style={{
            fontSize: "clamp(42px, 6vw, 80px)",
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: "20px",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
          }}
        >
          Kingdom Intelligence Master Class
        </h1>
        {/* Subheadline */}
        <p
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.5,
            marginBottom: "28px",
            maxWidth: "600px",
          }}
        >
          Where Faith-Driven Leaders Learn to Scale in the AI Era
        </p>
        {/* Event details */}
        <p
          style={{
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#D4AD4A",
            marginBottom: "36px",
          }}
        >
          April 14&ndash;16, 2026 &nbsp;|&nbsp; Free Live Online Event &nbsp;|&nbsp; 3 Days
        </p>
        {/* CTA */}
        <a
          href={REGISTER_URL}
          className="hero-cta"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #B8943F, #D4AD4A)",
            color: "#0d0d0d",
            fontWeight: 600,
            padding: "20px 56px",
            borderRadius: "50px",
            border: "none",
            fontSize: "18px",
            textDecoration: "none",
            cursor: "pointer",
            boxShadow: "0 0 40px rgba(184,148,63,0.3)",
          }}
        >
          Save Your Seat &mdash; Free
        </a>
        {/* Sub-CTA */}
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.55)",
            marginTop: "20px",
            letterSpacing: "0.03em",
          }}
        >
          No credit card required. Limited seats available.
        </p>
      </div>
    </section>
  );
}

/* ── SOCIAL PROOF BAR (Light — white bg, gold borders) ── */
const stats = [
  { number: 35, suffix: "+", label: "Years Business Experience" },
  { number: 5, suffix: "", label: "U.S. Presidents Shared Stages With" },
  { number: 1000, suffix: "s+", label: "Of Leaders Coached" },
];

function SocialProof() {
  return (
    <section
      style={{
        background: "#FFFFFF",
        borderTop: "2px solid #B8943F",
        borderBottom: "2px solid #B8943F",
        padding: "48px clamp(20px, 5vw, 80px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 200px",
              textAlign: "center",
              padding: "16px 32px",
              borderRight:
                i < stats.length - 1
                  ? "1px solid #E8E4DC"
                  : "none",
            }}
          >
            <p
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "8px",
                lineHeight: 1,
              }}
            >
              <AnimatedNumber value={s.number} suffix={s.suffix} />
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#B8943F",
                letterSpacing: "0.05em",
                fontWeight: 500,
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── THE PROBLEM (Light — warm white bg, white cards) ── */
const painPoints = [
  {
    num: "01",
    title: "Your team depends on you for everything",
    desc: "Every decision, every approval, every crisis flows through you. You are the ceiling of your own company.",
  },
  {
    num: "02",
    title: "AI feels like one more thing you should be doing",
    desc: "You know it matters, but between running the business and leading your team, there is no margin left to figure it out.",
  },
  {
    num: "03",
    title: "Growth keeps adding complexity instead of clarity",
    desc: "More revenue, more people, more problems. The business is growing but it is not getting easier.",
  },
];

function Problem() {
  const ref = useScrollReveal();
  return (
    <section
      id="learn-more"
      style={{
        background: "#F5F3EF",
        padding: "120px clamp(20px, 5vw, 80px)",
        position: "relative",
      }}
    >
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <SectionLabel>Who This Is For</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#111111",
            marginBottom: "56px",
            maxWidth: "700px",
          }}
        >
          You built a real business. So why does it still feel this heavy?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {painPoints.map((p, i) => (
            <div
              key={p.num}
              className="light-card-hover"
              style={{
                ...lightCard,
                borderTop: "3px solid #B8943F",
                padding: "36px 32px",
              }}
            >
              {/* Gold circle number */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(184,148,63,0.12)",
                  border: "1px solid rgba(184,148,63,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#B8943F",
                    letterSpacing: "0.1em",
                  }}
                >
                  {p.num}
                </span>
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#555555",
                  lineHeight: 1.7,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── THE SOLUTION (Light — white bg) ── */
const features = [
  {
    num: "01",
    title: "Increase Profit with Operational Clarity",
    desc: "Identify the hidden inefficiencies draining your revenue and replace them with streamlined systems that compound over time.",
  },
  {
    num: "02",
    title: "Integrate AI Without Compromising Your Values",
    desc: "Learn exactly which AI tools to use, where to deploy them, and how to keep your faith and ethics at the center of every decision.",
  },
  {
    num: "03",
    title: "Build Systems Your Team Can Run Without You",
    desc: "Create documented, repeatable processes that free you from daily operations so you can focus on vision and growth.",
  },
];

function Solution() {
  const ref = useScrollReveal();
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "120px clamp(20px, 5vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={ref}
        className="section-reveal"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionLabel center>The Framework</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#111111",
            marginBottom: "40px",
            maxWidth: "800px",
            margin: "0 auto 40px",
          }}
        >
          AI increases speed. Kingdom Intelligence determines dominion.
        </h2>

        {/* Quote block — white card with gold left border */}
        <div
          style={{
            ...lightCard,
            background: "#FFFFFF",
            padding: "48px 40px",
            maxWidth: "800px",
            margin: "0 auto 64px",
            borderLeft: "4px solid #B8943F",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              color: "#111111",
              lineHeight: 1.7,
            }}
          >
            Inside this free 3-day live event, you will learn how to combine
            Spirit-led discernment with the right systems and AI tools to build a
            company that grows without depending entirely on you. This is not
            another productivity hack. This is a framework for dominion &mdash;
            where faith meets strategy and your business finally works the way it
            was designed to.
          </p>
        </div>

        {/* Gold horizontal rule */}
        <div
          style={{
            width: "120px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #B8943F, transparent)",
            margin: "0 auto 64px",
          }}
        />

        {/* Three columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            textAlign: "left",
          }}
        >
          {features.map((f) => (
            <div
              key={f.num}
              className="feature-col"
              style={{ paddingBottom: "8px" }}
            >
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 700,
                  color: "#B8943F",
                  lineHeight: 1,
                  display: "block",
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {f.num}
              </span>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#555555",
                  lineHeight: 1.7,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WHAT YOU WILL LEARN (Light — warm white bg) ── */
const checklist = [
  "Increase profit without adding complexity",
  "Build systems your team actually follows",
  "Use AI in alignment with your calling and values",
  "Make faster, Spirit-led decisions",
  "Scale without becoming the bottleneck",
];

function CheckmarkSVG({ delay }: { delay: number }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle
        cx="14"
        cy="14"
        r="12"
        stroke="#B8943F"
        strokeWidth="1.5"
        fill="rgba(184,148,63,0.1)"
      />
      <path
        d="M9 14.5L12.5 18L19 11"
        stroke="#B8943F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="50"
        strokeDashoffset="50"
        style={{
          animation: `strokeDraw 0.6s ease-out ${delay}s forwards`,
        }}
      />
    </svg>
  );
}

function Learn() {
  const ref = useScrollReveal();
  return (
    <section
      style={{
        background: "#F5F3EF",
        padding: "120px clamp(20px, 5vw, 80px)",
      }}
    >
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <SectionLabel>Inside the Master Class</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#111111",
            marginBottom: "56px",
            maxWidth: "600px",
          }}
        >
          Three days. No fluff. Everything you need.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px 48px",
            marginBottom: "56px",
          }}
        >
          {checklist.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "12px 0",
                opacity: 0,
                animation: `fadeInUp 0.5s ease-out ${0.3 + i * 0.15}s forwards`,
              }}
            >
              <CheckmarkSVG delay={0.5 + i * 0.15} />
              <span
                style={{
                  fontSize: "17px",
                  color: "#111111",
                  lineHeight: 1.7,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
        <a
          href={REGISTER_URL}
          className="hero-cta"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #B8943F, #D4AD4A)",
            color: "#0d0d0d",
            fontWeight: 600,
            padding: "18px 48px",
            borderRadius: "50px",
            border: "none",
            fontSize: "17px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Register Free &mdash; April 14&ndash;16
        </a>
      </div>
    </section>
  );
}

/* ── ABOUT STACI (Light — white bg) ── */
function About() {
  const ref = useScrollReveal();
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "120px clamp(20px, 5vw, 80px)",
      }}
    >
      <div
        ref={ref}
        className="section-reveal"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "64px",
          flexWrap: "wrap",
        }}
      >
        {/* Text */}
        <div style={{ flex: "1 1 400px", minWidth: "280px", order: 1 }}>
          <SectionLabel>Your Host</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              color: "#111111",
              marginBottom: "8px",
              lineHeight: 1.1,
            }}
          >
            Staci Wallace
          </h2>
          {/* Gold accent line next to title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "40px",
                height: "2px",
                background: "linear-gradient(90deg, #B8943F, #D4AD4A)",
              }}
            />
            <p
              style={{
                fontSize: "15px",
                color: "#B8943F",
                lineHeight: 1.5,
              }}
            >
              CEO, Fueled By Fire &mdash; 8x Best-Selling Author &mdash;
              International Speaker
            </p>
          </div>
          <p
            style={{
              fontSize: "17px",
              color: "#555555",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            Staci Wallace has shared stages with five U.S. Presidents and spoken
            to hundreds of thousands of leaders across the globe. She is the CEO
            of Fueled By Fire, one of the nation&rsquo;s leading faith-based
            business coaching companies, and the architect of the Kingdom
            Intelligence framework. For over 35 years she has helped
            faith-driven entrepreneurs build profitable, purposeful companies
            without sacrificing family, faith, or freedom.
          </p>
          <p
            style={{
              fontSize: "20px",
              color: "#B8943F",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Big Business. Bold Faith. No Compromise.
          </p>
        </div>

        {/* Photo — static, professional, clean frame with shadow */}
        <div style={{ flex: "0 1 400px", order: 2, position: "relative" }}>
          <div
            style={{
              background: "#FFFFFF",
              padding: "8px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #E8E4DC",
              boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            <Image
              src="/images/staci-speaking.jpg"
              alt="Staci Wallace speaking"
              width={400}
              height={500}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS (DARK — navy #052134) ── */
const testimonials = [
  {
    name: "Kyler Kropf",
    company: "Saddlebrooke Life",
    quote:
      "We grew to $1M in our first 9 months and hit $10M within 3 years. The frameworks Staci teaches changed everything about how we operate.",
  },
  {
    name: "Dallas Marley",
    company: "",
    quote:
      "I paid off $83,000 in debt in under 12 months. The clarity and systems I learned gave me a completely new trajectory for my business and my life.",
  },
  {
    name: "Vangel Roberts",
    company: "Wade Roberts Plumbing",
    quote:
      "The transformation wasn\u2019t just in our business \u2014 it was in every area. Our company, our marriage, our faith. Everything shifted to a higher level.",
  },
];

function Testimonials() {
  const ref = useScrollReveal();
  return (
    <section
      id="testimonials"
      style={{
        background: "#052134",
        padding: "120px clamp(20px, 5vw, 80px)",
      }}
    >
      <div
        ref={ref}
        className="section-reveal"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <SectionLabel center dark>
          Results That Speak
        </SectionLabel>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#FFFFFF",
            marginBottom: "56px",
            textAlign: "center",
          }}
        >
          Real leaders. Real results.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{
                ...glassCardDark,
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative gold quote mark */}
              <span
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "24px",
                  fontSize: "120px",
                  fontFamily: "Georgia, serif",
                  color: "rgba(184,148,63,0.15)",
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                &ldquo;
              </span>
              <p
                style={{
                  fontSize: "17px",
                  color: "#FFFFFF",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                  fontStyle: "italic",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#B8943F",
                    marginBottom: "4px",
                  }}
                >
                  {t.name}
                </p>
                {t.company && (
                  <p style={{ fontSize: "14px", color: "#C8C8C8" }}>
                    {t.company}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA (DARK — #0D0D0D) ── */
function FinalCTA() {
  const ref = useScrollReveal();
  return (
    <section
      style={{
        background: "#0D0D0D",
        padding: "120px clamp(20px, 5vw, 80px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={ref}
        className="section-reveal"
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "20px",
            lineHeight: 1.1,
          }}
        >
          Your seat is waiting.
        </h2>
        <p
          style={{
            fontSize: "19px",
            color: "#B8943F",
            lineHeight: 1.6,
            marginBottom: "40px",
          }}
        >
          Three free days. April 14&ndash;16, 2026. Built for faith-driven
          leaders ready for the next level.
        </p>
        <a
          href={REGISTER_URL}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #B8943F, #D4AD4A)",
            color: "#0d0d0d",
            fontWeight: 600,
            padding: "18px 48px",
            borderRadius: "50px",
            border: "none",
            fontSize: "17px",
            textDecoration: "none",
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(184,148,63,0.3)",
            transition: "all 0.3s ease",
          }}
        >
          Save My Free Seat Now
        </a>
        <p
          style={{
            fontSize: "14px",
            color: "#888888",
            marginTop: "20px",
          }}
        >
          Free registration. No credit card. Live online event.
        </p>
      </div>
    </section>
  );
}

/* ── FOOTER (Dark — #111111) ── */
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111111",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "40px clamp(20px, 5vw, 80px)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div>
          <span
            className="fbf-logo"
            style={{ fontSize: "16px", letterSpacing: "2px" }}
          >
            FBF
          </span>
          <span
            style={{
              color: "#888888",
              fontSize: "14px",
              marginLeft: "16px",
            }}
          >
            &copy; 2026 Fueled By Fire
          </span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="#" className="nav-link-light">
            Privacy Policy
          </a>
          <a href="#" className="nav-link-light">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SocialProof />
      <Problem />
      <Solution />
      <Learn />
      <About />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
