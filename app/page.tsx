"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

const REGISTER_URL = "https://fbfchallenge.com";

const glassCard = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "20px",
} as const;

/* ── SECTION LABEL (consistent across all sections) ── */
function SectionLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p
      style={{
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#C9A55A",
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
          background: "#C9A55A",
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
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
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

/* ── NAV ── */
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
        background: "rgba(13,13,13,0.85)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderBottom: "1px solid rgba(201,165,90,0.2)",
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
            color: "#FFFFFF",
            textDecoration: "none",
            borderRadius: "50px",
            border: "1px solid #C9A55A",
            background: "rgba(201,165,90,0.12)",
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

/* ── HERO ── */
function Hero() {
  const ref = useScrollReveal();
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #111111 0%, #0d0d0d 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "120px clamp(20px, 5vw, 80px) 80px",
      }}
    >
      {/* Grid dot pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(201,165,90,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
      {/* Large gold radial glow behind photo */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "15%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,165,90,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,165,90,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        ref={ref}
        className="section-reveal"
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "60px",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: text */}
        <div style={{ flex: "1 1 500px", minWidth: "300px" }}>
          {/* Floating badge */}
          <div
            style={{
              display: "inline-block",
              padding: "8px 20px",
              borderRadius: "50px",
              background: "rgba(201,165,90,0.12)",
              border: "1px solid rgba(201,165,90,0.3)",
              marginBottom: "24px",
              animation: "gentleBounce 3s ease-in-out infinite",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#E8C070",
              }}
            >
              FREE — LIMITED SEATS
            </span>
          </div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A55A",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "2px",
                background: "#C9A55A",
              }}
            />
            Free Live Event &mdash; April 14&ndash;16, 2026
          </p>
          <h1
            style={{
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #FFFFFF, #C9A55A, #FFFFFF)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Kingdom Intelligence Master Class
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#C8C8C8",
              lineHeight: 1.5,
              marginBottom: "40px",
              maxWidth: "520px",
            }}
          >
            Where Faith-Driven Leaders Learn to Scale in the AI Era
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href={REGISTER_URL}
              className="hero-cta"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #C9A55A, #E8C070)",
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
              Save Your Seat Free
            </a>
            <a
              href="#learn-more"
              style={{
                display: "inline-block",
                padding: "18px 48px",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "17px",
                textDecoration: "none",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              Learn More
            </a>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "#C8C8C8",
              marginTop: "24px",
              letterSpacing: "0.03em",
            }}
          >
            3 Days Live Online &mdash; No Cost &mdash; April 14&ndash;16, 2026
          </p>
        </div>

        {/* Right: photo */}
        <div style={{ flex: "0 1 380px", position: "relative" }}>
          {/* Gold glow behind photo */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "450px",
              height: "450px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,165,90,0.25) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              ...glassCard,
              padding: "8px",
              overflow: "hidden",
              transform: "translateY(-10px)",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(201,165,90,0.1)",
              position: "relative",
            }}
          >
            <Image
              src="/images/staci-headshot-best.jpg"
              alt="Staci Wallace"
              width={380}
              height={475}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "14px",
                objectFit: "cover",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SOCIAL PROOF BAR ── */
const stats = [
  { number: 35, suffix: "+", label: "Years Business Experience" },
  { number: 5, suffix: "", label: "U.S. Presidents Shared Stages With" },
  { number: 1000, suffix: "s+", label: "Of Leaders Coached" },
];

function SocialProof() {
  return (
    <section
      style={{
        background: "rgba(201,165,90,0.08)",
        borderTop: "1px solid rgba(201,165,90,0.2)",
        borderBottom: "1px solid rgba(201,165,90,0.2)",
        padding: "48px clamp(20px, 5vw, 80px)",
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
                  ? "1px solid rgba(201,165,90,0.2)"
                  : "none",
            }}
          >
            <p
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "8px",
                lineHeight: 1,
              }}
            >
              <AnimatedNumber value={s.number} suffix={s.suffix} />
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#C9A55A",
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

