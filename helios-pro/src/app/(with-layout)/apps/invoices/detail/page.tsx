import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Timeline } from "@/components/shared/timeline";
import {
  ArrowLeftIcon,
  FileTextIcon,
  EditIcon,
  CheckIcon,
  CreditCardIcon,
  MailIcon,
} from "@/components/Layouts/sidebar/icons";
import { sampleInvoice, invoiceStatusTone } from "@/data/apps/invoices";

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={16} height={16} viewBox="0 0 24 24" fill="none">
      <path d="M12 4v11m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export const metadata = {
  title: "Invoice Detail",
  description: "Preview an invoice with line items, totals and payment status.",
};

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export default function InvoiceDetailPage() {
  const inv = sampleInvoice;
  const subtotal = inv.items.reduce((s, i) => s + i.qty * i.rate, 0);
  const discount = inv.discount;
  const taxRate = inv.taxRate;
  const taxableBase = Math.max(0, subtotal - discount);
  const taxAmount = taxableBase * taxRate;
  const total = taxableBase + taxAmount;

  return (
    <div>
      <PageHeader
        title={`Invoice ${inv.id}`}
        description="Preview the invoice before sending or download a PDF copy."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Apps" },
          { label: "Invoices", href: "/apps/invoices" },
          { label: inv.id },
        ]}
        actions={
          <>
            <Link href="/apps/invoices">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="size-4" />
                Back to list
              </Button>
            </Link>
            <Link href="/apps/invoices/edit">
              <Button variant="outline" size="sm">
                <EditIcon className="size-4" />
                Edit
              </Button>
            </Link>
            <Button variant="primary" size="sm">
              <MailIcon className="size-4" />
              Send to client
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Invoice document */}
        <Card padded={false}>
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-stroke p-6 dark:border-dark-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-xl bg-primary text-white">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                    <path
                      d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-base font-bold text-dark dark:text-white">Helios Pro, Inc.</p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">
                    548 Market St, San Francisco, CA 94104 · billing@heliospro.io
                  </p>
                </div>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-mono text-lg font-bold text-dark dark:text-white">{inv.id}</p>
              <div className="mt-2 flex items-center gap-2 sm:justify-end">
                <Badge variant={invoiceStatusTone[inv.status]} size="md" className="capitalize">
                  {inv.status}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-dark-5 dark:text-dark-6">
                Issued <span className="font-medium text-dark dark:text-white">{inv.issued}</span>
              </p>
              <p className="text-xs text-dark-5 dark:text-dark-6">
                Due <span className="font-medium text-dark dark:text-white">{inv.due}</span>
              </p>
            </div>
          </div>

          {/* Bill-to / owner */}
          <div className="grid grid-cols-1 gap-4 border-b border-stroke p-6 dark:border-dark-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Bill to
              </p>
              <p className="text-sm font-semibold text-dark dark:text-white">{inv.client}</p>
              <p className="whitespace-pre-line text-xs text-dark-5 dark:text-dark-6">
                {inv.clientAddress}
              </p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{inv.clientEmail}</p>
            </div>
            <div className="sm:text-right">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Account manager
              </p>
              <div className="flex items-center gap-2 sm:justify-end">
                <Avatar name={inv.owner} size="sm" />
                <div>
                  <p className="text-sm font-medium text-dark dark:text-white">{inv.owner}</p>
                  <p className="text-[11px] text-dark-5 dark:text-dark-6">Helios Pro · Customer Success</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-dark-5 dark:text-dark-6">
                Quote ref <span className="font-mono text-dark dark:text-white">Q4-NW-2201</span>
              </p>
            </div>
          </div>

          {/* Line items */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark-2">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                    Description
                  </th>
                  <th className="w-20 px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                    Qty
                  </th>
                  <th className="w-32 px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                    Rate
                  </th>
                  <th className="w-32 px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stroke dark:divide-dark-3">
                {inv.items.map((it) => (
                  <tr key={it.id} className="hover:bg-gray-2/40 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-3.5 text-dark dark:text-dark-7">{it.description}</td>
                    <td className="px-3 py-3.5 text-right text-dark-7 dark:text-dark-7">{it.qty}</td>
                    <td className="px-3 py-3.5 text-right text-dark-7 dark:text-dark-7">{fmt(it.rate)}</td>
                    <td className="px-6 py-3.5 text-right font-medium text-dark dark:text-white">
                      {fmt(it.qty * it.rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex flex-col justify-end gap-2 border-t border-stroke p-6 dark:border-dark-3 sm:flex-row">
            <div className="w-full max-w-sm space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Subtotal</span>
                <span className="font-medium text-dark dark:text-white">{fmt(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Discount</span>
                <span className="font-medium text-primary dark:text-primary-light">−{fmt(discount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Tax ({(taxRate * 100).toFixed(1)}%)</span>
                <span className="font-medium text-dark dark:text-white">{fmt(taxAmount)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-stroke pt-2 dark:border-dark-3">
                <span className="text-sm font-semibold text-dark dark:text-white">Total due</span>
                <span className="text-xl font-bold text-dark dark:text-white">{fmt(total)}</span>
              </div>
              <p className="pt-1 text-right text-[11px] text-dark-5 dark:text-dark-6">
                USD · Net 14
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-stroke p-6 dark:border-dark-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
              Notes
            </p>
            <p className="text-sm text-dark-7 dark:text-dark-7">{inv.notes}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <DownloadIcon className="size-4" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <CreditCardIcon className="size-4" />
                Record payment
              </Button>
              <Button variant="soft" size="sm">
                <FileTextIcon className="size-4" />
                Duplicate
              </Button>
            </div>
          </div>
        </Card>

        {/* Side panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Payment status" />
            <div className="rounded-xl border border-stroke bg-gray-2/40 p-4 dark:border-dark-3 dark:bg-white/[0.02]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-5 dark:text-dark-6">Status</span>
                <Badge variant={invoiceStatusTone[inv.status]} size="md" className="capitalize">
                  {inv.status}
                </Badge>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Amount due</span>
                <span className="font-semibold text-dark dark:text-white">{fmt(total)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Due date</span>
                <span className="text-dark dark:text-white">{inv.due}</span>
              </div>
              <Button variant="primary" size="sm" className="mt-4 w-full">
                <CheckIcon className="size-4" />
                Mark as paid
              </Button>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Quick actions
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/apps/invoices/edit"
                    className="flex items-center gap-2 rounded-lg border border-stroke px-3 py-2 text-dark-7 transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-7"
                  >
                    <EditIcon className="size-3.5" />
                    Edit line items
                  </Link>
                </li>
                <li>
                  <button className="flex w-full items-center gap-2 rounded-lg border border-stroke px-3 py-2 text-left text-dark-7 transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-7">
                    <MailIcon className="size-3.5" />
                    Resend to client
                  </button>
                </li>
                <li>
                  <button className="flex w-full items-center gap-2 rounded-lg border border-stroke px-3 py-2 text-left text-dark-7 transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-7">
                    <DownloadIcon className="size-3.5" />
                    Download PDF
                  </button>
                </li>
              </ul>
            </div>
          </Card>

          <Card>
            <CardHeader title="Activity" />
            <Timeline
              events={[
                { title: "Invoice created", description: "Draft saved by Aarav Sharma", time: "Jan 22, 09:14", tone: "primary" },
                { title: "Sent to client", description: "billing@northwind.io", time: "Jan 22, 11:02", tone: "info" },
                { title: "Viewed by client", description: "Grace Okoro opened the invoice", time: "Jan 22, 14:48", tone: "violet" },
                { title: "Payment due", description: "Auto-charge scheduled", time: "Feb 05", tone: "accent" },
              ]}
            />
          </Card>

          <Card>
            <CardHeader title="Linked" />
            <ul className="space-y-2">
              {[
                { label: "Customer: Northwind Labs", href: "/apps/contacts" },
                { label: "Subscription: Enterprise (250 seats)", href: "#" },
                { label: "Support ticket: TKT-4820", href: "/apps/support-tickets/detail" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 rounded-lg border border-stroke px-3 py-2 text-xs text-dark-7 transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-7"
                  >
                    <FileTextIcon className="size-3.5" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
