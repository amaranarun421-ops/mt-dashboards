"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { StatCard } from "@/components/shared/stat-card";
import { HeliosChart, heliosChartColors } from "@/components/shared/helios-chart";
import { CandlestickIcon } from "@/components/Layouts/sidebar/icons";

type Candle = { x: string; y: [number, number, number, number] };

// 20 trading days of synthetic OHLC for HLPX token
const candles: Candle[] = [
  { x: "2024-01-02", y: [104.2, 106.8, 103.1, 105.4] },
  { x: "2024-01-03", y: [105.4, 108.2, 104.9, 107.6] },
  { x: "2024-01-04", y: [107.6, 109.4, 106.2, 106.9] },
  { x: "2024-01-05", y: [106.9, 107.8, 104.1, 104.7] },
  { x: "2024-01-08", y: [104.7, 106.0, 102.8, 103.5] },
  { x: "2024-01-09", y: [103.5, 105.4, 102.1, 104.9] },
  { x: "2024-01-10", y: [104.9, 108.2, 104.4, 107.8] },
  { x: "2024-01-11", y: [107.8, 110.4, 107.1, 109.6] },
  { x: "2024-01-12", y: [109.6, 112.0, 108.7, 111.4] },
  { x: "2024-01-15", y: [111.4, 113.6, 110.2, 112.0] },
  { x: "2024-01-16", y: [112.0, 112.4, 109.0, 109.6] },
  { x: "2024-01-17", y: [109.6, 111.2, 108.4, 110.2] },
  { x: "2024-01-18", y: [110.2, 112.6, 109.8, 112.0] },
  { x: "2024-01-19", y: [112.0, 114.8, 111.6, 114.1] },
  { x: "2024-01-22", y: [114.1, 116.2, 113.4, 115.7] },
  { x: "2024-01-23", y: [115.7, 117.0, 114.2, 114.6] },
  { x: "2024-01-24", y: [114.6, 115.2, 112.0, 112.7] },
  { x: "2024-01-25", y: [112.7, 114.4, 111.9, 113.8] },
  { x: "2024-01-26", y: [113.8, 116.6, 113.4, 116.1] },
  { x: "2024-01-29", y: [116.1, 118.4, 115.8, 117.9] },
];

// 7-day moving average of close prices
function movingAverage(data: Candle[], window: number) {
  return data.map((c, i) => {
    if (i < window - 1) return { x: c.x, y: null as number | null };
    const slice = data.slice(i - window + 1, i + 1);
    const sum = slice.reduce((acc, s) => acc + s.y[3], 0);
    return { x: c.x, y: Number((sum / window).toFixed(2)) };
  }).filter((d) => d.y !== null) as { x: string; y: number }[];
}

const ma7 = movingAverage(candles, 7);

// Volume series (in millions)
const volume = candles.map((c) => ({
  x: c.x,
  y: Number((Math.abs(c.y[3] - c.y[0]) * 0.8 + 1.2).toFixed(2)),
}));

const lastClose = candles[candles.length - 1].y[3];
const firstClose = candles[0].y[3];
const periodChange = (((lastClose - firstClose) / firstClose) * 100).toFixed(2);
const periodHigh = Math.max(...candles.map((c) => c.y[1]));
const periodLow = Math.min(...candles.map((c) => c.y[2]));

