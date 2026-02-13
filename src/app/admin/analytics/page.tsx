"use client";

import { useState, useEffect, useCallback } from "react";
import StatCard from "@/components/admin/StatCard";
import LineChart from "@/components/admin/LineChart";
import HeatMap from "@/components/admin/HeatMap";
import EventFeed from "@/components/admin/EventFeed";
import PlatformCompare from "@/components/admin/PlatformCompare";
import TimePeriodPicker from "@/components/admin/TimePeriodPicker";

const API_BASE = "/api/prismai";

interface SummaryData {
  days: number;
  revenue: { total: number; change: number };
  messages: { total: number; change: number };
  followers: { total: number; change: number };
  events: { total: number; change: number };
  sparkline: number[];
}

interface RevenueData {
  donations: { count: number; total: number };
  orders: { count: number; total: number };
  totalRevenue: number;
  topSupporters: { user: string; total_amount: number; event_count: number }[];
  timeline: { date: string; donations: number; orders: number }[];
}

interface EngagementData {
  timeline: { bucket: string; messages: number; uniqueUsers: number }[];
  peakHours: { hour: number; messages: number; uniqueUsers: number }[];
}

interface EventsData {
  timeline: Record<string, unknown>[];
  recent: {
    id: number;
    type: string;
    platform: string;
    user: string;
    data: Record<string, unknown>;
    timestamp: string;
  }[];
}

interface PlatformsData {
  platforms: {
    platform: string;
    messages: number;
    chatters: number;
    follows: number;
    subs: number;
    donations: number;
    revenue: number;
  }[];
}

