import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fueled by Fire Mastery | Executive Coaching, Consulting & Legacy",
  description:
    "Apply for Fueled by Fire's higher-level coaching, consulting, accountability, and legacy programs for Christian entrepreneurs and business owners.",
};

const applicationUrl = "#application";
const bookingUrl = "#book-call";
const paymentUrl = "https://fueledbyfire.com/mastery";

const outcomes = [
  "Clarify the God-sized vision for your company, family, and legacy.",
  "Install weekly accountability around revenue, leadership, operations, and cash flow.",
  "Strengthen your offer, funnels, sales process, client experience, and growth systems.",
  "Build with Kingdom intelligence instead of striving, chaos, or worldly pressure.",
];

const programPath = [
  {
    name: "Mastery",
    detail:
      "Core business, faith, family, finances, and growth training with strategic advisory and accountability for leaders building the foundation.",
  },
  {
    name: "Mastermind",
    detail:
      "Closer access, a private pod, deeper accountability, and additional counsel for founders who are ready for more direct proximity.",
  },
  {
    name: "Platinum",
    detail:
      "Executive-level coaching, consulting, private Slack access, and more focused support for leaders with larger decisions and bigger growth targets.",
  },
  {
    name: "Crown & Legacy",
    detail:
      "High-touch consulting and legacy planning for families, companies, and leaders building something that should outlive them.",
  },
];

const masteryAreas = [
  "Faith",
  "Family",
  "Finances",
  "Fitness",
  "Focus",
  "Freedom",
  "Fun",
  "Future",
];

const proof = [
  {
    stat: "$60M+",
    label: "client growth in three years",
    copy:
      "SaddleBrookeLife grew from zero business experience to an 8-figure trajectory with Fueled by Fire coaching.",
  },
  {
    stat: "$2M+",
    label: "debt paid off",
    copy:
      "Clients have used the FBF frameworks to strengthen cash flow, remove pressure, and build from peace.",
  },
  {
    stat: "8",
    label: "areas of mastery",
    copy:
      "Business growth is never isolated from faith, family, health, finances, focus, freedom, joy, and future legacy.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={styles.sectionHeading}>
      <p className={light ? styles.eyebrowLight : styles.eyebrow}>{eyebrow}</p>
      <h2 className={light ? styles.lightHeading : styles.heading}>{title}</h2>
      {copy ? <p className={light ? styles.copyLight : styles.copy}>{copy}</p> : null}
    </div>
  );
}

