"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { Progress } from "@/components/shared/progress";
import { StatCard } from "@/components/shared/stat-card";
import { HeliosChart } from "@/components/shared/helios-chart";
import {
  FormSection,
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import {
  CreditCardIcon,
  CheckSquareIcon,
  RefreshCwIcon,
  XCircleIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  currentPlan,
  paymentMethods as initialMethods,
  invoices,
  usageMeters,
  usageSeries,
  usageCategories,
  billingStats,
  type Invoice,
  type PaymentMethod,
} from "@/data/user-account/billing";

const invoiceStatusVariant: Record<Invoice["status"], "success" | "info" | "danger" | "neutral"> = {
  Paid: "success",
  Sent: "info",
  Overdue: "danger",
  Draft: "neutral",
};

const fmt = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const usageChartOptions: ApexCharts.ApexOptions = {
  chart: { toolbar: { show: false }, sparkline: { enabled: false } },
  colors: ["#10b981"],
  stroke: { curve: "smooth", width: 3 },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [0, 90, 100],
    },
  },
  dataLabels: { enabled: false },
  grid: { padding: { left: 12, right: 12 } },
  xaxis: {
    categories: usageCategories,
    labels: { style: { fontSize: "11px" } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { fontSize: "11px" } } },
  tooltip: { x: { format: "MMM yyyy" } },
  markers: { size: 0, hover: { size: 5 } },
};

