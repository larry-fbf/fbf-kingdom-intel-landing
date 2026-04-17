import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kingdom Intel Network | Fueled By Fire",
  description:
    "A strategic room for Kingdom-minded CEOs and entrepreneurial leaders with CEO think tank calls, executive Q&A, member community access, and exclusive event invites.",
};

const paymentUrl = "https://buy.stripe.com/28EbJ27sB0h82mMfAV5kk01";

const featuredTestimonials = [
  {
    category: "Business Growth",
    quote:
      "I was an 8th-grade dropout with zero business experience. Larry & Staci helped our company grow to $13 million in 9 months and over $60 million in 3 years!",
    name: "Kyler Kropf",
    role: "Founder, SaddleBrookeLife",
    photo: "https://www.kingdomintel.com/images/kyler-headshot.png",
  },
  {
    category: "Faith, Family & Business Alignment",
    quote:
      "FBF has had a monumental impact on our lives. We've built an 8-figure commercial investment business while keeping faith and family first.",
    name: "Alex & Irina Chifor",
    role: "Commercial Investors",
    photo: "https://www.kingdomintel.com/images/irina-alex.webp",
  },
];

const testimonialCards = [
  {
    name: "Kolton Kropf",
    role: "CEO, SaddlebrookeLife",
    quote:
      "Our business was headed toward bankruptcy and after only 9 months, we turned it into an 8-figure success story on target to surpass $100 million in revenue.",
    photo: "https://www.kingdomintel.com/images/kolton-headshot.png",
  },
  {
    name: "Eric Moland",
    role: "CEO, Black Dog Insurance",
    quote:
      "In one month, my income jumped 35%. The next month, the largest commission sales month in 40 years. Our entire business profit is up over 50% this year alone.",
    photo: "https://www.kingdomintel.com/images/eric-headshot.jpg",
  },
  {
    name: "Dallas Marley",
    role: "Marketing Specialist & Entrepreneur",
    quote:
      "In less than 12 months, we paid off over $2 million in debt, moved to Ecuador, and stepped into the life of our dreams.",
    photo: "https://www.kingdomintel.com/images/dallas-headshot.jpg",
  },
  {
    name: "Lynn Vennefron",
    role: "FBF Client",
    quote:
      "Since graduating from the Smart Money Makeover course, we have paid off all of our debt other than our mortgage. For the first time in our married life, we are debt free.",
    photo: "https://www.kingdomintel.com/images/lynn-headshot.jpg",
  },
  {
    name: "Vangel Roberts",
    role: "CMO, Wade Roberts Plumbing",
    quote:
      "Our company is thriving, but the greatest transformation has been in our marriage and with our kids. Having coaches walk with us weekly has been a game-changer.",
    photo: "https://www.kingdomintel.com/images/vangel-headshot.jpg",
  },
  {
    name: "Drew & Tina Shabo",
    role: "Dentistry Business Owners",
    quote:
      "We've clarified God's plan for our portfolio of dentistry businesses and our family has been restored to full alignment. We are crystal clear about our GOD-SIZED vision.",
    photo: "https://www.kingdomintel.com/images/drew-tina.jpg",
  },
];

