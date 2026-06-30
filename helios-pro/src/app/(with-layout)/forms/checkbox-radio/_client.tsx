"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection, FormField } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { CheckIcon } from "@/components/Layouts/sidebar/icons";

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* shared checkbox visual */
function Check({
  checked,
  indeterminate = false,
  tone = "primary",
}: {
  checked: boolean;
  indeterminate?: boolean;
  tone?: "primary" | "accent" | "danger";
}) {
  const toneCls =
    tone === "accent"
      ? "bg-accent border-accent"
      : tone === "danger"
        ? "bg-red border-red"
        : "bg-primary border-primary";
  return (
    <span
      className={classNames(
        "inline-flex size-5 items-center justify-center rounded-md border-2 transition-all",
        checked || indeterminate
          ? `${toneCls} text-white`
          : "border-stroke bg-white text-transparent dark:border-dark-3 dark:bg-dark-2",
      )}
    >
      {indeterminate ? (
        <span className="block h-0.5 w-2.5 rounded bg-white" />
      ) : (
        <CheckIcon className={checked ? "size-3" : "size-0"} />
      )}
    </span>
  );
}

/* shared radio visual */
function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      className={classNames(
        "inline-flex size-5 items-center justify-center rounded-full border-2 transition-all",
        checked ? "border-primary" : "border-stroke dark:border-dark-3",
      )}
    >
      <span
        className={classNames(
          "size-2.5 rounded-full bg-primary transition-all",
          checked ? "scale-100" : "scale-0",
        )}
      />
    </span>
  );
}

const PLANS = [
  { id: "starter", name: "Starter", price: "$0", blurb: "For side-projects and MVPs.", features: ["1 project", "Community support", "1 GB storage"] },
  { id: "pro", name: "Pro", price: "$29", blurb: "For growing teams that need more power.", features: ["25 projects", "Priority support", "100 GB storage", "Custom domains"] },
  { id: "enterprise", name: "Enterprise", price: "Custom", blurb: "For organizations with advanced needs.", features: ["Unlimited projects", "24/7 SLA", "1 TB storage", "SSO + audit logs"] },
] as const;

