'use client';

import * as React from 'react';
import { Download, FileText, MoreHorizontal, Plus, Search, Send, Trash2, Eye, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge, MetricCard, UserAvatar, SearchInput } from '@/components/dashboard/primitives';
import { DataTable, type Column } from '@/components/dashboard/data-table';
import { DropdownMenu, DropdownItem } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { useDashboardStore } from '@/lib/dashboard-store';
import { invoices, type Invoice } from '@/lib/ecommerce-data';

const statusTone: Record<Invoice['status'], 'success' | 'warning' | 'error' | 'neutral'> = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'error',
  Draft: 'neutral',
};

export function InvoicesPage() {
  const { toast } = useToast();
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const filtered = React.useMemo(() => {
    return invoices.filter((inv) => {
      if (statusFilter !== 'all' && inv.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          inv.id.toLowerCase().includes(q) ||
          inv.customer.toLowerCase().includes(q) ||
          inv.customerEmail.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, statusFilter]);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((i) => i.id)));
    }
  }

  const columns: Column<Invoice>[] = [
    {
      key: 'select',
      header: '',
      cell: (inv) => (
        <input
          type="checkbox"
          checked={selected.has(inv.id)}
          onChange={() => toggleSelect(inv.id)}
          className="size-4 rounded border-[var(--border)] accent-[var(--color-brand-500)]"
          aria-label={`Select ${inv.id}`}
        />
      ),
      width: '40px',
    },
    {
      key: 'id',
      header: 'Invoice',
      sortable: true,
      cell: (inv) => (
        <div>
          <p className="font-semibold text-[var(--text-strong)]">{inv.id}</p>
          <p className="text-xs font-medium text-[var(--text-muted)]">Issued {inv.issueDate}</p>
        </div>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
      cell: (inv) => (
        <div className="flex items-center gap-2.5">
          <UserAvatar name={inv.customer} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-[var(--text-strong)]">{inv.customer}</p>
            <p className="truncate text-xs font-medium text-[var(--text-muted)]">{inv.customerEmail}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      sortValue: (inv) => inv.amount,
      align: 'right',
      cell: (inv) => <span className="font-semibold text-[var(--text-strong)]">${inv.amount.toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'center',
      cell: (inv) => <StatusBadge tone={statusTone[inv.status]} dot>{inv.status}</StatusBadge>,
    },
    {
      key: 'dueDate',
      header: 'Due date',
      sortable: true,
      cell: (inv) => <span className="text-xs font-medium text-[var(--text-body)]">{inv.dueDate}</span>,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      cell: (inv) => (
        <DropdownMenu
          trigger={
            <span className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
              <MoreHorizontal className="size-4" />
            </span>
          }
        >
          <DropdownItem icon={Eye} onClick={() => setEcommerce('single-invoice')}>View invoice</DropdownItem>
          <DropdownItem icon={Download} onClick={() => toast({ title: 'Downloading', description: `${inv.id}.pdf` })}>Download PDF</DropdownItem>
          <DropdownItem icon={Send} onClick={() => toast({ title: 'Invoice sent', description: `Reminder sent to ${inv.customerEmail}` })}>Send reminder</DropdownItem>
          <DropdownItem icon={Printer}>Print</DropdownItem>
          <DropdownItem icon={Trash2} onClick={() => toast({ title: 'Invoice deleted', variant: 'destructive' })}>Delete</DropdownItem>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Invoices' }]}
        title="Invoices"
        description="View, create, and manage all customer invoices."
        actions={
          <>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => toast({ title: 'Export queued', description: 'Invoices exporting to CSV' })}>
              <Download className="size-4" /> <span className="hidden sm:inline">Export</span>
            </button>
            <button type="button" className="ds-btn ds-btn-primary" onClick={() => setEcommerce('create-invoice')}>
              <Plus className="size-4" /> Create invoice
            </button>
          </>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard index={0} label="Total Outstanding" value={`$${invoices.filter((i) => i.status === 'Pending' || i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}`} helper="Across pending invoices" icon={FileText} accent="warning" />
        <MetricCard index={1} label="Paid (30d)" value={`$${invoices.filter((i) => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}`} helper="Last 30 days" icon={FileText} accent="success" />
        <MetricCard index={2} label="Overdue" value={invoices.filter((i) => i.status === 'Overdue').length.toString()} helper="Needs attention" icon={FileText} accent="error" />
        <MetricCard index={3} label="Draft" value={invoices.filter((i) => i.status === 'Draft').length.toString()} helper="Awaiting send" icon={FileText} accent="brand" />
      </div>

      {/* Bulk actions bar (when selected) */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--color-brand-200)] bg-[var(--color-brand-50)]/50 p-3 dark:border-[rgba(70,95,255,0.24)] dark:bg-[rgba(70,95,255,0.06)]">
          <span className="text-sm font-semibold text-[var(--text-strong)]">{selected.size} selected</span>
          <div className="ml-auto flex gap-2">
            <button type="button" className="ds-btn ds-btn-secondary !h-9 !text-xs" onClick={() => { toast({ title: 'Bulk download queued', description: `${selected.size} invoices downloading` }); setSelected(new Set()); }}>
              <Download className="size-3.5" /> Download all
            </button>
            <button type="button" className="ds-btn ds-btn-secondary !h-9 !text-xs" onClick={() => { toast({ title: 'Bulk reminder sent', description: `${selected.size} reminders sent` }); setSelected(new Set()); }}>
              <Send className="size-3.5" /> Send reminders
            </button>
            <button type="button" className="ds-btn !h-9 !text-xs bg-[var(--color-error-600)] text-white hover:bg-[var(--color-error-700)]" onClick={() => { toast({ title: 'Invoices deleted', variant: 'destructive' }); setSelected(new Set()); }}>
              <Trash2 className="size-3.5" /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by invoice ID, customer, or email..."
          className="flex-1"
        />
        <div className="w-44">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'Paid', label: 'Paid' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Overdue', label: 'Overdue' },
              { value: 'Draft', label: 'Draft' },
            ]}
            aria-label="Status filter"
          />
        </div>
      </div>

      {/* Table */}
      <SectionCard noBodyPadding>
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(row) => row.id}
          enableSort
          enablePagination
          pageSize={10}
        />
      </SectionCard>
    </div>
  );
}
