"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SocialShare } from "@/components/SocialShare";

/* ============================================================
   Types
   ============================================================ */

interface AffiliateLink {
  url: string;
  label: string;
}

interface BlogPostData {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
  author?: string;
  reading_time?: number;
  readTime?: string;
  featured_image?: string;
  tags?: string[];
  seo_title?: string;
  seo_description?: string;
  affiliate_links?: AffiliateLink[];
  status?: string;
}

interface RelatedPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  featured_image?: string;
  reading_time?: number;
  readTime?: string;
}

/* ============================================================
   Helpers
   ============================================================ */

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

function formatReadTime(post: BlogPostData | RelatedPost): string {
  if ("readTime" in post && post.readTime) return post.readTime;
  if (post.reading_time) return `${post.reading_time} min read`;
  return "5 min read";
}

function estimateReadingTime(content: string): number {
  const textOnly = content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ");
  const wordCount = textOnly.split(" ").length;
  return Math.max(1, Math.ceil(wordCount / 250));
}

function isoDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toISOString();
  } catch {
    return dateStr;
  }
}

/* ============================================================
   Loading Skeleton
   ============================================================ */

function PostSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="relative py-32 bg-dots">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-6 w-32 bg-glass rounded-full mb-6" />
          <div className="h-12 w-3/4 bg-glass rounded mb-4" />
          <div className="h-12 w-1/2 bg-glass rounded mb-8" />
          <div className="flex items-center gap-6">
            <div className="h-4 w-28 bg-glass rounded" />
            <div className="h-4 w-36 bg-glass rounded" />
            <div className="h-4 w-24 bg-glass rounded" />
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="py-16 bg-base">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="space-y-4">
            <div className="h-4 w-full bg-glass rounded" />
            <div className="h-4 w-5/6 bg-glass rounded" />
            <div className="h-4 w-full bg-glass rounded" />
            <div className="h-4 w-4/6 bg-glass rounded" />
            <div className="h-8 bg-glass rounded mt-8 mb-4" />
            <div className="h-4 w-full bg-glass rounded" />
            <div className="h-4 w-3/4 bg-glass rounded" />
            <div className="h-4 w-5/6 bg-glass rounded" />
            <div className="h-4 w-full bg-glass rounded" />
            <div className="h-4 w-2/3 bg-glass rounded" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   Blog Post Component
   ============================================================ */

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  /* ── Fetch post by slug ── */
  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const res = await fetch(`/api/prismai/blog/posts/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        const postData: BlogPostData = data.post || data;

        if (!postData || !postData.title) throw new Error("Invalid post");
        setPost(postData);

        // Fetch related posts (same category)
        try {
          const relRes = await fetch(
            `/api/prismai/blog/posts?status=published&category=${encodeURIComponent(postData.category)}&limit=4`
          );
          if (relRes.ok) {
            const relData = await relRes.json();
            const allRelated: RelatedPost[] = (relData.posts || relData || []).filter(
              (p: RelatedPost) => p.slug !== slug
            );
            setRelatedPosts(allRelated.slice(0, 3));
          }
        } catch {
          // Related posts are optional
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  /* ── Loading state ── */
  if (loading) {
    return <PostSkeleton />;
  }

  /* ── Not found state ── */
  if (notFound || !post) {
    return (
      <section className="py-32 bg-base min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-glass flex items-center justify-center mb-6">
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
          </div>
          <h1 className="text-headline mb-4">Post Not Found</h1>
          <p className="text-body-lg mb-8">
            This article doesn&apos;t exist or may have been removed.
          </p>
          <Link href="/blog" className="btn btn-primary">
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  /* ── Derived values ── */
  const readingTime = post.reading_time || estimateReadingTime(post.content);
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${post.slug}`
      : `https://prozilligaming.com/blog/${post.slug}`;

  /* ── JSON-LD BlogPosting Schema ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    image: post.featured_image || undefined,
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.date),
    author: {
      "@type": "Person",
      name: post.author || "Prozilli",
    },
    publisher: {
      "@type": "Organization",
      name: "Prozilli Entertainment",
      logo: {
        "@type": "ImageObject",
        url: "https://prozilligaming.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    wordCount: post.content.replace(/<[^>]*>/g, "").split(/\s+/).length,
    articleSection: post.category,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Floating Social Share (desktop only) */}
      <SocialShare url={fullUrl} title={post.title} variant="floating" />

      {/* ====== HERO ====== */}
      <section className="relative bg-dots overflow-hidden">
        {/* Background image if exists */}
        {post.featured_image && (
          <div className="absolute inset-0">
            <img
              src={post.featured_image}
              alt=""
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/80 to-void" />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Category badge */}
          <div className="flex items-center gap-3 mb-6 animate-reveal">
            <span className={`badge ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-dim bg-glass px-2 py-0.5 rounded-full border border-glass-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-display mb-6 animate-reveal"
            style={{ animationDelay: "0.1s" }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            className="text-body-lg max-w-3xl mb-8 animate-reveal"
            style={{ animationDelay: "0.15s" }}
          >
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-6 text-sm animate-reveal"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red/30 to-gold/30 flex items-center justify-center text-xs font-bold">
                {(post.author || "P").charAt(0).toUpperCase()}
              </div>
              <span className="text-foreground font-medium">
                {post.author || "Prozilli"}
              </span>
            </div>
            <span className="text-data text-dim">{formatDate(post.date)}</span>
            <span className="text-data text-dim">
              {readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* ====== FEATURED IMAGE (full-width) ====== */}
      {post.featured_image && (
        <section className="bg-base">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-4">
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-glass-border">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* ====== CONTENT + SIDEBAR ====== */}
      <section className="py-16 bg-base">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div
            className={`grid gap-12 ${
              post.affiliate_links && post.affiliate_links.length > 0
                ? "lg:grid-cols-[1fr_280px]"
                : "lg:grid-cols-1 max-w-4xl mx-auto"
            }`}
          >
            {/* Main content */}
            <article className="min-w-0">
              <div
                className="blog-content prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  lineHeight: 1.85,
                }}
              />

              {/* Inline share section */}
              <div className="mt-12 pt-8 border-t border-glass-border">
                <SocialShare url={fullUrl} title={post.title} variant="inline" />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted bg-glass px-3 py-1.5 rounded-full border border-glass-border hover:border-glass-border-hover transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar — Affiliate Links */}
            {post.affiliate_links && post.affiliate_links.length > 0 && (
              <aside className="space-y-4">
                <div className="sticky top-24">
                  <h3 className="text-label text-dim mb-4">
                    Recommended Links
                  </h3>
                  <div className="space-y-3">
                    {post.affiliate_links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block p-4 rounded-lg bg-glass border border-glass-border hover:border-gold/30 hover:bg-gold/5 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-4 h-4 text-gold"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.824"
                              />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground group-hover:text-gold transition-colors truncate">
                              {link.label}
                            </div>
                            <div className="text-[10px] text-dim">
                              Affiliate Link
                            </div>
                          </div>
                          <svg
                            className="w-4 h-4 text-dim group-hover:text-gold transition-colors flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                            />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                  <p className="text-[10px] text-dim mt-3">
                    Some links may be affiliate links. We may earn a commission
                    at no extra cost to you.
                  </p>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ====== RELATED POSTS ====== */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-dots border-t border-glass-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-headline mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="block"
                >
                  <article className="card p-5 group cursor-pointer h-full">
                    {rp.featured_image && (
                      <div className="w-full h-32 rounded-lg overflow-hidden mb-4 border border-glass-border">
                        <img
                          src={rp.featured_image}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <span
                      className={`badge ${getCategoryColor(rp.category)} text-[10px] mb-3`}
                    >
                      {rp.category}
                    </span>
                    <h3 className="text-sm font-bold mb-2 group-hover:text-foreground transition-colors leading-snug line-clamp-2">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-muted line-clamp-2 mb-3">
                      {rp.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-data text-dim text-[10px]">
                        {formatDate(rp.date)}
                      </span>
                      <span className="text-data text-dim text-[10px]">
                        {formatReadTime(rp)}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====== BACK TO BLOG CTA ====== */}
      <section className="py-12 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="btn btn-ghost group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            All Posts
          </Link>
          <div className="powered-by-prismai">
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
