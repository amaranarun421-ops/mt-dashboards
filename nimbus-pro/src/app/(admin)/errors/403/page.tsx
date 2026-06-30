"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ShieldX, ArrowLeft, Home, UserPlus } from "lucide-react";

export default function Error403Page() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-error-200/40 blur-3xl dark:bg-error-500/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-500/15" />
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
          <span className="gradient-text">403</span>
        </h1>

        {/* Illustration card */}
        <div className="mx-auto -mt-4 mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-theme-xl ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400">
            <ShieldX className="h-7 w-7" />
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Access Denied
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          You don&apos;t have permission to view this resource. Contact your workspace admin if you
          believe this is a mistake.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/pages/contact" className="w-full sm:w-auto">
            <Button className="w-full">
              <UserPlus className="h-4 w-4" /> Request Access
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <Home className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Helper links */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
          <Link href="/account/permissions" className="hover:text-brand-600 dark:hover:text-brand-400">
            My permissions
          </Link>
          <span className="h-3 w-px bg-gray-200 dark:bg-gray-700" />
          <Link href="/pages/help-center" className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400">
            <ArrowLeft className="h-3.5 w-3.5" /> Help center
          </Link>
        </div>
      </div>
    </div>
  );
}
