import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News",
};

const PLACEHOLDER_ARTICLES = [
  {
    title: "Prozilli Gaming Launches New Website",
    date: "2025-02-01",
    excerpt:
      "The all-new prozilligaming.com is live. A complete redesign with a dark, cinema-grade aesthetic, multiplatform integration, and the foundation for PRISMAI-powered features.",
    category: "Announcement",
  },
  {
    title: "ZO Syndicate Season 2 Incoming",
    date: "2025-01-28",
    excerpt:
      "The next chapter of cinematic roleplay is on the horizon. New factions, new storylines, and a refreshed server framework built for deeper immersion.",
    category: "ZO Syndicate",
  },
  {
    title: "Multiplatform Streaming Setup Revealed",
    date: "2025-01-20",
    excerpt:
      "A deep dive into the production setup behind Prozilli Gaming's simultaneous streams across YouTube, Twitch, Kick, Trovo, and Facebook.",
    category: "Behind the Scenes",
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
      <section className="gradient-gaming scanlines relative flex flex-col items-center px-6 pt-20 pb-12 text-center">
        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-4xl font-bold tracking-tight md:text-6xl">
            <span className="text-brand-red">NEWS</span> & UPDATES
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 max-w-xl text-muted">
            The latest from the Prozilli Gaming ecosystem.
          </p>
        </div>
      </section>

      {/* PRISMAI Notice */}
      <section className="mx-auto max-w-5xl px-6 pt-12">
        <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 p-6 text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-brand-gold">
            Coming Soon
          </span>
          <p className="mt-2 text-sm text-muted">
            News feed coming soon — powered by PRISMAI. Automated updates, cross-platform aggregation, and real-time community news.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-6">
          {PLACEHOLDER_ARTICLES.map((article) => (
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
