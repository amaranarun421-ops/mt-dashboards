"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalIcon, Clock, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const events = [
  { day: 3, title: "Team Standup", time: "09:00", color: "bg-brand-500", attendees: 8 },
  { day: 3, title: "Design Review", time: "11:00", color: "bg-blue-light-500", attendees: 4 },
  { day: 5, title: "Client Demo", time: "14:00", color: "bg-warning-500", attendees: 12 },
  { day: 8, title: "Sprint Planning", time: "10:00", color: "bg-success-500", attendees: 6 },
  { day: 10, title: "1:1 with Sarah", time: "15:30", color: "bg-brand-500", attendees: 2 },
  { day: 12, title: "Product Launch", time: "13:00", color: "bg-error-500", attendees: 24 },
  { day: 15, title: "Workshop", time: "09:30", color: "bg-blue-light-500", attendees: 18 },
  { day: 18, title: "Board Meeting", time: "11:00", color: "bg-warning-500", attendees: 9 },
  { day: 22, title: "All-Hands", time: "16:00", color: "bg-brand-500", attendees: 142 },
  { day: 25, title: "Q3 Review", time: "10:00", color: "bg-success-500", attendees: 8 },
];

const upcoming = [
  { title: "Team Standup", time: "In 12 minutes", location: "Zoom", attendees: ["https://i.pravatar.cc/24?img=1", "https://i.pravatar.cc/24?img=2", "https://i.pravatar.cc/24?img=3"], color: "bg-brand-500" },
  { title: "Design Review", time: "In 2 hours", location: "Room 4B", attendees: ["https://i.pravatar.cc/24?img=4", "https://i.pravatar.cc/24?img=5"], color: "bg-blue-light-500" },
  { title: "Client Demo", time: "In 5 hours", location: "HQ Auditorium", attendees: ["https://i.pravatar.cc/24?img=6", "https://i.pravatar.cc/24?img=7", "https://i.pravatar.cc/24?img=8"], color: "bg-warning-500" },
];

const monthDays = Array.from({ length: 35 }, (_, i) => i - 2); // start from Jun 30

export function CalendarPage() {
  const today = 3;
  return (
    <div>
      <PageHeader
        breadcrumb={["Apps", "Calendar"]}
        title="Calendar"
        description="Schedule meetings, track events, and coordinate with your team."
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Event</Button>}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <Card className="xl:col-span-3 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">July 2026</h2>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">Month</Button>
              <Button variant="ghost" size="sm" className="text-xs">Week</Button>
              <Button variant="ghost" size="sm" className="text-xs">Day</Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((d, i) => {
              const dayEvents = events.filter((e) => e.day === d);
              const isToday = d === today;
              const isCurrentMonth = d >= 1 && d <= 31;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.005 }}
                  className={`group relative min-h-[88px] rounded-lg border p-1.5 transition hover:border-brand-500/40 hover:bg-gray-100 dark:bg-gray-800/30 ${
                    isToday ? "border-brand-500 bg-brand-500/5" : "border-border"
                  } ${!isCurrentMonth && "opacity-40"}`}
                >
                  <div className={`mb-1 text-xs font-semibold ${isToday ? "flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white" : "text-gray-500 dark:text-gray-400"}`}>
                    {d > 0 ? d : ""}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map((e, idx) => (
                      <div key={idx} className={`truncate rounded px-1 py-0.5 text-[10px] font-medium text-white ${e.color}`}>
                        {e.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">+{dayEvents.length - 2} more</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="mb-3 text-base font-semibold">Up Next</h3>
            <div className="space-y-3">
              {upcoming.map((e, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="rounded-lg border border-border p-3 transition hover:bg-gray-100 dark:bg-gray-800/30">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${e.color}`} />
                    <p className="text-sm font-semibold">{e.title}</p>
                  </div>
                  <div className="mt-1.5 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <p className="flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</p>
                    <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {e.attendees.map((a, idx) => (
                        <Avatar key={idx} className="h-5 w-5 border border-background"><AvatarImage src={a} /><AvatarFallback className="text-[8px]">U</AvatarFallback></Avatar>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">Join</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="mb-3 text-base font-semibold">My Calendars</h3>
            <div className="space-y-2">
              {[
                { name: "Personal", color: "bg-brand-500", count: 12 },
                { name: "Work", color: "bg-blue-light-500", count: 28 },
                { name: "Family", color: "bg-warning-500", count: 8 },
                { name: "Holidays", color: "bg-success-500", count: 4 },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <div className={`h-3 w-3 rounded ${c.color}`} />
                  <span className="font-medium">{c.name}</span>
                  <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{c.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
