import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Official announcements from Prozilli Gaming. Platform milestones, feature launches, server updates, partnerships, and ecosystem changes.",
};

const NEWS_CATEGORIES = [
  { name: "All", slug: "all", active: true },
  { name: "Milestones", slug: "milestones" },
  { name: "Features", slug: "features" },
  { name: "Server Updates", slug: "server-updates" },
  { name: "Partnerships", slug: "partnerships" },
  { name: "Events", slug: "events" },
];

const ANNOUNCEMENTS = [
  {
    title: "Token Encryption: All OAuth Tokens Now Encrypted at Rest",
    description:
      "We've deployed AES-256-GCM encryption across all platform tokens stored in Cloudflare KV. Every access token, refresh token, and linked account credential is now encrypted with a unique initialization vector. Zero-downtime migration — no service interruption.",
    category: "Features",
    date: "February 11, 2026",
    badge: "Security",
    badgeColor: "badge-emerald",
    accent: "emerald",
    important: true,
  },
  {
    title: "LISA Now Has Automatic Failover: Groq to OpenAI",
    description:
      "LISA's AI backend now includes a circuit breaker with automatic Groq-to-OpenAI failover. If Groq goes down, LISA seamlessly switches to GPT-4 Turbo without losing personality or context. She never goes offline.",
    category: "Features",
    date: "February 11, 2026",
    badge: "AI",
    badgeColor: "badge-electric",
    accent: "electric",
    important: true,
  },
  {
    title: "ZO Syndicate: 51 Custom Resources Now Live",
    description:
      "The FiveM server has reached 51 fully custom zo_* resources. New additions include zo_inventory v2.0 (replacing ox_inventory), zo_customs, zo_fuel, zo_doorlock, zo_adminmenu, racing systems, diving activities, and more. The entire ox ecosystem has been replaced with our own code.",
    category: "Server Updates",
    date: "February 9, 2026",
    badge: "FiveM",
    badgeColor: "badge-gold",
    accent: "gold",
    important: false,
  },
  {
    title: "Instagram OAuth Now Uses PKCE Security",
    description:
      "Instagram's OAuth flow has been upgraded to use PKCE (Proof Key for Code Exchange) with S256 code challenges, matching the security standard we use for Kick and X. This prevents authorization code interception attacks.",
    category: "Features",
    date: "February 11, 2026",
    badge: "Security",
    badgeColor: "badge-emerald",
    accent: "emerald",
    important: false,
  },
  {
    title: "Auto-Post Video Pipeline: AI-Generated Shorts",
    description:
      "PRISMAI now generates short-form video content automatically. DALL-E 3 creates images, Leonardo Motion 2.0 animates them into 5-second MP4 clips, and the system posts them as YouTube Shorts, TikTok videos, Instagram Reels, and Facebook Reels — all automated.",
    category: "Features",
    date: "February 10, 2026",
    badge: "Content",
    badgeColor: "badge-electric",
    accent: "electric",
    important: false,
  },
  {
    title: "5 NPC Discord Bots Now Online",
    description:
      "Vania, Benny, Dolores, Snake, and Tony — five independent Discord bot instances with unique AI personalities — are now live in the ZO Syndicate Discord. Each has their own backstory, speech patterns, and role in the community.",
    category: "Features",
    date: "February 8, 2026",
    badge: "AI",
    badgeColor: "badge-electric",
    accent: "electric",
    important: false,
  },
  {
    title: "Cloudflare Paid Plan: KV Limits Removed",
    description:
      "We upgraded to Cloudflare's paid Workers plan, removing the daily KV write limits that were blocking token refreshes. All platform OAuth tokens now refresh reliably with a 30-minute buffer before expiry.",
    category: "Milestones",
    date: "February 7, 2026",
    badge: "Infrastructure",
    badgeColor: "badge-gold",
    accent: "gold",
    important: false,
  },
  {
    title: "Full Ecosystem Security Audit Complete",
    description:
      "68 issues identified and fixed across all 4 repositories. CORS lockdowns, admin authentication, MySQL datetime fixes, Discord ID precision fixes, WebP image optimization (85% savings), exponential backoff, query caching, and structured JSON logging.",
    category: "Milestones",
    date: "February 6, 2026",
    badge: "Security",
    badgeColor: "badge-emerald",
    accent: "emerald",
    important: false,
  },
  {
    title: "VIP System Launch: Tebex + Multi-Platform Sync",
    description:
      "The zo_vip system is live with three tiers (Supporter, VIP, Elite) that sync across Discord, FiveM, Twitch, YouTube, and Patreon. Subscribe on any platform and your perks follow you everywhere via PRISMAI.",
    category: "Features",
    date: "February 5, 2026",
    badge: "Launch",
    badgeColor: "badge-red",
    accent: "red",
    important: false,
  },
  {
    title: "Discord Server Redesign: 42 Channels, 12 Categories",
    description:
      "The Prozilli HQ Discord server was completely redesigned with 42 channels across 12 categories. Reaction roles, stream alerts, community channels, and dedicated sections for ZO Syndicate RP, content creation, and support.",
    category: "Events",
    date: "February 3, 2026",
    badge: "Community",
    badgeColor: "badge-electric",
    accent: "electric",
    important: false,
  },
];

export default function NewsPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[60vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-red mb-6 animate-reveal">Announcements</div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              News &{" "}
              <span className="text-shimmer-red">Updates</span>
            </h1>
            <p
              className="text-body-lg max-w-xl animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Official announcements from the Prozilli ecosystem. Platform milestones,
              feature launches, security updates, and everything happening behind the scenes.
            </p>
          </div>
        </div>
      </section>

      {/* ====== CATEGORY FILTER ====== */}
      <section className="bg-surface border-y border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                className={`btn btn-sm ${cat.active ? "btn-primary" : "btn-ghost"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TIMELINE ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Timeline line */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-red-bright via-glass-border to-transparent hidden md:block" />

            <div className="space-y-8 stagger">
              {ANNOUNCEMENTS.map((item, index) => (
                <div key={index} className="relative md:pl-16">
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-8 hidden md:flex">
                    <div className={`w-5 h-5 rounded-full border-2 border-${item.accent} bg-void flex items-center justify-center`}>
                      <div className={`w-2 h-2 rounded-full bg-${item.accent}`} />
                    </div>
                  </div>

                  <div className={`glass-raised p-6 md:p-8 ${item.important ? "ring-1 ring-red-bright/20 animate-border-glow" : ""}`}>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`badge ${item.badgeColor}`}>{item.badge}</span>
                      <span className="text-label text-dim">{item.category}</span>
                      {item.important && (
                        <span className="badge badge-red ml-auto">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          Important
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                    <p className="text-body mb-4">{item.description}</p>

                    <div className="flex items-center gap-4">
                      <span className="text-data text-dim text-xs">
                        <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== SUBSCRIBE CTA ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-raised p-8 md:p-12 max-w-2xl mx-auto">
            <div className="badge badge-electric mb-6">Stay Updated</div>
            <h2 className="text-headline mb-4">Never Miss an Update</h2>
            <p className="text-body-lg mb-8">
              Join the Discord to get real-time announcements, or follow us on social media
              for highlights. Every major update hits Discord first.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discord.gg/prozillihq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                </svg>
                Join Discord
              </a>
              <a
                href="https://twitter.com/ProzilliGaming"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Follow on X
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== POWERED BY PRISMAI ====== */}
      <section className="py-12 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="powered-by-prismai mx-auto w-fit">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            Announcements by PRISMAI
          </div>
        </div>
      </section>
    </>
  );
}
