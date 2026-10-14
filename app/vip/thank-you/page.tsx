import type { Metadata } from "next";
import ClarityPageViewEvent from "../../components/ClarityPageViewEvent";
import ShareMasterclassSection from "../../components/ShareMasterclassSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "VIP Next Steps | Kingdom Intelligence Masterclass",
  description: "Check your payment receipt and VIP access email for the November 4–5 rooms.",
};

const shareSteps = [
  { title: "Check your payment receipt.", body: "This page cannot verify your payment or VIP access. A visit here is not a purchase confirmation." },
  { title: "Watch for your access email.", body: "After a completed purchase, your VIP access instructions come through our separate fulfillment process. If they are missing, contact support with your receipt; do not purchase again." },
  { title: "Bring your real question.", body: "The VIP rooms are November 4–5, 2026 at 7 PM Central. Bring the business challenge you want feedback on." },
];

export default function VIPThankYouPage() {
  return (
    <main className={styles.pageShell}>
      <ClarityPageViewEvent eventName="kim_vip_thank_you_page_load" />
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" className={styles.logo} />
          <p className={styles.eyebrow}>VIP next steps</p>
          <h1>Check your receipt and access email.</h1>
          <p className={styles.lead}>VIP rooms: November 4–5, 2026 at 7 PM Central. Your access email contains the private room and FBF Vault instructions after a completed purchase.</p>
          <p className={styles.syncNote}>This page cannot verify your payment or fulfillment status. If your receipt or access email is missing, contact support. Do not purchase again to refresh this page.</p>
          <div className={styles.actions}><a className={styles.darkButton} href="/dashboard">Masterclass dashboard</a></div>
        </div>
      </section>
      <ShareMasterclassSection steps={shareSteps} />
    </main>
  );
}
