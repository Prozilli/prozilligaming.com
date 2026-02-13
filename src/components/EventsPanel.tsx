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

function TrovoIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.559 1.554A.468.468 0 0 1 3.026 1.1h17.948a.468.468 0 0 1 .467.454l-.579 10.264a.468.468 0 0 1-.154.327l-8.395 7.674a.468.468 0 0 1-.626 0L3.292 12.145a.468.468 0 0 1-.154-.327z" />
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

type IconComponent = (props: { className?: string; style?: React.CSSProperties }) => React.ReactElement;

const PLATFORM_MAP: Record<string, { icon: IconComponent; color: string; name: string }> = {
  twitch: { icon: TwitchIcon, color: "#9146FF", name: "Twitch" },
  youtube: { icon: YouTubeIcon, color: "#FF0000", name: "YouTube" },
  kick: { icon: KickIcon, color: "#53FC18", name: "Kick" },
  trovo: { icon: TrovoIcon, color: "#19D65C", name: "Trovo" },
  facebook: { icon: FacebookIcon, color: "#1877F2", name: "Facebook" },
};

const EVENT_STYLES: Record<string, { icon: string; label: string; color: string }> = {
  follow: { icon: "\u2764\uFE0F", label: "Followed", color: "text-red" },
  subscribe: { icon: "\u2B50", label: "Subscribed", color: "text-purple-400" },
  gift: { icon: "\uD83C\uDF81", label: "Gifted", color: "text-pink-400" },
  donate: { icon: "\uD83D\uDC8E", label: "Donated", color: "text-gold" },
  raid: { icon: "\uD83D\uDE80", label: "Raided", color: "text-blue-400" },
  bits: { icon: "\uD83D\uDC9C", label: "Cheered", color: "text-purple-300" },
  tip: { icon: "\uD83D\uDCB0", label: "Tipped", color: "text-gold" },
  join: { icon: "\uD83D\uDC4B", label: "Joined", color: "text-green-400" },
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

        // Parse PRISMAI chat messages into events — exclude plain chat messages
        if (chatRes.status === "fulfilled" && chatRes.value.messages) {
          const msgs = chatRes.value.messages as Array<{
            id?: string;
            platform?: string;
            username?: string;
            message?: string;
            timestamp?: string;
            type?: string;
          }>;
          for (const msg of msgs) {
            const type = msg.type || "chat";
            // Only show real events, not regular chat messages
            if (type === "chat") continue;
            if (!(type in EVENT_STYLES)) continue;
            newEvents.push({
              id: msg.id || `event-${newEvents.length}`,
              type,
              platform: msg.platform || "twitch",
              user: msg.username || "Unknown",
              message: msg.message,
              time: msg.timestamp
                ? new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--:--",
            });
            if (newEvents.length >= 10) break;
          }
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
    <div className="panel p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-gold">
          Recent Events
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[10px] text-muted">PRISMAI</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md bg-surface px-2 py-1.5 animate-pulse"
            >
              <div className="w-5 h-5 rounded-full bg-raised" />
              <div className="h-3 w-24 rounded bg-raised" />
              <div className="ml-auto h-3 w-12 rounded bg-raised" />
            </div>
          ))}
        </div>
      ) : !hasEvents ? (
        <div className="rounded-md bg-surface px-4 py-6 text-center">
          <p className="text-xs text-muted">
            No recent events. Follows, subs, donations, and raids will appear here during live streams.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {events.slice(0, 5).map((event) => {
            const style = EVENT_STYLES[event.type] || EVENT_STYLES.follow;
            const platform = PLATFORM_MAP[event.platform];
            const PlatformIcon = platform?.icon;

            return (
              <div
                key={event.id}
                className="flex items-center gap-2 rounded-md bg-surface px-2 py-1.5 transition-colors hover:bg-raised"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-raised flex items-center justify-center text-[10px] text-white shrink-0">
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
                    <span className="text-[10px] font-bold text-gold">
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
