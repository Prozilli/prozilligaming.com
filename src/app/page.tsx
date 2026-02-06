import Image from "next/image";
import Link from "next/link";
import NextStreamCountdown from "@/components/NextStreamCountdown";

const PLATFORMS = [
  { name: "YouTube", href: "https://youtube.com/@prozilligaming" },
  { name: "Twitch", href: "https://twitch.tv/ProzilliGaming" },
  { name: "Kick", href: "https://kick.com/ProzilliGaming" },
  { name: "Trovo", href: "https://trovo.live/ProzilliGaming" },
  { name: "Facebook", href: "https://facebook.com/ProzilliGaming" },
];

const ECOSYSTEM = [
  {
    title: "Watch Live",
    description: "Catch the stream on any platform. Multiplatform, multicam, multivibes.",
    href: "/watch",
  },
  {
    title: "Merch Store",
    description: "Official Prozilli Gaming gear. Rep the brand.",
    href: "/shop",
  },
  {
    title: "ZO Syndicate",
    description: "Cinematic FiveM roleplay. Where stories are born.",
    href: "/zo-syndicate",
  },
  {
    title: "Community",
    description: "Join the Discord. Be part of something bigger.",
    href: "https://discord.gg/prozillihq",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 sm:px-6 text-center">
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
            backgroundImage: `url("/images/heroes/hero-home.png")`,
            opacity: 0.35,
          }}
        />

        <div className="relative z-10">
          <Image
            src="/logos/ProzilliGaming_Logo.svg"
            alt="Prozilli Gaming"
            width={120}
            height={120}
            className="animate-fade-in-up logo-float mx-auto mb-6 sm:mb-8 h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32"
            priority
          />
          <h1 className="animate-fade-in-up animate-delay-100 text-glow-red text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            PROZILLI<span className="text-brand-red">GAMING</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-200 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.1em] sm:tracking-[0.2em] uppercase text-brand-silver">
            Live. Create. Dominate.
          </p>

          {/* Platform buttons */}
          <div className="animate-fade-in-up animate-delay-300 mt-6 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glow-border rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all hover:text-brand-red"
              >
                {p.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fade-in-up animate-delay-400 mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/watch"
              className="rounded-sm bg-brand-red px-6 py-2.5 sm:px-8 sm:py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow"
            >
              Watch Now
            </Link>
            <Link
              href="/support"
              className="rounded-sm border border-brand-gold/30 px-6 py-2.5 sm:px-8 sm:py-3 text-sm font-medium tracking-wide text-brand-gold transition-colors hover:bg-brand-gold/10"
            >
              Support
            </Link>
          </div>

          {/* Next Stream Countdown */}
          <NextStreamCountdown />
        </div>
      </section>

      {/* Ecosystem Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <h2 className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-brand-red">
          The Ecosystem
        </h2>
        <p className="mx-auto mb-8 sm:mb-12 md:mb-16 max-w-2xl text-center text-sm sm:text-base text-muted">
          More than a stream. An entire creator ecosystem powered by cinema-grade production.
        </p>
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
          {ECOSYSTEM.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="glass glow-border group rounded-lg p-5 sm:p-6 md:p-8 transition-all"
            >
              <h3 className="text-lg font-semibold tracking-wide text-white transition-colors group-hover:text-brand-red">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* PRISMAI Powered */}
      <section className="relative border-y border-white/5 bg-brand-darker overflow-hidden">
        {/* Subtle smoke in this section */}
        <div className="cinematic-smoke opacity-50" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 py-10 sm:py-12 md:py-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1 text-xs font-medium tracking-wider text-brand-gold">
            POWERED BY PRISMAI
          </span>
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            Every chat message, every viewer stat, every interaction — unified
            by PRISMAI, our cross-platform intelligence engine.
          </p>
        </div>
      </section>
    </>
  );
}
