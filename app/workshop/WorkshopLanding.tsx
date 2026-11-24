import styles from "./build-without-borrowing.module.css";

const lessons = [
  { number: "01", title: "Name the real constraint.", body: "Is it capital, knowledge, demand, execution, or a missing relationship? Choose one business obstacle and the question you need answered before committing more money.", output: "One focused counsel question" },
  { number: "02", title: "Start with what you have.", body: "Take stock of your skills, tools, experience, and capacity. Use Rifle Focus to shape one smaller offer or experiment you can actually deliver.", output: "One practical business experiment" },
  { number: "03", title: "Build intentional relationships.", body: "Begin your business black book: relevant counsel, complementary collaborators, and potential referral partners. Identify how you can contribute before you ask.", output: "A private relationship-and-wisdom map" },
  { number: "04", title: "Put the next seven days on paper.", body: "Make your business easier to explain. Draft one respectful outreach message, choose a useful contribution, and give your next actions a date.", output: "A seven-day action plan" },
];
const faqs = [
  { q: "Who is this workshop for?", a: "Christian entrepreneurs who are starting or growing a business and feel constrained by money, isolation, or a lack of experienced counsel. Bring one real business challenge and something to write with." },
  { q: "Is this a financing or debt-relief program?", a: "No. This is practical business education, not a loan offer, debt-relief service, or individual financial advice. Wisdom does not remove every capital requirement, and no revenue or financing outcome is guaranteed." },
  { q: "Do I have to share my contacts?", a: "No. Your relationship map stays private. You can identify a missing role instead of naming a person, and any discussion is voluntary. You will not be asked to upload a contact list." },
  { q: "Do I need to join the Network?", a: "No. Complete a useful seven-day plan before the optional invitation. Payton will also explain how ongoing counsel, relationships, and relevant course material can support your next steps." },
  { q: "When is it, what does it cost, and is there a replay?", a: "The date, time, duration, registration price, and replay terms are still being finalized. Registration is not open in this review version. No seat, payment, or reminder subscription is created here." },
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
            <p className={styles.heroDescription}>Before you assume the next move needs another loan, explore what you can do with the resources and relationships already within reach.</p>
            <a className={styles.button} href="#registration">View registration details <span aria-hidden="true">→</span></a>
            <p className={styles.heroNote}>A practical workshop for Christian entrepreneurs.</p>
          </div>
          <figure className={styles.portrait}>
            <img src="/images/payton-wallace-host.webp" alt="Payton Wallace, workshop teacher" width="1400" height="934" fetchPriority="high" />
            <figcaption><small>Your teacher</small><strong>Payton Wallace</strong><span>Teaching the workshop. Leading the invitation.</span></figcaption>
          </figure>
        </div>
        <div className={styles.heroStrip}><span>Resources within reach</span><span>Wise counsel</span><span>Intentional relationships</span></div>
      </section>
      <section id="workshop-content" className={styles.light}>
        <div className={`${styles.container} ${styles.intro}`}>
          <div><p className={styles.eyebrow}>A different starting point</p><h2>Before you ask,<br />“How do I fund this?”</h2></div>
          <div><p className={styles.large}>Ask, “What do I actually need?”</p><p>More money is not always the first answer. Sometimes you need a clearer offer, a smaller test, or a conversation with someone who has solved the problem in front of you.</p><p>Explore Other People’s Money (OPM) alongside Other People’s Wisdom (OPW). Not just more information, but counsel you can apply before committing capital.</p><p className={styles.small}>Capital can still be necessary. This workshop helps you think through your next step; it does not promise to eliminate debt or replace professional advice.</p></div>
        </div>
      </section>
      <section className={styles.dark} aria-labelledby="learn-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>Bring one real business challenge</p><h2 id="learn-heading">Leave with work you can use.</h2><p>Practical reflection. Clear questions. A next step with a date attached.</p></div>
          <div className={styles.lessons}>{lessons.map(item => <article key={item.number}><span className={styles.number}>{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p><strong className={styles.output}>{item.output}</strong></div></article>)}</div>
        </div>
      </section>
      <section className={styles.light} aria-labelledby="plan-heading">
        <div className={`${styles.container} ${styles.planGrid}`}>
          <div><p className={styles.eyebrow}>The next seven days</p><h2 id="plan-heading">Less guessing.<br />A plan you can act on.</h2><p>Choose one counsel conversation, one useful contribution, and one business experiment. Set a spending limit and decide what evidence will tell you whether to continue.</p><p>You complete your plan before the optional membership invitation. Its value does not depend on joining.</p><a className={styles.textLink} href="#registration">See registration details <span aria-hidden="true">→</span></a></div>
          <div className={styles.plan}><p className={styles.planLabel}>Your seven-day plan</p><ol><li><strong>Seek counsel</strong><span>Who can help me think through this decision?</span></li><li><strong>Make a contribution</strong><span>How can I be useful before asking for something?</span></li><li><strong>Test one idea</strong><span>What can I try with the resources I have?</span></li><li><strong>Review what happened</strong><span>What did I learn, and what will I do next?</span></li></ol><p>A focused plan, not a promise of financial results.</p></div>
        </div>
      </section>
      <section className={styles.network} aria-labelledby="network-heading">
        <div className={styles.container}>
          <p className={styles.eyebrow}>An optional next step</p><h2 id="network-heading">Keep building in the right company.</h2>
          <p className={styles.networkLead}>After the teaching, Payton will introduce Kingdom Intelligence Network: a place to keep seeking counsel, asking useful questions, and building intentional business relationships.</p>
          <div className={styles.courses}><article><h3>Kingdom Business Accelerator</h3><p>Clarify your strengths, purpose, business message, and goals. Explore the S.W.E.E.T. Spot Audit, your business “I Am” statement, and the L.E.G.A.C.Y. Roadmap.</p></article><article><h3>Big B.O.O.M. Business Launch</h3><p>Clarify your offer, pricing, and ideal client. Strengthen your message, build your community, and work through a practical launch plan.</p></article></div>
          <p className={styles.small}>These courses are planned for the workshop’s Network offer. Member access and final membership pricing and terms must be confirmed before enrollment opens. No purchase is available in this review.</p>
        </div>
      </section>
      <section className={styles.light} aria-labelledby="faq-heading"><div className={`${styles.container} ${styles.faqGrid}`}><div><p className={styles.eyebrow}>A few useful answers</p><h2 id="faq-heading">Before you join us.</h2></div><div className={styles.faq}>{faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
      <section id="registration" tabIndex={-1} className={styles.registration} aria-labelledby="registration-heading">
        <div className={`${styles.container} ${styles.registrationGrid}`}><div><p className={styles.eyebrow}>Build Without Borrowing</p><h2 id="registration-heading">Your next move starts<br />with a better question.</h2><p>Bring your challenge. Take stock of what you have. Begin a plan for the counsel and relationships your business needs.</p></div><div className={styles.pending}><p className={styles.pendingLabel}>Review version</p><h3>Registration is not open.</h3><p>We’re finalizing the workshop details. This page does not collect your information or reserve a seat.</p><dl><div><dt>Date &amp; time</dt><dd>To be confirmed</dd></div><div><dt>Duration &amp; price</dt><dd>To be confirmed</dd></div><div><dt>Replay availability</dt><dd>To be confirmed</dd></div></dl><button disabled type="button">Registration coming soon</button><small>No payment, signup, or reminder subscription is created.</small></div></div>
      </section>
      <footer className={styles.footer}><span>Fueled By Fire, LLC.</span><span>Kingdom Intelligence · Build Without Borrowing</span></footer>
    </main>
  );
}
