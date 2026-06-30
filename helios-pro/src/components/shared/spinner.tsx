import { cn } from "@/lib/utils";

export function Spinner({
  size = 20,
  className,
  tone = "primary",
}: {
  size?: number;
  className?: string;
  tone?: "primary" | "white" | "dark";
}) {
  const color = tone === "white" ? "text-white" : tone === "dark" ? "text-dark" : "text-primary";
  return (
    <svg
      className={cn("animate-spin", color, className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.2" />
      <path
        d="M21 12a9 9 0 00-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PageLoader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <Spinner size={32} />
      {label && <p className="text-sm text-dark-5 dark:text-dark-6">{label}</p>}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stroke bg-white p-5 dark:border-dark-3 dark:bg-gray-dark",
        className,
      )}
    >
      <div className="shimmer-bg mb-3 h-4 w-1/3 rounded" />
      <div className="shimmer-bg mb-2 h-8 w-2/3 rounded" />
      <div className="shimmer-bg h-3 w-1/2 rounded" />
    </div>
  );
}

export function SkeletonRow({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex gap-4">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="shimmer-bg h-4 flex-1 rounded" />
      ))}
    </div>
  );
}
