"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import type { PlatformStatus, ChatMessage } from "@/lib/api";

const PLATFORMS_META = [
  { name: "Twitch", color: "#9146ff", href: "https://twitch.tv/ProzilliGaming", desc: "Primary home. Chat with LISA, earn channel points, and catch every stream.", icon: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" },
  { name: "YouTube", color: "#ff0000", href: "https://youtube.com/@ProzilliGaming", desc: "VODs, highlights, Shorts, and full stream archives.", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { name: "Kick", color: "#53fc18", href: "https://kick.com/ProzilliGaming", desc: "Zero-delay streaming. LISA responds here too.", icon: "M7 2v20l5-5 5 5V2H7z" },
  { name: "TikTok", color: "#ff0050", href: "https://tiktok.com/@ProzilliGaming", desc: "Short-form clips, highlights, and AI-generated content.", icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
  { name: "X", color: "#ffffff", href: "https://x.com/ProzilliGaming", desc: "Stream announcements, clips, and community banter.", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "Instagram", color: "#e4405f", href: "https://instagram.com/ProzilliGaming", desc: "Behind the scenes, stories, Reels, and highlights.", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { name: "Facebook", color: "#1877f2", href: "https://facebook.com/ProzilliGaming", desc: "Prozilli Gaming page. Stream alerts and Reels.", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "Trovo", color: "#19d65c", href: "https://trovo.live/s/ProzilliGaming", desc: "Alternative streaming platform with LISA chat support.", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { name: "Discord", color: "#5865f2", href: "https://discord.gg/prozillihq", desc: "Prozilli HQ. Chat, LISA interaction, stream notifications.", icon: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" },
];

const SCHEDULE_PREVIEW = [
  { day: "Mon", time: "7 PM EST", game: "GTA V RP", platform: "Twitch + Kick" },
  { day: "Tue", time: "7 PM EST", game: "Variety Night", platform: "YouTube + Twitch" },
  { day: "Wed", time: "7 PM EST", game: "GTA V RP", platform: "Twitch + Kick" },
  { day: "Thu", time: "7 PM EST", game: "Community Night", platform: "All Platforms" },
  { day: "Fri", time: "8 PM EST", game: "Late Night Gaming", platform: "Twitch + Kick" },
  { day: "Sat", time: "3 PM EST", game: "Weekend Marathon", platform: "All Platforms" },
];

function platformColor(name: string) {
  const meta = PLATFORMS_META.find((p) => p.name.toLowerCase() === name.toLowerCase());
  return meta?.color || "#888";
}

export default function WatchPage() {
  const [isLive, setIsLive] = useState(false);
  const [livePlatforms, setLivePlatforms] = useState<PlatformStatus[]>([]);
  const [allPlatforms, setAllPlatforms] = useState<PlatformStatus[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const sseRef = useRef<EventSource | null>(null);

  // Fetch live status
  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await api.live();
        setIsLive(res.isLive);
        setLivePlatforms(res.platforms.filter((p) => p.live));
        setAllPlatforms(res.platforms);
      } catch {
        // silent
      }
    };
    fetchLive();
    const interval = setInterval(fetchLive, 15_000);
    return () => clearInterval(interval);
  }, []);

  // SSE chat stream when live
  useEffect(() => {
    if (!isLive) return;

    const es = new EventSource("/api/prismai/chat/stream");
    sseRef.current = es;

    es.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setChatMessages((prev) => [...prev.slice(-200), msg]);
      } catch {
        // ignore malformed
      }
    };

    return () => {
      es.close();
      sseRef.current = null;
    };
  }, [isLive]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-section min-h-[85vh] bg-grid relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/heroes/hero-watch.webp" alt="" fill className="object-cover opacity-12" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-reveal">
              {isLive ? (
                <span className="badge badge-live">
                  <span className="live-dot" />
                  Live on {livePlatforms.length} Platform{livePlatforms.length !== 1 ? "s" : ""}
                </span>
              ) : (
                <span className="badge badge-red">Offline</span>
              )}
              <span className="badge badge-red">Multi-Platform</span>
            </div>
            <h1 className="text-display mb-6 animate-reveal" style={{ animationDelay: "0.1s" }}>
              Watch{" "}
              <span className="text-shimmer-red">ProzilliGaming</span>
              <br />
              Across 9 Platforms
            </h1>
            <p
              className="text-body-lg max-w-xl mb-10 animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Every stream goes live simultaneously on Twitch, YouTube, Kick, TikTok, X, Instagram,
              Facebook, Trovo, and Discord. PRISMAI keeps them all in sync. LISA is in every chat.
              Pick your platform. The show is the same everywhere.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="https://twitch.tv/ProzilliGaming"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                </svg>
                Watch on Twitch
              </a>
              <Link href="/schedule" className="btn btn-secondary btn-lg">
                View Schedule
              </Link>
              {isLive && (
                <button onClick={() => setShowChat(!showChat)} className="btn btn-secondary btn-lg">
                  {showChat ? "Hide Chat" : "Show Chat"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====== EMBEDDED PLAYER ====== */}
      <section className="py-16 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`grid ${isLive && showChat ? "lg:grid-cols-3" : ""} gap-6`}>
            <div className={`${isLive && showChat ? "lg:col-span-2" : ""} glass-raised rounded-2xl overflow-hidden`}>
              {isLive ? (
                <div className="aspect-video">
                  <iframe
                    src="https://player.twitch.tv/?channel=ProzilliGaming&parent=prozilligaming.com&parent=localhost"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-surface flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-grid opacity-50" />
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red/10 border border-red/20 flex items-center justify-center animate-border-glow">
                      <svg className="w-10 h-10 text-red-bright" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold mb-2">Currently Offline</p>
                    <p className="text-sm text-muted">
                      The stream player will load automatically when ProzilliGaming goes live
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {allPlatforms.filter(p => p.connected).length > 0 && (
                        <span className="text-xs text-emerald">{allPlatforms.filter(p => p.connected).length} platforms connected and ready</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/* Player controls bar */}
              <div className="glass p-4 flex items-center justify-between border-t border-glass-border">
                <div className="flex items-center gap-3">
                  {isLive ? (
                    <span className="badge badge-live"><span className="live-dot" />Live</span>
                  ) : (
                    <span className="badge badge-red">Offline</span>
                  )}
                  <span className="text-sm font-semibold">ProzilliGaming</span>
                  {isLive && <span className="text-sm text-muted">on {livePlatforms.map(p => p.name).join(", ")}</span>}
                </div>
                <span className="powered-by-prismai text-[10px]">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" opacity="0.3" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  PRISMAI Sync
                </span>
              </div>
            </div>

            {/* Chat sidebar (when live) */}
            {isLive && showChat && (
              <div className="glass-raised rounded-2xl overflow-hidden flex flex-col h-[600px]">
                <div className="glass p-3 border-b border-glass-border flex items-center justify-between">
                  <span className="text-sm font-bold">Live Chat</span>
                  <span className="text-xs text-dim">{chatMessages.length} messages</span>
                </div>
                <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-1.5">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-xs text-dim py-8">Waiting for messages...</div>
                  ) : (
                    chatMessages.map((msg, i) => (
                      <div key={i} className="text-xs">
                        <span className="font-semibold mr-1.5" style={{ color: platformColor(msg.platform) }}>
                          {msg.username}
                        </span>
                        <span className="text-muted">{msg.message}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== PLATFORM GRID ====== */}
      <section className="py-24 bg-dots">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-electric mb-4">9 Platforms</div>
            <h2 className="text-headline mb-4">Pick Your Platform</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Every stream is broadcast simultaneously across all platforms. Same content, same LISA,
              same community. Your platform, your choice. PRISMAI handles the rest.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {PLATFORMS_META.map((platform) => {
              const status = allPlatforms.find((p) => p.name.toLowerCase() === platform.name.toLowerCase());
              return (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-holo p-6 group block"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${platform.color}15` }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill={platform.name === "Trovo" ? "none" : "currentColor"}
                          stroke={platform.name === "Trovo" ? "currentColor" : "none"}
                          strokeWidth={platform.name === "Trovo" ? 1.5 : 0}
                          viewBox="0 0 24 24"
                          style={{ color: platform.color }}
                        >
                          <path
                            strokeLinecap={platform.name === "Trovo" ? "round" : undefined}
                            strokeLinejoin={platform.name === "Trovo" ? "round" : undefined}
                            d={platform.icon}
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold group-hover:text-foreground transition-colors">
                          {platform.name}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          {status?.live ? (
                            <>
                              <span className="live-dot" />
                              <span className="text-xs text-red-bright font-semibold">Live Now</span>
                            </>
                          ) : status?.connected ? (
                            <>
                              <span className="status-online" />
                              <span className="text-xs text-emerald">Connected</span>
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-dim" />
                              <span className="text-xs text-dim">Offline</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted">{platform.desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== SCHEDULE TEASER ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="badge badge-gold mb-4">Schedule</div>
              <h2 className="text-headline mb-6">
                Know When We&apos;re{" "}
                <span className="text-shimmer">Live</span>
              </h2>
              <p className="text-body-lg mb-8">
                Streams run on a weekly schedule across rotating platforms. Follow on Discord
                for instant notifications when we go live, or check the full schedule for
                exact times and games.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/schedule" className="btn btn-primary">Full Schedule</Link>
                <a href="https://discord.gg/prozillihq" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Get Notifications
                </a>
              </div>
            </div>
            <div className="glass-raised p-6">
              <div className="text-label text-dim mb-4">This Week</div>
              <div className="space-y-3">
                {SCHEDULE_PREVIEW.map((slot) => (
                  <div key={slot.day} className="flex items-center justify-between p-3 rounded-lg bg-glass border border-glass-border">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-gold w-8">{slot.day}</span>
                      <div>
                        <div className="text-sm font-semibold">{slot.game}</div>
                        <div className="text-xs text-muted">{slot.platform}</div>
                      </div>
                    </div>
                    <span className="text-data text-muted">{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== VODS & CLIPS ====== */}
      <section id="clips" className="py-24 bg-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-red mb-4">Content</div>
            <h2 className="text-headline mb-4">VODs &amp; Clips</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Missed a stream? Catch up on past broadcasts, highlights, and the best moments
              clipped by the community. New content uploaded automatically via PRISMAI.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {[
              { title: "Latest Stream VOD", platform: "Twitch", duration: "4:32:15", date: "Today" },
              { title: "Best of ZO Syndicate RP", platform: "YouTube", duration: "12:45", date: "2 days ago" },
              { title: "LISA Roasts Chat", platform: "Kick", duration: "3:22", date: "3 days ago" },
              { title: "Bank Heist Gone Wrong", platform: "TikTok", duration: "0:58", date: "4 days ago" },
              { title: "Community Night Highlights", platform: "YouTube", duration: "8:14", date: "5 days ago" },
              { title: "Pro vs. Chat — The Rematch", platform: "Twitch", duration: "1:15:30", date: "1 week ago" },
            ].map((clip) => (
              <div key={clip.title} className="card group overflow-hidden">
                <div className="aspect-video bg-surface relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-dots opacity-30" />
                  <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5 text-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 right-2 text-data bg-void/80 px-2 py-0.5 rounded text-xs">{clip.duration}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold mb-1 group-hover:text-foreground transition-colors">{clip.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{clip.platform}</span>
                    <span className="text-xs text-dim">{clip.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://youtube.com/@ProzilliGaming" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              View All on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ====== POWERED BY PRISMAI ====== */}
      <section className="py-24 bg-base border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-raised p-10 md:p-16 text-center">
            <div className="powered-by-prismai mx-auto mb-6 w-fit">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" opacity="0.3" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Powered by PRISMAI
            </div>
            <h2 className="text-headline mb-4">How Multi-Platform Streaming Works</h2>
            <p className="text-body-lg max-w-3xl mx-auto mb-10">
              PRISMAI is the custom backend engine that makes simultaneous 9-platform streaming possible.
              It manages OAuth tokens for every platform, syncs chat through LISA, processes webhooks
              for real-time alerts, handles token refresh cycles, and routes events across the entire
              ecosystem. When you see the same stream on Twitch, YouTube, and Kick at the same time
              with LISA responding in every chat — that&apos;s PRISMAI at work.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Token Management", desc: "Auto-refresh OAuth across 9 platforms with AES-256-GCM encryption at rest", icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" },
                { label: "Webhook Pipeline", desc: "Real-time event processing from Twitch, PayPal, Stripe, Fourthwall, and more", icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" },
                { label: "LISA AI Bridge", desc: "Single AI personality present in every chat, every platform, simultaneously", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" },
              ].map((item) => (
                <div key={item.label} className="card p-5 text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-electric/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-electric" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold mb-1">{item.label}</h3>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
