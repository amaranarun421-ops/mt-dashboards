"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar, AvatarGroup } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { inputClass } from "@/components/shared/form-section";
import { CalendarPlusIcon, ChevronRight } from "@/components/Layouts/sidebar/icons";
import { calendarEvents, upcomingEvents, type CalendarEvent } from "@/data/apps/calendar";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABEL = "February 2025";

// February 2025 starts on a Saturday
// Sun-start grid: row1 = Jan26..Feb1, row2 = Feb2..8, etc.
const GRID_DAYS: { day: number | null; inMonth: boolean }[] = (() => {
  const out: { day: number | null; inMonth: boolean }[] = [];
  // Feb 1 2025 is Saturday => index 6 in Sun-start week
  const lead = 6;
  for (let i = 0; i < lead; i++) {
    const prev = 26 + i; // Jan 26..31
    out.push({ day: prev, inMonth: false });
  }
  for (let d = 1; d <= 28; d++) out.push({ day: d, inMonth: true });
  // trailing
  let trail = 1;
  while (out.length % 7 !== 0) {
    out.push({ day: trail++, inMonth: false });
  }
  return out;
})();

const toneDot: Record<CalendarEvent["tone"], string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  violet: "bg-violet",
  info: "bg-blue",
  rose: "bg-rose",
};

