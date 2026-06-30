"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Input, Label, Select, Button, Badge, Checkbox } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";
import { CreditCard, Lock, Check, Shield, ArrowRight, Tag, ShoppingBag } from "lucide-react";

const detectBrand = (num: string) => {
  const d = num.replace(/\s/g, "");
  if (/^4/.test(d)) return { name: "VISA", tone: "brand" };
  if (/^5[1-5]/.test(d)) return { name: "MASTERCARD", tone: "warning" };
  if (/^3[47]/.test(d)) return { name: "AMEX", tone: "purple" };
  if (/^6/.test(d)) return { name: "DISCOVER", tone: "success" };
  return null;
};

const ITEMS = [
  { name: "Nimbus Pro — Lifetime License", desc: "One-time payment · 1 end product", price: 499, qty: 1 },
  { name: "Theme Customizer Add-on", desc: "5 palettes + custom tokens", price: 49, qty: 1 },
  { name: "Premium Support (12 mo)", desc: "Email + Slack priority support", price: 149, qty: 1 },
];

export default function PaymentPage() {
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const [method, setMethod] = useState<"card" | "paypal" | "apple">("card");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; pct: number } | null>(null);

  const formatCard = (raw: string) => raw.replace(/\D/g, "").slice(0, 16).match(/.{1,4}/g)?.join(" ") ?? "";
  const formatExpiry = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 4);
    return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  const subtotal = ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.pct) / 100) : 0;
  const tax = Math.round((subtotal - discount) * 0.1);
  const total = subtotal - discount + tax;

  const brand = detectBrand(card);

  const applyCoupon = () => {
    const map: Record<string, number> = { SUMMER26: 25, WELCOME10: 10, FLAT50: 0 };
    if (map[coupon.toUpperCase()] != null) {
      setAppliedCoupon({ code: coupon.toUpperCase(), pct: map[coupon.toUpperCase()] });
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Payment"
        description="Complete your purchase securely with multiple payment options."
        breadcrumbs={[{ label: "Forms" }, { label: "Payment" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Payment form */}
        <div className="space-y-4">
          {/* Method selector */}
          <Card>
            <CardHeader title="Payment Method" description="Choose how you want to pay" />
            <CardBody>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "card", label: "Credit Card", icon: CreditCard },
                  { id: "paypal", label: "PayPal", icon: Tag },
                  { id: "apple", label: "Apple Pay", icon: Shield },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id as "card" | "paypal" | "apple")}
                    className={cn("flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                      method === m.id ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-brand-300 dark:border-gray-800"
                    )}
                  >
                    <m.icon className={cn("h-6 w-6", method === m.id ? "text-brand-600 dark:text-brand-400" : "text-gray-400")} />
                    <span className={cn("text-xs font-semibold", method === m.id ? "text-brand-700 dark:text-brand-300" : "text-gray-700 dark:text-gray-300")}>{m.label}</span>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Card details */}
          {method === "card" && (
            <Card>
              <CardHeader title="Card Details" description="Enter your card information" action={
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Lock className="h-3 w-3" /> Encrypted
                </div>
              } />
              <CardBody className="space-y-4">
                <div>
                  <Label required>Card number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      value={card}
                      onChange={(e) => setCard(formatCard(e.target.value))}
                      placeholder="4242 4242 4242 4242"
                      className="pl-9 font-mono"
                      maxLength={19}
                    />
                    {brand && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Badge tone={brand.tone as "brand" | "warning" | "purple" | "success"} variant="solid">{brand.name}</Badge>
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Label required>Name on card</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label required>Expiry</Label>
                    <Input value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} className="font-mono" />
                  </div>
                  <div>
                    <Label required>CVC</Label>
                    <Input value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" className="font-mono" />
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/40">
                  <Checkbox checked={saveCard} onChange={setSaveCard} label="Save this card for future purchases" />
                </div>
              </CardBody>
            </Card>
          )}

          {method === "paypal" && (
            <Card>
              <CardBody className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400">
                  <Tag className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Continue with PayPal</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">You&apos;ll be redirected to PayPal to complete your purchase.</p>
                </div>
                <Button><ArrowRight className="h-4 w-4" /> Continue to PayPal</Button>
              </CardBody>
            </Card>
          )}

          {method === "apple" && (
            <Card>
              <CardBody className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-white">
                  <Shield className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Pay with Apple Pay</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Use Touch ID or Face ID to authorize payment.</p>
                </div>
                <Button><Lock className="h-4 w-4" /> Pay with Apple Pay</Button>
              </CardBody>
            </Card>
          )}

          {/* Billing address */}
          <Card>
            <CardHeader title="Billing Address" description="Address associated with your card" />
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><Label required>First name</Label><Input placeholder="John" /></div>
                <div><Label required>Last name</Label><Input placeholder="Doe" /></div>
                <div className="sm:col-span-2"><Label>Company</Label><Input placeholder="Nimbus Labs" /></div>
                <div className="sm:col-span-2"><Label required>Address</Label><Input placeholder="123 Main St" /></div>
                <div><Label required>City</Label><Input placeholder="San Francisco" /></div>
                <div><Label required>State</Label><Input placeholder="CA" /></div>
                <div><Label required>ZIP</Label><Input placeholder="94107" /></div>
                <div>
                  <Label required>Country</Label>
                  <Select><option>United States</option><option>India</option><option>United Kingdom</option><option>Germany</option></Select>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Order summary */}
        <aside>
          <Card className="sticky top-4">
            <CardHeader title="Order Summary" description={`${ITEMS.length} items`} action={<ShoppingBag className="h-4 w-4 text-gray-400" />} />
            <CardBody className="space-y-4">
              <div className="space-y-3">
                {ITEMS.map((i) => (
                  <div key={i.name} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{i.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{i.desc}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(i.price)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="border-t border-gray-100 pt-3 dark:border-gray-800">
                <Label>Coupon code</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="SUMMER26" className="pl-9 uppercase" />
                  </div>
                  <Button variant="secondary" onClick={applyCoupon}>Apply</Button>
                </div>
                {appliedCoupon && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-success-600 dark:text-success-400"><Check className="h-3 w-3" /> {appliedCoupon.code} applied — {appliedCoupon.pct}% off</p>
                )}
                <p className="mt-1 text-[11px] text-gray-400">Try: SUMMER26, WELCOME10</p>
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                <div className="flex items-center justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Subtotal</span><span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span></div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-sm"><span className="text-success-600 dark:text-success-400">Discount</span><span className="font-semibold text-success-600 dark:text-success-400">−{formatCurrency(discount)}</span></div>
                )}
                <div className="flex items-center justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Tax (10%)</span><span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(tax)}</span></div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-brand-600 dark:text-brand-400">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button className="w-full" size="lg"><Lock className="h-4 w-4" /> Pay {formatCurrency(total)}</Button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-gray-400">
                <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> PCI-DSS</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> 256-bit SSL</span>
                <span>·</span>
                <span>Powered by Stripe</span>
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
