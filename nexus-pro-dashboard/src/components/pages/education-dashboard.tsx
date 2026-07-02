"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Plus,
  Download,
  TrendingUp,
  MoreHorizontal,
  Search,
  Check,
  ArrowUp,
  Trophy,
  ArrowUpDown,
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
  PieChart,
  Pie,
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

const enrollmentTrend = [
  { month: "Jan", new: 124, total: 4820 },
  { month: "Feb", new: 142, total: 4962 },
  { month: "Mar", new: 168, total: 5130 },
  { month: "Apr", new: 156, total: 5286 },
  { month: "May", new: 184, total: 5470 },
  { month: "Jun", new: 212, total: 5682 },
];

const coursePerf = [
  { course: "CS 101", students: 284, completion: 88, avgScore: 84, category: "Computer Science" },
  { course: "Math 201", students: 192, completion: 76, avgScore: 78, category: "Mathematics" },
  { course: "Physics 110", students: 168, completion: 82, avgScore: 81, category: "Science" },
  { course: "English Lit", students: 142, completion: 91, avgScore: 88, category: "Humanities" },
  { course: "Biology 220", students: 124, completion: 79, avgScore: 80, category: "Science" },
  { course: "History 101", students: 96, completion: 85, avgScore: 82, category: "Humanities" },
];

const gradeDist = [
  { grade: "A", count: 1842, color: "#12b76a" },
  { grade: "B", count: 1648, color: "#465fff" },
  { grade: "C", count: 1240, color: "#0ba5ec" },
  { grade: "D", count: 480, color: "#f79009" },
  { grade: "F", count: 142, color: "#f04438" },
];

const topStudents = [
  { name: "Emma Wilson", grade: "A+", score: 98.4, course: "CS 101", avatar: "https://i.pravatar.cc/40?img=20" },
  { name: "Liam Chen", grade: "A+", score: 97.8, course: "Math 201", avatar: "https://i.pravatar.cc/40?img=21" },
  { name: "Olivia Park", grade: "A", score: 95.2, course: "Physics 110", avatar: "https://i.pravatar.cc/40?img=22" },
  { name: "Noah Kim", grade: "A", score: 94.6, course: "Biology 220", avatar: "https://i.pravatar.cc/40?img=23" },
  { name: "Ava Martinez", grade: "A", score: 93.8, course: "English Lit", avatar: "https://i.pravatar.cc/40?img=24" },
  { name: "Ethan Lee", grade: "A-", score: 92.1, course: "History 101", avatar: "https://i.pravatar.cc/40?img=25" },
];

const assignments = [
  { title: "Final Project Submission", course: "CS 101", due: "Jul 5", submitted: 248, total: 284, status: "active" as const },
  { title: "Lab Report — Circuits", course: "Physics 110", due: "Jul 4", submitted: 142, total: 168, status: "active" as const },
  { title: "Essay — Modernism", course: "English Lit", due: "Jul 8", submitted: 134, total: 142, status: "active" as const },
  { title: "Problem Set 8", course: "Math 201", due: "Jul 3", submitted: 192, total: 192, status: "closed" as const },
];

const categories = ["All", "Computer Science", "Mathematics", "Science", "Humanities"];
const gradeFilters = ["All", "A", "B", "C", "D", "F"] as const;
type SortKey = "score-desc" | "score-asc" | "name";

