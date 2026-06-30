"use client";

import { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import type { Instance } from "flatpickr/dist/types/instance";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { CalendarPlusIcon } from "@/components/Layouts/sidebar/icons";

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const PRESETS = [
  { label: "Today", getValue: () => [new Date()] },
  { label: "Yesterday", getValue: () => [new Date(Date.now() - 86400000)] },
  { label: "Last 7 days", getValue: () => [new Date(Date.now() - 7 * 86400000), new Date()] },
  { label: "Last 30 days", getValue: () => [new Date(Date.now() - 30 * 86400000), new Date()] },
  { label: "This month", getValue: () => [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()] },
  { label: "This quarter", getValue: () => {
    const m = new Date().getMonth();
    const q = Math.floor(m / 3) * 3;
    return [new Date(new Date().getFullYear(), q, 1), new Date()];
  } },
] as const;

const fmtDate = (d: Date | null | undefined) =>
  d
    ? d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "—";

export default function DatePickerClient() {
  /* single */
  const singleRef = useRef<HTMLInputElement | null>(null);
  const singleInst = useRef<Instance | null>(null);
  const [singleVal, setSingleVal] = useState<Date | null>(null);

  /* range */
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const rangeInst = useRef<Instance | null>(null);
  const [rangeVal, setRangeVal] = useState<Date[]>([]);

  /* time */
  const timeRef = useRef<HTMLInputElement | null>(null);
  const timeInst = useRef<Instance | null>(null);
  const [timeVal, setTimeVal] = useState<Date | null>(null);

  /* inline */
  const inlineRef = useRef<HTMLDivElement | null>(null);
  const inlineInst = useRef<Instance | null>(null);
  const [inlineVal, setInlineVal] = useState<Date | null>(null);

  useEffect(() => {
    if (singleRef.current) {
      singleInst.current = flatpickr(singleRef.current, {
        mode: "single",
        dateFormat: "M j, Y",
        onChange: (dates) => setSingleVal(dates[0] ?? null),
      });
    }
    if (rangeRef.current) {
      rangeInst.current = flatpickr(rangeRef.current, {
        mode: "range",
        dateFormat: "M j, Y",
        onChange: (dates) => setRangeVal(dates),
      });
    }
    if (timeRef.current) {
      timeInst.current = flatpickr(timeRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        onChange: (dates) => setTimeVal(dates[0] ?? null),
      });
    }
    if (inlineRef.current) {
      inlineInst.current = flatpickr(inlineRef.current, {
        inline: true,
        mode: "single",
        dateFormat: "M j, Y",
        onChange: (dates) => setInlineVal(dates[0] ?? null),
      });
    }
    return () => {
      singleInst.current?.destroy();
      rangeInst.current?.destroy();
      timeInst.current?.destroy();
      inlineInst.current?.destroy();
    };
  }, []);

  const applyPreset = (idx: number) => {
    const dates = PRESETS[idx].getValue();
    if (dates.length === 2) {
      rangeInst.current?.setDate(dates);
      setRangeVal(dates);
    } else if (dates.length === 1) {
      singleInst.current?.setDate(dates[0]);
      setSingleVal(dates[0]);
      rangeInst.current?.setDate(dates);
      setRangeVal(dates);
    }
  };

  const rangeDays =
    rangeVal.length === 2
      ? Math.round((rangeVal[1].getTime() - rangeVal[0].getTime()) / 86400000) + 1
      : null;

  return (
    <div>
      <PageHeader
        title="Date Picker"
        description="Single, range, time, inline calendar and quick presets — powered by flatpickr."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Date Picker" },
        ]}
        actions={
          <Badge variant="primary" size="lg">
            <CalendarPlusIcon className="size-4" /> 5 variants
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* single */}
        <FormSection title="Single date" description="Pick a single date with a calendar dropdown." columns={1}>
          <FormField label="Release date" htmlFor="dp-single" hint="Date format: M j, Y">
            <input ref={singleRef} id="dp-single" type="text" readOnly placeholder="Pick a date" className={inputClass} />
          </FormField>
          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            Selected: <span className="font-mono text-primary">{fmtDate(singleVal)}</span>
          </div>
        </FormSection>

        {/* range */}
        <FormSection title="Date range" description="Choose a start and end date." columns={1}>
          <FormField label="Reporting window" htmlFor="dp-range" hint="Click two dates to set a range.">
            <input ref={rangeRef} id="dp-range" type="text" readOnly placeholder="Start — End" className={inputClass} />
          </FormField>
          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            Range: <span className="font-mono text-primary">{rangeVal.length === 2 ? `${fmtDate(rangeVal[0])} → ${fmtDate(rangeVal[1])}` : "—"}</span>
            {rangeDays && <span className="ml-2">({rangeDays} days)</span>}
          </div>
        </FormSection>

        {/* time */}
        <FormSection title="Time picker" description="24-hour time, no calendar." columns={1}>
          <FormField label="Standup time" htmlFor="dp-time" hint="Format: HH:mm (24h)">
            <input ref={timeRef} id="dp-time" type="text" readOnly placeholder="Pick a time" className={inputClass} />
          </FormField>
          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            Time: <span className="font-mono text-primary">{timeVal ? timeVal.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "—"}</span>
          </div>
        </FormSection>

        {/* inline calendar */}
        <FormSection title="Inline calendar" description="Always-open calendar with no input field." columns={1}>
          <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
            <div ref={inlineRef} className="flatpickr-inline" />
          </div>
          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            Selected: <span className="font-mono text-primary">{fmtDate(inlineVal)}</span>
          </div>
        </FormSection>
      </div>

      {/* presets */}
      <Card className="mt-6">
        <CardHeader
          title="Quick presets"
          subtitle="One-click shortcuts that populate the single + range pickers above."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {PRESETS.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(i)}
              className="rounded-xl border border-stroke bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-primary hover:shadow-card-2 dark:border-dark-3 dark:bg-dark-2"
            >
              <p className="text-sm font-semibold text-dark dark:text-white">{p.label}</p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                {p.getValue().length === 2
                  ? `${fmtDate(p.getValue()[0])} – ${fmtDate(p.getValue()[1])}`
                  : fmtDate(p.getValue()[0])}
              </p>
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
          <span>
            Current range:{" "}
            <span className="font-mono text-primary">
              {rangeVal.length === 2 ? `${fmtDate(rangeVal[0])} → ${fmtDate(rangeVal[1])}` : "—"}
            </span>
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                singleInst.current?.clear();
                rangeInst.current?.clear();
                setSingleVal(null);
                setRangeVal([]);
              }}
            >
              Clear all
            </Button>
            <Button variant="primary" size="sm">
              Apply selection
            </Button>
          </div>
        </div>
      </Card>

      {/* states */}
      <Card className="mt-6">
        <CardHeader title="Field states" subtitle="Disabled, error and success treatments for date fields." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Disabled</label>
            <input type="text" disabled value="Locked by admin" readOnly className={classNames(inputClass, "opacity-60")} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Error</label>
            <input type="text" readOnly value="" placeholder="Required" className={classNames(inputClass, "border-red ring-2 ring-red/20")} />
            <p className="mt-1 text-xs text-red">Please pick a date.</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Success</label>
            <input type="text" readOnly value={fmtDate(new Date())} className={classNames(inputClass, "border-primary ring-2 ring-primary/20")} />
            <p className="mt-1 text-xs text-primary">Date confirmed.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
