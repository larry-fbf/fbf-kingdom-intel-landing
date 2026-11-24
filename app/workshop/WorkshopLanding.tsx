import styles from "./build-without-borrowing.module.css";

const benefits = [
  { title: "A clearer way forward.", body: "See possibilities beyond another loan, with a practical perspective on the business you want to build." },
  { title: "Resources you may be overlooking.", body: "Recognize more of the value in your experience, existing resources, and trusted relationships." },
  { title: "Less pressure to figure it out alone.", body: "Discover how wise counsel and intentional business relationships can support your next move." },
];
const faqs = [
  { q: "Do I need an established business?", a: "No. This workshop is for Christian entrepreneurs starting or growing a business who want a clearer way forward." },
  { q: "What should I bring?", a: "Bring one business challenge you want to move past, an open mind, and something to write with." },
  { q: "Is this a financing or debt-relief program?", a: "No. It is business education, not a loan offer or individual financial advice. Revenue, borrowing, and financing outcomes are not guaranteed." },
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
            <p className={styles.pain}>Money feels tight. Every decision feels like yours alone.</p>
            <h1 id="workshop-title" aria-label="Build Without Borrowing"><span>Build Without</span>{" "}<span>Borrowing</span></h1>
            <p className={styles.subtitle}>Build your business through wise counsel, trusted relationships, and the resources you already have.</p>
            <p className={styles.heroDescription}>Join Payton Wallace for a practical workshop about moving your business forward without assuming another loan is your only option.</p>
            <a className={styles.button} href="#registration">View registration details <span aria-hidden="true">→</span></a>
            <p className={styles.heroNote}>For Christian entrepreneurs ready for a fresh perspective.</p>
          </div>
          <figure className={styles.portrait}>
            <img src="/images/payton-wallace-host.webp" alt="Payton Wallace, workshop teacher" width="1400" height="934" fetchPriority="high" />
            <figcaption><small>Your workshop host</small><strong>Payton Wallace</strong></figcaption>
          </figure>
        </div>
        <div className={styles.heroStrip}><span>Resources within reach</span><span>Wise counsel</span><span>Intentional relationships</span></div>
      </section>
      <section id="workshop-content" className={styles.light}>
        <div className={`${styles.container} ${styles.intro}`}>
          <div><p className={styles.eyebrow}>You have a vision. Now what?</p><h2>Don’t let the money question<br />be the end of the conversation.</h2></div>
          <div><p className={styles.large}>You want to build. You don’t want to carry it all alone.</p><p>When every idea seems to need more money, it’s easy to feel stuck. This workshop is for you if you’re ready to look beyond that pressure and explore a more intentional way to grow.</p><a className={styles.textLink} href="#registration">See registration details <span aria-hidden="true">→</span></a></div>
        </div>
      </section>
      <section className={styles.dark} aria-labelledby="benefits-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>Why attend?</p><h2 id="benefits-heading">Come for a fresh perspective.<br />Leave with more possibility.</h2></div>
          <div className={styles.benefits}>{benefits.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
          <a className={styles.button} href="#registration">View workshop details <span aria-hidden="true">→</span></a>
        </div>
      </section>
      <section className={styles.light} aria-labelledby="faq-heading"><div className={`${styles.container} ${styles.faqGrid}`}><div><p className={styles.eyebrow}>Before you join us</p><h2 id="faq-heading">A few useful answers.</h2></div><div className={styles.faq}>{faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
      <section id="registration" tabIndex={-1} className={styles.registration} aria-labelledby="registration-heading">
        <div className={`${styles.container} ${styles.registrationGrid}`}><div><p className={styles.eyebrow}>An invitation from Payton Wallace</p><h2 id="registration-heading">You don’t have to see<br />every next step alone.</h2><p>Join Payton for Build Without Borrowing. Make room for a fresh perspective on your business, your relationships, and what’s already within reach.</p></div><div className={styles.pending}><h3>Registration is not open.</h3><p>Workshop details will be announced here.</p><dl><div><dt>Date &amp; time</dt><dd>To be confirmed</dd></div><div><dt>Duration &amp; price</dt><dd>To be confirmed</dd></div><div><dt>Replay availability</dt><dd>To be confirmed</dd></div></dl><button disabled type="button">Registration coming soon</button></div></div>
      </section>
      <footer className={styles.footer}><span>Fueled By Fire, LLC.</span><span>Kingdom Intelligence · Build Without Borrowing</span></footer>
    </main>
  );
}
