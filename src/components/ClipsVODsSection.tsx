"use client";

import { useState, useEffect } from "react";
import {
  TwitchClip,
  TwitchVOD,
  formatDuration,
  formatViewCount,
  formatRelativeTime,
  parseDuration,
} from "@/lib/api";

const API_BASE_URL = "https://api.prozilli.com";

type TabType = "clips" | "vods";

interface ClipCardProps {
  clip: TwitchClip;
}

function ClipCard({ clip }: ClipCardProps) {
  return (
    <a
      href={clip.url}
      target="_blank"
      rel="noopener noreferrer"
      className="panel group overflow-hidden rounded-lg transition-all hover:scale-[1.02] hover:border-red/30"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={clip.thumbnailUrl}
          alt={clip.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {formatDuration(Math.round(clip.duration))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-white transition-colors group-hover:text-red">
          {clip.title}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted">
          <span>{formatViewCount(clip.viewCount)} views</span>
          <span className="text-white/20">|</span>
          <span>{formatRelativeTime(clip.createdAt)}</span>
        </div>
        {clip.creatorName && (
          <p className="mt-1 text-xs text-muted">
            Clipped by {clip.creatorName}
          </p>
        )}
      </div>
    </a>
  );
}

interface VODCardProps {
  vod: TwitchVOD;
}

function VODCard({ vod }: VODCardProps) {
  const durationSecs = parseDuration(vod.duration);

  return (
    <a
      href={vod.url}
      target="_blank"
      rel="noopener noreferrer"
      className="panel group overflow-hidden rounded-lg transition-all hover:scale-[1.02] hover:border-red/30"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={vod.thumbnailUrl}
          alt={vod.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {formatDuration(durationSecs)}
        </div>
        <div className="absolute left-2 top-2 rounded bg-red/90 px-1.5 py-0.5 text-xs font-semibold uppercase text-white">
          {vod.type === "archive" ? "VOD" : vod.type}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-white transition-colors group-hover:text-red">
          {vod.title}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted">
          <span>{formatViewCount(vod.viewCount)} views</span>
          <span className="text-white/20">|</span>
          <span>{formatRelativeTime(vod.createdAt)}</span>
        </div>
      </div>
    </a>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="panel animate-pulse rounded-lg">
          <div className="aspect-video bg-white/5" />
          <div className="p-4">
            <div className="h-4 w-3/4 rounded bg-white/5" />
            <div className="mt-2 h-3 w-1/2 rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ type }: { type: TabType }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white/[0.02] px-8 py-16 text-center">
      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-surface flex items-center justify-center">
        <svg
          className="h-8 w-8 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-white">
        No {type === "clips" ? "Clips" : "VODs"} Yet
      </h3>
      <p className="mt-2 text-sm text-muted">
        {type === "clips"
          ? "Clips will appear here once viewers start creating them during streams."
          : "Past broadcasts will appear here after streams end."}
      </p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-lg border border-red/20 bg-red/5 px-8 py-16 text-center">
      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red/10 flex items-center justify-center">
        <svg
          className="h-8 w-8 text-red"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-white">Failed to Load</h3>
      <p className="mt-2 text-sm text-muted">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-lg bg-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red/80"
      >
        Try Again
      </button>
    </div>
  );
}

export default function ClipsVODsSection() {
  const [activeTab, setActiveTab] = useState<TabType>("clips");
  const [clips, setClips] = useState<TwitchClip[]>([]);
  const [vods, setVODs] = useState<TwitchVOD[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [clipsRes, vodsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/twitch/clips?limit=12`),
        fetch(`${API_BASE_URL}/twitch/vods?limit=12&type=archive`),
      ]);

      if (!clipsRes.ok || !vodsRes.ok) {
        throw new Error("Failed to fetch content from PRISMAI");
      }

      const clipsData = await clipsRes.json();
      const vodsData = await vodsRes.json();

      if (clipsData.error) {
        console.warn("[Clips] API error:", clipsData.error);
      }
      if (vodsData.error) {
        console.warn("[VODs] API error:", vodsData.error);
      }

      setClips(clipsData.clips || []);
      setVODs(vodsData.vods || []);
    } catch (err) {
      console.error("[ClipsVODs] Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentItems = activeTab === "clips" ? clips : vods;
  const hasContent = currentItems.length > 0;

  return (
    <section className="border-t border-[var(--color-border)] bg-raised">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <span className="mb-2 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1 text-xs font-medium tracking-wider text-gold">
              TWITCH CONTENT
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              VODs & Clips
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
              Catch up on past streams and watch the best moments from the community.
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-2 sm:mt-0">
            <button
              onClick={() => setActiveTab("clips")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "clips"
                  ? "bg-red text-white"
                  : "bg-surface text-muted hover:bg-white/10 hover:text-white"
              }`}
            >
              Clips
              {clips.length > 0 && (
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  {clips.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("vods")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "vods"
                  ? "bg-red text-white"
                  : "bg-surface text-muted hover:bg-white/10 hover:text-white"
              }`}
            >
              VODs
              {vods.length > 0 && (
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  {vods.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchData} />
        ) : !hasContent ? (
          <EmptyState type={activeTab} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeTab === "clips"
              ? clips.map((clip) => <ClipCard key={clip.id} clip={clip} />)
              : vods.map((vod) => <VODCard key={vod.id} vod={vod} />)}
          </div>
        )}

        {/* View All Link */}
        {hasContent && (
          <div className="mt-8 text-center">
            <a
              href={`https://twitch.tv/prozilligaming/${activeTab === "clips" ? "clips" : "videos"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-white"
            >
              View all on Twitch
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
