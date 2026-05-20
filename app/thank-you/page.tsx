import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You Are Registered | Kingdom Intelligence Masterclass",
  description:
    "Confirmation and next steps for the Kingdom Intelligence Masterclass.",
};

const COMMUNITY_URL =
  "https://vault.fbfmastery.com/join?invitation_token=b0c8c0451f281ece962ad9e00e5c739000d5e1b9-e61c108d-7479-4d7b-8079-f258420879bb";
const LANDING_URL = "/";

const eventDetails = [
  { label: "date", value: "June 9-11, 2026" },
  { label: "time", value: "12 PM Central" },
  { label: "format", value: "Free live online event" },
];

const nextSteps = [
  "Check your inbox for the welcome email from Staci.",
  "Join the masterclass community for links, reminders, and updates.",
  "Download the workbook before day one and come prepared.",
];

const communityItems = [
  {
    title: "live event access",
    body: "Session links, reminders, and event updates in one place.",
  },
  {
    title: "workbook resources",
    body: "The Kingdom Intelligence workbook and prep materials for each day.",
  },
  {
    title: "community connection",
    body: "A room of faith-driven leaders building with wisdom, order, and courage.",
  },
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
      />
    </svg>
  );
}

export default function ThankYou() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "if (typeof fbq === 'function') { fbq('track', 'CompleteRegistration'); }",
        }}
      />

      <main className="thankYouPage">
        <section className="thankHero">
          <div className="registeredBar">
            <span>
              <CheckIcon />
              you are registered
            </span>
            <span>june 9-11, 2026</span>
            <span>12 pm central</span>
          </div>

          <div className="heroShell">
            <div className="heroCopy">
              <img
                src="/images/fbf-logo-white.png"
                alt="Fueled By Fire"
                className="heroLogo"
              />
              <p className="eyebrow">kingdom intelligence masterclass</p>
              <h1>your seat is saved.</h1>
              <p className="lead">
                you are registered for the free three-day live event. check your
                email for the welcome message, then join the masterclass
                community so you have the links, reminders, workbook, and updates
                before day one.
              </p>

              <div className="heroActions">
                <a
                  href={COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="goldButton"
                >
                  join the masterclass community
                  <ArrowIcon />
                </a>
                <a href={LANDING_URL} className="secondaryLink">
                  share the masterclass
                </a>
              </div>
            </div>

            <div className="heroMedia" aria-label="Larry and Staci Wallace">
              <img src="/images/staci-larry-hero-2026.png" alt="Larry and Staci Wallace" />
            </div>
          </div>
        </section>

        <section className="detailsBand">
          <div className="detailsGrid" aria-label="event details">
            {eventDetails.map((item) => (
              <div key={item.label} className="detailItem">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="nextSection">
          <div className="nextInner">
            <div className="sectionIntro">
              <p className="eyebrow red">next steps</p>
              <h2>do these before the masterclass starts.</h2>
            </div>

            <div className="stepsPanel">
              <ol>
                {nextSteps.map((step) => (
                  <li key={step}>
                    <span>
                      <CheckIcon />
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <a
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="darkButton"
              >
                get connected now
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className="communityBand">
          <div className="communityInner">
            <div>
              <p className="eyebrow">inside the community</p>
              <h2>everything stays in one place.</h2>
              <p>
                the community is the home base for live access, resources, and
                updates as the event gets closer.
              </p>
            </div>

            <div className="communityList">
              {communityItems.map((item) => (
                <article key={item.title} className="communityItem">
                  <div className="itemIcon">
                    <CheckIcon />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="shareBand">
          <div className="shareInner">
            <p className="eyebrow red">share the mission</p>
            <h2>invite someone who needs this room.</h2>
            <p>
              if a friend, client, or leader you know is trying to build business
              God's way, send them the masterclass page so they can register too.
            </p>
            <a href={LANDING_URL} className="outlineButton">
              share the masterclass
              <ArrowIcon />
            </a>
          </div>
        </section>

        <footer className="thankFooter">
          <img src="/images/fbf-logo-white.png" alt="Fueled By Fire" />
          <p>Fueled By Fire LLC | Copyright 2020-2026 | All Rights Reserved</p>
          <p>10% of every program fee supports Epiphany Global and EMwomen.</p>
        </footer>
      </main>

      <style>{`
        .thankYouPage {
          min-height: 100vh;
          overflow-x: hidden;
          background: #080808;
          color: #ffffff;
          font-family: 'Work Sans', system-ui, sans-serif;
        }

        .registeredBar {
          min-height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
          padding: 10px 20px;
          background: linear-gradient(90deg, #980000 0%, #cc0000 50%, #980000 100%);
          color: #ffffff;
          font: 800 12px/1.35 'Work Sans', sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .registeredBar span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .thankHero {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(90deg, rgba(8, 8, 8, 0.98) 0%, rgba(8, 8, 8, 0.9) 52%, rgba(8, 8, 8, 0.58) 100%),
            url('/images/hero-ai-bg.png') center/cover no-repeat;
        }

        .heroShell {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1.05fr);
          align-items: stretch;
          max-width: 1240px;
          min-height: calc(100vh - 43px);
          margin: 0 auto;
        }

        .heroCopy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 84px 36px 84px 24px;
        }

        .heroLogo {
          width: 142px;
          height: auto;
          margin-bottom: 44px;
        }

        .eyebrow {
          margin: 0 0 16px;
          color: #bb945a;
          font: 800 12px/1.4 'Work Sans', sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .eyebrow.red {
          color: #cc0000;
        }

        h1,
        h2,
        h3,
        p {
          margin: 0;
        }

        .heroCopy h1 {
          max-width: 720px;
          color: #ffffff;
          font-family: 'Anton', sans-serif;
          font-size: clamp(58px, 9vw, 124px);
          font-weight: 400;
          letter-spacing: 0.01em;
          line-height: 0.9;
          text-transform: uppercase;
        }

        .lead {
          max-width: 620px;
          margin-top: 28px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 18px;
          line-height: 1.75;
        }

        .heroActions {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-top: 38px;
        }

        .goldButton,
        .darkButton,
        .outlineButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 56px;
          border-radius: 6px;
          font: 800 15px/1 'Work Sans', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .goldButton,
        .darkButton {
          border: 0;
          background: linear-gradient(135deg, #c9a55a 0%, #e8d080 45%, #bb945a 100%);
          color: #120800;
          box-shadow: 0 6px 24px rgba(185, 148, 90, 0.45);
          padding: 0 34px;
        }

        .goldButton:hover,
        .darkButton:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(185, 148, 90, 0.5);
        }

        .secondaryLink {
          color: rgba(255, 255, 255, 0.72);
          font: 700 13px/1.4 'Work Sans', sans-serif;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .heroMedia {
          position: relative;
          min-height: calc(100vh - 43px);
          overflow: hidden;
        }

        .heroMedia::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(90deg, #080808 0%, rgba(8, 8, 8, 0) 24%),
            linear-gradient(0deg, #080808 0%, rgba(8, 8, 8, 0) 28%);
          pointer-events: none;
        }

        .heroMedia img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .detailsBand {
          background: #ffffff;
          color: #111111;
          padding: 0 24px;
        }

        .detailsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          max-width: 1040px;
          margin: 0 auto;
          background: #e7e7e7;
        }

        .detailItem {
          min-height: 118px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          background: #ffffff;
          text-align: center;
          padding: 24px 18px;
        }

        .detailItem span {
          color: #cc0000;
          font: 800 11px/1.4 'Work Sans', sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .detailItem strong {
          color: #111111;
          font: 800 20px/1.25 'Work Sans', sans-serif;
        }

        .nextSection {
          background: #ffffff;
          color: #111111;
          padding: 88px 24px;
        }

        .nextInner {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
          gap: 56px;
          align-items: start;
          max-width: 1120px;
          margin: 0 auto;
        }

        .sectionIntro h2,
        .communityInner h2,
        .shareInner h2 {
          font-family: 'Anton', sans-serif;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          line-height: 0.96;
        }

        .sectionIntro h2 {
          max-width: 460px;
          font-size: clamp(38px, 6vw, 72px);
        }

        .stepsPanel {
          border-left: 3px solid #cc0000;
          padding-left: 36px;
        }

        .stepsPanel ol {
          display: grid;
          gap: 18px;
          margin: 0 0 32px;
          padding: 0;
          list-style: none;
        }

        .stepsPanel li {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 14px;
          align-items: start;
          color: #2a2a2a;
          font-size: 17px;
          line-height: 1.65;
        }

        .stepsPanel li span,
        .itemIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #cc0000;
          color: #ffffff;
          flex: 0 0 auto;
        }

        .darkButton {
          min-height: 54px;
        }

        .communityBand {
          background: #080808;
          padding: 96px 24px;
        }

        .communityInner {
          display: grid;
          grid-template-columns: minmax(0, 0.88fr) minmax(380px, 1.12fr);
          gap: 64px;
          align-items: start;
          max-width: 1120px;
          margin: 0 auto;
        }

        .communityInner h2 {
          max-width: 480px;
          font-size: clamp(40px, 6vw, 76px);
          color: #ffffff;
        }

        .communityInner > div > p:not(.eyebrow) {
          max-width: 500px;
          margin-top: 26px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 17px;
          line-height: 1.8;
        }

        .communityList {
          display: grid;
          gap: 22px;
        }

        .communityItem {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 18px;
          padding-bottom: 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .communityItem h3 {
          color: #ffffff;
          font: 800 16px/1.35 'Work Sans', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .communityItem p {
          margin-top: 8px;
          color: rgba(255, 255, 255, 0.66);
          font-size: 15px;
          line-height: 1.7;
        }

        .shareBand {
          background: #f6f6f6;
          color: #111111;
          padding: 92px 24px;
          text-align: center;
        }

        .shareInner {
          max-width: 760px;
          margin: 0 auto;
        }

        .shareInner h2 {
          font-size: clamp(38px, 6vw, 68px);
        }

        .shareInner p {
          max-width: 640px;
          margin: 24px auto 34px;
          color: #444444;
          font-size: 17px;
          line-height: 1.8;
        }

        .outlineButton {
          border: 1px solid #cc0000;
          color: #cc0000;
          padding: 0 30px;
          background: transparent;
        }

        .outlineButton:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(204, 0, 0, 0.16);
        }

        .thankFooter {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: #080808;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 48px 20px;
          text-align: center;
        }

        .thankFooter img {
          width: 132px;
          height: auto;
          margin-bottom: 10px;
        }

        .thankFooter p {
          color: rgba(255, 255, 255, 0.36);
          font-size: 13px;
          line-height: 1.55;
        }

        @media (max-width: 900px) {
          .thankHero {
            padding: 0 !important;
          }

          .detailsBand {
            padding: 0 22px !important;
          }

          .registeredBar {
            gap: 14px;
            font-size: 10px;
            letter-spacing: 0.12em;
          }

          .heroShell,
          .nextInner,
          .communityInner {
            grid-template-columns: 1fr;
          }

          .heroShell {
            min-height: auto;
          }

          .heroCopy {
            padding: 44px 22px 54px;
          }

          .heroLogo {
            width: 118px;
            margin-bottom: 34px;
          }

          .heroMedia {
            min-height: 430px;
            order: -1;
          }

          .heroMedia::before {
            background:
              linear-gradient(0deg, #080808 0%, rgba(8, 8, 8, 0) 36%),
              linear-gradient(180deg, rgba(8, 8, 8, 0.32) 0%, rgba(8, 8, 8, 0) 42%);
          }

          .heroActions {
            align-items: stretch;
            flex-direction: column;
          }

          .goldButton,
          .darkButton,
          .outlineButton {
            width: 100%;
            min-height: 54px;
            padding: 14px 14px;
            font-size: 12px;
            line-height: 1.25;
            text-align: center;
            white-space: normal;
          }

          .secondaryLink {
            text-align: center;
          }

          .detailsGrid {
            grid-template-columns: 1fr;
          }

          .nextSection,
          .communityBand,
          .shareBand {
            padding: 64px 22px !important;
          }

          .stepsPanel {
            border-left: 0;
            padding-left: 0;
          }
        }

        @media (max-width: 520px) {
          .registeredBar span:nth-child(2),
          .registeredBar span:nth-child(3) {
            display: none;
          }

          .heroMedia {
            min-height: 360px;
          }

          .lead,
          .shareInner p,
          .communityInner > div > p:not(.eyebrow) {
            font-size: 16px;
          }

          .detailItem {
            min-height: 96px;
          }
        }
      `}</style>
    </>
  );
}
