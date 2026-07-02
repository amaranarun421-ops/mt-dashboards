"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogIn, UserPlus, Mail, ArrowRight, Eye, EyeOff, Lock, User,
  Github, Chrome, Apple, CheckCircle2, Shield, Sparkles,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export type AuthMode = "signin" | "signup" | "forgot";

const titles = {
  signin: { title: "Welcome Back", sub: "Enter your credentials to access your dashboard" },
  signup: { title: "Create Account", sub: "Start your 14-day free trial — no credit card required" },
  forgot: { title: "Reset Password", sub: "Enter your email and we'll send you reset instructions" },
} as const;

export function AuthPages({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const t = titles[mode];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") {
      toast.success("Password reset link sent to your email!");
      return;
    }
    if (mode === "signup") {
      toast.success("Account created! Welcome to Nexus Pro.");
    } else {
      toast.success("Signed in successfully!");
    }
    setTimeout(() => router.push("/dashboard/ecommerce"), 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-12 text-white min-h-[600px] relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white/5" />
          <div className="absolute top-1/3 right-10 h-24 w-24 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M3 3h4.5L17 14.5V3H21v18h-4.5L7 9.5V21H3V3z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-2xl font-bold">Nexus Pro</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-4">
              The Premium Admin Dashboard for Modern SaaS Teams
            </h1>
            <p className="text-lg text-white/80 mb-8">
              100+ pages, advanced analytics, real-time data, and a beautiful design system — all in one package.
            </p>

            <div className="space-y-4">
              {[
                { icon: Sparkles, text: "100+ production-ready pages" },
                { icon: Shield, text: "Enterprise-grade security" },
                { icon: CheckCircle2, text: "Dark mode & responsive design" },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-white/90">{f.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-brand-500 bg-white/20 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold">12,000+ teams</p>
                  <p className="text-xs text-white/60">trust Nexus Pro daily</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.title}</h2>
              <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{t.sub}</p>
            </div>

            {mode !== "forgot" && (
              <>
                <div className="mb-5 grid grid-cols-3 gap-2">
                  {[
                    { icon: Chrome, name: "Google" },
                    { icon: Github, name: "GitHub" },
                    { icon: Apple, name: "Apple" },
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.name}
                        onClick={() => toast.info(`Signing in with ${p.name}...`)}
                        className="flex items-center justify-center rounded-lg border border-gray-200 py-2.5 text-gray-600 transition hover:bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                      >
                        <Icon className="h-5 w-5" />
                      </button>
                    );
                  })}
                </div>

                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Or continue with email</span>
                  <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                </div>
              </>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div>
                  <Label>Full Name</Label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="pl-9 h-11"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label>Email Address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-9 h-11"
                    required
                  />
                </div>
              </div>

              {mode !== "forgot" && (
                <div>
                  <div className="flex items-center justify-between">
                    <Label>Password</Label>
                    {mode === "signin" && (
                      <Link href="/auth/forgot-password" className="text-xs font-medium text-brand-500 hover:underline">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 pr-9 h-11"
                      required
                    />
                    <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "signin" && (
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember me for 30 days</Label>
                </div>
              )}

              {mode === "signup" && (
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-xs font-normal cursor-pointer leading-relaxed">
                    I agree to the <a className="text-brand-500 hover:underline">Terms of Service</a> and <a className="text-brand-500 hover:underline">Privacy Policy</a>
                  </Label>
                </div>
              )}

              <Button type="submit" className="w-full h-11 gap-1.5">
                {mode === "signin" && (<><LogIn className="h-4 w-4" /> Sign In</>)}
                {mode === "signup" && (<><UserPlus className="h-4 w-4" /> Create Account</>)}
                {mode === "forgot" && (<>Send Reset Link <ArrowRight className="h-4 w-4" /></>)}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              {mode === "signin" && (
                <>Don&apos;t have an account? <Link href="/auth/sign-up" className="font-semibold text-brand-500 hover:underline">Sign up free</Link></>
              )}
              {mode === "signup" && (
                <>Already have an account? <Link href="/auth/sign-in" className="font-semibold text-brand-500 hover:underline">Sign in</Link></>
              )}
              {mode === "forgot" && (
                <Link href="/auth/sign-in" className="font-semibold text-brand-500 hover:underline">← Back to sign in</Link>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            Protected by reCAPTCHA · © 2026 Nexus Pro. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
