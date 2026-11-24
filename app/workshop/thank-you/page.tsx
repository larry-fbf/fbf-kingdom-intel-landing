import type { Metadata } from "next";
import styles from "../build-without-borrowing.module.css";
export const metadata: Metadata = {
  title: "Registration pending | Build Without Borrowing",
  description: "Workshop registration is not open in this preview version.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.kingdomintel.com/workshop/thank-you" },
  openGraph: { title: "Build Without Borrowing", description: "Registration is not open.", images: [] },
  twitter: { card: "summary", title: "Build Without Borrowing", description: "Registration is not open.", images: [] },
};
export default function WorkshopThankYouPage() {
  return <main className={styles.page}><section className={styles.registration}><div className={styles.container}>
    <p className={styles.eyebrow}>Build Without Borrowing · Preview</p>
    <h1>Registration is not open.</h1>
    <p>This review page has not reserved a seat or created a reminder subscription. Event details and registration are still being finalized.</p>
    <a className={styles.button} href="/workshop#registration">Back to workshop details</a>
  </div></section></main>;
}
