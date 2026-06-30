'use client';

import * as React from 'react';
import {
  Eye,
  Heart,
  Star,
  Plus,
  Check,
  GitCompare,
  TrendingUp,
  ShoppingCart,
  Zap,
  Award,
  Clock,
} from 'lucide-react';
import type { Product } from '@/lib/ecommerce-data';
import { StatusBadge } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

/* ========================================================================
   Five unique product card variants for the Products page.
   Each variant has its own distinct layout, accent color, and use-case
   so that sections 2/4/5/6/7 look visibly different from one another.
   ======================================================================== */

interface BaseProps {
  product: Product;
  isWishlisted: boolean;
  isCompared?: boolean;
  onWishlist: () => void;
  onQuickView: () => void;
  onAddToCart: () => void;
  onCompare?: () => void;
}

/* ------------------------------------------------------------------ */
/* 1. GRID CARD — clean editorial style with bottom action bar         */
/*    Used in: Section 2 (Product Grid)                                */
/* ------------------------------------------------------------------ */
export function GridProductCard({ product, isWishlisted, isCompared, onWishlist, onQuickView, onAddToCart, onCompare }: BaseProps) {
  const discount = product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 0;
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-300)] hover:shadow-[var(--shadow-theme-md)]">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-sunken)]">
        <img src={product.image} alt={product.name} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        {/* Badges — top-left */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && <span className="inline-flex items-center rounded-full bg-[var(--color-error-500)] px-2 py-0.5 text-[10px] font-medium uppercase text-white">-{discount}%</span>}
          {product.tags.includes('best-seller') && <span className="inline-flex items-center rounded-full bg-[var(--color-warning-500)] px-2 py-0.5 text-[10px] font-medium uppercase text-white">Best</span>}
        </div>
        {/* Wishlist button — top-right */}
        <button type="button" onClick={onWishlist} className="absolute right-3 top-3 inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[var(--text-strong)] shadow-sm backdrop-blur transition hover:scale-110 hover:bg-white" aria-label="Toggle wishlist">
          <Heart className={cn('size-4', isWishlisted && 'fill-[var(--color-error-500)] text-[var(--color-error-500)]')} />
        </button>
        {/* Bottom overlay action bar — slides up on hover */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-12 gap-2 transition-transform duration-300 group-hover:translate-y-0">
          <button type="button" onClick={onQuickView} className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--card)] text-xs font-medium text-[var(--text-strong)] shadow-sm transition hover:bg-white" aria-label="Quick view">
            <Eye className="size-3.5" /> View
          </button>
          <button type="button" onClick={onAddToCart} className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--color-brand-500)] text-xs font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]" aria-label="Add to cart">
            <ShoppingCart className="size-3.5" /> Add
          </button>
        </div>
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{product.category}</span>
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--text-muted)]">
            <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
            <span className="tabular-nums">{product.rating}</span>
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm font-medium text-[var(--text-strong)]">{product.name}</p>
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold tabular-nums text-[var(--text-strong)]">${product.price}</span>
            {product.compareAtPrice && <span className="text-xs text-[var(--text-subtle)] line-through tabular-nums">${product.compareAtPrice}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. CAROUSEL CARD — horizontal wide card with side info panel        */
/*    Used in: Section 4 (Product Carousel)                            */
/* ------------------------------------------------------------------ */
export function CarouselProductCard({ product, isWishlisted, onWishlist, onQuickView, onAddToCart }: BaseProps) {
  const discount = product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 0;
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--surface-sunken)] transition-all duration-300 hover:border-[var(--color-brand-300)] hover:shadow-[var(--shadow-theme-lg)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-sunken)]">
        <img src={product.image} alt={product.name} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        {/* Top gradient + badge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {discount > 0 && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--color-error-500)] px-2 py-0.5 text-[10px] font-medium text-white">
            <Zap className="size-2.5" /> {discount}% OFF
          </span>
        )}
        <button type="button" onClick={onWishlist} className="absolute right-3 top-3 inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[var(--text-strong)] shadow-sm backdrop-blur transition hover:scale-110" aria-label="Toggle wishlist">
          <Heart className={cn('size-3.5', isWishlisted && 'fill-[var(--color-error-500)] text-[var(--color-error-500)]')} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{product.category}</span>
        <p className="mt-1 line-clamp-2 text-sm font-medium text-[var(--text-strong)]">{product.name}</p>
        <div className="mt-2 flex items-center gap-2 text-xs font-normal text-[var(--text-muted)]">
          <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
          <span className="tabular-nums">{product.rating}</span>
          <span>·</span>
          <span className="tabular-nums">{product.reviews.toLocaleString()} reviews</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">${product.price}</span>
            {product.compareAtPrice && <span className="text-xs text-[var(--text-subtle)] line-through tabular-nums">${product.compareAtPrice}</span>}
          </div>
          <div className="flex gap-1">
            <button type="button" onClick={onQuickView} className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Quick view">
              <Eye className="size-3.5" />
            </button>
            <button type="button" onClick={onAddToCart} className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-white transition hover:bg-[var(--color-brand-600)]" aria-label="Add to cart">
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. FEATURED CARD — large hero-style card with overlay text         */
/*    Used in: Section 5 (Featured Products)                          */
/* ------------------------------------------------------------------ */
export function FeaturedProductCard({ product, isWishlisted, onWishlist, onQuickView, onAddToCart }: BaseProps) {
  const discount = product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 0;
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-theme-sm)] transition-all duration-300 hover:shadow-[var(--shadow-theme-xl)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-sunken)]">
        <img src={product.image} alt={product.name} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top-left badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-brand-500)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
            <Award className="size-2.5" /> Featured
          </span>
          {product.tags.includes('best-seller') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-warning-500)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
              <TrendingUp className="size-2.5" /> Best Seller
            </span>
          )}
          {discount > 0 && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-error-500)] px-2.5 py-1 text-[10px] font-medium uppercase text-white">Save {discount}%</span>
          )}
        </div>

        {/* Top-right wishlist */}
        <button type="button" onClick={onWishlist} className="absolute right-4 top-4 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[var(--text-strong)] shadow-lg backdrop-blur transition hover:scale-110" aria-label="Toggle wishlist">
          <Heart className={cn('size-4', isWishlisted && 'fill-[var(--color-error-500)] text-[var(--color-error-500)]')} />
        </button>

        {/* Bottom overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">{product.category}</span>
          <h3 className="mt-1 text-lg font-medium text-white">{product.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs font-normal text-white/80">
            <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
            <span className="tabular-nums">{product.rating}</span>
            <span>·</span>
            <span className="tabular-nums">{product.reviews.toLocaleString()} reviews</span>
          </div>
        </div>
      </div>
      {/* Footer with price + actions */}
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tabular-nums text-[var(--text-strong)]">${product.price}</span>
          {product.compareAtPrice && <span className="text-sm text-[var(--text-subtle)] line-through tabular-nums">${product.compareAtPrice}</span>}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onQuickView} className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
            <Eye className="size-3.5" /> View
          </button>
          <button type="button" onClick={onAddToCart} className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--color-brand-500)] px-3 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]">
            <ShoppingCart className="size-3.5" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. WISHLIST CARD — compact horizontal card with remove button       */
