'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { AvatarBadge } from '@/components/common/status-badge';
import { roles } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Shield, Plus, Users, KeyRound, MoreHorizontal, Edit, Copy,
  CheckCircle2, X, Crown, Lock, Eye, Settings2, History, Clock,
  Handshake, Building2, BarChart3, CreditCard,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// Permission categories × roles matrix (compact preview)
const PERMISSION_CATEGORIES = [
  { id: 'deals', label: 'Deals', Icon: Handshake },
  { id: 'accounts', label: 'Accounts', Icon: Building2 },
  { id: 'reports', label: 'Reports', Icon: BarChart3 },
  { id: 'team', label: 'Team', Icon: Users },
  { id: 'settings', label: 'Settings', Icon: Settings2 },
  { id: 'billing', label: 'Billing', Icon: CreditCard },
];

// Hardcoded permission matrix per role × category — 0=none, 1=view, 2=edit, 3=admin
const PERMISSION_MATRIX: Record<string, number[]> = {
  role1: [3, 3, 3, 3, 3, 3], // Administrator
  role2: [3, 3, 3, 3, 1, 1], // Sales Manager
  role3: [3, 3, 2, 0, 0, 0], // AE
  role4: [2, 1, 1, 0, 0, 0], // SDR
  role5: [2, 2, 3, 2, 3, 1], // Operations
  role6: [1, 1, 1, 0, 0, 0], // Viewer
};

const LEVEL_LABEL: Record<number, { label: string; color: string; code: string }> = {
  0: { label: 'None', color: 'var(--muted-foreground)', code: '—' },
  1: { label: 'View', color: 'var(--chart-1)', code: 'V' },
  2: { label: 'Edit', color: 'var(--warning)', code: 'E' },
  3: { label: 'Admin', color: 'var(--destructive)', code: 'A' },
};

const AUDIT_CHANGES = [
  { id: 'a1', user: 'Sarah Chen', initials: 'SC', color: 'var(--accent)', action: 'Added permission', target: 'deals.export', role: 'Sales Manager', time: '5m ago' },
  { id: 'a2', user: 'Admin', initials: 'AD', color: 'var(--destructive)', action: 'Created role', target: 'Sales Operations', role: 'Operations', time: '2h ago' },
  { id: 'a3', user: 'Mike Johnson', initials: 'MJ', color: 'var(--chart-1)', action: 'Removed permission', target: 'billing.view', role: 'Account Executive', time: '1d ago' },
  { id: 'a4', user: 'Emily Davis', initials: 'ED', color: 'var(--chart-3)', action: 'Updated role description', target: 'Senior AE role', role: 'Senior AE', time: '2d ago' },
  { id: 'a5', user: 'Admin', initials: 'AD', color: 'var(--destructive)', action: 'Assigned role', target: 'Lisa Park → AE', role: 'Account Executive', time: '3d ago' },
  { id: 'a6', user: 'David Okafor', initials: 'DO', color: 'var(--chart-5)', action: 'Cloned role', target: 'SDR → SDR Lead', role: 'SDR Lead', time: '5d ago' },
];

