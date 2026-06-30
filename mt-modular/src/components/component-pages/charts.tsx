'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import {
  Download, RefreshCw, MoreHorizontal, TrendingUp, TrendingDown,
  ArrowUpRight, Zap, Activity,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/* ====================== PALETTE ====================== */
const C = { blue: '#465FFF', blueLt: '#9CB9FF', green: '#12B76A', amber: '#F79009', red: '#F04438', cyan: '#0BA5EC', violet: '#7A5AF8', slate: '#64748B', pink: '#EC4899' };
const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/* ====================== BASE OPTS ====================== */
function opts(o: Partial<ApexOptions>): ApexOptions {
  return {
    chart: { fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, animations: { enabled: true, speed: 800, animateGradually: { enabled: true, delay: 100 }, dynamicAnimation: { enabled: true, speed: 350 } }, ...o.chart },
    grid: { borderColor: 'var(--border)', strokeDashArray: 3, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, ...o.grid },
    dataLabels: { enabled: false, ...o.dataLabels },
    tooltip: { theme: 'light', ...o.tooltip },
    ...o,
  } as ApexOptions;
}

/* ====================== WRAPPERS ====================== */
function Wrap({ index, title, desc, badge, color, children, className, actions }: {
  index: number; title: string; desc: string; badge: string; color: string; children: React.ReactNode; className?: string; actions?: React.ReactNode;
}) {
  return (
    <div className={cn('rounded-2xl border border-[var(--border)] bg-[var(--card)]', className)} style={{ boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.06)' }}>
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-7 items-center justify-center rounded-lg text-[10px] font-bold" style={{ background: `${color}15`, color }}>{index}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-[var(--text-strong)] tracking-tight">{title}</h3>
              <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase" style={{ background: `${color}12`, color }}>{badge}</span>
            </div>
            <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">{desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">{actions ?? <><IconBtn /><IconBtn /><IconBtn /></>}</div>
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}
function IconBtn() { return <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><MoreHorizontal className="size-3.5" strokeWidth={2.5} /></button>; }

function TimeTabs() {
  const [t, setT] = React.useState('1M');
  return <div className="flex items-center gap-0.5 rounded-lg bg-[var(--surface-sunken)] p-0.5">{['7D','1M','3M','1Y'].map(x => <button key={x} onClick={() => setT(x)} className={cn('rounded-md px-2 py-1 text-[10px] font-bold transition', t === x ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>{x}</button>)}</div>;
}

function Trend({ val, className }: { val: string; className?: string }) {
  const up = !val.startsWith('-');
  return <span className={cn('inline-flex items-center gap-0.5 text-[11px] font-bold', up ? 'text-[var(--color-success-600)]' : 'text-[var(--color-error-600)]', className)}>{up ? <TrendingUp className="size-3" strokeWidth={2.5} /> : <TrendingDown className="size-3" strokeWidth={2.5} />}{val}</span>;
}

/* ====================== PAGE ====================== */
export function ChartsPage() {
  return (
    <div className="space-y-5">
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Charts' }]} title="Charts" description="Premium chart showcase — line, area, bar, pie, radar, radial, heatmap, and realtime." />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <RevenueTrend /><DeviceDonut /><TrafficSources />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SaaSGrowth /><MarketingRoi />
      </div>
      <PerformanceMonitor />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <TeamSkills /><FeatureCompare /><CompetitorRadar />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <GoalGauge /><ProjectRadial /><CsatScore /><SystemHealth />
      </div>
      <CohortHeatmap />
      <RealtimeStream />
      <style jsx global>{`
        .apexcharts-legend-text{font-size:11px!important;font-weight:600!important;color:var(--text-body)!important}
        .apexcharts-text{fill:var(--text-muted)!important;font-size:11px!important;font-weight:500!important}
        .apexcharts-tooltip{border-radius:10px!important;border:1px solid var(--border)!important;background:var(--popover)!important;box-shadow:0 8px 24px -4px rgba(15,23,42,0.12)!important;padding:8px 12px!important;font-family:Outfit,sans-serif!important}
        .apexcharts-tooltip-title{background:transparent!important;border:0!important;font-size:10px!important;font-weight:700!important;padding:0 0 4px!important;color:var(--text-muted)!important}
        .apexcharts-tooltip-series-group{padding:2px 0!important}
        .apexcharts-tooltip-y-group{padding:0!important}
        .apexcharts-tooltip-text{font-size:12px!important;font-weight:600!important;color:var(--text-body)!important}
        .apexcharts-tooltip-text-y-value{font-weight:700!important;color:var(--text-strong)!important}
        .apexcharts-gridline{stroke:var(--border)!important;stroke-dasharray:3!important}
        .apexcharts-xaxistooltip,.apexcharts-yaxistooltip{display:none!important}
        .apexcharts-menu-icon{display:none!important}
      `}</style>
    </div>
  );
}

/* ===== 1. REVENUE TREND — Hero ===== */
function RevenueTrend() {
  const o = opts({
    colors: [C.blue, C.blueLt],
    chart: { type: 'area', height: 340, foreColor: 'var(--text-muted)' },
    stroke: { curve: 'smooth', width: [3, 2] },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
    markers: { size: 0, hover: { size: 5 } },
    xaxis: { categories: M, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { fontSize: '11px' } } },
    yaxis: { labels: { formatter: (v: number) => `$${v}K`, style: { fontSize: '11px' } } },
    legend: { show: false },
    tooltip: { x: { formatter: (v: number) => M[v - 1] || '' }, y: { formatter: (v: number) => `$${v}K` } },
  });
  const s = [{ name: 'Revenue', data: [32,38,35,48,44,58,62,74,69,86,91,98] }, { name: 'Target', data: [30,35,40,45,50,55,60,65,70,75,80,85] }];
  return (
    <Wrap index={1} title="Revenue Trend" desc="Monthly revenue vs target" badge="Area" color={C.blue} className="lg:col-span-2" actions={<TimeTabs />}>
      <div className="flex items-center gap-4 mb-3">
        <div><p className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">$98.2K</p><Trend val="+12.8%" /></div>
        <span className="h-8 w-px bg-[var(--border)]" />
        <div className="flex gap-3"><span className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{background:C.blue}}/><span className="text-[11px] font-medium text-[var(--text-body)]">Revenue</span></span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{background:C.blueLt}}/><span className="text-[11px] font-medium text-[var(--text-body)]">Target</span></span></div>
      </div>
      <Chart options={o} series={s} type="area" height={340} />
    </Wrap>
  );
}

/* ===== 2. DEVICE DONUT ===== */
function DeviceDonut() {
  const o = opts({
    colors: [C.blue, C.green, C.amber, C.slate],
    chart: { type: 'donut', height: 340 },
    labels: ['Desktop','Mobile','Tablet','Other'],
    legend: { show: true, position: 'bottom', fontSize: '11px', fontWeight: 600, markers: { size: 5 }, itemMargin: { horizontal: 8, vertical: 4 } },
    stroke: { width: 0 },
    plotOptions: { pie: { donut: { size: '72%', labels: { show: true, total: { show: true, label: 'Sessions', fontSize: '13px', fontWeight: 700, color: 'var(--text-strong)', formatter: () => '84.2K' } } } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  });
  return <Wrap index={2} title="Device Analytics" desc="Session distribution" badge="Donut" color={C.green}><Chart options={o} series={[48,38,10,4]} type="donut" height={340} /></Wrap>;
}

/* ===== 3. TRAFFIC SOURCES ===== */
function TrafficSources() {
  const o = opts({
    colors: [C.blue, C.cyan, C.violet, C.amber, C.green],
    chart: { type: 'pie', height: 340 },
    labels: ['Organic','Direct','Social','Referral','Email'],
    legend: { show: true, position: 'bottom', fontSize: '11px', fontWeight: 600, markers: { size: 5 }, itemMargin: { horizontal: 8, vertical: 4 } },
    stroke: { width: 2, colors: ['var(--card)'] },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  });
  return <Wrap index={3} title="Traffic Sources" desc="Acquisition channels" badge="Pie" color={C.cyan}><Chart options={o} series={[42,24,18,10,6]} type="pie" height={340} /></Wrap>;
}

/* ===== 4. SAAS GROWTH ===== */
function SaaSGrowth() {
  const o = opts({
    colors: [C.blue, C.red],
    chart: { type: 'line', height: 320 },
    stroke: { curve: 'smooth', width: [3, 2] },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.2, opacityTo: 0 } },
    markers: { size: 0, hover: { size: 5 } },
    xaxis: { categories: M, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { fontSize: '11px' } } },
    yaxis: [{ labels: { formatter: (v: number) => `$${v}K`, style: { fontSize: '11px' } } }, { opposite: true, labels: { formatter: (v: number) => `${v}%`, style: { fontSize: '11px' } } }],
    legend: { show: true, position: 'top', horizontalAlign: 'right', fontSize: '11px', fontWeight: 600, markers: { size: 4 } },
    tooltip: { y: [{ formatter: (v: number) => `$${v}K` }, { formatter: (v: number) => `${v}%` }] },
  });
  const s = [{ name: 'MRR', data: [32,36,40,45,48,54,58,62,68,72,76,82] }, { name: 'Churn', data: [4.2,3.8,3.5,3.2,2.9,2.6,2.4,2.2,2.1,2.0,1.9,1.8] }];
  return <Wrap index={4} title="SaaS Growth" desc="MRR vs churn rate trend" badge="Line" color={C.violet} actions={<TimeTabs />}><Chart options={o} series={s} type="area" height={320} /></Wrap>;
}

