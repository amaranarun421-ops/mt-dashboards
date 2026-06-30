"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { HeliosChart, heliosChartColors } from "@/components/shared/helios-chart";
import {
  ActivityIcon,
  UsersIcon,
  WalletIcon,
  GaugeIcon,
  ShoppingCartIcon,
  StarIcon,
  RefreshCwIcon,
  LayersIcon,
  MailIcon,
  BellIcon,
} from "@/components/Layouts/sidebar/icons";

type Trend = "up" | "down" | "neutral";

type KpiCardProps = {
  label: string;
  value: string;
  delta?: { value: string; trend: Trend };
  sublabel?: string;
  icon?: React.ReactNode;
  tone?: "primary" | "accent" | "violet" | "info" | "rose" | "success" | "danger" | "warning";
  spark?: { type: "line" | "bar" | "area"; data: number[]; color?: string };
  ring?: { value: number; color?: string };
  footer?: React.ReactNode;
};

const toneBg: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
  accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
  info: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light",
  rose: "bg-rose-subtle text-rose dark:bg-rose/15 dark:text-rose-light",
  success: "bg-primary-subtle text-primary-dark dark:bg-primary/15 dark:text-primary-light",
  danger: "bg-red-light-5 text-red-dark dark:bg-red/15 dark:text-red-light",
  warning: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
};

const trendColor = {
  up: "text-primary dark:text-primary-light",
  down: "text-red dark:text-red-light",
  neutral: "text-dark-5 dark:text-dark-6",
};

