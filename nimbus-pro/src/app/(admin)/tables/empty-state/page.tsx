"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, EmptyState, Button, Badge } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { ORDERS } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import {
  Inbox, SearchX, AlertTriangle, Plus, RefreshCw, PackageOpen, Trash2, RotateCcw, Filter,
} from "lucide-react";

type Order = (typeof ORDERS)[number];

const STATUS_TONE: Record<string, "success" | "warning" | "error" | "brand" | "gray"> = {
  delivered: "success",
  shipped: "brand",
  processing: "warning",
  cancelled: "error",
  pending: "gray",
};

const columns: Column<Order>[] = [
  { key: "id", header: "Order", sortable: true, cell: (o) => <span className="font-semibold text-gray-900 dark:text-white">{o.id}</span> },
  { key: "customer", header: "Customer", sortable: true, cell: (o) => <span className="text-sm text-gray-700 dark:text-gray-300">{o.customer}</span> },
  { key: "total", header: "Total", sortable: true, cell: (o) => <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(o.total)}</span> },
  { key: "status", header: "Status", sortable: true, cell: (o) => <Badge tone={STATUS_TONE[o.status]} variant="soft" dot className="capitalize">{o.status}</Badge> },
];

export default function EmptyStateTablePage() {
  const [interactiveRows, setInteractiveRows] = useState<Order[]>(ORDERS);

  const clearAll = () => setInteractiveRows([]);
  const restore = () => setInteractiveRows(ORDERS);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Empty States"
        description="Three empty state patterns for tables: no data, no search results, and error states."
        breadcrumbs={[{ label: "Tables" }, { label: "Empty States" }]}
      />

      {/* Three illustrative empty states */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* 1. No data */}
        <Card className="p-0">
          <CardHeader title="No data" description="Brand-new or cleared dataset" />
          <EmptyState
            icon={PackageOpen}
            title="No orders yet"
            description="When customers place orders, they'll appear here. Get started by creating your first order."
            action={<Button size="sm"><Plus className="h-3.5 w-3.5" /> New order</Button>}
          />
        </Card>

        {/* 2. No search results */}
        <Card className="p-0">
          <CardHeader title="No search results" description="Filters returned nothing" />
          <EmptyState
            icon={SearchX}
            title="No matches found"
            description="We couldn't find anything matching your filters. Try adjusting your search or clearing filters."
            action={
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Adjust filters</Button>
                <Button variant="ghost" size="sm">Clear all</Button>
              </div>
            }
          />
        </Card>

        {/* 3. Error state */}
        <Card className="p-0">
          <CardHeader title="Error state" description="Fetch failed or connection lost" />
          <EmptyState
            icon={AlertTriangle}
            title="Couldn't load data"
            description="Something went wrong while fetching orders. Check your connection and try again."
            action={<Button variant="outline" size="sm"><RefreshCw className="h-3.5 w-3.5" /> Retry</Button>}
            className="[&_>div:first-child]:bg-error-50 [&_>div:first-child]:text-error-500 dark:[&_>div:first-child]:bg-error-500/15 dark:[&_>div:first-child]:text-error-400"
          />
        </Card>
      </div>

      {/* Interactive demo: clear all rows to see empty state in a real table */}
      <Card className="p-0">
        <CardHeader
          title="Interactive demo"
          description="Clear the table to see the empty state inside a real DataTable."
          action={
            <div className="flex items-center gap-2">
              {interactiveRows.length === 0 ? (
                <Button size="sm" onClick={restore}><RotateCcw className="h-3.5 w-3.5" /> Restore data</Button>
              ) : (
                <Button variant="outline" size="sm" onClick={clearAll}><Trash2 className="h-3.5 w-3.5" /> Clear all</Button>
              )}
            </div>
          }
        />
        {interactiveRows.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No orders to display"
            description="You've cleared all rows. Restore the demo data to see the table again."
            action={<Button size="sm" onClick={restore}><RotateCcw className="h-3.5 w-3.5" /> Restore demo data</Button>}
          />
        ) : (
          <DataTable
            columns={columns}
            data={interactiveRows as unknown as Order[]}
            pageSize={5}
            searchPlaceholder="Search orders..."
          />
        )}
      </Card>

      {/* Pattern guidelines */}
      <Card className="p-5">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">Empty state guidelines</p>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <PackageOpen className="h-4 w-4 text-brand-500" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">No data</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Show a welcoming state with a primary CTA to create the first item. Use a friendly icon and helpful copy.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <SearchX className="h-4 w-4 text-warning-500" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">No results</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              When filters return nothing, offer to adjust filters or clear them. Mention the active filter count if helpful.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-error-500" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Error state</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Be honest about the failure. Provide a retry button and, if available, a link to status or support.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
