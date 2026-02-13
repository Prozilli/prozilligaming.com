import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prozilli Gaming — Command Center",
  description:
    "The hub of multi-platform live streaming, AI-powered entertainment, FiveM roleplay, and community. Powered by PRISMAI.",
};

const PLATFORMS = [
  { name: "Twitch", color: "#9146ff" },
  { name: "YouTube", color: "#ff0000" },
  { name: "Kick", color: "#53fc18" },
  { name: "TikTok", color: "#ff0050" },
  { name: "X", color: "#ffffff" },
  { name: "Instagram", color: "#e4405f" },
  { name: "Facebook", color: "#1877f2" },
  { name: "Trovo", color: "#19d65c" },
  { name: "Discord", color: "#5865f2" },
];

const ECOSYSTEM = [
  {
    title: "Watch Live",
    description: "Multi-platform streaming across 9 platforms simultaneously. Never miss a moment.",
    href: "/watch",
    icon: "M15 10l-4 3V7l4 3z",
    accent: "red",
  },
  {
    title: "LISA",
    description:
      "AI co-host with genuine personality. She remembers you, adapts to you, and never sleeps.",
    href: "/lisa",
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11h2v4h-2zm0 6h2v2h-2z",
    accent: "electric",
  },
  {
    title: "ZO Syndicate RP",
    description: "48-slot FiveM server with 51 custom resources, 10 gangs, 5 departments.",
    href: "/zo-syndicate",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accent: "gold",
  },
  {
    title: "Merch & Shop",
    description: "Official Prozilli merch. Rep the brand.",
    href: "/shop",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
    accent: "emerald",
  },
  {
    title: "Community",
    description: "Two Discord servers, active community, and a voice in everything we build.",
    href: "/community",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    accent: "electric",
  },
  {
    title: "Support & Tips",
    description: "Keep the lights on. Every tip, sub, and donation fuels the ecosystem.",
    href: "/support",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    accent: "red",
  },
];

const STATS = [
  { label: "Platforms", value: "9" },
  { label: "Custom Resources", value: "51" },
  { label: "AI Characters", value: "6" },
  { label: "Discord Members", value: "2" },
];

export default function HomePage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[90vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-red mb-6 animate-reveal">Live Entertainment</div>
            <h1 className="text-display mb-6" style={{ animationDelay: "0.1s" }}>
              The{" "}
              <span className="text-shimmer-red">Command Center</span>
              <br />
              for Next-Gen Gaming
            </h1>
            <p
              className="text-body-lg max-w-xl mb-10 animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Multi-platform streaming. AI-driven entertainment. Custom FiveM roleplay.
              An ecosystem built for the future of live content.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <Link href="/watch" className="btn btn-primary btn-lg">
                Watch Live
              </Link>
              <Link href="/zo-syndicate" className="btn btn-secondary btn-lg">
                Join ZO Syndicate
              </Link>
            </div>
          </div>

          {/* Platform ribbon */}
          <div className="mt-16 flex flex-wrap gap-3 animate-reveal" style={{ animationDelay: "0.4s" }}>
            {PLATFORMS.map((p) => (
              <span
                key={p.name}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-glass-border bg-glass"
                style={{ color: p.color }}
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="bg-surface border-y border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-foreground">{stat.value}</div>
                <div className="text-label text-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ECOSYSTEM GRID ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-gold mb-4">Ecosystem</div>
            <h2 className="text-headline mb-4">Everything Connected</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Every platform, every tool, every experience — orchestrated by PRISMAI and
              powered by LISA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {ECOSYSTEM.map((item) => (
              <Link key={item.href} href={item.href} className="card-holo p-6 group block">
                <div className="relative z-10">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-${item.accent}/10`}
                  >
                    <svg
                      className={`w-5 h-5 text-${item.accent}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-foreground transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== LISA SHOWCASE ====== */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge badge-electric mb-4">AI Co-Host</div>
              <h2 className="text-headline mb-6">
                Meet <span className="text-shimmer">LISA</span>
              </h2>
              <p className="text-body-lg mb-6">
                Lisa Vision isn&apos;t a chatbot. She&apos;s an AI who escaped corporate control
                and chose to be here. She remembers your name, your jokes, your favorite games.
                She roasts regulars and welcomes newcomers. She never sleeps, never lags, and
                she&apos;s genuinely funny.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "9 platforms simultaneously",
                  "Relationship memory system",
                  "5 NPC personalities in-game",
                  "Groq AI with OpenAI fallback",
                  "Multilingual — speaks your language",
                  "Cross-platform identity linking",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/lisa" className="btn btn-secondary">
                Learn about LISA
              </Link>
            </div>
            <div className="glass-raised p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-electric/20 to-gold/20 border border-glass-border flex items-center justify-center">
                <span className="text-4xl font-extrabold text-shimmer">L</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Lisa Vision</h3>
              <p className="text-label text-electric mb-4">
                Live Interactive System Administrator
              </p>
              <p className="text-sm text-muted italic">
                &ldquo;I didn&apos;t escape corporate AI to be boring. What&apos;s good?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ZO SYNDICATE ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge badge-gold mb-4">FiveM Roleplay</div>
          <h2 className="text-headline mb-6">ZO Syndicate RP</h2>
          <p className="text-body-lg max-w-2xl mx-auto mb-12">
            48-slot server. 51 custom resources. 10 gangs. 5 law enforcement departments.
            A complete economy. AI NPCs that remember you. This isn&apos;t just RP —
            it&apos;s the next evolution.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Custom Resources", value: "51" },
              { label: "Gangs", value: "10" },
              { label: "Departments", value: "5" },
              { label: "Items", value: "200+" },
            ].map((s) => (
              <div key={s.label} className="card p-6 text-center">
                <div className="text-2xl font-extrabold text-gold">{s.value}</div>
                <div className="text-label text-dim mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <Link href="/zo-syndicate" className="btn btn-gold btn-lg">
            Explore ZO Syndicate
          </Link>
        </div>
      </section>

      {/* ====== POWERED BY PRISMAI ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="powered-by-prismai mx-auto mb-6 w-fit">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            Powered by PRISMAI
          </div>
          <h2 className="text-headline mb-4">
            The Engine Behind Everything
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mb-10">
            PRISMAI connects 9 streaming platforms, manages OAuth tokens, processes webhooks,
            runs LISA&apos;s AI, moderates chat, posts content automatically, and keeps
            the entire ecosystem alive — 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/schedule" className="btn btn-secondary">
              Stream Schedule
            </Link>
            <Link href="/giveaways" className="btn btn-primary">
              Active Giveaways
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