/* ===== 5. MARKETING ROI ===== */
function MarketingRoi() {
  const o = opts({
    colors: [C.blue, C.amber],
    chart: { type: 'bar', height: 320 },
    plotOptions: { bar: { horizontal: true, columnWidth: '55%', borderRadius: 4, borderRadiusApplication: 'end' } },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: ['Search','Email','Social','Video','Display','Affiliate'], labels: { style: { fontSize: '11px' } } },
    yaxis: { labels: { style: { fontSize: '11px' } } },
    legend: { show: true, position: 'top', horizontalAlign: 'right', fontSize: '11px', fontWeight: 600, markers: { size: 4 } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (v: number) => `$${v}K` } },
    grid: { xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
  });
  const s = [{ name: 'Revenue', data: [89,48,62,58,32,24] }, { name: 'Spend', data: [35,12,28,22,18,8] }];
  return <Wrap index={5} title="Marketing ROI" desc="Revenue vs spend by channel" badge="Bar" color={C.amber}><Chart options={o} series={s} type="bar" height={320} /></Wrap>;
}

/* ===== 6. PERFORMANCE MONITOR — Full width stacked ===== */
function PerformanceMonitor() {
  const o = opts({
    colors: [C.blue, C.cyan, C.violet],
    chart: { type: 'bar', height: 300, stacked: true },
    plotOptions: { bar: { columnWidth: '40%', borderRadius: 3, borderRadiusApplication: 'end' } },
    stroke: { show: true, width: 1, colors: ['transparent'] },
    xaxis: { categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { fontSize: '11px' } } },
    yaxis: { labels: { formatter: (v: number) => `${v}ms`, style: { fontSize: '11px' } } },
    legend: { show: true, position: 'top', horizontalAlign: 'right', fontSize: '11px', fontWeight: 600, markers: { size: 4 } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (v: number) => `${v}ms` } },
  });
  const s = [{ name: 'API', data: [120,140,110,160,130,100,115] }, { name: 'DB', data: [45,52,38,61,48,35,42] }, { name: 'CDN', data: [25,28,22,32,26,18,24] }];
  return <Wrap index={6} title="Performance Monitor" desc="Response time breakdown — API, DB, CDN" badge="Stacked" color={C.red} actions={<TimeTabs />}><Chart options={o} series={s} type="bar" height={300} /></Wrap>;
}

