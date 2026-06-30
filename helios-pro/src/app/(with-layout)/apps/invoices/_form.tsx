"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import {
  ArrowLeftIcon,
  EditIcon,
  CheckIcon,
  FileTextIcon,
  CreditCardIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  sampleInvoice,
  type InvoiceLineItem,
} from "@/data/apps/invoices";

export type InvoiceFormMode = "create" | "edit";

type FormProps = {
  mode: InvoiceFormMode;
  initialValues?: {
    id?: string;
    client?: string;
    clientEmail?: string;
    issued?: string;
    due?: string;
    notes?: string;
    items?: InvoiceLineItem[];
    taxRate?: number;
    discount?: number;
  };
};

const CLIENT_OPTIONS = [
  { name: "Northwind Labs", email: "billing@northwind.io" },
  { name: "Altavista GmbH", email: "ap@altavista.de" },
  { name: "Brightwave", email: "finance@brightwave.cn" },
  { name: "Meridian SA", email: "contato@meridian.br" },
  { name: "Fjord Tech", email: "billing@fjordtech.no" },
  { name: "Quantix", email: "ap@quantix.co" },
  { name: "Inland Robotics", email: "ap@inlandrobotics.com" },
  { name: "Cascade Energy", email: "billing@cascade.energy" },
];

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={16} height={16} viewBox="0 0 24 24" fill="none">
      <path d="M12 4v11m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function InvoiceForm({ mode, initialValues }: FormProps) {
  const isEdit = mode === "edit";

  const [client, setClient] = useState(initialValues?.client || CLIENT_OPTIONS[0].name);
  const [clientEmail, setClientEmail] = useState(initialValues?.clientEmail || CLIENT_OPTIONS[0].email);
  const [issued, setIssued] = useState(initialValues?.issued || "Jan 24, 2025");
  const [due, setDue] = useState(initialValues?.due || "Feb 07, 2025");
  const [notes, setNotes] = useState(initialValues?.notes || "");
  const [taxRate, setTaxRate] = useState<number>(initialValues?.taxRate ?? 0);
  const [discount, setDiscount] = useState<number>(initialValues?.discount ?? 0);

  const [items, setItems] = useState<InvoiceLineItem[]>(
    initialValues?.items && initialValues.items.length > 0
      ? initialValues.items
      : [
          { id: "li1", description: "", qty: 1, rate: 0 },
        ],
  );

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.qty * i.rate, 0),
    [items],
  );
  const taxableBase = Math.max(0, subtotal - discount);
  const taxAmount = taxableBase * (taxRate / 100);
  const total = taxableBase + taxAmount;

  function updateItem(id: string, patch: Partial<InvoiceLineItem>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      { id: `li${Date.now()}`, description: "", qty: 1, rate: 0 },
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((i) => i.id !== id)));
  }

  function onClientChange(name: string) {
    const found = CLIENT_OPTIONS.find((c) => c.name === name);
    setClient(name);
    if (found) setClientEmail(found.email);
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? `Edit ${initialValues?.id || "invoice"}` : "Create invoice"}
        description={
          isEdit
            ? "Update line items, tax and totals. Changes are reflected on the live preview."
            : "Build a new invoice — totals compute automatically as you edit line items."
        }
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Apps" },
          { label: "Invoices", href: "/apps/invoices" },
          { label: isEdit ? "Edit" : "Create" },
        ]}
        actions={
          <>
            <Link href="/apps/invoices">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="size-4" />
                Cancel
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <DownloadIcon className="size-4" />
              Save draft
            </Button>
            <Button variant="primary" size="sm">
              <CheckIcon className="size-4" />
              {isEdit ? "Save changes" : "Save & send"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          {/* Client + dates */}
          <FormSection title="Client & dates" description="Who the invoice is for and when it's due.">
            <FormField label="Client" htmlFor="client">
              <select
                id="client"
                value={client}
                onChange={(e) => onClientChange(e.target.value)}
                className={inputClass}
              >
                {CLIENT_OPTIONS.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Client email" htmlFor="clientEmail">
              <input
                id="clientEmail"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Issue date" htmlFor="issued">
              <input
                id="issued"
                value={issued}
                onChange={(e) => setIssued(e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Due date" htmlFor="due">
              <input
                id="due"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className={inputClass}
              />
            </FormField>
          </FormSection>

          {/* Line items */}
          <Card padded={false}>
            <div className="flex items-center justify-between border-b border-stroke p-5 dark:border-dark-3">
              <div>
                <h3 className="text-base font-semibold text-dark dark:text-white">Line items</h3>
                <p className="text-sm text-dark-5 dark:text-dark-6">Add the products or services billed on this invoice.</p>
              </div>
              <Button variant="soft" size="sm" onClick={addItem}>
                <EditIcon className="size-4" />
                Add line
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark-2">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                      Description
                    </th>
                    <th className="w-20 px-2 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                      Qty
                    </th>
                    <th className="w-32 px-2 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                      Rate
                    </th>
                    <th className="w-32 px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                      Amount
                    </th>
                    <th className="w-10 px-2 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-stroke dark:divide-dark-3">
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td className="px-4 py-2.5">
                        <input
                          value={it.description}
                          onChange={(e) => updateItem(it.id, { description: e.target.value })}
                          placeholder="e.g. Helios Pro — Enterprise platform (annual, 250 seats)"
                          className="w-full rounded-md border border-transparent bg-transparent px-2 py-1.5 text-sm text-dark outline-none transition focus:border-primary focus:bg-white dark:text-white dark:focus:bg-dark-2"
                        />
                      </td>
                      <td className="px-2 py-2.5">
                        <input
                          type="number"
                          min={1}
                          value={it.qty}
                          onChange={(e) => updateItem(it.id, { qty: Math.max(1, Number(e.target.value) || 1) })}
                          className="w-16 rounded-md border border-transparent bg-transparent px-2 py-1.5 text-right text-sm text-dark outline-none transition focus:border-primary focus:bg-white dark:text-white dark:focus:bg-dark-2"
                        />
                      </td>
                      <td className="px-2 py-2.5">
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={it.rate}
                          onChange={(e) => updateItem(it.id, { rate: Math.max(0, Number(e.target.value) || 0) })}
                          className="w-24 rounded-md border border-transparent bg-transparent px-2 py-1.5 text-right text-sm text-dark outline-none transition focus:border-primary focus:bg-white dark:text-white dark:focus:bg-dark-2"
                        />
                      </td>
                      <td className="px-3 py-2.5 text-right text-sm font-medium text-dark dark:text-white">
                        {fmt(it.qty * it.rate)}
                      </td>
                      <td className="px-2 py-2.5 text-center">
                        <button
                          onClick={() => removeItem(it.id)}
                          disabled={items.length === 1}
                          aria-label="remove line"
                          className="grid size-7 place-items-center rounded-md text-dark-5 transition hover:bg-red-light-5 hover:text-red disabled:opacity-30 dark:hover:bg-red/15 dark:hover:text-red-light"
                        >
                          <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                            <path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-stroke p-4 dark:border-dark-3">
              <p className="text-xs text-dark-5 dark:text-dark-6">{items.length} line items</p>
              <Button variant="ghost" size="sm" onClick={addItem}>
                <EditIcon className="size-4" />
                Add another line
              </Button>
            </div>
          </Card>

          {/* Tax / discount / notes */}
          <FormSection title="Tax, discount & notes" description="Adjust the final total and add any payment terms." columns={2}>
            <FormField label="Tax rate (%)" htmlFor="taxRate" hint="Applied to the post-discount subtotal.">
              <input
                id="taxRate"
                type="number"
                min={0}
                step="0.1"
                value={taxRate}
                onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value) || 0))}
                className={inputClass}
              />
            </FormField>
            <FormField label="Discount (USD)" htmlFor="discount">
              <input
                id="discount"
                type="number"
                min={0}
                step="0.01"
                value={discount}
                onChange={(e) => setDiscount(Math.max(0, Number(e.target.value) || 0))}
                className={inputClass}
              />
            </FormField>
            <FormField label="Notes" htmlFor="notes" hint="Visible to the client at the bottom of the invoice.">
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Payable by ACH or wire. Net 14 terms."
                className={`${inputClass} resize-none`}
              />
            </FormField>
          </FormSection>
        </div>

        {/* Live preview / totals */}
        <div className="space-y-6">
          <Card padded={false}>
            <div className="border-b border-stroke p-5 dark:border-dark-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                    Live total
                  </p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-dark dark:text-white">
                    {fmt(total)}
                  </p>
                </div>
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                  <CreditCardIcon className="size-6" />
                </span>
              </div>
              <div className="mt-4 space-y-2 border-t border-stroke pt-4 text-sm dark:border-dark-3">
                <div className="flex items-center justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Subtotal</span>
                  <span className="font-medium text-dark dark:text-white">{fmt(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Discount</span>
                  <span className="font-medium text-primary dark:text-primary-light">−{fmt(discount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Tax ({taxRate.toFixed(1)}%)</span>
                  <span className="font-medium text-dark dark:text-white">{fmt(taxAmount)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-stroke pt-2 dark:border-dark-3">
                  <span className="font-semibold text-dark dark:text-white">Total due</span>
                  <span className="text-lg font-bold text-dark dark:text-white">{fmt(total)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 p-5">
              <Button variant="primary" size="md" className="w-full">
                <CheckIcon className="size-4" />
                {isEdit ? "Save changes" : "Save & send to client"}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <DownloadIcon className="size-4" />
                  Save draft
                </Button>
                <Button variant="outline" size="sm">
                  <FileTextIcon className="size-4" />
                  Preview
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Invoice summary" />
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Invoice #</dt>
                <dd className="font-mono font-medium text-dark dark:text-white">
                  {isEdit ? initialValues?.id : "INV-2024-0143"}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Client</dt>
                <dd className="text-right text-dark dark:text-white">{client}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Issued</dt>
                <dd className="text-dark dark:text-white">{issued}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Due</dt>
                <dd className="text-dark dark:text-white">{due}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Line items</dt>
                <dd className="text-dark dark:text-white">{items.length}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Status</dt>
                <dd>
                  <Badge variant={isEdit ? "info" : "neutral"} size="sm" className="capitalize">
                    {isEdit ? "sent" : "draft"}
                  </Badge>
                </dd>
              </div>
            </dl>
          </Card>

          <Card>
            <CardHeader title="Tips" />
            <ul className="space-y-2 text-xs text-dark-5 dark:text-dark-6">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Tax is computed on the post-discount subtotal. Set 0% for tax-exempt clients.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>Use the discount field for promotional or partner credits — it shows as a line on the PDF.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet" />
                <span>Saved drafts are visible in the invoice list under the “Draft” filter.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
