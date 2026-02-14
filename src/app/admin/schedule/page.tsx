"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

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
   Constants
   ============================================================ */

const DAY_OPTIONS = [
  { day: "Monday", short: "MON" },
  { day: "Tuesday", short: "TUE" },
  { day: "Wednesday", short: "WED" },
  { day: "Thursday", short: "THU" },
  { day: "Friday", short: "FRI" },
  { day: "Saturday", short: "SAT" },
  { day: "Sunday", short: "SUN" },
];

const PLATFORM_OPTIONS = ["Twitch", "Kick", "YouTube", "Discord", "TikTok", "X", "Instagram", "Facebook", "Trovo", "All Platforms"];

const DEFAULT_SCHEDULE: DaySchedule[] = [
  {
    day: "Monday", short: "MON",
    streams: [{
      time: "7:00 PM", duration: "3-4 hrs",
      title: "ZO Syndicate RP Night", game: "GTA V (FiveM)",
      platforms: ["Twitch", "Kick"],
      desc: "Roleplay on the ZO Syndicate FiveM server. Gang wars, police chases, business deals, and AI NPC encounters.",
      featured: false,
    }],
  },
  {
    day: "Tuesday", short: "TUE",
    streams: [{
      time: "7:00 PM", duration: "3-4 hrs",
      title: "Variety Night", game: "Rotating Titles",
      platforms: ["YouTube", "Twitch"],
      desc: "New releases, community requests, or whatever looks interesting. The game changes every week based on chat votes.",
      featured: false,
    }],
  },
  {
    day: "Wednesday", short: "WED",
    streams: [{
      time: "7:00 PM", duration: "3-4 hrs",
      title: "ZO Syndicate RP Night", game: "GTA V (FiveM)",
      platforms: ["Twitch", "Kick"],
      desc: "Continuation of Monday's RP storylines. Major events, territory battles, and server-wide scenarios happen mid-week.",
      featured: false,
    }],
  },
  {
    day: "Thursday", short: "THU",
    streams: [{
      time: "7:00 PM", duration: "4-5 hrs",
      title: "Community Night", game: "Community Choice",
      platforms: ["All Platforms"],
      desc: "Full multi-platform broadcast. Play with viewers, community tournaments, giveaways, and LISA-hosted events. The big night.",
      featured: true,
    }],
  },
  {
    day: "Friday", short: "FRI",
    streams: [{
      time: "8:00 PM", duration: "4-6 hrs",
      title: "Late Night Gaming", game: "Competitive / Horror / Co-op",
      platforms: ["Twitch", "Kick"],
      desc: "Late start, long run. Competitive ranked matches, horror games, or co-op with friends. The vibe shifts after dark.",
      featured: false,
    }],
  },
  {
    day: "Saturday", short: "SAT",
    streams: [{
      time: "3:00 PM", duration: "5-7 hrs",
      title: "Weekend Marathon", game: "Main Event",
      platforms: ["All Platforms"],
      desc: "The flagship stream of the week. Full production, multi-platform, extended hours. Major storylines, special guests, and server events.",
      featured: true,
    }],
  },
  {
    day: "Sunday", short: "SUN",
    streams: [{
      time: null, duration: null,
      title: "Rest Day / Bonus Stream", game: "TBD",
      platforms: [],
      desc: "Usually a rest day. Occasionally a surprise bonus stream gets announced on Discord. Follow notifications to catch it.",
      featured: false,
    }],
  },
];

/* ============================================================
   Schedule Editor Component
   ============================================================ */

