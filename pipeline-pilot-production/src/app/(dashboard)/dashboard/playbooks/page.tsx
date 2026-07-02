'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge } from '@/components/common/status-badge';
import { playbooks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BookOpen, Search, Plus, Eye, Clock, ArrowRight, BookMarked,
  Lightbulb, Handshake, Users, RefreshCw, MessageSquare, Sparkles,
  Flame,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Discovery: Search,
  Negotiation: Handshake,
  Strategy: Lightbulb,
  Renewals: RefreshCw,
  Sales: BookOpen,
};

const CATEGORY_COLORS: Record<string, string> = {
  Discovery: 'var(--accent)',
  Negotiation: 'var(--chart-1)',
  Strategy: 'var(--chart-3)',
  Renewals: 'var(--chart-5)',
  Sales: 'var(--chart-4)',
};

const CATEGORIES = [
  { id: 'all', label: 'All playbooks', icon: BookOpen, color: 'var(--accent)' },
  { id: 'Discovery', label: 'Discovery', icon: Search, color: 'var(--accent)' },
  { id: 'Negotiation', label: 'Negotiation', icon: Handshake, color: 'var(--chart-1)' },
  { id: 'Strategy', label: 'Strategy', icon: Lightbulb, color: 'var(--chart-3)' },
  { id: 'Renewals', label: 'Renewals', icon: RefreshCw, color: 'var(--chart-5)' },
  { id: 'Sales', label: 'Sales', icon: BookOpen, color: 'var(--chart-4)' },
];

export default function PlaybooksPage() {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');

  const filtered = React.useMemo(() => {
    return playbooks.filter((p) => {
      const catMatch = category === 'all' || p.category === category;
      const q = search.toLowerCase().trim();
      const qMatch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [search, category]);

  // Featured = highest views
  const featured = [...playbooks].sort((a, b) => b.views - a.views)[0];
  const featuredColor = CATEGORY_COLORS[featured.category] || 'var(--accent)';
  const FeaturedIcon = CATEGORY_ICONS[featured.category] || BookOpen;

  // Category counts
  const categoryCounts = CATEGORIES.map((c) => ({
    ...c,
    count: c.id === 'all' ? playbooks.length : playbooks.filter((p) => p.category === c.id).length,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Playbooks"
        description="Battle-tested strategies, scripts, and frameworks for every stage"
        icon={BookOpen}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New playbook
            </Button>
          </>
        }
      />

      {/* Search + category filter */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search playbooks, authors, topics…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border h-9"
          />
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors',
                category === c.id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured playbook + categories sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Featured */}
        <div className="lg:col-span-3 relative overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-chart-1/5 p-6">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-chart-1/8 blur-3xl" />

          <div className="relative flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-accent/15 text-accent border border-accent/30">
                  <Flame className="w-3 h-3" /> Featured
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${featuredColor} 12%, transparent)`,
                    color: featuredColor,
                    borderColor: `color-mix(in oklch, ${featuredColor} 25%, transparent)`,
                  }}
                >
                  <FeaturedIcon className="w-2.5 h-2.5" /> {featured.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border border-border bg-secondary text-muted-foreground">
                  {featured.stage} stage
                </span>
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-foreground leading-tight mb-2">
                {featured.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {featured.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-2">
                  <AvatarBadge initials={featured.author.split(' ').map((n) => n[0]).join('')} color={featuredColor} size="md" />
                  <div>
                    <p className="text-xs font-medium text-foreground">{featured.author}</p>
                    <p className="text-[10px] text-muted-foreground">Updated {featured.lastUpdated}</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="font-semibold text-foreground tabular-nums">{featured.views}</span>
                  views
                </div>
              </div>

              <Button size="sm">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Open playbook
              </Button>
            </div>

            {/* Visual / icon block */}
            <div className="hidden md:flex items-center justify-center w-32 shrink-0">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${featuredColor}, color-mix(in oklch, ${featuredColor} 60%, transparent))`,
                }}
              >
                <FeaturedIcon className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories sidebar */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookMarked className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Categories</h3>
          </div>
          <div className="space-y-1">
            {categoryCounts.map((c, i) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors text-left animate-in fade-in slide-in-from-bottom-1',
                    category === c.id ? 'bg-accent/10' : 'hover:bg-secondary/40'
                  )}
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `color-mix(in oklch, ${c.color} 12%, transparent)` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: c.color }} />
                  </div>
                  <span className={cn(
                    'text-xs font-medium flex-1',
                    category === c.id ? 'text-accent' : 'text-foreground'
                  )}>
                    {c.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded tabular-nums">
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-border">
            <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground">AI suggestion</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Based on your active deals, the <span className="text-accent font-medium">Negotiation Playbook</span> could help close 3 stalled deals.
              </p>
              <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:underline">
                View suggestion <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Playbook cards grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">
            {category === 'all' ? 'All playbooks' : category}{' '}
            <span className="text-muted-foreground font-normal">({filtered.length})</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p, i) => {
            const color = CATEGORY_COLORS[p.category] || 'var(--accent)';
            const Icon = CATEGORY_ICONS[p.category] || BookOpen;
            return (
              <div
                key={p.id}
                className="group relative bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <span
                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${color} 10%, transparent)`,
                      color: color,
                      borderColor: `color-mix(in oklch, ${color} 25%, transparent)`,
                    }}
                  >
                    {p.category}
                  </span>
                </div>

                <h4 className="relative text-sm font-semibold text-foreground leading-snug mb-1.5 group-hover:text-accent transition-colors">
                  {p.title}
                </h4>
                <p className="relative text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {p.description}
                </p>

                <div className="relative flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <AvatarBadge initials={p.author.split(' ').map((n) => n[0]).join('')} color={color} size="sm" />
                    <div>
                      <p className="text-[10px] font-medium text-foreground truncate max-w-[80px]">{p.author.split(' ')[0]}</p>
                      <p className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                        <Clock className="w-2 h-2" />{p.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      <span className="font-semibold text-foreground tabular-nums">{p.views}</span>
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border border-border bg-secondary text-muted-foreground">
                    <MessageSquare className="w-2.5 h-2.5" /> {p.stage}
                  </span>
                  {p.views > 300 && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border border-warning/30 bg-warning/10 text-warning">
                      <Flame className="w-2.5 h-2.5" /> Popular
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
