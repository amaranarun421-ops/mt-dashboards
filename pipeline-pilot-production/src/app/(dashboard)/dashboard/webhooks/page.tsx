'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { webhooks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Webhook, Plus, MoreHorizontal, Trash2, RefreshCw, Activity,
  CheckCircle2, XCircle, Clock, Zap, Bell, Copy, Pause, Play, ArrowRight,
  Handshake, UserPlus, Mail, FileText, AlertTriangle, Settings,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const EVENT_COLORS: Record<string, string> = {
  'deal.created': 'var(--accent)',
  'deal.stage_changed': 'var(--chart-1)',
  'deal.won': 'var(--success)',
  'deal.lost': 'var(--destructive)',
  'contact.created': 'var(--chart-3)',
  'contact.updated': 'var(--chart-2)',
  'notification.created': 'var(--chart-5)',
};

const EVENT_REFERENCE = [
  { id: 'e1', event: 'deal.created', description: 'Fired when a new deal is created in the system', icon: Handshake, color: 'var(--accent)', payload: 'deal_id, name, value, owner_id' },
  { id: 'e2', event: 'deal.stage_changed', description: 'Fired when a deal moves between pipeline stages', icon: ArrowRight, color: 'var(--chart-1)', payload: 'deal_id, from_stage, to_stage, timestamp' },
  { id: 'e3', event: 'deal.won', description: 'Fired when a deal is marked as Closed Won', icon: CheckCircle2, color: 'var(--success)', payload: 'deal_id, value, owner_id, closed_at' },
  { id: 'e4', event: 'deal.lost', description: 'Fired when a deal is marked as Closed Lost', icon: XCircle, color: 'var(--destructive)', payload: 'deal_id, loss_reason, owner_id' },
  { id: 'e5', event: 'contact.created', description: 'Fired when a new contact is added', icon: UserPlus, color: 'var(--chart-3)', payload: 'contact_id, name, email, account_id' },
  { id: 'e6', event: 'contact.updated', description: 'Fired when contact information is modified', icon: Settings, color: 'var(--chart-2)', payload: 'contact_id, changed_fields, old_values' },
  { id: 'e7', event: 'notification.created', description: 'Fired when an in-app notification is generated', icon: Bell, color: 'var(--chart-5)', payload: 'notification_id, type, recipient_id' },
  { id: 'e8', event: 'task.completed', description: 'Fired when a task is marked as completed', icon: CheckCircle2, color: 'var(--accent)', payload: 'task_id, completed_by, completed_at' },
  { id: 'e9', event: 'meeting.scheduled', description: 'Fired when a meeting is booked on the calendar', icon: Clock, color: 'var(--chart-3)', payload: 'meeting_id, attendees, start_time' },
  { id: 'e10', event: 'report.generated', description: 'Fired when a scheduled report finishes generating', icon: FileText, color: 'var(--chart-1)', payload: 'report_id, format, download_url' },
  { id: 'e11', event: 'lead.assigned', description: 'Fired when a lead is assigned to a rep', icon: UserPlus, color: 'var(--chart-5)', payload: 'lead_id, assigned_to, assigned_by' },
  { id: 'e12', event: 'quota.threshold', description: 'Fired when a rep crosses a quota threshold (50%, 75%, 100%)', icon: AlertTriangle, color: 'var(--warning)', payload: 'rep_id, threshold, current_attainment' },
];

