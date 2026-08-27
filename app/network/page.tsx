import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kingdom Intelligence Network | Fueled By Fire",
  description:
    "An online network of Christian entrepreneurs building business God's way with weekly mentorship, executive Q&A, replays, resources, and exclusive event invites.",
};

const paymentUrl = "https://vault.fbfmastery.com/checkout/network";

const featuredTestimonials = [
  {
    category: "Business Growth",
    quote:
      "I was an 8th-grade dropout with zero business experience. Larry & Staci helped our company grow to $13 million in 9 months and over $70 million in 3 years!",
    name: "Kyler Kropf",
    role: "Founder, SaddleBrookeLife",
    photo: "https://www.kingdomintel.com/images/kyler-headshot.png",
  },
  {
    category: "Faith, Family & Business Alignment",
    quote:
      "FBF has had a monumental impact on our lives and business. We've built an 8-figure commercial investment business while keeping faith and family first.",
    name: "Alex & Irina Chifor",
    role: "Commercial Investors",
    photo: "https://www.kingdomintel.com/images/irina-alex.webp",
  },
];

const testimonialCards = [
  {
    name: "Peter Vandenberg",
    role: "CEO, Vandenberg Fine Jewelry",
    quote:
      "Our sales are up 166.4% month over month. There is no explanation other than we have tapped into a God-factor that is driving our growth and legacy impact.",
    photo: "https://www.kingdomintel.com/images/peter-vandenberg-headshot.jpg",
  },
  {
    name: "Eric Moland",
    role: "CEO, Black Dog Insurance",
    quote:
      "In one month, my income jumped 35%. The next month I had the largest commission sales month in 40 years. Our entire business profit is up over 50% this year alone.",
    photo: "https://www.kingdomintel.com/images/eric-headshot.jpg",
  },
  {
    name: "Dallas Marley",
    role: "Marketing Specialist & Entrepreneur",
    quote:
      "In less than 12 months, we paid off over $2 million in debt, and stepped into the life of our dreams. We’ve stepped boldly into our God-sized vision of irrational generosity.",
    photo: "https://www.kingdomintel.com/images/dallas-headshot.jpg",
  },
  {
    name: "Lynn Vennefron",
    role: "FBF Client",
    quote:
      "Since graduating from the Smart Money Makeover course, we have paid off all of our debt other than our mortgage. For the first time in our married life, we are debt-free.",
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
  "Trusted by leaders including Kristina Hess of KR Hess Law, P.C.",
  "Jamie Dahl",
  "Delbert Friesen of Earthmax",
];

const expectationCards = [
  {
    icon: "✦",
    title: "vision",
    copy: "Clarify the God-sized assignment and identify the next faithful steps.",
  },
  {
    icon: "↗",
    title: "marketing",
    copy: "Sharpen your message, offers, funnels, content, and growth strategy.",
  },
  {
    icon: "▦",
    title: "operations",
    copy: "Build systems, team rhythms, and capacity that can sustain scale.",
  },
  {
    icon: "◈",
    title: "ai + tools",
    copy: "Use AI wisely to save time, strengthen decisions, and move faster with discernment.",
  },
  {
    icon: "$",
    title: "money",
    copy: "Strengthen cash flow, pricing, profit, stewardship, and financial clarity.",
  },
  {
    icon: "◎",
    title: "leadership",
    copy: "Lead with wisdom, conviction, courage, and Spirit-led confidence.",
  },
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
              src="/images/kingdom-intel-network-hero.jpg"
              alt="Kingdom Intelligence Network"
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
            <p className={styles.heroSubtitle}>Build business God's way, with wisdom, counsel, and Spirit-led strategy.</p>
            <p className={styles.heroDescription}>
              A private network for Kingdom entrepreneurs and business owners who want to grow with
              wisdom, lead with discernment, and make decisions through the lens of Kingdom Intelligence.
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
              eyebrow="What Is The Kingdom Intel Network"
              title="An exclusive leadership room for building business God's way."
              description="The Kingdom Intelligence Network is for Christian entrepreneurs and business owners who know they are called to build differently."
            />
            <p className={styles.sectionCopy}>
              This is not just another online network. It is a room for leaders who want to grow with
              wisdom, lead with discernment, and make decisions through the lens of Kingdom Intelligence.
            </p>
            <p className={styles.sectionCopy}>
              As AI accelerates and the marketplace shifts, discernment matters more than ever. You
              don&apos;t need more information. You need counsel, clarity, and a trusted room of Kingdom
              leaders who are committed to building with faith, excellence, and eternal impact.
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
              <li>Weekly mentorship with Christian business leaders</li>
              <li>Executive Q&amp;A for real-time business decisions</li>
              <li>Strategic collaboration with Kingdom entrepreneurs</li>
              <li>Access to trainings, replays, and resources</li>
              <li>Direct connection inside the private member app</li>
              <li>Live events calendar and member-only opportunities</li>
              <li>VIP access to future Kingdom Intelligence rooms</li>
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
            <p className={styles.communityLabel}>Inside The Network</p>
            <div className={styles.communityImage}>
              <img
                src="/images/inside-the-network.png"
                alt="Kingdom Intelligence Network app showing the network feed, upcoming events, replays, and member resources"
              />
            </div>
            <div className={styles.communityCopy}>
              <h3>Stay connected to the counsel, training, and conversations that move your business forward.</h3>
              <p>
                Inside the Network, you can ask questions, access weekly mentorship, watch
                podcast and Masterclass replays, follow the live events calendar, and connect directly
                with leaders who are building business God&apos;s way.
              </p>
              <p>
                This is where the Network becomes practical: conversations, resources, replays, and
                real-time support that help you grow your brand, strengthen your business, and stay
                anchored in faith.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCtaSection}>
        <div className={`${styles.container} ${styles.finalCtaLayout}`}>
          <div className={styles.finalCtaImageWrap}>
            <img src="/final-cta-prayer.jpg" alt="Fueled by Fire network gathered in prayer" />
          </div>
          <div className={styles.finalCtaCopy}>
            <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Our Shared Mission</p>
            <h2 className={styles.lightHeading}>Building businesses God's way.</h2>
            <p className={`${styles.sectionCopy} ${styles.sectionCopyLight}`}>
              Fueled by Fire exists to equip Christian entrepreneurs to lead with wisdom, grow with
              integrity, and bring Kingdom Intelligence into the marketplace.
            </p>
            <p className={`${styles.sectionCopy} ${styles.sectionCopyLight}`}>
              The Kingdom Intelligence Network is where that mission becomes practical every week:
              through mentorship, counsel, training, prayer, collaboration, and a trusted room of leaders
              committed to building with faith and excellence.
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
          </div>
          <div className={styles.eventsBody}>
            <div className={styles.eventsImageWrap}>
              <img
                src="/images/kingdom-intel-events-invites.jpg"
                alt="Kingdom Intelligence Network events, gatherings, and leadership retreat invitations"
              />
            </div>
            <div className={styles.eventsText}>
              <h2 className={styles.heading}>
                Stay close to the rooms where Kingdom leaders gather.
              </h2>
              <p className={styles.sectionCopy}>
                As a member, you receive exclusive invitations to join the Fueled By Fire gatherings,
                leadership trainings, and transformational experiences hosted throughout the year.
              </p>
              <p className={styles.sectionCopy}>
                From Perspective Leadership Summits to retreats in places like the beach, the Grand
                Canyon, and the Smoky Mountains, these moments are designed to strengthen your faith,
                expand your leadership, and keep you surrounded by entrepreneurs building business
                God&apos;s way.
              </p>
              <p className={styles.sectionCopy}>
                You also get access to the live events calendar in the Network, so you can stay
                connected to upcoming online training sessions, special calls, and member-only opportunities.
              </p>
              <a className={`${styles.button} ${styles.buttonRed}`} href={paymentUrl} target="_blank" rel="noreferrer">
                Join The Network
              </a>
              <p className={styles.eventsNote}>* Tickets and travel not included.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Results Matter"
            title="Lives Changed. Businesses Built. Legacies Established."
            description="Kingdom Intelligence is not theory. These are real leaders, real families, and real businesses experiencing transformation through faith, strategy, and stewardship."
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
                  {item.photo ? (
                    <img className={styles.testimonialAvatar} src={item.photo} alt={item.name} />
                  ) : (
                    <div className={styles.testimonialAvatarFallback} aria-label={item.name}>
                      {item.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  )}
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

      <section className={styles.expectSection}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="What You Can Expect"
            title="Practical help for the vision God put in your hands."
            description="Bring the real decisions, problems, and growth opportunities in your business. Inside the Network, we work the room together with wisdom, strategy, collaboration, and Spirit-led counsel."
            light
          />
          <div className={styles.expectLayout}>
            <div className={styles.expectImageWrap}>
              <img
                src="/images/kingdom-intel-expect-room.jpg"
                alt="Kingdom Intelligence Network members gathered for business strategy, mentorship, and Kingdom counsel"
              />
            </div>
            <div className={styles.expectGrid}>
              {expectationCards.map((item) => (
                <article key={item.title} className={styles.expectCard}>
                  <div className={styles.expectIcon}>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.conversionSection}>
        <div className={`${styles.container} ${styles.conversionShell}`}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Join Kingdom Intelligence Network</p>
            <h2 className={styles.lightHeading}>Get in the room for $197 per month.</h2>
            <p className={`${styles.sectionCopy} ${styles.sectionCopyLight}`}>
              Step into a Christian business network built for leaders who want to grow God&apos;s way.
              Inside the Network, you will receive weekly mentorship, executive Q&amp;A, replays,
              practical resources, and access to a room of Kingdom entrepreneurs building with wisdom,
              faith, and excellence.
            </p>
            <p className={`${styles.sectionCopy} ${styles.sectionCopyLight}`}>
              Cancel anytime. Stay as long as the room keeps helping you build with clarity, counsel,
              and Kingdom Intelligence.
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
                Kingdom Intelligence Network was created for Christian entrepreneurs and business owners who want weekly access to mentorship, executive counsel, and a faith-filled network of leaders committed to building His way.
              </p>
              <p className={styles.personalWordBody}>
                Inside this room, you get weekly mentorship, executive Q&amp;A, member network access, replays, resources, and future Kingdom Intelligence Masterclass VIP rooms that keep you close to the conversations and relationships that matter most.
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
            <p className={styles.footerCallCta}>
              If you want to book a call to hear more about the Network or what we do at Fueled by Fire,{" "}
              <a href="/bookacall">click this link</a>.
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



