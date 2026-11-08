export default function BonusContent() {
  return (
    <section className="dashboard-bonus" aria-labelledby="bonus-heading">
      <style>{`
        .dashboard-bonus { background: #f4f2ee; padding: 48px 0; }
        .dashboard-bonus .bonus-heading {
          margin: 0 0 20px; color: #cc0000;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(26px, 3vw, 38px); font-weight: 900; line-height: 1.1;
        }
        .dashboard-bonus .bonus-card {
          max-width: 860px; min-width: 0; overflow: hidden;
          border: 1px solid #ddd8ce; border-top: 3px solid #cc0000;
          border-radius: 8px; background: #fff;
        }
        .dashboard-bonus .bonus-copy { padding: 22px; overflow-wrap: anywhere; }
        .dashboard-bonus .bonus-title {
          margin: 0 0 10px; color: #121212;
          font-family: 'Frank Ruhl Libre', Georgia, serif;
          font-size: clamp(24px, 2.4vw, 32px); font-weight: 900; line-height: 1.15;
        }
        .dashboard-bonus .bonus-pdf { margin: 0; color: #555; font-size: 14px; line-height: 1.5; }
        .dashboard-bonus iframe { display: block; width: 100%; aspect-ratio: 16 / 9; border: 0; background: #080808; }
      `}</style>
      <div className="dashboard-wrap">
        <h2 id="bonus-heading" className="bonus-heading">Bonus Content</h2>
        <article className="bonus-card" aria-labelledby="bonus-video-title">
          <div className="bonus-copy">
            <h3 id="bonus-video-title" className="bonus-title">The Five Phases of Business</h3>
            <p className="bonus-pdf">PDF coming soon</p>
          </div>
          <iframe
            src="https://player.vimeo.com/video/1242889325?h=89d8926d2a"
            title="The Five Phases of Business"
            loading="lazy"
            allow="fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </article>
      </div>
    </section>
  );
}
