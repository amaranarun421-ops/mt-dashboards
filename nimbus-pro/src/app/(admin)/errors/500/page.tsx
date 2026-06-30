"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ServerCrash, RefreshCw, ExternalLink, Activity } from "lucide-react";

export default function Error500Page() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-error-200/40 blur-3xl dark:bg-error-500/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-500/15" />
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
          <span className="gradient-text">500</span>
        </h1>

        {/* Illustration card */}
        <div className="mx-auto -mt-4 mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-theme-xl ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400">
            <ServerCrash className="h-7 w-7" />
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Server Error
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Something went wrong on our end. We&apos;re working to fix it — try again in a moment, or
          check our status page.
        </p>

        {/* Status chip */}
        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-warning-200 bg-warning-50 px-3 py-1 text-xs font-semibold text-warning-700 dark:border-warning-800 dark:bg-warning-500/10 dark:text-warning-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-warning-500" />
          </span>
          Investigating · Incident #INC-2049
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button className="w-full sm:w-auto" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <a
            href="#"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:text-gray-300 dark:hover:text-brand-400 sm:w-auto"
          >
            <ExternalLink className="h-4 w-4" /> Status Page
          </a>
        </div>

        {/* Helper links */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">
            Back to Dashboard
          </Link>
          <span className="h-3 w-px bg-gray-200 dark:bg-gray-700" />
          <Link href="/pages/contact" className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400">
            <Activity className="h-3.5 w-3.5" /> Report issue
          </Link>
        </div>
      </div>
    </div>
  );
}
