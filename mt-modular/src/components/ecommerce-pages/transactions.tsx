'use client';

import * as React from 'react';
import { Download, MoreHorizontal, Search, ArrowLeftRight, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge, MetricCard, UserAvatar, SearchInput } from '@/components/dashboard/primitives';
import { DataTable, type Column } from '@/components/dashboard/data-table';
import { DropdownMenu, DropdownItem } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { useDashboardStore } from '@/lib/dashboard-store';
import { CardIcon } from '@/components/dashboard/card-icons';
import { transactions, type Transaction } from '@/lib/ecommerce-data';
import { cn } from '@/lib/utils';

const statusTone: Record<Transaction['status'], 'success' | 'warning' | 'error' | 'info'> = {
  Success: 'success',
  Pending: 'warning',
  Failed: 'error',
  Refunded: 'info',
};

const typeIcon: Record<Transaction['type'], React.ElementType> = {
  Payment: ArrowDownRight,
  Refund: ArrowUpRight,
  Subscription: RefreshCcw,
  Payout: ArrowLeftRight,
};

export function TransactionsPage() {
  const { toast } = useToast();
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [typeFilter, setTypeFilter] = React.useState('all');

  const filtered = React.useMemo(() => {
    return transactions.filter((tx) => {
      if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
      if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          tx.id.toLowerCase().includes(q) ||
          tx.customer.toLowerCase().includes(q) ||
          tx.email.toLowerCase().includes(q) ||
          tx.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, statusFilter, typeFilter]);

  const totalSuccess = transactions.filter((t) => t.status === 'Success').reduce((sum, t) => sum + t.amount, 0);
  const totalRefunded = transactions.filter((t) => t.status === 'Refunded').reduce((sum, t) => sum + t.amount, 0);

  const columns: Column<Transaction>[] = [
    {
      key: 'id',
      header: 'Transaction',
      sortable: true,
      cell: (tx) => (
        <div>
          <p className="font-mono font-semibold text-[var(--text-strong)]">{tx.id}</p>
          <p className="text-xs font-medium text-[var(--text-muted)]">{tx.date} · {tx.time}</p>
        </div>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
      cell: (tx) => (
        <div className="flex items-center gap-2.5">
          <UserAvatar name={tx.customer} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-[var(--text-strong)]">{tx.customer}</p>
            <p className="truncate text-xs font-medium text-[var(--text-muted)]">{tx.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      cell: (tx) => <span className="text-xs font-medium text-[var(--text-body)]">{tx.description}</span>,
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      align: 'center',
      cell: (tx) => {
        const Icon = typeIcon[tx.type];
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-body)]">
            <Icon className="size-3.5 text-[var(--text-muted)]" />
            {tx.type}
          </span>
        );
      },
    },
    {
      key: 'method',
      header: 'Method',
      cell: (tx) => (
        <div className="flex items-center gap-2">
          <CardIcon brand={tx.method} className="size-6" />
          <span className="font-mono text-xs font-medium text-[var(--text-muted)]">•••• {tx.last4}</span>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      sortValue: (tx) => tx.amount,
      align: 'right',
      cell: (tx) => (
        <span className={cn(
          'font-semibold',
          tx.type === 'Refund' || tx.status === 'Refunded'
            ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]'
            : 'text-[var(--text-strong)]',
        )}>
          {tx.type === 'Refund' || tx.status === 'Refunded' ? '-' : ''}${tx.amount.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'center',
      cell: (tx) => <StatusBadge tone={statusTone[tx.status]} dot>{tx.status}</StatusBadge>,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      cell: (tx) => (
        <DropdownMenu
          trigger={
            <span className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
              <MoreHorizontal className="size-4" />
            </span>
          }
        >
          <DropdownItem onClick={() => setEcommerce('single-transaction')}>View details</DropdownItem>
          <DropdownItem icon={RefreshCcw} onClick={() => toast({ title: 'Refund initiated', description: `${tx.id} — $${tx.amount}` })}>
            {tx.status === 'Refunded' ? 'View refund' : 'Refund transaction'}
          </DropdownItem>
          <DropdownItem icon={Download} onClick={() => toast({ title: 'Receipt downloaded', description: `${tx.id}.pdf` })}>
            Download receipt
          </DropdownItem>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Transactions' }]}
        title="Transactions"
        description="All payment transactions, refunds, and payouts."
        actions={
          <button type="button" className="ds-btn ds-btn-secondary" onClick={() => toast({ title: 'Export queued', description: 'Transactions exporting to CSV' })}>
            <Download className="size-4" /> <span className="hidden sm:inline">Export</span>
          </button>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard index={0} label="Total Processed" value={`$${(totalSuccess / 1000).toFixed(1)}K`} helper="Successful transactions" icon={ArrowDownRight} accent="success" />
        <MetricCard index={1} label="Refunded" value={`$${totalRefunded.toLocaleString()}`} helper="Last 30 days" icon={ArrowUpRight} accent="error" />
        <MetricCard index={2} label="Failed" value={transactions.filter((t) => t.status === 'Failed').length.toString()} helper="Need retry" icon={ArrowLeftRight} accent="warning" />
        <MetricCard index={3} label="Pending" value={transactions.filter((t) => t.status === 'Pending').length.toString()} helper="Awaiting processing" icon={RefreshCcw} accent="info" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by ID, customer, or description..."
          className="flex-1"
        />
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-40">
            <Select
              size="sm"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'Success', label: 'Success' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Failed', label: 'Failed' },
                { value: 'Refunded', label: 'Refunded' },
              ]}
              aria-label="Status filter"
            />
          </div>
          <div className="w-36">
            <Select
              size="sm"
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { value: 'all', label: 'All types' },
                { value: 'Payment', label: 'Payment' },
                { value: 'Refund', label: 'Refund' },
                { value: 'Subscription', label: 'Subscription' },
                { value: 'Payout', label: 'Payout' },
              ]}
              aria-label="Type filter"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-medium text-[var(--text-muted)]">
        <span>Showing {filtered.length} of {transactions.length} transactions</span>
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
