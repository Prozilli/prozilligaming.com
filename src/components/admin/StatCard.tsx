"use client";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  prefix?: string;
  color?: string;
}

export default function StatCard({ label, value, change, prefix, color = "text-white" }: StatCardProps) {
  return (
    <div className="glass rounded-lg p-5 text-center">
      <p className={"text-3xl font-bold " + color}>
        {prefix}{typeof value === "number" ? value.toLocaleString() : value}
      </p>
      <p className="mt-1 text-xs text-muted">{label}</p>
      {change !== undefined && change !== null && (
        <p className={"mt-2 text-xs font-medium " + (change >= 0 ? "text-green-400" : "text-red-400")}>
          {change >= 0 ? "\u25B2" : "\u25BC"} {Math.abs(change)}% vs prev period
        </p>
      )}
    </div>
  );
}
