import type { Metadata } from "next";
import Link from "next/link";

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
      <section className="gradient-gaming scanlines relative flex flex-col items-center px-6 pt-20 pb-12 text-center">
        <div className="relative z-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-red">
            <span className="animate-live-pulse h-2 w-2 rounded-full bg-brand-red" />
            Live Now
          </span>
          <h1 className="animate-fade-in-up text-glow-red text-4xl font-bold tracking-tight md:text-6xl">
            WATCH <span className="text-brand-red">LIVE</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 max-w-xl text-muted">
            Multiplatform streaming across every major platform. Primary feed below — or catch us on your platform of choice.
          </p>
        </div>
      </section>

      {/* Twitch Embed */}
      <section className="mx-auto max-w-7xl px-6 py-12">
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
        <div className="mt-4 flex items-center justify-between">
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

      {/* VODs & Clips */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1 text-xs font-medium tracking-wider text-brand-gold">
            COMING SOON
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            VODs & Clips
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Coming soon via PRISMAI — automated highlights, clip detection, and cross-platform VOD aggregation. Every moment, catalogued and searchable.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass rounded-lg p-8"
              >
                <div className="mx-auto mb-4 h-32 w-full rounded bg-white/5" />
                <div className="h-4 w-3/4 rounded bg-white/5" />
                <div className="mt-2 h-3 w-1/2 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
