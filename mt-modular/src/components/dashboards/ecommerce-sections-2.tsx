'use client';

import * as React from 'react';
import {
  ArrowUp, ArrowDown, MoreHorizontal, AlertTriangle, PackageCheck, Truck,
  Users, CreditCard, Star, Heart, Search, RotateCcw, Activity, Eye,
  ShoppingCart, Clock, MapPin, ChevronRight, ChevronDown, Plus, Bell,
  TrendingUp, Package, AlertCircle, CheckCircle2, XCircle, Globe, Smartphone, FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { useToast } from '@/hooks/use-toast';
import * as Data from './ecommerce-data';
import { AnimatedSparkline, AnimatedProgress } from './ecommerce-sections-1';
import { Popover, PopoverItem } from './ecommerce-interactions';

/* ============================================================
   Product Performance Table
   ============================================================ */
function ProductPerformanceTable() {
  const { toast } = useToast();
  const [actionMenuFor, setActionMenuFor] = React.useState<string | null>(null);
  const [showAll, setShowAll] = React.useState(false);
  const visibleProducts = showAll ? Data.products : Data.products.slice(0, 4);

  function handleProductAction(action: string, product: Data.Product) {
    setActionMenuFor(null);
    const messages: Record<string, string> = {
      view: `Viewing ${product.name}`,
      edit: `Editing ${product.name}`,
      restock: `Restock initiated for ${product.name} (+${product.stockTotal} units)`,
      feature: `${product.name} marked as featured`,
      duplicate: `${product.name} duplicated`,
      archive: `${product.name} archived`,
    };
    toast({ title: messages[action] || 'Action completed', description: product.category });
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium text-[var(--text-strong)]">Product Performance</h2>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">Top products ranked by units sold with margin, stock, and return signals.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAll((p) => !p)}
          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
        >
          {showAll ? 'Show less' : 'View all'} <ChevronRight className={cn('size-3 transition-transform', showAll && 'rotate-90')} strokeWidth={2.5} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-3 pl-1 pr-3 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Product</th>
              <th className="py-3 px-3 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Category</th>
              <th className="py-3 px-3 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Units</th>
              <th className="py-3 px-3 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Revenue</th>
              <th className="py-3 px-3 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Margin</th>
              <th className="py-3 px-3 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Stock</th>
              <th className="py-3 px-3 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Returns</th>
              <th className="py-3 px-3 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Trend</th>
              <th className="py-3 pl-3 pr-1"></th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((p) => {
              const stockPct = (p.stock / p.stockTotal) * 100;
              const stockTone = stockPct < 15 ? 'error' : stockPct < 35 ? 'warning' : 'success';
              return (
                <tr key={p.id} className="group border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40">
                  <td className="py-3.5 pl-1 pr-3">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[var(--text-strong)]">{p.name}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.badges.map((b) => (
                          <span key={b} className={cn(
                            'inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide',
                            b === 'Low stock' && 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
                            b === 'Best seller' && 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
                            b === 'High margin' && 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
                            b === 'Return risk' && 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
                          )}>{b}</span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-[var(--text-muted)]">{p.category}</td>
                  <td className="py-3.5 px-3 text-right text-sm font-medium tabular-nums text-[var(--text-strong)]">{p.unitsSold.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-right text-sm font-medium tabular-nums text-[var(--text-strong)]">{p.revenue}</td>
                  <td className="py-3.5 px-3 text-right">
                    <span className={cn('text-sm font-medium tabular-nums', p.margin >= 40 ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-body)]')}>{p.margin}%</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14"><AnimatedProgress value={stockPct} color={stockTone === 'error' ? '#F04438' : stockTone === 'warning' ? '#F79009' : '#12B76A'} height={5} /></div>
                      <span className="text-xs tabular-nums text-[var(--text-muted)]">{p.stock}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className={cn('text-sm font-medium tabular-nums', p.returnRate >= 5 ? 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]' : 'text-[var(--text-body)]')}>{p.returnRate}%</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex justify-center"><AnimatedSparkline data={p.trend} color="#465FFF" height={28} width={80} /></div>
                  </td>
                  <td className="py-3.5 pl-3 pr-1 text-right">
                    <div className="relative inline-block">
                      <button
                        type="button"
                        onClick={() => setActionMenuFor(actionMenuFor === p.id ? null : p.id)}
                        className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] group-hover:opacity-100"
                        aria-label={`Actions for ${p.name}`}
                      >
                        <MoreHorizontal className="size-4" strokeWidth={2.2} />
                      </button>
                      <Popover open={actionMenuFor === p.id} onClose={() => setActionMenuFor(null)} align="right" width={180}>
                        <PopoverItem icon={Eye} onClick={() => handleProductAction('view', p)}>View details</PopoverItem>
                        <PopoverItem icon={ChevronRight} onClick={() => handleProductAction('edit', p)}>Edit product</PopoverItem>
                        <PopoverItem icon={PackageCheck} onClick={() => handleProductAction('restock', p)}>Restock</PopoverItem>
                        <PopoverItem icon={Star} onClick={() => handleProductAction('feature', p)}>Mark as featured</PopoverItem>
                        <PopoverItem icon={Package} onClick={() => handleProductAction('duplicate', p)}>Duplicate</PopoverItem>
                        <div className="my-1 h-px bg-[var(--border-subtle)]" />
                        <PopoverItem icon={XCircle} danger onClick={() => handleProductAction('archive', p)}>Archive</PopoverItem>
                      </Popover>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Footer summary */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Showing {visibleProducts.length} of {Data.products.length} products</span>
        <div className="flex items-center gap-3">
          <span className="text-[var(--text-muted)]">Total revenue: <span className="font-medium tabular-nums text-[var(--text-strong)]">$7.4M</span></span>
          <span className="text-[var(--text-muted)]">Avg margin: <span className="font-medium tabular-nums text-[var(--text-success-600)] dark:text-[var(--color-success-500)]">38.8%</span></span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Inventory Risk card
   ============================================================ */
function InventoryRiskCard() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium text-[var(--text-strong)]">Inventory Risk</h2>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">Stockout risk indicators with reorder status and supplier ETA.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-error-50)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]">
          <AlertTriangle className="size-3" strokeWidth={2.5} />3 items
        </span>
      </div>
      <div className="space-y-3">
        {Data.inventoryRisk.map((item) => {
          const stockPct = (item.unitsLeft / item.stockTotal) * 100;
          const color = item.severity === 'critical' ? '#F04438' : '#F79009';
          return (
            <div key={item.name} className="group rounded-xl border border-[var(--border-subtle)] p-3.5 transition hover:border-[var(--border-strong)]">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--text-strong)]">{item.name}</p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">{item.unitsLeft} units left</p>
                </div>
                <span className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide',
                  item.severity === 'critical' && 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
                  item.severity === 'warning' && 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
                )}>
                  {item.severity === 'critical' && <XCircle className="size-2.5" strokeWidth={2.5} />}
                  {item.severity === 'warning' && <AlertCircle className="size-2.5" strokeWidth={2.5} />}
                  {item.severity === 'critical' ? 'Critical' : 'Warning'}
                </span>
              </div>
              <div className="mb-2"><AnimatedProgress value={stockPct} color={color} height={6} /></div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">{item.reorderStatus}</span>
                <span className={cn('font-medium tabular-nums', item.daysRemaining === 0 ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--text-body)]')}>
                  {item.daysRemaining === 0 ? 'Reorder now' : `${item.daysRemaining} days left`}
                </span>
              </div>
              {/* Hover reveal: supplier ETA + reorder qty */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-2.5 text-xs">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Supplier ETA</p>
                      <p className="font-medium text-[var(--text-body)]">{item.supplierEta}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Reorder qty</p>
                      <p className="font-medium text-[var(--text-body)]">{item.reorderQty} units</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Footer insight */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Next supplier delivery: <span className="font-medium text-[var(--text-body)]">5-7 days</span></span>
        <button className="inline-flex cursor-pointer items-center gap-1 font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">
          Create PO <ChevronRight className="size-3" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   Fulfillment Queue card
   ============================================================ */
function FulfillmentQueueCard() {
  const total = Data.fulfillmentQueue.readyToShip + Data.fulfillmentQueue.awaitingPickup + Data.fulfillmentQueue.delayed + Data.fulfillmentQueue.returned + Data.fulfillmentQueue.failedDelivery;
  const items = [
    { label: 'Ready to ship', count: Data.fulfillmentQueue.readyToShip, color: '#465FFF', icon: PackageCheck },
    { label: 'Awaiting pickup', count: Data.fulfillmentQueue.awaitingPickup, color: '#0BA5EC', icon: Clock },
    { label: 'Delayed', count: Data.fulfillmentQueue.delayed, color: '#F79009', icon: AlertTriangle },
    { label: 'Returned', count: Data.fulfillmentQueue.returned, color: '#7A5AF8', icon: RotateCcw },
    { label: 'Failed delivery', count: Data.fulfillmentQueue.failedDelivery, color: '#F04438', icon: XCircle },
  ];
  // Precompute cumulative offset for animation delays (no mutation inside map)
  const segments = items.reduce<Array<{ item: typeof items[number]; pct: number; cumulative: number }>>(
    (acc, item) => {
      const pct = (item.count / total) * 100;
      const prev = acc.length > 0 ? acc[acc.length - 1].cumulative + acc[acc.length - 1].pct : 0;
      acc.push({ item, pct, cumulative: prev });
      return acc;
    },
    [],
  );

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-medium text-[var(--text-strong)]">Fulfillment Queue</h2>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">Live order pipeline from ready-to-ship to delivery outcomes.</p>
      </div>
      {/* Segmented progress bar */}
      <div className="mb-4 flex h-3 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
        {segments.map(({ item, pct, cumulative }) => (
          <div
            key={item.label}
            className="h-full transition-all hover:brightness-110"
            style={{ width: `${pct}%`, background: item.color, animationDelay: `${cumulative * 4}ms` }}
            title={`${item.label}: ${item.count}`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-[var(--border-subtle)] p-2.5 transition hover:border-[var(--border-strong)]">
              <div className="flex items-center gap-1.5">
                <Icon className={cn('size-3.5', item.color === '#F04438' && 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]', item.color === '#F79009' && 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]', item.color === '#465FFF' && 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]', item.color === '#0BA5EC' && 'text-[var(--color-info-600)] dark:text-[var(--color-info-500)]', item.color === '#7A5AF8' && 'text-[#7a5af8]')} strokeWidth={2.2} />
                <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{item.label}</span>
              </div>
              <p className="mt-1 text-lg font-semibold tabular-nums text-[var(--text-strong)]">{item.count}</p>
              <p className="text-[10px] tabular-nums text-[var(--text-subtle)]">{((item.count / total) * 100).toFixed(1)}%</p>
            </div>
          );
        })}
      </div>
      {/* Footer insight */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Avg processing time: <span className="font-medium text-[var(--text-body)]">4.2h</span></span>
        <span className="text-[var(--text-muted)]">On-time rate: <span className="font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">96.4%</span></span>
      </div>
    </section>
  );
}

/* ============================================================
   Realtime Monitor — 5 cards in a responsive grid
   ============================================================ */
function RealtimeMonitor() {
  const iconMap = {
    visitors: Users,
    carts: ShoppingCart,
    payments: CreditCard,
    reviews: Star,
    wishlists: Heart,
  };
  const colorMap = {
    visitors: { tile: 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]', spark: '#465FFF' },
    carts: { tile: 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]', spark: '#0BA5EC' },
    payments: { tile: 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]', spark: '#F04438' },
    reviews: { tile: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]', spark: '#F79009' },
    wishlists: { tile: 'bg-[#fce7f3] text-[#ec4899] dark:bg-[rgba(236,72,153,0.16)] dark:text-[#f9a8d4]', spark: '#EC4899' },
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium text-[var(--text-strong)]">Realtime Monitor</h2>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">Live signals across visitors, carts, payments, reviews, and wishlists.</p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-50)] px-2.5 py-1 dark:bg-[rgba(18,183,106,0.1)]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" />
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Data.realtimeCards.map((card) => {
          const Icon = iconMap[card.icon];
          const colors = colorMap[card.icon];
          return (
            <div
              key={card.id}
              className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--card)] p-3.5 transition hover:border-[var(--border-strong)] hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className={cn('inline-flex size-9 items-center justify-center rounded-xl', colors.tile)}>
                  <Icon className="size-4.5" strokeWidth={2} />
                </span>
                <span className={cn(
                  'inline-flex items-center gap-0.5 text-[10px] font-medium',
                  card.trend === 'up' && 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]',
                  card.trend === 'down' && 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]',
                  card.trend === 'flat' && 'text-[var(--text-muted)]',
                )}>
                  {card.trend === 'up' && <ArrowUp className="size-2.5" strokeWidth={2.5} />}
                  {card.trend === 'down' && <ArrowDown className="size-2.5" strokeWidth={2.5} />}
                  {card.trendValue}
                </span>
              </div>
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{card.label}</p>
              <p className="text-xl font-semibold tabular-nums text-[var(--text-strong)]">{card.value}</p>
              <p className="mt-0.5 truncate text-[10px] text-[var(--text-subtle)]" title={card.detail}>{card.detail}</p>
              <div className="mt-2"><AnimatedSparkline data={card.sparkline} color={colors.spark} height={24} width={140} /></div>
            </div>
          );
        })}
      </div>
      {/* Footer insight */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Last updated: <span className="font-medium text-[var(--text-body)]">12 seconds ago</span></span>
        <span className="inline-flex items-center gap-1 text-[var(--text-muted)]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" />
          </span>
          Auto-refreshing every 30s
        </span>
      </div>
    </section>
  );
}