const RECENT_DELIVERIES = [
  { id: 'd1', url: 'api.acme.com/webhooks/pipeline-pilot', event: 'deal.created', status: 200, latency: 124, timestamp: '5m ago', success: true },
  { id: 'd2', url: 'crm.globaltech.io/sync/inbound', event: 'contact.updated', status: 200, latency: 89, timestamp: '12m ago', success: true },
  { id: 'd3', url: 'hooks.slack.com/services/T0/B0/x', event: 'notification.created', status: 200, latency: 211, timestamp: '12m ago', success: true },
  { id: 'd4', url: 'api.acme.com/webhooks/pipeline-pilot', event: 'deal.stage_changed', status: 200, latency: 142, timestamp: '23m ago', success: true },
  { id: 'd5', url: 'api.legacy.com/incoming', event: 'deal.created', status: 504, latency: 5000, timestamp: '4d ago', success: false },
  { id: 'd6', url: 'hooks.slack.com/services/T0/B0/x', event: 'notification.created', status: 200, latency: 198, timestamp: '4d ago', success: true },
  { id: 'd7', url: 'api.acme.com/webhooks/pipeline-pilot', event: 'deal.won', status: 200, latency: 156, timestamp: '4d ago', success: true },
  { id: 'd8', url: 'crm.globaltech.io/sync/inbound', event: 'contact.created', status: 200, latency: 78, timestamp: '5d ago', success: true },
];

