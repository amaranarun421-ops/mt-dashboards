"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  Plus,
  Download,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Search,
  Check,
  Pencil,
  Trash2,
  Eye,
  Route,
  Navigation,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
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

type ShipmentStatus = "in-transit" | "delivered" | "delayed" | "customs";

interface Shipment {
  id: string;
  origin: string;
  dest: string;
  carrier: string;
  status: ShipmentStatus;
  progress: number;
  eta: string;
  items: number;
}

const dailyShipments = [
  { day: "Mon", dispatched: 142, delivered: 128 },
  { day: "Tue", dispatched: 168, delivered: 152 },
  { day: "Wed", dispatched: 184, delivered: 174 },
  { day: "Thu", dispatched: 156, delivered: 162 },
  { day: "Fri", dispatched: 212, delivered: 198 },
  { day: "Sat", dispatched: 98, delivered: 104 },
  { day: "Sun", dispatched: 62, delivered: 68 },
];

const fleetData: Record<string, Array<{ route: string; volume: number; onTime: number }>> = {
  A: [
    { route: "SIN → LAX", volume: 1240, onTime: 92 },
    { route: "HKG → SFO", volume: 980, onTime: 88 },
    { route: "PVG → NYC", volume: 1840, onTime: 84 },
  ],
  B: [
    { route: "LAX → SEA", volume: 620, onTime: 95 },
    { route: "DFW → ORD", volume: 840, onTime: 91 },
    { route: "MIA → ATL", volume: 540, onTime: 89 },
  ],
  C: [
    { route: "NYC → BOS", volume: 320, onTime: 96 },
    { route: "SFO → PDX", volume: 280, onTime: 94 },
    { route: "AUS → HOU", volume: 240, onTime: 93 },
  ],
  D: [
    { route: "JFK → LHR", volume: 180, onTime: 98 },
    { route: "LAX → NRT", volume: 220, onTime: 96 },
    { route: "ORD → FRA", volume: 160, onTime: 97 },
  ],
};

const fleetSummary = [
  { name: "Fleet A — Long Haul", vehicles: 24, active: 18, idle: 4, maintenance: 2, utilization: 75 },
  { name: "Fleet B — Regional", vehicles: 48, active: 38, idle: 8, maintenance: 2, utilization: 79 },
  { name: "Fleet C — Last Mile", vehicles: 86, active: 72, idle: 10, maintenance: 4, utilization: 84 },
  { name: "Fleet D — Express", vehicles: 18, active: 14, idle: 3, maintenance: 1, utilization: 78 },
];

const initialShipments: Shipment[] = [
  { id: "SHP-8842", origin: "Shanghai, CN", dest: "Los Angeles, US", carrier: "DHL", status: "in-transit", progress: 65, eta: "Jul 4", items: 240 },
  { id: "SHP-8841", origin: "Hamburg, DE", dest: "New York, US", carrier: "Maersk", status: "in-transit", progress: 82, eta: "Jul 3", items: 1240 },
  { id: "SHP-8840", origin: "Tokyo, JP", dest: "Sydney, AU", carrier: "FedEx", status: "delivered", progress: 100, eta: "Delivered", items: 84 },
  { id: "SHP-8839", origin: "Mumbai, IN", dest: "Dubai, AE", carrier: "UPS", status: "delayed", progress: 38, eta: "Jul 6", items: 420 },
  { id: "SHP-8838", origin: "Sao Paulo, BR", dest: "Lagos, NG", carrier: "DHL", status: "in-transit", progress: 54, eta: "Jul 5", items: 680 },
  { id: "SHP-8837", origin: "Seoul, KR", dest: "Vancouver, CA", carrier: "Maersk", status: "customs", progress: 92, eta: "Jul 2", items: 2100 },
  { id: "SHP-8836", origin: "Berlin, DE", dest: "Paris, FR", carrier: "FedEx", status: "delivered", progress: 100, eta: "Delivered", items: 320 },
  { id: "SHP-8835", origin: "Bangkok, TH", dest: "Singapore, SG", carrier: "UPS", status: "delayed", progress: 24, eta: "Jul 7", items: 540 },
];

const statusFilters: Array<"all" | ShipmentStatus> = ["all", "in-transit", "delivered", "delayed", "customs"];

