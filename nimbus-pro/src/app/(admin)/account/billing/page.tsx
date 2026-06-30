"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Progress } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";
import {
  CreditCard, Download, Plus, Zap, Users, HardDrive, Code2,
  Calendar, MapPin, Trash2, AlertCircle,
} from "lucide-react";

const INVOICES = [
  { id: "INV-2041", date: "Jun 22, 2026", amount: 12480, status: "paid" },
  { id: "INV-2040", date: "May 22, 2026", amount: 12480, status: "paid" },
  { id: "INV-2039", date: "Apr 22, 2026", amount: 11240, status: "paid" },
  { id: "INV-2038", date: "Mar 22, 2026", amount: 11240, status: "paid" },
  { id: "INV-2037", date: "Feb 22, 2026", amount: 9840, status: "paid" },
  { id: "INV-2036", date: "Jan 22, 2026", amount: 9840, status: "paid" },
];

const STATUS_TONE: Record<string, "success" | "warning" | "error" | "gray"> = {
  paid: "success",
  pending: "warning",
  failed: "error",
  draft: "gray",
};

export default function BillingPage() {
  const [defaultCard, setDefaultCard] = useState("visa-1");
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");

  const planPrice = cycle === "monthly" ? 199 : 1908;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Billing"
        description="Manage your subscription, payment methods, and invoice history."
        breadcrumbs={[{ label: "Account" }, { label: "Billing" }]}
        actions={<Button variant="secondary"><Download className="h-4 w-4" /> Download statements</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Current plan */}
        <Card className="lg:col-span-2 overflow-hidden p-0">
          <div className="bg-gradient-to-br from-brand-500 via-accent-500 to-purple-500 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Current Plan</p>
                <h3 className="mt-1 text-2xl font-bold">Enterprise</h3>
                <p className="mt-1 text-sm opacity-80">For teams scaling across multiple products</p>
              </div>
              <Badge className="bg-white/20 text-white">{cycle === "monthly" ? "Monthly" : "Yearly"}</Badge>
            </div>
            <div className="mt-6 flex items-end gap-2">
              <span className="text-4xl font-bold">{formatCurrency(planPrice)}</span>
              <span className="mb-1 text-sm opacity-80">/ {cycle === "monthly" ? "month" : "year"}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs opacity-90">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Renews on Jul 22, 2026</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> 25 of 50 seats used</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 rounded-lg border border-gray-100 p-1 dark:border-gray-800">
              {(["monthly", "yearly"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCycle(c)}
                  className={cn("rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                    cycle === c ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  )}
                >
                  {c} {c === "yearly" && <span className="ml-1 text-success-300">-20%</span>}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Cancel plan</Button>
              <Button size="sm"><Zap className="h-3.5 w-3.5" /> Upgrade</Button>
            </div>
          </div>
        </Card>

        {/* Usage */}
        <Card>
          <CardHeader title="Usage" description="Current billing cycle" />
          <CardBody className="space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"><Users className="h-3.5 w-3.5 text-gray-400" /> Seats</span>
                <span className="font-semibold text-gray-900 dark:text-white">25 / 50</span>
              </div>
              <Progress value={50} tone="brand" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"><HardDrive className="h-3.5 w-3.5 text-gray-400" /> Storage</span>
                <span className="font-semibold text-gray-900 dark:text-white">182 GB / 500 GB</span>
              </div>
              <Progress value={36} tone="purple" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"><Code2 className="h-3.5 w-3.5 text-gray-400" /> API calls</span>
                <span className="font-semibold text-gray-900 dark:text-white">1.2M / 2M</span>
              </div>
              <Progress value={60} tone="warning" />
            </div>
            <div className="rounded-lg bg-warning-50 p-3 text-xs text-warning-700 dark:bg-warning-500/10 dark:text-warning-400">
              <AlertCircle className="mb-1 h-3.5 w-3.5" />
              You are using 60% of API quota. Consider upgrading to avoid throttling.
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Payment methods */}
        <Card className="lg:col-span-2">
          <CardHeader title="Payment Methods" description="Saved cards used for billing" action={<Button variant="secondary" size="sm"><Plus className="h-3.5 w-3.5" /> Add card</Button>} />
          <CardBody className="space-y-3">
            {[
              { id: "visa-1", brand: "VISA", last4: "4242", exp: "08/28", holder: "Aaroh Sharma", tone: "from-brand-500 to-accent-500" },
              { id: "mc-2", brand: "MC", last4: "8819", exp: "11/27", holder: "Aaroh Sharma", tone: "from-purple-500 to-pink-500" },
              { id: "amex-3", brand: "AMEX", last4: "1002", exp: "02/29", holder: "Priya Iyer", tone: "from-orange-500 to-warning-500" },
            ].map((c) => (
              <div key={c.id} className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("flex h-10 w-14 items-center justify-center rounded-md bg-gradient-to-br text-xs font-bold text-white", c.tone)}>
                    {c.brand}
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                      •••• {c.last4}
                      {defaultCard === c.id && <Badge tone="brand" variant="soft">Default</Badge>}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{c.holder} · Exp {c.exp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {defaultCard !== c.id && <Button variant="ghost" size="sm" onClick={() => setDefaultCard(c.id)}>Set default</Button>}
                  <Button variant="ghost" size="sm" className="text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <CreditCard className="h-3.5 w-3.5" /> Payments processed by Stripe · PCI-DSS compliant
            </div>
          </CardBody>
        </Card>

        {/* Billing address */}
        <Card>
          <CardHeader title="Billing Address" description="Used on invoices and receipts" action={<Button variant="ghost" size="sm">Edit</Button>} />
          <CardBody className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Nimbus Labs Pvt. Ltd.</p>
              <p className="text-gray-500 dark:text-gray-400">Attn: Aaroh Sharma</p>
            </div>
            <div className="space-y-1 text-gray-700 dark:text-gray-300">
              <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" /> 14th Floor, Trade Centre, BKC, Mumbai 400051, India</p>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 dark:border-gray-800">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">GSTIN</p>
                <p className="text-xs text-gray-700 dark:text-gray-300">27ABCDE1234F1Z5</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Currency</p>
                <p className="text-xs text-gray-700 dark:text-gray-300">USD ($)</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Invoice history */}
      <Card className="p-0">
        <CardHeader title="Invoice History" description="Download past invoices and receipts" className="border-b" action={<Button variant="ghost" size="sm">View all</Button>} />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="w-24">Download</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id}>
                  <td className="font-semibold text-gray-900 dark:text-white">{inv.id}</td>
                  <td className="text-sm text-gray-700 dark:text-gray-300">{inv.date}</td>
                  <td className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(inv.amount)}</td>
                  <td><Badge tone={STATUS_TONE[inv.status]} variant="soft" dot className="capitalize">{inv.status}</Badge></td>
                  <td>
                    <Button variant="ghost" size="sm"><Download className="h-3.5 w-3.5" /> PDF</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
