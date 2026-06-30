"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { shopProducts } from "../../../data/ecommerce";

const ProductListPage = () => {
  const [search, setSearch] = useState("");
  const filtered = shopProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageContainer
      title="Product List"
      description="Manage your product catalog — search, edit, delete, and create new products."
      actions={<Button asChild className="gap-2"><Link href="/apps/ecommerce/add-product"><Icon icon="solar:add-circle-bold" width={18} /> Add Product</Link></Button>}
    >
      <DemoBlock title={`Catalog (${filtered.length} products)`}>
        <div className="relative mb-4">
          <Icon icon="solar:magnifer-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 max-w-md" />
        </div>
        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-lightprimary/50 hover:bg-lightprimary/50">
                <TableHead className="text-primary">Product</TableHead>
                <TableHead className="text-primary">Category</TableHead>
                <TableHead className="text-primary">Price</TableHead>
                <TableHead className="text-primary">Rating</TableHead>
                <TableHead className="text-primary">Stock</TableHead>
                <TableHead className="text-primary text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="hover:bg-lightgray/40 dark:hover:bg-dark/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div>
                        <Link href={`/apps/ecommerce/details/${p.id}`} className="font-medium text-sm hover:text-primary line-clamp-1">{p.name}</Link>
                        <p className="text-xs opacity-60">ID: {p.id.toString().padStart(4, "0")}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{p.category}</TableCell>
                  <TableCell>
                    <span className="font-semibold">${p.price}</span>
                    {p.oldPrice && <span className="text-xs opacity-50 line-through ml-1">${p.oldPrice}</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Icon icon="solar:star-bold" className="text-warning" width={12} />
                      <span className="text-sm font-medium">{p.rating}</span>
                      <span className="text-xs opacity-50">({p.reviews})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.inStock ? "lightSuccess" : "lightError"}>{p.inStock ? "In Stock" : "Out of Stock"}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                        <Link href={`/apps/ecommerce/edit-product/${p.id}`}><Icon icon="solar:pen-linear" width={16} /></Link>
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-lighterror hover:text-error"><Icon icon="solar:trash-bin-minimalistic-linear" width={16} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DemoBlock>
    </PageContainer>
  );
};

export default ProductListPage;
