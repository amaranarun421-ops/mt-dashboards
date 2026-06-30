'use client';

import * as React from 'react';
import { Zap, DollarSign, Brain, TrendingUp, Activity, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader, SectionCard, MetricCard, StatusBadge, ProgressBar } from '@/components/dashboard/primitives';
import { AreaTrendChart, BarTrendChart, DonutChart, HorizontalBars } from '@/components/dashboard/charts';
import { Select } from '@/components/dashboard/select';

export function AIApiUsagePage() {
  const { toast } = useToast();
  const [range, setRange] = React.useState('7d');

  const usageData = [
    { label: 'Mon', requests: 84200, tokens: 18.4, cost: 1840 },
    { label: 'Tue', requests: 92400, tokens: 21.8, cost: 2180 },
    { label: 'Wed', requests: 108400, tokens: 24.2, cost: 2420 },
    { label: 'Thu', requests: 128400, tokens: 31.8, cost: 3180 },
    { label: 'Fri', requests: 142800, tokens: 36.4, cost: 3640 },
    { label: 'Sat', requests: 72400, tokens: 16.8, cost: 1680 },
    { label: 'Sun', requests: 64800, tokens: 14.2, cost: 1420 },
  ];

  const modelDist = [
    { name: 'GPT-4 Turbo', value: 38, color: '#465FFF' },
    { name: 'Claude 3.5', value: 28, color: '#12B76A' },
    { name: 'GPT-4o mini', value: 18, color: '#F79009' },
    { name: 'Gemini 1.5', value: 12, color: '#0BA5EC' },
    { name: 'Llama 3.1', value: 4, color: '#7A5AF8' },
  ];

  const costByModel = [
    { label: 'GPT-4 Turbo', value: 4820, color: '#465FFF', subtitle: '384K requests · 38% of total' },
    { label: 'Claude 3.5', value: 3180, color: '#12B76A', subtitle: '284K requests · 28% of total' },
    { label: 'Gemini 1.5 Pro', value: 1840, color: '#0BA5EC', subtitle: '124K requests · 12% of total' },
    { label: 'GPT-4o mini', value: 640, color: '#F79009', subtitle: '184K requests · 18% of total' },
    { label: 'DALL-E 3', value: 620, color: '#7A5AF8', subtitle: '12.4K requests · 4% of total' },
  ];

  const recentCalls = [
    { id: 'call_001', model: 'GPT-4 Turbo', endpoint: '/v1/chat/completions', tokens: 2840, cost: '$0.085', latency: '2.4s', status: 'Success', time: '2 min ago' },
    { id: 'call_002', model: 'Claude 3.5', endpoint: '/v1/messages', tokens: 1820, cost: '$0.052', latency: '2.1s', status: 'Success', time: '5 min ago' },
    { id: 'call_003', model: 'GPT-4o mini', endpoint: '/v1/chat/completions', tokens: 640, cost: '$0.002', latency: '0.8s', status: 'Success', time: '12 min ago' },
    { id: 'call_004', model: 'DALL-E 3', endpoint: '/v1/images/generations', tokens: 0, cost: '$0.040', latency: '8.4s', status: 'Success', time: '18 min ago' },
    { id: 'call_005', model: 'Gemini 1.5', endpoint: '/v1/generate', tokens: 18400, cost: '$0.184', latency: '3.2s', status: 'Failed', time: '24 min ago' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'AI Assistant' }, { label: 'API Usage' }]}
        title="API Usage & Analytics"
        description="Monitor token consumption, costs, and model distribution."
        actions={
          <>
            <div className="w-32">
              <Select size="sm" value={range} onChange={setRange} options={[
                { value: '24h', label: '24 hours' },
                { value: '7d', label: '7 days' },
                { value: '30d', label: '30 days' },
                { value: '90d', label: '90 days' },
              ]} aria-label="Time range" />
            </div>
            <button type="button" className="ds-btn ds-btn-secondary" onClick={() => toast({ title: 'Export queued' })}><Download className="size-4" /> Export</button>
          </>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard index={0} label="API Requests" value="685K" helper="Last 7 days" trend={{ direction: 'up', value: '18.4%' }} icon={Zap} accent="brand" />
        <MetricCard index={1} label="Tokens Consumed" value="163M" helper="62% output, 38% input" trend={{ direction: 'up', value: '24.2%' }} icon={Brain} accent="info" />
        <MetricCard index={2} label="Total Spend" value="$10,960" helper="Avg $1,566/day" trend={{ direction: 'up', value: '14.8%' }} icon={DollarSign} accent="warning" />
        <MetricCard index={3} label="Avg Latency" value="2.4s" helper="P50 across models" trend={{ direction: 'down', value: '0.4s' }} icon={Activity} accent="success" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Usage Trend" description="Daily requests, tokens (M), and cost ($)">
          <AreaTrendChart
            data={usageData}
            xKey="label"
            height={280}
            series={[
              { key: 'requests', name: 'Requests', color: 'var(--color-brand-500)' },
              { key: 'tokens', name: 'Tokens (M)', color: 'var(--color-success-500)' },
              { key: 'cost', name: 'Cost ($)', color: 'var(--color-warning-500)' },
            ]}
          />
        </SectionCard>

        <SectionCard title="Model Distribution" description="Requests by model">
          <DonutChart data={modelDist} centerValue="685K" centerLabel="Total requests" height={220} />
        </SectionCard>
      </div>

      {/* Cost by model */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Cost by Model" description="Spend attribution across models">
          <HorizontalBars data={costByModel} valueFormatter={(v) => `$${v.toLocaleString()}`} />
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--border-subtle)] pt-4">
            <div><p className="text-xs font-medium text-[var(--text-muted)]">Cost / 1K tokens</p><p className="text-lg font-semibold text-[var(--text-strong)]">$0.04</p></div>
            <div><p className="text-xs font-medium text-[var(--text-muted)]">Cost / request</p><p className="text-lg font-semibold text-[var(--text-strong)]">$0.016</p></div>
            <div><p className="text-xs font-medium text-[var(--text-muted)]">Projected month</p><p className="text-lg font-semibold text-[var(--text-strong)]">$46.8K</p></div>
          </div>
        </SectionCard>

        <SectionCard title="Daily Requests by Model" description="Stacked view">
          <BarTrendChart
            data={[
              { label: 'Mon', gpt4: 32000, claude: 28000, other: 24000 },
              { label: 'Tue', gpt4: 36000, claude: 32000, other: 24000 },
              { label: 'Wed', gpt4: 42000, claude: 38000, other: 28000 },
              { label: 'Thu', gpt4: 50000, claude: 42000, other: 36000 },
              { label: 'Fri', gpt4: 54000, claude: 48000, other: 40000 },
              { label: 'Sat', gpt4: 26000, claude: 24000, other: 22000 },
              { label: 'Sun', gpt4: 22000, claude: 20000, other: 22000 },
            ]}
            xKey="label"
            height={220}
            stack
            series={[
              { key: 'gpt4', name: 'GPT-4', color: 'var(--color-brand-500)' },
              { key: 'claude', name: 'Claude', color: 'var(--color-success-500)' },
              { key: 'other', name: 'Other', color: 'var(--color-warning-500)' },
            ]}
          />
        </SectionCard>
      </div>

      {/* Recent API calls */}
      <SectionCard title="Recent API Calls" description="Latest inference requests" noBodyPadding>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-sunken)]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Call ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Model</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:table-cell">Endpoint</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Tokens</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Cost</th>
                <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:table-cell">Latency</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call) => (
                <tr key={call.id} className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--surface-sunken)]">
                  <td className="px-5 py-3 font-mono text-xs font-semibold text-[var(--text-strong)]">{call.id}</td>
                  <td className="px-4 py-3"><StatusBadge tone="brand">{call.model}</StatusBadge></td>
                  <td className="hidden px-4 py-3 font-mono text-xs font-medium text-[var(--text-muted)] sm:table-cell">{call.endpoint}</td>
                  <td className="px-4 py-3 text-right font-semibold text-[var(--text-body)]">{call.tokens.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-semibold text-[var(--text-strong)]">{call.cost}</td>
                  <td className="hidden px-4 py-3 text-right text-[var(--text-body)] sm:table-cell">{call.latency}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge tone={call.status === 'Success' ? 'success' : 'error'} dot>{call.status}</StatusBadge></td>
                  <td className="px-5 py-3 text-right text-xs font-medium text-[var(--text-muted)]">{call.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
