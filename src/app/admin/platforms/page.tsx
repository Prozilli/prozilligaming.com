"use client";

import { useState } from "react";

/* ============================================================
   Platform Data
   ============================================================ */

interface Platform {
  id: string;
  name: string;
  color: string;
  connected: boolean;
  tokenHealth: "healthy" | "expiring" | "expired" | "none";
  tokenExpiry: string;
  lastRefresh: string;
  scopes: string[];
  botAccount: string;
  broadcasterAccount: string;
  features: string[];
  notes: string;
}

const PLATFORMS: Platform[] = [
  {
    id: "twitch",
    name: "Twitch",
    color: "#9146ff",
    connected: true,
    tokenHealth: "healthy",
    tokenExpiry: "Auto-refresh (2h buffer)",
    lastRefresh: "12 min ago",
    scopes: ["chat:read", "chat:edit", "channel:read:subscriptions", "bits:read", "moderator:manage:chat_messages"],
    botAccount: "LisaVision",
    broadcasterAccount: "ProzilliGaming",
    features: ["Chat", "Alerts", "Moderation", "Clips", "EventSub"],
    notes: "Both bot + broadcaster tokens active. Auto-refresh working.",
  },
  {
    id: "kick",
    name: "Kick",
    color: "#53fc18",
    connected: true,
    tokenHealth: "healthy",
    tokenExpiry: "Auto-refresh (2h buffer)",
    lastRefresh: "8 min ago",
    scopes: ["chat:write", "channel:read", "events:subscribe"],
    botAccount: "LisaVision",
    broadcasterAccount: "ProzilliGaming",
    features: ["Chat", "Alerts", "PKCE S256"],
    notes: "Chatroom 1437823, User 1490707. Must use broadcaster token for say().",
  },
  {
    id: "youtube",
    name: "YouTube",
    color: "#ff0000",
    connected: true,
    tokenHealth: "healthy",
    tokenExpiry: "Auto-refresh (2h buffer)",
    lastRefresh: "22 min ago",
    scopes: ["youtube.readonly", "youtube.upload", "youtube.force-ssl"],
    botAccount: "--",
    broadcasterAccount: "ProzilliGaming",
    features: ["Chat Polling", "Uploads", "Shorts", "Livestream"],
    notes: "Google app in testing mode. Resumable uploads for Shorts.",
  },
  {
    id: "discord",
    name: "Discord",
    color: "#5865f2",
    connected: true,
    tokenHealth: "healthy",
    tokenExpiry: "Bot token (no expiry)",
    lastRefresh: "N/A",
    scopes: ["bot", "applications.commands", "guilds", "messages.read"],
    botAccount: "LISA (Admin)",
    broadcasterAccount: "Prozilli",
    features: ["Chat", "Embeds", "Roles", "Moderation", "NPC Bots"],
    notes: "Server redesigned (42ch/12cat). Reaction roles active. 5 NPC bots online.",
  },
  {
    id: "x",
    name: "X / Twitter",
    color: "#ffffff",
    connected: true,
    tokenHealth: "healthy",
    tokenExpiry: "Auto-refresh (2h buffer)",
    lastRefresh: "45 min ago",
    scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
    botAccount: "--",
    broadcasterAccount: "LISAVISION",
    features: ["Post", "Auto-Post", "PKCE S256"],
    notes: "LISAVISION app. Auto-posting text content works.",
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877f2",
    connected: true,
    tokenHealth: "healthy",
    tokenExpiry: "60-day page token",
    lastRefresh: "1 day ago",
    scopes: ["pages_manage_posts", "pages_read_engagement", "pages_manage_metadata"],
    botAccount: "--",
    broadcasterAccount: "Prozilli Gaming (Page)",
    features: ["Post", "Reels", "Stories", "Auto-Post", "Webhooks"],
    notes: "Page ID 102697375778215. 3-phase reel upload working.",
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "#e4405f",
    connected: true,
    tokenHealth: "healthy",
    tokenExpiry: "60-day token",
    lastRefresh: "1 day ago",
    scopes: ["instagram_basic", "instagram_content_publish", "instagram_manage_comments"],
    botAccount: "--",
    broadcasterAccount: "ProzilliGaming (IG Business)",
    features: ["Post", "Reels", "Stories", "Auto-Post", "PKCE S256"],
    notes: "IG Business Account via FB Page. Container-based publish.",
  },
  {
    id: "trovo",
    name: "Trovo",
    color: "#19d65c",
    connected: true,
    tokenHealth: "expiring",
    tokenExpiry: "3h 12m remaining",
    lastRefresh: "52 min ago",
    scopes: ["channel_details_self", "chat_send_self", "send_to_my_channel"],
    botAccount: "LisaVision",
    broadcasterAccount: "ProzilliGaming",
    features: ["Chat", "Alerts"],
    notes: "Tokens expire in 4h. Re-authorized Feb 9. response_type=code.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#ff0050",
    connected: false,
    tokenHealth: "expired",
    tokenExpiry: "Expired",
    lastRefresh: "Never",
    scopes: ["video.publish", "user.info.basic"],
    botAccount: "--",
    broadcasterAccount: "ProzilliGaming",
    features: ["Video Upload", "Auto-Post (Sandbox)"],
    notes: "Needs re-auth. Sandbox has video.publish. Posts directly to profile.",
  },
];

