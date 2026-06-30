"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { ToggleIcon } from "@/components/Layouts/sidebar/icons";

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type Tone = "primary" | "accent" | "danger" | "violet";

const toneClass: Record<Tone, string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  danger: "bg-red",
  violet: "bg-violet",
};

type Size = "sm" | "md" | "lg";
const sizeClass: Record<Size, { track: string; knob: string; on: string }> = {
  sm: { track: "h-5 w-9", knob: "size-4", on: "translate-x-4" },
  md: { track: "h-6 w-11", knob: "size-5", on: "translate-x-5" },
  lg: { track: "h-7 w-14", knob: "size-6", on: "translate-x-7" },
};

function Switch({
  checked,
  onChange,
  tone = "primary",
  size = "md",
  icon,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  tone?: Tone;
  size?: Size;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  const s = sizeClass[size];
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={classNames(
        "relative inline-flex items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        s.track,
        checked ? toneClass[tone] : "bg-gray-3 dark:bg-dark-3",
        disabled && "opacity-50",
      )}
    >
      {icon && (
        <span
          className={classNames(
            "absolute flex items-center justify-center text-white transition-opacity",
            size === "sm" ? "left-0.5 size-4" : size === "md" ? "left-0.5 size-5" : "left-1 size-5",
            checked ? "opacity-100" : "opacity-0",
          )}
        >
          {icon}
        </span>
      )}
      <span
        className={classNames(
          "inline-block transform rounded-full bg-white shadow transition-transform duration-300",
          s.knob,
          checked ? s.on : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export default function SwitchesClient() {
  const [basic, setBasic] = useState(true);
  const [labeled, setLabeled] = useState(true);
  const [tone1, setTone1] = useState(true);
  const [tone2, setTone2] = useState(false);
  const [tone3, setTone3] = useState(true);
  const [icon, setIcon] = useState(true);
  const [sizes, setSizes] = useState({ sm: true, md: true, lg: false });

  const [settings, setSettings] = useState({
    twoFa: true,
    emailNotif: true,
    pushNotif: false,
    weeklyDigest: true,
    autoUpdate: true,
    betaFeatures: false,
    crashReports: true,
    quietHours: false,
  });

  return (
    <div>
      <PageHeader
        title="Switches"
        description="Basic, labelled, sized, coloured, icon and grouped-panel variants."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Switches" },
        ]}
        actions={
          <Badge variant="primary" size="lg">
            <ToggleIcon className="size-4" /> 6 patterns
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* basic */}
        <FormSection title="Basic" description="The simplest on/off toggle." columns={1}>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Airplane mode</span>
            <Switch checked={basic} onChange={() => setBasic((v) => !v)} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Auto-sync (disabled)</span>
            <Switch checked={false} onChange={() => {}} disabled />
          </div>
        </FormSection>

        {/* with labels */}
        <FormSection title="With labels" description="Switch + descriptive label and helper text." columns={1}>
          <div className="flex items-start justify-between gap-4 rounded-lg border border-stroke p-3 dark:border-dark-3">
            <div>
              <p className="text-sm font-medium text-dark dark:text-white">Show on public profile</p>
              <p className="text-xs text-dark-5 dark:text-dark-6">When on, your profile is visible to non-team members.</p>
            </div>
            <Switch checked={labeled} onChange={() => setLabeled((v) => !v)} />
          </div>
          <div className="flex items-start justify-between gap-4 rounded-lg border border-stroke p-3 dark:border-dark-3">
            <div>
              <p className="text-sm font-medium text-dark dark:text-white">Compact mode</p>
              <p className="text-xs text-dark-5 dark:text-dark-6">Tighter spacing throughout the dashboard.</p>
            </div>
            <Switch checked={!labeled} onChange={() => setLabeled((v) => !v)} tone="accent" />
          </div>
        </FormSection>

        {/* sizes */}
        <FormSection title="Sizes" description="Small, medium and large tracks." columns={1}>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Small</span>
            <Switch checked={sizes.sm} onChange={() => setSizes((p) => ({ ...p, sm: !p.sm }))} size="sm" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Medium (default)</span>
            <Switch checked={sizes.md} onChange={() => setSizes((p) => ({ ...p, md: !p.md }))} size="md" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Large</span>
            <Switch checked={sizes.lg} onChange={() => setSizes((p) => ({ ...p, lg: !p.lg }))} size="lg" />
          </div>
        </FormSection>

        {/* colors */}
        <FormSection title="Colors" description="Tonal switches for different semantic meanings." columns={1}>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Primary (default)</span>
            <Switch checked={tone1} onChange={() => setTone1((v) => !v)} tone="primary" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Accent</span>
            <Switch checked={tone2} onChange={() => setTone2((v) => !v)} tone="accent" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Danger</span>
            <Switch checked={tone3} onChange={() => setTone3((v) => !v)} tone="danger" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Violet</span>
            <Switch checked={tone1} onChange={() => setTone1((v) => !v)} tone="violet" />
          </div>
        </FormSection>

        {/* icon switches */}
        <FormSection title="With icons" description="Show a glyph inside the track when on." columns={1}>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Wi-Fi</span>
            <Switch
              checked={icon}
              onChange={() => setIcon((v) => !v)}
              icon={
                <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12.55a11 11 0 0114 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3">
            <span className="text-sm text-dark dark:text-white">Notifications</span>
            <Switch
              checked={!icon}
              onChange={() => setIcon((v) => !v)}
              tone="accent"
              icon={
                <svg viewBox="0 0 24 24" className="size-3" fill="currentColor">
                  <path d="M12 22a2.5 2.5 0 002.5-2.5h-5A2.5 2.5 0 0012 22zM18 16v-5a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z" />
                </svg>
              }
            />
          </div>
        </FormSection>

        {/* grouped settings panel */}
        <FormSection title="Grouped settings panel" description="A realistic preferences block." columns={1}>
          <div className="divide-y divide-stroke dark:divide-dark-3">
            {[
              { key: "twoFa", label: "Two-factor authentication", desc: "Require a one-time code on login." },
              { key: "emailNotif", label: "Email notifications", desc: "Receive critical alerts by email." },
              { key: "pushNotif", label: "Push notifications", desc: "Real-time alerts on your devices." },
              { key: "weeklyDigest", label: "Weekly digest", desc: "Sunday recap of team activity." },
              { key: "autoUpdate", label: "Auto-update", desc: "Install new versions automatically." },
              { key: "betaFeatures", label: "Beta features", desc: "Get early access to upcoming features." },
              { key: "crashReports", label: "Crash reports", desc: "Send diagnostics when something breaks." },
              { key: "quietHours", label: "Quiet hours", desc: "Mute notifications 22:00 – 07:00." },
            ].map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-dark dark:text-white">{row.label}</p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">{row.desc}</p>
                </div>
                <Switch
                  checked={settings[row.key as keyof typeof settings]}
                  onChange={() =>
                    setSettings((prev) => ({
                      ...prev,
                      [row.key]: !prev[row.key as keyof typeof settings],
                    }))
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            <span>{Object.values(settings).filter(Boolean).length} of 8 settings enabled</span>
            <button
              type="button"
              onClick={() => setSettings({
                twoFa: true, emailNotif: true, pushNotif: true, weeklyDigest: true,
                autoUpdate: true, betaFeatures: true, crashReports: true, quietHours: true,
              })}
              className="rounded-md bg-primary px-2 py-1 font-medium text-white hover:bg-primary-dark"
            >
              Enable all
            </button>
          </div>
        </FormSection>
      </div>

      <Card className="mt-6">
        <CardHeader title="When to use switches vs checkboxes" subtitle="They look different — and they mean different things." />
        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
          <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
            <p className="font-semibold text-dark dark:text-white">Use a switch when…</p>
            <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
              the change takes effect immediately (settings, preferences, system toggles).
            </p>
          </div>
          <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
            <p className="font-semibold text-dark dark:text-white">Use a checkbox when…</p>
            <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
              the user must hit Save / Submit for the change to apply (form fields, terms of service).
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
