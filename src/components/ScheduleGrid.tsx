"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Fallback schedule when API data isn't available
const FALLBACK_SCHEDULE = [
  {
    day: "Monday",
    dayShort: "MON",
    dayIndex: 1,
    time: "7:00 PM",
    category: "Gaming",
    description: "Competitive and story-driven gameplay",
    active: true,
  },
  {
    day: "Tuesday",
    dayShort: "TUE",
    dayIndex: 2,
    time: "8:00 PM",
    category: "Creative / Just Chatting",
    description: "Behind the scenes, production talk, community vibes",
    active: true,
  },
  {
    day: "Wednesday",
    dayShort: "WED",
    dayIndex: 3,
    time: "7:00 PM",
    category: "Gaming",
    description: "Competitive and story-driven gameplay",
    active: true,
  },
  {
    day: "Thursday",
    dayShort: "THU",
    dayIndex: 4,
    time: "8:00 PM",
    category: "Creative / Just Chatting",
    description: "Behind the scenes, production talk, community vibes",
    active: true,
  },
  {
    day: "Friday",
    dayShort: "FRI",
    dayIndex: 5,
    time: "7:00 PM",
    category: "Gaming",
    description: "Competitive and story-driven gameplay",
    active: true,
  },
  {
    day: "Saturday",
    dayShort: "SAT",
    dayIndex: 6,
    time: "3:00 PM",
    category: "Special Events",
    description: "Collabs, tournaments, community events, and premieres",
    active: true,
  },
  {
    day: "Sunday",
    dayShort: "SUN",
    dayIndex: 0,
    time: "Off",
    category: "Rest Day",
    description: "Recharge and plan the next move",
    active: false,
  },
];

interface TwitchSchedule {
  isLive: boolean;
  liveData: {
    title: string;
    gameName: string;
    viewerCount: number;
  } | null;
  nextStream: {
    title: string;
    category: string | null;
    startTime: string;
  } | null;
}

function getCategoryIcon(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes("gaming") || lower.includes("game")) return "\uD83C\uDFAE";
  if (lower.includes("creative") || lower.includes("chat")) return "\uD83D\uDCAC";
  if (lower.includes("special") || lower.includes("event")) return "\uD83C\uDF89";
  if (lower.includes("rest") || lower.includes("off")) return "\uD83D\uDE34";
  return "\uD83D\uDCFA";
}

