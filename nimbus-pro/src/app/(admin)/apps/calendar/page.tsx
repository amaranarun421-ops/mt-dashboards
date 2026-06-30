"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, IconButton } from "@/components/ui";
import { CALENDAR_EVENTS } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  ChevronLeft, ChevronRight, Plus, LayoutGrid, Clock,
  Video, MoreHorizontal, Filter, Search, Bell
} from "lucide-react";

const TONE_BG: Record<string, string> = {
  brand: "bg-brand-500",
  purple: "bg-purple-500",
  warning: "bg-warning-500",
  success: "bg-success-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500",
};
const TONE_SOFT_BG: Record<string, string> = {
  brand: "bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:border-brand-700",
  purple: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-700",
  warning: "bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-500/15 dark:text-warning-300 dark:border-warning-700",
  success: "bg-success-50 text-success-700 border-success-200 dark:bg-success-500/15 dark:text-success-300 dark:border-success-700",
  pink: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/15 dark:text-pink-300 dark:border-pink-700",
  orange: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-700",
};
const TONE_DOT: Record<string, string> = {
  brand: "bg-brand-500",
  purple: "bg-purple-500",
  warning: "bg-warning-500",
  success: "bg-success-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CATEGORIES = [
  { id: "meetings", label: "Meetings", tone: "brand" },
  { id: "design", label: "Design", tone: "purple" },
  { id: "review", label: "Reviews", tone: "warning" },
  { id: "personal", label: "Personal", tone: "success" },
  { id: "events", label: "Events", tone: "pink" },
  { id: "releases", label: "Releases", tone: "orange" },
];

