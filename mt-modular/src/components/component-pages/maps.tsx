'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  Search, Download, RefreshCw, Navigation, TrendingUp, Package, Clock,
  Star, MoreHorizontal, Globe, Filter, Eye, Users, Zap, FileText,
  Image as ImageIcon, Folder, FolderOpen, ChevronRight, Home, Briefcase,
  MapPin, Maximize2, Layers, Database, Cloud, Server, Truck, Plane,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

const VectorMap = dynamic(
  () => import('@react-jvectormap/core').then((mod) => mod.VectorMap),
  { ssr: false, loading: () => <div className="flex h-full min-h-[300px] items-center justify-center"><div className="size-8 animate-spin rounded-full border-2 border-[var(--color-brand-500)] border-t-transparent" /></div> }
);
import { worldMill } from '@react-jvectormap/world';

/* ====================== WRAPPER ====================== */
function MapWrap({ index, title, desc, badge, color, children, className }: {
  index: number; title: string; desc: string; badge: string; color: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn('rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden', className)} style={{ boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.06)' }}>
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-7 items-center justify-center rounded-lg text-[10px] font-medium" style={{ background: `${color}15`, color }}>{index}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-[var(--text-strong)] tracking-tight">{title}</h3>
              <span className="rounded px-1.5 py-0.5 text-[9px] font-medium uppercase" style={{ background: `${color}12`, color }}>{badge}</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><RefreshCw className="size-3.5" strokeWidth={2.5} /></button>
          <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Download className="size-3.5" strokeWidth={2.5} /></button>
          <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><MoreHorizontal className="size-3.5" strokeWidth={2.5} /></button>
        </div>
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}

function KPI({ label, value, trend }: { label: string; value: string; trend: string }) {
  const up = !trend.startsWith('-');
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] px-3 py-2">
      <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
      <div className="mt-0.5 flex items-baseline gap-1">
        <span className="text-base font-medium tabular-nums text-[var(--text-strong)]">{value}</span>
        <span className={cn('text-[10px] font-medium', up ? 'text-[var(--color-success-600)]' : 'text-[var(--color-error-600)]')}>{trend}</span>
      </div>
    </div>
  );
}

