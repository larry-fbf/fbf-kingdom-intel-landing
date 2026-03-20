import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kingdom Intelligence Master Class | Fueled By Fire",
  description:
    "Free 3-day live online event for faith-driven business owners. April 14-16, 2026. Learn the Kingdom Intelligence Framework to scale your company God's way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0; padding: 0;
  font-family: system-ui, 'Helvetica Neue', Arial, sans-serif;
  background-color: #FFFFFF;
  color: #111111;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
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

/* CTA Button */
.cta-btn {
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
}
.cta-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(204,0,0,0.3);
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
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(204,0,0,0); }
  50% { box-shadow: 0 0 30px 8px rgba(204,0,0,0.25); }
}
@keyframes gentleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Navbar link hover */
.nav-register:hover {
  background: #AA0000 !important;
}

/* Hero split responsive */
@media (max-width: 768px) {
  .hero-split { flex-direction: column !important; }
  .hero-left { flex: none !important; width: 100% !important; padding: 40px 24px !important; }
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
