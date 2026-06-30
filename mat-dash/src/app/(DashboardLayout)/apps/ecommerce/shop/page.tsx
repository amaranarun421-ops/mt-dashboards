"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { shopProducts } from "../../../data/ecommerce";

const categories = ["All", ...Array.from(new Set(shopProducts.map((p) => p.category)))];

const ShopPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState<number[]>([]);

  let filtered = shopProducts.filter((p) =>
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (category === "All" || p.category === category)
  );

  if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const addToCart = (id: number) => setCart((c) => [...c, id]);

  return (
    <PageContainer
      title="Shop"
      description="Browse products with search, category filter, sort, and quick add-to-cart."
      actions={
        <Button variant="lightprimary" className="gap-2 relative">
          <Icon icon="solar:cart-large-2-bold" width={18} /> Cart
          {cart.length > 0 && <Badge variant="error" className="absolute -top-2 -right-2 h-5 min-w-5 px-1 text-[10px]">{cart.length}</Badge>}
        </Button>
      }
    >
      <DemoBlock title={`Products (${filtered.length})`}>
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Icon icon="solar:magnifer-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="md:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="md:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-xl border border-defaultBorder bg-background overflow-hidden hover:shadow-md transition-shadow group">
              <Link href={`/apps/ecommerce/details/${p.id}`} className="block relative aspect-square overflow-hidden bg-lightgray dark:bg-dark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {p.badge && <Badge variant={p.badge.includes("-") ? "error" : p.badge === "New" ? "primary" : "lightSuccess"} className="absolute top-2 left-2">{p.badge}</Badge>}
                <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background hover:bg-lightprimary hover:text-primary flex items-center justify-center">
                  <Icon icon="solar:heart-linear" width={16} />
                </button>
              </Link>
              <div className="p-4">
                <p className="text-xs opacity-60 mb-1">{p.category}</p>
                <Link href={`/apps/ecommerce/details/${p.id}`} className="block font-medium text-sm line-clamp-2 hover:text-primary">{p.name}</Link>
                <div className="flex items-center gap-1 mt-1.5 text-xs">
                  <Icon icon="solar:star-bold" className="text-warning" width={14} />
                  <span className="font-medium">{p.rating}</span>
                  <span className="opacity-50">({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="font-bold text-base">${p.price}</span>
                    {p.oldPrice && <span className="text-xs opacity-50 line-through ml-1.5">${p.oldPrice}</span>}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3 gap-1.5"
                  disabled={!p.inStock}
                  onClick={() => addToCart(p.id)}
                >
                  <Icon icon="solar:cart-large-2-bold" width={14} />
                  {p.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 opacity-60">
            <Icon icon="solar:cart-cross-2-line-duotone" width={48} className="mx-auto mb-2" />
            <p>No products match your filters.</p>
          </div>
        )}
      </DemoBlock>
    </PageContainer>
  );
};

export default ShopPage;
