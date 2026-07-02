'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge, RankBadge } from '@/components/common/status-badge';
import { repAvatarUrl } from '@/lib/avatars';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { leaderboard } from '@/lib/data';
import { Trophy, Crown, Medal, ArrowUpRight, ArrowDownRight, Minus, Download, Sparkles } from 'lucide-react';

const TIMEFRAMES = ['This Month', 'This Quarter', 'This Year'];
const METRICS = ['Revenue', 'Deals', 'Win Rate'];

// Sparkline mini chart
function Sparkline({ data, color = 'var(--accent)', width = 70, height = 24 }: { data: number[]; color?: string; width?: number; height?: number }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const path = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="inline-block" preserveAspectRatio="none" style={{ width, height }}>
      <path d={path} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Generate fake sparkline data per rep
function sparklineFor(seed: number) {
  return Array.from({ length: 8 }, (_, i) => 50 + ((seed * (i + 1) * 13) % 80));
}

function DeltaPill({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-success/15 text-success">
        <ArrowUpRight className="w-3 h-3" />+{change}%
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-destructive/15 text-destructive">
        <ArrowDownRight className="w-3 h-3" />{change}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary text-muted-foreground">
      <Minus className="w-3 h-3" />0%
    </span>
  );
}

const PODIUM_STYLES = [
  { rank: 1, height: 'h-32', crown: true, ringColor: 'var(--warning)', medal: Crown, label: '1st', trophyColor: 'text-warning' },
  { rank: 2, height: 'h-24', crown: false, ringColor: 'var(--chart-1)', medal: Medal, label: '2nd', trophyColor: 'text-chart-1' },
  { rank: 3, height: 'h-20', crown: false, ringColor: 'var(--chart-3)', medal: Medal, label: '3rd', trophyColor: 'text-chart-3' },
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = React.useState('This Quarter');
  const [metric, setMetric] = React.useState('Revenue');

  const sorted = [...leaderboard].sort((a, b) => {
    if (metric === 'Revenue') return b.revenue - a.revenue;
    if (metric === 'Deals') return b.dealsClosed - a.dealsClosed;
    return b.winRate - a.winRate;
  });

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  // Find podium entries by rank
  const podiumEntries = PODIUM_STYLES.map((p) => ({ ...p, rep: top3[p.rank - 1] })).filter((p) => p.rep);

  // Current user — let's say it's "Sarah Chen"
  const currentUser = leaderboard.find((r) => r.name === 'Sarah Chen') || leaderboard[0];
  const yourRank = sorted.findIndex((r) => r.id === currentUser.id) + 1;
  const aboveYou = sorted[yourRank - 2];
  const belowYou = sorted[yourRank];

  const totalRevenue = leaderboard.reduce((s, r) => s + r.revenue, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leaderboard"
        description="Compete, recognize, and celebrate top performers"
        icon={Trophy}
        actions={
          <>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {TIMEFRAMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap',
                    timeframe === t ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {METRICS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap',
                    metric === m ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
          </>
        }
      />

      {/* Top 3 podium */}
      <div className="relative bg-gradient-to-br from-accent/8 via-transparent to-chart-1/8 border border-border rounded-2xl p-6 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-chart-1/8 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-8">
          {/* Podium displays: 2nd, 1st, 3rd on desktop; stacked on mobile */}
          {/* 2nd place - left */}
          {podiumEntries.find((p) => p.rank === 2) && (
            <PodiumCard entry={podiumEntries.find((p) => p.rank === 2)!} metric={metric} />
          )}
          {/* 1st place - center, taller */}
          {podiumEntries.find((p) => p.rank === 1) && (
            <PodiumCard entry={podiumEntries.find((p) => p.rank === 1)!} metric={metric} center />
          )}
          {/* 3rd place - right */}
          {podiumEntries.find((p) => p.rank === 3) && (
            <PodiumCard entry={podiumEntries.find((p) => p.rank === 3)!} metric={metric} />
          )}
        </div>

        <div className="relative mt-6 pt-5 border-t border-border flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Team revenue ({timeframe})</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(totalRevenue, { compact: true })}</p>
          </div>
          <div className="h-8 w-px bg-border hidden sm:block" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total deals closed</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{leaderboard.reduce((s, r) => s + r.dealsClosed, 0)}</p>
          </div>
          <div className="h-8 w-px bg-border hidden sm:block" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg win rate</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{Math.round(leaderboard.reduce((s, r) => s + r.winRate, 0) / leaderboard.length)}%</p>
          </div>
        </div>
      </div>

      {/* Your rank card */}
      <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/30 rounded-xl p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Your position</p>
              <p className="text-base font-semibold text-foreground">
                <span className="text-accent">#{yourRank}</span> of {leaderboard.length} reps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rep above</p>
              {aboveYou ? (
                <div className="flex items-center gap-1.5 mt-1">
                  <AvatarBadge initials={aboveYou.initials} color={aboveYou.avatarColor} size="sm" src={repAvatarUrl(aboveYou.id, 64)} alt={aboveYou.name} />
                  <span className="text-xs font-medium text-foreground">{aboveYou.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-muted-foreground">#{yourRank - 1}</span>
                </div>
              ) : <span className="text-xs text-muted-foreground">—</span>}
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">You</p>
              <div className="flex items-center gap-1.5 mt-1">
                <AvatarBadge initials={currentUser.initials} color={currentUser.avatarColor} size="md" src={repAvatarUrl(currentUser.id, 96)} alt={currentUser.name} />
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">{currentUser.name.split(' ')[0]}</p>
                  <p className="text-[10px] text-accent">#{yourRank}</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rep below</p>
              {belowYou ? (
                <div className="flex items-center gap-1.5 mt-1">
                  <AvatarBadge initials={belowYou.initials} color={belowYou.avatarColor} size="sm" src={repAvatarUrl(belowYou.id, 64)} alt={belowYou.name} />
                  <span className="text-xs font-medium text-foreground">{belowYou.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-muted-foreground">#{yourRank + 1}</span>
                </div>
              ) : <span className="text-xs text-muted-foreground">—</span>}
            </div>
            <div className="text-center border-l border-border pl-6">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Gap to #1</p>
              <p className="text-sm font-bold text-foreground tabular-nums">
                {yourRank === 1 ? 'You are #1' : formatCurrency(sorted[0].revenue - currentUser.revenue, { compact: true })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full leaderboard table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-warning" />
            <h3 className="text-sm font-semibold text-foreground">Full leaderboard</h3>
            <span className="text-[11px] text-muted-foreground">({leaderboard.length} reps · ranked by {metric.toLowerCase()})</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Rank</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Rep</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Revenue</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Deals</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Win rate</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Quota attainment</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Δ</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Trend</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => {
                const attainment = Math.round((r.revenue / r.quota) * 100);
                const isYou = r.id === currentUser.id;
                return (
                  <tr
                    key={r.id}
                    className={cn(
                      'border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1',
                      isYou && 'bg-accent/5'
                    )}
                    style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <RankBadge rank={i + 1} />
                        {isYou && <span className="text-[10px] text-accent font-semibold">You</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <AvatarBadge initials={r.initials} color={r.avatarColor} size="md" src={repAvatarUrl(r.id, 96)} alt={r.name} />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{r.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{r.role} · {r.territory}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="font-bold text-foreground tabular-nums">{formatCurrency(r.revenue, { compact: true })}</p>
                      <p className="text-[10px] text-muted-foreground tabular-nums">of {formatCurrency(r.quota, { compact: true })}</p>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{r.dealsClosed}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={cn(
                        'inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold tabular-nums',
                        r.winRate >= 65 ? 'bg-success/15 text-success' : r.winRate >= 55 ? 'bg-accent/15 text-accent' : 'bg-warning/15 text-warning'
                      )}>
                        {r.winRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[100px] h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${Math.min(attainment, 100)}%`,
                              transitionDelay: `${i * 40}ms`,
                              background: attainment >= 100 ? 'var(--success)' : attainment >= 80 ? 'var(--accent)' : 'var(--warning)',
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-foreground tabular-nums w-9">{attainment}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <DeltaPill change={r.changePct} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Sparkline data={sparklineFor(i + 1)} color={r.changePct >= 0 ? 'var(--success)' : 'var(--destructive)'} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ entry, metric, center }: { entry: typeof PODIUM_STYLES[number] & { rep: typeof leaderboard[number] }; metric: string; center?: boolean }) {
  const { rep, rank, ringColor, medal: Medal, label, trophyColor } = entry;
  if (!rep) return null;

  const metricValue = metric === 'Revenue' ? formatCurrency(rep.revenue, { compact: true }) :
                      metric === 'Deals' ? `${rep.dealsClosed} deals` :
                      `${rep.winRate}%`;

  return (
    <div className={cn('flex flex-col items-center', center && 'sm:-mt-8')}>
      {rank === 1 && (
        <div className="mb-2 animate-in fade-in zoom-in duration-700">
          <Crown className={cn('w-7 h-7', trophyColor)} />
        </div>
      )}
      <div className="relative">
        <div
          className={cn(
            'rounded-full p-1 transition-transform hover:scale-105',
            center ? 'w-20 h-20' : 'w-16 h-16'
          )}
          style={{
            background: `linear-gradient(135deg, ${ringColor}, color-mix(in oklch, ${ringColor} 60%, transparent))`,
          }}
        >
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
            <span className={cn('font-bold text-white', center ? 'text-2xl' : 'text-lg')} style={{ color: ringColor }}>
              {rep.initials}
            </span>
          </div>
        </div>
        <div
          className={cn(
            'absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-card border-2 flex items-center justify-center',
            center && 'w-8 h-8'
          )}
          style={{ borderColor: ringColor }}
        >
          <span className={cn('text-xs font-bold', trophyColor)}>{rank}</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className={cn('font-semibold text-foreground', center ? 'text-base' : 'text-sm')}>{rep.name}</p>
        <p className="text-[10px] text-muted-foreground">{rep.role}</p>
        <p className={cn('font-bold tabular-nums mt-1', center ? 'text-lg' : 'text-base')} style={{ color: ringColor }}>
          {metricValue}
        </p>
        <div className="mt-1 flex items-center justify-center gap-1">
          {rep.changePct > 0 ? <ArrowUpRight className="w-3 h-3 text-success" /> : <ArrowDownRight className="w-3 h-3 text-destructive" />}
          <span className={cn('text-[10px] font-semibold', rep.changePct >= 0 ? 'text-success' : 'text-destructive')}>
            {Math.abs(rep.changePct)}%
          </span>
        </div>
      </div>

      <div
        className={cn(
          'mt-3 w-20 rounded-t-lg flex items-center justify-center text-[10px] font-bold uppercase tracking-wider',
          center ? 'h-20' : rank === 2 ? 'h-14' : 'h-10'
        )}
        style={{
          background: `linear-gradient(180deg, color-mix(in oklch, ${ringColor} 30%, transparent), color-mix(in oklch, ${ringColor} 8%, transparent))`,
          color: ringColor,
        }}
      >
        {label}
      </div>
    </div>
  );
}