export default function CandlestickPage() {
  return (
    <div>
      <PageHeader
        title="Candlestick Charts"
        description="OHLC candlesticks with a moving-average overlay and volume bars beneath."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "Candlestick" },
        ]}
        actions={
          <>
            <Badge variant="info">HLPX · NASDAQ</Badge>
            <Badge variant={Number(periodChange) >= 0 ? "success" : "danger"}>
              {Number(periodChange) >= 0 ? "+" : ""}
              {periodChange}%
            </Badge>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Last Close"
          value={`$${lastClose.toFixed(2)}`}
          delta={{ value: `${periodChange}%`, trend: Number(periodChange) >= 0 ? "up" : "down" }}
          tone="primary"
          icon={<CandlestickIcon className="size-5" />}
        />
        <StatCard
          label="Period High"
          value={`$${periodHigh.toFixed(2)}`}
          sublabel="20-day high"
          tone="success"
          icon={<CandlestickIcon className="size-5" />}
        />
        <StatCard
          label="Period Low"
          value={`$${periodLow.toFixed(2)}`}
          sublabel="20-day low"
          tone="danger"
          icon={<CandlestickIcon className="size-5" />}
        />
        <StatCard
          label="Avg Volume"
          value={`${(volume.reduce((a, v) => a + v.y, 0) / volume.length).toFixed(2)}M`}
          sublabel="shares / day"
          tone="accent"
          icon={<CandlestickIcon className="size-5" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6">
        <ChartCard
          title="HLPX — OHLC with MA(7) Overlay"
          subtitle="Daily candles, 20 trading days"
          action={<Badge variant="violet">MA(7)</Badge>}
        >
          <HeliosChart
            type="candlestick"
            height={380}
            options={{
              chart: {
                type: "candlestick",
                animations: { enabled: true },
              },
              plotOptions: {
                candlestick: {
                  colors: { upward: heliosChartColors[0], downward: heliosChartColors[4] },
                  wick: { useFillColor: true },
                },
              },
              stroke: { width: [1, 2], curve: "smooth" },
              xaxis: { type: "datetime", labels: { datetimeUTC: false } },
              yaxis: { tooltip: { enabled: true }, labels: { formatter: (v: number) => `$${v.toFixed(2)}` } },
              legend: { position: "top" },
              tooltip: { shared: true },
            }}
            series={[
              {
                name: "Price",
                type: "candlestick",
                data: candles.map((c) => ({ x: c.x, y: c.y })),
              },
              {
                name: "MA(7)",
                type: "line",
                data: ma7,
              },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Volume"
          subtitle="Daily share volume (millions)"
          action={<Badge variant="info">bars</Badge>}
        >
          <HeliosChart
            type="bar"
            height={180}
            options={{
              chart: { type: "bar" },
              plotOptions: {
                bar: { columnWidth: "60%", borderRadius: 3, borderRadiusApplication: "end", distributed: true },
              },
              xaxis: { type: "datetime", labels: { datetimeUTC: false } },
              yaxis: { labels: { formatter: (v: number) => `${v}M` } },
              legend: { show: false },
              stroke: { show: false },
              fill: {
                type: "gradient",
                gradient: { shade: "dark", type: "vertical", opacityFrom: 0.9, opacityTo: 0.55 },
              },
              colors: candles.map((c) => (c.y[3] >= c.y[0] ? heliosChartColors[0] : heliosChartColors[4])),
              tooltip: { y: { formatter: (v: number) => `${v}M shares` } },
            }}
            series={[
              { name: "Volume", data: volume },
            ]}
          />
        </ChartCard>

        <Card>
          <CardHeader
            title="Recent OHLC Snapshot"
            subtitle="Last 6 trading days"
            action={<Badge variant="primary">6d</Badge>}
          />
          <div className="helios-scroll overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-stroke text-xs uppercase tracking-wider text-dark-5 dark:border-dark-3 dark:text-dark-6">
                  <th className="px-3 py-2 text-left font-semibold">Date</th>
                  <th className="px-3 py-2 text-right font-semibold">Open</th>
                  <th className="px-3 py-2 text-right font-semibold">High</th>
                  <th className="px-3 py-2 text-right font-semibold">Low</th>
                  <th className="px-3 py-2 text-right font-semibold">Close</th>
                  <th className="px-3 py-2 text-right font-semibold">Change</th>
                </tr>
              </thead>
              <tbody>
                {candles.slice(-6).map((c) => {
                  const change = c.y[3] - c.y[0];
                  const pct = ((change / c.y[0]) * 100).toFixed(2);
                  const up = change >= 0;
                  return (
                    <tr key={c.x} className="border-b border-stroke last:border-0 dark:border-dark-3">
                      <td className="px-3 py-2.5 text-dark dark:text-white">{c.x}</td>
                      <td className="px-3 py-2.5 text-right text-dark-7 dark:text-dark-7">{c.y[0].toFixed(2)}</td>
                      <td className="px-3 py-2.5 text-right text-dark-7 dark:text-dark-7">{c.y[1].toFixed(2)}</td>
                      <td className="px-3 py-2.5 text-right text-dark-7 dark:text-dark-7">{c.y[2].toFixed(2)}</td>
                      <td className="px-3 py-2.5 text-right font-semibold text-dark dark:text-white">{c.y[3].toFixed(2)}</td>
                      <td className={`px-3 py-2.5 text-right font-semibold ${up ? "text-primary dark:text-primary-light" : "text-red dark:text-red-light"}`}>
                        {up ? "+" : ""}
                        {pct}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}