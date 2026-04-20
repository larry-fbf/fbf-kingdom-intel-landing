import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kingdom Intelligence Network | Fueled By Fire",
  description:
    "An online community of Christian entrepreneurs building business God's way with weekly mentorship, executive Q&A, replays, resources, and exclusive event invites.",
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
  "Kristina Hess - KR Hess Law, P.C.",
  "Jamie Dahl - Business Owner",
  "Delbert Friesen - President, Earthmax",
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
            <span>$197 per month | Weekly mentorship | Executive Q&amp;A | Future Masterclass VIP rooms</span>
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
            <div className={styles.heroWordmark} aria-label="Kingdom Intelligence Network">
              <span>Kingdom</span>
              <span className={styles.heroWordmarkAccent}>Intelligence</span>
              <span>Network</span>
            </div>
            <p className={styles.heroSubtitle}>Helping you build business God's way.</p>
            <p className={styles.heroDescription}>
              This is a room full of Kingdom leaders and business owners who are actively making it
              Heaven on earth in the marketplace. With executive-level access, peer counsel, monthly
              trainings, and real-time support for the decisions that matter most by those doing
              business the Kingdom Way.
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
              title="A faith-filled network for leaders who build His way."
              description="The Kingdom Intelligence Network is an online community of Christian entrepreneurs and business owners learning to build business God's way. This is where faith, leadership, and marketplace growth come together in one room."
            />
            <p className={styles.sectionCopy}>
              In a world rapidly changing through AI, it is more important than ever to build with Kingdom
              Intelligence and discernment in the marketplace. This is a network of leaders and business
              owners who refuse to build by the world&apos;s standards and instead lead with wisdom, conviction,
              and Spirit-led strategy.
            </p>
            <div className={styles.tagRow}>
              <span>Christian entrepreneurs</span>
              <span>Weekly mentorship</span>
              <span>Kingdom business</span>
            </div>
          </div>
          <div className={styles.pricingCard}>
            <p className={styles.cardEyebrow}>Membership</p>
            <h3 className={styles.membershipTitle}>The Kingdom Intelligence Network</h3>
            <div className={styles.priceRow}>
              <strong>$197</strong>
              <span>per month</span>
            </div>
            <ul className={styles.bulletList}>
              <li>Weekly mentorship with successful Christian leaders</li>
              <li>Executive Q&amp;A and peer counsel for real business decisions</li>
              <li>Podcast, Masterclass, and training replays</li>
              <li>Direct access to CEO mentors, guests, and members inside the app</li>
              <li>Weekly events calendar and free resources</li>
              <li>Access to future Kingdom Intelligence Masterclass VIP rooms</li>
              <li>Exclusive invites to in-person and online events</li>
            </ul>
            <a className={`${styles.button} ${styles.buttonRed} ${styles.fullButton}`} href={paymentUrl} target="_blank" rel="noreferrer">
              Join The Network
            </a>
          </div>
        </div>
      </section>

      <section className={styles.communitySection}>
        <div className={styles.container}>
          <div className={styles.communityProof}>
            <div className={styles.communityCopy}>
              <p className={styles.communityLabel}>Inside The Member Community</p>
              <h3>Ask questions, watch replays, follow the calendar, and stay close to the room.</h3>
              <p>
                Inside the member community, you get weekly mentorship touchpoints, podcast and
                Masterclass replays, direct messaging access, and resources to build your brand, your
                business, and your faith.
              </p>
            </div>
            <div className={styles.communityImage}>
              <img
                src="/community-app-screenshot.png"
                alt="Kingdom Intelligence Network member community app showing community feed, events, and resources"
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
            <h2 className={styles.lightHeading}>Building businesses God's way.</h2>
            <p className={`${styles.sectionCopy} ${styles.sectionCopyLight}`}>
              Fueled by Fire exists to equip Christian entrepreneurs to lead with wisdom, grow with
              integrity, and bring Heaven into the marketplace. Kingdom Intelligence Network is where that
              mission becomes practical every week.
            </p>
            <div className={styles.finalCtaActions}>
              <a className={`${styles.button} ${styles.buttonRed}`} href={paymentUrl} target="_blank" rel="noreferrer">
                Join The Network
              </a>
              <p>Weekly mentorship. Executive Q&amp;A. Replays, resources, and future Masterclass VIP room access.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.eventsSection}>
        <div className={styles.container}>
          <div className={styles.eventsIntro}>
            <p className={styles.eyebrow}>Yearly Events &amp; Invites</p>
            <h2 className={styles.heading}>
              Get exclusive invites to events, trainings, and leadership retreats.
            </h2>
          </div>
          <div className={styles.eventsBody}>
            <div className={styles.eventsText}>
              <p className={styles.sectionCopy}>
                As a member, you get invited into Perspective gatherings and leadership development
                experiences hosted in places like the beach, the Grand Canyon, and the Smoky Mountains.
              </p>
              <p className={styles.sectionCopy}>
                You also get access to the live events calendar inside the community, so you can stay
                close to upcoming online trainings, special calls, and member moments all year.
              </p>
              <a className={`${styles.button} ${styles.buttonRed}`} href={paymentUrl} target="_blank" rel="noreferrer">
                Join The Network
              </a>
              <p className={styles.eventsNote}>* Tickets and travel not included.</p>
            </div>
            <div className={styles.eventsImageWrap}>
              <img
                src="/perspective-group.jpg"
                alt="Perspective leadership development event group photo"
              />
            </div>
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
            <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Join Kingdom Intelligence Network</p>
            <h2 className={styles.lightHeading}>Get in the room for $197 per month.</h2>
            <p className={`${styles.sectionCopy} ${styles.sectionCopyLight}`}>
              Weekly mentorship, executive Q&amp;A, replays, free resources, and access to a Christian
              business community built to help you grow God's way.
            </p>
          </div>
          <a className={`${styles.button} ${styles.buttonGold}`} href={paymentUrl} target="_blank" rel="noreferrer">
            Join The Network
          </a>
        </div>
      </section>

      <section className={styles.personalWordSection}>
        <div className={styles.container}>
          <div className={styles.personalWordLayout}>
            <div className={styles.personalWordImageWrap}>
              <img src="/images/staci-larry-split.webp" alt="Larry and Staci Wallace seated together" />
            </div>
            <div className={styles.personalWordCopy}>
              <p className={styles.eyebrow}>A Personal Word From Larry &amp; Staci</p>
              <h2 className={styles.personalWordHeading}>
                A Kingdom blueprint for building business God's way without sacrificing faith, family, or peace.
              </h2>
              <div className={styles.personalWordRule} />
              <p className={styles.personalWordBody}>
                While AI increases speed, <span>Kingdom Intelligence determines discernment, authority, and long-term impact in the marketplace.</span> The leaders who thrive in this season will not simply move faster. They will build with wisdom, conviction, and Spirit-led strategy.
              </p>
              <p className={styles.personalWordBody}>
                Kingdom Intelligence Network was created for Christian entrepreneurs and business owners who want weekly access to mentorship, executive counsel, and a faith-filled community of leaders committed to building His way.
              </p>
              <p className={styles.personalWordBody}>
                Inside this room, you get weekly mentorship, executive Q&amp;A, member community access, replays, resources, and future Kingdom Intelligence Masterclass VIP rooms that keep you close to the conversations and relationships that matter most.
              </p>
              <p className={styles.personalWordEmphasis}>
                Build with discernment. Lead with conviction. Grow with people who refuse to separate business from obedience.
              </p>
              <p className={styles.personalWordSignature}>
                Blessings,
                <br />
                <strong>Larry &amp; Staci Wallace</strong>
              </p>
              <a className={`${styles.button} ${styles.buttonGold}`} href={paymentUrl} target="_blank" rel="noreferrer">
                Join The Network
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.siteFooter}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <img
              src="/images/fbf-logo-white.png"
              alt="Fueled By Fire"
              className={styles.footerLogo}
            />
            <p className={styles.footerCopyright}>&copy; 2026 Fueled By Fire. All Rights Reserved.</p>
            <p className={styles.footerSupport}>
              10% of every program fee supports Epiphany Global (Uganda) &amp; EMwomen.
            </p>
            <div className={styles.footerLinks}>
              <a href="https://www.fbfchallenge.com/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              <a href="https://www.fbfchallenge.com/terms" target="_blank" rel="noreferrer">
                Terms of Service
              </a>
              <a href="https://www.fbfchallenge.com/disclaimer" target="_blank" rel="noreferrer">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
