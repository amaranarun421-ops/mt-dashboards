'use client';

import * as React from 'react';
import {
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { useDashboardStore } from '@/lib/dashboard-store';
import { productCategories } from '@/lib/ecommerce-data';
import { cn } from '@/lib/utils';

export function AddProductPage() {
  const { toast } = useToast();
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  const [saving, setSaving] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [variants, setVariants] = React.useState<{ id: string; name: string; options: string }[]>([
    { id: '1', name: 'Color', options: 'Black, White, Silver' },
  ]);
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    category: productCategories[0],
    sku: '',
    price: '',
    compareAtPrice: '',
    stock: '',
    status: 'Active',
    tags: '',
  });

  function setField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Maximum image size is 5MB', variant: 'destructive' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function addVariant() {
    setVariants([...variants, { id: Date.now().toString(), name: '', options: '' }]);
  }

  function removeVariant(id: string) {
    setVariants(variants.filter((v) => v.id !== id));
  }

  function updateVariant(id: string, key: 'name' | 'options', value: string) {
    setVariants(variants.map((v) => (v.id === id ? { ...v, [key]: value } : v)));
  }

  function handleSave(publish: boolean) {
    if (!form.name.trim() || !form.price.trim()) {
      toast({
        title: 'Required fields missing',
        description: 'Product name and price are required',
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: publish ? 'Product published' : 'Draft saved',
        description: `"${form.name}" has been ${publish ? 'published to your store' : 'saved as a draft'}`,
      });
      setEcommerce('products');
    }, 800);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Products' }, { label: 'Add Product' }]}
        title="Add New Product"
        description="Create a new product with images, variants, and pricing."
        actions={
          <>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => setEcommerce('products')}>
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Back</span>
            </button>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => handleSave(false)} disabled={saving}>
              <Save className="size-4" /> Save as draft
            </button>
            <button type="button" className="ds-btn ds-btn-primary" onClick={() => handleSave(true)} disabled={saving}>
              {saving ? (
                <>
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="size-4" /> Publish product
                </>
              )}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Left column — main details */}
        <div className="space-y-4 xl:col-span-2">
          {/* Basic info */}
          <SectionCard title="Basic Information" description="Product name, description, and category">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Product name *</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  className="ds-input"
                  autoFocus
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Description</span>
                <textarea
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  rows={4}
                  placeholder="Describe your product features, benefits, and specifications..."
                  className="ds-input resize-none py-2.5"
                />
                <span className="mt-1 block text-xs font-medium text-[var(--text-muted)]">
                  {form.description.length} / 500 characters
                </span>
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Category</span>
                  <Select
                    value={form.category}
                    onChange={(v) => setField('category', v)}
                    options={productCategories.map((c) => ({ value: c, label: c }))}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Status</span>
                  <Select
                    value={form.status}
                    onChange={(v) => setField('status', v)}
                    options={[
                      { value: 'Active', label: 'Active' },
                      { value: 'Draft', label: 'Draft' },
                      { value: 'Archived', label: 'Archived' },
                    ]}
                  />
                </label>
              </div>
            </div>
          </SectionCard>

          {/* Pricing */}
          <SectionCard title="Pricing" description="Set your product price and compare-at price">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Price (USD) *</span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--text-muted)]">$</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setField('price', e.target.value)}
                    placeholder="0.00"
                    className="ds-input pl-7"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Compare-at price</span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--text-muted)]">$</span>
                  <input
                    type="number"
                    value={form.compareAtPrice}
                    onChange={(e) => setField('compareAtPrice', e.target.value)}
                    placeholder="0.00"
                    className="ds-input pl-7"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Cost per item</span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--text-muted)]">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="ds-input pl-7"
                  />
                </div>
              </label>
            </div>
            {form.price && form.compareAtPrice && parseFloat(form.compareAtPrice) > parseFloat(form.price) && (
              <div className="mt-3 rounded-xl border border-[var(--color-success-100)] bg-[var(--color-success-50)] p-3 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
                <p className="text-xs font-semibold text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">
                  Discount: {Math.round(((parseFloat(form.compareAtPrice) - parseFloat(form.price)) / parseFloat(form.compareAtPrice)) * 100)}% off
                </p>
              </div>
            )}
          </SectionCard>

          {/* Inventory */}
          <SectionCard title="Inventory" description="Stock and SKU tracking">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">SKU</span>
                <input
                  type="text"
                  value={form.sku}
                  onChange={(e) => setField('sku', e.target.value)}
                  placeholder="e.g. AUD-NC-001"
                  className="ds-input font-mono"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Stock quantity</span>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setField('stock', e.target.value)}
                  placeholder="0"
                  className="ds-input"
                />
              </label>
            </div>
          </SectionCard>

          {/* Variants */}
          <SectionCard
            title="Variants"
            description="Add variants like size, color, or material"
            actions={
              <button type="button" className="ds-btn ds-btn-secondary !h-9 !text-xs" onClick={addVariant}>
                <Plus className="size-3.5" /> Add variant
              </button>
            }
          >
            {variants.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-[var(--border-strong)] p-6 text-center">
                <p className="text-sm font-semibold text-[var(--text-strong)]">No variants yet</p>
                <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Add variants if your product comes in different sizes, colors, etc.</p>
                <button type="button" className="ds-btn ds-btn-primary mt-3 !h-9 !text-xs" onClick={addVariant}>
                  <Plus className="size-3.5" /> Add first variant
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {variants.map((variant) => (
                  <div key={variant.id} className="flex items-end gap-3 rounded-xl border border-[var(--border-subtle)] p-3">
                    <label className="block flex-1">
                      <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Variant name</span>
                      <input
                        type="text"
                        value={variant.name}
                        onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                        placeholder="e.g. Size"
                        className="ds-input"
                      />
                    </label>
                    <label className="block flex-[2]">
                      <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Options (comma-separated)</span>
                      <input
                        type="text"
                        value={variant.options}
                        onChange={(e) => updateVariant(variant.id, 'options', e.target.value)}
                        placeholder="e.g. Small, Medium, Large"
                        className="ds-input"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--color-error-50)] hover:text-[var(--color-error-600)] dark:hover:bg-[rgba(240,68,56,0.16)]"
                      aria-label="Remove variant"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        {/* Right column — image, tags, organization */}
        <div className="space-y-4">
          {/* Image upload */}
          <SectionCard title="Product Image" description="Upload a high-quality image">
            {imagePreview ? (
              <div className="relative overflow-hidden rounded-xl">
                <img src={imagePreview} alt="Product preview" className="aspect-square w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute right-2 top-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                  aria-label="Remove image"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)] p-6 text-center transition hover:border-[var(--color-brand-400)] hover:bg-[var(--color-brand-50)]/40 dark:hover:bg-[rgba(70,95,255,0.04)]">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">
                  <Upload className="size-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-[var(--text-strong)]">Upload image</p>
                <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">PNG, JPG, or WebP · max 5MB</p>
              </label>
            )}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-sunken)] text-[var(--text-faint)]">
                  <ImageIcon className="size-4" />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Tags */}
          <SectionCard title="Tags" description="Help customers find your product">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-[var(--text-strong)]">Tags (comma-separated)</span>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setField('tags', e.target.value)}
                placeholder="featured, best-seller, new"
                className="ds-input"
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['featured', 'best-seller', 'new', 'sale', 'limited'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setField('tags', form.tags ? `${form.tags}, ${tag}` : tag)}
                  className="rounded-lg bg-[var(--surface-sunken)] px-2 py-1 text-xs font-semibold text-[var(--text-muted)] transition hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-700)] dark:hover:bg-[rgba(70,95,255,0.16)] dark:hover:text-[var(--color-brand-300)]"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Summary */}
          <SectionCard title="Summary" description="Live preview of your product card">
            <div className="rounded-xl border border-[var(--border-subtle)] p-3">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[var(--surface-sunken)]">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="size-full object-cover" />
                ) : (
                  <div className="flex size-full items-center justify-center text-[var(--text-faint)]">
                    <ImageIcon className="size-8" />
                  </div>
                )}
              </div>
              <div className="mt-3">
                <StatusBadge tone="brand">{form.category}</StatusBadge>
                <p className="mt-2 truncate text-sm font-semibold text-[var(--text-strong)]">
                  {form.name || 'Product name'}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-[var(--text-strong)]">
                    ${form.price || '0.00'}
                  </span>
                  {form.compareAtPrice && parseFloat(form.compareAtPrice) > 0 && (
                    <span className="text-sm font-medium text-[var(--text-subtle)] line-through">
                      ${form.compareAtPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
