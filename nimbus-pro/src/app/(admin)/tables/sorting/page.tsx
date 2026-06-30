"use client";
import { PageHeader, Badge, Button } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { USERS } from "@/data/mock";
import { ArrowUp, ArrowDown, ArrowUpDown, Filter } from "lucide-react";

type User = typeof USERS[number];

const STATUS_TONE: Record<string, "success" | "warning" | "error"> = {
  active: "success",
  invited: "warning",
  suspended: "error",
};

const columns: Column<User>[] = [
  { key: "name", header: "Name", sortable: true, cell: (u) => <span className="text-sm font-semibold text-gray-900 dark:text-white">{u.name}</span> },
  { key: "email", header: "Email", sortable: true, cell: (u) => <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{u.email}</span> },
  { key: "role", header: "Role", sortable: true, cell: (u) => <Badge tone={u.role === "Admin" ? "warning" : u.role === "Editor" ? "brand" : "purple"} variant="soft">{u.role}</Badge> },
  { key: "country", header: "Country", sortable: true },
  { key: "plan", header: "Plan", sortable: true, cell: (u) => <Badge tone={u.plan === "Enterprise" ? "brand" : u.plan === "Pro" ? "purple" : "gray"} variant="soft">{u.plan}</Badge> },
  { key: "joined", header: "Joined", sortable: true, cell: (u) => <span className="text-xs text-gray-500">{u.joined}</span> },
  { key: "lastActive", header: "Last Active", sortable: true, cell: (u) => <span className="text-xs text-gray-500">{u.lastActive}</span> },
  { key: "status", header: "Status", sortable: true, cell: (u) => <Badge tone={STATUS_TONE[u.status]} variant="soft" dot className="capitalize">{u.status}</Badge> },
];

export default function SortingTablePage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Sorting Table"
        description="Multiple sortable columns with click-to-toggle asc/desc."
        breadcrumbs={[{ label: "Tables" }, { label: "Sorting" }]}
        actions={<Button variant="secondary"><Filter className="h-4 w-4" /> Filters</Button>}
      />

      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/40">
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">How to sort:</span>
          <span className="flex items-center gap-1.5"><ArrowUpDown className="h-3.5 w-3.5 text-gray-400" /> Click any column header to sort ascending</span>
          <span className="flex items-center gap-1.5"><ArrowUp className="h-3.5 w-3.5 text-brand-500" /> Click again to sort descending</span>
          <span className="flex items-center gap-1.5"><ArrowDown className="h-3.5 w-3.5 text-brand-500" /> Click a third time to clear sort</span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={USERS as unknown as User[]}
        pageSize={8}
        searchPlaceholder="Search users..."
        initialSort={{ key: "joined", dir: "desc" }}
      />
    </div>
  );
}