const toneBadge: Record<CalendarEvent["tone"], "primary" | "accent" | "violet" | "info" | "danger"> = {
  primary: "primary",
  accent: "accent",
  violet: "violet",
  info: "info",
  rose: "danger",
};

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState<number>(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(calendarEvents);

  const dayEvents = useMemo(
    () => events.filter((e) => e.day === selectedDay).sort((a, b) => a.start.localeCompare(b.start)),
    [events, selectedDay],
  );

  const todayEvents = upcomingEvents;

  function addEvent(title: string, start: string, end: string, tone: CalendarEvent["tone"]) {
    const ev: CalendarEvent = {
      id: `ev${events.length + 1}`,
      title,
      day: selectedDay,
      start,
      end,
      tone,
      attendees: ["Me"],
    };
    setEvents((prev) => [...prev, ev]);
    setModalOpen(false);
  }

  return (
    <div>
      <PageHeader
        title="Calendar"
        description="Plan your month, schedule events and keep the team in sync."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Apps" }, { label: "Calendar" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              <CalendarPlusIcon className="size-4" />
              New event
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Month view */}
        <Card padded={false}>
          <div className="flex items-center justify-between gap-3 border-b border-stroke p-4 dark:border-dark-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="iconSm" aria-label="prev">
                <ChevronRight className="size-4 rotate-180" />
              </Button>
              <h3 className="text-base font-semibold text-dark dark:text-white">{MONTH_LABEL}</h3>
              <Button variant="ghost" size="iconSm" aria-label="next">
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <div className="hidden items-center gap-1 sm:flex">
              {(["Day", "Week", "Month"] as const).map((v) => (
                <Button
                  key={v}
                  variant={v === "Month" ? "primary" : "outline"}
                  size="sm"
                  className="rounded-l-none rounded-r-none first:rounded-l-lg last:rounded-r-lg"
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>

          <div className="p-4">
            {/* Weekday header */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {WEEKDAYS.map((d) => (
                <div
                  key={d}
                  className="px-2 py-1 text-center text-[11px] font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {GRID_DAYS.map((cell, idx) => {
                const dayEventsCell = cell.inMonth
                  ? events.filter((e) => e.day === cell.day).slice(0, 2)
                  : [];
                const isSelected = cell.inMonth && cell.day === selectedDay;
                const isToday = cell.inMonth && cell.day === 12;
                return (
                  <button
                    key={idx}
                    onClick={() => cell.inMonth && setSelectedDay(cell.day!)}
                    className={`min-h-[92px] rounded-lg border p-1.5 text-left transition ${
                      isSelected
                        ? "border-primary bg-primary-subtle/40 dark:bg-primary/10"
                        : cell.inMonth
                          ? "border-stroke bg-white hover:border-primary/30 dark:border-dark-3 dark:bg-gray-dark"
                          : "border-transparent bg-gray-2/40 dark:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold ${
                          cell.inMonth
                            ? isToday
                              ? "grid size-5 place-items-center rounded-full bg-primary text-white"
                              : "text-dark dark:text-white"
                            : "text-dark-6"
                        }`}
                      >
                        {cell.day}
                      </span>
                      {dayEventsCell.length > 0 && (
                        <span className="text-[9px] text-dark-5 dark:text-dark-6">
                          {events.filter((e) => e.day === cell.day).length}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayEventsCell.map((e) => (
                        <div
                          key={e.id}
                          className="flex items-center gap-1 truncate rounded px-1 py-0.5 text-[10px] font-medium"
                          style={{ background: "transparent" }}
                        >
                          <span className={`size-1.5 shrink-0 rounded-full ${toneDot[e.tone]}`} />
                          <span className="truncate text-dark-7 dark:text-dark-7">{e.title}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-dark dark:text-white">
                Feb {selectedDay}, 2025
              </h3>
              <Badge variant="primary" size="sm">{dayEvents.length} events</Badge>
            </div>
            {dayEvents.length === 0 ? (
              <p className="py-6 text-center text-sm text-dark-5 dark:text-dark-6">
                No events scheduled. Click "New event" to add one.
              </p>
            ) : (
              <ul className="space-y-3">
                {dayEvents.map((e) => (
                  <li
                    key={e.id}
                    className="flex gap-3 rounded-xl border border-stroke p-3 dark:border-dark-3"
                  >
                    <div className="flex flex-col items-center">
                      <span className={`size-2 rounded-full ${toneDot[e.tone]}`} />
                      <span className="mt-1 h-full w-px bg-stroke dark:bg-dark-3" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-dark dark:text-white">{e.title}</p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">
                        {e.start} – {e.end}
                        {e.location ? ` · ${e.location}` : ""}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <AvatarGroup names={e.attendees} max={3} size="xs" />
                        <Badge variant={toneBadge[e.tone]} size="sm">
                          {e.tone === "primary" ? "Team" : e.tone === "accent" ? "Customer" : e.tone === "violet" ? "Internal" : e.tone === "info" ? "Sync" : "Review"}
                        </Badge>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold text-dark dark:text-white">Upcoming this week</h3>
            <ul className="space-y-2.5">
              {todayEvents.map((e) => (
                <li key={e.id} className="flex items-start gap-2">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${toneDot[e.tone]}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-dark dark:text-white">{e.title}</p>
                    <p className="text-[11px] text-dark-5 dark:text-dark-6">
                      Feb {e.day} · {e.start}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold text-dark dark:text-white">My calendars</h3>
            <ul className="space-y-2">
              {[
                { name: "Personal", tone: "bg-primary" },
                { name: "Engineering", tone: "bg-accent" },
                { name: "Customer calls", tone: "bg-violet" },
                { name: "Holidays", tone: "bg-rose" },
              ].map((c) => (
                <li key={c.name} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="size-3.5 rounded border-stroke text-primary focus:ring-primary/30 dark:border-dark-3" />
                  <span className={`size-2.5 rounded-full ${c.tone}`} />
                  <span className="text-sm text-dark-7 dark:text-dark-7">{c.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <NewEventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addEvent}
        day={selectedDay}
      />
    </div>
  );
}

function NewEventModal({
  open,
  onClose,
  onSubmit,
  day,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, start: string, end: string, tone: CalendarEvent["tone"]) => void;
  day: number;
}) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");
  const [tone, setTone] = useState<CalendarEvent["tone"]>("primary");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`New event · Feb ${day}, 2025`}
      description="Add a new event to your calendar."
      size="md"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => title.trim() && onSubmit(title.trim(), start, end, tone)}
          >
            Create event
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Start</label>
            <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">End</label>
            <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Color</label>
          <div className="flex flex-wrap gap-2">
            {(["primary", "accent", "violet", "info", "rose"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`size-7 rounded-full ${toneDot[t]} ${tone === t ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-dark" : ""}`}
                aria-label={t}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
