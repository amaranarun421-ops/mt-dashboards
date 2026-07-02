"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Calendar,
  Users,
  DollarSign,
  Plus,
  Download,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  Search,
  Check,
  Phone,
  Mail,
  CalendarClock,
  Video,
  Building,
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
  RadialBarChart,
  RadialBar,
} from "recharts";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const bookingsByDay = [
  { day: "Mon", bookings: 124, revenue: 12400 },
  { day: "Tue", bookings: 142, revenue: 14200 },
  { day: "Wed", bookings: 168, revenue: 16800 },
  { day: "Thu", bookings: 184, revenue: 18400 },
  { day: "Fri", bookings: 248, revenue: 24800 },
  { day: "Sat", bookings: 312, revenue: 31200 },
  { day: "Sun", bookings: 268, revenue: 26800 },
];

const serviceTypes = [
  { type: "Consultation", count: 248, color: "#465fff", pct: 32 },
  { type: "Workshop", count: 184, color: "#0ba5ec", pct: 24 },
  { type: "Training", count: 142, color: "#f79009", pct: 18 },
  { type: "Demo", count: 108, color: "#12b76a", pct: 14 },
  { type: "Other", count: 92, color: "#98a2b3", pct: 12 },
];

interface Booking {
  id: string;
  client: string;
  service: string;
  date: string;
  duration: string;
  attendees: number;
  status: "confirmed" | "pending" | "cancelled";
  avatar: string;
}

const initialBookings: Booking[] = [
  { id: "BKG-001", client: "Acme Corp", service: "Consultation", date: "Today, 2:00 PM", duration: "2h", attendees: 12, status: "confirmed", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: "BKG-002", client: "Globex Inc", service: "Demo", date: "Today, 4:30 PM", duration: "45m", attendees: 5, status: "confirmed", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: "BKG-003", client: "Initech", service: "Consultation", date: "Tomorrow, 10:00 AM", duration: "1h", attendees: 3, status: "pending", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: "BKG-004", client: "Umbrella Co", service: "Training", date: "Tomorrow, 2:00 PM", duration: "3h", attendees: 18, status: "confirmed", avatar: "https://i.pravatar.cc/40?img=4" },
  { id: "BKG-005", client: "Stark Industries", service: "Workshop", date: "Jul 4, 11:00 AM", duration: "4h", attendees: 24, status: "pending", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: "BKG-006", client: "Wayne Ent.", service: "Demo", date: "Jul 5, 9:00 AM", duration: "1h", attendees: 8, status: "confirmed", avatar: "https://i.pravatar.cc/40?img=6" },
];

const staff = [
  { name: "Sarah Chen", role: "Senior Consultant", bookings: 42, utilization: 88, avatar: "https://i.pravatar.cc/40?img=11" },
  { name: "Mark Park", role: "Workshop Lead", bookings: 38, utilization: 76, avatar: "https://i.pravatar.cc/40?img=12" },
  { name: "Lisa Wang", role: "Trainer", bookings: 32, utilization: 82, avatar: "https://i.pravatar.cc/40?img=13" },
  { name: "David Liu", role: "Demo Specialist", bookings: 28, utilization: 64, avatar: "https://i.pravatar.cc/40?img=14" },
];

const serviceFilters = ["All", "Consultation", "Workshop", "Training", "Demo", "Other"];
const dateRanges = ["Today", "Week", "Month"] as const;

