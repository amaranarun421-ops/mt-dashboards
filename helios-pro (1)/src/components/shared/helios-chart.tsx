"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type HeliosChartProps = {
  options: ApexCharts.ApexOptions;
  series: ApexCharts.ApexOptions["series"];
  type: ApexChartType;
  height?: number | string;
  className?: string;
};

type ApexChartType =
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "radar"
  | "scatter"
  | "heatmap"
  | "candlestick"
  | "bubble"
  | "polarArea"
  | "treemap"
  | "boxPlot";

const heliosColors = [
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#0ea5e9",
  "#f43f5e",
  "#06b6d4",
  "#fb7185",
  "#a78bfa",
];

export function HeliosChart({
  options,
  series,
  type,
  height = 320,
  className,
}: HeliosChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const mergedOptions: ApexCharts.ApexOptions = React.useMemo(
    () => ({
      chart: {
        background: "transparent",
        fontFamily: "inherit",
        foreColor: isDark ? "#94a3b8" : "#64748b",
        toolbar: { show: false },
        ...(options.chart || {}),
      },
      colors: options.colors || heliosColors,
      grid: {
        borderColor: isDark ? "#27303e" : "#e6ebf1",
        strokeDashArray: 4,
        ...(options.grid || {}),
      },
      legend: {
        show: true,
        position: "bottom",
        fontSize: "12px",
        fontWeight: 500,
        labels: { colors: isDark ? "#94a3b8" : "#64748b" },
        markers: { size: 6, offsetX: -2 },
        itemMargin: { horizontal: 8, vertical: 4 },
        ...(options.legend || {}),
      },
      tooltip: {
        theme: isDark ? "dark" : "light",
        ...(options.tooltip || {}),
      },
      dataLabels: { enabled: false, ...(options.dataLabels || {}) },
      stroke: { curve: "smooth", width: 2, ...(options.stroke || {}) },
      ...options,
    }),
    [options, isDark],
  );

  return (
    <div className={className} style={{ height }}>
      <Chart options={mergedOptions} series={series} type={type} height="100%" />
    </div>
  );
}

export const heliosChartColors = heliosColors;
