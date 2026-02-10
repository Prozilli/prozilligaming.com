"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  getAutopostConfig,
  saveAutopostConfig,
  getAutopostQueue,
  getAutopostHistory,
  getSchedulerStatus,
  cancelPost,
} from "@/lib/admin-api";

type TabType = "scheduler" | "queue" | "history";

interface SchedulerStatusData {
  running: boolean;
  nextRun?: string;
  uptime?: number;
  totalPosted?: number;
  totalScheduled?: number;
  totalFailed?: number;
}

interface QueueItem {
  id: number;
  platform: string;
  caption: string;
  scheduledAt: string;
  type?: string;
  mediaUrl?: string;
}

interface HistoryItem {
  id: number;
  platform: string;
  caption: string;
  postedAt: string;
  status: "posted" | "failed";
  error?: string;
  type?: string;
}

const PLATFORM_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  x: {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "text-white",
  },
  facebook: {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: "text-blue-500",
  },
  instagram: {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    color: "text-pink-500",
  },
  twitter: {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "text-white",
  },
};

function getPlatformDisplay(platform: string) {
  const key = platform.toLowerCase();
  const entry = PLATFORM_ICONS[key];
  if (entry) {
    return entry;
  }
  return {
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
    color: "text-gray-400",
  };
}

function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return isoString;
  }
}

function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 0) {
      const absMins = Math.abs(diffMins);
      if (absMins < 60) return `${absMins}m ago`;
      if (absMins < 1440) return `${Math.floor(absMins / 60)}h ago`;
      return `${Math.floor(absMins / 1440)}d ago`;
    }

    if (diffMins < 60) return `in ${diffMins}m`;
    if (diffMins < 1440) return `in ${Math.floor(diffMins / 60)}h`;
    return `in ${Math.floor(diffMins / 1440)}d`;
  } catch {
    return isoString;
  }
}

