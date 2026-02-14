"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";

/* ============================================================
   Types
   ============================================================ */

interface StreamEntry {
  time: string | null;
  duration: string | null;
  title: string;
  game: string;
  platforms: string[];
  desc: string;
  featured: boolean;
}

interface DaySchedule {
  day: string;
  short: string;
  streams: StreamEntry[];
}

/* ============================================================
   Hardcoded Fallback Schedule (EST times)
   ============================================================ */

const FALLBACK_SCHEDULE: DaySchedule[] = [
  {
    day: "Monday",
    short: "MON",
    streams: [
      {
        time: "7:00 PM",
        duration: "3-4 hrs",
        title: "ZO Syndicate RP Night",
        game: "GTA V (FiveM)",
        platforms: ["Twitch", "Kick"],
        desc: "Roleplay on the ZO Syndicate FiveM server. Gang wars, police chases, business deals, and AI NPC encounters.",
        featured: false,
      },
    ],
  },
  {
    day: "Tuesday",
    short: "TUE",
    streams: [
      {
        time: "7:00 PM",
        duration: "3-4 hrs",
        title: "Variety Night",
        game: "Rotating Titles",
        platforms: ["YouTube", "Twitch"],
        desc: "New releases, community requests, or whatever looks interesting. The game changes every week based on chat votes.",
        featured: false,
      },
    ],
  },
  {
    day: "Wednesday",
    short: "WED",
    streams: [
      {
        time: "7:00 PM",
        duration: "3-4 hrs",
        title: "ZO Syndicate RP Night",
        game: "GTA V (FiveM)",
        platforms: ["Twitch", "Kick"],
        desc: "Continuation of Monday's RP storylines. Major events, territory battles, and server-wide scenarios happen mid-week.",
        featured: false,
      },
    ],
  },
  {
    day: "Thursday",
    short: "THU",
    streams: [
      {
        time: "7:00 PM",
        duration: "4-5 hrs",
        title: "Community Night",
        game: "Community Choice",
        platforms: ["All Platforms"],
        desc: "Full multi-platform broadcast. Play with viewers, community tournaments, giveaways, and LISA-hosted events. The big night.",
        featured: true,
      },
    ],
  },
  {
    day: "Friday",
    short: "FRI",
    streams: [
      {
        time: "8:00 PM",
        duration: "4-6 hrs",
        title: "Late Night Gaming",
        game: "Competitive / Horror / Co-op",
        platforms: ["Twitch", "Kick"],
        desc: "Late start, long run. Competitive ranked matches, horror games, or co-op with friends. The vibe shifts after dark.",
        featured: false,
      },
    ],
  },
  {
    day: "Saturday",
    short: "SAT",
    streams: [
      {
        time: "3:00 PM",
        duration: "5-7 hrs",
        title: "Weekend Marathon",
        game: "Main Event",
        platforms: ["All Platforms"],
        desc: "The flagship stream of the week. Full production, multi-platform, extended hours. Major storylines, special guests, and server events.",
        featured: true,
      },
    ],
  },
  {
    day: "Sunday",
    short: "SUN",
    streams: [
      {
        time: null,
        duration: null,
        title: "Rest Day / Bonus Stream",
        game: "TBD",
        platforms: [],
        desc: "Usually a rest day. Occasionally a surprise bonus stream gets announced on Discord. Follow notifications to catch it.",
        featured: false,
      },
    ],
  },
];

const PLATFORM_ROTATION = [
  { platform: "Twitch", frequency: "5-6 days/week", note: "Primary platform. Always live when streaming.", color: "#9146ff" },
  { platform: "Kick", frequency: "4-5 days/week", note: "Co-primary. Simulcast with Twitch for most streams.", color: "#53fc18" },
  { platform: "YouTube", frequency: "2-3 days/week", note: "Variety nights and weekend marathons. VODs uploaded after.", color: "#ff0000" },
  { platform: "TikTok", frequency: "2-3 days/week", note: "Clips and short-form highlights posted automatically via PRISMAI.", color: "#ff0050" },
  { platform: "Discord", frequency: "Always", note: "Go-live notifications, voice chat during streams, LISA interaction.", color: "#5865f2" },
  { platform: "X", frequency: "Daily", note: "Stream announcements, clips, and community engagement.", color: "#ffffff" },
  { platform: "Instagram", frequency: "3-4 days/week", note: "Stories during streams, Reels from highlights.", color: "#e4405f" },
  { platform: "Facebook", frequency: "2-3 days/week", note: "Prozilli Gaming page. Stream alerts and Reel content.", color: "#1877f2" },
  { platform: "Trovo", frequency: "2-3 days/week", note: "Alternative platform with LISA chat integration.", color: "#19d65c" },
];

