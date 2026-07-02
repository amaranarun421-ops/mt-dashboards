import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/status-badge";

export function UiBadgesPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Badges & Chips"]} title="Badges & Chips" description="Status indicators, labels, and tags." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Status Badges</h3><div className="flex flex-wrap gap-2"><StatusBadge variant="success" dot>Active</StatusBadge><StatusBadge variant="warning" dot>Pending</StatusBadge><StatusBadge variant="error" dot>Failed</StatusBadge><StatusBadge variant="info" dot>Info</StatusBadge><StatusBadge variant="neutral">Draft</StatusBadge><StatusBadge variant="primary">Featured</StatusBadge></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Pulsing Badges</h3><div className="flex flex-wrap gap-2"><StatusBadge variant="success" dot pulse>Live</StatusBadge><StatusBadge variant="error" dot pulse>Critical</StatusBadge><StatusBadge variant="warning" dot pulse>Warning</StatusBadge><StatusBadge variant="info" dot pulse>Syncing</StatusBadge></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Standard Badges</h3><div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Count Badges</h3><div className="flex flex-wrap items-center gap-3"><div className="relative"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">Inbox</div><span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-error-500 px-1 text-[10px] font-bold text-white">12</span></div><div className="relative"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">Bell</div><span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">3</span></div></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Chips / Tags</h3><div className="flex flex-wrap gap-2">{["React", "TypeScript", "Next.js", "Tailwind", "Design System", "Premium"].map((t) => <span key={t} className="rounded-full border border-border bg-gray-100 dark:bg-gray-800/50 px-3 py-1 text-xs font-medium">#{t}</span>)}</div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Removable Chips</h3><div className="flex flex-wrap gap-2">{["Frontend", "Backend", "DevOps"].map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-500">{t}<button className="text-primary/60 hover:text-brand-500">×</button></span>)}</div></Card>
      </div>
    </div>
  );
}
