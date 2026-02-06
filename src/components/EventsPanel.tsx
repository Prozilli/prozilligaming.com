"use client";

import React from "react";

// Platform icons for events
function TwitchIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  );
}

function YouTubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function KickIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.333 0v24H8v-8l2.667 2.667L16 24h6.667L16 17.333 22.667 8H16l-5.333 5.333V0z" />
    </svg>
  );
}

function FacebookIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function TrovoIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 6v12h6v-2H2V8h4V6zm24 0v12h-6v-2h4V8h-4V6zM9 8h6v2h-2v6h-2v-6H9z" />
    </svg>
  );
}

// Event type configurations
const EVENT_TYPES = {
  follow: {
    icon: "❤️",
    label: "New Follower",
    bgColor: "bg-brand-red/20",
    textColor: "text-brand-red",
  },
  subscribe: {
    icon: "⭐",
    label: "Subscription",
    bgColor: "bg-purple-500/20",
    textColor: "text-purple-400",
  },
  gift: {
    icon: "🎁",
    label: "Gift Sub",
    bgColor: "bg-pink-500/20",
    textColor: "text-pink-400",
  },
  donate: {
    icon: "💎",
    label: "Donation",
    bgColor: "bg-brand-gold/20",
    textColor: "text-brand-gold",
  },
  raid: {
    icon: "🚀",
    label: "Raid",
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-400",
  },
  bits: {
    icon: "💜",
    label: "Bits",
    bgColor: "bg-purple-600/20",
    textColor: "text-purple-300",
  },
  superchat: {
    icon: "💬",
    label: "Super Chat",
    bgColor: "bg-yellow-500/20",
    textColor: "text-yellow-400",
  },
  member: {
    icon: "🏆",
    label: "Member",
    bgColor: "bg-green-500/20",
    textColor: "text-green-400",
  },
  like: {
    icon: "👍",
    label: "Likes",
    bgColor: "bg-blue-400/20",
    textColor: "text-blue-300",
  },
};

// Icon component type
type IconComponent = (props: { className?: string; style?: React.CSSProperties }) => React.ReactElement;

// Platform configurations
const PLATFORMS: Record<string, { icon: IconComponent; color: string; name: string }> = {
  twitch: { icon: TwitchIcon, color: "#9146FF", name: "Twitch" },
  youtube: { icon: YouTubeIcon, color: "#FF0000", name: "YouTube" },
  kick: { icon: KickIcon, color: "#53FC18", name: "Kick" },
  trovo: { icon: TrovoIcon, color: "#19D66B", name: "Trovo" },
  facebook: { icon: FacebookIcon, color: "#1877F2", name: "Facebook" },
  tiktok: { icon: TikTokIcon, color: "#ffffff", name: "TikTok" },
};

type PlatformKey = "twitch" | "youtube" | "kick" | "trovo" | "facebook" | "tiktok";
type EventTypeKey = keyof typeof EVENT_TYPES;

// Placeholder events - will be populated by PRISMAI
const PLACEHOLDER_EVENTS: Array<{
  id: string;
  type: EventTypeKey;
  platform: PlatformKey;
  user: string;
  message?: string;
  amount?: string;
  time: string;
}> = [
  {
    id: "1",
    type: "follow",
    platform: "twitch",
    user: "Waiting for events...",
    time: "--:--",
  },
  {
    id: "2",
    type: "subscribe",
    platform: "youtube",
    user: "Waiting for events...",
    time: "--:--",
  },
  {
    id: "3",
    type: "donate",
    platform: "kick",
    user: "Waiting for events...",
    time: "--:--",
  },
  {
    id: "4",
    type: "like",
    platform: "tiktok",
    user: "Waiting for events...",
    time: "--:--",
  },
  {
    id: "5",
    type: "follow",
    platform: "facebook",
    user: "Waiting for events...",
    time: "--:--",
  },
  {
    id: "6",
    type: "subscribe",
    platform: "trovo",
    user: "Waiting for events...",
    time: "--:--",
  },
];

export default function EventsPanel() {
  // In production, events would come from PRISMAI WebSocket
  const events = PLACEHOLDER_EVENTS;

  return (
    <div className="glass-strong glow-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-brand-gold">
            Recent Events
          </h3>
          {/* Platform indicators */}
          <div className="hidden sm:flex items-center gap-1">
            {Object.entries(PLATFORMS).map(([key, platform]) => {
              const Icon = platform.icon;
              return (
                <div
                  key={key}
                  className="w-4 h-4 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${platform.color}20` }}
                  title={platform.name}
                >
                  <Icon className="w-2.5 h-2.5" style={{ color: platform.color }} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-xs text-muted">Live via PRISMAI</span>
        </div>
      </div>

      <div className="space-y-2">
        {events.map((event) => {
          const eventConfig = EVENT_TYPES[event.type];
          const platformConfig = PLATFORMS[event.platform];
          const PlatformIcon = platformConfig.icon;

          return (
            <div
              key={event.id}
              className="flex items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/8"
            >
              {/* Event type icon */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${eventConfig.bgColor} ${eventConfig.textColor}`}
              >
                {eventConfig.icon}
              </div>

              {/* Event details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white truncate">
                    {eventConfig.label}
                  </p>
                  {/* Platform badge */}
                  <div
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium"
                    style={{
                      backgroundColor: `${platformConfig.color}20`,
                      color: platformConfig.color,
                    }}
                  >
                    <PlatformIcon className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">{platformConfig.name}</span>
                  </div>
                </div>
                <p className="text-xs text-muted truncate">
                  {event.user}
                  {event.amount && (
                    <span className="text-brand-gold ml-1">• {event.amount}</span>
                  )}
                </p>
              </div>

              {/* Time */}
              <span className="text-xs text-muted shrink-0">{event.time}</span>
            </div>
          );
        })}
      </div>

      {/* View all link */}
      <div className="mt-3 pt-3 border-t border-white/5 text-center">
        <button className="text-xs text-brand-gold hover:text-white transition-colors">
          View All Events →
        </button>
      </div>
    </div>
  );
}
