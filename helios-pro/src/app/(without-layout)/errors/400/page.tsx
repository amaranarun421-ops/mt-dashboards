import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  AlertTriangleIcon,
  HomeIcon,
  MailIcon,
  ArrowLeftIcon,
} from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "400 — Bad Request | Helios Pro",
  description:
    "The request could not be processed due to malformed syntax. Check the URL and try again.",
};

export default function BadRequestPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-1 dark:bg-gray-dark">
      {/* Background pattern — dot grid + radial vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
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
            { label: "400" },
          ]}
          className="mb-6 justify-center"
        />

        <div className="w-full rounded-2xl border border-stroke bg-white/90 p-8 text-center shadow-card-2 backdrop-blur transition-all duration-300 dark:border-dark-3 dark:bg-dark-2/80 sm:p-10">
          {/* Icon badge — tilted rounded square */}
          <div className="mx-auto mb-5 inline-flex size-16 -rotate-3 items-center justify-center rounded-2xl bg-accent-subtle text-accent-dark shadow-sm dark:bg-accent/15 dark:text-accent-light">
            <AlertTriangleIcon className="size-8" />
          </div>

          {/* Large gradient error code */}
          <div className="bg-gradient-to-br from-primary to-accent bg-clip-text text-[120px] font-extrabold leading-none tracking-tight text-transparent sm:text-[160px]">
            400
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="warning" size="lg">
              Bad Request
            </Badge>
            <Badge variant="neutral" size="lg">
              HTTP 400
            </Badge>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Your request could not be processed
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-dark-5 dark:text-dark-6 sm:text-base">
            The URL you submitted contains malformed syntax or invalid
            parameters that the server could not understand.
          </p>

          {/* Suggestions panel */}
          <div className="mx-auto mt-7 max-w-md rounded-xl border border-stroke bg-gray-2 p-4 text-left dark:border-dark-3 dark:bg-white/5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-dark-6 dark:text-dark-7">
              What you can do
            </p>
            <ul className="space-y-1.5 text-sm text-dark-5 dark:text-dark-6">
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent dark:bg-accent-light" />
                Check the URL for typos, missing slashes, or unsupported characters.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent dark:bg-accent-light" />
                Remove any invalid query parameters and try submitting again.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent dark:bg-accent-light" />
                If you followed a link, return to the previous page and retry.
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <HomeIcon className="size-4" />
                Back to dashboard
              </Button>
            </Link>
            <Link href="/pages/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <MailIcon className="size-4" />
                Contact support
              </Button>
            </Link>
          </div>
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
          <span>Need help?</span>
          <Link
            href="/pages/help-center"
            className="font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
          >
            Help center
          </Link>
          <span aria-hidden>·</span>
          <a
            href="mailto:support@heliospro.app"
            className="font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
          >
            support@heliospro.app
          </a>
        </p>
      </div>
    </main>
  );
}
