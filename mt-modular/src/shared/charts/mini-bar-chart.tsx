'use client';

import * as React from 'react';

/**
 * MiniBarChart — animated SVG bar chart for compact KPI displays.
 * Pure SVG, no ApexCharts dependency.
 *
 * @example
 * <MiniBarChart data={[10, 25, 18, 30, 22]} color="#12B76A" />
 */
export function MiniBarChart({
  data,
  color = '#465FFF',
  height = 36,
  width = 80,
  barWidth = 6,
  gap = 2,
}: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  barWidth?: number;
  gap?: number;
}) {
  const max = Math.max(...data, 1);
  const totalBars = data.length;
  const totalWidth = totalBars * barWidth + (totalBars - 1) * gap;
  const actualWidth = Math.max(width, totalWidth);
  const toY = (v: number) => height - (v / max) * (height - 4) - 2;

  return (
    <svg width={actualWidth} height={height} viewBox={`0 0 ${actualWidth} ${height}`}>
      {data.map((v, i) => {
        const x = i * (barWidth + gap);
        const y = toY(v);
        const h = height - y - 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={Math.max(h, 2)}
            rx={barWidth / 2}
            fill={color}
            style={{
              transformOrigin: `${x + barWidth / 2}px ${height}px`,
              animation: `miniBarGrow 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms both`,
            }}
          >
            <animate attributeName="height" from="0" to={Math.max(h, 2)} dur="600ms" begin={`${i * 50}ms`} fill="freeze" />
            <animate attributeName="y" from={height - 2} to={y} dur="600ms" begin={`${i * 50}ms`} fill="freeze" />
          </rect>
        );
      })}
      <style>{`@keyframes miniBarGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }`}</style>
    </svg>
  );
}

export default MiniBarChart;
