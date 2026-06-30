"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Tabs } from "@/components/shared/tabs";
import { StatCard } from "@/components/shared/stat-card";
import { Progress } from "@/components/shared/progress";
import { HeliosChart } from "@/components/shared/helios-chart";
import { ChartCard } from "@/components/shared/chart-card";
import { EmptyState } from "@/components/shared/empty-state";
import {
  StarIcon,
  EditIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  PackageIcon,
  WalletIcon,
  ArrowLeftIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  products,
  productById,
  type Product,
  type ProductReview,
} from "@/data/ecommerce/products";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className ?? ""}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon
          key={s}
          className={`size-4 ${s <= Math.round(rating) ? "text-accent" : "text-gray-3 dark:text-dark-3"}`}
        />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  const [showForm, setShowForm] = useState(false);
  const [response, setResponse] = useState(review.response?.body ?? "");
  const [sent, setSent] = useState(Boolean(review.response));

  function submitResponse() {
    if (response.trim() === "") return;
    setSent(true);
    setShowForm(false);
  }

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Avatar name={review.author} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-dark dark:text-white">{review.author}</p>
            {review.verified && <Badge variant="success" size="sm">Verified buyer</Badge>}
            <span className="text-xs text-dark-5 dark:text-dark-6">· {review.date}</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Stars rating={review.rating} />
            <span className="text-xs text-dark-5 dark:text-dark-6">{review.rating}.0</span>
          </div>
          <p className="mt-2 font-medium text-dark dark:text-white">{review.title}</p>
          <p className="mt-1 text-sm text-dark-7 dark:text-dark-7">{review.body}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-dark-5 dark:text-dark-6">
            <span>{review.helpful ?? 0} found this helpful</span>
            <button className="hover:text-primary dark:hover:text-primary-light">Helpful</button>
          </div>

          {sent && review.response && (
            <div className="mt-4 rounded-lg border border-primary/30 bg-primary-subtle/60 p-3 dark:border-primary/30 dark:bg-primary/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary-light">
                Response from {review.response.author}
              </p>
              <p className="mt-1 text-sm text-dark-7 dark:text-dark-7">{response}</p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{review.response.date}</p>
            </div>
          )}

          {showForm && !sent && (
            <div className="mt-4">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={3}
                placeholder="Write a public response..."
                className="w-full rounded-lg border border-stroke bg-white px-3.5 py-2.5 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-6 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button variant="primary" size="sm" onClick={submitResponse}>Post response</Button>
              </div>
            </div>
          )}

          {!sent && !showForm && (
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>Reply</Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function ProductDetailClient({ productId }: { productId?: string }) {
  const product = (productId ? productById(productId) : undefined) ?? products[0];
  const related = product.related
    .map((id) => productById(id))
    .filter((p): p is Product => Boolean(p));
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState("overview");
  const [ratingFilter, setRatingFilter] = useState(0);

  const visibleReviews = useMemo(() => {
    return ratingFilter === 0
      ? product.reviews
      : product.reviews.filter((r) => r.rating === ratingFilter);
  }, [product.reviews, ratingFilter]);

  const salesTrend = useMemo(() => {
    const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
    const base = product.revenue / 7;
    return months.map((m, i) => ({
      month: m,
      revenue: Math.round(base * (0.6 + Math.sin(i) * 0.3 + i * 0.05)),
      units: Math.round(product.sold / 7 * (0.6 + Math.cos(i) * 0.3 + i * 0.05)),
    }));
  }, [product]);

  const ratingBreakdown = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => {
      const count = product.reviews.filter((r) => r.rating === star).length;
      const pct = product.reviews.length === 0 ? 0 : (count / product.reviews.length) * 100;
      return { star, count, pct };
    });
  }, [product]);

  return (
    <div>
      <PageHeader
        title={product.name}
        description={`${product.brand} · ${product.sku} · ${product.category}`}
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/products" },
          { label: "Products", href: "/ecommerce/products" },
          { label: product.id },
        ]}
        actions={
          <>
            <Link href="/ecommerce/products">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="size-4" />
                Back
              </Button>
            </Link>
            <Link href="/ecommerce/products/edit">
              <Button variant="outline" size="sm">
                <EditIcon className="size-4" />
                Edit
              </Button>
            </Link>
            <Button variant="primary" size="sm">
              <ShoppingCartIcon className="size-4" />
              Add to cart
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left: gallery + tabs */}
        <div className="space-y-6">
          {/* Gallery */}
          <Card padded={false} className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_120px]">
              <div className="relative aspect-[4/3] bg-gray-2 dark:bg-dark-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.gallery[activeImage]} alt={product.name} className="size-full object-cover" />
                <span className="absolute left-4 top-4">
                  <Badge variant={product.status === "Active" ? "success" : product.status === "Out of stock" ? "danger" : "neutral"}>{product.status}</Badge>
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:overflow-y-auto">
                {product.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative size-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      activeImage === i ? "border-primary" : "border-transparent hover:border-stroke dark:hover:border-dark-3"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g} alt={`${product.name} ${i + 1}`} className="size-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Card padded={false}>
            <div className="border-b border-stroke px-5 dark:border-dark-3 md:px-6">
              <Tabs
                value={tab}
                onChange={setTab}
                tabs={[
                  { value: "overview", label: "Overview" },
                  { value: "specs", label: "Specifications" },
                  { value: "reviews", label: `Reviews (${product.reviewsCount})` },
                  { value: "related", label: "Related" },
                ]}
              />
            </div>
            <CardBody className="p-5 md:p-6">
              {tab === "overview" && (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-dark-7 dark:text-dark-7">{product.description}</p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {product.tags.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-lg bg-gray-2 px-3 py-1.5 text-xs font-medium text-dark-7 dark:bg-dark-3 dark:text-dark-7">
                        <span className="size-1.5 rounded-full bg-primary" />
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="rounded-xl border border-stroke p-4 dark:border-dark-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Variants</p>
                    <div className="mt-3 space-y-3">
                      {product.variants.map((v) => (
                        <div key={v.name} className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-dark dark:text-white">{v.name}:</span>
                          {v.options.map((o) => (
                            <span key={o} className="rounded-md border border-stroke px-2.5 py-1 text-xs text-dark-7 dark:border-dark-3 dark:text-dark-7">{o}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === "specs" && (
                <div className="overflow-hidden rounded-xl border border-stroke dark:border-dark-3">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.map((s, i) => (
                        <tr key={s.label} className={i !== product.specs.length - 1 ? "border-b border-stroke dark:border-dark-3" : ""}>
                          <td className="w-1/2 bg-gray-2 px-4 py-3 font-medium text-dark dark:bg-dark-3 dark:text-white">{s.label}</td>
                          <td className="px-4 py-3 text-dark-7 dark:text-dark-7">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === "reviews" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="rounded-xl border border-stroke p-5 text-center dark:border-dark-3">
                      <p className="text-4xl font-bold text-dark dark:text-white">{product.rating.toFixed(1)}</p>
                      <Stars rating={product.rating} className="mt-2 justify-center" />
                      <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Based on {product.reviewsCount} reviews</p>
                    </div>
                    <div className="space-y-1.5">
                      {ratingBreakdown.map((r) => (
                        <button
                          key={r.star}
                          onClick={() => setRatingFilter(ratingFilter === r.star ? 0 : r.star)}
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs transition ${
                            ratingFilter === r.star ? "bg-primary-subtle dark:bg-primary/10" : "hover:bg-gray-2 dark:hover:bg-dark-3"
                          }`}
                        >
                          <span className="inline-flex items-center gap-1 w-12 text-dark-7 dark:text-dark-7">
                            {r.star}
                            <StarIcon className="size-3 text-accent" />
                          </span>
                          <div className="flex-1">
                            <Progress value={r.pct} tone={r.star >= 4 ? "primary" : r.star === 3 ? "accent" : "danger"} size="xs" />
                          </div>
                          <span className="w-8 text-right text-dark-5 dark:text-dark-6">{r.count}</span>
                        </button>
                      ))}
                      {ratingFilter !== 0 && (
                        <button
                          onClick={() => setRatingFilter(0)}
                          className="mt-2 text-xs font-medium text-primary hover:underline dark:text-primary-light"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {visibleReviews.length === 0 ? (
                      <EmptyState
                        size="sm"
                        icon={<StarIcon className="size-6" />}
                        title="No reviews match this rating"
                        description="Try a different star filter."
                      />
                    ) : (
                      visibleReviews.map((r) => <ReviewCard key={r.id} review={r} />)
                    )}
                  </div>
                </div>
              )}

              {tab === "related" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {related.length === 0 ? (
                    <EmptyState size="sm" title="No related products" />
                  ) : (
                    related.map((p) => (
                      <Link key={p.id} href="/ecommerce/products/detail">
                        <Card hover className="flex gap-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt={p.name} className="size-20 rounded-lg object-cover" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-dark-5 dark:text-dark-6">{p.category}</p>
                            <p className="line-clamp-1 font-semibold text-dark dark:text-white">{p.name}</p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-dark-5 dark:text-dark-6">
                              <StarIcon className="size-3 text-accent" /> {p.rating.toFixed(1)} · ${p.price}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </CardBody>
          </Card>

          {/* Sales trend chart */}
          <ChartCard
            title="Sales trend"
            subtitle="Last 7 months revenue and units sold"
            action={<Badge variant="success">+12.4%</Badge>}
          >
            <HeliosChart
              type="area"
              height={300}
              options={{
                xaxis: { categories: salesTrend.map((s) => s.month) },
                stroke: { curve: "smooth", width: [3, 0] },
                fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
                yaxis: [
                  { labels: { formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` } },
                ],
                markers: { size: 0 },
              }}
              series={[
                { name: "Revenue", data: salesTrend.map((s) => s.revenue) },
              ]}
            />
          </ChartCard>
        </div>

        {/* Right: purchase panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Purchase" subtitle="Pricing and availability" />
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-dark dark:text-white">${product.price.toFixed(2)}</span>
                {product.compareAt && (
                  <span className="pb-1 text-base text-dark-5 line-through dark:text-dark-6">${product.compareAt.toFixed(2)}</span>
                )}
                {product.compareAt && (
                  <Badge variant="accent" size="sm" className="mb-1">
                    Save ${(product.compareAt - product.price).toFixed(0)}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Stars rating={product.rating} />
                <span className="text-sm text-dark-5 dark:text-dark-6">
                  {product.rating.toFixed(1)} · {product.reviewsCount} reviews
                </span>
              </div>
              <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-5 dark:text-dark-6">Stock</span>
                  <span className={`font-medium ${product.stock === 0 ? "text-red" : product.stock <= product.lowStockThreshold ? "text-accent-dark dark:text-accent-light" : "text-primary dark:text-primary-light"}`}>
                    {product.stock === 0 ? "Out of stock" : `${product.stock} units available`}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-dark-5 dark:text-dark-6">Warehouse</span>
                  <span className="font-medium text-dark dark:text-white">{product.warehouse}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-dark-5 dark:text-dark-6">Vendor</span>
                  <span className="font-medium text-dark dark:text-white">{product.vendor}</span>
                </div>
              </div>
              <Button variant="primary" size="lg" className="w-full" disabled={product.stock === 0}>
                <ShoppingCartIcon className="size-4" />
                {product.stock === 0 ? "Out of stock" : "Add to cart"}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">Save for later</Button>
                <Button variant="outline" size="sm">Share</Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Units sold"
              value={product.sold.toLocaleString()}
              icon={<ShoppingBagIcon className="size-5" />}
              tone="primary"
            />
            <StatCard
              label="Revenue"
              value={`$${(product.revenue / 1000).toFixed(0)}k`}
              icon={<WalletIcon className="size-5" />}
              tone="accent"
            />
          </div>

          <Card>
            <CardHeader title="Inventory" />
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-dark-5 dark:text-dark-6">On hand</span>
                <span className="font-medium text-dark dark:text-white">{product.stock}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-5 dark:text-dark-6">Committed</span>
                <span className="font-medium text-dark dark:text-white">{Math.round(product.stock * 0.08)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-5 dark:text-dark-6">Available</span>
                <span className="font-medium text-primary dark:text-primary-light">{product.stock - Math.round(product.stock * 0.08)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-5 dark:text-dark-6">Reorder point</span>
                <span className="font-medium text-dark dark:text-white">{product.lowStockThreshold}</span>
              </div>
              <Progress value={Math.min(100, (product.stock / (product.lowStockThreshold * 8)) * 100)} tone={product.stock === 0 ? "danger" : product.stock <= product.lowStockThreshold ? "accent" : "primary"} showLabel label="Stock health" />
            </div>
          </Card>

          <Card>
            <CardHeader title="SEO" />
            <dl className="space-y-2 text-xs">
              <div>
                <dt className="font-semibold text-dark-5 dark:text-dark-6">Title</dt>
                <dd className="mt-0.5 text-dark-7 dark:text-dark-7">{product.seo.title}</dd>
              </div>
              <div>
                <dt className="font-semibold text-dark-5 dark:text-dark-6">Slug</dt>
                <dd className="mt-0.5 font-mono text-dark-7 dark:text-dark-7">/{product.seo.slug}</dd>
              </div>
              <div>
                <dt className="font-semibold text-dark-5 dark:text-dark-6">Meta description</dt>
                <dd className="mt-0.5 text-dark-7 dark:text-dark-7">{product.seo.metaDescription}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}
