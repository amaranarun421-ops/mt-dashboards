'use client';

import * as React from 'react';
import { ArrowLeft, Plus, Save, Send, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { useDashboardStore } from '@/lib/dashboard-store';
import { customers } from '@/lib/ecommerce-data';
import { cn } from '@/lib/utils';

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

export function CreateInvoicePage() {
  const { toast } = useToast();
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  const [customer, setCustomer] = React.useState(customers[0].name);
  const [issueDate, setIssueDate] = React.useState(new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
  const [dueDate, setDueDate] = React.useState('Net 14');
  const [notes, setNotes] = React.useState('');
  const [taxRate, setTaxRate] = React.useState('0');
  const [items, setItems] = React.useState<LineItem[]>([
    { id: '1', description: 'Pro plan — monthly subscription', qty: 1, rate: 84 },
  ]);
  const [saving, setSaving] = React.useState(false);

  function addItem() {
    setItems([...items, { id: Date.now().toString(), description: '', qty: 1, rate: 0 }]);
  }

  function removeItem(id: string) {
    setItems(items.filter((i) => i.id !== id));
  }

  function updateItem(id: string, key: keyof LineItem, value: string | number) {
    setItems(items.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  }

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const tax = subtotal * (parseFloat(taxRate) / 100);
  const total = subtotal + tax;

  function handleSave(send: boolean) {
    if (!customer || items.length === 0) {
      toast({ title: 'Incomplete invoice', description: 'Add a customer and at least one line item', variant: 'destructive' });
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: send ? 'Invoice sent' : 'Draft saved',
        description: `INV-${Math.floor(Math.random() * 9000 + 1000)} · ${customer} · $${total.toLocaleString()}`,
      });
      setEcommerce('invoices');
    }, 800);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Invoices' }, { label: 'Create' }]}
        title="Create Invoice"
        description="Build a new invoice with dynamic line items."
        actions={
          <>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => setEcommerce('invoices')}>
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Back</span>
            </button>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => handleSave(false)} disabled={saving}>
              <Save className="size-4" /> Save draft
            </button>
            <button type="button" className="ds-btn ds-btn-primary" onClick={() => handleSave(true)} disabled={saving}>
              {saving ? (
                <>
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" /> Send invoice
                </>
              )}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Left — customer + line items */}
        <div className="space-y-4 xl:col-span-2">
          {/* Customer details */}
          <SectionCard title="Customer Details" description="Who is this invoice for?">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Customer</span>
                <Select
                  value={customer}
                  onChange={setCustomer}
                  options={customers.map((c) => ({ value: c.name, label: `${c.name} — ${c.email}` }))}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Issue date</span>
                <input
                  type="text"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="ds-input"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Due date</span>
                <Select
                  value={dueDate}
                  onChange={setDueDate}
                  options={[
                    { value: 'Net 7', label: 'Net 7 (1 week)' },
                    { value: 'Net 14', label: 'Net 14 (2 weeks)' },
                    { value: 'Net 30', label: 'Net 30 (1 month)' },
                    { value: 'Net 60', label: 'Net 60 (2 months)' },
                    { value: 'Due on receipt', label: 'Due on receipt' },
                  ]}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Currency</span>
                <Select
                  value="USD"
                  onChange={() => undefined}
                  options={[
                    { value: 'USD', label: 'USD — US Dollar' },
                    { value: 'EUR', label: 'EUR — Euro' },
                    { value: 'GBP', label: 'GBP — British Pound' },
                    { value: 'INR', label: 'INR — Indian Rupee' },
                  ]}
                />
              </label>
            </div>
          </SectionCard>

          {/* Line items */}
          <SectionCard
            title="Line Items"
            description="Add products or services to this invoice"
            actions={
              <button type="button" className="ds-btn ds-btn-secondary !h-9 !text-xs" onClick={addItem}>
                <Plus className="size-3.5" /> Add item
              </button>
            }
          >
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className="flex items-end gap-2 rounded-xl border border-[var(--border-subtle)] p-3">
                  <div className="flex-1">
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Description</span>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        placeholder="e.g. Pro plan — monthly subscription"
                        className="ds-input !h-10"
                      />
                    </label>
                  </div>
                  <div className="w-20">
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Qty</span>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                        className="ds-input !h-10 text-center"
                      />
                    </label>
                  </div>
                  <div className="w-28">
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Rate</span>
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="ds-input !h-10 text-right"
                      />
                    </label>
                  </div>
                  <div className="w-28 text-right">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Amount</span>
                    <p className="mt-1.5 text-sm font-semibold text-[var(--text-strong)]">${(item.qty * item.rate).toLocaleString()}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--color-error-50)] hover:text-[var(--color-error-600)] dark:hover:bg-[rgba(240,68,56,0.16)]"
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
              {items.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-[var(--border-strong)] p-8 text-center">
                  <p className="text-sm font-semibold text-[var(--text-strong)]">No line items yet</p>
                  <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Add at least one item to this invoice</p>
                  <button type="button" className="ds-btn ds-btn-primary mt-3 !h-9 !text-xs" onClick={addItem}>
                    <Plus className="size-3.5" /> Add first item
                  </button>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Notes */}
          <SectionCard title="Notes" description="Optional notes visible to the customer">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Thank you for your business! Payment is due within 14 days..."
              className="ds-input resize-none py-2.5"
            />
          </SectionCard>
        </div>

        {/* Right — summary */}
        <div className="space-y-4">
          <SectionCard title="Summary" description="Invoice totals">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--text-muted)]">Subtotal</span>
                <span className="font-semibold text-[var(--text-strong)]">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[var(--text-muted)]">Tax</span>
                  <div className="w-16">
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="ds-input !h-8 !px-2 text-xs"
                    />
                  </div>
                  <span className="text-xs font-medium text-[var(--text-muted)]">%</span>
                </div>
                <span className="font-semibold text-[var(--text-strong)]">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-[var(--border-subtle)] pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-[var(--text-strong)]">Total</span>
                  <span className="text-2xl font-semibold text-[var(--text-strong)]">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Preview" description="Live invoice preview">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">INV-{Math.floor(Math.random() * 9000 + 1000)}</span>
                <StatusBadge tone="info" dot>Draft</StatusBadge>
              </div>
              <p className="mt-3 text-sm font-semibold text-[var(--text-strong)]">{customer}</p>
              <p className="text-xs font-medium text-[var(--text-muted)]">{issueDate} → {dueDate}</p>
              <div className="mt-3 space-y-1 border-t border-[var(--border-subtle)] pt-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span className="truncate font-medium text-[var(--text-body)]">{item.description || 'Item'}</span>
                    <span className="ml-2 font-semibold text-[var(--text-strong)]">${(item.qty * item.rate).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2">
                <span className="text-xs font-semibold text-[var(--text-strong)]">Total</span>
                <span className="text-sm font-semibold text-[var(--text-strong)]">${total.toLocaleString()}</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