/* ===== 7. TEAM SKILLS ===== */
function TeamSkills() {
  const o = opts({
    colors: [C.blue],
    chart: { type: 'radar', height: 300 },
    xaxis: { categories: ['React','Node','TS','Design','DevOps','QA'] },
    yaxis: { show: false },
    legend: { show: false },
    markers: { size: 4, hover: { size: 6 } },
    plotOptions: { radar: { polygons: { strokeColors: 'var(--border)', connectorColors: 'var(--border)' } } },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  });
  return <Wrap index={7} title="Team Skills" desc="Competency matrix" badge="Radar" color={C.blue}><Chart options={o} series={[{ name: 'Score', data: [92,85,88,72,58,68] }]} type="radar" height={300} /></Wrap>;
}

/* ===== 8. FEATURE COMPARE ===== */
function FeatureCompare() {
  const o = opts({
    colors: [C.blue, C.violet],
    chart: { type: 'radar', height: 300 },
    xaxis: { categories: ['Speed','Security','Scale','UX','API','Support'] },
    yaxis: { show: false },
    legend: { show: true, position: 'bottom', fontSize: '11px', fontWeight: 600, markers: { size: 4 } },
    markers: { size: 4, hover: { size: 6 } },
    plotOptions: { radar: { polygons: { strokeColors: 'var(--border)', connectorColors: 'var(--border)' } } },
  });
  return <Wrap index={8} title="Feature Compare" desc="Pro vs Enterprise" badge="Radar" color={C.violet}><Chart options={o} series={[{ name: 'Pro', data: [75,80,70,85,72,78] }, { name: 'Enterprise', data: [92,98,95,88,90,96] }]} type="radar" height={300} /></Wrap>;
}