export default function CalendarPage() {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [view, setView] = useState<"Month" | "Week" | "Day">("Month");
  const [activeCats, setActiveCats] = useState<string[]>(CATEGORIES.map((c) => c.id));

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Build 6-row grid (42 cells)
  const cells: { day: number; month: "prev" | "curr" | "next"; date: number }[] = [];
  for (let i = 0; i < 42; i++) {
    if (i < firstDay) {
      cells.push({ day: daysInPrevMonth - firstDay + i + 1, month: "prev", date: -1 });
    } else if (i < firstDay + daysInMonth) {
      const d = i - firstDay + 1;
      cells.push({ day: d, month: "curr", date: d });
    } else {
      cells.push({ day: i - firstDay - daysInMonth + 1, month: "next", date: -1 });
    }
  }

  // Place events on relative days of the current month (1-31)
  const eventsByDay: Record<number, typeof CALENDAR_EVENTS> = {};
  CALENDAR_EVENTS.forEach((e, idx) => {
    const day = ((idx + 1) * 4) % daysInMonth + 1; // spread across month
    if (!eventsByDay[day]) eventsByDay[day] = [];
    eventsByDay[day].push(e);
  });

  const isToday = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const upcoming = CALENDAR_EVENTS.slice(0, 5);

  const toggleCat = (id: string) =>
    setActiveCats((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  return (
    <div className="space-y-4">
      <PageHeader
        title="Calendar"
        description="Plan your month, schedule meetings, and never miss an event."
        breadcrumbs={[{ label: "Apps" }, { label: "Calendar" }]}
        actions={
          <>
            <Button variant="secondary"><Bell className="h-4 w-4" /> Reminders</Button>
            <Button><Plus className="h-4 w-4" /> New Event</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Mini calendar */}
          <Card className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{MONTHS[month]} {year}</p>
              <div className="flex items-center gap-1">
                <IconButton aria-label="Previous" className="h-7 w-7" onClick={() => setCurrent(new Date(year, month - 1, 1))}>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton aria-label="Next" className="h-7 w-7" onClick={() => setCurrent(new Date(year, month + 1, 1))}>
                  <ChevronRight className="h-3.5 w-3.5" />
                </IconButton>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i} className="text-[10px] font-bold uppercase text-gray-400">{d}</span>
              ))}
              {cells.slice(0, 35).map((c, i) => (
                <button
                  key={i}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-md text-[11px] font-medium transition-colors",
                    c.month !== "curr" && "text-gray-300 dark:text-gray-600",
                    c.month === "curr" && "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                    c.month === "curr" && isToday(c.day) && "bg-brand-500 text-white hover:bg-brand-600"
                  )}
                >
                  {c.day}
                </button>
              ))}
            </div>
          </Card>

          {/* Categories */}
          <Card className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Categories</p>
              <Filter className="h-3.5 w-3.5 text-gray-400" />
            </div>
            <div className="space-y-1.5">
              {CATEGORIES.map((c) => (
                <label key={c.id} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <button
                    onClick={() => toggleCat(c.id)}
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded border-2 transition-colors",
                      activeCats.includes(c.id) ? cn(TONE_BG[c.tone], "border-transparent") : "border-gray-300 dark:border-gray-600"
                    )}
                  >
                    {activeCats.includes(c.id) && <Check className="h-2.5 w-2.5 text-white" />}
                  </button>
                  <span className={cn("h-2 w-2 rounded-full", TONE_DOT[c.tone])} />
                  <span className="flex-1 text-xs font-medium text-gray-700 dark:text-gray-300">{c.label}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Upcoming */}
          <Card>
            <CardHeader title="Upcoming" description="Next 5 events" action={<button className="text-xs font-semibold text-brand-600 dark:text-brand-400">View all</button>} />
            <CardBody className="space-y-3">
              {upcoming.map((e) => (
                <div key={e.id} className="flex items-start gap-3">
                  <div className={cn("mt-0.5 h-9 w-1 shrink-0 rounded-full", TONE_BG[e.tone])} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">{e.title}</p>
                    <p className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" /> {e.start} – {e.end}
                    </p>
                    <p className="text-[11px] text-gray-400">{new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </aside>

        {/* Main calendar */}
        <Card className="p-0">
          {/* Calendar toolbar */}
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{MONTHS[month]} <span className="text-gray-400">{year}</span></h2>
              <Button variant="secondary" size="sm" onClick={() => setCurrent(new Date(today.getFullYear(), today.getMonth(), 1))}>Today</Button>
              <div className="flex items-center gap-0.5">
                <IconButton aria-label="Previous" onClick={() => setCurrent(new Date(year, month - 1, 1))}><ChevronLeft className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Next" onClick={() => setCurrent(new Date(year, month + 1, 1))}><ChevronRight className="h-4 w-4" /></IconButton>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
                {(["Month", "Week", "Day"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                      view === v ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <IconButton aria-label="Search"><Search className="h-4 w-4" /></IconButton>
              <IconButton aria-label="Layout"><LayoutGrid className="h-4 w-4" /></IconButton>
            </div>
          </div>

          {/* Weekday header */}
          <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800">
            {WEEKDAYS.map((d) => (
              <div key={d} className="px-2 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-gray-400">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 grid-rows-6">
            {cells.map((c, i) => {
              const dayEvents = c.month === "curr" && eventsByDay[c.day] ? eventsByDay[c.day] : [];
              const visibleEvents = dayEvents.filter((e) => activeCats.includes(CATEGORIES.find((cat) => cat.tone === e.tone)?.id ?? ""));
              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-[108px] border-b border-r border-gray-50 p-1.5 dark:border-gray-800/50",
                    c.month !== "curr" && "bg-gray-50/50 dark:bg-gray-900/30",
                    (i + 1) % 7 === 0 && "border-r-0"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold",
                        c.month !== "curr" && "text-gray-300 dark:text-gray-600",
                        c.month === "curr" && "text-gray-700 dark:text-gray-300",
                        c.month === "curr" && isToday(c.day) && "bg-brand-500 text-white"
                      )}
                    >
                      {c.day}
                    </span>
                    {c.month === "curr" && (
                      <button className="opacity-0 transition-opacity hover:opacity-100">
                        <Plus className="h-3 w-3 text-gray-400" />
                      </button>
                    )}
                  </div>
                  <div className="mt-1 space-y-1">
                    {visibleEvents.slice(0, 2).map((e) => (
                      <div
                        key={e.id}
                        className={cn("truncate rounded border px-1.5 py-0.5 text-[10px] font-semibold", TONE_SOFT_BG[e.tone])}
                        title={`${e.title} · ${e.start}–${e.end}`}
                      >
                        {e.start} {e.title}
                      </div>
                    ))}
                    {visibleEvents.length > 2 && (
                      <p className="px-1 text-[10px] font-medium text-gray-400">+{visibleEvents.length - 2} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Today's schedule strip */}
      <Card>
        <CardHeader title="Today's schedule" description={`${today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · 4 events`} action={<Button variant="ghost" size="sm"><Plus className="h-3.5 w-3.5" /> Add event</Button>} />
        <CardBody className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {CALENDAR_EVENTS.slice(0, 4).map((e) => (
            <div key={e.id} className="rounded-xl border border-gray-100 p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50">
              <div className="flex items-start justify-between">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", TONE_SOFT_BG[e.tone])}>
                  <Clock className="h-4 w-4" />
                </div>
                <IconButton aria-label="More" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></IconButton>
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{e.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{e.start} – {e.end}</p>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-400">
                <Video className="h-3 w-3" /> Google Meet
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
