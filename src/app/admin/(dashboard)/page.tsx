"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ============================================================
   Platform Data
   ============================================================ */

const PLATFORMS = [
  { id: "twitch", name: "Twitch", color: "#9146ff", connected: true, lastActivity: "2 min ago", viewers: 34 },
  { id: "kick", name: "Kick", color: "#53fc18", connected: true, lastActivity: "5 min ago", viewers: 12 },
  { id: "youtube", name: "YouTube", color: "#ff0000", connected: true, lastActivity: "10 min ago", viewers: 8 },
  { id: "discord", name: "Discord", color: "#5865f2", connected: true, lastActivity: "Just now", viewers: 0 },
  { id: "x", name: "X / Twitter", color: "#ffffff", connected: true, lastActivity: "1 hr ago", viewers: 0 },
  { id: "facebook", name: "Facebook", color: "#1877f2", connected: true, lastActivity: "3 hr ago", viewers: 0 },
  { id: "instagram", name: "Instagram", color: "#e4405f", connected: true, lastActivity: "2 hr ago", viewers: 0 },
  { id: "trovo", name: "Trovo", color: "#19d65c", connected: true, lastActivity: "15 min ago", viewers: 3 },
  { id: "tiktok", name: "TikTok", color: "#ff0050", connected: false, lastActivity: "Disconnected", viewers: 0 },
];

