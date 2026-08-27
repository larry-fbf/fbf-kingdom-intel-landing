"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type RegistrationForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leaderType: string;
  agreed: boolean;
};

const initialForm: RegistrationForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  leaderType: "",
  agreed: false,
};

const EVENT_DATE_LABEL = "Tuesday, August 18";
const WORKSHOP_START_UTC = "2026-08-18T16:00:00.000Z";
const WORKSHOP_TIME_LABEL = "11am CT / 12pm ET";

const takeaways = [
  "The area that deserves attention first",
  "One next move with a date attached",
  "A short list of what to pause, delegate, or simplify this week",
  "The Kingdom Intel Workshop Workbook",
  "A clear 7-Day Action Plan",
];

const proof = [
  {
    quote:
      "Our company is thriving, but the greatest transformation has been in our marriage and with our kids. Having coaches walk with us weekly has been a game-changer.",
    name: "Vangel Roberts",
    role: "CMO, Wade Roberts Plumbing",
    photo: "/images/vangel-headshot.jpg",
  },
  {
    quote:
      "We have clarified God's plan for our portfolio of dentistry businesses and our family has been restored to full alignment. We are crystal clear about our God-sized vision.",
    name: "Drew and Tina Shabo",
    role: "Dentistry Business Owners",
    photo: "/images/drew-tina.jpg",
  },
  {
    quote:
      "Since joining Fueled By Fire, my husband got baptized, we are expanding our law firm nationally, and God has been downloading big audacious goals for our future.",
    name: "Kristina Hess",
    role: "KR Hess Law, P.C.",
    photo: "/images/kristina-hess.png",
  },
];

const faqs = [
  {
    q: "Is the workshop really free?",
    a: "Yes. There is no card required and no hidden cost to register.",
  },
  {
    q: "Who should attend?",
    a: "Kingdom-minded founders, CEOs, and leaders who are working hard, carrying real responsibility, and want clearer traction in the next season.",
  },
  {
    q: "What happens during the session?",
    a: "We'll help you look at the places where traction usually slows down, then choose one clear next move for the next seven days.",
  },
  {
    q: "Will there be a replay?",
    a: "Registered leaders will get access for a short window. Attend live if you can, because the live room is where the teaching becomes practical.",
  },
  {
    q: "What if I don't have a business yet?",
    a: "You can still attend if you are building toward business ownership or carrying a God-sized vision that needs structure. The workshop is focused on business traction, but the clarity work will help you identify the next faithful step from where you are right now.",
  },
  {
    q: "Is this just business training or is there more?",
    a: "There is more. Fueled By Fire builds around the F7: faith, family, finance, focus, fitness, and fun. This workshop is focused, but we will touch the areas of life and business that affect a leader's ability to move with clarity and consistency.",
  },
  {
    q: "What if I cannot stay past noon?",
    a: "The core teaching runs for 60 minutes. We'll leave room at the end for open Q&A and practical application.",
  },
];

async function postWithTimeout(url: string, body: unknown) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

function useStickyCta(firstCtaRef: React.RefObject<HTMLButtonElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const button = firstCtaRef.current;
    if (!button) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(button);
    return () => observer.disconnect();
  }, [firstCtaRef]);

  return visible;
}

