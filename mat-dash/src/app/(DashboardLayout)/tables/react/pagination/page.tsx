"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { products, Product } from "../../../data/tables";

// Pad data to demonstrate pagination
const data: Product[] = [...products, ...products, ...products].map((p, i) => ({ ...p, id: i + 1 }));

const columns: ColumnDef<Product>[] = [
  { accessorKey: "id", header: "ID", cell: ({ row }) => <span className="font-mono text-xs opacity-70">#{String(row.original.id).padStart(4, "0")}</span> },
  { accessorKey: "name", header: "Product", cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "price", header: "Price", cell: ({ row }) => <span className="font-semibold">${row.original.price.toLocaleString()}</span> },
  { accessorKey: "stock", header: "Stock" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Active" ? "lightSuccess" : row.original.status === "Draft" ? "lightWarning" : "lightError"}>
        {row.original.status}
      </Badge>
    ),
  },
];

const PaginationTablePage = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = table.getPageCount();
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, data.length);

  return (
    <PageContainer
      title="React Table — Pagination"
      description="Server-style pagination with per-page selector and smart page-number rendering."
    >
      <DemoBlock title="Paginated Products" description={`${data.length} total records`}>
        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-lightprimary/50 hover:bg-lightprimary/50">
                  {hg.headers.map((h) => (
                    <TableHead key={h.id} className="text-primary">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-3">
            <p className="text-sm opacity-70">
              Showing <span className="font-medium">{startRow}–{endRow}</span> of <span className="font-medium">{data.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70">Rows per page:</span>
              <Select value={String(pageSize)} onValueChange={(v) => { setPagination({ pageIndex: 0, pageSize: Number(v) }); }}>
                <SelectTrigger className="w-20 h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((s) => <SelectItem key={s} value={String(s)}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="gap-1.5">
              <Icon icon="solar:alt-arrow-left-linear" width={14} /> Prev
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === pageIndex + 1;
                return (
                  <Button
                    key={i}
                    variant={isActive ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8 text-xs"
                    onClick={() => table.setPageIndex(pageNum - 1)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 7 && <span className="px-1 opacity-50">…</span>}
            </div>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="gap-1.5">
              Next <Icon icon="solar:alt-arrow-right-linear" width={14} />
            </Button>
          </div>
        </div>
      </DemoBlock>
    </PageContainer>
  );
};

export default PaginationTablePage;
