'use client';

import * as React from 'react';
import {
  ArrowRight, ArrowUp, Bell, Check, CheckCircle2, ChevronDown, ChevronRight,
  Clock, Copy, Download, Eye, FileText, Flag, GitBranch, Heart, MessageSquare,
  MoreHorizontal, Plus, Search, Send, Settings, Share2, Star, Tag, ThumbsUp,
  Trash2, TrendingUp, User, Users, X, Zap, Sparkles, AlertCircle, CheckCircle,
  RefreshCw, ExternalLink, Calendar, Filter, ArrowUpDown, Flame, Rocket,
  Webhook, Key, Shield, Activity, Server, Database, Globe, Cpu, Cloud,
  Bell as BellIcon, Bookmark, Edit3, GripVertical, ChevronLeft,
} from 'lucide-react';
import { PageHeader, SectionCard, StatusBadge, UserAvatar, ProgressBar } from '@/components/dashboard/primitives';
import { ComponentKeywords } from './component-keywords';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Extended UI) ====================== */
function ExtStyles() {
  return (
    <style jsx global>{`
      .ext-root {
        --ext-radius-sm: 8px;
        --ext-radius-md: 12px;
        --ext-radius-lg: 16px;
        --ext-radius-xl: 20px;
        --ext-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --ext-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --ext-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --ext-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
        --ext-shadow-xl: 0 20px 32px -8px rgba(15,23,42,0.12), 0 8px 16px -8px rgba(15,23,42,0.06);
      }
      .ext-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .ext-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .ext-variant-title {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--text-strong);
        letter-spacing: -0.01em;
      }
      .ext-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
      @keyframes ext-fade-in {
        from { opacity: 0; transform: translateY(-4px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .ext-fade-in { animation: ext-fade-in 0.16s ease-out; transform-origin: top; }
      @keyframes ext-slide-up {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .ext-slide-up { animation: ext-slide-up 0.25s ease-out; }
      @keyframes ext-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .ext-pulse { animation: ext-pulse 2s ease-in-out infinite; }
      .ext-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
      .ext-scroll::-webkit-scrollbar-track { background: transparent; }
      .ext-scroll::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 3px; }
      .ext-card-hover {
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }
      .ext-card-hover:hover {
        transform: translateY(-2px);
        box-shadow: var(--ext-shadow-lg);
      }
    `}</style>
  );
}

export function ExtendedUIPage() {
  return (
    <div className="ext-root ext-bg space-y-6">
      <ExtStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Extended UI' }]} title="Extended UI" description="Full application surfaces — complete functional areas you'd ship in production SaaS products." />
      <ComponentKeywords keywords={['Gantt Chart', 'Changelog', 'Roadmap', 'Social Feed', 'Feature Flags', 'Status Page', 'Onboarding', 'Webhooks', 'Tasks', 'Notes']} />

      {/* ============================================ 1. GANTT CHART ============================================ */}
      <GanttChartSection />

      {/* ============================================ 2. CHANGELOG ============================================ */}
      <ChangelogSection />

      {/* ============================================ 3. PRODUCT ROADMAP ============================================ */}
      <RoadmapSection />

      {/* ============================================ 4. SOCIAL FEED ============================================ */}
      <SocialFeedSection />

      {/* ============================================ 5. FEATURE FLAGS ============================================ */}
      <FeatureFlagsSection />

      {/* ============================================ 6. STATUS PAGE ============================================ */}
      <StatusPageSection />

      {/* ============================================ 7. ONBOARDING WIZARD ============================================ */}
      <OnboardingWizardSection />

      {/* ============================================ 8. WEBHOOKS ============================================ */}
      <WebhooksSection />

      {/* ============================================ 9. TASKS / TODO ============================================ */}
      <TasksSection />

      {/* ============================================ 10. NOTES / WIKI ============================================ */}
      <NotesSection />
    </div>
  );
}