/*    Used in: Section 6 (Wishlist)                                    */
/* ------------------------------------------------------------------ */
export function WishlistProductCard({ product, onWishlist, onQuickView, onAddToCart }: BaseProps) {
  return (
    <div className="group relative flex gap-3 overflow-hidden rounded-2xl border border-[var(--color-error-100)] bg-gradient-to-br from-[var(--color-error-50)]/40 to-[var(--card)] p-3 transition-all duration-300 hover:border-[var(--color-error-200)] hover:shadow-[var(--shadow-theme-sm)] dark:border-[rgba(240,68,56,0.16)] dark:from-[rgba(240,68,56,0.04)]">
      {/* Image */}
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-sunken)]">
        <img src={product.image} alt={product.name} className="size-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
        <span className="absolute left-1 top-1 inline-flex size-5 items-center justify-center rounded-full bg-[var(--color-error-500)] text-white">
          <Heart className="size-2.5 fill-current" />
        </span>
      </div>
      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{product.category}</span>
            <p className="mt-0.5 line-clamp-2 text-sm font-medium text-[var(--text-strong)]">{product.name}</p>
          </div>
          <button type="button" onClick={onWishlist} className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--color-error-50)] hover:text-[var(--color-error-600)] dark:hover:bg-[rgba(240,68,56,0.16)]" aria-label="Remove from wishlist">
            <Heart className="size-3.5 fill-[var(--color-error-500)] text-[var(--color-error-500)]" />
          </button>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs font-normal text-[var(--text-muted)]">
          <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
          <span className="tabular-nums">{product.rating}</span>
          <span>·</span>
          <span className="tabular-nums">{product.sold.toLocaleString()} sold</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold tabular-nums text-[var(--text-strong)]">${product.price}</span>
            {product.compareAtPrice && <span className="text-xs text-[var(--text-subtle)] line-through tabular-nums">${product.compareAtPrice}</span>}
          </div>
          <div className="flex gap-1">
            <button type="button" onClick={onQuickView} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Quick view">
              <Eye className="size-3.5" />
            </button>
            <button type="button" onClick={onAddToCart} className="inline-flex h-7 cursor-pointer items-center justify-center gap-1 rounded-lg bg-[var(--color-brand-500)] px-2 text-[10px] font-medium text-white transition hover:bg-[var(--color-brand-600)]">
              <ShoppingCart className="size-3" /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. COMPARE CARD — vertical card with checkmark & compare-action     */
