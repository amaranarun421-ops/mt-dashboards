'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, MoreHorizontal,
  Plus, X, Eye, Search, Bot, Brain, Cpu, Zap, Gauge, Activity, TrendingUp, TrendingDown,
  AlertTriangle, AlertCircle, CheckCircle2, XCircle, Clock, FileText, FileSearch,
  Code2, PencilLine, Database, Workflow, Shield, Layers, Sparkles, Play, Copy,
  RefreshCw, Link2, Filter, ChevronLeft, Square, Circle, Dot, Wifi, Server, Cpu as CpuIcon,
  Lightbulb, ListChecks, Terminal, MessageSquare, BarChart3, DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem } from './analytics-interactions';
import * as Data from './ai-workspace-data';
import type { Agent, PromptRun, AutomationTask, QueueKey, EvalResult } from './ai-workspace-data';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/* ============================================================
   Shared helpers
   ============================================================ */
function CardActionMenu({ cardName }: { cardName: string }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  function handle(action: string) {
    setOpen(false);
    toast({ title: `${action} — ${cardName}` });
  }
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
        aria-label={`Actions for ${cardName}`}
      >
        <MoreHorizontal className="size-4" strokeWidth={2.2} />
      </button>
      <Popover open={open} onClose={() => setOpen(false)} align="right" width={180}>
        <div className="px-2 py-1.5">
          <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{cardName}</p>
        </div>
        <PopoverItem icon={Eye} onClick={() => handle('View details')}>View details</PopoverItem>
        <PopoverItem icon={Download} onClick={() => handle('Download')}>Download data</PopoverItem>
        <PopoverItem icon={Link2} onClick={() => handle('Copy link')}>Copy report link</PopoverItem>
      </Popover>
    </div>
  );
}

/* Model brand icon — colored ring with first letter */
function ModelMark({ color, label, size = 18 }: { color: string; label: string; size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold text-white"
      style={{ background: color, width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden="true"
    >
      {label.charAt(0)}
    </span>
  );
}

const agentIcons: Record<Agent['icon'], React.ElementType> = {
  router: Workflow,
  research: FileSearch,
  support: MessageSquare,
  review: Code2,
  content: PencilLine,
  analyst: Database,
};

function statusTone(status: Agent['status']): 'success' | 'info' | 'warning' | 'error' {
  switch (status) {
    case 'running': return 'success';
    case 'idle': return 'info';
    case 'queued': return 'warning';
    case 'error': return 'error';
  }
}

function statusLabel(status: Agent['status']) {
  switch (status) {
    case 'running': return 'Running';
    case 'idle': return 'Idle';
    case 'queued': return 'Queued';
    case 'error': return 'Error';
  }
}

/* ============================================================
   AI Workspace Header
   ============================================================ */
function AiHeader({ onNewAgent }: { onNewAgent: () => void }) {
  const { toast } = useToast();
  const [wsOpen, setWsOpen] = React.useState(false);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [dateOpen, setDateOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [workspace, setWorkspace] = React.useState(Data.workspaces[0]);
  const [modelFilter, setModelFilter] = React.useState(Data.modelFilters[0]);
  const [dateLabel, setDateLabel] = React.useState(Data.datePresets[2].range);

  function closeAll() {
    setWsOpen(false); setModelOpen(false); setDateOpen(false); setExportOpen(false);
  }

  function handleExport(format: 'csv' | 'pdf' | 'xls') {
    setExportOpen(false);
    if (format === 'csv') {
      const headers = ['Section', 'Item', 'Value', 'Status'];
      const rows: (string)[][] = [
        ['Agents', Data.agents.length.toString(), `${Data.agents.filter(a => a.status === 'running').length} running`, 'operational'],
        ['Token usage', 'Total tokens', `${Data.tokenUsage.total}M`, 'ok'],
        ['Cost', 'Spent', `$${Data.tokenUsage.cost}`, 'ok'],
        ['API health', 'Success rate', `${Data.apiHealth.successRate}%`, 'operational'],
        ['Prompt runs', Data.promptRuns.length.toString(), `${Data.promptRuns.filter(p => p.status === 'success').length} success`, 'live'],
        ['Evals', Data.evalResults.length.toString(), `${Data.evalResults.filter(e => e.trend === 'up').length} improving`, 'ok'],
        ['Automations', Data.automationTasks.length.toString(), `${Data.automationTasks.filter(a => a.queue === 'running').length} running`, 'live'],
      ];
      const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-workspace-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: 'CSV exported', description: `${rows.length} workspace metrics downloaded` });
    } else {
      toast({ title: `${format.toUpperCase()} export prepared`, description: `Your ${format.toUpperCase()} report is being generated.` });
    }
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span>Dashboards</span>
          <ChevronRight className="size-3 text-[var(--text-faint)]" />
          <span className="text-[var(--text-strong)]">AI Workspace</span>
        </nav>
        <h1 className="ds-page-title">AI Operations Workspace</h1>
        <p className="mt-1.5 text-sm text-[var(--text-muted)]">
          Monitor agents, prompts, model usage, token cost, automations, and eval quality.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)] px-2.5 py-1.5 dark:bg-[rgba(18,183,106,0.1)]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" />
          </span>
          <span className="text-xs font-medium text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live · synced 8s ago</span>
        </div>

        {/* Workspace selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setWsOpen((p) => !p); closeAllExcept('ws', setWsOpen, setModelOpen, setDateOpen, setExportOpen); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
          >
            <span className="size-2 rounded-full" style={{ background: workspace.color }} />
            <span className="hidden sm:inline">{workspace.name}</span>
            <span className="sm:hidden">WS</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', wsOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={wsOpen} onClose={() => setWsOpen(false)} width={240}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Workspace</p></div>
            {Data.workspaces.map((w) => (
              <PopoverItem key={w.id} active={workspace.id === w.id} onClick={() => { setWorkspace(w); setWsOpen(false); toast({ title: 'Workspace switched', description: w.name }); }}>
                <span className="flex w-full items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: w.color }} />
                  <span className="flex-1">
                    <span className="block">{w.name}</span>
                    <span className="block text-[10px] text-[var(--text-muted)]">{w.detail}</span>
                  </span>
                </span>
              </PopoverItem>
            ))}
          </Popover>
        </div>

        {/* Model filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setModelOpen((p) => !p); closeAllExcept('model', setWsOpen, setModelOpen, setDateOpen, setExportOpen); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
          >
            <Filter className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{modelFilter.name}</span>
            <span className="sm:hidden">Model</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', modelOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={modelOpen} onClose={() => setModelOpen(false)} width={220}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Model</p></div>
            {Data.modelFilters.map((m) => (
              <PopoverItem key={m.id} active={modelFilter.id === m.id} onClick={() => { setModelFilter(m); setModelOpen(false); toast({ title: 'Model filter applied', description: m.name }); }}>
                <span className="flex w-full items-center justify-between gap-2">
                  <span>{m.name}</span>
                  {m.detail && <span className="text-[10px] text-[var(--text-muted)]">{m.detail}</span>}
                </span>
              </PopoverItem>
            ))}
          </Popover>
        </div>

        {/* Date range */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setDateOpen((p) => !p); closeAllExcept('date', setWsOpen, setModelOpen, setDateOpen, setExportOpen); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
          >
            <CalendarDays className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{dateLabel}</span>
            <span className="sm:hidden">Date</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', dateOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={dateOpen} onClose={() => setDateOpen(false)} width={240}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Date range</p></div>
            {Data.datePresets.map((p) => (
              <PopoverItem key={p.key} active={dateLabel === p.range} onClick={() => { setDateLabel(p.range); setDateOpen(false); toast({ title: 'Date range updated', description: p.label }); }}>{p.label}</PopoverItem>
            ))}
          </Popover>
        </div>

        {/* Export */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setExportOpen((p) => !p); closeAllExcept('export', setWsOpen, setModelOpen, setDateOpen, setExportOpen); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
          >
            <Download className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">Export</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', exportOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={exportOpen} onClose={() => setExportOpen(false)} width={180}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Export format</p></div>
            <PopoverItem icon={Download} onClick={() => handleExport('csv')}>Export CSV</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('pdf')}>Export PDF</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('xls')}>Export XLS</PopoverItem>
          </Popover>
        </div>

        {/* New agent */}
        <button
          type="button"
          onClick={onNewAgent}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"
        >
          <Plus className="size-4" strokeWidth={2.5} />New agent
        </button>
      </div>
    </div>
  );
}
function closeAllExcept(_which: string, setWsOpen: (f: boolean | ((p: boolean) => boolean)) => void, setModelOpen: (f: boolean | ((p: boolean) => boolean)) => void, setDateOpen: (f: boolean | ((p: boolean) => boolean)) => void, setExportOpen: (f: boolean | ((p: boolean) => boolean)) => void) {
  setWsOpen(false); setModelOpen(false); setDateOpen(false); setExportOpen(false);
}