function getCategoryColors(category: string): { accent: string; bg: string; border: string } {
  const lower = category.toLowerCase();
  if (lower.includes("gaming") || lower.includes("game")) {
    return { accent: "text-red", bg: "bg-brand-red/10", border: "border-red/20" };
  }
  if (lower.includes("creative") || lower.includes("chat")) {
    return { accent: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" };
  }
  if (lower.includes("special") || lower.includes("event")) {
    return { accent: "text-gold", bg: "bg-brand-gold/10", border: "border-brand-gold/20" };
  }
  return { accent: "text-muted", bg: "bg-surface", border: "border-[var(--color-border)]" };
}

export default function ScheduleGrid() {
  const [twitchData, setTwitchData] = useState<TwitchSchedule | null>(null);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentDay(new Date().getDay());

    async function fetchTwitchSchedule() {
      try {
        const response = await fetch("https://api.prozilli.com/twitch/schedule");
        if (response.ok) {
          const data = await response.json();
          setTwitchData(data);
        }
      } catch (error) {
        console.error("Failed to fetch Twitch schedule:", error);
      }
    }

    fetchTwitchSchedule();
    const interval = setInterval(fetchTwitchSchedule, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="glass rounded-xl p-5 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-white/10" />
                <div className="flex-1">
                  <div className="h-4 w-24 rounded bg-white/10 mb-2" />
                  <div className="h-3 w-48 rounded bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Sort schedule starting from today
  const sortedSchedule = [...FALLBACK_SCHEDULE].sort((a, b) => {
    const aDistance = (a.dayIndex - currentDay + 7) % 7;
    const bDistance = (b.dayIndex - currentDay + 7) % 7;
    return aDistance - bDistance;
  });

  const isToday = (dayIndex: number) => dayIndex === currentDay;
  const isTomorrow = (dayIndex: number) => dayIndex === (currentDay + 1) % 7;

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Live Now Banner */}
      {twitchData?.isLive && twitchData.liveData && (
        <div className="mb-8 rounded-xl border border-red/30 bg-gradient-to-r from-brand-red/15 to-brand-red/5 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/20">
                  <span className="h-3 w-3 rounded-full bg-red animate-live-pulse" />
                </span>
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red animate-ping" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-red">
                    Live Now
                  </span>
                  <span className="text-xs text-muted">
                    {twitchData.liveData.viewerCount.toLocaleString()} viewers
                  </span>
                </div>
                <p className="text-base font-medium text-white mt-1 line-clamp-1">
                  {twitchData.liveData.title}
                </p>
                {twitchData.liveData.gameName && (
                  <p className="text-xs text-gold mt-0.5">
                    Playing: {twitchData.liveData.gameName}
                  </p>
                )}
              </div>
            </div>
            <Link
              href="/watch"
              className="rounded-lg bg-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red/80 whitespace-nowrap"
            >
              Watch Now
            </Link>
          </div>
        </div>
      )}

      {/* Next Stream Banner (when not live) */}
      {!twitchData?.isLive && twitchData?.nextStream && (
        <div className="mb-8 rounded-xl border border-brand-gold/30 bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/20 text-xl">
                \u23F0
              </span>
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-gold">
                  Next Stream
                </span>
                <p className="text-base font-medium text-white mt-1 line-clamp-1">
                  {twitchData.nextStream.title}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {new Date(twitchData.nextStream.startTime).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(twitchData.nextStream.startTime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    timeZoneName: "short",
                  })}
                </p>
              </div>
            </div>
            <a
              href="https://twitch.tv/ProzilliGaming"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#9146FF] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            >
              Set Reminder
            </a>
          </div>
        </div>
      )}

      {/* Where to Watch */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { name: "Twitch", color: "#9146FF", href: "https://twitch.tv/ProzilliGaming" },
          { name: "YouTube", color: "#FF0000", href: "https://youtube.com/@prozilligaming" },
          { name: "Kick", color: "#53FC18", href: "https://kick.com/ProzilliGaming" },
          { name: "Trovo", color: "#19D65C", href: "https://trovo.live/ProzilliGaming" },
          { name: "Facebook", color: "#1877F2", href: "https://facebook.com/ProzilliGaming" },
        ].map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-white/[0.02] px-3 py-2.5 transition-all hover:bg-white/[0.06] hover:border-white/10"
          >
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-xs font-medium text-muted group-hover:text-white transition-colors">
              {p.name}
            </span>
          </a>
        ))}
      </div>

      {/* Schedule Grid — Card Layout */}
      <div className="grid gap-3">
        {sortedSchedule.map((slot) => {
          const today = isToday(slot.dayIndex);
          const tomorrow = isTomorrow(slot.dayIndex);
          const colors = getCategoryColors(slot.category);
          const icon = getCategoryIcon(slot.category);

          return (
            <div
              key={slot.day}
              className={`group relative rounded-xl border transition-all overflow-hidden ${
                today
                  ? `${colors.border} ${colors.bg} ring-1 ring-red/40`
                  : slot.active
                  ? "border-[var(--color-border)] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                  : "border-white/[0.02] bg-white/[0.01] opacity-40"
              }`}
            >
              <div className="flex items-stretch">
                {/* Left accent bar */}
                <div
                  className="w-1 shrink-0"
                  style={{
                    backgroundColor: today
                      ? "#910000"
                      : slot.category.toLowerCase().includes("gaming") || slot.category.toLowerCase().includes("game")
                      ? "rgba(145, 0, 0, 0.5)"
                      : slot.category.toLowerCase().includes("creative") || slot.category.toLowerCase().includes("chat")
                      ? "rgba(168, 85, 247, 0.5)"
                      : slot.category.toLowerCase().includes("special") || slot.category.toLowerCase().includes("event")
                      ? "rgba(196, 162, 101, 0.5)"
                      : "rgba(255, 255, 255, 0.05)",
                  }}
                />

                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    {/* Day + Time Column */}
                    <div className="flex items-center gap-3 sm:w-52 shrink-0">
                      {/* Icon */}
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg ${colors.bg}`}>
                        {icon}
                      </span>

                      {/* Day info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold tracking-wide text-white">
                            {slot.day}
                          </h3>
                          {today && (
                            <span className="rounded bg-red px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white leading-none">
                              Today
                            </span>
                          )}
                          {tomorrow && !today && (
                            <span className="rounded bg-raised px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted leading-none">
                              Tomorrow
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-semibold mt-0.5 ${colors.accent}`}>
                          {slot.time}{slot.active ? " ET" : ""}
                        </p>
                      </div>
                    </div>

                    {/* Separator (desktop only) */}
                    <div className="hidden sm:block w-px h-8 bg-raised shrink-0" />

                    {/* Category + Description */}
                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${colors.bg} ${colors.accent}`}
                      >
                        {slot.category}
                      </span>
                      <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-1">
                        {slot.description}
                      </p>
                    </div>

                    {/* Action */}
                    {today && slot.active && !twitchData?.isLive && (
                      <div className="shrink-0">
                        <Link
                          href="/watch"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red/20 px-3 py-2 text-xs font-medium text-red transition-colors hover:bg-brand-red/30"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />
                          Watch
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red" />
          <span>Gaming</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          <span>Creative</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span>Special Events</span>
        </div>
      </div>
    </section>
  );
}
