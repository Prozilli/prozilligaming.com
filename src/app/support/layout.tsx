import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support Prozilli Gaming with memberships, tips, and subscriptions. Join the Supporter, VIP, or Producer tier for exclusive perks and behind-the-scenes access.",
  keywords: [
    "support Prozilli Gaming",
    "Prozilli membership",
    "streamer tips",
    "Twitch subscription",
    "YouTube membership",
  ],
  openGraph: {
    title: "Support | Prozilli Gaming",
    description:
      "Support the stream with memberships and tips. Unlock exclusive perks and help fuel better content.",
    type: "website",
    url: "https://prozilligaming.com/support",
    images: [
      {
        url: "/images/heroes/hero-support.png",
        width: 1200,
        height: 630,
        alt: "Support Prozilli Gaming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support | Prozilli Gaming",
    description: "Support Prozilli Gaming with memberships, tips, and subscriptions.",
    images: ["/images/heroes/hero-support.png"],
  },
  alternates: {
    canonical: "https://prozilligaming.com/support",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
