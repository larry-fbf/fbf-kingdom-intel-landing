import type { Metadata } from "next";
import workshop from "../page.module.css";
import styles from "./page.module.css";

const title = "You Are Registered | Kingdom Intel Workshop | October 13, 2026";
const description = "Your next steps for the free live Kingdom Intel Workshop with Payton Wallace and Andy Lee, Tuesday, October 13, 2026 at 11am CT / 12pm ET.";
const url = "https://www.kingdomintel.com/workshop/thank-you";
const image = "https://www.kingdomintel.com/images/kingdom-intel-workshop-og.jpg";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: false, follow: true },
  openGraph: { title, description, url, siteName: "Kingdom Intel", type: "website", images: [{ url: image, width: 1200, height: 630, alt: "Kingdom Intel Workshop" }] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export default function WorkshopThankYouPage() {
  return (
    <main className={`${workshop.pageShell} ${styles.page}`}>
      <div className={styles.container}>
        <header className={styles.brand}>
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" width="92" height="92" />
          <span>Free Kingdom Intelligence Workshop</span>
        </header>

        <div className={styles.confirmation}>
          <div className={styles.check} aria-hidden="true">✓</div>
          <p className={workshop.eyebrow}>You Are Registered</p>
          <h1>Your Seat Is Saved.</h1>
          <p className={styles.lead}>You are in for <strong>Called But Stuck?</strong> We look forward to seeing you live.</p>
          <div className={styles.event}>
            <p className={styles.date}>Tuesday, October 13, 2026</p>
            <p><time dateTime="2026-10-13T16:00:00.000Z">11am CT / 12pm ET</time> <span aria-hidden="true">·</span> Live on Zoom</p>
            <p>Hosted by <strong>Payton Wallace &amp; Andy Lee</strong></p>
          </div>
        </div>

        <div className={styles.nextSteps}>
          <h2>Here Is What To Do Next.</h2>
          <ol className={styles.steps}>
            <li>
              <span className={styles.number} aria-hidden="true">01</span>
              <div><h3>Watch Your Inbox</h3><p>Watch your email for Zoom access and reminders. Check your spam or promotions folder, too.</p></div>
            </li>
            <li>
              <span className={styles.number} aria-hidden="true">02</span>
              <div><h3>Block Your Calendar</h3><p>Save October 13 at 11am CT / 12pm ET. Teaching runs for 60 minutes, with time afterward for open Q&amp;A.</p></div>
            </li>
            <li>
              <span className={styles.number} aria-hidden="true">03</span>
              <div><h3>Come Ready To Work</h3><p>Bring something to write with and one area where you want clearer traction. Come ready to choose your next faithful growth move.</p></div>
            </li>
          </ol>
        </div>

        <footer className={styles.footer}>
          <a href="/workshop">Back to workshop details <span aria-hidden="true">→</span></a>
          <p>Fueled By Fire, LLC. All Rights Reserved.</p>
        </footer>
      </div>
    </main>
  );
}
