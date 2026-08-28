"use client";

import { useState } from "react";
import styles from "./ShareMasterclassSection.module.css";

const SHARE_LINK = "https://www.kingdomintel.com/";

type Step = {
  title: string;
  body: string;
};

type ShareMasterclassSectionProps = {
  steps: Step[];
};

export default function ShareMasterclassSection({ steps }: ShareMasterclassSectionProps) {
  const [copyStatus, setCopyStatus] = useState("Copy link");

  async function copyShareLink() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(SHARE_LINK);
      } else {
        const input = document.createElement("textarea");
        input.value = SHARE_LINK;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus("Copy link"), 1400);
    } catch {
      setCopyStatus("Copy failed");
      window.setTimeout(() => setCopyStatus("Copy link"), 1600);
    }
  }

  return (
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
            <button type="button" data-copy-share-link onClick={copyShareLink}>
              {copyStatus}
            </button>
          </div>
        </div>

        <div className={styles.nextSteps}>
          {steps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
