import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  ServerIcon,
  HomeIcon,
  RefreshCwIcon,
  ArrowLeftIcon,
  MailIcon,
} from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "500 — Internal Server Error | Helios Pro",
  description:
    "Something went wrong on our end. Our team has been notified — try again or report the issue.",
};

export default function ServerErrorPage() {
  // Static reference info rendered server-side (demo values).
  const errorId = "HLP-500-9F2C7E1A";
  const occurredAt = "2025-01-14 09:42:18 UTC";
  const requestId = "req_a7f3b9c2-4e1d-4b8a-9c6f-2d1e0f8a7b3c";

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-1 dark:bg-gray-dark">
      {/* Background pattern — dot grid + red radial vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-red) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--color-red-light-5) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--color-gray-1) 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--color-gray-dark) 75%)",
        }}
      />

      {/* Top-left brand */}
      <Link
        href="/"
        aria-label="Helios Pro home"
        className="absolute left-5 top-5 z-10 inline-flex items-center"
      >
        <Logo />
      </Link>

      {/* Top-right back link */}
      <Link
        href="/"
        className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-lg border border-stroke bg-white/80 px-3 py-1.5 text-sm font-medium text-dark-5 backdrop-blur transition hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:bg-white/5 dark:text-dark-6 dark:hover:text-primary-light"
      >
        <HomeIcon className="size-4" />
        Dashboard
      </Link>

      {/* Centered content */}
      <div className="relative z-[1] mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-4 py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Errors" },
            { label: "500" },
          ]}
          className="mb-6 justify-center"
        />

        <div className="w-full rounded-2xl border border-stroke bg-white/90 p-8 text-center shadow-card-2 backdrop-blur transition-all duration-300 dark:border-dark-3 dark:bg-dark-2/80 sm:p-10">
          {/* Icon badge — server rack */}
          <div className="mx-auto mb-5 inline-flex size-16 items-center justify-center rounded-2xl bg-red text-white shadow-md">
            <ServerIcon className="size-8" />
          </div>

          {/* Large gradient error code */}
          <div className="bg-gradient-to-br from-primary to-accent bg-clip-text text-[120px] font-extrabold leading-none tracking-tight text-transparent sm:text-[160px]">
            500
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="danger" size="lg">
              Server Error
            </Badge>
            <Badge variant="neutral" size="lg">
              Investigating
            </Badge>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Something went wrong on our end
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-dark-5 dark:text-dark-6 sm:text-base">
            An unexpected error occurred while processing your request. Our
            engineering team has been notified automatically and is looking into
            it.
          </p>

          {/* Error details panel */}
          <div className="mx-auto mt-7 max-w-md rounded-xl border border-stroke bg-gray-2 p-4 text-left dark:border-dark-3 dark:bg-white/5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-dark-6 dark:text-dark-7">
                Incident reference
              </p>
              <Badge variant="danger" size="sm">
                Active
              </Badge>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-dark-6 dark:text-dark-7">Error ID</dt>
                <dd className="font-mono text-xs font-medium text-dark dark:text-white">
                  {errorId}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-dark-6 dark:text-dark-7">Occurred at</dt>
                <dd className="font-mono text-xs font-medium text-dark dark:text-white">
                  {occurredAt}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-dark-6 dark:text-dark-7">Request ID</dt>
                <dd className="truncate font-mono text-xs font-medium text-dark dark:text-white">
                  {requestId}
                </dd>
              </div>
            </dl>
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <RefreshCwIcon className="size-4" />
                Try again
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <HomeIcon className="size-4" />
                Back to dashboard
              </Button>
            </Link>
          </div>

          {/* Secondary link */}
          <p className="mt-5 text-xs text-dark-6 dark:text-dark-7">
            Still seeing this error?{" "}
            <Link
              href="/pages/contact"
              className="font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
            >
              Report issue
            </Link>{" "}
            and include the Error ID above.
          </p>
        </div>

        {/* Footer note */}
        <p className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-center text-xs text-dark-6 dark:text-dark-7">
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
          >
            <ArrowLeftIcon className="size-3.5" />
            Back to home
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/pages/help-center"
            className="font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
          >
            Help center
          </Link>
          <span aria-hidden>·</span>
          <a
            href="mailto:support@heliospro.app"
            className="inline-flex items-center gap-1 font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
          >
            <MailIcon className="size-3.5" />
            Contact support
          </a>
        </p>
      </div>
    </main>
  );
}
