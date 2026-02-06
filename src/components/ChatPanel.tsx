"use client";

import { useState } from "react";

// Platform configurations
const CHAT_PLATFORMS = [
  {
    id: "twitch",
    name: "Twitch",
    color: "#9146FF",
    embedUrl: "https://www.twitch.tv/embed/ProzilliGaming/chat?parent=prozilligaming.com&darkpopout",
    hasEmbed: true,
  },
  {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    embedUrl: null,
    hasEmbed: false,
    fallbackUrl: "https://youtube.com/@prozilligaming",
  },
  {
    id: "kick",
    name: "Kick",
    color: "#53FC18",
    embedUrl: "https://kick.com/popout/prozilligaming/chat",
    hasEmbed: true,
  },
  {
    id: "trovo",
    name: "Trovo",
    color: "#19D66B",
    embedUrl: null,
    hasEmbed: false,
    fallbackUrl: "https://trovo.live/ProzilliGaming",
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    embedUrl: null,
    hasEmbed: false,
    fallbackUrl: "https://facebook.com/ProzilliGaming",
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#000000",
    embedUrl: null,
    hasEmbed: false,
    fallbackUrl: "https://tiktok.com/@prozilligaming",
  },
  {
    id: "multi",
    name: "All Chats",
    color: "#c4a265",
    embedUrl: null,
    hasEmbed: false,
    isMulti: true,
  },
];

// Platform Logo Components
function TwitchLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  );
}

function YouTubeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function KickLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.333 0v24H8v-8l2.667 2.667L16 24h6.667L16 17.333 22.667 8H16l-5.333 5.333V0z" />
    </svg>
  );
}

function FacebookLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function TrovoLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 6v12h6v-2H2V8h4V6zm24 0v12h-6v-2h4V8h-4V6zM9 8h6v2h-2v6h-2v-6H9z" />
    </svg>
  );
}

function MultiChatLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
      <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
    </svg>
  );
}

function getPlatformLogo(id: string, className?: string) {
  switch (id) {
    case "twitch":
      return <TwitchLogo className={className} />;
    case "youtube":
      return <YouTubeLogo className={className} />;
    case "kick":
      return <KickLogo className={className} />;
    case "trovo":
      return <TrovoLogo className={className} />;
    case "facebook":
      return <FacebookLogo className={className} />;
    case "tiktok":
      return <TikTokLogo className={className} />;
    case "multi":
      return <MultiChatLogo className={className} />;
    default:
      return null;
  }
}

