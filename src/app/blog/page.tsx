"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";

/* ============================================================
   Types
   ============================================================ */

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
  reading_time?: number;
  featured_image?: string;
  author?: string;
  tags?: string[];
  status?: string;
}

/* ============================================================
   Hardcoded Fallback Data
   ============================================================ */

const CATEGORIES = [
  "All",
  "Updates",
  "Gaming",
  "Tech",
  "Community",
  "Behind the Scenes",
  "Guides",
  "News",
  "Reviews",
  "Lifestyle",
];

const FALLBACK_FEATURED: BlogPost = {
  title: "LISA 2.0: The AI Co-Host That Never Sleeps Just Got Smarter",
  excerpt:
    "We rebuilt LISA from the ground up with Groq AI, OpenAI fallback, circuit breaker resilience, and a relationship memory system that actually remembers your jokes from six months ago. Here's everything that changed and why LISA is now the most advanced AI co-host in live streaming.",
  category: "Tech",
  date: "February 10, 2026",
  readTime: "8 min read",
  slug: "lisa-2-0-ai-cohost-upgrade",
};

const FALLBACK_POSTS: BlogPost[] = [
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

/* ============================================================
   Helpers
   ============================================================ */

const POSTS_PER_PAGE = 9;

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Updates: "badge-red",
    Gaming: "badge-gold",
    Tech: "badge-electric",
    Community: "badge-emerald",
    "Behind the Scenes": "badge-gold",
    Guides: "badge-electric",
    News: "badge-red",
    Reviews: "badge-emerald",
    Lifestyle: "badge-gold",
    General: "badge-electric",
  };
  return colors[category] || "badge-red";
}

function formatReadTime(post: BlogPost): string {
  if (post.readTime) return post.readTime;
  if (post.reading_time) return `${post.reading_time} min read`;
  return "5 min read";
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ============================================================
   Skeleton Components
   ============================================================ */

function FeaturedSkeleton() {
  return (
    <div className="glass-raised p-8 md:p-12 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-6 w-20 bg-glass rounded-full" />
        <div className="h-6 w-16 bg-glass rounded-full" />
      </div>
      <div className="h-8 w-3/4 bg-glass rounded mb-4" />
      <div className="h-4 w-full bg-glass rounded mb-2" />
      <div className="h-4 w-2/3 bg-glass rounded mb-6" />
      <div className="flex items-center gap-6">
        <div className="h-4 w-32 bg-glass rounded" />
        <div className="h-4 w-24 bg-glass rounded" />
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="card-holo p-6 animate-pulse">
      <div className="relative z-10">
        <div className="w-full h-40 rounded-lg bg-glass mb-5" />
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-16 bg-glass rounded-full" />
          <div className="h-4 w-20 bg-glass rounded" />
        </div>
        <div className="h-5 w-3/4 bg-glass rounded mb-2" />
        <div className="h-4 w-full bg-glass rounded mb-1" />
        <div className="h-4 w-2/3 bg-glass rounded mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-28 bg-glass rounded" />
          <div className="h-4 w-4 bg-glass rounded" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Blog Listing Page
   ============================================================ */

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [usingFallback, setUsingFallback] = useState(false);

  /* ── Fetch posts from API ── */
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/prismai/blog/posts?status=published");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const apiPosts: BlogPost[] = data.posts || data || [];

        if (apiPosts.length > 0) {
          setFeaturedPost(apiPosts[0]);
          setPosts(apiPosts.slice(1));
        } else {
          throw new Error("No posts");
        }
      } catch {
        setFeaturedPost(FALLBACK_FEATURED);
        setPosts(FALLBACK_POSTS);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  /* ── Filter and search ── */
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [posts, activeCategory, searchQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const availableCategories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    if (featuredPost) cats.add(featuredPost.category);
    return CATEGORIES.filter((c) => c === "All" || cats.has(c));
  }, [posts, featuredPost]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(POSTS_PER_PAGE);
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[60vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-gold mb-6 animate-reveal">Blog</div>
            <h1
              className="text-display mb-6 animate-reveal"
              style={{ animationDelay: "0.1s" }}
            >
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

      {/* ====== CATEGORIES + SEARCH ====== */}
      <section className="bg-surface border-y border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-wrap gap-2 flex-1">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`btn btn-sm ${
                    activeCategory === cat ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder:text-dim focus:outline-none focus:border-red/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURED POST ====== */}
      <section className="py-16 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <FeaturedSkeleton />
          ) : featuredPost ? (
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <div className="glass-raised p-8 md:p-12 animate-reveal group">
                {featuredPost.featured_image && (
                  <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6 border border-glass-border">
                    <img
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <span className="badge badge-red">Featured</span>
                  <span
                    className={`badge ${getCategoryColor(featuredPost.category)}`}
                  >
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-headline mb-4 group-hover:text-shimmer-red transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-body-lg max-w-3xl mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-data text-dim">
                    {formatDate(featuredPost.date)}
                  </span>
                  <span className="text-data text-dim">
                    {formatReadTime(featuredPost)}
                  </span>
                  <span className="btn btn-ghost btn-sm ml-auto">
                    Read Article
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      {/* ====== BLOG GRID ====== */}
      <section className="py-16 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Active filter indicator */}
          {(activeCategory !== "All" || searchQuery.trim()) && (
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-muted">
                {filteredPosts.length} post
                {filteredPosts.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && (
                  <>
                    {" "}
                    in{" "}
                    <span className="text-foreground font-semibold">
                      {activeCategory}
                    </span>
                  </>
                )}
                {searchQuery.trim() && (
                  <>
                    {" "}
                    matching &ldquo;
                    <span className="text-foreground font-semibold">
                      {searchQuery}
                    </span>
                    &rdquo;
                  </>
                )}
              </span>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className="text-xs text-dim hover:text-foreground transition-colors underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <svg
                className="w-16 h-16 text-dim mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h3 className="text-lg font-bold mb-2">No posts found</h3>
              <p className="text-sm text-muted">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}

          {/* Post Grid */}
          {!loading && filteredPosts.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
                {visiblePosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block"
                  >
                    <article className="card-holo p-6 group cursor-pointer h-full">
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-full h-40 rounded-lg overflow-hidden mb-5 border border-glass-border bg-gradient-to-br from-glass to-raised flex items-center justify-center">
                          {post.featured_image ? (
                            <img
                              src={post.featured_image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <svg
                              className="w-10 h-10 text-dim"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                              />
                            </svg>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`badge ${getCategoryColor(post.category)} text-[10px]`}
                          >
                            {post.category}
                          </span>
                          <span className="text-xs text-dim">
                            {formatReadTime(post)}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-foreground transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-data text-dim text-xs">
                            {formatDate(post.date)}
                          </span>
                          <svg
                            className="w-4 h-4 text-dim group-hover:text-foreground transition-colors"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="btn btn-secondary btn-lg"
                  >
                    Load More Posts
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ====== NEWSLETTER ====== */}
      <section className="py-24 bg-grid border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
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
            {usingFallback && (
              <span className="text-dim ml-2">(Offline)</span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
