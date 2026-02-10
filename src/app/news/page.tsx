import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Latest news and updates from Prozilli Gaming. Announcements, new content, events, and community highlights.",
  keywords: [
    "Prozilli Gaming news",
    "streamer updates",
    "gaming announcements",
    "Prozilli blog",
    "community updates",
  ],
  openGraph: {
    title: "News & Updates | Prozilli Gaming",
    description:
      "Stay updated with the latest from Prozilli Gaming. News, announcements, and community highlights.",
    type: "website",
    url: "https://prozilligaming.com/news",
  },
  twitter: {
    card: "summary",
    title: "News & Updates | Prozilli Gaming",
    description: "Latest news and updates from Prozilli Gaming.",
  },
  alternates: {
    canonical: "https://prozilligaming.com/news",
  },
};

const ARTICLES = [
  {
    title: "PRISMAI Engine Goes Live",
    date: "2026-02-09",
    excerpt:
      "The PRISMAI Core Engine is now fully operational — powering LISA across Twitch, Kick, Discord, YouTube, Trovo, and Facebook simultaneously. Real-time chat responses, cross-platform event handling, and AI-driven engagement are live in production.",
    category: "PRISMAI",
  },
  {
    title: "8-Platform Streaming Infrastructure Complete",
    date: "2026-02-08",
    excerpt:
      "Prozilli Gaming now streams simultaneously to Twitch, Kick, YouTube, Trovo, Facebook, and X with full OAuth integration and webhook pipelines. Each platform has dedicated chat connectors with real-time message routing through the PRISMAI event bus.",
    category: "Infrastructure",
  },
  {
    title: "LISA AI Assistant Launches Across All Platforms",
    date: "2026-02-07",
    excerpt:
      "LISA — the AI personality behind Prozilli Gaming — is now active in chat on every connected platform. Powered by Groq's llama-3.3-70b-versatile with OpenAI fallback, LISA handles viewer interactions, commands, and proactive engagement with full personality consistency.",
    category: "LISA",
  },
  {
    title: "Discord Server Redesigned with 42 Channels",
    date: "2026-02-06",
    excerpt:
      "The Prozilli HQ Discord server received a complete overhaul — 12 categories, 42 channels, 4 viewer roles, reaction roles, and automated welcome system. Built for community engagement with PRISMAI-powered moderation and leveling.",
    category: "Community",
  },
  {
    title: "Prozilli Gaming Website Launches",
    date: "2026-02-01",
    excerpt:
      "The all-new prozilligaming.com is live. A dark, cinema-grade design built on Next.js 15 and deployed on Cloudflare Pages. Features include a live stream embed, Fourthwall shop integration, multiplatform connect page, and a full admin dashboard.",
    category: "Announcement",
  },
  {
    title: "ZO Syndicate Season 2 Incoming",
    date: "2026-01-28",
    excerpt:
      "The next chapter of cinematic roleplay is on the horizon. New factions, new storylines, and a refreshed server framework built for deeper immersion. ZO Syndicate continues to push the boundaries of GTA RP storytelling.",
    category: "ZO Syndicate",
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-6 pt-20 pb-12 text-center">
        {/* Cinematic smoke layers */}
        <div className="cinematic-smoke" />
        {/* Film grain texture */}
        <div className="film-grain" />
        {/* Vignette */}
        <div className="vignette" />
        {/* Hero background image */}
        <div
          className="hero-image-overlay"
          style={{
            backgroundImage: `url("/images/heroes/hero-news.webp")`,
            opacity: 0.3,
          }}
        />

        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-4xl font-bold tracking-tight md:text-6xl">
            <span className="text-brand-red">NEWS</span> & UPDATES
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 max-w-xl text-muted">
            The latest from the Prozilli Gaming ecosystem.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="glass glow-border rounded-lg p-8 transition-all"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="mb-2 inline-block rounded-full border border-brand-red/20 bg-brand-red/10 px-3 py-0.5 text-xs font-medium uppercase tracking-wider text-brand-red">
                    {article.category}
                  </span>
                  <h2 className="mt-2 text-xl font-bold tracking-wide text-white">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                </div>
                <time
                  dateTime={article.date}
                  className="shrink-0 text-xs text-brand-silver"
                >
                  {formatDate(article.date)}
                </time>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-brand-darker">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center">
          <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            Stay in the Loop
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Follow on social platforms or join the Discord for the fastest updates.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/prozillihq"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-brand-red px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-red-glow"
            >
              Join Discord
            </a>
            <Link
              href="/contact"
              className="rounded-sm border border-brand-gold/30 px-8 py-3 text-sm font-medium tracking-wide text-brand-gold transition-colors hover:bg-brand-gold/10"
            >
              All Socials
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
