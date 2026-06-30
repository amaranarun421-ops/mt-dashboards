"use client";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { employees, Employee } from "../../../data/tables";

const columns: ColumnDef<Employee>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <span className="font-semibold">${row.original.salary.toLocaleString()}</span>,
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

const BasicReactTablePage = () => {
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageContainer
      title="React Table — Basic"
      description="TanStack Table integration. Foundation for sorting, filtering, pagination, and selection."
    >
      <DemoBlock title="Employee Table" description="Built with @tanstack/react-table">
        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-lightprimary/50 hover:bg-lightprimary/50">
                  {hg.headers.map((h) => (
                    <TableHead key={h.id} className="text-primary">
                      {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
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
                <TableRow><TableCell colSpan={columns.length} className="text-center py-8 opacity-60">No results.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs opacity-60 mt-3">Showing {table.getRowModel().rows.length} of {employees.length} rows</p>
      </DemoBlock>

      <DemoBlock title="Products Table" className="mt-6">
        <ProductTable />
      </DemoBlock>
    </PageContainer>
  );
};

// Inline second table to demonstrate reusability
import { products } from "../../../data/tables";
const productCols: ColumnDef<typeof products[0]>[] = [
  { accessorKey: "name", header: "Product" },
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

const ProductTable = () => {
  const table = useReactTable({ data: products, columns: productCols, getCoreRowModel: getCoreRowModel() });
  return (
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
  );
};

export default BasicReactTablePage;
