'use client';

import * as React from 'react';
import {
  User, Mail, Phone, MapPin, Calendar, Briefcase, Star, TrendingUp, Edit3, Share2,
  Settings as SettingsIcon, Bell, Lock, CreditCard, Globe, Palette, Users, Shield,
  Check, Copy, Eye, EyeOff, Plus, Trash2, Key, Plug, Activity, Heart, MessageSquare,
  Upload, Search, Home, ArrowLeft, RefreshCw, Wrench, Clock, Zap, ChevronDown, FileText,
  Sparkles, Rocket, X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, StatusBadge, UserAvatar, ProgressBar, Tabs } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { Accordion, Breadcrumb, Chip, Divider } from '@/components/dashboard/extra-primitives';
import { Modal, Field, TextInput, TextArea, SelectInput, ModalActions } from '@/components/dashboard/modal';
import { cn } from '@/lib/utils';
import { INTEGRATION_ICONS } from '@/components/dashboard/integration-icons';

/* ======================================================================== */
/* 1. PROFILE — perfect cover + header avatar sync + 6 tabbed sections      */
/*    Profile image matches the header (both use /images/arun-pandian.jpg)  */
/* ======================================================================== */
const PROFILE_IMAGE = '/images/arun-pandian.jpg';
const PROFILE_COVER = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=500&fit=crop&q=80';

