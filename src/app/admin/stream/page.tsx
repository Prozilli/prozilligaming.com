"use client";

import { useState, useEffect } from "react";
import {
  getPlatforms,
  sendChatMessage,
  sendBroadcast,
  postTweet,
} from "@/lib/admin-api";
import type { PlatformStatus } from "@/lib/admin-api";

// Platform metadata for display
const PLATFORM_OPTIONS = [
  { value: "all", label: "All Platforms" },
  { value: "twitch", label: "Twitch" },
  { value: "kick", label: "Kick" },
  { value: "discord", label: "Discord" },
  { value: "trovo", label: "Trovo" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
] as const;

const PLATFORM_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  twitch: { bg: "bg-purple-500/20", text: "text-purple-400", dot: "bg-purple-500" },
  kick: { bg: "bg-green-500/20", text: "text-green-400", dot: "bg-green-500" },
  discord: { bg: "bg-indigo-500/20", text: "text-indigo-400", dot: "bg-indigo-500" },
  trovo: { bg: "bg-teal-500/20", text: "text-teal-400", dot: "bg-teal-500" },
  youtube: { bg: "bg-red-500/20", text: "text-red-400", dot: "bg-red-500" },
  facebook: { bg: "bg-blue-500/20", text: "text-blue-400", dot: "bg-blue-500" },
  x: { bg: "bg-gray-500/20", text: "text-gray-400", dot: "bg-gray-500" },
  instagram: { bg: "bg-pink-500/20", text: "text-pink-400", dot: "bg-pink-500" },
  tiktok: { bg: "bg-cyan-500/20", text: "text-cyan-400", dot: "bg-cyan-500" },
};

type ActionStatus = "idle" | "loading" | "success" | "error";

interface ActionFeedback {
  status: ActionStatus;
  message: string;
}

