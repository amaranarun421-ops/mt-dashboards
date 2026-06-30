import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  WrenchIcon,
  HomeIcon,
  GlobeIcon,
  ArrowLeftIcon,
  MailIcon,
  CheckIcon,
  ServerIcon,
} from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "503 — Service Unavailable | Helios Pro",
  description:
    "Helios Pro is undergoing scheduled maintenance. Check back soon or view the live status page.",
};

type ServiceStatus = {
  name: string;
  state: "operational" | "degraded" | "maintenance";
};

const SERVICES: ServiceStatus[] = [
  { name: "Web dashboard", state: "maintenance" },
  { name: "Authentication API", state: "degraded" },
  { name: "Reporting pipeline", state: "maintenance" },
  { name: "Notifications", state: "operational" },
  { name: "File storage", state: "operational" },
];

function statusBadge(state: ServiceStatus["state"]) {
  switch (state) {
    case "operational":
      return (
        <Badge variant="success" size="sm">
          <CheckIcon className="size-3" />
          Operational
        </Badge>
      );
    case "degraded":
      return (
        <Badge variant="warning" size="sm">
          Degraded
        </Badge>
      );
    case "maintenance":
      return (
        <Badge variant="accent" size="sm">
          <WrenchIcon className="size-3" />
          Maintenance
        </Badge>
      );
  }
}

export default function ServiceUnavailablePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-1 dark:bg-gray-dark">
      {/* Background pattern — dot grid + amber radial vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-subtle) 0%, transparent 65%)",
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
            { label: "503" },
          ]}
          className="mb-6 justify-center"
        />

        <div className="w-full rounded-2xl border border-stroke bg-white/90 p-8 text-center shadow-card-2 backdrop-blur transition-all duration-300 dark:border-dark-3 dark:bg-dark-2/80 sm:p-10">
          {/* Icon badge — wrench with slow spin */}
          <div className="mx-auto mb-5 inline-flex size-16 items-center justify-center rounded-2xl bg-accent-subtle text-accent-dark shadow-sm dark:bg-accent/15 dark:text-accent-light">
            <WrenchIcon className="size-8 animate-spin" style={{ animationDuration: "6s" }} />
          </div>

          {/* Large gradient error code */}
          <div className="bg-gradient-to-br from-primary to-accent bg-clip-text text-[120px] font-extrabold leading-none tracking-tight text-transparent sm:text-[160px]">
            503
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="accent" size="lg">
              <WrenchIcon className="size-3.5" />
              Maintenance
            </Badge>
            <Badge variant="neutral" size="lg">
              Be right back
            </Badge>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            We&rsquo;re undergoing maintenance
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-dark-5 dark:text-dark-6 sm:text-base">
            Helios Pro is temporarily offline while we deploy improvements. No
            action is needed on your part — your data is safe.
          </p>

          {/* Estimated downtime */}
          <div className="mx-auto mt-7 grid max-w-md grid-cols-3 gap-2">
            <div className="rounded-xl border border-stroke bg-gray-2 p-3 dark:border-dark-3 dark:bg-white/5">
              <p className="text-xs text-dark-6 dark:text-dark-7">Started</p>
              <p className="mt-0.5 text-sm font-semibold text-dark dark:text-white">
                09:00 UTC
              </p>
            </div>
            <div className="rounded-xl border border-stroke bg-gray-2 p-3 dark:border-dark-3 dark:bg-white/5">
              <p className="text-xs text-dark-6 dark:text-dark-7">ETA</p>
              <p className="mt-0.5 text-sm font-semibold text-primary dark:text-primary-light">
                ~45 min
              </p>
            </div>
            <div className="rounded-xl border border-stroke bg-gray-2 p-3 dark:border-dark-3 dark:bg-white/5">
              <p className="text-xs text-dark-6 dark:text-dark-7">Window</p>
              <p className="mt-0.5 text-sm font-semibold text-dark dark:text-white">
                09:00–10:00
              </p>
            </div>
          </div>

          {/* Service status list */}
          <div className="mx-auto mt-4 max-w-md rounded-xl border border-stroke bg-gray-2 p-4 text-left dark:border-dark-3 dark:bg-white/5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-dark-6 dark:text-dark-7">
                System status
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-dark-5 dark:text-dark-6">
                <ServerIcon className="size-3.5" />
                5 services
              </span>
            </div>
            <ul className="space-y-1.5">
              {SERVICES.map((svc) => (
                <li
                  key={svc.name}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm"
                >
                  <span className="font-medium text-dark dark:text-white">
                    {svc.name}
                  </span>
                  {statusBadge(svc.state)}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/pages/help-center" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <GlobeIcon className="size-4" />
                Check status
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
            Need urgent assistance during maintenance?{" "}
            <a
              href="mailto:support@heliospro.app"
              className="font-medium text-primary underline-offset-2 hover:underline dark:text-primary-light"
            >
              Contact support
            </a>
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
            support@heliospro.app
          </a>
        </p>
      </div>
    </main>
  );
}
