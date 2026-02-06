import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect Platforms",
  description:
    "Connect your streaming platforms to PRISMAI. Authorize Twitch, YouTube, Kick, Trovo, Discord, and more for unified analytics and cross-platform features.",
  keywords: [
    "PRISMAI connect",
    "streaming platform OAuth",
    "Twitch authorization",
    "multiplatform streaming",
    "cross-platform analytics",
  ],
  openGraph: {
    title: "Connect Platforms | Prozilli Gaming",
    description:
      "Connect your accounts to PRISMAI for unified cross-platform streaming analytics and features.",
    type: "website",
    url: "https://prozilligaming.com/connect",
  },
  twitter: {
    card: "summary",
    title: "Connect Platforms | Prozilli Gaming",
    description: "Connect streaming platforms to PRISMAI for cross-platform features.",
  },
  alternates: {
    canonical: "https://prozilligaming.com/connect",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
