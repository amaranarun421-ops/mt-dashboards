'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, MoreHorizontal,
  Eye, Truck, Package, Clock, AlertTriangle, AlertCircle, Info, Plus, X, Search,
  Filter, MapPin, RefreshCw, Link2, Navigation, Warehouse, Bike, Car, Zap, CheckCircle2,
  PackageCheck, XCircle, CloudRain, FileText, Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem } from './analytics-interactions';
import * as Data from './logistics-data';
import type { Shipment } from './logistics-data';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const VectorMap = dynamic(() => import('@react-jvectormap/core').then((mod: any) => mod.VectorMap), { ssr: false, loading: () => <div className="flex h-full min-h-[300px] items-center justify-center"><div className="size-8 animate-spin rounded-full border-2 border-[var(--color-brand-500)] border-t-transparent" /></div> });
import { worldMill } from '@react-jvectormap/world';

/* ============================================================
   Shared helpers (same pattern as other dashboards)
   ============================================================ */
function CardActionMenu({ cardName }: { cardName: string }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  function handle(a: string) { setOpen(false); toast({ title: `${a} — ${cardName}` }); }
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(p => !p)} className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label={`Actions for ${cardName}`}><MoreHorizontal className="size-4" strokeWidth={2.2} /></button>
      <Popover open={open} onClose={() => setOpen(false)} align="right" width={180}>
        <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{cardName}</p></div>
        <PopoverItem icon={Eye} onClick={() => handle('View details')}>View details</PopoverItem>
        <PopoverItem icon={Download} onClick={() => handle('Download')}>Download chart</PopoverItem>
        <PopoverItem icon={Link2} onClick={() => handle('Copy link')}>Copy report link</PopoverItem>
      </Popover>
    </div>
  );
}

