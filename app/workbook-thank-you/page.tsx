import Image from "next/image";
import ClarityPageViewEvent from "../components/ClarityPageViewEvent";
import TrackedClarityLink from "../components/TrackedClarityLink";
import styles from "../workbook/page.module.css";

const WORKBOOK_URL = "https://drive.google.com/file/d/1Nqlt9m0fjuKTX5t6KrYdqcuWLld1Tqox/view";
const DASHBOARD_URL = "/dashboard";

export default function WorkbookThankYouPage() {
  return (
    <main className={styles.pageShell}>
      <ClarityPageViewEvent eventName="kim_workbook_thank_you_visit" />
      <section className={`${styles.heroSection} ${styles.workbookHero} ${styles.thankYouHero}`}>
        <div className={styles.heroOverlay} />
        <div className={`${styles.container} ${styles.thankYouShell}`}>
          <Image src="/images/fbf-logo-white.png" alt="Fueled By Fire" width={154} height={72} className={styles.workbookLogo} priority />
          <p className={styles.heroKicker}>Kingdom Intelligence Masterclass</p>
          <h1 className={styles.workbookTitle}>You’re in.</h1>
          <p className={styles.heroDescription}>
            Your workbook is ready. Download it now, then open the event dashboard so you can add the event to your calendar, access replays, use the chat, and stay connected during the masterclass.
          </p>

          <div className={styles.thankYouActions}>
            <TrackedClarityLink
              className={`${styles.button} ${styles.buttonGold}`}
              eventName="kim_workbook_pdf_download_click"
              eventTags={{ destination: "google_drive" }}
              href={WORKBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download the workbook PDF
            </TrackedClarityLink>
            <TrackedClarityLink
              className={`${styles.button} ${styles.buttonRed}`}
              eventName="kim_workbook_dashboard_click"
              href={DASHBOARD_URL}
            >
              Open the event dashboard
            </TrackedClarityLink>
          </div>
        </div>
      </section>
    </main>
  );
}
