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
  ArrowLeftIcon,
  KeyIcon,
  MailIcon,
  CheckIcon,
} from "@/components/Layouts/sidebar/icons";
import { AuthShell } from "../_components/auth-shell";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordClient() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(undefined);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent", {
      description: `Check ${email} for instructions.`,
    });
  };

  return (
    <AuthShell back={{ href: "/auth/sign-in", label: "Back to sign in" }}>
      <Card padded className="p-6 sm:p-8">
        {sent ? (
          <div className="text-center">
            <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15">
              <CheckIcon className="size-7" />
            </div>
            <h1 className="text-2xl font-bold text-dark dark:text-white">
              Check your inbox
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-dark-5 dark:text-dark-6">
              We&apos;ve sent a password reset link to{" "}
              <span className="font-semibold text-dark dark:text-white">
                {email}
              </span>
              . The link will expire in 30 minutes.
            </p>
            <div className="mt-6 space-y-3">
              <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
              >
                Try a different email
              </Button>
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark"
              >
                <ArrowLeftIcon className="size-4" />
                Back to sign in
              </Link>
            </div>
            <p className="mt-6 text-xs text-dark-6">
              Didn&apos;t get the email? Check your spam folder or{" "}
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  toast.info("Ready to resend — click Send reset link again.");
                }}
                className="font-semibold text-primary hover:text-primary-dark"
              >
                resend it
              </button>
              .
            </p>
          </div>
        ) : (
          <>
            <header className="mb-6 text-center">
              <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15">
                <KeyIcon className="size-6" />
              </div>
              <h1 className="text-2xl font-bold text-dark dark:text-white">
                Forgot your password?
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm text-dark-5 dark:text-dark-6">
                No worries — enter your account email below and we&apos;ll send
                you a secure link to reset it.
              </p>
            </header>

            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <FormField
                label="Email address"
                htmlFor="forgot-email"
                required
                error={error}
              >
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6">
                    <MailIcon className="size-4" />
                  </span>
                  <input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(undefined);
                    }}
                    className={[inputClass, "pl-10"].join(" ")}
                  />
                </div>
              </FormField>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                <MailIcon className="size-4" />
                {loading ? "Sending reset link…" : "Send reset link"}
              </Button>
            </form>

            <Link
              href="/auth/sign-in"
              className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-dark-5 hover:text-dark dark:text-dark-6 dark:hover:text-white"
            >
              <ArrowLeftIcon className="size-4" />
              Back to sign in
            </Link>
          </>
        )}
      </Card>
    </AuthShell>
  );
}
