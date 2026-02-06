import type { Metadata } from "next";
import Link from "next/link";
import ChatPanel from "@/components/ChatPanel";
import EventsPanel from "@/components/EventsPanel";
import ClipsVODsSection from "@/components/ClipsVODsSection";

export const metadata: Metadata = {
  title: "Watch",
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
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 text-center">
        {/* Cinematic smoke layers */}
        <div className="cinematic-smoke" />
        {/* Film grain texture */}
        <div className="film-grain" />
        {/* Vignette */}
        <div className="vignette" />
        {/* Fireflies */}
        <div className="fireflies">
          <span className="f1" />
          <span className="f2" />
          <span className="f3" />
          <span className="f4" />
          <span className="f5" />
          <span className="f6" />
        </div>
        {/* Hero background image */}
        <div
          className="hero-image-overlay"
          style={{
            backgroundImage: `url("/images/heroes/hero-watch.png")`,
            opacity: 0.3,
          }}
        />

        <div className="relative z-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-red">
            <span className="animate-live-pulse h-2 w-2 rounded-full bg-brand-red" />
            Live Now
          </span>
          <h1 className="animate-fade-in-up text-glow-red text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            WATCH <span className="text-brand-red">LIVE</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-muted">
            Multiplatform streaming across every major platform. Primary feed below — or catch us on your platform of choice.
          </p>
        </div>
      </section>

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
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-muted">
                Primary stream on{" "}
                <a
                  href="https://twitch.tv/ProzilliGaming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red transition-colors hover:text-brand-red-glow"
                >
                  Twitch
                </a>
              </p>
              <Link
                href="/schedule"
                className="text-sm text-brand-gold transition-colors hover:text-white"
              >
                View Schedule &rarr;
              </Link>
            </div>

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
