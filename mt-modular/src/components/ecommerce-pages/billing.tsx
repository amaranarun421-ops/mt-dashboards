'use client';

import * as React from 'react';
import { Check, CreditCard, Download, Plus, Settings, Trash2, Star, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge, MetricCard } from '@/components/dashboard/primitives';
import { Modal, Field, TextInput, SelectInput, ModalActions } from '@/components/dashboard/modal';
import { CardIcon, type CardBrand, detectCardBrand, formatCardNumber } from '@/components/dashboard/card-icons';
import { billingHistory, paymentMethods, type PaymentMethod, type BillingRecord } from '@/lib/ecommerce-data';
import { cn } from '@/lib/utils';

export function BillingPage() {
  const { toast } = useToast();
  const [methods, setMethods] = React.useState<PaymentMethod[]>(paymentMethods);
  const [addOpen, setAddOpen] = React.useState(false);
  const [editMethod, setEditMethod] = React.useState<PaymentMethod | null>(null);

  function handleSetDefault(id: string) {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
    toast({ title: 'Default payment method updated' });
  }

  function handleDelete(id: string) {
    setMethods((prev) => prev.filter((m) => m.id !== id));
    toast({ title: 'Payment method removed', variant: 'destructive' });
  }

  function handleSaveMethod(method: PaymentMethod) {
    if (editMethod) {
      setMethods((prev) => prev.map((m) => (m.id === method.id ? method : m)));
      toast({ title: 'Payment method updated', description: `${method.brand} ending in ${method.last4}` });
    } else {
      setMethods((prev) => [...prev, { ...method, id: `pm-${Date.now()}`, isDefault: prev.length === 0 }]);
      toast({ title: 'Payment method added', description: `${method.brand} ending in ${method.last4}` });
    }
    setEditMethod(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Billing' }]}
        title="Billing & Payment Methods"
        description="Manage your payment methods, view billing history, and download invoices."
        actions={
          <button type="button" className="ds-btn ds-btn-primary" onClick={() => { setEditMethod(null); setAddOpen(true); }}>
            <Plus className="size-4" /> Add payment method
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard index={0} label="Current Balance" value="$0.00" helper="Next charge: Jul 19" icon={CreditCard} accent="brand" />
        <MetricCard index={1} label="Monthly Spend" value="$504" helper="Across all services" icon={CreditCard} accent="info" />
        <MetricCard index={2} label="Payment Methods" value={methods.length.toString()} helper={`${methods.filter((m) => m.isDefault).length} default`} icon={CreditCard} accent="success" />
        <MetricCard index={3} label="Total Billed (YTD)" value="$7,448" helper="Across 8 invoices" icon={CreditCard} accent="warning" />
      </div>

      {/* Payment methods */}
      <SectionCard title="Payment Methods" description="Saved cards and wallets for automatic billing">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {methods.map((method) => (
            <div
              key={method.id}
              className={cn(
                'relative overflow-hidden rounded-2xl border-2 p-5 transition',
                method.isDefault
                  ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)]/40 dark:bg-[rgba(70,95,255,0.06)]'
                  : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--border-strong)]',
              )}
            >
              {method.isDefault && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--color-brand-500)] px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                  <Star className="size-2.5 fill-current" /> Default
                </span>
              )}
              {/* Card visual */}
              <div className="flex items-center justify-between">
                <CardIcon brand={method.brand} className="size-10" />
                <CreditCard className="size-5 text-[var(--text-muted)]" />
              </div>
              <p className="mt-4 font-mono text-base font-semibold tracking-wider text-[var(--text-strong)]">
                •••• •••• •••• {method.last4}
              </p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Cardholder</p>
                  <p className="text-sm font-semibold text-[var(--text-strong)]">{method.holderName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Expires</p>
                  <p className="text-sm font-semibold text-[var(--text-strong)]">{String(method.expMonth).padStart(2, '0')}/{String(method.expYear).slice(-2)}</p>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-1.5 border-t border-[var(--border-subtle)] pt-3 text-xs font-medium text-[var(--text-muted)]">
                <MapPin className="mt-0.5 size-3 flex-shrink-0" />
                <span className="truncate">
                  {method.billingAddress.line1}, {method.billingAddress.city}, {method.billingAddress.state} {method.billingAddress.zip}
                </span>
              </div>
              {/* Actions */}
              <div className="mt-4 flex gap-2">
                {!method.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(method.id)}
                    className="ds-btn ds-btn-secondary !h-8 flex-1 !text-xs"
                  >
                    <Star className="size-3.5" /> Set default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => { setEditMethod(method); setAddOpen(true); }}
                  className="ds-btn ds-btn-secondary !h-8 !text-xs"
                  aria-label="Edit"
                >
                  <Settings className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(method.id)}
                  className="ds-btn !h-8 !w-8 !px-0 bg-[var(--color-error-50)] text-[var(--color-error-600)] hover:bg-[var(--color-error-100)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"
                  aria-label="Remove"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Add new card placeholder */}
          <button
            type="button"
            onClick={() => { setEditMethod(null); setAddOpen(true); }}
            className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)] p-5 text-center transition hover:border-[var(--color-brand-400)] hover:bg-[var(--color-brand-50)]/40 dark:hover:bg-[rgba(70,95,255,0.04)]"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">
              <Plus className="size-5" />
            </span>
            <p className="mt-3 text-sm font-semibold text-[var(--text-strong)]">Add payment method</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Credit card, debit card, or wallet</p>
          </button>
        </div>
      </SectionCard>

      {/* Billing history */}
      <SectionCard title="Billing History" description="All past charges — download invoices anytime" noBodyPadding>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-sunken)]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Description</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:table-cell">Method</th>
                <th className="hidden px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Amount</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((record) => (
                <BillingRow key={record.id} record={record} onDownload={() => toast({ title: 'Invoice downloaded', description: `${record.invoiceId}.pdf` })} />
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Add/Edit Modal */}
      <PaymentMethodModal
        open={addOpen}
        onOpenChange={setAddOpen}
        editMethod={editMethod}
        onSave={handleSaveMethod}
      />
    </div>
  );
}

