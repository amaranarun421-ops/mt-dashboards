"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import {
  ArrowLeftIcon,
  EditIcon,
  CheckIcon,
  UploadIcon,
  PackageIcon,
  TagIcon,
  BoxIcon,
  ShoppingCartIcon,
} from "@/components/Layouts/sidebar/icons";
import type { Product } from "@/data/ecommerce/products";

export type ProductFormMode = "create" | "edit";

type Variant = { id: string; name: string; options: string };

type FormProps = {
  mode: ProductFormMode;
  initialValues?: Product;
};

const CATEGORIES = ["Audio", "Wearables", "Home Office", "Video", "Peripherals", "Power", "Smart Home", "Parts"];
const BRANDS = ["Helios Audio", "Helios Wear", "Helios Home", "Helios Vision", "Helios Input", "Helios Power"];
const WAREHOUSES = ["Seattle, WA", "Newark, NJ", "Dallas, TX", "Rotterdam, NL", "Shanghai, CN"];
const STATUSES: Product["status"][] = ["Active", "Draft", "Archived", "Out of stock"];

export default function ProductForm({ mode, initialValues }: FormProps) {
  const isEdit = mode === "edit";

  const [name, setName] = useState(initialValues?.name ?? "");
  const [sku, setSku] = useState(initialValues?.sku ?? "");
  const [brand, setBrand] = useState(initialValues?.brand ?? BRANDS[0]);
  const [category, setCategory] = useState(initialValues?.category ?? CATEGORIES[0]);
  const [vendor, setVendor] = useState(initialValues?.vendor ?? "");
  const [warehouse, setWarehouse] = useState(initialValues?.warehouse ?? WAREHOUSES[0]);
  const [status, setStatus] = useState<Product["status"]>(initialValues?.status ?? "Active");
  const [shortDescription, setShortDescription] = useState(initialValues?.shortDescription ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");

  // Pricing
  const [price, setPrice] = useState<number>(initialValues?.price ?? 0);
  const [compareAt, setCompareAt] = useState<number>(initialValues?.compareAt ?? 0);
  const [cost, setCost] = useState<number>(initialValues?.cost ?? 0);

  // Inventory
  const [stock, setStock] = useState<number>(initialValues?.stock ?? 0);
  const [reorderPoint, setReorderPoint] = useState<number>(initialValues?.lowStockThreshold ?? 0);
  const [reorderQty, setReorderQty] = useState<number>(0);
  const [barcode, setBarcode] = useState("");

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialValues?.seo.title ?? "");
  const [slug, setSlug] = useState(initialValues?.seo.slug ?? "");
  const [metaDescription, setMetaDescription] = useState(initialValues?.seo.metaDescription ?? "");
  const [tags, setTags] = useState((initialValues?.tags ?? []).join(", "));

  // Variants
  const [variants, setVariants] = useState<Variant[]>(
    initialValues?.variants?.map((v, i) => ({ id: `v${i + 1}`, name: v.name, options: v.options.join(", ") })) ?? [
      { id: "v1", name: "Color", options: "Black, White, Sand" },
    ],
  );

  const margin = price - cost;
  const marginPct = price > 0 ? (margin / price) * 100 : 0;

  function addVariant() {
    setVariants((prev) => [...prev, { id: `v${Date.now()}`, name: "", options: "" }]);
  }

  function removeVariant(id: string) {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  }

  function updateVariant(id: string, patch: Partial<Variant>) {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? `Edit ${initialValues?.name || "product"}` : "Add new product"}
        description={
          isEdit
            ? "Update product details, pricing, inventory and SEO. Changes are visible immediately."
            : "Create a new product with full pricing, inventory and SEO configuration."
        }
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/products" },
          { label: "Products", href: "/ecommerce/products" },
          { label: isEdit ? "Edit" : "Add" },
        ]}
        actions={
          <>
            <Link href="/ecommerce/products">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="size-4" />
                Cancel
              </Button>
            </Link>
            <Button variant="outline" size="sm">Save draft</Button>
            <Button variant="primary" size="sm">
              <CheckIcon className="size-4" />
              {isEdit ? "Save changes" : "Publish product"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left: form sections */}
        <div className="space-y-6">
          {/* Basic info */}
          <FormSection
            title="Basic information"
            description="The core product details shown across your store."
          >
            <FormField label="Product name" htmlFor="name" required>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Helios Aero Wireless Headphones"
                className={inputClass}
              />
            </FormField>
            <FormField label="SKU" htmlFor="sku" required hint="Stock keeping unit — unique across your catalog.">
              <input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="HLP-AERO-01"
                className={inputClass}
              />
            </FormField>
            <FormField label="Brand" htmlFor="brand">
              <select id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClass}>
                {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </FormField>
            <FormField label="Category" htmlFor="category">
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Vendor" htmlFor="vendor">
              <input
                id="vendor"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="Helios Direct"
                className={inputClass}
              />
            </FormField>
            <FormField label="Warehouse" htmlFor="warehouse">
              <select id="warehouse" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className={inputClass}>
                {WAREHOUSES.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </FormField>
            <FormField label="Status" htmlFor="status">
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Product["status"])}
                className={inputClass}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Short description" htmlFor="shortDescription" hint="Shown on product cards and search results.">
              <input
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="One-line summary"
                className={inputClass}
              />
            </FormField>
            <FormField label="Full description" htmlFor="description" hint="Markdown supported.">
              <textarea
                id="description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Full marketing copy for the product page..."
                className={`${inputClass} resize-none`}
              />
            </FormField>
          </FormSection>

          {/* Media */}
          <FormSection title="Media" description="Upload product images. First image is the primary." columns={1}>
            <div className="rounded-xl border-2 border-dashed border-stroke p-8 text-center transition hover:border-primary/40 dark:border-dark-3">
              <div className="mx-auto grid size-12 place-items-center rounded-xl bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                <UploadIcon className="size-6" />
              </div>
              <p className="mt-3 text-sm font-medium text-dark dark:text-white">Drop images here or click to upload</p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">PNG, JPG, WEBP up to 5MB · 1200×1200 recommended</p>
              <Button variant="outline" size="sm" className="mt-4">Browse files</Button>
            </div>
            {initialValues && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {initialValues.gallery.slice(0, 4).map((g, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g} alt={`Preview ${i + 1}`} className="size-full object-cover" />
                    {i === 0 && <Badge variant="primary" size="sm" className="absolute left-1.5 top-1.5">Primary</Badge>}
                  </div>
                ))}
              </div>
            )}
          </FormSection>

          {/* Pricing */}
          <FormSection title="Pricing" description="Set price, compare-at and cost for margin tracking.">
            <FormField label="Price (USD)" htmlFor="price" required>
              <input
                id="price"
                type="number"
                min={0}
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))}
                className={inputClass}
              />
            </FormField>
            <FormField label="Compare-at price" htmlFor="compareAt" hint="Original price — shown as struck-through.">
              <input
                id="compareAt"
                type="number"
                min={0}
                step="0.01"
                value={compareAt}
                onChange={(e) => setCompareAt(Math.max(0, Number(e.target.value) || 0))}
                className={inputClass}
              />
            </FormField>
            <FormField label="Cost per item" htmlFor="cost" hint="Used to calculate margin. Not shown to customers.">
              <input
                id="cost"
                type="number"
                min={0}
                step="0.01"
                value={cost}
                onChange={(e) => setCost(Math.max(0, Number(e.target.value) || 0))}
                className={inputClass}
              />
            </FormField>
            <FormField label="Tax code" htmlFor="tax">
              <select id="tax" className={inputClass}>
                <option>Standard rate</option>
                <option>Reduced rate</option>
                <option>Zero rate</option>
                <option>Exempt</option>
              </select>
            </FormField>
          </FormSection>

          {/* Inventory */}
          <FormSection title="Inventory" description="Stock levels, reorder points and barcode.">
            <FormField label="Stock on hand" htmlFor="stock">
              <input
                id="stock"
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(Math.max(0, Number(e.target.value) || 0))}
                className={inputClass}
              />
            </FormField>
            <FormField label="Reorder point" htmlFor="reorderPoint" hint="Trigger low-stock alert at this level.">
              <input
                id="reorderPoint"
                type="number"
                min={0}
                value={reorderPoint}
                onChange={(e) => setReorderPoint(Math.max(0, Number(e.target.value) || 0))}
                className={inputClass}
              />
            </FormField>
            <FormField label="Reorder quantity" htmlFor="reorderQty">
              <input
                id="reorderQty"
                type="number"
                min={0}
                value={reorderQty}
                onChange={(e) => setReorderQty(Math.max(0, Number(e.target.value) || 0))}
                className={inputClass}
              />
            </FormField>
            <FormField label="Barcode (EAN/UPC)" htmlFor="barcode">
              <input
                id="barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="0 12345 67890 5"
                className={inputClass}
              />
            </FormField>
          </FormSection>

          {/* Variants */}
          <Card padded={false}>
            <div className="flex items-center justify-between border-b border-stroke p-5 dark:border-dark-3">
              <div>
                <h3 className="text-base font-semibold text-dark dark:text-white">Variants</h3>
                <p className="text-sm text-dark-5 dark:text-dark-6">Add options like Color or Size.</p>
              </div>
              <Button variant="soft" size="sm" onClick={addVariant}>
                <EditIcon className="size-4" />
                Add variant
              </Button>
            </div>
            <div className="space-y-4 p-5">
              {variants.length === 0 && (
                <p className="text-sm text-dark-5 dark:text-dark-6">No variants. This product has a single SKU.</p>
              )}
              {variants.map((v) => (
                <div key={v.id} className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_2fr_auto]">
                  <input
                    value={v.name}
                    onChange={(e) => updateVariant(v.id, { name: e.target.value })}
                    placeholder="Option name (e.g. Color)"
                    className={inputClass}
                  />
                  <input
                    value={v.options}
                    onChange={(e) => updateVariant(v.id, { options: e.target.value })}
                    placeholder="Comma-separated options (e.g. Black, White)"
                    className={inputClass}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeVariant(v.id)} aria-label="Remove variant">
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* SEO */}
          <FormSection title="SEO" description="Control how this product appears in search engines." columns={1}>
            <FormField label="SEO title" htmlFor="seoTitle" hint={`${seoTitle.length} / 60 characters`}>
              <input
                id="seoTitle"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Helios Aero Wireless Headphones — Active Noise Cancelling"
                className={inputClass}
              />
            </FormField>
            <FormField label="URL slug" htmlFor="slug">
              <div className="flex items-center overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
                <span className="bg-gray-2 px-3 py-2.5 text-sm text-dark-5 dark:bg-dark-2 dark:text-dark-6">/products/</span>
                <input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="helios-aero-wireless-headphones"
                  className="flex-1 border-0 bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                />
              </div>
            </FormField>
            <FormField label="Meta description" htmlFor="metaDescription" hint={`${metaDescription.length} / 160 characters`}>
              <textarea
                id="metaDescription"
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Studio-grade sound with 40-hour battery, hybrid ANC, and multipoint Bluetooth 5.3."
                className={`${inputClass} resize-none`}
              />
            </FormField>
            <FormField label="Tags" htmlFor="tags" hint="Comma-separated keywords.">
              <input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="audio, premium, wireless"
                className={inputClass}
              />
            </FormField>
          </FormSection>
        </div>

        {/* Right: summary sidebar */}
        <div className="space-y-6">
          <Card padded={false}>
            <div className="border-b border-stroke p-5 dark:border-dark-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Live price</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-dark dark:text-white">
                    ${price.toFixed(2)}
                  </p>
                </div>
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                  <TagIcon className="size-6" />
                </span>
              </div>
              <div className="mt-4 space-y-2 border-t border-stroke pt-4 text-sm dark:border-dark-3">
                <div className="flex items-center justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Compare-at</span>
                  <span className="font-medium text-dark dark:text-white">{compareAt > 0 ? `$${compareAt.toFixed(2)}` : "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Cost</span>
                  <span className="font-medium text-dark dark:text-white">${cost.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Margin / unit</span>
                  <span className={`font-medium ${margin > 0 ? "text-primary dark:text-primary-light" : "text-red"}`}>
                    ${margin.toFixed(2)} ({marginPct.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-stroke pt-2 dark:border-dark-3">
                  <span className="text-dark-5 dark:text-dark-6">Stock value</span>
                  <span className="font-semibold text-dark dark:text-white">${(stock * cost).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 p-5">
              <Button variant="primary" size="md" className="w-full">
                <CheckIcon className="size-4" />
                {isEdit ? "Save changes" : "Publish product"}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">Save draft</Button>
                <Button variant="outline" size="sm">Preview</Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Summary" />
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Product name</dt>
                <dd className="text-right text-dark dark:text-white">{name || "—"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">SKU</dt>
                <dd className="font-mono text-dark dark:text-white">{sku || "—"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Category</dt>
                <dd className="text-dark dark:text-white">{category}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Brand</dt>
                <dd className="text-dark dark:text-white">{brand}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Status</dt>
                <dd>
                  <Badge variant={status === "Active" ? "success" : status === "Out of stock" ? "danger" : status === "Draft" ? "neutral" : "warning"} size="sm">
                    {status}
                  </Badge>
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Variants</dt>
                <dd className="text-dark dark:text-white">{variants.filter((v) => v.name).length}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Stock</dt>
                <dd className="font-medium text-dark dark:text-white">{stock}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <CardHeader title="Checklist" />
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${name ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"}`} />
                <span className={name ? "text-dark-7 dark:text-dark-7" : "text-dark-5 dark:text-dark-6"}>Product name set</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${sku ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"}`} />
                <span className={sku ? "text-dark-7 dark:text-dark-7" : "text-dark-5 dark:text-dark-6"}>SKU assigned</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${price > 0 ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"}`} />
                <span className={price > 0 ? "text-dark-7 dark:text-dark-7" : "text-dark-5 dark:text-dark-6"}>Price set</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${description.length > 0 ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"}`} />
                <span className={description.length > 0 ? "text-dark-7 dark:text-dark-7" : "text-dark-5 dark:text-dark-6"}>Description written</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${seoTitle.length > 0 ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"}`} />
                <span className={seoTitle.length > 0 ? "text-dark-7 dark:text-dark-7" : "text-dark-5 dark:text-dark-6"}>SEO optimized</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${stock > 0 ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"}`} />
                <span className={stock > 0 ? "text-dark-7 dark:text-dark-7" : "text-dark-5 dark:text-dark-6"}>Inventory added</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
