"use client";

interface HeatMapEntry {
  hour: number;
  messages: number;
  uniqueUsers: number;
}

interface HeatMapProps {
  data: HeatMapEntry[];
}

export default function HeatMap({ data }: HeatMapProps) {
  // Fill all 24 hours
  const hours = Array.from({ length: 24 }, (_, i) => {
    const entry = data.find((d) => d.hour === i);
    return { hour: i, messages: entry?.messages || 0, uniqueUsers: entry?.uniqueUsers || 0 };
  });

  const max = Math.max(...hours.map((h) => h.messages), 1);

  const formatHour = (h: number) => {
    if (h === 0) return "12a";
    if (h < 12) return h + "a";
    if (h === 12) return "12p";
    return (h - 12) + "p";
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-1.5">
        {hours.map((h) => {
          const intensity = h.messages / max;
          // Color from dark to bright red
          const r = Math.round(40 + intensity * 200);
          const g = Math.round(10 + intensity * 30);
          const b = Math.round(15 + intensity * 20);
          const alpha = 0.3 + intensity * 0.7;

          return (
            <div
              key={h.hour}
              className="flex flex-col items-center justify-center rounded-md p-2 transition-all hover:scale-105"
              style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})` }}
              title={`${formatHour(h.hour)}: ${h.messages} msgs, ${h.uniqueUsers} users`}
            >
              <span className="text-[10px] text-white/60">{formatHour(h.hour)}</span>
              <span className="text-xs font-bold text-white">{h.messages}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-muted">Low activity</span>
        <div className="flex gap-0.5">
          {[0.2, 0.4, 0.6, 0.8, 1].map((i) => (
            <div
              key={i}
              className="h-2 w-4 rounded-sm"
              style={{ backgroundColor: `rgba(${Math.round(40 + i * 200)}, ${Math.round(10 + i * 30)}, ${Math.round(15 + i * 20)}, ${0.3 + i * 0.7})` }}
            />
          ))}
        </div>
        <span className="text-[10px] text-muted">High activity</span>
      </div>
    </div>
  );
}
