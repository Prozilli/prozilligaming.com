import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import PlatformBadge from "@/components/ui/PlatformBadge";

export const metadata: Metadata = {
  title: "LISA — AI Co-Host",
  description:
    "Meet LISA, Prozilli Gaming's AI co-host. Powered by Groq llama-3.3-70b-versatile with OpenAI fallback. Moderates chat, tracks events, and manages community across 9 platforms simultaneously.",
  keywords: [
    "LISA AI",
    "AI co-host",
    "Prozilli Gaming",
    "chat bot",
    "AI streamer",
    "Groq AI",
    "community management",
    "multiplatform bot",
  ],
  openGraph: {
    title: "LISA — AI Co-Host | Prozilli Gaming",
    description:
      "Meet LISA — AI co-host powering Prozilli Gaming across 9 platforms. Chat moderation, event tracking, and community management that never sleeps.",
    type: "website",
    url: "https://prozilligaming.com/lisa",
  },
  twitter: {
    card: "summary_large_image",
    title: "LISA — AI Co-Host | Prozilli Gaming",
    description:
      "Meet LISA — AI co-host powering Prozilli Gaming across 9 platforms. Chat moderation, event tracking, community management.",
  },
  alternates: {
    canonical: "https://prozilligaming.com/lisa",
  },
};

const PLATFORMS = [
  { name: "Twitch", connected: true },
  { name: "YouTube", connected: true },
  { name: "Kick", connected: true },
  { name: "Discord", connected: true },
  { name: "Trovo", connected: true },
  { name: "Facebook", connected: true },
  { name: "TikTok", connected: true },
  { name: "Instagram", connected: true },
  { name: "X", connected: true },
];

const CAPABILITIES = [
  {
    title: "Chat Moderation",
    description:
      "Auto-mod across all platforms. Link filter, spam detection, warning escalation.",
  },
  {
    title: "Conversation",
    description:
      "Natural personality with context memory. Responds in character across Twitch, Kick, Discord.",
  },
  {
    title: "Event Tracking",
    description:
      "Every follow, sub, donation, and raid — logged, thanked, and announced.",
  },
  {
    title: "Community Management",
    description:
      "Discord server management, reaction roles, channel organization.",
  },
  {
    title: "Sentiment Analysis",
    description:
      "Reads the room. Adapts tone and energy to match chat mood.",
  },
  {
    title: "NPC Bot Network",
    description:
      "5 independent AI personalities — Vania, Benny, Dolores, Snake, Tony — each with unique voices.",
  },
];

const SPECS = [
  { label: "Primary Model", value: "Groq llama-3.3-70b-versatile" },
  { label: "Fallback", value: "OpenAI gpt-4-turbo" },
  {
    label: "Resilience",
    value: "Circuit breaker (3 failures \u2192 auto-failover \u2192 15min self-heal)",
  },
  { label: "Platforms", value: "9 simultaneous connections" },
  { label: "Framework", value: "Custom NodeJS (Fastify + discord.js + tmi.js)" },
];

export default function LisaPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center px-6 pb-16 pt-24 text-center sm:pb-20 sm:pt-32"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(196,162,101,0.12) 0%, transparent 60%)",
        }}
      >
        <h1 className="text-display text-shimmer">LISA</h1>
        <p className="text-data mt-4 text-base tracking-wide text-gold sm:text-lg">
          AI Co-Host. Community Manager. Never Sleeps.
        </p>
      </section>

      {/* Origin Story */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="mb-8 text-center">
          <SectionLabel color="gold">The Story</SectionLabel>
        </div>
        <p className="text-center text-lg font-semibold text-foreground sm:text-xl">
          Tony Stark built Jarvis. Pro built LISA.
        </p>
        <div className="panel mt-8 p-6 sm:p-8">
          <p className="text-body leading-relaxed">
            Built for Prozilli&apos;s 9-platform streaming operation, LISA is an AI
            personality powered by Groq&apos;s llama-3.3-70b-versatile. She
            moderates chat, responds to viewers, tracks events, and manages the
            community across every platform simultaneously. She never goes
            offline, never misses a message, and never breaks character. When
            Groq goes down, she fails over to OpenAI and keeps talking. LISA
            isn&apos;t a chatbot — she&apos;s infrastructure.
          </p>
        </div>
      </section>

      {/* Where LISA Lives */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="mb-10 text-center">
            <SectionLabel color="gold">Active On</SectionLabel>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="panel flex items-center justify-center px-4 py-3"
              >
                <PlatformBadge
                  name={platform.name}
                  connected={platform.connected}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <SectionLabel color="gold">Capabilities</SectionLabel>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <div key={cap.title} className="panel p-6">
              <h3 className="text-sm font-semibold tracking-wide text-gold">
                {cap.title}
              </h3>
              <p className="text-body mt-3">{cap.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specs */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="mb-10 text-center">
            <SectionLabel color="muted">Under the Hood</SectionLabel>
          </div>
          <div className="panel p-6 sm:p-8">
            <div className="space-y-5">
              {SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="text-label shrink-0 text-muted sm:w-40">
                    {spec.label}
                  </span>
                  <span className="text-data text-sm text-foreground">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t border-border"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(196,162,101,0.08) 0%, transparent 70%)",
        }}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center sm:py-20">
          <h2 className="text-headline text-foreground">
            See LISA in Action
          </h2>
          <p className="text-body mt-4 max-w-lg">
            Jump into Discord to talk to LISA directly, or head to the Watch
            page and see her work a live stream in real time.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/prozillihq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Talk to LISA
            </a>
            <Link href="/watch" className="btn-primary">
              Watch LISA in Action
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
