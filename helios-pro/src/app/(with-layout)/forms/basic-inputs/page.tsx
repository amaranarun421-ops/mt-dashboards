import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { InputIcon } from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "Basic Inputs",
  description:
    "Helios Pro — text, email, password, number and textarea inputs rendered in default, focused, disabled, error and success states.",
};

export default function BasicInputsPage() {
  return (
    <div>
      <PageHeader
        title="Basic Inputs"
        description="Text, email, password, number and textarea controls across every interactive state."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Basic Inputs" },
        ]}
        actions={
          <Badge variant="primary" size="lg">
            <InputIcon className="size-4" /> 5 field types
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Text inputs */}
        <FormSection
          title="Text inputs"
          description="Standard single-line text fields with validation feedback."
          columns={1}
        >
          <FormField label="Default" htmlFor="txt-default" hint="Neutral state — ready for input.">
            <input id="txt-default" type="text" placeholder="Helios Pro user" className={inputClass} />
          </FormField>
          <FormField label="Focused" htmlFor="txt-focus" hint="Rings appear when the field has focus.">
            <input
              id="txt-focus"
              type="text"
              defaultValue="Aarav Mehta"
              className={`${inputClass} border-primary ring-2 ring-primary/20`}
            />
          </FormField>
          <FormField label="Disabled" htmlFor="txt-disabled" hint="Disabled fields are not editable.">
            <input id="txt-disabled" type="text" placeholder="Read-only" disabled className={`${inputClass} opacity-60`} />
          </FormField>
          <FormField label="Error" htmlFor="txt-error" error="This field is required.">
            <input
              id="txt-error"
              type="text"
              placeholder="Required value"
              className={`${inputClass} border-red ring-2 ring-red/20 focus:border-red focus:ring-red/20`}
            />
          </FormField>
          <FormField label="Success" htmlFor="txt-success" hint="Looks good — value validated.">
            <input
              id="txt-success"
              type="text"
              defaultValue="helios-pro"
              className={`${inputClass} border-primary ring-2 ring-primary/20 focus:border-primary focus:ring-primary/20`}
            />
          </FormField>
        </FormSection>

        {/* Email + Password */}
        <FormSection
          title="Email & password"
          description="Email formatting and password entry."
          columns={1}
        >
          <FormField label="Email — default" htmlFor="email-default" hint="We never share your email.">
            <input id="email-default" type="email" placeholder="you@heliospro.io" className={inputClass} />
          </FormField>
          <FormField label="Email — success" htmlFor="email-success" hint="Verified format.">
            <input
              id="email-success"
              type="email"
              defaultValue="priya@heliospro.io"
              className={`${inputClass} border-primary ring-2 ring-primary/20`}
            />
          </FormField>
          <FormField label="Email — error" htmlFor="email-error" error="Enter a valid email address.">
            <input
              id="email-error"
              type="email"
              defaultValue="priya@helios"
              className={`${inputClass} border-red ring-2 ring-red/20 focus:border-red focus:ring-red/20`}
            />
          </FormField>
          <FormField label="Password — default" htmlFor="pw-default">
            <input id="pw-default" type="password" placeholder="••••••••" className={inputClass} />
          </FormField>
          <FormField label="Password — disabled" htmlFor="pw-disabled" hint="Locked by SSO policy.">
            <input
              id="pw-disabled"
              type="password"
              defaultValue="••••••••"
              disabled
              className={`${inputClass} opacity-60`}
            />
          </FormField>
        </FormSection>

        {/* Number inputs */}
        <FormSection
          title="Number inputs"
          description="Numeric entry with min/max constraints and stepper controls."
          columns={2}
        >
          <FormField label="Quantity" htmlFor="num-qty" hint="Min 1, max 99.">
            <input id="num-qty" type="number" min={1} max={99} defaultValue={12} className={inputClass} />
          </FormField>
          <FormField label="Price (USD)" htmlFor="num-price">
            <input id="num-price" type="number" min={0} step="0.01" defaultValue={129.5} className={inputClass} />
          </FormField>
          <FormField label="Discount %" htmlFor="num-disc" error="Must be between 0 and 100.">
            <input
              id="num-disc"
              type="number"
              defaultValue={120}
              className={`${inputClass} border-red ring-2 ring-red/20 focus:border-red focus:ring-red/20`}
            />
          </FormField>
          <FormField label="Stock units" htmlFor="num-stock" hint="Validated against warehouse capacity.">
            <input
              id="num-stock"
              type="number"
              defaultValue={482}
              className={`${inputClass} border-primary ring-2 ring-primary/20`}
            />
          </FormField>
        </FormSection>

        {/* Textarea */}
        <FormSection
          title="Textarea fields"
          description="Multi-line input for notes, bios and long-form content."
          columns={1}
        >
          <FormField label="Default textarea" htmlFor="ta-default" hint="Up to 500 characters.">
            <textarea
              id="ta-default"
              rows={3}
              placeholder="Add a note about this customer..."
              className={`${inputClass} resize-y`}
            />
          </FormField>
          <FormField label="Focused textarea" htmlFor="ta-focus">
            <textarea
              id="ta-focus"
              rows={3}
              defaultValue="Followed up on the Q3 enterprise renewal — Aarav confirmed budget approval."
              className={`${inputClass} resize-y border-primary ring-2 ring-primary/20`}
            />
          </FormField>
          <FormField label="Disabled textarea" htmlFor="ta-disabled">
            <textarea
              id="ta-disabled"
              rows={3}
              placeholder="Locked"
              disabled
              className={`${inputClass} resize-y opacity-60`}
            />
          </FormField>
          <FormField label="Error textarea" htmlFor="ta-error" error="Description must be at least 20 characters.">
            <textarea
              id="ta-error"
              rows={3}
              defaultValue="too short"
              className={`${inputClass} resize-y border-red ring-2 ring-red/20 focus:border-red focus:ring-red/20`}
            />
          </FormField>
        </FormSection>
      </div>

      <Card className="mt-6">
        <CardHeader
          title="Field state reference"
          subtitle="A quick cheat-sheet of the visual treatments used across this page."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Default", tone: "border-stroke dark:border-dark-3", desc: "Neutral border." },
            { label: "Focused", tone: "border-primary ring-2 ring-primary/20", desc: "Emerald ring." },
            { label: "Disabled", tone: "opacity-60", desc: "Greyed-out, non-editable." },
            { label: "Error", tone: "border-red ring-2 ring-red/20", desc: "Red border + message." },
            { label: "Success", tone: "border-primary ring-2 ring-primary/20", desc: "Emerald border." },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg border ${s.tone} bg-white p-3 dark:bg-dark-2`}>
              <p className="text-sm font-semibold text-dark dark:text-white">{s.label}</p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{s.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