function Sparkline({ data, color = '#465FFF', height = 24, width = 60 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const max = Math.max(...data), min = Math.min(...data), rangeVal = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const toX = (i: number) => i * step;
  const toY = (v: number) => height - ((v - min) / rangeVal) * (height - 4) - 2;
  const points = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible"><polyline points={points} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* ============================================================
   Logistics Header
   ============================================================ */
function LogisticsHeader({ onCreateShipment }: { onCreateShipment: () => void }) {
  const { toast } = useToast();
  const [dateOpen, setDateOpen] = React.useState(false);
  const [regionOpen, setRegionOpen] = React.useState(false);
  const [carrierOpen, setCarrierOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [dateLabel, setDateLabel] = React.useState('May 24 – Jun 23, 2026');
  const [region, setRegion] = React.useState('All regions');
  const [carrier, setCarrier] = React.useState('All carriers');

  function handleExport(format: string) {
    setExportOpen(false);
    if (format === 'csv') {
      const headers = ['Tracking ID', 'Customer', 'Carrier', 'Origin', 'Destination', 'ETA', 'SLA', 'Status', 'Driver'];
      const rows = Data.shipments.map(s => [s.trackingId, s.customer, s.carrier, s.origin, s.destination, s.eta, s.sla, s.status, s.driver]);
      const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = `shipments-${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
      toast({ title: 'CSV exported', description: `${Data.shipments.length} shipments downloaded` });
    } else { toast({ title: `${format.toUpperCase()} export prepared` }); }
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]"><span>Dashboards</span><ChevronRight className="size-3 text-[var(--text-faint)]" /><span className="text-[var(--text-strong)]">Logistics</span></nav>
        <h1 className="ds-page-title">Logistics Control Tower</h1>
        <p className="mt-1.5 text-sm text-[var(--text-muted)]">Track shipments, route efficiency, delivery exceptions, fleet status, and warehouse throughput in real time.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)] px-2.5 py-1.5 dark:bg-[rgba(18,183,106,0.1)]"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" /></span><span className="text-xs font-medium text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live operations · synced 1 min ago</span></div>
        {/* Region */}
        <div className="relative">
          <button type="button" onClick={() => { setRegionOpen(p => !p); setDateOpen(false); setCarrierOpen(false); setExportOpen(false); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Globe className="size-4 text-[var(--text-muted)]" strokeWidth={2} /><span className="hidden sm:inline">{region}</span><ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', regionOpen && 'rotate-180')} strokeWidth={2.2} /></button>
          <Popover open={regionOpen} onClose={() => setRegionOpen(false)} width={180}><div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Region</p></div>{Data.REGIONS.map(r => <PopoverItem key={r} active={region === r} onClick={() => { setRegion(r); setRegionOpen(false); toast({ title: 'Region filter applied', description: r }); }}>{r}</PopoverItem>)}</Popover>
        </div>
        {/* Date range */}
        <div className="relative">
          <button type="button" onClick={() => { setDateOpen(p => !p); setRegionOpen(false); setCarrierOpen(false); setExportOpen(false); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><CalendarDays className="size-4 text-[var(--text-muted)]" strokeWidth={2} /><span className="hidden sm:inline">{dateLabel}</span><span className="sm:hidden">Date</span><ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', dateOpen && 'rotate-180')} strokeWidth={2.2} /></button>
          <Popover open={dateOpen} onClose={() => setDateOpen(false)} width={220}><div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Date range</p></div>{Data.LOGISTICS_DATE_PRESETS.map(p => <PopoverItem key={p.key} onClick={() => { setDateLabel(p.range); setDateOpen(false); toast({ title: 'Date range updated', description: p.label }); }}>{p.label}</PopoverItem>)}</Popover>
        </div>
        {/* Carrier */}
        <div className="relative">
          <button type="button" onClick={() => { setCarrierOpen(p => !p); setDateOpen(false); setRegionOpen(false); setExportOpen(false); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Filter className="size-4 text-[var(--text-muted)]" strokeWidth={2} /><span className="hidden sm:inline">{carrier}</span><span className="sm:hidden">Carrier</span><ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', carrierOpen && 'rotate-180')} strokeWidth={2.2} /></button>
          <Popover open={carrierOpen} onClose={() => setCarrierOpen(false)} width={160}><div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Carrier</p></div>{Data.CARRIER_FILTERS.map(c => <PopoverItem key={c} active={carrier === c} onClick={() => { setCarrier(c); setCarrierOpen(false); toast({ title: 'Carrier filter applied', description: c }); }}>{c}</PopoverItem>)}</Popover>
        </div>
        {/* Export */}
        <div className="relative">
          <button type="button" onClick={() => { setExportOpen(p => !p); setDateOpen(false); setRegionOpen(false); setCarrierOpen(false); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Download className="size-4 text-[var(--text-muted)]" strokeWidth={2} />Export<ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', exportOpen && 'rotate-180')} strokeWidth={2.2} /></button>
          <Popover open={exportOpen} onClose={() => setExportOpen(false)} width={180}><div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Export format</p></div><PopoverItem icon={Download} onClick={() => handleExport('csv')}>Export CSV</PopoverItem><PopoverItem icon={FileText} onClick={() => handleExport('pdf')}>Export PDF</PopoverItem><PopoverItem icon={FileText} onClick={() => handleExport('xls')}>Export XLS</PopoverItem></Popover>
        </div>
        {/* Create shipment */}
        <button type="button" onClick={onCreateShipment} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"><Plus className="size-4" strokeWidth={2.5} />Create shipment</button>
      </div>
    </div>
  );
}

/* ============================================================
   Live Delivery Map (real jvectormap)
   jvectormap's library wrapper uses `height: 100%` which only
   resolves against an explicit parent height (not min-height).
   We give the map container an explicit height and also defer
   mounting until the container has been measured, to avoid
   the "translate(Infinity, 0)" SVG error on initial render.
   ============================================================ */
function LiveDeliveryMap({ onMarkerClick }: { onMarkerClick: (marker: Data.MapMarker) => void }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);
  const [hovered, setHovered] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setReady(true);
      } else {
        raf = requestAnimationFrame(check);
      }
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, []);
  const markers = Data.mapMarkers.map(m => ({
    latLng: [m.lat, m.lng],
    name: `${m.shipmentId} — ${m.driver}`,
    style: { fill: m.slaStatus === 'on-time' ? '#12B76A' : m.slaStatus === 'at-risk' ? '#F79009' : '#F04438', r: m.type === 'warehouse' ? 8 : 5, borderWidth: 2, borderColor: '#fff' },
  })) as any[];

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Navigation className="size-5" strokeWidth={2} /></span><div><h2 className="text-base font-medium text-[var(--text-strong)]">Live Delivery Map</h2><p className="text-xs text-[var(--text-muted)]">Real-time shipment tracking — click marker for details.</p></div></div>
        <div className="flex items-center gap-1"><span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" /></span>Live</span><CardActionMenu cardName="Live Delivery Map" /></div>
      </div>
      {/* Metrics overlay */}
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Active</p><p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.mapMetrics.activeShipments.toLocaleString()}</p></div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">In transit</p><p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.mapMetrics.inTransit.toLocaleString()}</p></div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Delayed</p><p className="text-sm font-semibold tabular-nums text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">{Data.mapMetrics.delayed}</p></div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">On-time</p><p className="text-sm font-semibold tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{Data.mapMetrics.onTimeRate}%</p></div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Avg time</p><p className="text-sm font-semibold text-[var(--text-strong)]">{Data.mapMetrics.avgDeliveryTime}</p></div>
      </div>
      {/* Map — explicit height (not just minHeight) so jvectormap's
          `height: 100%` wrapper can resolve correctly. */}
      <div ref={containerRef} className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)]" style={{ height: 360 }}>
        {ready ? (
          React.createElement(VectorMap as any, { map: worldMill, backgroundColor: 'transparent', markerStyle: { initial: { fill: '#12B76A', r: 5 } }, markersSelectable: false, markers, zoomOnScroll: false, regionStyle: { initial: { fill: '#E5E7EB', fillOpacity: 1, stroke: 'none' }, hover: { fill: '#465FFF', fillOpacity: 0.3 } }, onMarkerClick: (e: any, code: number) => { onMarkerClick(Data.mapMarkers[code]); } })
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-2 border-[var(--color-brand-500)] border-t-transparent" />
          </div>
        )}
        <style jsx global>{`.jvectormap-container{background:transparent!important}.jvectormap-region.jvectormap-element{transition:fill .2s ease}.jvectormap-marker.jvectormap-element{cursor:pointer;transition:r .2s ease;filter:drop-shadow(0 2px 4px rgba(0,0,0,.2))}.jvectormap-tip{background:var(--popover)!important;border:1px solid var(--border)!important;border-radius:8px!important;padding:6px 10px!important;font-size:11px!important;font-weight:500!important;font-family:Outfit,sans-serif!important;color:var(--text-strong)!important;box-shadow:0 8px 24px -4px rgba(15,23,42,.15)!important;white-space:nowrap!important}.jvectormap-zoomin,.jvectormap-zoomout{display:none!important}`}</style>
        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)]/90 px-3 py-1.5 backdrop-blur">
          <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[var(--color-success-500)]" /><span className="text-[9px] text-[var(--text-body)]">On-time</span></span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[var(--color-warning-500)]" /><span className="text-[9px] text-[var(--text-body)]">At-risk</span></span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[var(--color-error-500)]" /><span className="text-[9px] text-[var(--text-body)]">Delayed</span></span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Shipment Tracker card
   ============================================================ */
function ShipmentTrackerCard() {
  const [activeStep, setActiveStep] = React.useState<number | null>(null);
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Package className="size-4" strokeWidth={2} /></span><h3 className="text-sm font-medium text-[var(--text-strong)]">Shipment Tracker</h3></div>
        <CardActionMenu cardName="Shipment Tracker" />
      </div>
      <div className="mb-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-3">
        <div className="flex items-center justify-between"><span className="text-xs font-medium text-[var(--text-strong)]">{Data.selectedShipment.trackingId}</span><StatusBadge tone="info" dot>{Data.selectedShipment.status}</StatusBadge></div>
        <div className="mt-1.5 grid grid-cols-2 gap-2 text-[10px]"><div><span className="text-[var(--text-subtle)]">Carrier</span><p className="font-medium text-[var(--text-body)]">{Data.selectedShipment.carrier}</p></div><div><span className="text-[var(--text-subtle)]">ETA</span><p className="font-medium text-[var(--text-body)]">{Data.selectedShipment.eta}</p></div></div>
        <p className="mt-1.5 text-[10px] text-[var(--text-muted)]">{Data.selectedShipment.route}</p>
      </div>
      {/* Timeline */}
      <ol className="relative space-y-3 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--border-subtle)]">
        {Data.selectedShipment.timeline.map((step, i) => (
          <li key={i} className="relative flex items-start gap-3 cursor-pointer" onClick={() => setActiveStep(activeStep === i ? null : i)}>
            <span className={cn('relative z-10 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-[var(--card)]', step.done ? 'bg-[var(--color-success-500)] text-white' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>
              {step.done ? <CheckCircle2 className="size-3" strokeWidth={2.5} /> : <Clock className="size-3" strokeWidth={2.5} />}
            </span>
            <div className="min-w-0 flex-1 rounded-lg border border-[var(--border-subtle)] p-2 transition hover:border-[var(--border-strong)]">
              <div className="flex items-center justify-between"><p className={cn('text-xs font-medium', step.done ? 'text-[var(--text-strong)]' : 'text-[var(--text-muted)]')}>{step.step}</p><span className="text-[10px] tabular-nums text-[var(--text-muted)]">{step.time}</span></div>
              {activeStep === i && <p className="mt-1 text-[10px] text-[var(--text-muted)]" style={{ animation: 'ecomPopoverIn 160ms ease-out' }}>{step.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ============================================================
   Fleet Health card
   ============================================================ */
function FleetHealthCard() {
  const vehicleIcons = { truck: Truck, van: Car, bike: Bike, ev: Zap };
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><Truck className="size-4" strokeWidth={2} /></span><h3 className="text-sm font-medium text-[var(--text-strong)]">Fleet Health</h3></div>
        <CardActionMenu cardName="Fleet Health" />
      </div>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Active</p><p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.fleetHealth.vehiclesActive}</p></div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Idle</p><p className="text-lg font-semibold tabular-nums text-[var(--text-body)]">{Data.fleetHealth.idle}</p></div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Maintenance</p><p className="text-lg font-semibold tabular-nums text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">{Data.fleetHealth.maintenanceDue}</p></div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Fuel avg</p><p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.fleetHealth.fuelAverage}%</p></div>
      </div>
      <div className="space-y-2 border-t border-[var(--border-subtle)] pt-3">
        {Data.fleetHealth.vehicles.map(v => {
          const Icon = vehicleIcons[v.icon as keyof typeof vehicleIcons];
          const pct = (v.active / v.total) * 100;
          return (
            <div key={v.type} className="group flex items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] p-2 transition hover:border-[var(--border-strong)]">
              <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[var(--surface-sunken)] text-[var(--text-muted)]"><Icon className="size-3.5" strokeWidth={2} /></span>
              <div className="min-w-0 flex-1"><div className="flex items-center justify-between"><span className="text-[10px] font-medium text-[var(--text-strong)]">{v.type}</span><span className="text-[10px] tabular-nums text-[var(--text-muted)]">{v.active}/{v.total}</span></div><div className="mt-1 h-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full bg-[var(--color-brand-500)] transition-[width] duration-700" style={{ width: `${pct}%` }} /></div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   Delivery Statistics chart
   ============================================================ */
function DeliveryStatisticsChart() {
  const series = Data.deliveryStats;
  const options: any = {
    chart: { type: 'bar', height: 320, fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, stacked: false, animations: { enabled: true, speed: 800, animateGradually: { enabled: true, delay: 50 }, dynamicAnimation: { enabled: true, speed: 350 } } },
    colors: ['#465FFF', '#12B76A', '#F79009', '#F04438'],
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 4 } },
    dataLabels: { enabled: false },
    grid: { borderColor: 'var(--border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 8, bottom: 0, left: 8 } },
    xaxis: { categories: series.map(p => p.date), labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' }, rotate: 0, trim: true, hideOverlappingLabels: true }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' }, formatter: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : `${v}` } },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, labels: { colors: 'var(--text-body)' }, markers: { size: 6, strokeWidth: 0, offsetX: -4 }, itemMargin: { horizontal: 12, vertical: 0 } },
    tooltip: { enabled: true, custom: ({ dataPointIndex }: any) => {
      const p = series[dataPointIndex];
      const slaRate = ((p.delivered / p.shipments) * 100).toFixed(1);
      return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:180px;"><div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${p.date}</div><div style="display:grid;grid-template-columns:1fr auto;gap:4px 16px;font-size:12px;"><span style="color:var(--text-body);">Shipments</span><span style="color:#465FFF;font-weight:600;font-variant-numeric:tabular-nums;">${p.shipments.toLocaleString()}</span><span style="color:var(--text-body);">Delivered</span><span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">${p.delivered.toLocaleString()}</span><span style="color:var(--text-body);">Delayed</span><span style="color:#F79009;font-weight:600;font-variant-numeric:tabular-nums;">${p.delayed}</span><span style="color:var(--text-body);">Returned</span><span style="color:#F04438;font-weight:600;font-variant-numeric:tabular-nums;">${p.returned}</span><span style="color:var(--text-body);">SLA rate</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">${slaRate}%</span></div></div>`;
    }},
  };
  const chartSeries = [
    { name: 'Shipments', data: series.map(p => p.shipments) },
    { name: 'Delivered', data: series.map(p => p.delivered) },
    { name: 'Delayed', data: series.map(p => p.delayed) },
    { name: 'Returned', data: series.map(p => p.returned) },
  ];
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><PackageCheck className="size-5" strokeWidth={2} /></span><div><h2 className="text-base font-medium text-[var(--text-strong)]">Delivery Statistics</h2><p className="text-xs text-[var(--text-muted)]">Shipment volume, delivery, delays, and returns over time.</p></div></div>
        <CardActionMenu cardName="Delivery Statistics" />
      </div>
      <Chart options={options} series={chartSeries} type="bar" height={320} />
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs"><span className="text-[var(--text-muted)]">SLA rate: <span className="font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">94.6%</span></span><span className="text-[var(--text-muted)]">Total shipped: <span className="font-medium tabular-nums text-[var(--text-strong)]">128,580</span></span></div>
    </section>
  );
}

/* ============================================================
   Warehouse Capacity card
   ============================================================ */
function WarehouseCapacityCard() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const statusColors = { healthy: '#12B76A', warning: '#F79009', critical: '#F04438' };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"><Warehouse className="size-5" strokeWidth={2} /></span><div><h2 className="text-base font-medium text-[var(--text-strong)]">Warehouse Capacity</h2><p className="text-xs text-[var(--text-muted)]">Live capacity and throughput by hub.</p></div></div>
        <CardActionMenu cardName="Warehouse Capacity" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Data.warehouses.map((w, i) => {
          const color = statusColors[w.status];
          const isHovered = hovered === i;
          return (
            <div key={w.id} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className={cn('group rounded-xl border p-3 transition', isHovered ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]' : 'border-[var(--border-subtle)]')}>
              <div className="mb-2 flex items-center justify-between"><span className="text-xs font-medium text-[var(--text-strong)]">{w.name}</span><span className="size-2 rounded-full" style={{ background: color }} /></div>
              <div className="relative mb-2">
                <svg width="100%" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--surface-sunken)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 32}`} strokeDashoffset={2 * Math.PI * 32 - (w.capacity / 100) * 2 * Math.PI * 32} transform="rotate(-90 40 40)" style={{ transition: 'stroke-dashoffset 700ms ease' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{w.capacity}%</span></div>
              </div>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]"><div className="overflow-hidden"><div className="grid grid-cols-2 gap-1 text-[9px] border-t border-[var(--border-subtle)] pt-2"><div><span className="text-[var(--text-subtle)]">In</span><p className="font-medium tabular-nums text-[var(--text-body)]">{w.inbound}</p></div><div><span className="text-[var(--text-subtle)]">Out</span><p className="font-medium tabular-nums text-[var(--text-body)]">{w.outbound}</p></div><div><span className="text-[var(--text-subtle)]">Queue</span><p className="font-medium tabular-nums text-[var(--text-body)]">{w.pickQueue}</p></div><div><span className="text-[var(--text-subtle)]">Staff</span><p className="font-medium tabular-nums text-[var(--text-body)]">{w.staffLoad}%</p></div></div></div></div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs"><span className="text-[var(--text-muted)]">Total hubs: <span className="font-medium text-[var(--text-strong)]">5</span></span><span className="text-[var(--text-muted)]">Warning: <span className="font-medium text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">East Hub at 91%</span></span></div>
    </section>
  );
}

/* ============================================================
   Route Efficiency card
   ============================================================ */
function RouteEfficiencyCard() {
  const statusConfig = { 'on-time': { color: '#12B76A', label: 'On-time' }, 'efficient': { color: '#12B76A', label: 'Efficient' }, traffic: { color: '#F79009', label: 'Traffic' }, weather: { color: '#F04438', label: 'Weather' } };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"><Navigation className="size-5" strokeWidth={2} /></span><div><h2 className="text-base font-medium text-[var(--text-strong)]">Route Efficiency</h2><p className="text-xs text-[var(--text-muted)]">On-time performance and delay signals by route.</p></div></div>
        <CardActionMenu cardName="Route Efficiency" />
      </div>
      <div className="space-y-2">
        {Data.routes.map(r => {
          const cfg = statusConfig[r.status];
          return (
            <div key={r.id} className="group rounded-xl border border-[var(--border-subtle)] p-3 transition hover:border-[var(--border-strong)]">
              <div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-xs font-medium text-[var(--text-strong)]">{r.name}</span><span className="inline-flex items-center rounded px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wide" style={{ background: `${cfg.color}18`, color: cfg.color }}>{cfg.label}</span></div><span className="text-xs font-medium tabular-nums text-[var(--text-strong)]">{r.onTimeRate}%</span></div>
              <div className="mb-2 h-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${r.onTimeRate}%`, background: cfg.color }} /></div>
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]"><span>{r.stops} stops · {r.miles} mi · {r.driver}</span>{r.delayReason && <span className="text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">{r.delayReason}</span>}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Exceptions Board
   ============================================================ */
