"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Input, Label, Select, Textarea, Switch } from "@/components/ui";
import { cn, formatCurrency, initials } from "@/lib/utils";
import {
  ChevronLeft, Save, Eye, X, Plus, Tag, Package, DollarSign,
  Truck, Layers, Settings2, Star, ImagePlus, UploadCloud,
} from "lucide-react";

const CATEGORIES = ["Audio", "Peripherals", "Cameras", "Office", "Accessories", "Smart Home", "Wearables", "Displays"];
const TAGS_INIT = ["best-seller", "new-arrival", "premium"];

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

export default function ProductAddPage() {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Audio");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [compareAt, setCompareAt] = useState(0);
  const [cost, setCost] = useState(0);
  const [stock, setStock] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [weight, setWeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [freeShipping, setFreeShipping] = useState(true);
  const [trackInventory, setTrackInventory] = useState(true);
  const [tags, setTags] = useState<string[]>(TAGS_INIT);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<"active" | "draft">("draft");

  const margin = price > 0 ? Math.round(((price - cost) / price) * 100) : 0;
  const profit = price - cost;

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags((p) => [...p, t]);
    setTagInput("");
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Add Product"
        description="Create a new product in your catalog with full pricing, inventory, and shipping details."
        breadcrumbs={[
          { label: "Ecommerce" },
          { label: "Products", href: "/ecommerce/products" },
          { label: "Add" },
        ]}
        actions={
          <>
            <Link href="/ecommerce/products"><Button variant="secondary"><ChevronLeft className="h-4 w-4" /> Cancel</Button></Link>
            <Button variant="secondary"><Save className="h-4 w-4" /> Save Draft</Button>
            <Button><Eye className="h-4 w-4" /> Publish</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Form */}
        <div className="space-y-4">
          {/* Basic Info */}
          <Card>
            <CardHeader title="" description="" action={<SectionTitle icon={Package} title="Basic Information" desc="Core product details shown to customers" />} className="border-0 p-0" />
            <CardBody className="space-y-4">
              <div>
                <Label required>Product name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aurora Wireless Headphones" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label required>SKU</Label>
                  <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="AUR-WH-001" />
                </div>
                <div>
                  <Label required>Category</Label>
                  <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </div>
                <div>
                  <Label>Brand</Label>
                  <Input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Aurora Audio Co." />
                </div>
                <div>
                  <Label>Barcode (GTIN)</Label>
                  <Input value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="8901 2456 7790" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the product features, materials, and benefits..." className="min-h-[120px]" />
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
                    <Input type="number" value={price || ""} onChange={(e) => setPrice(Number(e.target.value) || 0)} className="pl-7" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <Label>Compare-at price</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                    <Input type="number" value={compareAt || ""} onChange={(e) => setCompareAt(Number(e.target.value) || 0)} className="pl-7" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <Label>Cost per item</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                    <Input type="number" value={cost || ""} onChange={(e) => setCost(Number(e.target.value) || 0)} className="pl-7" placeholder="0.00" />
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
                  <Input type="number" value={stock || ""} onChange={(e) => setStock(Number(e.target.value) || 0)} placeholder="0" />
                </div>
                <div>
                  <Label>Weight (g)</Label>
                  <Input type="number" value={weight || ""} onChange={(e) => setWeight(Number(e.target.value) || 0)} placeholder="0" />
                </div>
                <div>
                  <Label>Reorder point</Label>
                  <Input type="number" placeholder="50" />
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
                  <Input type="number" value={length || ""} onChange={(e) => setLength(Number(e.target.value) || 0)} placeholder="0" />
                </div>
                <div>
                  <Label>Width (cm)</Label>
                  <Input type="number" value={width || ""} onChange={(e) => setWidth(Number(e.target.value) || 0)} placeholder="0" />
                </div>
                <div>
                  <Label>Height (cm)</Label>
                  <Input type="number" value={height || ""} onChange={(e) => setHeight(Number(e.target.value) || 0)} placeholder="0" />
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
                      <button onClick={() => setTags((p) => p.filter((x) => x !== t))} aria-label={`Remove ${t}`}><X className="h-3 w-3" /></button>
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
                <Select defaultValue="">
                  <option value="" disabled>Select collections...</option>
                  <option value="summer">Summer 2026 Collection</option>
                  <option value="audio">Audio Gear</option>
                  <option value="premium">Premium Picks</option>
                  <option value="gift">Gift Ideas</option>
                </Select>
              </div>
            </CardBody>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader title="" description="" action={<SectionTitle icon={ImagePlus} title="Images" desc="Upload product photos (drag-and-drop)" />} className="border-0 p-0" />
            <CardBody className="space-y-3">
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 px-6 py-10 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40 dark:border-gray-700 dark:hover:border-brand-700 dark:hover:bg-brand-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"><UploadCloud className="h-6 w-6" /></div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Drag and drop images here</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, WebP up to 5MB · Max 8 images</p>
                </div>
                <Button variant="secondary" size="sm"><ImagePlus className="h-3.5 w-3.5" /> Browse files</Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="group relative flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-xs font-semibold text-gray-400 dark:from-gray-800 dark:to-gray-700">
                    <ImagePlus className="h-5 w-5" />
                  </div>
                ))}
                <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-xs font-medium text-gray-400 hover:border-brand-300 dark:border-gray-700">+ Add</div>
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

        {/* Sidebar: preview + publish */}
        <aside className="space-y-4">
          <Card className="sticky top-4">
            <CardHeader title="Live preview" description="How customers will see this" />
            <CardBody className="space-y-4">
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-500 text-white">
                <span className="text-3xl font-bold">{name ? initials(name) : "?"}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge tone={status === "active" ? "success" : "gray"} variant="soft" dot>{status === "active" ? "Active" : "Draft"}</Badge>
                  <Badge tone="gray" variant="outline">{category}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{name || "Untitled product"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{sku || "SKU not set"}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{price > 0 ? formatCurrency(price) : "—"}</span>
                  {compareAt > price && <span className="text-xs text-gray-400 line-through">{formatCurrency(compareAt)}</span>}
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3 w-3 fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700" />)}
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">No reviews yet</span>
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

          <Card>
            <CardHeader title="Publish" description="Save your changes" />
            <CardBody className="space-y-2">
              <Button variant="secondary" className="w-full"><Save className="h-4 w-4" /> Save as draft</Button>
              <Button className="w-full"><Eye className="h-4 w-4" /> Publish product</Button>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
