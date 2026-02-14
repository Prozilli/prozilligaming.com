"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { PlatformStatus } from "@/lib/api";

const PLATFORM_META: Record<string, { color: string; scopes: string[]; features: string[] }> = {
  twitch: { color: "#9146ff", scopes: ["chat:read", "chat:edit", "channel:read:subscriptions", "bits:read"], features: ["Chat", "Alerts", "Moderation", "Clips", "EventSub"] },
  kick: { color: "#53fc18", scopes: ["chat:write", "channel:read", "events:subscribe"], features: ["Chat", "Alerts", "PKCE S256"] },
  youtube: { color: "#ff0000", scopes: ["youtube.readonly", "youtube.upload", "youtube.force-ssl"], features: ["Chat Polling", "Uploads", "Shorts", "Livestream"] },
  discord: { color: "#5865f2", scopes: ["bot", "applications.commands", "guilds", "messages.read"], features: ["Chat", "Embeds", "Roles", "Moderation", "NPC Bots"] },
  x: { color: "#ffffff", scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"], features: ["Post", "Auto-Post", "PKCE S256"] },
  facebook: { color: "#1877f2", scopes: ["pages_manage_posts", "pages_read_engagement"], features: ["Post", "Reels", "Stories", "Auto-Post"] },
  instagram: { color: "#e4405f", scopes: ["instagram_basic", "instagram_content_publish"], features: ["Post", "Reels", "Stories", "PKCE S256"] },
  trovo: { color: "#19d65c", scopes: ["channel_details_self", "chat_send_self"], features: ["Chat", "Alerts"] },
  tiktok: { color: "#ff0050", scopes: ["video.publish", "user.info.basic"], features: ["Video Upload", "Auto-Post"] },
};

function getMeta(name: string) {
  const key = name.toLowerCase().replace(/ .*/, "");
  return PLATFORM_META[key] || { color: "#888", scopes: [], features: [] };
}

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformStatus | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState<string | null>(null);

  const fetchPlatforms = async () => {
    try {
      const res = await api.platforms();
      setPlatforms(res.platforms);
    } catch {
      // Keep existing data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
    const interval = setInterval(fetchPlatforms, 30_000);
    return () => clearInterval(interval);
  }, []);

  const connectedCount = platforms.filter((p) => p.connected).length;

  const openDetails = (platform: PlatformStatus) => {
    setSelectedPlatform(platform);
    setShowDetails(true);
  };

  const handleRefreshAll = async () => {
    setRefreshing("all");
    await fetchPlatforms();
    setRefreshing(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platforms</h1>
          <p className="text-sm text-muted mt-1">
            {loading ? "Loading..." : `${connectedCount} of ${platforms.length} platforms connected`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleRefreshAll}
            disabled={refreshing === "all"}
          >
            <svg className={`w-4 h-4 ${refreshing === "all" ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            {refreshing === "all" ? "Refreshing..." : "Refresh Status"}
          </button>
          <a href="/connect" className="btn btn-primary btn-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Connect Platform
          </a>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Connected", count: connectedCount, color: "text-emerald", bg: "bg-emerald/10" },
          { label: "Disconnected", count: platforms.filter((p) => !p.connected).length, color: "text-error", bg: "bg-error/10" },
          { label: "Currently Live", count: platforms.filter((p) => p.live).length, color: "text-red-bright", bg: "bg-red/10" },
          { label: "Total", count: platforms.length, color: "text-electric", bg: "bg-electric/10" },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <div className={`text-2xl font-extrabold ${stat.color}`}>{loading ? "--" : stat.count}</div>
            <div className="text-[10px] text-dim mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12 text-sm text-dim">Connecting to PRISMAI...</div>
        ) : (
          platforms.map((platform) => {
            const meta = getMeta(platform.name);
            return (
              <div
                key={platform.name}
                className={`card p-5 cursor-pointer ${!platform.connected ? "opacity-60" : ""}`}
                onClick={() => openDetails(platform)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
                    >
                      {platform.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{platform.name}</div>
                      <div className="text-[10px] text-dim">
                        {platform.live ? "Currently Live" : platform.connected ? "Connected" : "Disconnected"}
                      </div>
                    </div>
                  </div>
                  <div className={`badge text-[9px] ${
                    platform.live ? "badge-live" :
                    platform.connected ? "badge-emerald" : "badge-red"
                  }`}>
                    {platform.live ? (
                      <><span className="live-dot" />Live</>
                    ) : platform.connected ? "Connected" : "Disconnected"}
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-glass">
                  <div className={`w-2 h-2 rounded-full ${
                    platform.live ? "bg-red-bright animate-pulse-live" :
                    platform.connected ? "bg-emerald" : "bg-error"
                  }`} />
                  <span className="text-xs text-muted flex-1">
                    {platform.connected ? "Token Active" : "Needs Re-authorization"}
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5">
                  {meta.features.map((feature) => (
                    <span key={feature} className="text-[10px] px-2 py-0.5 rounded-full bg-glass border border-glass-border text-dim">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Drawer */}
      {showDetails && selectedPlatform && (() => {
        const meta = getMeta(selectedPlatform.name);
        return (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
            <div className="relative w-full max-w-lg bg-base border-l border-glass-border overflow-y-auto animate-reveal">
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                      style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
                    >
                      {selectedPlatform.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">{selectedPlatform.name}</h2>
                      <div className={`badge text-[9px] mt-1 ${selectedPlatform.connected ? "badge-emerald" : "badge-red"}`}>
                        {selectedPlatform.connected ? "Connected" : "Disconnected"}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 text-muted hover:text-foreground transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="divider" />

                {/* Status */}
                <div>
                  <div className="text-label text-dim mb-3">Connection Status</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-glass">
                      <span className="text-xs text-dim">Status</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${selectedPlatform.connected ? "bg-emerald" : "bg-error"}`} />
                        <span className="text-xs font-semibold">{selectedPlatform.connected ? "Connected" : "Disconnected"}</span>
                      </div>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-glass">
                      <span className="text-xs text-dim">Live</span>
                      <span className="text-xs font-semibold">{selectedPlatform.live ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-glass">
                      <span className="text-xs text-dim">Encryption</span>
                      <span className="text-xs font-semibold text-electric">AES-256-GCM</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="text-label text-dim mb-3">Features</div>
                  <div className="flex flex-wrap gap-1.5">
                    {meta.features.map((feature) => (
                      <span key={feature} className="text-[10px] px-2.5 py-1 rounded-full bg-glass border border-glass-border text-muted">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scopes */}
                <div>
                  <div className="text-label text-dim mb-3">OAuth Scopes</div>
                  <div className="flex flex-wrap gap-1.5">
                    {meta.scopes.map((scope) => (
                      <span key={scope} className="text-data text-[10px] px-2 py-1 rounded bg-glass border border-glass-border">
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a href="/connect" className="btn btn-primary btn-sm flex-1">
                    {selectedPlatform.connected ? "Re-Authorize" : "Connect"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
