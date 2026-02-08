"use client";

interface EventItem {
  id: number;
  type: string;
  platform: string;
  user: string;
  data: Record<string, unknown>;
  timestamp: string;
}

interface EventFeedProps {
  events: EventItem[];
}

const TYPE_ICONS: Record<string, string> = {
  follow: "\u2795",
  sub: "\u2B50",
  donation: "\uD83D\uDCB0",
  order: "\uD83D\uDED2",
  raid: "\u2694\uFE0F",
};

const PLATFORM_ICONS: Record<string, string> = {
  twitch: "\uD83D\uDFE3",
  youtube: "\uD83D\uDD34",
  kick: "\uD83D\uDFE2",
  trovo: "\uD83D\uDFE1",
  discord: "\uD83D\uDD35",
  facebook: "\uD83D\uDD37",
  fourthwall: "\uD83C\uDFAA",
  paypal: "\uD83C\uDFE6",
  stripe: "\uD83D\uDCB3",
  patreon: "\uD83C\uDFA8",
};

function formatRelativeTime(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + "h ago";
  const days = Math.floor(hours / 24);
  return days + "d ago";
}

function formatAmount(data: Record<string, unknown>) {
  const amount = data.amount as number | undefined;
  if (!amount) return null;
  const currency = (data.currency as string) || "USD";
  return currency === "USD" ? "$" + amount.toFixed(2) : amount.toFixed(2) + " " + currency;
}

export default function EventFeed({ events }: EventFeedProps) {
  if (!events.length) {
    return <p className="text-sm text-muted">No recent events</p>;
  }

  return (
    <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
      {events.map((evt) => {
        const amount = formatAmount(evt.data || {});
        return (
          <div key={evt.id} className="flex items-start gap-3 rounded-lg bg-white/[0.02] p-3">
            <span className="text-lg shrink-0">{TYPE_ICONS[evt.type] || "\u26A1"}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{evt.user || "Unknown"}</span>
                <span className="text-xs text-muted capitalize">{evt.type}</span>
                <span className="text-xs">{PLATFORM_ICONS[evt.platform] || ""}</span>
              </div>
              {amount && (
                <p className="text-sm font-bold text-brand-gold">{amount}</p>
              )}
            </div>
            <span className="shrink-0 text-[10px] text-muted">{formatRelativeTime(evt.timestamp)}</span>
          </div>
        );
      })}
    </div>
  );
}
