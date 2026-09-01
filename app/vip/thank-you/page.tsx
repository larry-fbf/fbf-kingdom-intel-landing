import type { Metadata } from "next";
import Script from "next/script";
import ClarityPageViewEvent from "../../components/ClarityPageViewEvent";
import ShareMasterclassSection from "../../components/ShareMasterclassSection";
import TrackedClarityLink from "../../components/TrackedClarityLink";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "VIP Confirmed | Kingdom Intelligence Masterclass",
  description:
    "Your VIP upgrade is confirmed. Share the masterclass, join the community, and watch for your VIP room details.",
};

const COMMUNITY_URL =
  "https://vault.fbfmastery.com/join?invitation_token=b0c8c0451f281ece962ad9e00e5c739000d5e1b9-e61c108d-7479-4d7b-8079-f258420879bb";

const shareSteps = [
  {
    title: "Watch your email and texts.",
    body: "You will receive reminder details and your Zoom link before the VIP rooms.",
  },
  {
    title: "Join the community.",
    body: "The community is the home base for updates, conversation, and masterclass resources.",
  },
  {
    title: "Bring your real question.",
    body: "Come ready with the business challenge you want feedback on during the VIP room.",
  },
];

const syncScript = `
(() => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const status = document.querySelector("[data-sync-status]");
  const track = (eventName) => {
    if (typeof window.clarity === "function") {
      window.clarity("set", "funnel", "kim_sept_2026");
      window.clarity("event", eventName);
    }
  };

  track(sessionId ? "kim_vip_purchase_success" : "kim_vip_thank_you_visit");

  if (sessionId) {
    fetch("/api/vip-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId })
    })
      .then(() => {
        if (status) status.textContent = "VIP access confirmed.";
        track("kim_vip_purchase_sync_success");
      })
      .catch(() => {
        if (status) status.textContent = "VIP access is confirmed. Our team will also verify your details.";
        track("kim_vip_purchase_sync_warning");
      });
  } else if (status) {
    status.textContent = "VIP access is confirmed. Check your email receipt for payment details.";
  }
})();
`;

export default function VIPThankYouPage() {
  return (
    <main className={styles.pageShell}>
      <ClarityPageViewEvent eventName="kim_vip_thank_you_page_load" />
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" className={styles.logo} />
          <p className={styles.eyebrow}>VIP upgrade complete</p>
          <h1>You are in.</h1>
          <p className={styles.lead}>
            Thank you for upgrading to VIP for the Kingdom Intelligence Masterclass. You will get an
            email and text reminder with your Zoom link before the VIP rooms, plus access to
            the masterclass recordings in the FBF Vault.
          </p>
          <p className={styles.syncNote} data-sync-status>
            Confirming your VIP details...
          </p>
          <div className={styles.actions}>
            <TrackedClarityLink
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.goldButton}
              eventName="kim_vip_community_click"
              eventTags={{ destination: "fbf_vault_community" }}
            >
              Join the masterclass community
            </TrackedClarityLink>
            <TrackedClarityLink
              href="#share"
              className={styles.darkButton}
              eventName="kim_vip_share_click"
            >
              Share with a friend
            </TrackedClarityLink>
          </div>
        </div>
      </section>

      <ShareMasterclassSection steps={shareSteps} />

      <Script id="vip-thank-you-actions" strategy="afterInteractive">
        {syncScript}
      </Script>
    </main>
  );
}