export default function RolesPermissionsPage() {
  const totalUsers = roles.reduce((s, r) => s + r.users, 0);
  const customRoles = roles.length - 4;
  const avgPerms = Math.round(roles.reduce((s, r) => s + r.permissions, 0) / roles.length);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        description="Manage access levels, custom roles, and audit changes across your workspace"
        icon={Shield}
        actions={
          <Button size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Create role
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Roles"
          value={roles.length}
          delta="+1"
          deltaType="positive"
          icon={Shield}
          accentColor="var(--accent)"
          subtext="2 system · 4 custom"
          sparkline={[4, 5, 5, 6, 6, 6, 6, 6]}
          delay={0}
        />
        <KPICard
          title="Total Users"
          value={totalUsers}
          delta="+3"
          deltaType="positive"
          icon={Users}
          accentColor="var(--chart-1)"
          subtext="Across all roles"
          sparkline={[28, 30, 32, 33, 34, 34, 35, 35]}
          delay={1}
        />
        <KPICard
          title="Avg Permissions"
          value={avgPerms}
          delta="+2"
          deltaType="positive"
          icon={KeyRound}
          accentColor="var(--chart-3)"
          subtext="Per role"
          sparkline={[20, 21, 22, 22, 23, 23, 24, 24]}
          delay={2}
        />
        <KPICard
          title="Custom Roles"
          value={customRoles}
          delta="+1"
          deltaType="positive"
          icon={Crown}
          accentColor="var(--chart-5)"
          subtext="Tailored to your team"
          sparkline={[1, 1, 2, 2, 2, 2, 2, 2]}
          delay={3}
        />
      </div>

      {/* Main: role cards grid + permission matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Role cards grid (2/3) */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r, i) => {
              const isSystem = r.id === 'role1' || r.id === 'role6';
              return (
                <div
                  key={r.id}
                  className="group relative bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
                >
                  {/* color accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, ${r.color}, transparent)` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${r.color} 5%, transparent), transparent)` }} />

                  <div className="relative flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `color-mix(in oklch, ${r.color} 14%, transparent)` }}
                      >
                        {r.id === 'role1' ? (
                          <Crown className="w-5 h-5" style={{ color: r.color }} />
                        ) : r.id === 'role6' ? (
                          <Eye className="w-5 h-5" style={{ color: r.color }} />
                        ) : (
                          <Shield className="w-5 h-5" style={{ color: r.color }} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-foreground">{r.name}</h3>
                          {isSystem && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border border-border bg-secondary text-muted-foreground">
                              <Lock className="w-2 h-2" /> System
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{r.description}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" /> Edit role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="w-4 h-4 mr-2" /> View users
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" disabled={isSystem}>
                          <X className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="relative grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-secondary/40 rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                        <Users className="w-3 h-3" /> Users
                      </div>
                      <p className="text-base font-bold text-foreground tabular-nums">{r.users}</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                        <KeyRound className="w-3 h-3" /> Permissions
                      </div>
                      <p className="text-base font-bold text-foreground tabular-nums" style={{ color: r.color }}>{r.permissions}</p>
                    </div>
                  </div>

                  <div className="relative mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      Last modified: {i === 0 ? '2d ago' : i === 1 ? '5d ago' : '2w ago'}
                    </span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-accent hover:text-accent hover:bg-accent/10">
                      Configure <Edit className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Permission matrix preview (1/3) */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Permission Matrix</h3>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Expand <Edit className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Compact preview · {roles.length} roles × {PERMISSION_CATEGORIES.length} categories</p>

            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-[10px]">
                <thead>
                  <tr>
                    <th className="text-left text-muted-foreground font-medium py-1.5 pr-2 sticky left-0 bg-card">Role</th>
                    {PERMISSION_CATEGORIES.map((c) => (
                      <th key={c.id} className="text-center text-muted-foreground font-medium py-1.5 px-1">
                        <div className="flex flex-col items-center gap-0.5">
                          <c.Icon className="w-3 h-3" />
                          <span className="text-[9px]">{c.label}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roles.map((r) => {
                    const row = PERMISSION_MATRIX[r.id] || [];
                    return (
                      <tr key={r.id} className="border-t border-border/60 hover:bg-secondary/30 transition-colors">
                        <td className="py-1.5 pr-2 sticky left-0 bg-card">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: r.color }} />
                            <span className="text-[10px] font-medium text-foreground truncate max-w-[90px]">{r.name}</span>
                          </div>
                        </td>
                        {row.map((lvl, idx) => {
                          const conf = LEVEL_LABEL[lvl];
                          return (
                            <td key={idx} className="text-center py-1.5">
                              {lvl === 0 ? (
                                <span className="text-muted-foreground/40">—</span>
                              ) : (
                                <span
                                  className="inline-flex w-5 h-5 rounded items-center justify-center text-[9px] font-bold"
                                  style={{
                                    backgroundColor: `color-mix(in oklch, ${conf.color} 14%, transparent)`,
                                    color: conf.color,
                                  }}
                                  title={`${r.name} · ${PERMISSION_CATEGORIES[idx].label}: ${conf.label}`}
                                >
                                  {conf.code}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap items-center gap-3 text-[10px]">
                {Object.entries(LEVEL_LABEL).filter(([k]) => k !== '0').map(([k, c]) => (
                  <div key={k} className="flex items-center gap-1">
                    <span
                      className="inline-flex w-4 h-4 rounded items-center justify-center text-[9px] font-bold"
                      style={{ backgroundColor: `color-mix(in oklch, ${c.color} 14%, transparent)`, color: c.color }}
                    >
                      {c.code}
                    </span>
                    <span className="text-muted-foreground">{c.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground/40">—</span>
                  <span className="text-muted-foreground">None</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent role changes audit list */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-accent" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Recent role changes</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Audit trail of permission modifications</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">
            View full audit log
          </Button>
        </div>
        <div className="divide-y divide-border">
          {AUDIT_CHANGES.map((a, i) => (
            <div
              key={a.id}
              className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1 duration-500"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <AvatarBadge initials={a.initials} color={a.color} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{a.user}</span>{' '}
                  <span className="text-muted-foreground">{a.action}</span>{' '}
                  <span className="font-medium text-foreground">{a.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Role: <span className="text-foreground">{a.role}</span>
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {a.time}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs shrink-0">
                Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