/* ── THE PROBLEM ── */
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
        background: "linear-gradient(180deg, #111111 0%, #0d0d0d 100%)",
        padding: "120px clamp(20px, 5vw, 80px)",
        position: "relative",
      }}
    >
      {/* Glowing gold line separator */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #C9A55A, transparent)",
        }}
      />
      <div ref={ref} className="section-reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel>Who This Is For</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#FFFFFF",
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
              className="glass-card-hover"
              style={{
                ...glassCard,
                borderTop: "2px solid #C9A55A",
                padding: "36px 32px",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {/* Gold circle number */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(201,165,90,0.15)",
                  border: "1px solid rgba(201,165,90,0.3)",
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
                    color: "#E8C070",
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
                  color: "#FFFFFF",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#C8C8C8",
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

/* ── THE SOLUTION ── */
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
        background: "#0d0d0d",
        padding: "120px clamp(20px, 5vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Navy blue radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(5,52,82,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Dot pattern background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />
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
            color: "#FFFFFF",
            marginBottom: "40px",
            maxWidth: "800px",
            margin: "0 auto 40px",
          }}
        >
          AI increases speed. Kingdom Intelligence determines dominion.
        </h2>

        {/* Quote block — more prominent */}
        <div
          style={{
            ...glassCard,
            background: "rgba(255,255,255,0.08)",
            padding: "48px 40px",
            maxWidth: "800px",
            margin: "0 auto 64px",
            borderLeft: "4px solid #C9A55A",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              color: "#FFFFFF",
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
            <div key={f.num} className="feature-col" style={{ paddingBottom: "8px" }}>
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 700,
                  color: "#C9A55A",
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
                  color: "#FFFFFF",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#C8C8C8",
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

/* ── WHAT YOU WILL LEARN ── */
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
        stroke="#C9A55A"
        strokeWidth="1.5"
        fill="rgba(201,165,90,0.1)"
      />
      <path
        d="M9 14.5L12.5 18L19 11"
        stroke="#E8C070"
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
        background: "linear-gradient(180deg, #0d0d0d 0%, #111827 100%)",
        padding: "120px clamp(20px, 5vw, 80px)",
      }}
    >
      <div ref={ref} className="section-reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel>Inside the Master Class</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#FFFFFF",
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
                  color: "#FFFFFF",
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
            background: "linear-gradient(135deg, #C9A55A, #E8C070)",
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

/* ── ABOUT STACI ── */
function About() {
  const ref = useScrollReveal();
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #111111 0%, #0d0d0d 100%)",
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
        {/* Text — animate from left */}
        <div style={{ flex: "1 1 400px", minWidth: "280px", order: 1 }}>
          <SectionLabel>Your Host</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              color: "#FFFFFF",
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
                background: "linear-gradient(90deg, #C9A55A, #E8C070)",
              }}
            />
            <p
              style={{
                fontSize: "15px",
                color: "#C9A55A",
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
              color: "#C8C8C8",
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
              color: "#E8C070",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Big Business. Bold Faith. No Compromise.
          </p>
        </div>

        {/* Photo — floating animation */}
        <div style={{ flex: "0 1 400px", order: 2, position: "relative" }}>
          {/* Gold glow behind photo */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,165,90,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              ...glassCard,
              padding: "8px",
              overflow: "hidden",
              animation: "float 6s ease-in-out infinite",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(201,165,90,0.1)",
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
                borderRadius: "14px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
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
        background: "#0d0d0d",
        padding: "120px clamp(20px, 5vw, 80px)",
      }}
    >
      <div ref={ref} className="section-reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel center>Results That Speak</SectionLabel>
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
                ...glassCard,
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {/* Decorative quote mark */}
              <span
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "24px",
                  fontSize: "120px",
                  fontFamily: "Georgia, serif",
                  color: "rgba(201,165,90,0.08)",
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
                    color: "#C9A55A",
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

/* ── FINAL CTA ── */
function FinalCTA() {
  const ref = useScrollReveal();
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #C9A55A 0%, #E8C070 50%, #C9A55A 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientShift 6s ease infinite",
        padding: "120px clamp(20px, 5vw, 80px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Confetti-like decorative dots */}
      {[
        { top: "10%", left: "8%", size: 6 },
        { top: "20%", right: "12%", size: 4 },
        { top: "70%", left: "15%", size: 5 },
        { top: "80%", right: "10%", size: 7 },
        { top: "40%", left: "5%", size: 3 },
        { top: "30%", right: "6%", size: 5 },
        { top: "60%", right: "20%", size: 4 },
        { top: "15%", left: "25%", size: 3 },
      ].map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: dot.top,
            left: "left" in dot ? dot.left : undefined,
            right: "right" in dot ? dot.right : undefined,
            width: dot.size + "px",
            height: dot.size + "px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.3)",
            pointerEvents: "none",
          }}
        />
      ))}
      <div ref={ref} className="section-reveal" style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "20px",
            lineHeight: 1.1,
            textShadow: "0 2px 20px rgba(0,0,0,0.2)",
          }}
        >
          Your seat is waiting.
        </h2>
        <p
          style={{
            fontSize: "19px",
            color: "#FFFFFF",
            lineHeight: 1.6,
            marginBottom: "40px",
            opacity: 0.9,
          }}
        >
          Three free days. April 14&ndash;16, 2026. Built for faith-driven
          leaders ready for the next level.
        </p>
        <a
          href={REGISTER_URL}
          className="final-cta-btn"
          style={{
            display: "inline-block",
            background: "#0d0d0d",
            color: "#FFFFFF",
            fontWeight: 600,
            padding: "18px 48px",
            borderRadius: "50px",
            border: "none",
            fontSize: "17px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Save My Free Seat Now
        </a>
        <p
          style={{
            fontSize: "14px",
            color: "#FFFFFF",
            marginTop: "20px",
            opacity: 0.6,
          }}
        >
          Free registration. No credit card. Live online event.
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
        backgroundColor: "#0d0d0d",
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
          <span className="fbf-logo" style={{ fontSize: "16px", letterSpacing: "2px" }}>
            FBF
          </span>
          <span
            style={{
              color: "#C8C8C8",
              fontSize: "14px",
              marginLeft: "16px",
            }}
          >
            &copy; 2026 Fueled By Fire
          </span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="#" className="nav-link">
            Privacy Policy
          </a>
          <a href="#" className="nav-link">
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