function ExceptionsBoard() {
  const severityConfig = { info: { icon: Info, cls: 'border-l-[var(--color-info-500)]' }, warning: { icon: AlertTriangle, cls: 'border-l-[var(--color-warning-500)]' }, critical: { icon: AlertCircle, cls: 'border-l-[var(--color-error-500)]' } };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"><AlertCircle className="size-5" strokeWidth={2} /></span><div><h2 className="text-base font-medium text-[var(--text-strong)]">Exceptions Board</h2><p className="text-xs text-[var(--text-muted)]">Operational exceptions with recommended actions.</p></div></div>
        <span className="inline-flex items-center rounded-full bg-[var(--color-warning-50)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">{Data.exceptions.reduce((s, e) => s + e.count, 0)} total</span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {Data.exceptions.map(e => {
          const cfg = severityConfig[e.severity];
          const Icon = cfg.icon;
          return (
            <div key={e.id} className={cn('group rounded-xl border-l-4 border border-[var(--border-subtle)] p-3 transition hover:border-[var(--border-strong)]', cfg.cls)}>
              <div className="flex items-start gap-2"><span className={cn('inline-flex size-7 flex-shrink-0 items-center justify-center rounded-lg', e.severity === 'critical' ? 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]' : e.severity === 'warning' ? 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]' : 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]')}><Icon className="size-3.5" strokeWidth={2.2} /></span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><p className="text-sm font-medium text-[var(--text-strong)]">{e.type}</p><span className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{e.count}</span></div><p className="mt-0.5 text-[10px] text-[var(--text-muted)]">{e.detail}</p><div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]"><div className="overflow-hidden"><p className="mt-1.5 text-[10px] text-[var(--text-body)]"><span className="font-medium">Action:</span> {e.action}</p></div></div></div></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Carrier Performance card
   ============================================================ */
function CarrierPerformanceCard() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Truck className="size-5" strokeWidth={2} /></span><div><h2 className="text-base font-medium text-[var(--text-strong)]">Carrier Performance</h2><p className="text-xs text-[var(--text-muted)]">Comparison matrix — on-time, cost, damage, SLA.</p></div></div>
        <CardActionMenu cardName="Carrier Performance" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse">
          <thead><tr className="border-b border-[var(--border)]"><th className="py-2 pl-1 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Carrier</th><th className="py-2 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">On-time</th><th className="py-2 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Cost/delivery</th><th className="py-2 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Avg time</th><th className="py-2 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Damage</th><th className="py-2 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">SLA breaches</th></tr></thead>
          <tbody>
            {Data.carriers.map(c => (
              <tr key={c.id} className="border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40">
                <td className="py-2.5 pl-1 pr-2"><div className="flex items-center gap-2"><span className="inline-flex size-6 items-center justify-center rounded-md text-[9px] font-bold text-white" style={{ background: c.color }}>{c.name[0]}</span><span className="text-xs font-medium text-[var(--text-strong)]">{c.name}</span></div></td>
                <td className="py-2.5 px-2 text-right"><span className={cn('text-xs font-medium tabular-nums', c.onTimeRate >= 95 ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-body)]')}>{c.onTimeRate}%</span></td>
                <td className="py-2.5 px-2 text-right text-xs tabular-nums text-[var(--text-body)]">${c.costPerDelivery}</td>
                <td className="py-2.5 px-2 text-right text-xs tabular-nums text-[var(--text-body)]">{c.avgDeliveryTime}</td>
                <td className="py-2.5 px-2 text-right"><span className={cn('text-xs font-medium tabular-nums', c.damageRate > 1.5 ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--text-body)]')}>{c.damageRate}%</span></td>
                <td className="py-2.5 px-2 text-right"><span className={cn('text-xs font-medium tabular-nums', c.slaBreaches > 20 ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : c.slaBreaches > 10 ? 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]' : 'text-[var(--text-body)]')}>{c.slaBreaches}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs"><span className="text-[var(--text-muted)]">Best: <span className="font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">Local Fleet (97.8%)</span></span><span className="text-[var(--text-muted)]">Needs review: <span className="font-medium text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">USPS (91.2%)</span></span></div>
    </section>
  );
}

/* ============================================================
   Shipments table
   ============================================================ */
function ShipmentsTable({ shipments, onRowClick }: { shipments: Shipment[]; onRowClick: (s: Shipment) => void }) {
  const { toast } = useToast();
  const [search, setSearch] = React.useState('');
  const [carrierFilter, setCarrierFilter] = React.useState('All');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [carrierOpen, setCarrierOpen] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [actionMenuFor, setActionMenuFor] = React.useState<string | null>(null);
  const pageSize = 6;
  const carrierOptions = ['All', 'DHL', 'FedEx', 'UPS', 'USPS', 'Local Fleet'];
  const statusOptions = ['All', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed', 'Returned'];
  const filtered = shipments.filter(s => {
    if (carrierFilter !== 'All' && s.carrier !== carrierFilter) return false;
    if (statusFilter !== 'All' && s.status !== statusFilter) return false;
    if (search) { const q = search.toLowerCase(); if (!s.trackingId.toLowerCase().includes(q) && !s.customer.toLowerCase().includes(q) && !s.driver.toLowerCase().includes(q)) return false; }
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);
  const slaTone = { 'On-time': 'success', 'At-risk': 'warning', 'Delayed': 'error' } as const;
  const statusTone = { 'In Transit': 'info', 'Out for Delivery': 'brand', 'Delivered': 'success', 'Delayed': 'error', 'Returned': 'neutral' } as const;
  function handleAction(action: string, s: Shipment) { setActionMenuFor(null); toast({ title: `${action} — ${s.trackingId}`, description: s.customer }); }
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2"><span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Package className="size-5" strokeWidth={2} /></span><div><h2 className="text-base font-medium text-[var(--text-strong)]">Shipments</h2><p className="text-xs text-[var(--text-muted)]">All active and historical shipments — click row for detail.</p></div></div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} /><input type="search" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search shipments..." className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-xs font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)] sm:w-48" /></div>
          <div className="relative"><button type="button" onClick={() => { setCarrierOpen(p => !p); setStatusOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Carrier<ChevronDown className={cn('size-3 transition-transform', carrierOpen && 'rotate-180')} strokeWidth={2.2} /></button><Popover open={carrierOpen} onClose={() => setCarrierOpen(false)} align="right" width={140}>{carrierOptions.map(c => <PopoverItem key={c} active={carrierFilter === c} onClick={() => { setCarrierFilter(c); setCarrierOpen(false); setPage(1); }}>{c}</PopoverItem>)}</Popover></div>
          <div className="relative"><button type="button" onClick={() => { setStatusOpen(p => !p); setCarrierOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Status<ChevronDown className={cn('size-3 transition-transform', statusOpen && 'rotate-180')} strokeWidth={2.2} /></button><Popover open={statusOpen} onClose={() => setStatusOpen(false)} align="right" width={150}>{statusOptions.map(s => <PopoverItem key={s} active={statusFilter === s} onClick={() => { setStatusFilter(s); setStatusOpen(false); setPage(1); }}>{s}</PopoverItem>)}</Popover></div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse">
          <thead><tr className="border-b border-[var(--border)]"><th className="py-2.5 pl-1 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Tracking ID</th><th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Customer</th><th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Carrier</th><th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Origin</th><th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Destination</th><th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">ETA</th><th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">SLA</th><th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Status</th><th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Driver</th><th className="py-2.5 pl-2 pr-1"></th></tr></thead>
          <tbody>
            {paged.length === 0 ? <tr><td colSpan={10} className="py-12 text-center"><p className="text-sm font-medium text-[var(--text-strong)]">No shipments found</p><p className="mt-1 text-xs text-[var(--text-muted)]">Try adjusting your search or filters.</p></td></tr> : paged.map(s => (
              <tr key={s.id} onClick={() => onRowClick(s)} className="group cursor-pointer border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40">
                <td className="py-3 pl-1 pr-2"><span className="text-xs font-medium text-[var(--text-strong)]">{s.trackingId}</span></td>
                <td className="py-3 px-2"><span className="text-xs text-[var(--text-body)]">{s.customer}</span></td>
                <td className="py-3 px-2"><span className="text-[10px] text-[var(--text-muted)]">{s.carrier}</span></td>
                <td className="py-3 px-2"><span className="inline-flex items-center gap-0.5 text-[10px] text-[var(--text-muted)]"><MapPin className="size-2.5" strokeWidth={2.2} />{s.origin}</span></td>
                <td className="py-3 px-2"><span className="inline-flex items-center gap-0.5 text-[10px] text-[var(--text-muted)]"><MapPin className="size-2.5" strokeWidth={2.2} />{s.destination}</span></td>
                <td className="py-3 px-2"><span className="text-[10px] text-[var(--text-body)]">{s.eta}</span></td>
                <td className="py-3 px-2"><StatusBadge tone={slaTone[s.sla]} dot>{s.sla}</StatusBadge></td>
                <td className="py-3 px-2"><StatusBadge tone={statusTone[s.status]} dot>{s.status}</StatusBadge></td>
                <td className="py-3 px-2"><div className="flex items-center gap-1.5"><UserAvatar name={s.driver} size="xs" /><span className="text-[10px] text-[var(--text-muted)]">{s.driver}</span></div></td>
                <td className="py-3 pl-2 pr-1 text-right"><div className="relative inline-block" onClick={e => e.stopPropagation()}><button type="button" onClick={() => setActionMenuFor(actionMenuFor === s.id ? null : s.id)} className="flex size-6 cursor-pointer items-center justify-center rounded-md text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] group-hover:opacity-100" aria-label={`Actions for ${s.trackingId}`}><MoreHorizontal className="size-3.5" strokeWidth={2.2} /></button><Popover open={actionMenuFor === s.id} onClose={() => setActionMenuFor(null)} align="right" width={160}><PopoverItem icon={Eye} onClick={() => handleAction('View', s)}>View details</PopoverItem><PopoverItem icon={RefreshCw} onClick={() => handleAction('Reroute', s)}>Reroute</PopoverItem><PopoverItem icon={Package} onClick={() => handleAction('Hold', s)}>Hold shipment</PopoverItem><div className="my-1 h-px bg-[var(--border-subtle)]" /><PopoverItem icon={X} danger onClick={() => handleAction('Cancel', s)}>Cancel shipment</PopoverItem></Popover></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs"><span className="text-[var(--text-muted)]">Showing {paged.length} of {filtered.length} shipments</span><div className="flex items-center gap-1"><button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={current === 1} className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-50"><ChevronRight className="size-3 rotate-180" strokeWidth={2.5} />Prev</button><span className="px-2 text-xs tabular-nums text-[var(--text-muted)]">{current} / {totalPages}</span><button type="button" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={current === totalPages} className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-50">Next<ChevronRight className="size-3" strokeWidth={2.5} /></button></div></div>
    </section>
  );
}

/* ============================================================
   Create Shipment Drawer
   ============================================================ */
function CreateShipmentDrawer({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (s: Shipment) => void }) {
  const [form, setForm] = React.useState({ customer: '', carrier: 'DHL' as Shipment['carrier'], origin: '', destination: '', priority: 'Standard', pickupTime: '', notes: '' });
  React.useEffect(() => { if (!open) return; function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); } document.addEventListener('keydown', esc); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; }; }, [open, onClose]);
  if (!open || typeof document === 'undefined') return null;
  function handleSubmit() { if (!form.customer.trim() || !form.origin.trim() || !form.destination.trim()) return; const newShipment: Shipment = { id: `s${Date.now()}`, trackingId: `#${Math.floor(100000 + Math.random() * 899999)}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`, customer: form.customer.trim(), carrier: form.carrier, origin: form.origin.trim(), destination: form.destination.trim(), eta: form.pickupTime || 'TBD', sla: 'On-time', status: 'In Transit', driver: 'Unassigned' }; onCreate(newShipment); setForm({ customer: '', carrier: 'DHL', origin: '', destination: '', priority: 'Standard', pickupTime: '', notes: '' }); onClose(); }
  return createPortal(<><div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} /><aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Create shipment"><div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4"><div className="flex items-center gap-2.5"><span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white"><Plus className="size-4.5" strokeWidth={2.2} /></span><div><h3 className="text-base font-medium text-[var(--text-strong)]">Create Shipment</h3><p className="text-xs text-[var(--text-muted)]">Add a new shipment to the queue.</p></div></div><button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" strokeWidth={2.2} /></button></div><div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5"><div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Customer <span className="text-[var(--color-error-600)]">*</span></label><input type="text" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} placeholder="e.g. Acme Studio" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]" /></div><div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Carrier</label><select value={form.carrier} onChange={e => setForm({ ...form, carrier: e.target.value as Shipment['carrier'] })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"><option>DHL</option><option>FedEx</option><option>UPS</option><option>USPS</option><option>Local Fleet</option></select></div><div className="grid grid-cols-2 gap-3"><div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Origin <span className="text-[var(--color-error-600)]">*</span></label><input type="text" value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} placeholder="New York, NY" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]" /></div><div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Destination <span className="text-[var(--color-error-600)]">*</span></label><input type="text" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} placeholder="Boston, MA" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]" /></div></div><div className="grid grid-cols-2 gap-3"><div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Priority</label><select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"><option>Standard</option><option>Express</option><option>Overnight</option><option>Same-day</option></select></div><div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Pickup time</label><input type="datetime-local" value={form.pickupTime} onChange={e => setForm({ ...form, pickupTime: e.target.value })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]" /></div></div><div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Notes</label><textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Internal notes (optional)" className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]" /></div></div><div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4"><button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Cancel</button><button type="button" onClick={handleSubmit} disabled={!form.customer.trim() || !form.origin.trim() || !form.destination.trim()} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50">Create shipment</button></div></aside></>, document.body);
}

/* ============================================================
   Shipment Detail Drawer
   ============================================================ */
function ShipmentDetailDrawer({ shipment, onClose }: { shipment: Shipment | null; onClose: () => void }) {
  React.useEffect(() => { if (!shipment) return; function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); } document.addEventListener('keydown', esc); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; }; }, [shipment, onClose]);
  if (!shipment || typeof document === 'undefined') return null;
  const slaTone = { 'On-time': 'success', 'At-risk': 'warning', 'Delayed': 'error' } as const;
  return createPortal(<><div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} /><aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Shipment detail"><div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4"><div className="flex items-center gap-2.5"><span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--surface-sunken)] text-[var(--text-muted)]"><Package className="size-4.5" strokeWidth={2} /></span><div><h3 className="text-base font-medium text-[var(--text-strong)]">{shipment.trackingId}</h3><p className="text-xs text-[var(--text-muted)]">{shipment.customer} · {shipment.carrier}</p></div></div><button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" strokeWidth={2.2} /></button></div><div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5"><div className="grid grid-cols-2 gap-2"><div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Status</p><StatusBadge tone={slaTone[shipment.sla]} dot>{shipment.status}</StatusBadge></div><div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">ETA</p><p className="text-sm font-medium text-[var(--text-strong)]">{shipment.eta}</p></div><div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Origin</p><p className="text-sm font-medium text-[var(--text-strong)]">{shipment.origin}</p></div><div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Destination</p><p className="text-sm font-medium text-[var(--text-strong)]">{shipment.destination}</p></div><div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Carrier</p><p className="text-sm font-medium text-[var(--text-strong)]">{shipment.carrier}</p></div><div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Driver</p><p className="text-sm font-medium text-[var(--text-strong)]">{shipment.driver}</p></div></div></div></aside></>, document.body);
}

/* ============================================================
   Main Logistics Dashboard export
   ============================================================ */
export function LogisticsDashboard() {
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [shipments, setShipments] = React.useState<Shipment[]>(Data.shipments);
  const [selectedShipment, setSelectedShipment] = React.useState<Shipment | null>(null);
  function handleCreate(s: Shipment) { setShipments(prev => [s, ...prev]); toast({ title: 'Shipment created', description: `${s.trackingId} — ${s.customer}` }); }
  return (
    <div className="space-y-6">
      <LogisticsHeader onCreateShipment={() => setDrawerOpen(true)} />
      {/* Hero: Live Delivery Map (left) + Shipment Tracker + Fleet Health (right) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <LiveDeliveryMap onMarkerClick={(m) => { toast({ title: m.shipmentId, description: `${m.driver} — ${m.eta}` }); }} />
        <div className="flex flex-col gap-4"><ShipmentTrackerCard /><FleetHealthCard /></div>
      </div>
      {/* Delivery Statistics (full width) */}
      <DeliveryStatisticsChart />
      {/* Warehouse Capacity + Route Efficiency */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2"><WarehouseCapacityCard /><RouteEfficiencyCard /></div>
      {/* Exceptions Board + Carrier Performance */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2"><ExceptionsBoard /><CarrierPerformanceCard /></div>
      {/* Shipments table */}
      <ShipmentsTable shipments={shipments} onRowClick={setSelectedShipment} />
      {/* Drawers */}
      <CreateShipmentDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onCreate={handleCreate} />
      <ShipmentDetailDrawer shipment={selectedShipment} onClose={() => setSelectedShipment(null)} />
    </div>
  );
}