export default function ScheduleEditorPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(DEFAULT_SCHEDULE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editingStreamIdx, setEditingStreamIdx] = useState<number | null>(null);
  const [showAddStream, setShowAddStream] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);

  // Form state for editing/adding a stream
  const [formTime, setFormTime] = useState("");
  const [formDuration, setFormDuration] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formGame, setFormGame] = useState("");
  const [formPlatforms, setFormPlatforms] = useState<string[]>([]);
  const [formDesc, setFormDesc] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formDay, setFormDay] = useState("Monday");

  /* ---- Fetch schedule from API ---- */
  const fetchSchedule = useCallback(async () => {
    try {
      // Try loading from PRISMAI settings (stream-schedule key)
      const res = await api.settingGet("stream-schedule");
      if (res.value && Array.isArray(res.value) && (res.value as DaySchedule[]).length > 0) {
        setSchedule(res.value as DaySchedule[]);
        setApiAvailable(true);
      }
      setError(null);
    } catch {
      // API not available or no saved schedule — use defaults
      setApiAvailable(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  /* ---- Save schedule to API ---- */
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.settingSave("stream-schedule", schedule);
      setSuccess("Schedule saved successfully");
      setHasChanges(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save schedule");
    } finally {
      setSaving(false);
    }
  };

  /* ---- Reset to defaults ---- */
  const handleReset = () => {
    if (!confirm("Reset the entire schedule to defaults? This will discard all changes.")) return;
    setSchedule(DEFAULT_SCHEDULE);
    setHasChanges(true);
  };

  /* ---- Open edit modal for a stream ---- */
  const openEditStream = (dayName: string, streamIdx: number) => {
    const day = schedule.find((d) => d.day === dayName);
    if (!day) return;
    const stream = day.streams[streamIdx];
    if (!stream) return;

    setFormTime(stream.time || "");
    setFormDuration(stream.duration || "");
    setFormTitle(stream.title);
    setFormGame(stream.game);
    setFormPlatforms([...stream.platforms]);
    setFormDesc(stream.desc);
    setFormFeatured(stream.featured);
    setFormDay(dayName);
    setEditingDay(dayName);
    setEditingStreamIdx(streamIdx);
    setShowAddStream(false);
  };

  /* ---- Open add stream modal ---- */
  const openAddStream = (dayName?: string) => {
    setFormTime("7:00 PM");
    setFormDuration("3-4 hrs");
    setFormTitle("");
    setFormGame("");
    setFormPlatforms(["Twitch", "Kick"]);
    setFormDesc("");
    setFormFeatured(false);
    setFormDay(dayName || "Monday");
    setEditingDay(null);
    setEditingStreamIdx(null);
    setShowAddStream(true);
  };

  /* ---- Save edited stream ---- */
  const handleSaveStream = () => {
    if (!formTitle) return;

    const updatedStream: StreamEntry = {
      time: formTime || null,
      duration: formDuration || null,
      title: formTitle,
      game: formGame || "TBD",
      platforms: formPlatforms,
      desc: formDesc,
      featured: formFeatured,
    };

    setSchedule((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as DaySchedule[];

      if (showAddStream) {
        // Adding a new stream
        let dayEntry = next.find((d) => d.day === formDay);
        if (!dayEntry) {
          const dayInfo = DAY_OPTIONS.find((o) => o.day === formDay);
          dayEntry = { day: formDay, short: dayInfo?.short || formDay.substring(0, 3).toUpperCase(), streams: [] };
          // Insert in correct order
          const dayIdx = DAY_OPTIONS.findIndex((o) => o.day === formDay);
          const insertIdx = next.findIndex((d) => DAY_OPTIONS.findIndex((o) => o.day === d.day) > dayIdx);
          if (insertIdx >= 0) {
            next.splice(insertIdx, 0, dayEntry);
          } else {
            next.push(dayEntry);
          }
        }
        dayEntry.streams.push(updatedStream);
      } else if (editingDay !== null && editingStreamIdx !== null) {
        // Editing existing stream
        const dayEntry = next.find((d) => d.day === editingDay);
        if (dayEntry && dayEntry.streams[editingStreamIdx]) {
          // If day changed, move the stream
          if (formDay !== editingDay) {
            dayEntry.streams.splice(editingStreamIdx, 1);
            // Remove day if empty
            if (dayEntry.streams.length === 0) {
              const idx = next.findIndex((d) => d.day === editingDay);
              if (idx >= 0) next.splice(idx, 1);
            }
            // Add to new day
            let targetDay = next.find((d) => d.day === formDay);
            if (!targetDay) {
              const dayInfo = DAY_OPTIONS.find((o) => o.day === formDay);
              targetDay = { day: formDay, short: dayInfo?.short || formDay.substring(0, 3).toUpperCase(), streams: [] };
              const dayIdx = DAY_OPTIONS.findIndex((o) => o.day === formDay);
              const insertIdx = next.findIndex((d) => DAY_OPTIONS.findIndex((o) => o.day === d.day) > dayIdx);
              if (insertIdx >= 0) {
                next.splice(insertIdx, 0, targetDay);
              } else {
                next.push(targetDay);
              }
            }
            targetDay.streams.push(updatedStream);
          } else {
            dayEntry.streams[editingStreamIdx] = updatedStream;
          }
        }
      }

      return next;
    });

    setHasChanges(true);
    setEditingDay(null);
    setEditingStreamIdx(null);
    setShowAddStream(false);
  };

  /* ---- Delete a stream ---- */
  const handleDeleteStream = (dayName: string, streamIdx: number) => {
    if (!confirm("Remove this stream entry?")) return;

    setSchedule((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as DaySchedule[];
      const dayEntry = next.find((d) => d.day === dayName);
      if (dayEntry) {
        dayEntry.streams.splice(streamIdx, 1);
        // If the day has no more streams, add a rest day placeholder
        if (dayEntry.streams.length === 0) {
          dayEntry.streams.push({
            time: null, duration: null,
            title: "No Stream Scheduled", game: "TBD",
            platforms: [], desc: "No stream scheduled for this day.",
            featured: false,
          });
        }
      }
      return next;
    });
    setHasChanges(true);
  };

  /* ---- Toggle platform in form ---- */
  const togglePlatform = (platform: string) => {
    setFormPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  /* ---- Get today ---- */
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stream Schedule</h1>
          <p className="text-sm text-muted mt-1">
            {loading ? "Loading schedule..." : `${schedule.reduce((acc, d) => acc + d.streams.length, 0)} stream entries across ${schedule.length} days`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="text-xs text-warning font-medium flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              Unsaved changes
            </span>
          )}
          <button onClick={handleReset} className="btn btn-ghost btn-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Reset
          </button>
          <button onClick={() => openAddStream()} className="btn btn-secondary btn-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Stream
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="btn btn-primary btn-sm"
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859" />
                </svg>
                Save Schedule
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error / Success Banners */}
      {error && (
        <div className="card p-4 border-error/30 bg-error/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-error flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span className="text-sm text-error">{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-dim hover:text-foreground transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {success && (
        <div className="card p-4 border-emerald/30 bg-emerald/5 flex items-center gap-3">
          <svg className="w-5 h-5 text-emerald flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-emerald">{success}</span>
        </div>
      )}

      {!apiAvailable && !loading && (
        <div className="card p-4 border-warning/30 bg-warning/5 flex items-center gap-3">
          <svg className="w-5 h-5 text-warning flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <span className="text-sm text-warning font-medium">PRISMAI API not available.</span>
            <span className="text-xs text-dim ml-2">Editing local defaults. Changes will be saved when the API is back online.</span>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-10 w-16 bg-glass rounded" />
                <div className="flex-1">
                  <div className="h-5 w-48 bg-glass rounded mb-2" />
                  <div className="h-4 w-64 bg-glass rounded" />
                </div>
                <div className="h-8 w-20 bg-glass rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule List */}
      {!loading && (
        <div className="space-y-3">
          {schedule.map((day) => (
            <div key={day.day} className={`card overflow-hidden ${day.day === today ? "ring-1 ring-gold/20" : ""}`}>
              {/* Day Header */}
              <div className={`flex items-center justify-between px-5 py-3 border-b border-glass-border ${day.streams.some((s) => s.featured) ? "bg-gold/5" : "bg-glass"}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-extrabold ${day.streams.some((s) => s.featured) ? "text-gold" : "text-foreground"}`}>
                    {day.short}
                  </span>
                  <span className="text-sm text-muted">{day.day}</span>
                  {day.day === today && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald/15 text-emerald font-bold">Today</span>
                  )}
                  {day.streams.some((s) => s.featured) && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold font-bold">Featured</span>
                  )}
                </div>
                <button
                  onClick={() => openAddStream(day.day)}
                  className="text-xs text-dim hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add
                </button>
              </div>

              {/* Streams */}
              <div className="divide-y divide-glass-border">
                {day.streams.map((stream, i) => (
                  <div key={i} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-glass/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold">{stream.title}</h3>
                        {stream.featured && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold/10 text-gold font-bold">FEATURED</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-gold font-semibold">{stream.game}</span>
                        {stream.time && (
                          <>
                            <span className="text-dim text-xs">|</span>
                            <span className="text-xs text-muted">{stream.time} EST</span>
                          </>
                        )}
                        {stream.duration && (
                          <>
                            <span className="text-dim text-xs">|</span>
                            <span className="text-xs text-dim">{stream.duration}</span>
                          </>
                        )}
                      </div>
                      {stream.platforms.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {stream.platforms.map((p) => (
                            <span key={p} className="text-[10px] px-1.5 py-0.5 rounded-full bg-glass border border-glass-border text-dim">
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                      {stream.desc && (
                        <p className="text-xs text-dim mt-1.5 line-clamp-2">{stream.desc}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => openEditStream(day.day, i)}
                        className="p-2 text-dim hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.04]"
                        title="Edit stream"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteStream(day.day, i)}
                        className="p-2 text-dim hover:text-error transition-colors rounded-lg hover:bg-error/5"
                        title="Remove stream"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      {!loading && (
        <div className="card p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <div>
              <h3 className="text-sm font-bold mb-1">How Schedule Syncing Works</h3>
              <p className="text-xs text-muted">
                All times are stored in EST (Eastern Standard Time). The public /schedule page automatically detects the
                viewer&apos;s timezone and converts times accordingly. Changes saved here will be immediately reflected on the
                public schedule page. PRISMAI uses this data for go-live notifications and stream planning.
              </p>
              <p className="text-xs text-dim mt-2">
                Note: The PRISMAI backend needs POST/PUT/DELETE endpoints for /schedules to fully support this editor.
                Currently using the settings API (key: &quot;stream-schedule&quot;) as storage.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ====== Add / Edit Stream Modal ====== */}
      {(showAddStream || (editingDay !== null && editingStreamIdx !== null)) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowAddStream(false); setEditingDay(null); setEditingStreamIdx(null); }} />
          <div className="relative w-full max-w-lg glass-raised p-6 max-h-[90vh] overflow-y-auto animate-reveal">
            <h2 className="text-lg font-bold mb-6">
              {showAddStream ? "Add Stream Entry" : "Edit Stream Entry"}
            </h2>

            <div className="space-y-4">
              {/* Day Selection */}
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Day</label>
                <select
                  value={formDay}
                  onChange={(e) => setFormDay(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                >
                  {DAY_OPTIONS.map((d) => (
                    <option key={d.day} value={d.day}>{d.day}</option>
                  ))}
                </select>
              </div>

              {/* Stream Title */}
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Stream Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., ZO Syndicate RP Night"
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                />
              </div>

              {/* Game / Category */}
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Game / Category</label>
                <input
                  type="text"
                  value={formGame}
                  onChange={(e) => setFormGame(e.target.value)}
                  placeholder="e.g., GTA V (FiveM), Rotating Titles, Community Choice"
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                />
              </div>

              {/* Time & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Start Time (EST)</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder="e.g., 7:00 PM"
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                  />
                  <p className="text-[10px] text-dim mt-1">Leave blank for rest days</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-dim block mb-1.5">Duration</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="e.g., 3-4 hrs"
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors"
                  />
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORM_OPTIONS.map((platform) => {
                    const isActive = formPlatforms.includes(platform);
                    return (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => togglePlatform(platform)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          isActive
                            ? "bg-red/15 border-red/30 text-red-bright"
                            : "bg-glass border-glass-border text-dim hover:text-foreground"
                        }`}
                      >
                        {platform}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Description</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Brief description of the stream content..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none"
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-glass border border-glass-border">
                <div>
                  <span className="text-sm font-semibold">Featured Stream</span>
                  <p className="text-[10px] text-dim mt-0.5">Highlighted with gold border on the public schedule</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormFeatured(!formFeatured)}
                  className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
                    formFeatured ? "bg-gold" : "bg-dim"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${
                    formFeatured ? "translate-x-5" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowAddStream(false); setEditingDay(null); setEditingStreamIdx(null); }}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStream}
                disabled={!formTitle}
                className="btn btn-primary btn-sm"
              >
                {showAddStream ? "Add Stream" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
