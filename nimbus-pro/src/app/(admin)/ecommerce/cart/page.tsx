"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, IconButton, Input, EmptyState } from "@/components/ui";
import { PRODUCTS } from "@/data/mock";
import { cn, formatCurrency, initials } from "@/lib/utils";
import {
  ShoppingCart, Plus, Minus, Trash2, Tag, ArrowRight, ArrowLeft, Shield, Truck, X,
} from "lucide-react";

const COLOR_TONE: Record<string, string> = {
  brand: "from-emerald-400 to-teal-500",
  purple: "from-violet-400 to-purple-500",
  orange: "from-amber-400 to-orange-500",
  pink: "from-rose-400 to-pink-500",
  success: "from-lime-400 to-emerald-500",
  warning: "from-amber-400 to-yellow-500",
  error: "from-rose-400 to-red-500",
  gray: "from-slate-400 to-slate-500",
};

type CartItem = { id: string; name: string; sku: string; price: number; qty: number; color: string };

const INITIAL: CartItem[] = [
  { id: PRODUCTS[0].id, name: PRODUCTS[0].name, sku: PRODUCTS[0].sku, price: PRODUCTS[0].price, qty: 1, color: PRODUCTS[0].color },
  { id: PRODUCTS[5].id, name: PRODUCTS[5].name, sku: PRODUCTS[5].sku, price: PRODUCTS[5].price, qty: 2, color: PRODUCTS[5].color },
  { id: PRODUCTS[8].id, name: PRODUCTS[8].name, sku: PRODUCTS[8].sku, price: PRODUCTS[8].price, qty: 1, color: PRODUCTS[8].color },
];

const DISCOUNTS: Record<string, number> = {
  SUMMER26: 0.25,
  WELCOME10: 0.1,
  FLAT50: 50,
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateQty = (id: string, delta: number) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));

  const { subtotal, discount, shipping, tax, total } = useMemo(() => {
    const sub = items.reduce((s, i) => s + i.qty * i.price, 0);
    let disc = 0;
    if (applied && DISCOUNTS[applied]) {
      const v = DISCOUNTS[applied];
      disc = v < 1 ? Math.round(sub * v) : Math.min(v, sub);
    }
    const ship = sub > 100 || sub === 0 ? 0 : 12;
    const tx = Math.round((sub - disc) * 0.08);
    return { subtotal: sub, discount: disc, shipping: ship, tax: tx, total: sub - disc + ship + tx };
  }, [items, applied]);

  const applyCode = () => {
    const c = code.trim().toUpperCase();
    if (!c) return;
    if (DISCOUNTS[c]) {
      setApplied(c);
      setError(null);
      setCode("");
    } else {
      setError("Invalid coupon code");
      setApplied(null);
    }
  };
  const clearCode = () => { setApplied(null); setError(null); };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Shopping Cart"
        description="Review the items in your cart before proceeding to checkout."
        breadcrumbs={[{ label: "Ecommerce" }, { label: "Cart" }]}
        actions={
          <Link href="/ecommerce/products">
            <Button variant="secondary"><ArrowLeft className="h-4 w-4" /> Continue shopping</Button>
          </Link>
        }
      />

      {items.length === 0 ? (
        <Card>
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Browse the catalog and add items to your cart to get started."
            action={<Link href="/ecommerce/products"><Button><ArrowRight className="h-4 w-4" /> Browse products</Button></Link>}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Items */}
          <Card className="overflow-hidden">
            <CardHeader
              title={`Cart (${items.reduce((s, i) => s + i.qty, 0)} items)`}
              description="Adjust quantities or remove items"
              action={<Button variant="ghost" size="sm" onClick={() => setItems([])}>Clear cart</Button>}
            />
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center gap-3">
                    <div className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white", COLOR_TONE[item.color] ?? COLOR_TONE.brand)}>
                      {initials(item.name)}
                    </div>
                    <div className="min-w-0">
                      <Link href="/ecommerce/product-detail">
                        <p className="truncate text-sm font-semibold text-gray-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400">{item.name}</p>
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {item.sku}</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">In stock · ships in 1-2 days</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Qty</p>
                      <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-800">
                        <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease" className="inline-flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-10 text-center text-sm font-semibold text-gray-900 dark:text-white">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} aria-label="Increase" className="inline-flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(item.price * item.qty)}</p>
                    </div>
                    <IconButton aria-label="Remove" className="h-8 w-8 hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/10" onClick={() => remove(item.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 p-4 dark:border-gray-800">
              <Link href="/ecommerce/products">
                <Button variant="ghost" size="sm"><ArrowLeft className="h-3.5 w-3.5" /> Continue shopping</Button>
              </Link>
            </div>
          </Card>

          {/* Order summary */}
          <aside>
            <Card className="sticky top-4">
              <CardHeader title="Order summary" description="Cart totals & discounts" />
              <CardBody className="space-y-4">
                {/* Coupon */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Promo code</label>
                  {applied ? (
                    <div className="flex items-center justify-between rounded-lg border border-success-200 bg-success-50 p-3 dark:border-success-800 dark:bg-success-500/10">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-success-600 dark:text-success-400" />
                        <div>
                          <p className="text-sm font-semibold text-success-800 dark:text-success-200">{applied}</p>
                          <p className="text-xs text-success-700 dark:text-success-300">Coupon applied</p>
                        </div>
                      </div>
                      <button onClick={clearCode} aria-label="Remove coupon" className="text-success-600 hover:text-success-800 dark:text-success-400"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input value={code} onChange={(e) => { setCode(e.target.value); setError(null); }} placeholder="SUMMER26" error={!!error} className="flex-1" />
                      <Button variant="secondary" onClick={applyCode}>Apply</Button>
                    </div>
                  )}
                  {error && <p className="mt-1 text-xs text-error-600 dark:text-error-400">{error}</p>}
                  {!applied && !error && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Try <span className="font-semibold">SUMMER26</span> for 25% off</p>
                  )}
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Discount ({applied})</span>
                      <span className="font-semibold text-success-600 dark:text-success-400">— {formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400"><Truck className="h-3.5 w-3.5" /> Shipping</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{shipping === 0 ? <Badge tone="success" variant="soft">FREE</Badge> : formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Estimated tax (8%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
                    <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">{formatCurrency(total)}</span>
                  </div>
                </div>

                <Link href="/ecommerce/checkout">
                  <Button className="w-full">Proceed to Checkout <ArrowRight className="h-4 w-4" /></Button>
                </Link>

                <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Secure checkout</span>
                  <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> Free shipping over $100</span>
                </div>
              </CardBody>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}
