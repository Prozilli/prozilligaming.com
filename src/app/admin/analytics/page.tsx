"use client";

import { useState } from "react";

/* ============================================================
   Analytics Dashboard Page
   ============================================================ */

const TIME_PERIODS = ["24h", "7d", "30d", "90d", "1y"] as const;

const PLATFORM_BREAKDOWN = [
  { platform: "Twitch", color: "#9146ff", viewers: 4521, followers: 1234, revenue: "$412", percentage: 38 },
  { platform: "Kick", color: "#53fc18", viewers: 2314, followers: 567, revenue: "$89", percentage: 19 },
  { platform: "YouTube", color: "#ff0000", viewers: 1892, followers: 891, revenue: "$234", percentage: 16 },
  { platform: "Discord", color: "#5865f2", viewers: 0, followers: 1847, revenue: "$0", percentage: 12 },
  { platform: "Facebook", color: "#1877f2", viewers: 891, followers: 432, revenue: "$45", percentage: 8 },
  { platform: "Instagram", color: "#e4405f", viewers: 0, followers: 2345, revenue: "$0", percentage: 4 },
  { platform: "TikTok", color: "#ff0050", viewers: 0, followers: 892, revenue: "$0", percentage: 2 },
  { platform: "Trovo", color: "#19d65c", viewers: 234, followers: 123, revenue: "$12", percentage: 1 },
];

const REVENUE_BREAKDOWN = [
  { source: "Subscriptions", amount: "$412", percentage: 35, color: "bg-red/60" },
  { source: "Donations / Tips", amount: "$289", percentage: 24, color: "bg-gold/60" },
  { source: "Merch Sales", amount: "$234", percentage: 20, color: "bg-electric/60" },
  { source: "VIP Tiers", amount: "$156", percentage: 13, color: "bg-emerald/60" },
  { source: "Bits / Cheers", amount: "$89", percentage: 8, color: "bg-info/60" },
];

const TOP_CHATTERS = [
  { rank: 1, user: "PixelKing", messages: 3891, platform: "Discord" },
  { rank: 2, user: "NightRider_99", messages: 2847, platform: "Twitch" },
  { rank: 3, user: "GhostPepper42", messages: 2234, platform: "Kick" },
  { rank: 4, user: "TurboFan_X", messages: 1892, platform: "Twitch" },
  { rank: 5, user: "LunaStream", messages: 1567, platform: "YouTube" },
  { rank: 6, user: "CyberNova", messages: 1234, platform: "Discord" },
  { rank: 7, user: "BlazeMaster", messages: 1089, platform: "Twitch" },
  { rank: 8, user: "ShadowFox", messages: 891, platform: "Kick" },
  { rank: 9, user: "IceQueen_X", messages: 756, platform: "Discord" },
  { rank: 10, user: "StormChaser", messages: 623, platform: "Twitch" },
];

const LISA_STATS = [
  { label: "Total Responses", value: "24,891" },
  { label: "Unique Users Interacted", value: "1,247" },
  { label: "Avg Response Time", value: "210ms" },
  { label: "Groq API Calls", value: "22,142" },
  { label: "OpenAI Fallback Calls", value: "2,749" },
  { label: "Circuit Breaker Trips", value: "3" },
  { label: "Most Active Platform", value: "Discord" },
  { label: "Languages Detected", value: "12" },
];

