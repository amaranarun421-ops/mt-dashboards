import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Table, FileTextIcon, CreditCardIcon } from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "Basic Table | Tables | Helios Pro",
  description: "A clean, static HTML-style table with header rows, body rows, and a footer summary.",
};

const rows = [
  { invoice: "INV-2024-0192", client: "Aarav Sharma", amount: "$1,240.00", status: "Paid" as const, due: "Sep 15, 2024" },
  { invoice: "INV-2024-0193", client: "Priya Nair", amount: "$860.50", status: "Paid" as const, due: "Sep 16, 2024" },
  { invoice: "INV-2024-0194", client: "Daniel Carter", amount: "$4,290.00", status: "Pending" as const, due: "Sep 18, 2024" },
  { invoice: "INV-2024-0195", client: "Sofia Rossi", amount: "$320.75", status: "Paid" as const, due: "Sep 19, 2024" },
  { invoice: "INV-2024-0196", client: "Liam O'Brien", amount: "$75.00", status: "Overdue" as const, due: "Sep 02, 2024" },
  { invoice: "INV-2024-0197", client: "Yuki Tanaka", amount: "$1,980.00", status: "Paid" as const, due: "Sep 22, 2024" },
];

const statusVariant = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
} as const;

export default function BasicTablePage() {
  const total = rows.reduce((acc, r) => acc + parseFloat(r.amount.replace(/[$,]/g, "")), 0);

  return (
    <div>
      <PageHeader
        title="Basic Table"
        description="A simple, semantic table with a header section, body rows, and a footer summary row — no interactivity."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/basic" }, { label: "Basic" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <FileTextIcon className="size-4" />
              Export
            </Button>
            <Button size="sm">
              <CreditCardIcon className="size-4" />
              New Invoice
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" padded={false}>
          <CardHeader
            title="Recent Invoices"
            subtitle="Static, non-interactive table demonstrating semantic markup"
            action={<Badge variant="neutral" size="sm">{rows.length} rows</Badge>}
            className="px-5 pt-5 md:px-6 md:pt-6"
          />
          <div className="helios-scroll overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-stroke bg-gray-2 text-left dark:border-dark-3 dark:bg-dark-2">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Invoice</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Client</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Amount</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Due Date</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.invoice} className="border-b border-stroke transition-colors last:border-0 hover:bg-primary/5 dark:border-dark-3 dark:hover:bg-white/5">
                    <td className="px-4 py-3.5 font-medium text-dark dark:text-white">{r.invoice}</td>
                    <td className="px-4 py-3.5 text-dark-7 dark:text-dark-7">{r.client}</td>
                    <td className="px-4 py-3.5 font-semibold text-dark dark:text-white">{r.amount}</td>
                    <td className="px-4 py-3.5 text-dark-5 dark:text-dark-6">{r.due}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={statusVariant[r.status]} size="sm">{r.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark-2">
                  <td className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6" colSpan={2}>Total Outstanding</td>
                  <td className="px-4 py-3.5 text-base font-bold text-primary dark:text-primary-light">${total.toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-xs text-dark-5 dark:text-dark-6" colSpan={2}>{rows.length} invoices</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="About this table" subtitle="Semantic HTML structure" />
          <ul className="space-y-3 text-sm text-dark-7 dark:text-dark-7">
            <li className="flex items-start gap-2">
              <Table className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Uses <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">thead</code>, <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">tbody</code>, and <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">tfoot</code> for proper semantics and accessibility.</span>
            </li>
            <li className="flex items-start gap-2">
              <Table className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Header cells use <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">uppercase tracking-wider</code> for clear visual hierarchy.</span>
            </li>
            <li className="flex items-start gap-2">
              <Table className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Horizontal scroll on small screens via <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">.helios-scroll overflow-x-auto</code>.</span>
            </li>
            <li className="flex items-start gap-2">
              <Table className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Status column uses the shared <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">Badge</code> component with semantic tone variants.</span>
            </li>
            <li className="flex items-start gap-2">
              <Table className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Footer row aggregates the total amount and shows the row count.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
