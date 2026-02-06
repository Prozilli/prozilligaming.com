"use client";

import React, { useState, useEffect } from "react";

const PRISMAI_API = "/api/prismai";
const TWITCH_API = "https://api.prozilli.com";

// Platform icons
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

function DiscordIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

type IconComponent = (props: { className?: string; style?: React.CSSProperties }) => React.ReactElement;

const PLATFORM_MAP: Record<string, { icon: IconComponent; color: string; name: string }> = {
  twitch: { icon: TwitchIcon, color: "#9146FF", name: "Twitch" },
  youtube: { icon: YouTubeIcon, color: "#FF0000", name: "YouTube" },
  kick: { icon: KickIcon, color: "#53FC18", name: "Kick" },
  discord: { icon: DiscordIcon, color: "#5865F2", name: "Discord" },
};

const EVENT_STYLES: Record<string, { icon: string; label: string; color: string }> = {
  follow: { icon: "❤️", label: "Followed", color: "text-brand-red" },
  subscribe: { icon: "⭐", label: "Subscribed", color: "text-purple-400" },
  gift: { icon: "🎁", label: "Gifted", color: "text-pink-400" },
  donate: { icon: "💎", label: "Donated", color: "text-brand-gold" },
  raid: { icon: "🚀", label: "Raided", color: "text-blue-400" },
  bits: { icon: "💜", label: "Cheered", color: "text-purple-300" },
  tip: { icon: "💰", label: "Tipped", color: "text-brand-gold" },
  chat: { icon: "💬", label: "Chatted", color: "text-white/70" },
  join: { icon: "👋", label: "Joined", color: "text-green-400" },
};

interface Event {
  id: string;
  type: string;
  platform: string;
  user: string;
  message?: string;
  amount?: string;
  time: string;
}

export default function EventsPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch from both PRISMAI (chat events) and Twitch API (followers)
        const [chatRes, liveRes] = await Promise.allSettled([
          fetch(`${PRISMAI_API}/chat`).then((r) => r.json()),
          fetch(`${TWITCH_API}/twitch/live`).then((r) => r.json()),
        ]);

        const newEvents: Event[] = [];

        // Parse PRISMAI chat messages into events
        if (chatRes.status === "fulfilled" && chatRes.value.messages) {
          const msgs = chatRes.value.messages as Array<{
            id?: string;
            platform?: string;
            username?: string;
            message?: string;
            timestamp?: string;
            type?: string;
          }>;
          msgs.slice(0, 10).forEach((msg, i) => {
            newEvents.push({
              id: msg.id || `chat-${i}`,
              type: msg.type || "chat",
              platform: msg.platform || "discord",
              user: msg.username || "Unknown",
              message: msg.message,
              time: msg.timestamp
                ? new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--:--",
            });
          });
        }

        // Add live status as event if live
        if (liveRes.status === "fulfilled" && liveRes.value.isLive) {
          newEvents.unshift({
            id: "live-status",
            type: "follow",
            platform: "twitch",
            user: `${liveRes.value.viewerCount || 0} viewers`,
            message: liveRes.value.title,
            time: "LIVE",
          });
        }

        setEvents(newEvents);
      } catch {
        // Keep whatever events we have
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval);
  }, []);

  const hasEvents = events.length > 0;

  return (
    <div className="glass-strong glow-border rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold">
          Recent Events
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-[10px] text-muted">PRISMAI</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1.5 animate-pulse"
            >
              <div className="w-5 h-5 rounded-full bg-white/10" />
              <div className="h-3 w-24 rounded bg-white/10" />
              <div className="ml-auto h-3 w-12 rounded bg-white/10" />
            </div>
          ))}
        </div>
      ) : !hasEvents ? (
        <div className="rounded-md bg-white/[0.03] px-4 py-6 text-center">
          <p className="text-xs text-muted">
            No recent events. Events will appear here during live streams.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {events.slice(0, 5).map((event) => {
            const style = EVENT_STYLES[event.type] || EVENT_STYLES.chat;
            const platform = PLATFORM_MAP[event.platform];
            const PlatformIcon = platform?.icon;

            return (
              <div
                key={event.id}
                className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1.5 transition-colors hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white shrink-0">
                    {event.user.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-white truncate">
                    {event.user}
                  </span>
                  {PlatformIcon && (
                    <PlatformIcon
                      className="w-3 h-3 shrink-0"
                      style={{ color: platform.color }}
                    />
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs">{style.icon}</span>
                  <span className={`text-[10px] font-medium ${style.color}`}>
                    {style.label}
                  </span>
                  {event.amount && (
                    <span className="text-[10px] font-bold text-brand-gold">
                      {event.amount}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