/* ============================================================
   Timezone Configuration
   All schedule times are stored in EST (UTC-5).
   Offsets are relative to UTC in hours.
   ============================================================ */

interface TimezoneInfo {
  zone: string;
  offset: number; // UTC offset in hours
  label: string;
}

const TIMEZONES: TimezoneInfo[] = [
  { zone: "EST", offset: -5, label: "Eastern (US)" },
  { zone: "CST", offset: -6, label: "Central (US)" },
  { zone: "MST", offset: -7, label: "Mountain (US)" },
  { zone: "PST", offset: -8, label: "Pacific (US)" },
  { zone: "GMT", offset: 0, label: "London" },
  { zone: "CET", offset: 1, label: "Central Europe" },
];

const EST_OFFSET = -5; // Source timezone is EST (UTC-5)

/**
 * Detect the user's timezone and return the matching TIMEZONES entry,
 * or default to EST if no match found.
 */
function detectUserTimezone(): TimezoneInfo {
  try {
    const now = new Date();
    // getTimezoneOffset returns minutes west of UTC, so negate and convert to hours
    const userOffsetHours = -(now.getTimezoneOffset() / 60);
    // Find the closest matching timezone
    const match = TIMEZONES.find((tz) => tz.offset === userOffsetHours);
    if (match) return match;
  } catch {
    // Fall through to default
  }
  return TIMEZONES[0]; // Default to EST
}

/**
 * Convert a time string like "7:00 PM" from EST to target timezone.
 * Returns the converted time string in the same format.
 */
