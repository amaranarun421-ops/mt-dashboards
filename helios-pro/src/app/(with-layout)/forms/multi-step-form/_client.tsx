"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Progress } from "@/components/shared/progress";
import { CheckIcon } from "@/components/Layouts/sidebar/icons";

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const STEPS = ["Account", "Profile", "Preferences", "Review"] as const;
type StepIdx = 0 | 1 | 2 | 3;

type FormData = {
  // account
  email: string;
  username: string;
  password: string;
  // profile
  fullName: string;
  jobTitle: string;
  bio: string;
  avatarColor: string;
  // preferences
  newsletter: boolean;
  betaFeatures: boolean;
  theme: "light" | "dark" | "system";
  defaultDashboard: string;
};

const initial: FormData = {
  email: "",
  username: "",
  password: "",
  fullName: "",
  jobTitle: "",
  bio: "",
  avatarColor: "primary",
  newsletter: true,
  betaFeatures: false,
  theme: "system",
  defaultDashboard: "ecommerce",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MultiStepFormClient() {
  const [step, setStep] = useState<StepIdx>(0);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const validateStep = (s: StepIdx): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!data.email.trim()) e.email = "Email is required.";
      else if (!emailRegex.test(data.email)) e.email = "Enter a valid email.";
      if (!data.username.trim()) e.username = "Username is required.";
      else if (data.username.length < 3) e.username = "Min 3 characters.";
      if (!data.password) e.password = "Password is required.";
      else if (data.password.length < 8) e.password = "Min 8 characters.";
    }
    if (s === 1) {
      if (!data.fullName.trim()) e.fullName = "Full name is required.";
      if (!data.jobTitle.trim()) e.jobTitle = "Job title is required.";
    }
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length === 0 && step < 3) setStep((step + 1) as StepIdx);
  };
  const back = () => {
    setErrors({});
    if (step > 0) setStep((step - 1) as StepIdx);
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  if (submitted) {
    return (
      <div>
        <PageHeader
          title="Multi-Step Form"
          description="A 4-step wizard with step indicator, per-step validation and a final summary."
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: "Forms", href: "/forms/basic-inputs" },
            { label: "Multi-Step Form" },
          ]}
        />
        <Card className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15">
            <CheckIcon className="size-8" />
          </div>
          <h2 className="text-xl font-bold text-dark dark:text-white">Welcome aboard, {data.fullName.split(" ")[0] || "friend"}!</h2>
          <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
            Your Helios Pro account is set up. We sent a confirmation to <span className="font-medium text-dark dark:text-white">{data.email}</span>.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-2 text-left sm:grid-cols-2">
            <div className="rounded-lg bg-gray-2 p-3 dark:bg-dark-2">
              <p className="text-xs text-dark-5 dark:text-dark-6">Username</p>
              <p className="text-sm font-medium text-dark dark:text-white">@{data.username}</p>
            </div>
            <div className="rounded-lg bg-gray-2 p-3 dark:bg-dark-2">
              <p className="text-xs text-dark-5 dark:text-dark-6">Job title</p>
              <p className="text-sm font-medium text-dark dark:text-white">{data.jobTitle}</p>
            </div>
            <div className="rounded-lg bg-gray-2 p-3 dark:bg-dark-2">
              <p className="text-xs text-dark-5 dark:text-dark-6">Theme</p>
              <p className="text-sm font-medium capitalize text-dark dark:text-white">{data.theme}</p>
            </div>
            <div className="rounded-lg bg-gray-2 p-3 dark:bg-dark-2">
              <p className="text-xs text-dark-5 dark:text-dark-6">Default dashboard</p>
              <p className="text-sm font-medium capitalize text-dark dark:text-white">{data.defaultDashboard}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" size="md" onClick={() => { setSubmitted(false); setStep(0); setData(initial); }}>
              Start over
            </Button>
            <Button variant="primary" size="md" onClick={() => {}}>
              Go to dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Multi-Step Form"
        description="A 4-step wizard with step indicator, per-step validation and a final summary."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Multi-Step Form" },
        ]}
        actions={
          <Badge variant="primary" size="lg">
            Step {step + 1} of {STEPS.length}
          </Badge>
        }
      />

      {/* step indicator */}
      <Card className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <ol className="flex w-full flex-col gap-3 md:flex-row md:items-center">
            {STEPS.map((label, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={label} className="flex flex-1 items-center gap-2">
                  <button
                    type="button"
                    disabled={i > step}
                    onClick={() => i < step && setStep(i as StepIdx)}
                    className={classNames(
                      "grid size-8 flex-shrink-0 place-items-center rounded-full border-2 text-sm font-semibold transition",
                      done && "border-primary bg-primary text-white",
                      current && "border-primary bg-primary-subtle text-primary dark:bg-primary/15",
                      !done && !current && "border-stroke text-dark-5 dark:border-dark-3 dark:text-dark-6",
                      i <= step ? "cursor-pointer" : "cursor-not-allowed",
                    )}
                  >
                    {done ? <CheckIcon className="size-4" /> : i + 1}
                  </button>
                  <div className="min-w-0">
                    <p
                      className={classNames(
                        "text-sm font-medium",
                        current ? "text-dark dark:text-white" : "text-dark-5 dark:text-dark-6",
                      )}
                    >
                      {label}
                    </p>
                    <p className="hidden text-xs text-dark-5 dark:text-dark-6 sm:block">
                      {done ? "Completed" : current ? "In progress" : "Upcoming"}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span
                      className={classNames(
                        "mx-2 hidden h-px flex-1 md:block",
                        i < step ? "bg-primary" : "bg-stroke dark:bg-dark-3",
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ol>
          <div className="md:w-48">
            <Progress value={progress} tone="primary" size="sm" showLabel label="Progress" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* form area */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader title={STEPS[step]} subtitle={`Step ${step + 1} — ${stepSubtitle(step)}`} />

            {step === 0 && (
              <FormSection title="Account credentials" description="You'll use these to sign in." columns={1}>
                <FormField label="Email" htmlFor="ms-email" required error={errors.email}>
                  <input
                    id="ms-email"
                    type="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@heliospro.io"
                    className={errors.email ? `${inputClass} border-red ring-2 ring-red/20` : inputClass}
                  />
                </FormField>
                <FormField label="Username" htmlFor="ms-user" required error={errors.username} hint="Min 3 characters.">
                  <input
                    id="ms-user"
                    type="text"
                    value={data.username}
                    onChange={(e) => update("username", e.target.value)}
                    placeholder="aarav_m"
                    className={errors.username ? `${inputClass} border-red ring-2 ring-red/20` : inputClass}
                  />
                </FormField>
                <FormField label="Password" htmlFor="ms-pw" required error={errors.password} hint="Min 8 characters.">
                  <input
                    id="ms-pw"
                    type="password"
                    value={data.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="••••••••"
                    className={errors.password ? `${inputClass} border-red ring-2 ring-red/20` : inputClass}
                  />
                </FormField>
              </FormSection>
            )}

            {step === 1 && (
              <FormSection title="Your profile" description="How you'll appear across Helios Pro." columns={1}>
                <FormField label="Full name" htmlFor="ms-name" required error={errors.fullName}>
                  <input
                    id="ms-name"
                    type="text"
                    value={data.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Aarav Mehta"
                    className={errors.fullName ? `${inputClass} border-red ring-2 ring-red/20` : inputClass}
                  />
                </FormField>
                <FormField label="Job title" htmlFor="ms-title" required error={errors.jobTitle}>
                  <input
                    id="ms-title"
                    type="text"
                    value={data.jobTitle}
                    onChange={(e) => update("jobTitle", e.target.value)}
                    placeholder="Head of Growth"
                    className={errors.jobTitle ? `${inputClass} border-red ring-2 ring-red/20` : inputClass}
                  />
                </FormField>
                <FormField label="Short bio" htmlFor="ms-bio" hint="Up to 280 characters.">
                  <textarea
                    id="ms-bio"
                    rows={3}
                    value={data.bio}
                    onChange={(e) => update("bio", e.target.value)}
                    placeholder="Tell us a bit about you…"
                    className={`${inputClass} resize-y`}
                  />
                </FormField>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Avatar color</label>
                  <div className="flex gap-2">
                    {[
                      { id: "primary", cls: "bg-primary" },
                      { id: "accent", cls: "bg-accent" },
                      { id: "violet", cls: "bg-violet" },
                      { id: "info", cls: "bg-blue" },
                      { id: "rose", cls: "bg-rose" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => update("avatarColor", c.id)}
                        className={classNames(
                          "size-8 rounded-full transition",
                          c.cls,
                          data.avatarColor === c.id ? "ring-2 ring-offset-2 ring-dark dark:ring-white dark:ring-offset-gray-dark" : "opacity-70 hover:opacity-100",
                        )}
                        aria-label={`Pick ${c.id} color`}
                      />
                    ))}
                  </div>
                </div>
              </FormSection>
            )}

            {step === 2 && (
              <FormSection title="Preferences" description="Tune Helios Pro to your workflow." columns={1}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => update("newsletter", !data.newsletter)}
                    className={classNames(
                      "flex items-start justify-between gap-3 rounded-lg border p-3 text-left transition",
                      data.newsletter ? "border-primary bg-primary-subtle/60 dark:bg-primary/10" : "border-stroke hover:border-primary/40 dark:border-dark-3",
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium text-dark dark:text-white">Newsletter</p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">Product news, tips and offers.</p>
                    </div>
                    <span className={classNames("inline-flex size-5 items-center justify-center rounded-full text-white", data.newsletter ? "bg-primary" : "bg-gray-3 dark:bg-dark-3")}>
                      {data.newsletter && <CheckIcon className="size-3" />}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => update("betaFeatures", !data.betaFeatures)}
                    className={classNames(
                      "flex items-start justify-between gap-3 rounded-lg border p-3 text-left transition",
                      data.betaFeatures ? "border-primary bg-primary-subtle/60 dark:bg-primary/10" : "border-stroke hover:border-primary/40 dark:border-dark-3",
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium text-dark dark:text-white">Beta features</p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">Early access to new features.</p>
                    </div>
                    <span className={classNames("inline-flex size-5 items-center justify-center rounded-full text-white", data.betaFeatures ? "bg-primary" : "bg-gray-3 dark:bg-dark-3")}>
                      {data.betaFeatures && <CheckIcon className="size-3" />}
                    </span>
                  </button>
                </div>
                <FormField label="Theme" htmlFor="ms-theme">
                  <select id="ms-theme" value={data.theme} onChange={(e) => update("theme", e.target.value as FormData["theme"])} className={inputClass}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">Follow system</option>
                  </select>
                </FormField>
                <FormField label="Default dashboard" htmlFor="ms-dash">
                  <select id="ms-dash" value={data.defaultDashboard} onChange={(e) => update("defaultDashboard", e.target.value)} className={inputClass}>
                    <option value="ecommerce">Ecommerce</option>
                    <option value="analytics">Analytics</option>
                    <option value="crm">CRM</option>
                    <option value="finance">Finance</option>
                    <option value="saas">SaaS</option>
                  </select>
                </FormField>
              </FormSection>
            )}

            {step === 3 && (
              <FormSection title="Review your details" description="Make sure everything looks right before finishing." columns={2}>
                <SummaryRow label="Email" value={data.email} />
                <SummaryRow label="Username" value={`@${data.username}`} />
                <SummaryRow label="Full name" value={data.fullName} />
                <SummaryRow label="Job title" value={data.jobTitle} />
                <SummaryRow label="Bio" value={data.bio || "—"} />
                <SummaryRow label="Avatar color" value={<span className="capitalize">{data.avatarColor}</span>} />
                <SummaryRow label="Newsletter" value={data.newsletter ? "Yes" : "No"} />
                <SummaryRow label="Beta features" value={data.betaFeatures ? "Yes" : "No"} />
                <SummaryRow label="Theme" value={<span className="capitalize">{data.theme}</span>} />
                <SummaryRow label="Default dashboard" value={<span className="capitalize">{data.defaultDashboard}</span>} />
                <div className="col-span-full rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
                  Clicking “Create account” will simulate the submission and show a confirmation screen.
                </div>
              </FormSection>
            )}

            {/* nav */}
            <div className="mt-6 flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
              <Button variant="outline" size="md" onClick={back} disabled={step === 0}>
                Back
              </Button>
              {step < 3 ? (
                <Button variant="primary" size="md" onClick={next}>
                  Next: {STEPS[step + 1]}
                </Button>
              ) : (
                <Button variant="primary" size="md" onClick={() => setSubmitted(true)}>
                  Create account
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* sidebar summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Live summary" subtitle="Updates as you progress." />
            <ul className="space-y-2 text-sm">
              {[
                { l: "Email", v: data.email || "—" },
                { l: "Username", v: data.username ? `@${data.username}` : "—" },
                { l: "Full name", v: data.fullName || "—" },
                { l: "Job title", v: data.jobTitle || "—" },
                { l: "Theme", v: data.theme },
                { l: "Default dashboard", v: data.defaultDashboard },
              ].map((row) => (
                <li key={row.l} className="flex items-center justify-between gap-2 border-b border-stroke pb-2 last:border-0 last:pb-0 dark:border-dark-3">
                  <span className="text-dark-5 dark:text-dark-6">{row.l}</span>
                  <span className="font-medium capitalize text-dark dark:text-white">{row.v}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHeader title="How it works" />
            <ul className="list-disc space-y-2 pl-4 text-xs text-dark-5 marker:text-primary dark:text-dark-6">
              <li>4 steps: Account → Profile → Preferences → Review.</li>
              <li>Step indicator is clickable for completed steps.</li>
              <li>Steps 1 and 2 require fields before “Next” proceeds.</li>
              <li>Final step shows a summary and a confirmation screen.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function stepSubtitle(s: StepIdx) {
  return ["set up your sign-in", "tell us about you", "tune Helios Pro to your workflow", "confirm and finish"][s];
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-lg border border-stroke p-3 dark:border-dark-3">
      <span className="text-xs text-dark-5 dark:text-dark-6">{label}</span>
      <span className="mt-0.5 text-sm font-medium text-dark dark:text-white">{value}</span>
    </div>
  );
}