/* ===== 9. COMPETITOR ===== */
function CompetitorRadar() {
  const o = opts({
    colors: [C.green, C.blue, C.amber],
    chart: { type: 'radar', height: 300 },
    xaxis: { categories: ['Price','Quality','Support','Features','Reliability','Innovation'] },
    yaxis: { show: false },
    legend: { show: true, position: 'bottom', fontSize: '11px', fontWeight: 600, markers: { size: 4 } },
    markers: { size: 4, hover: { size: 6 } },
    plotOptions: { radar: { polygons: { strokeColors: 'var(--border)', connectorColors: 'var(--border)' } } },
  });
  return <Wrap index={9} title="Competitor Benchmark" desc="Us vs leader vs challenger" badge="Radar" color={C.green}><Chart options={o} series={[{ name: 'Us', data: [85,82,88,78,84,80] }, { name: 'Leader', data: [72,92,85,90,88,82] }, { name: 'Challenger', data: [78,70,68,75,72,76] }]} type="radar" height={300} /></Wrap>;
}

/* ===== 10. GOAL GAUGE ===== */
function GoalGauge() {
  const o = opts({
    colors: [C.blue],
    chart: { type: 'radialBar', height: 260, sparkline: { enabled: true } },
    plotOptions: { radialBar: { startAngle: -90, endAngle: 90, hollow: { size: '65%' }, track: { background: 'var(--surface-sunken)', strokeWidth: '100%' }, dataLabels: { name: { show: false }, value: { fontSize: '28px', fontWeight: 700, color: 'var(--text-strong)', offsetY: 10, formatter: (v: number) => `${Math.round(v)}%` } } } },
    fill: { type: 'solid', colors: [C.blue] },
    stroke: { lineCap: 'round' },
  });
  return <Wrap index={10} title="Goal Progress" desc="Quarterly target" badge="Radial" color={C.blue}><Chart options={o} series={[82]} type="radialBar" height={260} /></Wrap>;
}

/* ===== 11. PROJECT RADIAL ===== */
function ProjectRadial() {
  const o = opts({
    colors: [C.green, C.blue, C.violet, C.amber],
    chart: { type: 'radialBar', height: 260 },
    plotOptions: { radialBar: { hollow: { size: '50%' }, track: { background: 'var(--surface-sunken)', strokeWidth: '100%', margin: 5 }, dataLabels: { name: { fontSize: '10px', fontWeight: 600, color: 'var(--text-body)' }, value: { fontSize: '16px', fontWeight: 700, color: 'var(--text-strong)', formatter: (v: number) => `${Math.round(v)}%` } } } },
    stroke: { lineCap: 'round' },
    legend: { show: true, position: 'bottom', fontSize: '10px', fontWeight: 600, markers: { size: 4 } },
    labels: ['API v3','Mobile','Dashboard','Security'],
  });
  return <Wrap index={11} title="Project Status" desc="Active projects" badge="Radial" color={C.green}><Chart options={o} series={[92,64,78,45]} type="radialBar" height={260} /></Wrap>;
}

/* ===== 12. CSAT ===== */
function CsatScore() {
  const o = opts({
    colors: [C.green],
    chart: { type: 'radialBar', height: 260, sparkline: { enabled: true } },
    plotOptions: { radialBar: { hollow: { size: '60%' }, track: { background: 'var(--surface-sunken)' }, dataLabels: { name: { show: true, fontSize: '12px', fontWeight: 600, color: 'var(--text-body)', offsetY: 8 }, value: { fontSize: '24px', fontWeight: 700, color: 'var(--text-strong)', offsetY: -8, formatter: (v: number) => `${Math.round(v)}%` } } } },
    fill: { type: 'solid', colors: [C.green] },
    stroke: { lineCap: 'round' },
    labels: ['CSAT'],
  });
  return <Wrap index={12} title="CSAT Score" desc="Customer satisfaction" badge="Radial" color={C.green}><Chart options={o} series={[92]} type="radialBar" height={260} /></Wrap>;
}

