"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { DataTable } from "@/components/shared/data-table";
import { inputClass } from "@/components/shared/form-section";
import { Table, RefreshCwIcon, CheckIcon, XCircleIcon } from "@/components/Layouts/sidebar/icons";
import { SearchIcon } from "@/components/Layouts/sidebar/icons-extra";
import {
  employees,
  departments,
  roles,
  type Employee,
} from "@/data/tables/employees";

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

const fmtSalary = (n: number) => `$${n.toLocaleString("en-US")}`;
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

export default function FilteringClient() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<string>("All");
  const [role, setRole] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = fromDate ? new Date(fromDate).getTime() : null;
    const to = toDate ? new Date(toDate).getTime() : null;
    return employees.filter((e) => {
      if (q !== "" && !((e.name + " " + e.email + " " + e.id + " " + e.country).toLowerCase().includes(q))) return false;
      if (department !== "All" && e.department !== department) return false;
      if (role !== "All" && e.role !== role) return false;
      if (status !== "All" && e.status !== status) return false;
      const joined = new Date(e.joinedAt).getTime();
      if (from !== null && joined < from) return false;
      if (to !== null && joined > to) return false;
      return true;
    });
  }, [query, department, role, status, fromDate, toDate]);

  const activeFilters = [
    department !== "All" && { label: `Dept: ${department}`, clear: () => setDepartment("All") },
    role !== "All" && { label: `Role: ${role}`, clear: () => setRole("All") },
    status !== "All" && { label: `Status: ${status}`, clear: () => setStatus("All") },
    fromDate && { label: `From: ${fmtDate(fromDate)}`, clear: () => setFromDate("") },
    toDate && { label: `To: ${fmtDate(toDate)}`, clear: () => setToDate("") },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  function resetAll() {
    setQuery("");
    setDepartment("All");
    setRole("All");
    setStatus("All");
    setFromDate("");
    setToDate("");
  }

  return (
    <div>
      <PageHeader
        title="Column-Level Filters"
        description="Filter by full-text search, department, role, status, and a joined-date range. Filters compose and a chip row surfaces active constraints."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/filtering" }, { label: "Filtering" }]}
        actions={
          <Button variant="outline" size="sm" onClick={resetAll}>
            <RefreshCwIcon className="size-4" />
            Reset filters
          </Button>
        }
      />

      <Card className="mb-6">
        <CardHeader title="Filters" subtitle="Mix and match — every filter composes with the others" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Search</label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, email, country…"
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass}>
              <option value="All">All departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
              <option value="All">All roles</option>
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Invited">Invited</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Joined from</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Joined to</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className={inputClass} />
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <span className="text-xs font-medium text-dark-5 dark:text-dark-6">Active filters:</span>
            {activeFilters.map((f, i) => (
              <button
                key={i}
                onClick={f.clear}
                className="inline-flex items-center gap-1 rounded-full bg-primary-subtle px-2.5 py-1 text-xs font-medium text-primary-dark transition hover:bg-primary/20 dark:bg-primary/15 dark:text-primary-light"
              >
                {f.label}
                <XCircleIcon className="size-3" />
              </button>
            ))}
            <button onClick={resetAll} className="ml-2 text-xs font-medium text-red transition hover:underline">
              Clear all
            </button>
          </div>
        )}
      </Card>

      <Card padded={false}>
        <CardHeader
          title="Filtered Employees"
          subtitle={`Showing ${filtered.length} of ${employees.length} rows`}
          action={
            <Badge variant={filtered.length === employees.length ? "neutral" : "primary"} size="sm">
              {filtered.length === employees.length ? "No filters" : `${activeFilters.length} filter${activeFilters.length > 1 ? "s" : ""}`}
            </Badge>
          }
          className="px-5 pt-5 md:px-6 md:pt-6"
        />
        <DataTable<Employee>
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
            {
              key: "status",
              header: "Status",
              cell: (row) => (
                <span className="inline-flex items-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${row.status === "Active" ? "bg-primary" : row.status === "Invited" ? "bg-accent" : "bg-red"}`} />
                  <Badge variant={statusVariant[row.status]} size="sm">{row.status}</Badge>
                </span>
              ),
            },
            { key: "country", header: "Country", cell: (row) => <span className="text-sm text-dark-7 dark:text-dark-7">{row.country}</span> },
            { key: "joinedAt", header: "Joined", cell: (row) => <span className="text-xs text-dark-5 dark:text-dark-6">{fmtDate(row.joinedAt)}</span> },
            { key: "salary", header: "Salary", cell: (row) => <span className="text-sm font-semibold text-dark dark:text-white">{fmtSalary(row.salary)}</span>, className: "text-right" },
          ]}
          data={filtered}
          rowKey={(row) => row.id}
          pageSize={10}
          emptyState={
            <div className="flex flex-col items-center gap-2 py-10">
              <Table className="size-8 text-dark-6" />
              <p className="text-sm font-medium text-dark dark:text-white">No employees match these filters</p>
              <p className="text-xs text-dark-5 dark:text-dark-6">Try widening your search or clearing some filters.</p>
              <Button size="sm" variant="outline" onClick={resetAll} className="mt-2">
                <CheckIcon className="size-4" />
                Reset filters
              </Button>
            </div>
          }
        />
      </Card>
    </div>
  );
}
