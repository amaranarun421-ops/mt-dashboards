"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Input } from "@/components/ui";
import { Compass, ArrowLeft, Home, Search } from "lucide-react";

const QUICK_LINKS = [
  { label: "Dashboard", href: "/" },
  { label: "Analytics", href: "/dashboards/analytics" },
  { label: "Help center", href: "/pages/help-center" },
  { label: "Pricing", href: "/pages/pricing" },
];

export default function Error404Page() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-500/15" />
      <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />

      <div className="relative w-full max-w-xl text-center">
        {/* Logo */}
        <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
          <Image src="/brand/logo-icon.svg" alt="Nimbus Pro" width={36} height={36} />
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Nimbus<span className="text-brand-500"> Pro</span>
          </span>
        </Link>

        {/* Error code */}
        <h1 className="select-none text-[120px] font-extrabold leading-none tracking-tighter sm:text-[180px]">
          <span className="gradient-text">404</span>
        </h1>

        {/* Illustration card */}
        <div className="mx-auto -mt-4 mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-theme-xl ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <Compass className="h-7 w-7" />
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
          back on track.
        </p>

        {/* Search */}
        <div className="mx-auto mt-6 max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for a page..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full">
              <Home className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <Link href="/pages/help-center" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <Search className="h-4 w-4" /> Browse Help
            </Button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Popular pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition-all hover:border-brand-300 hover:text-brand-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-brand-400"
              >
                <ArrowLeft className="h-3 w-3" /> {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
