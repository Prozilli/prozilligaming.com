import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Tips — Fuel the Prozilli Ecosystem",
  description:
    "Support ProzilliGaming with tips via PayPal, VIP memberships, and platform subscriptions. Three VIP tiers with exclusive perks in ZO Syndicate RP, priority LISA interactions, and merch drops.",
  openGraph: {
    title: "Support & Tips — Fuel the Prozilli Ecosystem",
    description:
      "Support ProzilliGaming with tips, VIP memberships, and platform subscriptions. Exclusive perks and transparency.",
    url: "https://prozilligaming.com/support",
    images: [{ url: "/images/heroes/hero-support.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support & Tips — Fuel the Prozilli Ecosystem",
    description:
      "Support ProzilliGaming with tips, VIP memberships, and platform subscriptions.",
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
