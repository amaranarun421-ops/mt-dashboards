"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Tabs } from "@/components/shared/tabs";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { inputClass } from "@/components/shared/form-section";
import {
  ShoppingBagIcon,
  EditIcon,
  StarIcon,
  PackageIcon,
  BoxIcon,
} from "@/components/Layouts/sidebar/icons";
import { SearchIcon } from "@/components/Layouts/sidebar/icons-extra";
import {
  products,
  productCategories,
  type Product,
} from "@/data/ecommerce/products";

const statusVariant: Record<Product["status"], "success" | "neutral" | "warning" | "danger"> = {
  Active: "success",
  Draft: "neutral",
  Archived: "warning",
  "Out of stock": "danger",
};

type SortKey = "name" | "price" | "stock" | "sold" | "rating" | "revenue";

export default function ProductsClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [sortBy, setSortBy] = useState<SortKey>("revenue");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const arr = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (q !== "" && !(p.name + p.sku + p.brand + p.tags.join(" ")).toLowerCase().includes(q)) return false;
      return true;
    });
    const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
      name: (a, b) => a.name.localeCompare(b.name),
      price: (a, b) => a.price - b.price,
      stock: (a, b) => a.stock - b.stock,
      sold: (a, b) => b.sold - a.sold,
      rating: (a, b) => b.rating - a.rating,
      revenue: (a, b) => b.revenue - a.revenue,
    };
    return arr.sort(sorters[sortBy]);
  }, [query, category, statusFilter, sortBy]);

  const counts = useMemo(() => {
    return {
      All: products.length,
      Active: products.filter((p) => p.status === "Active").length,
      Draft: products.filter((p) => p.status === "Draft").length,
      "Out of stock": products.filter((p) => p.status === "Out of stock").length,
    };
  }, []);

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage your catalog, inventory levels, pricing and product status."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/products" },
          { label: "Products" },
        ]}
        actions={
          <>
            <Link href="/ecommerce/products/add">
              <Button variant="outline" size="sm">
                <EditIcon className="size-4" />
                Add product
              </Button>
            </Link>
            <Button variant="primary" size="sm">
              <PackageIcon className="size-4" />
              Import CSV
            </Button>
          </>
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-xl bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
            <PackageIcon className="size-5" />
          </span>
          <div>
            <p className="text-xs text-dark-5 dark:text-dark-6">Total products</p>
            <p className="text-xl font-bold text-dark dark:text-white">{products.length}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-xl bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light">
            <ShoppingBagIcon className="size-5" />
          </span>
          <div>
            <p className="text-xs text-dark-5 dark:text-dark-6">Units sold (30d)</p>
            <p className="text-xl font-bold text-dark dark:text-white">
              {products.reduce((s, p) => s + p.sold, 0).toLocaleString()}
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-xl bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light">
            <StarIcon className="size-5" />
          </span>
          <div>
            <p className="text-xs text-dark-5 dark:text-dark-6">Avg. rating</p>
            <p className="text-xl font-bold text-dark dark:text-white">
              {(products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(2)}
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="grid size-11 place-items-center rounded-xl bg-red-light-5 text-red-dark dark:bg-red/15 dark:text-red-light">
            <BoxIcon className="size-5" />
          </span>
          <div>
            <p className="text-xs text-dark-5 dark:text-dark-6">Out of stock</p>
            <p className="text-xl font-bold text-dark dark:text-white">
              {products.filter((p) => p.status === "Out of stock").length}
            </p>
          </div>
        </Card>
      </div>

      {/* Filter bar */}
      <Card className="mt-6" padded={false}>
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="relative w-full md:max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, SKUs, brands..."
              className={`${inputClass} pl-9`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputClass} h-10 w-auto`}
            >
              <option value="All">All categories</option>
              {productCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className={`${inputClass} h-10 w-auto`}
            >
              <option value="revenue">Sort: Revenue</option>
              <option value="sold">Sort: Units sold</option>
              <option value="rating">Sort: Rating</option>
              <option value="price">Sort: Price</option>
              <option value="stock">Sort: Stock</option>
              <option value="name">Sort: Name</option>
            </select>
            <div className="inline-flex overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
              <button
                onClick={() => setView("grid")}
                className={`grid size-10 place-items-center transition ${
                  view === "grid"
                    ? "bg-primary text-white"
                    : "bg-white text-dark-5 hover:bg-gray-2 dark:bg-dark-2 dark:text-dark-6 dark:hover:bg-dark-3"
                }`}
                aria-label="Grid view"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
              <button
                onClick={() => setView("table")}
                className={`grid size-10 place-items-center transition ${
                  view === "table"
                    ? "bg-primary text-white"
                    : "bg-white text-dark-5 hover:bg-gray-2 dark:bg-dark-2 dark:text-dark-6 dark:hover:bg-dark-3"
                }`}
                aria-label="Table view"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <path d="M4 5h16M4 12h16M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 pb-3 md:px-5">
          <Tabs
            variant="pills"
            value={statusFilter}
            onChange={setStatusFilter}
            tabs={[
              { value: "All", label: "All", badge: <Badge variant="neutral" size="sm">{counts.All}</Badge> },
              { value: "Active", label: "Active", badge: <Badge variant="success" size="sm">{counts.Active}</Badge> },
              { value: "Draft", label: "Draft", badge: <Badge variant="neutral" size="sm">{counts.Draft}</Badge> },
              { value: "Out of stock", label: "Out of stock", badge: <Badge variant="danger" size="sm">{counts["Out of stock"]}</Badge> },
            ]}
          />
        </div>
      </Card>

      {/* Body */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <Card>
            <EmptyState
              icon={<ShoppingBagIcon className="size-7" />}
              title="No products match your filters"
              description="Try adjusting your search query or filters."
              action={<Button variant="primary" size="sm" onClick={() => { setQuery(""); setCategory("All"); setStatusFilter("All"); }}>Reset filters</Button>}
            />
          </Card>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <Card key={p.id} hover padded={false} className="overflow-hidden">
                <Link href="/ecommerce/products/detail" className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-2 dark:bg-dark-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} className="size-full object-cover transition-transform duration-500 hover:scale-105" />
                    <span className="absolute left-3 top-3">
                      <Badge variant={statusVariant[p.status]} size="sm">{p.status}</Badge>
                    </span>
                    {p.compareAt && (
                      <span className="absolute right-3 top-3">
                        <Badge variant="accent" size="sm">Sale</Badge>
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">{p.category}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-dark dark:text-white">
                      <StarIcon className="size-3.5 text-accent" />
                      {p.rating.toFixed(1)}
                      <span className="text-dark-5 dark:text-dark-6">({p.reviewsCount})</span>
                    </span>
                  </div>
                  <Link href="/ecommerce/products/detail">
                    <h3 className="mt-1 line-clamp-1 font-semibold text-dark hover:text-primary dark:text-white">{p.name}</h3>
                  </Link>
                  <p className="mt-0.5 line-clamp-1 text-xs text-dark-5 dark:text-dark-6">{p.brand} · {p.sku}</p>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <span className="text-lg font-bold text-dark dark:text-white">${p.price}</span>
                      {p.compareAt && (
                        <span className="ml-1 text-xs text-dark-5 line-through dark:text-dark-6">${p.compareAt}</span>
                      )}
                    </div>
                    <span className={`text-xs font-medium ${p.stock === 0 ? "text-red" : p.stock <= p.lowStockThreshold ? "text-accent-dark dark:text-accent-light" : "text-dark-5 dark:text-dark-6"}`}>
                      {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Link href="/ecommerce/products/edit" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <EditIcon className="size-3.5" /> Edit
                      </Button>
                    </Link>
                    <Link href="/ecommerce/products/detail" className="flex-1">
                      <Button variant="soft" size="sm" className="w-full">View</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card padded={false}>
            <CardHeader
              title="Products"
              subtitle={`${filtered.length} of ${products.length} products`}
              className="px-5 pt-5 md:px-6 md:pt-6"
              action={<Badge variant="primary">{filtered.length} shown</Badge>}
            />
            <DataTable<Product>
              data={filtered}
              rowKey={(p) => p.id}
              pageSize={10}
              onRowClick={() => {}}
              columns={[
                {
                  key: "name",
                  header: "Product",
                  sortable: true,
                  sortAccessor: (p) => p.name,
                  cell: (p) => (
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} className="size-12 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <Link href="/ecommerce/products/detail" className="block truncate font-medium text-dark hover:text-primary dark:text-white">{p.name}</Link>
                        <p className="text-xs text-dark-5 dark:text-dark-6">{p.sku} · {p.brand}</p>
                      </div>
                    </div>
                  ),
                },
                { key: "category", header: "Category", cell: (p) => <Badge variant="neutral">{p.category}</Badge> },
                {
                  key: "price",
                  header: "Price",
                  sortable: true,
                  sortAccessor: (p) => p.price,
                  cell: (p) => (
                    <div>
                      <p className="font-medium text-dark dark:text-white">${p.price.toFixed(2)}</p>
                      {p.compareAt && <p className="text-xs text-dark-5 line-through dark:text-dark-6">${p.compareAt.toFixed(2)}</p>}
                    </div>
                  ),
                },
                {
                  key: "stock",
                  header: "Stock",
                  sortable: true,
                  sortAccessor: (p) => p.stock,
                  cell: (p) => (
                    <span className={p.stock === 0 ? "font-medium text-red" : p.stock <= p.lowStockThreshold ? "font-medium text-accent-dark dark:text-accent-light" : "text-dark-7 dark:text-dark-7"}>
                      {p.stock}
                    </span>
                  ),
                },
                {
                  key: "sold",
                  header: "Sold",
                  sortable: true,
                  sortAccessor: (p) => p.sold,
                  cell: (p) => <span className="text-dark-7 dark:text-dark-7">{p.sold.toLocaleString()}</span>,
                },
                {
                  key: "rating",
                  header: "Rating",
                  sortable: true,
                  sortAccessor: (p) => p.rating,
                  cell: (p) => (
                    <span className="inline-flex items-center gap-1">
                      <StarIcon className="size-3.5 text-accent" />
                      <span className="font-medium text-dark dark:text-white">{p.rating.toFixed(1)}</span>
                      <span className="text-xs text-dark-5 dark:text-dark-6">({p.reviewsCount})</span>
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Status",
                  cell: (p) => <Badge variant={statusVariant[p.status]} size="sm">{p.status}</Badge>,
                },
                {
                  key: "actions",
                  header: "",
                  cell: (p) => (
                    <div className="flex items-center justify-end gap-1">
                      <Link href="/ecommerce/products/edit">
                        <Button variant="ghost" size="iconSm" aria-label="Edit">
                          <EditIcon className="size-4" />
                        </Button>
                      </Link>
                    </div>
                  ),
                  width: "60px",
                },
              ]}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
