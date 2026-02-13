"use client";

import Link from "next/link";
import { useLiveStatus } from "@/hooks/useLiveStatus";

export default function StreamInfo() {
  const { isLive, platforms, totalViewers, loading } = useLiveStatus(30000);

  if (loading) {
    return (
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-muted">Checking stream status...</p>
        <Link
          href="/schedule"
          className="text-sm text-gold transition-colors hover:text-foreground shrink-0"
        >
          View Schedule &rarr;
        </Link>
      </div>
    );
  }

  if (isLive) {
    const livePlatforms = platforms.filter((p) => p.isLive);
    return (
      <div className="mt-3 rounded-xl bg-red/5 border border-red/20 px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex items-center gap-1.5 shrink-0">
              <span className="animate-pulse-live h-2 w-2 rounded-full bg-red" />
              <span className="text-xs font-bold uppercase text-red">
                Live
              </span>
            </span>
            <p className="text-sm text-foreground truncate">
              Live on {livePlatforms.map((p) => p.platform).join(", ")}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted shrink-0">
            <span className="text-data text-gold">
              {totalViewers.toLocaleString()} watching
            </span>
            <span>
              {livePlatforms.length} platform{livePlatforms.length !== 1 ? "s" : ""}
            </span>
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
        className="text-sm text-gold transition-colors hover:text-foreground shrink-0"
      >
        View Schedule &rarr;
      </Link>
    </div>
  );
}
