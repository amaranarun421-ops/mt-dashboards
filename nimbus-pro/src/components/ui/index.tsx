"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, initials, avatarTone } from "@/lib/utils";
import { ChevronRight, MoreHorizontal, TrendingUp, TrendingDown, Search, X, Inbox } from "lucide-react";

/* ============ PageHeader ============ */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="space-y-2">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1">
                {b.href ? (
                  <Link href={b.href} className="transition-colors hover:text-brand-600 dark:hover:text-brand-400">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-[28px]">{title}</h1>
        {description && <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ============ Card ============ */
export function Card({
  className,
  children,
  hover = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div className={cn("surface-card", hover && "surface-card-hover", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800", className)}>
      <div className="space-y-0.5">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex items-center justify-end gap-2 border-t border-gray-100 p-4 dark:border-gray-800", className)}>
      {children}
    </div>
  );
}

/* ============ StatCard ============ */
export function StatCard({
  label,
  value,
  delta,
  deltaTone = "up",
  icon: Icon,
  iconTone = "brand",
  footer,
  className,
}: {
  label: string;
  value: string | number;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
  icon?: React.ComponentType<{ className?: string }>;
  iconTone?: "brand" | "success" | "warning" | "error" | "purple" | "pink" | "orange";
  footer?: React.ReactNode;
  className?: string;
}) {
  const toneClass: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
    success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
    warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
    error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
    pink: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
  };
  return (
    <Card hover className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</p>
        </div>
        {Icon && (
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", toneClass[iconTone])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold",
              deltaTone === "up" && "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400",
              deltaTone === "down" && "bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-400",
              deltaTone === "neutral" && "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            )}
          >
            {deltaTone === "up" && <TrendingUp className="h-3 w-3" />}
            {deltaTone === "down" && <TrendingDown className="h-3 w-3" />}
            {delta}
          </span>
        )}
        {footer && <span className="text-gray-500 dark:text-gray-400">{footer}</span>}
      </div>
    </Card>
  );
}

/* ============ Avatar ============ */
export function Avatar({
  name,
  src,
  size = 36,
  className,
  ring = false,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn("rounded-full object-cover", ring && "ring-2 ring-white dark:ring-gray-900", className)}
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white",
        avatarTone(name),
        ring && "ring-2 ring-white dark:ring-gray-900",
        className
      )}
    >
      {initials(name)}
    </div>
  );
}

export function AvatarGroup({ users, max = 4, size = 32 }: { users: { name: string; src?: string }[]; max?: number; size?: number }) {
  const visible = users.slice(0, max);
  const rest = users.length - max;
  return (
    <div className="flex items-center -space-x-2.5">
      {visible.map((u, i) => (
        <Avatar key={i} name={u.name} src={u.src} size={size} ring />
      ))}
      {rest > 0 && (
        <div
          style={{ width: size, height: size, fontSize: size * 0.36 }}
          className="flex items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600 ring-2 ring-white dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-900"
        >
          +{rest}
        </div>
      )}
    </div>
  );
}

/* ============ Badge ============ */
export function Badge({
  children,
  tone = "gray",
  variant = "soft",
  className,
  dot = false,
}: {
  children: React.ReactNode;
  tone?: "brand" | "success" | "warning" | "error" | "gray" | "purple" | "pink" | "orange";
  variant?: "soft" | "outline" | "solid";
  className?: string;
  dot?: boolean;
}) {
  const toneClass: Record<"soft" | "outline" | "solid", Record<string, string>> = {
    soft: {
      brand: "badge-brand",
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
      gray: "badge-gray",
      purple: "badge-purple",
      pink: "badge-pink",
      orange: "badge-orange",
    },
    outline: {
      brand: "border border-brand-300 text-brand-700 dark:border-brand-700 dark:text-brand-400",
      success: "border border-success-300 text-success-700 dark:border-success-700 dark:text-success-400",
      warning: "border border-warning-300 text-warning-700 dark:border-warning-700 dark:text-warning-400",
      error: "border border-error-300 text-error-700 dark:border-error-700 dark:text-error-400",
      gray: "border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300",
      purple: "border border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-400",
      pink: "border border-pink-300 text-pink-700 dark:border-pink-700 dark:text-pink-400",
      orange: "border border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-400",
    },
    solid: {
      brand: "bg-brand-500 text-white",
      success: "bg-success-500 text-white",
      warning: "bg-warning-500 text-white",
      error: "bg-error-500 text-white",
      gray: "bg-gray-500 text-white",
      purple: "bg-purple-500 text-white",
      pink: "bg-pink-500 text-white",
      orange: "bg-orange-500 text-white",
    },
  };
  const dotTone: Record<string, string> = {
    brand: "bg-brand-500",
    success: "bg-success-500",
    warning: "bg-warning-500",
    error: "bg-error-500",
    gray: "bg-gray-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold",
        toneClass[variant][tone],
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotTone[tone])} />}
      {children}
    </span>
  );
}

