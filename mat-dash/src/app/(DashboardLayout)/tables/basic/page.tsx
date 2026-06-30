"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { products } from "../../data/tables";

const BasicTablePage = () => {
  return (
    <PageContainer
      title="Basic Table"
      description="Simple HTML-style table with header, body, and caption. The foundation for all table variants."
    >
      <DemoBlock title="Products Table">
        <Table>
          <TableCaption>A list of recent products in inventory.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.slice(0, 8).map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">#{p.id.toString().padStart(4, "0")}</TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>${p.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "Active" ? "lightSuccess" : p.status === "Draft" ? "lightWarning" : "lightError"}>{p.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoBlock>

      <DemoBlock title="Employee Directory" className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Hire Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: "Sarah Johnson", dept: "Engineering", role: "Senior Developer", salary: 125000, hire: "Mar 15, 2021" },
              { name: "Michael Chen", dept: "Design", role: "Lead Designer", salary: 110000, hire: "Aug 22, 2020" },
              { name: "Emily Rodriguez", dept: "Marketing", role: "Marketing Manager", salary: 95000, hire: "Jan 10, 2022" },
              { name: "David Park", dept: "Engineering", role: "Frontend Developer", salary: 98000, hire: "Jun 5, 2023" },
              { name: "Lisa Anderson", dept: "HR", role: "HR Director", salary: 130000, hire: "Nov 12, 2019" },
            ].map((e) => (
              <TableRow key={e.name}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell>{e.dept}</TableCell>
                <TableCell>{e.role}</TableCell>
                <TableCell>${e.salary.toLocaleString()}</TableCell>
                <TableCell>{e.hire}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoBlock>
    </PageContainer>
  );
};

export default BasicTablePage;
