import type { Metadata } from "next";
import styles from "../network/page.module.css";

export const metadata: Metadata = {
  title: "Fueled By Fire Mastery | Kingdom Intelligence",
  description:
    "An inner-circle faith-based business mastery and mastermind experience with Larry and Staci Wallace for CEOs, influencers, and serious entrepreneurs.",
};

const applyUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScf-LSxxsnlhdS0sGVrIYo__tHIuJlh3B9rKfVUdsO1e1WtnQ/viewform";

const heroImage =
  "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/jqZlpy/image/10270017/file/fc43c9c40af10243e7c9f6698943f673.jpg";
const aboutImage =
  "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/jqZlpy/image/8119449/file/ff7917f167ddbf42e27eb9dc184fde1b.jpg";
const masteryBadge =
  "https://images.clickfunnels.com/cdn-cgi/image/width=1000px,fit=scale-down,f=auto,q=80/https://statics.myclickfunnels.com/workspace/jqZlpy/image/8119450/file/15781310e68eff8b201538c4ff5c8c6b.png";

const featureCards = [
  {
    title: "faith",
    copy: "Clarify God's purpose and vision for your life and business.",
  },
  {
    title: "family",
    copy: "Learn how to build an unbreakable bond of love and unity.",
  },
  {
    title: "finances",
    copy: "Move from financial freedom to limitless abundance.",
  },
  {
    title: "fitness",
    copy: "Gain optimal wellness spirit, soul, and body.",
  },
  {
    title: "focus",
    copy: "Get crystal clear on who, when, why, and how to manifest your dreams.",
  },
  {
    title: "freedom",
    copy: "Break free from the addictions or habits that are limiting your abundance.",
  },
  {
    title: "fun",
    copy: "Learn how to turn your passion into your business.",
  },
  {
    title: "future",
    copy: "Build a decade-to-decade strategy for legacy and generational wealth.",
  },
];

const bornForMore = [
  "You've put in the years of studying, sowing, learning, and sacrifice it takes and now you're ready to step up your game.",
  "You're determined to break through that 7 or 8-figure barrier that has been like a glass ceiling over your head.",
  "You know God is asking you to gain mastery over your finances, faith, family, and fitness so you can lead others by example.",
  "You're ready to stop doing it all and hire a team that can pay for itself.",
];

const legacyBlocks = [
  "You're making good money but you feel overwhelmed with all of the daily tasks you have to manage.",
  "You feel stuck where you are and despite attending countless courses, you still don't know how to take your life and business to the next level.",
  "You need to grow a highly effective team that takes the load off your shoulders so you can get back to the things that matter most.",
  "You want to learn how to automate the busy-work so you can gain back the time you so desperately need with your family.",
  "You need to exit your current career so you can build your Legacy Business and generational wealth.",
];

const programIncludes = [
  {
    title: "1-hour per month CEO mentor",
    copy: "As a Mastermind Leader, you get all of the Mastery perks plus a 1x1 online laser session each month where we dive deep into your roadmap, progress, and areas of needed acceleration.",
  },
  {
    title: "CEO mastermind incubator",
    copy: "Each month, you'll participate in a private deep-dive strategy session with Staci, Larry, the FBF Advocacies, and a small group of like-minded CEOs and influencers who are growing big vision.",
  },
  {
    title: "Mastermind-only VIP day",
    copy: "Join a small group of CEOs and entrepreneurs for a full day of hands-on training at Epiphany Ranch or another strategic location to get laser focused on expanding your big idea and building your legacy wealth model.",
  },
  {
    title: "Legacy roadmap strategy session",
    copy: "Get 1x1 scaffolding with a certified LEGACY coach for strategic goal setting around your yearly, quarterly, monthly, and weekly benchmarks.",
  },
  {
    title: "Weekly live mastery classes",
    copy: "Each Monday, Staci and team lead a live Mastery Class focused on strategy, tactics, and implementation to elevate your mindset, toolset, and skillsets for next-level results.",
  },
  {
    title: "Live hot topic cohort",
    copy: "These deep-dive sessions include life and business mastery coaching and open mic Q&A so you receive customized accountability and weekly support.",
  },
  {
    title: "Unlimited hot seats",
    copy: "Want more accountability and 1x1 coaching? As a Mastermind Leader, you have unlimited Hot Seat access for weekly coaching and scaffolding.",
  },
  {
    title: "Discounted ticket to Perspective",
    copy: "You'll receive 25% off the ticket price to the live and in-person Perspective Leadership event intentionally designed to help you elevate every area of life and business.",
  },
];

