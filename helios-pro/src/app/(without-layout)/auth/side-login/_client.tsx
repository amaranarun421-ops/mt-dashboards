"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/shared/button";
import {
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import { LockIcon, MailIcon, LogInIcon } from "@/components/Layouts/sidebar/icons";
import { AuthHero } from "../_components/auth-hero";
import { SocialButtons } from "../_components/social-buttons";
import { PasswordInput } from "../_components/password-input";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SideLoginClient() {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    remember: true,
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
    <div className="grid min-h-screen grid-cols-1 bg-white dark:bg-gray-dark lg:grid-cols-2">
      <AuthHero
        eyebrow="Helios Pro"
        title="Illuminating data, empowering decisions."
        description="The premium admin dashboard for modern teams. Track KPIs, manage operations and ship faster with one source of truth."
        testimonial={{
          quote:
            "Helios Pro replaced five dashboards with one. Our morning standup is 12 minutes shorter and the team finally trusts the numbers.",
          name: "Priya Iyer",
          role: "VP Operations, Northwind Labs",
          avatarName: "Priya Iyer",
        }}
        stats={[
          { value: "12k+", label: "Active teams" },
          { value: "99.99%", label: "Uptime SLA" },
          { value: "4.9/5", label: "G2 rating" },
        ]}
      />

      {/* Form panel */}
      <div className="flex min-h-screen items-center justify-center bg-gray-1 px-5 py-10 dark:bg-gray-dark sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="lg:hidden">
              <Logo />
            </Link>
            <Link
              href="/auth/sign-up"
              className="ml-auto text-sm font-medium text-dark-5 hover:text-primary dark:text-dark-6"
            >
              Need an account?{" "}
              <span className="font-semibold text-primary">Sign up</span>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-dark dark:text-white">
              Sign in to Helios Pro
            </h1>
            <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
              Welcome back. Please enter your details below.
            </p>
          </div>

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
              htmlFor="side-login-email"
              required
              error={errors.email}
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                  <MailIcon className="size-4" />
                </span>
                <input
                  id="side-login-email"
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
              htmlFor="side-login-password"
              required
              error={errors.password}
            >
              <PasswordInput
                id="side-login-password"
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

          <p className="mt-6 text-center text-xs text-dark-6">
            By signing in you agree to our{" "}
            <Link
              href="/pages/about"
              className="font-medium text-primary hover:text-primary-dark"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/pages/about"
              className="font-medium text-primary hover:text-primary-dark"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