export function EducationDashboard() {
  const [categoryFilter, setCategoryFilter] = React.useState<string>("All");
  const [gradeFilter, setGradeFilter] = React.useState<(typeof gradeFilters)[number]>("All");
  const [sortKey, setSortKey] = React.useState<SortKey>("score-desc");
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", category: "Computer Science", instructor: "", capacity: "" });

  const filteredCourses = coursePerf.filter((c) => {
    if (categoryFilter !== "All" && c.category !== categoryFilter) return false;
    if (search && !c.course.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sortedStudents = [...topStudents].sort((a, b) => {
    if (sortKey === "score-desc") return b.score - a.score;
    if (sortKey === "score-asc") return a.score - b.score;
    return a.name.localeCompare(b.name);
  });

  const handleCreate = () => {
    if (!form.name.trim()) {
      toast.error("Course name is required");
      return;
    }
    toast.success(`Course "${form.name}" added to ${form.category}`);
    setForm({ name: "", category: "Computer Science", instructor: "", capacity: "" });
    setModalOpen(false);
  };

  const cycleSort = () => {
    const next: Record<SortKey, SortKey> = {
      "score-desc": "score-asc",
      "score-asc": "name",
      name: "score-desc",
    };
    setSortKey(next[sortKey]);
    toast.info(`Sorted by ${next[sortKey].replace("-", " ")}`);
  };

  return (
    <div>
      <PageHeader
        title="Learning Analytics"
        description="Enrollment trends, course performance, and student outcomes across the institution."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" /> Export <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Reports</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Generating transcript...")}>Transcripts</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Generating grade report...")}>Grade Report</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting attendance...")}>Attendance CSV</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> Add Course
            </Button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Total Students", value: "5,682", change: 6.4, trend: "up" as const, icon: Users, subtitle: "Across all programs", color: "text-brand-500" },
          { title: "Active Courses", value: "248", change: 4, trend: "up" as const, icon: BookOpen, subtitle: "This semester", color: "text-blue-light-500" },
          { title: "Completion Rate", value: "84.2%", change: 2.8, trend: "up" as const, icon: GraduationCap, subtitle: "Above 80% target", color: "text-success-500" },
          { title: "Avg. Score", value: "82.4", change: -1.2, trend: "down" as const, icon: Award, subtitle: "Slight dip this term", color: "text-warning-500" },
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

      {/* Charts Row */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Enrollment Trend</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">New enrollments and total student count</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentTrend} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#465fff" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#465fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#465fff" strokeWidth={2.5} fill="url(#enrollGrad)" />
                <Area type="monotone" dataKey="new" stroke="#0ba5ec" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Grade Distribution</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">All courses combined</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDist}
                  dataKey="count"
                  nameKey="grade"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {gradeDist.map((g, i) => (
                    <Cell key={i} fill={g.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1">
            {gradeDist.map((g) => (
              <div key={g.grade} className="text-center">
                <span className="block h-2 w-full rounded-full" style={{ background: g.color }} />
                <span className="mt-1 block text-xs font-medium text-gray-600 dark:text-gray-300">{g.grade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Performance + Top Students */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800 md:p-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Course Performance</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Completion and average scores</p>
            </div>
            <div className="relative w-44 sm:w-56">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." className="h-9 pl-9" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 p-5 dark:px-6">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => { setCategoryFilter(c); toast.info(`Filtered: ${c}`); }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  categoryFilter === c
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="px-5 pb-5 dark:px-6">
            {filteredCourses.length > 0 ? (
              <ResponsiveContainer width="100%" height={Math.max(filteredCourses.length * 60, 200)}>
                <BarChart data={filteredCourses} layout="vertical" margin={{ left: 20, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="course" type="category" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip cursor={{ fill: "#f2f4f7" }} />
                  <Bar dataKey="completion" fill="#465fff" radius={[0, 4, 4, 0]} maxBarSize={18} />
                  <Bar dataKey="avgScore" fill="#0ba5ec" radius={[0, 4, 4, 0]} maxBarSize={18} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="p-12 text-center text-sm text-gray-400">
                <BookOpen className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                No courses match your filters
              </div>
            )}
          </div>
        </div>

        {/* Top Students Leaderboard */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Top Students</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leaderboard · {sortedStudents.length} students</p>
            </div>
            <button
              onClick={cycleSort}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition hover:border-brand-500 hover:text-brand-500 dark:border-gray-700 dark:text-gray-300"
            >
              <ArrowUpDown className="h-3.5 w-3.5" /> Sort
            </button>
          </div>
          <Tabs value={gradeFilter} onValueChange={(v) => { setGradeFilter(v as typeof gradeFilter); toast.info(`Grade filter: ${v}`); }}>
            <TabsList className="mb-4 flex-wrap">
              {gradeFilters.map((g) => (
                <TabsTrigger key={g} value={g}>{g}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={gradeFilter} className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
              {sortedStudents
                .filter((s) => gradeFilter === "All" || s.grade.startsWith(gradeFilter))
                .map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => toast.info(`${s.name}: ${s.score} in ${s.course}`)}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-brand-500 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
                  >
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      i === 0 ? "bg-warning-50 text-warning-600 dark:bg-warning-500/15" : i === 1 ? "bg-gray-100 text-gray-600 dark:bg-gray-800" : i === 2 ? "bg-orange-50 text-orange-600 dark:bg-orange-500/15" : "bg-gray-50 text-gray-400 dark:bg-gray-900"
                    }`}>
                      {i + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={s.avatar} />
                      <AvatarFallback className="text-[10px]">{s.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">{s.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{s.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-800 dark:text-white/90">{s.score}</p>
                      <StatusBadge variant={s.grade.startsWith("A") ? "success" : "warning"} size="sm">{s.grade}</StatusBadge>
                    </div>
                  </motion.div>
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="border-b border-gray-100 p-5 dark:border-gray-800 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Active Assignments</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Submission progress by course</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-y border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Assignment</th>
                <th className="px-5 py-3 text-left font-semibold">Course</th>
                <th className="px-5 py-3 text-left font-semibold">Due</th>
                <th className="px-5 py-3 text-left font-semibold">Progress</th>
                <th className="px-5 py-3 text-right font-semibold">Submitted</th>
                <th className="px-5 py-3 text-center font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {assignments.map((a, i) => {
                const pct = Math.round((a.submitted / a.total) * 100);
                return (
                  <motion.tr
                    key={a.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="text-sm transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3 font-semibold text-gray-800 dark:text-white/90">{a.title}</td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{a.course}</td>
                    <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{a.due}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <div className={`h-full rounded-full ${pct === 100 ? "bg-success-500" : "bg-brand-500"}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{a.submitted}/{a.total}</td>
                    <td className="px-5 py-3 text-center">
                      <StatusBadge variant={a.status === "active" ? "info" : "neutral"}>{a.status}</StatusBadge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem onClick={() => toast.success(`Reminding ${a.total - a.submitted} students...`)}>
                            <TrendingUp className="h-4 w-4" /> Remind Students
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Extending deadline for "${a.title}"`)}>
                            <ArrowUp className="h-4 w-4" /> Extend Deadline
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Downloading submissions for "${a.title}"`)}>
                            <Download className="h-4 w-4" /> Download Submissions
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Course Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>Create a new course offering.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Course Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. CS 102 — Data Structures" className="mt-1.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Capacity</Label>
                <Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} placeholder="100" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Instructor</Label>
              <Input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} placeholder="Prof. Smith" className="mt-1.5" />
            </div>
            <div>
              <Label>Difficulty</Label>
              <div className="mt-1.5 flex gap-2">
                {["Beginner", "Intermediate", "Advanced"].map((d) => (
                  <button
                    key={d}
                    onClick={() => toast.info(`Difficulty: ${d}`)}
                    className="flex-1 rounded-lg border-2 border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-brand-500 hover:text-brand-500 dark:border-gray-700"
                  >
                    {d}
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
              <Check className="h-4 w-4" /> Create Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