export default function CheckboxRadioClient() {
  /* basic checkboxes */
  const [skills, setSkills] = useState<string[]>(["react", "ts"]);
  const toggle = (v: string) =>
    setSkills((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  /* grouped checkboxes */
  const [notify, setNotify] = useState<Record<string, boolean>>({
    email: true,
    push: true,
    sms: false,
    digest: true,
  });

  /* inline radios */
  const [inline, setInline] = useState("yes");

  /* card-as-radio */
  const [plan, setPlan] = useState<string>("pro");

  /* toggle-style checkboxes (switch-like) */
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    marketing: false,
    analytics: true,
    autosave: true,
    beta: false,
  });

  /* indeterminate example */
  const items = ["Aarav", "Priya", "Daniel"];
  const [picked, setPicked] = useState<string[]>(["Aarav"]);
  const allChecked = items.every((i) => picked.includes(i));
  const someChecked = items.some((i) => picked.includes(i)) && !allChecked;
  const toggleAll = () =>
    setPicked(allChecked ? [] : items.slice());
  const toggleOne = (n: string) =>
    setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <div>
      <PageHeader
        title="Checkbox & Radio"
        description="Basic, grouped, inline, card-as-radio and toggle-style controls."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Checkbox & Radio" },
        ]}
        actions={
          <Badge variant="primary" size="lg">
            <CheckIcon className="size-4" /> 5 patterns
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* basic */}
        <FormSection title="Basic checkboxes" description="With description, indeterminate and disabled states." columns={1}>
          <div className="space-y-3">
            {[
              { id: "react", label: "React", desc: "Component-based UI library." },
              { id: "ts", label: "TypeScript", desc: "Typed JavaScript at scale." },
              { id: "node", label: "Node.js", desc: "JavaScript runtime for the server." },
              { id: "design", label: "Figma", desc: "Collaborative design tool." },
            ].map((o) => {
              const checked = skills.includes(o.id);
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => toggle(o.id)}
                  className="flex w-full items-start gap-3 rounded-lg border border-stroke p-3 text-left transition hover:border-primary/40 dark:border-dark-3"
                >
                  <Check checked={checked} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dark dark:text-white">{o.label}</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{o.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-dark-5 dark:text-dark-6">
            {skills.length} of 4 selected: <span className="font-mono text-primary">{skills.join(", ") || "none"}</span>
          </p>
        </FormSection>

        {/* grouped with descriptions */}
        <FormSection title="Grouped with descriptions" description="A labelled group of related options." columns={1}>
          <div className="space-y-2">
            {[
              { id: "email", label: "Email", desc: "Daily summary + critical alerts." },
              { id: "push", label: "Push", desc: "Real-time notifications on your devices." },
              { id: "sms", label: "SMS", desc: "Only for security events." },
              { id: "digest", label: "Weekly digest", desc: "Sunday recap of activity." },
            ].map((o) => {
              const checked = !!notify[o.id];
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setNotify((prev) => ({ ...prev, [o.id]: !prev[o.id] }))}
                  className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition hover:bg-gray-2 dark:hover:bg-white/5"
                >
                  <Check checked={checked} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dark dark:text-white">{o.label}</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{o.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          {/* indeterminate example */}
          <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
            <button
              type="button"
              onClick={toggleAll}
              className="flex w-full items-center gap-3 text-left"
            >
              <Check checked={allChecked} indeterminate={someChecked} />
              <span className="text-sm font-medium text-dark dark:text-white">Notify all teammates</span>
            </button>
            <div className="mt-2 space-y-1 pl-8">
              {items.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggleOne(n)}
                  className="flex w-full items-center gap-3 rounded p-1.5 text-left transition hover:bg-gray-2 dark:hover:bg-white/5"
                >
                  <Check checked={picked.includes(n)} tone="accent" />
                  <span className="text-sm text-dark dark:text-white">{n}</span>
                </button>
              ))}
            </div>
          </div>
        </FormSection>

        {/* inline radios */}
        <FormSection title="Inline radios" description="Compact horizontal choices." columns={1}>
          <FormField label="Subscribe to the product newsletter?">
            <div className="flex flex-wrap gap-2">
              {[
                { v: "yes", l: "Yes, sign me up" },
                { v: "no", l: "No thanks" },
                { v: "later", l: "Maybe later" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setInline(o.v)}
                  className={classNames(
                    "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
                    inline === o.v
                      ? "border-primary bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                      : "border-stroke text-dark-7 hover:border-primary/40 dark:border-dark-3 dark:text-dark-6",
                  )}
                >
                  <Radio checked={inline === o.v} />
                  {o.l}
                </button>
              ))}
            </div>
          </FormField>
          <FormField label="Pick a default dashboard">
            <div className="grid grid-cols-2 gap-2">
              {["Ecommerce", "Analytics", "CRM", "Finance"].map((d, i) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setInline(d)}
                  className={classNames(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
                    inline === d
                      ? "border-primary bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                      : "border-stroke text-dark-7 hover:border-primary/40 dark:border-dark-3 dark:text-dark-6",
                  )}
                >
                  <Radio checked={inline === d} />
                  {d}
                </button>
              ))}
              <p className="col-span-2 text-xs text-dark-5 dark:text-dark-6">
                Selected: <span className="font-mono text-primary">{inline}</span>
              </p>
            </div>
          </FormField>
        </FormSection>

        {/* card-as-radio */}
        <FormSection title="Cards as radio" description="Plan-picker style for high-stakes single-choice." columns={1}>
          <div className="grid grid-cols-1 gap-3">
            {PLANS.map((p) => {
              const checked = plan === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlan(p.id)}
                  className={classNames(
                    "relative flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all",
                    checked
                      ? "border-primary bg-primary-subtle/60 dark:bg-primary/10"
                      : "border-stroke hover:border-primary/40 dark:border-dark-3",
                  )}
                >
                  <Radio checked={checked} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-dark dark:text-white">{p.name}</p>
                      <span className="text-sm font-bold text-primary">{p.price}</span>
                    </div>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{p.blurb}</p>
                    <ul className="mt-2 grid grid-cols-2 gap-1 text-xs text-dark-5 dark:text-dark-6">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5">
                          <CheckIcon className="size-3 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {checked && (
                    <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </FormSection>

        {/* toggle-style */}
        <FormSection title="Toggle-style checkboxes" description="Switch-shaped checkboxes for preferences." columns={1}>
          <div className="space-y-2">
            {[
              { id: "marketing", label: "Marketing emails", desc: "Product news, tips and offers." },
              { id: "analytics", label: "Share usage analytics", desc: "Help improve Helios Pro." },
              { id: "autosave", label: "Autosave drafts", desc: "Every 30 seconds while editing." },
              { id: "beta", label: "Join beta program", desc: "Get early access to new features." },
            ].map((o) => {
              const on = !!prefs[o.id];
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setPrefs((prev) => ({ ...prev, [o.id]: !prev[o.id] }))}
                  className="flex w-full items-center justify-between gap-4 rounded-lg border border-stroke p-3 text-left transition hover:border-primary/40 dark:border-dark-3"
                >
                  <div>
                    <p className="text-sm font-medium text-dark dark:text-white">{o.label}</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{o.desc}</p>
                  </div>
                  <span
                    className={classNames(
                      "relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors",
                      on ? "bg-primary" : "bg-gray-3 dark:bg-dark-3",
                    )}
                  >
                    <span
                      className={classNames(
                        "inline-block size-5 transform rounded-full bg-white shadow transition-transform",
                        on ? "translate-x-5" : "translate-x-0.5",
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </FormSection>

        {/* disabled states */}
        <FormSection title="Disabled & read-only" description="When a choice is locked or pre-set." columns={1}>
          <div className="space-y-2">
            <label className="flex items-center gap-3 rounded-lg p-2 opacity-60">
              <Check checked={false} />
              <span className="text-sm text-dark dark:text-white">Disabled checkbox</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg p-2 opacity-60">
              <Check checked />
              <span className="text-sm text-dark dark:text-white">Disabled & checked</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg p-2 opacity-60">
              <Radio checked={false} />
              <span className="text-sm text-dark dark:text-white">Disabled radio</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg p-2 opacity-60">
              <Radio checked />
              <span className="text-sm text-dark dark:text-white">Disabled & selected</span>
            </label>
          </div>
        </FormSection>
      </div>

      <Card className="mt-6">
        <CardHeader title="Pattern guide" subtitle="Match the pattern to the moment." />
        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2 lg:grid-cols-3">
          {[
            { p: "Basic", u: "Independent yes/no toggles for one option." },
            { p: "Grouped", u: "Related choices under one heading; multi-select." },
            { p: "Inline", u: "Compact horizontal choices (yes/no/maybe)." },
            { p: "Card as radio", u: "High-stakes single-select with rich content." },
            { p: "Toggle-style", u: "Settings-panel preferences with on/off semantics." },
            { p: "Indeterminate", u: "Group state where some but not all are picked." },
          ].map((row) => (
            <div key={row.p} className="rounded-lg border border-stroke p-3 dark:border-dark-3">
              <p className="font-semibold text-dark dark:text-white">{row.p}</p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{row.u}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