export function ProfilePage() {
  const [tab, setTab] = React.useState('overview');

  const stats = [
    { label: 'Orders', value: '5,359', icon: Briefcase, tone: 'brand' as const },
    { label: 'Reviews', value: '1,284', icon: Star, tone: 'warning' as const },
    { label: 'Followers', value: '12.4K', icon: Users, tone: 'info' as const },
    { label: 'Rating', value: '4.8', icon: TrendingUp, tone: 'success' as const },
  ];

  const activities = [
    { action: 'Updated profile picture', time: '2 hours ago', tone: 'brand', icon: Edit3 },
    { action: 'Completed Q2 revenue target of $612K', time: '5 hours ago', tone: 'success', icon: TrendingUp },
    { action: 'Published blog post "Designing for Dark Mode"', time: '1 day ago', tone: 'info', icon: FileText },
    { action: 'Joined "Design Systems" community', time: '2 days ago', tone: 'brand', icon: Users },
    { action: 'Received 5-star review from Acme Corp', time: '3 days ago', tone: 'success', icon: Star },
    { action: 'Shipped v2.0 of mtverse Dashboard', time: '5 days ago', tone: 'success', icon: Rocket },
    { action: 'Added 3 new team members', time: '1 week ago', tone: 'info', icon: Users },
  ];

  const projects = [
    { name: 'mtverse Dashboard', desc: 'Premium UI kit with 49+ pages', status: 'Active', progress: 92, icon: Briefcase, color: 'brand' as const, team: ['https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50', 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50', 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50'], due: 'Jun 30, 2026' },
    { name: 'AI Image Generator', desc: 'Text-to-image using DALL-E 3', status: 'In Review', progress: 78, icon: Star, color: 'warning' as const, team: ['https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50', 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=7A5AF8&radius=50'], due: 'Jul 15, 2026' },
    { name: 'E-commerce Platform', desc: 'Full storefront with 10 pages', status: 'Active', progress: 85, icon: TrendingUp, color: 'success' as const, team: ['https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50', 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50', 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=7A5AF8&radius=50', 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F59E0B&radius=50'], due: 'Aug 5, 2026' },
    { name: 'Mobile App Redesign', desc: 'iOS and Android refresh', status: 'Planning', progress: 15, icon: Users, color: 'info' as const, team: ['https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50'], due: 'Sep 20, 2026' },
  ];

  const connections = [
    { name: 'Sara Nguyen', role: 'CTO at Acme Inc.', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50', mutual: 12, status: 'connected' },
    { name: 'James Park', role: 'VP Eng at Globex', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50', mutual: 8, status: 'pending' },
    { name: 'Maria Lopez', role: 'Founder at Initech', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50', mutual: 24, status: 'connected' },
    { name: 'David Chen', role: 'Designer at Pixel Co.', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=7A5AF8&radius=50', mutual: 5, status: 'connected' },
    { name: 'Priya Patel', role: 'PM at CloudWave', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50', mutual: 18, status: 'pending' },
    { name: 'Alex Kumar', role: 'Eng Lead at DataFlow', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F59E0B&radius=50', mutual: 3, status: 'connected' },
  ];

  const securityEvents = [
    { event: 'Password changed', device: 'MacBook Pro · Chrome', ip: '103.21.45.67', time: '2 days ago', tone: 'success' as const },
    { event: 'New device login', device: 'iPhone 15 Pro · Safari', ip: '103.21.45.67', time: '3 days ago', tone: 'info' as const },
    { event: 'Failed login attempt', device: 'Unknown · Firefox', ip: '192.168.1.100', time: '1 week ago', tone: 'error' as const },
    { event: '2FA enabled', device: 'MacBook Pro · Chrome', ip: '103.21.45.67', time: '2 weeks ago', tone: 'success' as const },
  ];

  const skills = [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'Next.js', level: 92, category: 'Framework' },
    { name: 'Tailwind CSS', level: 88, category: 'Styling' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'PostgreSQL', level: 75, category: 'Database' },
    { name: 'AWS', level: 70, category: 'Cloud' },
    { name: 'Figma', level: 85, category: 'Design' },
  ];

  return (
    <div className="space-y-6">
      {/* ====================================================== */}
      {/* Cover + avatar overlap (synced with header avatar)     */}
      {/* ====================================================== */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="relative h-48 overflow-hidden sm:h-64 lg:h-72">
          <img src={PROFILE_COVER} alt="Cover" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-900)]/40 via-transparent to-[#7a5af8]/30" />
          <button className="absolute right-4 top-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-black/50 px-3 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/70">
            <Upload className="size-3.5" strokeWidth={2.5} /> Change cover
          </button>
        </div>
        <div className="px-4 pb-4 sm:px-6">
          <div className="-mt-20 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative">
                <div className="size-32 overflow-hidden rounded-2xl border-4 border-[var(--card)] bg-[var(--surface-sunken)] shadow-lg sm:size-36">
                  <img src={PROFILE_IMAGE} alt="Arun Pandian" className="size-full object-cover" />
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 inline-flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--color-brand-500)] text-white shadow-md transition hover:bg-[var(--color-brand-600)]"
                  aria-label="Change profile picture"
                >
                  <Upload className="size-3.5" strokeWidth={2.5} />
                </button>
                <span className="absolute bottom-3 right-3 size-4 rounded-full border-2 border-[var(--card)] bg-[var(--color-success-500)]" />
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-[var(--text-strong)]">Arun Pandian</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-brand-50)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Check className="size-2.5" strokeWidth={3} /> Verified</span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">CEO &amp; Founder at mtverse Inc.</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[var(--text-subtle)]">
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3" strokeWidth={2.5} /> Chennai, India</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="size-3" strokeWidth={2.5} /> Joined Jan 2020</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><Briefcase className="size-3" strokeWidth={2.5} /> mtverse Inc.</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pb-2">
              <button className="ds-btn ds-btn-secondary"><Share2 className="size-4" strokeWidth={2.5} /> Share</button>
              <button className="ds-btn ds-btn-secondary"><MessageSquare className="size-4" strokeWidth={2.5} /> Message</button>
              <button className="ds-btn ds-btn-primary"><Edit3 className="size-4" strokeWidth={2.5} /> Edit profile</button>
            </div>
          </div>
          {/* Stats row */}
          <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[var(--border-subtle)] sm:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-[var(--card)] p-3 text-center transition hover:bg-[var(--surface-sunken)]/50">
                  <div className="mb-1 flex items-center justify-center gap-1.5">
                    <Icon className={cn('size-3.5',
                      s.tone === 'brand' && 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]',
                      s.tone === 'success' && 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]',
                      s.tone === 'warning' && 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]',
                      s.tone === 'info' && 'text-[var(--color-info-600)] dark:text-[var(--color-info-500)]',
                    )} strokeWidth={2.5} />
                    <span className="text-xl font-semibold tabular-nums text-[var(--text-strong)]">{s.value}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabbed content */}
      <div className="flex gap-1 overflow-x-auto border-b border-[var(--border)]">
        {['overview', 'activity', 'projects', 'skills', 'connections', 'security'].map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} data-active={tab === t}
            className="flex-shrink-0 cursor-pointer border-b-2 px-4 py-2.5 text-sm font-medium capitalize transition data-[active=true]:border-[var(--color-brand-500)] data-[active=true]:text-[var(--color-brand-600)] dark:data-[active=true]:text-[var(--color-brand-300)] text-[var(--text-muted)] hover:text-[var(--text-strong)]">{t}</button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SectionCard title="About" description="A brief introduction and contact details" className="lg:col-span-2">
            <p className="text-sm leading-relaxed text-[var(--text-body)]">Building mtverse — a premium UI kit for modern web applications. Passionate about clean design, fast performance, and developer experience. 10+ years building products that people love to use. Currently focused on shipping the next generation of dashboard tooling for SaaS companies.</p>
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[var(--border-subtle)] pt-4 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm"><Mail className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><span className="text-[var(--text-body)]">arun@mtverse.io</span></div>
              <div className="flex items-center gap-2 text-sm"><Phone className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><span className="text-[var(--text-body)]">+91 98765 43210</span></div>
              <div className="flex items-center gap-2 text-sm"><Globe className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><a href="#" className="text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]">mtverse.io</a></div>
              <div className="flex items-center gap-2 text-sm"><Briefcase className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><span className="text-[var(--text-body)]">mtverse Inc.</span></div>
              <div className="flex items-center gap-2 text-sm"><MapPin className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><span className="text-[var(--text-body)]">Chennai, India</span></div>
              <div className="flex items-center gap-2 text-sm"><Calendar className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><span className="text-[var(--text-body)]">Joined Jan 2020</span></div>
            </div>
          </SectionCard>
          <SectionCard title="Quick Stats">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs"><span className="text-[var(--text-muted)]">Profile completion</span><span className="font-medium text-[var(--text-strong)]">85%</span></div>
                <ProgressBar value={85} tone="brand" size="sm" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs"><span className="text-[var(--text-muted)]">Monthly active</span><span className="font-medium text-[var(--text-strong)]">92%</span></div>
                <ProgressBar value={92} tone="success" size="sm" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs"><span className="text-[var(--text-muted)]">Response rate</span><span className="font-medium text-[var(--text-strong)]">76%</span></div>
                <ProgressBar value={76} tone="info" size="sm" />
              </div>
              <div className="border-t border-[var(--border-subtle)] pt-3">
                <p className="text-xs text-[var(--text-muted)]">Account type</p>
                <p className="mt-1 text-sm font-medium text-[var(--text-strong)]">Premium · Annual</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Renews on Jan 12, 2027</p>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* Activity tab */}
      {tab === 'activity' && (
        <SectionCard title="Recent Activity" description="Your latest actions and events">
          <ol className="relative space-y-5 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--border-subtle)]">
            {activities.map((act, i) => {
              const Icon = act.icon;
              return (
                <li key={i} className="relative flex items-start gap-4">
                  <span className={cn('relative z-10 inline-flex size-10 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-[var(--card)]',
                    act.tone === 'brand' && 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
                    act.tone === 'success' && 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
                    act.tone === 'info' && 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
                  )}>
                    <Icon className="size-4" strokeWidth={2.5} />
                  </span>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium text-[var(--text-strong)]">{act.action}</p>
                    <p className="mt-0.5 text-xs text-[var(--text-subtle)]">{act.time}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </SectionCard>
      )}

      {/* Projects tab */}
      {tab === 'projects' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="ds-card ds-card-pad ds-card-hover cursor-pointer">
                <div className="flex items-start justify-between">
                  <span className={cn('inline-flex size-10 items-center justify-center rounded-xl',
                    p.color === 'brand' && 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
                    p.color === 'success' && 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
                    p.color === 'warning' && 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
                    p.color === 'info' && 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
                  )}><Icon className="size-5" strokeWidth={2.5} /></span>
                  <StatusBadge tone={p.status === 'Active' ? 'success' : p.status === 'In Review' ? 'warning' : 'info'} dot>{p.status}</StatusBadge>
                </div>
                <p className="mt-3 text-sm font-medium text-[var(--text-strong)]">{p.name}</p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">{p.desc}</p>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs"><span className="text-[var(--text-muted)]">Progress</span><span className="font-medium text-[var(--text-strong)]">{p.progress}%</span></div>
                  <ProgressBar value={p.progress} tone={p.progress >= 80 ? 'success' : p.progress >= 50 ? 'brand' : 'warning'} size="sm" />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                  <div className="flex -space-x-2">
                    {p.team.map((t, ti) => (
                      <img key={ti} src={t} alt="" className="size-6 rounded-full border-2 border-[var(--card)] object-cover" />
                    ))}
                  </div>
                  <span className="text-xs text-[var(--text-subtle)]">Due {p.due}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Skills tab */}
      {tab === 'skills' && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SectionCard title="Technical Skills" description="Proficiency across your stack" className="lg:col-span-2">
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--text-strong)]">{skill.name}</span>
                      <Chip tone="brand">{skill.category}</Chip>
                    </div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">{skill.level}%</span>
                  </div>
                  <ProgressBar value={skill.level} tone={skill.level >= 90 ? 'success' : skill.level >= 75 ? 'brand' : 'warning'} size="sm" />
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Certifications">
            <ul className="space-y-3">
              {[
                { name: 'AWS Solutions Architect', org: 'Amazon Web Services', year: '2024', icon: Shield },
                { name: 'Google Cloud Professional', org: 'Google Cloud', year: '2023', icon: Globe },
                { name: 'Meta Frontend Developer', org: 'Meta', year: '2022', icon: Star },
                { name: 'Scrum Master', org: 'Scrum Alliance', year: '2021', icon: Users },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.name} className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-3 transition hover:border-[var(--border-strong)]">
                    <span className="inline-flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--surface-sunken)] text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--text-strong)]">{c.name}</p>
                      <p className="truncate text-xs text-[var(--text-muted)]">{c.org} · {c.year}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionCard>
        </div>
      )}

      {/* Connections tab */}
      {tab === 'connections' && (
        <SectionCard title="Connections" description="People in your network">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {connections.map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-3 transition hover:border-[var(--border-strong)] hover:shadow-sm">
                <img src={c.avatar} alt={c.name} className="size-12 flex-shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--text-strong)]">{c.name}</p>
                  <p className="truncate text-xs text-[var(--text-muted)]">{c.role}</p>
                  <p className="mt-0.5 text-[10px] text-[var(--text-subtle)]">{c.mutual} mutual connections</p>
                </div>
                {c.status === 'pending' ? (
                  <button className="flex-shrink-0 rounded-lg bg-[var(--color-brand-500)] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]">Accept</button>
                ) : (
                  <button className="flex-shrink-0 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)]">Message</button>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Security tab */}
      {tab === 'security' && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SectionCard title="Security Status" className="lg:col-span-1">
            <div className="space-y-3">
              <div className="rounded-xl border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)]/60 p-3 dark:bg-[rgba(18,183,106,0.08)]">
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-[var(--color-success-600)] dark:text-[var(--color-success-500)]" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Account secured</span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">2FA enabled · Strong password</p>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] p-3">
                <p className="text-xs text-[var(--text-muted)]">Password last changed</p>
                <p className="mt-0.5 text-sm font-medium text-[var(--text-strong)]">2 days ago</p>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] p-3">
                <p className="text-xs text-[var(--text-muted)]">Active sessions</p>
                <p className="mt-0.5 text-sm font-medium text-[var(--text-strong)]">3 devices</p>
              </div>
              <button className="w-full rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">Sign out all devices</button>
            </div>
          </SectionCard>
          <SectionCard title="Recent Security Events" description="Login activity and account changes" className="lg:col-span-2">
            <ul className="divide-y divide-[var(--border-subtle)]">
              {securityEvents.map((ev, i) => (
                <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className={cn('mt-1.5 size-2 flex-shrink-0 rounded-full',
                    ev.tone === 'success' && 'bg-[var(--color-success-500)]',
                    ev.tone === 'info' && 'bg-[var(--color-info-500)]',
                    ev.tone === 'error' && 'bg-[var(--color-error-500)]',
                  )} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--text-strong)]">{ev.event}</p>
                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">{ev.device} · {ev.ip}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-[var(--text-subtle)]">{ev.time}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      )}
    </div>
  );
}

/* ======================================================================== */
/* 2. SETTINGS — left vertical tab nav + right form panels                  */
/* ======================================================================== */
export function SettingsPage() {
  const [activePanel, setActivePanel] = React.useState('account');
  const [notifSettings, setNotifSettings] = React.useState<Record<string, boolean>>({
    'Email notifications': true,
    'Push notifications': true,
    'SMS alerts': false,
    'Weekly digest': true,
    'Product updates': false,
  });
  function toggleNotif(label: string) {
    setNotifSettings((prev) => ({ ...prev, [label]: !prev[label] }));
  }
  const panels = [
    { key: 'account', label: 'Account', icon: User },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'billing', label: 'Billing', icon: CreditCard },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'privacy', label: 'Privacy', icon: Shield },
  ];
  return (
    <div className="space-y-6">
      <PageHeader breadcrumb={[{ label: 'Pages' }, { label: 'Settings' }]} title="Settings" description="Manage your account preferences and configuration." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">
        {/* Left vertical tab nav */}
        <nav className="flex gap-1 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 lg:flex-col">
          {panels.map((p) => (
            <button key={p.key} type="button" onClick={() => setActivePanel(p.key)} data-active={activePanel === p.key}
              className="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition data-[active=true]:bg-[var(--color-brand-50)] data-[active=true]:text-[var(--color-brand-600)] dark:data-[active=true]:bg-[rgba(70,95,255,0.16)] dark:data-[active=true]:text-[var(--color-brand-300)] text-[var(--text-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
              <p.icon className="size-4" /> {p.label}
            </button>
          ))}
        </nav>
        {/* Right form panel */}
        <SectionCard title={panels.find((p) => p.key === activePanel)?.label} description="Update your preferences">
          {activePanel === 'account' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50" alt="Avatar" className="size-16 rounded-full object-cover" />
                <button className="ds-btn ds-btn-secondary"><Upload className="size-4" /> Upload new photo</button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First name"><TextInput value="Arun" onChange={() => undefined} /></Field>
                <Field label="Last name"><TextInput value="Pandian" onChange={() => undefined} /></Field>
                <Field label="Email" className="sm:col-span-2"><TextInput value="arun@mtverse.io" onChange={() => undefined} type="email" /></Field>
                <Field label="Phone"><TextInput value="+91 98765 43210" onChange={() => undefined} /></Field>
                <Field label="Time zone"><SelectInput value="ist" onChange={() => undefined} options={[{ value: 'ist', label: 'India (IST)' }, { value: 'est', label: 'US Eastern (EST)' }, { value: 'pst', label: 'US Pacific (PST)' }, { value: 'utc', label: 'UTC' }]} /></Field>
              </div>
              <div className="flex justify-end gap-2 border-t border-[var(--border-subtle)] pt-4">
                <button className="ds-btn ds-btn-secondary">Cancel</button>
                <button className="ds-btn ds-btn-primary"><Check className="size-4" /> Save changes</button>
              </div>
            </div>
          )}
          {activePanel === 'security' && (
            <div className="space-y-4">
              <Field label="Current password"><TextInput value="" onChange={() => undefined} type="password" placeholder="••••••••" /></Field>
              <Field label="New password"><TextInput value="" onChange={() => undefined} type="password" placeholder="••••••••" /></Field>
              <Field label="Confirm new password"><TextInput value="" onChange={() => undefined} type="password" placeholder="••••••••" /></Field>
              <Divider label="Two-Factor Authentication" />
              <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] p-3">
                <div><p className="text-sm font-semibold text-[var(--text-strong)]">Authenticator app</p><p className="text-xs font-medium text-[var(--text-muted)]">Use an authenticator app for 2FA</p></div>
                <StatusBadge tone="success" dot>Enabled</StatusBadge>
              </div>
              <button className="ds-btn ds-btn-primary"><Lock className="size-4" /> Update password</button>
            </div>
          )}
          {activePanel === 'notifications' && (
            <div className="space-y-4">
              {[
                { label: 'Email notifications', desc: 'Receive emails about your account activity' },
                { label: 'Push notifications', desc: 'Get real-time push notifications on your device' },
                { label: 'SMS alerts', desc: 'Critical alerts via SMS (rates may apply)' },
                { label: 'Weekly digest', desc: 'A summary of activity every Monday' },
                { label: 'Product updates', desc: 'News about new features and improvements' },
              ].map((item) => {
                const isOn = notifSettings[item.label] ?? false;
                return (
                  <div key={item.label} className="flex items-start justify-between rounded-xl border border-[var(--border-subtle)] p-3">
                    <div className="flex-1"><p className="text-sm font-semibold text-[var(--text-strong)]">{item.label}</p><p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">{item.desc}</p></div>
                    <button type="button" onClick={() => toggleNotif(item.label)} role="switch" aria-checked={isOn} className={cn('relative h-6 w-11 cursor-pointer rounded-full transition-colors', isOn ? 'bg-[var(--color-brand-500)]' : 'bg-[var(--surface-sunken)]')}>
                      <span className={cn('inline-block size-5 transform rounded-full bg-white shadow transition-transform', isOn ? 'translate-x-5' : 'translate-x-0.5')} />
                    </button>
                  </div>
                );
              })}
              <button className="ds-btn ds-btn-primary"><Check className="size-4" /> Save preferences</button>
            </div>
          )}
          {activePanel === 'billing' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Current plan</p>
                <div className="mt-2 flex items-center justify-between">
                  <div><p className="text-lg font-semibold text-[var(--text-strong)]">Pro — $84/month</p><p className="text-xs font-medium text-[var(--text-muted)]">25 seats · 500K API calls · 50 GB storage</p></div>
                  <button className="ds-btn ds-btn-primary !h-9 !text-xs">Upgrade</button>
                </div>
              </div>
              <Divider label="Payment Method" />
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-white font-semibold text-xs">VISA</div>
                <div className="flex-1"><p className="text-sm font-semibold text-[var(--text-strong)]">•••• 4242</p><p className="text-xs font-medium text-[var(--text-muted)]">Expires 12/27 · Arun Pandian</p></div>
                <button className="ds-btn ds-btn-secondary !h-9 !text-xs">Edit</button>
              </div>
              <Divider label="Billing History" />
              {[
                { date: 'Jun 19, 2026', desc: 'Pro plan — monthly', amount: '$84.00', status: 'Paid' },
                { date: 'May 19, 2026', desc: 'Pro plan — monthly', amount: '$84.00', status: 'Paid' },
                { date: 'Apr 19, 2026', desc: 'Pro plan — monthly', amount: '$84.00', status: 'Paid' },
              ].map((r) => (
                <div key={r.date} className="flex items-center justify-between border-b border-[var(--border-subtle)] py-2 last:border-b-0">
                  <div><p className="text-sm font-semibold text-[var(--text-strong)]">{r.desc}</p><p className="text-xs font-medium text-[var(--text-muted)]">{r.date}</p></div>
                  <div className="flex items-center gap-3"><StatusBadge tone="success" dot>{r.status}</StatusBadge><span className="text-sm font-semibold text-[var(--text-strong)]">{r.amount}</span></div>
                </div>
              ))}
            </div>
          )}
          {activePanel === 'appearance' && (
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Theme</p>
                <div className="grid grid-cols-3 gap-3">
                  {[{ k: 'light', l: 'Light' }, { k: 'dark', l: 'Dark' }, { k: 'system', l: 'System' }].map((t) => (
                    <button key={t.k} type="button" className="cursor-pointer rounded-xl border-2 border-[var(--border)] p-3 text-center transition hover:border-[var(--color-brand-400)]">
                      <div className={cn('mx-auto mb-2 size-10 rounded-lg', t.k === 'light' && 'bg-white border border-[var(--border)]', t.k === 'dark' && 'bg-[#0c111d]', t.k === 'system' && 'bg-gradient-to-r from-white to-[#0c111d] border border-[var(--border)]')} />
                      <p className="text-xs font-semibold text-[var(--text-strong)]">{t.l}</p>
                    </button>
                  ))}
                </div>
              </div>
              <Divider label="Density" />
              <div className="grid grid-cols-2 gap-3">
                {[{ k: 'comfortable', l: 'Comfortable' }, { k: 'compact', l: 'Compact' }].map((d) => (
                  <button key={d.k} type="button" className="cursor-pointer rounded-xl border-2 border-[var(--border)] p-3 text-center transition hover:border-[var(--color-brand-400)]"><p className="text-sm font-semibold text-[var(--text-strong)]">{d.l}</p></button>
                ))}
              </div>
              <Divider label="Accent Color" />
              <div className="flex gap-2">
                {['#465FFF', '#12B76A', '#F79009', '#F04438', '#0BA5EC', '#7A5AF8'].map((c) => (
                  <button key={c} type="button" className="size-8 cursor-pointer rounded-full border-2 border-transparent transition hover:scale-110" style={{ backgroundColor: c }} aria-label={`Color ${c}`} />
                ))}
              </div>
            </div>
          )}
          {activePanel === 'privacy' && (
            <div className="space-y-4">
              {[
                { label: 'Profile visibility', desc: 'Who can see your profile', value: 'Public' },
                { label: 'Activity status', desc: 'Show when you are online', value: 'Friends only' },
                { label: 'Data collection', desc: 'Allow anonymous usage data collection', value: 'Enabled' },
                { label: 'Two-factor authentication', desc: 'Require a code from your authenticator app', value: 'Enabled' },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between rounded-xl border border-[var(--border-subtle)] p-3">
                  <div><p className="text-sm font-semibold text-[var(--text-strong)]">{item.label}</p><p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">{item.desc}</p></div>
                  <StatusBadge tone="brand">{item.value}</StatusBadge>
                </div>
              ))}
              <button className="ds-btn ds-btn-primary"><Check className="size-4" /> Save privacy settings</button>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 3. PRICING — 4 distinct variants + comparison + testimonials + FAQ       */
/*    Variant 1: 3-tier with Monthly/Yearly toggle + dark featured card     */
/*    Variant 2: 3-tier with header icons + mixed check/cross feature lists */
/*    Variant 3: 4-tier with full-blue featured card + "Recommended" badge  */
/*    Variant 4: Compact minimal cards with side-by-side compare            */
/* ======================================================================== */
export function PricingPage() {
  const [cycle, setCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  /* ------------------------------------------------------------------ */
  /* VARIANT 1 — 3-tier with toggle + DARK featured card                */
  /* ------------------------------------------------------------------ */
  const variant1Plans = [
    {
      name: 'Starter',
      tagline: 'For solo designers & freelancers',
      monthly: 5,
      yearly: 50,
      cta: 'Choose Starter',
      featured: false,
      features: ['5 websites', '500 MB Storage', 'Unlimited Sub-Domain', '3 Custom Domain', 'Free SSL Certificate', 'Unlimited Traffic'],
    },
    {
      name: 'Medium',
      tagline: 'For growing teams & agencies',
      monthly: 10.99,
      yearly: 109,
      cta: 'Choose Medium',
      featured: true,
      features: ['25 websites', '5 GB Storage', 'Unlimited Sub-Domain', '10 Custom Domain', 'Free SSL Certificate', 'Unlimited Traffic', 'Priority Support'],
    },
    {
      name: 'Large',
      tagline: 'For enterprises & high-traffic apps',
      monthly: 15,
      yearly: 150,
      cta: 'Choose Large',
      featured: false,
      features: ['Unlimited websites', '50 GB Storage', 'Unlimited Sub-Domain', 'Unlimited Custom Domain', 'Free SSL Certificate', 'Unlimited Traffic', '24/7 Support'],
    },
  ];

  /* ------------------------------------------------------------------ */
  /* VARIANT 2 — 3-tier with header icons + mixed check/cross features  */
  /* ------------------------------------------------------------------ */
  const variant2Plans = [
    {
      name: 'Personal',
      icon: User,
      price: '$59',
      period: '/Lifetime',
      cta: 'Choose Starter',
      ctaVariant: 'dark' as const,
      featured: false,
      features: [
        { label: '1 Website', included: true },
        { label: '100 GB Storage', included: true },
        { label: '5 Sub-Domain', included: true },
        { label: 'Free SSL Certificate', included: false },
        { label: 'Unlimited Traffic', included: false },
        { label: 'Priority Support', included: false },
      ],
    },
    {
      name: 'Professional',
      icon: Briefcase,
      price: '$199',
      period: '/Lifetime',
      cta: 'Choose This Plan',
      ctaVariant: 'brand' as const,
      featured: true,
      features: [
        { label: '10 Websites', included: true },
        { label: '500 GB Storage', included: true },
        { label: 'Unlimited Sub-Domain', included: true },
        { label: 'Free SSL Certificate', included: true },
        { label: 'Unlimited Traffic', included: true },
        { label: 'Priority Support', included: false },
      ],
    },
    {
      name: 'Enterprise',
      icon: Star,
      price: '$599',
      period: '/Lifetime',
      cta: 'Choose This Plan',
      ctaVariant: 'dark' as const,
      featured: false,
      features: [
        { label: 'Unlimited Websites', included: true },
        { label: '5 TB Storage', included: true },
        { label: 'Unlimited Sub-Domain', included: true },
        { label: 'Free SSL Certificate', included: true },
        { label: 'Unlimited Traffic', included: true },
        { label: 'Priority Support', included: true },
      ],
    },
  ];

  /* ------------------------------------------------------------------ */
  /* VARIANT 3 — 4-tier with full-blue featured card + "Recommended"    */
  /* ------------------------------------------------------------------ */
  const variant3Plans = [
    {
      name: 'Personal',
      subtitle: 'Perfect plan for starters',
      price: 'Free',
      period: '/Lifetime',
      priceNote: '',
      cta: 'Current Plan',
      ctaVariant: 'outline' as const,
      featured: false,
      badge: null as string | null,
      features: ['1 Website', '100 GB Storage', '5 Sub-Domain', 'Free SSL Certificate'],
    },
    {
      name: 'Professional',
      subtitle: 'For users who want to do more',
      price: '$99',
      period: '/year',
      priceNote: '',
      cta: 'Try for Free',
      ctaVariant: 'brand' as const,
      featured: false,
      badge: null as string | null,
      features: ['10 Websites', '500 GB Storage', 'Unlimited Sub-Domain', 'Free SSL Certificate', 'Unlimited Traffic'],
    },
    {
      name: 'Team',
      subtitle: 'Your entire team in one place',
      price: '$299',
      period: '/year',
      priceNote: '',
      cta: 'Try for Free',
      ctaVariant: 'brand' as const,
      featured: true,
      badge: 'Recommended',
      features: ['Unlimited Websites', '1 TB Storage', 'Unlimited Sub-Domain', 'Free SSL Certificate', 'Unlimited Traffic', 'Priority Support'],
    },
    {
      name: 'Enterprise',
      subtitle: 'Run your company on your terms',
      price: 'Custom',
      period: '',
      priceNote: 'Reach out for a quote',
      cta: 'Try for Free',
      ctaVariant: 'brand' as const,
      featured: false,
      badge: null as string | null,
      features: ['Unlimited Websites', 'Unlimited Storage', 'Unlimited Sub-Domain', 'Free SSL Certificate', 'Unlimited Traffic', 'Dedicated CSM'],
    },
  ];

  /* ------------------------------------------------------------------ */
  /* VARIANT 4 — Compact minimal cards with check icons                 */
  /* ------------------------------------------------------------------ */
  const variant4Plans = [
    { name: 'Basic', price: '$0', period: '/mo', desc: 'For personal projects', features: ['1 project', 'Community support', '1 GB storage'], cta: 'Get Started' },
    { name: 'Standard', price: '$24', period: '/mo', desc: 'For small teams', features: ['10 projects', 'Email support', '50 GB storage', 'Custom domain'], cta: 'Get Started' },
    { name: 'Pro', price: '$49', period: '/mo', desc: 'For growing teams', features: ['Unlimited projects', 'Priority support', '500 GB storage', 'Custom domain', 'Audit logs'], cta: 'Get Started' },
    { name: 'Business', price: '$99', period: '/mo', desc: 'For organizations', features: ['Everything in Pro', '24/7 phone support', '2 TB storage', 'SSO/SAML', 'Custom SLA'], cta: 'Get Started' },
  ];

  const comparisonFeatures = [
    { feature: 'Team members', starter: '3', pro: '25', enterprise: 'Unlimited' },
    { feature: 'API calls / month', starter: '10K', pro: '500K', enterprise: 'Unlimited' },
    { feature: 'Storage', starter: '1 GB', pro: '50 GB', enterprise: '1 TB' },
    { feature: 'Custom domain', starter: false, pro: true, enterprise: true },
    { feature: 'Audit logs', starter: false, pro: true, enterprise: true },
    { feature: 'SSO / SAML', starter: false, pro: false, enterprise: true },
    { feature: 'Priority support', starter: false, pro: true, enterprise: true },
    { feature: 'Dedicated CSM', starter: false, pro: false, enterprise: true },
    { feature: 'Custom SLA', starter: false, pro: false, enterprise: true },
    { feature: 'API access', starter: false, pro: true, enterprise: true },
  ];
  const faqs = [
    { q: 'Can I change my plan later?', a: 'Yes, you can upgrade, downgrade, or cancel at any time. Changes take effect immediately and we prorate any difference in cost based on your remaining billing cycle.' },
    { q: 'Do you offer a free trial?', a: 'Yes, every paid plan includes a 14-day free trial with no credit card required. You can explore all the features of your chosen plan before committing to a subscription.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans. Annual subscriptions can also be paid via invoice.' },
    { q: 'Is there a discount for annual billing?', a: 'Yes, annual billing saves you 20% compared to monthly billing. For multi-year commitments, contact our sales team for additional volume discounts and custom pricing.' },
    { q: 'What happens when I exceed my plan limits?', a: 'We will notify you when you approach your limits. You can either upgrade to a higher tier or purchase add-on packs for additional storage, API calls, or team members at any time.' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand-50)] px-3 py-1 text-xs font-medium text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Sparkles className="size-3" /> Simple, transparent pricing</span>
        <h1 className="ds-page-title mt-3">Choose the plan that fits your team</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">No hidden fees. Cancel anytime. 14-day free trial on all paid plans.</p>
      </div>

      {/* ============================================================ */}
      {/* VARIANT 1 — 3-tier with Monthly/Yearly toggle + DARK featured */}
      {/* ============================================================ */}
      <section>
        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Pricing Table 1</p>
            <h2 className="ds-section-title mt-1">Monthly / Yearly toggle with dark featured card</h2>
          </div>
          {/* Toggle */}
          <div className="inline-flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
            <button type="button" onClick={() => setCycle('monthly')} data-active={cycle === 'monthly'} className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)] data-[active=true]:shadow-sm text-[var(--text-muted)]">Monthly</button>
            <button type="button" onClick={() => setCycle('yearly')} data-active={cycle === 'yearly'} className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)] data-[active=true]:shadow-sm text-[var(--text-muted)]">Yearly <span className="ml-1 rounded-full bg-[var(--color-success-50)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">Save 20%</span></button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {variant1Plans.map((plan) => {
            const price = cycle === 'monthly' ? plan.monthly : plan.yearly;
            return (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-2xl p-6 transition-all',
                  plan.featured
                    ? 'border-2 border-[var(--color-brand-500)] bg-[#1d2939] text-white shadow-[0_20px_40px_-12px_rgba(70,95,255,0.45)] md:-translate-y-2'
                    : 'border border-[var(--border)] bg-[var(--card)] hover:border-[var(--border-strong)] hover:shadow-md',
                )}
              >
                <p className={cn('text-base font-medium', plan.featured ? 'text-white' : 'text-[var(--text-strong)]')}>{plan.name}</p>
                <p className={cn('mt-1 text-xs', plan.featured ? 'text-white/70' : 'text-[var(--text-muted)]')}>{plan.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className={cn('text-3xl font-semibold tabular-nums', plan.featured ? 'text-white' : 'text-[var(--text-strong)]')}>${price}</span>
                  <span className={cn('text-xs', plan.featured ? 'text-white/70' : 'text-[var(--text-muted)]')}>/{cycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                <button
                  className={cn(
                    'mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition',
                    plan.featured
                      ? 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]'
                      : 'bg-[var(--text-strong)] text-white hover:bg-[var(--text-body)] dark:bg-white dark:text-[var(--text-strong)] dark:hover:bg-white/90',
                  )}
                >
                  {plan.cta}
                </button>
                <ul className="mt-5 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={cn('flex items-center gap-2 text-sm', plan.featured ? 'text-white/90' : 'text-[var(--text-body)]')}>
                      <Check className={cn('size-4 flex-shrink-0', plan.featured ? 'text-white' : 'text-[var(--color-success-500)]')} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* VARIANT 2 — 3-tier with header icons + mixed check/cross      */}
      {/* ============================================================ */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Pricing Table 2</p>
          <h2 className="ds-section-title mt-1">Header icons with mixed feature list</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Clearly shows what&apos;s included and what&apos;s not — perfect for conversion-driven comparison.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {variant2Plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-2xl bg-[var(--card)] p-6 transition-all',
                  plan.featured
                    ? 'border-2 border-[var(--color-brand-500)] shadow-[0_20px_40px_-12px_rgba(70,95,255,0.25)]'
                    : 'border border-[var(--border)] hover:border-[var(--border-strong)] hover:shadow-md',
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    'inline-flex size-12 items-center justify-center rounded-xl',
                    plan.featured
                      ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                      : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]',
                  )}>
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <p className="text-base font-medium text-[var(--text-strong)]">{plan.name}</p>
                </div>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tabular-nums text-[var(--text-strong)]">{plan.price}</span>
                  <span className="text-xs text-[var(--text-muted)]">{plan.period}</span>
                </div>
                <button
                  className={cn(
                    'mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition',
                    plan.ctaVariant === 'brand'
                      ? 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]'
                      : 'bg-[var(--text-strong)] text-white hover:bg-[var(--text-body)] dark:bg-white dark:text-[var(--text-strong)] dark:hover:bg-white/90',
                  )}
                >
                  {plan.cta}
                </button>
                <ul className="mt-5 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.label} className={cn('flex items-center gap-2 text-sm', f.included ? 'text-[var(--text-body)]' : 'text-[var(--text-faint)] line-through')}>
                      {f.included
                        ? <Check className="size-4 flex-shrink-0 text-[var(--color-success-500)]" strokeWidth={2.5} />
                        : <X className="size-4 flex-shrink-0 text-[var(--color-error-500)]" strokeWidth={2.5} />}
                      {f.label}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* VARIANT 3 — 4-tier with full-blue featured + Recommended      */}
      {/* ============================================================ */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Pricing Table 3</p>
          <h2 className="ds-section-title mt-1">Four tiers with Recommended badge</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Includes Free tier, paid tiers, and Custom Enterprise — covers every buyer persona in one row.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {variant3Plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative rounded-2xl p-6 transition-all',
                plan.featured
                  ? 'bg-[var(--color-brand-500)] text-white shadow-[0_20px_40px_-12px_rgba(70,95,255,0.45)] lg:-translate-y-2'
                  : 'border border-[var(--border)] bg-[var(--card)] hover:border-[var(--border-strong)] hover:shadow-md',
              )}
            >
              {plan.badge && (
                <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-brand-700)] shadow-sm">
                  {plan.badge}
                </span>
              )}
              <p className={cn('text-base font-medium', plan.featured ? 'text-white' : 'text-[var(--text-strong)]')}>{plan.name}</p>
              <p className={cn('mt-1 text-xs', plan.featured ? 'text-white/80' : 'text-[var(--text-muted)]')}>{plan.subtitle}</p>
              <div className="mt-5">
                <div className="flex items-baseline gap-1">
                  <span className={cn('text-3xl font-semibold tabular-nums', plan.featured ? 'text-white' : 'text-[var(--text-strong)]')}>{plan.price}</span>
                  {plan.period && <span className={cn('text-xs', plan.featured ? 'text-white/80' : 'text-[var(--text-muted)]')}>{plan.period}</span>}
                </div>
                {plan.priceNote && <p className={cn('mt-1 text-[11px]', plan.featured ? 'text-white/70' : 'text-[var(--text-subtle)]')}>{plan.priceNote}</p>}
              </div>
              <button
                className={cn(
                  'mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition',
                  plan.ctaVariant === 'brand' && plan.featured && 'bg-white text-[var(--color-brand-700)] hover:bg-white/90',
                  plan.ctaVariant === 'brand' && !plan.featured && 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]',
                  plan.ctaVariant === 'outline' && 'border border-[var(--border-strong)] bg-transparent text-[var(--text-muted)] hover:bg-[var(--surface-sunken)]',
                )}
              >
                {plan.cta}
              </button>
              <ul className="mt-5 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className={cn('flex items-center gap-2 text-sm', plan.featured ? 'text-white/95' : 'text-[var(--text-body)]')}>
                    <Check className={cn('size-4 flex-shrink-0', plan.featured ? 'text-white' : 'text-[var(--color-success-500)]')} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* VARIANT 4 — Compact minimal cards                            */}
      {/* ============================================================ */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Pricing Table 4</p>
          <h2 className="ds-section-title mt-1">Compact cards for side-by-side comparison</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Tighter spacing, smaller price type — ideal for landing pages and sidebars.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {variant4Plans.map((plan, i) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-xl border p-5 transition-all',
                i === 2
                  ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)]/40 dark:bg-[rgba(70,95,255,0.06)] shadow-sm'
                  : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--border-strong)] hover:shadow-sm',
              )}
            >
              <p className="text-sm font-medium text-[var(--text-strong)]">{plan.name}</p>
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">{plan.desc}</p>
              <div className="mt-3 flex items-baseline gap-0.5">
                <span className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{plan.price}</span>
                <span className="text-xs text-[var(--text-muted)]">{plan.period}</span>
              </div>
              <button className={cn(
                'mt-3 w-full rounded-lg px-3 py-2 text-xs font-medium transition',
                i === 2
                  ? 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]'
                  : 'border border-[var(--border)] bg-transparent text-[var(--text-body)] hover:bg-[var(--surface-sunken)]',
              )}>{plan.cta}</button>
              <ul className="mt-3 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-[var(--text-body)]">
                    <Check className={cn('size-3 flex-shrink-0', i === 2 ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]' : 'text-[var(--color-success-500)]')} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Feature comparison table */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Detailed Comparison</p>
          <h2 className="ds-section-title mt-1">Compare all features side-by-side</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-sunken)]/50">
                  <th className="py-3.5 pl-5 pr-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Feature</th>
                  <th className="py-3.5 px-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Starter</th>
                  <th className="py-3.5 px-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">Pro</th>
                  <th className="py-3.5 px-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={cn('border-b border-[var(--border-subtle)] last:border-0', i % 2 === 1 && 'bg-[var(--surface-sunken)]/40')}>
                    <td className="py-3 pl-5 pr-3 text-sm font-medium text-[var(--text-strong)]">{row.feature}</td>
                    <td className="py-3 px-3 text-center text-sm text-[var(--text-body)]">
                      {typeof row.starter === 'boolean' ? (row.starter ? <Check className="mx-auto size-4 text-[var(--color-success-500)]" strokeWidth={2.5} /> : <X className="mx-auto size-4 text-[var(--text-faint)]" strokeWidth={2.5} />) : row.starter}
                    </td>
                    <td className="py-3 px-3 text-center text-sm text-[var(--text-body)] bg-[var(--color-brand-50)]/30 dark:bg-[rgba(70,95,255,0.04)]">
                      {typeof row.pro === 'boolean' ? (row.pro ? <Check className="mx-auto size-4 text-[var(--color-success-500)]" strokeWidth={2.5} /> : <X className="mx-auto size-4 text-[var(--text-faint)]" strokeWidth={2.5} />) : row.pro}
                    </td>
                    <td className="py-3 px-3 text-center text-sm text-[var(--text-body)]">
                      {typeof row.enterprise === 'boolean' ? (row.enterprise ? <Check className="mx-auto size-4 text-[var(--color-success-500)]" strokeWidth={2.5} /> : <X className="mx-auto size-4 text-[var(--text-faint)]" strokeWidth={2.5} />) : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Social Proof</p>
          <h2 className="ds-section-title mt-1">Loved by 10,000+ teams worldwide</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { quote: 'Switching to Pro saved us 30% on infrastructure costs. The API access alone paid for itself in a week of moving from our previous vendor.', name: 'Sara Nguyen', role: 'CTO, Acme Inc.', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50' },
            { quote: 'Enterprise plan with SSO was a game changer. Onboarding 500+ employees was seamless and the audit logs keep our compliance team happy.', name: 'James Park', role: 'VP Eng, Globex', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50' },
            { quote: 'Started on Starter, upgraded to Pro within a month. The value is incredible for growing teams and the support is genuinely responsive.', name: 'Maria Lopez', role: 'Founder, Initech', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50' },
          ].map(t => (
            <div key={t.name} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="mb-3 flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className="size-3.5 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />)}</div>
              <p className="text-sm leading-relaxed text-[var(--text-body)]">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 flex items-center gap-2.5">
                <img src={t.avatar} alt={t.name} className="size-8 rounded-full object-cover" />
                <div><p className="text-xs font-medium text-[var(--text-strong)]">{t.name}</p><p className="text-[10px] text-[var(--text-muted)]">{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Need Help?</p>
          <h2 className="ds-section-title mt-1">Pricing FAQ</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div className="divide-y divide-[var(--border-subtle)]">
            {faqs.map(f => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[var(--text-strong)]">{f.q}</p>
                  <ChevronDown className="size-4 flex-shrink-0 text-[var(--text-muted)] transition-transform group-open:rotate-180" strokeWidth={2.5} />
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] p-8 text-center sm:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="relative">
          <h3 className="text-xl font-semibold text-white sm:text-2xl">Ready to get started?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/80">Join 10,000+ teams using mtverse to build faster. No credit card required.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-medium text-[var(--color-brand-700)] transition hover:bg-white/90"><Sparkles className="size-4" /> Start your free trial</button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"><MessageSquare className="size-4" /> Talk to sales</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 4. FAQ — category sidebar + accordion                                    */
/* ======================================================================== */
export function FAQPage() {
  const [category, setCategory] = React.useState('general');
  const categories = [
    { key: 'general', label: 'General', count: 5 },
    { key: 'account', label: 'Account & Billing', count: 4 },
    { key: 'technical', label: 'Technical', count: 6 },
    { key: 'api', label: 'API & Integrations', count: 3 },
    { key: 'security', label: 'Security', count: 2 },
  ];
  const faqs = [
    { id: '1', title: 'What is mtverse Dashboard?', description: 'Getting started', content: 'mtverse Dashboard is a premium UI kit built with Next.js 16, TypeScript, Tailwind CSS v4, and shadcn/ui. It includes 33+ pages across dashboards, e-commerce, AI assistant, components, and utility pages.' },
    { id: '2', title: 'How do I get started?', description: 'Setup guide', content: 'After purchasing, download the ZIP, run `bun install`, then `bun run dev`. The dashboard runs on port 3000. Check the documentation for detailed setup instructions.' },
    { id: '3', title: 'Can I use this for commercial projects?', description: 'Licensing', content: 'Yes! The license allows you to use mtverse Dashboard in unlimited commercial projects. You cannot resell the template itself.' },
    { id: '4', title: 'Do you offer refunds?', description: 'Refund policy', content: 'We offer a 14-day money-back guarantee. If you are not satisfied, contact support for a full refund.' },
    { id: '5', title: 'How often do you update?', description: 'Updates', content: 'We release updates monthly with new components, pages, and bug fixes. All updates are free for existing customers.' },
  ];
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="ds-page-title">Frequently Asked Questions</h1>
        <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">Find answers to common questions. Can&apos;t find what you need? <a href="#" className="font-semibold text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]">Contact support</a></p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_1fr]">
        <nav className="flex gap-1 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 lg:flex-col">
          {categories.map((c) => (
            <button key={c.key} type="button" onClick={() => setCategory(c.key)} data-active={category === c.key}
              className="flex flex-shrink-0 cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition data-[active=true]:bg-[var(--color-brand-50)] data-[active=true]:text-[var(--color-brand-600)] dark:data-[active=true]:bg-[rgba(70,95,255,0.16)] dark:data-[active=true]:text-[var(--color-brand-300)] text-[var(--text-muted)] hover:bg-[var(--surface-sunken)]">
              {c.label} <span className="text-xs text-[var(--text-subtle)]">{c.count}</span>
            </button>
          ))}
        </nav>
        <div>
          <Accordion items={faqs.map((f) => ({ id: f.id, title: f.title, description: f.description, content: <p>{f.content}</p> }))} defaultOpen={['1']} />
        </div>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 5. API KEYS — table with create modal + key reveal                       */
/* ======================================================================== */
export function ApiKeysPage() {
  const { toast } = useToast();
  const [showKey, setShowKey] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const keys = [
    { id: '1', name: 'Production API Key', key: 'sk-prod-9a8b7c6d5e4f3g2h1i0j', created: 'Jan 12, 2026', lastUsed: '2 min ago', status: 'Active' },
    { id: '2', name: 'Development Key', key: 'sk-dev-03947abc-def-ghi-jkl', created: 'Mar 04, 2026', lastUsed: '1 hour ago', status: 'Active' },
    { id: '3', name: 'Webhook Integration', key: 'sk-web-xyz123456789', created: 'Feb 22, 2026', lastUsed: '3 days ago', status: 'Active' },
    { id: '4', name: 'Legacy Mobile App', key: 'sk-mob-abcdef123456', created: 'Dec 02, 2025', lastUsed: '2 months ago', status: 'Revoked' },
  ];
  return (
    <div className="space-y-6">
      <PageHeader breadcrumb={[{ label: 'Pages' }, { label: 'API Keys' }]} title="API Keys" description="Manage your API keys for programmatic access." actions={<button className="ds-btn ds-btn-primary" onClick={() => setModalOpen(true)}><Plus className="size-4" /> Create key</button>} />
      <div className="rounded-xl border border-[var(--color-warning-100)] bg-[var(--color-warning-50)] p-4 dark:border-[rgba(247,144,9,0.18)] dark:bg-[rgba(247,144,9,0.06)]">
        <div className="flex items-start gap-3"><Shield className="mt-0.5 size-5 text-[var(--color-warning-600)]" /><div><p className="text-sm font-semibold text-[var(--text-strong)]">Keep your API keys secure</p><p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">Never share your API keys publicly. Treat them like passwords. You can revoke a key at any time.</p></div></div>
      </div>
      <SectionCard noBodyPadding>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b border-[var(--border)] bg-[var(--surface-sunken)]">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Key</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:table-cell">Created</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:table-cell">Last used</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"></th>
          </tr></thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.id} className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--surface-sunken)]">
                <td className="px-5 py-3.5 font-semibold text-[var(--text-strong)]">{k.name}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-[var(--surface-sunken)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--text-body)]">{showKey === k.id ? k.key : '••••••••••••••••'}</code>
                    <button type="button" onClick={() => setShowKey(showKey === k.id ? null : k.id)} className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-strong)]" aria-label="Toggle key">{showKey === k.id ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}</button>
                    <button type="button" onClick={() => { navigator.clipboard?.writeText(k.key); toast({ title: 'Copied' }); }} className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-strong)]" aria-label="Copy"><Copy className="size-3.5" /></button>
                  </div>
                </td>
                <td className="hidden px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] sm:table-cell">{k.created}</td>
                <td className="hidden px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] sm:table-cell">{k.lastUsed}</td>
                <td className="px-4 py-3.5 text-center"><StatusBadge tone={k.status === 'Active' ? 'success' : 'error'} dot>{k.status}</StatusBadge></td>
                <td className="px-5 py-3.5 text-right"><button type="button" onClick={() => toast({ title: 'Key revoked', variant: 'destructive' })} className="cursor-pointer text-[var(--color-error-600)] hover:text-[var(--color-error-700)] dark:text-[var(--color-error-500)]"><Trash2 className="size-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
      <Modal open={modalOpen} onOpenChange={setModalOpen} title="Create new API key" description="Generate a new key for your application" icon={Key} footer={<ModalActions onCancel={() => setModalOpen(false)} onConfirm={() => { setModalOpen(false); toast({ title: 'API key created' }); }} confirmLabel="Create key" />}>
        <Field label="Key name" required><TextInput value="" onChange={() => undefined} placeholder="e.g. Production API Key" autoFocus /></Field>
        <p className="mt-3 text-xs font-medium text-[var(--text-muted)]">You will only see the full key once. Make sure to copy it before closing this dialog.</p>
      </Modal>
    </div>
  );
}

