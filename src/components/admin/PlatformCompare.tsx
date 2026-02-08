"use client";

interface PlatformData {
  platform: string;
  messages: number;
  chatters: number;
  follows: number;
  subs: number;
  donations: number;
  revenue: number;
}

interface PlatformCompareProps {
  data: PlatformData[];
}

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

export default function PlatformCompare({ data }: PlatformCompareProps) {
  if (!data.length) {
    return <p className="text-sm text-muted">No platform data</p>;
  }

  const maxMsg = Math.max(...data.map((d) => d.messages), 1);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Platform</th>
            <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted">Messages</th>
            <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted">Chatters</th>
            <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted">Follows</th>
            <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted">Subs</th>
            <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted">Revenue</th>
            <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted w-32"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => {
            const pct = (p.messages / maxMsg) * 100;
            return (
              <tr key={p.platform} className="border-b border-white/5">
                <td className="py-3">
                  <span className="flex items-center gap-2 capitalize text-white">
                    <span>{PLATFORM_ICONS[p.platform] || "\u26AA"}</span>
                    {p.platform}
                  </span>
                </td>
                <td className="py-3 text-right text-white">{p.messages.toLocaleString()}</td>
                <td className="py-3 text-right text-muted">{p.chatters.toLocaleString()}</td>
                <td className="py-3 text-right text-muted">{p.follows.toLocaleString()}</td>
                <td className="py-3 text-right text-muted">{p.subs.toLocaleString()}</td>
                <td className="py-3 text-right text-brand-gold font-medium">
                  {p.revenue > 0 ? "$" + p.revenue.toFixed(2) : "-"}
                </td>
                <td className="py-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-gold"
                      style={{ width: pct + "%" }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