export default function BillingSettingsClient() {
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);
  const [addMethodOpen, setAddMethodOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [planCycle, setPlanCycle] = useState<"month" | "year">("month");

  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const setDefault = (id: string) =>
    setMethods((arr) => arr.map((m) => ({ ...m, isDefault: m.id === id })));

  const removeMethod = (id: string) =>
    setMethods((arr) => arr.filter((m) => m.id !== id));

  const addMethod = () => {
    if (!newCard.number || !newCard.name) return;
    const last4 = newCard.number.replace(/\s/g, "").slice(-4);
    setMethods((arr) => [
      ...arr,
      {
        id: "PM-" + (arr.length + 1),
        brand: "Visa",
        last4,
        expiry: newCard.expiry || "—",
        isDefault: false,
        holder: newCard.name,
      },
    ]);
    setNewCard({ number: "", name: "", expiry: "", cvc: "" });
    setAddMethodOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Billing settings"
        description="Manage your subscription, payment methods, invoices and usage."
        breadcrumbs={[{ label: "User & Account" }, { label: "Billing" }]}
        actions={
          <Button variant="outline" onClick={() => setCancelOpen(true)}>
            Cancel subscription
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Monthly recurring"
          value={fmt(billingStats.mrr)}
          delta={{ value: "+$50", trend: "up" }}
          tone="primary"
          icon={<CreditCardIcon className="size-5" />}
        />
        <StatCard
          label="Year to date"
          value={fmt(billingStats.ytd)}
          delta={{ value: "+12%", trend: "up" }}
          tone="info"
          icon={<CreditCardIcon className="size-5" />}
        />
        <StatCard
          label="Next invoice"
          value={fmt(billingStats.nextInvoice)}
          sublabel="Mar 14, 2025"
          tone="violet"
          icon={<RefreshCwIcon className="size-5" />}
        />
        <StatCard
          label="Outstanding"
          value={fmt(billingStats.outstanding)}
          sublabel="Nothing due"
          tone="success"
          icon={<CheckSquareIcon className="size-5" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Current plan */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Current plan"
            subtitle="You are currently on the Helios Pro Scale plan."
            action={
              <div className="inline-flex rounded-lg border border-stroke p-1 dark:border-dark-3">
                <button
                  onClick={() => setPlanCycle("month")}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                    planCycle === "month"
                      ? "bg-primary text-white"
                      : "text-dark-5 dark:text-dark-6"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setPlanCycle("year")}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                    planCycle === "year"
                      ? "bg-primary text-white"
                      : "text-dark-5 dark:text-dark-6"
                  }`}
                >
                  Yearly
                  <Badge variant="success" size="sm" className="ml-1">-20%</Badge>
                </button>
              </div>
            }
          />
          <div className="flex flex-col gap-6 rounded-xl bg-gradient-to-br from-primary-subtle/60 to-accent-subtle/40 p-5 dark:from-primary/10 dark:to-accent/10 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-dark dark:text-white">
                  {currentPlan.name}
                </h3>
                <Badge variant="success">{currentPlan.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                Renews on {currentPlan.renewsOn} ·{" "}
                {currentPlan.seatsUsed} / {currentPlan.seats} seats used
              </p>
              <p className="mt-4 text-3xl font-bold text-dark dark:text-white">
                {fmt(currentPlan.price)}
                <span className="text-sm font-medium text-dark-5 dark:text-dark-6">
                  {" "}/ {planCycle === "month" ? "month" : "year"}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <Button>Change plan</Button>
              <Button variant="outline">Compare plans</Button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {currentPlan.features.map((f) => (
              <div key={f} className="flex items-start gap-2 text-sm text-dark-7 dark:text-dark-6">
                <CheckSquareIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Usage meters */}
        <Card>
          <CardHeader title="Usage this cycle" subtitle="Resets on Mar 14, 2025" />
          <ul className="space-y-4">
            {usageMeters.map((m) => {
              const pct = Math.round((m.used / m.total) * 100);
              return (
                <li key={m.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-dark dark:text-white">{m.label}</span>
                    <span className="text-dark-5 dark:text-dark-6">
                      {m.used.toLocaleString()} / {m.total.toLocaleString()} {m.unit}
                    </span>
                  </div>
                  <Progress
                    value={pct}
                    tone={pct > 85 ? "danger" : m.tone}
                    size="sm"
                  />
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* Usage chart */}
      <Card className="mt-6">
        <CardHeader
          title="Usage over the last 12 months"
          subtitle="API calls per month, in thousands."
          action={<Badge variant="info">+18% vs prior year</Badge>}
        />
        <HeliosChart
          options={usageChartOptions}
          series={usageSeries}
          type="area"
          height={280}
        />
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Payment methods */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Payment methods"
            subtitle="Cards and other methods used to pay for your Helios Pro subscription."
            action={
              <Button size="sm" onClick={() => setAddMethodOpen(true)}>
                <CreditCardIcon className="size-4" />
                Add method
              </Button>
            }
          />
          <ul className="space-y-3">
            {methods.map((m) => (
              <li
                key={m.id}
                className="flex flex-col gap-3 rounded-xl border border-stroke p-4 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                    <CreditCardIcon className="size-5" />
                  </span>
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                      {m.brand} ···· {m.last4}
                      {m.isDefault && <Badge variant="primary">Default</Badge>}
                    </p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">
                      {m.holder} · Expires {m.expiry}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!m.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => setDefault(m.id)}>
                      Set default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red"
                    onClick={() => removeMethod(m.id)}
                  >
                    <XCircleIcon className="size-4" />
                    Remove
                  </Button>
                </div>
              </li>
            ))}
            {methods.length === 0 && (
              <p className="py-6 text-center text-sm text-dark-5 dark:text-dark-6">
                No payment methods on file.
              </p>
            )}
          </ul>
        </Card>

        {/* Billing address */}
        <Card>
          <CardHeader
            title="Billing address"
            subtitle="Used on all invoices and receipts."
            action={<Button variant="ghost" size="sm">Edit</Button>}
          />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-dark-5 dark:text-dark-6">Company</dt>
              <dd className="font-medium text-dark dark:text-white">Helios Pro, Inc.</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-dark-5 dark:text-dark-6">Address</dt>
              <dd className="text-right text-dark-7 dark:text-dark-6">
                24 MG Road, Bengaluru, KA 560001
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-dark-5 dark:text-dark-6">Country</dt>
              <dd className="text-dark-7 dark:text-dark-6">India</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-dark-5 dark:text-dark-6">Tax ID</dt>
              <dd className="text-dark-7 dark:text-dark-6">GSTIN 29ABCDE1234F1Z5</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-dark-5 dark:text-dark-6">Currency</dt>
              <dd className="text-dark-7 dark:text-dark-6">USD ($)</dd>
            </div>
          </dl>
          <div className="mt-4 rounded-xl border border-stroke p-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
            Need a different billing currency or tax treatment? Contact{" "}
            <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-primary">
              billing@heliospro.io
            </a>
            .
          </div>
        </Card>
      </div>

      {/* Invoices */}
      <Card className="mt-6">
        <CardHeader
          title="Invoices"
          subtitle="Every invoice we've issued, downloadable as PDF."
          action={<Button variant="outline" size="sm">Download all</Button>}
        />
        <div className="overflow-hidden rounded-xl border border-stroke dark:border-dark-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-2 text-left text-xs uppercase tracking-wider text-dark-5 dark:bg-dark-2 dark:text-dark-6">
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t border-stroke dark:border-dark-3">
                  <td className="px-4 py-3 font-medium text-dark dark:text-white">{inv.number}</td>
                  <td className="px-4 py-3 text-dark-7 dark:text-dark-6">{inv.date}</td>
                  <td className="px-4 py-3 text-dark-7 dark:text-dark-6">{inv.description}</td>
                  <td className="px-4 py-3 text-dark-7 dark:text-dark-6">{inv.method}</td>
                  <td className="px-4 py-3 text-right font-medium text-dark dark:text-white">
                    {fmt(inv.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={invoiceStatusVariant[inv.status]}>{inv.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add payment method modal */}
      <Modal
        open={addMethodOpen}
        onClose={() => setAddMethodOpen(false)}
        title="Add payment method"
        description="Add a new credit or debit card to your Helios Pro account."
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setAddMethodOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addMethod}>
              <CheckSquareIcon className="size-4" />
              Add card
            </Button>
          </>
        }
      >
        <FormSection title="" columns={1} className="border-0 p-0 shadow-none">
          <FormField label="Card number" htmlFor="card-number">
            <input
              id="card-number"
              className={inputClass}
              placeholder="4242 4242 4242 4242"
              value={newCard.number}
              onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
            />
          </FormField>
          <FormField label="Name on card" htmlFor="card-name">
            <input
              id="card-name"
              className={inputClass}
              placeholder="Aarav Mehta"
              value={newCard.name}
              onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Expiry" htmlFor="card-expiry">
              <input
                id="card-expiry"
                className={inputClass}
                placeholder="MM / YY"
                value={newCard.expiry}
                onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
              />
            </FormField>
            <FormField label="CVC" htmlFor="card-cvc">
              <input
                id="card-cvc"
                className={inputClass}
                placeholder="123"
                value={newCard.cvc}
                onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
              />
            </FormField>
          </div>
        </FormSection>
      </Modal>

      {/* Cancel subscription modal */}
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Cancel subscription"
        description="Your plan will remain active until the end of the current billing cycle."
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              Keep plan
            </Button>
            <Button variant="danger" onClick={() => setCancelOpen(false)}>
              Cancel subscription
            </Button>
          </>
        }
      >
        <div className="rounded-lg border border-accent/40 bg-accent-subtle/40 p-3 text-xs text-accent-dark dark:bg-accent/10 dark:text-accent-light">
          You'll lose access to Scale features (SSO, advanced permissions, priority support)
          on March 14, 2025. Your data will be retained for 30 days.
        </div>
        <FormField label="Reason for cancelling (optional)" htmlFor="cancel-reason">
          <select id="cancel-reason" className={inputClass}>
            <option>Too expensive</option>
            <option>Missing features</option>
            <option>Switching to another tool</option>
            <option>No longer needed</option>
            <option>Other</option>
          </select>
        </FormField>
      </Modal>
    </div>
  );
}
