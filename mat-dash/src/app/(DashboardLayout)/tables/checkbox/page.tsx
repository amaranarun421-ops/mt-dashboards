"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { products } from "../../data/tables";

const CheckboxTablePage = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const allSelected = selected.length === products.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => setSelected(allSelected ? [] : products.map((p) => p.id));
  const toggleOne = (id: number) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <PageContainer
      title="Checkbox Table"
      description="Multi-select rows for bulk actions. Includes select-all, indeterminate state, and bulk action bar."
    >
      <DemoBlock
        title="Products with Bulk Select"
        description={selected.length > 0 ? `${selected.length} selected` : "Click rows to select"}
      >
        {selected.length > 0 && (
          <div className="mb-4 p-3 rounded-lg bg-lightprimary flex items-center justify-between">
            <p className="text-sm font-medium text-primary">{selected.length} item(s) selected</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-1.5 border-primary text-primary"><Icon icon="solar:export-bold" width={14} /> Export</Button>
              <Button size="sm" variant="outline" className="gap-1.5 border-primary text-primary"><Icon icon="solar:archive-down-bold" width={14} /> Archive</Button>
              <Button size="sm" variant="destructive" className="gap-1.5"><Icon icon="solar:trash-bin-minimalistic-bold" width={14} /> Delete</Button>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow
                key={p.id}
                data-state={selected.includes(p.id) ? "selected" : undefined}
                className={selected.includes(p.id) ? "bg-lightprimary/40" : ""}
                onClick={() => toggleOne(p.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggleOne(p.id)} />
                </TableCell>
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

      <DemoBlock title="Single Select (Radio)" className="mt-6" description="Pick one row at a time">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Storage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { plan: "Starter", price: "$0", users: "1", storage: "1 GB" },
              { plan: "Pro", price: "$29/mo", users: "10", storage: "100 GB" },
              { plan: "Business", price: "$99/mo", users: "Unlimited", storage: "1 TB" },
              { plan: "Enterprise", price: "Custom", users: "Unlimited", storage: "Unlimited" },
            ].map((p, i) => (
              <TableRow key={p.plan} className={selected[0] === i ? "bg-lightprimary/40" : ""} onClick={() => setSelected([i])}>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={selected[0] === i} onCheckedChange={() => setSelected([i])} />
                </TableCell>
                <TableCell className="font-medium">{p.plan}</TableCell>
                <TableCell className="font-semibold">{p.price}</TableCell>
                <TableCell>{p.users}</TableCell>
                <TableCell>{p.storage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoBlock>
    </PageContainer>
  );
};

export default CheckboxTablePage;
