"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Activity,
  Stethoscope,
  Calendar,
  UserPlus,
  BedDouble,
  Pill,
  MoreHorizontal,
  Search,
  Check,
  Phone,
  FileText,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  Cell,
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

type ApptStatus = "waiting" | "checked-in" | "in-room" | "completed";

interface Appointment {
  id: string;
  patient: string;
  age: number;
  doctor: string;
  dept: string;
  time: string;
  status: ApptStatus;
  avatar: string;
}

const vitalsTrend = [
  { hour: "6AM", heart: 72, bp: 118 },
  { hour: "9AM", heart: 78, bp: 122 },
  { hour: "12PM", heart: 82, bp: 128 },
  { hour: "3PM", heart: 76, bp: 120 },
  { hour: "6PM", heart: 74, bp: 116 },
  { hour: "9PM", heart: 68, bp: 112 },
];

const wardData: Record<string, Array<{ bed: string; patient: string; status: string; days: number }>> = {
  ICU: [
    { bed: "ICU-01", patient: "E. Wilson", status: "Critical", days: 4 },
    { bed: "ICU-02", patient: "J. Brown", status: "Stable", days: 2 },
    { bed: "ICU-03", patient: "M. Davis", status: "Critical", days: 6 },
    { bed: "ICU-04", patient: "—", status: "Available", days: 0 },
  ],
  General: [
    { bed: "G-101", patient: "S. Lee", status: "Recovering", days: 3 },
    { bed: "G-102", patient: "R. Patel", status: "Recovering", days: 5 },
    { bed: "G-103", patient: "—", status: "Available", days: 0 },
    { bed: "G-104", patient: "K. Wang", status: "Observation", days: 1 },
  ],
  Pediatric: [
    { bed: "P-201", patient: "T. Kim (8)", status: "Recovering", days: 2 },
    { bed: "P-202", patient: "—", status: "Available", days: 0 },
    { bed: "P-203", patient: "L. Garcia (5)", status: "Observation", days: 1 },
    { bed: "P-204", patient: "J. Singh (12)", status: "Recovering", days: 4 },
  ],
  Maternity: [
    { bed: "M-301", patient: "A. Chen", status: "Postnatal", days: 2 },
    { bed: "M-302", patient: "B. Kumar", status: "Postnatal", days: 1 },
    { bed: "M-303", patient: "—", status: "Available", days: 0 },
    { bed: "M-304", patient: "C. Tan", status: "Labor", days: 0 },
  ],
};

const occupancyData = [
  { ward: "ICU", total: 24, occupied: 21, fill: "#f04438" },
  { ward: "General", total: 120, occupied: 84, fill: "#465fff" },
  { ward: "Pediatric", total: 40, occupied: 22, fill: "#0ba5ec" },
  { ward: "Maternity", total: 32, occupied: 28, fill: "#f79009" },
];

const departments = [
  { name: "Cardiology", patients: 124, doctors: 8, color: "bg-brand-500" },
  { name: "Neurology", patients: 86, doctors: 6, color: "bg-blue-light-500" },
  { name: "Orthopedics", patients: 92, doctors: 5, color: "bg-warning-500" },
  { name: "Pediatrics", patients: 148, doctors: 12, color: "bg-success-500" },
  { name: "Emergency", patients: 64, doctors: 14, color: "bg-error-500" },
  { name: "Oncology", patients: 42, doctors: 4, color: "bg-gray-500" },
];

const medications = [
  { name: "Amoxicillin 500mg", stock: 1240, status: "in-stock" as const, reorder: 200 },
  { name: "Lisinopril 10mg", stock: 84, status: "low" as const, reorder: 100 },
  { name: "Metformin 850mg", stock: 620, status: "in-stock" as const, reorder: 150 },
  { name: "Atorvastatin 20mg", stock: 12, status: "critical" as const, reorder: 100 },
  { name: "Omeprazole 20mg", stock: 480, status: "in-stock" as const, reorder: 100 },
];

const initialAppointments: Appointment[] = [
  { id: "APT-001", patient: "Emma Wilson", age: 34, doctor: "Dr. Chen", dept: "Cardiology", time: "09:00", status: "checked-in", avatar: "https://i.pravatar.cc/40?img=20" },
  { id: "APT-002", patient: "James Lee", age: 58, doctor: "Dr. Park", dept: "Neurology", time: "09:30", status: "waiting", avatar: "https://i.pravatar.cc/40?img=21" },
  { id: "APT-003", patient: "Sofia Rodriguez", age: 28, doctor: "Dr. Kim", dept: "General", time: "10:00", status: "in-room", avatar: "https://i.pravatar.cc/40?img=22" },
  { id: "APT-004", patient: "Michael Brown", age: 72, doctor: "Dr. Chen", dept: "Cardiology", time: "10:30", status: "completed", avatar: "https://i.pravatar.cc/40?img=23" },
  { id: "APT-005", patient: "Olivia Martinez", age: 45, doctor: "Dr. Wang", dept: "Orthopedics", time: "11:00", status: "completed", avatar: "https://i.pravatar.cc/40?img=24" },
  { id: "APT-006", patient: "Daniel Kim", age: 19, doctor: "Dr. Park", dept: "Neurology", time: "11:30", status: "waiting", avatar: "https://i.pravatar.cc/40?img=25" },
  { id: "APT-007", patient: "Sarah Connor", age: 51, doctor: "Dr. Kim", dept: "General", time: "13:00", status: "checked-in", avatar: "https://i.pravatar.cc/40?img=26" },
];

