"use client";

import { useState, useEffect } from "react";

const API_BASE = "/api/prismai";

interface LiveData {
  isLive: boolean;
  title?: string;
  gameName?: string;
  viewerCount?: number;
  startedAt?: string;
}

interface ScheduleData {
  isLive: boolean;
  nextStream?: {
    title: string;
    category: string | null;
    startTime: string;
  } | null;
}

export default function WatchHero() {
  const [live, setLive] = useState<LiveData | null>(null);
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const [liveRes, schedRes] = await Promise.allSettled([
        fetch(`${API_BASE}/twitch/live`).then((r) => r.json()),
        fetch(`${API_BASE}/twitch/schedule`).then((r) => r.json()),
      ]);
      if (liveRes.status === "fulfilled") setLive(liveRes.value);
      if (schedRes.status === "fulfilled") setSchedule(schedRes.value);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const isLive = live?.isLive ?? false;
  const nextStream = schedule?.nextStream;

  const formatNextStream = (startTime: string) => {
    const date = new Date(startTime);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    if (diffMs < 0) return "Soon";
    const diffH = Math.floor(diffMs / 3600000);
    const diffD = Math.floor(diffH / 24);
    if (diffD > 0) return `in ${diffD}d`;
    if (diffH > 0) return `in ${diffH}h`;
    const diffM = Math.floor(diffMs / 60000);
    return `in ${diffM}m`;
  };

  return (
    <section className="gradient-gaming scanlines relative flex flex-col items-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 text-center">
      <div className="cinematic-smoke" />
      <div className="film-grain" />
      <div className="vignette" />
      <div
        className="hero-image-overlay"
        style={{
          backgroundImage: `url("/images/heroes/hero-watch.webp")`,
          opacity: 0.3,
        }}
      />

      <div className="relative z-10">
        {/* Live status badge */}
        {isLive ? (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-red">
            <span className="animate-live-pulse h-2 w-2 rounded-full bg-brand-red" />
            Live Now
          </span>
        ) : (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted">
            <span className="h-2 w-2 rounded-full bg-gray-500" />
            {nextStream
              ? `Next stream ${formatNextStream(nextStream.startTime)}`
              : "Offline"}
          </span>
        )}

        <h1 className="animate-fade-in-up text-glow-red text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          WATCH <span className="text-brand-red">LIVE</span>
        </h1>

        {isLive && live?.gameName ? (
          <div className="animate-fade-in-up animate-delay-100 mt-3 sm:mt-4">
            <p className="text-sm sm:text-base text-white font-medium">
              {live.title}
            </p>
            <div className="mt-2 flex items-center justify-center gap-4 text-xs text-muted">
              <span className="text-brand-gold">{live.gameName}</span>
              {live.viewerCount !== undefined && (
                <>
                  <span className="text-white/20">|</span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                    {live.viewerCount.toLocaleString()} viewers
                  </span>
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="animate-fade-in-up animate-delay-100 mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-muted">
            Multiplatform streaming across every major platform. Primary feed
            below — or catch us on your platform of choice.
          </p>
        )}
      </div>
    </section>
  );
}