const trendArrow = (trend: Trend) => {
  const path =
    trend === "up"
      ? "M5 14l7-7 7 7"
      : trend === "down"
        ? "M5 10l7 7 7-7"
        : "M5 12h14";
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
      <path d={path} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

function KpiCard({
  label,
  value,
  delta,
  sublabel,
  icon,
  tone = "primary",
  spark,
  ring,
  footer,
}: KpiCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-stroke bg-white p-5 shadow-card-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-3 dark:border-dark-3 dark:bg-gray-dark">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-dark-5 dark:text-dark-6">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-dark dark:text-white">{value}</p>
          {sublabel && <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">{sublabel}</p>}
        </div>
        <div className="flex items-center gap-2">
          {ring && (
            <div className="relative grid size-12 place-items-center">
              <svg width={48} height={48} className="-rotate-90">
                <circle cx={24} cy={24} r={20} fill="none" strokeWidth={4} className="text-gray-3 dark:text-dark-3" stroke="currentColor" />
                <circle
                  cx={24}
                  cy={24}
                  r={20}
                  fill="none"
                  strokeWidth={4}
                  stroke={ring.color || heliosChartColors[0]}
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 20}
                  strokeDashoffset={2 * Math.PI * 20 - (ring.value / 100) * 2 * Math.PI * 20}
                  className="transition-all duration-500"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-dark dark:text-white">{ring.value}%</span>
            </div>
          )}
          {icon && (
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-110 ${toneBg[tone]}`}>
              {icon}
            </span>
          )}
        </div>
      </div>

      {delta && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className={`inline-flex items-center gap-0.5 font-semibold ${trendColor[delta.trend]}`}>
            {trendArrow(delta.trend)}
            {delta.value}
          </span>
          <span className="text-dark-5 dark:text-dark-6">vs last period</span>
        </div>
      )}

      {spark && (
        <div className="mt-3 -mb-1">
          <HeliosChart
            type={spark.type}
            height={40}
            options={{
              chart: { sparkline: { enabled: true }, animations: { enabled: false } },
              stroke: { width: 2, curve: "smooth" },
              fill: spark.type === "area" ? { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0.05 } } : undefined,
              colors: [spark.color || heliosChartColors[0]],
              grid: { show: false },
              xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
              yaxis: { show: false },
              tooltip: { enabled: false },
              dataLabels: { enabled: false },
              legend: { show: false },
              plotOptions: { bar: { columnWidth: "55%", borderRadius: 2 } },
            }}
            series={[{ name: label, data: spark.data }]}
          />
        </div>
      )}

      {footer && <div className="mt-3 border-t border-stroke pt-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">{footer}</div>}
    </div>
  );
}

export default function KpiCardsPage() {
  return (
    <div>
      <PageHeader
        title="KPI Cards"
        description="Ten KPI card variants covering stats, sparklines, progress rings, deltas and mini bars."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "KPI Cards" },
        ]}
        actions={<Badge variant="primary">10 variants</Badge>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/* 1. Single stat */}
        <KpiCard
          label="Total Revenue"
          value="$284,920"
          delta={{ value: "+12.4%", trend: "up" }}
          sublabel="this month"
          icon={<WalletIcon className="size-5" />}
          tone="primary"
        />

        {/* 2. With sparkline (line) */}
        <KpiCard
          label="Active Users"
          value="58,492"
          delta={{ value: "+8.1%", trend: "up" }}
          icon={<UsersIcon className="size-5" />}
          tone="info"
          spark={{ type: "line", data: [42, 48, 45, 52, 58, 55, 62, 68, 64, 72, 76, 82] }}
        />

        {/* 3. With sparkline (area) */}
        <KpiCard
          label="MRR"
          value="$94,820"
          delta={{ value: "+3.4%", trend: "up" }}
          icon={<ActivityIcon className="size-5" />}
          tone="violet"
          spark={{ type: "area", data: [60, 64, 62, 68, 72, 70, 76, 80, 78, 84, 88, 92] }}
        />

        {/* 4. With sparkline (bar) */}
        <KpiCard
          label="Daily Orders"
          value="1,284"
          delta={{ value: "-2.1%", trend: "down" }}
          icon={<ShoppingCartIcon className="size-5" />}
          tone="accent"
          spark={{ type: "bar", data: [120, 145, 132, 160, 158, 172, 168, 184, 175, 190, 182, 196] }}
        />

        {/* 5. With progress ring */}
        <KpiCard
          label="Goal Completion"
          value="74%"
          sublabel="of Q1 target"
          tone="primary"
          ring={{ value: 74 }}
        />

        {/* 6. With ring + delta */}
        <KpiCard
          label="Trial Conversion"
          value="32.4%"
          delta={{ value: "+1.8%", trend: "up" }}
          tone="violet"
          ring={{ value: 32, color: heliosChartColors[2] }}
        />

        {/* 7. With ring + warning tone */}
        <KpiCard
          label="Churn Rate"
          value="2.8%"
          delta={{ value: "+0.4%", trend: "down" }}
          tone="warning"
          ring={{ value: 28, color: heliosChartColors[1] }}
        />

        {/* 8. Stat with footer */}
        <KpiCard
          label="Avg. Order Value"
          value="$148.20"
          delta={{ value: "+5.2%", trend: "up" }}
          sublabel="across 1,284 orders"
          icon={<LayersIcon className="size-5" />}
          tone="success"
          footer="Up from $140.90 last month"
        />

        {/* 9. With delta only, no icon */}
        <KpiCard
          label="Bounce Rate"
          value="32.8%"
          delta={{ value: "-2.1%", trend: "up" }}
          tone="info"
          sublabel="below industry avg"
          footer="Trend improving week-over-week"
        />

        {/* 10. Stat with sparkline (down trend) */}
        <KpiCard
          label="Avg Response Time"
          value="248ms"
          delta={{ value: "-18ms", trend: "up" }}
          icon={<GaugeIcon className="size-5" />}
          tone="rose"
          spark={{ type: "line", data: [320, 305, 298, 290, 282, 275, 268, 262, 255, 252, 250, 248], color: heliosChartColors[4] }}
        />
      </div>

      {/* Mini stat strip */}
      <Card className="mt-6">
        <CardHeader title="Compact Stat Strip" subtitle="Inline mini KPIs for headers and sidebars" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Emails Sent", value: "12,480", icon: <MailIcon className="size-4" />, tone: "primary" as const, delta: "+4.2%" },
            { label: "Open Rate", value: "42.8%", icon: <BellIcon className="size-4" />, tone: "accent" as const, delta: "+1.1%" },
            { label: "Reviews", value: "1,204", icon: <StarIcon className="size-4" />, tone: "violet" as const, delta: "+86" },
            { label: "Refresh", value: "Live", icon: <RefreshCwIcon className="size-4" />, tone: "info" as const, delta: "now" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-stroke p-3 dark:border-dark-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-dark-5 dark:text-dark-6">{s.label}</span>
                <span className={`grid size-7 place-items-center rounded-md ${toneBg[s.tone]}`}>{s.icon}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-lg font-bold text-dark dark:text-white">{s.value}</span>
                <span className="text-xs font-semibold text-primary dark:text-primary-light">{s.delta}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}