export default function MasteryPage() {
  return (
    <main className={styles.pageShell}>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src="/images/staci-larry-hero-2026.png"
          alt="Larry and Staci Wallace at the ranch"
        />
        <div className={styles.heroScrim} />
        <div className={styles.heroTop}>
          <img src="/images/fbf-logo-white.png" alt="Fueled by Fire" />
          <a href={applicationUrl}>Apply now</a>
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroKicker}>Higher-level coaching, consulting, accountability, and legacy</p>
          <h1>Fueled by Fire Mastery</h1>
          <p className={styles.heroLead}>
            For Christian entrepreneurs and business owners who are ready to stop building from
            pressure and start building business God's way.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={applicationUrl}>
              Start the application
            </a>
            <a className={styles.secondaryButton} href={bookingUrl}>
              Book a call
            </a>
          </div>
        </div>
      </section>

      <section className={styles.positioning}>
        <div className={styles.container}>
          <div className={styles.positioningGrid}>
            <div>
              <p className={styles.eyebrow}>This is not a course pitch</p>
              <h2 className={styles.heading}>It is a room for leaders who need counsel, accountability, and proximity.</h2>
            </div>
            <div className={styles.positioningCopy}>
              <p>
                The Kingdom Intelligence Network is the gathering pool. Mastery and above is the
                executive path for leaders who need more than content. They need the right room,
                a clear plan, direct accountability, and wise counsel around the decisions that
                shape their company, family, and legacy.
              </p>
              <p>
                The right next step may be Mastery, Mastermind, Platinum, Crown, or Legacy. The
                application helps us understand where you are, what God has placed in your hands,
                and which room can serve you best.
              </p>
            </div>
          </div>
          <div className={styles.proofGrid}>
            {proof.map((item) => (
              <article key={item.label} className={styles.proofCard}>
                <strong>{item.stat}</strong>
                <span>{item.label}</span>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="What we help you build"
            title="Peace and profit, without sacrificing the assignment."
            copy="Bring the real business in front of you: the stalled funnel, the team tension, the cash-flow pressure, the offer that needs sharpening, the family legacy that needs a plan."
            light
          />
          <div className={styles.outcomeGrid}>
            {outcomes.map((item) => (
              <article key={item} className={styles.outcomeCard}>
                <span />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.pathSection}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="The ascension path"
            title="Apply for the level of support your assignment requires."
            copy="We assume serious leaders are capable of more until proven otherwise. The goal is not to place everyone in the lowest offer. The goal is to identify the right level of counsel, accountability, and access."
          />
          <div className={styles.pathGrid}>
            {programPath.map((item, index) => (
              <article key={item.name} className={styles.pathCard}>
                <div className={styles.pathNumber}>{String(index + 1).padStart(2, "0")}</div>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div className={styles.imageFrame}>
              <img src="/images/perspective-group.jpg" alt="Fueled by Fire leaders gathered at Perspective" />
            </div>
            <div>
              <p className={styles.eyebrow}>The Mastery framework</p>
              <h2 className={styles.heading}>Business growth is only one part of the assignment.</h2>
              <p className={styles.copy}>
                Fueled by Fire was built for leaders who refuse to separate marketplace success
                from obedience, family, stewardship, health, and legacy. The work is practical,
                but it is also deeply personal.
              </p>
              <div className={styles.areaGrid}>
                {masteryAreas.map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.applicationSection} id="application">
        <div className={styles.container}>
          <div className={styles.applicationGrid}>
            <div className={styles.applicationIntro}>
              <p className={styles.eyebrow}>Application</p>
              <h2 className={styles.heading}>Tell us where you are and what you are building.</h2>
              <p className={styles.copy}>
                Once the final form and Cal.com link are connected, this section will route
                qualified applicants to book a private call. For now, the page is staged with
                the full application flow and placeholder links.
              </p>
              <a className={styles.paymentLink} href={paymentUrl}>
                Payment page placeholder: fueledbyfire.com/mastery
              </a>
            </div>
            <form className={styles.applicationForm}>
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@example.com" />
              </label>
              <label>
                Company
                <input type="text" name="company" placeholder="Company or organization" />
              </label>
              <label>
                Monthly revenue range
                <select name="revenue" defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>Under $10K/month</option>
                  <option>$10K-$50K/month</option>
                  <option>$50K-$250K/month</option>
                  <option>$250K+/month</option>
                </select>
              </label>
              <label>
                What do you need help with most?
                <textarea
                  name="need"
                  rows={5}
                  placeholder="Growth, team, cash flow, offer, leadership, legacy, or something else"
                />
              </label>
              <a className={styles.primaryButton} href={bookingUrl}>
                Continue to booking
              </a>
              <p className={styles.formNote}>Cal.com link will be connected after the page is approved.</p>
            </form>
          </div>
        </div>
      </section>

      <section className={styles.finalCta} id="book-call">
        <div className={styles.container}>
          <div className={styles.finalCtaInner}>
            <p className={styles.eyebrowLight}>Ready for the next conversation?</p>
            <h2 className={styles.lightHeading}>Apply first. Then book the call that matches your next level.</h2>
            <p className={styles.copyLight}>
              This page is designed to qualify the right leaders into the right room, then move
              them into a private call and the Fueled by Fire payment path when accepted.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={applicationUrl}>
                Start the application
              </a>
              <a className={styles.secondaryButtonLight} href={paymentUrl}>
                View payment page
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
