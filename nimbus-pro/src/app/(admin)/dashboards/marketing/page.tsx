"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { MONTHS } from "@/data/mock";
import { formatCurrency, formatCompact } from "@/lib/utils";
import {
  Megaphone, DollarSign, Target, TrendingUp, Plus, Download, ArrowUpRight,
  Search, Share2, Mail, Eye, Flame
} from "lucide-react";

const CHANNEL_PERF = {
  Organic: [42, 48, 52, 58, 64, 72, 78, 86, 92, 104, 118, 132],
  Paid: [28, 32, 36, 40, 44, 48, 52, 56, 60, 68, 74, 82],
  Social: [18, 22, 24, 28, 32, 36, 38, 42, 46, 50, 54, 60],
  Email: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36],
};

const CHANNEL_MIX = [
  { name: "Organic", value: 38, color: "#10b981", spend: 12000 },
  { name: "Paid", value: 32, color: "#0ea5e9", spend: 28000 },
  { name: "Social", value: 18, color: "#8b5cf6", spend: 14000 },
  { name: "Email", value: 12, color: "#f59e0b", spend: 3200 },
];

const CAMPAIGNS = [
  { name: "Summer Launch 2026", channel: "Paid", spend: 12400, conversions: 482, roas: 4.2, status: "active" },
  { name: "Nimbus Pro Webinar", channel: "Email", spend: 1200, conversions: 286, roas: 8.4, status: "active" },
  { name: "Black Friday Teaser", channel: "Social", spend: 8400, conversions: 318, roas: 3.1, status: "scheduled" },
  { name: "Enterprise Outbound", channel: "Paid", spend: 18400, conversions: 124, roas: 2.8, status: "active" },
  { name: "Content SEO Push", channel: "Organic", spend: 4200, conversions: 642, roas: 12.6, status: "active" },
  { name: "Retargeting Q2", channel: "Paid", spend: 6800, conversions: 218, roas: 3.8, status: "paused" },
];

const TOP_CONTENT = [
  { title: "How we built Nimbus Pro's design system", type: "Blog", views: 18420, channel: "Organic" },
  { title: "Summer Launch — 25% off all plans", type: "Ad", views: 14280, channel: "Paid" },
  { title: "5 dashboards that beat spreadsheets", type: "Blog", views: 11640, channel: "Organic" },
  { title: "Webinar replay: AI in modern SaaS", type: "Video", views: 9420, channel: "Email" },
  { title: "Twitter thread: 10 UX wins", type: "Social", views: 8280, channel: "Social" },
];

const FUNNEL = [
  { stage: "Impressions", value: 1240000, color: "#10b981" },
  { stage: "Clicks", value: 84200, color: "#0ea5e9" },
  { stage: "Visits", value: 64800, color: "#8b5cf6" },
  { stage: "Signups", value: 12480, color: "#f59e0b" },
  { stage: "Conversions", value: 1840, color: "#f43f5e" },
];

const channelIcon = (c: string) => {
  switch (c) {
    case "Organic": return Search;
    case "Paid": return Target;
    case "Social": return Share2;
    case "Email": return Mail;
    default: return Megaphone;
  }
};

