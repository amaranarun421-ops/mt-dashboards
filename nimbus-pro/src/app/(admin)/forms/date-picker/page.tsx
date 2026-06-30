"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Input, Label, Select, Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, X } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Calendar({ year, month, selected, onSelect }: {
  year: number; month: number; selected?: string; onSelect: (date: string) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isToday = (d: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
  const fmt = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        {WEEKDAYS.map((d) => <div key={d} className="py-2">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const dateStr = fmt(d);
          const sel = selected === dateStr;
          const todayCls = isToday(d);
          return (
            <button
              key={i}
              onClick={() => onSelect(dateStr)}
              className={cn(
                "flex h-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                sel
                  ? "bg-brand-500 text-white"
                  : todayCls
                    ? "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DatePickerPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string>(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`);
  const [rangeStart, setRangeStart] = useState<string | null>(`${today.getFullYear()}-06-22`);
  const [rangeEnd, setRangeEnd] = useState<string | null>(`${today.getFullYear()}-06-28`);
  const [time, setTime] = useState("14:30");
  const [monthPicker, setMonthPicker] = useState(5);
  const [yearPicker, setYearPicker] = useState(today.getFullYear());

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const handleRangeSelect = (d: string) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(d); setRangeEnd(null);
    } else if (rangeStart && !rangeEnd) {
      if (d < rangeStart) { setRangeStart(d); }
      else setRangeEnd(d);
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Date Picker"
        description="Simple date, date range, time, and month pickers — plus an inline calendar widget."
        breadcrumbs={[{ label: "Forms" }, { label: "Date Picker" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Simple date */}
        <Card>
          <CardHeader title="Simple Date" description="Native date input" />
          <CardBody className="space-y-4">
            <div>
              <Label>Date of birth</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Appointment date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="date" className="pl-9" value={selected} onChange={(e) => setSelected(e.target.value)} />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Selected: <span className="font-semibold text-gray-700 dark:text-gray-300">{selected}</span></p>
            </div>
          </CardBody>
        </Card>

        {/* Date range */}
        <Card>
          <CardHeader title="Date Range" description="Two dates defining a range" />
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Start date</Label>
                <Input type="date" value={rangeStart ?? ""} onChange={(e) => setRangeStart(e.target.value)} />
              </div>
              <div>
                <Label>End date</Label>
                <Input type="date" value={rangeEnd ?? ""} onChange={(e) => setRangeEnd(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm">Today</Button>
              <Button variant="outline" size="sm">Last 7 days</Button>
              <Button variant="outline" size="sm">Last 30 days</Button>
              <Button variant="outline" size="sm">This month</Button>
            </div>
            {rangeStart && rangeEnd && (
              <div className="rounded-lg bg-brand-50 p-3 text-sm dark:bg-brand-500/10">
                <span className="font-semibold text-brand-700 dark:text-brand-300">{rangeStart}</span>
                <span className="mx-2 text-brand-500">→</span>
                <span className="font-semibold text-brand-700 dark:text-brand-300">{rangeEnd}</span>
                <span className="ml-2 text-xs text-brand-600/70 dark:text-brand-400/70">
                  ({Math.ceil((new Date(rangeEnd).getTime() - new Date(rangeStart).getTime()) / 86400000) + 1} days)
                </span>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Time picker */}
        <Card>
          <CardHeader title="Time Picker" description="Pick a time of day" />
          <CardBody className="space-y-4">
            <div>
              <Label>Start time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div>
              <Label>Quick presets</Label>
              <div className="flex flex-wrap gap-2">
                {["09:00", "12:00", "14:30", "17:30", "20:00"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={cn("rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors",
                      time === t ? "bg-brand-500 text-white" : "border border-gray-200 text-gray-600 hover:border-brand-300 dark:border-gray-800 dark:text-gray-300"
                    )}
                  >{t}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Timezone</Label>
                <Select>
                  <option>Asia/Kolkata (IST)</option>
                  <option>America/New_York (EST)</option>
                  <option>Europe/London (GMT)</option>
                </Select>
              </div>
              <div>
                <Label>Format</Label>
                <Select>
                  <option>24-hour</option>
                  <option>12-hour (AM/PM)</option>
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Month picker */}
        <Card>
          <CardHeader title="Month Picker" description="Select month and year" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="icon" onClick={() => setYearPicker(yearPicker - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{yearPicker}</span>
              <Button variant="outline" size="icon" onClick={() => setYearPicker(yearPicker + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  onClick={() => setMonthPicker(i)}
                  className={cn("rounded-lg py-2 text-xs font-semibold transition-colors",
                    monthPicker === i ? "bg-brand-500 text-white" : "border border-gray-200 text-gray-700 hover:border-brand-300 dark:border-gray-800 dark:text-gray-300"
                  )}
                >{m.slice(0, 3)}</button>
              ))}
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center text-sm dark:bg-gray-800/40">
              <span className="font-semibold text-gray-900 dark:text-white">{MONTHS[monthPicker]} {yearPicker}</span>
            </div>
          </CardBody>
        </Card>

        {/* Inline calendar */}
        <Card className="lg:col-span-2">
          <CardHeader title="Inline Calendar" description="A full interactive calendar widget" action={
            <div className="flex items-center gap-2">
              {selected && <Badge tone="brand" variant="soft">{selected} <button onClick={() => setSelected("")} aria-label="Clear"><X className="h-3 w-3" /></button></Badge>}
            </div>
          } />
          <CardBody>
            <div className="mx-auto max-w-md">
              <div className="mb-3 flex items-center justify-between">
                <Button variant="outline" size="icon" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{MONTHS[month]} {year}</span>
                <Button variant="outline" size="icon" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
              </div>
              <Calendar year={year} month={month} selected={selected} onSelect={setSelected} />
              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                <Button variant="ghost" size="sm" onClick={() => {
                  setYear(today.getFullYear()); setMonth(today.getMonth());
                  setSelected(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`);
                }}>Today</Button>
                <Button size="sm">Apply date</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Range calendar */}
        <Card className="lg:col-span-2">
          <CardHeader title="Range Calendar" description="Select a date range visually" action={
            <div className="flex items-center gap-2">
              {rangeStart && <Badge tone="brand" variant="soft">Start: {rangeStart}</Badge>}
              {rangeEnd && <Badge tone="purple" variant="soft">End: {rangeEnd}</Badge>}
            </div>
          } />
          <CardBody>
            <div className="mx-auto max-w-md">
              <div className="mb-3 flex items-center justify-between">
                <Button variant="outline" size="icon" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{MONTHS[month]} {year}</span>
                <Button variant="outline" size="icon" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {WEEKDAYS.map((d) => <div key={d} className="py-2">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {(() => {
                  const firstDay = new Date(year, month, 1).getDay();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const fmt = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                  const cells: (number | null)[] = [];
                  for (let i = 0; i < firstDay; i++) cells.push(null);
                  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
                  return cells.map((d, i) => {
                    if (d === null) return <div key={i} />;
                    const ds = fmt(d);
                    const isStart = rangeStart === ds;
                    const isEnd = rangeEnd === ds;
                    const inRange = rangeStart && rangeEnd && ds > rangeStart && ds < rangeEnd;
                    return (
                      <button
                        key={i}
                        onClick={() => handleRangeSelect(ds)}
                        className={cn("flex h-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                          isStart || isEnd ? "bg-brand-500 text-white" : inRange ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        )}
                      >{d}</button>
                    );
                  });
                })()}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
