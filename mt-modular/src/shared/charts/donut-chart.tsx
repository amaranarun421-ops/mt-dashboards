'use client';

import * as React from 'react';

/**
 * DonutChart — animated SVG donut/pie chart with hoverable segments.
 * Pure SVG, no ApexCharts dependency.
 *
 * Features:
 *  - Animated stroke-dashoffset on mount
 *  - Hover segment to highlight + show tooltip
 *  - Center value displays total or hovered segment value
 *
 * @example
 * <DonutChart
 *   segments={[
 *     { label: 'A', value: 30, color: '#465FFF' },
 *     { label: 'B', value: 70, color: '#12B76A' },
 *   ]}
 *   size={160}
 *   thickness={20}
 * />
 */
export type DonutSegment = {
  label: string;
  value: number;
  color: string;
  centerLabel?: string;
  centerValue?: string;
};

export function DonutChart({
  segments,
  size = 160,
  thickness = 20,
  centerLabel,
  centerValue,
}: {
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const radius = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  let cumulativeOffset = 0;
  const segmentData = segments.map((seg, i) => {
    const fraction = seg.value / total;
    const length = fraction * circumference;
    const offset = cumulativeOffset;
    cumulativeOffset += length;
    return { ...seg, length, offset, fraction, index: i };
  });

  const activeSegment = hovered !== null ? segmentData[hovered] : null;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--border-subtle)" strokeWidth={thickness} />
        {/* Segments */}
        {segmentData.map((seg) => (
          <circle
            key={seg.index}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={hovered === seg.index ? thickness + 4 : thickness}
            strokeDasharray={`${seg.length} ${circumference - seg.length}`}
            strokeDashoffset={-seg.offset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{
              transition: 'stroke-width 200ms ease',
              cursor: 'pointer',
              animation: 'donutFadeIn 700ms ease-out both',
            }}
            onMouseEnter={() => setHovered(seg.index)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>
      {/* Center label */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-semibold tabular-nums text-[var(--text-strong)]">
          {activeSegment ? activeSegment.centerValue || activeSegment.value : centerValue || total}
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
          {activeSegment ? activeSegment.label : centerLabel}
        </span>
      </div>
      <style>{`@keyframes donutFadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

export default DonutChart;
