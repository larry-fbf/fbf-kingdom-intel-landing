import type { Metadata } from "next";
import WorkshopLanding from "./WorkshopLanding";
const title = "Build Without Borrowing | Kingdom Intelligence Workshop";
const description = "A God-sized vision shouldn’t feel out of reach because of debt. Join Payton Wallace for Build Without Borrowing, a workshop for Kingdom entrepreneurs.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://www.kingdomintel.com/workshop" },
  robots: { index: false, follow: false },
  openGraph: { title, description, url: "https://www.kingdomintel.com/workshop", siteName: "Kingdom Intel", type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};
export default function WorkshopPage() { return <WorkshopLanding />; }
