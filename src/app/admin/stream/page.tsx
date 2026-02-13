"use client";

import { useState } from "react";

/* ============================================================
   Stream Management Page
   ============================================================ */

const STREAM_PLATFORMS = [
  { id: "twitch", name: "Twitch", color: "#9146ff", enabled: true, status: "offline" },
  { id: "kick", name: "Kick", color: "#53fc18", enabled: true, status: "offline" },
  { id: "youtube", name: "YouTube", color: "#ff0000", enabled: true, status: "offline" },
  { id: "facebook", name: "Facebook", color: "#1877f2", enabled: false, status: "offline" },
  { id: "trovo", name: "Trovo", color: "#19d65c", enabled: true, status: "offline" },
  { id: "tiktok", name: "TikTok", color: "#ff0050", enabled: false, status: "disconnected" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_SLOTS = ["12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

const SCHEDULE_DATA: Record<string, { start: number; end: number; game: string; color: string }[]> = {
  Monday: [{ start: 5, end: 9, game: "GTA V - ZO Syndicate", color: "bg-red/30" }],
  Tuesday: [],
  Wednesday: [{ start: 4, end: 8, game: "Variety Night", color: "bg-electric/30" }],
  Thursday: [],
  Friday: [{ start: 5, end: 10, game: "GTA V - ZO Syndicate", color: "bg-red/30" }],
  Saturday: [{ start: 2, end: 8, game: "Marathon Stream", color: "bg-gold/30" }],
  Sunday: [{ start: 3, end: 7, game: "Community Games", color: "bg-emerald/30" }],
};

const RECENT_VODS = [
  { title: "ZO Syndicate - Gang Wars Pt.3", date: "Feb 12, 2026", duration: "4h 23m", viewers: 142, platforms: ["Twitch", "Kick", "YouTube"] },
  { title: "Variety Night - Elden Ring DLC", date: "Feb 10, 2026", duration: "3h 45m", viewers: 98, platforms: ["Twitch", "Kick"] },
  { title: "ZO Syndicate - Casino Heist", date: "Feb 8, 2026", duration: "5h 10m", viewers: 187, platforms: ["Twitch", "Kick", "YouTube", "Trovo"] },
  { title: "Community Games - Fortnite", date: "Feb 5, 2026", duration: "2h 30m", viewers: 76, platforms: ["Twitch"] },
];

export default function StreamPage() {
  const [streamTitle, setStreamTitle] = useState("ZO Syndicate RP - Building the City");
  const [streamGame, setStreamGame] = useState("Grand Theft Auto V");
  const [streamTags, setStreamTags] = useState("English, FiveM, Roleplay, ZOSyndicate");
  const [chatBridgeEnabled, setChatBridgeEnabled] = useState(false);
  const [platformToggles, setPlatformToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(STREAM_PLATFORMS.map((p) => [p.id, p.enabled]))
  );

  const togglePlatform = (id: string) => {
    setPlatformToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stream Management</h1>
          <p className="text-sm text-muted mt-1">Go live, manage streams, and schedule content</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="badge badge-red">
            <span className="w-1.5 h-1.5 rounded-full bg-dim" />
            Offline
          </div>
          <button className="btn btn-primary btn-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            Go Live
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Go Live Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stream Info */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Stream Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Stream Title</label>
                <input
                  type="text"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Game / Category</label>
                  <input
                    type="text"
                    value={streamGame}
                    onChange={(e) => setStreamGame(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Tags</label>
                  <input
                    type="text"
                    value={streamTags}
                    onChange={(e) => setStreamTags(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button className="btn btn-ghost btn-sm">Reset</button>
                <button className="btn btn-secondary btn-sm">Update Info</button>
              </div>
            </div>
          </div>

          {/* Multi-Platform Targets */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Platform Targets</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {STREAM_PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    platformToggles[platform.id]
                      ? "bg-glass-active border-glass-border-hover"
                      : "bg-glass/50 border-glass-border opacity-50"
                  } ${platform.status === "disconnected" ? "cursor-not-allowed opacity-30" : "cursor-pointer"}`}
                  disabled={platform.status === "disconnected"}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                  >
                    {platform.name.charAt(0)}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-xs font-semibold truncate">{platform.name}</div>
                    <div className="text-[10px] text-dim capitalize">{platform.status}</div>
                  </div>
                  <div className={`ml-auto w-8 h-4.5 rounded-full transition-colors flex-shrink-0 ${
                    platformToggles[platform.id] ? "bg-emerald" : "bg-dim"
                  }`}>
                    <div className={`w-3.5 h-3.5 rounded-full bg-white mt-0.5 transition-transform ${
                      platformToggles[platform.id] ? "translate-x-4" : "translate-x-0.5"
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Bridge */}
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold">Chat Bridge</h2>
                <p className="text-xs text-muted mt-1">Relay messages across all connected platforms in real-time</p>
              </div>
              <button
                onClick={() => setChatBridgeEnabled(!chatBridgeEnabled)}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                  chatBridgeEnabled ? "bg-emerald" : "bg-dim"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-transform ${
                  chatBridgeEnabled ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>
            {chatBridgeEnabled && (
              <div className="mt-4 p-3 rounded-lg bg-emerald/10 border border-emerald/20">
                <div className="flex items-center gap-2 text-xs text-emerald">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Chat bridge active. Messages relay between all enabled platforms.
                </div>
              </div>
            )}
          </div>

          {/* Clip Creation */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Quick Clip</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-dim block mb-1.5">Clip Title (optional)</label>
                <input
                  type="text"
                  placeholder="Leave blank for auto-title"
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                />
              </div>
              <button className="btn btn-secondary btn-sm mt-5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Create Clip
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Stream Schedule */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Weekly Schedule</h2>
              <button className="text-xs text-muted hover:text-foreground transition-colors">Edit</button>
            </div>
            <div className="space-y-1.5">
              {DAYS.map((day) => {
                const events = SCHEDULE_DATA[day] || [];
                return (
                  <div key={day} className="flex items-center gap-3 p-2 rounded-lg hover:bg-glass transition-colors">
                    <span className="text-[10px] font-bold text-dim w-8">{day.slice(0, 3)}</span>
                    {events.length > 0 ? (
                      <div className="flex-1">
                        {events.map((event, i) => (
                          <div key={i} className={`px-2 py-1 rounded text-[10px] ${event.color}`}>
                            <span className="font-semibold">{TIME_SLOTS[event.start]} - {TIME_SLOTS[event.end]}</span>
                            <span className="text-muted ml-1">{event.game}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] text-dim italic">Off</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent VODs */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Recent VODs</h2>
            <div className="space-y-3">
              {RECENT_VODS.map((vod, i) => (
                <div key={i} className="p-3 rounded-lg bg-glass border border-glass-border hover:border-glass-border-hover transition-all cursor-pointer">
                  <div className="text-xs font-semibold mb-1 truncate">{vod.title}</div>
                  <div className="flex items-center gap-3 text-[10px] text-dim">
                    <span>{vod.date}</span>
                    <span>{vod.duration}</span>
                    <span>{vod.viewers} peak</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {vod.platforms.map((p) => (
                      <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-glass border border-glass-border text-dim">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