const pressLogos = ["CNN", "NBC", "ABC", "FOX", "Forbes"];

function Cta({ children = "Apply Now" }: { children?: string }) {
  return (
    <a className={`${styles.button} ${styles.buttonGold}`} href={applyUrl} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return (
    <div className={styles.sectionHeading}>
      <p className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ""}`}>{eyebrow}</p>
      <h2 className={light ? styles.lightHeading : styles.heading}>{title}</h2>
      {description ? <p className={`${styles.sectionCopy} ${light ? styles.sectionCopyLight : ""}`}>{description}</p> : null}
    </div>
  );
}

export default function MasteryPage() {
  return (
    <main className={styles.pageShell}>
      <div className={styles.topBanner}>
        <div className={styles.container}>
          <div className={styles.topBannerInner}>
            <span>Fueled By Fire Mastery | Faith, family, finance, fitness, focus, freedom, fun, and future</span>
            <a href={applyUrl} target="_blank" rel="noreferrer">Apply now</a>
          </div>
        </div>
      </div>

      <section className={styles.heroSection}>
        <div className={styles.heroOverlay} />
        <div className={`${styles.container} ${styles.heroLayout}`}>
          <div className={styles.heroVisual}>
            <img className={styles.heroPhoto} src={heroImage} alt="Larry and Staci Wallace" />
            <div className={styles.heroPhotoFade} />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.heroKicker}>Fueled By Fire</p>
            <div className={styles.heroWordmark} aria-label="Mastermind">
              <span>Mastery</span>
              <span className={styles.heroWordmarkAccent}>Mastermind</span>
            </div>
            <p className={styles.heroSubtitle}>Purpose-driven, faith-based success strategies for serious entrepreneurs.</p>
            <p className={styles.heroDescription}>
              An inner-circle space for CEOs, influencers, and serious entrepreneurs focused on hyper-focused results and peak performance in business, faith, family, and life.
            </p>
            <div className={styles.heroActions}><Cta /></div>
          </div>
        </div>
      </section>

      <section className={styles.communitySection}>
        <div className={styles.container}>
          <div className={styles.communityProof}>
            <div className={styles.communityCopy}>
              <p className={styles.communityLabel}>As Featured In</p>
              <h3>Leadership rooted in faith, performance, business growth, and legacy.</h3>
              <p>
                Everyone wants leadership, but the question is whether you are willing to do what it takes. Seven-figure leadership and personal life mastery comes with a price tag, and there has never been a more important time than now to step up, build a solid team, and take your God-given place in creating a highly profitable, purpose-driven life and business you love.
              </p>
            </div>
            <div className={styles.tagRow}>
              {pressLogos.map((logo) => <span key={logo}>{logo}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div className={`${styles.container} ${styles.audienceGrid}`}>
          <div>
            <SectionHeading
              eyebrow="Deep inside you know"
              title="You were born for something more."
              description="You have put in the years. You have carried the weight. Now it is time to step into mastery with the right counsel, strategy, team, and structure around you."
            />
            <ul className={styles.bulletList}>{bornForMore.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className={styles.pricingCard}>
            <p className={styles.cardEyebrow}>You want to build a legacy but...</p>
            <ul className={styles.bulletList}>{legacyBlocks.map((item) => <li key={item}>{item}</li>)}</ul>
            <a className={`${styles.button} ${styles.buttonRed} ${styles.fullButton}`} href={applyUrl} target="_blank" rel="noreferrer">Apply Now</a>
          </div>
        </div>
      </section>

      <section className={styles.expectSection}>
        <div className={styles.container}>
          <SectionHeading eyebrow="In order for things to change" title="You must change. Master every area of your life." light />
          <div className={styles.expectGrid}>
            {featureCards.map((card) => (
              <article className={styles.expectCard} key={card.title}>
                <span>{card.title.slice(0, 1).toUpperCase()}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.personalWordSection}>
        <div className={`${styles.container} ${styles.personalWordGrid}`}>
          <div className={styles.personalWordImage}>
            <img src={aboutImage} alt="Larry and Staci Wallace" />
          </div>
          <div className={styles.personalWordCopy}>
            <p className={styles.eyebrow}>About Larry & Staci Wallace</p>
            <h2 className={styles.heading}>A life dedicated to helping others succeed in business and life.</h2>
            <p className={styles.sectionCopy}>
              Once you step into a mastermind with Larry and Staci, you will know why there are no other coaches that better connect faith, family, finance, fitness, and business success the way they do.
            </p>
            <p className={styles.sectionCopy}>
              Staci is a master in the area of business psychology and peak performance, having shared the stage with five U.S. Presidents and authored eight best-selling books. Together, Larry and Staci have helped launch companies that have grown into hundreds of millions and built sales teams into the hundreds of thousands of people.
            </p>
            <p className={styles.sectionCopy}>
              They have celebrated 27 years of marriage, and together with their two adult children, they represent a unified family that glorifies God in business and life together.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.conversionSection}>
        <div className={styles.container}>
          <div className={styles.conversionPanel}>
            <div>
              <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>When you join</p>
              <h2 className={styles.lightHeading}>The Fueled By Fire Mastermind Program</h2>
              <p className={styles.sectionCopyLight}>
                You're stepping into an exclusive partnership with Larry and Staci. As a Mastermind Member, you are part of the family and aligning yourself with other world-class Kingdom entrepreneurs who have scaled past the ranks of ordinary success into a life of legacy significance.
              </p>
            </div>
            <div className={styles.communityImage}>
              <img src={masteryBadge} alt="Fueled By Fire Mastery Program" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Included inside"
            title="Mastermind leadership, mastery classes, strategy, hot seats, and live experiences."
            description="Plus 12 months of unlimited access to the FBF Mastery Program and Vault, an additional $24,000 value included in your Mastermind Experience."
          />
          <div className={styles.testimonialGrid}>
            {programIncludes.map((item) => (
              <article className={styles.pricingCard} key={item.title}>
                <p className={styles.cardEyebrow}>Included</p>
                <h3 className={styles.membershipTitle}>{item.title}</h3>
                <p className={styles.sectionCopy}>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCtaSection}>
        <div className={`${styles.container} ${styles.finalCtaLayout}`}>
          <div className={styles.finalCtaImageWrap}>
            <img src={aboutImage} alt="Larry and Staci Wallace" />
          </div>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Payment Methods</p>
            <h2 className={styles.lightHeading}>Choose the structure that fits your next step.</h2>
            <div className={styles.featuredTestimonials}>
              <article className={styles.featuredQuote}>
                <p className={styles.cardEyebrow}>Most Flexible</p>
                <h3 className={styles.membershipTitle} style={{ color: "#ffffff" }}>$5,000/month</h3>
                <a className={`${styles.button} ${styles.buttonGold} ${styles.fullButton}`} href={applyUrl} target="_blank" rel="noreferrer">Apply Now</a>
              </article>
              <article className={styles.featuredQuote}>
                <p className={styles.cardEyebrow}>Best Value</p>
                <h3 className={styles.membershipTitle} style={{ color: "#ffffff" }}>$54,000 paid in full</h3>
                <p className={styles.sectionCopyLight}>Savings if you pay in full.</p>
                <a className={`${styles.button} ${styles.buttonGold} ${styles.fullButton}`} href={applyUrl} target="_blank" rel="noreferrer">Apply Now</a>
              </article>
            </div>
            <p className={styles.sectionCopyLight}>
              Still have questions? No worries. Jump on a call with one of our team leaders and they will be happy to answer your questions and give you the confidence you need to make your next big decision.
            </p>
            <div className={styles.heroActions}><Cta>Book A Free Consult</Cta></div>
          </div>
        </div>
      </section>
    </main>
  );
}
