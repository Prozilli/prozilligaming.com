"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ScheduleData {
  isLive: boolean;
  liveData: {
    title: string;
    gameName: string;
    viewerCount: number;
    startedAt: string;
  } | null;
  nextStream: {
    title: string;
    category: string | null;
    startTime: string;
    endTime: string;
    isRecurring: boolean;
  } | null;
  broadcasterName: string;
}

function calculateTimeLeft(targetDate: Date): TimeLeft | null {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass glow-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-[50px] sm:min-w-[60px]">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tabular-nums">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="animate-fade-in-up animate-delay-500 mt-6 sm:mt-8">
      <div className="inline-flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-brand-gold">
            Loading Schedule...
          </span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-lg px-4 py-3 min-w-[60px]">
              <div className="h-8 w-8 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NextStreamCountdown() {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fetch schedule data
  useEffect(() => {
    setMounted(true);

    async function fetchSchedule() {
      try {
        const response = await fetch("https://api.prozilli.com/twitch/schedule");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setScheduleData(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();

    // Refresh schedule every 5 minutes
    const scheduleInterval = setInterval(fetchSchedule, 300000);
    return () => clearInterval(scheduleInterval);
  }, []);

  // Update countdown every second
  useEffect(() => {
    if (!scheduleData?.nextStream?.startTime) {
      setTimeLeft(null);
      return;
    }

    const targetDate = new Date(scheduleData.nextStream.startTime);

    const updateCountdown = () => {
      const remaining = calculateTimeLeft(targetDate);
      setTimeLeft(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [scheduleData?.nextStream?.startTime]);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  if (loading) {
    return <LoadingState />;
  }

  // Error state or no credentials configured
  if (error) {
    return (
      <div className="animate-fade-in-up animate-delay-500 mt-6 sm:mt-8">
        <div className="inline-flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-brand-gold">
              Next Stream
            </span>
          </div>
          <p className="text-sm text-muted">Check the schedule for upcoming streams</p>
          <Link
            href="/schedule"
            className="text-xs text-brand-red hover:text-brand-red-glow transition-colors"
          >
            View Schedule &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // Currently live
  if (scheduleData?.isLive && scheduleData.liveData) {
    return (
      <div className="animate-fade-in-up animate-delay-500 mt-6 sm:mt-8">
        <div className="inline-flex flex-col items-center gap-3 rounded-xl border border-brand-red/30 bg-brand-red/10 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-live-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-red">
              Live Now
            </span>
            {scheduleData.liveData.viewerCount > 0 && (
              <span className="text-xs text-muted">
                • {scheduleData.liveData.viewerCount.toLocaleString()} viewers
              </span>
            )}
          </div>
          <p className="text-sm text-white font-medium max-w-md text-center">
            {scheduleData.liveData.title}
          </p>
          {scheduleData.liveData.gameName && (
            <span className="text-xs text-brand-gold">
              Playing: {scheduleData.liveData.gameName}
            </span>
          )}
          <Link
            href="/watch"
            className="rounded-sm bg-brand-red px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-red-glow"
          >
            Watch Now &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // No scheduled stream
  if (!scheduleData?.nextStream) {
    return (
      <div className="animate-fade-in-up animate-delay-500 mt-6 sm:mt-8">
        <div className="inline-flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-brand-gold">
              Next Stream
            </span>
          </div>
          <p className="text-sm text-muted">No upcoming streams scheduled</p>
          <div className="flex items-center gap-3">
            <Link
              href="/schedule"
              className="text-xs text-brand-red hover:text-brand-red-glow transition-colors"
            >
              View Schedule &rarr;
            </Link>
            <a
              href="https://twitch.tv/prozilligaming"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#9146FF] hover:text-[#a970ff] transition-colors"
            >
              Follow on Twitch
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Countdown has ended (stream should be starting)
  if (!timeLeft) {
    return (
      <div className="animate-fade-in-up animate-delay-500 mt-6 sm:mt-8">
        <div className="inline-flex flex-col items-center gap-3 rounded-xl border border-brand-red/30 bg-brand-red/10 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-live-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-red">
              Starting Soon
            </span>
          </div>
          <p className="text-sm text-white font-medium">{scheduleData.nextStream.title}</p>
          <Link
            href="/watch"
            className="rounded-sm bg-brand-red px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-red-glow"
          >
            Watch Now &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // Countdown active
  return (
    <div className="animate-fade-in-up animate-delay-500 mt-6 sm:mt-8">
      <div className="inline-flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 sm:px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-brand-gold">
            Next Stream
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {timeLeft.days > 0 && <TimeUnit value={timeLeft.days} label="Days" />}
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <span className="text-xl sm:text-2xl text-muted self-start mt-2 sm:mt-3">:</span>
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <span className="text-xl sm:text-2xl text-muted self-start mt-2 sm:mt-3">:</span>
          <TimeUnit value={timeLeft.seconds} label="Sec" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-white font-medium max-w-md text-center">
            {scheduleData.nextStream.title}
          </p>
          {scheduleData.nextStream.category && (
            <span className="text-xs text-muted">
              {scheduleData.nextStream.category}
            </span>
          )}
        </div>

        <Link
          href="/schedule"
          className="text-xs text-brand-gold hover:text-white transition-colors"
        >
          View Full Schedule &rarr;
        </Link>
      </div>
    </div>
  );
}