/* ============================================================
   Agent Operations Canvas — SVG node graph with animated flows
   ============================================================ */
function AgentCanvas({ onAgentClick, agents }: { onAgentClick: (a: Agent) => void; agents: Agent[] }) {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [tooltip, setTooltip] = React.useState<{ x: number; y: number; agent: Agent } | null>(null);

  const agentsById = React.useMemo(() => {
    const map: Record<string, Agent> = {};
    agents.forEach((a) => { map[a.id] = a; });
    return map;
  }, [agents]);

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <Workflow className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Agent Operations Canvas</h2>
            <p className="text-xs text-[var(--text-muted)]">Six connected agents — router dispatches, research enriches, content routes to review.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 px-3 py-1.5 text-[10px] font-medium text-[var(--text-muted)] sm:flex">
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[var(--color-success-500)]" />Running</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[var(--color-info-500)]" />Idle</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[var(--color-warning-500)]" />Queued</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[var(--color-error-500)]" />Error</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" /></span>Live
          </span>
          <CardActionMenu cardName="Agent Canvas" />
        </div>
      </div>

      {/* Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[linear-gradient(rgba(70,95,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(70,95,255,0.04)_1px,transparent_1px)] bg-[length:32px_32px] dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:32px_32px]">
        <svg viewBox="0 0 100 100" className="h-[360px] w-full sm:h-[460px]" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
          <defs>
            {/* Animated flow markers */}
            <marker id="arrow-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-brand-400)" />
            </marker>
            {/* Glow filter */}
            <filter id="agent-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          {Data.agentConnections.map((conn, i) => {
            const from = agentsById[conn.from];
            const to = agentsById[conn.to];
            if (!from || !to) return null;
            // Curved bezier path
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2;
            // Add slight curve
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const ctrlX = mx + (Math.abs(dy) > Math.abs(dx) ? dx * 0.2 : 0);
            const ctrlY = my + (Math.abs(dy) > Math.abs(dx) ? 0 : dy * 0.2);
            const path = `M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`;
            const isActive = hovered === conn.from || hovered === conn.to;
            return (
              <g key={i}>
                {/* base line */}
                <path
                  d={path}
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth={isActive ? 0.5 : 0.3}
                  strokeDasharray="0.6 0.6"
                  opacity={isActive ? 0.8 : 0.5}
                />
                {/* animated flow */}
                <path
                  d={path}
                  fill="none"
                  stroke="var(--color-brand-500)"
                  strokeWidth={isActive ? 0.5 : 0.35}
                  strokeDasharray="1.2 4"
                  opacity={isActive ? 0.95 : 0.55}
                  markerEnd="url(#arrow-flow)"
                >
                  <animate attributeName="stroke-dashoffset" from="5.2" to="0" dur="1.6s" repeatCount="indefinite" />
                </path>
                {/* label */}
                <text x={mx} y={my - 1.5} textAnchor="middle" fontSize="1.6" fill="var(--text-subtle)" fontFamily="Outfit, sans-serif" fontWeight="500" opacity={isActive ? 1 : 0.6}>{conn.label}</text>
              </g>
            );
          })}

          {/* Agent nodes */}
          {agents.map((agent) => {
            const Icon = agentIcons[agent.icon];
            const isHovered = hovered === agent.id;
            const r = isHovered ? 6.5 : 6;
            const tone = statusTone(agent.status);
            const toneColor = tone === 'success' ? 'var(--color-success-500)' : tone === 'info' ? 'var(--color-info-500)' : tone === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)';
            return (
              <g
                key={agent.id}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(agent.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onAgentClick(agent)}
                filter={isHovered ? 'url(#agent-glow)' : undefined}
              >
                {/* outer ring (status pulse) */}
                <circle cx={agent.x} cy={agent.y} r={r + 1.5} fill="none" stroke={toneColor} strokeWidth="0.25" opacity="0.5" />
                {agent.status === 'running' && (
                  <circle cx={agent.x} cy={agent.y} r={r + 1.5} fill="none" stroke={toneColor} strokeWidth="0.2">
                    <animate attributeName="r" from={r} to={r + 2.5} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* body */}
                <circle cx={agent.x} cy={agent.y} r={r} fill="var(--card)" stroke={agent.color} strokeWidth={isHovered ? 0.6 : 0.4} />
                <circle cx={agent.x} cy={agent.y} r={r - 1.2} fill={agent.color} opacity={0.18} />
                {/* icon (foreignObject for SVG icon) */}
                <g transform={`translate(${agent.x - 1.8}, ${agent.y - 1.8})`}>
                  <foreignObject width="3.6" height="3.6">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: agent.color }}>
                      <Icon style={{ width: '100%', height: '100%' }} strokeWidth={2.4} />
                    </div>
                  </foreignObject>
                </g>
                {/* status dot */}
                <circle cx={agent.x + r - 0.8} cy={agent.y - r + 0.8} r="1.1" fill={toneColor} stroke="var(--card)" strokeWidth="0.2" />

                {/* label below */}
                <text x={agent.x} y={agent.y + r + 2.2} textAnchor="middle" fontSize="2" fill="var(--text-strong)" fontFamily="Outfit, sans-serif" fontWeight="600">{agent.shortName}</text>
                <text x={agent.x} y={agent.y + r + 4.2} textAnchor="middle" fontSize="1.5" fill="var(--text-muted)" fontFamily="Outfit, sans-serif" fontWeight="500">{agent.runsToday.toLocaleString()} runs · {agent.avgLatency}</text>
              </g>
            );
          })}
        </svg>

        {/* Custom tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-20 w-56 rounded-xl border border-[var(--border)] bg-[var(--popover)] p-3 shadow-lg"
            style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -110%)', animation: 'ecomPopoverIn 140ms ease-out' }}
          >
            <p className="text-xs font-semibold text-[var(--text-strong)]">{tooltip.agent.name}</p>
            <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">{tooltip.agent.model} · {statusLabel(tooltip.agent.status)}</p>
          </div>
        )}
      </div>

      {/* Agent quick stats strip */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {agents.map((agent) => {
          const Icon = agentIcons[agent.icon];
          const tone = statusTone(agent.status);
          return (
            <button
              key={agent.id}
              type="button"
              onClick={() => onAgentClick(agent)}
              onMouseEnter={() => setHovered(agent.id)}
              onMouseLeave={() => setHovered(null)}
              className={cn('group flex cursor-pointer flex-col gap-1.5 rounded-xl border p-2.5 text-left transition', hovered === agent.id ? 'border-[var(--color-brand-300)] bg-[var(--surface-sunken)]/60' : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)]/50')}
            >
              <div className="flex items-center gap-1.5">
                <span className="inline-flex size-6 items-center justify-center rounded-md" style={{ background: agent.accent, color: agent.color }}>
                  <Icon className="size-3.5" strokeWidth={2.2} />
                </span>
                <span className="truncate text-[11px] font-semibold text-[var(--text-strong)]">{agent.shortName}</span>
                <span className="ml-auto size-1.5 rounded-full" style={{ background: tone === 'success' ? 'var(--color-success-500)' : tone === 'info' ? 'var(--color-info-500)' : tone === 'warning' ? 'var(--color-warning-500)' : 'var(--color-error-500)' }} />
              </div>
              <div className="flex items-center justify-between text-[10px] tabular-nums text-[var(--text-muted)]">
                <span>{agent.runsToday.toLocaleString()} runs</span>
                <span>{agent.successRate}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Token Usage — donut with hover-updated center
   ============================================================ */
function TokenUsageCard() {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);
  const models = Data.tokenUsage.byModel;
  const active = activeIdx !== null ? models[activeIdx] : null;
  const centerValue = active ? `${active.tokens}M` : `${Data.tokenUsage.total}M`;
  const centerLabel = active ? `${active.name} tokens` : 'Total tokens';
  const centerCost = active ? `$${active.cost}` : `$${Data.tokenUsage.cost}`;

  const options: any = {
    chart: { type: 'donut', height: 220, fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, animations: { enabled: true, speed: 700, animateGradually: { enabled: true, delay: 50 } } },
    labels: models.map((m) => m.name),
    colors: models.map((m) => m.color),
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '76%',
          background: 'transparent',
          labels: {
            show: true,
            name: { show: false },
            value: { show: false },
            total: { show: false },
          },
        },
        expandOnClick: true,
      },
    },
    legend: { show: false },
    tooltip: { enabled: false },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
  };

  const chartSeries = models.map((m) => m.tokens);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <Zap className="size-4" strokeWidth={2} />
          </span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">Token Usage</h3>
        </div>
        <CardActionMenu cardName="Token Usage" />
      </div>

      <div className="relative">
        <Chart options={options} series={chartSeries} type="donut" height={220} />
        {/* Center overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{centerLabel}</p>
          <p className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{centerValue}</p>
          <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[var(--surface-sunken)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-body)]">
            <DollarSign className="size-2.5" strokeWidth={2.2} />{centerCost}
          </div>
        </div>
      </div>

      {/* Legend with hover handlers */}
      <div className="mt-3 space-y-1.5">
        {models.map((m, i) => (
          <button
            key={m.name}
            type="button"
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
            className={cn('flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition', activeIdx === i ? 'bg-[var(--surface-sunken)]' : 'hover:bg-[var(--surface-sunken)]/60')}
          >
            <ModelMark color={m.color} label={m.name} size={16} />
            <span className="flex-1 text-xs font-medium text-[var(--text-body)]">{m.name}</span>
            <span className="text-xs font-semibold tabular-nums text-[var(--text-strong)]">{m.tokens}M</span>
            <span className="w-10 text-right text-[10px] tabular-nums text-[var(--text-muted)]">{m.share}%</span>
          </button>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Input</p>
          <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.tokenUsage.input}M</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Output</p>
          <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.tokenUsage.output}M</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg bg-[var(--surface-sunken)]/60 px-3 py-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Total cost</p>
          <p className="text-base font-semibold tabular-nums text-[var(--text-strong)]">${Data.tokenUsage.cost}</p>
        </div>
        <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', Data.tokenUsage.costChangeDir === 'up' ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]')}>
          {Data.tokenUsage.costChangeDir === 'up' ? <ArrowUp className="size-3" strokeWidth={2.5} /> : <ArrowDown className="size-3" strokeWidth={2.5} />}
          {Data.tokenUsage.costChange}% vs last period
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   API Health — compact status grid
   ============================================================ */
function ApiHealthCard() {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const cells = [
    { id: 'success', label: 'Success rate', value: `${Data.apiHealth.successRate}%`, icon: CheckCircle2, color: 'var(--color-success-500)', tone: 'success' as const },
    { id: 'p95', label: 'P95 latency', value: Data.apiHealth.p95Latency, icon: Gauge, color: 'var(--color-info-500)', tone: 'info' as const },
    { id: 'error', label: 'Error rate', value: `${Data.apiHealth.errorRate}%`, icon: AlertCircle, color: 'var(--color-warning-500)', tone: 'warning' as const },
    { id: 'rl', label: 'Rate limit hits', value: `${Data.apiHealth.rateLimitHits}`, icon: AlertTriangle, color: 'var(--color-error-500)', tone: 'error' as const },
  ];
  // Mini sparkline
  const sl = Data.apiHealth.sparkline;
  const max = Math.max(...sl), min = Math.min(...sl), range = max - min || 1;
  const slPoints = sl.map((v, i) => `${(i / (sl.length - 1)) * 100},${30 - ((v - min) / range) * 24 - 3}`).join(' ');
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <Activity className="size-4" strokeWidth={2} />
          </span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">API Health</h3>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
          <span className="size-1.5 rounded-full bg-[var(--color-success-500)]" />Operational
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {cells.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              className={cn('rounded-xl border p-2.5 transition', hovered === c.id ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]/60' : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30')}
            >
              <div className="flex items-center gap-1.5">
                <Icon className="size-3.5" strokeWidth={2.2} style={{ color: c.color }} />
                <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{c.label}</p>
              </div>
              <p className="mt-1 text-lg font-semibold tabular-nums text-[var(--text-strong)]">{c.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Requests / min</p>
          <p className="text-xs font-semibold tabular-nums text-[var(--text-strong)]">{Data.apiHealth.requestsPerMin.toLocaleString()}</p>
        </div>
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-8 w-full">
          <defs>
            <linearGradient id="ai-health-spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,30 ${slPoints} 100,30`} fill="url(#ai-health-spark)" />
          <polyline points={slPoints} fill="none" stroke="var(--color-brand-500)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="mt-3 space-y-1.5">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Recent incidents</p>
        {Data.apiHealth.recentIncidents.map((inc, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg bg-[var(--surface-sunken)]/40 px-2.5 py-1.5">
            <span className={cn('mt-1 size-1.5 flex-shrink-0 rounded-full', inc.severity === 'warning' ? 'bg-[var(--color-warning-500)]' : 'bg-[var(--color-info-500)]')} />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-[var(--text-body)]">{inc.detail}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{inc.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Model Performance Matrix
   ============================================================ */
function ModelPerformanceMatrix({ onModelClick }: { onModelClick: (m: Data.ModelPerf) => void }) {
  const [hovered, setHovered] = React.useState<{ row: string; col: string } | null>(null);

  function scoreColor(score: number, kind: 'quality' | 'latency' | 'cost' | 'tools'): string {
    // higher is better for quality, tools; lower is better for latency, cost
    if (kind === 'quality' || kind === 'tools') {
      if (score >= 90) return 'rgba(18,183,106,0.18)';
      if (score >= 80) return 'rgba(70,95,255,0.16)';
      if (score >= 70) return 'rgba(247,144,9,0.16)';
      return 'rgba(240,68,56,0.16)';
    }
    // latency/cost — invert
    if (score >= 90) return 'rgba(18,183,106,0.18)';
    if (score >= 80) return 'rgba(70,95,255,0.16)';
    if (score >= 70) return 'rgba(247,144,9,0.16)';
    return 'rgba(240,68,56,0.16)';
  }
  function scoreTextColor(score: number): string {
    if (score >= 90) return 'var(--color-success-700)';
    if (score >= 80) return 'var(--color-brand-700)';
    if (score >= 70) return 'var(--color-warning-700)';
    return 'var(--color-error-600)';
  }
  // Normalized 0-100 scores for color cells (latency & cost inverted)
  function normalizedScore(m: Data.ModelPerf, col: string): number {
    switch (col) {
      case 'quality': return m.metrics.quality;
      case 'latency': {
        // latency 0ms=100, 5000ms=0
        return Math.max(0, Math.min(100, 100 - (m.metrics.latency / 50)));
      }
      case 'cost': {
        // $0=100, $0.008=0
        return Math.max(0, Math.min(100, 100 - (m.metrics.costPer1K / 0.008) * 100));
      }
      case 'tools': return m.metrics.toolSuccess;
      default: return 0;
    }
  }

  const cols = [
    { key: 'quality', label: 'Quality', hint: 'Eval score (0-100) from prompt quality evals' },
    { key: 'latency', label: 'Latency', hint: 'P95 latency in seconds — lower is better' },
    { key: 'cost', label: 'Cost / 1K', hint: 'USD per 1K tokens — lower is better' },
    { key: 'tools', label: 'Tool success', hint: 'Tool calling success rate (0-100)' },
    { key: 'context', label: 'Context', hint: 'Maximum context window in tokens' },
  ];

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-violet-50,#f5f3ff)] text-[#7A5AF8] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#9b85f5]">
            <Cpu className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Model Performance Matrix</h2>
            <p className="text-xs text-[var(--text-muted)]">Comparison across quality, latency, cost, tool success, and context length.</p>
          </div>
        </div>
        <CardActionMenu cardName="Model Performance" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-1 pr-3 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Model</th>
              {cols.map((c) => (
                <th
                  key={c.key}
                  onMouseEnter={() => setHovered({ row: 'header', col: c.key })}
                  onMouseLeave={() => setHovered(null)}
                  className="px-2 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]"
                >
                  <span className="relative inline-block">
                    {c.label}
                    {hovered?.col === c.key && hovered.row === 'header' && (
                      <span className="absolute -top-9 left-1/2 z-10 w-44 -translate-x-1/2 rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2 text-[10px] font-normal normal-case tracking-normal text-[var(--text-body)] shadow-lg" style={{ animation: 'ecomPopoverIn 140ms ease-out' }}>
                        {c.hint}
                      </span>
                    )}
                  </span>
                </th>
              ))}
              <th className="px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Share</th>
              <th className="py-2.5 pl-2 pr-1"></th>
            </tr>
          </thead>
          <tbody>
            {Data.modelPerformance.map((m) => {
              return (
                <tr
                  key={m.id}
                  onClick={() => onModelClick(m)}
                  className="group cursor-pointer border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40"
                >
                  <td className="py-3 pl-1 pr-3">
                    <div className="flex items-center gap-2.5">
                      <ModelMark color={m.logoColor} label={m.provider} size={28} />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-[var(--text-strong)]">{m.name}</p>
                        <p className="truncate text-[10px] text-[var(--text-muted)]">{m.provider}</p>
                      </div>
                    </div>
                  </td>
                  {/* Quality */}
                  <td
                    onMouseEnter={() => setHovered({ row: m.id, col: 'quality' })}
                    onMouseLeave={() => setHovered(null)}
                    className="px-2 py-3"
                  >
                    <CellScore score={normalizedScore(m, 'quality')} kind="quality" display={m.display.quality} hovered={hovered?.row === m.id && hovered?.col === 'quality'} hint="Quality eval score (0-100)" />
                  </td>
                  <td
                    onMouseEnter={() => setHovered({ row: m.id, col: 'latency' })}
                    onMouseLeave={() => setHovered(null)}
                    className="px-2 py-3"
                  >
                    <CellScore score={normalizedScore(m, 'latency')} kind="latency" display={m.display.latency} hovered={hovered?.row === m.id && hovered?.col === 'latency'} hint={`P95 latency — ${m.display.latency}`} />
                  </td>
                  <td
                    onMouseEnter={() => setHovered({ row: m.id, col: 'cost' })}
                    onMouseLeave={() => setHovered(null)}
                    className="px-2 py-3"
                  >
                    <CellScore score={normalizedScore(m, 'cost')} kind="cost" display={m.display.costPer1K} hovered={hovered?.row === m.id && hovered?.col === 'cost'} hint={`$${m.metrics.costPer1K} per 1K tokens`} />
                  </td>
                  <td
                    onMouseEnter={() => setHovered({ row: m.id, col: 'tools' })}
                    onMouseLeave={() => setHovered(null)}
                    className="px-2 py-3"
                  >
                    <CellScore score={normalizedScore(m, 'tools')} kind="tools" display={m.display.toolSuccess} hovered={hovered?.row === m.id && hovered?.col === 'tools'} hint="Tool calling success rate" />
                  </td>
                  <td className="px-2 py-3 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-xs font-medium tabular-nums text-[var(--text-body)]">{m.display.contextLength}</span>
                      <div className="mt-0.5 h-1 w-12 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${Math.min(100, (m.metrics.contextLength / 20))}%`, background: m.logoColor, animation: 'ecomFadeIn 600ms ease-out' }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-medium tabular-nums text-[var(--text-body)]">{m.share}%</span>
                  </td>
                  <td className="py-3 pl-2 pr-1 text-right">
                    <ChevronRight className="size-3.5 text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100" strokeWidth={2.2} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CellScore({ score, kind, display, hovered, hint }: { score: number; kind: 'quality' | 'latency' | 'cost' | 'tools'; display: string; hovered: boolean; hint: string }) {
  const bg = score >= 90 ? 'rgba(18,183,106,0.16)' : score >= 80 ? 'rgba(70,95,255,0.14)' : score >= 70 ? 'rgba(247,144,9,0.16)' : 'rgba(240,68,56,0.16)';
  const text = score >= 90 ? 'var(--color-success-700)' : score >= 80 ? 'var(--color-brand-700)' : score >= 70 ? 'var(--color-warning-700)' : 'var(--color-error-600)';
  const darkText = score >= 90 ? 'var(--color-success-500)' : score >= 80 ? 'var(--color-brand-300)' : score >= 70 ? 'var(--color-warning-500)' : 'var(--color-error-500)';
  return (
    <div className="relative flex justify-center">
      <div
        className="inline-flex min-w-[64px] items-center justify-center rounded-lg px-2 py-1.5 text-[11px] font-semibold tabular-nums transition"
        style={{ background: bg, color: `var(--text-strong)` }}
      >
        <span style={{ color: text }} className="dark:hidden">{display}</span>
        <span style={{ color: darkText }} className="hidden dark:inline">{display}</span>
      </div>
      {hovered && (
        <div className="absolute -top-9 left-1/2 z-10 w-44 -translate-x-1/2 rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2 text-[10px] font-normal text-[var(--text-body)] shadow-lg" style={{ animation: 'ecomPopoverIn 140ms ease-out' }}>
          {hint}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Prompt Run Stream — live event stream
   ============================================================ */
function promptStatusTone(s: PromptRun['status']): 'success' | 'error' | 'warning' | 'info' {
  switch (s) {
    case 'success': return 'success';
    case 'failed': return 'error';
    case 'review': return 'warning';
    case 'retry': return 'warning';
    case 'running': return 'info';
  }
}
const promptStatusIcons: Record<PromptRun['status'], React.ElementType> = {
  success: CheckCircle2,
  failed: XCircle,
  review: AlertCircle,
  retry: RefreshCw,
  running: Activity,
};
const promptTypeIcons: Record<PromptRun['type'], React.ElementType> = {
  summarization: FileText,
  review: Code2,
  research: FileSearch,
  rewrite: PencilLine,
  sql: Database,
  support: MessageSquare,
};

function PromptRunStream({ onRunClick }: { onRunClick: (r: PromptRun) => void }) {
  const [hovered, setHovered] = React.useState<string | null>(null);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]">
            <Activity className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Prompt Run Stream</h2>
            <p className="text-xs text-[var(--text-muted)]">Live event stream — hover for prompt preview, click for run detail.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" /></span>Streaming
          </span>
          <CardActionMenu cardName="Prompt Run Stream" />
        </div>
      </div>

      <ul className="space-y-2">
        {Data.promptRuns.map((r) => {
          const SIcon = promptStatusIcons[r.status];
          const TIcon = promptTypeIcons[r.type];
          const tone = promptStatusTone(r.status);
          const toneColor = tone === 'success' ? 'var(--color-success-500)' : tone === 'error' ? 'var(--color-error-500)' : tone === 'warning' ? 'var(--color-warning-500)' : 'var(--color-info-500)';
          const isHovered = hovered === r.id;
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => onRunClick(r)}
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(null)}
                className={cn('group flex w-full items-start gap-3 rounded-xl border p-3 text-left transition', isHovered ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]/60' : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20 hover:bg-[var(--surface-sunken)]/40')}
              >
                {/* timeline marker */}
                <div className="flex flex-col items-center gap-1 pt-0.5">
                  <span className="inline-flex size-7 items-center justify-center rounded-lg" style={{ background: `${toneColor}22`, color: toneColor }}>
                    <TIcon className="size-3.5" strokeWidth={2.2} />
                  </span>
                  <div className="h-3 w-px bg-[var(--border-subtle)]" />
                </div>
                {/* body */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-[var(--text-strong)]">{r.title}</p>
                    <StatusBadge tone={tone} dot>{r.status}</StatusBadge>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">{r.agent} · {r.model}</p>
                  {/* hover preview */}
                  <div className={cn('grid transition-all duration-200', isHovered ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                    <div className="overflow-hidden">
                      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] p-2.5">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Prompt preview</p>
                        <p className="mt-1 line-clamp-2 text-[11px] text-[var(--text-body)]">{r.promptPreview}</p>
                        <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Output summary</p>
                        <p className="mt-1 text-[11px] text-[var(--text-body)]">{r.outputSummary}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* meta */}
                <div className="flex flex-shrink-0 flex-col items-end gap-1 text-[10px] tabular-nums text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1"><Clock className="size-2.5" strokeWidth={2.2} />{r.latency}</span>
                  <span className="inline-flex items-center gap-1"><Zap className="size-2.5" strokeWidth={2.2} />{r.tokens}</span>
                  <span>{r.time}</span>
                </div>
                <ChevronRight className="mt-1 size-3.5 flex-shrink-0 text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100" strokeWidth={2.2} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ============================================================
   Eval Results — scorecard grid
   ============================================================ */
const evalCategoryIcons: Record<EvalResult['category'], React.ElementType> = {
  quality: Sparkles,
  accuracy: FileSearch,
  schema: CheckCircle2,
  code: Code2,
  safety: Shield,
  sla: Gauge,
};

function EvalResultsGrid() {
  const [hovered, setHovered] = React.useState<string | null>(null);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
            <ListChecks className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Eval Results</h2>
            <p className="text-xs text-[var(--text-muted)]">Quality scorecards across six eval tasks — hover for failing examples.</p>
          </div>
        </div>
        <CardActionMenu cardName="Eval Results" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Data.evalResults.map((e) => {
          const Icon = evalCategoryIcons[e.category];
          const trendUp = e.trend === 'up';
          const trendDown = e.trend === 'down';
          const meetingTarget = e.passRate >= e.target;
          const isHovered = hovered === e.id;
          return (
            <div
              key={e.id}
              onMouseEnter={() => setHovered(e.id)}
              onMouseLeave={() => setHovered(null)}
              className={cn('rounded-xl border p-3 transition', isHovered ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]/50' : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20 hover:border-[var(--border-strong)]')}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={cn('inline-flex size-7 items-center justify-center rounded-lg', meetingTarget ? 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]')}>
                    <Icon className="size-3.5" strokeWidth={2.2} />
                  </span>
                  <p className="text-xs font-medium text-[var(--text-strong)]">{e.task}</p>
                </div>
                <span className={cn('inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium', trendUp ? 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : trendDown ? 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>
                  {trendUp && <TrendingUp className="size-2.5" strokeWidth={2.5} />}
                  {trendDown && <TrendingDown className="size-2.5" strokeWidth={2.5} />}
                  {!trendUp && !trendDown && <Dot className="size-2.5" strokeWidth={2.5} />}
                  {e.passRate - e.prevPassRate > 0 ? '+' : ''}{(e.passRate - e.prevPassRate).toFixed(1)}
                </span>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className={cn('text-2xl font-semibold tabular-nums', meetingTarget ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]')}>{e.passRate}%</p>
                  <p className="text-[10px] text-[var(--text-muted)]">pass rate · target {e.target}%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold tabular-nums text-[var(--text-body)]">{e.regressions}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">regressions</p>
                </div>
              </div>
              {/* progress bar to target */}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                <div
                  className={cn('h-full rounded-full transition-all', meetingTarget ? 'bg-[var(--color-success-500)]' : 'bg-[var(--color-warning-500)]')}
                  style={{ width: `${Math.min(100, e.passRate)}%`, animation: 'ecomFadeIn 600ms ease-out' }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                <span>Last run {e.lastRun}</span>
                <span>Prev {e.prevPassRate}%</span>
              </div>
              {/* hover — failing examples */}
              <div className={cn('grid transition-all duration-200', isHovered ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                <div className="overflow-hidden">
                  <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] p-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{e.failingExamples.length > 0 ? 'Failing examples' : 'No failures'}</p>
                    {e.failingExamples.length > 0 ? (
                      <ul className="mt-1 space-y-0.5">
                        {e.failingExamples.map((ex, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[10px] text-[var(--text-body)]">
                            <span className="mt-1 size-1 flex-shrink-0 rounded-full bg-[var(--color-error-500)]" />
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-[10px] text-[var(--text-muted)]">All examples passed this run.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Automation Queue — board with 5 columns
   ============================================================ */
function AutomationBoard({ onTaskClick }: { onTaskClick: (t: AutomationTask) => void }) {
  const [tasks, setTasks] = React.useState<AutomationTask[]>(Data.automationTasks);
  const { toast } = useToast();
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [dragOver, setDragOver] = React.useState<QueueKey | null>(null);

  function handleDrop(target: QueueKey) {
    if (!dragging) return;
    setTasks((prev) => prev.map((t) => t.id === dragging ? { ...t, queue: target, lastRun: target === 'completed' ? 'Just now' : t.lastRun } : t));
    const t = tasks.find((x) => x.id === dragging);
    toast({ title: 'Task moved', description: `${t?.title} → ${Data.queueColumns.find(c => c.key === target)?.name}` });
    setDragging(null); setDragOver(null);
  }

  function handleRetry(id: string) {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, queue: 'running', lastRun: 'Running now', progress: 5 } : t));
    const t = tasks.find((x) => x.id === id);
    toast({ title: 'Task retried', description: `${t?.title} moved to Running queue` });
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-violet-50,#f5f3ff)] text-[#7A5AF8] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#9b85f5]">
            <Layers className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Automation Queue</h2>
            <p className="text-xs text-[var(--text-muted)]">Drag task cards between queues, or click a card to view detail.</p>
          </div>
        </div>
        <CardActionMenu cardName="Automation Queue" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Data.queueColumns.map((col) => {
          const colTasks = tasks.filter((t) => t.queue === col.key);
          const isOver = dragOver === col.key;
          return (
            <div
              key={col.key}
              onDragOver={(e) => { e.preventDefault(); setDragOver(col.key); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => handleDrop(col.key)}
              className={cn('flex flex-col rounded-xl border p-2.5 transition', isOver ? 'border-[var(--color-brand-400)] bg-[var(--color-brand-50)]/40 dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30')}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ background: col.color }} />
                  <p className="text-xs font-medium text-[var(--text-strong)]">{col.name}</p>
                </div>
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--surface-sunken)] px-1.5 text-[10px] font-semibold tabular-nums text-[var(--text-muted)]">{colTasks.length}</span>
              </div>
              <div className="flex max-h-[420px] flex-1 flex-col gap-2 overflow-y-auto modern-scrollbar pr-0.5">
                {colTasks.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-[var(--border-subtle)] py-6 text-center">
                    <p className="text-[10px] text-[var(--text-subtle)]">Drop tasks here</p>
                  </div>
                ) : colTasks.map((t) => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={() => setDragging(t.id)}
                    onDragEnd={() => { setDragging(null); setDragOver(null); }}
                    onClick={() => onTaskClick(t)}
                    className={cn('group cursor-pointer rounded-lg border p-2.5 transition', dragging === t.id ? 'opacity-50' : 'hover:border-[var(--border-strong)] hover:shadow-sm', 'border-[var(--border-subtle)] bg-[var(--card)]')}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <p className="text-[11px] font-medium leading-snug text-[var(--text-strong)]">{t.title}</p>
                      <span className={cn('flex-shrink-0 rounded px-1 py-0.5 text-[8px] font-semibold uppercase', t.priority === 'high' ? 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]' : t.priority === 'medium' ? 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>
                        {t.priority}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-[var(--text-muted)]">{t.agent}</p>
                    {t.schedule && <p className="mt-0.5 text-[10px] text-[var(--text-subtle)]">{t.schedule}</p>}
                    {t.progress !== undefined && (
                      <div className="mt-1.5">
                        <div className="flex items-center justify-between text-[9px] tabular-nums text-[var(--text-muted)]">
                          <span>Running</span><span>{t.progress}%</span>
                        </div>
                        <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                          <div className="h-full rounded-full bg-[var(--color-brand-500)]" style={{ width: `${t.progress}%`, animation: 'ecomFadeIn 600ms ease-out' }} />
                        </div>
                      </div>
                    )}
                    <div className="mt-1.5 flex items-center justify-between text-[9px] text-[var(--text-muted)]">
                      <span>{t.lastRun || t.nextRun}</span>
                      <span className="text-[var(--text-subtle)]">{t.owner.split(' ')[0]}</span>
                    </div>
                    {t.queue === 'failed' && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleRetry(t.id); }}
                        className="mt-1.5 inline-flex w-full items-center justify-center gap-1 rounded-md border border-[var(--border)] bg-[var(--card)] py-1 text-[10px] font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                      >
                        <RefreshCw className="size-2.5" strokeWidth={2.5} />Retry
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Cost Guardrails — gauge/ring with budget breakdown
   ============================================================ */
function CostGuardrails() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const spentPct = (Data.costGuardrails.spent / Data.costGuardrails.budget) * 100;
  const forecastPct = (Data.costGuardrails.forecast / Data.costGuardrails.budget) * 100;
  // gauge dimensions
  const size = 180, stroke = 14, r = (size - stroke) / 2, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const spentArc = (spentPct / 100) * circ;
  const forecastArc = (forecastPct / 100) * circ;
  const active = hovered !== null ? Data.costGuardrails.byModel[hovered] : null;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]">
            <Shield className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Cost Guardrails</h2>
            <p className="text-xs text-[var(--text-muted)]">Monthly AI spend vs budget — projected end-of-month burn shown in red.</p>
          </div>
        </div>
        <CardActionMenu cardName="Cost Guardrails" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.2fr]">
        {/* Gauge */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
              {/* track */}
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth={stroke} />
              {/* alert threshold marker (85%) */}
              <circle
                cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-warning-500)" strokeWidth={stroke}
                strokeDasharray={`${(Data.costGuardrails.alertThreshold / 100) * circ} ${circ}`}
                strokeLinecap="butt"
                opacity="0.18"
              />
              {/* forecast (lighter) */}
              <circle
                cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-error-400,#f78484)" strokeWidth={stroke}
                strokeDasharray={`${forecastArc} ${circ}`}
                strokeLinecap="round"
                opacity="0.4"
              >
                <animate attributeName="stroke-dasharray" from={`0 ${circ}`} to={`${forecastArc} ${circ}`} dur="900ms" fill="freeze" />
              </circle>
              {/* spent (solid) */}
              <circle
                cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-brand-500)" strokeWidth={stroke}
                strokeDasharray={`${spentArc} ${circ}`}
                strokeLinecap="round"
              >
                <animate attributeName="stroke-dasharray" from={`0 ${circ}`} to={`${spentArc} ${circ}`} dur="900ms" fill="freeze" />
              </circle>
            </svg>
            {/* center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{active ? active.name : 'Spent'}</p>
              <p className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{active ? `$${active.cost}` : `$${Data.costGuardrails.spent}`}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{active ? `${active.share}% of spend` : `of $${Data.costGuardrails.budget} budget`}</p>
            </div>
          </div>
          <div className="mt-3 grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-[var(--surface-sunken)]/40 p-2">
              <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Spent</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{spentPct.toFixed(0)}%</p>
            </div>
            <div className="rounded-lg bg-[var(--surface-sunken)]/40 p-2">
              <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Forecast</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">{forecastPct.toFixed(0)}%</p>
            </div>
            <div className="rounded-lg bg-[var(--surface-sunken)]/40 p-2">
              <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Alert at</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.costGuardrails.alertThreshold}%</p>
            </div>
          </div>
        </div>

        {/* Model cost breakdown */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-[var(--text-strong)]">Spend by model</p>
            <p className="text-[10px] text-[var(--text-muted)]">Forecast: ${Data.costGuardrails.forecast} by {Data.costGuardrails.projectedDate}</p>
          </div>
          <div className="space-y-1.5">
            {Data.costGuardrails.byModel.map((m, i) => (
              <button
                key={m.name}
                type="button"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={cn('flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition', hovered === i ? 'bg-[var(--surface-sunken)]' : 'hover:bg-[var(--surface-sunken)]/60')}
              >
                <ModelMark color={m.color} label={m.provider} size={16} />
                <span className="flex-1 text-xs font-medium text-[var(--text-body)]">{m.name}</span>
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                  <div className="h-full rounded-full" style={{ width: `${m.share}%`, background: m.color, animation: 'ecomFadeIn 600ms ease-out' }} />
                </div>
                <span className="w-12 text-right text-xs font-semibold tabular-nums text-[var(--text-strong)]">${m.cost}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-[var(--color-warning-200,rgba(247,144,9,0.3))] bg-[var(--color-warning-50)]/60 p-2.5 dark:bg-[rgba(247,144,9,0.08)]">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]" strokeWidth={2.2} />
              <p className="text-[11px] text-[var(--color-warning-700)] dark:text-[var(--color-warning-400)]">
                Forecast at <span className="font-semibold">${Data.costGuardrails.forecast}</span> on {Data.costGuardrails.projectedDate} — {forecastPct.toFixed(0)}% of monthly budget. Will cross alert threshold ({Data.costGuardrails.alertThreshold}%) in 9 days at current burn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Prompt Library — prompt cards
   ============================================================ */
const promptCategoryIcons: Record<Data.Prompt['category'], React.ElementType> = {
  support: MessageSquare,
  seo: BarChart3,
  sql: Database,
  code: Code2,
  notes: FileText,
};

function PromptLibrary() {
  const { toast } = useToast();
  const [hovered, setHovered] = React.useState<string | null>(null);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]">
            <FileText className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Prompt Library</h2>
            <p className="text-xs text-[var(--text-muted)]">Versioned prompts with success rates — hover for run, edit, duplicate actions.</p>
          </div>
        </div>
        <CardActionMenu cardName="Prompt Library" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Data.promptLibrary.map((p) => {
          const Icon = promptCategoryIcons[p.category];
          const isHovered = hovered === p.id;
          return (
            <div
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className="group flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20 p-3.5 transition hover:border-[var(--border-strong)] hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
                    <Icon className="size-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-strong)]">{p.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{p.version} · {p.runs.toLocaleString()} runs</p>
                  </div>
                </div>
                <span className="rounded-full bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--text-muted)]">{p.version}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-[11px] text-[var(--text-body)]">{p.description}</p>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span key={t} className="inline-flex items-center rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--text-muted)]">#{t}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2.5">
                <div className="flex items-center gap-2">
                  <UserAvatar name={p.owner} size="xs" />
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)]">{p.owner}</p>
                    <p className="text-[9px] text-[var(--text-subtle)]">Last run {p.lastRun}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{p.successRate}%</p>
                  <p className="text-[9px] text-[var(--text-muted)]">success</p>
                </div>
              </div>
              {/* Hover actions */}
              <div className={cn('mt-2 grid grid-cols-3 gap-1.5 transition-all duration-200', isHovered ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                <div className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toast({ title: 'Prompt run started', description: `${p.name} ${p.version} queued` })}
                    className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-[var(--color-brand-500)] px-2 py-1.5 text-[10px] font-medium text-white transition hover:bg-[var(--color-brand-600)]"
                  >
                    <Play className="size-2.5" strokeWidth={2.5} />Run
                  </button>
                </div>
                <div className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toast({ title: 'Opening editor', description: p.name })}
                    className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1.5 text-[10px] font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                  >
                    <PencilLine className="size-2.5" strokeWidth={2.2} />Edit
                  </button>
                </div>
                <div className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toast({ title: 'Prompt duplicated', description: `${p.name} copy added to library` })}
                    className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1.5 text-[10px] font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                  >
                    <Copy className="size-2.5" strokeWidth={2.2} />Copy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Agent Detail Drawer
   ============================================================ */
function AgentDetailDrawer({ agent, onClose }: { agent: Agent | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!agent) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [agent, onClose]);

  if (!agent || typeof document === 'undefined') return null;
  const Icon = agentIcons[agent.icon];
  const tone = statusTone(agent.status);
  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Agent detail">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl" style={{ background: agent.accent, color: agent.color }}>
              <Icon className="size-4.5" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">{agent.name}</h3>
              <p className="text-xs text-[var(--text-muted)]">{agent.model} · {agent.owner}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <div className="flex items-center gap-2">
            <StatusBadge tone={tone} dot>{statusLabel(agent.status)}</StatusBadge>
            <span className="text-xs text-[var(--text-muted)]">Last run {agent.lastRun}</span>
          </div>
          <p className="text-sm text-[var(--text-body)]">{agent.description}</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Runs today</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{agent.runsToday.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Avg latency</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{agent.avgLatency}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Success rate</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{agent.successRate}%</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Tokens today</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{agent.tokensToday}</p>
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Tools</p>
            <div className="flex flex-wrap gap-1.5">
              {agent.tools.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-md bg-[var(--surface-sunken)] px-2 py-1 text-[11px] font-medium text-[var(--text-body)]">
                  <Terminal className="size-2.5" strokeWidth={2.2} />{t}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Configuration</p>
            <dl className="mt-1.5 space-y-1 text-xs">
              <div className="flex justify-between"><dt className="text-[var(--text-muted)]">Model</dt><dd className="font-medium text-[var(--text-strong)]">{agent.model}</dd></div>
              <div className="flex justify-between"><dt className="text-[var(--text-muted)]">Owner</dt><dd className="font-medium text-[var(--text-strong)]">{agent.owner}</dd></div>
              <div className="flex justify-between"><dt className="text-[var(--text-muted)]">Last run</dt><dd className="font-medium text-[var(--text-strong)]">{agent.lastRun}</dd></div>
            </dl>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Close</button>
          <button type="button" onClick={() => { onClose(); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]">Edit agent</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Prompt Run Detail Drawer
   ============================================================ */
function RunDetailDrawer({ run, onClose }: { run: PromptRun | null; onClose: () => void }) {
  const { toast } = useToast();
  React.useEffect(() => {
    if (!run) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [run, onClose]);

  if (!run || typeof document === 'undefined') return null;
  const SIcon = promptStatusIcons[run.status];
  const tone = promptStatusTone(run.status);
  const toneColor = tone === 'success' ? 'var(--color-success-500)' : tone === 'error' ? 'var(--color-error-500)' : tone === 'warning' ? 'var(--color-warning-500)' : 'var(--color-info-500)';
  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Run detail">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl" style={{ background: `${toneColor}22`, color: toneColor }}>
              <SIcon className="size-4.5" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">{run.title}</h3>
              <p className="text-xs text-[var(--text-muted)]">{run.id} · {run.time}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <div className="flex items-center gap-2">
            <StatusBadge tone={tone} dot>{run.status}</StatusBadge>
            <span className="text-xs text-[var(--text-muted)]">{run.agent} · {run.model}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Latency</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{run.latency}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Tokens</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{run.tokens}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Type</p>
              <p className="text-sm font-semibold capitalize text-[var(--text-strong)]">{run.type}</p>
            </div>
          </div>
          {run.sources && (
            <div className="rounded-xl border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)]/60 p-3 dark:bg-[rgba(18,183,106,0.08)]">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Citations</p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-[var(--text-strong)]">{run.sources} sources cited</p>
            </div>
          )}
          {run.variants && (
            <div className="rounded-xl border border-[var(--color-brand-200,rgba(70,95,255,0.3))] bg-[var(--color-brand-50)]/60 p-3 dark:bg-[rgba(70,95,255,0.08)]">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">Variants</p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-[var(--text-strong)]">{run.variants} generated</p>
            </div>
          )}
          <div>
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Prompt</p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3">
              <p className="text-xs leading-relaxed text-[var(--text-body)]">{run.promptPreview}</p>
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Output summary</p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3">
              <p className="text-xs leading-relaxed text-[var(--text-body)]">{run.outputSummary}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Close</button>
          <button type="button" onClick={() => { onClose(); toast({ title: 'Run retried', description: `${run.title} re-queued` }); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"><RefreshCw className="size-3.5" strokeWidth={2.5} />Re-run</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Automation Task Drawer
   ============================================================ */
function TaskDetailDrawer({ task, onClose }: { task: AutomationTask | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!task) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [task, onClose]);

  if (!task || typeof document === 'undefined') return null;
  const col = Data.queueColumns.find((c) => c.key === task.queue);
  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Task detail">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl" style={{ background: col?.accent, color: col?.color }}>
              <Workflow className="size-4.5" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">{task.title}</h3>
              <p className="text-xs text-[var(--text-muted)]">{task.id} · {col?.name}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <p className="text-sm text-[var(--text-body)]">{task.detail}</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Agent</p>
              <p className="text-sm font-medium text-[var(--text-strong)]">{task.agent}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Owner</p>
              <p className="text-sm font-medium text-[var(--text-strong)]">{task.owner}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Priority</p>
              <p className="text-sm font-medium capitalize text-[var(--text-strong)]">{task.priority}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Schedule</p>
              <p className="text-sm font-medium text-[var(--text-strong)]">{task.schedule || 'On demand'}</p>
            </div>
          </div>
          {task.progress !== undefined && (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--text-strong)]">Running</span>
                <span className="tabular-nums text-[var(--text-muted)]">{task.progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                <div className="h-full rounded-full bg-[var(--color-brand-500)]" style={{ width: `${task.progress}%`, animation: 'ecomFadeIn 600ms ease-out' }} />
              </div>
            </div>
          )}
          <div className="rounded-xl border border-[var(--border-subtle)] p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Timing</p>
            <dl className="mt-1.5 space-y-1 text-xs">
              {task.lastRun && <div className="flex justify-between"><dt className="text-[var(--text-muted)]">Last run</dt><dd className="font-medium text-[var(--text-strong)]">{task.lastRun}</dd></div>}
              {task.nextRun && <div className="flex justify-between"><dt className="text-[var(--text-muted)]">Next run</dt><dd className="font-medium text-[var(--text-strong)]">{task.nextRun}</dd></div>}
            </dl>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Close</button>
          <button type="button" onClick={() => { onClose(); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]">Edit task</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Model Detail Drawer (click model in matrix)
   ============================================================ */
function ModelDetailDrawer({ model, onClose }: { model: Data.ModelPerf | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!model) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [model, onClose]);

  if (!model || typeof document === 'undefined') return null;
  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Model detail">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ModelMark color={model.logoColor} label={model.provider} size={36} />
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">{model.name}</h3>
              <p className="text-xs text-[var(--text-muted)]">{model.provider} · {model.share}% of traffic</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <p className="text-sm text-[var(--text-body)]">{model.description}</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Quality</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{model.display.quality}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">P95 latency</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{model.display.latency}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Cost / 1K</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{model.display.costPer1K}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Tool success</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{model.display.toolSuccess}</p>
            </div>
            <div className="col-span-2 rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Context window</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{model.display.contextLength}</p>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[var(--text-strong)]">Status</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand-50)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
                <span className="size-1.5 rounded-full bg-[var(--color-brand-500)]" />{model.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Close</button>
          <button type="button" onClick={() => { onClose(); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]">Run test inference</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   New Agent Drawer — creates mock agent node + toast
   ============================================================ */
type NewAgentForm = {
  name: string;
  model: string;
  tools: string[];
  instructions: string;
  schedule: string;
  budget: string;
  owner: string;
};

function NewAgentDrawer({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (a: Agent) => void }) {
  const { toast } = useToast();
  const [form, setForm] = React.useState<NewAgentForm>({
    name: '',
    model: Data.agentModels[0],
    tools: [],
    instructions: '',
    schedule: Data.agentSchedules[0],
    budget: '50',
    owner: Data.agentOwners[0],
  });

  React.useEffect(() => {
    if (!open) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  function toggleTool(tool: string) {
    setForm((f) => ({ ...f, tools: f.tools.includes(tool) ? f.tools.filter((t) => t !== tool) : [...f.tools, tool] }));
  }

  function handleSubmit() {
    if (!form.name.trim()) return;
    // generate a position for the new node — scatter around perimeter
    const angle = Math.random() * 2 * Math.PI;
    const r = 38;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    const colors = ['#465FFF', '#12B76A', '#F79009', '#0BA5EC', '#7A5AF8', '#EC4899'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const newAgent: Agent = {
      id: `ag-${Date.now()}`,
      name: form.name.trim(),
      shortName: form.name.trim().split(' ')[0],
      status: 'queued',
      model: form.model,
      runsToday: 0,
      avgLatency: '—',
      successRate: 0,
      tokensToday: '0',
      owner: form.owner,
      description: form.instructions.trim() || `New agent created with ${form.model}. Awaiting first run.`,
      tools: form.tools.length > 0 ? form.tools : ['default-tool'],
      lastRun: 'Just created',
      x, y,
      color,
      accent: `${color}22`,
      icon: 'router',
    };
    onCreate(newAgent);
    toast({ title: 'Agent created', description: `${newAgent.name} queued on the canvas with model ${newAgent.model}.` });
    setForm({ name: '', model: Data.agentModels[0], tools: [], instructions: '', schedule: Data.agentSchedules[0], budget: '50', owner: Data.agentOwners[0] });
    onClose();
  }

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="New agent">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white">
              <Plus className="size-4.5" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">New Agent</h3>
              <p className="text-xs text-[var(--text-muted)]">Create a new agent node on the canvas.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Agent name <span className="text-[var(--color-error-600)]">*</span></label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Q&A Agent"
              className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
            />
          </div>
          {/* Model + Schedule */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Model</label>
              <select
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              >
                {Data.agentModels.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Schedule</label>
              <select
                value={form.schedule}
                onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              >
                {Data.agentSchedules.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {/* Owner + Budget */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Owner</label>
              <select
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              >
                {Data.agentOwners.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Budget limit ($/day)</label>
              <input
                type="number"
                min="1"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              />
            </div>
          </div>
          {/* Tools (multi-select chips) */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Tools <span className="text-[var(--text-muted)]">({form.tools.length} selected)</span></label>
            <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto modern-scrollbar rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)]/30 p-2.5">
              {Data.agentTools.map((t) => {
                const active = form.tools.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTool(t)}
                    className={cn('inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition', active ? 'bg-[var(--color-brand-500)] text-white' : 'bg-[var(--card)] text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}
                  >
                    {active && <CheckCircle2 className="size-2.5" strokeWidth={2.5} />}{t}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Instructions */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Instructions</label>
            <textarea
              value={form.instructions}
              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
              rows={4}
              placeholder="Describe what this agent should do, when to use it, and any constraints..."
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Cancel</button>
          <button type="button" onClick={handleSubmit} disabled={!form.name.trim()} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50">
            <Plus className="size-3.5" strokeWidth={2.5} />Create agent
          </button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Main AI Workspace Dashboard export
   ============================================================ */
export function AiWorkspaceDashboard() {
  const [agents, setAgents] = React.useState<Agent[]>(Data.agents);
  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null);
  const [selectedRun, setSelectedRun] = React.useState<PromptRun | null>(null);
  const [selectedTask, setSelectedTask] = React.useState<AutomationTask | null>(null);
  const [selectedModel, setSelectedModel] = React.useState<Data.ModelPerf | null>(null);
  const [newAgentOpen, setNewAgentOpen] = React.useState(false);

  function handleCreateAgent(a: Agent) {
    setAgents((prev) => [...prev, a]);
  }

  return (
    <div className="space-y-6">
      <AiHeader onNewAgent={() => setNewAgentOpen(true)} />

      {/* Hero: Agent Canvas (left, large) + Token Usage + API Health (right rail) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <AgentCanvas onAgentClick={setSelectedAgent} agents={agents} />
        <div className="flex flex-col gap-5">
          <TokenUsageCard />
          <ApiHealthCard />
        </div>
      </div>

      {/* Model Performance Matrix (full width) */}
      <ModelPerformanceMatrix onModelClick={setSelectedModel} />

      {/* Prompt Run Stream (full width) */}
      <PromptRunStream onRunClick={setSelectedRun} />

      {/* Eval Results (full width) */}
      <EvalResultsGrid />

      {/* Automation Queue board (full width) */}
      <AutomationBoard onTaskClick={setSelectedTask} />

      {/* Cost Guardrails (full width) */}
      <CostGuardrails />

      {/* Prompt Library (full width) */}
      <PromptLibrary />

      {/* Drawers */}
      <AgentDetailDrawer agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      <RunDetailDrawer run={selectedRun} onClose={() => setSelectedRun(null)} />
      <TaskDetailDrawer task={selectedTask} onClose={() => setSelectedTask(null)} />
      <ModelDetailDrawer model={selectedModel} onClose={() => setSelectedModel(null)} />
      <NewAgentDrawer open={newAgentOpen} onClose={() => setNewAgentOpen(false)} onCreate={handleCreateAgent} />
    </div>
  );
}

/* Back-compat alias for the existing page registry */
export const AiDashboard = AiWorkspaceDashboard;
