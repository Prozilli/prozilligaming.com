"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface StatItem {
  label: string;
  value: string;
  liveKey?: string; // key in API response to pull live data from
}

interface AnimatedStatsProps {
  stats: StatItem[];
  apiEndpoint?: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    const val = num / 1_000_000;
    return val % 1 === 0 ? `${val}M` : `${val.toFixed(1)}M`;
  }
  if (num >= 10_000) {
    const val = num / 1_000;
    return val % 1 === 0 ? `${val}K` : `${val.toFixed(1)}K`;
  }
  if (num >= 1_000) {
    return num.toLocaleString("en-US");
  }
  return String(num);
}

function parseDisplayValue(val: string): { numeric: number | null; suffix: string } {
  // Try to extract numeric part from strings like "50K+", "51", "9", "200+"
  const match = val.match(/^([\d,.]+)\s*([KkMm]?)(\+?)$/);
  if (!match) return { numeric: null, suffix: "" };

  let num = parseFloat(match[1].replace(/,/g, ""));
  const multiplier = match[2].toUpperCase();
  const plus = match[3];

  if (multiplier === "K") num *= 1000;
  if (multiplier === "M") num *= 1_000_000;

  return { numeric: num, suffix: plus };
}

function AnimatedNumber({
  target,
  suffix,
  displayValue,
  duration = 1500,
}: {
  target: number | null;
  suffix: string;
  displayValue: string;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated || target === null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, target]);

  useEffect(() => {
    if (!hasAnimated || target === null) return;

    const startTime = performance.now();
    const startVal = 0;

    function easeOutQuart(t: number): number {
      return 1 - Math.pow(1 - t, 4);
    }

    function animate(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const value = Math.floor(startVal + ((target ?? 0) - startVal) * easedProgress);
      setCurrent(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [hasAnimated, target, duration]);

  if (target === null) {
    return <div ref={ref}>{displayValue}</div>;
  }

  const formatted = hasAnimated && current >= target
    ? formatNumber(target) + suffix
    : hasAnimated
    ? formatNumber(current) + suffix
    : "0" + suffix;

  return <div ref={ref}>{formatted}</div>;
}

export function AnimatedStats({
  stats,
  apiEndpoint = "/api/prismai/stats",
  className = "grid grid-cols-2 md:grid-cols-5 gap-8",
  valueClassName = "text-3xl font-extrabold text-foreground",
  labelClassName = "text-label text-dim mt-1",
}: AnimatedStatsProps) {
  const [liveData, setLiveData] = useState<Record<string, unknown> | null>(null);
  const hasFetched = useRef(false);

  const fetchStats = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    try {
      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const data = await res.json();
        setLiveData(data);
      }
    } catch {
      // Silently fall back to hardcoded values
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className={className}>
      {stats.map((stat) => {
        // If we have live data and a liveKey, use the live value
        let displayValue = stat.value;
        if (liveData && stat.liveKey) {
          const liveVal = getNestedValue(liveData, stat.liveKey);
          if (liveVal !== undefined && liveVal !== null) {
            displayValue = String(liveVal);
          }
        }

        const { numeric, suffix } = parseDisplayValue(displayValue);

        return (
          <div key={stat.label} className="text-center">
            <div className={valueClassName}>
              <AnimatedNumber
                target={numeric}
                suffix={suffix}
                displayValue={displayValue}
              />
            </div>
            <div className={labelClassName}>{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}
