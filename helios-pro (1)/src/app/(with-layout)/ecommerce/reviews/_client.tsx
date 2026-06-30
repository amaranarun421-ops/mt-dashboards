"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Tabs } from "@/components/shared/tabs";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Progress } from "@/components/shared/progress";
import { inputClass } from "@/components/shared/form-section";
import {
  StarIcon,
  ShoppingBagIcon,
  CheckSquareIcon,
  AlertTriangleIcon,
} from "@/components/Layouts/sidebar/icons";
import { SearchIcon } from "@/components/Layouts/sidebar/icons-extra";
import {
  reviews as initialReviews,
  reviewStatuses,
  reviewSummary,
  type Review,
  type ReviewStatus,
} from "@/data/ecommerce/reviews";

const statusVariant: Record<ReviewStatus, "success" | "warning" | "danger" | "neutral"> = {
  Published: "success",
  Pending: "warning",
  Flagged: "danger",
  Hidden: "neutral",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon
          key={s}
          className={`size-4 ${s <= Math.round(rating) ? "text-accent" : "text-gray-3 dark:text-dark-3"}`}
        />
      ))}
    </span>
  );
}

function ReviewRow({ review }: { review: Review }) {
  const [showForm, setShowForm] = useState(false);
  const [response, setResponse] = useState(review.response?.body ?? "");
  const [sent, setSent] = useState(Boolean(review.response));
  const [hidden, setHidden] = useState(review.status === "Hidden");

  function submit() {
    if (response.trim() === "") return;
    setSent(true);
    setShowForm(false);
  }

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Avatar name={review.author} src={review.avatar} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/ecommerce/products/detail" className="font-semibold text-dark hover:text-primary dark:text-white">{review.author}</Link>
            {review.verified && <Badge variant="success" size="sm">Verified buyer</Badge>}
            <Badge variant={statusVariant[hidden ? "Hidden" : review.status]} size="sm">{hidden ? "Hidden" : review.status}</Badge>
            <span className="text-xs text-dark-5 dark:text-dark-6">· {review.date}</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Stars rating={review.rating} />
            <span className="text-xs text-dark-5 dark:text-dark-6">{review.rating}.0</span>
          </div>
          <p className="mt-2 font-medium text-dark dark:text-white">{review.title}</p>
          <p className="mt-1 text-sm text-dark-7 dark:text-dark-7">{review.body}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-dark-5 dark:text-dark-6">
            <span>Product: <Link href="/ecommerce/products/detail" className="font-medium text-primary hover:underline dark:text-primary-light">{review.product}</Link></span>
            <span>·</span>
            <span>{review.helpful} found helpful</span>
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
                className={`w-full rounded-lg border border-stroke bg-white px-3.5 py-2.5 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-6 dark:border-dark-3 dark:bg-dark-2 dark:text-white`}
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button variant="primary" size="sm" onClick={submit}>Post response</Button>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {!sent && !showForm && (
              <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <path d="M4 20h4l11-11a2.8 2.8 0 00-4-4L4 16v4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                Reply
              </Button>
            )}
            <Button variant="ghost" size="sm">Feature</Button>
            <Button variant="ghost" size="sm" onClick={() => setHidden((h) => !h)}>
              {hidden ? "Unhide" : "Hide"}
            </Button>
            {review.status === "Flagged" && (
              <Button variant="ghost" size="sm" className="text-primary">Approve</Button>
            )}
            <Button variant="ghost" size="sm" className="text-red">Delete</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function ReviewsClient() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialReviews.filter((r) => {
      if (statusFilter !== "All" && r.status !== statusFilter) return false;
      if (ratingFilter !== 0 && r.rating !== ratingFilter) return false;
      if (q !== "" && !((r.title + r.body + r.author + r.product).toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, statusFilter, ratingFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: initialReviews.length };
    for (const s of reviewStatuses) {
      c[s] = initialReviews.filter((r) => r.status === s).length;
    }
    return c;
  }, []);

  return (
    <div>
      <PageHeader
        title="Reviews"
        description="Moderate customer reviews, respond to feedback and surface product issues."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/reviews" },
          { label: "Reviews" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="primary" size="sm">
              <CheckSquareIcon className="size-4" />
              Bulk approve
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total reviews" value={reviewSummary.total} icon={<StarIcon className="size-5" />} tone="primary" />
        <StatCard label="Average rating" value={reviewSummary.average} icon={<StarIcon className="size-5" />} tone="accent" sublabel="across all products" />
        <StatCard label="Pending approval" value={reviewSummary.pending} icon={<ShoppingBagIcon className="size-5" />} tone="warning" />
        <StatCard label="Flagged" value={reviewSummary.flagged} icon={<AlertTriangleIcon className="size-5" />} tone="danger" />
      </div>

      {/* Distribution + filters */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <Card>
          <CardHeader title="Rating filter" />
          <div className="space-y-1.5">
            <button
              onClick={() => setRatingFilter(0)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition ${
                ratingFilter === 0 ? "bg-primary-subtle dark:bg-primary/10" : "hover:bg-gray-2 dark:hover:bg-dark-3"
              }`}
            >
              <span className="w-16 text-dark-7 dark:text-dark-7">All ratings</span>
              <span className="ml-auto font-medium text-dark-5 dark:text-dark-6">{initialReviews.length}</span>
            </button>
            {reviewSummary.distribution.map((d) => (
              <button
                key={d.star}
                onClick={() => setRatingFilter(ratingFilter === d.star ? 0 : d.star)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition ${
                  ratingFilter === d.star ? "bg-primary-subtle dark:bg-primary/10" : "hover:bg-gray-2 dark:hover:bg-dark-3"
                }`}
              >
                <span className="inline-flex items-center gap-1 w-16 text-dark-7 dark:text-dark-7">
                  {d.star}
                  <StarIcon className="size-3 text-accent" />
                </span>
                <div className="flex-1">
                  <Progress
                    value={initialReviews.length === 0 ? 0 : (d.count / initialReviews.length) * 100}
                    tone={d.star >= 4 ? "primary" : d.star === 3 ? "accent" : "danger"}
                    size="xs"
                  />
                </div>
                <span className="w-6 text-right font-medium text-dark-5 dark:text-dark-6">{d.count}</span>
              </button>
            ))}
            {ratingFilter !== 0 && (
              <button
                onClick={() => setRatingFilter(0)}
                className="mt-2 text-xs font-medium text-primary hover:underline dark:text-primary-light"
              >
                Clear rating filter
              </button>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card padded={false}>
            <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:p-5">
              <div className="relative w-full md:max-w-sm">
                <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search reviews by author, product, or content..."
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>
            <div className="px-4 pb-3 md:px-5">
              <Tabs
                variant="pills"
                value={statusFilter}
                onChange={setStatusFilter}
                tabs={[
                  { value: "All", label: "All", badge: <Badge variant="neutral" size="sm">{counts.All}</Badge> },
                  ...reviewStatuses.map((s) => ({
                    value: s,
                    label: s,
                    badge: <Badge variant={statusVariant[s]} size="sm">{counts[s]}</Badge>,
                  })),
                ]}
              />
            </div>
          </Card>

          {filtered.length === 0 ? (
            <Card>
              <EmptyState
                icon={<StarIcon className="size-7" />}
                title="No reviews match your filters"
                description="Try adjusting your search query, status or rating filter."
                action={<Button variant="primary" size="sm" onClick={() => { setQuery(""); setStatusFilter("All"); setRatingFilter(0); }}>Reset filters</Button>}
              />
            </Card>
          ) : (
            <div className="space-y-4">
              {filtered.map((r) => <ReviewRow key={r.id} review={r} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
