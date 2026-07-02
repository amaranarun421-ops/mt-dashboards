"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home, RefreshCw, WifiOff, Wrench, AlertTriangle,
  Ban, FileQuestion, Clock, ServerCrash, Lock, Search,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export type ErrorCode =
  | "401" | "403" | "404" | "405" | "408" | "429" | "500" | "503" | "offline";

const errorMap: Record<ErrorCode, {
  code: string; title: string; desc: string; icon: React.ComponentType<{ className?: string }>;
  color: string; bg: string; suggestion: string;
}> = {
  "401": { code: "401", title: "Unauthorized Access", desc: "You need to sign in to view this page. Your session may have expired.", icon: Lock, color: "text-warning-600 dark:text-orange-400", bg: "bg-warning-50 dark:bg-warning-500/15", suggestion: "Please sign in to continue" },
  "403": { code: "403", title: "Access Forbidden", desc: "You don't have permission to access this resource. Contact your administrator if you believe this is an error.", icon: Ban, color: "text-error-600 dark:text-error-500", bg: "bg-error-50 dark:bg-error-500/15", suggestion: "Request access from your admin" },
  "404": { code: "404", title: "Page Not Found", desc: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.", icon: FileQuestion, color: "text-blue-light-500", bg: "bg-blue-light-50 dark:bg-blue-light-500/15", suggestion: "Try searching or go home" },
  "405": { code: "405", title: "Method Not Allowed", desc: "The HTTP method is not supported for this endpoint. Please check your request.", icon: Ban, color: "text-warning-600 dark:text-orange-400", bg: "bg-warning-50 dark:bg-warning-500/15", suggestion: "Check the request method" },
  "408": { code: "408", title: "Request Timeout", desc: "The request took too long to process. Please check your connection and try again.", icon: Clock, color: "text-warning-600 dark:text-orange-400", bg: "bg-warning-50 dark:bg-warning-500/15", suggestion: "Check your internet connection" },
  "429": { code: "429", title: "Too Many Requests", desc: "You've made too many requests in a short period. Please slow down and try again later.", icon: Clock, color: "text-error-600 dark:text-error-500", bg: "bg-error-50 dark:bg-error-500/15", suggestion: "Wait a moment and retry" },
  "500": { code: "500", title: "Internal Server Error", desc: "Something went wrong on our end. Our team has been notified and is working on a fix.", icon: ServerCrash, color: "text-error-600 dark:text-error-500", bg: "bg-error-50 dark:bg-error-500/15", suggestion: "We're fixing this — try again soon" },
  "503": { code: "503", title: "Service Unavailable", desc: "We're performing scheduled maintenance to make Nexus Pro even better. We'll be back shortly.", icon: Wrench, color: "text-warning-600 dark:text-orange-400", bg: "bg-warning-50 dark:bg-warning-500/15", suggestion: "Maintenance in progress" },
  "offline": { code: "!", title: "You're Offline", desc: "It looks like you've lost your internet connection. Please check your network settings.", icon: WifiOff, color: "text-gray-500 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800", suggestion: "Reconnect to continue" },
};

export function ErrorPages({ code = "404" }: { code?: ErrorCode }) {
  const err = errorMap[code] || errorMap["404"];
  const Icon = err.icon;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Logo />
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <Link href="/auth/sign-in"><Lock className="h-4 w-4" /> Sign In</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative inline-block mb-8"
          >
            <div className={`absolute inset-0 blur-3xl ${err.bg}`} />
            <div className={`relative flex h-28 w-28 items-center justify-center rounded-3xl ${err.bg} ${err.color}`}>
              <Icon className="h-14 w-14" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-bold text-8xl text-gray-800 dark:text-white mb-2 tracking-tighter"
          >
            {err.code}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-800 dark:text-white mb-3"
          >
            {err.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 dark:text-gray-400 mb-2 max-w-md mx-auto"
          >
            {err.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-1.5 text-sm text-gray-500 dark:text-gray-400 mb-8"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            {err.suggestion}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button asChild className="gap-1.5">
              <Link href="/dashboard/ecommerce"><Home className="h-4 w-4" /> Back to Dashboard</Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()} className="gap-1.5">
              <RefreshCw className="h-4 w-4" /> Try Again
            </Button>
            <Button variant="ghost" asChild className="gap-1.5">
              <Link href="/pages/faq"><Search className="h-4 w-4" /> Help Center</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Quick Links</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { label: "Dashboard", href: "/dashboard/ecommerce" },
                { label: "Analytics", href: "/dashboard/analytics" },
                { label: "Settings", href: "/account/settings" },
                { label: "Support", href: "/pages/faq" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="text-gray-500 hover:text-brand-500 transition">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-gray-400">
          © 2026 Nexus Pro. All rights reserved. · <Link href="/auth/sign-in" className="hover:text-brand-500">Sign In</Link>
        </div>
      </footer>
    </div>
  );
}
