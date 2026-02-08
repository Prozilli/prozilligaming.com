"use client";

interface TimePeriodPickerProps {
  days: number;
  onChange: (days: number) => void;
}

export default function TimePeriodPicker({ days, onChange }: TimePeriodPickerProps) {
  return (
    <div className="inline-flex rounded-lg border border-white/10 overflow-hidden">
      {[7, 30].map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={
            "px-4 py-2 text-xs font-medium transition-colors " +
            (days === d
              ? "bg-brand-red text-white"
              : "text-muted hover:bg-white/5")
          }
        >
          {d}d
        </button>
      ))}
    </div>
  );
}
