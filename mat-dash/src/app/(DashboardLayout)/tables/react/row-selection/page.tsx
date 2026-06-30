"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { employees, Employee } from "../../../data/tables";

const RowSelectionTablePage = () => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const columns: ColumnDef<Employee>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    { accessorKey: "name", header: "Name", cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "role", header: "Role" },
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

  const table = useReactTable({
    data: employees,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <PageContainer
      title="React Table — Row Selection"
      description="Multi-row selection with bulk action bar. Select across paginated rows."
    >
      <DemoBlock title="Employee Selection">
        {selectedCount > 0 && (
          <div className="mb-4 p-3 rounded-lg bg-lightprimary flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-primary flex items-center gap-2">
              <Icon icon="solar:checklist-bold" width={18} /> {selectedCount} employee(s) selected
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-primary text-primary gap-1.5"><Icon icon="solar:letter-linear" width={14} /> Email</Button>
              <Button size="sm" variant="outline" className="border-primary text-primary gap-1.5"><Icon icon="solar:export-bold" width={14} /> Export CSV</Button>
              <Button size="sm" variant="outline" className="border-primary text-primary gap-1.5"><Icon icon="solar:users-group-rounded-bold" width={14} /> Assign Team</Button>
              <Button size="sm" variant="destructive" className="gap-1.5"><Icon icon="solar:trash-bin-minimalistic-bold" width={14} /> Archive</Button>
            </div>
          </div>
        )}

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
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined} className={row.getIsSelected() ? "bg-lightprimary/40" : ""}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm opacity-70">
            {selectedCount > 0 ? `${selectedCount} of ${employees.length} rows selected` : `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
          </p>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="gap-1.5">
              <Icon icon="solar:alt-arrow-left-linear" width={14} /> Prev
            </Button>
            <Button size="sm" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="gap-1.5">
              Next <Icon icon="solar:alt-arrow-right-linear" width={14} />
            </Button>
          </div>
        </div>
      </DemoBlock>
    </PageContainer>
  );
};

export default RowSelectionTablePage;