/* ============ Button ============ */
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline" | "success" | "warning";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  const variantClass: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    danger: "btn-danger",
    outline: "btn-outline",
    success: "bg-success-500 text-white hover:bg-success-600 shadow-sm",
    warning: "bg-warning-500 text-white hover:bg-warning-600 shadow-sm",
  };
  const sizeClass: Record<ButtonSize, string> = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
    icon: "btn-icon",
  };
  return (
    <button className={cn("btn", variantClass[variant], sizeClass[size], className)} {...props}>
      {children}
    </button>
  );
}

export function IconButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ============ Input / Label / Textarea ============ */
export function Input({ className, error, ref, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean; ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} className={cn("input", error && "input-error", className)} {...props} />;
}

export function Textarea({ className, error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return <textarea className={cn("input min-h-[100px] resize-y", error && "input-error", className)} {...props} />;
}

export function Label({ className, children, required, htmlFor }: { className?: string; children: React.ReactNode; required?: boolean; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("label", className)}>
      {children} {required && <span className="text-error-500">*</span>}
    </label>
  );
}

export function Select({ className, error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select className={cn("input appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-9", error && "input-error", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
      }}
      {...props}
    >
      {children}
    </select>
  );
}

/* ============ Switch ============ */
export function Switch({
  checked,
  onChange,
  size = "md",
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "md";
  disabled?: boolean;
}) {
  const dims = size === "sm" ? { w: "w-9", h: "h-5", k: "h-4 w-4", t: "translate-x-4" } : { w: "w-11", h: "h-6", k: "h-5 w-5", t: "translate-x-5" };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        dims.w,
        dims.h,
        checked ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
      )}
    >
      <span
        className={cn(
          "inline-block transform rounded-full bg-white shadow-sm transition-transform duration-200",
          dims.k,
          checked ? dims.t : "translate-x-0.5"
        )}
      />
    </button>
  );
}

/* ============ Checkbox ============ */
export function Checkbox({
  checked,
  onChange,
  label,
  className,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2 select-none", className)}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-all",
          checked ? "border-brand-500 bg-brand-500 text-white" : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{ width: 18, height: 18 }}
      >
        {checked && (
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  );
}

/* ============ Progress ============ */
export function Progress({
  value,
  tone = "brand",
  size = "md",
  showLabel = false,
  className,
}: {
  value: number;
  tone?: "brand" | "success" | "warning" | "error" | "purple" | "orange";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const toneClass: Record<string, string> = {
    brand: "bg-brand-500",
    success: "bg-success-500",
    warning: "bg-warning-500",
    error: "bg-error-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };
  const sizeClass = { sm: "h-1", md: "h-1.5", lg: "h-2.5" };
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800", sizeClass[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", toneClass[tone])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{value}%</span>}
    </div>
  );
}

/* ============ EmptyState ============ */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 px-6 py-12 text-center", className)}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
        {description && <p className="mx-auto max-w-sm text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/* ============ Skeleton ============ */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded-md", className)} />;
}

/* ============ Tabs ============ */
export function Tabs({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { value: string; label: string; icon?: React.ComponentType<{ className?: string }>; count?: number }[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("tab-list", className)}>
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={cn("tab-trigger", value === t.value && "tab-trigger-active")}
        >
          {t.icon && <t.icon className="h-4 w-4" />}
          {t.label}
          {typeof t.count === "number" && (
            <span className="ml-1 rounded-md bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold dark:bg-gray-700">{t.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ============ SearchInput ============ */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-9"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/* ============ DropdownMenu (simple) ============ */
export function DropdownMenu({
  trigger,
  children,
  align = "end",
  className,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((v) => !v)} className="inline-flex cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1 min-w-[180px] overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-theme-lg animate-scale-in dark:border-gray-800 dark:bg-gray-900",
            align === "end" ? "right-0" : "left-0",
            className
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  icon: Icon,
  danger = false,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  danger?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
        danger ? "text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
        className
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-gray-100 dark:bg-gray-800" />;
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">{children}</div>;
}

/* ============ MoreMenu (convenience) ============ */
export function MoreMenu({ items }: { items: { label: string; icon?: React.ComponentType<{ className?: string }>; danger?: boolean; onClick?: () => void }[] }) {
  return (
    <DropdownMenu
      trigger={
        <span
          role="button"
          aria-label="More actions"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <MoreHorizontal className="h-4 w-4" />
        </span>
      }
    >
      {items.map((item, i) => (
        <DropdownMenuItem key={i} icon={item.icon} danger={item.danger} onClick={item.onClick}>
          {item.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  );
}

/* ============ Section ============ */
export function Section({ title, description, action, children, className }: { title?: string; description?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3">
          <div>
            {title && <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>}
            {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
