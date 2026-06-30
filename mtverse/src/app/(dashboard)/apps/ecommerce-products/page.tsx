"use client";

import * as React from "react";
import { useState } from "react";
import {
  Plus, Search, Filter, LayoutGrid, List, MoreVertical, Package, TrendingUp,
  TrendingDown, AlertTriangle, DollarSign, Boxes, Download, Pencil, Trash2,
  CheckSquare, Rocket, Headphones, Watch, Shirt, Lightbulb, Droplet,
  Dumbbell, Coffee, Keyboard, Sofa, Glasses, CupSoda,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PageHeader, StatCard, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Product = {
  id: string; name: string; sku: string; icon: LucideIcon; gradient: string;
  price: number; stock: number; category: string; status: "active" | "draft" | "out-of-stock";
  sales: number;
};

const categoryColors: Record<string, string> = {
  Electronics: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  Apparel: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Home: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Beauty: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20",
  Sports: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Food: "bg-violet-500/10 text-violet-600 border-violet-500/20",
};

const statusStyles: Record<Product["status"], string> = {
  active: "bg-success/10 text-success border-success/20",
  draft: "bg-muted text-muted-foreground border-border",
  "out-of-stock": "bg-destructive/10 text-destructive border-destructive/20",
};

const initialProducts: Product[] = [
  { id: "p1", name: "MTVerse Pro License", sku: "MTV-PRO-001", icon: Rocket, gradient: "from-violet-500 to-fuchsia-500", price: 149, stock: 1240, category: "Electronics", status: "active", sales: 1284 },
  { id: "p2", name: "Wireless Headphones X3", sku: "ELEC-WH-X3", icon: Headphones, gradient: "from-sky-500 to-cyan-500", price: 199, stock: 156, category: "Electronics", status: "active", sales: 894 },
  { id: "p3", name: "Smart Watch Series 5", sku: "ELEC-SW-S5", icon: Watch, gradient: "from-emerald-500 to-teal-500", price: 329, stock: 89, category: "Electronics", status: "active", sales: 678 },
  { id: "p4", name: "Cotton Hoodie Premium", sku: "APP-HD-PREM", icon: Shirt, gradient: "from-rose-500 to-pink-500", price: 89, stock: 412, category: "Apparel", status: "active", sales: 542 },
  { id: "p5", name: "Desk Lamp Aurora", sku: "HOME-DL-AUR", icon: Lightbulb, gradient: "from-amber-500 to-orange-500", price: 79, stock: 0, category: "Home", status: "out-of-stock", sales: 423 },
  { id: "p6", name: "Skincare Set Deluxe", sku: "BUT-SS-DLX", icon: Droplet, gradient: "from-fuchsia-500 to-pink-500", price: 129, stock: 248, category: "Beauty", status: "active", sales: 612 },
  { id: "p7", name: "Yoga Mat Pro", sku: "SPT-YM-PRO", icon: Dumbbell, gradient: "from-emerald-500 to-green-500", price: 59, stock: 312, category: "Sports", status: "active", sales: 384 },
  { id: "p8", name: "Coffee Beans 1kg", sku: "FOO-CB-1KG", icon: Coffee, gradient: "from-amber-700 to-yellow-700", price: 32, stock: 890, category: "Food", status: "active", sales: 1820 },
  { id: "p9", name: "Mechanical Keyboard K2", sku: "ELEC-KB-K2", icon: Keyboard, gradient: "from-violet-500 to-indigo-500", price: 159, stock: 67, category: "Electronics", status: "active", sales: 421 },
  { id: "p10", name: "Linen Throw Blanket", sku: "HOME-TB-LIN", icon: Sofa, gradient: "from-teal-500 to-emerald-500", price: 119, stock: 28, category: "Home", status: "active", sales: 187 },
  { id: "p11", name: "Sunglasses Retro", sku: "APP-SG-RET", icon: Glasses, gradient: "from-slate-600 to-zinc-700", price: 99, stock: 0, category: "Apparel", status: "out-of-stock", sales: 248 },
  { id: "p12", name: "Premium Tea Sampler", sku: "FOO-TS-PRM", icon: CupSoda, gradient: "from-green-500 to-emerald-500", price: 42, stock: 540, category: "Food", status: "draft", sales: 0 },
];

const fmt = (n: number) => `$${n.toLocaleString()}`;

export default function ProductsApp() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock" | "sales">("sales");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newCategory, setNewCategory] = useState("Electronics");

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products
    .filter((p) => (category === "all" || p.category === category) && (!query || `${p.name} ${p.sku}`.toLowerCase().includes(query.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "stock") return b.stock - a.stock;
      return b.sales - a.sales;
    });

  const stats = {
    total: products.length,
    revenue: products.reduce((a, p) => a + p.price * p.sales, 0),
    lowStock: products.filter((p) => p.stock > 0 && p.stock < 100).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const bulkDelete = () => {
    setProducts((prev) => prev.filter((p) => !selected.has(p.id)));
    toast.message(`${selected.size} products deleted`);
    setSelected(new Set());
  };

  const addProduct = () => {
    const price = parseFloat(newPrice);
    const stock = parseInt(newStock);
    if (!newName.trim() || !price || isNaN(stock)) { toast.error("All fields required"); return; }
    const p: Product = {
      id: `p${Date.now()}`, name: newName, sku: `NEW-${Math.floor(Math.random() * 9000) + 1000}`,
      icon: Package, gradient: "from-violet-500 to-fuchsia-500", price, stock, category: newCategory,
      status: stock === 0 ? "out-of-stock" : "draft", sales: 0,
    };
    setProducts([p, ...products]);
    setNewName(""); setNewPrice(""); setNewStock(""); setNewCategory("Electronics");
    setAddOpen(false);
    toast.success("Product added", { description: p.name });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your catalog, inventory, and pricing in one place."
        breadcrumbs={[{ label: "Apps" }, { label: "Products" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9" onClick={() => toast.message("Export started")}><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9" onClick={() => setAddOpen(true)}><Plus className="size-4 mr-2" /> Add product</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Products" value={stats.total} icon={<Boxes className="size-5" />} footer="In catalog" />
        <StatCard label="Revenue" value={fmt(stats.revenue)} delta={14.2} deltaLabel="vs last month" icon={<DollarSign className="size-5" />} footer="Lifetime" />
        <StatCard label="Low Stock" value={stats.lowStock} icon={<AlertTriangle className="size-5" />} footer="< 100 units" />
        <StatCard label="Out of Stock" value={stats.outOfStock} delta={-2} deltaLabel="vs last week" icon={<TrendingDown className="size-5" />} footer="Needs reorder" />
      </div>

      <SectionCard
        title="Product catalog"
        description={`${filtered.length} of ${products.length} products`}
        noBodyPadding
        actions={
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="pl-9 h-8 w-48 text-xs" />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-8 w-32 text-xs"><Filter className="size-3 mr-1" /><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((c) => <SelectItem key={c} value={c} className="capitalize">{c === "all" ? "All categories" : c}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="h-8 w-28 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Top selling</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-0.5 border border-border rounded-md p-0.5">
              <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="size-7" onClick={() => setView("grid")}><LayoutGrid className="size-3.5" /></Button>
              <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="size-7" onClick={() => setView("list")}><List className="size-3.5" /></Button>
            </div>
          </div>
        }
      >
        {selected.size > 0 && (
          <div className="flex items-center justify-between p-2.5 border-b border-border bg-primary/5">
            <span className="text-xs font-medium flex items-center gap-2"><CheckSquare className="size-4 text-primary" />{selected.size} selected</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.message("Bulk edit opened")}><Pencil className="size-3.5 mr-1" /> Edit</Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.message("Category bulk update")}><Package className="size-3.5 mr-1" /> Categorize</Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={bulkDelete}><Trash2 className="size-3.5 mr-1" /> Delete</Button>
            </div>
          </div>
        )}
        <ScrollArea className="max-h-[640px]">
          {view === "grid" ? (
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((p) => {
                const isSel = selected.has(p.id);
                const Icon = p.icon;
                return (
                  <div key={p.id} className={`group relative rounded-xl border bg-card overflow-hidden transition-all hover:shadow-md ${isSel ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                      <Icon className="size-16 text-white drop-shadow-lg" />
                      <div className="absolute top-2 left-2"><Checkbox checked={isSel} onCheckedChange={() => toggleSelect(p.id)} className="bg-background/80 backdrop-blur" /></div>
                      <div className="absolute top-2 right-2"><Badge variant="outline" className={`text-[9px] capitalize backdrop-blur bg-background/80 ${statusStyles[p.status]}`}>{p.status.replace("-", " ")}</Badge></div>
                      <Button variant="secondary" size="icon" className="absolute bottom-2 right-2 size-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-md" onClick={() => toast.message("Product menu")}><MoreVertical className="size-3" /></Button>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Badge variant="outline" className={`text-[9px] ${categoryColors[p.category]}`}>{p.category}</Badge>
                      </div>
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">{p.sku}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base font-bold">{fmt(p.price)}</span>
                        <span className={`text-[10px] ${p.stock === 0 ? "text-destructive font-medium" : p.stock < 100 ? "text-warning font-medium" : "text-muted-foreground"}`}>
                          {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><TrendingUp className="size-2.5" />{p.sales} sold</span>
                        <span>{fmt(p.price * p.sales)} rev</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <Package className="size-10 text-muted-foreground/40 mb-2" />
                  <p className="text-sm text-muted-foreground">No products match</p>
                </div>
              )}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((p) => {
                const isSel = selected.has(p.id);
                const Icon = p.icon;
                return (
                  <div key={p.id} onClick={() => toggleSelect(p.id)} className={`grid grid-cols-[40px_1fr_120px_100px_80px_100px_40px] gap-2 p-3 items-center cursor-pointer transition-colors ${isSel ? "bg-primary/5" : "hover:bg-accent/50"}`}>
                    <Checkbox checked={isSel} />
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`size-9 rounded-md bg-gradient-to-br ${p.gradient} flex items-center justify-center shrink-0`}><Icon className="size-4 text-white" /></div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{p.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground">{p.sku}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-[9px] ${categoryColors[p.category]}`}>{p.category}</Badge>
                    <span className="text-sm font-semibold">{fmt(p.price)}</span>
                    <span className={`text-xs ${p.stock === 0 ? "text-destructive font-medium" : p.stock < 100 ? "text-warning font-medium" : "text-muted-foreground"}`}>{p.stock}</span>
                    <Badge variant="outline" className={`text-[9px] capitalize justify-self-start ${statusStyles[p.status]}`}>{p.status.replace("-", " ")}</Badge>
                    <Button variant="ghost" size="icon" className="size-7 text-muted-foreground" onClick={(e) => { e.stopPropagation(); toast.message("Product menu"); }}><MoreVertical className="size-3.5" /></Button>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </SectionCard>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Add new product</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0"><Package className="size-7 text-white" /></div>
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs">Default icon</Label>
                <p className="text-xs text-muted-foreground">A Package icon will be used for the new product.</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Product name</Label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Wireless Earbuds Pro" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Price ($)</Label>
                <Input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} type="number" placeholder="0.00" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Stock</Label>
                <Input value={newStock} onChange={(e) => setNewStock(e.target.value)} type="number" placeholder="0" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Category</Label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>{Object.keys(categoryColors).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={addProduct}><Plus className="size-4 mr-2" /> Add product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
