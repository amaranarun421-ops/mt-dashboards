import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Timeline } from "@/components/shared/timeline";
import { StatCard } from "@/components/shared/stat-card";
import { Progress } from "@/components/shared/progress";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckIcon,
  WalletIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  MapPinIcon,
  FileTextIcon,
  CheckIcon,
} from "@/components/Layouts/sidebar/icons";
import { sampleOrder, type OrderStatus } from "@/data/ecommerce/orders";

export const metadata = {
  title: "Order Detail",
  description: "Helios Pro ecommerce — full order summary, customer info, items, timeline and actions.",
};

const statusVariant: Record<OrderStatus, "success" | "info" | "accent" | "warning" | "neutral" | "danger" | "violet"> = {
  Pending: "warning",
  Processing: "info",
  "On hold": "accent",
  Shipped: "violet",
  Delivered: "success",
  Cancelled: "danger",
  Refunded: "neutral",
};

const fmt = (n: number) => `$${n.toFixed(2)}`;

export default function OrderDetailPage() {
  const o = sampleOrder;

  return (
    <div>
      <PageHeader
        title={`Order ${o.id}`}
        description={`Placed on ${o.date} at ${o.time} via ${o.channel}`}
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/orders" },
          { label: "Orders", href: "/ecommerce/orders" },
          { label: o.id },
        ]}
        actions={
          <>
            <Link href="/ecommerce/orders">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="size-4" />
                Back to orders
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <FileTextIcon className="size-4" />
              Print invoice
            </Button>
            <Button variant="primary" size="sm">
              <CheckIcon className="size-4" />
              Mark as fulfilled
            </Button>
          </>
        }
      />

      {/* Status banner */}
      <Card className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={statusVariant[o.status]} size="lg">{o.status}</Badge>
            <span className="text-sm text-dark-5 dark:text-dark-6">·</span>
            <span className="text-sm text-dark-7 dark:text-dark-7">
              Payment: <Badge variant={o.payment === "Paid" ? "success" : o.payment === "Refunded" ? "neutral" : "warning"} size="sm">{o.payment}</Badge>
            </span>
            <span className="text-sm text-dark-5 dark:text-dark-6">·</span>
            <span className="text-sm text-dark-7 dark:text-dark-7">
              Fulfillment: <Badge variant={o.fulfillment === "Delivered" ? "success" : o.fulfillment === "Unfulfilled" ? "neutral" : "info"} size="sm">{o.fulfillment}</Badge>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">Refund</Button>
            <Button variant="outline" size="sm">Email customer</Button>
            <Button variant="soft" size="sm">Cancel order</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Order total" value={fmt(o.total)} icon={<WalletIcon className="size-5" />} tone="primary" />
        <StatCard label="Items" value={o.items.reduce((s, i) => s + i.qty, 0)} icon={<ShoppingBagIcon className="size-5" />} tone="accent" sublabel={`${o.items.length} line items`} />
        <StatCard label="Shipping" value={o.shipping === 0 ? "Free" : fmt(o.shipping)} icon={<TruckIcon className="size-5" />} tone="violet" />
        <StatCard label="Channel" value={o.channel} icon={<ShoppingCartIcon className="size-5" />} tone="info" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left: items + timeline */}
        <div className="space-y-6">
          {/* Items */}
          <Card padded={false}>
            <div className="px-5 pt-5 md:px-6 md:pt-6">
              <CardHeader title="Items" subtitle={`${o.items.length} line items`} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-y border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark-2">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Product</th>
                    <th className="w-20 px-2 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Qty</th>
                    <th className="w-32 px-2 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Price</th>
                    <th className="w-32 px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {o.items.map((it) => (
                    <tr key={it.id} className="border-b border-stroke last:border-0 dark:border-dark-3">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={it.image} alt={it.name} className="size-12 rounded-lg object-cover" />
                          <div className="min-w-0">
                            <Link href="/ecommerce/products/detail" className="font-medium text-dark hover:text-primary dark:text-white">{it.name}</Link>
                            <p className="text-xs text-dark-5 dark:text-dark-6">{it.sku}{it.variant ? ` · ${it.variant}` : ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-right text-dark-7 dark:text-dark-7">{it.qty}</td>
                      <td className="px-2 py-3 text-right text-dark-7 dark:text-dark-7">{fmt(it.price)}</td>
                      <td className="px-5 py-3 text-right font-medium text-dark dark:text-white">{fmt(it.price * it.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-stroke p-5 dark:border-dark-3 md:px-6">
              <div className="ml-auto max-w-xs space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Subtotal</span>
                  <span className="text-dark dark:text-white">{fmt(o.subtotal)}</span>
                </div>
                {o.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-dark-5 dark:text-dark-6">Discount {o.discountCode && `(${o.discountCode})`}</span>
                    <span className="text-primary dark:text-primary-light">−{fmt(o.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Shipping</span>
                  <span className="text-dark dark:text-white">{o.shipping === 0 ? "Free" : fmt(o.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Tax</span>
                  <span className="text-dark dark:text-white">{fmt(o.tax)}</span>
                </div>
                <div className="flex justify-between border-t border-stroke pt-2 dark:border-dark-3">
                  <span className="font-semibold text-dark dark:text-white">Total</span>
                  <span className="text-lg font-bold text-dark dark:text-white">{fmt(o.total)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader title="Order timeline" subtitle="Fulfillment and payment events" />
            <Timeline
              events={o.timeline.map((e) => ({
                title: e.title,
                description: e.description,
                time: e.time,
                tone: e.tone,
                icon: e.tone === "success" ? (
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : undefined,
              }))}
            />
          </Card>
        </div>

        {/* Right: customer, shipping, payment */}
        <div className="space-y-6">
          {/* Customer */}
          <Card>
            <CardHeader title="Customer" action={<Link href="/ecommerce/customers/detail"><Button variant="ghost" size="sm">View profile</Button></Link>} />
            <div className="flex items-center gap-3">
              <Avatar name={o.customer} src={o.customerAvatar} size="lg" />
              <div className="min-w-0">
                <p className="font-semibold text-dark dark:text-white">{o.customer}</p>
                <p className="truncate text-xs text-dark-5 dark:text-dark-6">{o.customerEmail}</p>
                {o.shippingAddress.phone && <p className="text-xs text-dark-5 dark:text-dark-6">{o.shippingAddress.phone}</p>}
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-stroke pt-4 text-sm dark:border-dark-3">
              <div className="flex justify-between">
                <span className="text-dark-5 dark:text-dark-6">Channel</span>
                <span className="font-medium text-dark dark:text-white">{o.channel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-5 dark:text-dark-6">Order date</span>
                <span className="text-dark dark:text-white">{o.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-5 dark:text-dark-6">Order time</span>
                <span className="text-dark dark:text-white">{o.time}</span>
              </div>
            </div>
          </Card>

          {/* Shipping address */}
          <Card>
            <CardHeader title="Shipping address" action={<MapPinIcon className="size-5 text-dark-5" />} />
            <address className="not-italic text-sm text-dark-7 dark:text-dark-7">
              <p className="font-medium text-dark dark:text-white">{o.shippingAddress.name}</p>
              <p>{o.shippingAddress.line1}</p>
              {o.shippingAddress.line2 && <p>{o.shippingAddress.line2}</p>}
              <p>{o.shippingAddress.city}, {o.shippingAddress.state} {o.shippingAddress.zip}</p>
              <p>{o.shippingAddress.country}</p>
            </address>
            <div className="mt-4 border-t border-stroke pt-4 dark:border-dark-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Shipping method</p>
              <p className="mt-1 text-sm font-medium text-dark dark:text-white">{o.shippingMethod}</p>
              {o.tracking && (
                <div className="mt-3 rounded-lg bg-gray-2 p-3 dark:bg-dark-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-dark-5 dark:text-dark-6">Carrier</span>
                    <span className="font-medium text-dark dark:text-white">{o.tracking.carrier}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-dark-5 dark:text-dark-6">Tracking #</span>
                    <a href={o.tracking.url || "#"} className="font-mono font-medium text-primary hover:underline dark:text-primary-light">{o.tracking.number}</a>
                  </div>
                  <Progress value={o.fulfillment === "Delivered" ? 100 : o.fulfillment === "Shipped" ? 70 : 30} tone="primary" className="mt-3" />
                  <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{o.fulfillment === "Delivered" ? "Delivered" : "In transit"}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader title="Payment" action={<CreditCardIcon className="size-5 text-dark-5" />} />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-dark-5 dark:text-dark-6">Method</span>
                <span className="font-medium text-dark dark:text-white">{o.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-5 dark:text-dark-6">Status</span>
                <Badge variant={o.payment === "Paid" ? "success" : o.payment === "Refunded" ? "neutral" : "warning"} size="sm">{o.payment}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-5 dark:text-dark-6">Amount</span>
                <span className="font-semibold text-dark dark:text-white">{fmt(o.total)}</span>
              </div>
            </div>
            <div className="mt-4 border-t border-stroke pt-4 dark:border-dark-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Billing address</p>
              <address className="mt-2 not-italic text-xs text-dark-7 dark:text-dark-7">
                <p className="font-medium text-dark dark:text-white">{o.billingAddress.name}</p>
                <p>{o.billingAddress.line1}</p>
                <p>{o.billingAddress.city}, {o.billingAddress.state} {o.billingAddress.zip}</p>
                <p>{o.billingAddress.country}</p>
              </address>
            </div>
          </Card>

          {/* Notes */}
          {o.notes && (
            <Card>
              <CardHeader title="Notes" action={<FileTextIcon className="size-5 text-dark-5" />} />
              <p className="text-sm text-dark-7 dark:text-dark-7">{o.notes}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
