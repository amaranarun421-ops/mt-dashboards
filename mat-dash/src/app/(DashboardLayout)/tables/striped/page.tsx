"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { products } from "../../data/tables";

const StripedTablePage = () => {
  return (
    <PageContainer
      title="Striped Rows Table"
      description="Alternating row backgrounds improve readability for dense data sets."
    >
      <DemoBlock title="Striped Products">
        <Table className="border border-defaultBorder rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-lightprimary hover:bg-lightprimary">
              <TableHead className="text-primary">Product</TableHead>
              <TableHead className="text-primary">SKU</TableHead>
              <TableHead className="text-primary">Category</TableHead>
              <TableHead className="text-primary">Price</TableHead>
              <TableHead className="text-primary">Stock</TableHead>
              <TableHead className="text-primary">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.slice(0, 10).map((p, i) => (
              <TableRow key={p.id} className={i % 2 === 0 ? "bg-lightgray/40 dark:bg-dark/30" : ""}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="font-mono text-xs opacity-70">{p.sku}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell className="font-semibold">${p.price.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={p.stock === 0 ? "text-error" : p.stock < 20 ? "text-warning" : ""}>{p.stock}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={p.status === "Active" ? "lightSuccess" : p.status === "Draft" ? "lightWarning" : "lightError"}>{p.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoBlock>

      <DemoBlock title="Striped with Borders" className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: "ORD-001", customer: "Acme Corp", date: "Jun 12, 2024", amount: 12500, status: "Completed" },
              { id: "ORD-002", customer: "Globex Inc", date: "Jun 13, 2024", amount: 8750, status: "Pending" },
              { id: "ORD-003", customer: "Initech", date: "Jun 14, 2024", amount: 15200, status: "Completed" },
              { id: "ORD-004", customer: "Umbrella LLC", date: "Jun 15, 2024", amount: 4300, status: "Refunded" },
              { id: "ORD-005", customer: "Stark Industries", date: "Jun 16, 2024", amount: 28900, status: "Completed" },
              { id: "ORD-006", customer: "Wayne Enterprises", date: "Jun 17, 2024", amount: 18750, status: "Pending" },
            ].map((o, i) => (
              <TableRow key={o.id} className={`border-b border-defaultBorder ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                <TableCell className="font-mono text-xs">{o.id}</TableCell>
                <TableCell className="font-medium">{o.customer}</TableCell>
                <TableCell>{o.date}</TableCell>
                <TableCell className="font-semibold">${o.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={o.status === "Completed" ? "lightSuccess" : o.status === "Pending" ? "lightWarning" : "lightError"}>{o.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoBlock>
    </PageContainer>
  );
};

export default StripedTablePage;
