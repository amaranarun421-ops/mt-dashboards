"use client";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { employees, Employee } from "../../../data/tables";

const columns: ColumnDef<Employee>[] = [
  { accessorKey: "name", header: "Name", cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "salary", header: "Salary", cell: ({ row }) => <span className="font-medium">${row.original.salary.toLocaleString()}</span> },
  { accessorKey: "status", header: "Status" },
];

const StickyTablePage = () => {
  const table = useReactTable({ data: [...employees, ...employees, ...employees], columns, getCoreRowModel: getCoreRowModel() });

  return (
    <PageContainer title="React Table — Sticky Header" description="Table with sticky header that stays visible while scrolling.">
      <DemoBlock title="Sticky Header Table">
        <div className="rounded-lg border border-defaultBorder overflow-auto max-h-80">
          <Table>
            <TableHeader className="sticky top-0 z-10">
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-background border-b border-defaultBorder">
                  {hg.headers.map((h) => <TableHead key={h.id} className="bg-background">{flexRender(h.column.columnDef.header, h.getContext())}</TableHead>)}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs opacity-60 mt-3">Header stays pinned while scrolling through {table.getRowModel().rows.length} rows.</p>
      </DemoBlock>
    </PageContainer>
  );
};

export default StickyTablePage;