/* ============================================================
   Recent Orders table + Customer Activity panel (side by side)
   ============================================================ */
function RecentOrdersSection({ orders, orderPulse }: { orders: Data.Order[]; orderPulse: number }) {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = React.useState<'All' | Data.OrderStatus>('All');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [actionMenuFor, setActionMenuFor] = React.useState<string | null>(null);
  const [advancedFilters, setAdvancedFilters] = React.useState<{
    channel: 'All' | Data.Order['channel'];
    payment: 'All' | Data.PaymentStatus;
    fulfillment: 'All' | Data.FulfillmentStatus;
    risk: 'All' | Data.RiskLevel;
    minAmount: string;
    maxAmount: string;
  }>({
    channel: 'All', payment: 'All', fulfillment: 'All', risk: 'All', minAmount: '', maxAmount: '',
  });
  const [draftFilters, setDraftFilters] = React.useState(advancedFilters);
  const [showAllActivity, setShowAllActivity] = React.useState(false);
  const pageSize = 5;

  // Reset to page 1 when a new order is added
  React.useEffect(() => {
    if (orderPulse > 0) setPage(1);
  }, [orderPulse]);

  const filtered = React.useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== 'All' && o.status !== statusFilter) return false;
      if (advancedFilters.channel !== 'All' && o.channel !== advancedFilters.channel) return false;
      if (advancedFilters.payment !== 'All' && o.payment !== advancedFilters.payment) return false;
      if (advancedFilters.fulfillment !== 'All' && o.fulfillment !== advancedFilters.fulfillment) return false;
      if (advancedFilters.risk !== 'All' && o.risk !== advancedFilters.risk) return false;
      if (advancedFilters.minAmount) {
        const amt = parseInt(o.amount.replace(/[^0-9]/g, ''), 10);
        if (amt < parseInt(advancedFilters.minAmount, 10)) return false;
      }
      if (advancedFilters.maxAmount) {
        const amt = parseInt(o.amount.replace(/[^0-9]/g, ''), 10);
        if (amt > parseInt(advancedFilters.maxAmount, 10)) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        if (!o.id.toLowerCase().includes(q) && !o.customer.toLowerCase().includes(q) && !o.product.toLowerCase().includes(q) && !o.channel.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [orders, statusFilter, search, advancedFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);

  const statusTone: Record<Data.OrderStatus, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
    Delivered: 'success', Pending: 'warning', Cancelled: 'error', Shipped: 'info', Refunded: 'neutral',
  };
  const channelIcon = { Web: Globe, Mobile: Smartphone, App: Smartphone };
  const activeFilterCount = (advancedFilters.channel !== 'All' ? 1 : 0) + (advancedFilters.payment !== 'All' ? 1 : 0) + (advancedFilters.fulfillment !== 'All' ? 1 : 0) + (advancedFilters.risk !== 'All' ? 1 : 0) + (advancedFilters.minAmount ? 1 : 0) + (advancedFilters.maxAmount ? 1 : 0);

  function applyFilters() {
    setAdvancedFilters(draftFilters);
    setFilterOpen(false);
    setPage(1);
    toast({ title: 'Filters applied', description: `${activeFilterCount} filter(s) active` });
  }
  function resetFilters() {
    const cleared = { channel: 'All' as const, payment: 'All' as const, fulfillment: 'All' as const, risk: 'All' as const, minAmount: '', maxAmount: '' };
    setDraftFilters(cleared);
    setAdvancedFilters(cleared);
    setFilterOpen(false);
    setPage(1);
  }

  function handleOrderAction(action: string, order: Data.Order) {
    setActionMenuFor(null);
    const messages: Record<string, string> = {
      view: `Viewing ${order.id}`,
      edit: `Editing ${order.id}`,
      refund: `Refund initiated for ${order.id} — ${order.amount}`,
      duplicate: `Order ${order.id} duplicated`,
      print: `Invoice for ${order.id} sent to print`,
      delete: `Order ${order.id} removed`,
    };
    toast({ title: messages[action] || 'Action completed', description: order.customer });
  }

  const visibleActivity = showAllActivity ? Data.customerActivity : Data.customerActivity.slice(0, 4);

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
      {/* Recent Orders */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Recent Orders</h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">Live order stream with status, fulfillment, and risk signals.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
              <input
                type="search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search orders, customers, products..."
                className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-xs font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)] sm:w-64"
              />
            </div>
            {/* Filter button + popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setFilterOpen((p) => !p); setActionMenuFor(null); }}
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                aria-label="Advanced filters"
              >
                <MoreHorizontal className="size-3.5" strokeWidth={2.2} />Filter
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-[9px] font-medium text-white">{activeFilterCount}</span>
                )}
              </button>
              <Popover open={filterOpen} onClose={() => setFilterOpen(false)} align="right" width={280}>
                <div className="px-2 py-1.5">
                  <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Advanced filters</p>
                </div>
                {/* Channel */}
                <div className="px-2 py-1">
                  <label className="mb-1 block px-1 text-[10px] font-medium text-[var(--text-muted)]">Channel</label>
                  <select
                    value={draftFilters.channel}
                    onChange={(e) => setDraftFilters({ ...draftFilters, channel: e.target.value as typeof draftFilters.channel })}
                    className="h-8 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 text-xs text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)]"
                  >
                    <option value="All">All channels</option>
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="App">App</option>
                  </select>
                </div>
                {/* Payment */}
                <div className="px-2 py-1">
                  <label className="mb-1 block px-1 text-[10px] font-medium text-[var(--text-muted)]">Payment status</label>
                  <select
                    value={draftFilters.payment}
                    onChange={(e) => setDraftFilters({ ...draftFilters, payment: e.target.value as typeof draftFilters.payment })}
                    className="h-8 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 text-xs text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)]"
                  >
                    <option value="All">All statuses</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                {/* Fulfillment */}
                <div className="px-2 py-1">
                  <label className="mb-1 block px-1 text-[10px] font-medium text-[var(--text-muted)]">Fulfillment</label>
                  <select
                    value={draftFilters.fulfillment}
                    onChange={(e) => setDraftFilters({ ...draftFilters, fulfillment: e.target.value as typeof draftFilters.fulfillment })}
                    className="h-8 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 text-xs text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)]"
                  >
                    <option value="All">All</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Awaiting pickup">Awaiting pickup</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>
                {/* Risk */}
                <div className="px-2 py-1">
                  <label className="mb-1 block px-1 text-[10px] font-medium text-[var(--text-muted)]">Risk level</label>
                  <select
                    value={draftFilters.risk}
                    onChange={(e) => setDraftFilters({ ...draftFilters, risk: e.target.value as typeof draftFilters.risk })}
                    className="h-8 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 text-xs text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)]"
                  >
                    <option value="All">All risk levels</option>
                    <option value="Low risk">Low risk</option>
                    <option value="Medium risk">Medium risk</option>
                    <option value="High risk">High risk</option>
                  </select>
                </div>
                {/* Amount range */}
                <div className="px-2 py-1">
                  <label className="mb-1 block px-1 text-[10px] font-medium text-[var(--text-muted)]">Amount range ($)</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      placeholder="Min"
                      value={draftFilters.minAmount}
                      onChange={(e) => setDraftFilters({ ...draftFilters, minAmount: e.target.value })}
                      className="h-8 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 text-xs text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)]"
                    />
                    <span className="text-[var(--text-subtle)]">—</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={draftFilters.maxAmount}
                      onChange={(e) => setDraftFilters({ ...draftFilters, maxAmount: e.target.value })}
                      className="h-8 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 text-xs text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)]"
                    />
                  </div>
                </div>
                {/* Actions */}
                <div className="mt-2 flex items-center gap-2 border-t border-[var(--border-subtle)] px-2 py-2">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="flex-1 cursor-pointer rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={applyFilters}
                    className="flex-1 cursor-pointer rounded-lg bg-[var(--color-brand-500)] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]"
                  >
                    Apply
                  </button>
                </div>
              </Popover>
            </div>
          </div>
        </div>
        {/* Status filter tabs */}
        <div className="mb-4 flex flex-wrap items-center gap-1 border-b border-[var(--border)] pb-2">
          {(['All', 'Delivered', 'Pending', 'Shipped', 'Cancelled', 'Refunded'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setStatusFilter(s); setPage(1); }}
              data-active={statusFilter === s}
              className={cn(
                'cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-medium transition',
                statusFilter === s
                  ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="py-2.5 pl-1 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Order</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Customer</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Channel</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Product</th>
                <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Amount</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Payment</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Fulfillment</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Risk</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Status</th>
                <th className="py-2.5 pl-2 pr-1"></th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center">
                    <p className="text-sm font-medium text-[var(--text-strong)]">No orders found</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              ) : paged.map((o) => {
                const ChannelIcon = channelIcon[o.channel];
                return (
                  <tr key={o.id} className="group border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40">
                    <td className="py-3 pl-1 pr-2">
                      <p className="text-xs font-medium text-[var(--text-strong)]">{o.id}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{o.date}</p>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <UserAvatar name={o.customer} size="xs" />
                        <span className="truncate text-xs font-medium text-[var(--text-strong)]">{o.customer}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                        <ChannelIcon className="size-3" strokeWidth={2.2} />{o.channel}
                      </span>
                    </td>
                    <td className="py-3 px-2"><span className="text-xs text-[var(--text-body)]">{o.product}</span></td>
                    <td className="py-3 px-2 text-right text-xs font-medium tabular-nums text-[var(--text-strong)]">{o.amount}</td>
                    <td className="py-3 px-2">
                      <span className={cn(
                        'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium',
                        o.payment === 'Paid' && 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
                        o.payment === 'Refunded' && 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
                        o.payment === 'Failed' && 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
                        o.payment === 'Pending' && 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
                      )}>
                        <span className="size-1 rounded-full bg-current" />{o.payment}
                      </span>
                    </td>
                    <td className="py-3 px-2"><span className="text-[10px] text-[var(--text-muted)]">{o.fulfillment}</span></td>
                    <td className="py-3 px-2">
                      <span className={cn(
                        'inline-flex items-center gap-0.5 text-[10px] font-medium',
                        o.risk === 'Low risk' && 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]',
                        o.risk === 'Medium risk' && 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]',
                        o.risk === 'High risk' && 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]',
                      )}>{o.risk}</span>
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge tone={statusTone[o.status]} dot>{o.status}</StatusBadge>
                    </td>
                    <td className="py-3 pl-2 pr-1 text-right">
                      <div className="relative inline-block">
                        <button
                          type="button"
                          onClick={() => setActionMenuFor(actionMenuFor === o.id ? null : o.id)}
                          className="flex size-6 cursor-pointer items-center justify-center rounded-md text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] group-hover:opacity-100"
                          aria-label={`Actions for ${o.id}`}
                        >
                          <MoreHorizontal className="size-3.5" strokeWidth={2.2} />
                        </button>
                        <Popover open={actionMenuFor === o.id} onClose={() => setActionMenuFor(null)} align="right" width={180}>
                          <PopoverItem icon={Eye} onClick={() => handleOrderAction('view', o)}>View details</PopoverItem>
                          <PopoverItem icon={ChevronRight} onClick={() => handleOrderAction('edit', o)}>Edit order</PopoverItem>
                          <PopoverItem icon={RotateCcw} onClick={() => handleOrderAction('refund', o)}>Issue refund</PopoverItem>
                          <PopoverItem icon={PackageCheck} onClick={() => handleOrderAction('duplicate', o)}>Duplicate</PopoverItem>
                          <PopoverItem icon={FileText} onClick={() => handleOrderAction('print', o)}>Print invoice</PopoverItem>
                          <div className="my-1 h-px bg-[var(--border-subtle)]" />
                          <PopoverItem icon={XCircle} danger onClick={() => handleOrderAction('delete', o)}>Delete order</PopoverItem>
                        </Popover>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-[var(--text-muted)]">Showing {paged.length} of {filtered.length} orders</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={current === 1}
              className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="size-3 rotate-180" strokeWidth={2.5} />Prev
            </button>
            <span className="px-2 text-xs tabular-nums text-[var(--text-muted)]">{current} / {totalPages}</span>
            <button
              type="button"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={current === totalPages}
              className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next<ChevronRight className="size-3" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* Customer Activity */}
      <section className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Customer Activity</h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">Live customer events timeline.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-50)] px-2 py-1 dark:bg-[rgba(18,183,106,0.1)]">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" />
            </span>
            <span className="text-[9px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live</span>
          </span>
        </div>
        <ol className="relative space-y-3 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--border-subtle)]">
          {visibleActivity.map((ev, i) => {
            const iconMap = { order: PackageCheck, cart: ShoppingCart, subscribe: Bell, refund: RotateCcw, review: Star };
            const Icon = iconMap[ev.icon];
            const toneCls = {
              success: 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
              warning: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
              brand: 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
              error: 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
              info: 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
            };
            return (
              <li
                key={ev.id}
                className="relative flex items-start gap-3"
                style={{ animation: `dashFadeUp 400ms ease-out ${i * 80}ms both` }}
              >
                <span className={cn('relative z-10 inline-flex size-10 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-[var(--card)]', toneCls[ev.tone])}>
                  <Icon className="size-4" strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1 rounded-xl border border-[var(--border-subtle)] p-2.5 transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)]/40">
                  <div className="flex items-center gap-2">
                    <UserAvatar name={ev.customer} size="xs" />
                    <p className="truncate text-xs font-medium text-[var(--text-strong)]">{ev.customer}</p>
                    <span className={cn(
                      'ml-auto inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide',
                      ev.segment === 'VIP' && 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
                      ev.segment === 'New customer' && 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
                      ev.segment === 'Returning' && 'bg-[var(--color-info-50)] text-[var(--color-info-700)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
                      ev.segment === 'At-risk' && 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
                    )}>{ev.segment}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-body)]">
                    {ev.action} <span className="font-medium text-[var(--text-strong)]">{ev.detail}</span>
                    {ev.amount && <span className="ml-1.5 font-medium tabular-nums text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{ev.amount}</span>}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[var(--text-subtle)]">{ev.time}</p>
                </div>
              </li>
            );
          })}
        </ol>
        {/* Footer: View activity log */}
        <button
          type="button"
          onClick={() => setShowAllActivity((p) => !p)}
          className="mt-4 inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
        >
          {showAllActivity ? 'Show less' : 'View full activity log'}
          <ChevronRight className={cn('size-3 transition-transform', showAllActivity && 'rotate-90')} strokeWidth={2.5} />
        </button>
      </section>
    </div>
  );
}

