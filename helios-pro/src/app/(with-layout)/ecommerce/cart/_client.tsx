"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { inputClass } from "@/components/shared/form-section";
import {
  ShoppingCartIcon,
  ArrowLeftIcon,
  CheckIcon,
  TagIcon,
  TruckIcon,
} from "@/components/Layouts/sidebar/icons";
import { products } from "@/data/ecommerce/products";

type CartLine = {
  id: string;
  product: typeof products[number];
  qty: number;
  variant: string;
};

const fmt = (n: number) => `$${n.toFixed(2)}`;

const PROMOS: Record<string, { type: "percent" | "fixed" | "shipping"; value: number; label: string }> = {
  WELCOME10: { type: "percent", value: 10, label: "10% off your order" },
  AERO50: { type: "fixed", value: 50, label: "$50 off Aero" },
  FREESHIP: { type: "shipping", value: 0, label: "Free shipping" },
  VIP20: { type: "percent", value: 20, label: "20% off for VIP" },
};

export default function CartClient() {
  const [lines, setLines] = useState<CartLine[]>([
    { id: "l1", product: products[0], qty: 1, variant: "Midnight" },
    { id: "l2", product: products[1], qty: 2, variant: "Graphite" },
    { id: "l3", product: products[5], qty: 1, variant: "78° FoV" },
    { id: "l4", product: products[9], qty: 1, variant: "0.8m Thunderbolt" },
  ]);

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    [lines],
  );

  const promo = appliedPromo ? PROMOS[appliedPromo] : null;

  const discount = useMemo(() => {
    if (!promo) return 0;
    if (promo.type === "percent") return subtotal * (promo.value / 100);
    if (promo.type === "fixed") return Math.min(promo.value, subtotal);
    return 0;
  }, [promo, subtotal]);

  const baseShipping = subtotal > 150 || (promo?.type === "shipping") ? 0 : 12;
  const tax = Math.max(0, (subtotal - discount)) * 0.08;
  const total = Math.max(0, subtotal - discount) + baseShipping + tax;

  function updateQty(id: string, qty: number) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)));
  }

  function removeLine(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (code === "") return;
    if (PROMOS[code]) {
      setAppliedPromo(code);
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError(`Promo code "${code}" is not valid.`);
      setAppliedPromo(null);
    }
  }

  function removePromo() {
    setAppliedPromo(null);
    setPromoError("");
  }

  return (
    <div>
      <PageHeader
        title="Shopping cart"
        description={`${lines.length} item${lines.length === 1 ? "" : "s"} in your cart`}
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/products" },
          { label: "Cart" },
        ]}
        actions={
          <Link href="/ecommerce/products">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="size-4" />
              Continue shopping
            </Button>
          </Link>
        }
      />

      {lines.length === 0 ? (
        <Card>
          <EmptyState
            size="lg"
            icon={<ShoppingCartIcon className="size-10" />}
            title="Your cart is empty"
            description="Browse our catalog and add some products to your cart."
            action={
              <Link href="/ecommerce/products">
                <Button variant="primary" size="md">Browse products</Button>
              </Link>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Left: cart lines */}
          <div className="space-y-4">
            {lines.map((l) => (
              <Card key={l.id} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/ecommerce/products/detail" className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.product.image} alt={l.product.name} className="size-24 rounded-lg object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-dark-5 dark:text-dark-6">{l.product.category}</p>
                      <Link href="/ecommerce/products/detail">
                        <h3 className="line-clamp-1 font-semibold text-dark hover:text-primary dark:text-white">{l.product.name}</h3>
                      </Link>
                      <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">{l.product.sku} · {l.variant}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-dark-5 dark:text-dark-6">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                          <path d="M12 3l2.6 5.7 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 19.9l1.4-6.3L3 9.3l6.4-.6L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        </svg>
                        {l.product.rating.toFixed(1)} · In stock
                      </div>
                    </div>
                    <p className="text-lg font-bold text-dark dark:text-white">{fmt(l.product.price * l.qty)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
                      <button
                        onClick={() => updateQty(l.id, l.qty - 1)}
                        className="grid size-9 place-items-center text-dark-5 hover:bg-gray-2 dark:hover:bg-dark-3"
                        aria-label="Decrease quantity"
                      >
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-dark dark:text-white">{l.qty}</span>
                      <button
                        onClick={() => updateQty(l.id, l.qty + 1)}
                        className="grid size-9 place-items-center text-dark-5 hover:bg-gray-2 dark:hover:bg-dark-3"
                        aria-label="Increase quantity"
                      >
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">Save for later</Button>
                      <Button variant="ghost" size="sm" onClick={() => removeLine(l.id)} className="text-red hover:bg-red-light-5 dark:hover:bg-red/10">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Recommended */}
            <Card>
              <CardHeader title="You might also like" subtitle="Based on your cart" />
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {products.slice(2, 6).map((p) => (
                  <Link key={p.id} href="/ecommerce/products/detail">
                    <Card hover padded={false} className="overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover" />
                      <div className="p-3">
                        <p className="line-clamp-1 text-xs font-medium text-dark dark:text-white">{p.name}</p>
                        <p className="mt-1 text-sm font-bold text-dark dark:text-white">{fmt(p.price)}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: summary */}
          <div className="space-y-6">
            <Card padded={false}>
              <div className="border-b border-stroke p-5 dark:border-dark-3">
                <CardHeader title="Order summary" />
              </div>
              <div className="space-y-3 p-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Subtotal ({lines.reduce((s, l) => s + l.qty, 0)} items)</span>
                  <span className="font-medium text-dark dark:text-white">{fmt(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-dark-5 dark:text-dark-6">Discount ({appliedPromo})</span>
                    <span className="font-medium text-primary dark:text-primary-light">−{fmt(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Shipping</span>
                  <span className="font-medium text-dark dark:text-white">
                    {baseShipping === 0 ? <Badge variant="success" size="sm">Free</Badge> : fmt(baseShipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Tax (8%)</span>
                  <span className="font-medium text-dark dark:text-white">{fmt(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-stroke pt-3 dark:border-dark-3">
                  <span className="font-semibold text-dark dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-dark dark:text-white">{fmt(total)}</span>
                </div>
              </div>
              <div className="space-y-3 border-t border-stroke p-5 dark:border-dark-3">
                <Link href="/ecommerce/checkout">
                  <Button variant="primary" size="lg" className="w-full">
                    <CheckIcon className="size-4" />
                    Proceed to checkout
                  </Button>
                </Link>
                <Link href="/ecommerce/products">
                  <Button variant="outline" size="md" className="w-full">Continue shopping</Button>
                </Link>
              </div>
            </Card>

            {/* Promo */}
            <Card>
              <CardHeader title="Promo code" action={<TagIcon className="size-5 text-dark-5" />} />
              {appliedPromo ? (
                <div className="rounded-lg border border-primary/30 bg-primary-subtle/60 p-3 dark:border-primary/30 dark:bg-primary/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono font-semibold text-primary dark:text-primary-light">{appliedPromo}</p>
                      <p className="text-xs text-dark-7 dark:text-dark-7">{promo?.label}</p>
                    </div>
                    <button onClick={removePromo} className="text-xs font-medium text-red hover:underline">Remove</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") applyPromo(); }}
                      placeholder="Enter code (e.g. WELCOME10)"
                      className={`${inputClass} uppercase`}
                    />
                    <Button variant="primary" size="md" onClick={applyPromo}>Apply</Button>
                  </div>
                  {promoError && <p className="mt-2 text-xs text-red">{promoError}</p>}
                  <p className="mt-2 text-xs text-dark-5 dark:text-dark-6">Try: WELCOME10, FREESHIP, VIP20</p>
                </div>
              )}
            </Card>

            {/* Trust */}
            <Card>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-dark-7 dark:text-dark-7">
                  <TruckIcon className="size-5 text-primary" />
                  <div>
                    <p className="font-medium text-dark dark:text-white">Free shipping over $150</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">2-5 day delivery, 30-day returns</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-dark-7 dark:text-dark-7">
                  <svg className="size-5 text-primary" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l8 3v6c0 4.5-3 8-8 9-5-1-8-4.5-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="font-medium text-dark dark:text-white">Secure checkout</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">256-bit SSL encrypted payment</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
