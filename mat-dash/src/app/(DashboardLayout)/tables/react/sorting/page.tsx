"use client";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { employees, Employee } from "../../../data/tables";

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <span className="font-semibold">${row.original.salary.toLocaleString()}</span>,
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
    cell: ({ row }) => new Date(row.original.hireDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Active" ? "lightSuccess" : row.original.status === "On Leave" ? "lightWarning" : "lightError"}>
        {row.original.status}
      </Badge>
    ),
  },
];

const SortingTablePage = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: "salary", desc: true }]);

  const table = useReactTable({
    data: employees,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <PageContainer
      title="React Table — Sorting"
      description="Click column headers to sort ascending or descending. Multi-sort with Shift+click."
    >
      <DemoBlock title="Sortable Employee Table" description="Click any header to sort">
        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-lightprimary/50 hover:bg-lightprimary/50">
                  {hg.headers.map((h) => (
                    <TableHead key={h.id} className="text-primary">
                      {h.isPlaceholder ? null : (
                        <button
                          onClick={h.column.getToggleSortingHandler()}
                          className="flex items-center gap-1.5 hover:text-primary"
                        >
                          {flexRender(h.column.columnDef.header, h.getContext())}
                          <span className="opacity-60">
                            {{ asc: "▲", desc: "▼" }[h.column.getIsSorted() as string] ?? "↕"}
                          </span>
                        </button>
                      )}
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

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Button size="sm" variant="outline" onClick={() => setSorting([])} className="gap-1.5">
            <Icon icon="solar:refresh-bold" width={14} /> Clear Sort
          </Button>
          <span className="text-xs opacity-60">
            Sorted by: {sorting.map((s) => `${s.id} (${s.desc ? "desc" : "asc"})`).join(", ") || "none"}
          </span>
        </div>
      </DemoBlock>
    </PageContainer>
  );
};

export default SortingTablePage;
