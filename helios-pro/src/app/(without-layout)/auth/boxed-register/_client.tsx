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
import {
  LockIcon,
  MailIcon,
  User,
  UserPlusIcon,
  CheckIcon,
} from "@/components/Layouts/sidebar/icons";
import { AuthShell } from "../_components/auth-shell";
import { SocialButtons } from "../_components/social-buttons";
import { PasswordInput } from "../_components/password-input";
import { PasswordStrength } from "../_components/password-strength";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PERKS = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
];

export function BoxedRegisterClient() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
    terms?: string;
  }>({});
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8)
      next.password = "Password must be at least 8 characters.";
    if (!form.confirm) next.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password)
      next.confirm = "Passwords do not match.";
    if (!form.terms)
      next.terms = "You must accept the Terms of Service to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Account created!", {
      description: `Welcome to Helios Pro, ${form.name.split(" ")[0]}.`,
    });
  };

  return (
    <AuthShell
      background="pattern"
      back={{ href: "/", label: "Back to home" }}
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-semibold text-primary hover:text-primary-dark"
          >
            Sign in
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
              Create account
            </h1>
            <Badge variant="primary" size="sm">
              Free trial
            </Badge>
          </div>
          <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
            Start your Helios Pro trial in under a minute.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-dark-6 dark:text-dark-6">
            {PERKS.map((p) => (
              <li key={p} className="inline-flex items-center gap-1">
                <CheckIcon className="size-3.5 text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </header>

        <SocialButtons
          className="mb-5"
          googleLabel="Sign up with Google"
          githubLabel="Sign up with GitHub"
          onGoogle={() => toast.info("Continuing with Google…")}
          onGitHub={() => toast.info("Continuing with GitHub…")}
        />

        <div className="mb-5 flex items-center gap-3 text-xs font-medium text-dark-6">
          <span className="h-px flex-1 bg-stroke dark:bg-dark-3" />
          OR SIGN UP WITH EMAIL
          <span className="h-px flex-1 bg-stroke dark:bg-dark-3" />
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <FormField
            label="Full name"
            htmlFor="boxed-register-name"
            required
            error={errors.name}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                <User className="size-4" />
              </span>
              <input
                id="boxed-register-name"
                type="text"
                autoComplete="name"
                placeholder="Aarav Sharma"
                value={form.name}
                onChange={(e) =>
                  setForm((s) => ({ ...s, name: e.target.value }))
                }
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </FormField>

          <FormField
            label="Email"
            htmlFor="boxed-register-email"
            required
            error={errors.email}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                <MailIcon className="size-4" />
              </span>
              <input
                id="boxed-register-email"
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
            htmlFor="boxed-register-password"
            required
            error={errors.password}
          >
            <PasswordInput
              id="boxed-register-password"
              autoComplete="new-password"
              placeholder="Create a password"
              leadingIcon={<LockIcon className="size-4" />}
              value={form.password}
              invalid={!!errors.password}
              onChange={(e) =>
                setForm((s) => ({ ...s, password: e.target.value }))
              }
            />
            <PasswordStrength password={form.password} />
          </FormField>

          <FormField
            label="Confirm password"
            htmlFor="boxed-register-confirm"
            required
            error={errors.confirm}
          >
            <PasswordInput
              id="boxed-register-confirm"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              leadingIcon={<LockIcon className="size-4" />}
              value={form.confirm}
              invalid={!!errors.confirm}
              onChange={(e) =>
                setForm((s) => ({ ...s, confirm: e.target.value }))
              }
            />
          </FormField>

          <div>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-dark-7 dark:text-dark-7">
              <input
                type="checkbox"
                className="mt-0.5 size-4 rounded border-stroke text-primary accent-primary focus:ring-2 focus:ring-primary/30 dark:border-dark-3"
                checked={form.terms}
                onChange={(e) =>
                  setForm((s) => ({ ...s, terms: e.target.checked }))
                }
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/pages/about"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/pages/about"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.terms && (
              <p className="mt-1 text-xs text-red">{errors.terms}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            <UserPlusIcon className="size-4" />
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>
      </Card>
    </AuthShell>
  );
}
