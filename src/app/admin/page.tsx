"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Proxy through Cloudflare Pages Functions to avoid mixed content
const API_BASE = "/api/prismai";

interface Platform {
  name: string;
  connected: boolean;
  live: boolean;
}

interface ServerHealth {
  name: string;
  version: string;
  status: string;
  uptime?: number;
  timestamp: string;
}

interface Stats {
  messagesToday: number;
  uniqueUsers: number;
  platformsOnline: number;
  totalMessages: number;
  totalEvents: number;
  platformBreakdown: { platform: string; count: number }[];
  topChatters: { username: string; count: number }[];
}

interface AnalyticsSummary {
  revenue: { total: number; change: number };
  messages: { total: number; change: number };
  sparkline: number[];
}

interface LiveStatus {
  isLive: boolean;
  platforms: Platform[];
  liveCount: number;
}

interface ChatMessage {
  platform: string;
  user: string;
  message: string;
  timestamp: string;
}

interface DiscordInfo {
  id: string;
  name: string;
  memberCount: number;
  icon: string | null;
  description: string | null;
}

const PLATFORM_ICONS: Record<string, string> = {
  twitch: "🟣",
  youtube: "🔴",
  kick: "🟢",
  trovo: "🟡",
  discord: "🔵",
  facebook: "🔷",
  instagram: "📸",
  tiktok: "🎵",
  x: "✖",
};

