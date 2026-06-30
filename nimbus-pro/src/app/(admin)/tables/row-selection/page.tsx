"use client";
import { useState } from "react";
import { PageHeader, Badge, Button, Avatar } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { USERS } from "@/data/mock";
import { cn } from "@/lib/utils";
import { Trash2, Download, Archive, X, CheckSquare } from "lucide-react";

type User = typeof USERS[number];

const STATUS_TONE: Record<string, "success" | "warning" | "error"> = {
  active: "success",
  invited: "warning",
  suspended: "error",
};

const columns: Column<User>[] = [
  { key: "name", header: "Member", sortable: true, cell: (u) => (
    <div className="flex items-center gap-3">
      <Avatar name={u.name} size={32} />
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{u.name}</p>
        <p className="text-xs text-gray-500">{u.email}</p>
      </div>
    </div>
  ) },
  { key: "role", header: "Role", sortable: true, cell: (u) => <Badge tone={u.role === "Admin" ? "warning" : u.role === "Editor" ? "brand" : "purple"} variant="soft">{u.role}</Badge> },
  { key: "plan", header: "Plan", sortable: true, cell: (u) => <Badge tone={u.plan === "Enterprise" ? "brand" : u.plan === "Pro" ? "purple" : "gray"} variant="soft">{u.plan}</Badge> },
  { key: "country", header: "Country", sortable: true },
  { key: "joined", header: "Joined", sortable: true, cell: (u) => <span className="text-xs text-gray-500">{u.joined}</span> },
  { key: "status", header: "Status", sortable: true, cell: (u) => <Badge tone={STATUS_TONE[u.status]} variant="soft" dot className="capitalize">{u.status}</Badge> },
];

export default function RowSelectionPage() {
  const [showBulkBar, setShowBulkBar] = useState(false);
  const [selectedCount, setSelectedCount] = useState(3);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Row Selection"
        description="Selectable rows with a bulk actions toolbar."
        breadcrumbs={[{ label: "Tables" }, { label: "Row Selection" }]}
      />

      {/* Demo controls */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Bulk action bar demo</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Toggle the bulk action bar to preview the selected state</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => { setShowBulkBar(true); setSelectedCount(3); }}>
              <CheckSquare className="h-3.5 w-3.5" /> Simulate selection (3)
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setShowBulkBar(true); setSelectedCount(0); }}>
              <CheckSquare className="h-3.5 w-3.5" /> Simulate selection (0)
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowBulkBar(false)}>Hide bar</Button>
          </div>
        </div>
      </div>

      {/* Bulk action bar */}
      {showBulkBar && (
        <div className={cn("sticky top-4 z-10 flex flex-col gap-3 rounded-xl border p-4 shadow-theme-md transition-all sm:flex-row sm:items-center sm:justify-between",
          selectedCount > 0 ? "border-brand-300 bg-brand-50/90 backdrop-blur dark:border-brand-700 dark:bg-brand-500/15" : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
        )}>
          <div className="flex items-center gap-3">
            {selectedCount > 0 ? (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
                  <CheckSquare className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedCount} rows selected</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Choose an action below</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-400 dark:bg-gray-800">
                  <CheckSquare className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">No rows selected</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Select rows in the table to enable bulk actions</p>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" disabled={selectedCount === 0}><Download className="h-3.5 w-3.5" /> Export</Button>
            <Button variant="outline" size="sm" disabled={selectedCount === 0}><Archive className="h-3.5 w-3.5" /> Archive</Button>
            <Button variant="danger" size="sm" disabled={selectedCount === 0}><Trash2 className="h-3.5 w-3.5" /> Delete ({selectedCount})</Button>
            <Button variant="ghost" size="sm" onClick={() => setSelectedCount(0)}><X className="h-3.5 w-3.5" /> Clear</Button>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={USERS as unknown as User[]}
        pageSize={8}
        selectable
        searchPlaceholder="Search members..."
        initialSort={{ key: "name", dir: "asc" }}
      />

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Tip: The table footer shows the live selected count after you check rows. Use the toolbar above to preview the bulk action bar states.
      </p>
    </div>
  );
}