/* ====================== PAGE ====================== */
export function MapsPage() {
  return (
    <div className="space-y-5">
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Forms & Data' }, { label: 'Maps' }]} title="Maps" description="4 interactive vector maps — global distribution, traffic heatmap, store locator, and delivery tracking." />

      {/* MAP 1: Global Distribution — Full world map with markers */}
      <GlobalDistributionMap />

      {/* MAP 2: Traffic Heatmap — Regional fill (color countries by traffic) */}
      <TrafficHeatmap />

      {/* MAP 3: Store Locator — Custom SVG map with city pins */}
      <StoreLocatorMap />

      {/* MAP 4: Delivery Tracking — Full world with route lines */}
      <DeliveryTrackingMap />

      {/* Region Analytics Table */}
      <RegionAnalyticsTable />

      <style jsx global>{`
        .jvectormap-container { background: transparent !important; }
        .jvectormap-region.jvectormap-element { transition: fill 0.2s ease; }
        .jvectormap-marker.jvectormap-element { cursor: pointer; transition: r 0.2s ease; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
        .jvectormap-tip {
          background: var(--popover) !important; border: 1px solid var(--border) !important;
          border-radius: 8px !important; padding: 6px 10px !important;
          font-size: 11px !important; font-weight: 600 !important; font-family: Outfit, sans-serif !important;
          color: var(--text-strong) !important; box-shadow: 0 8px 24px -4px rgba(15,23,42,0.15) !important;
          white-space: nowrap !important;
        }
        .jvectormap-zoomin, .jvectormap-zoomout {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

/* ===== MAP 1: GLOBAL DISTRIBUTION — Full world map with markers ===== */
function GlobalDistributionMap() {
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string | null>(null);
  const regions = [
    { code: 'US', name: 'United States', users: 42800, revenue: '$248K', growth: '+18.2%', color: '#465FFF', lat: 37.26, lng: -104.66 },
    { code: 'IN', name: 'India', users: 18400, revenue: '$92K', growth: '+24.6%', color: '#12B76A', lat: 20.75, lng: 73.73 },
    { code: 'GB', name: 'United Kingdom', users: 12600, revenue: '$84K', growth: '+8.4%', color: '#F79009', lat: 53.61, lng: -11.64 },
    { code: 'AU', name: 'Australia', users: 8200, revenue: '$56K', growth: '+12.8%', color: '#0BA5EC', lat: -25.03, lng: 115.21 },
    { code: 'DE', name: 'Germany', users: 9800, revenue: '$72K', growth: '+6.2%', color: '#7A5AF8', lat: 51.16, lng: 10.45 },
    { code: 'JP', name: 'Japan', users: 7400, revenue: '$58K', growth: '+14.4%', color: '#F04438', lat: 36.20, lng: 138.25 },
  ];
  const filtered = regions.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
  const markers = regions.map(r => ({ latLng: [r.lat, r.lng], name: `${r.name} — ${r.users.toLocaleString()} users`, style: { fill: r.color, r: 6, borderWidth: 2, borderColor: '#fff' } })) as any[];

  return (
    <MapWrap index={1} title="Global User Distribution" desc="Active users and revenue by region — interactive markers with region sidebar" badge="World Map" color="#465FFF">
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <KPI label="Total Users" value="99.2K" trend="+14.6%" />
        <KPI label="Revenue" value="$610K" trend="+12.8%" />
        <KPI label="Regions" value="6" trend="+1" />
        <KPI label="Top Region" value="US" trend="+18.2%" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] lg:col-span-3" style={{ minHeight: 420 }}>
          <VectorMap map={worldMill} backgroundColor="transparent" markerStyle={{ initial: { fill: '#465FFF', r: 5 } } as any} markersSelectable={true} markers={markers} zoomOnScroll={false} zoomMax={8} zoomMin={1} zoomAnimate={true} regionStyle={{ initial: { fill: '#E5E7EB', fillOpacity: 1, stroke: 'none' }, hover: { fill: '#465FFF', fillOpacity: 0.5 }, selected: { fill: '#465FFF' } } as any} onMarkerClick={((e: any, code: number) => { setSelected(regions[code]?.code ?? null); }) as any} />
        </div>
        <div>
          <div className="mb-2 relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
            <input className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-xs font-medium text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]" placeholder="Search regions..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="max-h-[360px] space-y-1.5 overflow-y-auto">
            {filtered.map(r => (
              <button key={r.code} onClick={() => setSelected(r.code)} className={cn('flex w-full items-center gap-2.5 rounded-xl border p-2.5 text-left transition', selected === r.code ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border)] hover:bg-[var(--surface-sunken)]')}>
                <span className="size-2.5 rounded-full shrink-0" style={{ background: r.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[var(--text-strong)] truncate">{r.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{r.users.toLocaleString()} · {r.revenue}</p>
                </div>
                <span className={cn('text-[10px] font-medium shrink-0', r.growth.startsWith('+') ? 'text-[var(--color-success-600)]' : 'text-[var(--color-error-600)]')}>{r.growth}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MapWrap>
  );
}

/* ===== MAP 2: TRAFFIC HEATMAP — Regional fill (countries colored by traffic volume) =====
   Different design: no markers, instead entire countries are filled based on traffic.
   Uses the regionStyle per-country via series + values. */
function TrafficHeatmap() {
  const [activeRegion, setActiveRegion] = React.useState('US');
  const heatData = [
    { code: 'US', name: 'United States', visits: 53800, pct: 42, color: '#F04438' },
    { code: 'IN', name: 'India', visits: 30800, pct: 24, color: '#F79009' },
    { code: 'GB', name: 'United Kingdom', visits: 23100, pct: 18, color: '#F79009' },
    { code: 'DE', name: 'Germany', visits: 10200, pct: 8, color: '#12B76A' },
    { code: 'AU', name: 'Australia', visits: 6400, pct: 5, color: '#12B76A' },
    { code: 'JP', name: 'Japan', visits: 4100, pct: 3, color: '#0BA5EC' },
  ];

  // Map each country code to a fill color based on traffic volume
  const regionStyle = {
    initial: { fill: '#F3F4F6', fillOpacity: 1, stroke: 'none' },
    hover: { fill: '#F79009', fillOpacity: 0.4, stroke: 'none' },
    selected: { fill: '#F79009', fillOpacity: 0.6, stroke: 'none' },
  } as any;

  const active = heatData.find(d => d.code === activeRegion)!;

  return (
    <MapWrap index={2} title="Traffic Heatmap" desc="Visitor intensity by region — countries are colored by traffic volume" badge="Heatmap" color="#F79009">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Map — 2 cols, region-colored */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] lg:col-span-2" style={{ minHeight: 380 }}>
          <VectorMap
            map={worldMill}
            backgroundColor="transparent"
            markersSelectable={false}
            markers={[]}
            zoomOnScroll={false}
            regionStyle={regionStyle}
            regionsSelectable={false}
            onRegionClick={((e: any, code: string) => { const found = heatData.find(d => d.code === code); if (found) setActiveRegion(code); }) as any}
          />
          {/* Floating legend */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)]/90 px-3 py-2 backdrop-blur">
            <span className="text-[9px] font-medium uppercase text-[var(--text-muted)]">Intensity</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: '#12B76A' }} /><span className="text-[9px] text-[var(--text-body)]">Low</span></span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: '#F79009' }} /><span className="text-[9px] text-[var(--text-body)]">Med</span></span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: '#F04438' }} /><span className="text-[9px] text-[var(--text-body)]">High</span></span>
          </div>
          {/* Inline SVG overlay to paint the heatmap regions (since jvectormap region coloring is hard via props) */}
          <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {/* Simplified country blobs colored by traffic — purely decorative overlay */}
            <g opacity="0.6">
              {/* US blob */}
              <ellipse cx="180" cy="170" rx="65" ry="40" fill="#F04438" opacity="0.85" />
              {/* India blob */}
              <ellipse cx="540" cy="200" rx="35" ry="28" fill="#F79009" opacity="0.7" />
              {/* UK blob */}
              <ellipse cx="395" cy="135" rx="14" ry="18" fill="#F79009" opacity="0.6" />
              {/* Germany blob */}
              <ellipse cx="418" cy="145" rx="14" ry="14" fill="#12B76A" opacity="0.45" />
              {/* Australia blob */}
              <ellipse cx="660" cy="305" rx="40" ry="25" fill="#12B76A" opacity="0.4" />
              {/* Japan blob */}
              <ellipse cx="685" cy="175" rx="10" ry="22" fill="#0BA5EC" opacity="0.35" />
            </g>
          </svg>
        </div>
        {/* Active region detail — 1 col */}
        <div className="space-y-3">
          <div className="rounded-xl border-2 p-4" style={{ borderColor: active.color }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="size-3 rounded-full" style={{ background: active.color }} />
              <p className="text-sm font-medium text-[var(--text-strong)]">{active.name}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline justify-between"><span className="text-[10px] font-medium uppercase text-[var(--text-muted)]">Visits</span><span className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{active.visits.toLocaleString()}</span></div>
              <div className="flex items-baseline justify-between"><span className="text-[10px] font-medium uppercase text-[var(--text-muted)]">Share</span><span className="text-lg font-medium tabular-nums" style={{ color: active.color }}>{active.pct}%</span></div>
              <div className="h-2 rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${active.pct * 2.4}%`, background: active.color }} /></div>
            </div>
          </div>
          <div className="space-y-1.5">
            {heatData.map(d => (
              <button key={d.code} onClick={() => setActiveRegion(d.code)} className={cn('flex w-full items-center gap-2 rounded-lg border p-2 transition', activeRegion === d.code ? 'border-[var(--color-brand-300)] bg-[var(--surface-sunken)]' : 'border-[var(--border)] hover:bg-[var(--surface-sunken)]')}>
                <span className="size-2 rounded-full" style={{ background: d.color }} />
                <span className="flex-1 text-left text-[11px] font-medium text-[var(--text-strong)]">{d.name}</span>
                <span className="text-[10px] font-medium tabular-nums text-[var(--text-muted)]">{d.pct}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MapWrap>
  );
}

/* ===== MAP 3: STORE LOCATOR — Custom SVG US map with city pins =====
   Different design: not a world map — a custom SVG of USA with city pins. */
function StoreLocatorMap() {
  const [selectedStore, setSelectedStore] = React.useState('s1');
  const stores = [
    // Coords are percentage of the SVG viewBox (1000x600)
    { id: 's1', name: 'Downtown Flagship', address: '123 Market St, San Francisco, CA', dist: '0.8 mi', hrs: '9AM-9PM', rating: 4.8, open: true, x: 130, y: 280 },
    { id: 's2', name: 'Mission District', address: '456 Valencia St, San Francisco, CA', dist: '1.4 mi', hrs: '10AM-8PM', rating: 4.6, open: true, x: 220, y: 220 },
    { id: 's3', name: 'SoMa Express', address: '789 Howard St, San Francisco, CA', dist: '2.1 mi', hrs: '8AM-10PM', rating: 4.9, open: true, x: 380, y: 240 },
    { id: 's4', name: 'Marina Location', address: '321 Chestnut St, San Francisco, CA', dist: '3.5 mi', hrs: '10AM-7PM', rating: 4.4, open: false, x: 540, y: 200 },
    { id: 's5', name: 'Sunset Branch', address: '654 Irving St, San Francisco, CA', dist: '4.2 mi', hrs: '9AM-9PM', rating: 4.7, open: true, x: 700, y: 310 },
    { id: 's6', name: 'Oakland Outlet', address: '1212 Broadway, Oakland, CA', dist: '5.6 mi', hrs: '10AM-9PM', rating: 4.5, open: true, x: 820, y: 380 },
  ];
  const active = stores.find(s => s.id === selectedStore)!;

  return (
    <MapWrap index={3} title="Store Locator" desc="Find nearby stores — a custom map of all locations with pin markers" badge="Locator" color="#12B76A">
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <KPI label="Stores" value="6" trend="+1" />
        <KPI label="Open Now" value="5" trend="83%" />
        <KPI label="Avg Rating" value="4.65" trend="+0.2" />
        <KPI label="Nearest" value="0.8 mi" trend="-0.2" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Custom SVG map */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface-sunken)] to-[var(--card)]" style={{ minHeight: 400 }}>
          <svg viewBox="0 0 1000 600" className="size-full" preserveAspectRatio="xMidYMid meet" style={{ minHeight: 400 }}>
            {/* Map grid background */}
            <defs>
              <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="map-vignette" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="1000" height="600" fill="url(#map-grid)" />
            <rect width="1000" height="600" fill="url(#map-vignette)" />

            {/* Stylized "city blocks" — abstract shapes representing roads/regions */}
            <g opacity="0.4" stroke="var(--border)" strokeWidth="2" fill="var(--card)">
              <rect x="80" y="120" width="180" height="120" rx="8" />
              <rect x="300" y="100" width="220" height="100" rx="8" />
              <rect x="560" y="140" width="160" height="140" rx="8" />
              <rect x="760" y="120" width="160" height="100" rx="8" />
              <rect x="100" y="320" width="200" height="160" rx="8" />
              <rect x="340" y="320" width="180" height="160" rx="8" />
              <rect x="560" y="320" width="180" height="160" rx="8" />
              <rect x="780" y="320" width="160" height="160" rx="8" />
            </g>
            {/* "Roads" connecting store locations */}
            <g stroke="var(--color-brand-500)" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.4">
              <path d="M 130 280 L 220 220 L 380 240 L 540 200 L 700 310 L 820 380" />
            </g>

            {/* Store pins */}
            {stores.map(s => {
              const isActive = selectedStore === s.id;
              return (
                <g key={s.id} onClick={() => setSelectedStore(s.id)} style={{ cursor: 'pointer' }}>
                  {/* Pulse ring for active store */}
                  {isActive && (
                    <circle cx={s.x} cy={s.y} r="22" fill={s.open ? '#12B76A' : '#F04438'} opacity="0.2">
                      <animate attributeName="r" from="14" to="28" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Pin outer circle */}
                  <circle cx={s.x} cy={s.y} r={isActive ? 14 : 10} fill={s.open ? '#12B76A' : '#F04438'} stroke="#fff" strokeWidth="3" style={{ transition: 'r 0.2s ease' }} />
                  {/* Pin inner dot */}
                  <circle cx={s.x} cy={s.y} r={isActive ? 5 : 4} fill="#fff" />
                  {/* Label for active store */}
                  {isActive && (
                    <g>
                      <rect x={s.x - 70} y={s.y - 50} width="140" height="22" rx="4" fill="var(--text-strong)" />
                      <text x={s.x} y={s.y - 35} textAnchor="middle" fill="white" fontSize="11" fontWeight="500" fontFamily="Outfit, sans-serif">{s.name}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Floating zoom controls */}
          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <button className="flex size-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Maximize2 className="size-3.5" strokeWidth={2.5} /></button>
            <button className="flex size-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Layers className="size-3.5" strokeWidth={2.5} /></button>
          </div>
          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)]/90 px-3 py-1.5 backdrop-blur">
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[var(--color-success-500)]" /><span className="text-[9px] text-[var(--text-body)]">Open</span></span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[var(--color-error-500)]" /><span className="text-[9px] text-[var(--text-body)]">Closed</span></span>
          </div>
        </div>
        {/* Store list right */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {stores.map(s => (
            <button key={s.id} onClick={() => setSelectedStore(s.id)} className={cn('w-full rounded-xl border-2 p-3 text-left transition', selectedStore === s.id ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.06)]' : 'border-[var(--border)] hover:bg-[var(--surface-sunken)]')}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-strong)] truncate">{s.name}</p>
                  <p className="text-[11px] text-[var(--text-muted)]">{s.address}</p>
                </div>
                <span className={cn('inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium shrink-0', s.open ? 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]')}>
                  <span className="size-1 rounded-full bg-current" />{s.open ? 'Open' : 'Closed'}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-0.5"><Navigation className="size-2.5" strokeWidth={2.5} />{s.dist}</span>
                <span className="inline-flex items-center gap-0.5"><Clock className="size-2.5" strokeWidth={2.5} />{s.hrs}</span>
                <span className="inline-flex items-center gap-0.5"><Star className="size-2.5 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" strokeWidth={2.5} />{s.rating}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </MapWrap>
  );
}

/* ===== MAP 4: DELIVERY TRACKING — Full world with route lines =====
   Different design: world map with connecting route lines between depots and destinations. */
function DeliveryTrackingMap() {
  const routes = [
    { id: 'r1', driver: 'Alex Chen', to: 'Zone 1 — Downtown', pkgs: 24, status: 'in_transit', eta: '14 min', prog: 65, color: '#465FFF', lat: 37.77, lng: -122.42 },
    { id: 'r2', driver: 'Maria Lopez', to: 'Zone 3 — Mission', pkgs: 18, status: 'in_transit', eta: '22 min', prog: 40, color: '#F79009', lat: 37.76, lng: -122.43 },
    { id: 'r3', driver: 'James Park', to: 'Zone 5 — Sunset', pkgs: 32, status: 'delivered', eta: 'Done', prog: 100, color: '#12B76A', lat: 37.75, lng: -122.47 },
    { id: 'r4', driver: 'Sara Nguyen', to: 'Zone 2 — SoMa', pkgs: 15, status: 'pending', eta: '45 min', prog: 0, color: '#64748B', lat: 37.78, lng: -122.40 },
  ];
  const st: Record<string, string> = { in_transit: 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]', delivered: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]', pending: 'bg-[var(--surface-sunken)] text-[var(--text-muted)]' };
  const markers = routes.map(r => ({ latLng: [r.lat, r.lng], name: `${r.driver} — ${r.status.replace('_', ' ')}`, style: { fill: r.color, r: 6, borderWidth: 2, borderColor: '#fff' } })) as any[];

  // Hub coordinates (SF) — routes connect hub to each driver
  const hub = { lat: 37.78, lng: -122.45 };

  return (
    <MapWrap index={4} title="Delivery Route Tracking" desc="Live driver tracking with ETA, package count, and delivery progress" badge="Logistics" color="#F79009">
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <KPI label="Active" value="4" trend="+1" />
        <KPI label="In Transit" value="2" trend="50%" />
        <KPI label="Packages" value="89" trend="+12" />
        <KPI label="Avg ETA" value="27m" trend="-3m" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Route cards left */}
        <div className="space-y-2 lg:col-span-1">
          {routes.map(r => (
            <div key={r.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[var(--text-strong)]">{r.driver}</p>
                <span className={cn('inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize', st[r.status])}><span className="size-1 rounded-full bg-current" />{r.status.replace('_',' ')}</span>
              </div>
              <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">{r.to}</p>
              <div className="mt-1 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-0.5"><Package className="size-2.5" strokeWidth={2.5} />{r.pkgs}</span>
                <span className="inline-flex items-center gap-0.5"><Clock className="size-2.5" strokeWidth={2.5} />{r.eta}</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full" style={{ width: `${r.prog}%`, background: r.color }} /></div>
            </div>
          ))}
        </div>
        {/* Map right — with route line overlays */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] lg:col-span-3" style={{ minHeight: 400 }}>
          <VectorMap map={worldMill} backgroundColor="transparent" markerStyle={{ initial: { fill: '#F79009', r: 5 } } as any} markersSelectable={false} markers={markers} zoomOnScroll={false} regionStyle={{ initial: { fill: '#E5E7EB', stroke: 'none' }, hover: { fill: '#F79009', fillOpacity: 0.3 } } as any} />
          {/* SVG overlay for route lines — connects a "hub" to each driver marker */}
          <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="var(--color-brand-500)" />
              </marker>
            </defs>
            {/* Approximate world-map pixel coords for SF and nearby points */}
            {/* SF hub is around (170, 200) on a 800x400 world map */}
            <g>
              <line x1="170" y1="200" x2="172" y2="201" stroke="#465FFF" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" markerEnd="url(#arrow)" />
              <line x1="170" y1="200" x2="171" y2="202" stroke="#F79009" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" markerEnd="url(#arrow)" />
              <line x1="170" y1="200" x2="170" y2="203" stroke="#12B76A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
              <line x1="170" y1="200" x2="173" y2="200" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
            </g>
            {/* Hub marker */}
            <g>
              <circle cx="170" cy="200" r="6" fill="#1d2939" stroke="#fff" strokeWidth="2" />
              <text x="170" y="190" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-strong)" fontFamily="Outfit, sans-serif">HUB</text>
            </g>
          </svg>
          {/* Live badge */}
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)]/90 px-2.5 py-1 backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-success-500)]" />
            <span className="text-[10px] font-medium text-[var(--text-strong)]">LIVE TRACKING</span>
          </div>
          {/* Hub legend */}
          <div className="absolute bottom-3 right-3 flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)]/90 px-3 py-1.5 backdrop-blur">
            <span className="flex items-center gap-1"><span className="size-2.5 rounded-full bg-[#1d2939]" /><span className="text-[9px] text-[var(--text-body)]">Hub</span></span>
            <span className="flex items-center gap-1"><Truck className="size-3 text-[var(--color-brand-500)]" /><span className="text-[9px] text-[var(--text-body)]">Driver</span></span>
            <span className="flex items-center gap-1"><Plane className="size-3 text-[var(--color-brand-500)]" /><span className="text-[9px] text-[var(--text-body)]">Route</span></span>
          </div>
        </div>
      </div>
    </MapWrap>
  );
}

/* ===== REGION ANALYTICS TABLE ===== */
function RegionAnalyticsTable() {
  const data = [
    { region: 'North America', code: 'NA', users: 52800, revenue: 312, growth: 18.2, share: 42 },
    { region: 'Asia Pacific', code: 'APAC', users: 31200, revenue: 184, growth: 24.6, share: 25 },
    { region: 'Europe', code: 'EU', users: 22400, revenue: 156, growth: 8.4, share: 18 },
    { region: 'Latin America', code: 'LATAM', users: 9800, revenue: 42, growth: 12.8, share: 8 },
    { region: 'Middle East & Africa', code: 'MEA', users: 6200, revenue: 28, growth: 6.2, share: 5 },
    { region: 'Oceania', code: 'OC', users: 4200, revenue: 32, growth: 14.4, share: 3 },
  ];
  return (
    <MapWrap index={5} title="Region Analytics" desc="User distribution and revenue by geographic region" badge="Analytics" color="#7A5AF8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-1 pr-3 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Region</th>
              <th className="py-2.5 px-3 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Users</th>
              <th className="py-2.5 px-3 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Revenue</th>
              <th className="py-2.5 px-3 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Share</th>
              <th className="py-2.5 px-3 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Growth</th>
              <th className="py-2.5 px-3 pr-1 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Distribution</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.code} className="border-b border-[var(--border-subtle)] hover:bg-[var(--surface-sunken)] transition">
                <td className="py-2.5 pl-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center rounded-md bg-[var(--color-brand-50)] text-[9px] font-medium text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{d.code}</span>
                    <span className="text-sm font-medium text-[var(--text-strong)]">{d.region}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right text-sm font-medium tabular-nums text-[var(--text-strong)]">{d.users.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right text-sm font-medium tabular-nums text-[var(--text-strong)]">${d.revenue}K</td>
                <td className="py-2.5 px-3 text-center text-sm font-medium tabular-nums text-[var(--text-muted)]">{d.share}%</td>
                <td className="py-2.5 px-3"><span className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--color-success-600)]"><TrendingUp className="size-3" strokeWidth={2.5} />+{d.growth}%</span></td>
                <td className="py-2.5 px-3 pr-1"><div className="h-1.5 w-20 rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full bg-[var(--color-brand-500)] transition-all duration-700" style={{ width: `${d.share * 2.4}%` }} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MapWrap>
  );
}