export default function AdminDashboard() {
  const [coreHealth, setCoreHealth] = useState<ServerHealth | null>(null);
  const [analyticsHealth, setAnalyticsHealth] = useState<ServerHealth | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);
  const [recentChat, setRecentChat] = useState<ChatMessage[]>([]);
  const [discordInfo, setDiscordInfo] = useState<DiscordInfo | null>(null);
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    const results = await Promise.allSettled([
      fetch(API_BASE + "/health").then((r) => r.json()),
      fetch(API_BASE + "/platforms").then((r) => r.json()),
      fetch(API_BASE + "/stats").then((r) => r.json()),
      fetch(API_BASE + "/live").then((r) => r.json()),
      fetch(API_BASE + "/chat?limit=20").then((r) => r.json()),
      fetch(API_BASE + "/discord/server").then((r) => r.json()),
      fetch(API_BASE + "/analytics/summary?days=7").then((r) => r.json()),
    ]);

    if (results[0].status === "fulfilled") {
      setCoreHealth(results[0].value.core);
      setAnalyticsHealth(results[0].value.analytics);
    }
    if (results[1].status === "fulfilled") setPlatforms(results[1].value.platforms || []);
    if (results[2].status === "fulfilled") setStats(results[2].value);
    if (results[3].status === "fulfilled") setLiveStatus(results[3].value);
    if (results[4].status === "fulfilled") setRecentChat(results[4].value.messages || []);
    if (results[5].status === "fulfilled" && !results[5].value.error) setDiscordInfo(results[5].value);
    if (results[6].status === "fulfilled" && !results[6].value.error) setAnalyticsSummary(results[6].value);

    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (d > 0) return d + "d " + h + "h " + m + "m";
    return h + "h " + m + "m";
  };

  const formatTime = (ts: string) => {
    try {
      return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  const connectedCount = platforms.filter((p) => p.connected).length;

  return (
    <>
      {/* Header */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-10 text-center">
        <div className="cinematic-smoke" />
        <div className="film-grain" />
        <div className="vignette" />
        <div className="relative z-10">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-gold">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            PRISMAI Dashboard
          </span>
          <h1 className="animate-fade-in-up text-glow-red text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
            ADMIN <span className="text-brand-red">CONTROL</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-3 max-w-xl text-sm text-muted">
            Real-time monitoring and control of the PRISMAI ecosystem
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-xs text-muted">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchData}
              disabled={loading}
              className="rounded-sm border border-brand-red/30 px-4 py-2 text-xs font-medium text-brand-red transition-colors hover:bg-brand-red/10 disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          <Link
            href="/connect"
            className="rounded-sm bg-brand-red px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-red/80"
          >
            Connect Platforms
          </Link>
        </div>

        {/* Connection Warning */}
        {!loading && coreHealth?.status !== "operational" && (
          <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
            <p className="text-sm font-medium text-yellow-400">
              PRISMAI Core unreachable
            </p>
            <p className="mt-1 text-xs text-muted">
              Cannot connect to the PRISMAI engine on Cybrancee. The server may
              be offline or restarting. Check{" "}
              <a
                href="https://panel.cybrancee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline"
              >
                panel.cybrancee.com
              </a>{" "}
              for server status.
            </p>
          </div>
        )}

        {/* Server Status */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {[
            {
              label: "PRISMAI Core",
              health: coreHealth,
              color: "text-brand-red",
              extra: coreHealth?.uptime
                ? "Uptime: " + formatUptime(coreHealth.uptime)
                : null,
            },
            {
              label: "PRISMAI Analytics",
              health: analyticsHealth,
              color: "text-brand-gold",
              extra: analyticsHealth?.uptime
                ? "Uptime: " + formatUptime(analyticsHealth.uptime)
                : analyticsHealth?.status === "operational"
                  ? "Python / FastAPI"
                  : null,
            },
          ].map((server) => (
            <div key={server.label} className="glass glow-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h2
                  className={
                    "text-sm font-semibold uppercase tracking-wider " +
                    server.color
                  }
                >
                  {server.label}
                </h2>
                <span
                  className={
                    "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium " +
                    (server.health?.status === "operational"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400")
                  }
                >
                  <span
                    className={
                      "h-2 w-2 rounded-full " +
                      (server.health?.status === "operational"
                        ? "bg-green-400"
                        : "bg-red-400")
                    }
                  />
                  {server.health?.status || "offline"}
                </span>
              </div>
              <div className="mt-4 space-y-1 text-sm text-muted">
                <p>
                  Version:{" "}
                  <span className="text-white">
                    {server.health?.version || "—"}
                  </span>
                </p>
                {server.extra && (
                  <p>
                    <span className="text-white">{server.extra}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Live Status Banner */}
        <div className="mb-8 glass glow-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stream Status
            </h2>
            <span
              className={
                "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold " +
                (liveStatus?.isLive
                  ? "bg-brand-red/20 text-brand-red"
                  : "bg-white/5 text-muted")
              }
            >
              {liveStatus?.isLive ? (
                <>
                  <span className="h-3 w-3 rounded-full bg-brand-red animate-live-pulse" />
                  {"LIVE ON " +
                    liveStatus.liveCount +
                    " PLATFORM" +
                    (liveStatus.liveCount !== 1 ? "S" : "")}
                </>
              ) : (
                "OFFLINE"
              )}
            </span>
          </div>
        </div>

        {/* Platforms */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Platform Connections
            </h2>
            <span className="text-xs text-muted">
              {connectedCount} / {platforms.length} connected
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className={
                  "glass rounded-lg p-4 transition-all " +
                  (p.connected ? "" : "opacity-50")
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {PLATFORM_ICONS[p.name] || "⚪"}
                    </span>
                    <div>
                      <p className="font-medium capitalize text-white">
                        {p.name}
                      </p>
                      <p className="text-xs text-muted">
                        {p.connected ? "Connected" : "Not connected"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={
                        "h-3 w-3 rounded-full " +
                        (p.connected ? "bg-green-400" : "bg-gray-600")
                      }
                    />
                    {p.live && (
                      <span className="text-[10px] font-bold text-brand-red">
                        LIVE
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Statistics
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: stats?.messagesToday ?? 0, label: "Messages Today" },
              { value: stats?.uniqueUsers ?? 0, label: "Unique Chatters" },
              {
                value: stats?.platformsOnline ?? connectedCount,
                label: "Platforms Online",
              },
              { value: stats?.totalEvents ?? 0, label: "Total Events" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-white">
                  {stat.value.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Summary Row */}
        {analyticsSummary && (
          <div className="mb-8 glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Revenue Snapshot (7d)
              </h2>
              <Link
                href="/admin/analytics"
                className="text-xs font-medium text-brand-red hover:text-brand-red/80 transition-colors"
              >
                View Analytics &rarr;
              </Link>
            </div>
            <div className="flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold text-brand-gold">
                  ${analyticsSummary.revenue.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={"text-xs font-medium " + (analyticsSummary.revenue.change >= 0 ? "text-green-400" : "text-red-400")}>
                  {analyticsSummary.revenue.change >= 0 ? "\u25B2" : "\u25BC"} {Math.abs(analyticsSummary.revenue.change)}% vs prev 7d
                </p>
              </div>
              {/* Sparkline */}
              {analyticsSummary.sparkline.length > 1 && (
                <div className="flex-1 h-10">
                  <svg viewBox={`0 0 ${analyticsSummary.sparkline.length * 10} 40`} className="h-full w-full" preserveAspectRatio="none">
                    {(() => {
                      const data = analyticsSummary.sparkline;
                      const max = Math.max(...data, 1);
                      const points = data.map((v, i) => `${i * 10},${40 - (v / max) * 36}`).join(" ");
                      const area = `0,40 ${points} ${(data.length - 1) * 10},40`;
                      return (
                        <>
                          <polygon points={area} fill="rgba(212, 160, 23, 0.15)" />
                          <polyline points={points} fill="none" stroke="#d4a017" strokeWidth="2" />
                        </>
                      );
                    })()}
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Two-column: Top Chatters + Recent Chat */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Top Chatters */}
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Top Chatters
            </h2>
            <div className="glass rounded-xl p-6">
              {stats?.topChatters && stats.topChatters.length > 0 ? (
                <div className="space-y-3">
                  {stats.topChatters.map((chatter, i) => (
                    <div
                      key={chatter.username}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-red/20 text-xs font-bold text-brand-red">
                          {i + 1}
                        </span>
                        <span className="text-white">{chatter.username}</span>
                      </div>
                      <span className="text-sm text-muted">
                        {chatter.count} msgs
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No chat data yet</p>
              )}
            </div>
          </div>

          {/* Recent Chat Feed */}
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Recent Chat
            </h2>
            <div className="glass rounded-xl p-6 max-h-80 overflow-y-auto">
              {recentChat.length > 0 ? (
                <div className="space-y-2">
                  {recentChat.map((msg, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <span className="shrink-0 text-base">
                        {PLATFORM_ICONS[msg.platform] || "⚪"}
                      </span>
                      <div className="min-w-0">
                        <span className="font-medium text-brand-gold">
                          {msg.user}
                        </span>
                        <span className="ml-2 text-xs text-muted">
                          {formatTime(msg.timestamp)}
                        </span>
                        <p className="text-white/80 break-words">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No recent messages</p>
              )}
            </div>
          </div>
        </div>

        {/* Platform Breakdown */}
        {stats?.platformBreakdown && stats.platformBreakdown.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Messages by Platform
            </h2>
            <div className="glass rounded-xl p-6">
              <div className="space-y-3">
                {stats.platformBreakdown.map((entry) => {
                  const max = Math.max(
                    ...stats.platformBreakdown.map((e) => e.count)
                  );
                  const pct = max > 0 ? (entry.count / max) * 100 : 0;
                  return (
                    <div key={entry.platform}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-2 text-sm capitalize text-white">
                          <span>{PLATFORM_ICONS[entry.platform] || "⚪"}</span>
                          {entry.platform}
                        </span>
                        <span className="text-xs text-muted">
                          {entry.count}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-gold"
                          style={{ width: pct + "%" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Discord Server Info */}
        {discordInfo && (
          <div className="mb-8">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Discord Server
            </h2>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-4">
                {discordInfo.icon && (
                  <img
                    src={`https://cdn.discordapp.com/icons/${discordInfo.id}/${discordInfo.icon}.png?size=64`}
                    alt=""
                    className="h-12 w-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-white">{discordInfo.name}</p>
                  <p className="text-sm text-muted">
                    {discordInfo.memberCount.toLocaleString()} members
                  </p>
                  {discordInfo.description && (
                    <p className="mt-1 text-xs text-muted">{discordInfo.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="border-t border-white/5 pt-8">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/connect"
              className="rounded-sm border border-brand-red/30 px-5 py-2.5 text-sm font-medium text-brand-red transition-colors hover:bg-brand-red/10"
            >
              Connect Platforms
            </Link>
            <Link
              href="/watch"
              className="rounded-sm border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              View Stream
            </Link>
            <Link
              href="/shop"
              className="rounded-sm border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Manage Shop
            </Link>
            <a
              href="https://discord.gg/prozillihq"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Discord
            </a>
            <a
              href="https://panel.cybrancee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Server Panel
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
