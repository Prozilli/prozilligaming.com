import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest news, updates, and behind-the-scenes content from Prozilli Gaming. LISA updates, ZO Syndicate news, merch drops, and more.",
};

const CATEGORIES = [
  { name: "All", slug: "all", active: true },
  { name: "Updates", slug: "updates" },
  { name: "Gaming", slug: "gaming" },
  { name: "Tech", slug: "tech" },
  { name: "Community", slug: "community" },
  { name: "Behind the Scenes", slug: "behind-the-scenes" },
];

const FEATURED_POST = {
  title: "LISA 2.0: The AI Co-Host That Never Sleeps Just Got Smarter",
  excerpt:
    "We rebuilt LISA from the ground up with Groq AI, OpenAI fallback, circuit breaker resilience, and a relationship memory system that actually remembers your jokes from six months ago. Here's everything that changed and why LISA is now the most advanced AI co-host in live streaming.",
  category: "Tech",
  date: "February 10, 2026",
  readTime: "8 min read",
  slug: "lisa-2-0-ai-cohost-upgrade",
};

const BLOG_POSTS = [
  {
    title: "ZO Syndicate RP: 51 Custom Resources and Growing",
    excerpt:
      "Our FiveM server now runs 51 fully custom resources — from a complete inventory system to gang territories, drug operations, bank heists, and AI NPCs. Here's the full breakdown of what we built and what's coming next.",
    category: "Gaming",
    date: "February 8, 2026",
    readTime: "12 min read",
    slug: "zo-syndicate-51-resources",
  },
  {
    title: "New Merch Drop: Spring 2026 Collection",
    excerpt:
      "Fresh designs just hit the Fourthwall store. Hoodies, tees, and accessories featuring the Prozilli brand, ZO Syndicate logos, and LISA-inspired designs. Limited runs on select items.",
    category: "Updates",
    date: "February 5, 2026",
    readTime: "4 min read",
    slug: "spring-2026-merch-drop",
  },
  {
    title: "Community Milestone: Building Something Real",
    excerpt:
      "We crossed a major milestone this month — not in follower count, but in what we've built together. Two Discord servers, a custom FiveM server, an AI ecosystem, and a community that shows up every day.",
    category: "Community",
    date: "February 1, 2026",
    readTime: "6 min read",
    slug: "community-milestone-2026",
  },
  {
    title: "9 Platforms, 1 Engine: How PRISMAI Connects Everything",
    excerpt:
      "A deep dive into the custom backend engine that powers Prozilli Gaming. OAuth token management, webhook processing, cross-platform chat, auto-posting, and more — all running on a single NodeJS server.",
    category: "Tech",
    date: "January 28, 2026",
    readTime: "15 min read",
    slug: "prismai-engine-deep-dive",
  },
  {
    title: "Expanding to Kick and Trovo: Multi-Platform Lessons",
    excerpt:
      "What we learned from expanding beyond Twitch and YouTube to Kick, Trovo, and TikTok. API quirks, chat differences, community behavior, and why being everywhere matters for growth.",
    category: "Behind the Scenes",
    date: "January 22, 2026",
    readTime: "7 min read",
    slug: "multi-platform-expansion",
  },
  {
    title: "The VIP System: Rewards That Follow You Everywhere",
    excerpt:
      "Our new VIP system syncs across Discord, FiveM, Twitch, YouTube, and Patreon. Subscribe anywhere and your perks follow you across the entire ecosystem. Here's how it works.",
    category: "Updates",
    date: "January 15, 2026",
    readTime: "5 min read",
    slug: "vip-system-launch",
  },
];

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Updates: "badge-red",
    Gaming: "badge-gold",
    Tech: "badge-electric",
    Community: "badge-emerald",
    "Behind the Scenes": "badge-gold",
  };
  return colors[category] || "badge-red";
}

export default function BlogPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[60vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-gold mb-6 animate-reveal">Blog</div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              Latest from{" "}
              <span className="text-shimmer">Prozilli</span>
            </h1>
            <p
              className="text-body-lg max-w-xl animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Updates, deep dives, behind-the-scenes content, and community news.
              Everything happening in the Prozilli ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* ====== CATEGORIES ====== */}
      <section className="bg-surface border-y border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
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

      {/* ====== FEATURED POST ====== */}
      <section className="py-16 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-raised p-8 md:p-12 animate-reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="badge badge-red">Featured</span>
              <span className={`badge ${getCategoryColor(FEATURED_POST.category)}`}>
                {FEATURED_POST.category}
              </span>
            </div>
            <h2 className="text-headline mb-4 hover:text-shimmer-red cursor-pointer transition-colors">
              {FEATURED_POST.title}
            </h2>
            <p className="text-body-lg max-w-3xl mb-6">
              {FEATURED_POST.excerpt}
            </p>
            <div className="flex items-center gap-6">
              <span className="text-data text-dim">{FEATURED_POST.date}</span>
              <span className="text-data text-dim">{FEATURED_POST.readTime}</span>
              <span className="btn btn-ghost btn-sm ml-auto">
                Read Article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== BLOG GRID ====== */}
      <section className="py-16 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="card-holo p-6 group block cursor-pointer">
                <div className="relative z-10">
                  {/* Placeholder image area */}
                  <div className="w-full h-40 rounded-lg bg-gradient-to-br from-glass to-raised mb-5 flex items-center justify-center border border-glass-border">
                    <svg className="w-10 h-10 text-dim" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`badge ${getCategoryColor(post.category)} text-[10px]`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-dim">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-foreground transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-data text-dim text-xs">{post.date}</span>
                    <svg className="w-4 h-4 text-dim group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== NEWSLETTER ====== */}
      <section className="py-24 bg-grid border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-raised p-8 md:p-12 max-w-2xl mx-auto text-center">
            <div className="badge badge-electric mb-6">Newsletter</div>
            <h2 className="text-headline mb-4">Stay in the Loop</h2>
            <p className="text-body-lg mb-8">
              Get the latest updates, exclusive behind-the-scenes content, and early
              access announcements delivered straight to your inbox. No spam, ever.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" action="#">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-glass border border-glass-border text-foreground placeholder:text-dim focus:outline-none focus:border-electric/50 transition-colors"
              />
              <button type="submit" className="btn btn-primary btn-lg whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-dim mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
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
            Content Managed by PRISMAI
          </div>
        </div>
      </section>
    </>
  );
}
