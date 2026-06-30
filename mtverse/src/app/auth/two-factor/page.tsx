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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  Check,
  KeyRound,
  Loader2,
  Shield,
  ShieldCheck,
} from "lucide-react";

const steps = [
  { id: 1, label: "Verify identity" },
  { id: 2, label: "Enter code" },
  { id: 3, label: "Backup codes" },
];

export default function TwoFactorPage() {
  const [step, setStep] = React.useState(1);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [trusted, setTrusted] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error("Please enter the 6-digit code from your authenticator app");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      toast.success("Verification successful! Save your backup codes.");
    }, 1300);
  };

  const backupCodes = React.useMemo(
    () => [
      "8H2K-9M4P",
      "Q7X3-N6L8",
      "B5R1-T9W2",
      "Y4Z6-J3F7",
      "D8C2-V5M9",
      "A1E6-S4H0",
      "G3U7-K8N2",
      "P9O5-X1Q4",
    ],
    []
  );

  return (
    <Card className="border-border/60 shadow-premium">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Shield className="size-7" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl">Two-factor authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to keep your account safe.
          </CardDescription>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
                    step > s.id
                      ? "bg-success text-success-foreground"
                      : step === s.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s.id ? <Check className="size-3.5" /> : s.id}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:inline",
                    step >= s.id ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px w-6 sm:w-10 transition-colors",
                    step > s.id ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {step === 1 && (
          <div className="space-y-4 text-center py-2">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted">
              <KeyRound className="size-8 text-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">Set up your authenticator</p>
              <p className="text-sm text-muted-foreground">
                Scan the QR code below with Google Authenticator, Authy, or 1Password,
                then enter the 6-digit code shown in the app.
              </p>
            </div>
            <div
              className="mx-auto size-40 rounded-xl border border-border bg-[repeating-conic-gradient(var(--foreground)_0%_25%,var(--background)_0%_50%)] bg-[length:20px_20px]"
              role="img"
              aria-label="QR code to scan with authenticator app"
            />
            <Button type="button" className="w-full" onClick={() => setStep(2)}>
              I&apos;ve scanned the code
            </Button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code from your authenticator app.
              </p>
            </div>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(v) => setCode(v)}
                aria-label="6-digit authenticator code"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-12 text-base" />
                  <InputOTPSlot index={1} className="size-12 text-base" />
                  <InputOTPSlot index={2} className="size-12 text-base" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="size-12 text-base" />
                  <InputOTPSlot index={4} className="size-12 text-base" />
                  <InputOTPSlot index={5} className="size-12 text-base" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex items-start gap-2 justify-center">
              <Checkbox
                id="trusted"
                className="mt-0.5"
                checked={trusted}
                onCheckedChange={(v) => setTrusted(!!v)}
              />
              <Label htmlFor="trusted" className="text-xs font-normal cursor-pointer">
                Trust this device for 30 days
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & continue"
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/signin"
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Use a backup code instead
              </Link>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-success/30 bg-success/10 p-3">
              <ShieldCheck className="size-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Save your backup codes</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Store these in a safe place. Each code can be used once if you lose
                  access to your authenticator.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm">
              {backupCodes.map((c) => (
                <div key={c} className="text-center tracking-wide">
                  {c}
                </div>
              ))}
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={() => toast.success("Two-factor authentication enabled!")}
            >
              I&apos;ve saved my codes
            </Button>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-center">
        <Link
          href="/signin"
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel and sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
