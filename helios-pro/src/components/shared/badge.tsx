import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        neutral: "bg-gray-2 text-dark-7 dark:bg-white/10 dark:text-dark-7",
        primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
        accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
        success: "bg-primary-subtle text-primary-dark dark:bg-primary/15 dark:text-primary-light",
        warning: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
        danger: "bg-red-light-5 text-red-dark dark:bg-red/15 dark:text-red-light",
        info: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light",
        violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
        outline: "border border-stroke text-dark-7 dark:border-dark-3 dark:text-dark-6",
      },
      size: {
        sm: "px-1.5 py-0 text-[10px]",
        md: "px-2 py-0.5 text-xs",
        lg: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
