'use client';

import * as React from 'react';
import {
  Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight,
  Video, MapPin, Clock, Sparkles, ArrowRight,
} from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { calendars } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Time slot config (9 AM - 6 PM)
const TIME_SLOTS = [
  '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const DAY_DATES = [30, 1, 2, 3, 4]; // Mon Jun 30 - Fri Jul 4

const EVENT_TYPE_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  internal: { color: 'var(--chart-3)', bg: 'color-mix(in oklch, var(--chart-3) 12%, transparent)', label: 'Internal' },
  external: { color: 'var(--accent)', bg: 'color-mix(in oklch, var(--accent) 12%, transparent)', label: 'External' },
};

// Helper: convert "HH:MM" time to slot index & offset
function timeToSlot(time: string): { slotIndex: number; minuteOffset: number } {
  const [h, m] = time.split(':').map(Number);
  // First slot is 9:00 = slot 0; each slot is 1 hour
  const totalMinutes = (h - 9) * 60 + m;
  const slotIndex = Math.floor(totalMinutes / 60);
  const minuteOffset = totalMinutes % 60;
  return { slotIndex, minuteOffset };
}

// Mini month calendar — synthesize July 2025
const MONTH_NAME = 'July 2025';
const MONTH_DAYS = 31;
const MONTH_START_DOW = 2; // Tuesday (Jul 1, 2025 is a Tuesday)
const TODAY_DAY = 2; // Highlight Jul 2

// synthesized events with assigned days
const UPCOMING_EVENTS = [
  { id: 'up1', title: 'QBR with Acme leadership', when: 'Today · 2:00 PM', duration: '60min', location: 'Zoom', type: 'external' as const, account: 'Acme Corporation' },
  { id: 'up2', title: 'Discovery — Northwind', when: 'Today · 11:00 AM', duration: '45min', location: 'Zoom', type: 'external' as const, account: 'Northwind Trading' },
  { id: 'up3', title: 'Demo — BrightWave', when: 'Tomorrow · 10:00 AM', duration: '45min', location: 'On-site', type: 'external' as const, account: 'BrightWave Media' },
  { id: 'up4', title: 'Security review — GlobalTech', when: 'Wed · 2:00 PM', duration: '90min', location: 'Zoom', type: 'external' as const, account: 'GlobalTech Industries' },
  { id: 'up5', title: 'ROI workshop — Quantum', when: 'Fri · 10:00 AM', duration: '60min', location: 'On-site', type: 'external' as const, account: 'Quantum Logistics' },
];

type ViewMode = 'week' | 'month';

