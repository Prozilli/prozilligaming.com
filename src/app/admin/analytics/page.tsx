"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type {
  AnalyticsSummary,
  RevenueData,
  EngagementData,
  EventsData,
} from "@/lib/api";

/* ============================================================
   Analytics Dashboard Page — Real-time PRISMAI Data
   ============================================================ */

const TIME_PERIODS = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "1y", days: 365 },
] as const;

const POLL_INTERVAL_MS = 60_000;

/* ─── Helpers ─────────────────────────────────────────────────── */

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return n.toLocaleString();
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatChange(change: number): string {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(0)}%`;
}

function formatHour(hour: number): string {
  if (hour === 0) return "12a";
  if (hour < 12) return `${hour}a`;
  if (hour === 12) return "12p";
  return `${hour - 12}p`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

function eventTypeColor(type: string): string {
  switch (type) {
    case "follow": return "text-electric";
    case "sub": case "subscription": return "text-purple-400";
    case "donation": case "cheer": return "text-gold";
    case "order": return "text-emerald";
    case "raid": return "text-red-bright";
    default: return "text-muted";
  }
}

function eventTypeBadge(type: string): string {
  switch (type) {
    case "follow": return "bg-electric/15 text-electric";
    case "sub": case "subscription": return "bg-purple-400/15 text-purple-400";
    case "donation": case "cheer": return "bg-gold/15 text-gold";
    case "order": return "bg-emerald/15 text-emerald";
    case "raid": return "bg-red/15 text-red-bright";
    default: return "bg-glass text-muted";
  }
}

/* ─── Skeleton Components ─────────────────────────────────────── */

function Skeleton({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse rounded bg-glass ${className}`} style={style} />;
}