export default function WebhooksPage() {
  const activeWebhooks = webhooks.filter((w) => w.status === 'Active').length;
  const deliveriesToday = 1248;
  const successRate = 99.4;
  const avgLatency = 142;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Webhooks"
        description="Subscribe to event notifications and deliver them to your endpoints"
        icon={Webhook}
        actions={
          <Button size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add webhook
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Webhooks"
          value={activeWebhooks}
          delta="+1"
          deltaType="positive"
          icon={Webhook}
          accentColor="var(--accent)"
          subtext="1 paused"
          sparkline={[2, 3, 3, 4, 4, 4, 3, 3]}
          delay={0}
        />
        <KPICard
          title="Deliveries Today"
          value={deliveriesToday.toLocaleString()}
          delta="+22%"
          deltaType="positive"
          icon={Zap}
          accentColor="var(--chart-1)"
          subtext="Last 24 hours"
          sparkline={[820, 940, 1080, 1120, 1180, 1220, 1240, 1248]}
          delay={1}
        />
        <KPICard
          title="Success Rate"
          value={`${successRate}%`}
          delta="+0.3pp"
          deltaType="positive"
          icon={CheckCircle2}
          accentColor="var(--success)"
          subtext="7-day rolling"
          sparkline={[98.4, 98.7, 99.0, 99.1, 99.3, 99.3, 99.4, 99.4]}
          delay={2}
        />
        <KPICard
          title="Avg Latency"
          value={`${avgLatency}ms`}
          delta="-8ms"
          deltaType="positive"
          icon={Clock}
          accentColor="var(--chart-3)"
          subtext="p95: 412ms"
          sparkline={[180, 175, 168, 162, 158, 152, 148, 142]}
          delay={3}
        />
      </div>

      {/* Main: webhooks table + events reference */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Webhooks table (2/3) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Webhooks</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{webhooks.length} endpoints configured</p>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">Test all</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Endpoint</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden md:table-cell">Events</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden sm:table-cell">Last fired</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Success</th>
                  <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Status</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {webhooks.map((w, i) => (
                  <tr
                    key={w.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={cn('w-7 h-7 rounded-md flex items-center justify-center', w.status === 'Active' ? 'bg-accent/10' : 'bg-secondary')}>
                          <Webhook className={cn('w-3.5 h-3.5', w.status === 'Active' ? 'text-accent' : 'text-muted-foreground')} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-mono text-foreground truncate max-w-[200px]">{w.url}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 truncate max-w-[200px]">{w.url.replace('https://', '')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {w.events.map((e) => (
                          <span
                            key={e}
                            className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-medium border"
                            style={{
                              backgroundColor: `color-mix(in oklch, ${EVENT_COLORS[e] || 'var(--muted-foreground)'} 12%, transparent)`,
                              color: EVENT_COLORS[e] || 'var(--muted-foreground)',
                              borderColor: `color-mix(in oklch, ${EVENT_COLORS[e] || 'var(--muted-foreground)'} 25%, transparent)`,
                            }}
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className="text-xs text-muted-foreground tabular-nums">{w.lastFired}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span
                          className={cn('text-xs font-semibold tabular-nums', w.successRate >= 99 ? 'text-success' : w.successRate >= 90 ? 'text-warning' : 'text-destructive')}
                        >
                          {w.successRate}%
                        </span>
                      </div>
                      <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden mt-1 ml-auto">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${w.successRate}%`,
                            background: w.successRate >= 99 ? 'var(--success)' : w.successRate >= 90 ? 'var(--warning)' : 'var(--destructive)',
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {w.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-success/30 bg-success/10 text-success">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-warning/30 bg-warning/10 text-warning">
                          <Pause className="w-3 h-3" /> Paused
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem><RefreshCw className="w-4 h-4 mr-2" /> Send test event</DropdownMenuItem>
                          <DropdownMenuItem><Copy className="w-4 h-4 mr-2" /> Copy signing secret</DropdownMenuItem>
                          <DropdownMenuItem>
                            {w.status === 'Active' ? <><Pause className="w-4 h-4 mr-2" /> Pause</> : <><Play className="w-4 h-4 mr-2" /> Resume</>}
                          </DropdownMenuItem>
                          <DropdownMenuItem><Activity className="w-4 h-4 mr-2" /> View deliveries</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Events reference (1/3) */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Events reference</h3>
              </div>
              <span className="text-[10px] text-muted-foreground">{EVENT_REFERENCE.length} events</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Available webhook events with payload schemas</p>

            <div className="space-y-2 max-h-[640px] overflow-y-auto custom-scroll pr-1 -mr-1">
              {EVENT_REFERENCE.map((e, i) => (
                <div
                  key={e.id}
                  className="group rounded-lg p-2.5 border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-accent/30 transition-all animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `color-mix(in oklch, ${e.color} 14%, transparent)` }}
                    >
                      <e.icon className="w-3.5 h-3.5" style={{ color: e.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <code className="text-[11px] font-mono font-semibold text-foreground block truncate">{e.event}</code>
                      <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{e.description}</p>
                      <div className="mt-1.5 pt-1.5 border-t border-border/60">
                        <p className="text-[9px] text-muted-foreground/70 uppercase tracking-wider mb-0.5">Payload</p>
                        <code className="text-[9px] font-mono text-muted-foreground block truncate">{e.payload}</code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <style jsx>{`
              .custom-scroll::-webkit-scrollbar { width: 4px; }
              .custom-scroll::-webkit-scrollbar-track { background: transparent; }
              .custom-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
              .custom-scroll::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); }
            `}</style>
          </div>
        </div>
      </div>

      {/* Recent deliveries log */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Recent deliveries</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 8 webhook deliveries</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">
            View all deliveries
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Time</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Endpoint</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden sm:table-cell">Event</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Status</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Latency</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_DELIVERIES.map((d, i) => (
                <tr
                  key={d.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <td className="py-3 px-4">
                    <span className="text-xs text-muted-foreground tabular-nums">{d.timestamp}</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-[11px] font-mono text-foreground truncate block max-w-[220px]">{d.url}</code>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-medium border"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${EVENT_COLORS[d.event] || 'var(--muted-foreground)'} 12%, transparent)`,
                        color: EVENT_COLORS[d.event] || 'var(--muted-foreground)',
                        borderColor: `color-mix(in oklch, ${EVENT_COLORS[d.event] || 'var(--muted-foreground)'} 25%, transparent)`,
                      }}
                    >
                      {d.event}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {d.success ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-success/30 bg-success/10 text-success">
                        <CheckCircle2 className="w-3 h-3" /> {d.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-destructive/30 bg-destructive/10 text-destructive">
                        <XCircle className="w-3 h-3" /> {d.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className={cn('text-xs tabular-nums', d.latency > 1000 ? 'text-warning' : 'text-foreground')}>
                        {d.latency >= 1000 ? `${(d.latency / 1000).toFixed(1)}s` : `${d.latency}ms`}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Retry
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
