"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { AutopostConfig, AutopostPost, AutopostStats, VideoGenerationResult } from "@/lib/api";

/* ============================================================
   Auto-Post Scheduler Page — Real API Integration
   ============================================================ */

type ContentType = "text" | "image" | "video" | "reel" | "story" | "short";

const PLATFORM_OPTIONS = [
  { id: "x", name: "X", color: "#ffffff", types: ["text", "image"] },
  { id: "facebook", name: "Facebook", color: "#1877f2", types: ["text", "image", "story", "reel"] },
  { id: "instagram", name: "Instagram", color: "#e4405f", types: ["image", "story", "reel"] },
  { id: "tiktok", name: "TikTok", color: "#ff0050", types: ["video", "reel"] },
  { id: "youtube", name: "YouTube", color: "#ff0000", types: ["video", "short"] },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

const statusColors: Record<string, string> = {
  scheduled: "badge-electric",
  queued: "badge-electric",
  posted: "badge-emerald",
  failed: "badge-red",
  draft: "badge-gold",
  pending: "badge-gold",
};

const typeIcons: Record<string, string> = {
  text: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12",
  image: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M18 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  video: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
  reel: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5",
  story: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  short: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-8.625 0V5.625m8.625 12.75V5.625",
};

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateStr;
  }
}