/* ===== 13. SYSTEM HEALTH ===== */
function SystemHealth() {
  const o = opts({
    colors: [C.blue, C.cyan, C.blueLt, C.slate],
    chart: { type: 'radialBar', height: 260 },
    plotOptions: { radialBar: { hollow: { size: '45%' }, track: { background: 'var(--surface-sunken)', margin: 6 }, dataLabels: { name: { fontSize: '10px', fontWeight: 600, color: 'var(--text-body)' }, value: { fontSize: '14px', fontWeight: 700, color: 'var(--text-strong)', formatter: (v: number) => `${Math.round(v)}%` } } } },
    stroke: { lineCap: 'round' },
    legend: { show: true, position: 'bottom', fontSize: '10px', fontWeight: 600, markers: { size: 4 } },
    labels: ['API','Web','DB','CDN'],
  });
  return <Wrap index={13} title="System Health" desc="Uptime by service" badge="Radial" color={C.cyan}><Chart options={o} series={[99,98,97,85]} type="radialBar" height={260} /></Wrap>;
}

/* ===== 14. COHORT HEATMAP ===== */
function CohortHeatmap() {
  const data = React.useMemo(() => {
    const rows = ['Jan','Feb','Mar','Apr','May','Jun'];
    const cols = ['W1','W2','W3','W4','W5','W6','W7','W8'];
    return rows.map(r => ({ name: r, data: cols.map(() => Math.floor(Math.random() * 80) + 20) }));
  }, []);
  const o = opts({
    chart: { type: 'heatmap', height: 300 },
    colors: [C.blue],
    dataLabels: { enabled: false },
    plotOptions: { heatmap: { radius: 4, enableShades: false, colorScale: { ranges: [{ from: 0, to: 30, name: 'Low', color: '#E0E7FF' }, { from: 31, to: 60, name: 'Mid', color: '#818CF8' }, { from: 61, to: 100, name: 'High', color: C.blue }] } } },
    xaxis: { type: 'category', axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { fontSize: '11px' } } },
    yaxis: { labels: { style: { fontSize: '11px' } } },
    legend: { show: true, position: 'bottom', fontSize: '11px', fontWeight: 600, markers: { size: 5 } },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  });
  return <Wrap index={14} title="Cohort Retention" desc="Weekly user retention heatmap" badge="Heatmap" color={C.violet}><Chart options={o} series={data} type="heatmap" height={300} /></Wrap>;
}

/* ===== 15. REALTIME STREAM ===== */
function RealtimeStream() {
  const [data, setData] = React.useState<{ name: string; data: number[] }[]>([{ name: 'Requests', data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 20) }]);
  React.useEffect(() => {
    const id = setInterval(() => {
      setData(prev => [{ name: 'Requests', data: [...prev[0].data.slice(1), Math.floor(Math.random() * 80) + 20] }]);
    }, 2000);
    return () => clearInterval(id);
  }, []);
  const o = opts({
    colors: [C.green],
    chart: { type: 'area', height: 280, animations: { enabled: true, dynamicAnimation: { enabled: true, speed: 1800 } }, toolbar: { show: false }, zoom: { enabled: false } },
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0 } },
    markers: { size: 0 },
    xaxis: { categories: Array.from({ length: 20 }, (_, i) => `${i}s`), axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { fontSize: '10px' } } },
    yaxis: { labels: { formatter: (v: number) => `${v}`, style: { fontSize: '10px' } } },
    legend: { show: false },
    tooltip: { enabled: false },
  });
  return <Wrap index={15} title="Realtime Stream" desc="Live API request monitoring" badge="Realtime" color={C.green} actions={<span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-success-50)] px-2 py-1 text-[10px] font-bold text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><span className="size-1.5 animate-pulse rounded-full bg-[var(--color-success-500)]" />LIVE</span>}>
    <div className="mb-2 flex items-center gap-3"><Zap className="size-4 text-[var(--color-success-500)]" strokeWidth={2.5} /><span className="text-lg font-bold tabular-nums text-[var(--text-strong)]">{data[0].data[data[0].data.length - 1]}</span><span className="text-[11px] font-medium text-[var(--text-muted)]">req/s</span></div>
    <Chart options={o} series={data} type="area" height={280} />
  </Wrap>;
}
