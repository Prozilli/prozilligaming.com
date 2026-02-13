"use client";

interface PlatformBadgeProps {
  name: string;
  isLive?: boolean;
  viewers?: number;
  connected?: boolean;
}

const PLATFORM_COLORS: Record<string, string> = {
  twitch: "#9146FF",
  youtube: "#FF0000",
  kick: "#53FC18",
  trovo: "#19D65C",
  facebook: "#1877F2",
  tiktok: "#FE2C55",
  instagram: "#E1306C",
  x: "#FFFFFF",
  discord: "#5865F2",
};

export default function PlatformBadge({
  name,
  isLive = false,
  viewers,
  connected = true,
}: PlatformBadgeProps) {
  const color = PLATFORM_COLORS[name.toLowerCase()] || "#6b7a8d";

  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={`h-2 w-2 rounded-full ${isLive ? "animate-pulse-live" : ""}`}
        style={{
          backgroundColor: connected ? color : "var(--color-dim)",
          opacity: isLive ? 1 : 0.5,
        }}
      />
      <span className={connected ? "text-foreground" : "text-dim"}>
        {name}
      </span>
      {isLive && viewers !== undefined && (
        <span className="text-data text-xs text-muted">
          {viewers.toLocaleString()}
        </span>
      )}
    </div>
  );
}
