'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { apiKeys } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Key, Plus, Copy, Check, MoreHorizontal, Eye, EyeOff, Trash2, RefreshCw,
  Zap, Activity, AlertTriangle, Clock, Terminal, Gauge, CheckCircle2, XCircle,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const SCOPE_COLORS: Record<string, string> = {
  read: 'var(--chart-1)',
  write: 'var(--accent)',
  webhooks: 'var(--chart-3)',
  admin: 'var(--destructive)',
};

const RECENT_REQUESTS = [
  { id: 'r1', endpoint: 'GET /v1/deals', status: 200, responseTime: 124, timestamp: '2m ago', color: 'var(--success)' },
  { id: 'r2', endpoint: 'POST /v1/contacts', status: 201, responseTime: 89, timestamp: '3m ago', color: 'var(--success)' },
  { id: 'r3', endpoint: 'GET /v1/accounts/123', status: 404, responseTime: 56, timestamp: '5m ago', color: 'var(--destructive)' },
  { id: 'r4', endpoint: 'PATCH /v1/deals/d-2041', status: 200, responseTime: 142, timestamp: '8m ago', color: 'var(--success)' },
  { id: 'r5', endpoint: 'POST /v1/webhooks/dispatch', status: 200, responseTime: 211, timestamp: '12m ago', color: 'var(--success)' },
  { id: 'r6', endpoint: 'GET /v1/reports/pipeline', status: 429, responseTime: 18, timestamp: '15m ago', color: 'var(--warning)' },
  { id: 'r7', endpoint: 'GET /v1/leads?status=hot', status: 200, responseTime: 167, timestamp: '18m ago', color: 'var(--success)' },
  { id: 'r8', endpoint: 'DELETE /v1/contacts/c-891', status: 204, responseTime: 78, timestamp: '22m ago', color: 'var(--success)' },
];

const RATE_LIMITS = [
  { endpoint: 'Authentication', limit: '100 / min', used: 12, color: 'var(--chart-1)' },
  { endpoint: 'Read endpoints', limit: '1000 / min', used: 284, color: 'var(--accent)' },
  { endpoint: 'Write endpoints', limit: '300 / min', used: 67, color: 'var(--chart-3)' },
  { endpoint: 'Webhook dispatch', limit: '50 / min', used: 8, color: 'var(--chart-5)' },
];

const SAMPLE_CURL = `curl -X POST https://api.pipelinepilot.io/v1/deals \\
  -H "Authorization: Bearer pk_live_8f3a2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Acme Expansion",
    "value": 125000,
    "stage": "Negotiation",
    "owner_id": "u1"
  }'`;

