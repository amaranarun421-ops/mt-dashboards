'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge } from '@/components/common/status-badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Bookmark, Search, Star, Clock, Calendar, Download, Play, MoreVertical,
  FileText, TrendingUp, DollarSign, BarChart3, PieChart as PieIcon,
  FileBarChart, Plus, ArrowUpDown, Eye,
} from 'lucide-react';

const TYPE_ICONS: Record<string, React.ElementType> = {
  Sales: DollarSign,
  Performance: TrendingUp,
  Forecast: TrendingUp,
  Team: BarChart3,
  Marketing: PieIcon,
  Customer: FileBarChart,
};

const TYPE_COLORS: Record<string, string> = {
  Sales: 'var(--accent)',
  Performance: 'var(--chart-1)',
  Forecast: 'var(--chart-3)',
  Team: 'var(--chart-2)',
  Marketing: 'var(--chart-4)',
  Customer: 'var(--chart-5)',
};

// Synthesized saved reports with more fields than the base `reports` data
const savedReports = [
  { id: 'sr1', name: 'Q3 Pipeline Health Check', type: 'Sales', lastRun: '2h ago', schedule: 'Weekly', favorite: true, owner: 'Sarah Chen', ownerInitials: 'SC', color: 'oklch(0.7 0.18 145)', draft: false, runs: 14, size: '1.8 MB' },
  { id: 'sr2', name: 'Win/Loss Quarterly Summary', type: 'Performance', lastRun: '5h ago', schedule: 'Quarterly', favorite: true, owner: 'Emily Davis', ownerInitials: 'ED', color: 'oklch(0.7 0.18 220)', draft: false, runs: 8, size: '2.4 MB' },
  { id: 'sr3', name: 'Lead Source Attribution', type: 'Marketing', lastRun: '1d ago', schedule: 'Monthly', favorite: false, owner: 'David Okafor', ownerInitials: 'DO', color: 'oklch(0.7 0.18 25)', draft: false, runs: 12, size: '1.2 MB' },
  { id: 'sr4', name: 'Forecast vs Actuals', type: 'Forecast', lastRun: '3d ago', schedule: 'Daily', favorite: true, owner: 'Mike Johnson', ownerInitials: 'MJ', color: 'oklch(0.7 0.18 220)', draft: false, runs: 92, size: '4.1 MB' },
  { id: 'sr5', name: 'Team Productivity Tracker', type: 'Team', lastRun: '—', schedule: 'None', favorite: false, owner: 'Admin', ownerInitials: 'AD', color: 'oklch(0.65 0.18 145)', draft: true, runs: 0, size: '—' },
  { id: 'sr6', name: 'Churn Risk Watchlist', type: 'Customer', lastRun: '6h ago', schedule: 'Weekly', favorite: false, owner: 'James Wilson', ownerInitials: 'JW', color: 'oklch(0.7 0.15 300)', draft: false, runs: 24, size: '0.9 MB' },
  { id: 'sr7', name: 'Renewal Forecast Q3', type: 'Forecast', lastRun: '4h ago', schedule: 'Weekly', favorite: true, owner: 'Priya Sharma', ownerInitials: 'PS', color: 'oklch(0.7 0.18 220)', draft: false, runs: 7, size: '1.5 MB' },
  { id: 'sr8', name: 'Sales Activity Heatmap', type: 'Team', lastRun: '12h ago', schedule: 'Monthly', favorite: false, owner: 'Marcus Bell', ownerInitials: 'MB', color: 'oklch(0.7 0.18 145)', draft: false, runs: 3, size: '2.0 MB' },
  { id: 'sr9', name: 'Pipeline Conversion Funnel', type: 'Performance', lastRun: '1d ago', schedule: 'Weekly', favorite: false, owner: 'Sarah Chen', ownerInitials: 'SC', color: 'oklch(0.7 0.18 145)', draft: false, runs: 11, size: '0.7 MB' },
];

const recentlyViewed = [
  { id: 'rv1', name: 'Q2 Enterprise Deal Analysis', type: 'Sales', viewed: '5m ago', owner: 'Sarah Chen' },
  { id: 'rv2', name: 'Healthcare Vertical Pipeline', type: 'Sales', viewed: '32m ago', owner: 'Emily Davis' },
  { id: 'rv3', name: 'Q4 Forecast Scenarios', type: 'Forecast', viewed: '1h ago', owner: 'Mike Johnson' },
  { id: 'rv4', name: 'SDR Activity Summary', type: 'Team', viewed: '3h ago', owner: 'David Okafor' },
  { id: 'rv5', name: 'Expansion Motion ROI', type: 'Customer', viewed: '6h ago', owner: 'Priya Sharma' },
];

