"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Input, Label, Select } from "@/components/ui";
import { PRODUCTS } from "@/data/mock";
import { cn, formatCurrency, initials } from "@/lib/utils";
import {
  ArrowRight, ArrowLeft, Check, MapPin, Truck, CreditCard, ShoppingBag, Lock,
  Shield, Wallet, Building2,
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

const STEPS = [
  { value: "shipping", label: "Shipping", icon: MapPin },
  { value: "delivery", label: "Delivery", icon: Truck },
  { value: "payment", label: "Payment", icon: CreditCard },
  { value: "review", label: "Review", icon: ShoppingBag },
];

const SUMMARY_ITEMS = [
  { id: PRODUCTS[0].id, name: PRODUCTS[0].name, sku: PRODUCTS[0].sku, price: PRODUCTS[0].price, qty: 1, color: PRODUCTS[0].color },
  { id: PRODUCTS[5].id, name: PRODUCTS[5].name, sku: PRODUCTS[5].sku, price: PRODUCTS[5].price, qty: 2, color: PRODUCTS[5].color },
  { id: PRODUCTS[8].id, name: PRODUCTS[8].name, sku: PRODUCTS[8].sku, price: PRODUCTS[8].price, qty: 1, color: PRODUCTS[8].color },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(0); // 0..3
  const [delivery, setDelivery] = useState("standard");
  const [pay, setPay] = useState("card");

  const subtotal = SUMMARY_ITEMS.reduce((s, i) => s + i.qty * i.price, 0);
  const discount = Math.round(subtotal * 0.25); // SUMMER26
  const shippingMap: Record<string, number> = { standard: 0, express: 18, overnight: 38 };
  const ship = shippingMap[delivery];
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + ship + tax;

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="space-y-4">
      <PageHeader
        title="Checkout"
        description="Complete your purchase securely in a few quick steps."
        breadcrumbs={[
          { label: "Ecommerce" },
          { label: "Cart", href: "/ecommerce/cart" },
          { label: "Checkout" },
        ]}
        actions={
          <Link href="/ecommerce/cart"><Button variant="secondary"><ArrowLeft className="h-4 w-4" /> Back to cart</Button></Link>
        }
      />

      {/* Step indicator */}
      <Card>
        <CardBody className="p-4">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div key={s.value} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2.5">
                    <div className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all",
                      done ? "bg-success-500 text-white" : active ? "bg-brand-500 text-white ring-4 ring-brand-100 dark:ring-brand-500/20" : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                    )}>
                      {done ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                    </div>
                    <span className={cn("text-xs font-semibold sm:text-sm", active ? "text-gray-900 dark:text-white" : done ? "text-success-600 dark:text-success-400" : "text-gray-400 dark:text-gray-500")}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="mx-2 hidden h-px flex-1 bg-gray-200 dark:bg-gray-800 sm:block">
                      <div className={cn("h-full bg-brand-500 transition-all", done ? "w-full" : "w-0")} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Step content */}
        <div className="space-y-4">
          {/* Step 1: Shipping */}
          {step === 0 && (
            <Card>
              <CardHeader title="Shipping address" description="Where should we send your order?" />
              <CardBody className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label required>First name</Label>
                    <Input defaultValue="Priya" />
                  </div>
                  <div>
                    <Label required>Last name</Label>
                    <Input defaultValue="Iyer" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label required>Email</Label>
                    <Input type="email" defaultValue="priya.i@nimbuspro.io" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label required>Address</Label>
                    <Input defaultValue="42 Marine Drive, Apt 7B" />
                  </div>
                  <div>
                    <Label required>City</Label>
                    <Input defaultValue="Mumbai" />
                  </div>
                  <div>
                    <Label required>State / Province</Label>
                    <Input defaultValue="Maharashtra" />
                  </div>
                  <div>
                    <Label required>ZIP / Postal</Label>
                    <Input defaultValue="400021" />
                  </div>
                  <div>
                    <Label required>Country</Label>
                    <Select defaultValue="IN">
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="SG">Singapore</option>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Phone</Label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-400" />
                  Save this address for next time
                </label>
              </CardBody>
            </Card>
          )}

          {/* Step 2: Delivery */}
          {step === 1 && (
            <Card>
              <CardHeader title="Delivery method" description="Choose how fast you need it" />
              <CardBody className="space-y-3">
                {[
                  { id: "standard", name: "Standard Shipping", desc: "5-7 business days", price: 0, icon: Truck },
                  { id: "express", name: "Express Shipping", desc: "2-3 business days", price: 18, icon: Truck },
                  { id: "overnight", name: "Overnight", desc: "Next business day by 6 PM", price: 38, icon: Truck },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDelivery(opt.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all",
                      delivery === opt.id ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-brand-300 dark:border-gray-800"
                    )}
                  >
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", delivery === opt.id ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-500 dark:bg-gray-800")}>
                      <opt.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{opt.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{opt.price === 0 ? "FREE" : formatCurrency(opt.price)}</span>
                    <div className={cn("flex h-5 w-5 items-center justify-center rounded-full border-2", delivery === opt.id ? "border-brand-500 bg-brand-500" : "border-gray-300 dark:border-gray-700")}>
                      {delivery === opt.id && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </button>
                ))}
                <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/40">
                  <p className="text-xs text-gray-500 dark:text-gray-400">All orders include tracking and ship within 24 hours. Free returns within 30 days.</p>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Step 3: Payment */}
          {step === 2 && (
            <Card>
              <CardHeader title="Payment method" description="Pay securely with your preferred method" action={<Badge tone="success" variant="soft" dot><Lock className="h-3 w-3" /> Secure</Badge>} />
              <CardBody className="space-y-3">
                {[
                  { id: "card", name: "Credit / Debit Card", desc: "Visa, Mastercard, Amex", icon: CreditCard },
                  { id: "wallet", name: "Digital Wallet", desc: "Apple Pay, Google Pay, PayPal", icon: Wallet },
                  { id: "bank", name: "Bank Transfer", desc: "Direct bank transfer (3-5 days)", icon: Building2 },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPay(opt.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all",
                      pay === opt.id ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-brand-300 dark:border-gray-800"
                    )}
                  >
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", pay === opt.id ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-500 dark:bg-gray-800")}>
                      <opt.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{opt.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</p>
                    </div>
                    <div className={cn("flex h-5 w-5 items-center justify-center rounded-full border-2", pay === opt.id ? "border-brand-500 bg-brand-500" : "border-gray-300 dark:border-gray-700")}>
                      {pay === opt.id && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </button>
                ))}

                {pay === "card" && (
                  <div className="space-y-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                    <div>
                      <Label required>Card number</Label>
                      <Input placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label required>Expiry</Label>
                        <Input placeholder="MM / YY" />
                      </div>
                      <div>
                        <Label required>CVC</Label>
                      <Input placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label>Name on card</Label>
                      <Input placeholder="Priya Iyer" />
                    </div>
                  </div>
                )}
                <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><Shield className="h-3.5 w-3.5" /> Your payment information is encrypted end-to-end. We never store your card details.</p>
              </CardBody>
            </Card>
          )}

          {/* Step 4: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <Card>
                <CardHeader title="Review your order" description="Please confirm everything looks correct" />
                <CardBody className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                      <div className="mb-1.5 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Ship to</p>
                        <button onClick={() => setStep(0)} className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400">Edit</button>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Priya Iyer</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">42 Marine Drive, Apt 7B</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Mumbai, Maharashtra 400021</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">India · +91 98765 43210</p>
                    </div>
                    <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                      <div className="mb-1.5 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Delivery</p>
                        <button onClick={() => setStep(1)} className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400">Edit</button>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{delivery === "standard" ? "Standard Shipping" : delivery === "express" ? "Express Shipping" : "Overnight"}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{delivery === "standard" ? "5-7 business days" : delivery === "express" ? "2-3 business days" : "Next business day by 6 PM"}</p>
                      <p className="mt-1 text-xs font-semibold text-gray-700 dark:text-gray-300">{ship === 0 ? "FREE" : formatCurrency(ship)}</p>
                    </div>
                    <div className="rounded-xl border border-gray-100 p-3 sm:col-span-2 dark:border-gray-800">
                      <div className="mb-1.5 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Payment</p>
                        <button onClick={() => setStep(2)} className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400">Edit</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{pay === "card" ? "VISA ending in 4242" : pay === "wallet" ? "Apple Pay" : "Bank Transfer"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                    <p className="border-b border-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:border-gray-800">Items ({SUMMARY_ITEMS.length})</p>
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      {SUMMARY_ITEMS.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3">
                          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white", COLOR_TONE[item.color] ?? COLOR_TONE.brand)}>
                            {initials(item.name)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {item.sku} · Qty: {item.qty}</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(item.price * item.qty)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="border-success-200 bg-success-50 dark:border-success-800 dark:bg-success-500/10">
                <CardBody className="flex items-center gap-3 p-4">
                  <Shield className="h-5 w-5 shrink-0 text-success-600 dark:text-success-400" />
                  <p className="text-sm text-success-800 dark:text-success-200">By placing this order you agree to our Terms of Service and Privacy Policy. Your payment is secured with 256-bit SSL encryption.</p>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Step navigation */}
          <div className="flex items-center justify-between">
            <Button variant="secondary" onClick={back} disabled={step === 0}><ArrowLeft className="h-4 w-4" /> Back</Button>
            {step < 3 ? (
              <Button onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <Button><Lock className="h-4 w-4" /> Place order · {formatCurrency(total)}</Button>
            )}
          </div>
        </div>

        {/* Sticky order summary */}
        <aside>
          <Card className="sticky top-4">
            <CardHeader title="Order summary" description={`${SUMMARY_ITEMS.reduce((s, i) => s + i.qty, 0)} items in cart`} />
            <CardBody className="space-y-3">
              <div className="max-h-64 space-y-3 overflow-y-auto">
                {SUMMARY_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white", COLOR_TONE[item.color] ?? COLOR_TONE.brand)}>
                      {initials(item.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Qty {item.qty} · {formatCurrency(item.price)}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Discount (SUMMER26)</span>
                  <span className="font-semibold text-success-600 dark:text-success-400">— {formatCurrency(discount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{ship === 0 ? <Badge tone="success" variant="soft">FREE</Badge> : formatCurrency(ship)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Tax (8%)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
                  <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">{formatCurrency(total)}</span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/40">
                <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><Lock className="h-3 w-3" /> Secured by Stripe · 256-bit SSL</p>
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
