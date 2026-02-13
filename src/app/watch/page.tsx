import type { Metadata } from "next";
import StreamInfo from "@/components/StreamInfo";
import ChatPanel from "@/components/ChatPanel";
import EventsPanel from "@/components/EventsPanel";
import ClipsVODsSection from "@/components/ClipsVODsSection";
import SectionLabel from "@/components/ui/SectionLabel";
import PlatformBadge from "@/components/ui/PlatformBadge";

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
  { name: "YouTube", href: "https://youtube.com/@prozilligaming", description: "VODs, highlights, and premieres" },
  { name: "Kick", href: "https://kick.com/ProzilliGaming", description: "Alternate live stream" },
  { name: "Trovo", href: "https://trovo.live/ProzilliGaming", description: "Community streams" },
  { name: "Facebook", href: "https://facebook.com/ProzilliGaming", description: "Facebook Gaming live" },
];

export default function WatchPage() {
  return (
    <>
      {/* Stream + Chat Layout */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Stream Info Bar */}
        <StreamInfo />

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-stretch">
          {/* Left Column: Video + Events */}
          <div className="flex w-full flex-col lg:w-[68%] lg:flex-shrink-0">
            {/* Video Player */}
            <div className="panel-raised overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://player.twitch.tv/?channel=ProzilliGaming&parent=prozilligaming.com"
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                  title="Prozilli Gaming Twitch Stream"
                />
              </div>
            </div>

            {/* Events */}
            <div className="mt-4">
              <EventsPanel />
            </div>
          </div>

          {/* Right Column: Chat */}
          <div className="min-h-[400px] w-full lg:mt-0 lg:min-h-0 lg:flex-1">
            <ChatPanel />
          </div>
        </div>
      </section>

      {/* Also Streaming On */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionLabel color="red">Also Streaming On</SectionLabel>
        <p className="text-body mt-2">Same energy, every platform.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECONDARY_PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="panel-interactive p-5"
            >
              <PlatformBadge name={p.name} connected />
              <p className="text-body mt-2">{p.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Clips & VODs */}
      <ClipsVODsSection />
    </>
  );
}