function BillingRow({ record, onDownload }: { record: BillingRecord; onDownload: () => void }) {
  const tone = record.status === 'Paid' ? 'success' : record.status === 'Pending' ? 'warning' : record.status === 'Failed' ? 'error' : 'info';
  const isNegative = record.amount < 0;
  return (
    <tr className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--surface-sunken)]">
      <td className="px-5 py-3.5 text-xs font-medium text-[var(--text-muted)]">{record.date}</td>
      <td className="px-4 py-3.5">
        <p className="font-semibold text-[var(--text-strong)]">{record.description}</p>
        <p className="text-xs font-medium text-[var(--text-muted)] sm:hidden">{record.invoiceId}</p>
      </td>
      <td className="hidden px-4 py-3.5 sm:table-cell">
        <div className="flex items-center gap-2">
          <CardIcon brand={record.method} className="size-6" />
        </div>
      </td>
      <td className="hidden px-4 py-3.5 text-center sm:table-cell">
        <StatusBadge tone={tone as 'success' | 'warning' | 'error' | 'info'} dot>{record.status}</StatusBadge>
      </td>
      <td className={cn('px-4 py-3.5 text-right font-semibold', isNegative ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-strong)]')}>
        {isNegative ? '-' : ''}${Math.abs(record.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </td>
      <td className="px-5 py-3.5 text-right">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)]"
          aria-label={`Download ${record.invoiceId}`}
        >
          <Download className="size-4" />
        </button>
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/* Add/Edit Payment Method Modal                                       */
/* ------------------------------------------------------------------ */
function PaymentMethodModal({
  open,
  onOpenChange,
  editMethod,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMethod: PaymentMethod | null;
  onSave: (method: PaymentMethod) => void;
}) {
  const [cardNumber, setCardNumber] = React.useState('');
  const [holderName, setHolderName] = React.useState('');
  const [expMonth, setExpMonth] = React.useState('12');
  const [expYear, setExpYear] = React.useState('2027');
  const [cvc, setCvc] = React.useState('');
  const [line1, setLine1] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [country, setCountry] = React.useState('United States');
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      if (editMethod) {
        setCardNumber(`•••• •••• •••• ${editMethod.last4}`);
        setHolderName(editMethod.holderName);
        setExpMonth(String(editMethod.expMonth));
        setExpYear(String(editMethod.expYear));
        setCvc('');
        setLine1(editMethod.billingAddress.line1);
        setCity(editMethod.billingAddress.city);
        setState(editMethod.billingAddress.state);
        setZip(editMethod.billingAddress.zip);
        setCountry(editMethod.billingAddress.country);
      } else {
        setCardNumber('');
        setHolderName('');
        setExpMonth('12');
        setExpYear('2027');
        setCvc('');
        setLine1('');
        setCity('');
        setState('');
        setZip('');
        setCountry('United States');
      }
      setSaving(false);
    }
  }, [open, editMethod]);

  const detectedBrand = detectCardBrand(cardNumber);

  function handleSave() {
    if (!holderName.trim() || cardNumber.replace(/\s/g, '').length < 12) {
      return;
    }
    setSaving(true);
    setTimeout(() => {
      const cleaned = cardNumber.replace(/\s/g, '').replace(/•/g, '');
      const last4 = cleaned.length >= 4 ? cleaned.slice(-4) : editMethod?.last4 ?? '0000';
      onSave({
        id: editMethod?.id ?? `pm-${Date.now()}`,
        brand: detectedBrand === 'unknown' ? (editMethod?.brand ?? 'visa') : detectedBrand,
        last4,
        expMonth: parseInt(expMonth),
        expYear: parseInt(expYear),
        holderName,
        isDefault: editMethod?.isDefault ?? false,
        billingAddress: { line1, city, state, zip, country },
      });
      setSaving(false);
      onOpenChange(false);
    }, 600);
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={editMethod ? 'Edit payment method' : 'Add payment method'}
      description={editMethod ? 'Update your card or billing address' : 'Add a new card for automatic billing'}
      icon={CreditCard}
      size="lg"
      footer={
        <ModalActions
          onCancel={() => onOpenChange(false)}
          onConfirm={handleSave}
          confirmLabel={editMethod ? 'Save changes' : 'Add card'}
          loading={saving}
        />
      }
    >
      <div className="space-y-5">
        {/* Card preview */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-brand-600)] to-[var(--color-brand-800)] p-5 text-white shadow-[var(--shadow-theme-md)]">
          <div className="flex items-center justify-between">
            <div className="size-10 rounded-lg bg-white/20 backdrop-blur" />
            <CardIcon brand={detectedBrand === 'unknown' ? (editMethod?.brand ?? 'visa') : detectedBrand} className="size-9" />
          </div>
          <p className="mt-5 font-mono text-lg font-semibold tracking-wider">
            {cardNumber ? formatCardNumber(cardNumber) : '•••• •••• •••• ••••'}
          </p>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Cardholder</p>
              <p className="text-sm font-semibold">{holderName || 'YOUR NAME'}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Expires</p>
              <p className="text-sm font-semibold">{expMonth}/{expYear.slice(-2)}</p>
            </div>
          </div>
        </div>

        {/* Card details */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Card number" required className="sm:col-span-2">
            <TextInput
              value={cardNumber}
              onChange={(v) => setCardNumber(formatCardNumber(v.replace(/[^0-9•\s]/g, '')))}
              placeholder="4242 4242 4242 4242"
            />
          </Field>
          <Field label="Cardholder name" required className="sm:col-span-2">
            <TextInput value={holderName} onChange={setHolderName} placeholder="ARUN PANDIAN" />
          </Field>
          <Field label="Expiry month">
            <SelectInput
              value={expMonth}
              onChange={setExpMonth}
              options={Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1).padStart(2, '0'), label: String(i + 1).padStart(2, '0') }))}
            />
          </Field>
          <Field label="Expiry year">
            <SelectInput
              value={expYear}
              onChange={setExpYear}
              options={Array.from({ length: 10 }, (_, i) => ({ value: String(2026 + i), label: String(2026 + i) }))}
            />
          </Field>
          <Field label="CVC" required>
            <TextInput value={cvc} onChange={(v) => setCvc(v.replace(/[^0-9]/g, '').slice(0, 4))} placeholder="123" />
          </Field>
        </div>

        {/* Billing address */}
        <div className="border-t border-[var(--border-subtle)] pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Billing address</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Address line 1" className="sm:col-span-2">
              <TextInput value={line1} onChange={setLine1} placeholder="123 Main St" />
            </Field>
            <Field label="City">
              <TextInput value={city} onChange={setCity} placeholder="San Francisco" />
            </Field>
            <Field label="State / Province">
              <TextInput value={state} onChange={setState} placeholder="CA" />
            </Field>
            <Field label="ZIP / Postal code">
              <TextInput value={zip} onChange={setZip} placeholder="94103" />
            </Field>
            <Field label="Country">
              <SelectInput
                value={country}
                onChange={setCountry}
                options={[
                  { value: 'United States', label: 'United States' },
                  { value: 'United Kingdom', label: 'United Kingdom' },
                  { value: 'Canada', label: 'Canada' },
                  { value: 'Australia', label: 'Australia' },
                  { value: 'India', label: 'India' },
                ]}
              />
            </Field>
          </div>
        </div>
      </div>
    </Modal>
  );
}
