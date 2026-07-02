'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge, StageBadge } from '@/components/common/status-badge';
import { roles, teamMembersAdmin } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  UsersRound, UserPlus, Search, MoreHorizontal, Mail, Shield,
  CheckCircle2, Clock, XCircle, Building2, GitBranch, Crown, MailOpen, Send,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// Avatar color palette
const AVATAR_COLORS: Record<string, string> = {
  SC: 'var(--accent)',
  MJ: 'var(--chart-1)',
  ED: 'var(--chart-3)',
  JW: 'var(--chart-5)',
  LP: 'var(--chart-2)',
  DO: 'var(--chart-4)',
  PS: 'var(--warning)',
  MB: 'var(--chart-1)',
};

const ROLE_COLOR: Record<string, string> = {
  'Senior AE': 'var(--accent)',
  'Account Executive': 'var(--chart-1)',
  'SDR Lead': 'var(--chart-3)',
  'Sales Manager': 'var(--chart-5)',
};

const PENDING_INVITES = [
  { id: 'p1', email: 'jennifer.park@pipelinepilot.io', role: 'Account Executive', invitedBy: 'Sarah Chen', sentAt: '2h ago', initials: 'JP', color: 'var(--chart-1)' },
  { id: 'p2', email: 'ryan.cooper@pipelinepilot.io', role: 'SDR', invitedBy: 'David Okafor', sentAt: '1d ago', initials: 'RC', color: 'var(--chart-3)' },
  { id: 'p3', email: 'amanda.reed@pipelinepilot.io', role: 'Senior AE', invitedBy: 'Sarah Chen', sentAt: '2d ago', initials: 'AR', color: 'var(--accent)' },
];

// Reporting hierarchy
const HIERARCHY = [
  { id: 'h1', name: 'Sarah Chen', role: 'VP Sales', initials: 'SC', color: 'var(--accent)', level: 0, reports: 7 },
  { id: 'h2', name: 'David Okafor', role: 'SDR Lead', initials: 'DO', color: 'var(--chart-4)', level: 1, reports: 4 },
  { id: 'h3', name: 'Mike Johnson', role: 'Sales Manager', initials: 'MJ', color: 'var(--chart-1)', level: 1, reports: 3 },
  { id: 'h4', name: 'Emily Davis', role: 'Senior AE', initials: 'ED', color: 'var(--chart-3)', level: 2, reports: 0 },
  { id: 'h5', name: 'Marcus Bell', role: 'Senior AE', initials: 'MB', color: 'var(--chart-1)', level: 2, reports: 0 },
];

