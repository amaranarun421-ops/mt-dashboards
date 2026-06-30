"use client";

import * as React from "react";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Video, Calendar as CalIcon,
  Search, Filter, MoreVertical, Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, StatCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Event = {
  id: number; title: string; date: number; time: string; duration: string;
  type: "meeting" | "focus" | "personal" | "deadline" | "social"; location?: string;
  attendees?: string[]; color: string;
};

const typeColors: Record<Event["type"], string> = {
  meeting: "bg-violet-500/15 text-violet-600 border-violet-500/30",
  focus: "bg-sky-500/15 text-sky-600 border-sky-500/30",
  personal: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  deadline: "bg-destructive/15 text-destructive border-destructive/30",
  social: "bg-amber-500/15 text-amber-600 border-amber-500/30",
};

const dotColors: Record<Event["type"], string> = {
  meeting: "bg-violet-500",
  focus: "bg-sky-500",
  personal: "bg-emerald-500",
  deadline: "bg-destructive",
  social: "bg-amber-500",
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const initialEvents: Event[] = [
  { id: 1, title: "Sprint planning", date: 4, time: "09:00", duration: "1h", type: "meeting", location: "Canyon Room", attendees: ["MH", "SC", "JR"], color: typeColors.meeting },
  { id: 2, title: "1:1 with Marcus", date: 4, time: "15:00", duration: "30m", type: "meeting", location: "Zoom", attendees: ["MH"], color: typeColors.meeting },
  { id: 3, title: "Deep work — Q4 OKRs", date: 5, time: "10:00", duration: "3h", type: "focus", color: typeColors.focus },
  { id: 4, title: "Design review", date: 6, time: "11:00", duration: "1h", type: "meeting", location: "Figma", attendees: ["SC", "LP"], color: typeColors.meeting },
  { id: 5, title: "Invoice v2 ship deadline", date: 6, time: "17:00", duration: "—", type: "deadline", color: typeColors.deadline },
  { id: 6, title: "Lunch with Priya", date: 7, time: "12:30", duration: "1h", type: "social", location: "Cafe Nido", attendees: ["PS"], color: typeColors.social },
  { id: 7, title: "Customer interview — Acme", date: 8, time: "14:00", duration: "45m", type: "meeting", location: "Zoom", attendees: ["PS", "LP"], color: typeColors.meeting },
  { id: 8, title: "Architecture review", date: 9, time: "16:00", duration: "1.5h", type: "meeting", location: "Canyon Room", attendees: ["MH", "DK"], color: typeColors.meeting },
  { id: 9, title: "Focus block — proposal", date: 11, time: "09:00", duration: "4h", type: "focus", color: typeColors.focus },
  { id: 10, title: "All-hands meeting", date: 12, time: "10:00", duration: "1h", type: "meeting", location: "Auditorium", attendees: ["All"], color: typeColors.meeting },
  { id: 11, title: "Product strategy sync", date: 12, time: "13:00", duration: "1h", type: "meeting", location: "Boardroom", attendees: ["JR", "LP"], color: typeColors.meeting },
  { id: 12, title: "Yoga class", date: 13, time: "07:30", duration: "1h", type: "personal", location: "Studio 5", color: typeColors.personal },
  { id: 13, title: "Marketing launch review", date: 14, time: "15:00", duration: "1h", type: "meeting", location: "Zoom", attendees: ["JR"], color: typeColors.meeting },
  { id: 14, title: "MTVerse 2.0 launch", date: 15, time: "09:00", duration: "All day", type: "deadline", color: typeColors.deadline },
  { id: 15, title: "Customer webinar #1", date: 16, time: "11:00", duration: "1h", type: "meeting", location: "Webinar", attendees: ["JR", "PS"], color: typeColors.meeting },
  { id: 16, title: "Dentist appointment", date: 18, time: "09:00", duration: "1h", type: "personal", location: "Dr. Lee", color: typeColors.personal },
  { id: 17, title: "Board prep", date: 19, time: "14:00", duration: "2h", type: "focus", color: typeColors.focus },
  { id: 18, title: "Board meeting", date: 20, time: "10:00", duration: "3h", type: "meeting", location: "Boardroom", attendees: ["Board"], color: typeColors.meeting },
  { id: 19, title: "Team dinner", date: 25, time: "18:30", duration: "2h", type: "social", location: "Osteria Mozza", attendees: ["Team"], color: typeColors.social },
  { id: 20, title: "Q4 budget review", date: 26, time: "13:00", duration: "1.5h", type: "meeting", location: "Canyon Room", attendees: ["PS", "MH"], color: typeColors.meeting },
];

const peopleColors: Record<string, string> = {
  MH: "bg-emerald-500/15 text-emerald-600",
  SC: "bg-rose-500/15 text-rose-600",
  JR: "bg-sky-500/15 text-sky-600",
  PS: "bg-amber-500/15 text-amber-600",
  LP: "bg-fuchsia-500/15 text-fuchsia-600",
  DK: "bg-violet-500/15 text-violet-600",
};

export default function CalendarApp() {
  const today = new Date();
  const [monthIdx, setMonthIdx] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [addOpen, setAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("10:00");
  const [newType, setNewType] = useState<Event["type"]>("meeting");
  const [newLocation, setNewLocation] = useState("");

  const firstDay = new Date(year, monthIdx, 1).getDay();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array((7 - ((firstDay + daysInMonth) % 7)) % 7).fill(null),
  ];

  const eventsFor = (day: number) => events.filter((e) => e.date === day);
  const selectedEvents = selectedDay ? eventsFor(selectedDay).sort((a, b) => a.time.localeCompare(b.time)) : [];
  const upcoming = [...events].sort((a, b) => a.date - b.date || a.time.localeCompare(b.time)).slice(0, 6);

  const nav = (dir: -1 | 1) => {
    let m = monthIdx + dir;
    let y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonthIdx(m); setYear(y);
  };
  const goToday = () => { setMonthIdx(today.getMonth()); setYear(today.getFullYear()); setSelectedDay(today.getDate()); };

  const addEvent = () => {
    if (!newTitle.trim() || !selectedDay) { toast.error("Title and date required"); return; }
    const ev: Event = {
      id: Date.now(), title: newTitle.trim(), date: selectedDay, time: newTime,
      duration: "1h", type: newType, location: newLocation || undefined, color: typeColors[newType],
    };
    setEvents([...events, ev]);
    setNewTitle(""); setNewTime("10:00"); setNewType("meeting"); setNewLocation("");
    setAddOpen(false);
    toast.success("Event added", { description: `${ev.title} on ${monthNames[monthIdx]} ${ev.date}` });
  };

  const eventStats = {
    meetings: events.filter((e) => e.type === "meeting").length,
    focus: events.filter((e) => e.type === "focus").length,
    personal: events.filter((e) => e.type === "personal").length,
    deadlines: events.filter((e) => e.type === "deadline").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar"
        description="Plan your month, schedule events, and never miss a deadline."
        breadcrumbs={[{ label: "Apps" }, { label: "Calendar" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9" onClick={goToday}>Today</Button>
            <Button size="sm" className="h-9" onClick={() => setAddOpen(true)}><Plus className="size-4 mr-2" /> New event</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Meetings" value={eventStats.meetings} icon={<Users className="size-5" />} footer="This month" />
        <StatCard label="Focus blocks" value={eventStats.focus} icon={<Clock className="size-5" />} footer="Deep work hours" />
        <StatCard label="Deadlines" value={eventStats.deadlines} icon={<Bell className="size-5" />} footer="Approaching" />
        <StatCard label="Personal" value={eventStats.personal} icon={<CalIcon className="size-5" />} footer="Wellbeing" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        {/* Calendar grid */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight">{monthNames[monthIdx]} {year}</h2>
              <Badge variant="outline" className="text-[10px]">{events.filter((e) => e.date >= 1 && e.date <= daysInMonth).length} events</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="size-8" onClick={() => nav(-1)}><ChevronLeft className="size-4" /></Button>
              <Button variant="outline" size="icon" className="size-8" onClick={() => nav(1)}><ChevronRight className="size-4" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-7 border-b border-border bg-muted/30">
            {dayNames.map((d) => (
              <div key={d} className="p-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const dayEvents = day ? eventsFor(day) : [];
              const isToday = day === today.getDate() && monthIdx === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <button
                  key={i}
                  onClick={() => day && setSelectedDay(day)}
                  className={`min-h-[88px] p-2 text-left border-r border-b border-border transition-colors ${day ? "hover:bg-accent/50 cursor-pointer" : "bg-muted/20 cursor-default"} ${isSelected ? "bg-accent" : ""}`}
                  disabled={!day}
                >
                  {day && (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium size-6 flex items-center justify-center rounded-full ${isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{day}</span>
                        {dayEvents.length > 0 && <span className="text-[9px] text-muted-foreground">{dayEvents.length}</span>}
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((e) => (
                          <div key={e.id} className={`text-[10px] px-1.5 py-0.5 rounded border truncate ${e.color}`}>
                            <span className="font-medium">{e.time}</span> {e.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && <div className="text-[9px] text-muted-foreground px-1">+{dayEvents.length - 2} more</div>}
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected day */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Selected day</p>
              <p className="text-lg font-semibold">{selectedDay ? `${monthNames[monthIdx]} ${selectedDay}` : "No day selected"}</p>
            </div>
            <ScrollArea className="max-h-72">
              <div className="p-3 space-y-2">
                {selectedEvents.length === 0 ? (
                  <div className="text-center py-6">
                    <CalIcon className="size-7 text-muted-foreground/40 mx-auto mb-1.5" />
                    <p className="text-xs text-muted-foreground">No events scheduled</p>
                    <Button variant="outline" size="sm" className="mt-2 h-7 text-xs" onClick={() => setAddOpen(true)}><Plus className="size-3 mr-1" /> Add event</Button>
                  </div>
                ) : selectedEvents.map((e) => (
                  <div key={e.id} className="flex gap-2.5 p-2.5 rounded-lg border border-border hover:bg-accent/50">
                    <div className={`w-1 rounded-full ${dotColors[e.type]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium truncate">{e.title}</span>
                        <Badge variant="outline" className={`text-[9px] h-4 px-1 capitalize font-normal ${e.color}`}>{e.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="size-2.5" />{e.time} · {e.duration}</span>
                        {e.location && <span className="flex items-center gap-1"><MapPin className="size-2.5" />{e.location}</span>}
                      </div>
                      {e.attendees && e.attendees.length > 0 && (
                        <div className="flex -space-x-1.5 mt-1.5">
                          {e.attendees.slice(0, 4).map((a) => (
                            <Avatar key={a} className="size-4 border border-background"><AvatarFallback className={`text-[7px] font-semibold ${peopleColors[a] ?? "bg-muted text-muted-foreground"}`}>{a}</AvatarFallback></Avatar>
                          ))}
                          {e.attendees.length > 4 && <span className="text-[9px] text-muted-foreground ml-2">+{e.attendees.length - 4}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Upcoming */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Upcoming</p>
                <p className="text-sm font-semibold">Next 6 events</p>
              </div>
              <Button variant="ghost" size="icon" className="size-7 text-muted-foreground"><MoreVertical className="size-4" /></Button>
            </div>
            <ScrollArea className="max-h-72">
              <div className="p-3 space-y-1.5">
                {upcoming.map((e) => (
                  <button key={e.id} onClick={() => { setMonthIdx(monthIdx); setSelectedDay(e.date); }} className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-accent/50 text-left">
                    <div className="flex flex-col items-center justify-center w-10 py-1 rounded-md bg-muted">
                      <span className="text-[9px] uppercase text-muted-foreground">{monthNames[monthIdx].slice(0, 3)}</span>
                      <span className="text-sm font-bold leading-none">{e.date}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{e.title}</p>
                      <p className="text-[10px] text-muted-foreground">{e.time} · {e.duration}</p>
                    </div>
                    <span className={`size-2 rounded-full ${dotColors[e.type]}`} />
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Mini legend */}
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {(["meeting", "focus", "personal", "deadline", "social"] as const).map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-xs">
                  <span className={`size-2 rounded-full ${dotColors[t]}`} />
                  <span className="capitalize text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle>New event</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Title</Label>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Event title" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Date</Label>
                <Input value={selectedDay ? `${monthNames[monthIdx]} ${selectedDay}, ${year}` : "Pick a day"} readOnly className="bg-muted/50" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Time</Label>
                <Input value={newTime} onChange={(e) => setNewTime(e.target.value)} type="time" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Category</Label>
              <Select value={newType} onValueChange={(v) => setNewType(v as Event["type"])}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="focus">Focus block</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Location (optional)</Label>
              <Input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Canyon Room, Zoom, etc." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={addEvent}><Plus className="size-4 mr-2" /> Add event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
