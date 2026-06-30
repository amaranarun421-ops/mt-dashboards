"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------------- Page Header ---------------- */
export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 animate-fade-in">
      <div className="space-y-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-muted-foreground/40">/</span>}
                {b.href ? (
                  <a href={b.href} className="hover:text-foreground transition-colors">{b.label}</a>
                ) : (
                  <span>{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

/* ---------------- Stat Card ---------------- */
export type StatCardProps = {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  icon?: React.ReactNode;
  spark?: React.ReactNode;
  footer?: string;
  className?: string;
};

export function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  spark,
  footer,
  className,
}: StatCardProps) {
  const isUp = (delta ?? 0) >= 0;
  return (
    <Card className={cn("relative overflow-hidden hover:shadow-md transition-shadow group", className)}>
      <CardHeader className="flex flex-row items-start justify-between p-5 pb-2 space-y-0">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-2xl md:text-3xl font-bold tracking-tight">{value}</p>
        </div>
        {icon && (
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-3">
        {(delta !== undefined || deltaLabel) && (
          <div className="flex items-center gap-1.5 text-xs">
            {delta !== undefined && (
              <Badge
                variant="outline"
                className={cn(
                  "gap-1 px-1.5 py-0 font-medium",
                  isUp
                    ? "bg-success/10 text-success border-success/20"
                    : "bg-destructive/10 text-destructive border-destructive/20"
                )}
              >
                {isUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {Math.abs(delta)}%
              </Badge>
            )}
            {deltaLabel && <span className="text-muted-foreground">{deltaLabel}</span>}
          </div>
        )}
        {spark && <div className="h-10 -mx-1">{spark}</div>}
        {footer && <p className="text-[11px] text-muted-foreground">{footer}</p>}
      </CardContent>
    </Card>
  );
}

/* ---------------- Section Card ---------------- */
export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
  noBodyPadding,
}: {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  noBodyPadding?: boolean;
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {(title || actions) && (
        <CardHeader className="flex flex-row items-start justify-between p-5 pb-3 space-y-0">
          <div className="space-y-0.5">
            {title && <h3 className="text-base font-semibold tracking-tight">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-1">{actions}</div>}
        </CardHeader>
      )}
      <CardContent className={cn(noBodyPadding ? "p-0" : "p-5 pt-0", bodyClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}

/* ---------------- Card Menu Button ---------------- */
export function CardMenuButton({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-md text-muted-foreground hover:bg-accent">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {items.map((item, i) => (
          <DropdownMenuItem key={i} onClick={item.onClick} className="cursor-pointer">
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ---------------- Empty State ---------------- */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-6", className)}>
      {icon && (
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
          {icon}
        </div>
      )}
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* ---------------- Skeleton grid ---------------- */
export function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 rounded-lg bg-muted" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-muted" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-80 rounded-xl bg-muted" />
        <div className="h-80 rounded-xl bg-muted" />
      </div>
    </div>
  );
}
