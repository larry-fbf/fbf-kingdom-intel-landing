import Image from "next/image";
import styles from "./page.module.css";

const CAL_EMBED_URL = "https://app.cal.com/team/fueled-by-fire/consultation-call?embed=true&theme=light";

export const metadata = {
  title: "Book a Call | Kingdom Intelligence Masterclass",
  description: "Book a short call to ask questions about Fueled by Fire and learn more about what is available after the Kingdom Intelligence Masterclass.",
};

export default function BookACallPage() {
  return (
    <main className={styles.page}>
      <section className={styles.shell} aria-labelledby="book-call-title">
        <div className={styles.copy}>
          <Image
            src="/images/fbf-logo-white.png"
            alt="Fueled By Fire"
            width={154}
            height={72}
            className={styles.logo}
            priority
          />
          <p className={styles.kicker}>Kingdom Intelligence Masterclass</p>
          <h1 id="book-call-title">Book a quick call.</h1>
          <p className={styles.lead}>
            Take 5-15 minutes to ask questions about Fueled by Fire, talk through where you are, and hear more about what we have to offer after the masterclass.
          </p>
          <div className={styles.notes} aria-label="Call expectations">
            <span>Short and simple</span>
            <span>Ask your questions</span>
            <span>Find the next right step</span>
          </div>
        </div>

        <div className={styles.embedWrap}>
          <iframe
            className={styles.embed}
            src={CAL_EMBED_URL}
            title="Book a Fueled by Fire consultation call"
            loading="eager"
          />
        </div>
      </section>
    </main>
  );
}
