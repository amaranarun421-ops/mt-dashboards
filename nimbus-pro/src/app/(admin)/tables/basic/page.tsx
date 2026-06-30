"use client";
import { PageHeader, Card, CardHeader, Badge, Avatar, Button } from "@/components/ui";
import { USERS } from "@/data/mock";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<string, "success" | "warning" | "error"> = {
  active: "success",
  invited: "warning",
  suspended: "error",
};

export default function BasicTablePage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Basic Table"
        description="Plain tables with striped, bordered, and hover variants."
        breadcrumbs={[{ label: "Tables" }, { label: "Basic" }]}
        actions={<Button variant="secondary">Export CSV</Button>}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Default */}
        <Card className="p-0">
          <CardHeader title="Default Table" description="Standard styling" className="border-b" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {USERS.slice(0, 5).map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={u.name} size={28} />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{u.name}</p>
                          <p className="text-[11px] text-gray-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{u.role}</td>
                    <td><Badge tone={STATUS_TONE[u.status]} variant="soft" dot className="capitalize">{u.status}</Badge></td>
                    <td className="text-xs text-gray-500">{u.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Striped */}
        <Card className="p-0">
          <CardHeader title="Striped Rows" description="Alternating row colors" className="border-b" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "INV-2041", client: "Acme Corporation", amount: "$12,480", status: "paid" },
                  { id: "INV-2040", client: "Globex Industries", amount: "$8,650", status: "sent" },
                  { id: "INV-2039", client: "Initech LLC", amount: "$3,240", status: "overdue" },
                  { id: "INV-2038", client: "Umbrella Group", amount: "$18,900", status: "paid" },
                  { id: "INV-2037", client: "Stark Enterprises", amount: "$4,250", status: "draft" },
                ].map((r, i) => (
                  <tr key={r.id} className={cn(i % 2 === 1 && "bg-gray-50/60 dark:bg-gray-800/30")}>
                    <td className="font-semibold text-gray-900 dark:text-white">{r.id}</td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{r.client}</td>
                    <td className="text-sm font-semibold text-gray-900 dark:text-white">{r.amount}</td>
                    <td><Badge tone={r.status === "paid" ? "success" : r.status === "overdue" ? "error" : r.status === "draft" ? "gray" : "warning"} variant="soft" dot className="capitalize">{r.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Bordered */}
        <Card className="p-0">
          <CardHeader title="Bordered Table" description="Cell borders visible" className="border-b" />
          <div className="table-wrap">
            <table className="data-table border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="border border-gray-200 dark:border-gray-800">Product</th>
                  <th className="border border-gray-200 dark:border-gray-800">SKU</th>
                  <th className="border border-gray-200 dark:border-gray-800">Price</th>
                  <th className="border border-gray-200 dark:border-gray-800">Stock</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Aurora Wireless Headphones", sku: "AUR-WH-001", price: "$249", stock: 184 },
                  { name: "Nimbus Mechanical Keyboard", sku: "NIM-MK-104", price: "$179", stock: 92 },
                  { name: "Vortex 4K Webcam", sku: "VX-WC-4K", price: "$129", stock: 0 },
                  { name: "Helix Standing Desk Mat", sku: "HX-DM-22", price: "$89", stock: 318 },
                ].map((p) => (
                  <tr key={p.sku}>
                    <td className="border border-gray-200 text-sm font-semibold text-gray-900 dark:border-gray-800 dark:text-white">{p.name}</td>
                    <td className="border border-gray-200 font-mono text-xs text-gray-700 dark:border-gray-800 dark:text-gray-300">{p.sku}</td>
                    <td className="border border-gray-200 text-sm font-semibold text-gray-900 dark:border-gray-800 dark:text-white">{p.price}</td>
                    <td className="border border-gray-200 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-300">{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Hover */}
        <Card className="p-0">
          <CardHeader title="Hoverable Rows" description="Highlight on hover" className="border-b" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "ORD-4218", customer: "Priya Iyer", total: "$1,248", status: "delivered" },
                  { id: "ORD-4217", customer: "Marcus Chen", total: "$329", status: "shipped" },
                  { id: "ORD-4216", customer: "Sofia García", total: "$89", status: "processing" },
                  { id: "ORD-4215", customer: "Yuki Tanaka", total: "$1,799", status: "delivered" },
                  { id: "ORD-4214", customer: "Ethan Wright", total: "$249", status: "cancelled" },
                ].map((o) => (
                  <tr key={o.id} className="transition-colors hover:bg-brand-50/60 dark:hover:bg-brand-500/10">
                    <td className="font-semibold text-gray-900 dark:text-white">{o.id}</td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{o.customer}</td>
                    <td className="text-sm font-semibold text-gray-900 dark:text-white">{o.total}</td>
                    <td><Badge tone={o.status === "delivered" ? "success" : o.status === "shipped" ? "brand" : o.status === "cancelled" ? "error" : "warning"} variant="soft" dot className="capitalize">{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Compact */}
      <Card className="p-0">
        <CardHeader title="Compact Table" description="Smaller padding for dense data" className="border-b" />
        <div className="table-wrap">
          <table className="data-table text-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Lead</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "PRJ-1", name: "Nimbus Pro v3.0", lead: "Aaroh Sharma", progress: 78, status: "on_track", due: "Jul 15" },
                { id: "PRJ-2", name: "AI Insights Module", lead: "Sofia García", progress: 45, status: "at_risk", due: "Jul 28" },
                { id: "PRJ-3", name: "Mobile App Refresh", lead: "Yuki Tanaka", progress: 92, status: "on_track", due: "Jul 04" },
                { id: "PRJ-4", name: "Enterprise SSO", lead: "Marcus Chen", progress: 22, status: "off_track", due: "Aug 12" },
              ].map((p) => (
                <tr key={p.id} className="py-1">
                  <td className="font-mono text-xs">{p.id}</td>
                  <td className="font-semibold">{p.name}</td>
                  <td>{p.lead}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div className={cn("h-full rounded-full", p.status === "on_track" ? "bg-success-500" : p.status === "at_risk" ? "bg-warning-500" : "bg-error-500")} style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs">{p.progress}%</span>
                    </div>
                  </td>
                  <td><Badge tone={p.status === "on_track" ? "success" : p.status === "at_risk" ? "warning" : "error"} variant="soft" dot className="capitalize">{p.status.replace("_", " ")}</Badge></td>
                  <td className="text-xs text-gray-500">{p.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
