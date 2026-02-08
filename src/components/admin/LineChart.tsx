"use client";

interface DataSeries {
  label: string;
  data: number[];
  color: string;
}

interface LineChartProps {
  labels: string[];
  series: DataSeries[];
  height?: number;
}

export default function LineChart({ labels, series, height = 200 }: LineChartProps) {
  if (!series.length || !series[0].data.length) {
    return (
      <div className="flex items-center justify-center text-sm text-muted" style={{ height }}>
        No data
      </div>
    );
  }

  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 600;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Find global min/max across all series
  const allValues = series.flatMap((s) => s.data);
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(...allValues, 0);
  const range = maxVal - minVal || 1;

  const xStep = chartW / Math.max(series[0].data.length - 1, 1);

  const toPoint = (val: number, i: number) => {
    const x = padding.left + i * xStep;
    const y = padding.top + chartH - ((val - minVal) / range) * chartH;
    return { x, y };
  };

  // Y-axis ticks
  const yTicks = 4;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
    minVal + (range * i) / yTicks
  );

  // Show at most 7 x-axis labels
  const labelStep = Math.max(1, Math.ceil(labels.length / 7));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines */}
      {yTickValues.map((val, i) => {
        const y = padding.top + chartH - ((val - minVal) / range) * chartH;
        return (
          <g key={i}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.06)" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="10">
              {val >= 1000 ? (val / 1000).toFixed(1) + "k" : Math.round(val)}
            </text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {labels.map((label, i) => {
        if (i % labelStep !== 0 && i !== labels.length - 1) return null;
        const x = padding.left + i * xStep;
        return (
          <text key={i} x={x} y={height - 6} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
            {label}
          </text>
        );
      })}

      {/* Series */}
      {series.map((s) => {
        const points = s.data.map((val, i) => toPoint(val, i));
        const line = points.map((p) => `${p.x},${p.y}`).join(" ");

        // Area fill
        const areaPoints = [
          `${points[0].x},${padding.top + chartH}`,
          ...points.map((p) => `${p.x},${p.y}`),
          `${points[points.length - 1].x},${padding.top + chartH}`,
        ].join(" ");

        return (
          <g key={s.label}>
            <polygon points={areaPoints} fill={s.color} fillOpacity="0.1" />
            <polyline points={line} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" />
            {/* Dots */}
            {points.length <= 31 && points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3" fill={s.color} />
            ))}
          </g>
        );
      })}

      {/* Legend */}
      {series.length > 1 && series.map((s, i) => (
        <g key={s.label}>
          <rect x={padding.left + i * 120} y={4} width={12} height={3} rx={1.5} fill={s.color} />
          <text x={padding.left + i * 120 + 16} y={9} fill="rgba(255,255,255,0.6)" fontSize="9">
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