/* ============================================================
   Returns & Refunds card
   ============================================================ */
function ReturnsRefundsCard() {
  const max = Math.max(...Data.returnsData.reasons.map(r => r.pct));
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-medium text-[var(--text-strong)]">Returns &amp; Refunds</h2>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">Refund metrics and reason breakdown to identify product and fulfillment issues.</p>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Refund rate</p>
          <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.returnsData.refundRate}%</p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Return requests</p>
          <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.returnsData.returnRequests}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Refund value</p>
          <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">${(Data.returnsData.refundValue / 1000).toFixed(1)}K</p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Avg resolution</p>
          <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.returnsData.avgResolutionHrs}h</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {Data.returnsData.reasons.map((r, i) => (
          <div key={r.reason} className="group">
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: r.color }} />
                <span className="text-xs font-medium text-[var(--text-body)]">{r.reason}</span>
                {r.pct >= 30 && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-[var(--color-warning-50)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
                    <AlertTriangle className="size-2.5" strokeWidth={2.5} />High
                  </span>
                )}
              </div>
              <span className="text-xs font-medium tabular-nums text-[var(--text-strong)]">{r.pct}%</span>
            </div>
            <AnimatedProgress value={(r.pct / max) * 100} color={r.color} delay={i * 80} height={6} />
          </div>
        ))}
      </div>
      {/* Footer insight */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Top reason: <span className="font-medium text-[var(--text-body)]">Damaged item (34%)</span></span>
        <span className="text-[var(--text-muted)]">Trend: <span className="font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">-0.4%</span></span>
      </div>
    </section>
  );
}

