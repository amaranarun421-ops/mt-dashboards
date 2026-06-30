"use client";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Avatar } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";
import {
  ChevronLeft, Download, Send, CheckCircle2, Pencil, Printer, Share2,
  Building2, Mail, Calendar, Clock, CreditCard, Tag, History
} from "lucide-react";

const LINE_ITEMS = [
  { id: 1, desc: "UI/UX design — dashboard v3", qty: 80, rate: 120, amount: 9600 },
  { id: 2, desc: "Frontend development (Next.js + TS)", qty: 120, rate: 95, amount: 11400 },
  { id: 3, desc: "Backend API & integration", qty: 40, rate: 110, amount: 4400 },
  { id: 4, desc: "Cloud hosting (annual)", qty: 1, rate: 2400, amount: 2400 },
  { id: 5, desc: "Priority support hours", qty: 12, rate: 150, amount: 1800 },
];

const SUBTOTAL = LINE_ITEMS.reduce((s, i) => s + i.amount, 0);
const TAX_RATE = 0.08;
const TAX = Math.round(SUBTOTAL * TAX_RATE);
const TOTAL = SUBTOTAL + TAX;

const PAYMENT_HISTORY = [
  { id: "p1", date: "Jun 22, 2026", method: "Bank transfer", amount: 6240, status: "completed" },
  { id: "p2", date: "May 22, 2026", method: "Bank transfer", amount: 6240, status: "completed" },
];

const NOTES = [
  { id: 1, author: "Priya Iyer", text: "Customer confirmed receipt — they want to add 5 more seats next quarter.", time: "2d ago" },
  { id: 2, author: "Marcus Chen", text: "Auto-renewal enabled. Next invoice will be generated on Jul 22.", time: "5d ago" },
];

type InvoiceStatus = "paid" | "overdue" | "warning" | "sent" | "draft";

const STATUS_BORDER: Record<InvoiceStatus, string> = {
  paid: "border-success-200 bg-success-50/50 dark:border-success-800 dark:bg-success-500/10",
  overdue: "border-error-200 bg-error-50/50 dark:border-error-800 dark:bg-error-500/10",
  warning: "border-warning-200 bg-warning-50/50 dark:border-warning-800 dark:bg-warning-500/10",
  sent: "border-brand-200 bg-brand-50/50 dark:border-brand-800 dark:bg-brand-500/10",
  draft: "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-500/10",
};

const STATUS_BG: Record<InvoiceStatus, string> = {
  paid: "bg-success-500 text-white",
  overdue: "bg-error-500 text-white",
  warning: "bg-warning-500 text-white",
  sent: "bg-brand-500 text-white",
  draft: "bg-gray-500 text-white",
};

const STATUS_LABEL: Record<InvoiceStatus, string> = {
  paid: "Paid in full",
  overdue: "Overdue",
  warning: "Awaiting payment",
  sent: "Sent",
  draft: "Draft",
};

