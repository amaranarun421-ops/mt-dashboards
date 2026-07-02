'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from 'recharts';
import {
  Calendar as CalendarIcon, Plus, Video, MapPin, Clock, Users, ArrowRight,
  ChevronRight, Sparkles, Flame, CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { meetings, reps, type Rep } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// ---- meeting type config ----
type MeetingType = 'qbr' | 'discovery' | 'demo' | 'technical' | 'negotiation' | 'workshop';
const MEETING_TYPE_CONFIG: Record<MeetingType, { label: string; color: string; bg: string }> = {
  qbr: { label: 'QBR', color: 'var(--accent)', bg: 'color-mix(in oklch, var(--accent) 12%, transparent)' },
  discovery: { label: 'Discovery', color: 'var(--chart-1)', bg: 'color-mix(in oklch, var(--chart-1) 12%, transparent)' },
  demo: { label: 'Demo', color: 'var(--chart-3)', bg: 'color-mix(in oklch, var(--chart-3) 12%, transparent)' },
  technical: { label: 'Technical', color: 'var(--chart-5)', bg: 'color-mix(in oklch, var(--chart-5) 12%, transparent)' },
  negotiation: { label: 'Negotiation', color: 'var(--warning)', bg: 'color-mix(in oklch, var(--warning) 12%, transparent)' },
  workshop: { label: 'Workshop', color: 'var(--chart-2)', bg: 'color-mix(in oklch, var(--chart-2) 12%, transparent)' },
};

const REP_LOOKUP: Record<string, Rep> = Object.fromEntries(reps.map((r) => [r.name, r]));

function repInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

// synthesized attendees for each meeting (avatars to render)
const ATTENDEE_POOL = [
  { name: 'John Smith', initials: 'JS' },
  { name: 'Lisa Wong', initials: 'LW' },
  { name: 'Robert Davis', initials: 'RD' },
  { name: 'Alex Rivera', initials: 'AR' },
  { name: 'Maya Patel', initials: 'MP' },
  { name: 'Michael Chen', initials: 'MC' },
  { name: 'Jennifer Park', initials: 'JP' },
  { name: 'Emma Wilson', initials: 'EW' },
];

function getAttendees(idx: number, count: number) {
  const start = (idx * 3) % ATTENDEE_POOL.length;
  const out: { name: string; initials: string }[] = [];
  for (let i = 0; i < count - 1; i++) {
    out.push(ATTENDEE_POOL[(start + i) % ATTENDEE_POOL.length]);
  }
  return out;
}

// synthesized weekly meeting count
const WEEKLY_MEETINGS = [
  { day: 'Mon', count: 5, hours: 4.5 },
  { day: 'Tue', count: 7, hours: 6.0 },
  { day: 'Wed', count: 4, hours: 3.5 },
  { day: 'Thu', count: 8, hours: 7.5 },
  { day: 'Fri', count: 3, hours: 2.5 },
  { day: 'Sat', count: 1, hours: 1.0 },
  { day: 'Sun', count: 0, hours: 0 },
];

const TYPE_DISTRIBUTION = [
  { type: 'Discovery', value: 14, color: 'var(--chart-1)' },
  { type: 'Demo', value: 11, color: 'var(--chart-3)' },
  { type: 'QBR', value: 6, color: 'var(--accent)' },
  { type: 'Technical', value: 8, color: 'var(--chart-5)' },
  { type: 'Negotiation', value: 5, color: 'var(--warning)' },
  { type: 'Workshop', value: 4, color: 'var(--chart-2)' },
];

type ViewMode = 'upcoming' | 'past';

export default function MeetingsPage() {
  const chartLoaded = useChartLoading(300);
  const [view, setView] = React.useState<ViewMode>('upcoming');

  // split meetings into upcoming and past (using synthesized criteria)
  // For demo purposes, meetings with 'Today' or 'Tomorrow' or weekday names are 'upcoming'
  const isUpcoming = (time: string) => {
    return /today|tomorrow|mon|tue|wed|thu|fri|sat|sun/i.test(time) && !/ago/i.test(time);
  };

  const visible = React.useMemo(() => {
    const list = view === 'upcoming'
      ? meetings.filter((m) => isUpcoming(m.time))
      : meetings.slice().reverse(); // synthesized past
    return list;
  }, [view]);

  // Next meeting countdown — synthesize from first upcoming meeting
  const nextMeeting = meetings[0];

  // Stats
  const todayCount = meetings.filter((m) => m.time.toLowerCase().includes('today')).length;
  const weekCount = WEEKLY_MEETINGS.reduce((s, w) => s + w.count, 0);
  const totalHours = WEEKLY_MEETINGS.reduce((s, w) => s + w.hours, 0);

  // Countdown state (synthesized: 1h 23m 14s)
  const [countdown, setCountdown] = React.useState({ h: 1, m: 23, s: 14 });
  React.useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        let { h, m, s } = c;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 1; m = 23; s = 14; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meetings"
        description="Schedule, track, and review customer meetings across the sales cycle"
        icon={CalendarIcon}
        actions={
          <>
            <div className="flex items-center bg-card border border-border rounded-lg p-0.5 h-9">
              <button
                onClick={() => setView('upcoming')}
                className={cn(
                  'px-3 h-8 text-xs font-medium rounded-md transition-colors',
                  view === 'upcoming' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                Upcoming
              </button>
              <button
                onClick={() => setView('past')}
                className={cn(
                  'px-3 h-8 text-xs font-medium rounded-md transition-colors',
                  view === 'past' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                Past
              </button>
            </div>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground h-9">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Schedule Meeting
            </Button>
          </>
        }
      />

      {/* Today's count + next meeting countdown card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today summary tiles */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Today</span>
              <CalendarIcon className="w-3.5 h-3.5 text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{todayCount}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">meetings scheduled</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '80ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">This Week</span>
              <Clock className="w-3.5 h-3.5 text-chart-3" />
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{weekCount}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{totalHours.toFixed(1)}h booked</p>
          </div>
        </div>

        {/* Next meeting countdown card */}
        <div
          className="lg:col-span-2 bg-gradient-to-br from-accent/8 via-chart-1/4 to-transparent border border-accent/20 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden"
          style={{ animationDelay: '160ms', animationFillMode: 'both' }}
        >
          {/* decorative orbs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-chart-1/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <Flame className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">Next Meeting</span>
              </div>
              <h3 className="text-base font-bold text-foreground truncate">{nextMeeting.title}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{nextMeeting.location}</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{nextMeeting.time} · {nextMeeting.duration}min</span>
                <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" />{nextMeeting.attendees} attendees</span>
              </div>
            </div>
            {/* Countdown timer */}
            <div className="flex items-center gap-2 shrink-0">
              {[
                { v: countdown.h, label: 'HR' },
                { v: countdown.m, label: 'MIN' },
                { v: countdown.s, label: 'SEC' },
              ].map((unit, i) => (
                <React.Fragment key={unit.label}>
                  <div className="flex flex-col items-center">
                    <div className="bg-card border border-accent/30 rounded-lg w-12 h-12 flex items-center justify-center tabular-nums">
                      <span className="text-xl font-bold text-accent">{String(unit.v).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">{unit.label}</span>
                  </div>
                  {i < 2 && <span className="text-accent text-xl font-bold pb-4">:</span>}
                </React.Fragment>
              ))}
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground ml-2 h-9">
                <Video className="w-3.5 h-3.5 mr-1.5" /> Join
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid: meeting cards + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: meeting cards grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {view === 'upcoming' ? 'Upcoming Meetings' : 'Past Meetings'}
              <span className="text-muted-foreground font-normal ml-2">· {visible.length}</span>
            </h3>
            <Button variant="ghost" size="sm" className="text-accent hover:text-accent h-7 text-xs">
              View all <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visible.map((m, i) => {
              const cfg = MEETING_TYPE_CONFIG[m.type as MeetingType];
              const rep = REP_LOOKUP[m.owner];
              const attendees = getAttendees(i, m.attendees);
              const isPast = view === 'past';
              return (
                <div
                  key={m.id}
                  className="group bg-card border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                >
                  {/* Top row: time + type badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{m.time}</span>
                        <span>·</span>
                        <span className="tabular-nums">{m.duration}m</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{m.account}</p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border shrink-0"
                      style={{
                        background: cfg.bg,
                        color: cfg.color,
                        borderColor: `color-mix(in oklch, ${cfg.color} 30%, transparent)`,
                      }}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  {/* Location + Attendees */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      {m.location === 'Zoom' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      <span>{m.location}</span>
                    </div>
                    <div className="flex items-center -space-x-2">
                      <AvatarBadge initials={rep?.initials ?? repInitials(m.owner)} size="sm" color={rep?.avatarColor ?? 'var(--accent)'} />
                      {attendees.slice(0, 3).map((a) => (
                        <AvatarBadge key={a.initials} initials={a.initials} size="sm" color="var(--chart-3)" className="ring-2 ring-card" />
                      ))}
                      {m.attendees > 4 && (
                        <div className="w-6 h-6 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[9px] font-semibold text-muted-foreground">
                          +{m.attendees - 4}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Owner + Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span className="text-muted-foreground">Owner:</span>
                      <span className="text-foreground font-medium">{m.owner}</span>
                    </div>
                    {isPast ? (
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Summary
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Details
                        </Button>
                        {m.location === 'Zoom' && (
                          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground h-7 text-xs">
                            <Video className="w-3 h-3 mr-1" /> Join
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Insight banner */}
          <div className="bg-card border border-accent/20 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground mb-0.5">Meeting Prep Suggestion</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Acme QBR is in 1h 23m. Last activity: John Smith opened the MSA yesterday. Recommend reviewing the revised SLA appendix and pricing terms before the call.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-accent hover:text-accent h-7 text-xs shrink-0">
              Open prep <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Weekly meeting count bar */}
          <ChartCard
            title="This Week's Meetings"
            description="Count & hours per day"
            height={280}
            trendBadge={{ value: `${weekCount} total`, type: 'positive' }}
          >
            <div className={`h-[200px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_MEETINGS} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} allowDecimals={false} dx={-10} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={(v: number, name: string) => name === 'count' ? [`${v} meetings`, 'Meetings'] : [`${v}h`, 'Hours']}
                    cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                  />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]} maxBarSize={28}>
                    {WEEKLY_MEETINGS.map((entry, i) => (
                      <Cell key={i} fill={entry.count >= 5 ? 'var(--accent)' : entry.count > 0 ? 'var(--chart-3)' : 'var(--secondary)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Type distribution */}
          <ChartCard
            title="Meeting Type Distribution"
            description="This quarter"
            height={260}
          >
            <div className={`transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={TYPE_DISTRIBUTION}
                    dataKey="value"
                    nameKey="type"
                    innerRadius={42}
                    outerRadius={68}
                    paddingAngle={2}
                    stroke="var(--card)"
                    strokeWidth={2}
                  >
                    {TYPE_DISTRIBUTION.map((entry) => (
                      <Cell key={entry.type} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={(v: number, name: string) => [`${v} meetings`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3">
              {TYPE_DISTRIBUTION.map((t) => (
                <div key={t.type} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                    <span className="text-muted-foreground truncate">{t.type}</span>
                  </div>
                  <span className="text-foreground font-semibold tabular-nums">{t.value}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Quick stats footer */}
          <div className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg Duration</p>
                <p className="text-lg font-bold text-foreground tabular-nums">52min</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">No-Show Rate</p>
                <p className="text-lg font-bold text-foreground tabular-nums">8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