export default function ChatPanel() {
  const [activeChat, setActiveChat] = useState("twitch");

  const activePlatform = CHAT_PLATFORMS.find((p) => p.id === activeChat);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Tabs */}
      <div className="flex gap-1 mb-2">
        {CHAT_PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setActiveChat(platform.id)}
            className={`flex-1 flex items-center justify-center px-2 py-2.5 rounded-t-lg text-xs font-semibold transition-all ${
              activeChat === platform.id
                ? "bg-white/10 text-white border-b-2"
                : "bg-white/5 text-muted hover:bg-white/8"
            }`}
            style={{
              borderColor: activeChat === platform.id ? platform.color : "transparent",
              color: activeChat === platform.id ? platform.color : undefined,
            }}
            title={platform.name}
          >
            {getPlatformLogo(platform.id, "w-5 h-5")}
          </button>
        ))}
      </div>

      {/* Chat Content */}
      <div
        className="rounded-xl rounded-tl-none flex-1 relative isolate bg-[#18181b]"
        style={{ minHeight: "400px" }}
      >
        {/* Twitch Chat */}
        {activeChat === "twitch" && activePlatform?.hasEmbed && (
          <iframe
            src={activePlatform.embedUrl!}
            className="w-full h-full block absolute inset-0"
            title="Twitch Chat"
            style={{ border: "none" }}
          />
        )}

        {/* YouTube Chat - No native embed without video ID */}
        {activeChat === "youtube" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <YouTubeLogo className="w-12 h-12 text-[#FF0000] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">YouTube Live Chat</h3>
            <p className="text-sm text-muted mb-4 max-w-xs">
              YouTube chat requires an active livestream. Open YouTube to chat during live broadcasts.
            </p>
            <a
              href="https://youtube.com/@prozilligaming"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#FF0000] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Open YouTube
            </a>
          </div>
        )}

        {/* Kick Chat */}
        {activeChat === "kick" && activePlatform?.hasEmbed && (
          <iframe
            src={activePlatform.embedUrl!}
            className="w-full h-full block absolute inset-0"
            title="Kick Chat"
            style={{ border: "none" }}
          />
        )}

        {/* Trovo Chat */}
        {activeChat === "trovo" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <TrovoLogo className="w-12 h-12 text-[#19D66B] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Trovo Live Chat</h3>
            <p className="text-sm text-muted mb-4 max-w-xs">
              Trovo chat is available during live broadcasts. Join the conversation on Trovo.
            </p>
            <a
              href="https://trovo.live/ProzilliGaming"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#19D66B] px-6 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Open Trovo
            </a>
          </div>
        )}

        {/* Facebook Chat */}
        {activeChat === "facebook" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <FacebookLogo className="w-12 h-12 text-[#1877F2] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Facebook Gaming Chat</h3>
            <p className="text-sm text-muted mb-4 max-w-xs">
              Facebook chat is available during live broadcasts on the Facebook Gaming page.
            </p>
            <a
              href="https://facebook.com/ProzilliGaming"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#1877F2] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Open Facebook
            </a>
          </div>
        )}

        {/* TikTok Chat */}
        {activeChat === "tiktok" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <TikTokLogo className="w-12 h-12 text-white mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">TikTok Live Chat</h3>
            <p className="text-sm text-muted mb-4 max-w-xs">
              TikTok chat is available in the TikTok app during live broadcasts.
            </p>
            <a
              href="https://tiktok.com/@prozilligaming"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gradient-to-r from-[#00f2ea] to-[#ff0050] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Open TikTok
            </a>
          </div>
        )}

        {/* Multi-Chat View - Aggregated read-only feed */}
        {activeChat === "multi" && (
          <div className="absolute inset-0 flex flex-col">
            {/* Multi-chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MultiChatLogo className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
                  All Platforms
                </span>
              </div>
              <span className="text-xs text-muted">Read-only • Powered by PRISMAI</span>
            </div>

            {/* Chat messages feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Placeholder messages - will be populated by PRISMAI */}
              <div className="flex items-start gap-3 animate-pulse">
                <div className="w-6 h-6 rounded bg-white/10" />
                <div className="flex-1">
                  <div className="h-3 w-24 rounded bg-white/10 mb-2" />
                  <div className="h-3 w-full rounded bg-white/5" />
                </div>
              </div>
              <div className="flex items-start gap-3 animate-pulse">
                <div className="w-6 h-6 rounded bg-white/10" />
                <div className="flex-1">
                  <div className="h-3 w-32 rounded bg-white/10 mb-2" />
                  <div className="h-3 w-3/4 rounded bg-white/5" />
                </div>
              </div>
              <div className="flex items-start gap-3 animate-pulse">
                <div className="w-6 h-6 rounded bg-white/10" />
                <div className="flex-1">
                  <div className="h-3 w-20 rounded bg-white/10 mb-2" />
                  <div className="h-3 w-5/6 rounded bg-white/5" />
                </div>
              </div>

              {/* Connection status */}
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
                  <span className="text-xs font-medium text-brand-gold">Connecting to PRISMAI...</span>
                </div>
                <p className="text-xs text-muted max-w-xs">
                  Unified chat feed from Twitch, YouTube, Kick, Facebook, and TikTok will appear here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Footer */}
      <div className="mt-2 text-center">
        <p className="text-xs text-muted">
          Chat synced across all platforms via{" "}
          <span className="text-brand-gold">PRISMAI</span>
        </p>
      </div>
    </div>
  );
}
