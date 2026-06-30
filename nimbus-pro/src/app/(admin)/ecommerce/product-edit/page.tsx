"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Input, Label, Select, Textarea, Switch } from "@/components/ui";
import { PRODUCTS } from "@/data/mock";
import { cn, formatCurrency, initials } from "@/lib/utils";
import {
  ChevronLeft, Save, Eye, Trash2, History, Plus, Tag, Package, DollarSign,
  Truck, Layers, Settings2, Star, AlertTriangle,
} from "lucide-react";

const CATEGORIES = ["Audio", "Peripherals", "Cameras", "Office", "Accessories", "Smart Home", "Wearables", "Displays"];

function SectionTitle({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"><Icon className="h-4 w-4" /></div>
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

export default function ProductEditPage() {
  const base = PRODUCTS[0]; // Aurora Wireless Headphones
  const [name, setName] = useState(base.name);
  const [sku, setSku] = useState(base.sku);
  const [category, setCategory] = useState(base.category);
  const [brand, setBrand] = useState("Aurora Audio Co.");
  const [description, setDescription] = useState("Premium over-ear headphones with industry-leading active noise cancellation, 40-hour battery life, and a custom 40mm driver tuned for studio-grade accuracy. Includes USB-C fast charging and multipoint Bluetooth 5.3.");
  const [price, setPrice] = useState(base.price);
  const [compareAt, setCompareAt] = useState(Math.round(base.price * 1.2));
  const [cost, setCost] = useState(base.cost);
  const [stock, setStock] = useState(base.stock);
  const [barcode, setBarcode] = useState("8901 2456 7790");
  const [weight, setWeight] = useState(248);
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(18);
  const [height, setHeight] = useState(8);
  const [freeShipping, setFreeShipping] = useState(true);
  const [trackInventory, setTrackInventory] = useState(true);
  const [tags, setTags] = useState<string[]>(["best-seller", "premium", "anc"]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<"active" | "draft">("active");

  const margin = price > 0 ? Math.round(((price - cost) / price) * 100) : 0;
  const profit = price - cost;

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags((p) => [...p, t]);
    setTagInput("");
  };

  const recentEdits = [
    { user: "Aaroh Sharma", action: "Updated price from $229 to $249", time: "2h ago" },
    { user: "Priya Iyer", action: "Added 24 units to Mumbai warehouse", time: "6h ago" },
    { user: "Marcus Chen", action: "Edited product description", time: "1d ago" },
    { user: "Sofia García", action: "Tagged as 'best-seller'", time: "2d ago" },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Edit Product"
        description="Update an existing product in your catalog."
        breadcrumbs={[
          { label: "Ecommerce" },
          { label: "Products", href: "/ecommerce/products" },
          { label: "Edit" },
        ]}
        actions={
          <>
            <Link href="/ecommerce/product-detail"><Button variant="secondary"><ChevronLeft className="h-4 w-4" /> Cancel</Button></Link>
            <Button variant="danger"><Trash2 className="h-4 w-4" /> Delete</Button>
            <Button variant="secondary"><Eye className="h-4 w-4" /> Save & View</Button>
            <Button><Save className="h-4 w-4" /> Save Changes</Button>
          </>
        }
      />

      {/* Editing banner */}
      <Card className="border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-500/10">
        <CardBody className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white"><History className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">Editing Aurora Wireless Headphones — Last modified 2h ago</p>
              <p className="text-xs text-brand-700 dark:text-brand-300">By Aaroh Sharma · Auto-saved draft available</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="warning" variant="soft" dot>Unsaved changes</Badge>
            <Button variant="outline" size="sm">View diff</Button>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Form */}
        <div className="space-y-4">
          {/* Basic Info */}
          <Card>
            <CardHeader title="" description="" action={<SectionTitle icon={Package} title="Basic Information" desc="Core product details shown to customers" />} className="border-0 p-0" />
            <CardBody className="space-y-4">
              <div>
                <Label required>Product name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label required>SKU</Label>
                  <Input value={sku} onChange={(e) => setSku(e.target.value)} />
                </div>
                <div>
                  <Label required>Category</Label>
                  <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </div>
                <div>
                  <Label>Brand</Label>
                  <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
                <div>
                  <Label>Barcode (GTIN)</Label>
                  <Input value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[120px]" />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description.length} / 2000 characters</p>
              </div>
            </CardBody>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader title="" description="" action={<SectionTitle icon={DollarSign} title="Pricing" desc="Set price, compare-at, and cost" />} className="border-0 p-0" />
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Label required>Price (USD)</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                    <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} className="pl-7" />
                  </div>
                </div>
                <div>
                  <Label>Compare-at price</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                    <Input type="number" value={compareAt} onChange={(e) => setCompareAt(Number(e.target.value) || 0)} className="pl-7" />
                  </div>
                </div>
                <div>
                  <Label>Cost per item</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                    <Input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value) || 0)} className="pl-7" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/40">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Profit / unit</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(profit)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Margin</p>
                  <p className={cn("text-base font-bold", margin >= 40 ? "text-success-600 dark:text-success-400" : margin >= 20 ? "text-warning-600 dark:text-warning-400" : "text-error-600 dark:text-error-400")}>{margin}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Discount</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{compareAt > price ? `${Math.round((1 - price / compareAt) * 100)}%` : "—"}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader title="" description="" action={<SectionTitle icon={Layers} title="Inventory" desc="Track stock and physical attributes" />} className="border-0 p-0" />
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Track inventory</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Automatically reduce stock on each order</p>
                </div>
                <Switch checked={trackInventory} onChange={setTrackInventory} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Label>Stock on hand</Label>
                  <Input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <Label>Weight (g)</Label>
                  <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <Label>Reorder point</Label>
                  <Input type="number" defaultValue={50} />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader title="" description="" action={<SectionTitle icon={Truck} title="Shipping" desc="Dimensions and shipping options" />} className="border-0 p-0" />
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Free shipping</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Waive shipping fees for this product</p>
                </div>
                <Switch checked={freeShipping} onChange={setFreeShipping} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Label>Length (cm)</Label>
                  <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <Label>Width (cm)</Label>
                  <Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value) || 0)} />
                </div>
                <div>
                  <Label>Height (cm)</Label>
                  <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)} />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Organization */}
          <Card>
            <CardHeader title="" description="" action={<SectionTitle icon={Tag} title="Organization" desc="Tags, collections, and grouping" />} className="border-0 p-0" />
            <CardBody className="space-y-4">
              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 p-2 dark:border-gray-800">
                  {tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                      {t}
                      <button onClick={() => setTags((p) => p.filter((x) => x !== t))} aria-label={`Remove ${t}`}><Trash2 className="h-3 w-3" /></button>
                    </span>
                  ))}
                  <div className="flex flex-1 items-center gap-1">
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      placeholder="Add tag..."
                      className="flex-1 border-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                    />
                    <button onClick={addTag} aria-label="Add tag" className="text-gray-400 hover:text-brand-500"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
              <div>
                <Label>Collections</Label>
                <Select defaultValue="premium">
                  <option value="summer">Summer 2026 Collection</option>
                  <option value="audio">Audio Gear</option>
                  <option value="premium">Premium Picks</option>
                  <option value="gift">Gift Ideas</option>
                </Select>
              </div>
            </CardBody>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader title="" description="" action={<SectionTitle icon={Settings2} title="Status & Visibility" desc="Control where and when this product appears" />} className="border-0 p-0" />
            <CardBody className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setStatus("active")}
                  className={cn("rounded-xl border p-4 text-left transition-all", status === "active" ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-brand-300 dark:border-gray-800")}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Active</span>
                    {status === "active" && <Badge tone="brand" variant="solid">Selected</Badge>}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Visible on storefront, can be purchased</p>
                </button>
                <button
                  onClick={() => setStatus("draft")}
                  className={cn("rounded-xl border p-4 text-left transition-all", status === "draft" ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-brand-300 dark:border-gray-800")}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Draft</span>
                    {status === "draft" && <Badge tone="brand" variant="solid">Selected</Badge>}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Hidden, only visible to staff</p>
                </button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar: preview + activity */}
        <aside className="space-y-4">
          <Card className="sticky top-4">
            <CardHeader title="Live preview" description="How customers will see this" />
            <CardBody className="space-y-4">
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                <span className="text-3xl font-bold">{initials(name)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge tone={status === "active" ? "success" : "gray"} variant="soft" dot>{status === "active" ? "Active" : "Draft"}</Badge>
                  <Badge tone="gray" variant="outline">{category}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{sku}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(price)}</span>
                  {compareAt > price && <span className="text-xs text-gray-400 line-through">{formatCurrency(compareAt)}</span>}
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={cn("h-3 w-3", i <= Math.round(base.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700")} />)}
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{base.rating} ({base.reviews} reviews)</span>
                </div>
              </div>
              <div className="space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Stock</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stock} units</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Profit / unit</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(profit)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Margin</span>
                  <span className={cn("font-semibold", margin >= 40 ? "text-success-600 dark:text-success-400" : "text-warning-600 dark:text-warning-400")}>{margin}%</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Activity log */}
          <Card>
            <CardHeader title="Recent edits" description="Audit trail of changes" />
            <CardBody className="space-y-3">
              <ol className="relative space-y-4 border-l border-gray-200 pl-4 dark:border-gray-800">
                {recentEdits.map((e, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-brand-500 ring-2 ring-white dark:ring-gray-900" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{e.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{e.user} · {e.time}</p>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>

          {/* Warning */}
          <Card className="border-warning-200 bg-warning-50 dark:border-warning-800 dark:bg-warning-500/10">
            <CardBody className="flex items-start gap-2 p-4">
              <AlertTriangle className="h-4 w-4 shrink-0 text-warning-600 dark:text-warning-400" />
              <div>
                <p className="text-sm font-semibold text-warning-800 dark:text-warning-200">Editing a live product</p>
                <p className="text-xs text-warning-700 dark:text-warning-300">Changes are visible immediately to customers. Consider using draft mode for major updates.</p>
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
