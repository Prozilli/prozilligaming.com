"use client";

import { useLiveStatus } from "@/hooks/useLiveStatus";

export default function HeroLiveStatus() {
  const { isLive, totalViewers, loading } = useLiveStatus();

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-dim" />
        <span className="text-data text-xs uppercase tracking-widest text-dim">
          Checking status...
        </span>
      </div>
    );
  }

  if (!isLive) {
    return (
      <div className="mt-6 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-dim" />
        <span className="text-data text-xs uppercase tracking-widest text-muted">
          System standby
        </span>
      </div>
    );
  }

  return (
    <div className="mt-6 flex items-center gap-3">
      <span className="animate-pulse-live h-2.5 w-2.5 rounded-full bg-red-bright" />
      <span className="text-data text-sm font-semibold uppercase tracking-widest text-red-bright">
        Live now
      </span>
      <span className="text-data text-sm text-muted">
        {totalViewers.toLocaleString()} viewers
      </span>
    </div>
  );
}