export default function CalendarPage() {
  const [view, setView] = React.useState<ViewMode>('week');
  const [weekOffset, setWeekOffset] = React.useState(0);

  // total events today
  const todayEvents = calendars[0]?.events ?? [];
  const todayMeetings = todayEvents.filter((e) => e.type === 'external').length;

  // Build event-positioned structure per day
  // For each day, render events absolutely positioned within their slot
  const slotHeight = 60; // px per hour slot

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar"
        description="Week view of meetings, calls, and internal events across your sales team"
        icon={CalendarIcon}
        actions={
          <>
            <div className="flex items-center bg-card border border-border rounded-lg p-0.5 h-9">
              <button
                onClick={() => setView('week')}
                className={cn(
                  'px-3 h-8 text-xs font-medium rounded-md transition-colors',
                  view === 'week' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                Week
              </button>
              <button
                onClick={() => setView('month')}
                className={cn(
                  'px-3 h-8 text-xs font-medium rounded-md transition-colors',
                  view === 'month' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                Month
              </button>
            </div>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground h-9">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Event
            </Button>
          </>
        }
      />

      {/* Today's date + summary banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          className="lg:col-span-2 bg-gradient-to-br from-accent/8 via-chart-3/4 to-transparent border border-accent/20 rounded-xl p-5 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex items-center gap-5">
            {/* Big date display */}
            <div className="text-center shrink-0">
              <p className="text-[10px] uppercase tracking-wider text-accent font-semibold">Today</p>
              <p className="text-5xl font-bold text-foreground tabular-nums leading-none mt-1">{DAY_DATES[0]}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Jun · Wed</p>
            </div>
            <div className="h-16 w-px bg-border" />
            <div className="flex-1">
              <h3 className="text-base font-semibold text-foreground mb-1">Wednesday, June 30</h3>
              <p className="text-xs text-muted-foreground mb-3">You have {todayEvents.length} events scheduled today</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                    <CalendarIcon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground tabular-nums">{todayEvents.length}</p>
                    <p className="text-[10px] text-muted-foreground">total events</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-chart-3/15 border border-chart-3/30 flex items-center justify-center">
                    <Video className="w-3.5 h-3.5 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground tabular-nums">{todayMeetings}</p>
                    <p className="text-[10px] text-muted-foreground">customer meetings</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-warning/15 border border-warning/30 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground tabular-nums">2h 15m</p>
                    <p className="text-[10px] text-muted-foreground">booked time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Week navigation */}
        <div className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '60ms', animationFillMode: 'both' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Week of Jun 30</h3>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-transparent" onClick={() => setWeekOffset((w) => w - 1)}>
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs bg-transparent" onClick={() => setWeekOffset(0)}>
                Today
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-transparent" onClick={() => setWeekOffset((w) => w + 1)}>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {DAY_NAMES.map((d, i) => (
              <button
                key={d}
                className={cn(
                  'flex flex-col items-center justify-center py-2 rounded-lg border text-xs transition-all',
                  i === 0 ? 'bg-accent text-accent-foreground border-accent' : 'bg-secondary/40 border-border hover:border-accent/40'
                )}
              >
                <span className="text-[10px] uppercase tracking-wider opacity-70">{d}</span>
                <span className="text-sm font-bold tabular-nums">{DAY_DATES[i]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid: week view + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Week view */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Days header */}
          <div className="grid border-b border-border" style={{ gridTemplateColumns: `56px repeat(${DAY_NAMES.length}, 1fr)` }}>
            <div className="p-3 border-r border-border" />
            {DAY_NAMES.map((d, i) => (
              <div key={d} className={cn('p-3 border-r border-border last:border-r-0 text-center', i === 0 && 'bg-accent/5')}>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{d}</p>
                <p className={cn('text-base font-bold tabular-nums', i === 0 ? 'text-accent' : 'text-foreground')}>{DAY_DATES[i]}</p>
              </div>
            ))}
          </div>
          {/* Time grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {TIME_SLOTS.map((slot, slotIdx) => (
                <div key={slot} className="grid border-b border-border last:border-b-0" style={{ gridTemplateColumns: `56px repeat(${DAY_NAMES.length}, 1fr)`, minHeight: `${slotHeight}px` }}>
                  {/* Time label */}
                  <div className="p-2 border-r border-border text-right">
                    <span className="text-[10px] text-muted-foreground tabular-nums">{slot}</span>
                  </div>
                  {/* Day cells */}
                  {DAY_NAMES.map((_, dayIdx) => {
                    const dayEvents = (calendars[dayIdx]?.events ?? []).filter((e) => {
                      const { slotIndex } = timeToSlot(e.time);
                      return slotIndex === slotIdx;
                    });
                    return (
                      <div
                        key={dayIdx}
                        className={cn(
                          'relative border-r border-border last:border-r-0 hover:bg-secondary/20 transition-colors',
                          dayIdx === 0 && 'bg-accent/[0.02]'
                        )}
                      >
                        {dayEvents.map((e, i) => {
                          const cfg = EVENT_TYPE_CONFIG[e.type];
                          const { minuteOffset } = timeToSlot(e.time);
                          const height = Math.min(slotHeight - 4, (e.duration / 60) * slotHeight - 4);
                          return (
                            <div
                              key={`${dayIdx}-${slotIdx}-${i}`}
                              className="absolute left-1 right-1 rounded-md border p-1.5 cursor-pointer hover:shadow-md transition-shadow group overflow-hidden"
                              style={{
                                top: `${(minuteOffset / 60) * slotHeight + 2}px`,
                                height: `${Math.max(28, height)}px`,
                                background: cfg.bg,
                                borderColor: `color-mix(in oklch, ${cfg.color} 40%, transparent)`,
                              }}
                            >
                              <div className="flex items-start gap-1">
                                <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: cfg.color }} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] font-semibold text-foreground truncate leading-tight">{e.title}</p>
                                  <p className="text-[9px] text-muted-foreground truncate">{e.with}</p>
                                  {height > 36 && (
                                    <p className="text-[9px] mt-0.5 inline-flex items-center gap-0.5" style={{ color: cfg.color }}>
                                      <Clock className="w-2 h-2" />
                                      {e.time} · {e.duration}m
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: upcoming + mini month */}
        <div className="space-y-4">
          {/* Upcoming events */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '60ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Upcoming</h3>
              <span className="text-[11px] text-muted-foreground">next 5</span>
            </div>
            <div className="space-y-2">
              {UPCOMING_EVENTS.map((e, i) => {
                const cfg = EVENT_TYPE_CONFIG[e.type];
                return (
                  <div
                    key={e.id}
                    className="p-2.5 rounded-lg border border-border hover:border-accent/40 transition-colors group cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: cfg.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate group-hover:text-accent transition-colors">{e.title}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{e.account}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                          <span className="inline-flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {e.when}
                          </span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-0.5">
                            {e.location === 'Zoom' ? <Video className="w-2.5 h-2.5" /> : <MapPin className="w-2.5 h-2.5" />}
                            {e.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mini month calendar */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">{MONTH_NAME}</h3>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-6 h-6 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="text-[10px] text-muted-foreground text-center font-medium">{d}</div>
              ))}
            </div>
            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: MONTH_START_DOW }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: MONTH_DAYS }).map((_, i) => {
                const day = i + 1;
                const isToday = day === TODAY_DAY;
                const hasEvent = [1, 2, 3, 7, 9, 14, 15, 21, 22, 28].includes(day);
                return (
                  <button
                    key={day}
                    className={cn(
                      'aspect-square rounded-md text-xs flex flex-col items-center justify-center transition-all relative',
                      isToday
                        ? 'bg-accent text-accent-foreground font-bold'
                        : hasEvent
                        ? 'bg-accent/10 text-foreground hover:bg-accent/20'
                        : 'text-muted-foreground hover:bg-secondary'
                    )}
                  >
                    <span className="tabular-nums">{day}</span>
                    {hasEvent && !isToday && (
                      <div className="w-1 h-1 rounded-full bg-accent mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Has events</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* AI scheduling hint */}
          <div className="bg-gradient-to-br from-accent/8 to-transparent border border-accent/20 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '180ms', animationFillMode: 'both' }}>
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground mb-0.5">Smart Scheduling</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Thursday afternoon looks open. Suggest scheduling the Vertex negotiation call then — both attendees are typically available.
                </p>
                <button className="text-[11px] text-accent hover:text-accent/80 mt-2 inline-flex items-center gap-0.5 transition-colors">
                  Suggest time <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