export default function AutoPostPage() {
  const [activeTab, setActiveTab] = useState<TabType>("scheduler");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Scheduler state
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerStatusData>({
    running: false,
    totalPosted: 0,
    totalScheduled: 0,
    totalFailed: 0,
  });
  const [toggling, setToggling] = useState(false);

  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [queueLoading, setQueueLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  // History state
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const fetchSchedulerData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [statusRes, configRes] = await Promise.all([
        getSchedulerStatus(),
        getAutopostConfig(),
      ]);
      setSchedulerStatus({
        running: (statusRes as Record<string, unknown>).running as boolean ?? configRes.enabled ?? false,
        nextRun: (statusRes as Record<string, unknown>).nextRun as string | undefined,
        uptime: (statusRes as Record<string, unknown>).uptime as number | undefined,
        totalPosted: (statusRes as Record<string, unknown>).totalPosted as number ?? 0,
        totalScheduled: (statusRes as Record<string, unknown>).totalScheduled as number ?? 0,
        totalFailed: (statusRes as Record<string, unknown>).totalFailed as number ?? 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch scheduler status");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchQueue = useCallback(async () => {
    try {
      setQueueLoading(true);
      const res = await getAutopostQueue(50);
      setQueue(
        (res.queue || []).map((item: Record<string, unknown>) => ({
          id: item.id as number,
          platform: (item.platform as string) || "unknown",
          caption: (item.caption as string) || (item.content as string) || (item.text as string) || "",
          scheduledAt: (item.scheduledAt as string) || (item.scheduled_at as string) || (item.scheduled_time as string) || "",
          type: item.type as string | undefined,
          mediaUrl: (item.mediaUrl as string) || (item.media_url as string) || undefined,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch queue:", err);
    } finally {
      setQueueLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      setHistoryLoading(true);
      const res = await getAutopostHistory(50);
      setHistory(
        (res.history || []).map((item: Record<string, unknown>) => ({
          id: item.id as number,
          platform: (item.platform as string) || "unknown",
          caption: (item.caption as string) || (item.content as string) || (item.text as string) || "",
          postedAt: (item.postedAt as string) || (item.posted_at as string) || (item.created_at as string) || "",
          status: (item.status as "posted" | "failed") || "posted",
          error: item.error as string | undefined,
          type: item.type as string | undefined,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  // Fetch all data on mount
  useEffect(() => {
    fetchSchedulerData();
    fetchQueue();
    fetchHistory();
  }, [fetchSchedulerData, fetchQueue, fetchHistory]);

  // Toggle scheduler on/off
  const handleToggleScheduler = async () => {
    setToggling(true);
    try {
      const newState = !schedulerStatus.running;
      await saveAutopostConfig({ enabled: newState });
      setSchedulerStatus((prev) => ({ ...prev, running: newState }));
    } catch (err) {
      console.error("Failed to toggle scheduler:", err);
      setError(err instanceof Error ? err.message : "Failed to toggle scheduler");
    } finally {
      setToggling(false);
    }
  };

  // Cancel a queued post
  const handleCancelPost = async (id: number) => {
    setCancellingId(id);
    try {
      await cancelPost(id);
      setQueue((prev) => prev.filter((item) => item.id !== id));
      setSchedulerStatus((prev) => ({
        ...prev,
        totalScheduled: Math.max(0, (prev.totalScheduled ?? 0) - 1),
      }));
    } catch (err) {
      console.error("Failed to cancel post:", err);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Auto-Post</h1>
        <p className="mt-1 text-sm text-gray-400">
          Schedule and manage automated posts across platforms
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-white/5 p-1">
        {[
          { id: "scheduler", label: "Scheduler" },
          { id: "queue", label: "Queue" },
          { id: "history", label: "History" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-brand-red text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
            {tab.id === "queue" && queue.length > 0 && (
              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {queue.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 flex-shrink-0 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ==================== SCHEDULER TAB ==================== */}
      {activeTab === "scheduler" && (
        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="h-8 w-8 animate-spin text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-sm text-gray-400">Loading scheduler status...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Status Card */}
              <div className="rounded-xl border border-white/5 bg-[#161b22] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                        schedulerStatus.running
                          ? "bg-green-500/10"
                          : "bg-white/5"
                      }`}
                    >
                      {schedulerStatus.running ? (
                        <svg
                          className="h-7 w-7 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-7 w-7 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        Auto-Post Scheduler
                      </h2>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`inline-flex h-2 w-2 rounded-full ${
                            schedulerStatus.running
                              ? "bg-green-400 animate-pulse"
                              : "bg-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            schedulerStatus.running
                              ? "text-green-400"
                              : "text-gray-500"
                          }`}
                        >
                          {schedulerStatus.running ? "Running" : "Paused"}
                        </span>
                        {schedulerStatus.nextRun && schedulerStatus.running && (
                          <span className="text-xs text-gray-500">
                            &middot; Next run {formatRelativeTime(schedulerStatus.nextRun)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleScheduler}
                    disabled={toggling}
                    className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                      schedulerStatus.running
                        ? "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                        : "bg-brand-red text-white hover:bg-brand-red/90"
                    }`}
                  >
                    {toggling ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Updating...
                      </span>
                    ) : schedulerStatus.running ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                          />
                        </svg>
                        Pause Scheduler
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                          />
                        </svg>
                        Start Scheduler
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/5 bg-[#161b22] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <svg
                        className="h-5 w-5 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">
                        {(schedulerStatus.totalPosted ?? 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Total Posted</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#161b22] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/10">
                      <svg
                        className="h-5 w-5 text-brand-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-brand-gold">
                        {(schedulerStatus.totalScheduled ?? 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Scheduled</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#161b22] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                      <svg
                        className="h-5 w-5 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-400">
                        {(schedulerStatus.totalFailed ?? 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Failed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refresh Button */}
              <div className="flex justify-end">
                <button
                  onClick={fetchSchedulerData}
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ==================== QUEUE TAB ==================== */}
      {activeTab === "queue" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Upcoming Posts
              {!queueLoading && (
                <span className="ml-2 text-gray-500 font-normal">
                  ({queue.length})
                </span>
              )}
            </h3>
            <button
              onClick={fetchQueue}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                />
              </svg>
              Refresh
            </button>
          </div>

          {queueLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="h-8 w-8 animate-spin text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-sm text-gray-400">Loading queue...</p>
              </div>
            </div>
          ) : queue.length === 0 ? (
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-12">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5">
                  <svg
                    className="h-7 w-7 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">No posts in the queue</p>
                <p className="text-xs text-gray-500">
                  Scheduled posts will appear here
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {queue.map((item) => {
                const platform = getPlatformDisplay(item.platform);
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/5 bg-[#161b22] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 ${platform.color}`}
                        >
                          {platform.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white capitalize">
                              {item.platform}
                            </span>
                            {item.type && (
                              <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-gray-500 uppercase">
                                {item.type}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-400 truncate max-w-md">
                            {item.caption || "No caption"}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <svg
                              className="h-3.5 w-3.5 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            <span className="text-xs text-gray-500">
                              {formatTime(item.scheduledAt)}
                            </span>
                            <span className="text-xs text-brand-gold">
                              ({formatRelativeTime(item.scheduledAt)})
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCancelPost(item.id)}
                        disabled={cancellingId === item.id}
                        className="flex-shrink-0 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        {cancellingId === item.id ? (
                          <span className="flex items-center gap-1.5">
                            <svg
                              className="h-3.5 w-3.5 animate-spin"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Cancelling
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                            Cancel
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ==================== HISTORY TAB ==================== */}
      {activeTab === "history" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Post History
              {!historyLoading && (
                <span className="ml-2 text-gray-500 font-normal">
                  ({history.length})
                </span>
              )}
            </h3>
            <button
              onClick={fetchHistory}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                />
              </svg>
              Refresh
            </button>
          </div>

          {historyLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="h-8 w-8 animate-spin text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-sm text-gray-400">Loading history...</p>
              </div>
            </div>
          ) : history.length === 0 ? (
            <div className="rounded-xl border border-white/5 bg-[#161b22] p-12">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5">
                  <svg
                    className="h-7 w-7 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">No post history yet</p>
                <p className="text-xs text-gray-500">
                  Completed posts will appear here
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => {
                const platform = getPlatformDisplay(item.platform);
                const isFailed = item.status === "failed";
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border bg-[#161b22] p-4 ${
                      isFailed
                        ? "border-red-500/20"
                        : "border-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 ${platform.color}`}
                      >
                        {platform.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white capitalize">
                            {item.platform}
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-medium uppercase ${
                              isFailed
                                ? "bg-red-500/20 text-red-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {item.status}
                          </span>
                          {item.type && (
                            <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-gray-500 uppercase">
                              {item.type}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-400 truncate max-w-lg">
                          {item.caption || "No caption"}
                        </p>
                        {isFailed && item.error && (
                          <div className="mt-2 rounded-lg bg-red-500/5 border border-red-500/10 px-3 py-2">
                            <div className="flex items-start gap-2">
                              <svg
                                className="h-4 w-4 flex-shrink-0 text-red-400 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                />
                              </svg>
                              <p className="text-xs text-red-400 break-all">
                                {item.error}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <svg
                            className="h-3.5 w-3.5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          <span className="text-xs text-gray-500">
                            {formatTime(item.postedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
