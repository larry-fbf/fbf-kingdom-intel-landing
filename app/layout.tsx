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

/* Hero split responsive */
@media (max-width: 768px) {
  .hero-split { flex-direction: column !important; }
  .hero-left { flex: none !important; width: 100% !important; padding: 100px 24px 40px !important; }
  .hero-right { flex: none !important; width: 100% !important; height: 360px !important; min-height: 360px !important; }
}

/* Checklist grid responsive */
@media (max-width: 700px) {
  .learn-grid { grid-template-columns: 1fr !important; }
  .about-flex { flex-direction: column !important; align-items: center !important; }
  .about-photo { max-width: 320px !important; }
  .testimonial-grid-4 { grid-template-columns: 1fr !important; }
}
`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
