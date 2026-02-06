import type { Metadata } from "next";
import WatchHero from "@/components/WatchHero";
import StreamInfo from "@/components/StreamInfo";
import ChatPanel from "@/components/ChatPanel";
import EventsPanel from "@/components/EventsPanel";
import ClipsVODsSection from "@/components/ClipsVODsSection";

export const metadata: Metadata = {
  title: "Watch Live",
  description:
    "Watch Prozilli Gaming live on Twitch, YouTube, Kick, Trovo, and Facebook. Multiplatform streaming with chat, clips, and VODs. Catch the stream now.",
  keywords: [
    "Prozilli Gaming live",
    "watch Prozilli stream",
    "Twitch live stream",
    "multiplatform gaming",
    "live gaming content",
  ],
  openGraph: {
    title: "Watch Live | Prozilli Gaming",
    description:
      "Watch Prozilli Gaming live across all platforms. Multiplatform streaming with integrated chat and real-time events.",
    type: "website",
    url: "https://prozilligaming.com/watch",
    images: [
      {
        url: "/images/heroes/hero-watch.png",
        width: 1200,
        height: 630,
        alt: "Watch Prozilli Gaming Live",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch Live | Prozilli Gaming",
    description: "Watch Prozilli Gaming live on Twitch, YouTube, Kick, and more.",
    images: ["/images/heroes/hero-watch.png"],
  },
  alternates: {
    canonical: "https://prozilligaming.com/watch",
  },
};

const SECONDARY_PLATFORMS = [
  {
    name: "YouTube",
    href: "https://youtube.com/@prozilligaming",
    description: "VODs, highlights, and premieres",
  },
  {
    name: "Kick",
    href: "https://kick.com/ProzilliGaming",
    description: "Alternate live stream",
  },
  {
    name: "Trovo",
    href: "https://trovo.live/ProzilliGaming",
    description: "Community streams",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/ProzilliGaming",
    description: "Facebook Gaming live",
  },
];


export default function WatchPage() {
  return (
    <>
      {/* Dynamic Hero with live status */}
      <WatchHero />

      {/* Stream + Chat + Events Layout */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-4">
          {/* Left Column: Video + Events */}
          <div className="w-full lg:w-[68%] lg:flex-shrink-0 flex flex-col">
            {/* Video Player */}
            <div className="glass-strong glow-border overflow-hidden rounded-xl">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://player.twitch.tv/?channel=ProzilliGaming&parent=prozilligaming.com"
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                  title="Prozilli Gaming Twitch Stream"
                />
              </div>
            </div>

            {/* Stream Info Bar - live status, title, viewers */}
            <StreamInfo />

            {/* Recent Events Panel - Multiplatform */}
            <div className="mt-4">
              <EventsPanel />
            </div>
          </div>

          {/* Right Column: Chat - matches video + events height */}
          <div className="w-full lg:flex-1 mt-4 lg:mt-0 min-h-[400px] lg:min-h-0">
            <ChatPanel />
          </div>
        </div>
      </section>

      {/* Secondary Platforms */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
          Also Streaming On
        </h2>
        <p className="mb-8 text-sm text-muted">
          Same energy, every platform. Pick your poison.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECONDARY_PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glow-border group rounded-lg p-6 transition-all"
            >
              <h3 className="text-lg font-semibold tracking-wide text-white transition-colors group-hover:text-brand-red">
                {platform.name}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {platform.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* VODs & Clips - fetched from PRISMAI/Twitch */}
      <ClipsVODsSection />
    </>
  );
}
