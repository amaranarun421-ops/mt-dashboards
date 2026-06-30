"use client";
import { useState, useMemo } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, Badge, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-7 min-w-7 text-xs gap-1",
  md: "h-9 min-w-9 text-sm gap-1.5",
  lg: "h-11 min-w-11 text-base gap-2",
};

const BTN_BASE =
  "inline-flex items-center justify-center rounded-md border border-transparent px-2 font-medium transition-all disabled:opacity-40 disabled:pointer-events-none";

/* ---------- Page button ---------- */
function PageButton({
  page,
  active,
  size = "md",
  onClick,
}: {
  page: number;
  active?: boolean;
  size?: Size;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        BTN_BASE,
        SIZE_CLASS[size],
        active
          ? "bg-brand-500 text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
      )}
    >
      {page}
    </button>
  );
}

/* ---------- Range with ellipsis ---------- */
function getRange(current: number, total: number, siblings = 1): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const range: (number | "...")[] = [];
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  range.push(total);
  return range;
}

/* ---------- Basic pagination ---------- */
function BasicPagination({ total, current, onChange }: { total: number; current: number; onChange: (p: number) => void }) {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className={cn(BTN_BASE, SIZE_CLASS.md, "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800")}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <PageButton key={p} page={p} active={p === current} onClick={() => onChange(p)} />
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className={cn(BTN_BASE, SIZE_CLASS.md, "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800")}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

/* ---------- With first/last ---------- */
function FirstLastPagination({ total, current, onChange }: { total: number; current: number; onChange: (p: number) => void }) {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      <button
        onClick={() => onChange(1)}
        disabled={current === 1}
        className={cn(BTN_BASE, SIZE_CLASS.md, "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800")}
        aria-label="First page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className={cn(BTN_BASE, SIZE_CLASS.md, "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800")}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Page <span className="text-gray-900 dark:text-white">{current}</span> / {total}
      </span>
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className={cn(BTN_BASE, SIZE_CLASS.md, "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800")}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      <button
        onClick={() => onChange(total)}
        disabled={current === total}
        className={cn(BTN_BASE, SIZE_CLASS.md, "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800")}
        aria-label="Last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

/* ---------- With ellipsis ---------- */
function EllipsisPagination({
  total,
  current,
  onChange,
  size = "md",
}: {
  total: number;
  current: number;
  onChange: (p: number) => void;
  size?: Size;
}) {
  const range = useMemo(() => getRange(current, total, 1), [current, total]);
  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className={cn(BTN_BASE, SIZE_CLASS[size], "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800")}
        aria-label="Previous page"
      >
        <ChevronLeft className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>
      {range.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className={cn("inline-flex items-center justify-center text-gray-400", SIZE_CLASS[size])}>
            <MoreHorizontal className="h-4 w-4" />
          </span>
        ) : (
          <PageButton key={p} page={p} active={p === current} size={size} onClick={() => onChange(p)} />
        )
      )}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className={cn(BTN_BASE, SIZE_CLASS[size], "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800")}
        aria-label="Next page"
      >
        <ChevronRight className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>
    </nav>
  );
}

