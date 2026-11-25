import type { Metadata } from "next";
import WorkshopLanding from "./WorkshopLanding";
const title = "Build Without Borrowing | Kingdom Intelligence Workshop";
const description = "Debt shouldn’t stop your God-sized vision. Join Payton Wallace for Build Without Borrowing, a workshop for Kingdom entrepreneurs.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://www.kingdomintel.com/workshop" },
  robots: { index: false, follow: false },
  openGraph: { title, description, url: "https://www.kingdomintel.com/workshop", siteName: "Kingdom Intel", type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};
export default function WorkshopPage() { return <WorkshopLanding />; }
