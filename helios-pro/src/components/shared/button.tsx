import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-sm hover:bg-primary-dark hover:shadow-md active:scale-[0.98]",
        accent:
          "bg-accent text-white shadow-sm hover:bg-accent-dark hover:shadow-md active:scale-[0.98]",
        outline:
          "border border-stroke bg-white text-dark hover:bg-gray-2 hover:border-primary/40 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3",
        ghost:
          "text-dark hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-white/5",
        soft:
          "bg-primary-subtle text-primary hover:bg-primary-lightest dark:bg-primary/15 dark:text-primary-light dark:hover:bg-primary/25",
        danger:
          "bg-red text-white shadow-sm hover:bg-red-dark hover:shadow-md active:scale-[0.98]",
        subtle:
          "bg-gray-2 text-dark-7 hover:bg-gray-3 dark:bg-white/5 dark:text-dark-7 dark:hover:bg-white/10",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
        iconSm: "size-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export const buttonVariantsExport = buttonVariants;
