"use client";

import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { HeliosChart, heliosChartColors } from "@/components/shared/helios-chart";
import {
  ActivityIcon,
  RadioIcon,
  GaugeIcon,
  ServerIcon,
} from "@/components/Layouts/sidebar/icons";

type Point = { x: string; y: number };

const MAX_POINTS = 30;

function makeInitial(): Point[] {
  const now = Date.now();
  return Array.from({ length: MAX_POINTS }, (_, i) => ({
    x: new Date(now - (MAX_POINTS - i) * 2000).toISOString(),
    y: Math.round(420 + Math.sin(i / 3) * 60 + Math.random() * 30),
  }));
}

function makeNext(prev: Point[]): Point[] {
  const last = prev[prev.length - 1]?.y ?? 480;
  const drift = Math.sin(Date.now() / 8000) * 12;
  const next = Math.max(180, Math.min(900, Math.round(last + drift + (Math.random() - 0.5) * 80)));
  const point = { x: new Date().toISOString(), y: next };
  return [...prev.slice(1), point];
}

function useNowTicker(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function Ticker({ value, suffix }: { value: number; suffix?: string }) {
  const prev = useRef(value);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  useEffect(() => {
    if (value > prev.current) setFlash("up");
    else if (value < prev.current) setFlash("down");
    prev.current = value;
    const id = setTimeout(() => setFlash(null), 400);
    return () => clearTimeout(id);
  }, [value]);
  return (
    <span
      className={`font-mono text-2xl font-bold tabular-nums transition-colors ${
        flash === "up"
          ? "text-primary dark:text-primary-light"
          : flash === "down"
            ? "text-red dark:text-red-light"
            : "text-dark dark:text-white"
      }`}
    >
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function RealtimeMetricsClient() {
  const [series, setSeries] = useState<Point[]>(makeInitial);
  const [throughput, setThroughput] = useState(4820);
  const [errors, setErrors] = useState(2);
  const [running, setRunning] = useState(true);
  const now = useNowTicker(1000);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeries((prev) => makeNext(prev));
      setThroughput(() => Math.round(4400 + Math.random() * 800));
      setErrors(() => Math.random() < 0.18 ? Math.floor(Math.random() * 6) : 0);
    }, 2000);
    return () => clearInterval(id);
  }, [running]);

  const last = series[series.length - 1]?.y ?? 0;
  const avg = Math.round(series.reduce((a, p) => a + p.y, 0) / series.length);
  const peak = Math.max(...series.map((p) => p.y));

  return (
    <div>
      <PageHeader
        title="Realtime Metrics"
        description="Live, simulated 2-second data updates with a moving ticker and status indicator."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "Realtime" },
        ]}
        actions={
          <>
            <Button
              variant={running ? "outline" : "primary"}
              size="sm"
              onClick={() => setRunning((r) => !r)}
            >
              {running ? "Pause" : "Resume"}
            </Button>
            <Badge variant={running ? "success" : "warning"}>
              <span className={`mr-1 inline-block size-2 rounded-full ${running ? "bg-primary" : "bg-accent"} ${running ? "animate-pulse" : ""}`} />
              {running ? "LIVE" : "PAUSED"}
            </Badge>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-dark-5 dark:text-dark-6">Current Value</span>
            <ActivityIcon className="size-5 text-primary" />
          </div>
          <div className="mt-2"><Ticker value={last} /></div>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">requests / second</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-dark-5 dark:text-dark-6">Rolling Average</span>
            <GaugeIcon className="size-5 text-accent" />
          </div>
          <div className="mt-2"><Ticker value={avg} /></div>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">last 60s window</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-dark-5 dark:text-dark-6">Peak</span>
            <RadioIcon className="size-5 text-violet" />
          </div>
          <div className="mt-2"><Ticker value={peak} /></div>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">session high</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-dark-5 dark:text-dark-6">Errors (last 2s)</span>
            <ServerIcon className="size-5 text-red" />
          </div>
          <div className="mt-2"><Ticker value={errors} /></div>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{errors === 0 ? "healthy" : "investigating"}</p>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard
          title="Live Request Volume"
          subtitle="Updates every 2 seconds · 30-point window"
          className="xl:col-span-2"
          action={
            <span className="inline-flex items-center gap-2 text-xs text-dark-5 dark:text-dark-6">
              <span className="inline-block size-2 animate-pulse rounded-full bg-primary" />
              {now.toLocaleTimeString()}
            </span>
          }
        >
          <HeliosChart
            type="area"
            height={340}
            options={{
              chart: { animations: { enabled: true, dynamicAnimation: { speed: 800 } } },
              xaxis: { type: "datetime", labels: { datetimeUTC: false, format: "HH:mm:ss" } },
              stroke: { curve: "smooth", width: 2 },
              fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
              markers: { size: 0 },
              grid: { strokeDashArray: 4 },
              legend: { show: false },
              tooltip: { x: { format: "HH:mm:ss" } },
              yaxis: { min: 100, max: 1000 },
              colors: [heliosChartColors[0]],
            }}
            series={[{ name: "rps", data: series }]}
          />
        </ChartCard>

        <Card>
          <CardHeader
            title="System Status"
            subtitle="Service health snapshot"
            action={
              <Badge variant="success">
                <span className="mr-1 inline-block size-2 animate-pulse rounded-full bg-primary" />
                All systems go
              </Badge>
            }
          />
          <ul className="space-y-3">
            {([
              { label: "API Gateway", value: "204ms", status: "Operational", tone: "success" },
              { label: "Database", value: "42ms", status: "Operational", tone: "success" },
              { label: "Cache Layer", value: "8ms", status: "Operational", tone: "success" },
              { label: "Queue Workers", value: "12 jobs", status: "Operational", tone: "success" },
              { label: "Edge CDN", value: "Live", status: "Operational", tone: "success" },
              { label: "Webhooks", value: `${errors} failed`, status: errors === 0 ? "Operational" : "Degraded", tone: errors === 0 ? "success" : "warning" },
            ] as { label: string; value: string; status: string; tone: "success" | "warning" | "danger" | "info" | "primary" | "neutral" }[]).map((s) => (
              <li key={s.label} className="flex items-center justify-between rounded-xl border border-stroke p-3 dark:border-dark-3">
                <div>
                  <p className="text-sm font-semibold text-dark dark:text-white">{s.label}</p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">{s.value}</p>
                </div>
                <Badge variant={s.tone}>{s.status}</Badge>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-dark-5 dark:text-dark-6">
            Throughput: <span className="font-semibold text-dark dark:text-white">{throughput.toLocaleString()}/min</span> · Updated {now.toLocaleTimeString()}
          </p>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader
          title="Throughput Strip"
          subtitle="Per-second throughput bars (last 30 ticks)"
          action={<Badge variant="info">{MAX_POINTS}s window</Badge>}
        />
        <HeliosChart
          type="bar"
          height={180}
          options={{
            chart: { animations: { enabled: true, dynamicAnimation: { speed: 600 } } },
            xaxis: { type: "datetime", labels: { datetimeUTC: false, format: "HH:mm:ss" } },
            plotOptions: { bar: { columnWidth: "55%", borderRadius: 3, borderRadiusApplication: "end" } },
            stroke: { show: false },
            legend: { show: false },
            dataLabels: { enabled: false },
            yaxis: { show: false },
            colors: [heliosChartColors[1]],
          }}
          series={[{ name: "Throughput", data: series }]}
        />
      </Card>
    </div>
  );
}
