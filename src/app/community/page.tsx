import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionLabel from "@/components/ui/SectionLabel";
import StatCounter from "@/components/ui/StatCounter";

export const metadata: Metadata = {
  title: "Community | Prozilli Gaming",
  description:
    "Join the Prozilli Gaming community across 9 platforms. Discord, Twitch, YouTube, Kick, Facebook, TikTok, Instagram, X, and Trovo. One family, everywhere.",
  keywords: [
    "Prozilli Gaming community",
    "Prozilli Discord",
    "Prozilli social media",
    "gaming community",
    "Prozilli Gaming platforms",
    "multiplatform streamer",
  ],
  openGraph: {
    title: "Community | Prozilli Gaming",
    description:
      "The Prozilli community spans 9 platforms and a dedicated Discord server. Join the family.",
    type: "website",
    url: "https://prozilligaming.com/community",
  },
  twitter: {
    card: "summary",
    title: "Community | Prozilli Gaming",
    description:
      "Join the Prozilli Gaming community across 9 platforms. One family, everywhere.",
  },
  alternates: {
    canonical: "https://prozilligaming.com/community",
  },
};

const PLATFORMS = [
  {
    name: "Twitch",
    handle: "@ProzilliGaming",
    url: "https://twitch.tv/ProzilliGaming",
    color: "#9146FF",
  },
  {
    name: "YouTube",
    handle: "@prozilligaming",
    url: "https://youtube.com/@prozilligaming",
    color: "#FF0000",
  },
  {
    name: "Kick",
    handle: "@ProzilliGaming",
    url: "https://kick.com/ProzilliGaming",
    color: "#53FC18",
  },
  {
    name: "Discord",
    handle: "Prozilli HQ",
    url: "https://discord.gg/prozillihq",
    color: "#5865F2",
  },
  {
    name: "Facebook",
    handle: "@ProzilliGaming",
    url: "https://facebook.com/ProzilliGaming",
    color: "#1877F2",
  },
  {
    name: "TikTok",
    handle: "@ProzilliGaming",
    url: "https://tiktok.com/@ProzilliGaming",
    color: "#FE2C55",
  },
  {
    name: "Instagram",
    handle: "@ProzilliGaming",
    url: "https://instagram.com/ProzilliGaming",
    color: "#E1306C",
  },
  {
    name: "X",
    handle: "@ProzilliGaming",
    url: "https://x.com/ProzilliGaming",
    color: "#FFFFFF",
  },
  {
    name: "Trovo",
    handle: "@ProzilliGaming",
    url: "https://trovo.live/ProzilliGaming",
    color: "#19D65C",
  },
];

export default function CommunityPage() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        accent="red"
        label="Community"
        labelColor="red"
        title="JOIN THE FAMILY"
        subtitle="The Prozilli community spans 9 platforms and a dedicated Discord server."
      />

      {/* ── Discord Section ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-8">
          <SectionLabel color="gold">Discord</SectionLabel>
        </div>

        <div className="panel p-8 sm:p-10">
          <h2 className="text-headline text-foreground">Prozilli HQ</h2>
          <p className="text-body mt-4 max-w-2xl">
            The central hub. Stream notifications, community events, LISA, and
            direct access to Pro.
          </p>

          <div className="mt-8">
            <StatCounter value={500} label="Members" />
          </div>

          <div className="mt-8">
            <a
              href="https://discord.gg/prozillihq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* ── Platform Presence ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-8">
          <SectionLabel color="red">Find Us Everywhere</SectionLabel>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="panel-interactive flex flex-col justify-center px-5 py-4"
              style={{ borderLeft: `3px solid ${platform.color}` }}
            >
              <span className="text-sm font-semibold text-foreground">
                {platform.name}
              </span>
              <span className="mt-0.5 text-xs text-dim">
                {platform.handle}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Community Stats ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-10">
          <SectionLabel color="gold">By The Numbers</SectionLabel>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <StatCounter value={9} label="Platforms" />
          <StatCounter value={500} label="Discord Members" />
          <StatCounter value={17} label="Custom Resources" />
          <StatCounter value={1} label="AI Co-Host" suffix=" (LISA)" />
        </div>
      </section>

      {/* ── ZO Syndicate Teaser ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="panel p-8 sm:p-10">
          <h2 className="text-headline text-foreground">
            Looking for roleplay?
          </h2>
          <p className="text-body mt-4 max-w-2xl">
            ZO Syndicate is our cinematic FiveM roleplay server built on Qbox.
            48 player slots, 10 gangs, 5 departments, a full economy, and
            narrative-driven storylines. Your next character is waiting.
          </p>

          <div className="mt-8">
            <Link href="/zo-syndicate" className="btn-secondary">
              Explore ZO Syndicate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
