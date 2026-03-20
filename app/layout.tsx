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
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(187,148,90,0.3); }
  50% { box-shadow: 0 0 40px rgba(187,148,90,0.6); }
}
@keyframes strokeDraw {
  from { stroke-dashoffset: 50; }
  to { stroke-dashoffset: 0; }
}
.section-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease-out, transform 0.7s ease-out; }
.section-reveal.visible { opacity: 1; transform: translateY(0); }
.cta-btn { transition: all 0.3s ease; }
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(187,148,90,0.5) !important; }
.testimonial-card { transition: transform 0.3s ease, border-color 0.3s ease; }
.testimonial-card:hover { transform: translateY(-6px); border-color: rgba(187,148,90,0.4) !important; }
`,
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "system-ui, 'Helvetica Neue', Arial, sans-serif",
          backgroundColor: "#0a0a0a",
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
