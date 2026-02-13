import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news and updates from Prozilli Gaming. Announcements, new content, events, and community highlights.",
  keywords: ["Prozilli Gaming news", "streamer updates", "gaming announcements", "Prozilli blog", "community updates"],
  openGraph: {
    title: "News & Updates | Prozilli Gaming",
    description: "Stay updated with the latest from Prozilli Gaming.",
    type: "website",
    url: "https://prozilligaming.com/news",
  },
  twitter: {
    card: "summary",
    title: "News & Updates | Prozilli Gaming",
    description: "Latest news and updates from Prozilli Gaming.",
  },
  alternates: { canonical: "https://prozilligaming.com/news" },
};

const ARTICLES = [
  {
    title: "PRISMAI Engine Goes Live",
    date: "2026-02-09",
    excerpt: "The PRISMAI Core Engine is now fully operational — powering LISA across Twitch, Kick, Discord, YouTube, Trovo, and Facebook simultaneously. Real-time chat responses, cross-platform event handling, and AI-driven engagement are live in production.",
    category: "PRISMAI",
  },
  {
    title: "8-Platform Streaming Infrastructure Complete",
    date: "2026-02-08",
    excerpt: "Prozilli Gaming now streams simultaneously to Twitch, Kick, YouTube, Trovo, Facebook, and X with full OAuth integration and webhook pipelines.",
    category: "Infrastructure",
  },
  {
    title: "LISA AI Assistant Launches Across All Platforms",
    date: "2026-02-07",
    excerpt: "LISA — the AI personality behind Prozilli Gaming — is now active in chat on every connected platform. Powered by Groq's llama-3.3-70b-versatile with OpenAI fallback.",
    category: "LISA",
  },
  {
    title: "Discord Server Redesigned with 42 Channels",
    date: "2026-02-06",
    excerpt: "The Prozilli HQ Discord server received a complete overhaul — 12 categories, 42 channels, 4 viewer roles, reaction roles, and automated welcome system.",
    category: "Community",
  },
  {
    title: "Prozilli Gaming Website Launches",
    date: "2026-02-01",
    excerpt: "The all-new prozilligaming.com is live. Built on Next.js 15 and deployed on Cloudflare Pages with live stream embed, shop integration, and full admin dashboard.",
    category: "Announcement",
  },
  {
    title: "ZO Syndicate Season 2 Incoming",
    date: "2026-01-28",
    excerpt: "The next chapter of cinematic roleplay is on the horizon. New factions, new storylines, and a refreshed server framework built for deeper immersion.",
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
      <PageHero
        label="Updates"
        labelColor="red"
        title="NEWS & UPDATES"
        subtitle="The latest from the Prozilli Gaming ecosystem."
        accent="red"
      />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-6">
          {ARTICLES.map((article) => (
            <article key={article.title} className="panel p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="inline-block rounded-full border border-red/20 bg-red/10 px-3 py-0.5 text-xs font-medium uppercase tracking-wider text-red">
                    {article.category}
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-foreground">{article.title}</h2>
                  <p className="text-body mt-3 text-base">{article.excerpt}</p>
                </div>
                <time dateTime={article.date} className="shrink-0 text-data text-xs text-dim">
                  {formatDate(article.date)}
                </time>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center">
          <h2 className="text-headline text-foreground">Stay in the Loop</h2>
          <p className="text-body mt-3 max-w-md text-base">
            Follow on social platforms or join the Discord for the fastest updates.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="https://discord.gg/prozillihq" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Join Discord
            </a>
            <Link href="/contact" className="btn-secondary">All Socials</Link>
          </div>
        </div>
      </section>
    </>
  );
}
