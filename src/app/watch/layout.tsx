import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch ProzilliGaming — Live on 9 Platforms",
  description:
    "Watch ProzilliGaming stream live on Twitch, YouTube, Kick, TikTok, X, Instagram, Facebook, Trovo, and Discord simultaneously. PRISMAI-powered multi-platform streaming with LISA AI in every chat.",
  openGraph: {
    title: "Watch ProzilliGaming — Live on 9 Platforms",
    description:
      "Multi-platform live streaming powered by PRISMAI. Same stream, 9 platforms, LISA in every chat.",
    url: "https://prozilligaming.com/watch",
    images: [{ url: "/images/heroes/hero-watch.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch ProzilliGaming — Live on 9 Platforms",
    description:
      "Multi-platform live streaming powered by PRISMAI. Same stream, 9 platforms, LISA in every chat.",
  },
};

const watchJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "ProzilliGaming Live Stream",
  "description":
    "Live multi-platform stream by ProzilliGaming across Twitch, YouTube, Kick, TikTok, X, Instagram, Facebook, Trovo, and Discord. Powered by PRISMAI with LISA AI chat integration.",
  "thumbnailUrl": "https://prozilligaming.com/images/heroes/hero-watch.webp",
  "uploadDate": "2025-01-01T00:00:00Z",
  "publication": {
    "@type": "BroadcastEvent",
    "isLiveBroadcast": true,
  },
  "embedUrl": "https://player.twitch.tv/?channel=ProzilliGaming",
  "potentialAction": {
    "@type": "WatchAction",
    "target": "https://twitch.tv/ProzilliGaming",
  },
};

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(watchJsonLd) }}
      />
      {children}
    </>
  );
}