/* ---------- Simple pager (prev/next only) ---------- */
function SimplePager({ total, current, onChange }: { total: number; current: number; onChange: (p: number) => void }) {
  return (
    <nav aria-label="Pager" className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </Button>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {current} / {total}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
      >
        Next <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}

/* ---------- Quick jump ---------- */
function QuickJumpPagination({
  total,
  current,
  onChange,
}: {
  total: number;
  current: number;
  onChange: (p: number) => void;
}) {
  const [value, setValue] = useState("");
  const jump = () => {
    const p = parseInt(value, 10);
    if (!Number.isNaN(p)) {
      onChange(Math.min(total, Math.max(1, p)));
      setValue("");
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <EllipsisPagination total={total} current={current} onChange={onChange} />
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500">Jump to</span>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && jump()}
          placeholder="page"
          className="h-8 w-16 text-xs"
          type="number"
          min={1}
          max={total}
        />
        <Button size="sm" variant="secondary" onClick={jump}>
          Go <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

export default function PaginationPage() {
  const [basic, setBasic] = useState(3);
  const [firstLast, setFirstLast] = useState(5);
  const [ellipsis, setEllipsis] = useState(7);
  const [size, setSize] = useState<{ p: number; size: Size }>({ p: 4, size: "md" });
  const [quick, setQuick] = useState(12);
  const [simple, setSimple] = useState(2);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Pagination"
        description="Navigation for paginated data — basic, with first/last, ellipsis, sizes, quick jump, and a simple prev/next pager."
        breadcrumbs={[{ label: "UI Components" }, { label: "Pagination" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Basic */}
        <Card>
          <CardHeader title="Basic" description="Numbered pages with prev/next chevrons" />
          <CardBody className="flex flex-col items-center gap-4">
            <BasicPagination total={6} current={basic} onChange={setBasic} />
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Badge tone="brand" variant="soft">Page {basic}</Badge>
              <span>of 6</span>
            </div>
          </CardBody>
        </Card>

        {/* With first/last */}
        <Card>
          <CardHeader title="With First / Last" description="Jump to first or last page instantly" />
          <CardBody className="flex flex-col items-center gap-4">
            <FirstLastPagination total={10} current={firstLast} onChange={setFirstLast} />
            <p className="text-xs text-gray-500">
              Showing records <span className="font-semibold text-gray-700 dark:text-gray-300">{(firstLast - 1) * 10 + 1}</span>–
              <span className="font-semibold text-gray-700 dark:text-gray-300">{Math.min(100, firstLast * 10)}</span> of 100
            </p>
          </CardBody>
        </Card>

        {/* With ellipsis */}
        <Card>
          <CardHeader title="With Ellipsis" description="Collapses middle pages for large totals" />
          <CardBody className="flex flex-col items-center gap-4">
            <EllipsisPagination total={20} current={ellipsis} onChange={setEllipsis} />
            <p className="text-xs text-gray-500">
              Use the chevrons or click a page number to navigate.
            </p>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader title="Sizes" description="sm, md, and lg variants" />
          <CardBody className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <Badge tone="gray" variant="soft">sm</Badge>
              <EllipsisPagination total={15} current={Math.min(15, Math.max(1, size.p))} onChange={(p) => setSize({ p, size: "sm" })} size="sm" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge tone="gray" variant="soft">md</Badge>
              <EllipsisPagination total={15} current={Math.min(15, Math.max(1, size.p))} onChange={(p) => setSize({ p, size: "md" })} size="md" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge tone="gray" variant="soft">lg</Badge>
              <EllipsisPagination total={15} current={Math.min(15, Math.max(1, size.p))} onChange={(p) => setSize({ p, size: "lg" })} size="lg" />
            </div>
          </CardBody>
        </Card>

        {/* Quick jump */}
        <Card>
          <CardHeader title="Quick Jump" description="Type a page number and press Enter" />
          <CardBody className="flex flex-col items-center gap-4">
            <QuickJumpPagination total={25} current={quick} onChange={setQuick} />
            <p className="text-xs text-gray-500">
              Useful for tables with hundreds of pages.
            </p>
          </CardBody>
        </Card>

        {/* Simple pager */}
        <Card>
          <CardHeader title="Simple Pager" description="Prev/next only — great for articles & wizards" />
          <CardBody className="flex flex-col items-center gap-4">
            <SimplePager total={5} current={simple} onChange={setSimple} />
            <p className="text-xs text-gray-500">
              No page numbers — just forward / back.
            </p>
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card>
          <CardHeader title="Anatomy & Tips" description="Pagination best practices" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">When to show</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Show pagination only when total items exceed the page size. For ≤20 items, render all.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Ellipsis threshold</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Collapse middle pages when total &gt; 7. Always show first, last, and 1 sibling on each side.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Current page</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Use <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">aria-current=&quot;page&quot;</code> on the active button.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Disabled state</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Prev chevron is disabled on page 1; next chevron is disabled on the last page.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
