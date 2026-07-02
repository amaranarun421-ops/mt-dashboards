"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Home,
  DollarSign,
  TrendingUp,
  Plus,
  Download,
  MapPin,
  MoreHorizontal,
  Search,
  Check,
  Eye,
  Pencil,
  Trash2,
  Star,
  BedDouble,
  Bath,
  Maximize,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type ListingStatus = "for-sale" | "for-rent" | "pending" | "sold";

interface Listing {
  id: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  status: ListingStatus;
  image: string;
  featured?: boolean;
}

const priceTrend = [
  { month: "Jan", avg: 420000, sold: 84 },
  { month: "Feb", avg: 432000, sold: 92 },
  { month: "Mar", avg: 448000, sold: 88 },
  { month: "Apr", avg: 462000, sold: 102 },
  { month: "May", avg: 478000, sold: 124 },
  { month: "Jun", avg: 495000, sold: 138 },
];

const cityVolume = [
  { city: "Beverly Hills", listings: 284, color: "#465fff" },
  { city: "Austin", listings: 542, color: "#0ba5ec" },
  { city: "Seattle", listings: 418, color: "#12b76a" },
  { city: "Denver", listings: 312, color: "#f79009" },
  { city: "Miami", listings: 248, color: "#f04438" },
];

const agents = [
  { name: "Sarah Chen", deals: 24, volume: 18400000, avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Mark Park", deals: 18, volume: 12200000, avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "Lisa Wang", deals: 22, volume: 16800000, avatar: "https://i.pravatar.cc/40?img=3" },
  { name: "David Liu", deals: 16, volume: 9800000, avatar: "https://i.pravatar.cc/40?img=4" },
];

const initialListings: Listing[] = [
  { id: "LST-001", address: "123 Sunset Blvd", city: "Beverly Hills, CA", price: 2850000, beds: 4, baths: 3, sqft: 3200, status: "for-sale", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=240&fit=crop", featured: true },
  { id: "LST-002", address: "456 Oak Avenue", city: "Austin, TX", price: 685000, beds: 3, baths: 2, sqft: 1840, status: "for-rent", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=240&fit=crop" },
  { id: "LST-003", address: "789 Maple Drive", city: "Seattle, WA", price: 920000, beds: 4, baths: 3, sqft: 2400, status: "for-sale", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=240&fit=crop" },
  { id: "LST-004", address: "321 Pine Street", city: "Denver, CO", price: 540000, beds: 2, baths: 2, sqft: 1420, status: "pending", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=240&fit=crop" },
  { id: "LST-005", address: "654 Cedar Lane", city: "Portland, OR", price: 425000, beds: 3, baths: 2, sqft: 1680, status: "for-sale", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=240&fit=crop" },
  { id: "LST-006", address: "987 Birch Road", city: "Miami, FL", price: 1240000, beds: 5, baths: 4, sqft: 3800, status: "for-sale", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=240&fit=crop", featured: true },
  { id: "LST-007", address: "147 Hillside Ave", city: "Austin, TX", price: 880000, beds: 4, baths: 3, sqft: 2400, status: "sold", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=240&fit=crop" },
  { id: "LST-008", address: "258 Valley View", city: "Seattle, WA", price: 720000, beds: 3, baths: 2, sqft: 1920, status: "for-rent", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=240&fit=crop" },
];

const statusFilters: Array<"all" | ListingStatus> = ["all", "for-sale", "for-rent", "pending", "sold"];
const priceRanges = [
  { id: "all", label: "All Prices" },
  { id: "under-500k", label: "Under $500K" },
  { id: "500k-1m", label: "$500K – $1M" },
  { id: "1m-2m", label: "$1M – $2M" },
  { id: "over-2m", label: "Over $2M" },
] as const;

const statusVariant: Record<ListingStatus, "info" | "primary" | "warning" | "success"> = {
  "for-sale": "info",
  "for-rent": "primary",
  pending: "warning",
  sold: "success",
};

const matchesPriceRange = (price: number, range: string) => {
  if (range === "all") return true;
  if (range === "under-500k") return price < 500000;
  if (range === "500k-1m") return price >= 500000 && price < 1000000;
  if (range === "1m-2m") return price >= 1000000 && price < 2000000;
  if (range === "over-2m") return price >= 2000000;
  return true;
};

export function RealEstateDashboard() {
  const [listings, setListings] = React.useState<Listing[]>(initialListings);
  const [statusFilter, setStatusFilter] = React.useState<"all" | ListingStatus>("all");
  const [priceRange, setPriceRange] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({ address: "", city: "", price: "", beds: "3", baths: "2", sqft: "", status: "for-sale" });

  const filteredListings = listings.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (!matchesPriceRange(l.price, priceRange)) return false;
    if (search && !l.address.toLowerCase().includes(search.toLowerCase()) && !l.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: listings.length,
    "for-sale": listings.filter((l) => l.status === "for-sale").length,
    "for-rent": listings.filter((l) => l.status === "for-rent").length,
    pending: listings.filter((l) => l.status === "pending").length,
    sold: listings.filter((l) => l.status === "sold").length,
  };

  const handleCreate = () => {
    if (!form.address.trim() || !form.city.trim()) {
      toast.error("Address and city are required");
      return;
    }
    const newListing: Listing = {
      id: `LST-${String(listings.length + 1).padStart(3, "0")}`,
      address: form.address,
      city: form.city,
      price: Number(form.price) || 500000,
      beds: Number(form.beds) || 3,
      baths: Number(form.baths) || 2,
      sqft: Number(form.sqft) || 1500,
      status: form.status as ListingStatus,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=240&fit=crop",
    };
    setListings([newListing, ...listings]);
    toast.success(`Listing created for ${form.address}`);
    setForm({ address: "", city: "", price: "", beds: "3", baths: "2", sqft: "", status: "for-sale" });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Property Marketplace"
        description="Track listings, agent performance, and market trends across your portfolio."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" /> Export <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Export</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Generating portfolio PDF...")}>Portfolio PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting listings CSV...")}>Listings CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting agent report...")}>Agent Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> Add Listing
            </Button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Active Listings", value: "1,248", change: 6.4, trend: "up" as const, icon: Building2, subtitle: "Across 5 cities", color: "text-brand-500" },
          { title: "Avg. Price", value: "$495K", change: 3.5, trend: "up" as const, icon: DollarSign, subtitle: "+$17K MoM", color: "text-success-500" },
          { title: "Pending Sales", value: "184", change: 12.4, trend: "up" as const, icon: TrendingUp, subtitle: "Closing this month", color: "text-blue-light-500" },
          { title: "Avg. Days on Market", value: "28", change: -4, trend: "down" as const, icon: Home, subtitle: "Below 30d target", color: "text-warning-500" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
              <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</span>
                <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">{kpi.value}</h4>
                {kpi.subtitle && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{kpi.subtitle}</p>}
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium ${
                  kpi.trend === "up"
                    ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                    : "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                }`}
              >
                {kpi.trend === "up" ? "↑" : "↓"} {Math.abs(kpi.change)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Price Trend</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Average price and units sold</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceTrend} margin={{ left: -10, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#465fff" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#465fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Area type="monotone" dataKey="avg" stroke="#465fff" strokeWidth={2.5} fill="url(#priceGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Listings by City</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Active inventory</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityVolume} layout="vertical" margin={{ left: 20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="city" type="category" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} width={90} />
                <Tooltip cursor={{ fill: "#f2f4f7" }} />
                <Bar dataKey="listings" radius={[0, 4, 4, 0]} maxBarSize={20}>
                  {cityVolume.map((c, i) => (
                    <Cell key={i} fill={c.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Featured Listings Grid with Filters */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800 md:p-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Featured Listings</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{filteredListings.length} properties match your filters</p>
          </div>
          <div className="relative w-44 sm:w-56">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search listings..." className="h-9 pl-9" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-5 dark:px-6">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); toast.info(`Filtered: ${s === "all" ? "All listings" : s.replace("-", " ")}`); }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${
                statusFilter === s
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              {s === "all" ? "All" : s.replace("-", " ")} <span className="ml-1 opacity-70">({counts[s]})</span>
            </button>
          ))}
        </div>

        <div className="px-5 pb-2 dark:px-6">
          <Tabs value={priceRange} onValueChange={(v) => { setPriceRange(v); toast.info(`Price range: ${priceRanges.find((p) => p.id === v)?.label}`); }}>
            <TabsList className="flex-wrap">
              {priceRanges.map((p) => (
                <TabsTrigger key={p.id} value={p.id}>{p.label}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={priceRange} className="mt-4">
              <div className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredListings.length > 0 ? (
                  filteredListings.map((l, i) => (
                    <motion.div
                      key={l.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.02]"
                    >
                      <div className="relative aspect-[5/3] overflow-hidden">
                        <img
                          src={l.image}
                          alt={l.address}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3 flex gap-2">
                          <StatusBadge variant={statusVariant[l.status]}>{l.status.replace("-", " ")}</StatusBadge>
                          {l.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-warning-500 px-2 py-0.5 text-xs font-medium text-white">
                              <Star className="h-3 w-3" /> Featured
                            </span>
                          )}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition group-hover:opacity-100">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="gap-1.5"
                            onClick={() => toast.success(`Viewing ${l.address}`)}
                          >
                            <Eye className="h-3.5 w-3.5" /> View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="secondary" className="h-8 w-8">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuItem onClick={() => toast.info(`Editing ${l.address}`)}>
                                <Pencil className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success(`Marked as ${l.status === "for-sale" ? "sold" : "for-sale"}`)}>
                                <TrendingUp className="h-4 w-4" /> Mark Sold
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => {
                                  setListings((prev) => prev.filter((x) => x.id !== l.id));
                                  toast.success(`Listing ${l.id} removed`);
                                }}
                              >
                                <Trash2 className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">{l.address}</p>
                            <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <MapPin className="h-3 w-3" />{l.city}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-gray-400">{l.id}</span>
                        </div>
                        <p className="mt-2 text-lg font-bold text-brand-500">${l.price.toLocaleString()}</p>
                        <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
                          <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{l.beds} beds</span>
                          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{l.baths} baths</span>
                          <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" />{l.sqft.toLocaleString()} sqft</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-3 p-12 text-center text-sm text-gray-400">
                    <Home className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    No listings match your filters
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Top Agents */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Top Agents</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">By deal volume this quarter</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((a, i) => (
            <motion.button
              key={a.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toast.info(`${a.name}: ${a.deals} deals, $${(a.volume / 1000000).toFixed(1)}M volume`)}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-left transition hover:border-brand-500 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={a.avatar}
                    alt={a.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <span className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                    i === 0 ? "bg-warning-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-500" : "bg-brand-500"
                  }`}>
                    {i + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">{a.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{a.deals} deals closed</p>
                </div>
              </div>
              <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                <p className="text-xs text-gray-400">Volume</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white/90">${(a.volume / 1000000).toFixed(1)}M</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Add Listing Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Add Listing</DialogTitle>
            <DialogDescription>Create a new property listing.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Address *</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="123 Sunset Blvd" className="mt-1.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City *</Label>
                <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Beverly Hills, CA" className="mt-1.5" />
              </div>
              <div>
                <Label>Price ($)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="500000" className="mt-1.5" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Beds</Label>
                <Input type="number" value={form.beds} onChange={(e) => setForm({ ...form, beds: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Baths</Label>
                <Input type="number" value={form.baths} onChange={(e) => setForm({ ...form, baths: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Sqft</Label>
                <Input type="number" value={form.sqft} onChange={(e) => setForm({ ...form, sqft: e.target.value })} placeholder="1500" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {(["for-sale", "for-rent", "pending", "sold"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm({ ...form, status: s })}
                    className={`rounded-lg border-2 px-3 py-1.5 text-sm font-medium capitalize transition ${
                      form.status === s
                        ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                        : "border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    {s.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreate} className="gap-1.5">
              <Check className="h-4 w-4" /> Create Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
