import type { Metadata } from "next";
import VIPUpsellPage from "./VIPUpsellPage";

export const metadata: Metadata = {
  title: "VIP Upgrade | Kingdom Intelligence Masterclass",
  description:
    "Upgrade to VIP for the September 16th and 17th VIP rooms and FBF Vault recordings for the Kingdom Intelligence Masterclass.",
  alternates: {
    canonical: "https://www.kingdomintel.com/vip",
  },
  openGraph: {
    title: "VIP Mastermind | Kingdom Intelligence Masterclass",
    description:
      "Exclusive VIP access with Larry and Staci Wallace for the Kingdom Intelligence Masterclass.",
    url: "https://www.kingdomintel.com/vip",
    type: "website",
    images: [
      {
        url: "https://www.kingdomintel.com/images/vip-mastermind-og.jpg",
        width: 1620,
        height: 1620,
        alt: "VIP Mastermind Exclusive Access with Staci and Larry Wallace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIP Mastermind | Kingdom Intelligence Masterclass",
    description:
      "Exclusive VIP access with Larry and Staci Wallace for the Kingdom Intelligence Masterclass.",
    images: ["https://www.kingdomintel.com/images/vip-mastermind-og.jpg"],
  },
};

export default function VIPPage() {
  return <VIPUpsellPage />;
}