export default function TeamManagementPage() {
  const [search, setSearch] = React.useState('');

  const filtered = teamMembersAdmin.filter((m) =>
    !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = teamMembersAdmin.filter((m) => m.status === 'Active').length;
  const inactiveCount = teamMembersAdmin.length - activeCount;
  const totalDeals = teamMembersAdmin.reduce((s, m) => s + m.deals, 0);

  const summaryStats = [
    { label: 'Total Members', value: teamMembersAdmin.length, color: 'var(--accent)', icon: UsersRound, sub: '+3 this month' },
    { label: 'Active', value: activeCount, color: 'var(--success)', icon: CheckCircle2, sub: 'Last 24h' },
    { label: 'Inactive', value: inactiveCount, color: 'var(--muted-foreground)', icon: Clock, sub: 'No recent activity' },
    { label: 'Pending Invites', value: PENDING_INVITES.length, color: 'var(--warning)', icon: Mail, sub: 'Awaiting acceptance' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Management"
        description="Invite members, manage roles, and visualize your reporting structure"
        icon={UsersRound}
        actions={
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members…"
                className="pl-9 h-9 w-[200px] bg-card border-border"
              />
            </div>
            <Button size="sm">
              <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Invite member
            </Button>
          </>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryStats.map((s, i) => (
          <div
            key={s.label}
            className="relative bg-card border border-border rounded-xl p-4 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${s.color} 5%, transparent), transparent)` }} />
            <div className="relative flex items-start justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{s.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
            </div>
            <p className="relative text-2xl font-bold text-foreground tabular-nums">{s.value}</p>
            <p className="relative text-[11px] text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main: members table + right sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Members table */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Team members</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} members · {totalDeals} active deals</p>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">Export CSV</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Member</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden sm:table-cell">Role</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Status</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden md:table-cell">Last active</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Deals</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => {
                  const color = AVATAR_COLORS[m.avatar] || 'var(--accent)';
                  const roleColor = ROLE_COLOR[m.role] || 'var(--accent)';
                  return (
                    <tr
                      key={m.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                      style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <AvatarBadge initials={m.avatar} color={color} size="md" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                            <p className="text-[11px] text-muted-foreground truncate">{m.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <StageBadge stage={m.role} color={roleColor} />
                      </td>
                      <td className="py-3 px-4">
                        {m.status === 'Active' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-success/30 bg-success/10 text-success">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-border bg-secondary text-muted-foreground">
                            <Clock className="w-3 h-3" /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground tabular-nums">{m.lastActive}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-sm font-semibold text-foreground tabular-nums">{m.deals}</span>
                      </td>
                      <td className="py-3 px-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem><Mail className="w-4 h-4 mr-2" /> Send message</DropdownMenuItem>
                            <DropdownMenuItem><Shield className="w-4 h-4 mr-2" /> Change role</DropdownMenuItem>
                            <DropdownMenuItem><GitBranch className="w-4 h-4 mr-2" /> View deals</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <XCircle className="w-4 h-4 mr-2" /> Deactivate
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

        {/* Right sidebar: team structure + pending invites */}
        <div className="lg:col-span-1 space-y-4">
          {/* Team structure mini visualization */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <GitBranch className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Team structure</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Reporting hierarchy</p>

            <div className="space-y-1">
              {HIERARCHY.map((h, i) => (
                <div
                  key={h.id}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-left-2 duration-500"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both', marginLeft: `${h.level * 24}px` }}
                >
                  {/* connector */}
                  {h.level > 0 && (
                    <div className="absolute" style={{ left: `calc(${h.level * 24}px + 16px)`, marginTop: '-32px', width: '16px', height: '16px' }}>
                      <svg viewBox="0 0 16 16" className="w-4 h-4 text-muted-foreground/40">
                        <path d="M0,0 L0,8 L16,8" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>
                  )}
                  <AvatarBadge initials={h.initials} color={h.color} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium text-foreground truncate">{h.name}</p>
                      {h.level === 0 && <Crown className="w-3 h-3 text-warning shrink-0" />}
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">{h.role}</p>
                  </div>
                  {h.reports > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground shrink-0">
                      {h.reports} reports
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-foreground tabular-nums">{roles.length}</p>
                <p className="text-[10px] text-muted-foreground">Roles defined</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground tabular-nums">{HIERARCHY.length}</p>
                <p className="text-[10px] text-muted-foreground">Management layers</p>
              </div>
            </div>
          </div>

          {/* Pending invites */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-warning" />
                <h3 className="text-sm font-semibold text-foreground">Pending invites</h3>
              </div>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border border-warning/30 bg-warning/10 text-warning">
                {PENDING_INVITES.length}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Awaiting acceptance</p>

            <div className="space-y-3">
              {PENDING_INVITES.map((p, i) => (
                <div
                  key={p.id}
                  className="group flex items-center gap-3 p-2.5 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-accent/30 transition-all animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                >
                  <AvatarBadge initials={p.initials} color={p.color} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{p.email}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{p.role}</span>
                      <span className="text-muted-foreground/40">·</span>
                      <span className="text-[10px] text-muted-foreground">{p.sentAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-7 h-7 flex items-center justify-center rounded-md text-accent hover:bg-accent/10 transition-colors" title="Resend">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-md text-destructive hover:bg-destructive/10 transition-colors" title="Cancel">
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full h-8 mt-4 text-xs bg-card border-border">
              <MailOpen className="w-3 h-3 mr-1.5" /> Resend all invites
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
