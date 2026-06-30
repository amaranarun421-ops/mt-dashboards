import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  ShieldIcon,
  HomeIcon,
  MailIcon,
  ArrowLeftIcon,
} from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "403 — Forbidden | Helios Pro",
  description:
    "You do not have permission to access this resource. Request access from your administrator.",
};

const REQUIRED_ROLES = [
  { label: "Owner", granted: true },
  { label: "Administrator", granted: true },
  { label: "Manager", granted: false },
  { label: "Editor", granted: false },
  { label: "Viewer", granted: false },
];

export default function ForbiddenPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-1 dark:bg-gray-dark">
      {/* Background pattern — diagonal hazard stripes + dot grid */}
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
            { label: "403" },
          ]}
          className="mb-6 justify-center"
        />

        <div className="w-full rounded-2xl border border-stroke bg-white/90 p-8 text-center shadow-card-2 backdrop-blur transition-all duration-300 dark:border-dark-3 dark:bg-dark-2/80 sm:p-10">
          {/* Icon badge — no-entry shield */}
          <div className="relative mx-auto mb-5 inline-flex size-16 items-center justify-center">
            <span
              aria-hidden
              className="absolute inset-0 rounded-2xl bg-red/10 dark:bg-red/15"
            />
            <span className="relative inline-flex size-16 items-center justify-center rounded-2xl bg-red text-white shadow-md">
              <ShieldIcon className="size-8" />
            </span>
            {/* no-entry slash */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-[3px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white/90"
            />
          </div>

          {/* Large gradient error code */}
          <div className="bg-gradient-to-br from-primary to-accent bg-clip-text text-[120px] font-extrabold leading-none tracking-tight text-transparent sm:text-[160px]">
            403
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="danger" size="lg">
              Forbidden
            </Badge>
            <Badge variant="neutral" size="lg">
              Access denied
            </Badge>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            You don&rsquo;t have permission
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-dark-5 dark:text-dark-6 sm:text-base">
            Your account is not authorized to view this resource. If you believe
            this is a mistake, request access from your workspace administrator.
          </p>

          {/* Required roles panel */}
          <div className="mx-auto mt-7 max-w-md rounded-xl border border-stroke bg-gray-2 p-4 text-left dark:border-dark-3 dark:bg-white/5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-dark-6 dark:text-dark-7">
                Roles that can access this
              </p>
              <ShieldIcon className="size-4 text-dark-6 dark:text-dark-7" />
            </div>
            <ul className="space-y-1.5">
              {REQUIRED_ROLES.map((role) => (
                <li
                  key={role.label}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm"
                >
                  <span
                    className={
                      role.granted
                        ? "font-medium text-dark dark:text-white"
                        : "text-dark-5 dark:text-dark-6"
                    }
                  >
                    {role.label}
                  </span>
                  {role.granted ? (
                    <Badge variant="success" size="sm">
                      Allowed
                    </Badge>
                  ) : (
                    <Badge variant="danger" size="sm">
                      Blocked
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/pages/contact" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <MailIcon className="size-4" />
                Request access
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
            Signed in as a different user?{" "}
            <Link
              href="/auth/sign-in"
              className="font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
            >
              Switch account
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
            href="mailto:admin@heliospro.app"
            className="font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
          >
            Contact admin
          </a>
        </p>
      </div>
    </main>
  );
}
