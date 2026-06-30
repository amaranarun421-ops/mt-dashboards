"use client";

import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { ToggleIcon, CheckIcon } from "@/components/Layouts/sidebar/icons";

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type Option = { value: string; label: string; code?: string; tone?: string; group?: string };

const COUNTRIES: Option[] = [
  { value: "us", label: "United States", code: "US", group: "Americas" },
  { value: "ca", label: "Canada", code: "CA", group: "Americas" },
  { value: "br", label: "Brazil", code: "BR", group: "Americas" },
  { value: "uk", label: "United Kingdom", code: "UK", group: "Europe" },
  { value: "de", label: "Germany", code: "DE", group: "Europe" },
  { value: "fr", label: "France", code: "FR", group: "Europe" },
  { value: "se", label: "Sweden", code: "SE", group: "Europe" },
  { value: "jp", label: "Japan", code: "JP", group: "Asia-Pacific" },
  { value: "in", label: "India", code: "IN", group: "Asia-Pacific" },
  { value: "au", label: "Australia", code: "AU", group: "Asia-Pacific" },
];

const ASSIGNEES: Option[] = [
  { value: "aarav", label: "Aarav Mehta" },
  { value: "priya", label: "Priya Sharma" },
  { value: "daniel", label: "Daniel Okafor" },
  { value: "sofia", label: "Sofia Rossi" },
  { value: "liam", label: "Liam O'Connor" },
  { value: "yuki", label: "Yuki Tanaka" },
  { value: "emma", label: "Emma Larsson" },
  { value: "marcus", label: "Marcus Webb" },
];

const SKILLS: Option[] = [
  { value: "ts", label: "TypeScript" },
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
  { value: "sql", label: "PostgreSQL" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "design", label: "Figma" },
  { value: "growth", label: "Growth" },
];

