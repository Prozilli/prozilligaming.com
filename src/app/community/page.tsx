import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the Prozilli community. Two Discord servers, active voice chat, giveaways, events, and a voice in everything we build. Powered by PRISMAI.",
};

const COMMUNITY_STATS = [
  { label: "Discord Servers", value: "2" },
  { label: "Platforms Connected", value: "9" },
  { label: "Custom Channels", value: "42" },
  { label: "AI Characters", value: "6" },
];

const GUIDELINES = [
  {
    title: "Respect Everyone",
    description:
      "Treat every member with dignity. No racism, sexism, homophobia, or discrimination of any kind. We are a family here.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "No Toxicity",
    description:
      "Keep the vibes positive. Constructive criticism is welcome, but trolling, harassment, and drama-baiting will result in removal.",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  {
    title: "Have Fun",
    description:
      "This community exists for entertainment. Share clips, memes, wins, and stories. LISA is always watching and she will roast you.",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Support Each Other",
    description:
      "Help new members find their way. Answer questions, share tips, and build each other up. The community grows when everyone contributes.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

const GET_INVOLVED = [
  {
    title: "Join Discord",
    description: "The heart of the community. Voice chat, events, giveaways, and direct access to Pro and LISA.",
    action: "Join Prozilli HQ",
    href: "https://discord.gg/prozillihq",
    accent: "electric",
    icon: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z",
  },
  {
    title: "Watch Streams",
    description: "Catch Pro live on 9 platforms. Chat with LISA, earn loyalty points, and participate in live events.",
    action: "Watch Live",
    href: "/watch",
    accent: "red",
    icon: "M15 10l-4 3V7l4 3zm-3-8a10 10 0 100 20 10 10 0 000-20z",
  },
  {
    title: "Follow on Social",
    description: "Stay in the loop. Behind-the-scenes content, announcements, and community highlights across all platforms.",
    action: "View All Links",
    href: "/link",
    accent: "gold",
    icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
  },
  {
    title: "Create Content",
    description: "Make clips, fan art, memes, or stream highlights. The best content gets featured on our socials and Discord.",
    action: "Learn More",
    href: "#",
    accent: "emerald",
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  },
];

export default function CommunityPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[70vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-electric mb-6 animate-reveal">Community Hub</div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              Built by{" "}
              <span className="text-shimmer">Gamers</span>,<br />
              for Gamers
            </h1>
            <p
              className="text-body-lg max-w-xl mb-10 animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              The Prozilli community spans two Discord servers, nine streaming platforms,
              and a fully custom FiveM roleplay server. This is where the family lives.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="https://discord.gg/prozillihq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                </svg>
                Join Prozilli HQ
              </a>
              <a
                href="https://discord.gg/tF698jBb3k"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-lg"
              >
                Join ZO Syndicate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== COMMUNITY STATS ====== */}
      <section className="bg-surface border-y border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COMMUNITY_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-foreground">{stat.value}</div>
                <div className="text-label text-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== DISCORD SERVERS ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-gold mb-4">Discord</div>
            <h2 className="text-headline mb-4">Two Servers, One Family</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Each server serves a different purpose, but the community is the same.
              Join both for the full Prozilli experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Prozilli HQ */}
            <div className="glass-raised p-8 animate-reveal">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-electric" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Prozilli HQ</h3>
                  <p className="text-sm text-muted">Main Community Server</p>
                </div>
              </div>
              <p className="text-body mb-6">
                The main hub for everything Prozilli. Stream notifications, giveaways, voice
                chat hangouts, meme channels, community events, and direct access to Pro and LISA.
                This is where the community comes together.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Stream alerts across all 9 platforms",
                  "Voice chat hangout channels",
                  "Weekly giveaways and events",
                  "Memes, clips, and highlights",
                  "LISA AI chatbot in every channel",
                  "Role-based channels and perks",
                  "Community game nights",
                  "Direct access to Pro",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://discord.gg/prozillihq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                Join Prozilli HQ
              </a>
            </div>

            {/* ZO Syndicate */}
            <div className="glass-raised p-8 animate-reveal" style={{ animationDelay: "0.15s" }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">ZO Syndicate RP</h3>
                  <p className="text-sm text-muted">FiveM Roleplay Community</p>
                </div>
              </div>
              <p className="text-body mb-6">
                The dedicated community for our FiveM roleplay server. Apply for whitelisted
                roles, submit police applications, join a gang, get server support, and stay
                updated on server changes and events.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Whitelist applications",
                  "LEO & EMS department applications",
                  "Gang recruitment channels",
                  "Server update announcements",
                  "Bug reports and support tickets",
                  "In-character communication channels",
                  "Economy and job guides",
                  "Staff and admin support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://discord.gg/tF698jBb3k"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold w-full"
              >
                Join ZO Syndicate RP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== COMMUNITY GUIDELINES ====== */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-red mb-4">Values</div>
            <h2 className="text-headline mb-4">Community Guidelines</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              We keep it simple. Be a decent human being, have fun, and look out for each other.
              These values shape every interaction in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 stagger">
            {GUIDELINES.map((item) => (
              <div key={item.title} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-bright/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-bright" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== GET INVOLVED ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-emerald mb-4">Participate</div>
            <h2 className="text-headline mb-4">Ways to Get Involved</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              There are plenty of ways to be part of the Prozilli ecosystem. Whether you want to
              chat, create, or just hang out, there&apos;s a place for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 stagger">
            {GET_INVOLVED.map((item) => (
              <div key={item.title} className="card-holo p-6 group">
                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-${item.accent}/10`}>
                    <svg className={`w-5 h-5 text-${item.accent}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted mb-4">{item.description}</p>
                  {item.href.startsWith("http") ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      {item.action}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link href={item.href} className="btn btn-ghost btn-sm">
                      {item.action}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== LEADERBOARD TEASER ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-raised p-8 md:p-12 text-center">
            <div className="badge badge-gold mb-6">Coming Soon</div>
            <h2 className="text-headline mb-4">
              Community <span className="text-shimmer">Leaderboards</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8">
              Earn XP across all platforms. Chat on Twitch, participate in Discord, watch streams,
              enter giveaways, and climb the ranks. Top members unlock exclusive VIP perks,
              custom roles, and recognition across the ecosystem. PRISMAI tracks everything.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { rank: "1", name: "???", xp: "---" },
                { rank: "2", name: "???", xp: "---" },
                { rank: "3", name: "???", xp: "---" },
                { rank: "4", name: "???", xp: "---" },
              ].map((entry) => (
                <div key={entry.rank} className="card p-4 text-center">
                  <div className="text-2xl font-extrabold text-gold mb-1">#{entry.rank}</div>
                  <div className="text-sm font-semibold text-foreground">{entry.name}</div>
                  <div className="text-xs text-dim mt-1">{entry.xp} XP</div>
                </div>
              ))}
            </div>
            <div className="powered-by-prismai mx-auto w-fit">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" opacity="0.3" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Tracked by PRISMAI
            </div>
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-headline mb-6">
            Ready to Join the <span className="text-shimmer-red">Family</span>?
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mb-10">
            Whether you&apos;re a hardcore gamer, a casual viewer, or a roleplay enthusiast,
            the Prozilli community has a place for you. Jump in.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/prozillihq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Join Prozilli HQ
            </a>
            <a
              href="https://discord.gg/tF698jBb3k"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-lg"
            >
              Join ZO Syndicate
            </a>
            <Link href="/link" className="btn btn-secondary btn-lg">
              All Platforms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