function relativeTime(dateStr?: string | null): string {
  if (!dateStr) return "";
  try {
    const diff = new Date(dateStr).getTime() - Date.now();
    const absDiff = Math.abs(diff);
    const minutes = Math.floor(absDiff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const prefix = diff > 0 ? "in " : "";
    const suffix = diff < 0 ? " ago" : "";
    if (days > 0) return `${prefix}${days}d${suffix}`;
    if (hours > 0) return `${prefix}${hours}h${suffix}`;
    if (minutes > 0) return `${prefix}${minutes}m${suffix}`;
    return "now";
  } catch {
    return "";
  }
}

/* ============================================================
   Component
   ============================================================ */

export default function AutoPostPage() {
  const [activeTab, setActiveTab] = useState<"queue" | "calendar" | "create" | "video">("queue");

  // Data states
  const [config, setConfig] = useState<AutopostConfig | null>(null);
  const [stats, setStats] = useState<AutopostStats | null>(null);
  const [queue, setQueue] = useState<AutopostPost[]>([]);
  const [history, setHistory] = useState<AutopostPost[]>([]);
  const [schedulerStatus, setSchedulerStatus] = useState<{ running: boolean; nextRun?: string; paused?: boolean } | null>(null);

  // Loading states
  const [loadingQueue, setLoadingQueue] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Create tab state
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostHashtags, setNewPostHashtags] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["x", "facebook"]);
  const [contentType, setContentType] = useState<ContentType>("text");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isPostingNow, setIsPostingNow] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  // Video tab state
  const [imagePrompt, setImagePrompt] = useState("");
  const [motionPrompt, setMotionPrompt] = useState("");
  const [videoResolution, setVideoResolution] = useState("720");
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoResult, setVideoResult] = useState<VideoGenerationResult | null>(null);
  const [videoPipelineStep, setVideoPipelineStep] = useState(0);

  // Action states
  const [togglingScheduler, setTogglingScheduler] = useState(false);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  /* ──────────── Data Fetching ──────────── */

  const loadQueue = useCallback(async () => {
    setLoadingQueue(true);
    try {
      const [queueRes, historyRes] = await Promise.all([
        api.autopostQueue(50),
        api.autopostHistory(50),
      ]);
      setQueue(queueRes.queue || []);
      setHistory(historyRes.history || []);
    } catch (err) {
      console.error("Failed to load queue/history:", err);
    } finally {
      setLoadingQueue(false);
    }
  }, []);

  const loadStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const s = await api.autopostStats();
      setStats(s);
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  const loadConfig = useCallback(async () => {
    setLoadingConfig(true);
    try {
      const [c, s] = await Promise.all([
        api.autopostConfig(),
        api.autopostSchedulerStatus(),
      ]);
      setConfig(c);
      setSchedulerStatus(s);
    } catch (err) {
      console.error("Failed to load config:", err);
    } finally {
      setLoadingConfig(false);
    }
  }, []);

  useEffect(() => {
    loadQueue();
    loadStats();
    loadConfig();
  }, [loadQueue, loadStats, loadConfig]);

  // Refresh data when switching tabs
  useEffect(() => {
    if (activeTab === "queue") loadQueue();
    if (activeTab === "calendar") loadQueue();
  }, [activeTab, loadQueue]);

  /* ──────────── Combined post list (queue + history) ──────────── */

  const allPosts: AutopostPost[] = [
    ...queue.map((p) => ({ ...p, status: p.status || "scheduled" })),
    ...history,
  ].sort((a, b) => {
    const dateA = a.scheduledAt || a.postedAt || a.createdAt || "";
    const dateB = b.scheduledAt || b.postedAt || b.createdAt || "";
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  /* ──────────── Calendar data ──────────── */

  function getCalendarPosts(day: string, hour: string): AutopostPost[] {
    const dayMap: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
    const hourNum = parseInt(hour);
    return allPosts.filter((p) => {
      const d = p.scheduledAt || p.postedAt;
      if (!d) return false;
      try {
        const date = new Date(d);
        return date.getDay() === dayMap[day] && date.getHours() === hourNum;
      } catch {
        return false;
      }
    });
  }

  /* ──────────── Actions ──────────── */

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    setCreateError("");
    try {
      const platform = selectedPlatforms[0] || "x";
      const result = await api.autopostGenerate({ platform, category: "gaming" });
      if (result.success && result.caption) {
        setNewPostContent(result.caption);
        if (result.hashtags) setNewPostHashtags(result.hashtags);
      } else {
        setCreateError(result.error || "AI generation failed");
      }
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "AI generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSchedulePost = async () => {
    if (!newPostContent.trim() && !["story", "reel"].includes(contentType)) {
      setCreateError("Content is required");
      return;
    }
    if (!scheduleDate || !scheduleTime) {
      setCreateError("Please select a date and time");
      return;
    }
    if (selectedPlatforms.length === 0) {
      setCreateError("Please select at least one platform");
      return;
    }

    setIsScheduling(true);
    setCreateError("");
    setCreateSuccess("");

    try {
      const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
      const results = await Promise.allSettled(
        selectedPlatforms.map((platform) =>
          api.autopostSchedule({
            platform,
            postType: contentType,
            caption: newPostContent,
            hashtags: newPostHashtags || undefined,
            scheduledAt,
          })
        )
      );

      const succeeded = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      if (failed > 0) {
        setCreateError(`Scheduled on ${succeeded} platform(s), failed on ${failed}`);
      } else {
        setCreateSuccess(`Scheduled on ${succeeded} platform(s)`);
        setNewPostContent("");
        setNewPostHashtags("");
        setScheduleDate("");
        setScheduleTime("");
      }
      loadQueue();
      loadStats();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Scheduling failed");
    } finally {
      setIsScheduling(false);
    }
  };

  const handlePostNow = async () => {
    if (!newPostContent.trim() && !["story", "reel"].includes(contentType)) {
      setCreateError("Content is required");
      return;
    }
    if (selectedPlatforms.length === 0) {
      setCreateError("Please select at least one platform");
      return;
    }

    setIsPostingNow(true);
    setCreateError("");
    setCreateSuccess("");

    try {
      const results = await Promise.allSettled(
        selectedPlatforms.map((platform) =>
          api.autopostPostNow({
            platform,
            postType: contentType,
            caption: newPostContent,
            hashtags: newPostHashtags || undefined,
          })
        )
      );

      const succeeded = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      if (failed > 0) {
        setCreateError(`Posted on ${succeeded} platform(s), failed on ${failed}`);
      } else {
        setCreateSuccess(`Posted on ${succeeded} platform(s)`);
        setNewPostContent("");
        setNewPostHashtags("");
      }
      loadQueue();
      loadStats();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Post failed");
    } finally {
      setIsPostingNow(false);
    }
  };

  const handleCancelPost = async (id: number) => {
    setCancellingId(id);
    try {
      await api.autopostCancel(id);
      loadQueue();
      loadStats();
    } catch (err) {
      console.error("Failed to cancel post:", err);
    } finally {
      setCancellingId(null);
    }
  };

  const handleToggleScheduler = async () => {
    setTogglingScheduler(true);
    try {
      if (schedulerStatus?.running && !schedulerStatus?.paused) {
        await api.autopostPause();
      } else {
        await api.autopostResume();
      }
      const s = await api.autopostSchedulerStatus();
      setSchedulerStatus(s);
    } catch (err) {
      console.error("Failed to toggle scheduler:", err);
    } finally {
      setTogglingScheduler(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingVideo(true);
    setVideoResult(null);
    setVideoPipelineStep(1);

    try {
      // Step 1: Generating image
      setVideoPipelineStep(1);
      await new Promise((r) => setTimeout(r, 500)); // brief visual delay for pipeline feedback

      // Step 2: Uploading to Leonardo
      setVideoPipelineStep(2);

      // The API does all steps in one call, but we simulate pipeline progression
      const result = await api.autopostGenerateVideo({
        imagePrompt,
        motionPrompt: motionPrompt || undefined,
        platform: selectedPlatforms[0] || "instagram",
      });

      if (result.success) {
        setVideoPipelineStep(4);
      } else {
        setVideoPipelineStep(0);
      }

      setVideoResult(result);
    } catch (err) {
      setVideoResult({
        success: false,
        error: err instanceof Error ? err.message : "Video generation failed",
      });
      setVideoPipelineStep(0);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  /* ──────────── Render helpers ──────────── */

  const scheduledCount = queue.length;
  const isSchedulerRunning = schedulerStatus?.running && !schedulerStatus?.paused;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Auto-Post</h1>
          <p className="text-sm text-muted mt-1">Schedule content across all platforms with AI assistance</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Scheduler toggle */}
          <button
            onClick={handleToggleScheduler}
            disabled={togglingScheduler || loadingConfig}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
              isSchedulerRunning
                ? "bg-emerald/10 border-emerald/30 text-emerald"
                : "bg-red/10 border-red/30 text-red-bright"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isSchedulerRunning ? "bg-emerald animate-pulse" : "bg-red"}`} />
            {togglingScheduler ? "..." : isSchedulerRunning ? "Scheduler Running" : "Scheduler Paused"}
          </button>

          {loadingStats ? (
            <span className="text-data text-xs text-dim">Loading...</span>
          ) : (
            <span className="text-data text-xs text-dim">{scheduledCount} scheduled</span>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab("create")}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Post
          </button>
        </div>
      </div>

      {/* Stats Row */}
      {!loadingStats && stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="card p-4 text-center">
            <div className="text-lg font-bold text-emerald">{stats.totalPosted}</div>
            <div className="text-[10px] text-dim">Posted</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-lg font-bold text-electric">{stats.totalScheduled}</div>
            <div className="text-[10px] text-dim">Scheduled</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-lg font-bold text-red-bright">{stats.totalFailed}</div>
            <div className="text-[10px] text-dim">Failed</div>
          </div>
          <div className="card p-4 text-center col-span-2 sm:col-span-2">
            <div className="flex justify-center gap-3 flex-wrap">
              {Object.entries(stats.byPlatform || {}).map(([platform, count]) => (
                <div key={platform} className="text-center">
                  <div className="text-sm font-bold">{count}</div>
                  <div className="text-[9px] text-dim capitalize">{platform}</div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-dim mt-1">By Platform</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-glass border border-glass-border w-fit">
        {(["queue", "calendar", "create", "video"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all capitalize ${
              activeTab === tab
                ? "bg-red/15 text-red-bright"
                : "text-muted hover:text-foreground hover:bg-white/[0.04]"
            }`}
          >
            {tab === "video" ? "Video Generator" : tab === "queue" ? "Post Queue" : tab}
          </button>
        ))}
      </div>

      {/* Queue Tab */}
      {activeTab === "queue" && (
        <div className="space-y-3">
          {loadingQueue ? (
            <div className="card p-8 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted">
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
                Loading posts...
              </div>
            </div>
          ) : allPosts.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-sm text-muted">No posts yet. Create one to get started.</p>
            </div>
          ) : (
            allPosts.map((post) => {
              const displayDate = post.scheduledAt || post.postedAt || post.createdAt;
              const pType = post.postType || "text";
              return (
                <div key={`${post.id}-${post.platform}`} className="card p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-glass border border-glass-border flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={typeIcons[pType] || typeIcons.text} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold capitalize">{pType} Post</span>
                      {post.aiGenerated && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-electric/10 text-electric border border-electric/20">AI</span>
                      )}
                    </div>
                    <p className="text-xs text-muted mb-2 line-clamp-2">{post.caption || "(no caption)"}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-data text-[10px] text-dim">{formatDate(displayDate)}</span>
                      {displayDate && (
                        <span className="text-[10px] text-dim/60">{relativeTime(displayDate)}</span>
                      )}
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-glass border border-glass-border text-dim capitalize">
                        {post.platform}
                      </span>
                      {post.hashtags && (
                        <span className="text-[10px] text-dim truncate max-w-[200px]">{post.hashtags}</span>
                      )}
                      {post.engagement && (
                        <span className="text-[10px] text-dim">
                          {post.engagement.likes ?? 0} likes &middot; {post.engagement.comments ?? 0} comments
                        </span>
                      )}
                      {post.error && (
                        <span className="text-[10px] text-red-bright truncate max-w-[200px]" title={post.error}>
                          {post.error}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`badge text-[9px] ${statusColors[post.status] || "badge-gold"}`}>{post.status}</span>
                    {(post.status === "scheduled" || post.status === "queued") && (
                      <button
                        onClick={() => handleCancelPost(post.id)}
                        disabled={cancellingId === post.id}
                        className="p-1.5 text-dim hover:text-red-bright transition-colors"
                        title="Cancel post"
                      >
                        {cancellingId === post.id ? (
                          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Content Calendar</h2>
          {loadingQueue ? (
            <div className="p-8 text-center text-sm text-muted">Loading calendar...</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header Row */}
                <div className="grid grid-cols-8 gap-1 mb-2">
                  <div className="text-[10px] font-bold text-dim p-2">Time</div>
                  {DAYS.map((day) => (
                    <div key={day} className="text-[10px] font-bold text-dim p-2 text-center">{day}</div>
                  ))}
                </div>
                {/* Time Slots */}
                {HOURS.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 gap-1">
                    <div className="text-data text-[10px] text-dim p-2 border-t border-glass-border">{hour}</div>
                    {DAYS.map((day) => {
                      const cellPosts = getCalendarPosts(day, hour);
                      return (
                        <div
                          key={`${day}-${hour}`}
                          className={`p-2 border-t border-glass-border min-h-[32px] rounded cursor-pointer hover:bg-glass transition-colors ${
                            cellPosts.length > 0 ? "bg-red/10" : ""
                          }`}
                          title={cellPosts.map((p) => `${p.platform}: ${(p.caption || "").slice(0, 40)}`).join("\n")}
                        >
                          {cellPosts.length > 0 && (
                            <div className="text-[9px] text-red-bright font-semibold truncate">
                              {cellPosts.length} post{cellPosts.length > 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Tab */}
      {activeTab === "create" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-5">
              <h2 className="text-sm font-bold mb-4">Create New Post</h2>

              {/* Status messages */}
              {createError && (
                <div className="mb-4 p-3 rounded-lg bg-red/10 border border-red/20 text-xs text-red-bright">
                  {createError}
                </div>
              )}
              {createSuccess && (
                <div className="mb-4 p-3 rounded-lg bg-emerald/10 border border-emerald/20 text-xs text-emerald">
                  {createSuccess}
                </div>
              )}

              <div className="space-y-4">
                {/* Content Type */}
                <div>
                  <label className="text-xs font-semibold text-dim block mb-2">Content Type</label>
                  <div className="flex flex-wrap gap-2">
                    {(["text", "image", "video", "reel", "story", "short"] as ContentType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setContentType(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${
                          contentType === type
                            ? "bg-red/15 border-red/30 text-red-bright"
                            : "bg-glass border-glass-border text-muted hover:border-glass-border-hover"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-dim">Content</label>
                    <button
                      onClick={handleAIGenerate}
                      disabled={isGenerating}
                      className="flex items-center gap-1.5 text-[10px] font-semibold text-electric hover:text-foreground transition-colors"
                    >
                      <svg className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                      {isGenerating ? "Generating..." : "AI Generate"}
                    </button>
                  </div>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your post content or use AI to generate..."
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none"
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-dim">{newPostContent.length} characters</span>
                    <span className="text-[10px] text-dim">280 max for X</span>
                  </div>
                </div>

                {/* Hashtags */}
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Hashtags (optional)</label>
                  <input
                    value={newPostHashtags}
                    onChange={(e) => setNewPostHashtags(e.target.value)}
                    placeholder="#FiveM #GTARP #ZOSyndicate"
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                  />
                </div>

                {/* Schedule */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-dim block mb-1.5">Date</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dim block mb-1.5">Time</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={handlePostNow}
                    disabled={isPostingNow || isScheduling}
                    className="btn btn-ghost btn-sm"
                  >
                    {isPostingNow ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                        </svg>
                        Posting...
                      </>
                    ) : (
                      "Post Now"
                    )}
                  </button>
                  <button
                    onClick={handleSchedulePost}
                    disabled={isScheduling || isPostingNow}
                    className="btn btn-primary btn-sm"
                  >
                    {isScheduling ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                        </svg>
                        Scheduling...
                      </>
                    ) : (
                      "Schedule Post"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-6">
            <div className="card p-5">
              <h2 className="text-sm font-bold mb-4">Target Platforms</h2>
              <div className="space-y-2">
                {PLATFORM_OPTIONS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? "bg-glass-active border-glass-border-hover"
                        : "bg-glass border-glass-border opacity-60"
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                    >
                      {platform.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-xs font-semibold">{platform.name}</div>
                      <div className="text-[10px] text-dim">{platform.types.join(", ")}</div>
                    </div>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedPlatforms.includes(platform.id)
                        ? "bg-emerald border-emerald"
                        : "border-dim"
                    }`}>
                      {selectedPlatforms.includes(platform.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Settings / Scheduler Info */}
            <div className="card p-5">
              <h2 className="text-sm font-bold mb-4">AI Generation</h2>
              <div className="space-y-3">
                <div className="flex justify-between p-2 rounded-lg bg-glass">
                  <span className="text-xs text-muted">Text Model</span>
                  <span className="text-data text-xs">Groq llama-3.3</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-glass">
                  <span className="text-xs text-muted">Image Model</span>
                  <span className="text-data text-xs">DALL-E 3 HD</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-glass">
                  <span className="text-xs text-muted">Video Model</span>
                  <span className="text-data text-xs">Leonardo Motion 2.0</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-glass">
                  <span className="text-xs text-muted">Cost per Video</span>
                  <span className="text-data text-xs text-gold">~$0.04</span>
                </div>
                {schedulerStatus?.nextRun && (
                  <div className="flex justify-between p-2 rounded-lg bg-glass">
                    <span className="text-xs text-muted">Next Auto-Post</span>
                    <span className="text-data text-xs text-electric">{relativeTime(schedulerStatus.nextRun)}</span>
                  </div>
                )}
                {config && (
                  <div className="flex justify-between p-2 rounded-lg bg-glass">
                    <span className="text-xs text-muted">Timezone</span>
                    <span className="text-data text-xs">{config.timezone || "UTC"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Generator Tab */}
      {activeTab === "video" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">AI Video Generation</h2>
            <p className="text-xs text-muted mb-4">Generate 5-second motion videos using DALL-E 3 + Leonardo Motion 2.0</p>

            {videoResult?.error && (
              <div className="mb-4 p-3 rounded-lg bg-red/10 border border-red/20 text-xs text-red-bright">
                {videoResult.error}
              </div>
            )}
            {videoResult?.success && (
              <div className="mb-4 p-3 rounded-lg bg-emerald/10 border border-emerald/20 text-xs text-emerald space-y-2">
                <div>Video generated successfully.</div>
                {videoResult.video?.url && (
                  <a
                    href={videoResult.video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric underline"
                  >
                    Download Video
                  </a>
                )}
                {videoResult.image?.url && (
                  <div>
                    <a
                      href={videoResult.image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric underline"
                    >
                      View Source Image
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Image Prompt</label>
                <textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image for DALL-E 3..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Motion Prompt (optional - AI will generate if empty)</label>
                <textarea
                  value={motionPrompt}
                  onChange={(e) => setMotionPrompt(e.target.value)}
                  placeholder="Describe the camera movement and animation..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Resolution</label>
                <select
                  value={videoResolution}
                  onChange={(e) => setVideoResolution(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                >
                  <option value="720">720p (Recommended)</option>
                  <option value="1080">1080p</option>
                </select>
              </div>
              <button
                onClick={handleGenerateVideo}
                disabled={isGeneratingVideo || !imagePrompt.trim()}
                className="btn btn-primary btn-sm w-full"
              >
                {isGeneratingVideo ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    Generate Video
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Pipeline</h2>
            <div className="space-y-4">
              {[
                { step: "1. DALL-E 3", desc: "Generate HD image from prompt", time: "~10s", idx: 1 },
                { step: "2. Leonardo Upload", desc: "Upload as init-image via presigned S3", time: "~3s", idx: 2 },
                { step: "3. Motion 2.0", desc: "Animate with camera movement", time: "~30s", idx: 3 },
                { step: "4. Platform Upload", desc: "Upload to selected platforms", time: "~15s", idx: 4 },
              ].map((item) => {
                let statusClass = "bg-dim/50";
                let statusLabel = "ready";
                if (isGeneratingVideo && videoPipelineStep >= item.idx) {
                  if (videoPipelineStep === item.idx) {
                    statusClass = "bg-gold animate-pulse";
                    statusLabel = "running";
                  } else {
                    statusClass = "bg-emerald";
                    statusLabel = "done";
                  }
                } else if (!isGeneratingVideo && videoPipelineStep >= item.idx && videoResult?.success) {
                  statusClass = "bg-emerald";
                  statusLabel = "done";
                }

                return (
                  <div key={item.step} className="flex items-center gap-4 p-3 rounded-lg bg-glass border border-glass-border">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${statusClass}`} />
                    <div className="flex-1">
                      <div className="text-xs font-semibold">{item.step}</div>
                      <div className="text-[10px] text-dim">{item.desc}</div>
                    </div>
                    <span className="text-data text-[10px] text-dim">
                      {statusLabel === "running" ? "running..." : statusLabel === "done" ? "done" : item.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Cost estimate */}
            <div className="mt-6 p-3 rounded-lg bg-glass border border-glass-border">
              <div className="text-xs font-semibold mb-2">Cost Estimate</div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <span className="text-dim">DALL-E 3 HD</span>
                <span className="text-data text-right">~$0.04</span>
                <span className="text-dim">Leonardo Motion 2.0</span>
                <span className="text-data text-right">~$0.03</span>
                <span className="text-dim font-semibold pt-1 border-t border-glass-border">Total</span>
                <span className="text-data text-right font-semibold text-gold pt-1 border-t border-glass-border">~$0.07</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
