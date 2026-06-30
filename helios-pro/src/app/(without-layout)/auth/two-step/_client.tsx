"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import {
  ArrowLeftIcon,
  CheckIcon,
  RefreshCwIcon,
  ShieldIcon,
} from "@/components/Layouts/sidebar/icons";
import { AuthShell } from "../_components/auth-shell";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

export function TwoStepClient() {
  const [digits, setDigits] = React.useState<string[]>(
    Array(CODE_LENGTH).fill(""),
  );
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const [seconds, setSeconds] = React.useState(RESEND_SECONDS);

  // resend countdown
  React.useEffect(() => {
    if (seconds <= 0) return;
    const t = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, [seconds]);

  const setDigit = (i: number, raw: string) => {
    const val = raw.replace(/\D/g, "");
    if (!val) {
      setDigits((d) => {
        const next = [...d];
        next[i] = "";
        return next;
      });
      return;
    }
    // Handle paste of multi-digit string
    if (val.length > 1) {
      const chars = val.slice(0, CODE_LENGTH).split("");
      setDigits((d) => {
        const next = [...d];
        chars.forEach((c, idx) => {
          if (i + idx < CODE_LENGTH) next[i + idx] = c;
        });
        return next;
      });
      const focusIdx = Math.min(i + chars.length, CODE_LENGTH - 1);
      inputsRef.current[focusIdx]?.focus();
      return;
    }
    setDigits((d) => {
      const next = [...d];
      next[i] = val;
      return next;
    });
    if (i < CODE_LENGTH - 1) inputsRef.current[i + 1]?.focus();
  };

  const onKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        setDigits((d) => {
          const next = [...d];
          next[i] = "";
          return next;
        });
      } else if (i > 0) {
        inputsRef.current[i - 1]?.focus();
        setDigits((d) => {
          const next = [...d];
          next[i - 1] = "";
          return next;
        });
      }
      return;
    }
    if (e.key === "ArrowLeft" && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < CODE_LENGTH - 1)
      inputsRef.current[i + 1]?.focus();
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    setDigits((d) => {
      const next = [...d];
      for (let i = 0; i < CODE_LENGTH; i++) next[i] = text[i] ?? "";
      return next;
    });
    const focusIdx = Math.min(text.length, CODE_LENGTH - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  const code = digits.join("");
  const complete = code.length === CODE_LENGTH;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!complete) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError(undefined);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setDone(true);
    toast.success("Verification complete", {
      description: "Redirecting to your dashboard…",
    });
  };

  const resend = () => {
    if (seconds > 0) return;
    setSeconds(RESEND_SECONDS);
    setDigits(Array(CODE_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    toast.success("A new code has been sent", {
      description: "Check your authenticator app or email.",
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
              You&apos;re verified
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-dark-5 dark:text-dark-6">
              Two-step verification complete. Redirecting you to your Helios
              Pro dashboard…
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-6 w-full"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Go to dashboard
            </Button>
          </div>
        ) : (
          <>
            <header className="mb-6 text-center">
              <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15">
                <ShieldIcon className="size-6" />
              </div>
              <h1 className="text-2xl font-bold text-dark dark:text-white">
                Two-step verification
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm text-dark-5 dark:text-dark-6">
                Enter the 6-digit code from your authenticator app to continue.
              </p>
            </header>

            <form onSubmit={onSubmit} noValidate>
              <div
                className="flex justify-between gap-2 sm:gap-3"
                onPaste={onPaste}
              >
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={d}
                    autoFocus={i === 0}
                    aria-label={`Digit ${i + 1} of ${CODE_LENGTH}`}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => onKeyDown(i, e)}
                    className="h-14 w-full rounded-lg border border-stroke bg-white text-center text-xl font-bold text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                ))}
              </div>

              {error && (
                <p className="mt-3 text-center text-xs text-red">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full"
                disabled={loading || !complete}
              >
                <ShieldIcon className="size-4" />
                {loading ? "Verifying…" : "Verify"}
              </Button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-3 text-sm">
              <div className="text-dark-5 dark:text-dark-6">
                {seconds > 0 ? (
                  <>
                    Resend code in{" "}
                    <span className="font-semibold text-dark dark:text-white">
                      {seconds}s
                    </span>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={resend}
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-dark"
                  >
                    <RefreshCwIcon className="size-4" />
                    Resend code
                  </button>
                )}
              </div>
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center gap-1.5 font-medium text-dark-5 hover:text-dark dark:text-dark-6 dark:hover:text-white"
              >
                <ArrowLeftIcon className="size-4" />
                Use a backup code instead
              </Link>
            </div>
          </>
        )}
      </Card>
    </AuthShell>
  );
}
