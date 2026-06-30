'use client';

import * as React from 'react';
import {
  ArrowRightLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  GitCompare,
  Grid2x2,
  Heart,
  List,
  Minus,
  Plus,
  Search,
  Star,
  Trash2,
  X,
  Headphones,
  Watch,
  Keyboard,
  Camera,
  Lamp,
  Cpu,
  Package,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge, MetricCard, SearchInput, Tabs } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { Modal, ModalActions } from '@/components/dashboard/modal';
import { products, productCategories, type Product } from '@/lib/ecommerce-data';
import { cn } from '@/lib/utils';
import { GridProductCard, CarouselProductCard, FeaturedProductCard, WishlistProductCard, CompareProductCard } from './product-card-variants';

export function ProductsPage() {
  const { toast } = useToast();
  const [view, setView] = React.useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [wishlist, setWishlist] = React.useState<Set<string>>(new Set(['PRD-001', 'PRD-006']));
  const [compareList, setCompareList] = React.useState<Set<string>>(new Set());
  const [quickView, setQuickView] = React.useState<Product | null>(null);
  const [carouselIdx, setCarouselIdx] = React.useState(0);
  const [reviewSort, setReviewSort] = React.useState('recent');

  const featuredProducts = products.filter((p) => p.tags.includes('featured') || p.tags.includes('best-seller')).slice(0, 5);

  function toggleWishlist(id: string) {
    const isCurrentlyWishlisted = wishlist.has(id);
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    // Toast outside the updater to avoid setState-during-render
    if (isCurrentlyWishlisted) {
      toast({ title: 'Removed from wishlist' });
    } else {
      toast({ title: 'Added to wishlist', description: products.find((p) => p.id === id)?.name });
    }
  }

  function toggleCompare(id: string) {
    const isCurrentlyCompared = compareList.has(id);
    if (isCurrentlyCompared) {
      setCompareList((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      return;
    }
    if (compareList.size >= 4) {
      toast({ title: 'Compare list full', description: 'Maximum 4 products can be compared', variant: 'destructive' });
      return;
    }
    setCompareList((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    toast({ title: 'Added to compare', description: `${compareList.size + 1}/4 products selected` });
  }

  const carouselVisible = 4;
  const carouselMax = Math.max(0, featuredProducts.length - carouselVisible);

  const filteredByCategory = categoryFilter === 'all' ? products : products.filter((p) => p.category === categoryFilter);
  const wishlistProducts = products.filter((p) => wishlist.has(p.id));
  const compareProducts = products.filter((p) => compareList.has(p.id));

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Products' }]}
        title="Products"
        description="Complete product showcase — cards, grid/list, categories, carousel, featured, wishlist, comparison, quick view, and reviews."
        actions={<StatusBadge tone="brand" dot>8 sections</StatusBadge>}
      />

      {/* SECTION 1 — Product Cards */}
      <SectionCard
        title="1. Product Cards"
        description="Compact product cards with hover actions, ratings, and discount badges"
        actions={
          <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
            <button type="button" onClick={() => setView('grid')} data-active={view === 'grid'} aria-label="Grid view" className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-[var(--text-muted)] transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)]">
              <Grid2x2 className="size-3.5" />
            </button>
            <button type="button" onClick={() => setView('list')} data-active={view === 'list'} aria-label="List view" className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-[var(--text-muted)] transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)]">
              <List className="size-3.5" />
            </button>
          </div>
        }
      >
        <div className={cn('grid gap-4', view === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1')}>
          {products.slice(0, view === 'grid' ? 4 : 3).map((product) => (
            <ProductMiniCard
              key={product.id}
              product={product}
              view={view}
              isWishlisted={wishlist.has(product.id)}
              onWishlist={() => toggleWishlist(product.id)}
              onQuickView={() => setQuickView(product)}
              onAddToCart={() => toast({ title: 'Added to cart', description: product.name })}
            />
          ))}
        </div>
      </SectionCard>

      {/* SECTION 2 — Product Grid/List */}
      <SectionCard
        title="2. Product Grid / List"
        description="Full catalog with category filter — unique editorial card design with hover action bar"
        actions={
          <div className="w-40">
            <Select
              size="sm"
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[{ value: 'all', label: 'All categories' }, ...productCategories.map((c) => ({ value: c, label: c }))]}
              aria-label="Category filter"
            />
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredByCategory.slice(0, 10).map((product) => (
            <GridProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.has(product.id)}
              isCompared={compareList.has(product.id)}
              onWishlist={() => toggleWishlist(product.id)}
              onQuickView={() => setQuickView(product)}
              onAddToCart={() => toast({ title: 'Added to cart', description: product.name })}
              onCompare={() => toggleCompare(product.id)}
            />
          ))}
        </div>
        {filteredByCategory.length === 0 && (
          <p className="py-8 text-center text-sm font-medium text-[var(--text-muted)]">No products in this category.</p>
        )}
      </SectionCard>

      {/* SECTION 3 — Product Categories */}
      <SectionCard title="3. Product Categories" description="Browse products by category tiles">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {productCategories.map((cat, idx) => {
            const count = products.filter((p) => p.category === cat).length;
            const colors = ['#465FFF', '#12B76A', '#F79009', '#F04438', '#0BA5EC', '#7A5AF8'];
            const catIcons: Record<string, React.ComponentType<{ className?: string }>> = {
              'Audio': Headphones,
              'Wearables': Watch,
              'Accessories': Keyboard,
              'Electronics': Camera,
              'Furniture': Lamp,
              'Smart Home': Cpu,
            };
            const CatIcon = catIcons[cat] ?? Package;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => { setCategoryFilter(cat); toast({ title: `Browsing ${cat}`, description: `${count} products` }); }}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center transition hover:-translate-y-1 hover:border-[var(--color-brand-400)] hover:shadow-[var(--shadow-theme-md)]"
              >
                <div
                  className="flex size-14 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                >
                  <CatIcon className="size-6" />
                </div>
                <p className="text-sm font-semibold text-[var(--text-strong)]">{cat}</p>
                <p className="text-xs font-medium text-[var(--text-muted)]">{count} items</p>
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* SECTION 4 — Product Carousel */}
      <SectionCard
        title="4. Product Carousel"
        description="Horizontally scrollable featured products — wide gradient cards with discount flash badge"
        actions={
          <div className="flex gap-1">
            <button type="button" onClick={() => setCarouselIdx((i) => Math.max(0, i - 1))} disabled={carouselIdx === 0} className="ds-btn-icon !h-9 !w-9 disabled:opacity-40" aria-label="Previous">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" onClick={() => setCarouselIdx((i) => Math.min(carouselMax, i + 1))} disabled={carouselIdx >= carouselMax} className="ds-btn-icon !h-9 !w-9 disabled:opacity-40" aria-label="Next">
              <ChevronRight className="size-4" />
            </button>
          </div>
        }
      >
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${carouselIdx * (100 / carouselVisible)}%)` }}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="w-[calc(50%-0.5rem)] flex-shrink-0 sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]">
                <CarouselProductCard
                  product={product}
                  isWishlisted={wishlist.has(product.id)}
                  onWishlist={() => toggleWishlist(product.id)}
                  onQuickView={() => setQuickView(product)}
                  onAddToCart={() => toast({ title: 'Added to cart', description: product.name })}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: carouselMax + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCarouselIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all',
                idx === carouselIdx ? 'w-6 bg-[var(--color-brand-500)]' : 'w-1.5 bg-[var(--border-strong)] hover:bg-[var(--text-muted)]',
              )}
            />
          ))}
        </div>
      </SectionCard>

      {/* SECTION 5 — Featured Products */}
      <SectionCard title="5. Featured Products" description="Hand-picked top products — hero-style cards with overlay text and gradient">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.filter((p) => p.tags.includes('featured') || p.tags.includes('best-seller')).slice(0, 3).map((product) => (
            <FeaturedProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.has(product.id)}
              onWishlist={() => toggleWishlist(product.id)}
              onQuickView={() => setQuickView(product)}
              onAddToCart={() => toast({ title: 'Added to cart', description: product.name })}
            />
          ))}
        </div>
      </SectionCard>

      {/* SECTION 6 — Wishlist */}
      <SectionCard
        title="6. Wishlist"
        description={`Saved products · ${wishlistProducts.length} items — compact horizontal cards with red accent`}
        actions={wishlistProducts.length > 0 ? (
          <button type="button" onClick={() => { setWishlist(new Set()); toast({ title: 'Wishlist cleared' }); }} className="ds-btn ds-btn-secondary !h-9 !text-xs">
            <Trash2 className="size-3.5" /> Clear all
          </button>
        ) : undefined}
      >
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--surface-sunken)] text-[var(--text-subtle)]">
              <Heart className="size-6" />
            </div>
            <p className="mt-4 text-sm font-medium text-[var(--text-strong)]">Your wishlist is empty</p>
            <p className="mt-1 text-xs font-normal text-[var(--text-muted)]">Tap the heart icon on any product to save it here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistProducts.map((product) => (
              <WishlistProductCard
                key={product.id}
                product={product}
                isWishlisted={true}
                onWishlist={() => toggleWishlist(product.id)}
                onQuickView={() => setQuickView(product)}
                onAddToCart={() => toast({ title: 'Added to cart', description: product.name })}
              />
            ))}
          </div>
        )}
      </SectionCard>

      {/* SECTION 7 — Product Comparison */}
      <SectionCard
        title="7. Product Comparison"
        description={`Side-by-side comparison · ${compareProducts.length}/4 selected — toggleable compare cards with selection ribbon`}
        actions={
          compareProducts.length > 0 ? (
            <button type="button" onClick={() => { setCompareList(new Set()); toast({ title: 'Comparison cleared' }); }} className="ds-btn ds-btn-secondary !h-9 !text-xs">
              <X className="size-3.5" /> Clear
            </button>
          ) : undefined
        }
      >
        {/* Comparison table — only when 2+ selected */}
        {compareProducts.length >= 2 && (
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-32 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]"></th>
                  {compareProducts.map((p) => (
                    <th key={p.id} className="px-3 py-3 text-center">
                      <button type="button" onClick={() => toggleCompare(p.id)} className="ml-auto block text-[var(--text-muted)] hover:text-[var(--color-error-600)]" aria-label="Remove from compare">
                        <X className="size-4" />
                      </button>
                      <img src={p.image} alt={p.name} className="mx-auto mt-2 size-16 rounded-lg object-cover" loading="lazy" />
                      <p className="mt-2 text-sm font-medium text-[var(--text-strong)]">{p.name}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Price', getValue: (p: Product) => `$${p.price}` },
                  { label: 'Category', getValue: (p: Product) => p.category },
                  { label: 'Rating', getValue: (p: Product) => `${p.rating} ★ (${p.reviews})` },
                  { label: 'Stock', getValue: (p: Product) => p.stock === 0 ? 'Out of stock' : `${p.stock} units` },
                  { label: 'Sold', getValue: (p: Product) => p.sold.toLocaleString() },
                  { label: 'SKU', getValue: (p: Product) => p.sku },
                ].map((row) => (
                  <tr key={row.label} className="border-t border-[var(--border-subtle)]">
                    <td className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{row.label}</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="px-3 py-3 text-center font-medium text-[var(--text-strong)]">{row.getValue(p)}</td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-[var(--border-subtle)]">
                  <td className="px-3 py-3"></td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="px-3 py-3 text-center">
                      <button type="button" onClick={() => toast({ title: 'Added to cart', description: p.name })} className="ds-btn ds-btn-primary !h-9 !text-xs">
                        Add to cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Compare-card browse grid — always visible so user can add/remove */}
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            {compareProducts.length === 0
              ? 'Pick 2–4 products below to compare them side-by-side'
              : `${compareProducts.length} selected · ${4 - compareProducts.length} slot${4 - compareProducts.length === 1 ? '' : 's'} remaining`}
          </p>
          {compareProducts.length === 1 && (
            <span className="text-[11px] font-medium text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">Select at least 1 more to view comparison</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.slice(0, 6).map((product) => (
            <CompareProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.has(product.id)}
              isCompared={compareList.has(product.id)}
              onWishlist={() => toggleWishlist(product.id)}
              onQuickView={() => setQuickView(product)}
              onAddToCart={() => toast({ title: 'Added to cart', description: product.name })}
              onCompare={() => toggleCompare(product.id)}
            />
          ))}
        </div>
      </SectionCard>

      {/* SECTION 8 — Quick View Modal */}
      <SectionCard title="8. Quick View Modal" description="Click any product card's eye icon to open a quick preview">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4 text-center">
          <p className="text-sm font-medium text-[var(--text-muted)]">
            Tap the <Eye className="inline size-4 text-[var(--color-brand-500)]" /> icon on any product card above to open the quick view modal.
          </p>
        </div>
      </SectionCard>

      {/* SECTION 9 — Ratings & Reviews */}
      <SectionCard
        title="9. Ratings & Reviews"
        description="Customer reviews with rating distribution"
        actions={
          <div className="w-36">
            <Select
              size="sm"
              value={reviewSort}
              onChange={setReviewSort}
              options={[
                { value: 'recent', label: 'Most recent' },
                { value: 'highest', label: 'Highest rated' },
                { value: 'lowest', label: 'Lowest rated' },
              ]}
              aria-label="Sort reviews"
            />
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Rating summary */}
          <div className="flex flex-col items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-5">
            <p className="text-5xl font-semibold text-[var(--text-strong)]">4.6</p>
            <div className="mt-2 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={cn('size-5', s <= 4 ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} />
              ))}
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">Based on 12,840 reviews</p>
            <div className="mt-4 w-full space-y-1.5">
              {[
                { stars: 5, pct: 64 },
                { stars: 4, pct: 24 },
                { stars: 3, pct: 6 },
                { stars: 2, pct: 3 },
                { stars: 1, pct: 2 },
              ].map((r) => (
                <div key={r.stars} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-[var(--text-muted)]">{r.stars}</span>
                  <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--card)]">
                    <div className="h-full rounded-full bg-[var(--color-warning-500)]" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="w-8 text-right text-[var(--text-muted)]">{r.pct}%</span>
                </div>
              ))}
            </div>
            <button type="button" className="ds-btn ds-btn-primary mt-4 w-full !h-9 !text-xs">Write a review</button>
          </div>

          {/* Review list */}
          <div className="space-y-4">
            {[
              { user: 'Darlene Robertson', rating: 5, date: '2 days ago', title: 'Excellent product!', text: 'Exceeded all my expectations. The build quality is amazing and it works flawlessly. Would definitely recommend to friends and family.', verified: true, helpful: 24 },
              { user: 'Kristin Watson', rating: 5, date: '1 week ago', title: 'Worth every penny', text: 'I was hesitant at first because of the price, but after using it for a week I can say it is absolutely worth it. Premium feel and great performance.', verified: true, helpful: 18 },
              { user: 'Bessie Cooper', rating: 4, date: '2 weeks ago', title: 'Great, but minor issue', text: 'Overall a great product. The only complaint is that the setup process was a bit confusing. Otherwise, very happy with the purchase.', verified: true, helpful: 12 },
              { user: 'Albert Flores', rating: 3, date: '3 weeks ago', title: 'Decent but overpriced', text: 'The product does what it says, but I feel the price is a bit high for what you get. Customer service was helpful though.', verified: false, helpful: 5 },
            ].map((review, idx) => (
              <div key={idx} className="rounded-xl border border-[var(--border-subtle)] p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex size-9 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-xs font-semibold text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
                      {review.user.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-strong)]">{review.user}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={cn('size-3', s <= review.rating ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} />
                          ))}
                        </div>
                        {review.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
                            <Check className="size-2.5" /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[var(--text-muted)]">{review.date}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-[var(--text-strong)]">{review.title}</p>
                <p className="mt-1 text-sm font-medium text-[var(--text-body)]">{review.text}</p>
                <div className="mt-3 flex items-center gap-3 border-t border-[var(--border-subtle)] pt-3">
                  <button type="button" className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button type="button" className="text-xs font-semibold text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">Reply</button>
                </div>
              </div>
            ))}
            <button type="button" className="ds-btn ds-btn-secondary w-full">Load more reviews</button>
          </div>
        </div>
      </SectionCard>

      {/* Quick View Modal */}
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} onAddToCart={(p) => { toast({ title: 'Added to cart', description: p.name }); setQuickView(null); }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ProductMiniCard — reusable compact card                             */
/* ------------------------------------------------------------------ */
function ProductMiniCard({
  product,
  view,
  isWishlisted,
  onWishlist,
  onQuickView,
  onAddToCart,
}: {
  product: Product;
  view: 'grid' | 'list';
  isWishlisted: boolean;
  onWishlist: () => void;
  onQuickView: () => void;
  onAddToCart: () => void;
}) {
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  if (view === 'list') {
    return (
      <div className="ds-card group flex gap-4 p-3 ds-card-hover">
        <div className="relative size-20 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--surface-sunken)]">
          <img src={product.image} alt={product.name} className="size-full object-cover" loading="lazy" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <StatusBadge tone="brand">{product.category}</StatusBadge>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-[var(--text-muted)]">
                <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" /> {product.rating}
              </span>
            </div>
            <p className="mt-1 truncate text-sm font-semibold text-[var(--text-strong)]">{product.name}</p>
            <p className="truncate text-xs font-medium text-[var(--text-muted)]">{product.sku} · {product.stock} in stock</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-semibold text-[var(--text-strong)]">${product.price}</span>
              {product.compareAtPrice && <span className="text-xs text-[var(--text-subtle)] line-through">${product.compareAtPrice}</span>}
            </div>
            <div className="flex gap-1">
              <button type="button" onClick={onQuickView} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Quick view">
                <Eye className="size-3.5" />
              </button>
              <button type="button" onClick={onWishlist} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)]" aria-label="Wishlist">
                <Heart className={cn('size-3.5', isWishlisted && 'fill-[var(--color-error-500)] text-[var(--color-error-500)]')} />
              </button>
              <button type="button" onClick={onAddToCart} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-white transition hover:bg-[var(--color-brand-600)]" aria-label="Add to cart">
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-card group overflow-hidden ds-card-hover">
      <div className="relative aspect-square overflow-hidden bg-[var(--surface-sunken)]">
        <img src={product.image} alt={product.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        {discount > 0 && (
          <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-[var(--color-error-500)] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-white">-{discount}%</span>
        )}
        {product.stock === 0 && (
          <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-[var(--color-error-700)] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-white">Out of stock</span>
        )}
        {/* Hover actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button type="button" onClick={onWishlist} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg bg-white/90 text-[var(--text-strong)] shadow-sm backdrop-blur transition hover:bg-white" aria-label="Wishlist">
            <Heart className={cn('size-3.5', isWishlisted && 'fill-[var(--color-error-500)] text-[var(--color-error-500)]')} />
          </button>
          <button type="button" onClick={onQuickView} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg bg-white/90 text-[var(--text-strong)] shadow-sm backdrop-blur transition hover:bg-white" aria-label="Quick view">
            <Eye className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <StatusBadge tone="brand">{product.category}</StatusBadge>
          <span className="flex items-center gap-0.5 text-xs font-semibold text-[var(--text-muted)]">
            <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" /> {product.rating}
          </span>
        </div>
        <p className="mt-1.5 truncate text-sm font-semibold text-[var(--text-strong)]" title={product.name}>{product.name}</p>
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-base font-semibold text-[var(--text-strong)]">${product.price}</span>
          {product.compareAtPrice && <span className="text-xs text-[var(--text-subtle)] line-through">${product.compareAtPrice}</span>}
        </div>
        <button type="button" onClick={onAddToCart} className="ds-btn ds-btn-primary mt-2.5 w-full !h-8 !text-xs" disabled={product.stock === 0}>
          <Plus className="size-3.5" /> Add to cart
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Quick View Modal                                                    */
/* ------------------------------------------------------------------ */
function QuickViewModal({ product, onClose, onAddToCart }: { product: Product | null; onClose: () => void; onAddToCart: (p: Product) => void }) {
  const [qty, setQty] = React.useState(1);
  React.useEffect(() => { if (product) setQty(1); }, [product]);

  return (
    <Modal
      open={!!product}
      onOpenChange={(o) => !o && onClose()}
      title={product?.name ?? ''}
      description={product?.category}
      size="xl"
      footer={
        <>
          <div className="mr-auto flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Qty</span>
            <div className="flex items-center gap-1 rounded-lg border border-[var(--border)]">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="inline-flex size-7 cursor-pointer items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-strong)]" aria-label="Decrease">
                <Minus className="size-3" />
              </button>
              <span className="w-6 text-center text-sm font-semibold text-[var(--text-strong)]">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="inline-flex size-7 cursor-pointer items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-strong)]" aria-label="Increase">
                <Plus className="size-3" />
              </button>
            </div>
          </div>
          <ModalActions
            onCancel={onClose}
            onConfirm={() => product && onAddToCart(product)}
            confirmLabel={`Add ${qty} to cart · $${((product?.price ?? 0) * qty).toFixed(2)}`}
          />
        </>
      }
    >
      {product && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--surface-sunken)]">
            <img src={product.image} alt={product.name} className="size-full object-cover" />
            {product.compareAtPrice && (
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[var(--color-error-500)] px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <StatusBadge tone="brand">{product.category}</StatusBadge>
              <span className="flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)]">
                <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" /> {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-[var(--text-strong)]">${product.price}</p>
            {product.compareAtPrice && <p className="text-sm text-[var(--text-subtle)] line-through">${product.compareAtPrice}</p>}
            <p className="mt-3 text-sm font-medium text-[var(--text-body)]">{product.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--border-subtle)] pt-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">SKU</p>
                <p className="mt-0.5 text-sm font-semibold text-[var(--text-strong)]">{product.sku}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Stock</p>
                <p className={cn('mt-0.5 text-sm font-semibold', product.stock === 0 ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]')}>
                  {product.stock === 0 ? 'Out of stock' : `${product.stock} available`}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Sold</p>
                <p className="mt-0.5 text-sm font-semibold text-[var(--text-strong)]">{product.sold.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Variants</p>
                <p className="mt-0.5 text-sm font-semibold text-[var(--text-strong)]">{product.variants?.length ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