export default function AnalyticsPage() {
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [revenue, setRevenue] = useState<RevenueData | null>(null);
  const [engagement, setEngagement] = useState<EngagementData | null>(null);
  const [events, setEvents] = useState<EventsData | null>(null);
  const [platformData, setPlatformData] = useState<PlatformsData | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const q = `?days=${days}`;
    const results = await Promise.allSettled([
      fetch(API_BASE + "/analytics/summary" + q).then((r) => r.json()),
      fetch(API_BASE + "/analytics/revenue" + q).then((r) => r.json()),
      fetch(API_BASE + "/analytics/engagement" + q).then((r) => r.json()),
      fetch(API_BASE + "/analytics/events" + q).then((r) => r.json()),
      fetch(API_BASE + "/analytics/platforms" + q).then((r) => r.json()),
    ]);

    if (results[0].status === "fulfilled" && !results[0].value.error) setSummary(results[0].value);
    if (results[1].status === "fulfilled" && !results[1].value.error) setRevenue(results[1].value);
    if (results[2].status === "fulfilled" && !results[2].value.error) setEngagement(results[2].value);
    if (results[3].status === "fulfilled" && !results[3].value.error) setEvents(results[3].value);
    if (results[4].status === "fulfilled" && !results[4].value.error) setPlatformData(results[4].value);

    setLoading(false);
  }, [days]);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 60000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  // Extract chart labels/data from engagement timeline
  const engagementLabels = engagement?.timeline.map((d) => {
    return String(d.bucket).slice(5, 10);
  }) || [];

  const engagementSeries = [
    {
      label: "Messages",
      data: engagement?.timeline.map((d) => d.messages) || [],
      color: "#ef4444",
    },
    {
      label: "Unique Users",
      data: engagement?.timeline.map((d) => d.uniqueUsers) || [],
      color: "#d4a017",
    },
  ];

  // Revenue timeline
  const revLabels = revenue?.timeline.map((d) => String(d.date).slice(5, 10)) || [];
  const revSeries = [
    {
      label: "Donations",
      data: revenue?.timeline.map((d) => d.donations) || [],
      color: "#d4a017",
    },
    {
      label: "Orders",
      data: revenue?.timeline.map((d) => d.orders) || [],
      color: "#ef4444",
    },
  ];

  // Event timeline
  const eventTypes = ["follow", "sub", "donation", "order", "raid"];
  const eventColors: Record<string, string> = {
    follow: "#22c55e",
    sub: "#eab308",
    donation: "#d4a017",
    order: "#ef4444",
    raid: "#8b5cf6",
  };
  const evtTimeline = events?.timeline || [];
  const evtLabels = evtTimeline.map((d) => String((d as Record<string, unknown>).date).slice(5, 10));
  const evtSeries = eventTypes
    .filter((t) => evtTimeline.some((d) => (d as Record<string, unknown>)[t]))
    .map((t) => ({
      label: t,
      data: evtTimeline.map((d) => Number((d as Record<string, unknown>)[t] || 0)),
      color: eventColors[t] || "#888",
    }));

  return (
    <>
      {/* Header */}
      <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-4 sm:px-6 pt-12 sm:pt-16 pb-6 sm:pb-8 text-center">
        <div className="cinematic-smoke" />
        <div className="film-grain" />
        <div className="vignette" />
        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-glow-red text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            ANALYTICS
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-2 text-sm text-muted">
            Detailed performance metrics and trends
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between">
          <TimePeriodPicker days={days} onChange={setDays} />
          {loading && <span className="text-xs text-muted animate-pulse">Loading...</span>}
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Revenue"
            value={summary?.revenue.total ?? 0}
            prefix="$"
            change={summary?.revenue.change}
            color="text-gold"
          />
          <StatCard
            label="Total Messages"
            value={summary?.messages.total ?? 0}
            change={summary?.messages.change}
          />
          <StatCard
            label="New Followers"
            value={summary?.followers.total ?? 0}
            change={summary?.followers.change}
            color="text-red"
          />
          <StatCard
            label="Total Events"
            value={summary?.events.total ?? 0}
            change={summary?.events.change}
            color="text-white/70"
          />
        </div>

        {/* Revenue Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Revenue
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue Timeline Chart */}
            <div className="panel rounded-xl p-6">
              <h3 className="mb-4 text-sm font-medium text-white">Daily Revenue</h3>
              <LineChart labels={revLabels} series={revSeries} height={220} />
            </div>

            {/* Top Supporters */}
            <div className="panel rounded-xl p-6">
              <h3 className="mb-4 text-sm font-medium text-white">Top Supporters</h3>
              {revenue?.topSupporters && revenue.topSupporters.length > 0 ? (
                <div className="space-y-3">
                  {revenue.topSupporters.map((s, i) => (
                    <div key={s.user} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold/20 text-xs font-bold text-gold">
                          {i + 1}
                        </span>
                        <span className="text-white">{s.user}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-gold">
                          ${s.total_amount.toFixed(2)}
                        </span>
                        <span className="ml-2 text-xs text-muted">
                          {s.event_count} events
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No supporter data yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Engagement Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-red">
            Engagement
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Message Volume Chart */}
            <div className="panel rounded-xl p-6">
              <h3 className="mb-4 text-sm font-medium text-white">Message Volume</h3>
              <LineChart labels={engagementLabels} series={engagementSeries} height={220} />
            </div>

            {/* Peak Hours HeatMap */}
            <div className="panel rounded-xl p-6">
              <h3 className="mb-4 text-sm font-medium text-white">Peak Hours</h3>
              <HeatMap data={engagement?.peakHours || []} />
            </div>
          </div>
        </div>

        {/* Platform Comparison */}
        <div className="mb-8">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Platform Comparison
          </h2>
          <div className="panel rounded-xl p-6">
            <PlatformCompare data={platformData?.platforms || []} />
          </div>
        </div>

        {/* Event Timeline + Feed */}
        <div className="mb-8">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Events
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Event Timeline Chart */}
            <div className="panel rounded-xl p-6">
              <h3 className="mb-4 text-sm font-medium text-white">Event Trends</h3>
              <LineChart labels={evtLabels} series={evtSeries} height={220} />
            </div>

            {/* Recent Events Feed */}
            <div className="panel rounded-xl p-6">
              <h3 className="mb-4 text-sm font-medium text-white">Recent Events</h3>
              <EventFeed events={events?.recent || []} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
