"use client";
import dynamic from "next/dynamic";
import type { Props as ApexProps } from "react-apexcharts";

// react-apexcharts must be client-only
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export type ChartType =
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
  | "treemap"
  | "polarArea";

// Loosen the options type so callers can spread overrides without TS complaining about
// ApexCharts' strict literal unions (curve, easing, position, theme, etc.).
type LooseApexProps = Omit<ApexProps, "options"> & { options?: Record<string, unknown> };

export function NimbusChart(props: LooseApexProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Chart {...(props as any)} />;
}

// Theme-aware palettes
export const PALETTE = ["#10b981", "#0ea5e9", "#8b5cf6", "#f59e0b", "#f43f5e", "#14b8a6", "#a855f7", "#f97316"];
export const PALETTE_SOFT = ["#a7f3d0", "#bae6fd", "#ddd6fe", "#fde68a", "#fecdd3", "#99f6e4", "#e9d5ff", "#fed7aa"];

export const baseChartOptions = (type: ChartType) => ({
  chart: {
    type,
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    foreColor: "#64748b",
    background: "transparent",
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: "easeinout" as const,
      speed: 600,
      dynamicAnimation: { enabled: true, speed: 280 },
    },
  },
  colors: PALETTE,
  grid: {
    borderColor: "#e2e8f0",
    strokeDashArray: 4,
    padding: { left: 8, right: 8 },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth" as const, width: 2.5 },
  tooltip: {
    theme: "light" as const,
    style: { fontSize: "12px", fontFamily: "Inter" },
  },
  legend: {
    position: "bottom" as const,
    fontSize: "12px",
    markers: { size: 6 },
    itemMargin: { horizontal: 8, vertical: 4 },
  },
});