export function BookingDashboard() {
  const [bookings, setBookings] = React.useState<Booking[]>(initialBookings);
  const [serviceFilter, setServiceFilter] = React.useState<string>("All");
  const [dateRange, setDateRange] = React.useState<(typeof dateRanges)[number]>("Today");
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({ client: "", service: "Consultation", date: "", duration: "1h", attendees: "" });

  const filteredBookings = bookings.filter((b) => {
    if (serviceFilter !== "All" && b.service !== serviceFilter) return false;
    if (search && !b.client.toLowerCase().includes(search.toLowerCase()) && !b.service.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalBookings = serviceTypes.reduce((acc, s) => acc + s.count, 0);
  const totalRevenue = bookingsByDay.reduce((acc, d) => acc + d.revenue, 0);

  const handleCreate = () => {
    if (!form.client.trim() || !form.date) {
      toast.error("Client name and date are required");
      return;
    }
    const newBooking: Booking = {
      id: `BKG-${String(bookings.length + 1).padStart(3, "0")}`,
      client: form.client,
      service: form.service,
      date: form.date,
      duration: form.duration,
      attendees: Number(form.attendees) || 1,
      status: "pending",
      avatar: `https://i.pravatar.cc/40?u=${form.client}`,
    };
    setBookings([newBooking, ...bookings]);
    toast.success(`Booking created for ${form.client}`);
    setForm({ client: "", service: "Consultation", date: "", duration: "1h", attendees: "" });
    setModalOpen(false);
  };

  const confirmBooking = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "confirmed" } : b)));
    toast.success(`Booking ${id} confirmed`);
  };

  return (
    <div>
      <PageHeader
        title="Reservation Center"
        description="Manage bookings, staff availability, and service utilization in real time."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Calendar className="h-4 w-4" /> Calendar <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>View Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Opening calendar view...")}>
                  <CalendarClock className="h-4 w-4" /> Day View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Switching to week view...")}>
                  <CalendarClock className="h-4 w-4" /> Week View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Switching to month view...")}>
                  <CalendarClock className="h-4 w-4" /> Month View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> New Booking
            </Button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Total Bookings", value: totalBookings.toLocaleString(), change: 12.4, trend: "up" as const, icon: Ticket, subtitle: "This week", color: "text-brand-500" },
          { title: "Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, change: 8.2, trend: "up" as const, icon: DollarSign, subtitle: "From 7 days", color: "text-success-500" },
          { title: "Active Staff", value: "12", change: 2, trend: "up" as const, icon: Users, subtitle: "Avg. 78% utilization", color: "text-blue-light-500" },
          { title: "Pending", value: "24", change: -4, trend: "down" as const, icon: Clock, subtitle: "Needs confirmation", color: "text-warning-500" },
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
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Bookings Volume</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Daily bookings and revenue</p>
            </div>
            <Tabs value={dateRange} onValueChange={(v) => { setDateRange(v as typeof dateRange); toast.info(`Range: ${v}`); }}>
              <TabsList>
                {dateRanges.map((r) => (
                  <TabsTrigger key={r} value={r}>{r}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingsByDay} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="bkgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#465fff" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#465fff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#12b76a" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#12b76a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="bookings" stroke="#465fff" strokeWidth={2.5} fill="url(#bkgGrad)" />
                <Area type="monotone" dataKey="revenue" stroke="#12b76a" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Service Mix</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">By booking type</p>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={serviceTypes.map((s) => ({ ...s, name: s.type }))}
                innerRadius="30%"
                outerRadius="100%"
                dataKey="pct"
              >
                <RadialBar dataKey="pct" cornerRadius={6} background>
                  {serviceTypes.map((s, i) => (
                    <Cell key={i} fill={s.color} />
                  ))}
                </RadialBar>
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1.5">
            {serviceTypes.map((s) => (
              <div key={s.type} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-gray-600 dark:text-gray-300">{s.type}</span>
                <span className="ml-auto font-semibold text-gray-800 dark:text-white/90">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff Utilization */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Staff Utilization</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Current capacity and active bookings</p>
          </div>
          <Users className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((s, i) => (
            <motion.button
              key={s.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toast.info(`${s.name}: ${s.bookings} bookings, ${s.utilization}% utilized`)}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-left transition hover:border-brand-500 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={s.avatar} />
                  <AvatarFallback className="text-xs">{s.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">{s.name}</p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">{s.role}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">{s.bookings} bookings</span>
                  <span className={`font-bold ${s.utilization > 85 ? "text-error-500" : s.utilization > 70 ? "text-warning-500" : "text-success-500"}`}>
                    {s.utilization}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.utilization}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className={`h-full rounded-full ${s.utilization > 85 ? "bg-error-500" : s.utilization > 70 ? "bg-warning-500" : "bg-success-500"}`}
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800 md:p-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Upcoming Bookings</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{filteredBookings.length} bookings match your filters</p>
          </div>
          <div className="relative w-44 sm:w-56">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bookings..." className="h-9 pl-9" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-5 dark:px-6">
          {serviceFilters.map((s) => (
            <button
              key={s}
              onClick={() => { setServiceFilter(s); toast.info(`Filtered: ${s}`); }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                serviceFilter === s
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-y border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Client</th>
                <th className="px-5 py-3 text-left font-semibold">Service</th>
                <th className="px-5 py-3 text-left font-semibold">Date</th>
                <th className="px-5 py-3 text-right font-semibold">Duration</th>
                <th className="px-5 py-3 text-right font-semibold">Attendees</th>
                <th className="px-5 py-3 text-center font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="text-sm transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={b.avatar} />
                          <AvatarFallback className="text-[10px]">{b.client[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white/90">{b.client}</p>
                          <p className="font-mono text-xs text-gray-400">{b.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{b.service}</td>
                    <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{b.date}</td>
                    <td className="px-5 py-3 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{b.duration}</td>
                    <td className="px-5 py-3 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{b.attendees}</td>
                    <td className="px-5 py-3 text-center">
                      <StatusBadge variant={b.status === "confirmed" ? "success" : b.status === "pending" ? "warning" : "error"} dot pulse={b.status === "confirmed"}>
                        {b.status}
                      </StatusBadge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>{b.id}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => confirmBooking(b.id)}
                            disabled={b.status === "confirmed"}
                          >
                            <CheckCircle2 className="h-4 w-4" /> Confirm Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Calling ${b.client}...`)}>
                            <Phone className="h-4 w-4" /> Call Client
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Email sent to ${b.client}`)}>
                            <Mail className="h-4 w-4" /> Email Client
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Starting video call with ${b.client}`)}>
                            <Video className="h-4 w-4" /> Start Video Call
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Rescheduling ${b.id}`)}>
                            <CalendarClock className="h-4 w-4" /> Reschedule
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">
                    <Ticket className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    No bookings match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Booking Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>New Booking</DialogTitle>
            <DialogDescription>Schedule a new service booking for a client.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Client Name *</Label>
              <Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="Acme Corp" className="mt-1.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Service Type</Label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  {serviceFilters.filter((s) => s !== "All").map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Duration</Label>
                <select
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  <option>30m</option>
                  <option>45m</option>
                  <option>1h</option>
                  <option>2h</option>
                  <option>3h</option>
                  <option>4h</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date & Time *</Label>
                <Input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Attendees</Label>
                <Input type="number" value={form.attendees} onChange={(e) => setForm({ ...form, attendees: e.target.value })} placeholder="5" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {[
                  { v: "onsite", label: "On-site", icon: Building },
                  { v: "virtual", label: "Virtual", icon: Video },
                ].map((m) => (
                  <button
                    key={m.v}
                    onClick={() => toast.info(`Location: ${m.label}`)}
                    className="flex items-center gap-1.5 rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-brand-500 hover:text-brand-500 dark:border-gray-700"
                  >
                    <m.icon className="h-4 w-4" /> {m.label}
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
              <Check className="h-4 w-4" /> Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
