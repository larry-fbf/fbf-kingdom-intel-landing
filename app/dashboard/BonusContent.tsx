export default function BonusContent() {
  return (
    <section className="dashboard-bonus" aria-labelledby="bonus-heading">
      <style>{`
        .dashboard-bonus { background: #080808; padding: 0 0 64px; color: #fff; }
        .dashboard-bonus .bonus-heading {
          margin: 0 0 20px; color: #fff;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(26px, 3vw, 38px); font-weight: 900; line-height: 1.1;
        }
        .dashboard-bonus .bonus-card {
          display: grid; grid-template-columns: minmax(0, 338px) minmax(0, 1fr);
          align-items: center; gap: clamp(28px, 5vw, 72px);
          padding: 32px; min-width: 0;
          border: 1px solid #292929; border-radius: 8px; background: #101010;
        }
        .dashboard-bonus .bonus-media { min-width: 0; width: 100%; max-width: 338px; margin: 0 auto; }
        /* Vimeo reports 2160 × 3840. Preserve the whole frame and native controls. */
        .dashboard-bonus iframe { display: block; width: 100%; aspect-ratio: 9 / 16; border: 0; border-radius: 5px; background: #080808; }
        .dashboard-bonus .bonus-copy { min-width: 0; max-width: 580px; overflow-wrap: anywhere; }
        .dashboard-bonus .bonus-title {
          margin: 0 0 20px; color: #fff;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(30px, 3.4vw, 46px); font-weight: 900; line-height: 1.1;
        }
        .dashboard-bonus .bonus-description { margin: 0; color: #ccc; font-size: 16px; line-height: 1.7; }
        .dashboard-bonus .bonus-resource { margin-top: 32px; padding-top: 28px; border-top: 1px solid #333; }
        .dashboard-bonus .bonus-pdf { margin: 0 0 8px; color: #fff; font-size: 18px; font-weight: 800; line-height: 1.4; }
        .dashboard-bonus .bonus-download {
          display: inline-flex; align-items: center; justify-content: center;
          margin-top: 22px; max-width: 100%; min-height: 52px; padding: 14px 24px;
          border-radius: 5px; background: #cc0000; color: #fff;
          font-size: 14px; font-weight: 800; line-height: 1.5; text-align: center; text-decoration: none;
        }
        .dashboard-bonus .bonus-download:hover { background: #ad0000; }
        .dashboard-bonus .bonus-download:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
        .dashboard-bonus .bonus-file-detail { margin: 12px 0 0; color: #aaa; font-size: 13px; line-height: 1.5; }
        @media (max-width: 720px) {
          .dashboard-bonus { padding-bottom: 40px; }
          .dashboard-bonus .bonus-card { grid-template-columns: minmax(0, 1fr); gap: 28px; padding: 20px; }
          .dashboard-bonus .bonus-copy { max-width: none; }
          .dashboard-bonus .bonus-title { font-size: 30px; }
          .dashboard-bonus .bonus-resource { margin-top: 24px; padding-top: 24px; }
          .dashboard-bonus .bonus-download { width: 100%; padding: 14px 16px; }
        }
      `}</style>
      <div className="dashboard-wrap">
        <h2 id="bonus-heading" className="bonus-heading">Bonus Content</h2>
        <article className="bonus-card" aria-labelledby="bonus-video-title">
          <div className="bonus-media">
            <iframe
              src="https://player.vimeo.com/video/1242889325?h=89d8926d2a"
              title="The Five Phases of Business"
              loading="lazy"
              allow="fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="bonus-copy">
            <h3 id="bonus-video-title" className="bonus-title">The Five Phases of Business</h3>
            <p className="bonus-description">Explore the five phases of business mastery, from Survival Mode to Legacy Builder.</p>
            <div className="bonus-resource">
              <p className="bonus-pdf">3 Step Clarity Roadmap</p>
              <p className="bonus-description">Identify your current business phase, reflect on your E.C.H.O. bottleneck, and clarify your next move.</p>
              <a href="/downloads/3-step-clarity-roadmap.pdf" download="3-step-clarity-roadmap.pdf" className="bonus-download">Download the Clarity Roadmap (PDF)</a>
              <p className="bonus-file-detail">6-page PDF · Kingdom Intelligence Masterclass</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
