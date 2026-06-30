"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Timeline } from "@/components/shared/timeline";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import {
  ArrowLeftIcon,
  CheckIcon,
  TruckIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  MapPinIcon,
  BoxIcon,
} from "@/components/Layouts/sidebar/icons";
import { products } from "@/data/ecommerce/products";

type CartLine = { id: string; product: typeof products[number]; qty: number; variant: string };
type Step = "shipping" | "payment" | "review";

const fmt = (n: number) => `$${n.toFixed(2)}`;

const STEPS: { value: Step; label: string; description: string }[] = [
  { value: "shipping", label: "Shipping", description: "Address & method" },
  { value: "payment", label: "Payment", description: "Card or wallet" },
  { value: "review", label: "Review", description: "Confirm & place" },
];

export default function CheckoutClient() {
  const [step, setStep] = useState<Step>("shipping");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "apple">("card");
  const [placed, setPlaced] = useState(false);

  const lines: CartLine[] = useMemo(
    () => [
      { id: "l1", product: products[0], qty: 1, variant: "Midnight" },
      { id: "l2", product: products[1], qty: 2, variant: "Graphite" },
      { id: "l3", product: products[5], qty: 1, variant: "78° FoV" },
    ],
    [],
  );

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = shippingMethod === "express" ? 24 : shippingMethod === "next" ? 39 : subtotal > 150 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const stepIndex = STEPS.findIndex((s) => s.value === step);

  function next() {
    if (step === "shipping") setStep("payment");
    else if (step === "payment") setStep("review");
  }

  function back() {
    if (step === "payment") setStep("shipping");
    else if (step === "review") setStep("payment");
  }

  function placeOrder() {
    setPlaced(true);
  }

  if (placed) {
    return (
      <div>
        <PageHeader
          title="Order confirmed"
          description="Thank you for your purchase!"
          breadcrumbs={[
            { label: "Helios Pro", href: "/" },
            { label: "Ecommerce", href: "/ecommerce/products" },
            { label: "Checkout", href: "/ecommerce/checkout" },
            { label: "Confirmed" },
          ]}
        />
        <Card className="mx-auto max-w-2xl text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
            <CheckIcon className="size-8" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-dark dark:text-white">Order placed successfully</h2>
          <p className="mt-2 text-sm text-dark-5 dark:text-dark-6">
            Order <span className="font-mono font-medium text-primary dark:text-primary-light">#HLP-20432</span> confirmed.
            A receipt has been emailed to you.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-left text-sm">
            <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
              <p className="text-xs text-dark-5 dark:text-dark-6">Order total</p>
              <p className="text-lg font-bold text-dark dark:text-white">{fmt(total)}</p>
            </div>
            <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
              <p className="text-xs text-dark-5 dark:text-dark-6">Estimated delivery</p>
              <p className="text-lg font-bold text-dark dark:text-white">Jan 28 - 30</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Link href="/ecommerce/products"><Button variant="outline" size="md">Continue shopping</Button></Link>
            <Link href="/ecommerce/orders/detail"><Button variant="primary" size="md">View order</Button></Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Checkout"
        description="Complete your purchase in 3 quick steps"
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/products" },
          { label: "Cart", href: "/ecommerce/cart" },
          { label: "Checkout" },
        ]}
        actions={
          <Link href="/ecommerce/cart">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="size-4" />
              Back to cart
            </Button>
          </Link>
        }
      />

      {/* Step indicator */}
      <Card className="mb-6">
        <Timeline
          vertical={false}
          events={STEPS.map((s, i) => ({
            title: s.label,
            description: s.description,
            time: `Step ${i + 1} of ${STEPS.length}`,
            tone: i < stepIndex ? "success" : i === stepIndex ? "primary" : "info",
            icon: i < stepIndex ? (
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <span className="text-xs font-bold">{i + 1}</span>
            ),
          }))}
        />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left: form steps */}
        <div className="space-y-6">
          {step === "shipping" && (
            <FormSection title="Shipping address" description="Where should we send your order?">
              <FormField label="Full name" htmlFor="name" required>
                <input id="name" defaultValue="Grace Whitfield" className={inputClass} />
              </FormField>
              <FormField label="Phone" htmlFor="phone" required>
                <input id="phone" defaultValue="+1 (503) 555-0142" className={inputClass} />
              </FormField>
              <FormField label="Address line 1" htmlFor="addr1" required>
                <input id="addr1" defaultValue="27 Maple Court" className={inputClass} />
              </FormField>
              <FormField label="Address line 2" htmlFor="addr2">
                <input id="addr2" defaultValue="Apt 4B" className={inputClass} />
              </FormField>
              <FormField label="City" htmlFor="city" required>
                <input id="city" defaultValue="Portland" className={inputClass} />
              </FormField>
              <FormField label="State / Province" htmlFor="state" required>
                <input id="state" defaultValue="OR" className={inputClass} />
              </FormField>
              <FormField label="ZIP / Postal code" htmlFor="zip" required>
                <input id="zip" defaultValue="97205" className={inputClass} />
              </FormField>
              <FormField label="Country" htmlFor="country" required>
                <select id="country" defaultValue="US" className={inputClass}>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                </select>
              </FormField>
            </FormSection>
          )}

          {step === "shipping" && (
            <Card>
              <CardHeader title="Shipping method" subtitle="Choose your delivery speed" action={<TruckIcon className="size-5 text-dark-5" />} />
              <div className="space-y-2">
                {[
                  { id: "standard", label: "Standard shipping", eta: "5-7 business days", cost: subtotal > 150 ? 0 : 12 },
                  { id: "express", label: "Express shipping", eta: "2-3 business days", cost: 24 },
                  { id: "next", label: "Next-day delivery", eta: "1 business day", cost: 39 },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                      shippingMethod === m.id ? "border-primary bg-primary-subtle/60 dark:bg-primary/10" : "border-stroke hover:border-primary/40 dark:border-dark-3"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === m.id}
                        onChange={() => setShippingMethod(m.id)}
                        className="size-4 text-primary focus:ring-primary/30"
                      />
                      <div>
                        <p className="font-medium text-dark dark:text-white">{m.label}</p>
                        <p className="text-xs text-dark-5 dark:text-dark-6">{m.eta}</p>
                      </div>
                    </div>
                    <span className="font-medium text-dark dark:text-white">{m.cost === 0 ? "Free" : fmt(m.cost)}</span>
                  </label>
                ))}
              </div>
            </Card>
          )}

          {step === "payment" && (
            <>
              <Card>
                <CardHeader title="Payment method" subtitle="Choose how you'd like to pay" action={<CreditCardIcon className="size-5 text-dark-5" />} />
                <div className="space-y-2">
                  {[
                    { id: "card" as const, label: "Credit / debit card", sub: "Visa, Mastercard, Amex" },
                    { id: "paypal" as const, label: "PayPal", sub: "Pay with your PayPal balance" },
                    { id: "apple" as const, label: "Apple Pay", sub: "Touch ID or Face ID" },
                  ].map((m) => (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                        paymentMethod === m.id ? "border-primary bg-primary-subtle/60 dark:bg-primary/10" : "border-stroke hover:border-primary/40 dark:border-dark-3"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="size-4 text-primary focus:ring-primary/30"
                      />
                      <div>
                        <p className="font-medium text-dark dark:text-white">{m.label}</p>
                        <p className="text-xs text-dark-5 dark:text-dark-6">{m.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>

              {paymentMethod === "card" && (
                <FormSection title="Card details" description="All information is encrypted at submission." columns={2}>
                  <FormField label="Cardholder name" htmlFor="cardName" required>
                    <input id="cardName" defaultValue="Grace Whitfield" className={inputClass} />
                  </FormField>
                  <FormField label="Card number" htmlFor="cardNum" required>
                    <input id="cardNum" defaultValue="4242 4242 4242 4242" className={`${inputClass} font-mono`} />
                  </FormField>
                  <FormField label="Expiry date" htmlFor="exp" required>
                    <input id="exp" defaultValue="12/27" placeholder="MM/YY" className={inputClass} />
                  </FormField>
                  <FormField label="CVC" htmlFor="cvc" required>
                    <input id="cvc" defaultValue="123" className={inputClass} />
                  </FormField>
                </FormSection>
              )}

              <FormSection title="Billing address" description="Same as shipping address?" columns={2}>
                <FormField label="Address line 1" htmlFor="bAddr1">
                  <input id="bAddr1" defaultValue="27 Maple Court" className={inputClass} />
                </FormField>
                <FormField label="City" htmlFor="bCity">
                  <input id="bCity" defaultValue="Portland" className={inputClass} />
                </FormField>
                <FormField label="State" htmlFor="bState">
                  <input id="bState" defaultValue="OR" className={inputClass} />
                </FormField>
                <FormField label="ZIP" htmlFor="bZip">
                  <input id="bZip" defaultValue="97205" className={inputClass} />
                </FormField>
              </FormSection>
            </>
          )}

          {step === "review" && (
            <>
              <Card>
                <CardHeader title="Review your order" subtitle="Please confirm before placing your order" action={<BoxIcon className="size-5 text-dark-5" />} />
                <div className="divide-y divide-stroke dark:divide-dark-3">
                  {lines.map((l) => (
                    <div key={l.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={l.product.image} alt={l.product.name} className="size-16 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 font-medium text-dark dark:text-white">{l.product.name}</p>
                        <p className="text-xs text-dark-5 dark:text-dark-6">{l.variant} · Qty {l.qty}</p>
                      </div>
                      <p className="font-medium text-dark dark:text-white">{fmt(l.product.price * l.qty)}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader title="Shipping to" action={<MapPinIcon className="size-5 text-dark-5" />} />
                  <address className="not-italic text-sm text-dark-7 dark:text-dark-7">
                    <p className="font-medium text-dark dark:text-white">Grace Whitfield</p>
                    <p>27 Maple Court, Apt 4B</p>
                    <p>Portland, OR 97205</p>
                    <p>United States</p>
                    <p className="mt-2 text-xs text-dark-5 dark:text-dark-6">+1 (503) 555-0142</p>
                  </address>
                  <div className="mt-3 border-t border-stroke pt-3 dark:border-dark-3">
                    <p className="text-xs text-dark-5 dark:text-dark-6">Method</p>
                    <p className="text-sm font-medium text-dark dark:text-white">
                      {shippingMethod === "standard" ? "Standard shipping (5-7 days)" : shippingMethod === "express" ? "Express (2-3 days)" : "Next-day delivery"}
                    </p>
                  </div>
                </Card>
                <Card>
                  <CardHeader title="Paying with" action={<CreditCardIcon className="size-5 text-dark-5" />} />
                  <p className="text-sm font-medium text-dark dark:text-white">
                    {paymentMethod === "card" ? "Visa ending in 4242" : paymentMethod === "paypal" ? "PayPal balance" : "Apple Pay"}
                  </p>
                  <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                    {paymentMethod === "card" ? "Grace Whitfield · expires 12/27" : "You'll be redirected to confirm."}
                  </p>
                  <div className="mt-3 border-t border-stroke pt-3 dark:border-dark-3">
                    <Badge variant="success" size="sm">Billing address matches shipping</Badge>
                  </div>
                </Card>
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            <Button variant="outline" size="md" onClick={back} disabled={step === "shipping"}>
              <ArrowLeftIcon className="size-4" />
              Back
            </Button>
            {step !== "review" ? (
              <Button variant="primary" size="md" onClick={next}>
                Continue
                <svg width={16} height={16} viewBox="0 0 18 18" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.1023 4.10225C9.88258 4.32192 9.88258 4.67808 10.1023 4.89775L13.642 8.4375H3C2.68934 8.4375 2.4375 8.68934 2.4375 9C2.4375 9.31066 2.68934 9.5625 3 9.5625H13.642L10.1023 13.1023C9.88258 13.3219 9.88258 13.6781 10.1023 13.8977C10.3219 14.1174 10.6781 14.1174 10.8977 13.8977L15.3977 9.39775C15.6174 9.17808 15.6174 8.82192 15.3977 8.60225L10.8977 4.10225C10.6781 3.88258 10.3219 3.88258 10.1023 4.10225Z" />
                </svg>
              </Button>
            ) : (
              <Button variant="primary" size="md" onClick={placeOrder}>
                <CheckIcon className="size-4" />
                Place order · {fmt(total)}
              </Button>
            )}
          </div>
        </div>

        {/* Right: order summary */}
        <div className="space-y-6">
          <Card padded={false}>
            <div className="border-b border-stroke p-5 dark:border-dark-3">
              <CardHeader title="Order summary" />
            </div>
            <div className="space-y-3 p-5 text-sm">
              <div className="max-h-64 space-y-3 overflow-y-auto">
                {lines.map((l) => (
                  <div key={l.id} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={l.product.image} alt={l.product.name} className="size-12 rounded-lg object-cover" />
                      <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-dark text-[10px] font-semibold text-white dark:bg-white dark:text-dark">{l.qty}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-xs font-medium text-dark dark:text-white">{l.product.name}</p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">{l.variant}</p>
                    </div>
                    <p className="text-sm font-medium text-dark dark:text-white">{fmt(l.product.price * l.qty)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-stroke pt-3 dark:border-dark-3">
                <div className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Subtotal</span>
                  <span className="font-medium text-dark dark:text-white">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Shipping</span>
                  <span className="font-medium text-dark dark:text-white">{shipping === 0 ? "Free" : fmt(shipping)}</span>
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
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 text-sm text-dark-7 dark:text-dark-7">
              <ShoppingCartIcon className="size-5 text-primary" />
              <div>
                <p className="font-medium text-dark dark:text-white">Secure checkout</p>
                <p className="text-xs text-dark-5 dark:text-dark-6">Your payment information is encrypted.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