const statusVariant: Record<ShipmentStatus, "info" | "success" | "error" | "warning"> = {
  "in-transit": "info",
  delivered: "success",
  delayed: "error",
  customs: "warning",
};

export function LogisticsDashboard() {
  const [shipments, setShipments] = React.useState<Shipment[]>(initialShipments);
  const [statusFilter, setStatusFilter] = React.useState<"all" | ShipmentStatus>("all");
  const [fleetTab, setFleetTab] = React.useState<"A" | "B" | "C" | "D">("A");
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({ origin: "", dest: "", carrier: "DHL", items: "" });

  const filteredShipments = shipments.filter((s) => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (search && !s.id.toLowerCase().includes(search.toLowerCase()) && !s.origin.toLowerCase().includes(search.toLowerCase()) && !s.dest.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: shipments.length,
    "in-transit": shipments.filter((s) => s.status === "in-transit").length,
    delivered: shipments.filter((s) => s.status === "delivered").length,
    delayed: shipments.filter((s) => s.status === "delayed").length,
    customs: shipments.filter((s) => s.status === "customs").length,
  };

  const handleCreate = () => {
    if (!form.origin.trim() || !form.dest.trim()) {
      toast.error("Origin and destination are required");
      return;
    }
    const newShipment: Shipment = {
      id: `SHP-${String(8843 + shipments.length).padStart(4, "0")}`,
      origin: form.origin,
      dest: form.dest,
      carrier: form.carrier,
      status: "in-transit",
      progress: 0,
      eta: "TBD",
      items: Number(form.items) || 1,
    };
    setShipments([newShipment, ...shipments]);
    toast.success(`Shipment ${newShipment.id} created`);
    setForm({ origin: "", dest: "", carrier: "DHL", items: "" });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Shipment Operations"
        description="Track global shipments, monitor fleet health, and optimize delivery routes in real time."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" /> Export <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Generating manifest PDF...")}>Manifest PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting CSV...")}>CSV Export</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Syncing to ERP...")}>Sync to ERP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> New Shipment
            </Button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Active Shipments", value: "1,284", change: 8.4, trend: "up" as const, icon: Truck, subtitle: "Across 6 carriers", color: "text-brand-500" },
          { title: "In Transit", value: "842", change: 4.2, trend: "up" as const, icon: Package, subtitle: "Avg. 4.2 days ETA", color: "text-blue-light-500" },
          { title: "On-time Rate", value: "94.2%", change: 1.8, trend: "up" as const, icon: CheckCircle2, subtitle: "Above 90% target", color: "text-success-500" },
          { title: "Delayed", value: "18", change: -12, trend: "down" as const, icon: AlertCircle, subtitle: "Needs attention", color: "text-warning-500" },
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
                    : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                }`}
              >
                {kpi.trend === "up" ? "↑" : "↓"} {Math.abs(kpi.change)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Daily Shipment Volume</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Dispatched vs delivered</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyShipments} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="dispGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#465fff" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#465fff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="delivGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#12b76a" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#12b76a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="dispatched" stroke="#465fff" strokeWidth={2.5} fill="url(#dispGrad)" />
                <Area type="monotone" dataKey="delivered" stroke="#12b76a" strokeWidth={2} fill="url(#delivGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Fleet Utilization</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">By fleet group</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetSummary} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#f2f4f7" }} />
                <Bar dataKey="utilization" radius={[4, 4, 0, 0]} maxBarSize={36}>
                  {fleetSummary.map((_, i) => (
                    <Cell key={i} fill={["#465fff", "#0ba5ec", "#f79009", "#12b76a"][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fleet Tabs */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Fleet Routes</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Volume and on-time performance</p>
          </div>
          <Route className="h-5 w-5 text-gray-400" />
        </div>
        <Tabs value={fleetTab} onValueChange={(v) => { setFleetTab(v as "A" | "B" | "C" | "D"); toast.info(`Switched to Fleet ${v}`); }}>
          <TabsList className="mb-4">
            <TabsTrigger value="A">Fleet A · Long Haul</TabsTrigger>
            <TabsTrigger value="B">Fleet B · Regional</TabsTrigger>
            <TabsTrigger value="C">Fleet C · Last Mile</TabsTrigger>
            <TabsTrigger value="D">Fleet D · Express</TabsTrigger>
          </TabsList>
          {(["A", "B", "C", "D"] as const).map((f) => (
            <TabsContent key={f} value={f}>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {fleetData[f].map((r, i) => (
                  <motion.div
                    key={r.route}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand-500" />
                      <p className="text-sm font-semibold text-gray-800 dark:text-white/90">{r.route}</p>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                        <p className="text-lg font-bold text-gray-800 dark:text-white/90">{r.volume.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">On-time</p>
                        <p className={`text-lg font-bold ${r.onTime > 90 ? "text-success-500" : "text-warning-500"}`}>{r.onTime}%</p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${r.onTime}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className={`h-full rounded-full ${r.onTime > 90 ? "bg-success-500" : "bg-warning-500"}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Live Tracking Table */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800 md:p-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Live Tracking</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Real-time shipment status</p>
          </div>
          <div className="relative w-44 sm:w-56">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shipments..." className="h-9 pl-9" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-5 dark:px-6">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); toast.info(`Filtered: ${s === "all" ? "All shipments" : s.replace("-", " ")}`); }}
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-y border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Shipment</th>
                <th className="px-5 py-3 text-left font-semibold">Route</th>
                <th className="px-5 py-3 text-left font-semibold">Carrier</th>
                <th className="px-5 py-3 text-left font-semibold">Progress</th>
                <th className="px-5 py-3 text-right font-semibold">Items</th>
                <th className="px-5 py-3 text-right font-semibold">ETA</th>
                <th className="px-5 py-3 text-center font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredShipments.length > 0 ? (
                filteredShipments.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="text-sm transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3">
                      <p className="font-semibold text-gray-800 dark:text-white/90">{s.id}</p>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-gray-700 dark:text-gray-300">{s.origin}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-400"><Navigation className="h-3 w-3" />{s.dest}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{s.carrier}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className={`h-full rounded-full ${
                              s.progress === 100 ? "bg-success-500" : s.status === "delayed" ? "bg-error-500" : "bg-brand-500"
                            }`}
                            style={{ width: `${s.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{s.items.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-xs text-gray-500 dark:text-gray-400">{s.eta}</td>
                    <td className="px-5 py-3 text-center">
                      <StatusBadge variant={statusVariant[s.status]} dot pulse={s.status === "in-transit"}>
                        {s.status.replace("-", " ")}
                      </StatusBadge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuLabel>{s.id}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Tracking ${s.id} on map...`)}>
                            <Eye className="h-4 w-4" /> Track Live
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Editing ${s.id}`)}>
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`ETA updated for ${s.id}`)}>
                            <Clock className="h-4 w-4" /> Update ETA
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              setShipments((prev) => prev.filter((x) => x.id !== s.id));
                              toast.success(`Shipment ${s.id} removed`);
                            }}
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-400">
                    <Truck className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    No shipments match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Shipment Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>New Shipment</DialogTitle>
            <DialogDescription>Create a new shipment record. Fields marked * are required.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Origin *</Label>
                <Input value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} placeholder="Shanghai, CN" className="mt-1.5" />
              </div>
              <div>
                <Label>Destination *</Label>
                <Input value={form.dest} onChange={(e) => setForm({ ...form, dest: e.target.value })} placeholder="Los Angeles, US" className="mt-1.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Carrier</Label>
                <select
                  value={form.carrier}
                  onChange={(e) => setForm({ ...form, carrier: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  <option>DHL</option>
                  <option>FedEx</option>
                  <option>UPS</option>
                  <option>Maersk</option>
                  <option>DB Schenker</option>
                </select>
              </div>
              <div>
                <Label>Items</Label>
                <Input type="number" value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} placeholder="100" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Service Type</Label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {["Standard", "Express", "Freight", "Same-day"].map((s) => (
                  <button
                    key={s}
                    onClick={() => toast.info(`Service: ${s}`)}
                    className="rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-brand-500 hover:text-brand-500 dark:border-gray-700"
                  >
                    {s}
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
              <Check className="h-4 w-4" /> Create Shipment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
