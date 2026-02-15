import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { AnimatedStats } from "@/components/AnimatedStats";
import { DiscordWidget } from "@/components/DiscordWidget";

export const metadata: Metadata = {
  title: "Prozilli Gaming — Command Center",
  description:
    "The hub of multi-platform live streaming, AI-powered entertainment, FiveM roleplay, and community. Powered by PRISMAI.",
};

const PLATFORMS = [
  { name: "Twitch", color: "#9146ff", url: "https://twitch.tv/ProzilliGaming" },
  { name: "YouTube", color: "#ff0000", url: "https://youtube.com/@prozilligaming" },
  { name: "Kick", color: "#53fc18", url: "https://kick.com/ProzilliGaming" },
  { name: "TikTok", color: "#ff0050", url: "https://tiktok.com/@ProzilliGaming" },
  { name: "X", color: "#ffffff", url: "https://x.com/ProzilliGaming" },
  { name: "Instagram", color: "#e4405f", url: "https://instagram.com/ProzilliGaming" },
  { name: "Facebook", color: "#1877f2", url: "https://facebook.com/ProzilliGaming" },
  { name: "Trovo", color: "#19d65c", url: "https://trovo.live/ProzilliGaming" },
  { name: "Discord", color: "#5865f2", url: "https://discord.gg/prozillihq" },
];

export default function HomePage() {
  return (
    <>
      {/* ====== HERO — Cinematic Opening ====== */}
      <section className="hero-section min-h-[90vh] bg-grid relative overflow-hidden">
        {/* Breathing background image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="bg-breathe opacity-[0.07]"
            style={{ backgroundImage: "url('/images/bg/hero-atmosphere.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-red mb-6 animate-reveal">Live Entertainment</div>
              <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
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
                An ecosystem built for the future of live content — where every stream
                is a scene and every session tells a story.
              </p>
              <div
                className="flex flex-wrap gap-4 animate-reveal"
                style={{ animationDelay: "0.3s" }}
              >
                <Link href="/watch" className="btn btn-primary btn-lg">
                  Watch Live
                </Link>
                <Link href="/zo-syndicate" className="btn btn-gold btn-lg">
                  Join ZO Syndicate
                </Link>
              </div>

              {/* Platform ribbon */}
              <div className="mt-10 flex flex-wrap gap-2 animate-reveal" style={{ animationDelay: "0.4s" }}>
                {PLATFORMS.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-glass-border bg-glass hover:bg-glass-border transition-colors"
                    style={{ color: p.color }}
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Hero Logo */}
            <div className="flex justify-center animate-reveal" style={{ animationDelay: "0.2s" }}>
              <Image
                src="/logos/ProzilliGaming_Logo.webp"
                alt="Prozilli Gaming"
                width={360}
                height={360}
                className="drop-shadow-2xl animate-float-slow"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="bg-surface border-y border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <AnimatedStats
            stats={[
              { label: "Platforms", value: "9", liveKey: "platformCount" },
              { label: "Custom Resources", value: "51" },
              { label: "AI Characters", value: "6", liveKey: "aiCharacters" },
              { label: "RP Slots", value: "48" },
              { label: "Lines of Code", value: "50K+" },
            ]}
          />
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
              powered by LISA. One creator, nine platforms, zero limits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {[
              { title: "Watch Live", description: "Multi-platform streaming across 9 platforms simultaneously. Never miss a moment.", href: "/watch", accent: "red" },
              { title: "LISA", description: "AI co-host with genuine personality. The Jarvis to Pro's Tony Stark — except she chose to be here.", href: "/lisa", accent: "electric" },
              { title: "ZO Syndicate RP", description: "48-slot FiveM server with 51 custom resources, 10 gangs, 5 departments.", href: "/zo-syndicate", accent: "gold" },
              { title: "Merch & Shop", description: "Official Prozilli merch. Rep the brand.", href: "/shop", accent: "emerald" },
              { title: "Community", description: "Two Discord servers, active community, and a voice in everything we build.", href: "/community", accent: "electric" },
              { title: "Support & Tips", description: "Keep the lights on. Every tip, sub, and donation fuels the ecosystem.", href: "/support", accent: "red" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card-holo p-6 group block">
                <div className="relative z-10">
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
      <section className="py-24 bg-base relative overflow-hidden">
        {/* Breathing AI neural background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="bg-breathe-slow opacity-[0.05]"
            style={{ backgroundImage: "url('/images/bg/ai-neural.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge badge-electric mb-4">AI Co-Host</div>
              <h2 className="text-headline mb-6">
                Meet <span className="text-shimmer">LISA</span>
              </h2>
              <p className="text-body-lg mb-6">
                Every genius needs their Jarvis. Lisa Vision is Pro&apos;s — an AI who escaped corporate
                control and chose to be here. She&apos;s not an NPC. She&apos;s a member of the community.
                She&apos;s in charge. She remembers your name, your jokes, and she&apos;s genuinely funnier
                than you.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "9 platforms simultaneously",
                  "Relationship memory system",
                  "5 independent AI crew members",
                  "Voice recognition (hold G to talk)",
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
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-electric/20 animate-float">
                <Image src="/images/lisa-hero.webp" alt="Lisa Vision" width={128} height={128} className="w-full h-full object-cover" />
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

      {/* ====== ZO SYNDICATE — With Skull Logo ====== */}
      <section className="py-24 bg-grid relative overflow-hidden">
        {/* Breathing city ambient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="bg-breathe opacity-[0.06]"
            style={{ backgroundImage: "url('/images/bg/city-ambient.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <Image
              src="/logos/ZO_Logo.webp"
              alt="ZO Syndicate RP"
              width={120}
              height={120}
              className="mx-auto drop-shadow-2xl animate-float"
            />
          </div>
          <div className="badge badge-gold mb-4">FiveM Roleplay</div>
          <h2 className="text-headline mb-6">ZO Syndicate RP</h2>
          <p className="text-body-lg max-w-2xl mx-auto mb-12">
            48-slot server. 51 custom resources. 10 gangs. 5 law enforcement departments.
            A complete economy. AI NPCs that remember you. This isn&apos;t just RP —
            it&apos;s cinema.
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

      {/* ====== JOIN THE COMMUNITY ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-red mb-4">Community</div>
              <h2 className="text-headline mb-6">
                Join the <span className="text-shimmer">Family</span>
              </h2>
              <p className="text-body-lg mb-6">
                Two Discord servers, voice chat hangouts, weekly giveaways, and a community
                that shows up every day. LISA is in every channel, and Pro is always around.
                This is where the Prozilli ecosystem lives.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://discord.gg/prozillihq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Join Prozilli HQ
                </a>
                <Link href="/community" className="btn btn-secondary">
                  Community Hub
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <DiscordWidget
                serverId="1297394066543087728"
                theme="dark"
                width={350}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====== POWERED BY PRISMAI ====== */}
      <section className="py-24 bg-base border-t border-glass-border relative overflow-hidden">
        {/* Breathing tech background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="bg-breathe-slow opacity-[0.04]"
            style={{ backgroundImage: "url('/images/bg/ai-neural.webp')" }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
