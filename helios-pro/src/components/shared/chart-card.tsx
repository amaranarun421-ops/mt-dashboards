import { cn } from "@/lib/utils";
import * as React from "react";
import { Card, CardHeader } from "./card";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  footer?: React.ReactNode;
};

export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className,
  bodyClassName,
  footer,
}: ChartCardProps) {
  return (
    <Card padded={false} className={cn("overflow-hidden", className)}>
      <div className="px-5 pt-5 md:px-6 md:pt-6">
        <CardHeader title={title} subtitle={subtitle} action={action} />
      </div>
      <div className={cn("px-5 pb-5 md:px-6 md:pb-6", bodyClassName)}>{children}</div>
      {footer && <div className="border-t border-stroke px-5 py-3 dark:border-dark-3 md:px-6">{footer}</div>}
    </Card>
  );
}
