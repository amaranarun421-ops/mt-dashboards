"use client";
import { useState } from "react";
import { PageHeader, Badge, Button, Select } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { ORDERS } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import { X } from "lucide-react";

type Order = typeof ORDERS[number];

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
  { key: "date", header: "Date", sortable: true },
  { key: "items", header: "Items", sortable: true },
  { key: "total", header: "Total", sortable: true, cell: (o) => <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(o.total)}</span> },
  { key: "channel", header: "Channel", sortable: true, cell: (o) => <Badge tone={o.channel === "web" ? "brand" : "purple"} variant="soft" className="capitalize">{o.channel}</Badge> },
  { key: "payment", header: "Payment", sortable: true, cell: (o) => <Badge tone={o.payment === "paid" ? "success" : o.payment === "pending" ? "warning" : "error"} variant="soft" dot className="capitalize">{o.payment}</Badge> },
  { key: "status", header: "Status", sortable: true, cell: (o) => <Badge tone={STATUS_TONE[o.status]} variant="soft" dot className="capitalize">{o.status}</Badge> },
];

export default function FilteringTablePage() {
  const [status, setStatus] = useState("all");
  const [channel, setChannel] = useState("all");
  const [payment, setPayment] = useState("all");

  const filtered = ORDERS.filter((o) => {
    const s = status === "all" ? true : o.status === status;
    const c = channel === "all" ? true : o.channel === channel;
    const p = payment === "all" ? true : o.payment === payment;
    return s && c && p;
  });

  const reset = () => { setStatus("all"); setChannel("all"); setPayment("all"); };
  const activeFilters = [status, channel, payment].filter((f) => f !== "all").length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Filtering Table"
        description="DataTable with external filter controls in the toolbar."
        breadcrumbs={[{ label: "Tables" }, { label: "Filtering" }]}
      />

      <DataTable
        columns={columns}
        data={filtered as unknown as Order[]}
        pageSize={8}
        searchPlaceholder="Search orders by id, customer..."
        initialSort={{ key: "date", dir: "desc" }}
        toolbar={
          <div className="flex flex-wrap items-center gap-2">
            <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-auto">
              <option value="all">All status</option>
              <option value="delivered">Delivered</option>
              <option value="shipped">Shipped</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
            </Select>
            <Select value={channel} onChange={(e) => setChannel(e.target.value)} className="w-auto">
              <option value="all">All channels</option>
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
            </Select>
            <Select value={payment} onChange={(e) => setPayment(e.target.value)} className="w-auto">
              <option value="all">All payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </Select>
            {activeFilters > 0 && (
              <Button variant="ghost" size="sm" onClick={reset}><X className="h-3.5 w-3.5" /> Clear ({activeFilters})</Button>
            )}
          </div>
        }
      />
    </div>
  );
}