/* ======================================================================== */
/* 6. INTEGRATIONS — app-store-style grid with connect/disconnect           */
/* ======================================================================== */
export function IntegrationsPage() {
  const { toast } = useToast();
  const [connected, setConnected] = React.useState<Set<string>>(new Set(['slack', 'github', 'stripe']));
  const integrations = [
    { id: 'slack', name: 'Slack', desc: 'Get notifications in your Slack channels', color: '#4A154B' },
    { id: 'github', name: 'GitHub', desc: 'Sync issues and pull requests', color: '#181717' },
    { id: 'stripe', name: 'Stripe', desc: 'Accept payments and manage subscriptions', color: '#635BFF' },
    { id: 'zapier', name: 'Zapier', desc: 'Connect with 5,000+ apps automatically', color: '#FF4A00' },
    { id: 'notion', name: 'Notion', desc: 'Sync docs and databases', color: '#000000' },
    { id: 'figma', name: 'Figma', desc: 'Import design tokens and components', color: '#F24E1E' },
    { id: 'linear', name: 'Linear', desc: 'Track issues and sprints', color: '#5E6AD2' },
    { id: 'discord', name: 'Discord', desc: 'Bot notifications in your server', color: '#5865F2' },
  ];
  function toggle(id: string) {
    const isConnected = connected.has(id);
    setConnected((prev) => { const next = new Set(prev); if (isConnected) next.delete(id); else next.add(id); return next; });
    toast({ title: isConnected ? 'Disconnected' : 'Connected', description: integrations.find((i) => i.id === id)?.name });
  }
  return (
    <div className="space-y-6">
      <PageHeader breadcrumb={[{ label: 'Pages' }, { label: 'Integrations' }]} title="Integrations" description="Connect your favorite tools and services." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {integrations.map((int) => {
          const isConn = connected.has(int.id);
          return (
            <div key={int.id} className="ds-card ds-card-pad">
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl" style={{ backgroundColor: int.color }}>
                  {(() => {
                    const iconData = INTEGRATION_ICONS[int.id];
                    if (iconData) {
                      const I = iconData.Icon;
                      return <I className="size-6 text-white" />;
                    }
                    return <span className="text-lg font-semibold text-white">{int.name[0]}</span>;
                  })()}
                </div>
                <StatusBadge tone={isConn ? 'success' : 'neutral'} dot>{isConn ? 'Connected' : 'Not connected'}</StatusBadge>
              </div>
              <p className="mt-3 text-sm font-semibold text-[var(--text-strong)]">{int.name}</p>
              <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{int.desc}</p>
              <button type="button" onClick={() => toggle(int.id)} className={cn('mt-4 w-full', isConn ? 'ds-btn ds-btn-secondary' : 'ds-btn ds-btn-primary')}>
                {isConn ? <><Trash2 className="size-3.5" /> Disconnect</> : <><Plug className="size-3.5" /> Connect</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 7. ACTIVITY LOG — vertical timeline with filters sidebar                 */
/* ======================================================================== */
export function ActivityLogPage() {
  const [filter, setFilter] = React.useState('all');
  const filters = [
    { key: 'all', label: 'All activity' },
    { key: 'auth', label: 'Authentication' },
    { key: 'orders', label: 'Orders' },
    { key: 'billing', label: 'Billing' },
    { key: 'system', label: 'System' },
  ];
  const events = [
    { time: '2:48 PM', date: 'Today', title: 'Order #OR-9081 shipped', desc: 'MacBook Pro 13" via FedEx', tone: 'success', cat: 'orders' },
    { time: '11:14 AM', date: 'Today', title: 'New login from Chrome', desc: 'San Francisco, CA · IP 192.168.1.1', tone: 'info', cat: 'auth' },
    { time: '9:08 AM', date: 'Today', title: 'Payment failed', desc: 'Invoice INV-2008 · card declined', tone: 'error', cat: 'billing' },
    { time: '4:22 PM', date: 'Yesterday', title: 'API rate limit warning', desc: '80% of monthly limit reached', tone: 'warning', cat: 'system' },
    { time: '1:30 PM', date: 'Yesterday', title: 'Profile updated', desc: 'Changed profile picture', tone: 'brand', cat: 'auth' },
    { time: '10:00 AM', date: 'Yesterday', title: 'Backup completed', desc: 'Database snapshot saved to S3', tone: 'success', cat: 'system' },
  ];
  const filtered = filter === 'all' ? events : events.filter((e) => e.cat === filter);
  return (
    <div className="space-y-6">
      <PageHeader breadcrumb={[{ label: 'Pages' }, { label: 'Activity Log' }]} title="Activity Log" description="A chronological record of all important events." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[180px_1fr]">
        <nav className="flex gap-1 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 lg:flex-col">
          {filters.map((f) => (
            <button key={f.key} type="button" onClick={() => setFilter(f.key)} data-active={filter === f.key}
              className="flex-shrink-0 cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-semibold transition data-[active=true]:bg-[var(--color-brand-50)] data-[active=true]:text-[var(--color-brand-600)] dark:data-[active=true]:bg-[rgba(70,95,255,0.16)] dark:data-[active=true]:text-[var(--color-brand-300)] text-[var(--text-muted)] hover:bg-[var(--surface-sunken)]">{f.label}</button>
          ))}
        </nav>
        <ol className="relative space-y-1 pl-6">
          <span className="absolute left-2 top-2 h-[calc(100%-2rem)] w-px bg-[var(--border-subtle)]" />
          {filtered.map((event, idx) => (
            <li key={idx} className="relative pb-6">
              <span className={cn('absolute -left-[18px] top-1 inline-flex size-4 items-center justify-center rounded-full ring-4 ring-[var(--card)]',
                event.tone === 'success' && 'bg-[var(--color-success-500)]', event.tone === 'brand' && 'bg-[var(--color-brand-500)]',
                event.tone === 'error' && 'bg-[var(--color-error-500)]', event.tone === 'info' && 'bg-[var(--color-info-500)]', event.tone === 'warning' && 'bg-[var(--color-warning-500)]')} />
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-semibold text-[var(--text-strong)]">{event.title}</p>
                <span className="text-xs font-medium text-[var(--text-muted)]">{event.date} · {event.time}</span>
              </div>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-muted)]">{event.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 8. NOTIFICATIONS — list with filter tabs                                  */
/* ======================================================================== */
export function NotificationsPage() {
  const [tab, setTab] = React.useState('all');
  const notifs = [
    { id: '1', title: 'New high-value order', message: 'Order #OR-9081 placed for $2,399.00', time: '3 min ago', read: false, tone: 'success', icon: Briefcase },
    { id: '2', title: 'MRR milestone reached', message: 'Monthly recurring revenue crossed $48,200', time: '22 min ago', read: false, tone: 'brand', icon: TrendingUp },
    { id: '3', title: 'Server response time elevated', message: 'p95 latency on /api/orders is 412ms', time: '1 hour ago', read: false, tone: 'warning', icon: Activity },
    { id: '4', title: 'Failed payment', message: 'Invoice INV-2034 could not be charged', time: '3 hours ago', read: true, tone: 'error', icon: CreditCard },
    { id: '5', title: 'New team member joined', message: 'Sara Nguyen accepted the workspace invite', time: '6 hours ago', read: true, tone: 'info', icon: Users },
    { id: '6', title: 'Weekly report ready', message: 'Your Q2 performance summary is available', time: '1 day ago', read: true, tone: 'neutral', icon: Activity },
  ];
  const filtered = tab === 'all' ? notifs : tab === 'unread' ? notifs.filter((n) => !n.read) : notifs.filter((n) => n.read);
  return (
    <div className="space-y-6">
      <PageHeader breadcrumb={[{ label: 'Pages' }, { label: 'Notifications' }]} title="Notifications" description="Stay updated on important events." actions={<button className="ds-btn ds-btn-secondary">Mark all as read</button>} />
      <div className="flex gap-1 border-b border-[var(--border)]">
        {[{ k: 'all', l: 'All', c: notifs.length }, { k: 'unread', l: 'Unread', c: notifs.filter((n) => !n.read).length }, { k: 'read', l: 'Read', c: notifs.filter((n) => n.read).length }].map((t) => (
          <button key={t.k} type="button" onClick={() => setTab(t.k)} data-active={tab === t.k} className="cursor-pointer border-b-2 px-4 py-2.5 text-sm font-semibold transition data-[active=true]:border-[var(--color-brand-500)] data-[active=true]:text-[var(--color-brand-600)] dark:data-[active=true]:text-[var(--color-brand-300)] text-[var(--text-muted)] hover:text-[var(--text-strong)]">{t.l} <span className="ml-1 rounded-full bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-semibold">{t.c}</span></button>
        ))}
      </div>
      <ul className="space-y-2">
        {filtered.map((n) => {
          const Icon = n.icon;
          return (
            <li key={n.id} className={cn('flex items-start gap-3 rounded-xl border p-4 transition hover:bg-[var(--surface-sunken)]', !n.read && 'border-[var(--color-brand-200)] bg-[var(--color-brand-50)]/30 dark:border-[rgba(70,95,255,0.18)] dark:bg-[rgba(70,95,255,0.04)]', n.read && 'border-[var(--border-subtle)]')}>
              <span className={cn('inline-flex size-9 flex-shrink-0 items-center justify-center rounded-lg',
                n.tone === 'success' && 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
                n.tone === 'brand' && 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
                n.tone === 'warning' && 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
                n.tone === 'error' && 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
                n.tone === 'info' && 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
                n.tone === 'neutral' && 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}><Icon className="size-4.5" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2"><p className="text-sm font-semibold text-[var(--text-strong)]">{n.title}</p><span className="text-xs font-medium text-[var(--text-muted)]">{n.time}</span></div>
                <p className="mt-0.5 text-sm font-medium text-[var(--text-muted)]">{n.message}</p>
              </div>
              {!n.read && <span className="mt-1 size-2 flex-shrink-0 rounded-full bg-[var(--color-brand-500)]" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ======================================================================== */
/* 9. TEAM — member table + invite modal                                    */
/* ======================================================================== */
export function TeamPage() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const members = [
    { name: 'Arun Pandian', email: 'arun@mtverse.io', role: 'Owner', status: 'Active', lastActive: 'Online now' },
    { name: 'Sara Nguyen', email: 'sara@mtverse.io', role: 'Admin', status: 'Active', lastActive: '2 min ago' },
    { name: 'James Park', email: 'james@mtverse.io', role: 'Editor', status: 'Active', lastActive: '1 hour ago' },
    { name: 'Maria Lopez', email: 'maria@mtverse.io', role: 'Editor', status: 'Active', lastActive: '3 hours ago' },
    { name: 'Alex Chen', email: 'alex@mtverse.io', role: 'Viewer', status: 'On leave', lastActive: '2 days ago' },
    { name: 'Tom Wright', email: 'tom@mtverse.io', role: 'Viewer', status: 'Invited', lastActive: 'Pending' },
  ];
  const roleTone = { Owner: 'brand', Admin: 'success', Editor: 'info', Viewer: 'neutral' } as const;
  return (
    <div className="space-y-6">
      <PageHeader breadcrumb={[{ label: 'Pages' }, { label: 'Team' }]} title="Team Members" description="Manage who has access to your workspace." actions={<button className="ds-btn ds-btn-primary" onClick={() => setModalOpen(true)}><Plus className="size-4" /> Invite member</button>} />
      <SectionCard noBodyPadding>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b border-[var(--border)] bg-[var(--surface-sunken)]">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Member</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Role</th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:table-cell">Last active</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"></th>
          </tr></thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.email} className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--surface-sunken)]">
                <td className="px-5 py-3.5"><div className="flex items-center gap-2.5"><UserAvatar name={m.name} size="sm" /><div><p className="font-semibold text-[var(--text-strong)]">{m.name}</p><p className="text-xs font-medium text-[var(--text-muted)]">{m.email}</p></div></div></td>
                <td className="px-4 py-3.5"><StatusBadge tone={roleTone[m.role as keyof typeof roleTone]}>{m.role}</StatusBadge></td>
                <td className="hidden px-4 py-3.5 text-xs font-medium text-[var(--text-muted)] sm:table-cell">{m.lastActive}</td>
                <td className="px-4 py-3.5 text-center"><StatusBadge tone={m.status === 'Active' ? 'success' : m.status === 'Invited' ? 'warning' : 'neutral'} dot>{m.status}</StatusBadge></td>
                <td className="px-5 py-3.5 text-right"><button type="button" onClick={() => toast({ title: 'Managing member' })} className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-strong)]"><SettingsIcon className="size-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
      <Modal open={modalOpen} onOpenChange={setModalOpen} title="Invite team member" description="Send an invitation to join your workspace" icon={Users} footer={<ModalActions onCancel={() => setModalOpen(false)} onConfirm={() => { setModalOpen(false); toast({ title: 'Invitation sent' }); }} confirmLabel="Send invite" />}>
        <div className="space-y-4">
          <Field label="Email address" required><TextInput value="" onChange={() => undefined} placeholder="colleague@company.com" type="email" autoFocus /></Field>
          <Field label="Role"><SelectInput value="editor" onChange={() => undefined} options={[{ value: 'admin', label: 'Admin — full access' }, { value: 'editor', label: 'Editor — can edit content' }, { value: 'viewer', label: 'Viewer — read-only access' }]} /></Field>
          <Field label="Personal message"><TextArea value="" onChange={() => undefined} placeholder="Join our team on mtverse..." /></Field>
        </div>
      </Modal>
    </div>
  );
}

/* ======================================================================== */
/* 10. SUCCESS — centered full-screen with animated checkmark               */
/* ======================================================================== */
export function SuccessPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="relative inline-flex size-24 items-center justify-center">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-400)] opacity-20" />
        <span className="relative inline-flex size-24 items-center justify-center rounded-full bg-[var(--color-success-50)] dark:bg-[rgba(18,183,106,0.16)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-12 text-[var(--color-success-500)]" style={{ animation: 'dsFadeIn 0.5s ease-out 0.2s both' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </div>
      <h1 className="mt-6 text-2xl font-semibold text-[var(--text-strong)] ds-fade-up" style={{ animationDelay: '0.3s' }}>Payment Successful!</h1>
      <p className="mt-2 max-w-md text-sm font-medium text-[var(--text-muted)] ds-fade-up" style={{ animationDelay: '0.4s' }}>Your order has been confirmed and a receipt has been sent to your email. Thank you for your purchase!</p>
      <div className="mt-6 flex gap-3 ds-fade-up" style={{ animationDelay: '0.5s' }}>
        <button className="ds-btn ds-btn-secondary"><ArrowLeft className="size-4" /> Back to home</button>
        <button className="ds-btn ds-btn-primary">View order</button>
      </div>
      <div className="mt-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4 text-left ds-fade-up" style={{ animationDelay: '0.6s' }}>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Order summary</p>
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-[var(--text-muted)]">Order ID</span><span className="font-semibold text-[var(--text-strong)]">#OR-9081</span></div>
          <div className="flex justify-between"><span className="text-[var(--text-muted)]">Amount</span><span className="font-semibold text-[var(--text-strong)]">$2,399.00</span></div>
          <div className="flex justify-between"><span className="text-[var(--text-muted)]">Payment method</span><span className="font-semibold text-[var(--text-strong)]">Visa •••• 4242</span></div>
          <div className="flex justify-between"><span className="text-[var(--text-muted)]">Date</span><span className="font-semibold text-[var(--text-strong)]">Jun 20, 2026</span></div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 11. BLANK PAGE — minimal header + empty canvas                           */
/* ======================================================================== */
export function BlankPage() {
  return (
    <div className="space-y-6">
      <PageHeader breadcrumb={[{ label: 'Pages' }, { label: 'Blank Page' }]} title="Blank Page" description="Start building your custom page from here." />
      <div className="flex min-h-[50vh] items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)]">
        <div className="text-center">
          <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--text-subtle)]"><FileText className="size-7" /></div>
          <p className="mt-4 text-sm font-semibold text-[var(--text-strong)]">Empty canvas</p>
          <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Add your content here</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 12. 404 ERROR — centered illustration + search + quick links             */
/* ======================================================================== */
export function Error404Page() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-[120px] font-semibold leading-none text-[var(--color-brand-500)] sm:text-[180px]" style={{ animation: 'dsFadeUp 0.5s ease-out both' }}>404</p>
      <h1 className="mt-2 text-xl font-semibold text-[var(--text-strong)] ds-fade-up" style={{ animationDelay: '0.1s' }}>Page Not Found</h1>
      <p className="mt-2 max-w-md text-sm font-medium text-[var(--text-muted)] ds-fade-up" style={{ animationDelay: '0.2s' }}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <div className="mt-6 flex max-w-md items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 ds-fade-up" style={{ animationDelay: '0.3s' }}>
        <Search className="ml-2 size-4 text-[var(--text-muted)]" />
        <input type="search" placeholder="Search pages..." className="flex-1 bg-transparent text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" />
        <button className="ds-btn ds-btn-primary !h-9 !text-xs">Search</button>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2 ds-fade-up" style={{ animationDelay: '0.4s' }}>
        <button className="ds-btn ds-btn-secondary"><Home className="size-4" /> Go home</button>
        <button className="ds-btn ds-btn-secondary"><ArrowLeft className="size-4" /> Go back</button>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 13. 500 ERROR — centered with different messaging + retry                */
/* ======================================================================== */
export function Error500Page() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-[120px] font-semibold leading-none text-[var(--color-error-500)] sm:text-[180px]" style={{ animation: 'dsFadeUp 0.5s ease-out both' }}>500</p>
      <h1 className="mt-2 text-xl font-semibold text-[var(--text-strong)] ds-fade-up" style={{ animationDelay: '0.1s' }}>Internal Server Error</h1>
      <p className="mt-2 max-w-md text-sm font-medium text-[var(--text-muted)] ds-fade-up" style={{ animationDelay: '0.2s' }}>Something went wrong on our end. Our team has been notified and is working on a fix. Please try again in a moment.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2 ds-fade-up" style={{ animationDelay: '0.3s' }}>
        <button className="ds-btn ds-btn-primary"><RefreshCw className="size-4" /> Try again</button>
        <button className="ds-btn ds-btn-secondary"><Home className="size-4" /> Go home</button>
      </div>
      <p className="mt-4 text-xs font-medium text-[var(--text-subtle)] ds-fade-up" style={{ animationDelay: '0.4s' }}>Error ID: err_a8f4b2c_2026 — include this when contacting support</p>
    </div>
  );
}

/* ======================================================================== */
/* 14. 503 ERROR — service unavailable centered                             */
/* ======================================================================== */
export function Error503Page() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-[120px] font-semibold leading-none text-[var(--color-warning-500)] sm:text-[180px]" style={{ animation: 'dsFadeUp 0.5s ease-out both' }}>503</p>
      <h1 className="mt-2 text-xl font-semibold text-[var(--text-strong)] ds-fade-up" style={{ animationDelay: '0.1s' }}>Service Unavailable</h1>
      <p className="mt-2 max-w-md text-sm font-medium text-[var(--text-muted)] ds-fade-up" style={{ animationDelay: '0.2s' }}>The service is temporarily unavailable due to maintenance. We will be back shortly. Thank you for your patience.</p>
      <div className="mt-6 ds-fade-up" style={{ animationDelay: '0.3s' }}>
        <button className="ds-btn ds-btn-primary"><RefreshCw className="size-4" /> Refresh page</button>
      </div>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--surface-sunken)] px-3 py-1.5 ds-fade-up" style={{ animationDelay: '0.4s' }}>
        <span className="ds-dot ds-dot-warning" />
        <span className="text-xs font-semibold text-[var(--text-muted)]">Estimated downtime: 15 minutes</span>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 15. COMING SOON — centered with countdown timer animation                */
/* ======================================================================== */
export function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = React.useState({ days: 14, hours: 6, minutes: 32, seconds: 18 });
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--; else { seconds = 59; if (minutes > 0) minutes--; else { minutes = 59; if (hours > 0) hours--; else { hours = 23; if (days > 0) days--; } } }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const units = [
    { label: 'Days', value: timeLeft.days }, { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes }, { label: 'Seconds', value: timeLeft.seconds },
  ];
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-white ds-fade-up">
        <Zap className="size-8" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-[var(--text-strong)] ds-fade-up" style={{ animationDelay: '0.1s' }}>Coming Soon</h1>
      <p className="mt-2 max-w-md text-sm font-medium text-[var(--text-muted)] ds-fade-up" style={{ animationDelay: '0.2s' }}>We are working on something exciting. Be the first to know when we launch.</p>
      {/* Countdown */}
      <div className="mt-8 flex gap-3 sm:gap-6 ds-fade-up" style={{ animationDelay: '0.3s' }}>
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] text-2xl font-semibold text-[var(--text-strong)] shadow-[var(--shadow-theme-xs)] sm:size-20 sm:text-3xl">
              {String(u.value).padStart(2, '0')}
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{u.label}</p>
          </div>
        ))}
      </div>
      {/* Email notify */}
      <div className="mt-8 flex max-w-md items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 ds-fade-up" style={{ animationDelay: '0.4s' }}>
        <Mail className="ml-2 size-4 text-[var(--text-muted)]" />
        <input type="email" placeholder="Get notified at launch" className="flex-1 bg-transparent text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" />
        <button className="ds-btn ds-btn-primary !h-9 !text-xs">Notify me</button>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* 16. MAINTENANCE — centered with progress bar + estimated time            */
/* ======================================================================== */
export function MaintenancePage() {
  const [progress, setProgress] = React.useState(62);
  React.useEffect(() => {
    const interval = setInterval(() => { setProgress((p) => p >= 95 ? p : p + 0.5); }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="inline-flex size-20 items-center justify-center rounded-2xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)] ds-fade-up">
        <Wrench className="size-10 animate-pulse" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-[var(--text-strong)] ds-fade-up" style={{ animationDelay: '0.1s' }}>Under Maintenance</h1>
      <p className="mt-2 max-w-md text-sm font-medium text-[var(--text-muted)] ds-fade-up" style={{ animationDelay: '0.2s' }}>We are performing scheduled maintenance to improve your experience. The service will be back online shortly.</p>
      {/* Progress */}
      <div className="mt-8 w-full max-w-md ds-fade-up" style={{ animationDelay: '0.3s' }}>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-[var(--text-strong)]">Maintenance progress</span>
          <span className="font-semibold text-[var(--text-strong)]">{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} tone="warning" size="md" />
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-[var(--text-muted)]">
          <Clock className="size-3.5" /> Estimated time remaining: ~{Math.round((100 - progress) / 5)} minutes
        </div>
      </div>
      {/* Status items */}
      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 ds-fade-up" style={{ animationDelay: '0.4s' }}>
        {[
          { label: 'Database migration', status: 'done' },
          { label: 'Cache rebuild', status: 'in-progress' },
          { label: 'Final verification', status: 'pending' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] px-3 py-2">
            {s.status === 'done' && <Check className="size-4 text-[var(--color-success-500)]" />}
            {s.status === 'in-progress' && <RefreshCw className="size-4 animate-spin text-[var(--color-warning-500)]" />}
            {s.status === 'pending' && <Clock className="size-4 text-[var(--text-subtle)]" />}
            <span className="text-xs font-semibold text-[var(--text-body)]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
