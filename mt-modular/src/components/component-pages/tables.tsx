'use client';

import * as React from 'react';
import {
  AlertCircle, ArrowDown, ArrowUp, ArrowUpDown, Check, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, ChevronsUpDown, Clock, Copy, Database, Download,
  Edit3, Eye, File, FileText, Filter, Hash, Heart, Image as ImageIcon, Info,
  Lock, MoreHorizontal, Package, Pause, Phone, Play, Plus, Search, Settings, Share2,
  Shield, Sparkles, Star, Tag, Trash2, TrendingDown, TrendingUp, Upload, User,
  Users, X, Zap, Loader2, ChevronRight as CR,
} from 'lucide-react';
import { PageHeader, SectionCard, StatusBadge, UserAvatar } from '@/components/dashboard/primitives';
import { PremiumSelect } from '@/components/dashboard/premium-controls';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM TABLES DESIGN SYSTEM ====================== */
function TablesStyles() {
  return (
    <style jsx global>{`
      .tbl-root {
        --tbl-radius-sm: 8px;
        --tbl-radius-md: 12px;
        --tbl-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --tbl-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --tbl-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
      }
      .tbl-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.025) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.020) 0px, transparent 50%);
      }
      .tbl-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .tbl-header {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .tbl-cell {
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--text-body);
      }
      .tbl-num {
        font-variant-numeric: tabular-nums;
        font-feature-settings: 'tnum';
      }
      .tbl-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        border-radius: 999px;
        padding: 0.125rem 0.5rem;
        font-size: 0.625rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-transform: uppercase;
      }
      .tbl-badge-basic { background: var(--color-success-50); color: var(--color-success-700); }
      .tbl-badge-intermediate { background: var(--color-warning-50); color: var(--color-warning-700); }
      .tbl-badge-advanced { background: var(--color-error-50); color: var(--color-error-700); }
      .tbl-input {
        height: 2.25rem;
        width: 100%;
        border-radius: var(--tbl-radius-md);
        border: 1px solid var(--border);
        background: var(--card);
        padding-left: 2.25rem;
        padding-right: 0.75rem;
        font-size: 0.8125rem;
        font-weight: 400;
        color: var(--text-strong);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        box-shadow: var(--tbl-shadow-xs);
        outline: none;
      }
      .tbl-input::placeholder { color: var(--text-subtle); }
      .tbl-input:focus {
        border-color: var(--color-brand-500);
        box-shadow: 0 0 0 3px rgba(70,95,255,0.12), var(--tbl-shadow-xs);
      }
      .tbl-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        border-radius: var(--tbl-radius-md);
        font-size: 0.75rem;
        font-weight: 600;
        transition: all 0.15s ease;
        cursor: pointer;
        white-space: nowrap;
      }
      .tbl-btn-primary {
        height: 2.25rem;
        padding: 0 0.75rem;
        background: var(--color-brand-500);
        color: white;
        box-shadow: var(--tbl-shadow-sm);
      }
      .tbl-btn-primary:hover { background: var(--color-brand-600); }
      .tbl-btn-secondary {
        height: 2.25rem;
        padding: 0 0.75rem;
        background: var(--card);
        color: var(--text-strong);
        border: 1px solid var(--border);
        box-shadow: var(--tbl-shadow-xs);
      }
      .tbl-btn-secondary:hover { background: var(--surface-sunken); border-color: var(--border-strong); }
      .tbl-btn-ghost {
        height: 2rem;
        padding: 0 0.5rem;
        background: transparent;
        color: var(--text-muted);
      }
      .tbl-btn-ghost:hover { background: var(--surface-sunken); color: var(--text-strong); }
      .tbl-row-hover:hover { background: var(--surface-sunken); }
      .tbl-checkbox {
        appearance: none;
        width: 1rem;
        height: 1rem;
        border-radius: 4px;
        border: 1.5px solid var(--border-strong);
        background: var(--card);
        cursor: pointer;
        position: relative;
        transition: all 0.15s ease;
      }
      .tbl-checkbox:checked {
        background: var(--color-brand-500);
        border-color: var(--color-brand-500);
      }
      .tbl-checkbox:checked::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 5px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    `}</style>
  );
}

/* ====================== REUSABLE TABLE HEADER ====================== */
function TableSectionHeader({ index, title, description, category, complexity }: {
  index: number; title: string; description: string; category: string; complexity: 'Basic' | 'Intermediate' | 'Advanced';
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-xs font-medium text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{index}</span>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-base font-medium text-[var(--text-strong)]">{title}</h3>
            <span className={cn('tbl-badge', complexity === 'Basic' ? 'tbl-badge-basic' : complexity === 'Intermediate' ? 'tbl-badge-intermediate' : 'tbl-badge-advanced')}>{complexity}</span>
          </div>
          <p className="text-sm font-medium text-[var(--text-muted)]">{description}</p>
          <p className="mt-0.5 text-xs font-medium text-[var(--text-subtle)]">{category}</p>
        </div>
      </div>
    </div>
  );
}

/* ====================== STATUS BADGE HELPERS ====================== */
function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    paid: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    completed: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    delivered: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    pending: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    processing: 'bg-[var(--color-info-50)] text-[var(--color-info-700)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
    shipped: 'bg-[var(--color-info-50)] text-[var(--color-info-700)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
    failed: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
    cancelled: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
    refunded: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
    offline: 'bg-[var(--surface-sunken)] text-[var(--text-muted)]',
    away: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    draft: 'bg-[var(--surface-sunken)] text-[var(--text-muted)]',
    low: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
    medium: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    high: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    critical: 'bg-[var(--color-error-500)] text-white',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize', map[status.toLowerCase()] || 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

/* ====================== SPARKLINE ====================== */
function Sparkline({ data, color = 'var(--color-brand-500)', width = 80, height = 24 }: { data: number[]; color?: string; width?: number; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={height - ((data[data.length - 1] - min) / range) * height} r="2" fill={color} />
    </svg>
  );
}

