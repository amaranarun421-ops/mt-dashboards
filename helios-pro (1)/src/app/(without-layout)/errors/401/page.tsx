import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  LockIcon,
  HomeIcon,
  MailIcon,
  LogInIcon,
  ArrowLeftIcon,
} from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "401 — Unauthorized | Helios Pro",
  description:
    "Authentication is required to view this resource. Sign in to your Helios Pro account to continue.",
};

export default function UnauthorizedPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-1 dark:bg-gray-dark">
      {/* Background pattern — concentric glow + dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 dark:opacity-25"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary-subtle) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--color-gray-dark) 80%)",
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
            { label: "401" },
          ]}
          className="mb-6 justify-center"
        />

        <div className="w-full rounded-2xl border border-stroke bg-white/90 p-8 text-center shadow-card-2 backdrop-blur transition-all duration-300 dark:border-dark-3 dark:bg-dark-2/80 sm:p-10">
          {/* Icon badge — circular lock with pulse ring */}
          <div className="relative mx-auto mb-6 inline-flex size-20 items-center justify-center">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary-subtle dark:bg-primary/15"
            />
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-primary/30"
              style={{ animationDuration: "2.4s" }}
            />
            <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-md">
              <LockIcon className="size-7" />
            </span>
          </div>

          {/* Large gradient error code */}
          <div className="bg-gradient-to-br from-primary to-accent bg-clip-text text-[120px] font-extrabold leading-none tracking-tight text-transparent sm:text-[160px]">
            401
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="danger" size="lg">
              Unauthorized
            </Badge>
            <Badge variant="neutral" size="lg">
              Authentication required
            </Badge>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Authentication required
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-dark-5 dark:text-dark-6 sm:text-base">
            This area is protected. Please sign in with your Helios Pro account
            credentials to continue.
          </p>

          {/* Session expired callout */}
          <div className="mx-auto mt-7 flex max-w-md items-start gap-3 rounded-xl border border-accent/30 bg-accent-subtle/60 p-4 text-left dark:border-accent/20 dark:bg-accent/10">
            <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
              <LockIcon className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-dark dark:text-white">
                Session expired
              </p>
              <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                For your security, you were signed out after 30 minutes of
                inactivity. Sign in again to pick up where you left off.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/sign-in" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <LogInIcon className="size-4" />
                Go to login
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
            Don&rsquo;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
            >
              Create one for free
            </Link>
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
