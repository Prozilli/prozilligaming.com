import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LiveStatusBar from "@/components/LiveStatusBar";
import SectionLabel from "@/components/ui/SectionLabel";
import HeroLiveStatus from "@/components/HeroLiveStatus";

export const metadata: Metadata = {
  title: "Prozilli Gaming — Live Multiplatform Streaming",
  description:
    "Watch Prozilli live across Twitch, YouTube, Kick, Trovo, and more. Cinematic gaming content, community events, and the PRISMAI-powered streaming experience.",
  openGraph: {
    title: "Prozilli Gaming — Live. Create. Dominate.",
    description:
      "Multiplatform live streaming across Twitch, YouTube, Kick, Trovo, and Facebook. Gaming, creative content, and community.",
    type: "website",
    url: "https://prozilligaming.com",
    images: [
      {
        url: "/images/heroes/hero-home.png",
        width: 1200,
        height: 630,
        alt: "Prozilli Gaming - Live. Create. Dominate.",
      },
    ],
  },
};

const ECOSYSTEM = [
  {
    title: "Watch Live",
    description: "Catch the stream on any platform.",
    href: "/watch",
  },
  {
    title: "ZO Syndicate",
    description: "Cinematic FiveM roleplay. 48 players.",
    href: "/zo-syndicate",
  },
  {
    title: "LISA",
    description: "AI co-host. Never sleeps.",
    href: "/lisa",
  },
  {
    title: "Shop",
    description: "Official Prozilli Gaming gear.",
    href: "/shop",
  },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 text-center sm:min-h-[90vh]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(145,0,0,0.12) 0%, transparent 55%)",
        }}
      >
        <Image
          src="/logos/ProzilliGaming_Logo.svg"
          alt="Prozilli Gaming"
          width={96}
          height={96}
          className="mb-8 h-20 w-20 sm:h-24 sm:w-24"
          priority
        />

        <h1 className="text-display text-foreground">
          Prozilli Gaming
        </h1>

        <p className="text-data mt-4 text-xs uppercase tracking-widest text-muted sm:text-sm">
          Live. Create. Dominate.
        </p>

        {/* Dynamic live status (client component) */}
        <HeroLiveStatus />

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href="/watch" className="btn-primary">
            Watch Now
          </Link>
          <Link href="#ecosystem" className="btn-secondary">
            Explore
          </Link>
        </div>
      </section>

      {/* ===== LIVE STATUS BAR ===== */}
      <LiveStatusBar />

      {/* ===== ECOSYSTEM GRID ===== */}
      <section
        id="ecosystem"
        className="mx-auto max-w-5xl px-6 py-16 sm:py-24"
      >
        <div className="mb-10 text-center sm:mb-14">
          <SectionLabel color="red">The Ecosystem</SectionLabel>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {ECOSYSTEM.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="panel-interactive group flex items-start justify-between p-6 sm:p-8"
            >
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-body mt-2">{item.description}</p>
              </div>
              <span className="mt-1 text-dim opacity-0 transition-opacity group-hover:opacity-100">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== PRISMAI BAR ===== */}
      <section className="border-y border-gold/10 bg-surface">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-10 text-center sm:py-14">
          <span className="text-shimmer text-label">
            Powered by PRISMAI
          </span>
          <p className="text-body max-w-lg">
            Every chat message, every viewer stat, every interaction — unified
            by our cross-platform intelligence engine.
          </p>
          <a
            href="https://prozilli.com/prismai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-2 text-xs"
          >
            Learn More
          </a>
        </div>
      </section>
    </>
  );
}
