"use client";
import { useState, useMemo } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { products, Product } from "../../../data/tables";

const columns: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Product" },
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span className="font-semibold">${row.original.price.toLocaleString()}</span>,
  },
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

const FilteringTablePage = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredData = useMemo(() => {
    return products.filter((p) => {
      const matchesText = globalFilter === "" || JSON.stringify(p).toLowerCase().includes(globalFilter.toLowerCase());
      const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
      return matchesText && matchesCat;
    });
  }, [globalFilter, categoryFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <PageContainer
      title="React Table — Filtering"
      description="Global text search plus per-column filtering. Combine with category dropdown for powerful queries."
    >
      <DemoBlock title="Filterable Products Table">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1">
            <Label className="text-xs">Global Search</Label>
            <div className="relative mt-1.5">
              <Icon icon="solar:magnifer-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <Input
                placeholder="Search all columns..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="md:w-56">
            <Label className="text-xs">Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {(globalFilter || categoryFilter !== "all") && (
            <div className="flex items-end">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => { setGlobalFilter(""); setCategoryFilter("all"); }}>
                <Icon icon="solar:close-circle-bold" width={14} /> Clear
              </Button>
            </div>
          )}
        </div>

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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-12">
                    <Icon icon="solar:magnifer-bug-bold-duotone" width={40} className="mx-auto opacity-40 mb-2" />
                    <p className="opacity-60">No matching results</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs opacity-60 mt-3">Showing {filteredData.length} of {products.length} products</p>
      </DemoBlock>
    </PageContainer>
  );
};

export default FilteringTablePage;
