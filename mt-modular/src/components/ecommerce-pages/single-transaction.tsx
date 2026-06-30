'use client';

import * as React from 'react';
import { ArrowLeft, Check, Clock, Download, FileText, RefreshCcw, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge, UserAvatar } from '@/components/dashboard/primitives';
import { CardIcon } from '@/components/dashboard/card-icons';
import { useDashboardStore } from '@/lib/dashboard-store';
import { transactions } from '@/lib/ecommerce-data';
import { cn } from '@/lib/utils';

export function SingleTransactionPage() {
  const { toast } = useToast();
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  // Show first transaction as a demo
  const tx = transactions[0];

  const timeline = [
    { event: 'Transaction initiated', time: `${tx.date} ${tx.time}`, tone: 'info' as const, icon: Clock, description: `Customer started checkout for $${tx.amount.toLocaleString()}` },
    { event: 'Payment method verified', time: `${tx.date} ${tx.time}`, tone: 'brand' as const, icon: Check, description: `${tx.method.toString().toUpperCase()} card ending in ${tx.last4} validated` },
    { event: 'Payment captured', time: `${tx.date} ${tx.time}`, tone: 'success' as const, icon: Check, description: `$${tx.amount.toLocaleString()} captured successfully` },
    { event: 'Receipt sent', time: `${tx.date} ${tx.time}`, tone: 'info' as const, icon: FileText, description: `Receipt emailed to ${tx.email}` },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Transactions' }, { label: tx.id }]}
        title={`Transaction ${tx.id}`}
        description={`${tx.date} at ${tx.time}`}
        actions={
          <>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => setEcommerce('transactions')}>
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Back</span>
            </button>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => toast({ title: 'Receipt downloaded', description: `${tx.id}.pdf` })}>
              <Download className="size-4" /> Receipt
            </button>
            {tx.status !== 'Refunded' && (
              <button type="button" className="ds-btn !h-11 bg-[var(--color-error-600)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-error-700)]" onClick={() => toast({ title: 'Refund initiated', description: `$${tx.amount} refund processing`, variant: 'destructive' })}>
                <RefreshCcw className="size-4" /> Refund
              </button>
            )}
          </>
        }
      />

      {/* Status banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card)] p-5">
        <div className="flex items-center gap-4">
          <div className="inline-flex size-12 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <Check className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Transaction status</p>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge tone="success" dot>{tx.status}</StatusBadge>
              <span className="text-sm font-medium text-[var(--text-muted)]">{tx.type}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Amount</p>
          <p className="text-2xl font-semibold text-[var(--text-strong)]">${tx.amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Left — details */}
        <div className="space-y-4 xl:col-span-2">
          {/* Transaction details */}
          <SectionCard title="Transaction Details" description="Payment metadata">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Detail label="Transaction ID" value={tx.id} mono />
              <Detail label="Type" value={tx.type} />
              <Detail label="Description" value={tx.description} span2 />
              <Detail label="Date" value={tx.date} />
              <Detail label="Time" value={tx.time} />
              <Detail label="Amount" value={`$${tx.amount.toLocaleString()}`} />
              <Detail label="Currency" value="USD" />
              <Detail label="Status" value={tx.status} />
              <Detail label="Method" value={`${tx.method.toString().toUpperCase()} •••• ${tx.last4}`} span2 />
            </dl>
          </SectionCard>

          {/* Timeline */}
          <SectionCard title="Transaction Timeline" description="Step-by-step processing events">
            <ol className="relative space-y-5 pl-6">
              <span className="absolute left-2 top-2 h-[calc(100%-2rem)] w-px bg-[var(--border-subtle)]" aria-hidden="true" />
              {timeline.map((event, idx) => {
                const Icon = event.icon;
                return (
                  <li key={idx} className="relative">
                    <span
                      className={cn(
                        'absolute -left-[18px] top-1 inline-flex size-4 items-center justify-center rounded-full ring-4 ring-[var(--card)]',
                        event.tone === 'success' && 'bg-[var(--color-success-500)]',
                        event.tone === 'brand' && 'bg-[var(--color-brand-500)]',
                        event.tone === 'info' && 'bg-[var(--color-info-500)]',
                      )}
                      aria-hidden="true"
                    />
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-[var(--text-strong)]">{event.event}</p>
                      <span className="text-xs font-medium text-[var(--text-muted)]">{event.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm font-medium text-[var(--text-muted)]">{event.description}</p>
                  </li>
                );
              })}
            </ol>
          </SectionCard>
        </div>

        {/* Right — customer + payment */}
        <div className="space-y-4">
          {/* Customer */}
          <SectionCard title="Customer" description="Buyer information">
            <div className="flex items-center gap-3">
              <UserAvatar name={tx.customer} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-[var(--text-strong)]">{tx.customer}</p>
                <p className="truncate text-xs font-medium text-[var(--text-muted)]">{tx.email}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--border-subtle)] pt-3">
              <button type="button" className="ds-btn ds-btn-secondary !h-9 !text-xs">View profile</button>
              <button type="button" className="ds-btn ds-btn-secondary !h-9 !text-xs">Email customer</button>
            </div>
          </SectionCard>

          {/* Payment method */}
          <SectionCard title="Payment Method" description="Card used for this transaction">
            <div className="rounded-2xl bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-800)] p-5 text-white shadow-[var(--shadow-theme-md)]">
              <div className="flex items-center justify-between">
                <div className="size-8 rounded-lg bg-white/20 backdrop-blur" />
                <CardIcon brand={tx.method} className="size-9" />
              </div>
              <p className="mt-4 font-mono text-base font-semibold tracking-wider">•••• •••• •••• {tx.last4}</p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Cardholder</p>
                  <p className="text-sm font-semibold">{tx.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Type</p>
                  <p className="text-sm font-semibold">{tx.type}</p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Risk assessment */}
          <SectionCard title="Risk Assessment" description="Fraud detection score">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Risk level</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">Low</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Score</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--text-strong)]">12/100</p>
              </div>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
              <div className="h-full rounded-full bg-[var(--color-success-500)]" style={{ width: '12%' }} />
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-[var(--color-success-100)] bg-[var(--color-success-50)] p-3 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
              <Check className="mt-0.5 size-4 flex-shrink-0 text-[var(--color-success-600)] dark:text-[var(--color-success-500)]" />
              <p className="text-xs font-medium text-[var(--text-muted)]">
                Transaction passed all fraud checks. Card AVS and CVC verified successfully.
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, mono, span2 }: { label: string; value: string; mono?: boolean; span2?: boolean }) {
  return (
    <div className={cn(span2 && 'sm:col-span-2')}>
      <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{label}</dt>
      <dd className={cn('mt-1 text-sm font-semibold text-[var(--text-strong)]', mono && 'font-mono')}>{value}</dd>
    </div>
  );
}
