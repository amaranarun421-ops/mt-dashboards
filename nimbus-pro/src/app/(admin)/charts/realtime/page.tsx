"use client";
import { Card, CardHeader, CardBody, PageHeader, Badge, Button } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { useEffect, useRef, useState } from "react";
import { Radio, Cpu, MemoryStick, Server, Activity, Download } from "lucide-react";

const MAX_POINTS = 30;

function makeInitial(walk: number, base: number): number[] {
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < MAX_POINTS; i++) {
    v = Math.max(5, Math.min(98, v + (Math.random() - 0.5) * walk));
    out.push(Number(v.toFixed(1)));
  }
  return out;
}

interface MetricState {
  cpu: number[];
  memory: number[];
  rps: number[];
}

export default function RealtimeChartsPage() {
  const [live, setLive] = useState(true);
  const [tick, setTick] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<number>(0);
  const [now, setNow] = useState<number>(0);
  const [data, setData] = useState<MetricState>({
    cpu: makeInitial(8, 42),
    memory: makeInitial(4, 64),
    rps: makeInitial(60, 320),
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nowRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Realtime data ticker (1.5s)
  useEffect(() => {
    if (!live) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setData((prev) => {
        const next = (arr: number[], walk: number, clamp: [number, number]) => {
          const last = arr[arr.length - 1];
          const v = Math.max(clamp[0], Math.min(clamp[1], last + (Math.random() - 0.5) * walk));
          return [...arr.slice(1), Number(v.toFixed(1))];
        };
        return {
          cpu: next(prev.cpu, 12, [5, 98]),
          memory: next(prev.memory, 4, [30, 95]),
          rps: next(prev.rps, 80, [50, 1200]),
        };
      });
      setTick((t) => t + 1);
      setLastUpdated(Date.now());
    }, 1500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [live]);

  // "Now" ticker (1s) — keeps the "X seconds ago" label fresh without impure render calls
  useEffect(() => {
    nowRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      if (nowRef.current) clearInterval(nowRef.current);
    };
  }, []);

  const cpuNow = data.cpu[data.cpu.length - 1];
  const memNow = data.memory[data.memory.length - 1];
  const rpsNow = data.rps[data.rps.length - 1];

  const xLabels = Array.from({ length: MAX_POINTS }, (_, i) => `-${(MAX_POINTS - i) * 1.5}s`);

  const cpuOptions = {
    ...baseChartOptions("area"),
    chart: { ...baseChartOptions("area").chart, animations: { enabled: false } },
    colors: ["#10b981"],
    stroke: { curve: "stepline" as const, width: 2.5 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: xLabels, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 100, labels: { formatter: (v: number) => `${v.toFixed(0)}%` } },
    grid: { borderColor: "#e2e8f0", strokeDashArray: 4 },
    tooltip: { y: { formatter: (v: number) => `${v.toFixed(1)}%` } },
    markers: { size: 0 },
  };

  const memOptions = {
    ...baseChartOptions("area"),
    chart: { ...baseChartOptions("area").chart, animations: { enabled: false } },
    colors: ["#8b5cf6"],
    stroke: { curve: "smooth" as const, width: 2.5 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: xLabels, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 100, labels: { formatter: (v: number) => `${v.toFixed(0)}%` } },
    grid: { borderColor: "#e2e8f0", strokeDashArray: 4 },
    tooltip: { y: { formatter: (v: number) => `${v.toFixed(1)}%` } },
    markers: { size: 0 },
  };

  const rpsOptions = {
    ...baseChartOptions("area"),
    chart: { ...baseChartOptions("area").chart, animations: { enabled: false } },
    colors: ["#f59e0b"],
    stroke: { curve: "smooth" as const, width: 2.5 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: xLabels, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `${v.toFixed(0)}` } },
    grid: { borderColor: "#e2e8f0", strokeDashArray: 4 },
    tooltip: { y: { formatter: (v: number) => `${v.toFixed(0)} req/s` } },
    markers: { size: 0 },
  };

  const secondsAgo = lastUpdated > 0 ? Math.max(0, Math.floor((now - lastUpdated) / 1000)) : 0;

  const toneFor = (v: number, warn: number, danger: number) =>
    v >= danger ? "error" : v >= warn ? "warning" : "success";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Realtime Metrics"
        description="Live-streaming charts that update every 1.5 seconds. Toggle the stream to pause."
        breadcrumbs={[{ label: "Charts" }, { label: "Realtime" }]}
        actions={
          <>
            <Button variant="secondary" size="md" onClick={() => setLive((l) => !l)}>
              <Radio className={`h-4 w-4 ${live ? "text-success-500" : "text-gray-400"}`} />
              {live ? "Streaming" : "Paused"}
            </Button>
            <Button size="md">
              <Download className="h-4 w-4" /> Snapshot
            </Button>
          </>
        }
      />

      {/* Live status bar */}
      <Card className={`border-0 ${live ? "bg-gradient-to-r from-success-500 to-brand-500" : "bg-gradient-to-r from-gray-500 to-gray-600"} text-white`}>
        <CardBody className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />}
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                <p className="text-sm font-bold uppercase tracking-wider">
                  {live ? "LIVE" : "PAUSED"}
                </p>
              </div>
              <p className="text-xs opacity-90">
                Last updated {secondsAgo}s ago · tick #{tick} · 1.5s interval
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider opacity-80">CPU</p>
              <p className="text-xl font-bold">{cpuNow.toFixed(1)}%</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider opacity-80">Memory</p>
              <p className="text-xl font-bold">{memNow.toFixed(1)}%</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider opacity-80">Req/s</p>
              <p className="text-xl font-bold">{rpsNow.toFixed(0)}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 3 realtime charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader
            title="CPU Utilization"
            description="Aggregate across all nodes"
            action={<Badge tone={toneFor(cpuNow, 70, 88) as "success" | "warning" | "error"} variant="soft" dot>{cpuNow.toFixed(1)}%</Badge>}
          />
          <CardBody>
            <NimbusChart options={cpuOptions} series={[{ name: "CPU", data: data.cpu }]} type="area" height={240} />
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Cpu className="h-3.5 w-3.5" /> Stepline · 30-point rolling window · 1.5s cadence
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Memory"
            description="Heap + cache usage"
            action={<Badge tone={toneFor(memNow, 80, 92) as "success" | "warning" | "error"} variant="soft" dot>{memNow.toFixed(1)}%</Badge>}
          />
          <CardBody>
            <NimbusChart options={memOptions} series={[{ name: "Memory", data: data.memory }]} type="area" height={240} />
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <MemoryStick className="h-3.5 w-3.5" /> Smoothed curve · 30-point rolling window
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Requests / sec"
            description="Edge ingress volume"
            action={<Badge tone={toneFor(rpsNow, 900, 1100) as "success" | "warning" | "error"} variant="soft" dot>{rpsNow.toFixed(0)} rps</Badge>}
          />
          <CardBody>
            <NimbusChart options={rpsOptions} series={[{ name: "RPS", data: data.rps }]} type="area" height={240} />
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Server className="h-3.5 w-3.5" /> Smoothed curve · range 0–1200 rps
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Rolling mini-stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Avg CPU (30pt)", value: `${(data.cpu.reduce((a, b) => a + b, 0) / data.cpu.length).toFixed(1)}%`, tone: "text-brand-600 dark:text-brand-400" },
          { label: "Peak CPU", value: `${Math.max(...data.cpu).toFixed(1)}%`, tone: "text-warning-600 dark:text-warning-400" },
          { label: "Avg Memory", value: `${(data.memory.reduce((a, b) => a + b, 0) / data.memory.length).toFixed(1)}%`, tone: "text-purple-600 dark:text-purple-400" },
          { label: "Total Req (window)", value: `${data.rps.reduce((a, b) => a + b, 0).toLocaleString()}`, tone: "text-orange-600 dark:text-orange-400" },
        ].map((m) => (
          <Card key={m.label} hover className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{m.label}</p>
            <p className={`mt-1.5 text-2xl font-bold ${m.tone}`}>{m.value}</p>
            <p className="mt-1 text-xs text-gray-400">rolling 45s window</p>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-warning-50 to-orange-50 dark:from-warning-500/10 dark:to-orange-500/10">
        <CardBody className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
            <Radio className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Streaming architecture note</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              These charts use a 30-point rolling buffer updated by <code className="rounded bg-gray-100 px-1 py-0.5 text-[11px] dark:bg-gray-800">setInterval</code> every 1.5s.
              In production, swap the timer for a WebSocket subscription to push live data points.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
