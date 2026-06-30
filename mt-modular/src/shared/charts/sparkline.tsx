'use client';

import * as React from 'react';

/**
 * Sparkline — animated SVG mini-line chart used in KPI cards and signal strips.
 *
 * Features:
 *  - Line draw animation (stroke-dashoffset 100 → 0)
 *  - Gradient area fill
 *  - Pulsing endpoint dot
 *  - Custom color support
 *  - No external chart lib dependency (pure SVG)
 *
 * @example
 * <Sparkline data={[10, 20, 15, 30, 25]} color="#465FFF" />
 */
export function Sparkline({
  data,
  color = '#465FFF',
  height = 32,
  width = 80,
}: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}) {
  const id = React.useId();
  const max = Math.max(...data);
  const min = Math.min(...data);
  const rangeVal = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const toX = (i: number) => i * step;
  const toY = (v: number) => height - ((v - min) / rangeVal) * (height - 6) - 3;
  const points = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const areaPath = `M 0,${height} L ${points} L ${width},${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#spark-${id})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset="100"
      >
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="900ms" fill="freeze" begin="150ms" />
      </polyline>
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="2.5" fill={color}>
        <animate attributeName="r" values="2.5;4;2.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default Sparkline;
