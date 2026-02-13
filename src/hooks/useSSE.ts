"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SSEOptions {
  url: string;
  onMessage?: (event: MessageEvent) => void;
  maxRetries?: number;
  baseDelay?: number;
}

interface SSEState {
  connected: boolean;
  error: boolean;
  retryCount: number;
}

export function useSSE({ url, onMessage, maxRetries = 10, baseDelay = 1000 }: SSEOptions): SSEState {
  const [state, setState] = useState<SSEState>({
    connected: false,
    error: false,
    retryCount: 0,
  });

  const sourceRef = useRef<EventSource | null>(null);
  const retryRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
    if (sourceRef.current) {
      sourceRef.current.close();
    }

    const source = new EventSource(url);
    sourceRef.current = source;

    source.onopen = () => {
      retryRef.current = 0;
      setState({ connected: true, error: false, retryCount: 0 });
    };

    source.onmessage = (event) => {
      onMessage?.(event);
    };

    source.onerror = () => {
      source.close();
      sourceRef.current = null;
      setState((prev) => ({ ...prev, connected: false }));

      if (retryRef.current < maxRetries) {
        const delay = baseDelay * Math.pow(2, retryRef.current);
        retryRef.current += 1;
        setState((prev) => ({ ...prev, retryCount: retryRef.current }));
        timerRef.current = setTimeout(connect, delay);
      } else {
        setState({ connected: false, error: true, retryCount: retryRef.current });
      }
    };
  }, [url, onMessage, maxRetries, baseDelay]);

  useEffect(() => {
    connect();
    return () => {
      sourceRef.current?.close();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [connect]);

  return state;
}
