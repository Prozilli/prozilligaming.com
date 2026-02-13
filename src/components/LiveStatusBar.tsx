"use client";

import { useLiveStatus } from "@/hooks/useLiveStatus";
import PlatformBadge from "@/components/ui/PlatformBadge";

export default function LiveStatusBar() {
  const { isLive, platforms, totalViewers, loading } = useLiveStatus();

  if (loading) {
    return (
      <div className="border-y border-[var(--color-border)] bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-3">
          <span className="text-data text-xs text-dim">Loading system status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-y border-[var(--color-border)] bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3">
        {/* Platform badges */}
        <div className="flex flex-wrap items-center gap-4">
          {platforms.map((p) => (
            <PlatformBadge
              key={p.platform}
              name={p.platform}
              isLive={p.isLive}
              viewers={p.viewers}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          {isLive && (
            <div className="flex items-center gap-2">
              <span className="animate-pulse-live h-2 w-2 rounded-full bg-red-bright" />
              <span className="text-data text-xs font-semibold text-red-bright">
                LIVE
              </span>
              <span className="text-data text-xs text-muted">
                {totalViewers.toLocaleString()} viewers
              </span>
            </div>
          )}
          <span className="text-data text-xs text-muted">
            {platforms.filter((p) => p.isLive).length > 0
              ? `${platforms.filter((p) => p.isLive).length} platforms active`
              : "System standby"}
          </span>
        </div>
      </div>
    </div>
  );
}