/* ============================================================
   Customer Segments card
   ============================================================ */
function CustomerSegmentsCard() {
  const totalRevenue = Data.customerSegments.reduce((s, seg) => s + seg.revenueValue, 0);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-medium text-[var(--text-strong)]">Customer Segments</h2>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">Segment distribution with revenue contribution and repeat purchase rate.</p>
      </div>
      <div className="space-y-3">
        {Data.customerSegments.map((seg, i) => {
          const revPct = (seg.revenueValue / totalRevenue) * 100;
          return (
            <div key={seg.name} className="group rounded-xl border border-[var(--border-subtle)] p-3.5 transition hover:border-[var(--border-strong)]">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ background: seg.color }} />
                  <span className="text-sm font-medium text-[var(--text-strong)]">{seg.name}</span>
                </div>
                <span className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{seg.revenue}</span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex-1"><AnimatedProgress value={revPct} color={seg.color} delay={i * 80} height={6} /></div>
                <span className="text-xs tabular-nums text-[var(--text-muted)]">{revPct.toFixed(0)}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[var(--text-subtle)]">Customers</span>
                  <p className="font-medium tabular-nums text-[var(--text-body)]">{seg.count.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[var(--text-subtle)]">Repeat rate</span>
                  <p className={cn('font-medium tabular-nums', seg.repeatRate >= 50 ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : seg.repeatRate < 15 ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--text-body)]')}>{seg.repeatRate}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Footer insight */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Total customers: <span className="font-medium tabular-nums text-[var(--text-strong)]">3,018</span></span>
        <span className="text-[var(--text-muted)]">Avg CLV: <span className="font-medium tabular-nums text-[var(--text-strong)]">$94.40</span></span>
      </div>
    </section>
  );
}

export { ProductPerformanceTable, InventoryRiskCard, FulfillmentQueueCard, RealtimeMonitor, RecentOrdersSection, ReturnsRefundsCard, CustomerSegmentsCard };
