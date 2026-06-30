'use client';
import * as React from 'react';
import {
  TrendingUp, Users, DollarSign, Package, Star, Heart, Zap, Sparkles, Bell,
  Activity, MessageSquare, MoreHorizontal, Plus, CheckCircle2, X, ArrowRight,
  Clock, GitCommit, FileText, ShoppingCart, Settings, User, Filter, Hash,
} from 'lucide-react';
import { PageHeader, SectionCard, StatusBadge, UserAvatar, ProgressBar } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Data Display) ====================== */
function DdStyles() {
  return (
    <style jsx global>{`
      .dd-root {
        --dd-radius-sm: 8px;
        --dd-radius-md: 12px;
        --dd-radius-lg: 16px;
        --dd-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --dd-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --dd-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --dd-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
        --dd-shadow-glow: 0 0 0 1px rgba(70,95,255,0.12), 0 8px 24px -8px rgba(70,95,255,0.35);
      }
      .dd-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .dd-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .dd-card-hover {
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }
      .dd-card-hover:hover {
        transform: translateY(-3px);
        box-shadow: var(--dd-shadow-lg);
      }
      .dd-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
      @keyframes dd-fade-up {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .dd-fade-up { animation: dd-fade-up 0.3s ease-out; }
    `}</style>
  );
}

