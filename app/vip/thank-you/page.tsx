import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "VIP Payment Status | Kingdom Intelligence Masterclass",
  description: "November VIP access requires verified payment and fulfillment.",
};

export default function VIPThankYouPage() {
  return (
    <main className={styles.pageShell}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" className={styles.logo} />
          <p className={styles.eyebrow}>November 4–5, 2026 · 7 PM Central</p>
          <h1>VIP access is not confirmed</h1>
          <p className={styles.lead}>
            November VIP checkout is not open yet. This page does not verify a payment or grant VIP access.
            If you already paid, contact support@fueledbyfire.com with your receipt so our team can verify
            the event you purchased. Do not purchase again.
          </p>
          <div className={styles.actions}>
            <a className={styles.goldButton} href="mailto:support@fueledbyfire.com">Contact support</a>
            <a className={styles.darkButton} href="/dashboard">Open the event dashboard</a>
          </div>
        </div>
      </section>
    </main>
  );
}