/* ====================== MAIN PAGE ====================== */
export function TablesPage() {
  return (
    <div className="tbl-root tbl-bg space-y-6">
      <TablesStyles />
      <PageHeader
        breadcrumb={[{ label: 'Components' }, { label: 'Forms & Data' }, { label: 'Tables' }]}
        title="Tables"
        description="10 production-ready table patterns that developers actually build — from advanced data grids to mobile-first card layouts."
      />

      <AdvancedDataTable />
      <UserManagementTable />
      <OrdersTable />
      <ProductsTable />
      <ExpandableTable />
      <FileManagerTable />
      <PricingTable />
      <AnalyticsTable />
      <AuditLogsTable />
      <MobileCardTable />
    </div>
  );
}

/* ====================== 1. ADVANCED DATA TABLE ====================== */
function AdvancedDataTable() {
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [sortCol, setSortCol] = React.useState<'name' | 'revenue' | 'date'>('date');
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('desc');
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);
  const [showCols, setShowCols] = React.useState(false);
  const perPage = 5;

  const data = [
    { id: 'c1', name: 'Acme Corporation', email: 'billing@acme.com', plan: 'Enterprise', revenue: 48200, status: 'active', date: '2025-06-22' },
    { id: 'c2', name: 'Globex Industries', email: 'accounts@globex.com', plan: 'Pro', revenue: 12400, status: 'active', date: '2025-06-18' },
    { id: 'c3', name: 'Initech Solutions', email: 'pay@initech.com', plan: 'Pro', revenue: 8900, status: 'pending', date: '2025-06-15' },
    { id: 'c4', name: 'Umbrella LLC', email: 'finance@umbrella.com', plan: 'Enterprise', revenue: 32100, status: 'active', date: '2025-06-10' },
    { id: 'c5', name: 'Stark Industries', email: 'ar@stark.com', plan: 'Enterprise', revenue: 67800, status: 'active', date: '2025-06-08' },
    { id: 'c6', name: 'Wayne Enterprises', email: 'billing@wayne.com', plan: 'Pro', revenue: 15600, status: 'pending', date: '2025-06-05' },
    { id: 'c7', name: 'Cyberdyne Systems', email: 'ops@cyberdyne.com', plan: 'Starter', revenue: 3200, status: 'active', date: '2025-06-01' },
  ];

  const filtered = data.filter(d =>
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'all' || d.status === statusFilter)
  );

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortCol === 'name') cmp = a.name.localeCompare(b.name);
    else if (sortCol === 'revenue') cmp = a.revenue - b.revenue;
    else cmp = a.date.localeCompare(b.date);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const paginated = sorted.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(sorted.length / perPage);
  const allSelected = paginated.length > 0 && paginated.every(d => selected.has(d.id));

  function toggleSort(col: 'name' | 'revenue' | 'date') {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  }

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(paginated.map(d => d.id)));
  }

  function toggleOne(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <SectionCard>
      <TableSectionHeader index={1} title="Advanced Data Table" description="Search, filter, sort, pagination, bulk selection, column visibility, and export actions." category="Data Grid" complexity="Advanced" />

      {/* Toolbar */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
            <input className="tbl-input" placeholder="Search customers..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <PremiumSelect
            size="sm"
            maxWidth="sm"
            placeholder="Status"
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'active', label: 'Active' },
              { value: 'pending', label: 'Pending' },
            ]}
            onChange={v => { setStatusFilter(v); setPage(1); }}
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Bulk actions */}
          {selected.size > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-[var(--color-brand-300)] bg-[var(--color-brand-50)] px-2 py-1 dark:border-[rgba(70,95,255,0.24)] dark:bg-[rgba(70,95,255,0.08)]">
              <span className="text-xs font-medium text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">{selected.size} selected</span>
              <button className="tbl-btn tbl-btn-ghost h-7 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]"><Download className="size-3.5" strokeWidth={2.5} /> Export</button>
              <button className="tbl-btn tbl-btn-ghost h-7 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]"><Trash2 className="size-3.5" strokeWidth={2.5} /> Delete</button>
            </div>
          )}
          {/* Column visibility */}
          <div className="relative">
            <button onClick={() => setShowCols(!showCols)} className="tbl-btn tbl-btn-secondary"><Settings className="size-3.5" strokeWidth={2.5} /> Columns <ChevronDown className="size-3" strokeWidth={2.5} /></button>
            {showCols && (
              <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-[var(--border)] bg-[var(--popover)] p-1.5 shadow-[var(--tbl-shadow-md)]">
                {['Customer', 'Email', 'Plan', 'Revenue', 'Status', 'Date'].map(col => (
                  <label key={col} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--text-body)] hover:bg-[var(--surface-sunken)] cursor-pointer">
                    <input type="checkbox" defaultChecked className="tbl-checkbox" /> {col}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button className="tbl-btn tbl-btn-primary"><Download className="size-3.5" strokeWidth={2.5} /> Export</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="w-10 py-2.5 pl-3"><input type="checkbox" checked={allSelected} onChange={toggleAll} className="tbl-checkbox" /></th>
              <th className="py-2.5 pl-2 pr-3 text-left">
                <button onClick={() => toggleSort('name')} className="tbl-header inline-flex items-center gap-1 hover:text-[var(--text-strong)]">
                  Customer {sortCol === 'name' && (sortDir === 'asc' ? <ArrowUp className="size-3" strokeWidth={2.5} /> : <ArrowDown className="size-3" strokeWidth={2.5} />)}
                </button>
              </th>
              <th className="py-2.5 px-3 text-left tbl-header">Email</th>
              <th className="py-2.5 px-3 text-left tbl-header">Plan</th>
              <th className="py-2.5 px-3 text-right">
                <button onClick={() => toggleSort('revenue')} className="tbl-header inline-flex items-center gap-1 hover:text-[var(--text-strong)]">
                  Revenue {sortCol === 'revenue' && (sortDir === 'asc' ? <ArrowUp className="size-3" strokeWidth={2.5} /> : <ArrowDown className="size-3" strokeWidth={2.5} />)}
                </button>
              </th>
              <th className="py-2.5 px-3 text-left tbl-header">Status</th>
              <th className="py-2.5 px-3 text-left">
                <button onClick={() => toggleSort('date')} className="tbl-header inline-flex items-center gap-1 hover:text-[var(--text-strong)]">
                  Date {sortCol === 'date' && (sortDir === 'asc' ? <ArrowUp className="size-3" strokeWidth={2.5} /> : <ArrowDown className="size-3" strokeWidth={2.5} />)}
                </button>
              </th>
              <th className="w-10 py-2.5 pr-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(row => (
              <tr key={row.id} className={cn('border-b border-[var(--border-subtle)] tbl-row-hover transition-colors', selected.has(row.id) && 'bg-[var(--color-brand-50)]/50 dark:bg-[rgba(70,95,255,0.06)]')}>
                <td className="py-2.5 pl-3"><input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} className="tbl-checkbox" /></td>
                <td className="py-2.5 pl-2 pr-3"><span className="text-sm font-medium text-[var(--text-strong)]">{row.name}</span></td>
                <td className="py-2.5 px-3 tbl-cell">{row.email}</td>
                <td className="py-2.5 px-3"><span className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">{row.plan}</span></td>
                <td className="py-2.5 px-3 text-right tbl-cell tbl-num font-medium text-[var(--text-strong)]">${row.revenue.toLocaleString()}</td>
                <td className="py-2.5 px-3"><StatusPill status={row.status} /></td>
                <td className="py-2.5 px-3 tbl-cell tbl-num">{new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td className="py-2.5 pr-3"><button className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><MoreHorizontal className="size-4" strokeWidth={2.5} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Search className="size-8 text-[var(--text-faint)]" strokeWidth={2} />
          <p className="mt-2 text-sm font-medium text-[var(--text-strong)]">No customers found</p>
          <p className="text-xs font-medium text-[var(--text-muted)]">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs font-medium text-[var(--text-muted)]">Showing {paginated.length} of {filtered.length} customers</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="inline-flex size-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:opacity-40"><ChevronLeft className="size-4" strokeWidth={2.5} /></button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={cn('inline-flex size-7 items-center justify-center rounded-lg text-xs font-medium transition', page === i + 1 ? 'bg-[var(--color-brand-500)] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--surface-sunken)]')}>{i + 1}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="inline-flex size-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:opacity-40"><ChevronRight className="size-4" strokeWidth={2.5} /></button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 2. USER MANAGEMENT TABLE ====================== */
function UserManagementTable() {
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const users = [
    { id: 'u1', name: 'Sara Nguyen', email: 'sara@mtverse.io', role: 'Owner', status: 'active', lastActive: '2 min ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50' },
    { id: 'u2', name: 'James Park', email: 'james@mtverse.io', role: 'Admin', status: 'active', lastActive: '1h ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50' },
    { id: 'u3', name: 'Maria Lopez', email: 'maria@mtverse.io', role: 'Editor', status: 'away', lastActive: '3h ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50' },
    { id: 'u4', name: 'Alex Chen', email: 'alex@mtverse.io', role: 'Member', status: 'offline', lastActive: '2d ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50' },
    { id: 'u5', name: 'Emma Wilson', email: 'emma@mtverse.io', role: 'Viewer', status: 'offline', lastActive: '5d ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50' },
  ];

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const roleColors: Record<string, string> = {
    Owner: 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
    Admin: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
    Editor: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    Member: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    Viewer: 'bg-[var(--surface-sunken)] text-[var(--text-muted)]',
  };

  function toggleOne(id: string) { setSelected(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; }); }
  function toggleAll() { if (selected.size === filtered.length) setSelected(new Set()); else setSelected(new Set(filtered.map(u => u.id))); }

  return (
    <SectionCard>
      <TableSectionHeader index={2} title="User Management Table" description="Avatar, status, role, last active, row actions, and multi-select for team management." category="Team Management" complexity="Intermediate" />
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
          <input className="tbl-input" placeholder="Search team members..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="tbl-btn tbl-btn-primary"><Plus className="size-3.5" strokeWidth={2.5} /> Invite member</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="w-10 py-2.5 pl-3"><input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="tbl-checkbox" /></th>
              <th className="py-2.5 pl-2 pr-3 text-left tbl-header">Member</th>
              <th className="py-2.5 px-3 text-left tbl-header">Role</th>
              <th className="py-2.5 px-3 text-left tbl-header">Status</th>
              <th className="py-2.5 px-3 text-left tbl-header">Last active</th>
              <th className="w-20 py-2.5 pr-3 text-right tbl-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className={cn('border-b border-[var(--border-subtle)] tbl-row-hover', selected.has(u.id) && 'bg-[var(--color-brand-50)]/50 dark:bg-[rgba(70,95,255,0.06)]')}>
                <td className="py-2.5 pl-3"><input type="checkbox" checked={selected.has(u.id)} onChange={() => toggleOne(u.id)} className="tbl-checkbox" /></td>
                <td className="py-2.5 pl-2 pr-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img src={u.avatar} alt={u.name} className="size-8 rounded-full object-cover" />
                      <span className={cn('absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[var(--card)]', u.status === 'active' ? 'bg-[var(--color-success-500)]' : u.status === 'away' ? 'bg-[var(--color-warning-500)]' : 'bg-[var(--text-faint)]')} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-strong)]">{u.name}</p>
                      <p className="text-xs font-medium text-[var(--text-muted)]">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3"><span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-medium', roleColors[u.role])}>{u.role}</span></td>
                <td className="py-2.5 px-3"><StatusPill status={u.status} /></td>
                <td className="py-2.5 px-3 tbl-cell tbl-num">{u.lastActive}</td>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center justify-end gap-1">
                    <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Edit3 className="size-3.5" strokeWidth={2.5} /></button>
                    <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--color-error-500)]"><Trash2 className="size-3.5" strokeWidth={2.5} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ====================== 3. ORDERS & TRANSACTIONS TABLE ====================== */