export default function SelectsClient() {
  /* single select (native) */
  const [country, setCountry] = useState("us");

  /* multi select */
  const [skills, setSkills] = useState<string[]>(["ts", "next", "tailwind"]);
  const toggleSkill = (v: string) =>
    setSkills((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  /* grouped select (native optgroup) */
  const [region, setRegion] = useState("uk");

  /* searchable combobox-style select */
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [assignee, setAssignee] = useState<string | null>("priya");
  const searchRef = useRef<HTMLDivElement | null>(null);
  const filtered = ASSIGNEES.filter((a) => a.label.toLowerCase().includes(searchValue.toLowerCase()));
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* icon select (with leading avatar) */
  const [owner, setOwner] = useState("sofia");

  return (
    <div>
      <PageHeader
        title="Selects"
        description="Single, multi, grouped, searchable and avatar variants — all theme-aware."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Selects" },
        ]}
        actions={
          <Badge variant="primary" size="lg">
            <ToggleIcon className="size-4" /> 5 variants
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* single */}
        <FormSection title="Single select" description="Native browser select with the Helios Pro treatment." columns={1}>
          <FormField label="Country" htmlFor="sel-country" hint="Used for tax and billing.">
            <select value={country} onChange={(e) => setCountry(e.target.value)} id="sel-country" className={inputClass}>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </FormField>
          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            Selected: <span className="font-mono text-primary">{COUNTRIES.find((c) => c.value === country)?.label}</span>
          </div>
        </FormSection>

        {/* multi */}
        <FormSection title="Multi-select" description="Chip-style multi-select with remove on click." columns={1}>
          <FormField label="Skills" htmlFor="sel-skills" hint="Pick all that apply.">
            <div id="sel-skills" className="rounded-lg border border-stroke bg-white p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 dark:border-dark-3 dark:bg-dark-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {skills.map((s) => {
                  const opt = SKILLS.find((k) => k.value === s);
                  return (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary dark:bg-primary/15 dark:text-primary-light"
                    >
                      {opt?.label}
                      <button
                        type="button"
                        onClick={() => toggleSkill(s)}
                        className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full hover:bg-primary/20"
                        aria-label={`Remove ${opt?.label}`}
                      >
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                          <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                        </svg>
                      </button>
                    </span>
                  );
                })}
                {skills.length === 0 && (
                  <span className="px-2 text-sm text-dark-6">No skills selected.</span>
                )}
              </div>
            </div>
          </FormField>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {SKILLS.map((s) => {
              const active = skills.includes(s.value);
              return (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => toggleSkill(s.value)}
                  className={classNames(
                    "rounded-lg border px-2 py-1.5 text-xs font-medium transition",
                    active
                      ? "border-primary bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                      : "border-stroke text-dark-7 hover:border-primary/40 dark:border-dark-3 dark:text-dark-6",
                  )}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {active ? (
                      <CheckIcon className="size-3" />
                    ) : (
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                        <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </FormSection>

        {/* grouped */}
        <FormSection title="Grouped select" description="Options grouped by region using native optgroup." columns={1}>
          <FormField label="Operating region" htmlFor="sel-region" hint="Drives data-residency rules.">
            <select value={region} onChange={(e) => setRegion(e.target.value)} id="sel-region" className={inputClass}>
              {["Americas", "Europe", "Asia-Pacific"].map((group) => (
                <optgroup key={group} label={group}>
                  {COUNTRIES.filter((c) => c.group === group).map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </FormField>
          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            Selected region: <span className="font-mono text-primary">{COUNTRIES.find((c) => c.value === region)?.label}</span> ·{" "}
            <span className="font-mono">{COUNTRIES.find((c) => c.value === region)?.group}</span>
          </div>
        </FormSection>

        {/* searchable */}
        <FormSection title="Searchable select" description="Custom dropdown with filtering and keyboard support." columns={1}>
          <FormField label="Assignee" hint="Search a team member.">
            <div className="relative" ref={searchRef}>
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                className={classNames(inputClass, "flex items-center justify-between text-left")}
              >
                <span className={assignee ? "text-dark dark:text-white" : "text-dark-6"}>
                  {assignee ? ASSIGNEES.find((a) => a.value === assignee)?.label : "Select an assignee…"}
                </span>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-dark-5 dark:text-dark-6">
                  <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {searchOpen && (
                <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-stroke bg-white shadow-3 dark:border-dark-3 dark:bg-gray-dark">
                  <div className="border-b border-stroke p-2 dark:border-dark-3">
                    <input
                      autoFocus
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search…"
                      className={`${inputClass} h-9`}
                    />
                  </div>
                  <ul className="max-h-56 overflow-y-auto helios-scroll">
                    {filtered.length === 0 ? (
                      <li className="px-3 py-2 text-xs text-dark-5 dark:text-dark-6">No matches.</li>
                    ) : (
                      filtered.map((a) => (
                        <li key={a.value}>
                          <button
                            type="button"
                            onClick={() => {
                              setAssignee(a.value);
                              setSearchOpen(false);
                              setSearchValue("");
                            }}
                            className={classNames(
                              "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-gray-2 dark:hover:bg-dark-3",
                              assignee === a.value ? "text-primary" : "text-dark dark:text-white",
                            )}
                          >
                            <Avatar name={a.label} size="xs" />
                            <span>{a.label}</span>
                            {assignee === a.value && (
                              <span className="ml-auto text-xs">Selected</span>
                            )}
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          </FormField>
        </FormSection>

        {/* with icon */}
        <FormSection title="Select with icon / avatar" description="Leading visual reinforces the choice." columns={1}>
          <FormField label="Workspace owner" htmlFor="sel-owner" hint="Pick a team member to own this workspace.">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Avatar name={ASSIGNEES.find((a) => a.value === owner)?.label || ""} size="xs" />
              </span>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                id="sel-owner"
                className={`${inputClass} pl-10`}
              >
                {ASSIGNEES.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
          </FormField>
          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            Owner is{" "}
            <span className="font-mono text-primary">
              {ASSIGNEES.find((a) => a.value === owner)?.label}
            </span>{" "}
            — they receive all workspace notifications.
          </div>
        </FormSection>

        {/* disabled / invalid */}
        <FormSection title="States" description="Disabled and error treatments for selects." columns={1}>
          <FormField label="Disabled select" htmlFor="sel-disabled">
            <select id="sel-disabled" disabled className={`${inputClass} opacity-60`}>
              <option>Not available</option>
            </select>
          </FormField>
          <FormField label="Invalid select" htmlFor="sel-invalid" error="Please pick a fulfillment partner.">
            <select
              id="sel-invalid"
              defaultValue=""
              className={`${inputClass} border-red ring-2 ring-red/20 focus:border-red focus:ring-red/20`}
            >
              <option value="" disabled>
                Select a partner…
              </option>
              <option>ShipHelo</option>
              <option>FleetOps</option>
            </select>
          </FormField>
        </FormSection>
      </div>

      <Card className="mt-6">
        <CardHeader title="When to reach for which" subtitle="A quick decision tree for select variants." />
        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2 lg:grid-cols-3">
          {[
            { p: "Single select", u: "≤ 8 options with no need to filter." },
            { p: "Multi-select", u: "Tags, skills or any many-of-N field." },
            { p: "Grouped select", u: "Long lists that segment naturally (region, category)." },
            { p: "Searchable select", u: "More than 10 options or non-obvious labels." },
            { p: "With avatar/icon", u: "Picking people, brands or anything visual." },
            { p: "States", u: "Use disabled + error to mirror the rest of your form." },
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