function scrollToRegistration() {
  document.getElementById("registration")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function WorkshopTime() {
  return <time dateTime={WORKSHOP_START_UTC}>{WORKSHOP_TIME_LABEL}</time>;
}

function CtaButton({
  children = "Save My Seat",
  className = "",
  buttonRef,
}: {
  children?: string;
  className?: string;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button ref={buttonRef} className={`${styles.button} ${className}`} onClick={scrollToRegistration} type="button">
      {children}
    </button>
  );
}

function WorkshopWordmark() {
  return (
    <div className={styles.wordmark} aria-label="Called But Stuck?">
      <span>Called</span>
      <span>But</span>
      <em>Stuck?</em>
    </div>
  );
}

function HeroVsl() {
  return (
    <aside className={styles.heroVslCard} aria-label="Workshop video">
      <div className={styles.vslFrame}>
        <iframe
          src="https://player.vimeo.com/video/1216502074?badge=0&autopause=0&player_id=0&app_id=58479"
          title="Called But Stuck workshop video"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
        />
      </div>
    </aside>
  );
}

function RegistrationCard() {
  const [form, setForm] = useState<RegistrationForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (field: keyof RegistrationForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.agreed) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await postWithTimeout("/api/workshop/register", {
        ...form,
        event: "Kingdom Intel Workshop - August 18",
        sourcePath: window.location.pathname,
        queryString: window.location.search,
      });
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div id="registration" className={`${styles.registrationCard} ${styles.successCard}`}>
        <p className={styles.eyebrow}>You Are Registered</p>
        <h2>You Are In for August 18.</h2>
        <p>
          Watch your email for Zoom access and reminders. Teaching starts at <WorkshopTime /> and runs
          for 60 minutes, with time afterward for open Q&A.
        </p>
      </div>
    );
  }

  return (
    <form id="registration" className={styles.registrationCard} onSubmit={submit}>
      <p className={styles.eyebrow}>Reserve Your Seat</p>
      <h2>Join the Free Live Workshop.</h2>
      <p className={styles.formIntro}>
        {EVENT_DATE_LABEL} at <WorkshopTime />. Free on Zoom.
      </p>

      <div className={styles.nameGrid}>
        <label>
          <span>First Name *</span>
          <input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
        </label>
        <label>
          <span>Last Name *</span>
          <input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
        </label>
      </div>

      <label>
        <span>Email *</span>
        <input
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </label>

      <label>
        <span>Mobile Number</span>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+1 (555) 000-0000"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </label>

      <label>
        <span>Which Best Describes You? *</span>
        <select required value={form.leaderType} onChange={(e) => update("leaderType", e.target.value)}>
          <option value="">Select one</option>
          <option value="Founder or CEO">Founder or CEO</option>
          <option value="Senior leader">Senior leader</option>
          <option value="Building toward the next thing">Building toward the next thing</option>
        </select>
      </label>

      <label className={styles.consentRow}>
        <input type="checkbox" checked={form.agreed} onChange={(e) => update("agreed", e.target.checked)} />
        <span>
          I agree to receive workshop reminders and customer care updates from Fueled By Fire, LLC.
          Reply STOP to opt out. Message frequency varies.{" "}
          <a href="https://www.fbfchallenge.com/privacy" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="https://www.fbfchallenge.com/terms" target="_blank" rel="noreferrer">
            Terms
          </a>
        </span>
      </label>

      <button className={styles.button} disabled={status === "loading"} type="submit">
        {status === "loading" ? "Saving..." : "Save My Seat"}
      </button>
      <p className={styles.formNote}>Free. Live online workshop. Limited seats.</p>
      {status === "error" ? <p className={styles.errorText}>Check the required fields and try again.</p> : null}
    </form>
  );
}

