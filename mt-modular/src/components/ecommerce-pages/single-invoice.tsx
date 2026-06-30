'use client';

import * as React from 'react';
import { ArrowLeft, Download, MoreHorizontal, Printer, Send, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge } from '@/components/dashboard/primitives';
import { DropdownMenu, DropdownItem } from '@/components/dashboard/primitives';
import { useDashboardStore } from '@/lib/dashboard-store';
import { invoices } from '@/lib/ecommerce-data';

export function SingleInvoicePage() {
  const { toast } = useToast();
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  // Always show the first invoice as a demo
  const invoice = invoices[0];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Invoices' }, { label: invoice.id }]}
        title={`Invoice ${invoice.id}`}
        description={`Issued ${invoice.issueDate} · Due ${invoice.dueDate}`}
        actions={
          <>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => setEcommerce('invoices')}>
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Back</span>
            </button>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => toast({ title: 'PDF downloaded', description: `${invoice.id}.pdf` })}>
              <Download className="size-4" /> PDF
            </button>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => window.print()}>
              <Printer className="size-4" /> Print
            </button>
            <button type="button" className="ds-btn ds-btn-primary" onClick={() => toast({ title: 'Invoice sent', description: `Sent to ${invoice.customerEmail}` })}>
              <Send className="size-4" /> Send
            </button>
          </>
        }
      />

      {/* Status banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card)] p-5">
        <div className="flex items-center gap-4">
          <div className="inline-flex size-12 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <FileText className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Invoice status</p>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge tone="success" dot>{invoice.status}</StatusBadge>
              <span className="text-sm font-medium text-[var(--text-muted)]">Paid on {invoice.paidDate}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Amount due</p>
          <p className="text-2xl font-semibold text-[var(--text-strong)]">${invoice.total.toLocaleString()}</p>
        </div>
      </div>

      {/* Invoice document */}
      <SectionCard>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-white">
                  <FileText className="size-5" />
                </div>
                <span className="text-base font-semibold text-[var(--text-strong)]">mtverse</span>
              </div>
              <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">123 Market Street, Suite 400</p>
              <p className="text-sm font-medium text-[var(--text-muted)]">San Francisco, CA 94103</p>
              <p className="text-sm font-medium text-[var(--text-muted)]">billing@mtverse.io</p>
            </div>
            <div className="sm:text-right">
              <p className="text-2xl font-semibold text-[var(--text-strong)]">INVOICE</p>
              <p className="mt-1 font-mono text-sm font-semibold text-[var(--text-body)]">#{invoice.id}</p>
              <div className="mt-3 space-y-1 text-xs font-medium text-[var(--text-muted)]">
                <p>Issue date: <span className="text-[var(--text-strong)]">{invoice.issueDate}</span></p>
                <p>Due date: <span className="text-[var(--text-strong)]">{invoice.dueDate}</span></p>
                {invoice.paidDate && <p>Paid: <span className="text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{invoice.paidDate}</span></p>}
              </div>
            </div>
          </div>

          {/* Bill to */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Bill to</p>
            <p className="mt-1 text-base font-semibold text-[var(--text-strong)]">{invoice.customer}</p>
            <p className="text-sm font-medium text-[var(--text-muted)]">{invoice.customerEmail}</p>
          </div>

          {/* Line items */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-[var(--border)]">
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Description</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Qty</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Rate</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-[var(--border-subtle)]">
                    <td className="px-3 py-3.5 font-medium text-[var(--text-strong)]">{item.description}</td>
                    <td className="px-3 py-3.5 text-center text-[var(--text-body)]">{item.qty}</td>
                    <td className="px-3 py-3.5 text-right text-[var(--text-body)]">${item.rate.toLocaleString()}</td>
                    <td className="px-3 py-3.5 text-right font-semibold text-[var(--text-strong)]">${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--text-muted)]">Subtotal</span>
                <span className="font-semibold text-[var(--text-strong)]">${invoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--text-muted)]">Tax (0%)</span>
                <span className="font-semibold text-[var(--text-strong)]">${invoice.tax.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-2">
                <span className="text-base font-semibold text-[var(--text-strong)]">Total</span>
                <span className="text-xl font-semibold text-[var(--text-strong)]">${invoice.total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[var(--color-success-50)] p-2 dark:bg-[rgba(18,183,106,0.06)]">
                <span className="text-sm font-semibold text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Amount paid</span>
                <span className="text-sm font-semibold text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">${invoice.total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-[var(--text-strong)]">Balance due</span>
                <span className="text-base font-semibold text-[var(--text-strong)]">$0.00</span>
              </div>
            </div>
          </div>

          {/* Footer notes */}
          <div className="border-t border-[var(--border-subtle)] pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Notes</p>
            <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
              Thank you for your business! Payment is due within 14 days. Please make checks payable to mtverse, or pay online at billing.mtverse.io using invoice number {invoice.id}.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