function OrdersTable() {
  const [filter, setFilter] = React.useState('all');
  const orders = [
    { id: 'ORD-9847', customer: 'Sara Nguyen', email: 'sara@acme.com', product: 'Wireless Headphones', amount: 349.00, payment: 'paid', order: 'delivered', date: 'Jun 22, 2025' },
    { id: 'ORD-9846', customer: 'James Park', email: 'james@globex.com', product: 'Smart Watch Pro', amount: 299.00, payment: 'paid', order: 'shipped', date: 'Jun 21, 2025' },
    { id: 'ORD-9845', customer: 'Maria Lopez', email: 'maria@initech.com', product: 'Bluetooth Speaker', amount: 129.00, payment: 'pending', order: 'processing', date: 'Jun 21, 2025' },
    { id: 'ORD-9844', customer: 'Alex Chen', email: 'alex@umbrella.com', product: 'USB-C Hub', amount: 79.00, payment: 'paid', order: 'delivered', date: 'Jun 20, 2025' },
    { id: 'ORD-9843', customer: 'Emma Wilson', email: 'emma@stark.com', product: 'Mechanical Keyboard', amount: 189.00, payment: 'failed', order: 'cancelled', date: 'Jun 19, 2025' },
    { id: 'ORD-9842', customer: 'Ryan Cole', email: 'ryan@wayne.com', product: '4K Webcam', amount: 159.00, payment: 'paid', order: 'shipped', date: 'Jun 18, 2025' },
  ];
  const filtered = filter === 'all' ? orders : orders.filter(o => o.payment === filter || o.order === filter);

  return (
    <SectionCard>
      <TableSectionHeader index={3} title="Orders & Transactions Table" description="Payment status, order status, amount, date, and row actions for e-commerce order management." category="E-commerce" complexity="Intermediate" />
      <div className="mb-3 flex items-center gap-2">
        <div className="inline-flex gap-0.5 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] p-0.5">
          {['all', 'paid', 'pending', 'failed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={cn('inline-flex h-7 items-center rounded-md px-3 text-xs font-medium capitalize transition', filter === f ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-[var(--tbl-shadow-xs)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>{f}</button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-3 pr-3 text-left tbl-header">Order ID</th>
              <th className="py-2.5 px-3 text-left tbl-header">Customer</th>
              <th className="py-2.5 px-3 text-left tbl-header">Product</th>
              <th className="py-2.5 px-3 text-right tbl-header">Amount</th>
              <th className="py-2.5 px-3 text-left tbl-header">Payment</th>
              <th className="py-2.5 px-3 text-left tbl-header">Status</th>
              <th className="py-2.5 px-3 text-left tbl-header">Date</th>
              <th className="w-10 py-2.5 pr-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-[var(--border-subtle)] tbl-row-hover">
                <td className="py-2.5 pl-3 pr-3"><code className="text-xs font-medium text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{o.id}</code></td>
                <td className="py-2.5 px-3">
                  <p className="text-sm font-medium text-[var(--text-strong)]">{o.customer}</p>
                  <p className="text-xs font-medium text-[var(--text-muted)]">{o.email}</p>
                </td>
                <td className="py-2.5 px-3 tbl-cell">{o.product}</td>
                <td className="py-2.5 px-3 text-right tbl-cell tbl-num font-semibold text-[var(--text-strong)]">${o.amount.toFixed(2)}</td>
                <td className="py-2.5 px-3"><StatusPill status={o.payment} /></td>
                <td className="py-2.5 px-3"><StatusPill status={o.order} /></td>
                <td className="py-2.5 px-3 tbl-cell tbl-num">{o.date}</td>
                <td className="py-2.5 pr-3"><button className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><Eye className="size-4" strokeWidth={2.5} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ====================== 4. PRODUCTS TABLE ====================== */
function ProductsTable() {
  const products = [
    { id: 'p1', name: 'Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop', category: 'Audio', inventory: 142, price: 349, trend: [40, 55, 48, 62, 70, 58, 75], performance: 'high' },
    { id: 'p2', name: 'Smart Watch Pro', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop', category: 'Wearables', inventory: 28, price: 299, trend: [60, 50, 55, 40, 35, 42, 38], performance: 'low' },
    { id: 'p3', name: 'Bluetooth Speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=60&h=60&fit=crop', category: 'Audio', inventory: 86, price: 129, trend: [30, 35, 40, 45, 50, 55, 60], performance: 'high' },
    { id: 'p4', name: 'USB-C Hub', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=60&h=60&fit=crop', category: 'Accessories', inventory: 8, price: 79, trend: [20, 18, 15, 12, 10, 8, 5], performance: 'low' },
    { id: 'p5', name: 'Mechanical Keyboard', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=60&h=60&fit=crop', category: 'Accessories', inventory: 67, price: 189, trend: [45, 50, 48, 52, 55, 53, 58], performance: 'medium' },
  ];

  function invStatus(n: number) {
    if (n <= 10) return { label: 'Low stock', color: 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' };
    if (n <= 30) return { label: 'Limited', color: 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]' };
    return { label: 'In stock', color: 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' };
  }

  return (
    <SectionCard>
      <TableSectionHeader index={4} title="Products Table" description="Product image, category, inventory with stock indicators, price, performance sparklines, and trends." category="E-commerce" complexity="Advanced" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-3 pr-3 text-left tbl-header">Product</th>
              <th className="py-2.5 px-3 text-left tbl-header">Category</th>
              <th className="py-2.5 px-3 text-left tbl-header">Inventory</th>
              <th className="py-2.5 px-3 text-right tbl-header">Price</th>
              <th className="py-2.5 px-3 text-center tbl-header">7-day trend</th>
              <th className="py-2.5 px-3 text-left tbl-header">Performance</th>
              <th className="w-20 py-2.5 pr-3 text-right tbl-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const inv = invStatus(p.inventory);
              const trendColor = p.performance === 'high' ? 'var(--color-success-500)' : p.performance === 'low' ? 'var(--color-error-500)' : 'var(--color-warning-500)';
              return (
                <tr key={p.id} className="border-b border-[var(--border-subtle)] tbl-row-hover">
                  <td className="py-2.5 pl-3 pr-3">
                    <div className="flex items-center gap-2.5">
                      <img src={p.image} alt={p.name} className="size-9 rounded-lg object-cover" />
                      <span className="text-sm font-medium text-[var(--text-strong)]">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3"><span className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">{p.category}</span></td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="tbl-cell tbl-num font-medium text-[var(--text-strong)]">{p.inventory}</span>
                      <span className={cn('text-[10px] font-medium', inv.color)}>{inv.label}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right tbl-cell tbl-num font-semibold text-[var(--text-strong)]">${p.price}</td>
                  <td className="py-2.5 px-3"><div className="flex justify-center"><Sparkline data={p.trend} color={trendColor} /></div></td>
                  <td className="py-2.5 px-3">
                    <span className={cn('inline-flex items-center gap-1 text-[10px] font-medium capitalize', p.performance === 'high' ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : p.performance === 'low' ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]')}>
                      {p.performance === 'high' ? <TrendingUp className="size-3" strokeWidth={2.5} /> : p.performance === 'low' ? <TrendingDown className="size-3" strokeWidth={2.5} /> : <ArrowUpDown className="size-3" strokeWidth={2.5} />}
                      {p.performance}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Edit3 className="size-3.5" strokeWidth={2.5} /></button>
                      <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Eye className="size-3.5" strokeWidth={2.5} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ====================== 5. EXPANDABLE DETAILS TABLE ====================== */
function ExpandableTable() {
  const [expanded, setExpanded] = React.useState<string | null>('d1');
  const deals = [
    { id: 'd1', name: 'Enterprise Deal — Acme Corp', value: 84000, stage: 'Negotiation', owner: 'Sara Nguyen', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50', date: 'Jun 22' },
    { id: 'd2', name: 'Pro Plan — Globex Inc', value: 24800, stage: 'Proposal', owner: 'James Park', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50', date: 'Jun 20' },
    { id: 'd3', name: 'Starter — Initech LLC', value: 4800, stage: 'Qualified', owner: 'Maria Lopez', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50', date: 'Jun 18' },
  ];

  const stageColors: Record<string, string> = {
    Negotiation: 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
    Proposal: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    Qualified: 'bg-[var(--color-info-50)] text-[var(--color-info-700)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
  };

  return (
    <SectionCard>
      <TableSectionHeader index={5} title="Expandable Details Table" description="Rich expandable content with timeline, notes, metadata, and nested information per row." category="CRM" complexity="Advanced" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="w-8 py-2.5 pl-3"></th>
              <th className="py-2.5 pl-1 pr-3 text-left tbl-header">Deal</th>
              <th className="py-2.5 px-3 text-right tbl-header">Value</th>
              <th className="py-2.5 px-3 text-left tbl-header">Stage</th>
              <th className="py-2.5 px-3 text-left tbl-header">Owner</th>
              <th className="py-2.5 px-3 text-left tbl-header">Date</th>
            </tr>
          </thead>
          <tbody>
            {deals.map(d => (
              <React.Fragment key={d.id}>
                <tr className={cn('border-b border-[var(--border-subtle)] tbl-row-hover cursor-pointer', expanded === d.id && 'bg-[var(--surface-sunken)]')} onClick={() => setExpanded(expanded === d.id ? null : d.id)}>
                  <td className="py-2.5 pl-3">
                    <ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform', expanded === d.id && 'rotate-180')} strokeWidth={2.5} />
                  </td>
                  <td className="py-2.5 pl-1 pr-3"><span className="text-sm font-medium text-[var(--text-strong)]">{d.name}</span></td>
                  <td className="py-2.5 px-3 text-right tbl-cell tbl-num font-medium text-[var(--text-strong)]">${d.value.toLocaleString()}</td>
                  <td className="py-2.5 px-3"><span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-medium', stageColors[d.stage])}>{d.stage}</span></td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <img src={d.avatar} alt={d.owner} className="size-6 rounded-full object-cover" />
                      <span className="tbl-cell">{d.owner}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 tbl-cell tbl-num">{d.date}</td>
                </tr>
                {expanded === d.id && (
                  <tr>
                    <td colSpan={6} className="bg-[var(--surface-sunken)] px-6 py-4">
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {/* Timeline */}
                        <div className="lg:col-span-2">
                          <p className="tbl-label mb-2">Activity timeline</p>
                          <div className="space-y-2">
                            {[
                              { icon: Phone, text: 'Discovery call completed', time: '2 days ago', color: 'var(--color-success-500)' },
                              { icon: FileText, text: 'Proposal sent to procurement', time: '5 days ago', color: 'var(--color-brand-500)' },
                              { icon: Users, text: 'Stakeholder meeting scheduled', time: '1 week ago', color: 'var(--color-info-500)' },
                              { icon: Check, text: 'Initial qualification passed', time: '2 weeks ago', color: 'var(--color-warning-500)' },
                            ].map((event, i) => {
                              const Icon = event.icon;
                              return (
                                <div key={i} className="flex items-center gap-2.5">
                                  <span className="inline-flex size-6 items-center justify-center rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${event.color} 12%, transparent)`, color: event.color }}>
                                    <Icon className="size-3" strokeWidth={2.5} />
                                  </span>
                                  <span className="text-xs font-medium text-[var(--text-strong)]">{event.text}</span>
                                  <span className="text-[10px] font-medium text-[var(--text-muted)]">{event.time}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {/* Metadata + Notes */}
                        <div className="space-y-3">
                          <div>
                            <p className="tbl-label mb-2">Metadata</p>
                            <div className="space-y-1 rounded-lg border border-[var(--border)] bg-[var(--card)] p-2.5">
                              <div className="flex justify-between text-xs"><span className="font-medium text-[var(--text-muted)]">Probability</span><span className="font-medium text-[var(--text-strong)]">75%</span></div>
                              <div className="flex justify-between text-xs"><span className="font-medium text-[var(--text-muted)]">Expected close</span><span className="font-medium text-[var(--text-strong)]">Jul 15</span></div>
                              <div className="flex justify-between text-xs"><span className="font-medium text-[var(--text-muted)]">Source</span><span className="font-medium text-[var(--text-strong)]">Inbound</span></div>
                              <div className="flex justify-between text-xs"><span className="font-medium text-[var(--text-muted)]">Competitors</span><span className="font-medium text-[var(--text-strong)]">2</span></div>
                            </div>
                          </div>
                          <div>
                            <p className="tbl-label mb-2">Notes</p>
                            <p className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-2.5 text-xs font-medium text-[var(--text-body)]">Procurement team is reviewing. Legal has approved the MSA. Waiting on final sign-off from CFO.</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ====================== 6. FILE MANAGER TABLE ====================== */
function FileManagerTable() {
  const files = [
    { id: 'f1', name: 'Q3-Financial-Report.pdf', type: 'pdf', size: '2.4 MB', owner: 'Sara Nguyen', modified: '2 hours ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50' },
    { id: 'f2', name: 'product-mockups-v3.fig', type: 'fig', size: '18.7 MB', owner: 'James Park', modified: '5 hours ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50' },
    { id: 'f3', name: 'team-photo-2025.jpg', type: 'jpg', size: '5.1 MB', owner: 'Maria Lopez', modified: '1 day ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50' },
    { id: 'f4', name: 'api-documentation.md', type: 'md', size: '142 KB', owner: 'Alex Chen', modified: '2 days ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50' },
    { id: 'f5', name: 'demo-video.mp4', type: 'mp4', size: '48.3 MB', owner: 'Emma Wilson', modified: '3 days ago', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50' },
  ];

  const typeIcons: Record<string, { icon: any; color: string }> = {
    pdf: { icon: FileText, color: 'var(--color-error-500)' },
    fig: { icon: ImageIcon, color: 'var(--color-brand-500)' },
    jpg: { icon: ImageIcon, color: 'var(--color-success-500)' },
    md: { icon: FileText, color: 'var(--color-info-500)' },
    mp4: { icon: Play, color: 'var(--color-warning-500)' },
  };

  return (
    <SectionCard>
      <TableSectionHeader index={6} title="File Manager Table" description="File type icons, owner avatars, file sizes, modified dates, and quick actions (preview, share, download)." category="File Management" complexity="Intermediate" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-3 pr-3 text-left tbl-header">Name</th>
              <th className="py-2.5 px-3 text-right tbl-header">Size</th>
              <th className="py-2.5 px-3 text-left tbl-header">Owner</th>
              <th className="py-2.5 px-3 text-left tbl-header">Modified</th>
              <th className="w-28 py-2.5 pr-3 text-right tbl-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map(f => {
              const typeData = typeIcons[f.type];
              const Icon = typeData.icon;
              return (
                <tr key={f.id} className="border-b border-[var(--border-subtle)] tbl-row-hover">
                  <td className="py-2.5 pl-3 pr-3">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex size-8 items-center justify-center rounded-lg" style={{ backgroundColor: `color-mix(in srgb, ${typeData.color} 12%, transparent)`, color: typeData.color }}>
                        <Icon className="size-4" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm font-medium text-[var(--text-strong)]">{f.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right tbl-cell tbl-num">{f.size}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <img src={f.avatar} alt={f.owner} className="size-6 rounded-full object-cover" />
                      <span className="tbl-cell">{f.owner}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 tbl-cell">{f.modified}</td>
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Eye className="size-3.5" strokeWidth={2.5} /></button>
                      <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Share2 className="size-3.5" strokeWidth={2.5} /></button>
                      <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Download className="size-3.5" strokeWidth={2.5} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ====================== 7. PRICING COMPARISON TABLE ====================== */
function PricingTable() {
  const plans = [
    { name: 'Starter', price: '$0', period: '/mo', desc: 'For side projects', highlight: false, features: { users: '1', projects: '3', storage: '1 GB', api: '10K/mo', support: 'Community', sla: false, export: false, audit: false } },
    { name: 'Pro', price: '$84', period: '/mo', desc: 'For growing teams', highlight: true, features: { users: '25', projects: 'Unlimited', storage: '50 GB', api: '500K/mo', support: 'Priority', sla: false, export: true, audit: true } },
    { name: 'Enterprise', price: '$480', period: '/mo', desc: 'For large orgs', highlight: false, features: { users: 'Unlimited', projects: 'Unlimited', storage: '1 TB', api: 'Unlimited', support: 'Dedicated', sla: true, export: true, audit: true } },
  ];
  const features = [
    { key: 'users', label: 'Team members', icon: Users },
    { key: 'projects', label: 'Projects', icon: Package },
    { key: 'storage', label: 'Storage', icon: Database },
    { key: 'api', label: 'API calls', icon: Zap },
    { key: 'support', label: 'Support level', icon: Info },
    { key: 'sla', label: '99.9% SLA', icon: Shield },
    { key: 'export', label: 'Data export', icon: Download },
    { key: 'audit', label: 'Audit logs', icon: Clock },
  ] as const;

  return (
    <SectionCard>
      <TableSectionHeader index={7} title="Pricing Comparison Table" description="Feature comparison across plans with highlighted tier, tooltips, check/cross indicators, and responsive behavior." category="Marketing" complexity="Intermediate" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-48 py-3 pl-3 pr-3 text-left align-bottom">
                <span className="tbl-header">Features</span>
              </th>
              {plans.map(p => (
                <th key={p.name} className={cn('py-3 px-3 text-center align-bottom', p.highlight && 'relative')}>
                  {p.highlight && <div className="absolute -top-2 left-0 right-0 h-1 rounded-t-lg bg-[var(--color-brand-500)]" />}
                  <div className={cn('rounded-xl border-2 p-3', p.highlight ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)]/50 dark:bg-[rgba(70,95,255,0.06)]' : 'border-[var(--border)]')}>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-sm font-medium text-[var(--text-strong)]">{p.name}</span>
                      {p.highlight && <span className="rounded-full bg-[var(--color-brand-500)] px-1.5 py-0.5 text-[8px] font-medium text-white">POPULAR</span>}
                    </div>
                    <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{p.desc}</p>
                    <p className="mt-2"><span className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{p.price}</span><span className="text-sm font-medium text-[var(--text-muted)]">{p.period}</span></p>
                    <button className={cn('mt-3 w-full rounded-lg py-1.5 text-xs font-medium transition', p.highlight ? 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]' : 'border border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:bg-[var(--surface-sunken)]')}>Choose {p.name}</button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map(f => {
              const Icon = f.icon;
              return (
                <tr key={f.key} className="border-b border-[var(--border-subtle)] tbl-row-hover">
                  <td className="py-2.5 pl-3 pr-3">
                    <div className="flex items-center gap-2">
                      <Icon className="size-3.5 text-[var(--text-muted)]" strokeWidth={2.5} />
                      <span className="text-xs font-medium text-[var(--text-body)]">{f.label}</span>
                    </div>
                  </td>
                  {plans.map(p => (
                    <td key={p.name} className={cn('py-2.5 px-3 text-center', p.highlight && 'bg-[var(--color-brand-50)]/30 dark:bg-[rgba(70,95,255,0.04)]')}>
                      {typeof p.features[f.key as keyof typeof p.features] === 'boolean' ? (
                        p.features[f.key as keyof typeof p.features] ? (
                          <CheckCircle2 className="mx-auto size-4 text-[var(--color-success-500)]" strokeWidth={2.5} />
                        ) : (
                          <X className="mx-auto size-4 text-[var(--text-faint)]" strokeWidth={2.5} />
                        )
                      ) : (
                        <span className="text-xs font-medium text-[var(--text-strong)]">{p.features[f.key as keyof typeof p.features]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ====================== 8. ANALYTICS METRICS TABLE ====================== */
function AnalyticsTable() {
  const metrics = [
    { name: 'Revenue', current: 482400, previous: 421800, change: 14.4, spark: [40, 45, 42, 48, 55, 52, 60], format: 'currency' },
    { name: 'Active Users', current: 12840, previous: 11200, change: 14.6, spark: [30, 35, 40, 38, 42, 48, 52], format: 'number' },
    { name: 'Conversion Rate', current: 4.8, previous: 5.2, change: -7.7, spark: [55, 50, 52, 48, 45, 42, 40], format: 'percent' },
    { name: 'Avg. Order Value', current: 349, previous: 312, change: 11.9, spark: [35, 38, 40, 42, 44, 46, 48], format: 'currency' },
    { name: 'Churn Rate', current: 2.1, previous: 2.8, change: -25.0, spark: [50, 45, 42, 38, 35, 30, 25], format: 'percent' },
    { name: 'API Calls', current: 1840000, previous: 1520000, change: 21.1, spark: [40, 45, 50, 55, 60, 65, 72], format: 'number' },
  ];

  function formatVal(val: number, format: string) {
    if (format === 'currency') return `$${val.toLocaleString()}`;
    if (format === 'percent') return `${val}%`;
    return val.toLocaleString();
  }

  return (
    <SectionCard>
      <TableSectionHeader index={8} title="Analytics Metrics Table" description="KPI comparisons with current vs previous values, growth indicators, trends, and inline sparkline charts." category="Analytics" complexity="Advanced" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-3 pr-3 text-left tbl-header">Metric</th>
              <th className="py-2.5 px-3 text-right tbl-header">Current</th>
              <th className="py-2.5 px-3 text-right tbl-header">Previous</th>
              <th className="py-2.5 px-3 text-center tbl-header">Change</th>
              <th className="py-2.5 px-3 text-center tbl-header">7-day trend</th>
              <th className="py-2.5 px-3 pr-3 text-left tbl-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(m => {
              const positive = m.change >= 0;
              const isGoodMetric = m.name === 'Churn Rate' ? !positive : positive;
              const trendColor = isGoodMetric ? 'var(--color-success-500)' : 'var(--color-error-500)';
              return (
                <tr key={m.name} className="border-b border-[var(--border-subtle)] tbl-row-hover">
                  <td className="py-2.5 pl-3 pr-3"><span className="text-sm font-medium text-[var(--text-strong)]">{m.name}</span></td>
                  <td className="py-2.5 px-3 text-right tbl-cell tbl-num font-medium text-[var(--text-strong)]">{formatVal(m.current, m.format)}</td>
                  <td className="py-2.5 px-3 text-right tbl-cell tbl-num text-[var(--text-muted)]">{formatVal(m.previous, m.format)}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={cn('inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium tabular-nums', isGoodMetric ? 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]')}>
                      {positive ? <TrendingUp className="size-3" strokeWidth={2.5} /> : <TrendingDown className="size-3" strokeWidth={2.5} />}
                      {Math.abs(m.change)}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3"><div className="flex justify-center"><Sparkline data={m.spark} color={trendColor} /></div></td>
                  <td className="py-2.5 px-3 pr-3">
                    <span className={cn('inline-flex items-center gap-1 text-[10px] font-medium', isGoodMetric ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]')}>
                      {isGoodMetric ? 'On track' : 'Needs attention'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ====================== 9. AUDIT LOGS TABLE ====================== */
function AuditLogsTable() {
  const [severityFilter, setSeverityFilter] = React.useState('all');
  const logs = [
    { id: 'a1', event: 'User login successful', user: 'Sara Nguyen', action: 'auth.login', severity: 'low', ip: '192.168.1.42', time: '2025-06-22 14:32:18' },
    { id: 'a2', event: 'API key created', user: 'James Park', action: 'api.key.create', severity: 'medium', ip: '10.0.0.18', time: '2025-06-22 14:28:05' },
    { id: 'a3', event: 'Failed login attempt (3 tries)', user: 'unknown@external', action: 'auth.login.failed', severity: 'high', ip: '203.45.12.89', time: '2025-06-22 14:15:42' },
    { id: 'a4', event: 'Billing plan changed', user: 'Maria Lopez', action: 'billing.plan.update', severity: 'medium', ip: '192.168.1.55', time: '2025-06-22 13:48:21' },
    { id: 'a5', event: 'Data export requested', user: 'Alex Chen', action: 'data.export', severity: 'medium', ip: '10.0.0.24', time: '2025-06-22 12:30:14' },
    { id: 'a6', event: 'Security alert: new device login', user: 'Emma Wilson', action: 'security.device.new', severity: 'critical', ip: '198.51.100.7', time: '2025-06-22 11:22:08' },
    { id: 'a7', event: 'Webhook endpoint deleted', user: 'Ryan Cole', action: 'webhook.delete', severity: 'medium', ip: '192.168.1.67', time: '2025-06-22 10:15:33' },
  ];

  const filtered = severityFilter === 'all' ? logs : logs.filter(l => l.severity === severityFilter);
  const severityIcons: Record<string, any> = { low: CheckCircle2, medium: Info, high: AlertCircle, critical: Shield };

  return (
    <SectionCard>
      <TableSectionHeader index={9} title="Audit Logs Table" description="Event history with user actions, severity badges, IP addresses, and precise timestamps for compliance." category="Security" complexity="Intermediate" />
      <div className="mb-3 inline-flex gap-0.5 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] p-0.5">
        {['all', 'low', 'medium', 'high', 'critical'].map(f => (
          <button key={f} onClick={() => setSeverityFilter(f)} className={cn('inline-flex h-7 items-center rounded-md px-3 text-xs font-medium capitalize transition', severityFilter === f ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-[var(--tbl-shadow-xs)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>{f}</button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-3 pr-3 text-left tbl-header">Event</th>
              <th className="py-2.5 px-3 text-left tbl-header">User</th>
              <th className="py-2.5 px-3 text-left tbl-header">Action</th>
              <th className="py-2.5 px-3 text-left tbl-header">Severity</th>
              <th className="py-2.5 px-3 text-left tbl-header">IP Address</th>
              <th className="py-2.5 px-3 pr-3 text-left tbl-header">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => {
              const Icon = severityIcons[l.severity];
              return (
                <tr key={l.id} className="border-b border-[var(--border-subtle)] tbl-row-hover">
                  <td className="py-2.5 pl-3 pr-3">
                    <div className="flex items-center gap-2">
                      <span className={cn('inline-flex size-6 items-center justify-center rounded-full', l.severity === 'critical' ? 'bg-[var(--color-error-500)] text-white' : l.severity === 'high' ? 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]' : l.severity === 'medium' ? 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]' : 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]')}>
                        <Icon className="size-3" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm font-medium text-[var(--text-strong)]">{l.event}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 tbl-cell">{l.user}</td>
                  <td className="py-2.5 px-3"><code className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">{l.action}</code></td>
                  <td className="py-2.5 px-3"><StatusPill status={l.severity} /></td>
                  <td className="py-2.5 px-3 tbl-cell tbl-num font-mono">{l.ip}</td>
                  <td className="py-2.5 px-3 pr-3 tbl-cell tbl-num">{l.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ====================== 10. MOBILE CARD TABLE ====================== */
function MobileCardTable() {
  const [search, setSearch] = React.useState('');
  const items = [
    { id: 'm1', name: 'Acme Corporation', contact: 'Sara Nguyen', email: 'sara@acme.com', value: '$48,200', status: 'active', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50' },
    { id: 'm2', name: 'Globex Industries', contact: 'James Park', email: 'james@globex.com', value: '$12,400', status: 'active', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50' },
    { id: 'm3', name: 'Initech Solutions', contact: 'Maria Lopez', email: 'maria@initech.com', value: '$8,900', status: 'pending', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50' },
    { id: 'm4', name: 'Stark Industries', contact: 'Alex Chen', email: 'alex@stark.com', value: '$67,800', status: 'active', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50' },
  ];
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.contact.toLowerCase().includes(search.toLowerCase()));

  return (
    <SectionCard>
      <TableSectionHeader index={10} title="Mobile Card Table" description="Responsive table alternative with mobile-first card layout, touch-friendly actions, and swipe interactions." category="Responsive" complexity="Basic" />
      {/* Search */}
      <div className="mb-4 relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
        <input className="tbl-input" placeholder="Search accounts..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Desktop table view (hidden on mobile) */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-3 pr-3 text-left tbl-header">Account</th>
              <th className="py-2.5 px-3 text-left tbl-header">Contact</th>
              <th className="py-2.5 px-3 text-right tbl-header">Value</th>
              <th className="py-2.5 px-3 text-left tbl-header">Status</th>
              <th className="w-10 py-2.5 pr-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(i => (
              <tr key={i.id} className="border-b border-[var(--border-subtle)] tbl-row-hover">
                <td className="py-2.5 pl-3 pr-3">
                  <div className="flex items-center gap-2.5">
                    <img src={i.avatar} alt={i.name} className="size-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-[var(--text-strong)]">{i.name}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <p className="tbl-cell font-medium">{i.contact}</p>
                  <p className="text-xs font-medium text-[var(--text-muted)]">{i.email}</p>
                </td>
                <td className="py-2.5 px-3 text-right tbl-cell tbl-num font-medium text-[var(--text-strong)]">{i.value}</td>
                <td className="py-2.5 px-3"><StatusPill status={i.status} /></td>
                <td className="py-2.5 pr-3"><button className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><CR className="size-4" strokeWidth={2.5} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view (visible only on mobile) */}
      <div className="space-y-2 sm:hidden">
        {filtered.map(i => (
          <div key={i.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--tbl-shadow-xs)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <img src={i.avatar} alt={i.name} className="size-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-strong)]">{i.name}</p>
                  <p className="text-xs font-medium text-[var(--text-muted)]">{i.contact}</p>
                </div>
              </div>
              <StatusPill status={i.status} />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2">
              <div>
                <p className="text-[10px] font-medium uppercase text-[var(--text-muted)]">Value</p>
                <p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{i.value}</p>
              </div>
              <button className="tbl-btn tbl-btn-secondary"><Eye className="size-3.5" strokeWidth={2.5} /> View</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Search className="size-8 text-[var(--text-faint)]" strokeWidth={2} />
          <p className="mt-2 text-sm font-medium text-[var(--text-strong)]">No accounts found</p>
          <p className="text-xs font-medium text-[var(--text-muted)]">Try a different search</p>
        </div>
      )}
    </SectionCard>
  );
}