export default function StreamControlPage() {
  // Platform data
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([]);
  const [platformsLoading, setPlatformsLoading] = useState(true);
  const [platformsError, setPlatformsError] = useState<string | null>(null);

  // Send Message form
  const [chatMessage, setChatMessage] = useState("");
  const [chatPlatform, setChatPlatform] = useState("all");
  const [chatFeedback, setChatFeedback] = useState<ActionFeedback>({
    status: "idle",
    message: "",
  });

  // LISA Broadcast form
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastFeedback, setBroadcastFeedback] = useState<ActionFeedback>({
    status: "idle",
    message: "",
  });

  // Post Tweet form
  const [tweetText, setTweetText] = useState("");
  const [tweetFeedback, setTweetFeedback] = useState<ActionFeedback>({
    status: "idle",
    message: "",
  });

  // Fetch platforms on mount and poll every 30s
  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const data = await getPlatforms();
        setPlatforms(data.platforms);
        setPlatformsError(null);
      } catch (err) {
        setPlatformsError(
          err instanceof Error ? err.message : "Failed to fetch platforms"
        );
      } finally {
        setPlatformsLoading(false);
      }
    }

    fetchPlatforms();
    const interval = setInterval(fetchPlatforms, 30000);

    return () => clearInterval(interval);
  }, []);

  // Derived live state
  const isAnyLive = platforms.some((p) => p.live);
  const liveCount = platforms.filter((p) => p.live).length;
  const livePlatformNames = platforms
    .filter((p) => p.live)
    .map((p) => p.name)
    .join(", ");

  // Clear feedback after delay
  function clearFeedback(
    setter: React.Dispatch<React.SetStateAction<ActionFeedback>>,
    delay = 3000
  ) {
    setTimeout(() => setter({ status: "idle", message: "" }), delay);
  }

  // Handle Send Message
  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatFeedback({ status: "loading", message: "Sending..." });
    try {
      const result = await sendChatMessage(chatPlatform, chatMessage.trim());
      const sentCount = result.results?.filter((r) => r.sent).length ?? 0;
      const totalCount = result.results?.length ?? 0;
      setChatFeedback({
        status: "success",
        message: `Sent to ${sentCount}/${totalCount} platform${totalCount !== 1 ? "s" : ""}`,
      });
      setChatMessage("");
      clearFeedback(setChatFeedback);
    } catch (err) {
      setChatFeedback({
        status: "error",
        message: err instanceof Error ? err.message : "Failed to send message",
      });
      clearFeedback(setChatFeedback, 5000);
    }
  }

  // Handle LISA Broadcast
  async function handleBroadcast(e: React.FormEvent) {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    setBroadcastFeedback({ status: "loading", message: "Broadcasting..." });
    try {
      const result = await sendBroadcast(broadcastMessage.trim());
      const sentCount = result.results?.filter((r) => r.sent).length ?? 0;
      const totalCount = result.results?.length ?? 0;
      setBroadcastFeedback({
        status: "success",
        message: `Broadcast sent to ${sentCount}/${totalCount} platform${totalCount !== 1 ? "s" : ""}`,
      });
      setBroadcastMessage("");
      clearFeedback(setBroadcastFeedback);
    } catch (err) {
      setBroadcastFeedback({
        status: "error",
        message:
          err instanceof Error ? err.message : "Failed to send broadcast",
      });
      clearFeedback(setBroadcastFeedback, 5000);
    }
  }

  // Handle Post Tweet
  async function handlePostTweet(e: React.FormEvent) {
    e.preventDefault();
    if (!tweetText.trim() || tweetText.length > 280) return;

    setTweetFeedback({ status: "loading", message: "Posting..." });
    try {
      await postTweet(tweetText.trim());
      setTweetFeedback({
        status: "success",
        message: "Tweet posted successfully",
      });
      setTweetText("");
      clearFeedback(setTweetFeedback);
    } catch (err) {
      setTweetFeedback({
        status: "error",
        message: err instanceof Error ? err.message : "Failed to post tweet",
      });
      clearFeedback(setTweetFeedback, 5000);
    }
  }

  // Feedback badge component
  function FeedbackBadge({ feedback }: { feedback: ActionFeedback }) {
    if (feedback.status === "idle") return null;
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
          feedback.status === "loading"
            ? "bg-blue-500/20 text-blue-400"
            : feedback.status === "success"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {feedback.status === "loading" && (
          <svg
            className="h-3 w-3 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {feedback.status === "success" && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        )}
        {feedback.status === "error" && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        )}
        {feedback.message}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Stream Control</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage live streams, send messages, and broadcast across platforms
        </p>
      </div>

      {/* ===== Section 1: Live Status Banner ===== */}
      {platformsLoading ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-raised animate-pulse" />
            <span className="text-sm text-gray-400">
              Checking live status...
            </span>
          </div>
        </div>
      ) : platformsError ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <span className="text-sm text-red-400">{platformsError}</span>
          </div>
        </div>
      ) : isAnyLive ? (
        <div className="rounded-xl border border-green-500/20 bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
              </span>
              <div>
                <p className="text-sm font-semibold text-green-400">
                  LIVE on {liveCount} platform{liveCount !== 1 ? "s" : ""}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{livePlatformNames}</p>
              </div>
            </div>
            <span className="rounded-lg bg-green-500/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-green-400">
              Live
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full bg-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Currently Offline
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  No platforms are streaming right now
                </p>
              </div>
            </div>
            <span className="rounded-lg bg-surface px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
              Offline
            </span>
          </div>
        </div>
      )}

      {/* ===== Main Grid: Send Message + LISA Broadcast ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Section 2: Send Message */}
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
              Send Message
            </h3>
            <FeedbackBadge feedback={chatFeedback} />
          </div>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Platform
              </label>
              <select
                value={chatPlatform}
                onChange={(e) => setChatPlatform(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
              >
                {PLATFORM_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Message
              </label>
              <textarea
                rows={3}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={
                !chatMessage.trim() || chatFeedback.status === "loading"
              }
              className="w-full rounded-lg bg-red px-4 py-2.5 text-sm font-medium text-white hover:bg-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {chatFeedback.status === "loading" ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        {/* Section 3: LISA Broadcast */}
        <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <svg className="h-4 w-4 text-red" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
              </svg>
              LISA Broadcast
            </h3>
            <FeedbackBadge feedback={broadcastFeedback} />
          </div>
          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Broadcast Message
              </label>
              <textarea
                rows={3}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Message from LISA to all platforms..."
                className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none"
              />
              <p className="mt-1.5 text-[10px] text-gray-500">
                This sends a message as LISA across all connected platforms
              </p>
            </div>
            <button
              type="submit"
              disabled={
                !broadcastMessage.trim() ||
                broadcastFeedback.status === "loading"
              }
              className="w-full rounded-lg bg-gradient-to-r from-brand-red to-brand-red/80 px-4 py-2.5 text-sm font-medium text-white hover:from-brand-red/90 hover:to-brand-red/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {broadcastFeedback.status === "loading"
                ? "Broadcasting..."
                : "Broadcast to All"}
            </button>
          </form>
        </div>
      </div>

      {/* ===== Section 4: Post Tweet ===== */}
      <div className="rounded-xl border border-[var(--color-border)] bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Post Tweet
          </h3>
          <div className="flex items-center gap-3">
            <FeedbackBadge feedback={tweetFeedback} />
            <span
              className={`text-xs font-medium tabular-nums ${
                tweetText.length > 280
                  ? "text-red-400"
                  : tweetText.length > 250
                  ? "text-yellow-400"
                  : "text-gray-500"
              }`}
            >
              {tweetText.length}/280
            </span>
          </div>
        </div>
        <form onSubmit={handlePostTweet} className="space-y-4">
          <textarea
            rows={3}
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            placeholder="What's happening?"
            maxLength={300}
            className="w-full rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none"
          />
          {tweetText.length > 280 && (
            <p className="text-xs text-red-400">
              Tweet exceeds 280 characters. Please shorten your message.
            </p>
          )}
          <div className="flex items-center justify-between">
            {/* Character progress bar */}
            <div className="flex-1 mr-4">
              <div className="h-1 rounded-full bg-surface overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    tweetText.length > 280
                      ? "bg-red-500"
                      : tweetText.length > 250
                      ? "bg-yellow-500"
                      : "bg-brand-gold"
                  }`}
                  style={{
                    width: `${Math.min((tweetText.length / 280) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={
                !tweetText.trim() ||
                tweetText.length > 280 ||
                tweetFeedback.status === "loading"
              }
              className="rounded-lg bg-red px-6 py-2.5 text-sm font-medium text-white hover:bg-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {tweetFeedback.status === "loading" ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>

      {/* ===== Section 5: Platform Status Cards ===== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Platform Status</h3>
          <span className="text-xs text-gray-500">
            {platforms.filter((p) => p.connected).length}/{platforms.length}{" "}
            connected
          </span>
        </div>

        {platformsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-surface p-6 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-surface" />
                  <div className="space-y-2">
                    <div className="h-4 w-20 rounded bg-surface" />
                    <div className="h-3 w-16 rounded bg-surface" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {platforms.map((platform) => {
              const name = platform.name.toLowerCase();
              const colors = PLATFORM_COLORS[name] || {
                bg: "bg-gray-500/20",
                text: "text-gray-400",
                dot: "bg-gray-500",
              };

              return (
                <div
                  key={platform.name}
                  className="rounded-xl border border-[var(--color-border)] bg-surface p-6 transition-colors hover:border-[var(--color-border)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}
                      >
                        <span
                          className={`text-sm font-bold ${colors.text}`}
                        >
                          {platform.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {platform.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {platform.connected
                            ? platform.live
                              ? "Streaming"
                              : "Connected"
                            : "Disconnected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      {/* Connection status */}
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          platform.connected
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            platform.connected ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        {platform.connected ? "Online" : "Offline"}
                      </span>
                      {/* Live indicator */}
                      {platform.live && (
                        <span className="flex items-center gap-1.5 rounded-full bg-red/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red" />
                          </span>
                          Live
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {platforms.length === 0 && !platformsError && (
              <div className="col-span-full rounded-xl border border-[var(--color-border)] bg-surface p-6 text-center">
                <p className="text-sm text-gray-400">
                  No platform data available
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
