"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { FormField } from "@/components/shared/form-section";
import {
  ArrowLeftIcon,
  CheckIcon,
  KeyIcon,
  LockIcon,
} from "@/components/Layouts/sidebar/icons";
import { AuthShell } from "../_components/auth-shell";
import { PasswordInput } from "../_components/password-input";
import {
  PasswordStrength,
  scorePassword,
} from "../_components/password-strength";

export function ResetPasswordClient() {
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [errors, setErrors] = React.useState<{
    password?: string;
    confirm?: string;
  }>({});
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!password) next.password = "Please enter a new password.";
    else if (password.length < 8)
      next.password = "Password must be at least 8 characters.";
    else {
      const { level } = scorePassword(password);
      if (level === "weak")
        next.password = "Please choose a stronger password.";
    }
    if (!confirm) next.confirm = "Please confirm your new password.";
    else if (confirm !== password)
      next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setDone(true);
    toast.success("Password updated", {
      description: "You can now sign in with your new password.",
    });
  };

  return (
    <AuthShell back={{ href: "/auth/sign-in", label: "Back to sign in" }}>
      <Card padded className="p-6 sm:p-8">
        {done ? (
          <div className="text-center">
            <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15">
              <CheckIcon className="size-7" />
            </div>
            <h1 className="text-2xl font-bold text-dark dark:text-white">
              Password updated
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-dark-5 dark:text-dark-6">
              Your Helios Pro password has been changed successfully. You can
              now sign in with your new credentials.
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-6 w-full"
              onClick={() => {
                // simulate routing to sign-in
                window.location.href = "/auth/sign-in";
              }}
            >
              Continue to sign in
            </Button>
          </div>
        ) : (
          <>
            <header className="mb-6 text-center">
              <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15">
                <KeyIcon className="size-6" />
              </div>
              <h1 className="text-2xl font-bold text-dark dark:text-white">
                Reset your password
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm text-dark-5 dark:text-dark-6">
                Choose a strong new password for your account. You&apos;ll need
                it the next time you sign in.
              </p>
            </header>

            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <FormField
                label="New password"
                htmlFor="reset-password"
                required
                error={errors.password}
                hint="Use 8+ characters with a mix of letters, numbers and symbols."
              >
                <PasswordInput
                  id="reset-password"
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  leadingIcon={<LockIcon className="size-4" />}
                  value={password}
                  invalid={!!errors.password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((s) => ({ ...s, password: undefined }));
                  }}
                />
                <PasswordStrength password={password} />
              </FormField>

              <FormField
                label="Confirm new password"
                htmlFor="reset-confirm"
                required
                error={errors.confirm}
              >
                <PasswordInput
                  id="reset-confirm"
                  autoComplete="new-password"
                  placeholder="Re-enter your new password"
                  leadingIcon={<LockIcon className="size-4" />}
                  value={confirm}
                  invalid={!!errors.confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    if (errors.confirm)
                      setErrors((s) => ({ ...s, confirm: undefined }));
                  }}
                />
              </FormField>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                <KeyIcon className="size-4" />
                {loading ? "Resetting password…" : "Reset password"}
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
