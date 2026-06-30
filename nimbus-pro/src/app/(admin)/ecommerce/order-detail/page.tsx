"use client";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Avatar } from "@/components/ui";
import { ORDERS, PRODUCTS } from "@/data/mock";
import { cn, formatCurrency, formatDate, initials } from "@/lib/utils";
import {
  ChevronLeft, Printer, Truck, RefreshCcw, XCircle, MapPin, CreditCard,
  Package, CheckCircle2, Clock, User, MessageSquare, FileText, Send,
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

export default function OrderDetailPage() {
  const order = ORDERS[0]; // ORD-4218 Priya Iyer delivered
  const lineItems = [
    { id: "li1", product: PRODUCTS[0], qty: 2, price: PRODUCTS[0].price },
    { id: "li2", product: PRODUCTS[5], qty: 1, price: PRODUCTS[5].price },
    { id: "li3", product: PRODUCTS[8], qty: 1, price: PRODUCTS[8].price },
    { id: "li4", product: PRODUCTS[4], qty: 3, price: PRODUCTS[4].price },
  ];

  const subtotal = lineItems.reduce((s, i) => s + i.qty * i.price, 0);
  const shipping = 24;
  const tax = Math.round(subtotal * 0.08);
  const discount = 100;
  const total = subtotal + shipping + tax - discount;

  const timeline = [
    { status: "Order placed", desc: "Customer placed order on web", time: "Jun 26, 09:42", icon: ShoppingBag, tone: "brand", done: true },
    { status: "Payment confirmed", desc: "Stripe charge succeeded · $1,248.00", time: "Jun 26, 09:43", icon: CreditCard, tone: "success", done: true },
    { status: "Processing", desc: "Order routed to Mumbai warehouse", time: "Jun 26, 10:15", icon: Package, tone: "warning", done: true },
    { status: "Shipped", desc: "Delivered to FedEx · Tracking 7741 2890 5612", time: "Jun 27, 14:20", icon: Truck, tone: "purple", done: true },
    { status: "Delivered", desc: "Signed by customer · Front porch", time: "Jun 28, 11:08", icon: CheckCircle2, tone: "success", done: true },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title={order.id}
        description={`Placed ${formatDate(order.date)} · ${order.items} items · ${formatCurrency(order.total)}`}
        breadcrumbs={[
          { label: "Ecommerce" },
          { label: "Orders", href: "/ecommerce/orders" },
          { label: order.id },
        ]}
        actions={
          <>
            <Link href="/ecommerce/orders"><Button variant="secondary"><ChevronLeft className="h-4 w-4" /> Back</Button></Link>
            <Button variant="secondary"><Printer className="h-4 w-4" /> Print Invoice</Button>
            <Button variant="danger"><XCircle className="h-4 w-4" /> Cancel</Button>
          </>
        }
      />

      {/* Status banner */}
      <Card className="border-success-200 bg-success-50 dark:border-success-800 dark:bg-success-500/10">
        <CardBody className="flex flex-wrap items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success-500 text-white"><CheckCircle2 className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold text-success-800 dark:text-success-200">Order delivered successfully</p>
              <p className="text-xs text-success-700 dark:text-success-300">Delivered Jun 28, 11:08 · Signed by customer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="success" variant="solid" dot>{order.status}</Badge>
            <Badge tone="success" variant="soft" dot>{order.payment}</Badge>
            <Badge tone={order.channel === "web" ? "brand" : "purple"} variant="outline">{order.channel}</Badge>
          </div>
        </CardBody>
      </Card>

      {/* Status timeline (horizontal) */}
      <Card>
        <CardHeader title="Fulfillment timeline" description="Order lifecycle from placement to delivery" />
        <CardBody>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            {timeline.map((t, i) => (
              <div key={i} className="relative flex flex-1 items-start gap-3 lg:flex-col lg:items-center lg:text-center">
                {i < timeline.length - 1 && <div className="absolute left-5 top-9 hidden h-px w-full bg-gray-200 dark:bg-gray-800 lg:block" style={{ left: "calc(50% + 20px)", width: "calc(100% - 40px)" }} />}
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white",
                  t.tone === "brand" ? "bg-brand-500" :
                  t.tone === "success" ? "bg-success-500" :
                  t.tone === "warning" ? "bg-warning-500" :
                  t.tone === "purple" ? "bg-purple-500" : "bg-gray-500")}>
                  <t.icon className="h-4 w-4" />
                </div>
                <div className="lg:mt-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.status}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.desc}</p>
                  <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">{t.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Main content */}
        <div className="space-y-4">
          {/* Items table */}
          <Card className="overflow-hidden">
            <CardHeader title="Order items" description={`${lineItems.length} line items · ${lineItems.reduce((s, i) => s + i.qty, 0)} units`} />
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th className="text-right">Qty</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((li) => (
                    <tr key={li.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white", COLOR_TONE[li.product.color] ?? COLOR_TONE.brand)}>
                            {initials(li.product.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{li.product.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{li.product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="text-xs font-medium text-gray-600 dark:text-gray-400">{li.product.sku}</span></td>
                      <td className="text-right"><span className="text-sm font-medium text-gray-700 dark:text-gray-300">×{li.qty}</span></td>
                      <td className="text-right"><span className="text-sm text-gray-700 dark:text-gray-300">{formatCurrency(li.price)}</span></td>
                      <td className="text-right"><span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(li.price * li.qty)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Customer info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader title="Customer" description="Buyer information" />
              <CardBody className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar name={order.customer} size={44} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.customer}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{order.email}</p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-sm"><User className="h-3.5 w-3.5 text-gray-400" /><span className="text-gray-500 dark:text-gray-400">Account:</span><span className="font-medium text-gray-900 dark:text-white">VIP · 14 orders</span></div>
                  <div className="flex items-center gap-2 text-sm"><Clock className="h-3.5 w-3.5 text-gray-400" /><span className="text-gray-500 dark:text-gray-400">Customer since:</span><span className="font-medium text-gray-900 dark:text-white">Apr 2023</span></div>
                  <div className="flex items-center gap-2 text-sm"><CreditCard className="h-3.5 w-3.5 text-gray-400" /><span className="text-gray-500 dark:text-gray-400">Lifetime value:</span><span className="font-medium text-gray-900 dark:text-white">{formatCurrency(18420)}</span></div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Shipping address" description="Destination" />
              <CardBody className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.customer}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">42 Marine Drive, Apt 7B</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Nariman Point, Mumbai 400021</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Maharashtra, India</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                  <Badge tone="purple" variant="soft" dot>FedEx Priority</Badge>
                  <Badge tone="gray" variant="outline">Tracking 7741 2890 5612</Badge>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Order summary */}
          <Card>
            <CardHeader title="Order summary" description="Cost breakdown" />
            <CardBody className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Subtotal ({lineItems.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Shipping (FedEx Priority)</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(shipping)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Tax (8%)</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Discount (SUMMER26)</span>
                <span className="font-semibold text-success-600 dark:text-success-400">— {formatCurrency(discount)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">{formatCurrency(total)}</span>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Fulfillment actions */}
          <Card>
            <CardHeader title="Actions" description="Fulfillment & refund" />
            <CardBody className="space-y-2">
              <Button variant="secondary" className="w-full justify-start"><Printer className="h-4 w-4" /> Print invoice</Button>
              <Button variant="secondary" className="w-full justify-start"><Truck className="h-4 w-4" /> Mark as shipped</Button>
              <Button variant="secondary" className="w-full justify-start"><FileText className="h-4 w-4" /> Print packing slip</Button>
              <Button variant="secondary" className="w-full justify-start"><RefreshCcw className="h-4 w-4" /> Issue refund</Button>
              <Button variant="danger" className="w-full justify-start"><XCircle className="h-4 w-4" /> Cancel order</Button>
            </CardBody>
          </Card>

          {/* Payment info */}
          <Card>
            <CardHeader title="Payment" description="Transaction details" />
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-12 items-center justify-center rounded-md bg-gradient-to-br from-gray-900 to-gray-700 text-[10px] font-bold text-white">VISA</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">•••• 4242</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Expires 09/28</p>
                  </div>
                </div>
                <Badge tone="success" variant="soft" dot>Paid</Badge>
              </div>
              <div className="space-y-1.5 border-t border-gray-100 pt-3 text-xs dark:border-gray-800">
                <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Transaction ID</span><span className="font-mono font-medium text-gray-700 dark:text-gray-300">ch_3PQ8Xa...</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Processor</span><span className="font-medium text-gray-700 dark:text-gray-300">Stripe</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Captured</span><span className="font-medium text-gray-700 dark:text-gray-300">Jun 26, 09:43</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Fee</span><span className="font-medium text-gray-700 dark:text-gray-300">{formatCurrency(36)}</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Net</span><span className="font-medium text-success-600 dark:text-success-400">{formatCurrency(total - 36)}</span></div>
              </div>
            </CardBody>
          </Card>

          {/* Customer notes */}
          <Card>
            <CardHeader title="Customer note" description="Buyer instructions" />
            <CardBody>
              <div className="flex items-start gap-2.5">
                <MessageSquare className="h-4 w-4 shrink-0 text-brand-500" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  &ldquo;Please leave at the front door — doorbell is broken. Call before delivery if possible.&rdquo;
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Internal notes */}
          <Card>
            <CardHeader title="Internal notes" description="Staff-only" />
            <CardBody className="space-y-3">
              <div className="space-y-2">
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/40">
                  <p className="text-sm text-gray-700 dark:text-gray-300">High-value customer — upgraded shipping to FedEx Priority at no charge.</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">— Aaroh S. · Jun 26</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input placeholder="Add a note..." className="input flex-1 text-sm" />
                <Button size="icon" aria-label="Send note"><Send className="h-4 w-4" /></Button>
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}

// Local icon to avoid extra import (lucide shopping bag)
function ShoppingBag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
