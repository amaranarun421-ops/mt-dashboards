"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Badge } from "@/components/shared/badge";
import {
  ArrowLeftIcon,
  LockIcon,
  LogInIcon,
} from "@/components/Layouts/sidebar/icons";
import { AuthShell } from "../_components/auth-shell";
import { PasswordInput } from "../_components/password-input";

const USER = {
  name: "Aarav Sharma",
  email: "aarav.sharma@heliospro.io",
  role: "Workspace Admin",
};

export function LockScreenClient() {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password to unlock.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError(undefined);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Welcome back, Aarav", {
      description: "Redirecting to your dashboard…",
    });
    window.location.href = "/";
  };

  return (
    <AuthShell back={{ href: "/auth/sign-in", label: "Back to sign in" }}>
      <Card padded className="p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Avatar
              name={USER.name}
              size="xl"
              ring
              className="ring-4 ring-primary-subtle dark:ring-primary/20"
            />
            <span className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full bg-primary text-white ring-2 ring-white dark:ring-gray-dark">
              <LockIcon className="size-3.5" />
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-dark dark:text-white">
            Welcome back, {USER.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
            Your session was locked for security. Enter your password to
            continue.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <Badge variant="primary" size="sm">
              {USER.role}
            </Badge>
            <span className="text-xs text-dark-6">{USER.email}</span>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          <PasswordInput
            id="lock-password"
            autoComplete="current-password"
            placeholder="Enter your password"
            leadingIcon={<LockIcon className="size-4" />}
            value={password}
            invalid={!!error}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(undefined);
            }}
          />
          {error && <p className="text-xs text-red">{error}</p>}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            <LogInIcon className="size-4" />
            {loading ? "Unlocking…" : "Unlock"}
          </Button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <Link
            href="/auth/forgot-password"
            className="inline-block font-medium text-primary hover:text-primary-dark"
          >
            Forgot password?
          </Link>
          <div className="text-dark-5 dark:text-dark-6">
            Not {USER.name.split(" ")[0]}?{" "}
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center gap-1 font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary"
            >
              <ArrowLeftIcon className="size-3.5" />
              Sign in as a different user
            </Link>
          </div>
        </div>
      </Card>
    </AuthShell>
  );
}
