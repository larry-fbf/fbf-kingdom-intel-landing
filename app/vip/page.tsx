import type { Metadata } from "next";
import CountdownTimer from "./CountdownTimer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "VIP Upgrade | Kingdom Intelligence Masterclass",
  description:
    "Upgrade to VIP for the final-day VIP room and FBF Vault recordings for the Kingdom Intelligence Masterclass.",
};

const PAYMENT_LINK = "https://buy.stripe.com/8x2dRabIR7JA3qQ88t5kk0i";

const bonuses = [
  {
    title: "Masterclass recordings",
    body:
      "Get access to the Kingdom Intelligence Masterclass recordings inside the FBF Vault so you can rewatch the training and keep implementing after the live event.",
    image: "/images/vip-life-business-bundle.png",
  },
  {
    title: "S.W.E.E.T. Spot audit",
    body:
      "Clarify your mandate, identify blind spots, and remove the roadblocks holding back your next level of revenue, margin, and Kingdom impact.",
    image: "/images/vip-sweet-spot-audit.png",
  },
  {
    title: "Top 10 CEO leadership hacks",
    body:
      "Activate the leadership disciplines faith-driven CEOs need when markets are noisy, teams need clarity, and the business has to keep moving.",
    image: "/images/vip-superhero-hacks.png",
  },
];

const vipIncludes = [
  "One live VIP room on the final day after the masterclass at 7pm CT",
  "Direct coaching and feedback from Larry, Staci, and the CEO Mentor team",
  "A chance to bring your specific life, business, offer, messaging, sales, and operations questions",
  "Access to the Kingdom Intelligence Masterclass recordings in the FBF Vault",
  "Fast-action bonus resources to help you implement without starting from scratch",
];

const cindyTestimonial = {
  quote:
    "I joined the VIP session, which led to me taking massive action and joining the Platinum Program. This decision has led to monumental impact in my business and family by showing me how to build a debt-free Kingdom life and business that breeds extravagant generosity.",
  name: "Cindy Simcox",
};

const testimonials = [
  {
    quote:
      "I was an 8th-grade dropout with zero business experience. Larry & Staci helped our company grow to $13 million in 9 months and over $60 million in 3 years!",
    name: "Kyler Kropf",
    role: "Founder, SaddleBrookeLife",
    image: "/images/kyler-headshot.png",
  },
  {
    quote:
      "In less than 12 months, we paid off over $2 million in debt, moved to Ecuador, and stepped into the life of our dreams.",
    name: "Dallas Marley",
    role: "Marketing Specialist & Entrepreneur",
    image: "/images/dallas-headshot.jpg",
  },
  {
    quote:
      "Our company is thriving, but the greatest transformation has been in our marriage and with our kids. Having coaches walk with us weekly has been a game-changer.",
    name: "Vangel Roberts",
    role: "CMO, Wade Roberts Plumbing",
    image: "/images/vangel-headshot.jpg",
  },
];

function CTAButton({ label = "Yes, I want VIP for $97" }: { label?: string }) {
  return (
    <a className={styles.ctaButton} href={PAYMENT_LINK}>
      {label}
    </a>
  );
}

function OfferCard() {
  return (
    <aside className={styles.offerCard} aria-label="VIP offer">
      <p className={styles.offerKicker}>Limited time offer</p>
      <h2>VIP Mastermind</h2>
      <p className={styles.offerSubtitle}>Live - 1 x 1 training with direct coaching at 7pm CT.</p>
      <div className={styles.todayBox}>
        <span>Normally $2,997</span>
        <strong>Only $97</strong>
      </div>
      <CTAButton />
      <p className={styles.expiryNote}>Includes the VIP room, direct coaching, bonus resources, and FBF Vault recording access.</p>
    </aside>
  );
}