export default function ApiKeysPage() {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [revealedKeys, setRevealedKeys] = React.useState<Record<string, boolean>>({});

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleReveal = (id: string) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeKeys = apiKeys.filter((k) => k.status === 'Active').length;
  const totalRequests = 184320;
  const avgResponse = 142;
  const errorRate = 0.8;

  return (
    <div className="space-y-6">
      <PageHeader
        title="API Keys"
        description="Programmatic access to Pipeline Pilot — manage keys, scopes, and rate limits"
        icon={Key}
        actions={
          <Button size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Create API key
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Keys"
          value={activeKeys}
          delta="+1"
          deltaType="positive"
          icon={Key}
          accentColor="var(--accent)"
          subtext="1 revoked"
          sparkline={[2, 3, 3, 3, 4, 4, 4, 3]}
          delay={0}
        />
        <KPICard
          title="Requests this month"
          value={(totalRequests / 1000).toFixed(0) + 'k'}
          delta="+18%"
          deltaType="positive"
          icon={Zap}
          accentColor="var(--chart-1)"
          subtext="184k of 500k quota"
          sparkline={[120, 135, 148, 152, 168, 176, 180, 184]}
          delay={1}
        />
        <KPICard
          title="Avg Response Time"
          value={`${avgResponse}ms`}
          delta="-12ms"
          deltaType="positive"
          icon={Gauge}
          accentColor="var(--chart-3)"
          subtext="p95: 287ms"
          sparkline={[180, 172, 165, 160, 155, 150, 145, 142]}
          delay={2}
        />
        <KPICard
          title="Error Rate"
          value={`${errorRate}%`}
          delta="-0.2pp"
          deltaType="positive"
          icon={AlertTriangle}
          accentColor="var(--chart-5)"
          subtext="Below 1% target"
          sparkline={[1.4, 1.2, 1.1, 1.0, 0.9, 0.9, 0.8, 0.8]}
          delay={3}
        />
      </div>

      {/* Main: API keys table + right sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* API keys table (2/3) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">API keys</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{apiKeys.length} keys · {activeKeys} active</p>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">Regenerate all</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Name</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Key</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden md:table-cell">Created</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden sm:table-cell">Last used</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden lg:table-cell">Scopes</th>
                  <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Status</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((k, i) => {
                  const isRevealed = revealedKeys[k.id];
                  return (
                    <tr
                      key={k.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                      style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className={cn('w-7 h-7 rounded-md flex items-center justify-center', k.status === 'Active' ? 'bg-accent/10' : 'bg-secondary')}>
                            <Key className={cn('w-3.5 h-3.5', k.status === 'Active' ? 'text-accent' : 'text-muted-foreground')} />
                          </div>
                          <span className="font-medium text-foreground text-xs">{k.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <code className="text-[11px] font-mono text-foreground bg-secondary/60 px-2 py-1 rounded">
                            {isRevealed ? k.key.replace(/•/g, 'x') : k.key}
                          </code>
                          <button
                            onClick={() => toggleReveal(k.id)}
                            className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            title={isRevealed ? 'Hide' : 'Reveal'}
                          >
                            {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                          <button
                            onClick={() => handleCopy(k.key, k.id)}
                            className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                            title="Copy"
                          >
                            {copiedKey === k.id ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">{k.created}</span>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <span className="text-xs text-muted-foreground tabular-nums">{k.lastUsed}</span>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {k.scopes.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border"
                              style={{
                                backgroundColor: `color-mix(in oklch, ${SCOPE_COLORS[s] || 'var(--muted-foreground)'} 12%, transparent)`,
                                color: SCOPE_COLORS[s] || 'var(--muted-foreground)',
                                borderColor: `color-mix(in oklch, ${SCOPE_COLORS[s] || 'var(--muted-foreground)'} 25%, transparent)`,
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {k.status === 'Active' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-success/30 bg-success/10 text-success">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-destructive/30 bg-destructive/10 text-destructive">
                            <XCircle className="w-3 h-3" /> Revoked
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
                            <DropdownMenuItem><RefreshCw className="w-4 h-4 mr-2" /> Regenerate</DropdownMenuItem>
                            <DropdownMenuItem><Copy className="w-4 h-4 mr-2" /> Copy key</DropdownMenuItem>
                            <DropdownMenuItem><Activity className="w-4 h-4 mr-2" /> View usage</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" /> Revoke key
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar: Quick start + Rate limits */}
        <div className="lg:col-span-1 space-y-4">
          {/* Quick start */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Quick start</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Sample request using your API key</p>

            <div className="relative bg-zinc-950 rounded-lg p-4 overflow-x-auto border border-border">
              <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-border/60">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
                <span className="text-[10px] text-muted-foreground ml-2 font-mono">terminal</span>
              </div>
              <pre className="text-[10px] leading-relaxed font-mono text-zinc-300 whitespace-pre">
                {SAMPLE_CURL.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-muted-foreground/50 select-none mr-3 w-4 text-right">{i + 1}</span>
                    <span>{line}</span>
                  </div>
                ))}
              </pre>
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 h-8 text-xs bg-card border-border">
                <Copy className="w-3 h-3 mr-1.5" /> Copy
              </Button>
              <Button variant="outline" size="sm" className="flex-1 h-8 text-xs bg-card border-border">
                View docs
              </Button>
            </div>
          </div>

          {/* Rate limits */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="w-4 h-4 text-chart-3" />
              <h3 className="text-sm font-semibold text-foreground">Rate limits</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Current window · resets every 60s</p>

            <div className="space-y-3">
              {RATE_LIMITS.map((r, i) => {
                const used = parseInt(r.limit) > 0 ? Math.round((r.used / parseInt(r.limit)) * 100) : 0;
                return (
                  <div
                    key={r.endpoint}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground font-medium">{r.endpoint}</span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{r.used} / {r.limit}</span>
                    </div>
                    <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                        style={{
                          width: `${used}%`,
                          background: `linear-gradient(90deg, ${r.color}, color-mix(in oklch, ${r.color} 70%, transparent))`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-[11px] text-muted-foreground">
              <Zap className="w-3 h-3 text-accent" />
              <span>Upgrade plan for higher limits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent API requests log */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Recent API requests</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 30 minutes · live log</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">
            View full logs
          </Button>
        </div>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card z-10">
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Endpoint</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Status</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Response</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden sm:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_REQUESTS.map((r, i) => (
                <tr
                  key={r.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <td className="py-2.5 px-4">
                    <code className="text-[11px] font-mono text-foreground">{r.endpoint}</code>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold tabular-nums"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${r.color} 14%, transparent)`,
                        color: r.color,
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-foreground tabular-nums">{r.responseTime}ms</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-right hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">{r.timestamp}</span>
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
