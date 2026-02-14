"use client";

import { useState, useEffect, useCallback } from "react";

/* ============================================================
   Types
   ============================================================ */

interface AffiliateLink {
  url: string;
  label: string;
}

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featured_image: string;
  author: string;
  seo_title: string;
  seo_description: string;
  affiliate_links: AffiliateLink[];
  status: "draft" | "published" | "archived";
  date: string;
  reading_time?: number;
}

/* ============================================================
   Constants
   ============================================================ */

const API_BASE = "/api/prismai/blog/posts";
const API_KEY = "TJs0/f8dgLd9kdE2gK6eTTXIaTWDKVAxM4lz6UaRGMQi";

const CATEGORIES = [
  "gaming",
  "guides",
  "news",
  "reviews",
  "tech",
  "lifestyle",
  "general",
  "updates",
  "community",
  "behind the scenes",
];

const EMPTY_POST: BlogPost = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  category: "general",
  tags: [],
  featured_image: "",
  author: "Prozilli",
  seo_title: "",
  seo_description: "",
  affiliate_links: [],
  status: "draft",
  date: new Date().toISOString().split("T")[0],
};

/* ============================================================
   Helpers
   ============================================================ */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function statusBadge(status: string): string {
  switch (status) {
    case "published":
      return "bg-emerald/10 text-emerald border border-emerald/20";
    case "draft":
      return "bg-warning/10 text-warning border border-warning/20";
    case "archived":
      return "bg-glass text-dim border border-glass-border";
    default:
      return "bg-glass text-dim border border-glass-border";
  }
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ============================================================
   Admin Blog Editor Page
   ============================================================ */

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /* Editor state */
  const [editing, setEditing] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost>(EMPTY_POST);
  const [tagsInput, setTagsInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  /* Filters */
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* Delete confirmation */
  const [confirmDeleteSlug, setConfirmDeleteSlug] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* ── Fetch all posts ── */
  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(API_BASE, {
        headers: { "x-api-key": API_KEY },
      });
      if (!res.ok) throw new Error(`Failed to fetch posts (${res.status})`);
      const data = await res.json();
      setPosts(data.posts || data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  /* ── Auto-clear success message ── */
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  /* ── Save post (create or update) ── */
  const handleSave = async (publishStatus?: "draft" | "published") => {
    if (!editPost.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!editPost.slug.trim()) {
      setError("Slug is required");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      ...editPost,
      status: publishStatus || editPost.status,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const isNew = !editPost.id;
      const url = isNew ? API_BASE : `${API_BASE}/${editPost.slug}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.error || `Failed to save (${res.status})`
        );
      }

      setSuccessMsg(
        isNew
          ? `Post "${payload.title}" created successfully`
          : `Post "${payload.title}" updated successfully`
      );
      setEditing(false);
      setEditPost(EMPTY_POST);
      setTagsInput("");
      setSlugManuallyEdited(false);
      await fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete (archive) post ── */
  const handleDelete = async (slug: string) => {
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/${slug}`, {
        method: "DELETE",
        headers: { "x-api-key": API_KEY },
      });
      if (!res.ok) throw new Error(`Failed to delete (${res.status})`);

      setSuccessMsg("Post archived successfully");
      setConfirmDeleteSlug(null);
      await fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  /* ── Open editor for new post ── */
  const handleNew = () => {
    setEditPost(EMPTY_POST);
    setTagsInput("");
    setSlugManuallyEdited(false);
    setShowPreview(false);
    setEditing(true);
  };

  /* ── Open editor for existing post ── */
  const handleEdit = (post: BlogPost) => {
    setEditPost(post);
    setTagsInput(post.tags?.join(", ") || "");
    setSlugManuallyEdited(true);
    setShowPreview(false);
    setEditing(true);
  };

  /* ── Auto-generate slug from title ── */
  const handleTitleChange = (title: string) => {
    setEditPost((prev) => ({
      ...prev,
      title,
      slug: slugManuallyEdited ? prev.slug : slugify(title),
    }));
  };

  /* ── Affiliate link management ── */
  const addAffiliateLink = () => {
    setEditPost((prev) => ({
      ...prev,
      affiliate_links: [...prev.affiliate_links, { url: "", label: "" }],
    }));
  };

  const removeAffiliateLink = (index: number) => {
    setEditPost((prev) => ({
      ...prev,
      affiliate_links: prev.affiliate_links.filter((_, i) => i !== index),
    }));
  };

  const updateAffiliateLink = (
    index: number,
    field: "url" | "label",
    value: string
  ) => {
    setEditPost((prev) => ({
      ...prev,
      affiliate_links: prev.affiliate_links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  /* ── Filter posts ── */
  const filteredPosts = posts.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  /* ============================================================
     Editor Modal
     ============================================================ */
  if (editing) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {editPost.id ? "Edit Post" : "New Post"}
            </h1>
            <p className="text-sm text-muted mt-1">
              {editPost.id ? `Editing: ${editPost.title || "Untitled"}` : "Create a new blog post"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn btn-secondary btn-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {showPreview ? "Edit" : "Preview"}
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setEditPost(EMPTY_POST);
                setTagsInput("");
                setSlugManuallyEdited(false);
              }}
              disabled={saving}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="btn btn-secondary btn-sm"
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="btn btn-primary btn-sm"
            >
              {saving ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="card p-4 border-error/30 bg-error/5 flex items-center justify-between">
            <span className="text-sm text-error">{error}</span>
            <button onClick={() => setError(null)} className="text-dim hover:text-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Preview Mode */}
        {showPreview ? (
          <div className="card p-8">
            <div className="max-w-3xl mx-auto">
              {editPost.featured_image && (
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-8 border border-glass-border">
                  <img
                    src={editPost.featured_image}
                    alt={editPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <span className="badge badge-electric text-[10px] mb-4">
                {editPost.category}
              </span>
              <h1 className="text-headline mb-4">
                {editPost.title || "Untitled Post"}
              </h1>
              <p className="text-body-lg mb-8">
                {editPost.excerpt || "No excerpt provided."}
              </p>
              <div className="divider mb-8" />
              <div
                className="blog-content prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: editPost.content || "<p>No content yet.</p>",
                }}
              />
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Main form */}
            <div className="space-y-6">
              {/* Title */}
              <div className="card p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editPost.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title..."
                    disabled={saving}
                    className="w-full px-4 py-3 rounded-lg bg-glass border border-glass-border text-lg font-semibold text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    Slug
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-dim">/blog/</span>
                    <input
                      type="text"
                      value={editPost.slug}
                      onChange={(e) => {
                        setSlugManuallyEdited(true);
                        setEditPost((prev) => ({
                          ...prev,
                          slug: slugify(e.target.value),
                        }));
                      }}
                      placeholder="post-slug"
                      disabled={saving}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    Excerpt
                  </label>
                  <textarea
                    value={editPost.excerpt}
                    onChange={(e) =>
                      setEditPost((prev) => ({
                        ...prev,
                        excerpt: e.target.value,
                      }))
                    }
                    placeholder="Brief description for cards and SEO..."
                    rows={3}
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="card p-5">
                <label className="text-xs font-semibold text-dim block mb-1.5">
                  Content (HTML / Markdown)
                </label>
                <textarea
                  value={editPost.content}
                  onChange={(e) =>
                    setEditPost((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  placeholder="Write your post content here... HTML tags are supported."
                  rows={20}
                  disabled={saving}
                  className="w-full px-4 py-3 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-y disabled:opacity-50 font-mono leading-relaxed"
                />
                <p className="text-[10px] text-dim mt-2">
                  Supports HTML. Use &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;,
                  &lt;ul&gt;, &lt;ol&gt;, &lt;blockquote&gt;, &lt;pre&gt;,
                  &lt;code&gt;, &lt;img&gt; etc.
                </p>
              </div>

              {/* SEO */}
              <div className="card p-5 space-y-4">
                <h3 className="text-sm font-bold">SEO Settings</h3>
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={editPost.seo_title}
                    onChange={(e) =>
                      setEditPost((prev) => ({
                        ...prev,
                        seo_title: e.target.value,
                      }))
                    }
                    placeholder="Custom title for search engines (optional)"
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                  />
                  <p className="text-[10px] text-dim mt-1">
                    {editPost.seo_title
                      ? `${editPost.seo_title.length}/60 characters`
                      : "Falls back to post title if empty"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    SEO Description
                  </label>
                  <textarea
                    value={editPost.seo_description}
                    onChange={(e) =>
                      setEditPost((prev) => ({
                        ...prev,
                        seo_description: e.target.value,
                      }))
                    }
                    placeholder="Custom description for search engines (optional)"
                    rows={2}
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none disabled:opacity-50"
                  />
                  <p className="text-[10px] text-dim mt-1">
                    {editPost.seo_description
                      ? `${editPost.seo_description.length}/160 characters`
                      : "Falls back to excerpt if empty"}
                  </p>
                </div>
              </div>

              {/* Affiliate Links */}
              <div className="card p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">Affiliate Links</h3>
                  <button
                    onClick={addAffiliateLink}
                    disabled={saving}
                    className="btn btn-ghost btn-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Link
                  </button>
                </div>

                {editPost.affiliate_links.length === 0 && (
                  <p className="text-xs text-dim">
                    No affiliate links added. These appear in a sidebar on the
                    post page.
                  </p>
                )}

                {editPost.affiliate_links.map((link, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-glass border border-glass-border"
                  >
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) =>
                          updateAffiliateLink(i, "label", e.target.value)
                        }
                        placeholder="Link label"
                        disabled={saving}
                        className="w-full px-3 py-2 rounded-lg bg-base border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) =>
                          updateAffiliateLink(i, "url", e.target.value)
                        }
                        placeholder="https://..."
                        disabled={saving}
                        className="w-full px-3 py-2 rounded-lg bg-base border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50 font-mono"
                      />
                    </div>
                    <button
                      onClick={() => removeAffiliateLink(i)}
                      disabled={saving}
                      className="p-2 text-dim hover:text-error transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <div className="card p-5 space-y-4">
                <h3 className="text-sm font-bold">Publish Settings</h3>

                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    Status
                  </label>
                  <select
                    value={editPost.status}
                    onChange={(e) =>
                      setEditPost((prev) => ({
                        ...prev,
                        status: e.target.value as BlogPost["status"],
                      }))
                    }
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    Category
                  </label>
                  <select
                    value={editPost.category}
                    onChange={(e) =>
                      setEditPost((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50 capitalize"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="capitalize">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editPost.author}
                    onChange={(e) =>
                      setEditPost((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    placeholder="Author name"
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editPost.date?.split("T")[0] || ""}
                    onChange={(e) =>
                      setEditPost((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="fivem, rp, update"
                    disabled={saving}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div className="card p-5 space-y-4">
                <h3 className="text-sm font-bold">Featured Image</h3>
                <input
                  type="url"
                  value={editPost.featured_image}
                  onChange={(e) =>
                    setEditPost((prev) => ({
                      ...prev,
                      featured_image: e.target.value,
                    }))
                  }
                  placeholder="https://example.com/image.jpg"
                  disabled={saving}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50 font-mono"
                />
                {editPost.featured_image && (
                  <div className="w-full aspect-video rounded-lg overflow-hidden border border-glass-border">
                    <img
                      src={editPost.featured_image}
                      alt="Featured"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="card p-5">
                <h3 className="text-sm font-bold mb-3">Post Info</h3>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex justify-between">
                    <span>Word count</span>
                    <span className="text-data">
                      {editPost.content
                        .replace(/<[^>]*>/g, "")
                        .split(/\s+/)
                        .filter(Boolean).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reading time</span>
                    <span className="text-data">
                      ~
                      {Math.max(
                        1,
                        Math.ceil(
                          editPost.content
                            .replace(/<[^>]*>/g, "")
                            .split(/\s+/)
                            .filter(Boolean).length / 250
                        )
                      )}{" "}
                      min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slug</span>
                    <span className="text-data font-mono truncate max-w-[150px]">
                      {editPost.slug || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ============================================================
     Post List View
     ============================================================ */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Editor</h1>
          <p className="text-sm text-muted mt-1">
            {loading
              ? "Loading posts..."
              : `${posts.length} total post${posts.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="btn btn-secondary btn-sm"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
              />
            </svg>
            Refresh
          </button>
          <button onClick={handleNew} className="btn btn-primary btn-sm">
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New Post
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="card p-4 border-emerald/30 bg-emerald/5 flex items-center gap-3">
          <svg
            className="w-5 h-5 text-emerald flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm text-emerald">{successMsg}</span>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="card p-4 border-error/30 bg-error/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-error flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <span className="text-sm text-error">{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-dim hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-1 p-1 rounded-lg bg-glass border border-glass-border w-fit">
          {(["all", "published", "draft", "archived"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all capitalize ${
                statusFilter === s
                  ? "bg-red/15 text-red-bright"
                  : "text-muted hover:text-foreground hover:bg-white/[0.04]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="flex-1 max-w-md px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
        />
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="card overflow-hidden">
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-4 w-48 bg-glass rounded" />
                <div className="h-4 flex-1 bg-glass rounded" />
                <div className="h-4 w-20 bg-glass rounded" />
                <div className="h-4 w-24 bg-glass rounded" />
                <div className="h-4 w-16 bg-glass rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && !error && (
        <div className="card p-12 text-center">
          <svg
            className="w-12 h-12 text-dim mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
            />
          </svg>
          <h3 className="text-sm font-bold mb-1">No blog posts yet</h3>
          <p className="text-xs text-muted mb-4">
            Create your first blog post to get started.
          </p>
          <button onClick={handleNew} className="btn btn-primary btn-sm">
            Create Post
          </button>
        </div>
      )}

      {/* No Filter Results */}
      {!loading && posts.length > 0 && filteredPosts.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-sm text-muted">
            No posts match your current filters.
          </p>
        </div>
      )}

      {/* Posts Table */}
      {!loading && filteredPosts.length > 0 && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">
                    Title
                  </th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">
                    Category
                  </th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">
                    Status
                  </th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-4">
                    Date
                  </th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.slug}
                    className="border-b border-glass-border hover:bg-glass transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {post.featured_image && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-glass-border flex-shrink-0">
                            <img
                              src={post.featured_image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate max-w-xs">
                            {post.title}
                          </div>
                          <div className="text-[10px] text-dim font-mono truncate max-w-xs">
                            /blog/{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-muted capitalize">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${statusBadge(post.status)}`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 text-data text-xs text-dim">
                      {formatDate(post.date)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* View (if published) */}
                        {post.status === "published" && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-dim hover:text-foreground transition-colors"
                            title="View post"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                              />
                            </svg>
                          </a>
                        )}

                        {/* Edit */}
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-1.5 text-dim hover:text-foreground transition-colors"
                          title="Edit post"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                            />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setConfirmDeleteSlug(post.slug)}
                          className="p-1.5 text-dim hover:text-error transition-colors"
                          title="Delete post"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !deleting && setConfirmDeleteSlug(null)}
          />
          <div className="relative w-full max-w-sm glass-raised p-6 animate-reveal text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-error/10 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-error"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Delete Post?</h3>
            <p className="text-sm text-muted mb-6">
              This will archive the post &ldquo;{confirmDeleteSlug}&rdquo;. This
              action can be undone by changing the status back.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDeleteSlug(null)}
                disabled={deleting}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteSlug)}
                disabled={deleting}
                className="btn btn-sm bg-error/90 hover:bg-error text-white"
              >
                {deleting ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                      />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
