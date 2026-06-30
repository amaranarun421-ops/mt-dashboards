"use client";
import { Card, CardHeader, CardBody, PageHeader, Badge, Button, StatCard } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { CandlestickChart, TrendingUp, TrendingDown, Activity, Download } from "lucide-react";
import { useMemo, useState } from "react";

type CandlePoint = { x: string; y: [number, number, number, number] };

function buildCandles(days: number, seed: number): { candles: CandlePoint[]; volumes: number[] } {
  const candles: CandlePoint[] = [];
  const volumes: number[] = [];
  let price = 142.5;
  // deterministic pseudo-random based on seed
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    const drift = (rand() - 0.48) * 6;
    const open = price;
    const close = Math.max(80, open + drift);
    const high = Math.max(open, close) + rand() * 3.5;
    const low = Math.min(open, close) - rand() * 3.5;
    candles.push({ x: label, y: [Number(open.toFixed(2)), Number(high.toFixed(2)), Number(low.toFixed(2)), Number(close.toFixed(2))] });
    volumes.push(Math.round(800000 + rand() * 2400000 * (1 + Math.abs(drift) / 6)));
    price = close;
  }
  return { candles, volumes };
}

export default function CandlestickPage() {
  const [range, setRange] = useState<"15d" | "30d" | "60d">("30d");
  const [symbol, setSymbol] = useState<"NMB" | "AUR" | "VX">("NMB");

  const days = range === "15d" ? 15 : range === "30d" ? 30 : 60;
  const seedForSymbol = symbol === "NMB" ? 7 : symbol === "AUR" ? 23 : 51;
  const { candles, volumes } = useMemo(() => buildCandles(days, seedForSymbol), [days, seedForSymbol]);

  const last = candles[candles.length - 1];
  const prev = candles[candles.length - 2];
  const lastClose = last.y[3];
  const prevClose = prev.y[3];
  const change = lastClose - prevClose;
  const changePct = (change / prevClose) * 100;
  const isUp = change >= 0;

  const high52 = Math.max(...candles.map((c) => c.y[1]));
  const low52 = Math.min(...candles.map((c) => c.y[2]));
  const avgVol = Math.round(volumes.reduce((a, b) => a + b, 0) / volumes.length);

  // Candlestick chart
  const candleOptions = {
    ...baseChartOptions("candlestick"),
    colors: ["#10b981"],
    plotOptions: {
      candlestick: {
        colors: { upward: "#10b981", downward: "#f43f5e" },
        wick: { useFillColor: true },
      },
    },
    xaxis: { type: "category" as const, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { tooltip: { enabled: true }, labels: { formatter: (v: number) => `$${v.toFixed(2)}` } },
    tooltip: { x: { format: "dd MMM" } },
  };
  const candleSeries = [{ data: candles }];

  // Volume bars below
  const volumeOptions = {
    ...baseChartOptions("bar"),
    colors: candles.map((c) => (c.y[3] >= c.y[0] ? "#10b981" : "#f43f5e")),
    plotOptions: { bar: { columnWidth: "70%", borderRadius: 2 } },
    xaxis: {
      type: "category" as const,
      categories: candles.map((c) => c.x),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
    yaxis: { labels: { formatter: (v: number) => (v / 1000000).toFixed(1) + "M" } },
    tooltip: { y: { formatter: (v: number) => `${(v / 1000000).toFixed(2)}M shares` } },
    grid: { show: false },
  };
  const volumeSeries = [{ name: "Volume", data: volumes }];

  const rangeBtnClass = (r: "15d" | "30d" | "60d") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      range === r ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;
  const symbolBtnClass = (s: "NMB" | "AUR" | "VX") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      symbol === s ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Candlestick Charts"
        description="OHLC price action with volume bars — built for financial and trading dashboards."
        breadcrumbs={[{ label: "Charts" }, { label: "Candlestick" }]}
        actions={
          <Button size="md">
            <Download className="h-4 w-4" /> Export
          </Button>
        }
      />

      {/* Price summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={`${symbol} · Last Close`}
          value={`$${lastClose.toFixed(2)}`}
          delta={`${isUp ? "+" : ""}${change.toFixed(2)} (${changePct.toFixed(2)}%)`}
          deltaTone={isUp ? "up" : "down"}
          icon={isUp ? TrendingUp : TrendingDown}
          iconTone={isUp ? "success" : "error"}
          footer="vs previous close"
        />
        <StatCard label="Period High" value={`$${high52.toFixed(2)}`} icon={Activity} iconTone="brand" footer={`${days}d high`} />
        <StatCard label="Period Low" value={`$${low52.toFixed(2)}`} icon={Activity} iconTone="error" footer={`${days}d low`} />
        <StatCard label="Avg Volume" value={`${(avgVol / 1000000).toFixed(2)}M`} icon={CandlestickChart} iconTone="purple" footer={`${days}d average`} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Symbol</span>
          {(["NMB", "AUR", "VX"] as const).map((s) => (
            <button key={s} onClick={() => setSymbol(s)} className={symbolBtnClass(s)}>{s}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Range</span>
          {(["15d", "30d", "60d"] as const).map((r) => (
            <button key={r} onClick={() => setRange(r)} className={rangeBtnClass(r)}>{r}</button>
          ))}
        </div>
        <Badge tone={isUp ? "success" : "error"} variant="soft" dot>
          {isUp ? "Bullish" : "Bearish"} session
        </Badge>
      </div>

      {/* Price + volume side-by-side */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title={`${symbol} · OHLC Candlestick`}
            description={`${days}-day price action · green = up day, red = down day`}
            action={<Badge tone="brand" variant="soft">{days} candles</Badge>}
          />
          <CardBody>
            <NimbusChart options={candleOptions} series={candleSeries} type="candlestick" height={420} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Volume"
            description="Daily traded shares"
            action={<Badge tone="purple" variant="soft">{(volumes.reduce((a, b) => a + b, 0) / 1000000).toFixed(1)}M total</Badge>}
          />
          <CardBody>
            <NimbusChart options={volumeOptions} series={volumeSeries} type="bar" height={420} />
          </CardBody>
        </Card>
      </div>

      {/* Recent OHLC table */}
      <Card className="overflow-hidden">
        <CardHeader title="Recent OHLC" description={`Last 8 trading sessions · ${symbol}`} action={<Badge tone="gray" variant="soft">{candles.length} total</Badge>} />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Change</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {candles.slice(-8).reverse().map((c, i) => {
                const idx = candles.length - 8 + i;
                const prevClose = idx > 0 ? candles[idx - 1].y[3] : c.y[0];
                const diff = c.y[3] - prevClose;
                const pct = (diff / prevClose) * 100;
                const up = diff >= 0;
                return (
                  <tr key={c.x}>
                    <td className="font-medium text-gray-900 dark:text-white">{c.x}</td>
                    <td>${c.y[0].toFixed(2)}</td>
                    <td className="text-success-600 dark:text-success-400">${c.y[1].toFixed(2)}</td>
                    <td className="text-error-600 dark:text-error-400">${c.y[2].toFixed(2)}</td>
                    <td className="font-semibold text-gray-900 dark:text-white">${c.y[3].toFixed(2)}</td>
                    <td>
                      <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold ${up ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400" : "bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-400"}`}>
                        {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {up ? "+" : ""}{diff.toFixed(2)} ({pct.toFixed(2)}%)
                      </span>
                    </td>
                    <td className="text-gray-600 dark:text-gray-400">{(volumes[idx] / 1000000).toFixed(2)}M</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-brand-50 dark:from-purple-500/10 dark:to-brand-500/10">
        <CardBody className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-white">
            <CandlestickChart className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Reading candlesticks</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Each candle shows Open · High · Low · Close for one session. Green bodies closed higher than they opened;
              red bodies closed lower. Wicks show the full session range.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
