import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { InputIcon } from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "Form Layouts",
  description:
    "Helios Pro — vertical, horizontal, inline, 2-col, 3-col, sectioned and sidebar-style form layouts.",
};

export default function FormLayoutsPage() {
  return (
    <div>
      <PageHeader
        title="Form Layouts"
        description="Vertical, horizontal, inline, multi-column, sectioned and sidebar arrangements."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Form Layouts" },
        ]}
        actions={
          <Badge variant="primary" size="lg">
            <InputIcon className="size-4" /> 7 layouts
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* vertical */}
        <FormSection title="Vertical layout" description="Labels stacked above inputs — the default." columns={1}>
          <FormField label="Full name" htmlFor="v-name" required>
            <input id="v-name" type="text" placeholder="Aarav Mehta" className={inputClass} />
          </FormField>
          <FormField label="Email" htmlFor="v-email" required>
            <input id="v-email" type="email" placeholder="you@heliospro.io" className={inputClass} />
          </FormField>
          <FormField label="Role" htmlFor="v-role">
            <select id="v-role" className={inputClass} defaultValue="owner">
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </FormField>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="md">Cancel</Button>
            <Button variant="primary" size="md">Save</Button>
          </div>
        </FormSection>

        {/* horizontal */}
        <FormSection title="Horizontal layout" description="Labels aligned left of inputs — great for desktop." columns={1}>
          {[
            { label: "First name", id: "h-first", placeholder: "Daniel", type: "text" },
            { label: "Last name", id: "h-last", placeholder: "Okafor", type: "text" },
            { label: "Email", id: "h-email", placeholder: "daniel@heliospro.io", type: "email" },
            { label: "Phone", id: "h-phone", placeholder: "(415) 555-0199", type: "tel" },
          ].map((row) => (
            <div key={row.id} className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[160px_1fr]">
              <label htmlFor={row.id} className="text-sm font-medium text-dark dark:text-white">
                {row.label}
              </label>
              <input
                id={row.id}
                type={row.type}
                placeholder={row.placeholder}
                className={inputClass}
              />
            </div>
          ))}
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[160px_1fr]">
            <span className="text-sm font-medium text-dark dark:text-white">Preferences</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                <input type="checkbox" defaultChecked className="size-4 rounded border-stroke accent-[var(--color-primary)]" /> Newsletter
              </label>
              <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                <input type="checkbox" defaultChecked className="size-4 rounded border-stroke accent-[var(--color-primary)]" /> Product updates
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[160px_1fr]">
            <span />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="md">Cancel</Button>
              <Button variant="primary" size="md">Save changes</Button>
            </div>
          </div>
        </FormSection>

        {/* inline */}
        <FormSection title="Inline form" description="Single-row search-and-action pattern." columns={1}>
          <form className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="in-name" className="sr-only">Name</label>
              <input id="in-name" type="text" placeholder="Search by customer name…" className={inputClass} />
            </div>
            <div className="sm:w-40">
              <label htmlFor="in-status" className="sr-only">Status</label>
              <select id="in-status" className={inputClass} defaultValue="all">
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="churned">Churned</option>
              </select>
            </div>
            <Button variant="primary" size="md" type="submit">Search</Button>
            <Button variant="outline" size="md" type="reset">Reset</Button>
          </form>
        </FormSection>

        {/* 2-col */}
        <FormSection title="Two-column layout" description="Pairs of fields side-by-side on >= sm." columns={2}>
          <FormField label="First name" htmlFor="two-first">
            <input id="two-first" type="text" placeholder="Priya" className={inputClass} />
          </FormField>
          <FormField label="Last name" htmlFor="two-last">
            <input id="two-last" type="text" placeholder="Sharma" className={inputClass} />
          </FormField>
          <FormField label="Email" htmlFor="two-email">
            <input id="two-email" type="email" placeholder="priya@heliospro.io" className={inputClass} />
          </FormField>
          <FormField label="Phone" htmlFor="two-phone">
            <input id="two-phone" type="tel" placeholder="(415) 555-0148" className={inputClass} />
          </FormField>
          <FormField label="City" htmlFor="two-city">
            <input id="two-city" type="text" placeholder="San Francisco" className={inputClass} />
          </FormField>
          <FormField label="Country" htmlFor="two-country">
            <select id="two-country" className={inputClass} defaultValue="us">
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="in">India</option>
            </select>
          </FormField>
        </FormSection>

        {/* 3-col */}
        <FormSection title="Three-column layout" description="Wide-screen only — collapses on smaller viewports." columns={3}>
          <FormField label="SKU" htmlFor="three-sku">
            <input id="three-sku" type="text" placeholder="HLP-001" className={inputClass} />
          </FormField>
          <FormField label="Name" htmlFor="three-name">
            <input id="three-name" type="text" placeholder="Aurora headset" className={inputClass} />
          </FormField>
          <FormField label="Category" htmlFor="three-cat">
            <select id="three-cat" className={inputClass} defaultValue="audio">
              <option value="audio">Audio</option>
              <option value="wearables">Wearables</option>
              <option value="video">Video</option>
            </select>
          </FormField>
          <FormField label="Price (USD)" htmlFor="three-price">
            <input id="three-price" type="number" placeholder="129.00" className={inputClass} />
          </FormField>
          <FormField label="Stock" htmlFor="three-stock">
            <input id="three-stock" type="number" placeholder="482" className={inputClass} />
          </FormField>
          <FormField label="Status" htmlFor="three-status">
            <select id="three-status" className={inputClass} defaultValue="active">
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </FormField>
        </FormSection>

        {/* sectioned */}
        <Card className="xl:col-span-2">
          <CardHeader
            title="Sectioned form"
            subtitle="Group fields into labelled sections — perfect for long forms like onboarding."
            action={<Badge variant="outline">3 sections</Badge>}
          />
          <div className="space-y-6">
            <FormSection title="1. Account" description="Login credentials." columns={2}>
              <FormField label="Email" htmlFor="sec-email" required>
                <input id="sec-email" type="email" placeholder="you@heliospro.io" className={inputClass} />
              </FormField>
              <FormField label="Password" htmlFor="sec-pw" required>
                <input id="sec-pw" type="password" placeholder="••••••••" className={inputClass} />
              </FormField>
            </FormSection>
            <FormSection title="2. Profile" description="Tell us a bit about you." columns={2}>
              <FormField label="Full name" htmlFor="sec-name">
                <input id="sec-name" type="text" placeholder="Sofia Rossi" className={inputClass} />
              </FormField>
              <FormField label="Job title" htmlFor="sec-title">
                <input id="sec-title" type="text" placeholder="Head of Growth" className={inputClass} />
              </FormField>
              <FormField label="Bio" htmlFor="sec-bio" hint="Up to 280 characters.">
                <textarea id="sec-bio" rows={3} placeholder="Short intro…" className={`${inputClass} resize-y`} />
              </FormField>
              <FormField label="Timezone" htmlFor="sec-tz">
                <select id="sec-tz" className={inputClass} defaultValue="pst">
                  <option value="pst">PST (UTC-8)</option>
                  <option value="est">EST (UTC-5)</option>
                  <option value="gmt">GMT (UTC+0)</option>
                  <option value="cet">CET (UTC+1)</option>
                  <option value="ist">IST (UTC+5:30)</option>
                  <option value="jst">JST (UTC+9)</option>
                </select>
              </FormField>
            </FormSection>
            <FormSection title="3. Preferences" description="How should we reach you?" columns={3}>
              <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                  <input type="checkbox" defaultChecked className="size-4 rounded border-stroke accent-[var(--color-primary)]" /> Email
                </label>
              </div>
              <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                  <input type="checkbox" defaultChecked className="size-4 rounded border-stroke accent-[var(--color-primary)]" /> Push
                </label>
              </div>
              <div className="rounded-lg border border-stroke p-3 dark:border-dark-3">
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white">
                  <input type="checkbox" className="size-4 rounded border-stroke accent-[var(--color-primary)]" /> SMS
                </label>
              </div>
            </FormSection>
            <div className="flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
              <Button variant="ghost" size="md">Cancel</Button>
              <Button variant="primary" size="md">Complete onboarding</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* sidebar form */}
      <Card className="mt-6">
        <CardHeader
          title="Sidebar form"
          subtitle="Settings panel: left navigation, right content — a classic two-pane layout."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
          {/* sidebar nav */}
          <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col md:overflow-visible">
            {[
              { label: "General", active: true },
              { label: "Profile" },
              { label: "Security" },
              { label: "Notifications" },
              { label: "Billing" },
              { label: "Danger zone" },
            ].map((n) => (
              <a
                key={n.label}
                href="#"
                className={
                  n.active
                    ? "rounded-lg bg-primary-subtle px-3 py-2 text-sm font-medium text-primary dark:bg-primary/15"
                    : "rounded-lg px-3 py-2 text-sm text-dark-5 transition hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-white/5"
                }
              >
                {n.label}
              </a>
            ))}
          </nav>
          {/* content */}
          <FormSection title="General settings" description="Workspace name, default language and timezone." columns={2}>
            <FormField label="Workspace name" htmlFor="sb-name">
              <input id="sb-name" type="text" defaultValue="Helios Pro" className={inputClass} />
            </FormField>
            <FormField label="URL" htmlFor="sb-url">
              <input id="sb-url" type="text" defaultValue="heliospro.io" className={inputClass} />
            </FormField>
            <FormField label="Default language" htmlFor="sb-lang">
              <select id="sb-lang" className={inputClass} defaultValue="en">
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="ja">日本語</option>
              </select>
            </FormField>
            <FormField label="Timezone" htmlFor="sb-tz">
              <select id="sb-tz" className={inputClass} defaultValue="pst">
                <option value="pst">PST (UTC-8)</option>
                <option value="est">EST (UTC-5)</option>
                <option value="gmt">GMT (UTC+0)</option>
                <option value="jst">JST (UTC+9)</option>
              </select>
            </FormField>
            <div className="col-span-full flex justify-end gap-2">
              <Button variant="ghost" size="md">Discard</Button>
              <Button variant="primary" size="md">Save changes</Button>
            </div>
          </FormSection>
        </div>
      </Card>
    </div>
  );
}
