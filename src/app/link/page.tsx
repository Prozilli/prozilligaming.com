"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const API_BASE = "https://api.prozilli.com";

interface LinkedAccount {
  userId: string;
  username: string;
  linkedAt: string;
}

interface PlatformInfo {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
}

const PLATFORMS: PlatformInfo[] = [
  {
    id: "twitch",
    name: "Twitch",
    color: "#9146FF",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
      </svg>
    ),
  },
  {
    id: "discord",
    name: "Discord",
    color: "#5865F2",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    id: "kick",
    name: "Kick",
    color: "#53FC18",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.333 0v24h5.338V14.666L12 20l5.333-5.334V24h5.334V0h-5.334v9.334L12 4 6.671 9.334V0z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "trovo",
    name: "Trovo",
    color: "#19E680",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.832 0L0 6.386l3.813 5.236h4.13L4.67 6.386h4.763L12 0zM12 0l2.567 6.386-3.274 5.236h4.13L19.237 6.386h-4.762L12 0zM7.943 11.622L4.67 17.614l3.812 5.236h4.131l-3.274-5.236h4.762l-2.567-6.386z" />
      </svg>
    ),
  },
];

function generateSessionId(): string {
  return crypto.randomUUID();
}

export default function LinkPage() {
  const [sessionId, setSessionId] = useState<string>("");
  const [linked, setLinked] = useState<Record<string, LinkedAccount>>({});
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize session
  useEffect(() => {
    let stored = localStorage.getItem("link_session_id");
    if (!stored) {
      stored = generateSessionId();
      localStorage.setItem("link_session_id", stored);
    }
    setSessionId(stored);
  }, []);

  // Poll for link status
  const pollStatus = useCallback(async () => {
    if (!sessionId || confirmed) return;
    try {
      const res = await fetch(`${API_BASE}/link/status?session=${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setLinked(data.linked || {});
      }
    } catch {
      // Silently retry
    }
  }, [sessionId, confirmed]);

  useEffect(() => {
    if (!sessionId) return;
    pollStatus();
    const interval = setInterval(pollStatus, 3000);
    return () => clearInterval(interval);
  }, [sessionId, pollStatus]);

  // Listen for postMessage from OAuth popups
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "link-complete" && event.data?.success) {
        pollStatus();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [pollStatus]);

  const linkedCount = Object.keys(linked).length;

  const handleLinkPlatform = (platformId: string) => {
    const url = `${API_BASE}/link/auth/${platformId}?session=${sessionId}`;
    const w = 500;
    const h = 700;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    window.open(url, `link_${platformId}`, `width=${w},height=${h},left=${left},top=${top}`);
  };

  const handleConfirm = async () => {
    setConfirming(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/link/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session: sessionId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Confirmation failed");
      }
      setConfirmed(true);
      localStorage.removeItem("link_session_id");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to confirm");
    } finally {
      setConfirming(false);
    }
  };

  const handleReset = () => {
    const newSession = generateSessionId();
    localStorage.setItem("link_session_id", newSession);
    setSessionId(newSession);
    setLinked({});
    setConfirmed(false);
    setError(null);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Accounts Linked!</h1>
          <p className="text-muted mb-8">
            Your accounts are linked! LISA will now recognize you everywhere —
            shared XP, economy, and conversation continuity across all platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(linked).map(([platform, acct]) => {
              const info = PLATFORMS.find((p) => p.id === platform);
              return (
                <div
                  key={platform}
                  className="panel px-4 py-2 flex items-center gap-2"
                >
                  <span style={{ color: info?.color }}>{info?.name}</span>
                  <span className="text-muted text-sm">{acct.username}</span>
                </div>
              );
            })}
          </div>
          <Link
            href="/"
            className="btn-primary inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base">
      <div className="mx-auto max-w-2xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-display text-foreground mb-4">
            Link Your Accounts
          </h1>
          <p className="text-body text-base max-w-lg mx-auto">
            Connect your streaming and social accounts to create a unified
            identity across all platforms. LISA will recognize you everywhere.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { title: "Shared XP", desc: "Earn XP on any platform" },
            { title: "Unified Economy", desc: "One wallet everywhere" },
            { title: "Conversation Memory", desc: "LISA remembers you" },
          ].map((b) => (
            <div
              key={b.title}
              className="panel p-4 text-center"
            >
              <p className="text-sm font-medium text-foreground">{b.title}</p>
              <p className="text-xs text-dim mt-1">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Platform Cards */}
        <div className="space-y-3 mb-8">
          {PLATFORMS.map((platform) => {
            const isLinked = !!linked[platform.id];
            const acct = linked[platform.id];

            return (
              <div
                key={platform.id}
                className={`rounded-xl border p-5 flex items-center justify-between transition-all ${
                  isLinked
                    ? "border-green-500/30 bg-green-500/5"
                    : "panel"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${platform.color}15`, color: platform.color }}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{platform.name}</p>
                    {isLinked ? (
                      <p className="text-sm text-green-400">{acct.username}</p>
                    ) : (
                      <p className="text-sm text-dim">Not linked</p>
                    )}
                  </div>
                </div>

                {isLinked ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-sm text-green-400">Linked</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleLinkPlatform(platform.id)}
                    className="rounded-lg px-5 py-2 text-sm font-medium text-white transition"
                    style={{ backgroundColor: platform.color }}
                  >
                    Link
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Confirm Button */}
        {linkedCount >= 2 && (
          <div className="text-center">
            {error && (
              <p className="text-sm text-red-400 mb-3">{error}</p>
            )}
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="btn-primary text-lg disabled:opacity-50"
            >
              {confirming ? "Confirming..." : `Confirm Link (${linkedCount} platforms)`}
            </button>
            <p className="text-xs text-dim mt-3">
              This will create a permanent link between your accounts
            </p>
          </div>
        )}

        {linkedCount > 0 && linkedCount < 2 && (
          <p className="text-center text-sm text-dim">
            Link at least 2 platforms to continue
          </p>
        )}

        {linkedCount > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={handleReset}
              className="text-xs text-dim hover:text-muted transition"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
