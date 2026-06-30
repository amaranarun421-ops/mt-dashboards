"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/shared/progress";

type StrengthLevel = "weak" | "fair" | "good" | "strong";

type StrengthRule = {
  id: string;
  label: string;
  test: (pw: string) => boolean;
};

const RULES: StrengthRule[] = [
  { id: "len", label: "At least 8 characters", test: (p) => p.length >= 8 },
  {
    id: "upper",
    label: "An uppercase letter",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    id: "lower",
    label: "A lowercase letter",
    test: (p) => /[a-z]/.test(p),
  },
  { id: "digit", label: "A number", test: (p) => /\d/.test(p) },
  {
    id: "sym",
    label: "A symbol (!@#$…)",
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
];

export function scorePassword(pw: string): {
  score: number;
  level: StrengthLevel;
  passedRules: string[];
} {
  if (!pw) return { score: 0, level: "weak", passedRules: [] };
  const passed = RULES.filter((r) => r.test(pw)).map((r) => r.id);
  let score = 0;
  if (pw.length >= 8) score += 20;
  if (pw.length >= 12) score += 10;
  if (/[A-Z]/.test(pw)) score += 20;
  if (/[a-z]/.test(pw)) score += 15;
  if (/\d/.test(pw)) score += 20;
  if (/[^A-Za-z0-9]/.test(pw)) score += 15;
  score = Math.min(100, score);
  let level: StrengthLevel = "weak";
  if (passed.length >= 4 && pw.length >= 8) level = "good";
  if (passed.length === 5 && pw.length >= 10) level = "strong";
  if (passed.length >= 2 && pw.length >= 6 && level === "weak") level = "fair";
  return { score, level, passedRules: passed };
}

const LEVEL_META: Record<
  StrengthLevel,
  { label: string; tone: "danger" | "accent" | "info" | "success"; barColor: string }
> = {
  weak: { label: "Weak", tone: "danger", barColor: "bg-red" },
  fair: { label: "Fair", tone: "accent", barColor: "bg-accent" },
  good: { label: "Good", tone: "info", barColor: "bg-blue" },
  strong: { label: "Strong", tone: "success", barColor: "bg-green" },
};

type Props = {
  password: string;
  className?: string;
  showRules?: boolean;
};

export function PasswordStrength({
  password,
  className,
  showRules = true,
}: Props) {
  const { score, level, passedRules } = React.useMemo(
    () => scorePassword(password),
    [password],
  );
  const meta = LEVEL_META[level];
  const segments: StrengthLevel[] = ["weak", "fair", "good", "strong"];
  const activeIndex = segments.indexOf(level);

  if (!password) return null;

  return (
    <div className={cn("mt-2 space-y-2", className)}>
      {/* 4-segment bar */}
      <div className="flex items-center gap-1.5">
        {segments.map((seg, i) => (
          <span
            key={seg}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= activeIndex ? LEVEL_META[seg].barColor : "bg-gray-3 dark:bg-dark-3",
            )}
          />
        ))}
        <span
          className={cn(
            "ml-2 text-xs font-semibold tabular-nums",
            meta.tone === "danger" && "text-red",
            meta.tone === "accent" && "text-accent-dark dark:text-accent-light",
            meta.tone === "info" && "text-blue-dark dark:text-blue-light",
            meta.tone === "success" && "text-primary",
          )}
        >
          {meta.label}
        </span>
      </div>
      {showRules && (
        <ul className="grid grid-cols-1 gap-1 text-xs text-dark-5 dark:text-dark-6 sm:grid-cols-2">
          {RULES.map((r) => {
            const ok = passedRules.includes(r.id);
            return (
              <li
                key={r.id}
                className={cn(
                  "flex items-center gap-1.5 transition-colors",
                  ok && "text-primary",
                )}
              >
                <span
                  className={cn(
                    "grid size-3.5 place-items-center rounded-full border",
                    ok
                      ? "border-primary bg-primary text-white"
                      : "border-stroke text-transparent dark:border-dark-3",
                  )}
                  aria-hidden
                >
                  <svg
                    width={9}
                    height={9}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                </span>
                {r.label}
              </li>
            );
          })}
        </ul>
      )}
      {/* Hidden Progress for screen-reader friendliness */}
      <span className="sr-only">
        <Progress value={score} tone={meta.tone} />
      </span>
    </div>
  );
}
