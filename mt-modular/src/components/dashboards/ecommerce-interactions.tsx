'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import * as Data from './ecommerce-data';
import type { Order } from './ecommerce-data';

/* ============================================================
   Popover — lightweight popover with outside-click + Escape
   ============================================================ */
export function Popover({
  open,
  onClose,
  children,
  align = 'right',
  width = 'auto',
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  align?: 'left' | 'right';
  width?: number | string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function escHandler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', escHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', escHandler);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      ref={ref}
      role="dialog"
      className={cn(
        'absolute top-full z-50 mt-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] p-1 shadow-[0_12px_24px_-6px_rgba(15,23,42,0.12),0_4px_8px_-4px_rgba(15,23,42,0.06)]',
        align === 'right' ? 'right-0' : 'left-0',
        className,
      )}
      style={{ width: typeof width === 'number' ? `${width}px` : width, animation: 'ecomPopoverIn 160ms ease-out' }}
    >
      {children}
    </div>
  );
}

/* Popover menu item */
export function PopoverItem({
  icon: Icon,
  children,
  onClick,
  danger,
  active,
}: {
  icon?: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition',
        danger
          ? 'text-[var(--color-error-600)] hover:bg-[var(--color-error-50)] dark:text-[var(--color-error-500)] dark:hover:bg-[rgba(240,68,56,0.16)]'
          : active
            ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
            : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
      )}
    >
      {Icon && <Icon className="size-3.5" strokeWidth={2.2} />}
      <span className="flex-1">{children}</span>
    </button>
  );
}

/* ============================================================
   Create Order Drawer — slides in from the right
   ============================================================ */
export type NewOrder = Order;

export function CreateOrderDrawer({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (order: NewOrder) => void;
}) {
  const [form, setForm] = React.useState({
    customer: '',
    product: '',
    quantity: '1',
    channel: 'Web' as Order['channel'],
    payment: 'Paid' as Order['payment'],
    fulfillment: 'Processing' as Order['fulfillment'],
    note: '',
  });

  React.useEffect(() => {
    if (!open) return;
    function escHandler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', escHandler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', escHandler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  function handleSubmit() {
    if (!form.customer.trim() || !form.product.trim()) return;
    const productPriceMap: Record<string, string> = {
      'MacBook Pro 13"': '$2,399',
      'iPhone 15 Pro Max': '$1,869',
      'Apple Watch Ultra 2': '$879',
      'AirPods Pro 2nd Gen': '$720',
      'iPad Pro 11"': '$1,699',
      'Studio Display 27"': '$1,599',
    };
    const basePrice = productPriceMap[form.product] || '$999';
    const qty = parseInt(form.quantity, 10) || 1;
    const numericPrice = parseInt(basePrice.replace(/[^0-9]/g, ''), 10);
    const total = numericPrice * qty;
    const newOrder: NewOrder = {
      id: `OR-${Math.floor(9100 + Math.random() * 899)}`,
      customer: form.customer.trim(),
      channel: form.channel,
      product: form.product,
      amount: `$${total.toLocaleString()}`,
      payment: form.payment,
      fulfillment: form.fulfillment,
      risk: 'Low risk',
      status: form.payment === 'Refunded' ? 'Cancelled' : 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      qty,
    };
    onCreate(newOrder);
    // Reset form
    setForm({
      customer: '', product: '', quantity: '1', channel: 'Web',
      payment: 'Paid', fulfillment: 'Processing', note: '',
    });
    onClose();
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
        style={{ animation: 'ecomFadeIn 200ms ease-out' }}
      />
      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl"
        style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }}
        role="dialog"
        aria-label="Create order"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div>
            <h3 className="text-base font-medium text-[var(--text-strong)]">Create Order</h3>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">Add a new order to the queue.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-label="Close drawer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          {/* Customer */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Customer <span className="text-[var(--color-error-600)]">*</span></label>
            <input
              type="text"
              value={form.customer}
              onChange={(e) => setForm({ ...form, customer: e.target.value })}
              placeholder="e.g. Darlene Robertson"
              className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
            />
          </div>

          {/* Product */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Product <span className="text-[var(--color-error-600)]">*</span></label>
            <select
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
              className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
            >
              <option value="">Select a product</option>
              <option value='MacBook Pro 13"'>MacBook Pro 13"</option>
              <option value="iPhone 15 Pro Max">iPhone 15 Pro Max</option>
              <option value="Apple Watch Ultra 2">Apple Watch Ultra 2</option>
              <option value="AirPods Pro 2nd Gen">AirPods Pro 2nd Gen</option>
              <option value='iPad Pro 11"'>iPad Pro 11"</option>
              <option value='Studio Display 27"'>Studio Display 27"</option>
            </select>
          </div>

          {/* Quantity + Channel */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Quantity</label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Channel</label>
              <select
                value={form.channel}
                onChange={(e) => setForm({ ...form, channel: e.target.value as Order['channel'] })}
                className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              >
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
                <option value="App">App</option>
              </select>
            </div>
          </div>

          {/* Payment + Fulfillment */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Payment status</label>
              <select
                value={form.payment}
                onChange={(e) => setForm({ ...form, payment: e.target.value as Order['payment'] })}
                className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Fulfillment</label>
              <select
                value={form.fulfillment}
                onChange={(e) => setForm({ ...form, fulfillment: e.target.value as Order['fulfillment'] })}
                className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              >
                <option value="Processing">Processing</option>
                <option value="Packed">Packed</option>
                <option value="Awaiting pickup">Awaiting pickup</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Order note</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={3}
              placeholder="Add an internal note (optional)"
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
            />
          </div>
        </div>

        {/* Drawer footer */}
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!form.customer.trim() || !form.product.trim()}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create order
          </button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   CSV export helper
   ============================================================ */
export function exportOrdersCsv(orders: Order[]) {
  const headers = ['Order ID', 'Customer', 'Channel', 'Product', 'Qty', 'Amount', 'Payment', 'Fulfillment', 'Risk', 'Status', 'Date'];
  const rows = orders.map((o) => [o.id, o.customer, o.channel, o.product, String(o.qty), o.amount, o.payment, o.fulfillment, o.risk, o.status, o.date]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ecommerce-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
