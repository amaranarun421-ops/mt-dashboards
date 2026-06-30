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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { MTVLogo } from "@/components/mtv/logo";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";

const RESEND_SECONDS = 30;

export default function OtpPage() {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [seconds, setSeconds] = React.useState(RESEND_SECONDS);

  React.useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Email verified successfully!");
    }, 1200);
  };

  const resend = () => {
    setSeconds(RESEND_SECONDS);
    toast.info("A new verification code has been sent");
  };

  return (
    <Card className="border-border/60 shadow-premium">
      <CardHeader className="text-center space-y-3">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="size-7" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            We&apos;ve sent a 6-digit code to{" "}
            <span className="font-medium text-foreground">a***x@company.com</span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(v) => setValue(v)}
              aria-label="6-digit verification code"
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify email"
            )}
          </Button>
        </form>

        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">Didn&apos;t receive the code?</p>
          {seconds > 0 ? (
            <p className="text-xs text-muted-foreground">
              Resend code in{" "}
              <span className="font-medium text-foreground">
                0:{String(seconds).padStart(2, "0")}
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={resend}
              className="text-xs font-medium text-primary hover:underline"
            >
              Resend code
            </button>
          )}
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