const LIVE_STATS = [
  { label: "Total Viewers", value: "57", change: "+12", icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Chat Messages", value: "1,247", change: "+89", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
  { label: "Followers Today", value: "23", change: "+5", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
  { label: "Subs Today", value: "4", change: "+2", icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" },
];

const QUICK_ACTIONS = [
  { label: "Go Live", href: "/admin/stream", color: "btn-primary", icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" },
  { label: "Send Alert", href: "/admin/embeds", color: "btn-secondary", icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" },
  { label: "Post Content", href: "/admin/autopost", color: "btn-secondary", icon: "M12 4.5v15m7.5-7.5h-15" },
  { label: "Run Giveaway", href: "/admin/giveaways", color: "btn-gold", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" },
];

const RECENT_ACTIVITY = [
  { type: "follow", user: "NightRider_99", platform: "Twitch", time: "2 min ago", color: "#9146ff" },
  { type: "chat", user: "LISA", platform: "Discord", time: "3 min ago", color: "#5865f2" },
  { type: "sub", user: "GhostPepper42", platform: "Twitch", time: "8 min ago", color: "#9146ff" },
  { type: "donation", user: "PixelKing", platform: "Fourthwall", time: "15 min ago", color: "#c4a265" },
  { type: "follow", user: "Streaming_Pro", platform: "Kick", time: "22 min ago", color: "#53fc18" },
  { type: "chat", user: "VaniaBot", platform: "Discord", time: "25 min ago", color: "#5865f2" },
  { type: "order", user: "TurboFan_X", platform: "Fourthwall", time: "32 min ago", color: "#c4a265" },
  { type: "follow", user: "LunaStream", platform: "YouTube", time: "1 hr ago", color: "#ff0000" },
];

const SYSTEM_HEALTH = [
  { name: "PRISMAI Core", status: "online", latency: "42ms", uptime: "99.9%" },
  { name: "LISA AI (Groq)", status: "online", latency: "180ms", uptime: "97.2%" },
  { name: "LISA AI (OpenAI)", status: "standby", latency: "--", uptime: "99.8%" },
  { name: "MySQL Database", status: "online", latency: "8ms", uptime: "99.99%" },
  { name: "CF Workers API", status: "online", latency: "12ms", uptime: "99.95%" },
  { name: "Token Manager", status: "online", latency: "--", uptime: "100%" },
];

/* ============================================================
   Activity type icons
   ============================================================ */

function ActivityIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    follow: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z",
    chat: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
    sub: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
    donation: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    order: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
  };
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type] || paths.chat} />
    </svg>
  );
}

/* ============================================================
   Dashboard Page
   ============================================================ */

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted mt-1">Ecosystem overview and quick actions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-data text-dim">{currentTime}</div>
          <div className="badge badge-emerald">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
            All Systems Go
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {LIVE_STATS.map((stat) => (
          <div key={stat.label} className="card p-5 group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-glass flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <span className="text-xs font-semibold text-emerald">{stat.change}</span>
            </div>
            <div className="text-2xl font-extrabold tracking-tight">{stat.value}</div>
            <div className="text-xs text-dim mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-raised p-4">
        <div className="text-label text-dim mb-3">Quick Actions</div>
        <div className="flex flex-wrap gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.label} href={action.href} className={`btn ${action.color} btn-sm`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
              </svg>
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Grid: Platforms + Activity + Health */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Platform Status Grid */}
        <div className="lg:col-span-2">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Platform Status</h2>
              <Link href="/admin/platforms" className="text-xs text-muted hover:text-foreground transition-colors">
                Manage
                <svg className="w-3 h-3 inline ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {PLATFORMS.map((platform) => (
                <div
                  key={platform.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-glass border border-glass-border hover:border-glass-border-hover transition-all"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                  >
                    {platform.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{platform.name}</div>
                    <div className="text-[10px] text-dim">{platform.lastActivity}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        platform.connected ? "bg-emerald" : "bg-error"
                      }`}
                    />
                    {platform.viewers > 0 && (
                      <span className="text-[10px] font-bold text-muted">{platform.viewers}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold">Recent Activity</h2>
            <span className="badge badge-electric text-[9px]">Live</span>
          </div>
          <div className="space-y-1">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-glass transition-colors"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${activity.color}15`, color: activity.color }}
                >
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">
                    <span className="text-foreground">{activity.user}</span>
                    <span className="text-dim"> {activity.type === "follow" ? "followed" : activity.type === "sub" ? "subscribed" : activity.type === "donation" ? "donated" : activity.type === "order" ? "placed order" : "sent message"}</span>
                  </div>
                  <div className="text-[10px] text-dim">{activity.platform} &middot; {activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold">System Health</h2>
          <div className="powered-by-prismai">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" opacity="0.3" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            PRISMAI Engine
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SYSTEM_HEALTH.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-3 rounded-lg bg-glass border border-glass-border"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    service.status === "online"
                      ? "bg-emerald"
                      : service.status === "standby"
                      ? "bg-warning"
                      : "bg-error"
                  }`}
                />
                <div>
                  <div className="text-xs font-semibold">{service.name}</div>
                  <div className="text-[10px] text-dim capitalize">{service.status}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-data text-xs">{service.latency}</div>
                <div className="text-[10px] text-dim">{service.uptime}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue & Stream Summary Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Summary */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold">Revenue (This Month)</h2>
            <Link href="/admin/analytics" className="text-xs text-muted hover:text-foreground transition-colors">
              Full Analytics
              <svg className="w-3 h-3 inline ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xl font-extrabold text-gold">$247</div>
              <div className="text-[10px] text-dim">Tips & Donations</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-electric">$89</div>
              <div className="text-[10px] text-dim">Subscriptions</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-emerald">$156</div>
              <div className="text-[10px] text-dim">Merch Sales</div>
            </div>
          </div>
          {/* Placeholder chart area */}
          <div className="h-32 rounded-lg bg-glass border border-glass-border flex items-center justify-center">
            <div className="flex items-end gap-1.5 h-20">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 50, 75].map((h, i) => (
                <div
                  key={i}
                  className="w-5 rounded-t bg-gradient-to-t from-red/40 to-red-bright/60 transition-all hover:from-red/60 hover:to-red-bright/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stream Summary */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold">Last Stream Summary</h2>
            <span className="text-data text-dim">Feb 12, 2026</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-glass">
              <div className="text-lg font-extrabold">4h 23m</div>
              <div className="text-[10px] text-dim">Duration</div>
            </div>
            <div className="p-3 rounded-lg bg-glass">
              <div className="text-lg font-extrabold">142</div>
              <div className="text-[10px] text-dim">Peak Viewers</div>
            </div>
            <div className="p-3 rounded-lg bg-glass">
              <div className="text-lg font-extrabold">89</div>
              <div className="text-[10px] text-dim">Avg Viewers</div>
            </div>
            <div className="p-3 rounded-lg bg-glass">
              <div className="text-lg font-extrabold">3,891</div>
              <div className="text-[10px] text-dim">Chat Messages</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-red">GTA V</span>
            <span className="badge badge-gold">ZO Syndicate</span>
            <span className="badge badge-electric">6 Platforms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
