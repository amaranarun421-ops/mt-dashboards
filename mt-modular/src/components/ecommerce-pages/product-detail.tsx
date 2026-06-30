'use client';

import * as React from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Clock,
  Zap,
  MapPin,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge } from '@/components/dashboard/primitives';
import { useDashboardStore } from '@/lib/dashboard-store';
import { products } from '@/lib/ecommerce-data';
import { cn } from '@/lib/utils';

export function ProductDetailPage() {
  const { toast } = useToast();
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  const product = products[0]; // Headphones as the demo product

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
  ];
  const [activeImage, setActiveImage] = React.useState(0);

  const [selectedColor, setSelectedColor] = React.useState('Midnight Black');
  const [selectedSize, setSelectedSize] = React.useState('Standard');
  const [qty, setQty] = React.useState(1);
  const [wishlisted, setWishlisted] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('description');
  const [stickyBarVisible, setStickyBarVisible] = React.useState(false);
  const [zoomed, setZoomed] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setStickyBarVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const colors = [
    { name: 'Midnight Black', hex: '#1d2939' },
    { name: 'Silver White', hex: '#e4e7ec' },
    { name: 'Navy Blue', hex: '#252dae' },
    { name: 'Rose Gold', hex: '#e8b4a0' },
  ];
  const sizes = ['Compact', 'Standard', 'Large'];
  const similarProducts = products.slice(4, 8);

  const specs = [
    { label: 'Brand', value: 'AudioPro' },
    { label: 'Model', value: 'AP-NC-2026' },
    { label: 'Type', value: 'Over-ear, closed-back' },
    { label: 'Connectivity', value: 'Bluetooth 5.3, USB-C, 3.5mm' },
    { label: 'Battery life', value: '30 hours (ANC on), 40 hours (ANC off)' },
    { label: 'Charging', value: 'USB-C fast charge — 5 min = 3 hours' },
    { label: 'Drivers', value: '40mm dynamic drivers' },
    { label: 'Frequency response', value: '20Hz – 20,000Hz' },
    { label: 'Weight', value: '248g' },
    { label: 'Warranty', value: '2-year limited' },
  ];

  const reviews = [
    { user: 'Darlene Robertson', rating: 5, date: '2 days ago', title: 'Best headphones I have owned', text: 'The noise cancellation is incredible. I cannot hear my office mates at all when these are on. Battery lasts the whole week.', verified: true, helpful: 28 },
    { user: 'Kristin Watson', rating: 5, date: '5 days ago', title: 'Premium feel', text: 'Build quality is exceptional. The aluminum frame and memory foam ear cushions make these comfortable for hours of use.', verified: true, helpful: 18 },
    { user: 'Bessie Cooper', rating: 4, date: '1 week ago', title: 'Great sound, minor comfort issue', text: 'Sound is rich and balanced. Only complaint is the clamping force is a bit strong out of the box — loosens up after a few days.', verified: true, helpful: 12 },
    { user: 'Albert Flores', rating: 5, date: '2 weeks ago', title: 'Worth every penny', text: 'I tried Sony XM5 and Bose QC Ultra before settling on these. The AudioPro has the best balance of sound quality and ANC.', verified: true, helpful: 9 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Products' }, { label: product.name }]}
        title={product.name}
        description="Full product detail page — Amazon/Flipkart style with sticky gallery."
        actions={
          <button type="button" className="ds-btn ds-btn-secondary" onClick={() => setEcommerce('products')}>
            <ArrowLeft className="size-4" /> Back
          </button>
        }
      />

      {/* MAIN LAYOUT — Sticky gallery + scrollable info (Amazon/Flipkart style) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr] lg:items-start xl:grid-cols-[480px_1fr]">
        {/* LEFT — Sticky image gallery */}
        <div className="lg:sticky lg:top-2 lg:self-start">
          <div className="flex gap-3">
            {/* Vertical thumbnails (Amazon style) */}
            <div className="flex flex-col gap-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    'size-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition sm:size-16',
                    activeImage === idx ? 'border-[var(--color-brand-500)] ring-2 ring-[var(--color-brand-200)]' : 'border-[var(--border)] hover:border-[var(--border-strong)]',
                  )}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="size-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative flex-1">
              <div
                className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-sunken)]"
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
              >
                <img
                  src={galleryImages[activeImage]}
                  alt={`${product.name} view ${activeImage + 1}`}
                  className={cn('size-full object-cover transition-transform duration-300', zoomed ? 'scale-150' : 'scale-100')}
                  style={{ transformOrigin: 'center' }}
                />
                {product.compareAtPrice && (
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[var(--color-error-500)] px-2.5 py-1 text-xs font-semibold uppercase text-white">
                    -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setWishlisted(!wishlisted)}
                  className="absolute right-3 top-3 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[var(--text-strong)] shadow-sm backdrop-blur transition hover:bg-white"
                  aria-label="Add to wishlist"
                >
                  <Heart className={cn('size-5', wishlisted && 'fill-[var(--color-error-500)] text-[var(--color-error-500)]')} />
                </button>
              </div>
              <p className="mt-2 text-center text-xs font-medium text-[var(--text-muted)]">Hover to zoom · {activeImage + 1} of {galleryImages.length}</p>
            </div>
          </div>

          {/* Trust badges below gallery */}
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
            <TrustBadge icon={Truck} title="Free shipping" desc="Over $50" />
            <TrustBadge icon={RotateCcw} title="30-day returns" desc="Free returns" />
            <TrustBadge icon={Shield} title="2-year warranty" desc="Full coverage" />
            <TrustBadge icon={Clock} title="Ships today" desc="Order in 4h" />
          </div>
        </div>

        {/* RIGHT — Scrollable product info */}
        <div className="space-y-5">
          {/* Title + rating */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone="brand">{product.category}</StatusBadge>
              {product.tags.includes('best-seller') && <StatusBadge tone="warning">Best Seller</StatusBadge>}
              <span className="text-xs font-semibold text-[var(--text-muted)]">SKU: {product.sku}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-[var(--text-strong)] sm:text-2xl">{product.name}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={cn('size-4', s <= 4 ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} />
                ))}
                <span className="ml-1 text-sm font-semibold text-[var(--text-strong)]">{product.rating}</span>
              </div>
              <button type="button" onClick={() => setActiveTab('reviews')} className="text-sm font-semibold text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]">
                {product.reviews.toLocaleString()} ratings
              </button>
              <span className="text-[var(--text-faint)]">|</span>
              <span className="text-sm font-semibold text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{product.sold.toLocaleString()} sold</span>
            </div>
          </div>

          {/* Price block — Amazon style boxed */}
          <div className="rounded-xl bg-[var(--surface-sunken)] p-4">
            <div className="flex items-baseline gap-3">
              {product.compareAtPrice && (
                <span className="text-sm text-[var(--text-subtle)] line-through">${product.compareAtPrice}</span>
              )}
              <span className="text-3xl font-semibold text-[var(--text-strong)]">${product.price}</span>
            </div>
            {product.compareAtPrice && (
              <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-50)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
                You save ${product.compareAtPrice - product.price} ({Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%)
              </p>
            )}
            <p className="mt-2 text-xs font-medium text-[var(--text-muted)]">Inclusive of all taxes · Free shipping</p>
          </div>

          {/* Description */}
          <p className="text-sm font-medium leading-relaxed text-[var(--text-body)]">{product.description}</p>

          {/* Color picker */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Color: <span className="text-[var(--text-strong)]">{selectedColor}</span>
            </p>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    'flex size-10 cursor-pointer items-center justify-center rounded-full border-2 transition',
                    selectedColor === color.name ? 'border-[var(--color-brand-500)] ring-2 ring-[var(--color-brand-200)]' : 'border-[var(--border)] hover:border-[var(--border-strong)]',
                  )}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select ${color.name}`}
                >
                  {selectedColor === color.name && <Check className={cn('size-4', color.name === 'Silver White' ? 'text-[var(--gray-700)]' : 'text-white')} />}
                </button>
              ))}
            </div>
          </div>

          {/* Size picker */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Size: <span className="text-[var(--text-strong)]">{selectedSize}</span>
            </p>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'cursor-pointer rounded-xl border-2 px-4 py-2 text-sm font-semibold transition',
                    selectedSize === size
                      ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                      : 'border-[var(--border)] text-[var(--text-body)] hover:border-[var(--border-strong)]',
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock + delivery info */}
          <div className="space-y-2 rounded-xl border border-[var(--border-subtle)] p-3">
            <div className="flex items-center gap-2 text-sm">
              <Check className="size-4 text-[var(--color-success-500)]" />
              <span className="font-semibold text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">In Stock</span>
              <span className="text-[var(--text-muted)]">— {product.stock} units available</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="size-4 text-[var(--text-muted)]" />
              <span className="text-[var(--text-muted)]">Deliver to <span className="font-semibold text-[var(--text-strong)]">San Francisco 94103</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="size-4 text-[var(--text-muted)]" />
              <span className="text-[var(--text-muted)]">FREE delivery by <span className="font-semibold text-[var(--text-strong)]">Mon, Jun 23</span></span>
            </div>
          </div>

          {/* Quantity + Add to cart + Buy now */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-[var(--border)] p-1">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Decrease">
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center text-base font-semibold text-[var(--text-strong)]">{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Increase">
                  <Plus className="size-4" />
                </button>
              </div>
              <span className="text-sm font-medium text-[var(--text-muted)]">{qty} × ${product.price} = <span className="font-semibold text-[var(--text-strong)]">${(product.price * qty).toFixed(2)}</span></span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => toast({ title: 'Added to cart', description: `${qty} × ${product.name} (${selectedColor}, ${selectedSize})` })}
                className="ds-btn ds-btn-primary flex-1 !h-12 !text-base"
              >
                <ShoppingCart className="size-5" /> Add to Cart
              </button>
              <button
                type="button"
                onClick={() => toast({ title: 'Proceeding to checkout', description: `${qty} × ${product.name} — $${(product.price * qty).toFixed(2)}` })}
                className="ds-btn flex-1 !h-12 !text-base bg-[var(--color-warning-500)] text-white hover:bg-[var(--color-warning-600)]"
              >
                <Zap className="size-5" /> Buy Now
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => { setWishlisted(!wishlisted); toast({ title: wishlisted ? 'Removed from wishlist' : 'Added to wishlist' }); }}
                className="ds-btn ds-btn-secondary flex-1 !h-10"
              >
                <Heart className={cn('size-4', wishlisted && 'fill-[var(--color-error-500)] text-[var(--color-error-500)]')} /> Wishlist
              </button>
              <button
                type="button"
                onClick={() => toast({ title: 'Link copied', description: 'Product link copied to clipboard' })}
                className="ds-btn ds-btn-secondary !h-10 !w-10 !px-0"
                aria-label="Share"
              >
                <Share2 className="size-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <div className="flex overflow-x-auto border-b border-[var(--border-subtle)]">
              {[
                { key: 'description', label: 'Description' },
                { key: 'specs', label: 'Specifications' },
                { key: 'reviews', label: `Reviews (${product.reviews.toLocaleString()})` },
                { key: 'delivery', label: 'Delivery' },
                { key: 'faq', label: 'FAQ' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  data-active={activeTab === tab.key}
                  className={cn(
                    'flex-shrink-0 cursor-pointer border-b-2 px-4 py-3 text-sm font-semibold transition',
                    activeTab === tab.key
                      ? 'border-[var(--color-brand-500)] text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-strong)]',
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-5">
              {activeTab === 'description' && (
                <div className="space-y-3 text-sm font-medium leading-relaxed text-[var(--text-body)]">
                  <p>{product.description}</p>
                  <p>Experience studio-quality sound with our flagship over-ear headphones. Featuring industry-leading active noise cancellation, these headphones block out distractions so you can focus on what matters — your music, your calls, your peace.</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Active noise cancellation with transparency mode</li>
                    <li>Bluetooth 5.3 with multipoint pairing</li>
                    <li>40mm dynamic drivers for rich, balanced sound</li>
                    <li>Memory foam ear cushions for extended comfort</li>
                    <li>Foldable design with included travel case</li>
                  </ul>
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      {specs.map((spec, idx) => (
                        <tr key={spec.label} className={cn('border-b border-[var(--border-subtle)] last:border-b-0', idx % 2 === 1 && 'bg-[var(--surface-ground)]')}>
                          <td className="w-1/3 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{spec.label}</td>
                          <td className="px-4 py-3 font-semibold text-[var(--text-strong)]">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {/* Rating summary */}
                  <div className="flex items-center gap-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4">
                    <div className="text-center">
                      <p className="text-4xl font-semibold text-[var(--text-strong)]">{product.rating}</p>
                      <div className="mt-1 flex justify-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={cn('size-3.5', s <= 4 ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} />
                        ))}
                      </div>
                      <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{product.reviews.toLocaleString()} ratings</p>
                    </div>
                    <div className="flex-1 space-y-1">
                      {[{ s: 5, p: 64 }, { s: 4, p: 24 }, { s: 3, p: 6 }, { s: 2, p: 3 }, { s: 1, p: 2 }].map((r) => (
                        <div key={r.s} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-[var(--text-muted)]">{r.s}★</span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--card)]">
                            <div className="h-full rounded-full bg-[var(--color-warning-500)]" style={{ width: `${r.p}%` }} />
                          </div>
                          <span className="w-8 text-right text-[var(--text-muted)]">{r.p}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Review list */}
                  {reviews.map((review, idx) => (
                    <div key={idx} className="rounded-xl border border-[var(--border-subtle)] p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://images.unsplash.com/photo-${1500648767791 + idx * 1000}?w=40&h=40&fit=crop&crop=face`}
                          alt={review.user}
                          className="size-9 rounded-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div>
                          <p className="text-sm font-semibold text-[var(--text-strong)]">{review.user}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className={cn('size-3', s <= review.rating ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} />
                              ))}
                            </div>
                            {review.verified && <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase text-[var(--color-success-600)] dark:text-[var(--color-success-500)]"><Check className="size-2.5" /> Verified</span>}
                            <span className="text-xs text-[var(--text-muted)]">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-[var(--text-strong)]">{review.title}</p>
                      <p className="mt-1 text-sm font-medium text-[var(--text-body)]">{review.text}</p>
                      <div className="mt-2 flex items-center gap-3 border-t border-[var(--border-subtle)] pt-2">
                        <button type="button" className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-strong)]">Helpful ({review.helpful})</button>
                        <button type="button" className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-strong)]">Reply</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'delivery' && (
                <div className="space-y-3">
                  {[
                    { icon: Truck, title: 'Free standard shipping', desc: 'Delivered in 3-5 business days. Free on all orders over $50.' },
                    { icon: Zap, title: 'Express shipping — $14.99', desc: 'Delivered in 1-2 business days. Order within 4 hours for same-day dispatch.' },
                    { icon: RotateCcw, title: '30-day free returns', desc: 'Not satisfied? Return within 30 days for a full refund. We cover return shipping.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] p-4">
                      <item.icon className="mt-0.5 size-5 flex-shrink-0 text-[var(--color-brand-500)]" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-strong)]">{item.title}</p>
                        <p className="mt-0.5 text-sm font-medium text-[var(--text-muted)]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'faq' && (
                <div className="space-y-2">
                  {[
                    { q: 'Are these headphones compatible with iPhone and Android?', a: 'Yes, they work with any Bluetooth-enabled device including iPhone, Android, iPad, Mac, and Windows PCs.' },
                    { q: 'Can I use them wired?', a: 'Yes, a 3.5mm audio cable and USB-C cable are included in the box for wired use.' },
                    { q: 'How effective is the noise cancellation?', a: 'Our ANC technology blocks up to 95% of ambient noise, making them ideal for flights, offices, and commuting.' },
                    { q: 'Do they support multi-device pairing?', a: 'Yes, multipoint Bluetooth allows you to connect to 2 devices simultaneously and switch between them automatically.' },
                    { q: 'Is there a warranty?', a: 'Yes, all headphones come with a 2-year limited warranty covering manufacturing defects.' },
                  ].map((faq, idx) => (
                    <FAQItem key={idx} question={faq.q} answer={faq.a} defaultOpen={idx === 0} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <SectionCard title="Similar Products" description="You might also like these">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {similarProducts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => toast({ title: 'Viewing product', description: p.name })}
              className="ds-card overflow-hidden text-left ds-card-hover"
            >
              <div className="aspect-square overflow-hidden bg-[var(--surface-sunken)]">
                <img src={p.image} alt={p.name} className="size-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-[var(--text-strong)]">{p.name}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-base font-semibold text-[var(--text-strong)]">${p.price}</span>
                  <span className="flex items-center gap-0.5 text-xs font-semibold text-[var(--text-muted)]">
                    <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" /> {p.rating}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Sticky Purchase Bar */}
      {stickyBarVisible && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-xl shadow-[0_-4px_12px_rgba(16,24,40,0.08)] ds-fade-up">
          <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="hidden size-12 overflow-hidden rounded-lg bg-[var(--surface-sunken)] sm:block">
              <img src={galleryImages[activeImage]} alt={product.name} className="size-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--text-strong)]">{product.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-[var(--text-strong)]">${product.price}</span>
                <span className="hidden text-xs font-medium text-[var(--text-muted)] sm:inline">· {selectedColor}, {selectedSize}, Qty {qty}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-xl border border-[var(--border)] p-1 sm:hidden">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="inline-flex size-7 cursor-pointer items-center justify-center text-[var(--text-muted)]" aria-label="Decrease"><Minus className="size-3" /></button>
              <span className="w-6 text-center text-sm font-semibold text-[var(--text-strong)]">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="inline-flex size-7 cursor-pointer items-center justify-center text-[var(--text-muted)]" aria-label="Increase"><Plus className="size-3" /></button>
            </div>
            <button type="button" onClick={() => toast({ title: 'Added to cart', description: `${qty} × ${product.name}` })} className="ds-btn ds-btn-primary !h-10 !px-4 !text-sm">
              <ShoppingCart className="size-4" /> <span className="hidden sm:inline">Add to cart</span>
            </button>
            <button type="button" onClick={() => toast({ title: 'Proceeding to checkout', description: `$${(product.price * qty).toFixed(2)}` })} className="ds-btn !h-10 !px-4 !text-sm bg-[var(--color-warning-500)] text-white hover:bg-[var(--color-warning-600)]">
              <Zap className="size-4" /> <span className="hidden sm:inline">Buy now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TrustBadge({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-5 flex-shrink-0 text-[var(--color-brand-500)]" />
      <div>
        <p className="text-xs font-semibold text-[var(--text-strong)]">{title}</p>
        <p className="text-[10px] font-medium text-[var(--text-muted)]">{desc}</p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--border-subtle)]">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left">
        <span className="text-sm font-semibold text-[var(--text-strong)]">{question}</span>
        <ChevronDown className={cn('size-4 flex-shrink-0 text-[var(--text-muted)] transition-transform', open && 'rotate-180')} />
      </button>
      <div className={cn('grid transition-[grid-template-rows] duration-200', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm font-medium text-[var(--text-muted)]">{answer}</p>
        </div>
      </div>
    </div>
  );
}
