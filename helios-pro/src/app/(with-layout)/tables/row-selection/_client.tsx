"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { DataTable } from "@/components/shared/data-table";
import { Modal } from "@/components/shared/modal";
import { Table, CheckSquareIcon, XCircleIcon, TagIcon, FileTextIcon } from "@/components/Layouts/sidebar/icons";
import { employees, type Employee } from "@/data/tables/employees";

const fmtSalary = (n: number) => `$${n.toLocaleString("en-US")}`;
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

const statusVariant: Record<Employee["status"], "success" | "warning" | "danger"> = {
  Active: "success",
  Invited: "warning",
  Suspended: "danger",
};

const roleVariant: Record<Employee["role"], "primary" | "accent" | "info" | "violet" | "neutral" | "success"> = {
  Owner: "accent",
  Admin: "primary",
  Manager: "info",
  Editor: "violet",
  Viewer: "neutral",
  Guest: "success",
};

export default function RowSelectionClient() {
  const [selected, setSelected] = useState<Employee[]>([]);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState<null | "delete" | "deactivate" | "export" | "tag">(null);

  const selectedIds = useMemo(() => new Set(selected.map((e) => e.id)), [selected]);
  const totalSalary = selected.reduce((s, e) => s + e.salary, 0);

  function log(msg: string) {
    setActionLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 6));
  }

  function runAction(kind: "delete" | "deactivate" | "export" | "tag") {
    const count = selected.length;
    const labels: Record<typeof kind, string> = {
      delete: `Deleted ${count} employee${count === 1 ? "" : "s"}`,
      deactivate: `Marked ${count} employee${count === 1 ? "" : "s"} as Suspended`,
      export: `Exported ${count} record${count === 1 ? "" : "s"} to CSV`,
      tag: `Tagged ${count} record${count === 1 ? "" : "s"} with "Q4-Review"`,
    };
    log(labels[kind]);
    setSelected([]);
    setConfirmOpen(null);
  }

  return (
    <div>
      <PageHeader
        title="Row Selection"
        description="Select individual rows or use the header checkbox to select the whole page. A bulk action bar appears whenever rows are checked."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/row-selection" }, { label: "Row Selection" }]}
      />

      <Card padded={false} className="mb-6">
        <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary-subtle text-primary dark:bg-primary/15">
              <CheckSquareIcon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-dark dark:text-white">
                {selected.length > 0 ? `${selected.length} employee${selected.length === 1 ? "" : "s"} selected` : "No rows selected"}
              </p>
              <p className="text-xs text-dark-5 dark:text-dark-6">
                {selected.length > 0
                  ? `Combined salary: ${fmtSalary(totalSalary)} · ${new Set(selected.map((e) => e.department)).size} departments`
                  : "Use the checkboxes in the table to start selecting rows"}
              </p>
            </div>
          </div>
          {selected.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => runAction("export")}>
                <FileTextIcon className="size-4" />
                Export
              </Button>
              <Button size="sm" variant="outline" onClick={() => runAction("tag")}>
                <TagIcon className="size-4" />
                Tag
              </Button>
              <Button size="sm" variant="outline" onClick={() => setConfirmOpen("deactivate")}>
                Deactivate
              </Button>
              <Button size="sm" variant="danger" onClick={() => setConfirmOpen("delete")}>
                <XCircleIcon className="size-4" />
                Delete
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelected([])}>
                Clear
              </Button>
            </div>
          )}
        </div>
        {selected.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 border-t border-stroke px-5 py-3 md:px-6 dark:border-dark-3">
            <span className="mr-1 text-xs font-medium text-dark-5 dark:text-dark-6">Selected:</span>
            <div className="helios-scroll flex max-w-full gap-1.5 overflow-x-auto">
              {selected.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSelected((prev) => prev.filter((p) => p.id !== e.id))}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary-dark transition hover:bg-primary/20 dark:bg-primary/15 dark:text-primary-light"
                >
                  {e.name}
                  <XCircleIcon className="size-3" />
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card padded={false}>
        <CardHeader
          title="Employees"
          subtitle={`${employees.length} rows · click the header checkbox to select the visible page`}
          action={
            <Badge variant={selected.length > 0 ? "primary" : "neutral"} size="sm">
              {selected.length} selected
            </Badge>
          }
          className="px-5 pt-5 md:px-6 md:pt-6"
        />
        <DataTable<Employee>
          selectable
          onSelectionChange={setSelected}
          columns={[
            {
              key: "name",
              header: "Employee",
              cell: (row) => (
                <div className="flex items-center gap-3">
                  <Avatar name={row.name} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-dark dark:text-white">{row.name}</p>
                    <p className="truncate text-xs text-dark-5 dark:text-dark-6">{row.email}</p>
                  </div>
                </div>
              ),
              width: "240px",
            },
            { key: "department", header: "Department", cell: (row) => <span className="text-sm text-dark-7 dark:text-dark-7">{row.department}</span> },
            { key: "role", header: "Role", cell: (row) => <Badge variant={roleVariant[row.role]} size="sm">{row.role}</Badge> },
            { key: "status", header: "Status", cell: (row) => <Badge variant={statusVariant[row.status]} size="sm">{row.status}</Badge> },
            { key: "joinedAt", header: "Joined", cell: (row) => <span className="text-xs text-dark-5 dark:text-dark-6">{fmtDate(row.joinedAt)}</span> },
            { key: "salary", header: "Salary", cell: (row) => <span className="text-sm font-semibold text-dark dark:text-white">{fmtSalary(row.salary)}</span>, className: "text-right" },
          ]}
          data={employees}
          rowKey={(row) => row.id}
          pageSize={10}
        />
      </Card>

      <Card className="mt-6">
        <CardHeader title="Bulk action audit log" subtitle="Each action records the count and timestamp" />
        {actionLog.length === 0 ? (
          <div className="flex items-center gap-2 rounded-xl bg-gray-2 p-4 text-sm text-dark-5 dark:bg-white/5 dark:text-dark-6">
            <Table className="size-4" />
            No actions performed yet — try selecting rows above and running Export, Tag, Deactivate or Delete.
          </div>
        ) : (
          <ul className="space-y-2">
            {actionLog.map((entry, i) => (
              <li key={i} className="flex items-center gap-2 rounded-xl border border-stroke px-3 py-2 text-sm dark:border-dark-3">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-dark-5 dark:text-dark-6">{entry.split(" — ")[0]}</span>
                <span className="text-dark-7 dark:text-dark-7">{entry.split(" — ")[1]}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal
        open={confirmOpen === "delete"}
        onClose={() => setConfirmOpen(null)}
        title="Delete selected employees?"
        description={`This will permanently delete ${selected.length} employee record${selected.length === 1 ? "" : "s"}. This action cannot be undone.`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => runAction("delete")}>
              <XCircleIcon className="size-4" />
              Delete {selected.length} record{selected.length === 1 ? "" : "s"}
            </Button>
          </>
        }
      >
        <div className="max-h-60 overflow-y-auto rounded-xl border border-stroke dark:border-dark-3">
          {selected.map((e) => (
            <div key={e.id} className="flex items-center gap-3 border-b border-stroke px-3 py-2 last:border-0 dark:border-dark-3">
              <Avatar name={e.name} size="xs" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-dark dark:text-white">{e.name}</p>
                <p className="truncate text-xs text-dark-5 dark:text-dark-6">{e.email}</p>
              </div>
              <Badge variant={statusVariant[e.status]} size="sm">{e.status}</Badge>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={confirmOpen === "deactivate"}
        onClose={() => setConfirmOpen(null)}
        title="Deactivate selected employees?"
        description={`${selected.length} employee${selected.length === 1 ? "" : "s"} will be marked as Suspended. They will lose access immediately.`}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(null)}>Cancel</Button>
            <Button variant="accent" onClick={() => runAction("deactivate")}>Deactivate</Button>
          </>
        }
      >
        <p className="text-sm text-dark-7 dark:text-dark-7">Suspended employees keep their data but cannot sign in. You can reactivate them at any time from the user management screen.</p>
      </Modal>
    </div>
  );
}