export default function InvoiceDetailPage() {
  const status: InvoiceStatus = "paid";

  return (
    <div className="space-y-4">
      <PageHeader
        title="Invoice #INV-2041"
        description="Issued Jun 22, 2026 · Due Jul 22, 2026 · Acme Corporation"
        breadcrumbs={[
          { label: "Apps" },
          { label: "Invoices", href: "/apps/invoices/list" },
          { label: "INV-2041" },
        ]}
        actions={
          <>
            <Link href="/apps/invoices/list">
              <Button variant="secondary"><ChevronLeft className="h-4 w-4" /> Back</Button>
            </Link>
            <Link href="/apps/invoices/edit">
              <Button variant="secondary"><Pencil className="h-4 w-4" /> Edit</Button>
            </Link>
            <Button variant="secondary"><Printer className="h-4 w-4" /> Print</Button>
            <Button><Download className="h-4 w-4" /> Download PDF</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main invoice */}
        <div className="space-y-4">
          {/* Status banner */}
          <Card className={cn("p-5", STATUS_BORDER[status])}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", STATUS_BG[status])}>
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {STATUS_LABEL[status]}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {status === "paid" ? "Payment received on Jun 26, 2026 via bank transfer." : "Payment was due on Jul 22, 2026."}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="secondary"><Send className="h-4 w-4" /> Resend</Button>
                <Button><Download className="h-4 w-4" /> Download PDF</Button>
              </div>
            </div>
          </Card>

          {/* Invoice document */}
          <Card className="p-0">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-start sm:justify-between dark:border-gray-800">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                    <span className="text-sm font-bold">N</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900 dark:text-white">Nimbus Pro</p>
                    <p className="text-[11px] text-gray-500">Premium admin UI kit</p>
                  </div>
                </div>
                <div className="mt-3 space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                  <p>500 Howard Street, San Francisco, CA 94105</p>
                  <p>billing@nimbuspro.io · +1 (415) 555-0142</p>
                  <p>Tax ID: 84-1234567</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">INVOICE</p>
                <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">#INV-2041</p>
                <div className="mt-3 space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                  <p>Issued: <span className="font-semibold text-gray-700 dark:text-gray-300">Jun 22, 2026</span></p>
                  <p>Due: <span className="font-semibold text-gray-700 dark:text-gray-300">Jul 22, 2026</span></p>
                </div>
              </div>
            </div>

            {/* From / To */}
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 p-6 sm:grid-cols-2 dark:border-gray-800">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">From</p>
                <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">Nimbus Pro Inc.</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">billing@nimbuspro.io</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">San Francisco, CA</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Bill to</p>
                <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">Acme Corporation</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">ap@acme.example</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">100 Market Street, San Francisco, CA</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tax ID: 92-9876543</p>
              </div>
            </div>

            {/* Line items */}
            <div className="p-6">
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th className="text-right">Qty</th>
                      <th className="text-right">Rate</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LINE_ITEMS.map((i) => (
                      <tr key={i.id}>
                        <td>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{i.desc}</p>
                          <p className="text-[11px] text-gray-500">Billed hourly · logged via Toggl</p>
                        </td>
                        <td className="text-right text-sm text-gray-700 dark:text-gray-300">{i.qty} {i.qty === 1 ? "unit" : "hrs"}</td>
                        <td className="text-right text-sm text-gray-700 dark:text-gray-300">{formatCurrency(i.rate)}</td>
                        <td className="text-right text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(i.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="mt-6 flex justify-end">
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(SUBTOTAL)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Tax (8%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(TAX)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Discount</span>
                    <span className="font-semibold text-success-600 dark:text-success-400">— {formatCurrency(0)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
                    <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-brand-600 dark:text-brand-400">{formatCurrency(TOTAL)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-success-50 p-2.5 dark:bg-success-500/10">
                    <span className="text-xs font-semibold text-success-700 dark:text-success-300">Amount paid</span>
                    <span className="text-sm font-bold text-success-700 dark:text-success-300">{formatCurrency(TOTAL)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">Balance due</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(0)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-6 dark:border-gray-800">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Payment terms</p>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Net 30 · Payment due within 30 days of issue. Late payments subject to 1.5% monthly interest.</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Thank you</p>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Thank you for your business! Questions? Email billing@nimbuspro.io or call +1 (415) 555-0142.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Quick actions */}
          <Card className="p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Quick actions</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm"><Download className="h-3.5 w-3.5" /> PDF</Button>
              <Button variant="secondary" size="sm"><Send className="h-3.5 w-3.5" /> Send</Button>
              <Button variant="secondary" size="sm"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
              <Button variant="secondary" size="sm"><Share2 className="h-3.5 w-3.5" /> Share</Button>
            </div>
            <Button className="mt-2 w-full" variant="primary" size="sm"><CheckCircle2 className="h-3.5 w-3.5" /> Mark as paid</Button>
          </Card>

          {/* Payment history */}
          <Card>
            <CardHeader title="Payment history" description="2 records" action={<History className="h-4 w-4 text-gray-400" />} />
            <CardBody className="space-y-3">
              {PAYMENT_HISTORY.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-2.5 dark:border-gray-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{p.method}</p>
                      <p className="text-[11px] text-gray-500">{p.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(p.amount)}</p>
                    <Badge tone="success" variant="soft" className="text-[10px]">{p.status}</Badge>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader title="Internal notes" description="Private to your team" action={<button className="text-xs font-semibold text-brand-600 dark:text-brand-400">Add</button>} />
            <CardBody className="space-y-3">
              {NOTES.map((n) => (
                <div key={n.id} className="flex gap-2.5">
                  <Avatar name={n.author} size={28} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{n.author}</p>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">{n.text}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Metadata */}
          <Card className="p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Metadata</p>
            <dl className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-gray-500"><Calendar className="h-3.5 w-3.5" /> Issued</dt>
                <dd className="font-semibold text-gray-700 dark:text-gray-300">Jun 22, 2026</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-gray-500"><Clock className="h-3.5 w-3.5" /> Due</dt>
                <dd className="font-semibold text-gray-700 dark:text-gray-300">Jul 22, 2026</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-gray-500"><Tag className="h-3.5 w-3.5" /> Currency</dt>
                <dd className="font-semibold text-gray-700 dark:text-gray-300">USD</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-gray-500"><Building2 className="h-3.5 w-3.5" /> Client</dt>
                <dd className="font-semibold text-gray-700 dark:text-gray-300">Acme Corporation</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-gray-500"><Mail className="h-3.5 w-3.5" /> Recipient</dt>
                <dd className="font-semibold text-gray-700 dark:text-gray-300">ap@acme.example</dd>
              </div>
            </dl>
          </Card>
        </aside>
      </div>
    </div>
  );
}
