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
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Frank+Ruhl+Libre:wght@400;700;900&family=Work+Sans:wght@400;500;600;700;800&display=swap"
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

/* ── HERO BASE STYLES ── */
.hero-section {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.hero-logo-bar {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  z-index: 10;
  padding: 28px 5vw;
}
.hero-logo {
  height: 56px;
  width: auto;
  display: block;
}
.hero-content-row {
  display: flex;
  flex: 1;
  min-height: 100vh;
}
.hero-photo-col {
  flex: 0 0 48%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}
.hero-photo {
  width: 100%;
  height: 115%;
  object-fit: cover;
  object-position: center 8%;
  position: absolute;
  top: 0; left: 0;
}
.hero-text-col {
  flex: 0 0 52%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 120px 5vw 80px 0;
}
.hero-event-bar {
  display: flex;
  gap: 40px;
  margin-top: 48px;
  padding-top: 28px;
  border-top: 1px solid rgba(255,255,255,0.12);
  flex-wrap: wrap;
}

/* ── MOBILE: 768px and below ── */
@media (max-width: 768px) {

  /* ── TOP BANNER ── */
  .top-banner-text { font-size: 11px !important; letter-spacing: 0.12em !important; }

  /* ── HERO — stack vertically, photo on top ── */
  .hero-section { min-height: auto; }
  .hero-logo-bar { position: relative; top: auto; left: auto; width: 100%; padding: 20px 20px 0; background: #0d0d0d; }
  .hero-logo { height: 36px; }
  .hero-content-row { flex-direction: column; min-height: auto; }
  .hero-photo-col { flex: none; width: 100%; height: 420px; min-height: 420px; position: relative; }
  .hero-photo { object-fit: cover; object-position: center top; position: absolute; width: 100%; height: 100%; }
  /* On mobile: change right-fade overlay to bottom-fade so photo is visible */
  .hero-photo-col > div { background: linear-gradient(to bottom, transparent 55%, #0d0d0d 100%) !important; }
  /* On mobile: lighten the big diagonal overlay so photo isn't buried */
  .hero-section > div:first-child { background: linear-gradient(180deg, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.15) 50%, rgba(13,13,13,0.6) 100%) !important; }
  .hero-text-col { flex: none; width: 100%; padding: 36px 24px 52px; align-items: flex-start; text-align: left; }
  .hero-event-bar { gap: 20px; margin-top: 32px; }

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
        {/* Facebook Pixel */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '386045455794262');
          fbq('track', 'PageView');
        `}} />
        <noscript><img height="1" width="1" style={{display:"none"}} src="https://www.facebook.com/tr?id=386045455794262&ev=PageView&noscript=1" /></noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