function StatCardSkeleton() {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-8 h-3" />
      </div>
      <Skeleton className="w-20 h-6 mb-1" />
      <Skeleton className="w-16 h-3" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="card p-5">
      <Skeleton className="w-32 h-4 mb-4" />
      <div className="h-48 flex items-end gap-4 px-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <Skeleton className="w-full" style={{ height: `${30 + Math.random() * 100}px` }} />
            <Skeleton className="w-6 h-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */

export default function AnalyticsPage() {
  const [periodIdx, setPeriodIdx] = useState(2); // default: 30d
  const days = TIME_PERIODS[periodIdx].days;

  // Data state
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [revenue, setRevenue] = useState<RevenueData | null>(null);
  const [engagement, setEngagement] = useState<EngagementData | null>(null);
  const [events, setEvents] = useState<EventsData | null>(null);

  // Loading & error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async (d: number, showLoading = false) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const [s, r, e, ev] = await Promise.all([
        api.analyticsSummary(d),
        api.analyticsRevenue(d),
        api.analyticsEngagement(d),
        api.analyticsEvents(d),
      ]);
      setSummary(s);
      setRevenue(r);
      setEngagement(e);
      setEvents(ev);
    } catch (err) {
      console.error("Analytics fetch failed:", err);
      setError(err instanceof Error ? err.message : "Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + refetch on period change
  useEffect(() => {
    fetchAll(days, true);
  }, [days, fetchAll]);

  // Poll every 60s (silent, no loading spinner)
  useEffect(() => {
    const id = setInterval(() => fetchAll(days, false), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [days, fetchAll]);

  /* ── Derived values ── */

  const revenueBreakdown = revenue
    ? [
        { source: "Subscriptions", amount: revenue.subscriptions, color: "bg-red/60" },
        { source: "Donations / Tips", amount: revenue.donations, color: "bg-gold/60" },
        { source: "Merchandise", amount: revenue.merchandise, color: "bg-electric/60" },
      ].filter((r) => r.amount > 0)
    : [];

  const revTotal = revenue?.totalRevenue ?? 0;

  // Sparkline for engagement timeline — limit to last N bars
  const engagementTimeline = engagement?.timeline ?? [];
  const displayTimeline = engagementTimeline.slice(-14); // last 14 data points for chart

  // Revenue timeline for chart
  const revenueTimeline = revenue?.timeline ?? [];
  const displayRevenueTimeline = revenueTimeline.slice(-14);

  // Peak hours
  const peakHours = engagement?.peakHours ?? [];

  // Recent events
  const recentEvents = events?.recent ?? [];

  // Top supporters
  const topSupporters = revenue?.topSupporters ?? [];

  /* ── Stat cards ── */
  const statCards = summary
    ? [
        {
          label: "Total Revenue",
          value: formatCurrency(summary.revenue.total),
          change: formatChange(summary.revenue.change),
          positive: summary.revenue.change >= 0,
          icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
          label: "Chat Messages",
          value: formatNumber(summary.messages.total),
          change: formatChange(summary.messages.change),
          positive: summary.messages.change >= 0,
          icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
        },
        {
          label: "Followers Gained",
          value: formatNumber(summary.followers.total),
          change: formatChange(summary.followers.change),
          positive: summary.followers.change >= 0,
          icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
        },
        {
          label: "Events",
          value: formatNumber(summary.events.total),
          change: formatChange(summary.events.change),
          positive: summary.events.change >= 0,
          icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
        },
      ]
    : [];

  /* ── Render ── */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted mt-1">
            Comprehensive ecosystem performance metrics
            {!loading && summary && (
              <span className="text-dim"> &middot; Last {TIME_PERIODS[periodIdx].label}</span>
            )}
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-lg bg-glass border border-glass-border">
          {TIME_PERIODS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setPeriodIdx(i)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                periodIdx === i
                  ? "bg-red/15 text-red-bright"
                  : "text-muted hover:text-foreground hover:bg-white/[0.04]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="card p-4 border-red/30 bg-red/5">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-bright flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-bright">Failed to load analytics</p>
              <p className="text-xs text-muted mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => fetchAll(days, true)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red/15 text-red-bright hover:bg-red/25 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Top Level Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : statCards.map((stat) => (
              <div key={stat.label} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <svg className="w-4 h-4 text-dim" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                  <span className={`text-[10px] font-bold ${stat.positive ? "text-emerald" : "text-red-bright"}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-xl font-extrabold">{stat.value}</div>
                <div className="text-[10px] text-dim">{stat.label}</div>
              </div>
            ))}
      </div>

      {/* Sparkline (mini bar chart from summary) */}
      {!loading && summary && summary.sparkline.length > 0 && (
        <div className="card p-4">
          <h2 className="text-xs font-bold text-dim mb-3 uppercase tracking-wider">Activity Sparkline</h2>
          <div className="h-12 flex items-end gap-[2px]">
            {summary.sparkline.map((v, i) => {
              const max = Math.max(...summary.sparkline, 1);
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-red/30 to-red-bright/60 transition-all hover:from-red/50 hover:to-red-bright/80 min-h-[2px]"
                  style={{ height: `${(v / max) * 48}px` }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chat Activity Chart */}
        {loading ? (
          <ChartSkeleton />
        ) : (
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Chat Activity</h2>
            {displayTimeline.length > 0 ? (
              <div className="h-48 flex items-end gap-2 px-2">
                {displayTimeline.map((point) => {
                  const max = Math.max(...displayTimeline.map((p) => p.messages), 1);
                  return (
                    <div key={point.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-card text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {point.messages.toLocaleString()} msgs
                      </div>
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-electric/30 to-electric/60 transition-all hover:from-electric/50 hover:to-electric/80 min-h-[4px]"
                        style={{ height: `${(point.messages / max) * 160}px` }}
                      />
                      <span className="text-data text-[9px] text-dim">{formatDate(point.date)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-xs text-dim">
                No chat data for this period
              </div>
            )}
          </div>
        )}

        {/* Revenue Timeline Chart */}
        {loading ? (
          <ChartSkeleton />
        ) : (
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Revenue Timeline</h2>
            {displayRevenueTimeline.length > 0 ? (
              <div className="h-48 flex items-end gap-2 px-2">
                {displayRevenueTimeline.map((point) => {
                  const max = Math.max(...displayRevenueTimeline.map((p) => p.amount), 1);
                  return (
                    <div key={point.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-card text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {formatCurrency(point.amount)}
                      </div>
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-gold/30 to-gold/60 transition-all hover:from-gold/50 hover:to-gold/80 min-h-[4px]"
                        style={{ height: `${(point.amount / max) * 160}px` }}
                      />
                      <span className="text-data text-[9px] text-dim">{formatDate(point.date)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-xs text-dim">
                No revenue data for this period
              </div>
            )}
          </div>
        )}
      </div>

      {/* Revenue Breakdown + Peak Hours */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Breakdown */}
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Revenue Sources</h2>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <Skeleton className="w-24 h-3" />
                    <Skeleton className="w-12 h-3" />
                  </div>
                  <Skeleton className="w-full h-2" />
                </div>
              ))}
            </div>
          ) : revenueBreakdown.length > 0 ? (
            <>
              <div className="space-y-3 mb-4">
                {revenueBreakdown.map((item) => {
                  const pct = revTotal > 0 ? Math.round((item.amount / revTotal) * 100) : 0;
                  return (
                    <div key={item.source}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted">{item.source}</span>
                        <span className="text-data text-xs font-bold text-gold">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-glass overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color} transition-all`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="divider mb-4" />
              <div className="flex justify-between">
                <span className="text-xs font-bold">Total</span>
                <span className="text-data text-sm font-extrabold text-gold">
                  {formatCurrency(revTotal)}
                </span>
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-xs text-dim">No revenue data</div>
          )}
        </div>

        {/* Peak Hours Heatmap */}
        <div className="lg:col-span-2 card p-5">
          <h2 className="text-sm font-bold mb-4">Peak Chat Hours</h2>
          {loading ? (
            <div className="h-40 flex items-end gap-1 px-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <Skeleton key={i} className="flex-1" style={{ height: `${20 + Math.random() * 80}px` }} />
              ))}
            </div>
          ) : peakHours.length > 0 ? (
            <div className="h-40 flex items-end gap-1 px-2">
              {peakHours.map((h) => {
                const max = Math.max(...peakHours.map((p) => p.messages), 1);
                const intensity = h.messages / max;
                return (
                  <div key={h.hour} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-card text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {h.messages.toLocaleString()} msgs
                    </div>
                    <div
                      className="w-full rounded-t transition-all min-h-[4px]"
                      style={{
                        height: `${intensity * 130}px`,
                        backgroundColor: `rgba(236, 72, 72, ${0.2 + intensity * 0.6})`,
                      }}
                    />
                    <span className="text-data text-[8px] text-dim">{formatHour(h.hour)}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-xs text-dim">
              No peak hour data
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Top Supporters + Recent Events */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Supporters */}
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Top Supporters</h2>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="w-24 h-3 mb-1" />
                    <Skeleton className="w-full h-1" />
                  </div>
                  <Skeleton className="w-12 h-3" />
                </div>
              ))}
            </div>
          ) : topSupporters.length > 0 ? (
            <div className="space-y-1">
              {topSupporters.map((supporter, idx) => {
                const rank = idx + 1;
                const maxAmount = topSupporters[0]?.total ?? 1;
                return (
                  <div key={`${supporter.username}-${idx}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-glass transition-colors">
                    <span
                      className={`text-data text-xs font-bold w-5 text-center ${
                        rank === 1 ? "text-gold" :
                        rank === 2 ? "text-muted" :
                        rank === 3 ? "text-[#cd7f32]" : "text-dim"
                      }`}
                    >
                      {rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold truncate">{supporter.username}</div>
                      <div className="w-full h-1 rounded-full bg-glass mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-gold/40 to-gold/80"
                          style={{ width: `${(supporter.total / maxAmount) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-data text-xs font-semibold text-gold">{formatCurrency(supporter.total)}</div>
                      <div className="text-[10px] text-dim">{supporter.platform}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-dim">No supporter data for this period</div>
          )}
        </div>

        {/* Recent Events */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold">Recent Events</h2>
            <div className="powered-by-prismai">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" opacity="0.3" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              PRISMAI
            </div>
          </div>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="w-14 h-5 rounded" />
                  <div className="flex-1">
                    <Skeleton className="w-32 h-3 mb-1" />
                    <Skeleton className="w-20 h-2" />
                  </div>
                  <Skeleton className="w-10 h-3" />
                </div>
              ))}
            </div>
          ) : recentEvents.length > 0 ? (
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {recentEvents.slice(0, 20).map((event, idx) => (
                <div key={`${event.type}-${event.username}-${idx}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-glass transition-colors">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${eventTypeBadge(event.type)}`}>
                    {event.type.toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">
                      <span className={eventTypeColor(event.type)}>{event.username}</span>
                      {event.amount != null && (
                        <span className="text-gold ml-1.5 font-bold">{formatCurrency(event.amount)}</span>
                      )}
                    </div>
                    {event.message && (
                      <div className="text-[10px] text-dim truncate mt-0.5">{event.message}</div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] text-dim">{event.platform}</div>
                    <div className="text-[9px] text-dim">{formatTimestamp(event.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-dim">No events for this period</div>
          )}
        </div>
      </div>

      {/* Events Timeline */}
      {!loading && events && events.timeline && events.timeline.length > 0 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Events Timeline</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-3">Date</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-3">Follows</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-3">Subs</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-3">Donations</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-3">Orders</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-3">Raids</th>
                </tr>
              </thead>
              <tbody>
                {events.timeline.slice(-14).map((row) => (
                  <tr key={row.date} className="border-b border-glass-border hover:bg-glass transition-colors">
                    <td className="p-3 text-xs font-semibold">{formatDate(row.date)}</td>
                    <td className="p-3 text-right text-data text-xs text-muted">{row.follow.toLocaleString()}</td>
                    <td className="p-3 text-right text-data text-xs text-muted">{row.sub.toLocaleString()}</td>
                    <td className="p-3 text-right text-data text-xs text-gold font-semibold">{row.donation.toLocaleString()}</td>
                    <td className="p-3 text-right text-data text-xs text-muted">{row.order.toLocaleString()}</td>
                    <td className="p-3 text-right text-data text-xs text-muted">{row.raid.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer status */}
      {!loading && (
        <div className="flex items-center justify-center gap-2 text-[10px] text-dim py-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
          <span>Live data &middot; Polling every 60s &middot; Period: {TIME_PERIODS[periodIdx].label} ({days} days)</span>
        </div>
      )}
    </div>
  );
}
