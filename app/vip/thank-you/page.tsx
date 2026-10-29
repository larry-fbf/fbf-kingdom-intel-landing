import type { Metadata } from "next";
import ClarityPageViewEvent from "../../components/ClarityPageViewEvent";
import ShareMasterclassSection from "../../components/ShareMasterclassSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "VIP Next Steps | Kingdom Intelligence Masterclass",
  description: "Get ready for your VIP Business Mastermind: November 11–12, 2026 at 7 PM Central. Watch your inbox, prepare your question, and join us live.",
};

export default function VIPThankYouPage() {
  return (
    <main className={styles.pageShell}>
      <ClarityPageViewEvent eventName="kim_vip_thank_you_page_load" />
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" className={styles.logo} />
          <p className={styles.eyebrow}>VIP next steps</p>
          <h1>Get ready for your VIP Business Mastermind.</h1>
          <p className={styles.lead}>Bring your real business and leadership questions. Larry, Staci, and Payton will work through them with you in two private, question-driven Zoom sessions.</p>
          <p className={styles.schedule}>Wednesday, November 11 &amp; Thursday, November 12, 2026<br /><strong>7 PM Central · 8 PM Eastern · 5 PM Pacific</strong></p>
          <div className={styles.actions}><a className={styles.darkButton} href="/dashboard">Masterclass dashboard</a></div>
        </div>
      </section>
      <section className={styles.details} aria-labelledby="vip-included">
        <div className={styles.container}>
          <div className={styles.benefits}>
            <h2 id="vip-included">Your VIP experience includes</h2>
            <ul>
              <li>Two private, cameras-on VIP Zoom sessions</li>
              <li>Lifetime access to all three masterclass replays and both VIP recordings</li>
              <li>The S.W.E.E.T. Spot Audit and Superpower Leadership document</li>
            </ul>
          </div>
          <h2 id="vip-next-steps">Here’s what to do next</h2>
          <ol className={styles.nextSteps} aria-labelledby="vip-next-steps">
            <li>
              <span className={styles.stepNumber} aria-hidden="true">01</span>
              <h3>Watch your inbox.</h3>
              <p>Your private Zoom and bonus links will be emailed closer to the sessions. After your paid purchase, nothing else is required to receive access.</p>
            </li>
            <li>
              <span className={styles.stepNumber} aria-hidden="true">02</span>
              <h3>Prepare your question.</h3>
              <p>Reply to your VIP welcome email with a sentence or two for each:</p>
              <ul>
                <li>What is your biggest challenge?</li>
                <li>What would overcoming it look like?</li>
                <li>What specific question would you like us to answer?</li>
              </ul>
              <p>Questions sent in advance get priority. You can reply later after the masterclass or ask live.</p>
            </li>
            <li>
              <span className={styles.stepNumber} aria-hidden="true">03</span>
              <h3>Join us with your camera on.</h3>
              <p>Bring your question and be ready for practical counsel that honors your faith, family, and assignment.</p>
            </li>
          </ol>
          <p className={styles.syncNote}>This page does not verify payment. Keep your receipt; if your confirmation is missing, <a href="mailto:support@fbfmastery.com">contact support</a> rather than purchasing again.</p>
        </div>
      </section>
      <ShareMasterclassSection steps={[]} />
    </main>
  );
}
