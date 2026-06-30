"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MTVLogo } from "@/components/mtv/logo";
import {
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  X,
} from "lucide-react";

const requirements = [
  { id: "length", label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { id: "upper", label: "One uppercase letter (A-Z)", test: (pw: string) => /[A-Z]/.test(pw) },
  { id: "number", label: "One number (0-9)", test: (pw: string) => /[0-9]/.test(pw) },
  { id: "special", label: "One special character (!@#$...)", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
];

export default function ResetPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Password reset successfully. Please sign in.");
    }, 1300);
  };

  return (
    <Card className="border-border/60 shadow-premium">
      <CardHeader className="text-center space-y-3">
        <div className="flex justify-center">
          <MTVLogo showText={false} />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl">Set a new password</CardTitle>
          <CardDescription>
            Choose a strong password you haven&apos;t used before.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="pl-9 pr-9"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirm"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                className="pl-9"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            {confirm.length > 0 && (
              <p className={`text-xs ${password === confirm ? "text-success" : "text-destructive"}`}>
                {password === confirm ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Requirements checklist */}
          <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-2">
            <p className="text-xs font-medium text-foreground">Password requirements</p>
            <ul className="space-y-1.5">
              {requirements.map((req) => {
                const ok = req.test(password);
                return (
                  <li key={req.id} className="flex items-center gap-2 text-xs">
                    <span
                      className={`flex size-4 items-center justify-center rounded-full ${
                        ok ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {ok ? <Check className="size-3" /> : <X className="size-3" />}
                    </span>
                    <span className={ok ? "text-foreground" : "text-muted-foreground"}>
                      {req.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Resetting password...
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Link
          href="/signin"
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
