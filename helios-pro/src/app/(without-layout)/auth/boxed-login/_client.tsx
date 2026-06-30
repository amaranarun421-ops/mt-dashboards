"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import {
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import { LockIcon, MailIcon, LogInIcon, ShieldIcon } from "@/components/Layouts/sidebar/icons";
import { AuthShell } from "../_components/auth-shell";
import { SocialButtons } from "../_components/social-buttons";
import { PasswordInput } from "../_components/password-input";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BoxedLoginClient() {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.email) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 6)
      next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Welcome back!", {
      description: `Signed in as ${form.email}`,
    });
  };

  return (
    <AuthShell
      background="pattern"
      back={{ href: "/", label: "Back to home" }}
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-semibold text-primary hover:text-primary-dark"
          >
            Sign up
          </Link>
        </>
      }
    >
      <Card
        padded
        className="rounded-2xl border-stroke bg-white/95 p-6 shadow-3 backdrop-blur sm:p-8 dark:border-dark-3 dark:bg-gray-dark/95"
      >
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-dark dark:text-white">
              Sign in
            </h1>
            <Badge variant="outline" size="sm">
              <ShieldIcon className="size-3.5" />
              Secured
            </Badge>
          </div>
          <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
            Welcome back. Please sign in to continue.
          </p>
        </header>

        <SocialButtons
          className="mb-5"
          googleLabel="Google"
          githubLabel="GitHub"
          onGoogle={() => toast.info("Continuing with Google…")}
          onGitHub={() => toast.info("Continuing with GitHub…")}
        />

        <div className="mb-5 flex items-center gap-3 text-xs font-medium text-dark-6">
          <span className="h-px flex-1 bg-stroke dark:bg-dark-3" />
          OR CONTINUE WITH EMAIL
          <span className="h-px flex-1 bg-stroke dark:bg-dark-3" />
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <FormField
            label="Email"
            htmlFor="boxed-login-email"
            required
            error={errors.email}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                <MailIcon className="size-4" />
              </span>
              <input
                id="boxed-login-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) =>
                  setForm((s) => ({ ...s, email: e.target.value }))
                }
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </FormField>

          <FormField
            label="Password"
            htmlFor="boxed-login-password"
            required
            error={errors.password}
          >
            <PasswordInput
              id="boxed-login-password"
              autoComplete="current-password"
              placeholder="Enter your password"
              leadingIcon={<LockIcon className="size-4" />}
              value={form.password}
              invalid={!!errors.password}
              onChange={(e) =>
                setForm((s) => ({ ...s, password: e.target.value }))
              }
            />
          </FormField>

          <div className="flex items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-dark-7 dark:text-dark-7">
              <input
                type="checkbox"
                className="size-4 rounded border-stroke text-primary accent-primary focus:ring-2 focus:ring-primary/30 dark:border-dark-3"
                checked={form.remember}
                onChange={(e) =>
                  setForm((s) => ({ ...s, remember: e.target.checked }))
                }
              />
              Remember me
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary-dark"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            <LogInIcon className="size-4" />
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </Card>
    </AuthShell>
  );
}
