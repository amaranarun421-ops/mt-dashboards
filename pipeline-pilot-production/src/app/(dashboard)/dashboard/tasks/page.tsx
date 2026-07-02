'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  CheckSquare, Plus, Plus as PlusIcon, Clock, AlertCircle,
  ListChecks, CircleDot, ChevronRight, GripVertical, Flame, Filter,
  CheckCircle2, ArrowUpRight, X,
} from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { ChartCard } from '@/components/common/chart-card';
import { PriorityBadge, AvatarBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { tasks, reps, type Rep } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const REP_LOOKUP: Record<string, Rep> = Object.fromEntries(reps.map((r) => [r.name, r]));

function repInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

type TaskRow = typeof tasks[number] & { ownerInitials: string; ownerColor: string; dueLabel: string; dueState: 'overdue' | 'today' | 'future' };

const TASK_ROWS: TaskRow[] = tasks.map((t) => {
  const rep = REP_LOOKUP[t.owner];
  const lower = t.due.toLowerCase();
  let dueState: 'overdue' | 'today' | 'future' = 'future';
  if (lower.includes('today')) dueState = 'today';
  // synthesized: 'Tomorrow', 'Jul X', etc are all future
  return {
    ...t,
    ownerInitials: rep?.initials ?? repInitials(t.owner),
    ownerColor: rep?.avatarColor ?? 'var(--accent)',
    dueLabel: t.due,
    dueState,
  };
});

// Add a couple of completed tasks for the Done column
const COMPLETED_TASKS: TaskRow[] = [
  { id: 'task8', title: 'Send BrightWave demo recap', due: 'Yesterday', priority: 'medium', status: 'done', owner: 'Sarah Chen', related: 'D-2049', type: 'follow_up', ownerInitials: 'SC', ownerColor: 'oklch(0.7 0.18 145)', dueLabel: 'Yesterday', dueState: 'future' },
  { id: 'task9', title: 'Confirm Vertex demo time', due: '2d ago', priority: 'high', status: 'done', owner: 'Marcus Bell', related: 'D-2048', type: 'meeting', ownerInitials: 'MB', ownerColor: 'oklch(0.7 0.15 300)', dueLabel: '2d ago', dueState: 'future' },
  { id: 'task10', title: 'Update CRM with Pulse notes', due: '3d ago', priority: 'low', status: 'done', owner: 'Emily Davis', related: 'D-2051', type: 'admin', ownerInitials: 'ED', ownerColor: 'oklch(0.75 0.18 55)', dueLabel: '3d ago', dueState: 'future' },
];

const ALL_TASKS = [...TASK_ROWS, ...COMPLETED_TASKS];

type FilterChip = 'all' | 'today' | 'week' | 'overdue' | 'completed';

const COLUMN_CONFIG = [
  { id: 'pending' as const, title: 'To Do', color: 'var(--chart-1)', icon: CircleDot },
  { id: 'in_progress' as const, title: 'In Progress', color: 'var(--warning)', icon: Clock },
  { id: 'done' as const, title: 'Done', color: 'var(--success)', icon: CheckCircle2 },
];

// synthesized completion trend (last 8 weeks)
const COMPLETION_TREND = [
  { week: 'W-7', completed: 28, created: 32 },
  { week: 'W-6', completed: 34, created: 36 },
  { week: 'W-5', completed: 31, created: 30 },
  { week: 'W-4', completed: 42, created: 38 },
  { week: 'W-3', completed: 38, created: 41 },
  { week: 'W-2', completed: 45, created: 43 },
  { week: 'W-1', completed: 51, created: 47 },
  { week: 'W', completed: 12, created: 15 },
];

function dueColor(state: 'overdue' | 'today' | 'future'): string {
  if (state === 'overdue') return 'text-destructive';
  if (state === 'today') return 'text-warning';
  return 'text-muted-foreground';
}

function TaskCard({ task, index }: { task: TaskRow; index: number }) {
  const Icon = COLUMN_CONFIG.find((c) => c.id === task.status)?.icon ?? CircleDot;
  return (
    <div
      className="group bg-card border border-border rounded-lg p-3 hover:border-accent/40 hover:shadow-sm transition-all duration-200 cursor-grab animate-in fade-in slide-in-from-bottom-2 duration-300"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors mt-0.5 shrink-0 cursor-grab" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className={cn('text-xs font-medium leading-snug', task.status === 'done' ? 'text-muted-foreground line-through' : 'text-foreground')}>
              {task.title}
            </p>
            <PriorityBadge priority={task.priority as 'high' | 'medium' | 'low'} />
          </div>
          <div className="flex items-center gap-2 text-[10px] mb-2">
            <Clock className={cn('w-2.5 h-2.5', dueColor(task.dueState))} />
            <span className={cn('font-medium', dueColor(task.dueState))}>{task.dueLabel}</span>
          </div>
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
            <Link
              href="/dashboard/deals"
              className="inline-flex items-center gap-1 text-[10px] text-accent hover:text-accent/80 transition-colors"
            >
              {task.related}
              <ArrowUpRight className="w-2.5 h-2.5" />
            </Link>
            <AvatarBadge initials={task.ownerInitials} size="sm" color={task.ownerColor} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const chartLoaded = useChartLoading(300);
  const [filter, setFilter] = React.useState<FilterChip>('all');

  // Stats
  const total = ALL_TASKS.length;
  const inProgress = ALL_TASKS.filter((t) => t.status === 'in_progress').length;
  const pending = ALL_TASKS.filter((t) => t.status === 'pending').length;
  const overdue = 2; // synthesized
  const completedToday = 5;

  const stats = [
    { label: 'Total', value: total, icon: ListChecks, color: 'var(--accent)' },
    { label: 'In Progress', value: inProgress, icon: Clock, color: 'var(--warning)' },
    { label: 'Pending', value: pending, icon: CircleDot, color: 'var(--chart-1)' },
    { label: 'Overdue', value: overdue, icon: AlertCircle, color: 'var(--destructive)' },
    { label: 'Done Today', value: completedToday, icon: CheckCircle2, color: 'var(--success)' },
  ];

  const filterChips: { value: FilterChip; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: total },
    { value: 'today', label: 'Today', count: ALL_TASKS.filter((t) => t.dueState === 'today').length },
    { value: 'week', label: 'This week', count: 12 },
    { value: 'overdue', label: 'Overdue', count: overdue },
    { value: 'completed', label: 'Completed', count: COMPLETED_TASKS.length },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Organize and prioritize sales tasks — never miss a follow-up"
        icon={CheckSquare}
        actions={
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> New Task
          </Button>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}>
                <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="bg-card border border-border rounded-xl p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {filterChips.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setFilter(chip.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                filter === chip.value
                  ? 'bg-accent/15 text-accent border-accent/40'
                  : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
              )}
            >
              {chip.label}
              <span className="text-[10px] text-muted-foreground">{chip.count}</span>
            </button>
          ))}
          {filter !== 'all' && (
            <Button variant="ghost" size="sm" onClick={() => setFilter('all')} className="ml-auto h-7 text-xs text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3 mr-1" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Task board (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMN_CONFIG.map((col, colIdx) => {
          const colTasks = ALL_TASKS.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className="bg-card border border-border rounded-xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${colIdx * 80}ms`, animationFillMode: 'both' }}
            >
              {/* Column header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${col.color} 12%, transparent)` }}>
                    <col.icon className="w-3.5 h-3.5" style={{ color: col.color }} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                  <span
                    className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-md text-[10px] font-bold tabular-nums"
                    style={{ background: `color-mix(in oklch, ${col.color} 15%, transparent)`, color: col.color }}
                  >
                    {colTasks.length}
                  </span>
                </div>
                <button className="w-6 h-6 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <PlusIcon className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Column body */}
              <div className="p-3 space-y-2 flex-1 min-h-[200px] bg-secondary/20">
                {colTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                      <CheckSquare className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">No tasks here</p>
                  </div>
                ) : (
                  colTasks.map((t, i) => <TaskCard key={t.id} task={t} index={i} />)
                )}
              </div>
              {/* Column footer */}
              <div className="p-3 border-t border-border text-[10px] text-muted-foreground flex items-center justify-between">
                <span className="inline-flex items-center gap-1">
                  <Flame className="w-2.5 h-2.5" />
                  {colTasks.filter((t) => t.priority === 'high').length} high priority
                </span>
                <button className="text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-0.5">
                  Add <PlusIcon className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion trend chart */}
      <ChartCard
        title="Task Completion Trend"
        description="Completed vs created · last 8 weeks"
        height={300}
        legend={[
          { label: 'Completed', color: 'var(--success)' },
          { label: 'Created', color: 'var(--chart-1)' },
        ]}
        trendBadge={{ value: '+18% WoW', type: 'positive' }}
      >
        <div className={`h-[220px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={COMPLETION_TREND} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--success)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="createdGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} allowDecimals={false} dx={-10} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                formatter={(v: number, name: string) => [`${v} tasks`, name === 'completed' ? 'Completed' : 'Created']}
                cursor={{ stroke: 'var(--accent)', strokeWidth: 1, strokeDasharray: '3 3' }}
              />
              <Area
                type="monotone"
                dataKey="created"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#createdGrad)"
                strokeDasharray="4 4"
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="var(--success)"
                strokeWidth={2.5}
                fill="url(#completedGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
