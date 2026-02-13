"use client";

import { useState, useEffect } from "react";

interface Platform {
  name: string;
  connected: boolean;
  username?: string;
  url?: string;
}

interface PlatformsState {
  platforms: Platform[];
  connectedCount: number;
  loading: boolean;
}

const API_BASE = "https://prozilligaming.com/api/prismai";

export function usePlatforms(): PlatformsState {
  const [state, setState] = useState<PlatformsState>({
    platforms: [],
    connectedCount: 0,
    loading: true,
  });

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const res = await fetch(`${API_BASE}/platforms`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch platforms");
        const data = await res.json();

        const platforms: Platform[] = Array.isArray(data.platforms)
          ? data.platforms
          : Array.isArray(data)
            ? data
            : [];
        const connectedCount = platforms.filter((p) => p.connected).length;

        setState({ platforms, connectedCount, loading: false });
      } catch {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }

    fetchPlatforms();
  }, []);

  return state;
}
