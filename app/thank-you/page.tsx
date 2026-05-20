import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "You Are Registered | Kingdom Intelligence Masterclass",
  description:
    "Confirmation and next steps for the Kingdom Intelligence Masterclass.",
};

const COMMUNITY_URL =
  "https://vault.fbfmastery.com/join?invitation_token=b0c8c0451f281ece962ad9e00e5c739000d5e1b9-e61c108d-7479-4d7b-8079-f258420879bb";

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

function VimeoWelcomeVideo() {
  return (
    <div className="welcomeVideo" aria-label="KIM Final Registration Welcome">
      <iframe
        src="https://player.vimeo.com/video/1194072208?badge=0&autopause=0&player_id=0&app_id=58479"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title="KIM Final Registration Welcome"
      />
    </div>
  );
}

export default function ThankYou() {
  return (
    <>
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
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
            <span>12:00 pm cst</span>
            <span>free live online event</span>
          </div>

          <div className="heroShell">
            <div className="heroCopy">
              <img
                src="/images/fbf-logo-white.png"
                alt="Fueled By Fire"
                className="heroLogo"
              />
              <p className="eyebrow">welcome to the masterclass community</p>
              <h1>congratulations, you're registered.</h1>
              <p className="subhead">one more step before you go.</p>

              <VimeoWelcomeVideo />

              <div className="confirmationCopy">
                <p>
                  Make sure to <strong>check your email</strong> for a welcome
                  message from Staci with everything you need. Check spam or
                  promotions if you do not see it.
                </p>
                <p>
                  Join the <strong>Masterclass Community</strong>, the home base
                  for live session access, updates, chat, replays, and workbook
                  resources during the Kingdom Intelligence Masterclass.
                </p>
              </div>

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
              </div>
            </div>
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
          gap: 24px;
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
          min-height: 100vh;
          overflow: hidden;
          background:
            linear-gradient(90deg, rgba(8, 8, 8, 0.96) 0%, rgba(8, 8, 8, 0.9) 50%, rgba(8, 8, 8, 0.98) 100%),
            url('/images/hero-ai-bg.png') center/cover no-repeat;
        }

        .heroShell {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 980px;
          min-height: calc(100vh - 43px);
          margin: 0 auto;
          padding: 72px 24px 76px;
        }

        .heroCopy {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          text-align: center;
        }

        .heroLogo {
          width: 132px;
          height: auto;
          margin-bottom: 36px;
        }

        .eyebrow {
          margin: 0 0 14px;
          color: #bb945a;
          font: 800 11px/1.4 'Work Sans', sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        h1,
        p {
          margin: 0;
        }

        .heroCopy h1 {
          max-width: 780px;
          color: #ffffff;
          font-family: 'Anton', sans-serif;
          font-size: clamp(46px, 7.4vw, 92px);
          font-weight: 400;
          letter-spacing: 0.01em;
          line-height: 0.92;
          text-transform: uppercase;
        }

        .subhead {
          margin-top: 10px;
          color: #cc0000;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(22px, 3vw, 35px);
          font-weight: 900;
          line-height: 1.1;
        }

        .welcomeVideo {
          position: relative;
          width: min(100%, 700px);
          margin-top: 24px;
          padding-top: min(75%, 525px);
          overflow: hidden;
          border: 1px solid rgba(187, 148, 90, 0.34);
          border-radius: 6px;
          background: #000000;
          box-shadow: 0 18px 54px rgba(0, 0, 0, 0.45);
        }

        .welcomeVideo iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .confirmationCopy {
          display: grid;
          gap: 16px;
          max-width: 680px;
          margin-top: 22px;
        }

        .confirmationCopy p {
          color: rgba(255, 255, 255, 0.72);
          font-size: 15px;
          line-height: 1.75;
        }

        .confirmationCopy strong {
          color: #ffffff;
          font-weight: 800;
        }

        .heroActions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .goldButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 56px;
          border: 0;
          border-radius: 6px;
          background: linear-gradient(135deg, #c9a55a 0%, #e8d080 45%, #bb945a 100%);
          color: #120800;
          box-shadow: 0 6px 24px rgba(185, 148, 90, 0.45);
          padding: 0 34px;
          font: 800 15px/1 'Work Sans', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .goldButton:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(185, 148, 90, 0.5);
        }

        .thankFooter {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: #080808;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 36px 20px;
          text-align: center;
        }

        .thankFooter img {
          width: 118px;
          height: auto;
          margin-bottom: 8px;
        }

        .thankFooter p {
          color: rgba(255, 255, 255, 0.36);
          font-size: 13px;
          line-height: 1.55;
        }

        @media (max-width: 980px) {
          .heroShell {
            min-height: auto;
            padding: 52px 22px 60px;
          }

          .heroCopy {
            padding: 0;
          }

          .heroLogo {
            width: 112px;
            margin-bottom: 30px;
          }

          .heroActions {
            width: 100%;
            align-items: stretch;
            flex-direction: column;
          }

          .goldButton {
            width: 100%;
            min-height: 54px;
            padding: 14px 14px;
            font-size: 12px;
            line-height: 1.25;
            text-align: center;
            white-space: normal;
          }
        }

        @media (max-width: 620px) {
          .thankHero {
            min-height: auto;
            padding: 0 !important;
          }

          .registeredBar {
            gap: 10px;
            font-size: 10px;
            letter-spacing: 0.12em;
          }

          .registeredBar span:nth-child(n + 3) {
            display: none;
          }

          .heroCopy h1 {
            max-width: 100%;
            font-size: clamp(34px, 11.4vw, 46px);
            line-height: 0.98;
            letter-spacing: 0;
          }

          .subhead {
            font-size: 23px;
          }

          .welcomeVideo {
            width: 100%;
            margin-top: 20px;
          }

          .confirmationCopy p {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}