export default function VIPPage() {
  return (
    <main className={styles.pageShell}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.topAnnouncement}>You have an opportunity to enhance your experience</div>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1>
              <span className={styles.accessLine}>&ldquo;Exclusive Access&rdquo;</span>
              <span className={styles.goldUnderline}>
                <span>Upgrade To</span>
                <span>&apos;VIP Mastermind&apos;</span>
              </span>
              <span className={styles.supportingLine}>And Get Direct Help With</span>
              <span className={styles.supportingLine}>
                Your <em>Life &amp; Business Reset</em>
              </span>
            </h1>
            <p className={styles.heroLead}>
              This is a <strong>unique opportunity</strong> to get personalized feedback and your
              questions answered for a <strong>fraction</strong> of the price we normally charge
              for one-on-one coaching!
            </p>
            <CTAButton />
            <p className={styles.microcopy}>Includes FBF Vault access to the masterclass recordings.</p>
          </div>
        </div>
      </section>

      <section className={styles.urgencyBand}>
        <div className={styles.urgencyCopy}>
          <strong>PLUS!</strong>
          <p>
            When you upgrade on this page, you&apos;ll also get the Kingdom Intelligence Masterclass
            training replays free for life.
          </p>
        </div>
        <CountdownTimer />
      </section>

      <section className={styles.featuredTestimonialSection}>
        <div className={styles.container}>
          <article className={styles.featuredTestimonial}>
            <span className={styles.quoteBadge}>&ldquo;</span>
            <blockquote>&ldquo;{cindyTestimonial.quote}&rdquo;</blockquote>
            <div className={styles.featuredTestimonialFooter}>
              <div className={styles.avatarFallback}>CS</div>
              <div>
                <strong>{cindyTestimonial.name}</strong>
                <div className={styles.starRow} aria-label="5 star rating">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.coachingIntro}>
        <div className={styles.container}>
          <div className={styles.centerHeaderDark}>
            <p className={styles.eyebrowRed}>Exclusive access upgrade</p>
            <h2>Get personal coaching inside the final-day VIP room.</h2>
            <p>
              Go to the next level with direct coaching from Larry and Staci. Learn how to turn
              years of experience into a clearer offer, stronger sales message, and Kingdom business
              strategy that creates more profits, more margin, and more generosity.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionWhite}>
        <div className={styles.container}>
          <div className={styles.twoColumn}>
            <div className={styles.copyStack}>
              <h3>Friend, let me cut to the chase.</h3>
              <p>
                Right now, while you are here, you have the opportunity to upgrade to VIP status in
                the Kingdom Intelligence Masterclass.
              </p>
              <p>
                When you upgrade now, you get access to the final-day VIP room at 7pm CT where your
                specific questions can be answered in real time. No matter the product, service, or
                offer, the goal is to help you lead with certainty, operate with Kingdom authority,
                and multiply your impact like never before.
              </p>
              <p>
                Larry, Staci, and the CEO Mentor team will be taking questions live, evaluating
                real business challenges, and sharing what you can do to create more cash flow,
                margin, and generosity.
              </p>
            </div>
            <OfferCard />
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.centerHeaderDark}>
            <p className={styles.eyebrowGold}>Why this matters</p>
            <h2>Two reasons you do not want to miss this.</h2>
          </div>
          <div className={styles.reasonGrid}>
            <article>
              <span>Reason 1</span>
              <h3>This level of access is rare.</h3>
              <p>
                Between coaching high-ticket clients, running multiple businesses and ministries,
                and leading live rooms, Larry and Staci rarely open this kind of direct coaching
                room during a public masterclass.
              </p>
            </article>
            <article>
              <span>Reason 2</span>
              <h3>Proximity can compress years.</h3>
              <p>
                VIP gives you a focused chance to bring your real questions, hear what others are
                asking, and receive direction while momentum from the masterclass is high.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.sectionWhite}>
        <div className={styles.container}>
          <div className={styles.splitWithImage}>
            <div>
              <p className={styles.eyebrowRed}>What you get</p>
              <h2>Upgrade your VIP status today.</h2>
              <p>
                We designed the VIP upgrade to be a fast-track training and coaching experience.
                You get direct feedback so you can get the most out of the masterclass and move
                faster on the business decisions that matter.
              </p>
              <ul className={styles.checkList}>
                {vipIncludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.imagePanel}>
              <img src="/images/vip-coaching-room.png" alt="Live coaching room" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bonusSection}>
        <div className={styles.container}>
          <div className={styles.centerHeaderDark}>
            <p className={styles.eyebrowGold}>Fast-action bonuses</p>
            <h2>Plus, you get these resources included.</h2>
          </div>
          <div className={styles.bonusGrid}>
            {bonuses.map((bonus, index) => (
              <article key={bonus.title} className={styles.bonusCard}>
                <img src={bonus.image} alt="" />
                <span>Bonus {index + 1}</span>
                <h3>{bonus.title}</h3>
                <p>{bonus.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.quoteBand}>
        <blockquote>
          This offer is not for everyone. It is for the leader who feels called by God to step into
          a new level of purpose, peace, profits, and generosity.
        </blockquote>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.centerHeaderDark}>
            <p className={styles.eyebrowGold}>Results matter</p>
            <h2>Leaders have used this kind of coaching to take massive action.</h2>
          </div>
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className={styles.testimonialCard}>
                <img src={testimonial.image} alt="" />
                <span>&ldquo;</span>
                <p>{testimonial.quote}</p>
                <strong>{testimonial.name}</strong>
                <small>{testimonial.role}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <p className={styles.eyebrowGold}>Do not miss out</p>
          <h2>Upgrade to VIP for $97.</h2>
          <p>
            Join the final-day VIP room at 7pm CT, bring your real questions, and get access to the
            masterclass recordings in the FBF Vault so you can keep moving after the live event.
          </p>
          <CTAButton />
          <p className={styles.microcopy}>Secure checkout through Stripe.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" />
        <p>&copy; 2026 Fueled By Fire. All Rights Reserved.</p>
        <div>
          <a href="https://www.fbfchallenge.com/privacy">Privacy Policy</a>
          <a href="https://www.fbfchallenge.com/terms">Terms of Service</a>
          <a href="https://www.fbfchallenge.com/disclaimer">Disclaimer</a>
        </div>
      </footer>
    </main>
  );
}
