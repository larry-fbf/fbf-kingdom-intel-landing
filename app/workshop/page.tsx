import type { Metadata } from "next";
import WorkshopLanding from "./WorkshopLanding";

const workshopOgImage =
  "https://www.kingdomintel.com/images/kingdom-intel-workshop-og.jpg?v=20260811-called-stuck";
const workshopTitle =
  "Called but Stuck? | Kingdom Intel Workshop | Aug 18th 11am CT";

export const metadata: Metadata = {
  title: workshopTitle,
  description:
    "A free live workshop for Kingdom CEOs who are working hard and not gaining traction. Tuesday, August 18 at 11am CT / 12pm ET.",
  alternates: {
    canonical: "https://www.kingdomintel.com/workshop",
  },
  openGraph: {
    title: workshopTitle,
    description:
      "Clarify what needs attention now, choose one clear next move, and leave with a 7-Day Action Plan.",
    url: "https://www.kingdomintel.com/workshop",
    siteName: "Kingdom Intel",
    images: [
      {
        url: workshopOgImage,
        width: 1200,
        height: 630,
        alt: workshopTitle,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: workshopTitle,
    description:
      "A free live workshop for Kingdom CEOs who are working hard and not gaining traction.",
    images: [workshopOgImage],
  },
};

export default function WorkshopPage() {
  return <WorkshopLanding />;
}