const STREAM_STATS_CHART = [
  { day: "Mon", viewers: 89, chatMessages: 1234 },
  { day: "Tue", viewers: 0, chatMessages: 0 },
  { day: "Wed", viewers: 112, chatMessages: 2341 },
  { day: "Thu", viewers: 0, chatMessages: 0 },
  { day: "Fri", viewers: 134, chatMessages: 2891 },
  { day: "Sat", viewers: 187, chatMessages: 4521 },
  { day: "Sun", viewers: 98, chatMessages: 1567 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<(typeof TIME_PERIODS)[number]>("30d");

  const maxViewers = Math.max(...STREAM_STATS_CHART.map((s) => s.viewers));
  const maxChat = Math.max(...STREAM_STATS_CHART.map((s) => s.chatMessages));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted mt-1">Comprehensive ecosystem performance metrics</p>
        </div>
        <div className="flex gap-1 p-1 rounded-lg bg-glass border border-glass-border">
          {TIME_PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                period === p
                  ? "bg-red/15 text-red-bright"
                  : "text-muted hover:text-foreground hover:bg-white/[0.04]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top Level Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Viewers", value: "9,852", change: "+23%", icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
          { label: "Followers Gained", value: "8,331", change: "+15%", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
          { label: "Chat Messages", value: "47,234", change: "+31%", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
          { label: "Revenue", value: "$1,180", change: "+8%", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
          { label: "Stream Hours", value: "28.5h", change: "+4%", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-4 h-4 text-dim" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
              <span className="text-[10px] font-bold text-emerald">{stat.change}</span>
            </div>
            <div className="text-xl font-extrabold">{stat.value}</div>
            <div className="text-[10px] text-dim">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Viewer Chart */}
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Weekly Viewers</h2>
          <div className="h-48 flex items-end gap-4 px-2">
            {STREAM_STATS_CHART.map((stat) => (
              <div key={stat.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-red/30 to-red-bright/60 transition-all hover:from-red/50 hover:to-red-bright/80 min-h-[4px]"
                  style={{ height: maxViewers > 0 ? `${(stat.viewers / maxViewers) * 160}px` : "4px" }}
                />
                <span className="text-data text-[10px] text-dim">{stat.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Activity Chart */}
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Weekly Chat Activity</h2>
          <div className="h-48 flex items-end gap-4 px-2">
            {STREAM_STATS_CHART.map((stat) => (
              <div key={stat.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-electric/30 to-electric/60 transition-all hover:from-electric/50 hover:to-electric/80 min-h-[4px]"
                  style={{ height: maxChat > 0 ? `${(stat.chatMessages / maxChat) * 160}px` : "4px" }}
                />
                <span className="text-data text-[10px] text-dim">{stat.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Breakdown + Revenue */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Platform Breakdown */}
        <div className="lg:col-span-2 card p-5">
          <h2 className="text-sm font-bold mb-4">Platform Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-dim p-3">Platform</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-3">Viewers</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-3">Followers</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-3">Revenue</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-dim p-3">Share</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORM_BREAKDOWN.map((platform) => (
                  <tr key={platform.platform} className="border-b border-glass-border hover:bg-glass transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                          style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                        >
                          {platform.platform.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold">{platform.platform}</span>
                      </div>
                    </td>
                    <td className="p-3 text-right text-data text-xs text-muted">{platform.viewers.toLocaleString()}</td>
                    <td className="p-3 text-right text-data text-xs text-muted">{platform.followers.toLocaleString()}</td>
                    <td className="p-3 text-right text-data text-xs font-semibold text-gold">{platform.revenue}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-glass overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${platform.percentage}%`, backgroundColor: platform.color }}
                          />
                        </div>
                        <span className="text-data text-[10px] text-dim w-8">{platform.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Revenue Sources</h2>
          <div className="space-y-3 mb-4">
            {REVENUE_BREAKDOWN.map((item) => (
              <div key={item.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted">{item.source}</span>
                  <span className="text-data text-xs font-bold text-gold">{item.amount}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-glass overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="divider mb-4" />
          <div className="flex justify-between">
            <span className="text-xs font-bold">Total</span>
            <span className="text-data text-sm font-extrabold text-gold">$1,180</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Chatters + LISA Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Chatters */}
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Top Chatters</h2>
          <div className="space-y-1">
            {TOP_CHATTERS.map((chatter) => {
              const maxMsg = TOP_CHATTERS[0].messages;
              return (
                <div key={chatter.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-glass transition-colors">
                  <span className={`text-data text-xs font-bold w-5 text-center ${
                    chatter.rank === 1 ? "text-gold" :
                    chatter.rank === 2 ? "text-muted" :
                    chatter.rank === 3 ? "text-[#cd7f32]" : "text-dim"
                  }`}>
                    {chatter.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{chatter.user}</div>
                    <div className="w-full h-1 rounded-full bg-glass mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold/40 to-gold/80"
                        style={{ width: `${(chatter.messages / maxMsg) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-data text-xs text-muted">{chatter.messages.toLocaleString()}</div>
                    <div className="text-[10px] text-dim">{chatter.platform}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LISA Stats */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold">LISA AI Stats</h2>
            <div className="powered-by-prismai">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" opacity="0.3" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              PRISMAI
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {LISA_STATS.map((stat) => (
              <div key={stat.label} className="p-3 rounded-lg bg-glass border border-glass-border">
                <div className="text-sm font-extrabold">{stat.value}</div>
                <div className="text-[10px] text-dim mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Follow/Sub Trends */}
      <div className="card p-5">
        <h2 className="text-sm font-bold mb-4">Follow & Subscription Trends</h2>
        <div className="h-40 rounded-lg bg-glass border border-glass-border flex items-center justify-center">
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto text-dim mb-2" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <p className="text-xs text-dim">Connect PRISMAI Analytics (port 5018) for real-time charts</p>
            <p className="text-[10px] text-dim mt-1">FastAPI + Chart.js integration coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
