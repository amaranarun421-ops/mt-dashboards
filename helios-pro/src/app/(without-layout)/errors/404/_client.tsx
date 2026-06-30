"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  MapPinIcon,
  HomeIcon,
  ArrowLeftIcon,
  ChevronRight,
  GridIcon,
  ShoppingBagIcon,
  FileTextIcon,
  UsersIcon,
  ShieldIcon,
  LifeBuoyIcon,
} from "@/components/Layouts/sidebar/icons";

const SUGGESTED = [
  { label: "Dashboard", href: "/", icon: GridIcon, hint: "Overview & widgets" },
  {
    label: "Ecommerce",
    href: "/ecommerce/products",
    icon: ShoppingBagIcon,
    hint: "Products & orders",
  },
  {
    label: "Invoices",
    href: "/apps/invoices",
    icon: FileTextIcon,
    hint: "Billing documents",
  },
  {
    label: "Team members",
    href: "/user-account/team-members",
    icon: UsersIcon,
    hint: "Workspace people",
  },
  {
    label: "Roles & permissions",
    href: "/user-account/roles",
    icon: ShieldIcon,
    hint: "Access control",
  },
  {
    label: "Help center",
    href: "/pages/help-center",
    icon: LifeBuoyIcon,
    hint: "Guides & FAQs",
  },
];

export function NotFoundClient() {
  const [query, setQuery] = React.useState("");

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      toast.error("Please enter a search term first.", {
        description: "Try a page name like \"dashboard\" or \"invoices\".",
      });
      return;
    }
    toast.success(`Searching for "${q}"…`, {
      description: "We scanned the workspace for matching pages.",
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-1 dark:bg-gray-dark">
      {/* Background pattern — compass dot grid + radial vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-55 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary-subtle) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--color-gray-1) 78%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--color-gray-dark) 78%)",
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
            { label: "404" },
          ]}
          className="mb-6 justify-center"
        />

        <div className="w-full rounded-2xl border border-stroke bg-white/90 p-8 text-center shadow-card-2 backdrop-blur transition-all duration-300 dark:border-dark-3 dark:bg-dark-2/80 sm:p-10">
          {/* Icon badge — circular map-pin (lost) */}
          <div className="mx-auto mb-5 inline-flex size-16 items-center justify-center rounded-full bg-primary-subtle text-primary shadow-sm dark:bg-primary/15 dark:text-primary-light">
            <MapPinIcon className="size-8" />
          </div>

          {/* Large gradient error code */}
          <div className="bg-gradient-to-br from-primary to-accent bg-clip-text text-[120px] font-extrabold leading-none tracking-tight text-transparent sm:text-[160px]">
            404
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="neutral" size="lg">
              Not Found
            </Badge>
            <Badge variant="primary" size="lg">
              Page missing
            </Badge>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-dark dark:text-white sm:text-3xl">
            Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-dark-5 dark:text-dark-6 sm:text-base">
            We couldn&rsquo;t find the page you were looking for. It may have
            moved, been renamed, or the link you followed is out of date.
          </p>

          {/* Search box */}
          <form
            onSubmit={onSearch}
            role="search"
            className="mx-auto mt-6 flex max-w-md items-center gap-2"
          >
            <div className="relative flex-1">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-6 dark:text-dark-7"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M16 16l4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <label htmlFor="nf-search" className="sr-only">
                Search the workspace
              </label>
              <input
                id="nf-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, people, files…"
                className="h-11 w-full rounded-lg border border-stroke bg-white pl-9 pr-3 text-sm text-dark placeholder:text-dark-6 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-dark-3 dark:bg-dark-3 dark:text-white dark:placeholder:text-dark-7"
              />
            </div>
            <Button type="submit" variant="primary" size="md" className="h-11">
              Search
            </Button>
          </form>

          {/* Suggested pages */}
          <div className="mx-auto mt-7 max-w-lg text-left">
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-dark-6 dark:text-dark-7">
              Or try one of these popular destinations
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SUGGESTED.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-3 rounded-lg border border-stroke bg-white p-2.5 transition hover:border-primary/40 hover:bg-primary-faint dark:border-dark-3 dark:bg-white/5 dark:hover:border-primary/30 dark:hover:bg-primary/10"
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-dark dark:text-white">
                          {item.label}
                        </span>
                        <span className="block truncate text-xs text-dark-6 dark:text-dark-7">
                          {item.hint}
                        </span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-dark-6 transition group-hover:translate-x-0.5 group-hover:text-primary dark:text-dark-7 dark:group-hover:text-primary-light" />
                    </Link>
                  </li>
                );
              })}
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
                Report issue
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
