'use client';

import * as React from 'react';
import { Bot, Plus, Clock, TrendingUp, Zap, FileText, Code2, Image as ImageIcon, Video, Brain, Sparkles, Cpu, DollarSign, Activity } from 'lucide-react';
import { PageHeader, SectionCard, MetricCard, StatusBadge, UserAvatar, ProgressBar } from '@/components/dashboard/primitives';
import { useDashboardStore } from '@/lib/dashboard-store';
import { cn } from '@/lib/utils';

export function AIWorkspacePage() {
  const setAi = useDashboardStore((s) => s.setAiAssistant);

  const projects = [
    { name: 'E-commerce Chatbot', type: 'Chat', model: 'GPT-4 Turbo', status: 'Active', updated: '2 hours ago', icon: Bot, color: 'brand' },
    { name: 'Product Image Generator', type: 'Image', model: 'DALL-E 3', status: 'Active', updated: '1 day ago', icon: ImageIcon, color: 'success' },
    { name: 'Code Review Assistant', type: 'Code', model: 'Claude 3.5', status: 'Draft', updated: '3 days ago', icon: Code2, color: 'warning' },
    { name: 'Video Summary Bot', type: 'Video', model: 'Gemini 1.5', status: 'Active', updated: '5 days ago', icon: Video, color: 'info' },
  ];

  const recentFiles = [
    { name: 'chatbot-training-data.json', size: '2.4 MB', type: 'json' },
    { name: 'prompt-templates.md', size: '48 KB', type: 'md' },
    { name: 'fine-tuned-model-v3.bin', size: '1.2 GB', type: 'bin' },
    { name: 'evaluation-results.csv', size: '184 KB', type: 'csv' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'AI Assistant' }, { label: 'Workspace' }]}
        title="AI Workspace"
        description="Manage your AI projects, models, and recent files."
        actions={<button type="button" className="ds-btn ds-btn-primary" onClick={() => setAi('chat')}><Plus className="size-4" /> New project</button>}
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard index={0} label="Active Projects" value="4" helper="2 in production" icon={Bot} accent="brand" />
        <MetricCard index={1} label="Total API Calls" value="1.42M" helper="This month" trend={{ direction: 'up', value: '18.4%' }} icon={Zap} accent="info" />
        <MetricCard index={2} label="Monthly Spend" value="$11,420" helper="Avg $380/day" trend={{ direction: 'up', value: '14.8%' }} icon={DollarSign} accent="warning" />
        <MetricCard index={3} label="Avg Latency" value="2.4s" helper="P50 across models" trend={{ direction: 'down', value: '0.4s' }} icon={Activity} accent="success" />
      </div>

      {/* Projects grid */}
      <SectionCard title="Projects" description="Your AI projects and assistants">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div key={proj.name} className="ds-card ds-card-pad ds-card-hover cursor-pointer" onClick={() => setAi('chat')}>
                <div className="flex items-start justify-between">
                  <span className={cn('inline-flex size-11 items-center justify-center rounded-xl',
                    proj.color === 'brand' && 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
                    proj.color === 'success' && 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
                    proj.color === 'warning' && 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
                    proj.color === 'info' && 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
                  )}>
                    <Icon className="size-5" />
                  </span>
                  <StatusBadge tone={proj.status === 'Active' ? 'success' : 'warning'} dot>{proj.status}</StatusBadge>
                </div>
                <p className="mt-4 text-sm font-semibold text-[var(--text-strong)]">{proj.name}</p>
                <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{proj.type} · {proj.model}</p>
                <div className="mt-3 flex items-center gap-1.5 border-t border-[var(--border-subtle)] pt-3 text-xs font-medium text-[var(--text-subtle)]">
                  <Clock className="size-3" /> Updated {proj.updated}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Quick actions + recent files */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Quick Actions" description="Jump to a tool">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Chat', icon: Bot, action: 'chat', color: 'brand' },
              { label: 'Image Gen', icon: ImageIcon, action: 'image-generator', color: 'success' },
              { label: 'Code Gen', icon: Code2, action: 'code-generator', color: 'warning' },
              { label: 'Video Gen', icon: Video, action: 'video-generator', color: 'info' },
            ].map((qa) => {
              const Icon = qa.icon;
              return (
                <button key={qa.label} type="button" onClick={() => setAi(qa.action as never)} className={cn('flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] p-4 transition hover:border-[var(--color-brand-400)] hover:bg-[var(--surface-sunken)]',
                )}>
                  <span className={cn('inline-flex size-10 items-center justify-center rounded-lg',
                    qa.color === 'brand' && 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
                    qa.color === 'success' && 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
                    qa.color === 'warning' && 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
                    qa.color === 'info' && 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
                  )}>
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-strong)]">{qa.label}</span>
                </button>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Recent Files" description="Recently uploaded or generated">
          <ul className="space-y-2">
            {recentFiles.map((file) => (
              <li key={file.name} className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-3 transition hover:bg-[var(--surface-sunken)]">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--surface-sunken)] text-[var(--text-muted)]">
                  <FileText className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--text-strong)]">{file.name}</p>
                  <p className="text-xs font-medium text-[var(--text-muted)]">{file.size} · {file.type.toUpperCase()}</p>
                </div>
                <span className="text-[var(--text-muted)]">→</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Available models */}
      <SectionCard title="Available Models" description="Models configured for your workspace">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { name: 'GPT-4 Turbo', provider: 'OpenAI', calls: '384K', cost: '$4,820', icon: Brain, color: 'brand' },
            { name: 'Claude 3.5', provider: 'Anthropic', calls: '284K', cost: '$3,180', icon: Sparkles, color: 'success' },
            { name: 'Gemini 1.5 Pro', provider: 'Google', calls: '124K', cost: '$1,840', icon: Cpu, color: 'info' },
            { name: 'DALL-E 3', provider: 'OpenAI', calls: '12.4K', cost: '$620', icon: ImageIcon, color: 'warning' },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.name} className="rounded-xl border border-[var(--border-subtle)] p-4">
                <div className="flex items-center justify-between">
                  <span className={cn('inline-flex size-9 items-center justify-center rounded-lg',
                    m.color === 'brand' && 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
                    m.color === 'success' && 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
                    m.color === 'info' && 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
                    m.color === 'warning' && 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
                  )}>
                    <Icon className="size-5" />
                  </span>
                  <StatusBadge tone="success" dot>Active</StatusBadge>
                </div>
                <p className="mt-3 text-sm font-semibold text-[var(--text-strong)]">{m.name}</p>
                <p className="text-xs font-medium text-[var(--text-muted)]">{m.provider}</p>
                <div className="mt-3 border-t border-[var(--border-subtle)] pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[var(--text-muted)]">Calls</span>
                    <span className="font-semibold text-[var(--text-strong)]">{m.calls}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-[var(--text-muted)]">Cost</span>
                    <span className="font-semibold text-[var(--text-strong)]">{m.cost}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
