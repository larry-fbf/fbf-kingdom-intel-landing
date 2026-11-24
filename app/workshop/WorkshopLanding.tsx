import styles from "./build-without-borrowing.module.css";

const benefits = [
  {
    "title": "A clearer next move",
    "body": "Gain perspective on what may be holding your business back before you commit more money to moving it forward."
  },
  {
    "title": "A fresh look at what’s in your hands",
    "body": "Recognize the potential in your experience, relationships, and resources instead of overlooking them while searching for something more."
  },
  {
    "title": "Less guesswork. Wiser counsel.",
    "body": "See the value of building alongside people whose experience and Kingdom perspective can strengthen your decisions."
  }
];
const faqs = [
  {
    "q": "Is this for me if I’m just getting started?",
    "a": "Yes. This workshop is for Christian entrepreneurs starting or growing a business who want practical, faith-led perspective on their next move."
  },
  {
    "q": "What should I bring?",
    "a": "Bring a business challenge you’re facing, something to take notes with, and a willingness to consider a different way forward."
  },
  {
    "q": "Is this a loan or debt-relief program?",
    "a": "No. This is a business workshop about wise counsel, relationships, and stewardship, not a financing offer or personal financial advice."
  }
];

export default function WorkshopLanding() {
  return (
    <main className={styles.page}>
      <a className={styles.skip} href="#workshop-content">Skip to workshop details</a>
      <div className={styles.reviewBar}>Preview · Event details pending · Registration not open</div>
      <header className={styles.header}>
        <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" width="72" height="62" />
        <div className={styles.brand}><span>Kingdom Intelligence</span><small>Workshop with Payton Wallace</small></div>
        <a className={styles.headerLink} href="#registration">Registration details</a>
      </header>
      <section className={styles.hero} aria-labelledby="workshop-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.pain}>The vision is there. The money feels tight. You’re tired of building alone.</p>
            <h1 id="workshop-title" aria-label="Build Without Borrowing"><span>Build Without</span>{" "}<span>Borrowing</span></h1>
            <p className={styles.subtitle}>Build your business through wise counsel, trusted relationships, and the resources you already have.</p>
            <p className={styles.heroDescription}>Before you assume another loan is your next move, join Payton Wallace for a practical workshop on building business God’s way. Explore how Spirit-led wisdom and the right relationships can help you move forward with what’s already in your hands.</p>
            <a className={styles.button} href="#registration">View registration details <span aria-hidden="true">→</span></a>
            <p className={styles.heroNote}>For Kingdom entrepreneurs and business owners ready to build with wisdom.</p>
          </div>
          <figure className={styles.portrait}>
            <img src="/images/payton-wallace-host.webp" alt="Payton Wallace, workshop teacher" width="1400" height="934" fetchPriority="high" />
            <figcaption><small>Your workshop host</small><strong>Payton Wallace</strong><small>Fueled By Fire</small></figcaption>
          </figure>
        </div>
      </section>
      <section id="workshop-content" className={styles.light}>
        <div className={`${styles.container} ${styles.intro}`}>
<div><h2>More money isn’t always the missing piece.</h2></div><div><p>You have a vision for your business, but every next move seems to come with another expense. You’re weighing the options, carrying the decisions, and wondering how to grow without taking on more pressure.</p><p>This workshop invites you to look beyond the money question. Wise counsel can help you see what you’ve been missing. Trusted relationships can change the conversations you’re having. Stewardship starts with recognizing the value of what’s already available to you.</p></div>
        </div>
      </section>
      <section className={styles.dark} aria-labelledby="benefits-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeading}><h2 id="benefits-heading">Build with greater clarity and conviction.</h2></div>
          <div className={styles.benefits}>{benefits.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </div>
      </section>
      <section className={styles.light} aria-labelledby="faq-heading"><div className={`${styles.container} ${styles.faqGrid}`}><div><h2 id="faq-heading">Before you join us</h2></div><div className={styles.faq}>{faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
      <section id="registration" tabIndex={-1} className={styles.registration} aria-labelledby="registration-heading">
        <div className={`${styles.container} ${styles.registrationGrid}`}><div><h2 id="registration-heading">Build with wisdom for the vision God put in your hands.</h2><p>Join Payton for Build Without Borrowing. Come ready to think differently about what you have, who you learn from, and how you build.</p></div><div className={styles.pending}><h3>Registration is not open yet.</h3><p>The workshop date, time, and registration details are still being finalized. Check this page for updates.</p></div></div>
      </section>
      <footer className={styles.footer}><span>Fueled By Fire, LLC.</span><span>Kingdom Intelligence · Build Without Borrowing</span></footer>
    </main>
  );
}
