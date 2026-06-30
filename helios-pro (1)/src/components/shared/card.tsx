import { cn } from "@/lib/utils";
import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  padded?: boolean;
};

export function Card({ className, hover, padded = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stroke bg-white shadow-card-2 transition-all duration-300 dark:border-dark-3 dark:bg-gray-dark",
        hover &&
          "hover:-translate-y-0.5 hover:shadow-3 dark:hover:border-primary/30",
        padded && "p-5 md:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex items-start justify-between gap-4",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-dark dark:text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-sm text-dark-5 dark:text-dark-6">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-4 flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3",
        className,
      )}
      {...props}
    />
  );
}
