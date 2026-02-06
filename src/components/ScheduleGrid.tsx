"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Fallback schedule when Twitch data isn't available
const FALLBACK_SCHEDULE = [
  {
    day: "Monday",
    dayIndex: 1,
    time: "7:00 PM",
    category: "Gaming",
    description: "Competitive and story-driven gameplay",
    active: true,
  },
  {
    day: "Tuesday",
    dayIndex: 2,
    time: "8:00 PM",
    category: "Creative / Just Chatting",
    description: "Behind the scenes, production talk, community vibes",
    active: true,
  },
  {
    day: "Wednesday",
    dayIndex: 3,
    time: "7:00 PM",
    category: "Gaming",
    description: "Competitive and story-driven gameplay",
    active: true,
  },
  {
    day: "Thursday",
    dayIndex: 4,
    time: "8:00 PM",
    category: "Creative / Just Chatting",
    description: "Behind the scenes, production talk, community vibes",
    active: true,
  },
  {
    day: "Friday",
    dayIndex: 5,
    time: "7:00 PM",
    category: "Gaming",
    description: "Competitive and story-driven gameplay",
    active: true,
  },
  {
    day: "Saturday",
    dayIndex: 6,
    time: "3:00 PM",
    category: "Special Events",
    description: "Collabs, tournaments, community events, and premieres",
    active: true,
  },
  {
    day: "Sunday",
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
  if (category.toLowerCase().includes("gaming") || category.toLowerCase().includes("game")) {
    return "🎮";
  }
  if (category.toLowerCase().includes("creative") || category.toLowerCase().includes("chat")) {
    return "💬";
  }
  if (category.toLowerCase().includes("special") || category.toLowerCase().includes("event")) {
    return "🎉";
  }
  if (category.toLowerCase().includes("rest") || category.toLowerCase().includes("off")) {
    return "😴";
  }
  return "📺";
}

function getCategoryColor(category: string): { bg: string; text: string } {
  if (category.toLowerCase().includes("gaming") || category.toLowerCase().includes("game")) {
    return { bg: "bg-brand-red/20", text: "text-brand-red" };
  }
  if (category.toLowerCase().includes("creative") || category.toLowerCase().includes("chat")) {
    return { bg: "bg-purple-500/20", text: "text-purple-400" };
  }
  if (category.toLowerCase().includes("special") || category.toLowerCase().includes("event")) {
    return { bg: "bg-brand-gold/20", text: "text-brand-gold" };
  }
  return { bg: "bg-white/10", text: "text-muted" };
}

export default function ScheduleGrid() {
  const [twitchData, setTwitchData] = useState<TwitchSchedule | null>(null);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentDay(new Date().getDay());

    // Fetch Twitch data
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
    const interval = setInterval(fetchTwitchSchedule, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="glass rounded-lg p-4 sm:p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white/10" />
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

  // Sort schedule to start from today
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
        <div className="mb-6 rounded-xl border border-brand-red/30 bg-brand-red/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-brand-red/20">
                <span className="h-3 w-3 rounded-full bg-brand-red animate-live-pulse" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-red">
                    Live Now
                  </span>
                  <span className="text-xs text-muted">
                    • {twitchData.liveData.viewerCount.toLocaleString()} viewers
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium text-white mt-1 line-clamp-1">
                  {twitchData.liveData.title}
                </p>
                {twitchData.liveData.gameName && (
                  <p className="text-xs text-brand-gold mt-0.5">
                    Playing: {twitchData.liveData.gameName}
                  </p>
                )}
              </div>
            </div>
            <Link
              href="/watch"
              className="rounded-lg bg-brand-red px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-brand-red-glow whitespace-nowrap"
            >
              Watch Now →
            </Link>
          </div>
        </div>
      )}

      {/* Next Stream Banner (when not live) */}
      {!twitchData?.isLive && twitchData?.nextStream && (
        <div className="mb-6 rounded-xl border border-brand-gold/30 bg-brand-gold/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-brand-gold/20 text-xl">
                ⏰
              </span>
              <div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-gold">
                  Next Stream
                </span>
                <p className="text-sm sm:text-base font-medium text-white mt-1 line-clamp-1">
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
              className="rounded-lg bg-[#9146FF] px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            >
              Set Reminder
            </a>
          </div>
        </div>
      )}

      {/* Schedule Grid */}
      <div className="grid gap-3">
        {sortedSchedule.map((slot) => {
          const today = isToday(slot.dayIndex);
          const tomorrow = isTomorrow(slot.dayIndex);
          const colors = getCategoryColor(slot.category);
          const icon = getCategoryIcon(slot.category);

          return (
            <div
              key={slot.day}
              className={`group rounded-xl p-4 sm:p-5 transition-all ${
                today
                  ? "glass-strong glow-border ring-2 ring-brand-red/50"
                  : slot.active
                  ? "glass hover:bg-white/8"
                  : "bg-white/[0.02] opacity-50"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {/* Day indicator */}
                <div className="flex items-center gap-3 sm:w-40">
                  <span
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full text-lg sm:text-xl ${colors.bg}`}
                  >
                    {icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold tracking-wide text-white">
                        {slot.day}
                      </h3>
                      {today && (
                        <span className="rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          Today
                        </span>
                      )}
                      {tomorrow && !today && (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">
                          Tomorrow
                        </span>
                      )}
                    </div>
                    <p className={`text-xs sm:text-sm font-semibold ${colors.text}`}>
                      {slot.time} {slot.active && "ET"}
                    </p>
                  </div>
                </div>

                {/* Category & Description */}
                <div className="flex-1 pl-13 sm:pl-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider ${colors.bg} ${colors.text}`}
                    >
                      {slot.category}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
                    {slot.description}
                  </p>
                </div>

                {/* Action */}
                {today && slot.active && !twitchData?.isLive && (
                  <div className="pl-13 sm:pl-0 sm:shrink-0">
                    <Link
                      href="/watch"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red/20 px-3 py-2 text-xs font-medium text-brand-red transition-colors hover:bg-brand-red/30"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
                      Watch Page
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-red" />
          <span>Gaming</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          <span>Creative</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-gold" />
          <span>Special Events</span>
        </div>
      </div>
    </section>
  );
}
