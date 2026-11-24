import type { Metadata } from "next";
import WorkshopLanding from "./WorkshopLanding";
const title = "Build Without Borrowing | Kingdom Intelligence Workshop";
const description = "Build Without Borrowing with Payton Wallace. A workshop for Kingdom entrepreneurs on wise counsel, trusted relationships, and resources already in your hands.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://www.kingdomintel.com/workshop" },
  robots: { index: false, follow: false },
  openGraph: { title, description, url: "https://www.kingdomintel.com/workshop", siteName: "Kingdom Intel", type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};
export default function WorkshopPage() { return <WorkshopLanding />; }
