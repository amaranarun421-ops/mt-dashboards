'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, MoreHorizontal,
  Eye, Users, Clock, Phone, Mail, MessageSquare, Building2, Target, TrendingUp,
  TrendingDown, AlertTriangle, AlertCircle, Info, Star, CheckCircle2, XCircle,
  Plus, X, Search, Filter, Bell, Link2, Video, FileText, UserPlus, Briefcase,
  Zap, Activity, Calendar, Check, Linkedin, MessagesSquare, RefreshCw, Shield,
  Flame, Sparkles, ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem } from '@/components/dashboards/analytics-interactions';
import { PremiumCard, CardHeader, CardActionMenu, Sparkline } from '@/shared';
import * as Data from '../data/mock-data';


export function LeadIntentRadar() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const maxVal = Math.max(...Data.leadIntents.map((l) => l.value));
  const maxEng = 100;
  const W = 520, H = 280, padL = 44, padR = 24, padT = 24, padB = 44;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const toX = (eng: number) => padL + (eng / maxEng) * innerW;
  const toY = (val: number) => padT + innerH - (val / maxVal) * innerH;
  const midX = padL + innerW / 2;
  const midY = padT + innerH / 2;

  return (
    <PremiumCard className="flex h-full flex-col">
      <CardHeader
        icon={Target}
        iconBg="bg-[#f5f3ff] text-[#7a5af8] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#a78bfa]"
        title="Lead Intent Radar"
        subtitle="Engagement vs deal value — bubble size = buying intent."
        action={<CardActionMenu cardName="Lead Intent" />}
      />
      <div className="flex-1 overflow-x-auto p-4 sm:p-5">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ minWidth: 480, height: 'auto' }}>
          <rect x={padL} y={padT} width={midX - padL} height={midY - padT} fill="rgba(18,183,106,0.04)" />
          <rect x={midX} y={padT} width={padR + innerW / 2 - padR} height={midY - padT} fill="rgba(70,95,255,0.04)" />
          <rect x={padL} y={midY} width={midX - padL} height={padB + innerH / 2 - padB} fill="rgba(247,144,9,0.04)" />
          <rect x={midX} y={midY} width={padR + innerW / 2 - padR} height={padB + innerH / 2 - padB} fill="rgba(240,68,56,0.04)" />
          <line x1={midX} y1={padT} x2={midX} y2={H - padB} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={padL} y1={midY} x2={W - padR} y2={midY} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--border)" strokeWidth="1.5" />
          <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontFamily="Outfit, sans-serif" fontWeight="500">Engagement score</text>
          <text x={14} y={H / 2} textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontFamily="Outfit, sans-serif" fontWeight="500" transform={`rotate(-90 14 ${H / 2})`}>Deal value</text>
          <text x={padL + 8} y={padT + 14} fontSize="10" fill="var(--text-subtle)" fontFamily="Outfit, sans-serif" fontWeight="500">Nurture</text>
          <text x={midX + 8} y={padT + 14} fontSize="10" fill="var(--text-subtle)" fontFamily="Outfit, sans-serif" fontWeight="500">Quick wins</text>
          <text x={padL + 8} y={H - padB - 8} fontSize="10" fill="var(--text-subtle)" fontFamily="Outfit, sans-serif" fontWeight="500">Low priority</text>
          <text x={midX + 8} y={H - padB - 8} fontSize="10" fill="var(--text-subtle)" fontFamily="Outfit, sans-serif" fontWeight="500">Strategic focus</text>
          {Data.leadIntents.map((li, i) => {
            const x = toX(li.engagement);
            const y = toY(li.value);
            const radius = 8 + (li.intent / 100) * 18;
            const isHovered = hovered === i;
            return (
              <g key={li.id} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
                <circle cx={x} cy={y} r={isHovered ? radius + 3 : radius} fill="#465FFF" fillOpacity={isHovered ? 0.95 : 0.7} stroke="#465FFF" strokeWidth="2.5" style={{ transition: 'r 220ms ease, fill-opacity 220ms ease' }} />
                <text x={x} y={y - radius - 8} textAnchor="middle" fontSize="11" fill="var(--text-strong)" fontFamily="Outfit, sans-serif" fontWeight={isHovered ? '600' : '500'}>{li.account}</text>
                {isHovered && (
                  <g>
                    <rect x={x + radius + 10} y={y - 48} width="172" height="68" rx="10" fill="var(--popover)" stroke="var(--border)" strokeWidth="1" />
                    <text x={x + radius + 18} y={y - 30} fontSize="11" fill="var(--text-strong)" fontFamily="Outfit, sans-serif" fontWeight="600">{li.account}</text>
                    <text x={x + radius + 18} y={y - 16} fontSize="10" fill="var(--text-muted)" fontFamily="Outfit, sans-serif">Value: <tspan fill="var(--text-strong)" fontWeight="500">${(li.value / 1000).toFixed(0)}K</tspan> · Intent: <tspan fill="var(--text-strong)" fontWeight="500">{li.intent}</tspan></text>
                    <text x={x + radius + 18} y={y - 2} fontSize="10" fill="var(--text-muted)" fontFamily="Outfit, sans-serif">Owner: <tspan fill="var(--text-strong)" fontWeight="500">{li.owner}</tspan></text>
                    <text x={x + radius + 18} y={y + 12} fontSize="10" fill="var(--text-muted)" fontFamily="Outfit, sans-serif">Next: <tspan fill="var(--text-strong)" fontWeight="500">{li.nextAction}</tspan></text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-5 py-3 text-xs sm:px-6">
        <span className="text-[var(--text-muted)]">
          Top intent: <span className="font-semibold text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">Northstar AI (91)</span>
        </span>
        <span className="text-[var(--text-muted)]">
          Needs nurture: <span className="font-semibold text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">FlowDesk (58)</span>
        </span>
      </div>
    </PremiumCard>
  );
}
