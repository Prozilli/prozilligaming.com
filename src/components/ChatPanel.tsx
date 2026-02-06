"use client";

function TwitchLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  );
}

export default function ChatPanel() {
  return (
    <div className="glass-strong glow-border flex flex-col rounded-xl overflow-hidden h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-brand-darker/50 shrink-0 border-b border-white/5">
        <div className="flex items-center gap-2">
          <TwitchLogo className="w-4 h-4 text-[#9146FF]" />
          <span className="text-xs font-semibold text-white">Twitch Chat</span>
        </div>
        <a
          href="https://twitch.tv/popout/prozilligaming/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted hover:text-white"
        >
          Pop out ↗
        </a>
      </div>

      {/* Twitch Chat Embed */}
      <div className="flex-1 bg-[#18181b]">
        <iframe
          src="https://www.twitch.tv/embed/ProzilliGaming/chat?parent=prozilligaming.com&darkpopout"
          className="w-full h-full block"
          title="Twitch Chat"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}
