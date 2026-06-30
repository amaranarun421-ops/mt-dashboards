"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Pagination } from "@/components/shared/pagination";
import { Table, ChevronUp } from "@/components/Layouts/sidebar/icons";
import { employees, type Employee } from "@/data/tables/employees";

const fmtSalary = (n: number) => `$${n.toLocaleString("en-US")}`;
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

const statusVariant: Record<Employee["status"], "success" | "warning" | "danger"> = {
  Active: "success",
  Invited: "warning",
  Suspended: "danger",
};

const PAGE_SIZES = [5, 10, 25, 50] as const;

export default function PaginationClient() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const totalPages = Math.max(1, Math.ceil(employees.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, employees.length);
  const paged = employees.slice(start, end);

  function changeSize(size: number) {
    setPageSize(size);
    setPage(1);
  }

  return (
    <div>
      <PageHeader
        title="Pagination"
        description="Switch between page sizes of 5, 10, 25 and 50 to see how the same dataset adapts. Uses the shared Pagination component."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/pagination" }, { label: "Pagination" }]}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Total Rows</p>
          <p className="mt-2 text-2xl font-bold text-dark dark:text-white">{employees.length}</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Across all pages</p>
        </Card>
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Page Size</p>
          <p className="mt-2 text-2xl font-bold text-primary dark:text-primary-light">{pageSize}</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Rows per page</p>
        </Card>
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Current Page</p>
          <p className="mt-2 text-2xl font-bold text-dark dark:text-white">{currentPage} / {totalPages}</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Showing {start + 1}–{end}</p>
        </Card>
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Total Pages</p>
          <p className="mt-2 text-2xl font-bold text-dark dark:text-white">{totalPages}</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">At current size</p>
        </Card>
      </div>

      <Card padded={false}>
        <CardHeader
          title="Employees"
          subtitle={`Showing ${start + 1}–${end} of ${employees.length}`}
          action={
            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-medium text-dark-5 dark:text-dark-6 sm:inline">Rows per page</span>
              <div className="inline-flex gap-1 rounded-lg border border-stroke bg-white p-1 dark:border-dark-3 dark:bg-dark-2">
                {PAGE_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => changeSize(s)}
                    className={`min-w-[36px] rounded-md px-2 py-1 text-xs font-medium transition ${
                      pageSize === s
                        ? "bg-primary text-white shadow-sm"
                        : "text-dark-7 hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-dark-3"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          }
          className="px-5 pt-5 md:px-6 md:pt-6"
        />
        <div className="helios-scroll overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-stroke bg-gray-2 text-left dark:border-dark-3 dark:bg-dark-2">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Employee</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Department</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Status</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Joined</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Salary</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((e) => (
                <tr key={e.id} className="border-b border-stroke transition-colors last:border-0 hover:bg-primary/5 dark:border-dark-3 dark:hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={e.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-dark dark:text-white">{e.name}</p>
                        <p className="truncate text-xs text-dark-5 dark:text-dark-6">{e.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-dark-7 dark:text-dark-7">{e.department}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant[e.status]} size="sm">{e.status}</Badge></td>
                  <td className="px-4 py-3 text-xs text-dark-5 dark:text-dark-6">{fmtDate(e.joinedAt)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-dark dark:text-white">{fmtSalary(e.salary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3 sm:flex-row sm:items-center">
          <p className="text-xs text-dark-5 dark:text-dark-6">
            Showing <span className="font-semibold text-dark dark:text-white">{start + 1}–{end}</span> of <span className="font-semibold text-dark dark:text-white">{employees.length}</span> rows
          </p>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            showEdges={totalPages > 5}
          />
        </div>
      </Card>

      <Card className="mt-6">
        <CardHeader title="Page-size selector" subtitle="How the same dataset adapts" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PAGE_SIZES.map((s) => {
            const pages = Math.ceil(employees.length / s);
            const isActive = pageSize === s;
            return (
              <button
                key={s}
                onClick={() => changeSize(s)}
                className={`rounded-xl border p-4 text-left transition ${
                  isActive
                    ? "border-primary bg-primary-subtle dark:bg-primary/10"
                    : "border-stroke hover:border-primary/40 dark:border-dark-3"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-dark dark:text-white">{s}</p>
                  {isActive ? (
                    <Badge variant="primary" size="sm">Active</Badge>
                  ) : (
                    <ChevronUp className="size-4 rotate-90 text-dark-5" />
                  )}
                </div>
                <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{pages} page{pages !== 1 ? "s" : ""}</p>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-gray-2 p-4 dark:bg-white/5">
          <Table className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm text-dark-7 dark:text-dark-7">
            The shared <code className="rounded bg-white px-1.5 py-0.5 text-xs dark:bg-white/10">Pagination</code> component handles edge-clipping (first/last/ellipsis) automatically when there are many pages. Switch to page size 5 to see all six pages rendered with the « ‹ … » chevrons.
          </p>
        </div>
      </Card>
    </div>
  );
}