export default function MarketingDashboard() {
  const channelPerfOptions = {
    ...baseChartOptions("line"),
    colors: ["#10b981", "#0ea5e9", "#8b5cf6", "#f59e0b"],
    stroke: { curve: "smooth", width: [3, 3, 3, 3] },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `${v}k` } },
    legend: { show: true, position: "top", horizontalAlign: "right" },
    markers: { size: 0, hover: { size: 6 } },
    tooltip: { shared: true, y: { formatter: (v: number) => `${formatCompact(v)} events` } },
  };
  const channelPerfSeries = Object.entries(CHANNEL_PERF).map(([name, data]) => ({ name, data }));

  const channelMixOptions = {
    ...baseChartOptions("donut"),
    labels: CHANNEL_MIX.map((c) => c.name),
    colors: CHANNEL_MIX.map((c) => c.color),
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "Total Spend", formatter: () => formatCurrency(CHANNEL_MIX.reduce((s, c) => s + c.spend, 0)) } } } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v}% of conversions` } },
  };

  const maxFunnel = FUNNEL[0].value;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketing Dashboard"
        description="Campaign performance, channel mix, conversions, and ROAS in one view."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Marketing" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Download className="h-4 w-4" /> Report</Button>
            <Button size="md"><Plus className="h-4 w-4" /> New Campaign</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Campaigns" value="18" delta="+4" deltaTone="up" icon={Megaphone} iconTone="brand" footer="6 launching this week" />
        <StatCard label="Total Spend" value="$57,400" delta="+8.2%" deltaTone="down" icon={DollarSign} iconTone="error" footer="this month" />
        <StatCard label="Conversions" value="2,068" delta="+18.4%" deltaTone="up" icon={Target} iconTone="success" footer="across all channels" />
        <StatCard label="ROAS" value="4.8x" delta="+0.6x" deltaTone="up" icon={TrendingUp} iconTone="purple" footer="return on ad spend" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Campaign Performance"
            description="Conversions by channel over the past 12 months"
            action={<Badge tone="success" dot>All channels up YoY</Badge>}
          />
          <CardBody>
            <NimbusChart options={channelPerfOptions} series={channelPerfSeries} type="line" height={320} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Channel Mix" description="Conversion share & spend" />
          <CardBody>
            <NimbusChart options={channelMixOptions} series={CHANNEL_MIX.map((c) => c.value)} type="donut" height={240} />
            <div className="mt-4 space-y-2">
              {CHANNEL_MIX.map((c) => {
                const Icon = channelIcon(c.name);
                return (
                  <div key={c.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                    <span className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <Icon className="h-3.5 w-3.5" style={{ color: c.color }} />
                      {c.name}
                    </span>
                    <div className="flex items-center gap-2 text-right">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{c.value}%</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(c.spend)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader
            title="Campaign Performance Table"
            description="ROAS and conversion metrics per campaign"
            action={<Button variant="ghost" size="sm">View all <ArrowUpRight className="h-3 w-3" /></Button>}
          />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Channel</th>
                  <th>Spend</th>
                  <th>Conv.</th>
                  <th>ROAS</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {CAMPAIGNS.map((c) => {
                  const Icon = channelIcon(c.channel);
                  return (
                    <tr key={c.name}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{c.name}</span>
                        </div>
                      </td>
                      <td><Badge tone="gray" variant="soft">{c.channel}</Badge></td>
                      <td className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(c.spend)}</td>
                      <td className="text-sm text-gray-700 dark:text-gray-300">{c.conversions}</td>
                      <td>
                        <Badge tone={c.roas >= 5 ? "success" : c.roas >= 3 ? "brand" : "warning"} variant="soft">
                          {c.roas}x
                        </Badge>
                      </td>
                      <td>
                        <Badge
                          tone={c.status === "active" ? "success" : c.status === "scheduled" ? "brand" : "gray"}
                          variant="soft"
                          dot
                        >
                          {c.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Top Performing Content" description="Most viewed this month" />
          <CardBody className="space-y-3">
            {TOP_CONTENT.map((c, i) => (
              <div key={c.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  #{i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{c.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Badge tone="purple" variant="soft">{c.type}</Badge>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {formatCompact(c.views)}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Marketing Funnel"
          description="Impressions → Conversions — drop-off and conversion at each stage"
          action={<Badge tone="brand" variant="soft">0.15% end-to-end CVR</Badge>}
        />
        <CardBody>
          <div className="space-y-3">
            {FUNNEL.map((f, i) => {
              const width = (f.value / maxFunnel) * 100;
              const cvrFromPrev = i > 0 ? ((f.value / FUNNEL[i - 1].value) * 100).toFixed(1) : null;
              return (
                <div key={f.stage} className="flex items-center gap-4">
                  <div className="w-28 shrink-0 text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{f.stage}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatCompact(f.value)}</p>
                  </div>
                  <div className="relative h-12 flex-1 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div
                      className="flex h-full items-center justify-end rounded-lg px-3 text-white transition-all duration-700"
                      style={{ width: `${Math.max(width, 8)}%`, backgroundColor: f.color }}
                    >
                      <span className="text-xs font-semibold">{((f.value / maxFunnel) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-24 shrink-0 text-xs text-gray-500 dark:text-gray-400">
                    {cvrFromPrev ? <span className="text-brand-600 dark:text-brand-400">{cvrFromPrev}% step CVR</span> : <span className="text-gray-400">Top of funnel</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden border-0 bg-gradient-to-r from-pink-600 via-purple-600 to-accent-600 text-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
          {[
            { label: "Cost / Conversion", value: "$27.80", icon: DollarSign },
            { label: "CTR (avg)", value: "6.8%", icon: Target },
            { label: "Email Open Rate", value: "42.1%", icon: Mail },
            { label: "Top Channel", value: "Organic", icon: Flame },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs font-medium opacity-90">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