const statusFilters: Array<"all" | ApptStatus> = ["all", "waiting", "checked-in", "in-room", "completed"];

const statusVariant: Record<ApptStatus, "warning" | "info" | "primary" | "success"> = {
  waiting: "warning",
  "checked-in": "info",
  "in-room": "primary",
  completed: "success",
};

export function HealthcareDashboard() {
  const [appointments, setAppointments] = React.useState<Appointment[]>(initialAppointments);
  const [statusFilter, setStatusFilter] = React.useState<"all" | ApptStatus>("all");
  const [wardTab, setWardTab] = React.useState<"ICU" | "General" | "Pediatric" | "Maternity">("ICU");
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({ patient: "", age: "", doctor: "Dr. Chen", dept: "Cardiology", time: "" });

  const filteredAppts = appointments.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (search && !a.patient.toLowerCase().includes(search.toLowerCase()) && !a.doctor.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: appointments.length,
    waiting: appointments.filter((a) => a.status === "waiting").length,
    "checked-in": appointments.filter((a) => a.status === "checked-in").length,
    "in-room": appointments.filter((a) => a.status === "in-room").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  const handleCreate = () => {
    if (!form.patient.trim() || !form.time) {
      toast.error("Patient name and time are required");
      return;
    }
    const newAppt: Appointment = {
      id: `APT-${String(appointments.length + 1).padStart(3, "0")}`,
      patient: form.patient,
      age: Number(form.age) || 0,
      doctor: form.doctor,
      dept: form.dept,
      time: form.time,
      status: "waiting",
      avatar: `https://i.pravatar.cc/40?u=${form.patient}`,
    };
    setAppointments([newAppt, ...appointments]);
    toast.success(`Appointment booked for ${form.patient}`);
    setForm({ patient: "", age: "", doctor: "Dr. Chen", dept: "Cardiology", time: "" });
    setModalOpen(false);
  };

  const advanceAppt = (id: string) => {
    const order: ApptStatus[] = ["waiting", "checked-in", "in-room", "completed"];
    setAppointments((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const next = order[Math.min(order.indexOf(a.status) + 1, order.length - 1)];
        toast.success(`${a.patient} moved to ${next}`);
        return { ...a, status: next };
      })
    );
  };

  return (
    <div>
      <PageHeader
        title="Hospital Operations"
        description="Monitor patient flow, bed occupancy, and clinical resource utilization."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <FileText className="h-4 w-4" /> Reports <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Clinical Reports</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Generating daily census...")}>Daily Census</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Generating ward report...")}>Ward Report</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Generating medication list...")}>Medication Audit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
              <UserPlus className="h-4 w-4" /> New Appointment
            </Button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Active Patients", value: "486", change: 4.2, trend: "up" as const, icon: HeartPulse, subtitle: "Across 6 departments", color: "text-brand-500" },
          { title: "Bed Occupancy", value: "87.4%", change: 2.1, trend: "up" as const, icon: BedDouble, subtitle: "156 / 178 beds", color: "text-blue-light-500" },
          { title: "Doctors On-duty", value: "42", change: 1, trend: "up" as const, icon: Stethoscope, subtitle: "Including 8 specialists", color: "text-success-500" },
          { title: "Avg Wait Time", value: "18m", change: -3, trend: "down" as const, icon: Activity, subtitle: "Below 25m target", color: "text-warning-500" },
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

      {/* Charts */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Vitals Trend</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Average heart rate and blood pressure</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalsTrend} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f04438" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#f04438" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="heart" stroke="#f04438" strokeWidth={2.5} fill="url(#heartGrad)" />
                <Area type="monotone" dataKey="bp" stroke="#465fff" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Ward Occupancy</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">By ward type</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={occupancyData.map((o) => ({ ...o, pct: Math.round((o.occupied / o.total) * 100) }))}
                innerRadius="30%"
                outerRadius="100%"
              >
                <RadialBar dataKey="pct" cornerRadius={6} background />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {occupancyData.map((o) => (
              <div key={o.ward} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: o.fill }} />
                <span className="text-gray-600 dark:text-gray-300">{o.ward}</span>
                <span className="ml-auto font-semibold text-gray-800 dark:text-white/90">
                  {Math.round((o.occupied / o.total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Department Overview</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Patient and staff distribution</p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {departments.map((d, i) => (
            <motion.button
              key={d.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => toast.info(`${d.name}: ${d.patients} patients, ${d.doctors} doctors`)}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-left transition hover:border-brand-500 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.02]"
            >
              <div className={`mb-3 h-1.5 w-10 rounded-full ${d.color}`} />
              <p className="text-sm font-semibold text-gray-800 dark:text-white/90">{d.name}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{d.patients} patients</p>
              <p className="text-xs text-gray-400">{d.doctors} doctors</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Ward Tabs + Medications */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Ward Beds</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Live bed status by ward</p>
          <Tabs
            value={wardTab}
            onValueChange={(v) => { setWardTab(v as "ICU" | "General" | "Pediatric" | "Maternity"); toast.info(`Switched to ${v} ward`); }}
            className="mt-4"
          >
            <TabsList>
              <TabsTrigger value="ICU">ICU</TabsTrigger>
              <TabsTrigger value="General">General</TabsTrigger>
              <TabsTrigger value="Pediatric">Pediatric</TabsTrigger>
              <TabsTrigger value="Maternity">Maternity</TabsTrigger>
            </TabsList>
            {(["ICU", "General", "Pediatric", "Maternity"] as const).map((w) => (
              <TabsContent key={w} value={w} className="mt-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {wardData[w].map((b, i) => (
                    <motion.div
                      key={b.bed}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`rounded-xl border p-4 transition ${
                        b.status === "Available"
                          ? "border-dashed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-white/[0.02]"
                          : "border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-brand-500">{b.bed}</span>
                        <StatusBadge
                          variant={
                            b.status === "Critical" ? "error" : b.status === "Available" ? "neutral" : b.status === "Labor" || b.status === "Observation" ? "warning" : "success"
                          }
                        >
                          {b.status}
                        </StatusBadge>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white/90">{b.patient}</p>
                      {b.days > 0 && <p className="text-xs text-gray-400">{b.days} day{b.days > 1 ? "s" : ""} admitted</p>}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Medication Stock</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Inventory alerts</p>
            </div>
            <Pill className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {medications.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">{m.name}</p>
                  <p className="text-xs text-gray-400">Stock: {m.stock} · Reorder at {m.reorder}</p>
                </div>
                <StatusBadge variant={m.status === "in-stock" ? "success" : m.status === "low" ? "warning" : "error"}>
                  {m.status}
                </StatusBadge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800 md:p-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Today&apos;s Appointments</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Patient flow and status</p>
          </div>
          <div className="relative w-44 sm:w-56">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patients..." className="h-9 pl-9" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-5 dark:px-6">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); toast.info(`Filtered: ${s === "all" ? "All appointments" : s}`); }}
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
                <th className="px-5 py-3 text-left font-semibold">Patient</th>
                <th className="px-5 py-3 text-left font-semibold">Department</th>
                <th className="px-5 py-3 text-left font-semibold">Doctor</th>
                <th className="px-5 py-3 text-right font-semibold">Time</th>
                <th className="px-5 py-3 text-center font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredAppts.length > 0 ? (
                filteredAppts.map((a, i) => (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="text-sm transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={a.avatar} />
                          <AvatarFallback className="text-[10px]">{a.patient[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white/90">{a.patient}</p>
                          <p className="text-xs text-gray-400">Age {a.age}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{a.dept}</td>
                    <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{a.doctor}</td>
                    <td className="px-5 py-3 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{a.time}</td>
                    <td className="px-5 py-3 text-center">
                      <StatusBadge variant={statusVariant[a.status]} dot pulse={a.status === "in-room"}>
                        {a.status.replace("-", " ")}
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
                          <DropdownMenuLabel>{a.id}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Calling ${a.patient}...`)}>
                            <Phone className="h-4 w-4" /> Call Patient
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Opening chart for ${a.patient}`)}>
                            <FileText className="h-4 w-4" /> View Chart
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => advanceAppt(a.id)}
                            disabled={a.status === "completed"}
                          >
                            <CheckCircle2 className="h-4 w-4" /> Advance Status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                    <Calendar className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    No appointments match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Appointment Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>New Appointment</DialogTitle>
            <DialogDescription>Schedule a new patient appointment.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Patient Name *</Label>
                <Input value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} placeholder="Full name" className="mt-1.5" />
              </div>
              <div>
                <Label>Age</Label>
                <Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="34" className="mt-1.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Department</Label>
                <select
                  value={form.dept}
                  onChange={(e) => setForm({ ...form, dept: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  {departments.map((d) => (
                    <option key={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Doctor</Label>
                <select
                  value={form.doctor}
                  onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  <option>Dr. Chen</option>
                  <option>Dr. Park</option>
                  <option>Dr. Kim</option>
                  <option>Dr. Wang</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Appointment Time *</Label>
              <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Priority</Label>
              <div className="mt-1.5 flex gap-2">
                {["Routine", "Urgent", "Follow-up"].map((p) => (
                  <button
                    key={p}
                    onClick={() => toast.info(`Priority: ${p}`)}
                    className="flex-1 rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-brand-500 hover:text-brand-500 dark:border-gray-700"
                  >
                    {p}
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
              <Check className="h-4 w-4" /> Book Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
