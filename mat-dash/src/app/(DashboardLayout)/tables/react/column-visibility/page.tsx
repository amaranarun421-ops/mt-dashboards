"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import { employees, Employee } from "../../../data/tables";
import { Icon } from "@iconify/react";

const DenseColumnVisibilityPage = () => {
  const [visibility, setVisibility] = useState<VisibilityState>({});
  const columns: ColumnDef<Employee>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "salary", header: "Salary" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "hireDate", header: "Hire Date" },
  ];
  const table = useReactTable({ data: employees, columns, state: { columnVisibility: visibility }, onColumnVisibilityChange: setVisibility, getCoreRowModel: getCoreRowModel() });

  return (
    <PageContainer title="React Table — Column Visibility" description="Toggle which columns are visible in the table.">
      <DemoBlock title="Toggle Columns">
        <div className="flex flex-wrap gap-2 mb-4">
          {table.getAllLeafColumns().map((col) => (
            <Button
              key={col.id}
              size="sm"
              variant={col.getIsVisible() ? "default" : "outline"}
              onClick={() => col.toggleVisibility()}
              className="gap-1.5 capitalize"
            >
              <Icon icon={col.getIsVisible() ? "solar:eye-bold" : "solar:eye-closed-bold"} width={14} />
              {col.id}
            </Button>
          ))}
        </div>
        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-lightgray dark:bg-dark">
                  {hg.headers.map((h) => <TableHead key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</TableHead>)}
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
      </DemoBlock>
    </PageContainer>
  );
};

export default DenseColumnVisibilityPage;