const FILTERS = [
  { id: 'all', label: 'All', count: savedReports.length },
  { id: 'favorites', label: 'Favorites', count: savedReports.filter((r) => r.favorite).length },
  { id: 'scheduled', label: 'Scheduled', count: savedReports.filter((r) => r.schedule !== 'None').length },
  { id: 'drafts', label: 'Drafts', count: savedReports.filter((r) => r.draft).length },
];

export default function SavedReportsPage() {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('recent');
  const [favorites, setFavorites] = React.useState<Set<string>>(
    new Set(savedReports.filter((r) => r.favorite).map((r) => r.id))
  );

  const filtered = React.useMemo(() => {
    let list = savedReports.filter((r) => {
      const q = search.toLowerCase().trim();
      const qMatch = !q || r.name.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q);
      if (!qMatch) return false;
      if (filter === 'favorites') return favorites.has(r.id);
      if (filter === 'scheduled') return r.schedule !== 'None';
      if (filter === 'drafts') return r.draft;
      return true;
    });

    if (sort === 'recent') {
      list = [...list].sort((a, b) => {
        const order = ['5m ago', '12m ago', '32m ago', '1h ago', '2h ago', '4h ago', '5h ago', '6h ago', '12h ago', '1d ago', '3d ago', '—'];
        return order.indexOf(a.lastRun) - order.indexOf(b.lastRun);
      });
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'runs') {
      list = [...list].sort((a, b) => b.runs - a.runs);
    }
    return list;
  }, [filter, search, sort, favorites]);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Reports"
        description="Your library of saved and scheduled reports"
        icon={Bookmark}
        actions={
          <Button size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> New report
          </Button>
        }
      />

      {/* Filter + search bar */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors',
                filter === f.id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {f.label}
              <span className={cn(
                'text-[10px] px-1.5 py-0.5 rounded',
                filter === f.id ? 'bg-accent-foreground/15' : 'bg-background/60'
              )}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search saved reports…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full md:w-56 h-9 bg-card border-border"
            />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-36 h-9 bg-card border-border">
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently run</SelectItem>
              <SelectItem value="name">Name (A–Z)</SelectItem>
              <SelectItem value="runs">Most run</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Saved reports grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((r, i) => {
          const Icon = TYPE_ICONS[r.type] || FileText;
          const color = TYPE_COLORS[r.type] || 'var(--accent)';
          const isFav = favorites.has(r.id);
          return (
            <div
              key={r.id}
              className="group relative bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFav(r.id)}
                    className={cn(
                      'w-7 h-7 flex items-center justify-center rounded-md transition-colors',
                      isFav ? 'text-warning' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    )}
                  >
                    <Star className={cn('w-4 h-4', isFav && 'fill-warning')} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-foreground mt-3 leading-snug">{r.name}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">{r.type} report</p>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${color} 10%, transparent)`,
                    color: color,
                    borderColor: `color-mix(in oklch, ${color} 25%, transparent)`,
                  }}
                >
                  {r.type}
                </span>
                {r.draft ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border border-border bg-secondary text-muted-foreground">
                    Draft
                  </span>
                ) : r.schedule !== 'None' && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border border-accent/30 bg-accent/10 text-accent">
                    <Calendar className="w-2.5 h-2.5" /> {r.schedule}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <AvatarBadge initials={r.ownerInitials} size="sm" color={r.color} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-foreground truncate">{r.owner}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {r.lastRun}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon-sm" className="text-accent hover:text-accent">
                    <Play className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" disabled={r.draft}>
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recently viewed */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Recently viewed</h3>
        </div>
        <div className="space-y-1">
          {recentlyViewed.map((r, i) => {
            const Icon = TYPE_ICONS[r.type] || FileText;
            const color = TYPE_COLORS[r.type] || 'var(--accent)';
            return (
              <button
                key={r.id}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/40 transition-colors text-left animate-in fade-in slide-in-from-bottom-1"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{r.owner} · {r.type}</p>
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">{r.viewed}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
