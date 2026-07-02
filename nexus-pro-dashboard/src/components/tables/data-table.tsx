"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Download,
  Rows3,
  Rows4,
  Table as TableIcon,
  X,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type TableDensity = "compact" | "standard" | "comfortable";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableSearch?: boolean;
  enableColumnVisibility?: boolean;
  enableDensity?: boolean;
  enableRowSelection?: boolean;
  bulkActions?: (selectedRows: TData[]) => React.ReactNode;
  pageSize?: number;
  loading?: boolean;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  searchPlaceholder?: string;
  toolbarExtra?: React.ReactNode;
  className?: string;
  density?: TableDensity;
  onExport?: (rows: TData[], format: "csv" | "json") => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enableSearch = true,
  enableColumnVisibility = true,
  enableDensity = true,
  enableRowSelection = false,
  bulkActions,
  pageSize = 10,
  loading = false,
  emptyMessage = "No records found.",
  emptyAction,
  searchPlaceholder = "Search...",
  toolbarExtra,
  className,
  density: densityProp = "standard",
  onExport,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [density, setDensity] = React.useState<TableDensity>(densityProp);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize },
    },
  });

  const selectedRows = table.getFilteredRowModel().rows
    .filter((r) => r.getIsSelected())
    .map((r) => r.original);

  const densityClasses = {
    compact: "[&_tr]:h-9 [&_td]:py-1 [&_th]:py-1.5 [&_td]:text-xs [&_th]:text-xs",
    standard: "[&_tr]:h-12 [&_td]:py-2.5 [&_th]:py-3 [&_td]:text-sm [&_th]:text-xs",
    comfortable: "[&_tr]:h-16 [&_td]:py-4 [&_th]:py-4 [&_td]:text-sm [&_th]:text-sm",
  }[density];

  return (
    <div className={cn("space-y-3", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        {enableSearch && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9 h-9"
            />
            {globalFilter && (
              <button
                onClick={() => setGlobalFilter("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

        {toolbarExtra}

        <div className="ml-auto flex items-center gap-2">
          {onExport && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 h-9">
                  <Download className="h-3.5 w-3.5" /> Export
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Export as</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onExport(selectedRows.length > 0 ? selectedRows : table.getFilteredRowModel().rows.map((r) => r.original), "csv")}>
                  CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport(selectedRows.length > 0 ? selectedRows : table.getFilteredRowModel().rows.map((r) => r.original), "json")}>
                  JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 h-9">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Columns
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 max-h-80 overflow-y-auto">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((c) => c.id !== "select" && c.id !== "actions")
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {typeof column.columnDef.header === "string"
                        ? column.columnDef.header
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {enableDensity && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 h-9 px-2.5" aria-label="Density">
                  {density === "compact" ? <Rows3 className="h-3.5 w-3.5" /> : density === "comfortable" ? <TableIcon className="h-3.5 w-3.5" /> : <Rows4 className="h-3.5 w-3.5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Density</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={density === "compact"} onCheckedChange={() => setDensity("compact")}>
                  Compact
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={density === "standard"} onCheckedChange={() => setDensity("standard")}>
                  Standard
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={density === "comfortable"} onCheckedChange={() => setDensity("comfortable")}>
                  Comfortable
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Bulk action bar */}
      {enableRowSelection && selectedRows.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-brand-200 bg-brand-50/50 dark:border-brand-500/30 dark:bg-brand-500/10 px-4 py-2.5">
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
            {selectedRows.length} selected
          </span>
          <div className="ml-auto flex items-center gap-2">
            {bulkActions?.(selectedRows)}
            <Button variant="ghost" size="sm" className="h-8" onClick={() => setRowSelection({})}>
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-white/[0.02]">
        <div className="overflow-x-auto">
          <Table className={densityClasses}>
            <TableHeader className="bg-gray-50/50 dark:bg-white/[0.02]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-gray-200 dark:border-gray-800 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            "flex items-center gap-1.5",
                            header.column.getCanSort() && "cursor-pointer select-none hover:text-gray-800 dark:hover:text-gray-200"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <ArrowUpDown className="h-3 w-3 opacity-50" />
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`} className="border-gray-100 dark:border-gray-800/50">
                    {table.getAllColumns().filter((c) => c.getIsVisible()).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full max-w-[140px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "border-gray-100 dark:border-gray-800/50 transition-colors",
                      row.getIsSelected()
                        ? "bg-brand-50/40 dark:bg-brand-500/[0.06]"
                        : "hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-gray-700 dark:text-gray-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-0 hover:bg-transparent">
                  <TableCell colSpan={table.getAllColumns().length} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <Inbox className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{emptyMessage}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Try adjusting your search or filters.</p>
                      </div>
                      {emptyAction}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {enableRowSelection && selectedRows.length > 0 && (
              <span className="mr-3">{selectedRows.length} of {table.getFilteredRowModel().rows.length} selected · </span>
            )}
            {table.getFilteredRowModel().rows.length} record(s) total
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1.5">
                  {table.getState().pagination.pageSize} / page
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {[10, 20, 30, 50].map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => table.setPageSize(size)}
                    className={cn(size === table.getState().pagination.pageSize && "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400")}
                  >
                    {size} / page
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
            </span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} aria-label="First page">
                <ChevronsLeft className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Previous page">
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Next page">
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} aria-label="Last page">
                <ChevronsRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Helpers ============

export function exportToCSV<T>(rows: T[], filename: string): void {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0] as Record<string, unknown>);
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const val = (row as Record<string, unknown>)[h];
          const str = typeof val === "object" ? JSON.stringify(val) : String(val ?? "");
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToJSON<T>(rows: T[], filename: string): void {
  const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// ============ Reusable column helpers ============

export interface SelectionColumnProps<T> {
  id?: string;
  size?: number;
}

export function makeSelectionColumn<T>(_props?: SelectionColumnProps<T>) {
  return {
    id: "select",
    size: 32,
    header: ({ table }: { table: { getIsAllPageRowsSelected: () => boolean; getIsSomePageRowsSelected: () => boolean; getToggleAllPageRowsSelectedHandler: () => (e: unknown) => void } }) => (
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          ref={(el) => { if (el) el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(); }}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          aria-label="Select all rows"
          className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500/30"
        />
      </div>
    ),
    cell: ({ row }: { row: { getIsSelected: () => boolean; getToggleSelectedHandler: () => (e: unknown) => void } }) => (
      <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          aria-label="Select row"
          className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500/30"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  } as const;
}
