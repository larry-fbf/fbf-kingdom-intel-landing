import type { Metadata } from "next";
import Script from "next/script";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "VIP Confirmed | Kingdom Intelligence Masterclass",
  description:
    "Your VIP upgrade is confirmed. Share the masterclass, join the community, and watch for your VIP room details.",
};

const COMMUNITY_URL =
  "https://vault.fbfmastery.com/join?invitation_token=b0c8c0451f281ece962ad9e00e5c739000d5e1b9-e61c108d-7479-4d7b-8079-f258420879bb";
const SHARE_LINK = "https://www.kingdomintel.com/";

const syncScript = `
(() => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const status = document.querySelector("[data-sync-status]");

  if (sessionId) {
    fetch("/api/vip-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId })
    })
      .then(() => {
        if (status) status.textContent = "VIP access confirmed.";
      })
      .catch(() => {
        if (status) status.textContent = "VIP access is confirmed. Our team will also verify your details.";
      });
  } else if (status) {
    status.textContent = "VIP access is confirmed. Check your email receipt for payment details.";
  }

  const copyButton = document.querySelector("[data-copy-share-link]");
  if (!copyButton) return;

  copyButton.addEventListener("click", async () => {
    const original = copyButton.textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText("${SHARE_LINK}");
      } else {
        const input = document.createElement("textarea");
        input.value = "${SHARE_LINK}";
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      copyButton.textContent = "Copied";
      window.setTimeout(() => { copyButton.textContent = original || "Copy link"; }, 1400);
    } catch {
      copyButton.textContent = "Copy failed";
      window.setTimeout(() => { copyButton.textContent = original || "Copy link"; }, 1600);
    }
  });
})();
`;

export default function VIPThankYouPage() {
  return (
    <main className={styles.pageShell}>
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
            <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className={styles.goldButton}>
              Join the masterclass community
            </a>
            <a href="#share" className={styles.darkButton}>
              Share with a friend
            </a>
          </div>
        </div>
      </section>

      <section id="share" className={styles.shareSection}>
        <div className={styles.container}>
          <div className={styles.shareCard}>
            <p className={styles.eyebrowRed}>Invite someone</p>
            <h2>Share the masterclass with a friend.</h2>
            <p>
              Copy this link and send it to a business owner who needs Kingdom-minded wisdom for the
              AI era.
            </p>
            <div className={styles.copyRow}>
              <input readOnly value={SHARE_LINK} aria-label="Masterclass share link" />
              <button type="button" data-copy-share-link>
                Copy link
              </button>
            </div>
          </div>

          <div className={styles.nextSteps}>
            <article>
              <span>01</span>
              <h3>Watch your email and texts.</h3>
              <p>You will receive reminder details and your Zoom link before the VIP rooms.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Join the community.</h3>
              <p>The community is the home base for updates, conversation, and masterclass resources.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Bring your real question.</h3>
              <p>Come ready with the business challenge you want feedback on during the VIP room.</p>
            </article>
          </div>
        </div>
      </section>

      <Script id="vip-thank-you-actions" strategy="afterInteractive">
        {syncScript}
      </Script>
    </main>
  );
}
