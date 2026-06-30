import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-xs text-dark-5 dark:text-dark-6",
        className,
      )}
    >
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {c.href && !isLast ? (
              <a
                href={c.href}
                className="transition hover:text-primary dark:hover:text-primary-light"
              >
                {c.label}
              </a>
            ) : (
              <span
                className={cn(
                  isLast && "font-semibold text-dark dark:text-white",
                )}
              >
                {c.label}
              </span>
            )}
            {!isLast && <span className="text-dark-6">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