function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.faqList}>
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <article key={item.q} className={isOpen ? styles.openFaq : ""}>
            <button type="button" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen}>
              <span>{item.q}</span>
              <strong>{isOpen ? "-" : "+"}</strong>
            </button>
            <div aria-hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function WorkshopLanding() {
  const firstCtaRef = useRef<HTMLButtonElement | null>(null);
  const stickyVisible = useStickyCta(firstCtaRef);

  return (
    <main className={styles.pageShell}>
      <section className={styles.heroSection}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroBrandRow}>
              <img className={styles.heroLogo} src="/images/fbf-logo-white.png" alt="Fueled By Fire" />
              <p className={styles.heroKicker}>Free Kingdom Intelligence Workshop</p>
            </div>
            <p className={`${styles.eyebrow} ${styles.heroHostLine}`}>Live with Payton Wallace &amp; Andy Lee</p>
            <WorkshopWordmark />
          </div>

          <HeroVsl />
          <p className={styles.heroLead}>
            A free, live workshop for Kingdom CEOs who are working hard and not gaining traction.
            You've seen our Fueled by Fire events for high-ticket business owners, and now this is
            for those who are stuck.
          </p>
          <p className={styles.heroVslPromise}>
            In 60 minutes, you will identify what is slowing you down, see the one thing to do about
            it, and leave with a clear 7-Day Action Plan.
          </p>
          <div className={styles.heroActions}>
            <CtaButton buttonRef={firstCtaRef} className={styles.heroButton} />
          </div>
        </div>
        <div className={styles.heroEventStrip}>
          {EVENT_DATE_LABEL} - <WorkshopTime /> - Live Online - Free
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.narrow}>
          <h2>The Question You Might Be Asking</h2>
          <p>
            You have prayed, planned, and taken action. Then another week passes where the calendar
            is full, but the next move still is not obvious.
          </p>
          <p>
            After working through this pattern with thousands of Kingdom CEOs, the issue is rarely
            effort. Most of the time, the next step comes down to clarity, message, focus, or
            consistent execution.
          </p>
        </div>
      </section>

      <section className={styles.workshopSection}>
        <div className={styles.container}>
          <div className={styles.twoColumn}>
            <div>
              <p className={styles.eyebrow}>What We'll Do in 60 Minutes</p>
              <h2>Clarify the Next Faithful Growth Move.</h2>
              <p>
                Payton and Andy are seasoned CEO Mentors and they will walk you through the four common
                places where traction slows down, without giving away the whole framework upfront. By
                the end of the workshop, you'll know what deserves attention first and what move
                belongs on the calendar next.
              </p>
              <p>
                We'll leave room at the end for open Q&A so the teaching turns into practical next
                steps.
              </p>
              <CtaButton />
            </div>

            <div className={styles.takeawayPanel}>
              <p className={styles.eyebrow}>You'll Walk Away With</p>
              <ul>
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.registrationBand}>
        <div className={styles.container}>
          <div className={styles.registrationLayout}>
            <div>
              <p className={styles.eyebrow}>Register Free</p>
              <h2>Reserve Your Spot Here.</h2>
              <p>
                You'll start by sharing where you are in the journey. That helps us serve the room
                well and keep the workshop practical from the beginning.
              </p>
              <p>
                The goal is simple: leave with clarity, a next move, and a short plan you can act on
                this week.
              </p>
            </div>
            <RegistrationCard />
          </div>
        </div>
      </section>

      <section className={styles.hostSection}>
        <div className={styles.container}>
          <div className={styles.hostGrid}>
            <div>
              <p className={styles.eyebrow}>Your Hosts</p>
              <h2>Payton Wallace &amp; Andy Lee</h2>
              <p>
                Payton and Andy are executives inside Fueled By Fire, working with leaders to help
                them turn their God-sized vision into practical next steps for real businesses.
              </p>
              <p>
                This workshop is designed to be direct, practical, and useful. You won't just hear
                another teaching. You'll clarify what needs attention and walk away with an action
                plan for what will move your business forward.
              </p>
            </div>
            <div className={styles.hostVisual}>
              <div className={styles.hostPhotoGrid} aria-label="Workshop hosts">
                <figure>
                  <img src="/images/payton-wallace-host.webp" alt="Payton Wallace" />
                  <figcaption>Payton Wallace</figcaption>
                </figure>
                <figure>
                  <img src="/images/andy-lee-host.webp" alt="Andy Lee" />
                  <figcaption>Andy Lee</figcaption>
                </figure>
              </div>
              <div className={styles.hostPanel}>
                <span>Free Live Workshop</span>
                <strong>August 18</strong>
                <p>
                  <WorkshopTime />. Teaching runs for 60 minutes, with open Q&A afterward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Results Matter</p>
            <h2>Clarity Changes What Leaders Carry.</h2>
          </div>
          <div className={styles.proofGrid}>
            {proof.map((item) => (
              <article key={item.name}>
                <img src={item.photo} alt={item.name} />
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.prepareSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>How to Prepare</p>
            <h2>Treat It Like a Board Meeting, Not a Webinar.</h2>
          </div>
          <div className={styles.prepareGrid}>
            <article>
              <span>01</span>
              <h3>Block Your Calendar</h3>
              <p>
                {EVENT_DATE_LABEL} at <WorkshopTime />.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Bring Something To Write With</h3>
              <p>You'll be working, not watching.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Come Expecting</h3>
              <p>Come ready to pay attention, take notes, and make one clear decision.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Before You Register</p>
            <h2>What You Might Want to Know.</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.narrow}>
          <p className={`${styles.eyebrow} ${styles.finalEyebrow}`}>The Cost of Waiting</p>
          <h2>Next Month Can Look Different.</h2>
          <p>
            Focused effort spread across too many priorities can keep the right move hidden. The
            vision can be real and the next step can still need refinement.
          </p>
          <CtaButton />
          <p className={styles.finalMeta}>
            Free - Live Online - {EVENT_DATE_LABEL} - <WorkshopTime />.
          </p>
          <p className={styles.signature}>Blessings, Payton &amp; Andy</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" />
        <p>Fueled By Fire, LLC. All Rights Reserved.</p>
      </footer>

      <div className={`${styles.mobileSticky} ${stickyVisible ? styles.mobileStickyVisible : ""}`}>
        <button onClick={scrollToRegistration} type="button">
          Save My Seat
        </button>
      </div>
    </main>
  );
}
