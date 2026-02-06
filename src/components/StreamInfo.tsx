"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE = "https://api.prozilli.com";

interface LiveData {
  isLive: boolean;
  title?: string;
  gameName?: string;
  viewerCount?: number;
  startedAt?: string;
}

function formatUptime(startedAt: string): string {
  const started = new Date(startedAt);
  const now = new Date();
  const diffMs = now.getTime() - started.getTime();
  const hours = Math.floor(diffMs / 3600000);
  const mins = Math.floor((diffMs % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export default function StreamInfo() {
  const [live, setLive] = useState<LiveData | null>(null);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch(`${API_BASE}/twitch/live`);
        if (res.ok) setLive(await res.json());
      } catch {}
    };

    fetchLive();
    const interval = setInterval(fetchLive, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!live) {
    return (
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-muted">
          Primary stream on{" "}
          <a
            href="https://twitch.tv/ProzilliGaming"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red transition-colors hover:text-brand-red-glow"
          >
            Twitch
          </a>
        </p>
        <Link
          href="/schedule"
          className="text-sm text-brand-gold transition-colors hover:text-white"
        >
          View Schedule &rarr;
        </Link>
      </div>
    );
  }

  if (live.isLive) {
    return (
      <div className="mt-3 rounded-lg bg-brand-red/5 border border-brand-red/20 px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex items-center gap-1.5 shrink-0">
              <span className="animate-live-pulse h-2 w-2 rounded-full bg-brand-red" />
              <span className="text-xs font-bold uppercase text-brand-red">
                Live
              </span>
            </span>
            <p className="text-sm text-white truncate">{live.title}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted shrink-0">
            {live.gameName && (
              <span className="text-brand-gold">{live.gameName}</span>
            )}
            {live.viewerCount !== undefined && (
              <span>{live.viewerCount.toLocaleString()} watching</span>
            )}
            {live.startedAt && (
              <span>Up {formatUptime(live.startedAt)}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 flex items-center justify-between">
      <p className="text-sm text-muted">
        Channel is offline &mdash; catch up with clips and VODs below
      </p>
      <Link
        href="/schedule"
        className="text-sm text-brand-gold transition-colors hover:text-white shrink-0"
      >
        View Schedule &rarr;
      </Link>
    </div>
  );
}