function convertTime(timeStr: string, targetTz: TimezoneInfo): string {
  // Parse the time string (e.g., "7:00 PM", "3:00 PM", "8:00 PM")
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return timeStr;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  // Convert to 24-hour format
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  // Calculate the offset difference: target - source
  const diffHours = targetTz.offset - EST_OFFSET;

  // Apply the offset
  let newHours = hours + diffHours;

  // Handle day wrapping
  if (newHours < 0) newHours += 24;
  if (newHours >= 24) newHours -= 24;

  // Convert back to 12-hour format
  const newPeriod = newHours >= 12 ? "PM" : "AM";
  let displayHours = newHours % 12;
  if (displayHours === 0) displayHours = 12;

  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${newPeriod}`;
}

/* ============================================================
   Schedule Page Component
   ============================================================ */

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(FALLBACK_SCHEDULE);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"api" | "fallback">("fallback");
  const [activeTz, setActiveTz] = useState<TimezoneInfo>(TIMEZONES[0]);

  // Detect user's timezone on mount
  useEffect(() => {
    setActiveTz(detectUserTimezone());
  }, []);

  /**
   * Transform API platform_schedules segments into DaySchedule format.
   * Each segment has: title, category, start_time, end_time, platform, data
   */
  const transformApiSegments = useCallback((segments: Array<Record<string, unknown>>): DaySchedule[] => {
    const dayMap: Record<string, DaySchedule> = {};
    const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayShorts: Record<string, string> = {
      Sunday: "SUN", Monday: "MON", Tuesday: "TUE", Wednesday: "WED",
      Thursday: "THU", Friday: "FRI", Saturday: "SAT",
    };

    for (const seg of segments) {
      const startTime = new Date(seg.start_time as string);
      const dayName = dayOrder[startTime.getDay()];

      if (!dayMap[dayName]) {
        dayMap[dayName] = { day: dayName, short: dayShorts[dayName], streams: [] };
      }

      // Format time as "7:00 PM"
      let hours = startTime.getHours();
      const minutes = startTime.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      const timeStr = `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;

      // Calculate duration if end_time exists
      let durationStr: string | null = null;
      if (seg.end_time) {
        const endTime = new Date(seg.end_time as string);
        const diffMs = endTime.getTime() - startTime.getTime();
        const diffHours = Math.round(diffMs / (1000 * 60 * 60));
        durationStr = `${diffHours} hrs`;
      }

      // Try to parse extra data from the JSON data column
      let extraData: Record<string, unknown> = {};
      if (seg.data) {
        try {
          extraData = typeof seg.data === "string" ? JSON.parse(seg.data) : (seg.data as Record<string, unknown>);
        } catch {
          // ignore parse errors
        }
      }

      dayMap[dayName].streams.push({
        time: timeStr,
        duration: durationStr,
        title: (seg.title as string) || "Stream",
        game: (seg.category as string) || (extraData.game as string) || "TBD",
        platforms: extraData.platforms
          ? (extraData.platforms as string[])
          : [seg.platform as string].filter(Boolean),
        desc: (extraData.desc as string) || (extraData.description as string) || "",
        featured: (extraData.featured as boolean) || false,
      });
    }

    // Sort by day order
    return dayOrder
      .filter((d) => dayMap[d])
      .map((d) => dayMap[d]);
  }, []);

  // Fetch schedule from PRISMAI API
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch("/api/prismai/schedules");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();

        // The API returns { segments: [...] } from the platform_schedules table.
        // If segments exist and have data, we can attempt to transform them.
        // However, the primary schedule data may be stored as settings or
        // as custom JSON. We check both the segments format and a potential
        // stream-schedule settings key.
        if (data.segments && data.segments.length > 0) {
          // Try to parse segments into our DaySchedule format
          const transformed = transformApiSegments(data.segments);
          if (transformed.length > 0) {
            setSchedule(transformed);
            setDataSource("api");
          }
        }
      } catch {
        // API failed or returned empty — keep fallback
      }

      // Also try loading from PRISMAI settings (stream-schedule key)
      try {
        const res = await fetch("/api/prismai/settings/stream-schedule");
        if (res.ok) {
          const data = await res.json();
          if (data.value && Array.isArray(data.value) && data.value.length > 0) {
            setSchedule(data.value as DaySchedule[]);
            setDataSource("api");
          }
        }
      } catch {
        // Settings API failed — keep whatever we have
      }

      setLoading(false);
    };

    fetchSchedule();
  }, [transformApiSegments]);

  // Memoize converted schedule
  const displaySchedule = useMemo(() => {
    return schedule.map((day) => ({
      ...day,
      streams: day.streams.map((stream) => ({
        ...stream,
        displayTime: stream.time ? convertTime(stream.time, activeTz) : null,
      })),
    }));
  }, [schedule, activeTz]);

  // Get today's day name
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[60vh] bg-grid">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="badge badge-gold mb-6 animate-reveal">Schedule</div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              Stream{" "}
              <span className="text-shimmer">Schedule</span>
            </h1>
            <p
              className="text-body-lg max-w-xl mb-10 animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Know exactly when ProzilliGaming goes live across 9 platforms. Weekly schedule,
              platform rotation, and timezone reference — so you never miss the action.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="https://discord.gg/prozillihq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                Get Notifications on Discord
              </a>
              <Link href="/watch" className="btn btn-secondary btn-lg">
                Watch Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TIMEZONE REFERENCE ====== */}
      <section className="bg-surface border-y border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-label text-dim">All times shown in</span>
              <span className="text-sm font-bold text-gold">{activeTz.zone} ({activeTz.label})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TIMEZONES.map((tz) => (
                <button
                  key={tz.zone}
                  onClick={() => setActiveTz(tz)}
                  className={`text-xs px-2.5 py-1 rounded-full border cursor-pointer transition-all duration-200 ${
                    activeTz.zone === tz.zone
                      ? "bg-gold/10 border-gold/25 text-gold font-bold scale-105"
                      : "bg-glass border-glass-border text-muted hover:bg-white/[0.04] hover:text-foreground hover:border-glass-border-hover"
                  }`}
                >
                  {tz.zone} (UTC{tz.offset >= 0 ? "+" : ""}{tz.offset})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== WEEKLY SCHEDULE ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-red mb-4">This Week</div>
            <h2 className="text-headline mb-4">Weekly Schedule</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Streams run six days a week with rotating platforms and game titles. Thursday Community
              Night and Saturday Marathon are the big events — full multi-platform broadcasts with
              extended hours.
            </p>
            {!loading && dataSource === "api" && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                <span className="text-xs text-emerald font-medium">Live from PRISMAI</span>
              </div>
            )}
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="glass-raised overflow-hidden animate-pulse">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-glass-border">
                      <div className="h-7 w-12 bg-glass rounded mb-2" />
                      <div className="h-4 w-20 bg-glass rounded" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="h-5 w-48 bg-glass rounded mb-2" />
                          <div className="h-4 w-64 bg-glass rounded" />
                        </div>
                        <div className="flex gap-1.5">
                          <div className="h-6 w-16 bg-glass rounded-full" />
                          <div className="h-6 w-14 bg-glass rounded-full" />
                        </div>
                      </div>
                      <div className="h-4 w-full bg-glass rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Schedule Cards */}
          {!loading && (
            <div className="space-y-4 stagger">
              {displaySchedule.map((day) => (
                <div
                  key={day.day}
                  className={`glass-raised overflow-hidden ${
                    day.streams[0]?.featured ? "animate-border-glow" : ""
                  } ${day.day === today ? "ring-1 ring-gold/20" : ""}`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Day column */}
                    <div
                      className={`md:w-48 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-glass-border ${
                        day.streams[0]?.featured ? "bg-gold/5" : ""
                      }`}
                    >
                      <div className={`text-2xl font-extrabold ${day.streams[0]?.featured ? "text-gold" : "text-foreground"}`}>
                        {day.short}
                      </div>
                      <div className="text-sm text-muted">{day.day}</div>
                      {day.streams[0]?.featured && (
                        <div className="badge badge-gold mt-2 text-[10px]">Featured</div>
                      )}
                      {day.day === today && (
                        <div className="badge badge-emerald mt-2 text-[10px]">Today</div>
                      )}
                    </div>

                    {/* Stream details */}
                    <div className="flex-1 p-6">
                      {day.streams.map((stream, i) => (
                        <div key={i}>
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="text-lg font-bold">{stream.title}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-data text-gold">
                                  {stream.game}
                                </span>
                                {stream.displayTime && (
                                  <>
                                    <span className="text-dim">|</span>
                                    <span className="text-data text-muted">
                                      {stream.displayTime} {activeTz.zone}
                                    </span>
                                  </>
                                )}
                                {stream.duration && (
                                  <>
                                    <span className="text-dim">|</span>
                                    <span className="text-data text-dim">
                                      {stream.duration}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            {stream.platforms.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {stream.platforms.map((platform) => (
                                  <span
                                    key={platform}
                                    className="text-xs px-2 py-1 rounded-full bg-glass border border-glass-border text-muted"
                                  >
                                    {platform}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted">{stream.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====== PLATFORM ROTATION ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-electric mb-4">Platforms</div>
            <h2 className="text-headline mb-4">Platform Rotation</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Not every platform gets every stream. Here&apos;s how the rotation works. Twitch and
              Kick are the daily drivers. YouTube, TikTok, and others rotate based on the content
              type. PRISMAI keeps everything synced.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {PLATFORM_ROTATION.map((p) => (
              <div key={p.platform} className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${p.color}15` }}
                  >
                    <span
                      className="text-xs font-extrabold"
                      style={{ color: p.color }}
                    >
                      {p.platform.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: p.color }}>
                      {p.platform}
                    </h3>
                    <span className="text-xs text-muted">{p.frequency}</span>
                  </div>
                </div>
                <p className="text-xs text-muted">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SPECIAL EVENTS ====== */}
      <section className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge badge-gold mb-4">Events</div>
              <h2 className="text-headline mb-6">
                Special Events &{" "}
                <span className="text-shimmer">Marathons</span>
              </h2>
              <p className="text-body-lg mb-6">
                Beyond the regular weekly schedule, we run special events — 12-hour marathons for
                game releases, ZO Syndicate server-wide RP events, charity streams, community
                tournaments, and surprise collab streams. These are always announced first on Discord.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { event: "Game Launch Marathons", desc: "12+ hour streams for major releases. Full multi-platform." },
                  { event: "ZO Syndicate Events", desc: "Server-wide RP scenarios. Gang wars, police raids, elections." },
                  { event: "Charity Streams", desc: "Fundraising events with donation goals and community challenges." },
                  { event: "Community Tournaments", desc: "Viewer-vs-viewer brackets with prizes and bragging rights." },
                  { event: "Collab Streams", desc: "Guest streamers, co-op sessions, and crossover content." },
                ].map((item) => (
                  <div key={item.event} className="glass p-4">
                    <h4 className="text-sm font-bold mb-1">{item.event}</h4>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-raised p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </div>
              <h3 className="text-subhead mb-4">Never Miss a Stream</h3>
              <p className="text-body mb-6">
                Join the Prozilli HQ Discord for instant go-live notifications, schedule updates,
                and event announcements. LISA will ping you when the action starts.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://discord.gg/prozillihq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                  </svg>
                  Join Prozilli HQ Discord
                </a>
                <a
                  href="https://twitch.tv/ProzilliGaming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full"
                >
                  Follow on Twitch
                </a>
                <a
                  href="https://youtube.com/@ProzilliGaming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full"
                >
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRISMAI NOTE ====== */}
      <section className="py-16 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="powered-by-prismai">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" opacity="0.3" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                Powered by PRISMAI
              </span>
              <p className="text-sm text-muted">
                Schedule updates, go-live alerts, and platform routing are all managed automatically by PRISMAI.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/watch" className="btn btn-primary btn-sm">
                Watch Now
              </Link>
              <Link href="/lisa" className="btn btn-ghost btn-sm">
                Meet LISA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
