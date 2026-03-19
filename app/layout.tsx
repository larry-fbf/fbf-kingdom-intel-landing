import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kingdom Intelligence Master Class | Fueled By Fire",
  description:
    "Free 3-day live online event for faith-driven business owners. April 14-16, 2026. Learn to combine Spirit-led discernment with AI and systems to scale your company.",
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
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(201,165,90,0.3); }
  50% { box-shadow: 0 0 40px rgba(201,165,90,0.6); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes countPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes strokeDraw {
  from { stroke-dashoffset: 50; }
  to { stroke-dashoffset: 0; }
}
@keyframes gentleBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.nav-link { position: relative; text-decoration: none; color: #C8C8C8; font-size: 14px; font-weight: 500; transition: color 0.3s; }
.nav-link:hover { color: #E8C070; }
.nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #C9A55A; transition: width 0.3s; }
.nav-link:hover::after { width: 100%; }

.fbf-logo { display: inline-block; font-weight: 700; font-size: 20px; letter-spacing: 3px; color: #C9A55A; background: linear-gradient(90deg, #C9A55A, #E8C070, #C9A55A); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.fbf-logo:hover { animation: shimmer 2s linear infinite; }

.hero-cta { animation: pulse 3s ease-in-out infinite; }

.glass-card-hover { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
.glass-card-hover:hover { transform: scale(1.02); border-color: rgba(201,165,90,0.3) !important; box-shadow: 0 8px 32px rgba(201,165,90,0.15); }

.testimonial-card { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
.testimonial-card:hover { transform: translateY(-8px); border-color: rgba(201,165,90,0.3) !important; box-shadow: 0 12px 40px rgba(201,165,90,0.2); }

.feature-col { position: relative; }
.feature-col::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #C9A55A, #E8C070); transition: width 0.4s ease; }
.feature-col:hover::after { width: 60px; }

.final-cta-btn { transition: all 0.3s ease; }
.final-cta-btn:hover { background: #C9A55A !important; color: #0d0d0d !important; }

.section-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease-out, transform 0.7s ease-out; }
.section-reveal.visible { opacity: 1; transform: translateY(0); }
`,
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          backgroundColor: "#0d0d0d",
          color: "#FFFFFF",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
      </body>
    </html>
  );
}
