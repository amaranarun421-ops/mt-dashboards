"use client";
import { useState, useMemo } from "react";
import { PageHeader, Card, CardBody, StatCard, Badge, Button, Avatar, MoreMenu } from "@/components/ui";
import { REVIEWS, PRODUCTS } from "@/data/mock";
import { cn, formatDate, initials } from "@/lib/utils";
import {
  Star, ThumbsUp, MessageSquare, Flag, Check, X, Reply, Filter, Download, MessageCircle,
} from "lucide-react";

const STATUS_TONE: Record<string, "success" | "warning" | "error" | "gray"> = {
  published: "success",
  pending: "warning",
  flagged: "error",
  rejected: "gray",
};

const COLOR_TONE: Record<string, string> = {
  brand: "from-emerald-400 to-teal-500",
  purple: "from-violet-400 to-purple-500",
  orange: "from-amber-400 to-orange-500",
  pink: "from-rose-400 to-pink-500",
  success: "from-lime-400 to-emerald-500",
  warning: "from-amber-400 to-yellow-500",
  error: "from-rose-400 to-red-500",
  gray: "from-slate-400 to-slate-500",
};

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} style={{ width: size, height: size }} className={cn(i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700")} />
      ))}
    </div>
  );
}

function productColor(name: string): string {
  const p = PRODUCTS.find((p) => p.name === name);
  return p?.color ?? "brand";
}

export default function ReviewsPage() {
  const [tab, setTab] = useState("all");
  const [replying, setReplying] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const filtered = useMemo(() => REVIEWS.filter((r) => tab === "all" ? true : r.status === tab), [tab]);

  const counts = {
    all: REVIEWS.length,
    published: REVIEWS.filter((r) => r.status === "published").length,
    pending: REVIEWS.filter((r) => r.status === "pending").length,
    flagged: REVIEWS.filter((r) => r.status === "flagged").length,
  };

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  const tabs = [
    { value: "all", label: "All", count: counts.all },
    { value: "published", label: "Published", count: counts.published },
    { value: "pending", label: "Pending", count: counts.pending },
    { value: "flagged", label: "Flagged", count: counts.flagged },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Reviews"
        description="Moderate customer reviews, approve pending submissions, and respond to feedback."
        breadcrumbs={[{ label: "Ecommerce" }, { label: "Reviews" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button variant="secondary"><Filter className="h-4 w-4" /> Filter</Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Total Reviews" value={String(counts.all)} delta="+12 this week" deltaTone="up" icon={MessageSquare} iconTone="brand" footer="across all products" />
        <StatCard label="Avg. Rating" value={`${avgRating} ★`} delta="+0.2 vs last month" deltaTone="up" icon={Star} iconTone="warning" footer="across all reviews" />
        <StatCard label="Pending Approval" value={String(counts.pending)} delta="awaiting review" deltaTone="down" icon={MessageCircle} iconTone="purple" footer="needs action" />
        <StatCard label="Flagged" value={String(counts.flagged)} delta="needs attention" deltaTone="down" icon={Flag} iconTone="error" footer="reported by users" />
      </div>

      {/* Tabs */}
      <div className="tab-list">
        {tabs.map((t) => (
          <button key={t.value} onClick={() => setTab(t.value)} className={cn("tab-trigger", tab === t.value && "tab-trigger-active")}>
            {t.label}
            <span className="ml-1 rounded-md bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold dark:bg-gray-700">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {filtered.map((r) => (
          <Card key={r.id}>
            <CardBody className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-bold text-white", COLOR_TONE[productColor(r.product)] ?? COLOR_TONE.brand)}>
                    {initials(r.product)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{r.product}</p>
                      <Badge tone={STATUS_TONE[r.status]} variant="soft" dot>{r.status}</Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Avatar name={r.customer} size={22} />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{r.customer} · {formatDate(r.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Stars rating={r.rating} />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{r.rating}.0</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{r.title}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{r.body}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> {r.helpful} helpful</span>
                  <span>·</span>
                  <span>Verified purchase</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {r.status === "pending" && (
                    <>
                      <Button size="sm" variant="success"><Check className="h-3.5 w-3.5" /> Approve</Button>
                      <Button size="sm" variant="outline"><X className="h-3.5 w-3.5" /> Reject</Button>
                    </>
                  )}
                  {r.status === "flagged" && (
                    <>
                      <Button size="sm" variant="outline"><Flag className="h-3.5 w-3.5" /> Review flag</Button>
                      <Button size="sm" variant="danger"><X className="h-3.5 w-3.5" /> Remove</Button>
                    </>
                  )}
                  {r.status === "published" && (
                    <Button size="sm" variant="outline" onClick={() => setReplying(replying === r.id ? null : r.id)}>
                      <Reply className="h-3.5 w-3.5" /> {replying === r.id ? "Cancel" : "Reply"}
                    </Button>
                  )}
                  <MoreMenu
                    items={[
                      { label: "View product" },
                      { label: "Email customer" },
                      { label: "Mark as featured" },
                      { label: "Hide review", danger: true },
                    ]}
                  />
                </div>
              </div>

              {replying === r.id && (
                <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder={`Reply to ${r.customer}...`}
                    className="input min-h-[80px] resize-y"
                  />
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => { setReplying(null); setReply(""); }}>Cancel</Button>
                    <Button size="sm" onClick={() => { setReplying(null); setReply(""); }}><Reply className="h-3.5 w-3.5" /> Post reply</Button>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
              <MessageSquare className="h-6 w-6 text-gray-300 dark:text-gray-600" />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No reviews in this category</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
