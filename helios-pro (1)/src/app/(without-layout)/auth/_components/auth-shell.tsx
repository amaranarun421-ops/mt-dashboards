import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { ArrowLeftIcon } from "@/components/Layouts/sidebar/icons";

type AuthShellProps = {
  children: React.ReactNode;
  /** Optional node rendered above the card — usually the Logo. */
  brand?: React.ReactNode;
  /** Optional node rendered below the card — usually a "back to home" link. */
  footer?: React.ReactNode;
  className?: string;
  /** Background style — `simple` (flat) or `pattern` (dot grid). */
  background?: "simple" | "pattern";
  /** Back link href + label, rendered in the top-left corner. */
  back?: { href: string; label: string };
};

/**
 * Full-screen centered wrapper for the auth pages that live under
 * `(without-layout)`. Vertically + horizontally centers a max-w-md column
 * with the brand on top, the card in the middle, and a footer link below.
 */
export function AuthShell({
  children,
  brand,
  footer,
  className,
  background = "simple",
  back,
}: AuthShellProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-gray-1 dark:bg-gray-dark",
        background === "pattern" && "bg-gray-2 dark:bg-gray-dark",
        className,
      )}
    >
      {background === "pattern" && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.55] dark:opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at top, transparent 0%, var(--color-gray-2) 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dark:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse at top, transparent 0%, var(--color-gray-dark) 70%)",
            }}
          />
        </>
      )}

      {/* Top-left back link */}
      {back && (
        <Link
          href={back.href}
          className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-dark-5 transition hover:bg-white hover:text-dark dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <ArrowLeftIcon className="size-4" />
          {back.label}
        </Link>
      )}

      <div className="relative z-[1] mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-4 py-10">
        {brand ?? (
          <Link href="/" className="mb-6 inline-flex">
            <Logo />
          </Link>
        )}
        <div className="w-full animate-[fade-in_0.3s_ease-out]">{children}</div>
        {footer && (
          <div className="mt-6 text-center text-sm text-dark-5 dark:text-dark-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