const marqueeTestimonials = [
  "Kristina Hess — KR Hess Law, P.C.",
  "Jamie Dahl — Business Owner",
  "Delbert Friesen — President, Earthmax",
];

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className={styles.sectionHeading}>
      <p className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ""}`}>{eyebrow}</p>
      <h2 className={light ? styles.lightHeading : styles.heading}>{title}</h2>
      {description ? (
        <p className={`${styles.sectionCopy} ${light ? styles.sectionCopyLight : ""}`}>{description}</p>
      ) : null}
    </div>
  );
}

export default function NetworkPage() {
  return (
    <main className={styles.pageShell}>
      <div className={styles.topBanner}>
        <div className={styles.container}>
          <div className={styles.topBannerInner}>
            <span>$197 per month | 2 CEO Think Tank calls monthly | Quick executive Q&amp;A inside the community</span>
            <a href={paymentUrl} target="_blank" rel="noreferrer">
              Join now
            </a>
          </div>
        </div>
      </div>

      <section className={styles.heroSection}>
        <div className={styles.heroOverlay} />
        <div className={`${styles.container} ${styles.heroLayout}`}>
          <div className={styles.heroVisual}>
            <img
              className={styles.heroPhoto}
              src="https://www.kingdomintel.com/images/staci-larry-hero-2026.png"
              alt="Larry and Staci Wallace"
            />
            <div className={styles.heroPhotoFade} />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.heroKicker}>Fueled by Fire Leadership Network</p>
            <div className={styles.heroWordmark} aria-label="Kingdom Intel Network">
              <span>Kingdom</span>
              <span className={styles.heroWordmarkAccent}>Intel</span>
              <span>Network</span>
            </div>
            <p className={styles.heroSubtitle}>Helping you build business God's way.</p>
            <p className={styles.heroDescription}>
              This is not a typical online community. It is a strategic environment where Kingdom-minded CEOs
              and entrepreneurial leaders gather to sharpen one another, exchange wisdom, and steward the
              assignments God has placed in their hands.
            </p>
            <div className={styles.heroActions}>
              <a className={`${styles.button} ${styles.buttonGold}`} href={paymentUrl} target="_blank" rel="noreferrer">
                Join The Network
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="membership" className={styles.audienceSection}>
        <div className={`${styles.container} ${styles.audienceGrid}`}>
          <div>
            <SectionHeading
              eyebrow="Who This Is For"
              title="This room is built for leaders carrying real assignments."
              description="For CEOs, founders, and operators who want Spirit-led strategy, stronger execution, and a trusted room of peers who understand the weight of leadership. Inside this room, you will find leaders building companies, strengthening families, expanding influence, and pursuing Kingdom impact in the marketplace."
            />
            <div className={styles.tagRow}>
              <span>Peer-level strategy</span>
              <span>Executive access</span>
              <span>Exclusive event invites</span>
            </div>
          </div>
          <div className={styles.pricingCard}>
            <p className={styles.cardEyebrow}>Membership</p>
            <h3 className={styles.membershipTitle}>The Kingdom Intel Network</h3>
            <div className={styles.priceRow}>
              <strong>$197</strong>
              <span>per month</span>
            </div>
            <ul className={styles.bulletList}>
              <li>2 CEO Think Tank calls every month</li>
              <li>Executive Q&amp;A for real business decisions</li>
              <li>Peer-level Kingdom CEO community access</li>
              <li>Exclusive invites to in-person and online events</li>
            </ul>
            <a className={`${styles.button} ${styles.buttonRed} ${styles.fullButton}`} href={paymentUrl} target="_blank" rel="noreferrer">
              Join The Network
            </a>
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Results Matter"
            title="Lives Changed. Businesses Built. Legacies Established."
            light
          />

          <div className={styles.featuredTestimonials}>
            {featuredTestimonials.map((item) => (
              <article key={item.name} className={styles.featuredQuote}>
                <div className={styles.testimonialHead}>
                  <img className={styles.testimonialAvatar} src={item.photo} alt={item.name} />
                </div>
                <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>{item.category}</p>
                <blockquote>{item.quote}</blockquote>
                <div className={styles.testimonialPerson}>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.testimonialGrid}>
            {testimonialCards.map((item) => (
              <article key={item.name} className={styles.testimonialCard}>
                <div className={styles.testimonialHead}>
                  <img className={styles.testimonialAvatar} src={item.photo} alt={item.name} />
                </div>
                <blockquote>{item.quote}</blockquote>
                <div className={styles.testimonialPerson}>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.testimonialMarquee}>
            {marqueeTestimonials.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.conversionSection}>
        <div className={`${styles.container} ${styles.conversionShell}`}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Join Kingdom Intel Network</p>
            <h2 className={styles.lightHeading}>Get in the room for $197 per month.</h2>
            <p className={`${styles.sectionCopy} ${styles.sectionCopyLight}`}>
              2 CEO Think Tank calls, executive Q&amp;A, and a trusted Kingdom CEO room built for real decisions.
            </p>
          </div>
          <a className={`${styles.button} ${styles.buttonGold}`} href={paymentUrl} target="_blank" rel="noreferrer">
            Join The Network
          </a>
        </div>
      </section>

      <section className={styles.communitySection}>
        <div className={styles.container}>
          <div className={styles.communityProof}>
            <div className={styles.communityCopy}>
              <p className={styles.communityLabel}>Inside The Member Community</p>
              <h3>Ask questions, access trainings, follow the event calendar, and use free resources.</h3>
              <p>
                Members get a real community hub built for collaboration, monthly trainings, weekly events,
                and on-demand support.
              </p>
            </div>
            <div className={styles.communityImage}>
              <img
                src="/community-app-screenshot.png"
                alt="Kingdom Intel Network member community app showing community feed, events, and resources"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCtaSection}>
        <div className={`${styles.container} ${styles.finalCtaLayout}`}>
          <div className={styles.finalCtaImageWrap}>
            <img src="/final-cta-prayer.jpg" alt="Fueled by Fire community gathered in prayer" />
          </div>
          <div className={styles.finalCtaCopy}>
            <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Our Shared Mission</p>
            <h2 className={styles.lightHeading}>Raising a generation of Kingdom CEOs.</h2>
            <p className={`${styles.sectionCopy} ${styles.sectionCopyLight}`}>
              Fueled by Fire exists to equip leaders to build highly profitable, purpose-driven businesses that
              glorify God in the marketplace. If you are ready to build with excellence, integrity, generosity,
              and generational legacy, this is the room to step into.
            </p>
            <div className={styles.finalCtaActions}>
              <a className={`${styles.button} ${styles.buttonRed}`} href={paymentUrl} target="_blank" rel="noreferrer">
                Join The Network
              </a>
              <p>2 CEO Think Tank calls monthly. Quick executive Q&amp;A in the community. Kingdom-centered leadership support.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
