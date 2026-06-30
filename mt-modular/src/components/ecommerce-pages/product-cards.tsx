'use client';

import * as React from 'react';
import {
  Download,
  Filter,
  Grid2x2,
  List,
  MoreHorizontal,
  Package,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  TrendingUp,
  Eye,
  Copy,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge, MetricCard, SearchInput } from '@/components/dashboard/primitives';
import { DataTable, type Column } from '@/components/dashboard/data-table';
import { DropdownMenu, DropdownItem } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { useDashboardStore } from '@/lib/dashboard-store';
import { products, productCategories, type Product } from '@/lib/ecommerce-data';
import { cn } from '@/lib/utils';

export function ProductCardsPage() {
  const { toast } = useToast();
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  const [view, setView] = React.useState<'grid' | 'list'>('grid');
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');
  const [status, setStatus] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('newest');

  const filtered = React.useMemo(() => {
    let result = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (status !== 'all' && p.status !== status) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });

    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'best-selling') result = [...result].sort((a, b) => b.sold - a.sold);

    return result;
  }, [search, category, status, sortBy]);

  const columns: Column<Product>[] = [
    {
      key: 'name',
      header: 'Product',
      sortable: true,
      cell: (p) => (
        <div className="flex items-center gap-3">
          <img
            src={p.image}
            alt={p.name}
            className="size-12 flex-shrink-0 rounded-lg object-cover"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="truncate font-semibold text-[var(--text-strong)]">{p.name}</p>
            <p className="truncate text-xs font-medium text-[var(--text-muted)]">{p.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      cell: (p) => <StatusBadge tone="brand">{p.category}</StatusBadge>,
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      sortValue: (p) => p.price,
      align: 'right',
      cell: (p) => (
        <div>
          <p className="font-semibold text-[var(--text-strong)]">${p.price}</p>
          {p.compareAtPrice && (
            <p className="text-xs font-medium text-[var(--text-subtle)] line-through">${p.compareAtPrice}</p>
          )}
        </div>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      sortable: true,
      sortValue: (p) => p.stock,
      align: 'right',
      cell: (p) => (
        <span
          className={cn(
            'font-semibold',
            p.stock === 0
              ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]'
              : p.stock < 50
                ? 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]'
                : 'text-[var(--text-body)]',
          )}
        >
          {p.stock}
        </span>
      ),
    },
    {
      key: 'sold',
      header: 'Sold',
      sortable: true,
      sortValue: (p) => p.sold,
      align: 'right',
      cell: (p) => <span className="font-semibold text-[var(--text-body)]">{p.sold.toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'center',
      cell: (p) => (
        <StatusBadge
          tone={
            p.status === 'Active'
              ? 'success'
              : p.status === 'Draft'
                ? 'warning'
                : 'neutral'
          }
          dot
        >
          {p.status}
        </StatusBadge>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      cell: (p) => (
        <DropdownMenu
          trigger={
            <span className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
              <MoreHorizontal className="size-4" />
            </span>
          }
        >
          <DropdownItem icon={Eye}>View</DropdownItem>
          <DropdownItem icon={Pencil} onClick={() => toast({ title: 'Edit product', description: `Opening editor for ${p.name}` })}>
            Edit
          </DropdownItem>
          <DropdownItem icon={Copy} onClick={() => toast({ title: 'Product duplicated', description: `${p.name} duplicated as a draft` })}>
            Duplicate
          </DropdownItem>
          <DropdownItem icon={Trash2} onClick={() => toast({ title: 'Product archived', description: `${p.name} has been archived`, variant: 'destructive' })}>
            Archive
          </DropdownItem>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'E-commerce' }, { label: 'Product Cards' }]}
        title="Product Cards"
        description="Manage your product catalog, inventory, and pricing."
        actions={
          <>
            <button
              type="button"
              className="ds-btn ds-btn-secondary"
              onClick={() => toast({ title: 'Export queued', description: 'Your product catalog will download as CSV' })}
            >
              <Download className="size-4" /> <span className="hidden sm:inline">Export</span>
            </button>
            <button
              type="button"
              className="ds-btn ds-btn-primary"
              onClick={() => setEcommerce('add-product')}
            >
              <Plus className="size-4" /> Add product
            </button>
          </>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard index={0} label="Total Products" value={products.length.toString()} helper={`${products.filter((p) => p.status === 'Active').length} active`} icon={Package} accent="brand" />
        <MetricCard index={1} label="Out of Stock" value={products.filter((p) => p.stock === 0).length.toString()} helper="Need restock" icon={Package} accent="error" />
        <MetricCard index={2} label="Total Inventory Value" value={`$${(products.reduce((sum, p) => sum + p.price * p.stock, 0) / 1000).toFixed(1)}K`} helper="Across all SKUs" icon={TrendingUp} accent="success" />
        <MetricCard index={3} label="Avg. Rating" value="4.6" helper={`${products.reduce((sum, p) => sum + p.reviews, 0).toLocaleString()} reviews`} icon={Star} accent="warning" />
      </div>

      {/* Filters bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name, SKU, or category..."
          className="flex-1"
        />
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-40">
            <Select
              size="sm"
              value={category}
              onChange={setCategory}
              options={[
                { value: 'all', label: 'All categories' },
                ...productCategories.map((c) => ({ value: c, label: c })),
              ]}
              aria-label="Category filter"
            />
          </div>
          <div className="w-32">
            <Select
              size="sm"
              value={status}
              onChange={setStatus}
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'Active', label: 'Active' },
                { value: 'Draft', label: 'Draft' },
                { value: 'Archived', label: 'Archived' },
              ]}
              aria-label="Status filter"
            />
          </div>
          <div className="w-36">
            <Select
              size="sm"
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Top rated' },
                { value: 'best-selling', label: 'Best selling' },
              ]}
              aria-label="Sort by"
            />
          </div>
          {/* View toggle */}
          <div className="inline-flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
            <button
              type="button"
              onClick={() => setView('grid')}
              data-active={view === 'grid'}
              aria-label="Grid view"
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)] data-[active=true]:shadow-[var(--shadow-theme-xs)]"
            >
              <Grid2x2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              data-active={view === 'list'}
              aria-label="List view"
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)] data-[active=true]:shadow-[var(--shadow-theme-xs)]"
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-medium text-[var(--text-muted)]">
        <span>Showing {filtered.length} of {products.length} products</span>
        {filtered.length === 0 && (
          <button type="button" className="cursor-pointer font-semibold text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" onClick={() => { setSearch(''); setCategory('all'); setStatus('all'); }}>
            Clear filters
          </button>
        )}
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onView={() => toast({ title: 'Viewing product', description: product.name })} onEdit={() => toast({ title: 'Edit product', description: `Opening editor for ${product.name}` })} />
          ))}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <SectionCard title="Product List" description="Detailed list of all products" noBodyPadding>
          <DataTable
            columns={columns}
            data={filtered}
            rowKey={(row) => row.id}
            enableSort
            enablePagination
            pageSize={10}
          />
        </SectionCard>
      )}

      {filtered.length === 0 && (
        <SectionCard>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--surface-sunken)] text-[var(--text-subtle)]">
              <Package className="size-6" />
            </div>
            <p className="mt-4 text-sm font-semibold text-[var(--text-strong)]">No products found</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Try adjusting your filters or search query</p>
            <button type="button" className="ds-btn ds-btn-primary mt-4 !h-9 !text-xs" onClick={() => setEcommerce('add-product')}>
              <Plus className="size-3.5" /> Add a product
            </button>
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function ProductCard({ product, onView, onEdit }: { product: Product; onView: () => void; onEdit: () => void }) {
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="ds-card group overflow-hidden ds-card-hover">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-sunken)]">
        <img
          src={product.image}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-error-500)] px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              -{discount}%
            </span>
          )}
          {product.tags.includes('best-seller') && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-warning-500)] px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              Best Seller
            </span>
          )}
          {product.tags.includes('new') && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-success-500)] px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              New
            </span>
          )}
          {product.stock === 0 && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-error-700)] px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              Out of Stock
            </span>
          )}
        </div>
        {/* Hover actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={onView}
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-white/90 text-[var(--text-strong)] shadow-sm backdrop-blur transition hover:bg-white"
            aria-label="View product"
          >
            <Eye className="size-4" />
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-white/90 text-[var(--text-strong)] shadow-sm backdrop-blur transition hover:bg-white"
            aria-label="Edit product"
          >
            <Pencil className="size-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <StatusBadge tone="brand">{product.category}</StatusBadge>
          <span className="flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)]">
            <Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
            {product.rating}
          </span>
        </div>
        <h3 className="mt-2 truncate text-sm font-semibold text-[var(--text-strong)]" title={product.name}>
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">
          {product.sku} · {product.reviews.toLocaleString()} reviews
        </p>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-[var(--text-strong)]">${product.price}</span>
          {product.compareAtPrice && (
            <span className="text-sm font-medium text-[var(--text-subtle)] line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>

        {/* Stock + sold */}
        <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Stock</p>
            <p className={cn('text-sm font-semibold', product.stock === 0 ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--text-strong)]')}>
              {product.stock}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Sold</p>
            <p className="text-sm font-semibold text-[var(--text-strong)]">{product.sold.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
