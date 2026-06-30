"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TablesPage = () => {
  const data = [
    { id: 1, name: "Sarah Johnson", role: "Designer", status: "Active", salary: "$95k" },
    { id: 2, name: "Michael Chen", role: "Developer", status: "Active", salary: "$110k" },
    { id: 3, name: "Emily Rodriguez", role: "Manager", status: "Away", salary: "$125k" },
    { id: 4, name: "David Park", role: "Analyst", status: "Offline", salary: "$78k" },
  ];

  return (
    <PageContainer title="Tables" description="UI showcase of table variants — clean, bordered, compact.">
      <div className="space-y-6">
        <DemoBlock title="Clean Table">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Salary</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {data.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.role}</TableCell>
                  <TableCell><Badge variant={r.status === "Active" ? "lightSuccess" : r.status === "Away" ? "lightWarning" : "lightError"}>{r.status}</Badge></TableCell>
                  <TableCell className="font-semibold">{r.salary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DemoBlock>

        <DemoBlock title="Bordered Table">
          <div className="rounded-lg border border-defaultBorder overflow-hidden">
            <Table>
              <TableHeader><TableRow className="bg-lightgray dark:bg-dark">
                <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Department</TableHead><TableHead>Status</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {data.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">#{r.id.toString().padStart(4, "0")}</TableCell>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.role}</TableCell>
                    <TableCell><Badge variant="lightPrimary">{r.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DemoBlock>

        <DemoBlock title="Compact Table">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="h-8">Product</TableHead><TableHead className="h-8">Price</TableHead><TableHead className="h-8">Stock</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {[
                { p: "Headphones", price: "$299", stock: "In Stock" },
                { p: "Keyboard", price: "$159", stock: "Low" },
                { p: "Mouse", price: "$49", stock: "Out" },
              ].map((r) => (
                <TableRow key={r.p}>
                  <TableCell className="py-2 text-sm">{r.p}</TableCell>
                  <TableCell className="py-2 text-sm font-medium">{r.price}</TableCell>
                  <TableCell className="py-2"><Badge variant={r.stock === "In Stock" ? "lightSuccess" : r.stock === "Low" ? "lightWarning" : "lightError"} className="text-[10px]">{r.stock}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default TablesPage;
