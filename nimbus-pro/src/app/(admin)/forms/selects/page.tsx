"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Select, Avatar, Badge, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, X, Search, Code, Briefcase, Star, Flag } from "lucide-react";

const OPTIONS_SIMPLE = ["Option A", "Option B", "Option C", "Option D"];
const OPTIONS_GROUPED = [
  { label: "Asia", items: ["India", "Japan", "Singapore"] },
  { label: "Europe", items: ["Germany", "Spain", "United Kingdom"] },
  { label: "Americas", items: ["United States", "Canada", "Brazil"] },
];
const OPTIONS_AVATARS = [
  { id: 1, name: "Aaroh Sharma", email: "aaroh@nimbuspro.io", role: "Admin" },
  { id: 2, name: "Priya Iyer", email: "priya@nimbuspro.io", role: "Editor" },
  { id: 3, name: "Sofia García", email: "sofia@nimbuspro.io", role: "Admin" },
  { id: 4, name: "Marcus Chen", email: "marcus@nimbuspro.io", role: "Viewer" },
];
const OPTIONS_ICONS = [
  { id: "fe", label: "Frontend", icon: Code },
  { id: "be", label: "Backend", icon: Briefcase },
  { id: "qa", label: "QA", icon: Check },
  { id: "fav", label: "Favorites", icon: Star },
  { id: "flag", label: "Flagged", icon: Flag },
];

function SingleSelect({ value, onChange, options, placeholder = "Select..." }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="input flex items-center justify-between text-left"
      >
        <span className={cn(value ? "text-gray-900 dark:text-white" : "text-gray-400")}>{value || placeholder}</span>
        <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              className={cn("flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
                value === o ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
            >
              {o}
              {value === o && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MultiSelect({ values, onChange, options }: {
  values: string[]; onChange: (v: string[]) => void; options: string[];
}) {
  const [open, setOpen] = useState(false);
  const toggle = (v: string) => onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="input flex min-h-[42px] items-center justify-between gap-2 text-left"
      >
        <div className="flex flex-1 flex-wrap items-center gap-1.5">
          {values.length === 0 ? <span className="text-gray-400">Select options...</span> :
            values.map((v) => (
              <span key={v} className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                {v}
                <span role="button" onClick={(e) => { e.stopPropagation(); toggle(v); }}><X className="h-3 w-3" /></span>
              </span>
            ))
          }
        </div>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-gray-400 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => toggle(o)}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span className={cn("flex h-4 w-4 items-center justify-center rounded", values.includes(o) ? "bg-brand-500 text-white" : "border border-gray-300 dark:border-gray-700")}>
                {values.includes(o) && <Check className="h-3 w-3" />}
              </span>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchableSelect({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[];
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="input flex items-center justify-between text-left">
        <span className={cn(value ? "text-gray-900 dark:text-white" : "text-gray-400")}>{value || "Search..."}</span>
        <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="border-b border-gray-100 p-2 dark:border-gray-800">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} autoFocus placeholder="Type to filter..." className="w-full rounded-md border-0 bg-gray-50 py-2 pl-8 pr-2 text-sm outline-none dark:bg-gray-800" />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto p-1">
            {filtered.length === 0 ? <p className="px-2 py-3 text-center text-xs text-gray-400">No matches</p> :
              filtered.map((o) => (
                <button key={o} onClick={() => { onChange(o); setOpen(false); }} className={cn("flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
                  value === o ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                )}>
                  {o}
                  {value === o && <Check className="h-4 w-4" />}
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default function SelectsPage() {
  const [simple, setSimple] = useState("");
  const [multi, setMulti] = useState<string[]>(["Option A", "Option C"]);
  const [searchable, setSearchable] = useState("");
  const [grouped, setGrouped] = useState("");
  const [avatar, setAvatar] = useState(1);
  const [icon, setIcon] = useState("fe");
  const [native, setNative] = useState("");

  return (
    <div className="space-y-4">
      <PageHeader
        title="Select Dropdowns"
        description="Single, multi, searchable, grouped, and avatar/icon variants."
        breadcrumbs={[{ label: "Forms" }, { label: "Selects" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Single Select" description="Native and custom variants" />
          <CardBody className="space-y-4">
            <div>
              <Label>Native select</Label>
              <Select value={native} onChange={(e) => setNative(e.target.value)}>
                <option value="" disabled>Choose...</option>
                {OPTIONS_SIMPLE.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            </div>
            <div>
              <Label>Custom single select</Label>
              <SingleSelect value={simple} onChange={setSimple} options={OPTIONS_SIMPLE} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Multi Select" description="Select multiple options as chips" />
          <CardBody className="space-y-2">
            <Label>Choose multiple</Label>
            <MultiSelect values={multi} onChange={setMulti} options={OPTIONS_SIMPLE} />
            <p className="text-xs text-gray-500 dark:text-gray-400">{multi.length} of {OPTIONS_SIMPLE.length} selected</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Searchable Select" description="Filter options by typing" />
          <CardBody className="space-y-2">
            <Label>Search country</Label>
            <SearchableSelect value={searchable} onChange={setSearchable} options={[...OPTIONS_GROUPED.flatMap((g) => g.items)]} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Grouped Options" description="Categorize options with labels" />
          <CardBody className="space-y-2">
            <Label>Pick a country</Label>
            <Select value={grouped} onChange={(e) => setGrouped(e.target.value)}>
              <option value="" disabled>Select country...</option>
              {OPTIONS_GROUPED.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.items.map((i) => <option key={i} value={i}>{i}</option>)}
                </optgroup>
              ))}
            </Select>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="With Avatars" description="Select a team member" />
          <CardBody>
            <Label>Assign to</Label>
            <div className="space-y-1.5">
              {OPTIONS_AVATARS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setAvatar(m.id)}
                  className={cn("flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-colors",
                    avatar === m.id ? "border-brand-300 bg-brand-50/40 dark:border-brand-700 dark:bg-brand-500/10" : "border-gray-200 hover:border-brand-300 dark:border-gray-800"
                  )}
                >
                  <Avatar name={m.name} size={32} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{m.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{m.email}</p>
                  </div>
                  <Badge tone={m.role === "Admin" ? "warning" : m.role === "Editor" ? "brand" : "purple"} variant="soft">{m.role}</Badge>
                  {avatar === m.id && <Check className="h-4 w-4 text-brand-500" />}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="With Icons" description="Select a category" />
          <CardBody>
            <Label>Category</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {OPTIONS_ICONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setIcon(o.id)}
                  className={cn("flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors",
                    icon === o.id ? "border-brand-300 bg-brand-50/40 text-brand-700 dark:border-brand-700 dark:bg-brand-500/10 dark:text-brand-300" : "border-gray-200 text-gray-700 hover:border-brand-300 dark:border-gray-800 dark:text-gray-300"
                  )}
                >
                  <o.icon className="h-5 w-5" />
                  <span className="text-xs font-semibold">{o.label}</span>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
