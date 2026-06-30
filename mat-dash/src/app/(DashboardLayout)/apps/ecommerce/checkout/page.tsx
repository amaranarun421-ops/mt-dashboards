"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import { shopProducts } from "../../../data/ecommerce";

const cartItems = [
  { id: 1, qty: 1 },
  { id: 3, qty: 2 },
  { id: 9, qty: 1 },
].map((c) => ({ ...c, product: shopProducts.find((p) => p.id === c.id)! }));

const CheckoutPage = () => {
  const [items, setItems] = useState(cartItems);
  const [step, setStep] = useState(1);

  const updateQty = (id: number, delta: number) =>
    setItems((arr) => arr.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const removeItem = (id: number) => setItems((arr) => arr.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <PageContainer
      title="Checkout"
      breadcrumb={[{ to: "/", title: "Home" }, { to: "/apps/ecommerce/shop", title: "Shop" }, { title: "Checkout" }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Steps */}
          <div className="flex items-center justify-between">
            {["Shipping", "Payment", "Review"].map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold ${step > i + 1 ? "bg-success text-white" : step === i + 1 ? "bg-primary text-white" : "bg-lightgray dark:bg-dark text-link opacity-60"}`}>
                  {step > i + 1 ? <Icon icon="solar:check-bold" width={18} /> : i + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${step === i + 1 ? "text-primary" : "opacity-60"}`}>{s}</span>
                {i < 2 && <div className={`flex-1 h-0.5 mx-3 ${step > i + 1 ? "bg-success" : "bg-defaultBorder"}`} />}
              </div>
            ))}
          </div>

          <DemoBlock title="Shipping Address">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>First Name</Label><Input className="mt-2" defaultValue="John" /></div>
              <div><Label>Last Name</Label><Input className="mt-2" defaultValue="Doe" /></div>
              <div className="col-span-2"><Label>Address</Label><Input className="mt-2" placeholder="123 Main St" /></div>
              <div><Label>City</Label><Input className="mt-2" placeholder="San Francisco" /></div>
              <div><Label>ZIP Code</Label><Input className="mt-2" placeholder="94102" /></div>
              <div><Label>State</Label><Input className="mt-2" placeholder="CA" /></div>
              <div><Label>Phone</Label><Input className="mt-2" placeholder="+1 555 000 1234" /></div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <Button variant="outline">Back</Button>
              <Button onClick={() => setStep(2)}>Continue to Payment</Button>
            </div>
          </DemoBlock>

          <DemoBlock title="Cart Items">
            <div className="space-y-3">
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-4 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={i.product.image} alt={i.product.name} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{i.product.name}</p>
                    <p className="text-xs opacity-60">{i.product.category}</p>
                  </div>
                  <div className="flex items-center border border-defaultBorder rounded-lg">
                    <button onClick={() => updateQty(i.id, -1)} className="h-8 w-8 hover:bg-lightprimary flex items-center justify-center"><Icon icon="solar:minimize-linear" width={14} /></button>
                    <span className="w-8 text-center text-sm">{i.qty}</span>
                    <button onClick={() => updateQty(i.id, 1)} className="h-8 w-8 hover:bg-lightprimary flex items-center justify-center"><Icon icon="solar:add-linear" width={14} /></button>
                  </div>
                  <span className="font-semibold w-20 text-right">${(i.product.price * i.qty).toFixed(2)}</span>
                  <button onClick={() => removeItem(i.id)} className="text-error hover:bg-lighterror h-8 w-8 rounded-full flex items-center justify-center"><Icon icon="solar:trash-bin-minimalistic-bold" width={16} /></button>
                </div>
              ))}
            </div>
          </DemoBlock>
        </div>

        {/* Order Summary */}
        <div>
          <DemoBlock title="Order Summary" className="sticky top-24">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="opacity-70">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Shipping</span><span className="font-medium">{shipping === 0 ? <Badge variant="lightSuccess">FREE</Badge> : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Tax (8%)</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              <Separator className="my-3" />
              <div className="flex justify-between text-base"><span className="font-semibold">Total</span><span className="font-bold text-primary">${total.toFixed(2)}</span></div>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-lightprimary text-primary text-xs flex items-start gap-2">
              <Icon icon="solar:lightbulb-bolt-bold-duotone" width={20} className="shrink-0" />
              <p>Free shipping on orders over $100. You're {Math.max(0, 100 - subtotal) === 0 ? "qualified!" : `$${(100 - subtotal).toFixed(2)} away`}</p>
            </div>

            <Button className="w-full mt-5 gap-2" size="lg"><Icon icon="solar:lock-keyhole-bold" width={18} /> Place Order</Button>
            <div className="flex items-center justify-center gap-3 mt-4 opacity-60">
              <Icon icon="solar:card-bold" width={20} />
              <Icon icon="solar:paypal-logo-bold" width={20} />
              <Icon icon="solar:apple-logo-bold" width={20} />
              <Icon icon="solar:google-logo-bold" width={20} />
            </div>
            <p className="text-xs text-center opacity-60 mt-3">🔒 Secure 256-bit SSL encryption</p>
          </DemoBlock>
        </div>
      </div>
    </PageContainer>
  );
};

export default CheckoutPage;
