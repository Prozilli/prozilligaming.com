"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ── Platform config ──────────────────────────────────────────────

const PLATFORMS: Record<string, { color: string; name: string }> = {
  twitch: { color: "#9146FF", name: "Twitch" },
  youtube: { color: "#FF0000", name: "YouTube" },
  kick: { color: "#53FC18", name: "Kick" },
  trovo: { color: "#19D65C", name: "Trovo" },
  discord: { color: "#5865F2", name: "Discord" },
};

function PlatformDot({ platform }: { platform: string }) {
  const color = PLATFORMS[platform]?.color || "#888";
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ backgroundColor: color }}
      title={PLATFORMS[platform]?.name || platform}
    />
  );
}

// ── Types ────────────────────────────────────────────────────────

interface ChatMessage {
  id?: string | number;
  platform: string;
  channel?: string;
  user: string;
  userId?: string;
  message: string;
  timestamp: string;
}

type FilterTab = "all" | string;

// ── ChatPanel ────────────────────────────────────────────────────

const PRISMAI_API = "/api/prismai";
const POLL_INTERVAL = 3000;

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showTwitchEmbed, setShowTwitchEmbed] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdSet = useRef(new Set<string>());

  // Add a message, dedup by key
  const addMessages = useCallback((newMsgs: ChatMessage[]) => {
    setMessages((prev) => {
      const combined = [...prev];
      for (const msg of newMsgs) {
        const key = `${msg.platform}:${msg.user}:${msg.timestamp}:${msg.message?.slice(0, 30)}`;
        if (!msgIdSet.current.has(key)) {
          msgIdSet.current.add(key);
          combined.push(msg);
        }
      }
      // Keep last 500 messages
      if (combined.length > 500) {
        const removed = combined.splice(0, combined.length - 500);
        for (const r of removed) {
          const k = `${r.platform}:${r.user}:${r.timestamp}:${r.message?.slice(0, 30)}`;
          msgIdSet.current.delete(k);
        }
      }
      return combined;
    });
  }, []);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  // Detect user scroll position
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    setAutoScroll(atBottom);
  }, []);

  // Connect via SSE, fall back to polling
  useEffect(() => {
    let es: EventSource | null = null;
    let pollTimer: ReturnType<typeof setInterval> | null = null;
    let lastTimestamp = "";
    let dead = false;

    function startSSE() {
      try {
        es = new EventSource(`${PRISMAI_API}/chat/stream`);

        es.onopen = () => {
          if (!dead) setIsConnected(true);
        };

        es.onmessage = (event) => {
          if (dead) return;
          try {
            const data = JSON.parse(event.data);

            if (data.type === "init" && Array.isArray(data.messages)) {
              addMessages(data.messages);
              if (data.messages.length > 0) {
                lastTimestamp = data.messages[data.messages.length - 1].timestamp;
              }
            } else if (data.type === "platforms" && Array.isArray(data.platforms)) {
              setConnectedPlatforms(
                data.platforms.filter((p: { connected: boolean }) => p.connected).map((p: { name: string }) => p.name)
              );
            } else if (data.type === "chat") {
              addMessages([data]);
              lastTimestamp = data.timestamp;
            }
            // follow, sub, donation, raid events — could render as special messages
          } catch {
            // ignore parse errors
          }
        };

        es.onerror = () => {
          if (dead) return;
          setIsConnected(false);
          es?.close();
          es = null;
          // Fall back to polling
          startPolling();
        };
      } catch {
        startPolling();
      }
    }

    function startPolling() {
      if (dead || pollTimer) return;

      // Initial fetch
      fetchMessages();

      pollTimer = setInterval(() => {
        if (!dead) fetchMessages();
      }, POLL_INTERVAL);
    }

    async function fetchMessages() {
      try {
        const sinceParam = lastTimestamp ? `&since=${encodeURIComponent(lastTimestamp)}` : "";
        const res = await fetch(`${PRISMAI_API}/chat?limit=100${sinceParam}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.messages?.length > 0) {
          addMessages(data.messages);
          lastTimestamp = data.messages[data.messages.length - 1].timestamp;
        }
        setIsConnected(true);

        // Also fetch platforms
        const pRes = await fetch(`${PRISMAI_API}/platforms`);
        if (pRes.ok) {
          const pData = await pRes.json();
          setConnectedPlatforms(
            pData.platforms?.filter((p: { connected: boolean }) => p.connected).map((p: { name: string }) => p.name) || []
          );
        }
      } catch {
        setIsConnected(false);
      }
    }

    startSSE();

    return () => {
      dead = true;
      es?.close();
      if (pollTimer) clearInterval(pollTimer);
    };
  }, [addMessages]);

  // Filtered messages
  const filtered = filter === "all"
    ? messages
    : messages.filter((m) => m.platform === filter);

  // Available filter tabs based on connected platforms
  const tabs: FilterTab[] = ["all", ...connectedPlatforms.filter((p) => p in PLATFORMS)];

  return (
    <div className="glass-strong glow-border flex flex-col rounded-xl overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-brand-darker/50 shrink-0 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-green-400" : "bg-red-500"}`} />
          <span className="text-xs font-semibold text-white">
            {showTwitchEmbed ? "Twitch Chat" : "Live Chat"}
          </span>
          {!showTwitchEmbed && connectedPlatforms.length > 0 && (
            <span className="text-[10px] text-muted">
              {connectedPlatforms.length} platform{connectedPlatforms.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowTwitchEmbed(!showTwitchEmbed)}
          className="text-[10px] text-muted hover:text-white transition-colors"
        >
          {showTwitchEmbed ? "Cross-platform" : "Twitch embed"}
        </button>
      </div>

      {showTwitchEmbed ? (
        /* Twitch iframe fallback */
        <div className="flex-1 bg-[#18181b]">
          <iframe
            src="https://www.twitch.tv/embed/ProzilliGaming/chat?parent=prozilligaming.com&darkpopout"
            className="w-full h-full block"
            title="Twitch Chat"
            style={{ border: "none" }}
          />
        </div>
      ) : (
        <>
          {/* Platform filter tabs */}
          {tabs.length > 2 && (
            <div className="flex items-center gap-1 px-2 py-1.5 border-b border-white/5 overflow-x-auto shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors whitespace-nowrap ${
                    filter === tab
                      ? "bg-white/10 text-white"
                      : "text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab === "all" ? (
                    "All"
                  ) : (
                    <>
                      <PlatformDot platform={tab} />
                      {PLATFORMS[tab]?.name || tab}
                    </>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Messages (virtualized — only renders visible window) */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-2 py-1 scrollbar-thin"
          >
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-xs text-muted text-center px-4">
                  {isConnected
                    ? "No messages yet. Chat will appear here during live streams."
                    : "Connecting to PRISMAI..."}
                </p>
              </div>
            ) : (
              <VirtualizedMessages messages={filtered} scrollRef={scrollRef} />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* New messages indicator */}
          {!autoScroll && (
            <button
              onClick={() => {
                setAutoScroll(true);
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-red/90 text-white text-[10px] font-medium shadow-lg hover:bg-brand-red transition-colors z-10"
            >
              New messages
            </button>
          )}

          {/* Footer: connected platforms */}
          <div className="flex items-center gap-2 px-3 py-1.5 border-t border-white/5 shrink-0">
            <div className="flex items-center gap-1">
              {connectedPlatforms
                .filter((p) => p in PLATFORMS)
                .map((p) => (
                  <PlatformDot key={p} platform={p} />
                ))}
            </div>
            <span className="text-[9px] text-muted">
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

// ── Virtualized message list ──────────────────────────────────────
// Only renders messages visible in the scroll viewport + a small buffer.
// Each row is ~24px. We render 80 items max in the DOM at a time.

const ROW_HEIGHT = 24;
const OVERSCAN = 20;

function VirtualizedMessages({
  messages,
  scrollRef,
}: {
  messages: ChatMessage[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 80 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function recalc() {
      const scrollTop = el!.scrollTop;
      const viewportH = el!.clientHeight;
      const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
      const visible = Math.ceil(viewportH / ROW_HEIGHT);
      const end = Math.min(messages.length, start + visible + OVERSCAN * 2);
      setVisibleRange({ start, end });
    }

    recalc();
    el.addEventListener("scroll", recalc, { passive: true });
    return () => el.removeEventListener("scroll", recalc);
  }, [messages.length, scrollRef]);

  const totalHeight = messages.length * ROW_HEIGHT;
  const offsetY = visibleRange.start * ROW_HEIGHT;

  return (
    <div style={{ height: totalHeight, position: "relative" }}>
      <div style={{ position: "absolute", top: offsetY, left: 0, right: 0 }}>
        {messages.slice(visibleRange.start, visibleRange.end).map((msg, i) => (
          <ChatBubble
            key={`${msg.platform}-${msg.timestamp}-${visibleRange.start + i}`}
            msg={msg}
          />
        ))}
      </div>
    </div>
  );
}

// ── Individual chat message ──────────────────────────────────────

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const platformColor = PLATFORMS[msg.platform]?.color || "#888";

  const time = (() => {
    try {
      return new Date(msg.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  })();

  return (
    <div className="group flex items-start gap-1.5 px-1 py-0.5 rounded hover:bg-white/[0.03] transition-colors">
      <PlatformDot platform={msg.platform} />
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-semibold mr-1" style={{ color: platformColor }}>
          {msg.user}
        </span>
        <span className="text-[11px] text-white/80 break-words">{msg.message}</span>
      </div>
      <span className="text-[9px] text-white/20 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {time}
      </span>
    </div>
  );
}
