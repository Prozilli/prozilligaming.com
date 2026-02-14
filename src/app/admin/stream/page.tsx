"use client";

import { useState, useEffect, useCallback } from "react";
import { api, PlatformStatus } from "@/lib/api";

/* ============================================================
   Stream Management Page
   ============================================================ */

const PLATFORM_COLORS: Record<string, string> = {
  twitch: "#9146ff",
  kick: "#53fc18",
  youtube: "#ff0000",
  facebook: "#1877f2",
  trovo: "#19d65c",
  tiktok: "#ff0050",
  discord: "#5865f2",
  x: "#000000",
  instagram: "#e4405f",
};

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

  // Live status from API
  const [isLive, setIsLive] = useState(false);
  const [liveCount, setLiveCount] = useState(0);
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([]);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState("");

  // Chat send state
  const [chatPlatform, setChatPlatform] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const [chatResult, setChatResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Platform toggles (for go-live targeting, derived from API data)
  const [platformToggles, setPlatformToggles] = useState<Record<string, boolean>>({});

  const fetchLiveStatus = useCallback(async () => {
    try {
      setLiveError("");
      const data = await api.live();
      setIsLive(data.isLive);
      setLiveCount(data.liveCount);
      setPlatforms(data.platforms);

      // Initialize toggles from connected platforms on first load
      setPlatformToggles((prev) => {
        if (Object.keys(prev).length === 0) {
          return Object.fromEntries(
            data.platforms.map((p) => [p.name.toLowerCase(), p.connected])
          );
        }
        return prev;
      });

      // Default chat platform to first connected platform
      if (!chatPlatform && data.platforms.length > 0) {
        const firstConnected = data.platforms.find((p) => p.connected);
        if (firstConnected) setChatPlatform(firstConnected.name.toLowerCase());
      }
    } catch (err) {
      setLiveError(err instanceof Error ? err.message : "Failed to fetch live status");
    } finally {
      setLiveLoading(false);
    }
  }, [chatPlatform]);

  useEffect(() => {
    fetchLiveStatus();
    const interval = setInterval(fetchLiveStatus, 15000);
    return () => clearInterval(interval);
  }, [fetchLiveStatus]);

  const togglePlatform = (name: string) => {
    setPlatformToggles((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleChatSend = async () => {
    if (!chatMessage.trim() || !chatPlatform) return;
    setChatSending(true);
    setChatResult(null);
    try {
      await api.chatSend(chatPlatform, chatMessage.trim());
      setChatResult({ ok: true, message: `Sent to ${chatPlatform}` });
      setChatMessage("");
      setTimeout(() => setChatResult(null), 3000);
    } catch (err) {
      setChatResult({
        ok: false,
        message: err instanceof Error ? err.message : "Failed to send",
      });
    } finally {
      setChatSending(false);
    }
  };

  // Build display list merging API data with known colors
  const platformDisplay = platforms.map((p) => {
    const key = p.name.toLowerCase();
    return {
      id: key,
      name: p.name,
      color: PLATFORM_COLORS[key] || "#888888",
      connected: p.connected,
      live: p.live,
    };
  });

  const connectedPlatforms = platformDisplay.filter((p) => p.connected);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stream Management</h1>
          <p className="text-sm text-muted mt-1">Go live, manage streams, and schedule content</p>
        </div>
        <div className="flex items-center gap-3">
          {liveLoading ? (
            <div className="badge badge-red">
              <span className="w-1.5 h-1.5 rounded-full bg-dim animate-pulse" />
              Loading...
            </div>
          ) : isLive ? (
            <div className="badge badge-emerald">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              Live on {liveCount} platform{liveCount !== 1 ? "s" : ""}
            </div>
          ) : (
            <div className="badge badge-red">
              <span className="w-1.5 h-1.5 rounded-full bg-dim" />
              Offline
            </div>
          )}
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

          {/* Multi-Platform Targets — Real API Data */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold">Platform Status</h2>
              {liveError ? (
                <button onClick={fetchLiveStatus} className="text-xs text-error hover:underline">
                  Retry
                </button>
              ) : (
                <span className="text-data text-xs text-dim">
                  {connectedPlatforms.length} connected
                </span>
              )}
            </div>
            {liveLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-glass-border bg-glass animate-pulse">
                    <div className="w-8 h-8 rounded-lg bg-glass flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 bg-glass rounded w-2/3" />
                      <div className="h-2 bg-glass rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : liveError ? (
              <div className="p-6 rounded-lg bg-error/10 border border-error/20 text-center">
                <p className="text-xs text-error mb-2">{liveError}</p>
                <button onClick={fetchLiveStatus} className="btn btn-ghost btn-sm text-xs">
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {platformDisplay.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => platform.connected && togglePlatform(platform.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      platform.connected && platformToggles[platform.id]
                        ? "bg-glass-active border-glass-border-hover"
                        : "bg-glass/50 border-glass-border opacity-50"
                    } ${!platform.connected ? "cursor-not-allowed opacity-30" : "cursor-pointer"}`}
                    disabled={!platform.connected}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                    >
                      {platform.name.charAt(0)}
                    </div>
                    <div className="text-left min-w-0">
                      <div className="text-xs font-semibold truncate">{platform.name}</div>
                      <div className={`text-[10px] capitalize ${
                        platform.live ? "text-emerald" :
                        platform.connected ? "text-muted" : "text-error"
                      }`}>
                        {platform.live ? "Live" : platform.connected ? "Connected" : "Disconnected"}
                      </div>
                    </div>
                    {platform.connected && (
                      <div className={`ml-auto w-8 h-4.5 rounded-full transition-colors flex-shrink-0 ${
                        platformToggles[platform.id] ? "bg-emerald" : "bg-dim"
                      }`}>
                        <div className={`w-3.5 h-3.5 rounded-full bg-white mt-0.5 transition-transform ${
                          platformToggles[platform.id] ? "translate-x-4" : "translate-x-0.5"
                        }`} />
                      </div>
                    )}
                    {platform.live && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            )}
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

          {/* Send Chat Message */}
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Send Chat Message</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Platform</label>
                <select
                  value={chatPlatform}
                  onChange={(e) => setChatPlatform(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                >
                  <option value="">Select platform...</option>
                  {connectedPlatforms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} {p.live ? "(Live)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Message</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !chatSending && handleChatSend()}
                    placeholder="Type a message to send..."
                    disabled={chatSending}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    onClick={handleChatSend}
                    disabled={chatSending || !chatMessage.trim() || !chatPlatform}
                    className="btn btn-primary btn-sm disabled:opacity-50"
                  >
                    {chatSending ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    )}
                    Send
                  </button>
                </div>
              </div>
              {chatResult && (
                <div className={`p-3 rounded-lg border text-xs ${
                  chatResult.ok
                    ? "bg-emerald/10 border-emerald/20 text-emerald"
                    : "bg-error/10 border-error/20 text-error"
                }`}>
                  {chatResult.ok ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {chatResult.message}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      {chatResult.message}
                    </div>
                  )}
                </div>
              )}
            </div>
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
