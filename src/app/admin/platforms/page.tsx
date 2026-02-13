"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPlatforms, getHealth } from "@/lib/admin-api";
import type { PlatformStatus } from "@/lib/admin-api";

// Platform display configuration
const PLATFORM_CONFIG: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  twitch: {
    label: "Twitch",
    color: "#9146FF",
    icon: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z",
  },
  kick: {
    label: "Kick",
    color: "#53FC18",
    icon: "M1.333 0v24H8v-8l2.667 2.667L16 24h6.667L16 17.333 22.667 8H16l-5.333 5.333V0z",
  },
  discord: {
    label: "Discord",
    color: "#5865F2",
    icon: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z",
  },
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  trovo: {
    label: "Trovo",
    color: "#19D65C",
    icon: "M2.484 3.2h19.032v17.6H2.484V3.2zm2.4 2.4v12.8h14.232V5.6H4.884zm3.6 2.4h7.032v2.4h-2.316v5.6h-2.4v-5.6H8.484V8z",
  },
  facebook: {
    label: "Facebook",
    color: "#1877F2",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  instagram: {
    label: "Instagram",
    color: "#E4405F",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  x: {
    label: "X / Twitter",
    color: "#000000",
    icon: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  tiktok: {
    label: "TikTok",
    color: "#FE2C55",
    icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
};

// All platform keys in display order
const PLATFORM_ORDER = [
  "twitch",
  "kick",
  "discord",
  "youtube",
  "trovo",
  "facebook",
  "instagram",
  "x",
  "tiktok",
];

interface HealthData {
  core: { name: string; version: string; status: string; uptime: number };
  analytics: { name: string; version: string; status: string } | null;
}

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([]);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const [platformsRes, healthRes] = await Promise.allSettled([
          getPlatforms(),
          getHealth(),
        ]);

        if (platformsRes.status === "fulfilled") {
          setPlatforms(platformsRes.value.platforms);
        } else {
          setError("Failed to load platform data.");
        }

        if (healthRes.status === "fulfilled") {
          setHealth(healthRes.value);
        }
      } catch {
        setError("Failed to connect to PRISMAI.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Build a lookup from the API response keyed by lowercase platform name
  const platformMap = new Map<string, PlatformStatus>();
  for (const p of platforms) {
    platformMap.set(p.name.toLowerCase(), p);
  }

  // Compute connection stats
  const connectedCount = PLATFORM_ORDER.filter((key) => {
    const p = platformMap.get(key);
    return p?.connected;
  }).length;
  const totalCount = PLATFORM_ORDER.length;

  // Format uptime
  function formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Platform Connections</h2>
        <p className="mt-1 text-sm text-gray-400">
          Manage and monitor all connected streaming and social platforms.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connected count */}
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Platforms Connected
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            {loading ? "--" : `${connectedCount} of ${totalCount}`}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {loading
              ? "Loading..."
              : connectedCount === totalCount
                ? "All platforms online"
                : `${totalCount - connectedCount} disconnected`}
          </p>
        </div>

        {/* Engine status */}
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            PRISMAI Engine
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            {loading
              ? "--"
              : health?.core.status === "running"
                ? "Online"
                : "Offline"}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {health?.core.version
              ? `v${health.core.version}`
              : loading
                ? "Loading..."
                : "Unavailable"}
          </p>
        </div>

        {/* Uptime */}
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Uptime
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            {loading
              ? "--"
              : health?.core.uptime
                ? formatUptime(health.core.uptime)
                : "N/A"}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {health?.core.status === "running"
              ? "Stable"
              : loading
                ? "Loading..."
                : "Check connection"}
          </p>
        </div>

        {/* Analytics */}
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Analytics Engine
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            {loading
              ? "--"
              : health?.analytics?.status === "running"
                ? "Online"
                : "Offline"}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {health?.analytics?.version
              ? `v${health.analytics.version}`
              : loading
                ? "Loading..."
                : "Unavailable"}
          </p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Platform Cards Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_ORDER.map((key) => (
            <div
              key={key}
              className="animate-pulse rounded-xl border border-[var(--color-border)] bg-surface p-5"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-surface" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 rounded bg-surface" />
                  <div className="h-3 w-16 rounded bg-surface" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_ORDER.map((key) => {
            const config = PLATFORM_CONFIG[key];
            const status = platformMap.get(key);
            const connected = status?.connected ?? false;
            const live = status?.live ?? false;

            return (
              <div
                key={key}
                className="group rounded-xl border border-[var(--color-border)] bg-surface p-5 transition-colors hover:border-[var(--color-border)]"
              >
                {/* Card Header: Icon + Name + Status Dot */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* Platform Icon */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor:
                          config.color === "#000000"
                            ? "rgba(255,255,255,0.1)"
                            : `${config.color}20`,
                      }}
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill={config.color === "#000000" ? "#fff" : config.color}
                      >
                        <path d={config.icon} />
                      </svg>
                    </div>

                    {/* Name + Status */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">
                          {config.label}
                        </h3>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            connected ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      </div>
                      <p
                        className={`text-xs ${
                          connected ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {connected ? "Connected" : "Disconnected"}
                      </p>
                    </div>
                  </div>

                  {/* Live Badge */}
                  {live && (
                    <span className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                      <span className="text-[10px] font-semibold uppercase text-red-400">
                        Live
                      </span>
                    </span>
                  )}
                </div>

                {/* Card Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                  {connected ? (
                    <span className="text-xs text-gray-500">
                      Token active
                    </span>
                  ) : (
                    <Link
                      href="/connect"
                      className="text-xs font-medium text-red transition-colors hover:text-red-300"
                    >
                      Reconnect &rarr;
                    </Link>
                  )}

                  {/* Platform color accent bar */}
                  <div
                    className="h-1 w-8 rounded-full opacity-40 transition-opacity group-hover:opacity-80"
                    style={{ backgroundColor: config.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Connection Help */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Need to connect a platform?
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Use the Connect page to authorize PRISMAI with your streaming and
              social accounts via OAuth.
            </p>
          </div>
          <Link
            href="/connect"
            className="shrink-0 rounded-lg bg-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Go to Connect
          </Link>
        </div>
      </div>
    </div>
  );
}
