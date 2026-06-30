"use client";

import * as React from "react";
import Link from "next/link";
import { MTVLogo } from "@/components/mtv/logo";
import { ThemeToggle } from "@/components/mtv/theme-toggle";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Left: Branding panel */}
      <div className="hidden lg:flex lg:flex-1 bg-sidebar relative overflow-hidden">
        <div className="absolute inset-0 bg-mtv-aurora opacity-60" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Floating gradient orbs */}
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-chart-2/15 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-sidebar-foreground w-full">
          <Link href="/" className="inline-flex w-fit">
            <MTVLogo variant="sidebar" />
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              The premium dashboard kit for modern enterprise teams
            </h1>
            <p className="text-sidebar-foreground/70 text-base leading-relaxed mb-8">
              50+ dashboards, applications, and enterprise modules. Production-ready, accessible, and beautifully crafted.
            </p>

            <div className="space-y-4">
              {[
                { icon: ShieldCheck, title: "Enterprise-grade security", desc: "SOC 2 Type II, SSO, RBAC, audit logs" },
                { icon: Sparkles, title: "AI-powered insights", desc: "Built-in AI assistant and predictive analytics" },
                { icon: Zap, title: "Lightning performance", desc: "Edge-ready, lazy-loaded, fully optimized" },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-sidebar-accent ring-1 ring-sidebar-border shrink-0">
                    <f.icon className="size-5 text-sidebar-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{f.title}</p>
                    <p className="text-xs text-sidebar-foreground/60 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-sidebar-foreground/50">
            <p>© {new Date().getFullYear()} MTVerse. All rights reserved.</p>
            <p>v2.4.1</p>
          </div>
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex-1 flex flex-col bg-background min-w-0 overflow-y-auto">
        <div className="flex items-center justify-between p-4 lg:p-6 shrink-0">
          <Link href="/" className="lg:hidden">
            <MTVLogo />
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md animate-fade-in">
            {children}
          </div>
        </div>

        <footer className="px-6 py-4 text-center text-xs text-muted-foreground shrink-0">
          <p>Need help? <a href="/enterprise/help" className="text-primary hover:underline">Contact support</a></p>
        </footer>
      </div>
    </div>
  );
}
