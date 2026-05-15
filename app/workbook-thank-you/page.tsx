import Image from "next/image";
import styles from "../workbook/page.module.css";

const WORKBOOK_URL = "https://drive.google.com/file/d/1Nqlt9m0fjuKTX5t6KrYdqcuWLld1Tqox/view";
const COMMUNITY_URL = "https://vault.fbfmastery.com/join?invitation_token=b0c8c0451f281ece962ad9e00e5c739000d5e1b9-e61c108d-7479-4d7b-8079-f258420879bb";

export default function WorkbookThankYouPage() {
  return (
    <main className={styles.pageShell}>
      <section className={`${styles.heroSection} ${styles.workbookHero} ${styles.thankYouHero}`}>
        <div className={styles.heroOverlay} />
        <div className={`${styles.container} ${styles.thankYouShell}`}>
          <Image src="/images/fbf-logo-white.png" alt="Fueled By Fire" width={154} height={72} className={styles.workbookLogo} priority />
          <p className={styles.heroKicker}>Kingdom Intelligence Masterclass</p>
          <h1 className={styles.workbookTitle}>You’re in.</h1>
          <p className={styles.heroDescription}>
            Your workbook is ready. Download it now, then join the community so you can add the event to your calendar, access replays, use the chat, and stay connected during the masterclass.
          </p>

          <div className={styles.thankYouActions}>
            <a className={`${styles.button} ${styles.buttonGold}`} href={WORKBOOK_URL} target="_blank" rel="noopener noreferrer">
              Download the workbook PDF
            </a>
            <a className={`${styles.button} ${styles.buttonRed}`} href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer">
              Join the masterclass community
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
