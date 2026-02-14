"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Generic polling hook for PRISMAI API endpoints.
 * Fetches immediately, then re-fetches every `intervalMs` (default 30s).
 * Returns { data, error, loading, refetch }.
 */
export function usePrismai<T>(
  fetcher: () => Promise<T>,
  intervalMs = 30_000,
): { data: T | null; error: string | null; loading: boolean; refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const refetch = useCallback(async () => {
    try {
      const result = await fetcherRef.current();
      setData(result);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
    if (intervalMs <= 0) return;
    const id = setInterval(refetch, intervalMs);
    return () => clearInterval(id);
  }, [refetch, intervalMs]);

  return { data, error, loading, refetch };
}
