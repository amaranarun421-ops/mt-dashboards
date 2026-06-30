import { cn } from "@/lib/utils";
import * as React from "react";

type Column<T> = {
  key: string;
  header: string;
  cell: (row: T, index: number) => React.ReactNode;
  className?: string;
  sortable?: boolean;
  sortAccessor?: (row: T) => string | number;
  hidden?: boolean;
  width?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
  pageSize?: number;
  initialSort?: { key: string; direction: "asc" | "desc" };
  className?: string;
  stickyHeader?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  hoverable?: boolean;
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  selectable,
  onRowClick,
  emptyState,
  pageSize = 10,
  initialSort,
  className,
  stickyHeader,
  onSelectionChange,
  hoverable = true,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<{ key: string; direction: "asc" | "desc" } | null>(
    initialSort || null,
  );
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const visibleColumns = columns.filter((c) => !c.hidden);

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col || !col.sortAccessor) return data;
    const arr = [...data];
    arr.sort((a, b) => {
      const av = col.sortAccessor!(a);
      const bv = col.sortAccessor!(b);
      if (av < bv) return sort.direction === "asc" ? -1 : 1;
      if (av > bv) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [data, sort, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function toggleSort(col: Column<T>) {
    if (!col.sortable) return;
    setSort((prev) => {
      if (!prev || prev.key !== col.key) return { key: col.key, direction: "asc" };
      if (prev.direction === "asc") return { key: col.key, direction: "desc" };
      return null;
    });
  }

  function toggleAll() {
    if (selected.size === paged.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const next = new Set(paged.map((r, i) => rowKey(r, i)));
      setSelected(next);
      onSelectionChange?.(paged);
    }
  }

  function toggleOne(key: string, row: T) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const allChecked = paged.length > 0 && selected.size === paged.length;

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark", className)}>
      <div className={cn("helios-scroll overflow-x-auto", stickyHeader && "max-h-[600px] overflow-y-auto")}>
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className={cn(stickyHeader && "sticky top-0 z-10")}>
            <tr className="border-b border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark-2">
              {selectable && (
                <th className="w-10 px-4 py-3.5 text-left">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="size-4 rounded border-stroke text-primary focus:ring-primary/30 dark:border-dark-3 dark:bg-dark-3"
                  />
                </th>
              )}
              {visibleColumns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6",
                    c.sortable && "cursor-pointer select-none hover:text-dark dark:hover:text-white",
                    c.className,
                  )}
                  style={{ width: c.width }}
                  onClick={() => toggleSort(c)}
                >
                  <span className="inline-flex items-center gap-1">
                    {c.header}
                    {c.sortable && (
                      <span className="text-dark-6">
                        {sort?.key === c.key ? (
                          sort.direction === "asc" ? "▲" : "▼"
                        ) : (
                          "↕"
                        )}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (selectable ? 1 : 0)}
                  className="px-4 py-12 text-center text-dark-5 dark:text-dark-6"
                >
                  {emptyState || "No data available."}
                </td>
              </tr>
            ) : (
              paged.map((row, i) => {
                const key = rowKey(row, i);
                const isSel = selected.has(key);
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "border-b border-stroke transition-colors last:border-0 dark:border-dark-3",
                      hoverable && "hover:bg-primary/5 dark:hover:bg-white/5",
                      isSel && "bg-primary-subtle/60 dark:bg-primary/10",
                      onRowClick && "cursor-pointer",
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSel}
                          onChange={() => toggleOne(key, row)}
                          className="size-4 rounded border-stroke text-primary focus:ring-primary/30 dark:border-dark-3 dark:bg-dark-3"
                        />
                      </td>
                    )}
                    {visibleColumns.map((c) => (
                      <td key={c.key} className={cn("px-4 py-3.5 text-dark-7 dark:text-dark-7", c.className)}>
                        {c.cell(row, i)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {sorted.length > pageSize && (
        <div className="flex items-center justify-between border-t border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-xs text-dark-5 dark:text-dark-6">
            Showing {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, sorted.length)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-stroke px-2 py-1 text-xs text-dark-7 transition hover:bg-gray-2 disabled:opacity-40 dark:border-dark-3 dark:text-dark-7 dark:hover:bg-dark-3"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPages)
              .map((p, idx, arr) => (
                <span key={p} className="flex items-center">
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span className="px-1 text-dark-5">…</span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    className={cn(
                      "min-w-[28px] rounded-md px-2 py-1 text-xs transition",
                      p === currentPage
                        ? "bg-primary text-white"
                        : "border border-stroke text-dark-7 hover:bg-gray-2 dark:border-dark-3 dark:text-dark-7 dark:hover:bg-dark-3",
                    )}
                  >
                    {p}
                  </button>
                </span>
              ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-stroke px-2 py-1 text-xs text-dark-7 transition hover:bg-gray-2 disabled:opacity-40 dark:border-dark-3 dark:text-dark-7 dark:hover:bg-dark-3"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
