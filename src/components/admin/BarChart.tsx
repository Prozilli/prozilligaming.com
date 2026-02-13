"use client";

interface BarChartEntry {
  label: string;
  value: number;
  icon?: string;
}

interface BarChartProps {
  data: BarChartEntry[];
  color?: string;
}

export default function BarChart({ data, color = "from-brand-red to-brand-gold" }: BarChartProps) {
  if (!data.length) {
    return <p className="text-sm text-muted">No data</p>;
  }

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-3">
      {data.map((entry) => {
        const pct = (entry.value / max) * 100;
        return (
          <div key={entry.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-2 text-sm text-white">
                {entry.icon && <span>{entry.icon}</span>}
                {entry.label}
              </span>
              <span className="text-xs text-muted">{entry.value.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
              <div
                className={"h-full rounded-full bg-gradient-to-r " + color}
                style={{ width: pct + "%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