/* ============================================================
   Platforms Page
   ============================================================ */

export default function PlatformsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const connectedCount = PLATFORMS.filter((p) => p.connected).length;

  const openDetails = (platform: Platform) => {
    setSelectedPlatform(platform);
    setShowDetails(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platforms</h1>
          <p className="text-sm text-muted mt-1">
            {connectedCount} of {PLATFORMS.length} platforms connected
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary btn-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Refresh All Tokens
          </button>
          <button className="btn btn-primary btn-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Connect Platform
          </button>
        </div>
      </div>

      {/* Token Health Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Healthy", count: PLATFORMS.filter((p) => p.tokenHealth === "healthy").length, color: "text-emerald", bg: "bg-emerald/10" },
          { label: "Expiring Soon", count: PLATFORMS.filter((p) => p.tokenHealth === "expiring").length, color: "text-warning", bg: "bg-warning/10" },
          { label: "Expired", count: PLATFORMS.filter((p) => p.tokenHealth === "expired").length, color: "text-error", bg: "bg-error/10" },
          { label: "Encrypted", count: PLATFORMS.length, color: "text-electric", bg: "bg-electric/10" },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <div className={`text-2xl font-extrabold ${stat.color}`}>{stat.count}</div>
            <div className="text-[10px] text-dim mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {PLATFORMS.map((platform) => (
          <div
            key={platform.id}
            className={`card p-5 cursor-pointer ${
              !platform.connected ? "opacity-60" : ""
            }`}
            onClick={() => openDetails(platform)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                >
                  {platform.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold">{platform.name}</div>
                  <div className="text-[10px] text-dim">{platform.broadcasterAccount}</div>
                </div>
              </div>
              <div className={`badge text-[9px] ${
                platform.connected ? "badge-emerald" : "badge-red"
              }`}>
                {platform.connected ? "Connected" : "Disconnected"}
              </div>
            </div>

            {/* Token Health */}
            <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-glass">
              <div className={`w-2 h-2 rounded-full ${
                platform.tokenHealth === "healthy" ? "bg-emerald" :
                platform.tokenHealth === "expiring" ? "bg-warning animate-pulse-live" :
                "bg-error"
              }`} />
              <span className="text-xs text-muted flex-1">{platform.tokenExpiry}</span>
              <span className="text-data text-[10px] text-dim">{platform.lastRefresh}</span>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5">
              {platform.features.map((feature) => (
                <span key={feature} className="text-[10px] px-2 py-0.5 rounded-full bg-glass border border-glass-border text-dim">
                  {feature}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              {platform.connected ? (
                <>
                  <button className="btn btn-ghost btn-sm flex-1 text-xs" onClick={(e) => { e.stopPropagation(); }}>
                    Refresh Token
                  </button>
                  <button className="btn btn-ghost btn-sm text-xs text-error/70 hover:text-error" onClick={(e) => { e.stopPropagation(); }}>
                    Disconnect
                  </button>
                </>
              ) : (
                <button className="btn btn-primary btn-sm flex-1 text-xs" onClick={(e) => { e.stopPropagation(); }}>
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Drawer */}
      {showDetails && selectedPlatform && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
          <div className="relative w-full max-w-lg bg-base border-l border-glass-border overflow-y-auto animate-reveal">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{ backgroundColor: `${selectedPlatform.color}20`, color: selectedPlatform.color }}
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

              {/* Accounts */}
              <div>
                <div className="text-label text-dim mb-3">Accounts</div>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 rounded-lg bg-glass">
                    <span className="text-xs text-dim">Bot Account</span>
                    <span className="text-xs font-semibold">{selectedPlatform.botAccount}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-glass">
                    <span className="text-xs text-dim">Broadcaster</span>
                    <span className="text-xs font-semibold">{selectedPlatform.broadcasterAccount}</span>
                  </div>
                </div>
              </div>

              {/* Token Info */}
              <div>
                <div className="text-label text-dim mb-3">Token Details</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-glass">
                    <span className="text-xs text-dim">Health</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedPlatform.tokenHealth === "healthy" ? "bg-emerald" :
                        selectedPlatform.tokenHealth === "expiring" ? "bg-warning" : "bg-error"
                      }`} />
                      <span className="text-xs font-semibold capitalize">{selectedPlatform.tokenHealth}</span>
                    </div>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-glass">
                    <span className="text-xs text-dim">Expiry</span>
                    <span className="text-xs font-semibold">{selectedPlatform.tokenExpiry}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-glass">
                    <span className="text-xs text-dim">Last Refresh</span>
                    <span className="text-xs font-semibold">{selectedPlatform.lastRefresh}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-glass">
                    <span className="text-xs text-dim">Encryption</span>
                    <span className="text-xs font-semibold text-electric">AES-256-GCM</span>
                  </div>
                </div>
              </div>

              {/* Scopes */}
              <div>
                <div className="text-label text-dim mb-3">OAuth Scopes</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPlatform.scopes.map((scope) => (
                    <span key={scope} className="text-data text-[10px] px-2 py-1 rounded bg-glass border border-glass-border">
                      {scope}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="text-label text-dim mb-3">Notes</div>
                <p className="text-xs text-muted leading-relaxed">{selectedPlatform.notes}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="btn btn-secondary btn-sm flex-1">Refresh Token</button>
                <button className="btn btn-primary btn-sm flex-1">Re-Authorize</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