/* ====================== 1. GANTT CHART ====================== */
function GanttChartSection() {
  const tasks = [
    { id: 'g1', name: 'Discovery & Research', start: 0, duration: 3, color: 'var(--color-brand-500)', assignee: 'Sara', progress: 100, status: 'done' },
    { id: 'g2', name: 'Wireframes & Design', start: 2, duration: 4, color: 'var(--color-info-500)', assignee: 'James', progress: 100, status: 'done' },
    { id: 'g3', name: 'Backend API Development', start: 4, duration: 6, color: 'var(--color-success-500)', assignee: 'Alex', progress: 75, status: 'progress' },
    { id: 'g4', name: 'Frontend Implementation', start: 6, duration: 5, color: 'var(--color-warning-500)', assignee: 'Maria', progress: 40, status: 'progress' },
    { id: 'g5', name: 'QA & Testing', start: 10, duration: 3, color: 'var(--color-error-500)', assignee: 'James', progress: 0, status: 'todo' },
    { id: 'g6', name: 'Deployment & Launch', start: 12, duration: 2, color: '#7a5af8', assignee: 'Alex', progress: 0, status: 'todo' },
  ];
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12', 'W13', 'W14'];
  const totalWeeks = 14;
  const todayWeek = 7; // current progress indicator

  const statusStyles = {
    done: { label: 'Done', color: 'var(--color-success-500)' },
    progress: { label: 'In Progress', color: 'var(--color-brand-500)' },
    todo: { label: 'To Do', color: 'var(--text-muted)' },
  };

  return (
    <SectionCard title="Gantt Chart" description="Project timeline with task bars, progress indicators, assignees, and weekly grid. Visualize dependencies and track delivery across 14 weeks.">
      {/* Stats bar */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--ext-shadow-xs)]">
          <p className="ext-label">Total Tasks</p>
          <p className="mt-1 text-xl font-medium tabular-nums text-[var(--text-strong)]">{tasks.length}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--ext-shadow-xs)]">
          <p className="ext-label">Completed</p>
          <p className="mt-1 text-xl font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{tasks.filter(t => t.status === 'done').length}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--ext-shadow-xs)]">
          <p className="ext-label">In Progress</p>
          <p className="mt-1 text-xl font-medium tabular-nums text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{tasks.filter(t => t.status === 'progress').length}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--ext-shadow-xs)]">
          <p className="ext-label">Overall Progress</p>
          <p className="mt-1 text-xl font-medium tabular-nums text-[var(--text-strong)]">{Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length)}%</p>
        </div>
      </div>

      {/* Gantt chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Week headers */}
          <div className="flex border-b border-[var(--border)] pb-2">
            <div className="w-48 shrink-0 pr-3">
              <span className="ext-label">Task</span>
            </div>
            <div className="flex flex-1 gap-px">
              {weeks.map((week, i) => (
                <div key={week} className={cn('flex-1 text-center text-[10px] font-medium', i === todayWeek ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-muted)]')}>
                  {week}
                </div>
              ))}
            </div>
          </div>

          {/* Task rows */}
          <div className="relative">
            {/* Today indicator line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[var(--color-brand-500)] z-10"
              style={{ left: `calc(12rem + ${(todayWeek / totalWeeks) * 100}% - ${(todayWeek / totalWeeks) * 12}rem)`, boxShadow: '0 0 8px rgba(70,95,255,0.5)' }}
            >
              <div className="absolute -top-2 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-[var(--color-brand-500)] px-1.5 py-0.5">
                <span className="text-[8px] font-medium text-white">TODAY</span>
              </div>
            </div>

            {tasks.map(task => (
              <div key={task.id} className="flex items-center border-b border-[var(--border-subtle)] py-2.5">
                {/* Task name */}
                <div className="w-48 shrink-0 pr-3">
                  <p className="truncate text-sm font-medium text-[var(--text-strong)]">{task.name}</p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="inline-flex size-4 items-center justify-center rounded-full bg-[var(--surface-sunken)] text-[8px] font-medium text-[var(--text-muted)]">{task.assignee[0]}</span>
                    <span className={cn('text-[9px] font-medium', task.status === 'done' ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : task.status === 'progress' ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-muted)]')}>
                      {statusStyles[task.status as keyof typeof statusStyles].label}
                    </span>
                  </div>
                </div>

                {/* Task bar */}
                <div className="relative flex-1">
                  <div
                    className="relative h-7 rounded-lg overflow-hidden shadow-[var(--ext-shadow-xs)]"
                    style={{
                      marginLeft: `${(task.start / totalWeeks) * 100}%`,
                      width: `${(task.duration / totalWeeks) * 100}%`,
                      backgroundColor: `color-mix(in srgb, ${task.color} 20%, transparent)`,
                      border: `1px solid ${task.color}`,
                    }}
                  >
                    {/* Progress fill */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-l-lg transition-all"
                      style={{ width: `${task.progress}%`, backgroundColor: task.color, opacity: 0.8 }}
                    />
                    {/* Label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-medium text-white drop-shadow">{task.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--border-subtle)] pt-3">
        {Object.entries(statusStyles).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: val.color }} />
            <span className="text-[10px] font-medium text-[var(--text-muted)]">{val.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="inline-flex size-2 rounded-full bg-[var(--color-brand-500)]" />
          <span className="text-[10px] font-medium text-[var(--text-muted)]">Today (Week {todayWeek + 1})</span>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 2. CHANGELOG ====================== */
function ChangelogSection() {
  const [subscribed, setSubscribed] = React.useState(false);
  const releases = [
    {
      version: 'v2.4.1', date: 'Jun 22, 2025', tag: 'Patch',
      changes: [
        { type: 'fixed', text: 'Fixed issue where dark mode toggled on page refresh' },
        { type: 'fixed', text: 'Resolved timezone offset in date picker' },
        { type: 'improved', text: 'Reduced bundle size by 12% with tree-shaking' },
      ],
    },
    {
      version: 'v2.4.0', date: 'Jun 15, 2025', tag: 'Minor',
      changes: [
        { type: 'new', text: 'Added Command Palette with fuzzy search (⌘K)' },
        { type: 'new', text: 'New drag-and-drop Kanban board component' },
        { type: 'improved', text: 'Enhanced notification center with grouping' },
        { type: 'improved', text: 'Better keyboard navigation across all components' },
      ],
    },
    {
      version: 'v2.3.0', date: 'Jun 1, 2025', tag: 'Minor',
      changes: [
        { type: 'new', text: 'AI-powered content suggestions in editor' },
        { type: 'new', text: 'Webhook management with delivery history' },
        { type: 'fixed', text: 'Fixed drag-and-drop on touch devices' },
      ],
    },
  ];
  const typeStyles = {
    new: { icon: Sparkles, color: 'var(--color-success-500)', bg: 'var(--color-success-50)', label: 'New' },
    improved: { icon: TrendingUp, color: 'var(--color-brand-500)', bg: 'var(--color-brand-50)', label: 'Improved' },
    fixed: { icon: CheckCircle2, color: 'var(--color-warning-500)', bg: 'var(--color-warning-50)', label: 'Fixed' },
  };

  return (
    <SectionCard title="Changelog" description="Version timeline with semantic version badges, categorized changes (New/Improved/Fixed), subscribe button, and date stamps.">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><GitBranch className="size-5" strokeWidth={2.5} /></span>
          <div>
            <p className="text-sm font-medium text-[var(--text-strong)]">Latest: {releases[0].version}</p>
            <p className="text-xs font-medium text-[var(--text-muted)]">{releases[0].date}</p>
          </div>
        </div>
        <button
          onClick={() => setSubscribed(!subscribed)}
          className={cn(
            'inline-flex h-9 items-center gap-2 rounded-xl px-4 text-xs font-medium transition',
            subscribed ? 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]'
          )}
        >
          {subscribed ? <><Check className="size-3.5" strokeWidth={2.5} /> Subscribed</> : <><Bell className="size-3.5" strokeWidth={2.5} /> Subscribe</>}
        </button>
      </div>

      <div className="space-y-6">
        {releases.map((release, i) => (
          <div key={release.version} className="relative pl-8">
            {/* Timeline line */}
            {i < releases.length - 1 && <div className="absolute left-3 top-8 bottom-0 w-px bg-[var(--border)]" />}
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 inline-flex size-6 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white shadow-[var(--ext-shadow-sm)]">
              <span className="text-[10px] font-medium">{i + 1}</span>
            </div>
            {/* Release content */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--ext-shadow-xs)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-[var(--color-brand-50)] px-2 py-1 text-xs font-medium text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{release.version}</span>
                  <span className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">{release.tag}</span>
                </div>
                <span className="text-xs font-medium text-[var(--text-muted)]">{release.date}</span>
              </div>
              <div className="space-y-2">
                {release.changes.map((change, ci) => {
                  const style = typeStyles[change.type as keyof typeof typeStyles];
                  const Icon = style.icon;
                  return (
                    <div key={ci} className="flex items-start gap-2.5">
                      <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: style.bg, color: style.color }}>
                        <Icon className="size-3" strokeWidth={2.5} />
                      </span>
                      <div className="flex-1">
                        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: style.color }}>{style.label}</span>
                        <p className="text-sm font-medium text-[var(--text-body)]">{change.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ====================== 3. PRODUCT ROADMAP ====================== */
function RoadmapSection() {
  const [upvoted, setUpvoted] = React.useState<Set<string>>(new Set(['r2']));
  const columns = [
    {
      id: 'planned', title: 'Planned', color: 'var(--text-muted)', items: [
        { id: 'r1', title: 'Real-time collaboration', desc: 'Multiple users editing simultaneously', votes: 142, category: 'Collaboration', eta: 'Q3 2025' },
        { id: 'r2', title: 'Dark mode for docs', desc: 'Native dark theme for documentation', votes: 89, category: 'UI', eta: 'Q3 2025' },
      ],
    },
    {
      id: 'progress', title: 'In Progress', color: 'var(--color-brand-500)', items: [
        { id: 'r3', title: 'AI-powered search', desc: 'Semantic search across all content', votes: 256, category: 'AI', eta: 'Q2 2025' },
        { id: 'r4', title: 'Mobile app v2', desc: 'Native iOS and Android apps', votes: 198, category: 'Mobile', eta: 'Q2 2025' },
      ],
    },
    {
      id: 'shipped', title: 'Shipped', color: 'var(--color-success-500)', items: [
        { id: 'r5', title: 'Webhook system', desc: 'Custom event subscriptions', votes: 312, category: 'API', eta: 'Shipped' },
        { id: 'r6', title: 'Kanban board', desc: 'Drag-and-drop project management', votes: 274, category: 'Product', eta: 'Shipped' },
      ],
    },
  ];

  function toggleUpvote(id: string) {
    setUpvoted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <SectionCard title="Product Roadmap" description="Now / Next / Later columns with feature cards. Upvote with real counts, status badges, category tags, and estimated delivery.">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {columns.map(col => (
          <div key={col.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-3">
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: col.color }} />
              <span className="text-sm font-medium text-[var(--text-strong)]">{col.title}</span>
              <span className="rounded-full bg-[var(--card)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">{col.items.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {col.items.map(item => (
                <div key={item.id} className="ext-card-hover rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--ext-shadow-xs)]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-md bg-[var(--color-brand-50)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{item.category}</span>
                    <span className={cn('text-[10px] font-medium', col.id === 'shipped' ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-muted)]')}>{item.eta}</span>
                  </div>
                  <p className="text-sm font-medium text-[var(--text-strong)]">{item.title}</p>
                  <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{item.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={() => toggleUpvote(item.id)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-medium transition',
                        upvoted.has(item.id)
                          ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white'
                          : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] hover:border-[var(--color-brand-300)] hover:text-[var(--text-strong)]'
                      )}
                    >
                      <ArrowUp className="size-3" strokeWidth={2.5} />
                      {item.votes + (upvoted.has(item.id) ? 1 : 0)}
                    </button>
                    {col.id === 'shipped' && <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]"><CheckCircle2 className="size-3" strokeWidth={2.5} /> Shipped</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ====================== 4. SOCIAL FEED ====================== */
function SocialFeedSection() {
  const [posts, setPosts] = React.useState([
    {
      id: 'p1', author: 'Sara Nguyen', role: 'Product Designer @ Acme', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50',
      time: '2h', content: 'Just shipped our new command palette with fuzzy search and keyboard navigation. It feels like magic! ✨ Try it with ⌘K.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=280&fit=crop',
      likes: 42, comments: 8, shares: 3, liked: false,
    },
    {
      id: 'p2', author: 'James Park', role: 'Senior Engineer @ TechCorp', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50',
      time: '5h', content: 'Hot take: The best UI components are the ones you don\'t notice. They just work, feel natural, and get out of your way.',
      likes: 128, comments: 24, shares: 12, liked: true,
    },
    {
      id: 'p3', author: 'Maria Lopez', role: 'Engineering Manager @ Startup', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50',
      time: '1d', content: 'Our team just migrated to the new dashboard kit. Development velocity is up 3x. The drag-and-drop kanban alone saved us a sprint of work.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=280&fit=crop',
      likes: 89, comments: 15, shares: 7, liked: false,
    },
  ]);
  const [composing, setComposing] = React.useState('');

  function toggleLike(id: string) {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  }
  function post() {
    if (!composing.trim()) return;
    setPosts(prev => [{
      id: 'p' + Date.now(), author: 'You', role: 'Developer', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50',
      time: 'now', content: composing, likes: 0, comments: 0, shares: 0, liked: false,
    }, ...prev]);
    setComposing('');
  }

  return (
    <SectionCard title="Social Feed" description="Post composer + timeline with author avatar, content, image embed, like/comment/share counts, and real engagement metrics.">
      {/* Composer */}
      <div className="mb-5 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--ext-shadow-xs)]">
        <div className="flex gap-3">
          <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50" alt="" className="size-10 rounded-full object-cover" />
          <div className="flex-1">
            <textarea
              value={composing}
              onChange={e => setComposing(e.target.value)}
              placeholder="Share something with the community..."
              rows={2}
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-3 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-1">
                <button className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--color-brand-500)]"><FileText className="size-4" strokeWidth={2.5} /></button>
                <button className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--color-brand-500)]"><Sparkles className="size-4" strokeWidth={2.5} /></button>
              </div>
              <button onClick={post} disabled={!composing.trim()} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--color-brand-500)] px-4 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)] disabled:opacity-40">Post</button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="ext-slide-up rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--ext-shadow-xs)]">
            <div className="flex items-start gap-3">
              <img src={post.avatar} alt={post.author} className="size-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[var(--text-strong)]">{post.author}</p>
                  <span className="text-xs font-medium text-[var(--text-muted)]">·</span>
                  <span className="text-xs font-medium text-[var(--text-muted)]">{post.time}</span>
                </div>
                <p className="text-xs font-medium text-[var(--text-muted)]">{post.role}</p>
              </div>
              <button className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><MoreHorizontal className="size-4" strokeWidth={2.5} /></button>
            </div>
            <p className="mt-3 text-sm font-medium text-[var(--text-body)]">{post.content}</p>
            {post.image && <img src={post.image} alt="" className="mt-3 h-56 w-full rounded-xl object-cover" />}
            <div className="mt-3 flex items-center gap-4 border-t border-[var(--border-subtle)] pt-3">
              <button onClick={() => toggleLike(post.id)} className={cn('inline-flex items-center gap-1.5 text-xs font-medium transition', post.liked ? 'text-[var(--color-error-500)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>
                <Heart className={cn('size-4', post.liked && 'fill-current')} strokeWidth={2.5} /> {post.likes}
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
                <MessageSquare className="size-4" strokeWidth={2.5} /> {post.comments}
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
                <Share2 className="size-4" strokeWidth={2.5} /> {post.shares}
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ====================== 5. FEATURE FLAGS ====================== */
function FeatureFlagsSection() {
  const [flags, setFlags] = React.useState([
    { id: 'f1', name: 'new-dashboard', desc: 'Redesigned analytics dashboard with real-time updates', env: { dev: true, staging: true, prod: false }, modified: '2h ago', targeted: '10% rollout' },
    { id: 'f2', name: 'ai-assistant', desc: 'AI-powered content suggestions in editor', env: { dev: true, staging: true, prod: true }, modified: '1d ago', targeted: 'All users' },
    { id: 'f3', name: 'dark-mode-v2', desc: 'Improved dark theme with better contrast', env: { dev: true, staging: false, prod: false }, modified: '3d ago', targeted: 'Beta testers' },
    { id: 'f4', name: 'webhooks-v2', desc: 'New webhook system with delivery history', env: { dev: true, staging: true, prod: false }, modified: '5h ago', targeted: 'Internal team' },
    { id: 'f5', name: 'billing-v3', desc: 'Stripe billing integration v3 with usage-based pricing', env: { dev: false, staging: false, prod: false }, modified: '1w ago', targeted: 'Disabled' },
  ]);
  const [search, setSearch] = React.useState('');

  function toggleEnv(flagId: string, env: 'dev' | 'staging' | 'prod') {
    setFlags(prev => prev.map(f => f.id === flagId ? { ...f, env: { ...f.env, [env]: !f.env[env] } } : f));
  }

  const filtered = flags.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.desc.toLowerCase().includes(search.toLowerCase()));
  const envColors = {
    dev: 'var(--color-warning-500)',
    staging: 'var(--color-brand-500)',
    prod: 'var(--color-success-500)',
  };

  return (
    <SectionCard title="Feature Flags" description="Toggle list with flag name, description, environment toggles (Dev/Staging/Prod), targeting rules, and last modified. Search to filter.">
      {/* Search */}
      <div className="mb-4 relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search flags..."
          className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-4 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] shadow-[var(--ext-shadow-xs)] placeholder:text-[var(--text-subtle)]"
        />
      </div>

      {/* Flags */}
      <div className="space-y-2">
        {filtered.map(flag => (
          <div key={flag.id} className="ext-card-hover rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--ext-shadow-xs)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <code className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-xs font-medium text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{flag.name}</code>
                  <span className="rounded-md bg-[var(--color-brand-50)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{flag.targeted}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">{flag.desc}</p>
                <p className="mt-1 text-[10px] font-medium text-[var(--text-subtle)]">Modified {flag.modified}</p>
              </div>
              {/* Env toggles */}
              <div className="flex items-center gap-4">
                {(['dev', 'staging', 'prod'] as const).map(env => (
                  <button
                    key={env}
                    onClick={() => toggleEnv(flag.id, env)}
                    className="flex items-center gap-2"
                  >
                    <span className={cn('text-[10px] font-medium uppercase transition-colors', flag.env[env] ? 'text-[var(--text-strong)]' : 'text-[var(--text-muted)]')}>{env}</span>
                    <div
                      className={cn('relative h-6 w-11 rounded-full transition-colors duration-200', flag.env[env] ? '' : 'bg-[var(--border-strong)]')}
                      style={flag.env[env] ? { backgroundColor: envColors[env] } : {}}
                    >
                      <span className={cn('absolute top-0.5 size-5 rounded-full bg-white shadow-md transition-transform duration-200', flag.env[env] ? 'translate-x-[22px]' : 'translate-x-0.5')} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ====================== 6. STATUS PAGE ====================== */
function StatusPageSection() {
  const [subscribed, setSubscribed] = React.useState(false);
  const components = [
    { name: 'API', status: 'operational', uptime: '99.98%', icon: Server },
    { name: 'Web App', status: 'operational', uptime: '99.99%', icon: Globe },
    { name: 'Database', status: 'operational', uptime: '99.97%', icon: Database },
    { name: 'CDN', status: 'degraded', uptime: '99.85%', icon: Cloud },
    { name: 'AI Services', status: 'operational', uptime: '99.92%', icon: Cpu },
  ];
  const statusStyles = {
    operational: { color: 'var(--color-success-500)', label: 'Operational', bg: 'var(--color-success-50)' },
    degraded: { color: 'var(--color-warning-500)', label: 'Degraded Performance', bg: 'var(--color-warning-50)' },
    partial: { color: 'var(--color-warning-500)', label: 'Partial Outage', bg: 'var(--color-warning-50)' },
    major: { color: 'var(--color-error-500)', label: 'Major Outage', bg: 'var(--color-error-50)' },
  };
  const incidents = [
    { title: 'CDN latency in EU region', status: 'monitoring', time: '15 min ago', desc: 'We are investigating increased latency in our EU CDN edge nodes. Some users may experience slow asset loading.' },
  ];

  return (
    <SectionCard title="Status Page" description="System status with overall banner, component list (API/Web/DB/CDN) with uptime, active incidents, and subscribe button.">
      {/* Overall status banner */}
      <div className="mb-5 flex items-center justify-between rounded-xl border border-[var(--color-warning-200)] bg-[var(--color-warning-50)] p-4 dark:border-[rgba(247,144,9,0.18)] dark:bg-[rgba(247,144,9,0.06)]">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--color-warning-500)] text-white ext-pulse"><AlertCircle className="size-5" strokeWidth={2.5} /></span>
          <div>
            <p className="text-sm font-medium text-[var(--text-strong)]">Partial System Degradation</p>
            <p className="text-xs font-medium text-[var(--text-muted)]">CDN experiencing latency issues in EU region</p>
          </div>
        </div>
        <button
          onClick={() => setSubscribed(!subscribed)}
          className={cn(
            'inline-flex h-9 items-center gap-2 rounded-xl px-4 text-xs font-medium transition',
            subscribed ? 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]'
          )}
        >
          {subscribed ? <><Check className="size-3.5" strokeWidth={2.5} /> Subscribed</> : <><Bell className="size-3.5" strokeWidth={2.5} /> Subscribe</>}
        </button>
      </div>

      {/* Component list */}
      <div className="mb-5 space-y-2">
        {components.map(comp => {
          const style = statusStyles[comp.status as keyof typeof statusStyles];
          const Icon = comp.icon;
          return (
            <div key={comp.name} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--ext-shadow-xs)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-lg" style={{ backgroundColor: style.bg, color: style.color }}>
                  <Icon className="size-4" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--text-strong)]">{comp.name}</p>
                  <p className="text-[10px] font-medium text-[var(--text-muted)]">{style.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* 30-day uptime bars */}
                <div className="hidden items-center gap-0.5 sm:flex">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-5 w-0.5 rounded-full"
                      style={{ backgroundColor: comp.status === 'degraded' && i > 25 ? 'var(--color-warning-500)' : 'var(--color-success-500)' }}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium tabular-nums text-[var(--text-muted)]">{comp.uptime}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active incidents */}
      <div>
        <p className="ext-label mb-3">Active Incidents</p>
        <div className="rounded-xl border border-[var(--color-warning-200)] bg-[var(--card)] p-4 shadow-[var(--ext-shadow-xs)] dark:border-[rgba(247,144,9,0.18)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-md bg-[var(--color-warning-50)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">MONITORING</span>
            <span className="text-xs font-medium text-[var(--text-muted)]">{incidents[0].time}</span>
          </div>
          <p className="text-sm font-medium text-[var(--text-strong)]">{incidents[0].title}</p>
          <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">{incidents[0].desc}</p>
          <div className="mt-3 flex items-center gap-2">
            <Clock className="size-3.5 text-[var(--color-warning-500)] ext-pulse" strokeWidth={2.5} />
            <span className="text-[10px] font-medium text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">Investigating — updates every 15 min</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 7. ONBOARDING WIZARD ====================== */
function OnboardingWizardSection() {
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('');
  const [teamSize, setTeamSize] = React.useState('');
  const [integrations, setIntegrations] = React.useState<string[]>([]);
  const steps = ['Welcome', 'Profile', 'Team', 'Integrations', 'Done'];
  const stepIcons = [Sparkles, User, Users, GitBranch, CheckCircle2];

  function next() { setStep(s => Math.min(s + 1, steps.length - 1)); }
  function prev() { setStep(s => Math.max(s - 1, 0)); }
  function toggleIntegration(id: string) {
    setIntegrations(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  const integrationOptions = [
    { id: 'slack', name: 'Slack', icon: MessageSquare, color: 'var(--color-brand-500)' },
    { id: 'github', name: 'GitHub', icon: GitBranch, color: 'var(--text-strong)' },
    { id: 'figma', name: 'Figma', icon: Eye, color: 'var(--color-error-500)' },
    { id: 'linear', name: 'Linear', icon: Zap, color: 'var(--color-brand-500)' },
  ];

  return (
    <SectionCard title="Onboarding Wizard" description="Multi-step setup flow: Welcome → Profile → Team → Integrations → Done. Progress bar, skip option, and interactive forms.">
      <div className="mx-auto max-w-2xl">
        {/* Progress bar */}
        <div className="mb-6 flex items-center justify-between">
          {steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={cn(
                    'inline-flex size-9 items-center justify-center rounded-full text-xs font-medium transition',
                    i < step ? 'bg-[var(--color-success-500)] text-white' :
                    i === step ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--ext-shadow-md)]' :
                    'bg-[var(--surface-sunken)] text-[var(--text-muted)]'
                  )}>
                    {i < step ? <Check className="size-4" strokeWidth={2.5} /> : <Icon className="size-4" strokeWidth={2.5} />}
                  </div>
                  <span className={cn('text-[10px] font-medium', i <= step ? 'text-[var(--text-strong)]' : 'text-[var(--text-muted)]')}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className={cn('h-0.5 flex-1 rounded-full transition-colors', i < step ? 'bg-[var(--color-success-500)]' : 'bg-[var(--border)]')} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step content */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--ext-shadow-xs)]">
          {step === 0 && (
            <div className="ext-slide-up text-center">
              <div className="mx-auto mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[var(--ext-shadow-lg)]">
                <Sparkles className="size-8" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-medium text-[var(--text-strong)]">Welcome to mtverse!</h3>
              <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">Let's get your workspace set up in just a few steps. This takes less than 2 minutes.</p>
            </div>
          )}
          {step === 1 && (
            <div className="ext-slide-up space-y-4">
              <h3 className="text-lg font-medium text-[var(--text-strong)]">Tell us about yourself</h3>
              <div>
                <label className="ext-variant-title mb-2 block">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Arun Pandian" className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] shadow-[var(--ext-shadow-xs)] placeholder:text-[var(--text-subtle)]" />
              </div>
              <div>
                <label className="ext-variant-title mb-2 block">Role</label>
                <div className="flex flex-wrap gap-2">
                  {['Developer', 'Designer', 'Product Manager', 'Other'].map(r => (
                    <button key={r} onClick={() => setRole(r)} className={cn('rounded-lg border px-3 py-2 text-xs font-medium transition', role === r ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:bg-[var(--surface-sunken)]')}>{r}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="ext-slide-up space-y-4">
              <h3 className="text-lg font-medium text-[var(--text-strong)]">How big is your team?</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Just me', '2-10', '11-50', '50+'].map(size => (
                  <button key={size} onClick={() => setTeamSize(size)} className={cn('rounded-xl border-2 p-4 text-sm font-medium transition', teamSize === size ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:border-[var(--color-brand-300)]')}>{size}</button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="ext-slide-up space-y-4">
              <h3 className="text-lg font-medium text-[var(--text-strong)]">Connect your tools</h3>
              <p className="text-sm font-medium text-[var(--text-muted)]">Skip this step — you can always connect later in Settings.</p>
              <div className="grid grid-cols-2 gap-3">
                {integrationOptions.map(opt => {
                  const Icon = opt.icon;
                  const connected = integrations.includes(opt.id);
                  return (
                    <button key={opt.id} onClick={() => toggleIntegration(opt.id)} className={cn('flex items-center gap-3 rounded-xl border-2 p-3 text-left transition', connected ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]' : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--color-brand-300)]')}>
                      <span className="inline-flex size-9 items-center justify-center rounded-lg" style={{ color: opt.color }}><Icon className="size-5" strokeWidth={2.5} /></span>
                      <span className="flex-1 text-sm font-medium text-[var(--text-strong)]">{opt.name}</span>
                      {connected && <Check className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="ext-slide-up text-center">
              <div className="mx-auto mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-[var(--color-success-500)] text-white shadow-[var(--ext-shadow-lg)]">
                <CheckCircle2 className="size-8" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-medium text-[var(--text-strong)]">You're all set!</h3>
              <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">Your workspace is ready. Let's build something amazing together.</p>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
            <button onClick={prev} disabled={step === 0} className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] disabled:opacity-40">
              <ChevronLeft className="size-3.5" strokeWidth={2.5} /> Back
            </button>
            <div className="flex items-center gap-2">
              {step < steps.length - 2 && <button onClick={next} className="text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">Skip</button>}
              {step < steps.length - 1 ? (
                <button onClick={next} className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[var(--color-brand-500)] px-5 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]">
                  Continue <ChevronRight className="size-3.5" strokeWidth={2.5} />
                </button>
              ) : (
                <button onClick={() => setStep(0)} className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[var(--color-success-500)] px-5 text-xs font-medium text-white transition hover:bg-[var(--color-success-600)]">
                  <Check className="size-3.5" strokeWidth={2.5} /> Start Over
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 8. WEBHOOKS ====================== */
function WebhooksSection() {
  const [webhooks, setWebhooks] = React.useState([
    { id: 'w1', url: 'https://api.example.com/hooks/orders', events: ['order.created', 'order.updated'], status: 'active', lastDelivery: '2 min ago', successRate: 99.8 },
    { id: 'w2', url: 'https://hooks.slack.com/services/T0/B0/X', events: ['user.signup', 'payment.failed'], status: 'active', lastDelivery: '1h ago', successRate: 100 },
    { id: 'w3', url: 'https://api.stripe.com/webhooks/wh_123', events: ['invoice.paid'], status: 'disabled', lastDelivery: '3d ago', successRate: 95.2 },
  ]);
  const [showCreate, setShowCreate] = React.useState(false);
  const [newUrl, setNewUrl] = React.useState('');
  const [newEvents, setNewEvents] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState(false);
  const secret = 'whsec_9a8b7c6d5e4f3g2h1i';

  function toggleStatus(id: string) {
    setWebhooks(prev => prev.map(w => w.id === id ? { ...w, status: w.status === 'active' ? 'disabled' : 'active' } : w));
  }
  function createWebhook() {
    if (!newUrl.trim()) return;
    setWebhooks(prev => [...prev, { id: 'w' + Date.now(), url: newUrl, events: newEvents.length ? newEvents : ['order.created'], status: 'active', lastDelivery: 'never', successRate: 0 }]);
    setNewUrl(''); setNewEvents([]); setShowCreate(false);
  }

  const availableEvents = ['order.created', 'order.updated', 'order.cancelled', 'user.signup', 'user.deleted', 'payment.failed', 'payment.success', 'invoice.paid'];

  return (
    <SectionCard title="Webhooks" description="Endpoint CRUD — create, list, test. Event subscriptions, delivery history, secret key, and status toggle.">
      {/* Secret key */}
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-3">
        <Shield className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
        <span className="flex-1 truncate font-mono text-xs font-semibold text-[var(--text-body)]">{secret}</span>
        <button
          onClick={() => { navigator.clipboard?.writeText(secret); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className={cn('inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-medium transition', copied ? 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]')}
        >
          {copied ? <><Check className="size-3" strokeWidth={2.5} /> Copied</> : <><Copy className="size-3" strokeWidth={2.5} /> Copy</>}
        </button>
      </div>

      {/* Create webhook toggle */}
      <button
        onClick={() => setShowCreate(!showCreate)}
        className="mb-4 inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]"
      >
        <Plus className="size-3.5" strokeWidth={2.5} /> Add Endpoint
      </button>

      {showCreate && (
        <div className="ext-slide-up mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--ext-shadow-xs)]">
          <div className="mb-3">
            <label className="ext-variant-title mb-2 block">Endpoint URL</label>
            <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="https://your-app.com/webhooks" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] shadow-[var(--ext-shadow-xs)] placeholder:text-[var(--text-subtle)]" />
          </div>
          <div className="mb-3">
            <label className="ext-variant-title mb-2 block">Events to subscribe</label>
            <div className="flex flex-wrap gap-2">
              {availableEvents.map(ev => (
                <button key={ev} onClick={() => setNewEvents(prev => prev.includes(ev) ? prev.filter(e => e !== ev) : [...prev, ev])} className={cn('rounded-lg border px-2.5 py-1 text-[10px] font-medium transition', newEvents.includes(ev) ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] hover:bg-[var(--surface-sunken)]')}>{ev}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={createWebhook} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--color-brand-500)] px-3 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]">Create</button>
            <button onClick={() => setShowCreate(false)} className="inline-flex h-8 items-center rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">Cancel</button>
          </div>
        </div>
      )}

      {/* Webhook list */}
      <div className="space-y-2">
        {webhooks.map(wh => (
          <div key={wh.id} className="ext-card-hover rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--ext-shadow-xs)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Webhook className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} />
                  <code className="truncate text-xs font-medium text-[var(--text-strong)]">{wh.url}</code>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {wh.events.map(ev => <span key={ev} className="rounded-md bg-[var(--color-brand-50)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{ev}</span>)}
                </div>
                <p className="mt-1.5 text-[10px] font-medium text-[var(--text-subtle)]">Last delivery: {wh.lastDelivery} · Success rate: {wh.successRate}%</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn('rounded-md px-2 py-0.5 text-[10px] font-medium uppercase', wh.status === 'active' ? 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>{wh.status}</span>
                <button onClick={() => toggleStatus(wh.id)} className="inline-flex size-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Settings className="size-3.5" strokeWidth={2.5} /></button>
                <button className="inline-flex size-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--color-error-500)]"><Trash2 className="size-3.5" strokeWidth={2.5} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ====================== 9. TASKS / TODO ====================== */
function TasksSection() {
  const [tasks, setTasks] = React.useState([
    { id: 't1', title: 'Review pull request #1428', priority: 'high', done: false, due: 'Today', tags: ['review'] },
    { id: 't2', title: 'Design new onboarding flow', priority: 'medium', done: false, due: 'Tomorrow', tags: ['design'] },
    { id: 't3', title: 'Fix dark mode contrast issues', priority: 'high', done: false, due: 'Today', tags: ['bug', 'ui'] },
    { id: 't4', title: 'Update API documentation', priority: 'low', done: true, due: 'Yesterday', tags: ['docs'] },
    { id: 't5', title: 'Setup analytics dashboard', priority: 'medium', done: false, due: 'Jun 28', tags: ['analytics'] },
  ]);
  const [newTask, setNewTask] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | 'active' | 'done'>('all');

  function addTask() {
    if (!newTask.trim()) return;
    setTasks(prev => [{ id: 't' + Date.now(), title: newTask, priority: 'medium', done: false, due: 'Today', tags: [] }, ...prev]);
    setNewTask('');
  }
  function toggleTask(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }
  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const filtered = tasks.filter(t => filter === 'all' ? true : filter === 'active' ? !t.done : t.done);
  const priorityColors = {
    low: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    medium: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    high: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
  };

  return (
    <SectionCard title="Tasks / Todo" description="Draggable task list with priorities, due dates, tags, completion animation, and filter by status.">
      {/* Add task input */}
      <div className="mb-4 flex gap-2">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task... (press Enter)"
          className="h-10 flex-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] shadow-[var(--ext-shadow-xs)] placeholder:text-[var(--text-subtle)]"
        />
        <button onClick={addTask} className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[var(--color-brand-500)] px-4 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]">
          <Plus className="size-3.5" strokeWidth={2.5} /> Add
        </button>
      </div>

      {/* Filter tabs */}
      <div className="mb-3 inline-flex gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
        {(['all', 'active', 'done'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cn('inline-flex h-7 items-center rounded-lg px-3 text-xs font-medium capitalize transition', filter === f ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-[var(--ext-shadow-xs)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>
            {f} <span className="ml-1 text-[10px]">{f === 'all' ? tasks.length : f === 'active' ? tasks.filter(t => !t.done).length : tasks.filter(t => t.done).length}</span>
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-1.5">
        {filtered.map(task => (
          <div key={task.id} className={cn('ext-slide-up group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--ext-shadow-xs)] transition', task.done && 'opacity-60')}>
            <button
              onClick={() => toggleTask(task.id)}
              className={cn('inline-flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition', task.done ? 'border-[var(--color-success-500)] bg-[var(--color-success-500)] text-white' : 'border-[var(--border-strong)] hover:border-[var(--color-brand-500)]')}
            >
              {task.done && <Check className="size-3" strokeWidth={3} />}
            </button>
            <div className="min-w-0 flex-1">
              <p className={cn('text-sm font-medium text-[var(--text-strong)]', task.done && 'line-through')}>{task.title}</p>
              <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                <span className={cn('rounded-md px-1.5 py-0.5 text-[9px] font-medium uppercase', priorityColors[task.priority as keyof typeof priorityColors])}>{task.priority}</span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[var(--text-muted)]"><Clock className="size-2.5" strokeWidth={2.5} />{task.due}</span>
                {task.tags.map(tag => <span key={tag} className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--text-muted)]">{tag}</span>)}
              </div>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-[var(--text-muted)] opacity-0 transition hover:text-[var(--color-error-500)] group-hover:opacity-100"><Trash2 className="size-4" strokeWidth={2.5} /></button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ====================== 10. NOTES / WIKI ====================== */
function NotesSection() {
  const [notes, setNotes] = React.useState([
    { id: 'n1', title: 'Sprint Planning Notes', content: 'Key priorities for Q3: ship command palette, improve onboarding flow, and launch the new dashboard...', color: 'var(--color-brand-500)', pinned: true, tag: 'Meeting', date: 'Jun 22' },
    { id: 'n2', title: 'API Design Ideas', content: 'Consider GraphQL for v3 API. Benefits: client-driven queries, reduced over-fetching, better DX...', color: 'var(--color-success-500)', pinned: false, tag: 'Engineering', date: 'Jun 21' },
    { id: 'n3', title: 'Customer Feedback', content: 'Users want bulk actions in the data table. Top 3 requests: bulk delete, bulk export, bulk assign...', color: 'var(--color-warning-500)', pinned: false, tag: 'Product', date: 'Jun 20' },
    { id: 'n4', title: 'Design System Updates', content: 'New color tokens approved. Need to migrate all components to use CSS custom properties...', color: '#7a5af8', pinned: true, tag: 'Design', date: 'Jun 19' },
    { id: 'n5', title: 'Hiring Pipeline', content: '3 senior engineers in final round. Need to schedule onsite interviews next week...', color: 'var(--color-error-500)', pinned: false, tag: 'HR', date: 'Jun 18' },
    { id: 'n6', title: 'Competitor Analysis', content: 'Linear launched new project views. Notion added AI search. We should differentiate on...', color: 'var(--color-info-500)', pinned: false, tag: 'Research', date: 'Jun 17' },
  ]);
  const [search, setSearch] = React.useState('');
  const [editing, setEditing] = React.useState<string | null>(null);

  function togglePin(id: string) {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  }

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.tag.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <SectionCard title="Notes / Wiki" description="Notion-style note cards with title, content, tags, color accents, search, and pin. Click pin to prioritize important notes.">
      {/* Search */}
      <div className="mb-4 relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-4 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] shadow-[var(--ext-shadow-xs)] placeholder:text-[var(--text-subtle)]"
        />
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map(note => (
          <div
            key={note.id}
            className="ext-card-hover group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--ext-shadow-xs)]"
          >
            {/* Color accent bar */}
            <div className="absolute left-0 top-0 h-1 w-full" style={{ backgroundColor: note.color }} />
            {/* Pin button */}
            <button
              onClick={() => togglePin(note.id)}
              className={cn('absolute right-2 top-3 inline-flex size-6 items-center justify-center rounded-lg transition', note.pinned ? 'text-[var(--color-warning-500)]' : 'text-[var(--text-muted)] opacity-0 hover:text-[var(--text-strong)] group-hover:opacity-100')}
            >
              {note.pinned ? <Star className="size-3.5 fill-current" strokeWidth={2.5} /> : <Star className="size-3.5" strokeWidth={2.5} />}
            </button>
            {/* Content */}
            <div className="mt-1">
              <span className="rounded-md px-1.5 py-0.5 text-[9px] font-medium uppercase" style={{ backgroundColor: `color-mix(in srgb, ${note.color} 12%, transparent)`, color: note.color }}>{note.tag}</span>
              <p className="mt-2 text-sm font-medium text-[var(--text-strong)]">{note.title}</p>
              <p className="mt-1 line-clamp-3 text-xs font-medium text-[var(--text-muted)]">{note.content}</p>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2">
                <span className="text-[10px] font-medium text-[var(--text-subtle)]">{note.date}</span>
                <button className="text-[10px] font-medium text-[var(--text-muted)] transition hover:text-[var(--color-brand-500)]">Edit</button>
              </div>
            </div>
          </div>
        ))}
        {/* Add note card */}
        <button className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)] text-[var(--text-muted)] transition hover:border-[var(--color-brand-500)] hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-500)] dark:hover:bg-[rgba(70,95,255,0.08)]">
          <Plus className="size-6" strokeWidth={2.5} />
          <span className="text-xs font-medium">Add Note</span>
        </button>
      </div>
    </SectionCard>
  );
}
