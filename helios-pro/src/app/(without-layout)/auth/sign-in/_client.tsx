"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import {
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import {
  LockIcon,
  MailIcon,
  LogInIcon,
} from "@/components/Layouts/sidebar/icons";
import { AuthShell } from "../_components/auth-shell";
import { SocialButtons } from "../_components/social-buttons";
import { PasswordInput } from "../_components/password-input";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignInClient() {
  const [form, setForm] = React.useState<FormState>({
    email: "",
    password: "",
    remember: true,
  });
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = React.useState(false);

  const validate = React.useCallback(() => {
    const next: typeof errors = {};
    if (!form.email) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 6)
      next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form, errors]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Welcome back! Redirecting…", {
      description: `Signed in as ${form.email}`,
    });
  };

  return (
    <AuthShell
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
      <Card padded className="p-6 sm:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
            Sign in to your Helios Pro account to continue.
          </p>
        </header>

        <SocialButtons
          googleLabel="Google"
          githubLabel="GitHub"
          onGoogle={() => toast.info("Continuing with Google…")}
          onGitHub={() => toast.info("Continuing with GitHub…")}
        />

        <div className="my-6 flex items-center gap-3 text-xs font-medium text-dark-6">
          <span className="h-px flex-1 bg-stroke dark:bg-dark-3" />
          OR SIGN IN WITH EMAIL
          <span className="h-px flex-1 bg-stroke dark:bg-dark-3" />
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <FormField
            label="Email"
            htmlFor="signin-email"
            required
            error={errors.email}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                <MailIcon className="size-4" />
              </span>
              <input
                id="signin-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) =>
                  setForm((s) => ({ ...s, email: e.target.value }))
                }
                className={[inputClass, "pl-10"].join(" ")}
              />
            </div>
          </FormField>

          <FormField
            label="Password"
            htmlFor="signin-password"
            required
            error={errors.password}
          >
            <PasswordInput
              id="signin-password"
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