export function DataDisplayPage() {
  return (
    <div className="dd-root dd-bg space-y-6">
      <DdStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Data Display' }]} title="Data Display" description="Cards, lists, timelines, activity feeds, avatars, badges, chips — all variants." />

      {/* ============================================ CARDS ============================================ */}
      <SectionCard title="Cards" description="12 variants — Simple, Stat, Analytics, Glass, Gradient, Interactive, Hover, Spotlight, AI Insight, Product, Profile, Pricing">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Simple card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--dd-shadow-xs)]">
            <p className="text-sm font-medium text-[var(--text-strong)]">Simple Card</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">A minimal card with just border and shadow.</p>
          </div>
          {/* Stat card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--dd-shadow-xs)]">
            <div className="flex items-start justify-between">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><DollarSign className="size-5" strokeWidth={2.5} /></span>
              <StatusBadge tone="success" dot>+12.4%</StatusBadge>
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">$48,240</p>
            <p className="text-xs font-semibold text-[var(--text-muted)]">Total Revenue</p>
          </div>
          {/* Analytics card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--dd-shadow-xs)]">
            <p className="text-xs font-medium text-[var(--text-muted)]">Weekly Visitors</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">12,840</p>
            <div className="mt-3 flex h-12 items-end gap-1">{[40, 55, 48, 62, 70, 58, 75].map((h, i) => <div key={i} className="flex-1 rounded-t bg-[var(--color-brand-500)]/70 transition-all hover:bg-[var(--color-brand-500)]" style={{ height: `${h}%` }} />)}</div>
          </div>
          {/* Glass card */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[var(--dd-shadow-sm)]" style={{ backgroundImage: 'linear-gradient(135deg, rgba(70,95,255,0.12), rgba(122,90,248,0.08))' }}>
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur"><Sparkles className="size-5" strokeWidth={2.5} /></span>
            <p className="mt-3 text-sm font-medium text-white">Glass Card</p>
            <p className="mt-1 text-xs font-medium text-white/60">Frosted glass with backdrop blur</p>
          </div>
          {/* Gradient card */}
          <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] p-5 text-white shadow-[var(--dd-shadow-md)]">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur"><Zap className="size-5" strokeWidth={2.5} /></span>
            <p className="mt-3 text-sm font-medium">Gradient Card</p>
            <p className="mt-1 text-xs font-medium text-white/70">Vibrant gradient background</p>
          </div>
          {/* Interactive card */}
          <div className="dd-card-hover cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--dd-shadow-xs)]">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)]"><ArrowRight className="size-4" strokeWidth={2.5} /></span>
              <p className="text-sm font-medium text-[var(--text-strong)]">Interactive Card</p>
            </div>
            <p className="mt-2 text-xs font-medium text-[var(--text-muted)]">Hover to lift. Click to navigate.</p>
          </div>
          {/* AI Insight card */}
          <div className="rounded-xl border border-[var(--color-brand-200)] bg-gradient-to-br from-[var(--color-brand-50)] to-[#7a5af8]/5 p-5 shadow-[var(--dd-shadow-xs)] dark:border-[rgba(70,95,255,0.24)] dark:from-[rgba(70,95,255,0.08)]">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">AI Insight</p>
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--text-body)]">Revenue is trending 23% higher this week. Consider scaling infrastructure.</p>
          </div>
          {/* Product card */}
          <div className="dd-card-hover overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--dd-shadow-xs)]">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop" alt="Product" className="aspect-video w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <StatusBadge tone="brand">Audio</StatusBadge>
                <span className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)]"><Star className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" strokeWidth={2.5} />4.8</span>
              </div>
              <p className="mt-2 text-sm font-medium text-[var(--text-strong)]">Wireless Headphones</p>
              <p className="mt-1 text-lg font-medium text-[var(--text-strong)]">$349</p>
            </div>
          </div>
          {/* Profile card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--dd-shadow-xs)]">
            <div className="flex items-center gap-3">
              <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50" alt="" className="size-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-[var(--text-strong)]">Sara Nguyen</p>
                <p className="text-xs font-medium text-[var(--text-muted)]">Senior Designer</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-lg bg-[var(--color-brand-500)] py-1.5 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]">Follow</button>
              <button className="flex-1 rounded-lg border border-[var(--border)] py-1.5 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">Message</button>
            </div>
          </div>
          {/* Pricing card */}
          <div className="rounded-xl border-2 border-[var(--color-brand-500)] bg-[var(--card)] p-5 shadow-[var(--dd-shadow-md)]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">Pro Plan</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-[var(--text-strong)]">$84<span className="text-sm font-medium text-[var(--text-muted)]">/mo</span></p>
            <ul className="mt-4 space-y-2">
              {['25 team members', '500K API calls', '50GB storage', 'Priority support'].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs font-medium text-[var(--text-body)]">
                  <CheckCircle2 className="size-3.5 text-[var(--color-success-500)]" strokeWidth={2.5} />{f}
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full rounded-lg bg-[var(--color-brand-500)] py-2 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]">Choose Plan</button>
          </div>
          {/* Hover/Spotlight placeholder card */}
          <div className="dd-card-hover group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--dd-shadow-xs)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-500)]/0 to-[#7a5af8]/0 transition-all group-hover:from-[var(--color-brand-500)]/5 group-hover:to-[#7a5af8]/5" />
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)]"><Sparkles className="size-5" strokeWidth={2.5} /></span>
            <p className="mt-3 text-sm font-medium text-[var(--text-strong)]">Spotlight Card</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Hover reveals gradient overlay</p>
          </div>
          {/* Simple stat card 2 */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--dd-shadow-xs)]">
            <div className="flex items-start justify-between">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><Users className="size-5" strokeWidth={2.5} /></span>
              <StatusBadge tone="info" dot>+9.4%</StatusBadge>
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">42,800</p>
            <p className="text-xs font-medium text-[var(--text-muted)]">Active Users</p>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ LISTS ============================================ */}
      <SectionCard title="Lists" description="5 variants — Activity, User, Product, Settings, Interactive">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Activity list */}
          <div>
            <p className="dd-label mb-3">Activity List</p>
            <div className="space-y-2">
              {[
                { user: 'Sara Nguyen', action: 'closed deal with', target: 'Acme Corp', time: '2m', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50' },
                { user: 'James Park', action: 'pushed commit to', target: 'main', time: '8m', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50' },
                { user: 'Maria Lopez', action: 'commented on', target: 'PR #2042', time: '14m', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card)] p-3 transition hover:bg-[var(--surface-sunken)]">
                  <img src={item.avatar} alt={item.user} className="size-9 rounded-full object-cover" />
                  <div className="flex-1"><p className="text-sm font-medium text-[var(--text-strong)]"><span className="font-medium">{item.user}</span> <span className="text-[var(--text-muted)]">{item.action}</span> <span className="font-medium">{item.target}</span></p></div>
                  <span className="text-xs font-medium text-[var(--text-subtle)]">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          {/* User list */}
          <div>
            <p className="dd-label mb-3">User List</p>
            <div className="space-y-2">
              {[
                { name: 'Alex Chen', role: 'Engineer', status: 'online', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50' },
                { name: 'Emma Wilson', role: 'Designer', status: 'away', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50' },
                { name: 'Ryan Cole', role: 'PM', status: 'offline', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50' },
              ].map((u, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card)] p-3 transition hover:bg-[var(--surface-sunken)]">
                  <div className="relative">
                    <img src={u.avatar} alt={u.name} className="size-9 rounded-full object-cover" />
                    <span className={cn('absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[var(--card)]', u.status === 'online' ? 'bg-[var(--color-success-500)]' : u.status === 'away' ? 'bg-[var(--color-warning-500)]' : 'bg-[var(--text-faint)]')} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text-strong)]">{u.name}</p>
                    <p className="text-xs font-medium text-[var(--text-muted)]">{u.role}</p>
                  </div>
                  <button className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-[10px] font-bold text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">Follow</button>
                </div>
              ))}
            </div>
          </div>
          {/* Product list */}
          <div>
            <p className="dd-label mb-3">Product List</p>
            <div className="space-y-2">
              {[
                { name: 'Wireless Headphones', price: '$349', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop' },
                { name: 'Smart Watch', price: '$299', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card)] p-3 transition hover:bg-[var(--surface-sunken)]">
                  <img src={p.img} alt={p.name} className="size-10 rounded-lg object-cover" />
                  <div className="flex-1"><p className="text-sm font-medium text-[var(--text-strong)]">{p.name}</p></div>
                  <span className="text-sm font-semibold text-[var(--text-strong)]">{p.price}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Settings list */}
          <div>
            <p className="dd-label mb-3">Settings List</p>
            <div className="space-y-2">
              {[
                { label: 'Notifications', desc: 'Email, push, SMS', icon: Bell },
                { label: 'Privacy', desc: 'Profile visibility', icon: User },
                { label: 'Appearance', desc: 'Theme, language', icon: Settings },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card)] p-3 transition hover:bg-[var(--surface-sunken)]">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--surface-sunken)] text-[var(--text-muted)]"><Icon className="size-4" strokeWidth={2.5} /></span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--text-strong)]">{s.label}</p>
                      <p className="text-xs font-medium text-[var(--text-muted)]">{s.desc}</p>
                    </div>
                    <ArrowRight className="size-4 text-[var(--text-faint)]" strokeWidth={2.5} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ TIMELINE ============================================ */}
      <SectionCard title="Timeline" description="4 variants — Activity, Project, AI, Vertical">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Activity timeline */}
          <div>
            <p className="dd-label mb-4">Activity Timeline</p>
            <ol className="relative space-y-5 border-l-2 border-[var(--border)] pl-6">
              {[
                { title: 'Project created', time: '2 hours ago', tone: 'brand', icon: Plus },
                { title: 'Design phase completed', time: '5 hours ago', tone: 'success', icon: CheckCircle2 },
                { title: 'Development started', time: '1 day ago', tone: 'info', icon: Zap },
              ].map((event, i) => (
                <li key={i} className="relative">
                  <span className={cn('absolute -left-[31px] flex size-6 items-center justify-center rounded-full ring-4 ring-[var(--background)]', { brand: 'bg-[var(--color-brand-500)]', success: 'bg-[var(--color-success-500)]', info: 'bg-[var(--color-info-500)]', violet: 'bg-[#7a5af8]' }[event.tone])}><event.icon className="size-3 text-white" strokeWidth={2.5} /></span>
                  <p className="text-sm font-medium text-[var(--text-strong)]">{event.title}</p>
                  <p className="text-xs font-medium text-[var(--text-muted)]">{event.time}</p>
                </li>
              ))}
            </ol>
          </div>
          {/* Project timeline */}
          <div>
            <p className="dd-label mb-4">Project Timeline</p>
            <ol className="relative space-y-5 border-l-2 border-[var(--border)] pl-6">
              {[
                { title: 'Sprint 1: Planning', time: 'Week 1', status: 'Done', tone: 'success' },
                { title: 'Sprint 2: Build', time: 'Week 2-3', status: 'Done', tone: 'success' },
                { title: 'Sprint 3: Test', time: 'Week 4', status: 'In Progress', tone: 'brand' },
                { title: 'Sprint 4: Deploy', time: 'Week 5', status: 'Pending', tone: 'muted' },
              ].map((event, i) => (
                <li key={i} className="relative">
                  <span className={cn('absolute -left-[31px] flex size-6 items-center justify-center rounded-full ring-4 ring-[var(--background)]', { success: 'bg-[var(--color-success-500)]', brand: 'bg-[var(--color-brand-500)]', muted: 'bg-[var(--border-strong)]' }[event.tone])}>
                    {event.tone === 'success' && <CheckCircle2 className="size-3 text-white" strokeWidth={2.5} />}
                    {event.tone === 'brand' && <Clock className="size-3 text-white fs-pulse" strokeWidth={2.5} />}
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--text-strong)]">{event.title}</p>
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold', event.tone === 'success' ? 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : event.tone === 'brand' ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>{event.status}</span>
                  </div>
                  <p className="text-xs font-medium text-[var(--text-muted)]">{event.time}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ AVATARS ============================================ */}
      <SectionCard title="Avatars" description="6 variants — Rounded, Square, Status, Gradient, AI, Stack">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2"><img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50" alt="Avatar" className="size-12 rounded-full object-cover shadow-[var(--dd-shadow-xs)]" /><span className="text-[10px] font-medium text-[var(--text-muted)]">Rounded</span></div>
          <div className="flex flex-col items-center gap-2"><img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50" alt="Avatar" className="size-12 rounded-xl object-cover shadow-[var(--dd-shadow-xs)]" /><span className="text-[10px] font-medium text-[var(--text-muted)]">Square</span></div>
          <div className="flex flex-col items-center gap-2"><div className="relative"><img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50" alt="Avatar" className="size-12 rounded-full object-cover shadow-[var(--dd-shadow-xs)]" /><span className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-[var(--card)] bg-[var(--color-success-500)]" /></div><span className="text-[10px] font-medium text-[var(--text-muted)]">Status</span></div>
          <div className="flex flex-col items-center gap-2"><span className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-sm font-bold text-white shadow-[var(--dd-shadow-xs)]">SN</span><span className="text-[10px] font-medium text-[var(--text-muted)]">Gradient</span></div>
          <div className="flex flex-col items-center gap-2"><span className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[var(--dd-shadow-xs)]"><Sparkles className="size-5" strokeWidth={2.5} /></span><span className="text-[10px] font-medium text-[var(--text-muted)]">AI</span></div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex">
              {['https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50', 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50', 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50'].map((src, i) => <img key={i} src={src} alt="" className="size-10 rounded-full border-2 border-[var(--card)] object-cover shadow-[var(--dd-shadow-xs)]" style={{ marginLeft: i === 0 ? 0 : -8 }} />)}
              <span className="inline-flex size-10 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--surface-sunken)] text-xs font-medium text-[var(--text-muted)]" style={{ marginLeft: -8 }}>+5</span>
            </div>
            <span className="text-[10px] font-medium text-[var(--text-muted)]">Stack</span>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ BADGES ============================================ */}
      <SectionCard title="Badges" description="6 variants — Soft, Gradient, Glow, Status, Notification, AI">
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-[var(--color-brand-50)] px-3 py-1 text-xs font-medium text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">Soft Badge</span>
          <span className="rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] px-3 py-1 text-xs font-medium text-white shadow-[var(--dd-shadow-xs)]">Gradient Badge</span>
          <span className="rounded-full bg-[var(--color-success-500)] px-3 py-1 text-xs font-medium text-white" style={{ boxShadow: '0 0 8px rgba(18,183,106,0.5)' }}>Glow Badge</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-50)] px-3 py-1 text-xs font-medium text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><span className="size-1.5 rounded-full bg-[var(--color-success-500)]" />Active</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-error-500)] px-3 py-1 text-xs font-medium text-white"><span className="size-1.5 rounded-full bg-white" />3</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] px-3 py-1 text-xs font-medium text-white"><Sparkles className="size-3" strokeWidth={2.5} />AI</span>
        </div>
      </SectionCard>

      {/* ============================================ CHIPS & TAGS ============================================ */}
      <SectionCard title="Chips & Tags" description="5 variants — Filter, Input, Status, Closable, Gradient">
        <div className="space-y-4">
          {/* Filter chips */}
          <div>
            <p className="dd-label mb-2">Filter Chips</p>
            <div className="flex flex-wrap gap-2">
              {['All', 'Active', 'Paused', 'Archived'].map((tag, i) => (
                <button key={tag} className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition', i === 0 ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--dd-shadow-xs)]' : 'border border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:bg-[var(--surface-sunken)]')}>
                  {i === 0 && <CheckCircle2 className="size-3" strokeWidth={2.5} />}{tag}
                </button>
              ))}
            </div>
          </div>
          {/* Input chips (closable) */}
          <div>
            <p className="dd-label mb-2">Input Chips (Closable)</p>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Next.js', 'Tailwind'].map((tag, i) => (
                <span key={tag} className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium', i === 0 ? 'border border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white' : 'border border-[var(--border)] bg-[var(--card)] text-[var(--text-body)]')}>{tag}<button className="cursor-pointer transition hover:text-[var(--color-error-600)]"><X className="size-3" strokeWidth={2.5} /></button></span>
              ))}
            </div>
          </div>
          {/* Status chips */}
          <div>
            <p className="dd-label mb-2">Status Chips</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-50)] px-3 py-1.5 text-xs font-medium text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><span className="size-1.5 rounded-full bg-[var(--color-success-500)]" />Completed</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-warning-50)] px-3 py-1.5 text-xs font-medium text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"><span className="size-1.5 rounded-full bg-[var(--color-warning-500)]" />Pending</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-error-50)] px-3 py-1.5 text-xs font-medium text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"><span className="size-1.5 rounded-full bg-[var(--color-error-500)]" />Failed</span>
            </div>
          </div>
          {/* Gradient tag */}
          <div>
            <p className="dd-label mb-2">Gradient Tag</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--color-brand-500)]/10 to-[#7a5af8]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]"><Sparkles className="size-3" strokeWidth={2.5} />Gradient Tag</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand-500)] px-3 py-1.5 text-xs font-medium text-white"><Hash className="size-3" strokeWidth={2.5} />hashtag</span>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
