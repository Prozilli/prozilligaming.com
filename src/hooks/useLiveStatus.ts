"use client";

import { useState, useEffect, useCallback } from "react";

interface PlatformStatus {
  platform: string;
  isLive: boolean;
  viewers?: number;
  title?: string;
}

interface LiveStatus {
  isLive: boolean;
  platforms: PlatformStatus[];
  totalViewers: number;
  loading: boolean;
}

const API_BASE = "https://prozilligaming.com/api/prismai";

export function useLiveStatus(pollInterval = 30000): LiveStatus {
  const [status, setStatus] = useState<LiveStatus>({
    isLive: false,
    platforms: [],
    totalViewers: 0,
    loading: true,
  });

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/live`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch live status");
      const data = await res.json();

      const platforms: PlatformStatus[] = Array.isArray(data.platforms)
        ? data.platforms
        : [];
      const isLive = platforms.some((p: PlatformStatus) => p.isLive);
      const totalViewers = platforms.reduce(
        (sum: number, p: PlatformStatus) => sum + (p.viewers || 0),
        0
      );

      setStatus({ isLive, platforms, totalViewers, loading: false });
    } catch {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, pollInterval);
    return () => clearInterval(interval);
  }, [fetchStatus, pollInterval]);

  return status;
}
