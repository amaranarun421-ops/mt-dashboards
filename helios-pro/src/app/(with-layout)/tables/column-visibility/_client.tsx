"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { DataTable } from "@/components/shared/data-table";
import { Table, ChevronUp, CheckIcon } from "@/components/Layouts/sidebar/icons";
import { employees, type Employee } from "@/data/tables/employees";

type ColumnKey = "name" | "department" | "role" | "status" | "country" | "joinedAt" | "salary" | "projects" | "email";

const columnMeta: { key: ColumnKey; label: string; defaultVisible: boolean }[] = [
  { key: "name", label: "Employee", defaultVisible: true },
  { key: "email", label: "Email", defaultVisible: true },
  { key: "department", label: "Department", defaultVisible: true },
  { key: "role", label: "Role", defaultVisible: true },
  { key: "status", label: "Status", defaultVisible: true },
  { key: "country", label: "Country", defaultVisible: false },
  { key: "joinedAt", label: "Joined Date", defaultVisible: true },
  { key: "projects", label: "Projects", defaultVisible: false },
  { key: "salary", label: "Salary", defaultVisible: true },
];

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

export default function ColumnVisibilityClient() {
  const [hidden, setHidden] = useState<Set<ColumnKey>>(() => new Set(columnMeta.filter((c) => !c.defaultVisible).map((c) => c.key)));
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleCount = columnMeta.length - hidden.size;

  function toggle(key: ColumnKey) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function showAll() {
    setHidden(new Set());
  }

  function hideAll() {
    setHidden(new Set(columnMeta.map((c) => c.key)));
  }

  function reset() {
    setHidden(new Set(columnMeta.filter((c) => !c.defaultVisible).map((c) => c.key)));
  }

  const columns = useMemo(() => {
    return columnMeta
      .filter((c) => !hidden.has(c.key))
      .map((c) => {
        switch (c.key) {
          case "name":
            return {
              key: "name",
              header: "Employee",
              cell: (row: Employee) => (
                <div className="flex items-center gap-3">
                  <Avatar name={row.name} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-dark dark:text-white">{row.name}</p>
                    <p className="truncate text-xs text-dark-5 dark:text-dark-6">{row.id}</p>
                  </div>
                </div>
              ),
              width: "220px",
            };
          case "email":
            return { key: "email", header: "Email", cell: (row: Employee) => <span className="text-xs text-dark-5 dark:text-dark-6">{row.email}</span>, width: "220px" };
          case "department":
            return { key: "department", header: "Department", cell: (row: Employee) => <span className="text-sm text-dark-7 dark:text-dark-7">{row.department}</span> };
          case "role":
            return { key: "role", header: "Role", cell: (row: Employee) => <Badge variant={roleVariant[row.role]} size="sm">{row.role}</Badge> };
          case "status":
            return { key: "status", header: "Status", cell: (row: Employee) => <Badge variant={statusVariant[row.status]} size="sm">{row.status}</Badge> };
          case "country":
            return { key: "country", header: "Country", cell: (row: Employee) => <span className="text-sm text-dark-7 dark:text-dark-7">{row.country}</span> };
          case "joinedAt":
            return { key: "joinedAt", header: "Joined", cell: (row: Employee) => <span className="text-xs text-dark-5 dark:text-dark-6">{fmtDate(row.joinedAt)}</span> };
          case "projects":
            return { key: "projects", header: "Projects", cell: (row: Employee) => <span className="text-sm font-semibold text-dark dark:text-white">{row.projects}</span>, className: "text-right" };
          case "salary":
            return { key: "salary", header: "Salary", cell: (row: Employee) => <span className="text-sm font-semibold text-dark dark:text-white">{fmtSalary(row.salary)}</span>, className: "text-right" };
        }
      });
  }, [hidden]);

  return (
    <div>
      <PageHeader
        title="Column Visibility"
        description="Toggle which columns appear in the table using the Columns dropdown. Hidden columns are preserved in the data, just not rendered."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/column-visibility" }, { label: "Column Visibility" }]}
      />

      <Card padded={false}>
        <CardHeader
          title="Employees"
          subtitle={`${visibleCount} of ${columnMeta.length} columns visible`}
          action={
            <div className="relative">
              <Button variant="outline" size="sm" onClick={() => setMenuOpen((v) => !v)}>
                <Table className="size-4" />
                Columns
                <Badge variant="primary" size="sm">{visibleCount}</Badge>
                <ChevronUp className={`size-4 transition ${menuOpen ? "" : "rotate-180"}`} />
              </Button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-stroke bg-white p-2 shadow-3 dark:border-dark-3 dark:bg-gray-dark">
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Toggle columns</p>
                      <button onClick={() => setMenuOpen(false)} className="text-xs text-dark-5 hover:text-dark dark:hover:text-white">Close</button>
                    </div>
                    <div className="my-1 h-px bg-stroke dark:bg-dark-3" />
                    <div className="max-h-72 overflow-y-auto">
                      {columnMeta.map((c) => {
                        const isVisible = !hidden.has(c.key);
                        return (
                          <button
                            key={c.key}
                            onClick={() => toggle(c.key)}
                            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition hover:bg-gray-2 dark:hover:bg-white/5"
                          >
                            <span className={isVisible ? "text-dark dark:text-white" : "text-dark-5 dark:text-dark-6"}>{c.label}</span>
                            <span className={`grid size-5 place-items-center rounded border transition ${
                              isVisible
                                ? "border-primary bg-primary text-white"
                                : "border-stroke text-transparent dark:border-dark-3"
                            }`}>
                              <CheckIcon className="size-3" />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="my-1 h-px bg-stroke dark:bg-dark-3" />
                    <div className="flex items-center justify-between gap-2 px-2 py-1">
                      <button onClick={showAll} className="text-xs font-medium text-primary hover:underline">Show all</button>
                      <button onClick={hideAll} className="text-xs font-medium text-dark-5 hover:text-red dark:hover:text-red-light">Hide all</button>
                      <button onClick={reset} className="text-xs font-medium text-dark-5 hover:text-dark dark:hover:text-white">Reset</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          }
          className="px-5 pt-5 md:px-6 md:pt-6"
        />
        <DataTable<Employee>
          columns={columns}
          data={employees}
          rowKey={(row) => row.id}
          pageSize={10}
          emptyState={
            <div className="flex flex-col items-center gap-2 py-10">
              <Table className="size-8 text-dark-6" />
              <p className="text-sm font-medium text-dark dark:text-white">All columns are hidden</p>
              <p className="text-xs text-dark-5 dark:text-dark-6">Use the Columns dropdown to bring some back.</p>
              <Button size="sm" variant="outline" onClick={showAll} className="mt-2">Show all columns</Button>
            </div>
          }
        />
      </Card>

      <Card className="mt-6">
        <CardHeader
          title="Active column list"
          subtitle="Mirror of what's currently rendered above"
          action={<Badge variant="primary" size="sm">{visibleCount} visible · {hidden.size} hidden</Badge>}
        />
        <div className="flex flex-wrap gap-2">
          {columnMeta.map((c) => {
            const isVisible = !hidden.has(c.key);
            return (
              <button
                key={c.key}
                onClick={() => toggle(c.key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isVisible
                    ? "border-primary bg-primary-subtle text-primary-dark dark:bg-primary/15 dark:text-primary-light"
                    : "border-stroke text-dark-5 hover:border-primary/40 dark:border-dark-3 dark:text-dark-6"
                }`}
              >
                <span className={`size-1.5 rounded-full ${isVisible ? "bg-primary" : "bg-dark-6"}`} />
                {c.label}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-gray-2 p-4 dark:bg-white/5">
          <Table className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm text-dark-7 dark:text-dark-7">
            The dropdown and the chip row below stay in sync — toggle from either place and the table updates instantly. The shared DataTable accepts a <code className="rounded bg-white px-1.5 py-0.5 text-xs dark:bg-white/10">hidden</code> flag on each column, so the page simply recomputes the column list whenever the visibility set changes.
          </p>
        </div>
      </Card>
    </div>
  );
}
