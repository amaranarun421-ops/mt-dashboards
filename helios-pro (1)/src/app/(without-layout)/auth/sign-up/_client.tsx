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
  User,
  UserPlusIcon,
} from "@/components/Layouts/sidebar/icons";
import { AuthShell } from "../_components/auth-shell";
import { SocialButtons } from "../_components/social-buttons";
import { PasswordInput } from "../_components/password-input";
import { PasswordStrength } from "../_components/password-strength";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpClient() {
  const [form, setForm] = React.useState<FormState>({
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

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    else if (form.name.trim().length < 2)
      next.name = "Name must be at least 2 characters.";
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
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Account created!", {
      description: `Welcome to Helios Pro, ${form.name.split(" ")[0]}.`,
    });
  };

  return (
    <AuthShell
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
      <Card padded className="p-6 sm:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
            Start your 14-day trial. No credit card required.
          </p>
        </header>

        <SocialButtons
          googleLabel="Sign up with Google"
          githubLabel="Sign up with GitHub"
          onGoogle={() => toast.info("Continuing with Google…")}
          onGitHub={() => toast.info("Continuing with GitHub…")}
        />

        <div className="my-6 flex items-center gap-3 text-xs font-medium text-dark-6">
          <span className="h-px flex-1 bg-stroke dark:bg-dark-3" />
          OR SIGN UP WITH EMAIL
          <span className="h-px flex-1 bg-stroke dark:bg-dark-3" />
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <FormField
            label="Full name"
            htmlFor="signup-name"
            required
            error={errors.name}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                <User className="size-4" />
              </span>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                placeholder="Aarav Sharma"
                value={form.name}
                onChange={(e) =>
                  setForm((s) => ({ ...s, name: e.target.value }))
                }
                className={[inputClass, "pl-10"].join(" ")}
              />
            </div>
          </FormField>

          <FormField
            label="Email"
            htmlFor="signup-email"
            required
            error={errors.email}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                <MailIcon className="size-4" />
              </span>
              <input
                id="signup-email"
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
            htmlFor="signup-password"
            required
            error={errors.password}
            hint="Use 8+ characters with a mix of letters, numbers and symbols."
          >
            <PasswordInput
              id="signup-password"
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
            htmlFor="signup-confirm"
            required
            error={errors.confirm}
          >
            <PasswordInput
              id="signup-confirm"
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
