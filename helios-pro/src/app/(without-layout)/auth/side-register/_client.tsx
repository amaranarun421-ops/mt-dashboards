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
import {
  LockIcon,
  MailIcon,
  User,
  UserPlusIcon,
} from "@/components/Layouts/sidebar/icons";
import { AuthHero } from "../_components/auth-hero";
import { SocialButtons } from "../_components/social-buttons";
import { PasswordInput } from "../_components/password-input";
import { PasswordStrength } from "../_components/password-strength";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SideRegisterClient() {
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
    <div className="grid min-h-screen grid-cols-1 bg-white dark:bg-gray-dark lg:grid-cols-2">
      <AuthHero
        eyebrow="Free 14-day trial"
        title="Build dashboards your team will actually use."
        description="Helios Pro gives you premium dashboards, real-time apps and a component library trusted by 12,000+ teams — without writing a line of CSS."
        benefits={[
          {
            title: "Premium dashboards",
            description: "10+ ready-to-ship analytics, CRM and finance layouts.",
          },
          {
            title: "Real-time apps",
            description: "Email, chat, kanban, invoices and tasks out of the box.",
          },
          {
            title: "Composable components",
            description: "50+ accessible building blocks built on shadcn/ui.",
          },
        ]}
        stats={[
          { value: "12k+", label: "Active teams" },
          { value: "50+", label: "Components" },
          { value: "10+", label: "Dashboards" },
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
              href="/auth/sign-in"
              className="ml-auto text-sm font-medium text-dark-5 hover:text-primary dark:text-dark-6"
            >
              Have an account?{" "}
              <span className="font-semibold text-primary">Sign in</span>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-dark dark:text-white">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
              Start your 14-day trial. No credit card required.
            </p>
          </div>

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
              htmlFor="side-register-name"
              required
              error={errors.name}
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                  <User className="size-4" />
                </span>
                <input
                  id="side-register-name"
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
              htmlFor="side-register-email"
              required
              error={errors.email}
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                  <MailIcon className="size-4" />
                </span>
                <input
                  id="side-register-email"
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
              htmlFor="side-register-password"
              required
              error={errors.password}
            >
              <PasswordInput
                id="side-register-password"
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
              htmlFor="side-register-confirm"
              required
              error={errors.confirm}
            >
              <PasswordInput
                id="side-register-confirm"
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
        </div>
      </div>
    </div>
  );
}
