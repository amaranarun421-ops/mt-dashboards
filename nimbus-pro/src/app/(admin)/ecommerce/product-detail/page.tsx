"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Tabs, Avatar } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { PRODUCTS, REVIEWS } from "@/data/mock";
import { cn, formatCurrency, formatNumber, initials } from "@/lib/utils";
import {
  ChevronLeft, Pencil, Trash2, ShoppingCart, Star, Truck, Shield,
  RefreshCw, Minus, Plus, MapPin, Package, TrendingUp, Building2, History,
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

const SIZES = ["S", "M", "L", "XL"];
const COLORS_SWATCH: { name: string; cls: string }[] = [
  { name: "Midnight", cls: "bg-gray-900" },
  { name: "Sand", cls: "bg-amber-200" },
  { name: "Forest", cls: "bg-emerald-600" },
  { name: "Sky", cls: "bg-sky-400" },
];

const WAREHOUSES = [
  { name: "Mumbai", onHand: 86, reserved: 12, available: 74, address: "BKC, Mumbai, IN" },
  { name: "Singapore", onHand: 64, reserved: 8, available: 56, address: "Tuas, SG" },
  { name: "London", onHand: 34, reserved: 4, available: 30, address: "Heathrow, UK" },
];

export default function ProductDetailPage() {
  const product = PRODUCTS[0]; // Aurora Wireless Headphones
  const [tab, setTab] = useState("description");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Midnight");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const compareAt = Math.round(product.price * 1.2);
  const salesData = [12, 18, 14, 22, 28, 24, 32, 30, 36, 42, 38, 44, 40, 48, 52, 46, 58, 54, 62, 60, 56, 64, 70, 66, 72, 68, 74, 80, 76, 84];

  const salesOptions = {
    ...baseChartOptions("area"),
    colors: ["#10b981"],
    stroke: { curve: "smooth", width: 2.5 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: salesData.map((_, i) => `Day ${i + 1}`), labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
    grid: { show: false, padding: { left: 0, right: 0, top: 0, bottom: 0 } },
    tooltip: { x: { format: "dd MMM" } },
  };

  const tabs = [
    { value: "description", label: "Description" },
    { value: "specifications", label: "Specifications" },
    { value: "reviews", label: "Reviews", count: product.reviews },
    { value: "activity", label: "Activity" },
  ];

  const activityFeed = [
    { user: "Aaroh Sharma", action: "updated price", from: "$229", to: formatCurrency(product.price), time: "2h ago" },
    { user: "Priya Iyer", action: "added 24 units to inventory", from: "Mumbai", to: "+24", time: "6h ago" },
    { user: "Marcus Chen", action: "edited description", time: "1d ago" },
    { user: "Sofia García", action: "tagged as 'best-seller'", time: "2d ago" },
  ];

  const productReviews = REVIEWS.slice(0, 2);

  return (
    <div className="space-y-4">
      <PageHeader
        title={product.name}
        description={`${product.sku} · ${product.category} · ${formatCurrency(product.price)}`}
        breadcrumbs={[
          { label: "Ecommerce" },
          { label: "Products", href: "/ecommerce/products" },
          { label: "Detail" },
        ]}
        actions={
          <>
            <Link href="/ecommerce/products"><Button variant="secondary"><ChevronLeft className="h-4 w-4" /> Back</Button></Link>
            <Button variant="danger"><Trash2 className="h-4 w-4" /> Delete</Button>
            <Link href="/ecommerce/product-edit"><Button><Pencil className="h-4 w-4" /> Edit</Button></Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left column: gallery + info + tabs */}
        <div className="space-y-4">
          {/* Gallery */}
          <Card className="overflow-hidden">
            <div className={cn("flex aspect-[16/9] items-center justify-center bg-gradient-to-br text-white", COLOR_TONE[product.color] ?? COLOR_TONE.brand)}>
              <span className="text-6xl font-bold">{initials(product.name)}</span>
            </div>
            <div className="flex gap-2 p-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "flex h-16 w-20 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white transition-all",
                    COLOR_TONE[product.color] ?? COLOR_TONE.brand,
                    activeImg === i ? "ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-gray-900" : "opacity-70 hover:opacity-100"
                  )}
                >
                  {initials(product.name)}{i + 1}
                </button>
              ))}
              <button className="flex h-16 w-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-xs font-medium text-gray-400 hover:border-brand-300 hover:text-brand-500 dark:border-gray-700">
                + Upload
              </button>
            </div>
          </Card>

          {/* Product info */}
          <Card>
            <CardBody className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge tone="success" variant="soft" dot>Active</Badge>
                    <Badge tone="gray" variant="outline">{product.category}</Badge>
                    <Badge tone="purple" variant="soft">Best seller</Badge>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {product.sku} · Barcode: 8901 2456 7790</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</span>
                    <span className="text-sm text-gray-400 line-through">{formatCurrency(compareAt)}</span>
                  </div>
                  <Badge tone="success" variant="soft" dot>Save {formatCurrency(compareAt - product.price)}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 border-y border-gray-100 py-3 dark:border-gray-800">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={cn("h-4 w-4", i <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700")} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.rating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">· {formatNumber(product.reviews)} reviews</span>
                <span className="text-gray-200 dark:text-gray-700">|</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{formatNumber(product.reviews * 3)} sold</span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                Premium over-ear headphones with industry-leading active noise cancellation, 40-hour battery life, and a custom 40mm driver tuned for studio-grade accuracy. Includes USB-C fast charging and multipoint Bluetooth 5.3.
              </p>

              {/* Variants */}
              <div className="space-y-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Color — <span className="text-gray-900 dark:text-white">{color}</span></p>
                  <div className="flex items-center gap-2">
                    {COLORS_SWATCH.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setColor(c.name)}
                        aria-label={c.name}
                        className={cn("h-9 w-9 rounded-full ring-2 ring-offset-2 transition-all dark:ring-offset-gray-900", c.cls, color === c.name ? "ring-brand-500" : "ring-transparent hover:ring-gray-300")}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Size</p>
                  <div className="flex items-center gap-2">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={cn("inline-flex h-9 min-w-[2.5rem] items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors", size === s ? "border-brand-500 bg-brand-500 text-white" : "border-gray-200 text-gray-700 hover:border-brand-300 dark:border-gray-800 dark:text-gray-300")}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stock + qty + actions */}
              <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-success-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In stock — {formatNumber(product.stock)} units</span>
                </div>
                <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-800">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="inline-flex h-9 w-9 items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
                  <input value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} className="h-9 w-12 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none dark:text-white" />
                  <button onClick={() => setQty((q) => q + 1)} className="inline-flex h-9 w-9 items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <Button><ShoppingCart className="h-4 w-4" /> Add to Cart</Button>
                <Button variant="outline"><RefreshCw className="h-4 w-4" /> Add to compare</Button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                {[
                  { icon: Truck, title: "Free shipping", desc: "On orders over $50" },
                  { icon: Shield, title: "2-year warranty", desc: "Full coverage" },
                  { icon: RefreshCw, title: "30-day returns", desc: "No questions asked" },
                ].map((b) => (
                  <div key={b.title} className="flex items-start gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"><b.icon className="h-4 w-4" /></div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{b.title}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Tabs */}
          <Card>
            <Tabs tabs={tabs} value={tab} onChange={setTab} className="border-b border-gray-100 p-4 dark:border-gray-800" />
            <CardBody>
              {tab === "description" && (
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <p>The {product.name} delivers studio-grade sound with best-in-class noise cancellation. Designed for audiophiles and professionals who refuse compromise.</p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {["Active noise cancellation (ANC) up to 35dB", "40-hour battery life with ANC on", "USB-C fast charge — 5 min for 4 hours", "Multipoint Bluetooth 5.3 connectivity", "Memory foam ear cushions", "Detachable braided cable included"].map((f) => (
                      <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tab === "specifications" && (
                <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                        ["Driver", "40mm dynamic"],
                        ["Frequency response", "20Hz – 40kHz"],
                        ["Impedance", "32Ω"],
                        ["Battery", "1200mAh, 40h ANC on"],
                        ["Charging", "USB-C, 5min = 4h playback"],
                        ["Weight", "248g"],
                        ["Connectivity", "Bluetooth 5.3, 3.5mm, USB-C"],
                        ["Microphone", "6-mic array with beamforming"],
                      ].map(([k, v], i) => (
                        <tr key={k} className={cn(i % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-800/30" : "")}>
                          <td className="w-1/3 px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300">{k}</td>
                          <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {tab === "reviews" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/40">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">{product.rating}</p>
                      <div className="mt-1 flex items-center justify-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={cn("h-3.5 w-3.5", i <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700")} />)}
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatNumber(product.reviews)} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const pct = star === 5 ? 68 : star === 4 ? 22 : star === 3 ? 7 : star === 2 ? 2 : 1;
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs">
                            <span className="w-3 text-gray-500 dark:text-gray-400">{star}</span>
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"><div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} /></div>
                            <span className="w-8 text-right text-gray-500 dark:text-gray-400">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {productReviews.map((r) => (
                      <div key={r.id} className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={r.customer} size={32} />
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{r.customer}</p>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={cn("h-3 w-3", i <= r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700")} />)}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{r.date}</span>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{r.title}</p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{r.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === "activity" && (
                <ol className="relative space-y-5 border-l border-gray-200 pl-5 dark:border-gray-800">
                  {activityFeed.map((a, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[26px] flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 ring-4 ring-white dark:ring-gray-900">
                        <History className="h-2 w-2 text-white" />
                      </span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold text-gray-900 dark:text-white">{a.user}</span> {a.action}
                        {a.from && a.to && <> · <span className="text-gray-500">{a.from} → {a.to}</span></>}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.time}</p>
                    </li>
                  ))}
                </ol>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Vendor */}
          <Card>
            <CardHeader title="Vendor" description="Supplier & fulfillment partner" />
            <CardBody className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Aurora Audio Co.</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Vendor since 2022 · Tier 1</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Lead time</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">5–7 days</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">On-time rate</p>
                  <p className="text-sm font-semibold text-success-600 dark:text-success-400">98.4%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Min order</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">50 units</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Defect rate</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">0.3%</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Inventory levels */}
          <Card>
            <CardHeader title="Inventory by warehouse" description="Live stock across locations" action={<Badge tone="success" variant="soft" dot>Synced</Badge>} />
            <CardBody className="space-y-3">
              {WAREHOUSES.map((w) => (
                <div key={w.name} className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{w.name}</span>
                    </div>
                    <Badge tone="gray" variant="soft">{w.available} avail</Badge>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{w.address}</p>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                    <div><p className="font-semibold text-gray-900 dark:text-white">{w.onHand}</p><p className="text-gray-500 dark:text-gray-400">on hand</p></div>
                    <div><p className="font-semibold text-warning-600 dark:text-warning-400">{w.reserved}</p><p className="text-gray-500 dark:text-gray-400">reserved</p></div>
                    <div><p className="font-semibold text-success-600 dark:text-success-400">{w.available}</p><p className="text-gray-500 dark:text-gray-400">available</p></div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Sales chart */}
          <Card>
            <CardHeader
              title="Sales — last 30 days"
              description="Units sold per day"
              action={<Badge tone="success" variant="soft" dot><TrendingUp className="h-3 w-3" />+18%</Badge>}
            />
            <CardBody>
              <NimbusChart options={salesOptions} series={[{ name: "Units", data: salesData }]} type="area" height={160} />
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Units sold (30d)</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">1,482</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Revenue (30d)</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(1482 * product.price)}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardBody className="space-y-2">
              <Button variant="outline" className="w-full justify-start"><Package className="h-4 w-4" /> View inventory log</Button>
              <Button variant="outline" className="w-full justify-start"><Truck className="h-4 w-4" /> Create transfer order</Button>
              <Button variant="outline" className="w-full justify-start"><TrendingUp className="h-4 w-4" /> View sales analytics</Button>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
