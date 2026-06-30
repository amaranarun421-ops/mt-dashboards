"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Progress, CircularProgress } from "@/components/shared/progress";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import {
  ProgressIcon,
  CheckIcon,
  UploadIcon,
  CheckSquareIcon,
  EditIcon,
  RefreshCwIcon,
} from "@/components/Layouts/sidebar/icons";

const linearTones = [
  { name: "Primary", tone: "primary" as const },
  { name: "Accent", tone: "accent" as const },
  { name: "Violet", tone: "violet" as const },
  { name: "Info", tone: "info" as const },
  { name: "Success", tone: "success" as const },
  { name: "Danger", tone: "danger" as const },
  { name: "Rose", tone: "rose" as const },
];

const linearSizes = [
  { name: "Extra small", size: "xs" as const },
  { name: "Small", size: "sm" as const },
  { name: "Medium", size: "md" as const },
  { name: "Large", size: "lg" as const },
];

const circularTones = [
  { name: "Primary", tone: "primary" as const, value: 72 },
  { name: "Accent", tone: "accent" as const, value: 58 },
  { name: "Violet", tone: "violet" as const, value: 84 },
  { name: "Info", tone: "info" as const, value: 41 },
  { name: "Rose", tone: "rose" as const, value: 33 },
  { name: "Success", tone: "success" as const, value: 96 },
  { name: "Danger", tone: "danger" as const, value: 22 },
];

const circularSizes = [
  { name: "Small", size: 56, stroke: 6 },
  { name: "Medium", size: 88, stroke: 8 },
  { name: "Large", size: 120, stroke: 10 },
  { name: "X-Large", size: 160, stroke: 12 },
];

const segments = [
  { label: "Completed", value: 42, tone: "success" as const },
  { label: "In progress", value: 28, tone: "primary" as const },
  { label: "Blocked", value: 12, tone: "danger" as const },
];

const steps = [
  { label: "Account", icon: <CheckSquareIcon className="size-4" /> },
  { label: "Profile", icon: <EditIcon className="size-4" /> },
  { label: "Billing", icon: <UploadIcon className="size-4" /> },
  { label: "Review", icon: <CheckIcon className="size-4" /> },
  { label: "Done", icon: <CheckIcon className="size-4" /> },
];

export default function ProgressClient() {
  const [value, setValue] = React.useState(64);
  const [step, setStep] = React.useState(2);

  const segmentTotal = segments.reduce((a, s) => a + s.value, 0);
  let segmentOffset = 0;
  const segmentColors: Record<string, string> = {
    success: "#10b981",
    primary: "#10b981",
    danger: "#ef4444",
    accent: "#f59e0b",
  };

  return (
    <>
      <PageHeader
        title="Progress"
        description="Linear, circular, multi-segment and stepped indicators for async operations, quotas and onboarding flows."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/progress" },
          { label: "Progress" },
        ]}
        actions={
          <Badge variant="primary">
            <ProgressIcon className="size-3.5" /> 4 variants
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Linear — all tones"
            subtitle="Seven tones map to the Helios Pro color system."
          />
          <div className="space-y-4">
            {linearTones.map((t) => (
              <Progress
                key={t.name}
                value={value}
                tone={t.tone}
                size="md"
                label={t.name}
                showLabel
              />
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Linear — all sizes"
            subtitle="Four heights from xs (4px) to lg (12px)."
          />
          <div className="space-y-5">
            {linearSizes.map((s) => (
              <div key={s.name}>
                <p className="mb-1.5 text-xs text-dark-5 dark:text-dark-6">
                  {s.name}
                </p>
                <Progress value={value} tone="primary" size={s.size} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Linear — interactive"
            subtitle="Use the slider to drive every progress bar above and below."
          />
          <div className="flex flex-col gap-3">
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value, 10))}
              className="w-full accent-[var(--color-primary)]"
              aria-label="Progress value"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-5 dark:text-dark-6">Drag to change</span>
              <span className="font-semibold text-dark dark:text-white">
                {value}%
              </span>
            </div>
            <Progress value={value} tone="accent" size="lg" showLabel label="Upload" />
            <Progress value={value} tone="violet" size="md" showLabel label="Sync" />
            <Progress value={value} tone="info" size="sm" showLabel label="Indexing" />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Circular — all tones"
            subtitle="Stroke color follows the tone system; centre label is customizable."
          />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {circularTones.map((c) => (
              <div
                key={c.name}
                className="flex flex-col items-center gap-2 rounded-xl border border-stroke p-4 dark:border-dark-3"
              >
                <CircularProgress value={c.value} tone={c.tone} size={88} />
                <span className="text-xs font-medium text-dark-7 dark:text-dark-7">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Circular — all sizes"
            subtitle="From 56px chips up to a 160px hero gauge."
          />
          <div className="flex flex-wrap items-end justify-around gap-6">
            {circularSizes.map((c) => (
              <div
                key={c.name}
                className="flex flex-col items-center gap-2"
              >
                <CircularProgress
                  value={value}
                  size={c.size}
                  stroke={c.stroke}
                  tone="primary"
                />
                <span className="text-xs text-dark-5 dark:text-dark-6">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Multi-segment progress"
            subtitle="Stacked segments show category distribution inside a single rail."
          />
          <div className="space-y-3">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-3 dark:bg-dark-3">
              {segments.map((s) => {
                const width = (s.value / segmentTotal) * 100;
                const el = (
                  <div
                    key={s.label}
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${width}%`,
                      backgroundColor: segmentColors[s.tone],
                    }}
                  />
                );
                segmentOffset += s.value;
                return el;
              })}
            </div>
            <div className="flex flex-wrap gap-4">
              {segments.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 text-xs text-dark-7 dark:text-dark-7"
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: segmentColors[s.tone] }}
                  />
                  {s.label}{" "}
                  <span className="font-semibold">{s.value}%</span>
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Stepped progress"
            subtitle="Onboarding, multi-step forms and wizards."
          />
          <div className="flex items-center">
            {steps.map((s, i) => {
              const isComplete = i < step;
              const isCurrent = i === step;
              const isLast = i === steps.length - 1;
              return (
                <div
                  key={s.label}
                  className="flex flex-1 items-center last:flex-none"
                >
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setStep(i)}
                      aria-label={`Go to step ${s.label}`}
                      className={`grid size-9 place-items-center rounded-full border-2 text-sm font-semibold transition ${
                        isComplete
                          ? "border-primary bg-primary text-white"
                          : isCurrent
                            ? "border-primary bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                            : "border-stroke bg-white text-dark-5 dark:border-dark-3 dark:bg-gray-dark dark:text-dark-6"
                      }`}
                    >
                      {isComplete ? <CheckIcon className="size-4" /> : s.icon}
                    </button>
                    <span
                      className={`text-xs font-medium ${
                        isCurrent
                          ? "text-dark dark:text-white"
                          : "text-dark-5 dark:text-dark-6"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`mx-2 h-0.5 flex-1 rounded-full transition-colors ${
                        i < step
                          ? "bg-primary"
                          : "bg-stroke dark:bg-dark-3"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <RefreshCwIcon className="size-4" /> Previous
            </Button>
            <span className="text-sm text-dark-5 dark:text-dark-6">
              Step{" "}
              <span className="font-semibold text-dark dark:text-white">
                {step + 1}
              </span>{" "}
              of {steps.length}
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
            >
              Next <CheckIcon className="size-4" />
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
