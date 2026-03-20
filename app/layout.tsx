import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kingdom Intelligence Masterclass | Fueled By Fire",
  description:
    "Free 3-day live online event for faith-driven business owners. April 14-16, 2026. Learn the Kingdom Intelligence Framework to scale your company God's way.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;700;900&family=Work+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0; padding: 0;
  font-family: 'Work Sans', system-ui, 'Helvetica Neue', Arial, sans-serif;
  background-color: #FFFFFF;
  color: #111111;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
h1, h2, h3, h4 {
  font-family: 'Frank Ruhl Libre', Georgia, serif;
}
a { color: inherit; text-decoration: none; }

/* Scroll Reveal */
.section-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.section-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hero — no reveal delay, animate on load */
.hero-reveal {
  animation: fadeInUp 0.9s ease both;
}

/* CTA Button */
.cta-btn {
  transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
}
.cta-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 10px 36px rgba(185,148,90,0.5);
}

/* Testimonial Cards */
.testimonial-card {
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}
.testimonial-card:hover {
  transform: translateY(-6px);
  border-color: rgba(204,0,0,0.4) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}

/* Animations */
@keyframes shimmerText {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── MOBILE: 768px and below ── */
@media (max-width: 768px) {

  /* ── HERO ── */
  .hero-split { flex-direction: column !important; min-height: auto !important; height: auto !important; }
  .hero-content-row { flex-direction: column !important; min-height: auto !important; }
  .hero-right { flex: none !important; width: 100% !important; height: 380px !important; min-height: 380px !important; order: -1; }
  .hero-photo { object-position: center 20% !important; }
  .hero-left { flex: none !important; width: 100% !important; padding: 28px 20px 48px !important; min-height: auto !important; }
  /* Logo bar sits above photo on mobile */
  .hero-logo-bar { position: relative !important; padding: 20px 20px 0 !important; background: #0a0a0a; }
  .hero-logo { height: 40px !important; }
  /* Hero H1 needs a floor */
  .hero-reveal h1 { font-size: 40px !important; line-height: 1.0 !important; }

  /* ── CTA BUTTON — full width on mobile ── */
  .cta-wrapper { display: flex !important; flex-direction: column !important; align-items: stretch !important; width: 100% !important; }
  .cta-btn { width: 100% !important; text-align: center !important; padding: 16px 20px !important; font-size: 16px !important; box-sizing: border-box !important; }

  /* ── SECTION PADDING ── */
  section { padding-top: 56px !important; padding-bottom: 56px !important; padding-left: 0 !important; padding-right: 0 !important; }
  section > div { padding-left: 20px !important; padding-right: 20px !important; }

  /* ── EVENT DETAILS ── */
  .event-details-row { flex-direction: column !important; gap: 20px !important; align-items: center !important; }

  /* ── ECHO GRID — 2x2 ── */
  .echo-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .echo-detail { padding: 24px 20px !important; }

  /* ── INVITATION SPLIT ── */
  .invitation-split { flex-direction: column !important; min-height: auto !important; }
  .invitation-photo { flex: none !important; width: 100% !important; min-height: 320px !important; max-height: 360px !important; position: relative !important; }
  .invitation-content { flex: none !important; width: 100% !important; padding: 36px 20px 48px !important; }
  .invitation-content > div { max-width: 100% !important; }

  /* ── WARRIORS BANNER ── */
  .warriors-quote { font-size: 26px !important; }

  /* ── ABOUT STACI ── */
  .about-flex { flex-direction: column !important; align-items: center !important; gap: 24px !important; }
  .about-photo { width: 100% !important; max-width: 320px !important; }

  /* ── GRIDS ── */
  .learn-grid { grid-template-columns: 1fr !important; }
  .testimonial-grid-4 { grid-template-columns: 1fr !important; }
  .slider-grid { grid-template-columns: 1fr !important; }
  .prep-grid { grid-template-columns: 1fr !important; }

  /* ── SLIDER PHOTO HEIGHT ── */
  .slider-photo { height: 180px !important; }

  /* ── MODAL ── */
  .modal-name-grid { grid-template-columns: 1fr !important; }
  .modal-inner { padding: 32px 20px !important; }
}

/* ── TABLET: 769px – 1024px ── */
@media (min-width: 769px) and (max-width: 1024px) {
  .hero-left { padding: 100px 32px 60px 5vw !important; }
  .learn-grid { grid-template-columns: 1fr 1fr !important; }
  .about-photo { width: 300px !important; }
  .echo-grid { grid-template-columns: repeat(4, 1fr) !important; }
}
`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
