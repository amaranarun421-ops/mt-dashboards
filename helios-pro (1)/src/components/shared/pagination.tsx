import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showEdges?: boolean;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  showEdges = true,
}: PaginationProps) {
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - 1 && i <= page + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  const Btn = ({
    children,
    onClick,
    disabled,
    active,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid min-w-[36px] place-items-center rounded-lg border px-2.5 py-1.5 text-sm transition",
        active
          ? "border-primary bg-primary text-white"
          : "border-stroke text-dark-7 hover:bg-gray-2 dark:border-dark-3 dark:text-dark-7 dark:hover:bg-dark-3",
        disabled && "opacity-40 cursor-not-allowed",
      )}
    >
      {children}
    </button>
  );

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {showEdges && (
        <Btn onClick={() => onPageChange(1)} disabled={page === 1}>
          «
        </Btn>
      )}
      <Btn onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
        ‹
      </Btn>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-1 text-dark-5">
            …
          </span>
        ) : (
          <Btn key={i} onClick={() => onPageChange(p)} active={p === page}>
            {p}
          </Btn>
        ),
      )}
      <Btn onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        ›
      </Btn>
      {showEdges && (
        <Btn onClick={() => onPageChange(totalPages)} disabled={page === totalPages}>
          »
        </Btn>
      )}
    </div>
  );
}