/*    Used in: Section 7 (Comparison) — when no items selected, this   */
/*    card variant is shown as a suggestion list                       */
/* ------------------------------------------------------------------ */
export function CompareProductCard({ product, isCompared, onWishlist, onQuickView, onAddToCart, onCompare }: BaseProps) {
  const discount = product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 0;
  return (
    <div className={cn(
      'group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-[var(--card)] transition-all duration-300 hover:shadow-[var(--shadow-theme-md)]',
      isCompared
        ? 'border-[var(--color-brand-500)] ring-2 ring-[var(--color-brand-500)]/15'
        : 'border-[var(--border)] hover:border-[var(--color-brand-300)]',
    )}>
      <div className="relative aspect-square overflow-hidden bg-[var(--surface-sunken)]">
        <img src={product.image} alt={product.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        {discount > 0 && (
          <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-[var(--color-error-500)] px-1.5 py-0.5 text-[9px] font-medium uppercase text-white">-{discount}%</span>
        )}
        {/* Compare checkbox overlay */}
        <button
          type="button"
          onClick={onCompare}
          className={cn(
            'absolute right-2 top-2 inline-flex size-7 cursor-pointer items-center justify-center rounded-lg backdrop-blur transition',
            isCompared
              ? 'bg-[var(--color-brand-500)] text-white'
              : 'bg-white/90 text-[var(--text-muted)] hover:bg-white hover:text-[var(--color-brand-600)]',
          )}
          aria-label={isCompared ? 'Remove from compare' : 'Add to compare'}
          title={isCompared ? 'Remove from compare' : 'Add to compare'}
        >
          {isCompared ? <Check className="size-3.5" /> : <GitCompare className="size-3.5" />}
        </button>
        {/* Selected ribbon */}
        {isCompared && (
          <div className="absolute inset-x-0 bottom-0 bg-[var(--color-brand-500)] py-1 text-center text-[10px] font-medium uppercase tracking-wide text-white">
            Selected for compare
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{product.category}</span>
        <p className="mt-1 line-clamp-2 text-sm font-medium text-[var(--text-strong)]">{product.name}</p>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] font-normal text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-0.5">
            <Star className="size-2.5 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
            <span className="tabular-nums">{product.rating}</span>
          </span>
          <span>·</span>
          <span className="tabular-nums">{product.reviews.toLocaleString()}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold tabular-nums text-[var(--text-strong)]">${product.price}</span>
            {product.compareAtPrice && <span className="text-[10px] text-[var(--text-subtle)] line-through tabular-nums">${product.compareAtPrice}</span>}
          </div>
          <div className="flex gap-1">
            <button type="button" onClick={onQuickView} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Quick view">
              <Eye className="size-3.5" />
            </button>
            <button type="button" onClick={onWishlist} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Wishlist">
              <Heart className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
