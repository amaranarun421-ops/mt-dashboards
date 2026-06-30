"use client";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { employees, Employee } from "../../../data/tables";

const columns: ColumnDef<Employee>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "salary", header: "Salary", cell: ({ row }) => <span className="font-medium">${row.original.salary.toLocaleString()}</span> },
  { accessorKey: "status", header: "Status" },
];

const DenseTablePage = () => {
  const table = useReactTable({ data: employees, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <PageContainer title="React Table — Dense" description="Compact table variant with reduced row height and tighter spacing.">
      <DemoBlock title="Dense Layout">
        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-lightgray dark:bg-dark">
                  {hg.headers.map((h) => (
                    <TableHead key={h.id} className="h-8 px-3 text-[11px]">{flexRender(h.column.columnDef.header, h.getContext())}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="py-1">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-1.5 px-3 text-xs">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs opacity-60 mt-3">Dense tables use h-8 headers, py-1.5 rows, text-xs — ideal for data-heavy dashboards.</p>
      </DemoBlock>
    </PageContainer>
  );
};

export default DenseTablePage;
