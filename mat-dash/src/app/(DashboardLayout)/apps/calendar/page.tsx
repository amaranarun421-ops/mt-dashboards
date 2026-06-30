"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

type Evt = { id: number; title: string; date: number; color: string; time: string };

const events: Evt[] = [
  { id: 1, title: "Team Standup", date: 5, color: "primary", time: "9:00 AM" },
  { id: 2, title: "Design Review", date: 8, color: "secondary", time: "11:00 AM" },
  { id: 3, title: "Client Meeting", date: 12, color: "warning", time: "2:00 PM" },
  { id: 4, title: "Sprint Planning", date: 15, color: "success", time: "10:00 AM" },
  { id: 5, title: "Product Launch", date: 18, color: "error", time: "All day" },
  { id: 6, title: "Team Lunch", date: 22, color: "info", time: "12:30 PM" },
  { id: 7, title: "Code Review", date: 8, color: "primary", time: "4:00 PM" },
  { id: 8, title: "1:1 with Sarah", date: 12, color: "secondary", time: "5:00 PM" },
];

const monthDays = Array.from({ length: 35 }, (_, i) => i - 2); // Start from prev month
const today = 15;
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const CalendarPage = () => {
  const [monthIdx, setMonthIdx] = useState(5); // June
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const todayEvents = events.filter((e) => e.date === today);

  return (
    <PageContainer
      title="Calendar"
      description="Schedule and track events with month, week, and day views."
      actions={
        <div className="flex gap-2">
          <div className="inline-flex rounded-md bg-lightgray dark:bg-dark p-1">
            {(["month","week","day"] as const).map((v) => (
              <Button key={v} size="sm" variant={view === v ? "default" : "ghost"} className="capitalize rounded-md" onClick={() => setView(v)}>{v}</Button>
            ))}
          </div>
          <Button className="gap-1.5"><Icon icon="solar:add-circle-bold" width={16} /> New Event</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 rounded-xl bg-background p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{months[monthIdx]} 2024</h3>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => setMonthIdx((m) => Math.max(0, m - 1))}><Icon icon="solar:alt-arrow-left-linear" width={18} /></Button>
              <Button size="sm" variant="outline" onClick={() => setMonthIdx(5)}>Today</Button>
              <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => setMonthIdx((m) => Math.min(11, m + 1))}><Icon icon="solar:alt-arrow-right-linear" width={18} /></Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((d) => <div key={d} className="text-center text-xs font-semibold opacity-70 py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((d, i) => {
              const isCurrentMonth = d > 0 && d <= 30;
              const isToday = d === today;
              const dayEvents = events.filter((e) => e.date === d);
              return (
                <div
                  key={i}
                  className={`min-h-[88px] p-2 rounded-lg border ${isCurrentMonth ? "border-defaultBorder bg-background hover:bg-lightprimary/20 cursor-pointer" : "border-transparent opacity-40 bg-lightgray/30 dark:bg-dark/20"} ${isToday ? "ring-2 ring-primary border-primary" : ""}`}
                >
                  <div className={`text-xs font-medium mb-1 ${isToday ? "text-primary" : "opacity-80"}`}>{isCurrentMonth ? d : ""}</div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((e) => (
                      <div key={e.id} className={`text-[10px] px-1.5 py-0.5 rounded truncate bg-light${e.color} text-${e.color} font-medium`}>
                        {e.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && <p className="text-[10px] opacity-60">+{dayEvents.length - 2} more</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl bg-background p-6 shadow-xs">
            <h6 className="font-semibold text-sm mb-3">Today's Events</h6>
            <p className="text-xs opacity-70 mb-3">{months[monthIdx]} {today}, 2024</p>
            <div className="space-y-2">
              {todayEvents.length === 0 ? (
                <p className="text-sm opacity-60 text-center py-4">No events today</p>
              ) : todayEvents.map((e) => (
                <div key={e.id} className={`p-3 rounded-lg bg-light${e.color} text-${e.color}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{e.title}</p>
                    <Icon icon="solar:clock-circle-bold" width={14} />
                  </div>
                  <p className="text-xs opacity-80 mt-0.5">{e.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-background p-6 shadow-xs">
            <h6 className="font-semibold text-sm mb-3">Upcoming</h6>
            <div className="space-y-2">
              {events.filter((e) => e.date > today).slice(0, 4).map((e) => (
                <div key={e.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-lightgray/60 dark:hover:bg-dark/40">
                  <div className={`h-9 w-9 rounded-lg bg-light${e.color} text-${e.color} flex flex-col items-center justify-center`}>
                    <span className="text-[10px] leading-none">{months[monthIdx].slice(0,3)}</span>
                    <span className="text-sm font-bold leading-none">{e.date}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="text-xs opacity-60">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-background p-6 shadow-xs">
            <h6 className="font-semibold text-sm mb-3">Categories</h6>
            <div className="space-y-2">
              {[
                { label: "Work", color: "primary" },
                { label: "Personal", color: "secondary" },
                { label: "Family", color: "success" },
                { label: "Travel", color: "warning" },
                { label: "Health", color: "error" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full bg-${c.color}`} />
                  <span className="text-sm">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CalendarPage;
