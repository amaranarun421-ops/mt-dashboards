"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Input, Label, Select, Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

export default function LayoutsPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Form Layouts"
        description="Single column, two-column, grid, horizontal, inline, sectioned, and wizard forms."
        breadcrumbs={[{ label: "Forms" }, { label: "Layouts" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Single column */}
        <Card>
          <CardHeader title="Single Column" description="Stacked fields, full width" />
          <CardBody className="space-y-4">
            <div><Label required>Full name</Label><Input placeholder="John Doe" /></div>
            <div><Label required>Email</Label><Input type="email" placeholder="you@company.com" /></div>
            <div><Label>Company</Label><Input placeholder="Nimbus Labs" /></div>
            <div><Label>Message</Label><Input placeholder="How can we help?" /></div>
            <Button className="w-full">Submit</Button>
          </CardBody>
        </Card>

        {/* Two column */}
        <Card>
          <CardHeader title="Two Column" description="Side-by-side fields" />
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>First name</Label><Input placeholder="John" /></div>
              <div><Label>Last name</Label><Input placeholder="Doe" /></div>
              <div><Label>Email</Label><Input type="email" placeholder="john@doe.com" /></div>
              <div><Label>Phone</Label><Input placeholder="+1 (415) 555-0142" /></div>
              <div><Label>City</Label><Input placeholder="Mumbai" /></div>
              <div><Label>Country</Label><Select><option>India</option><option>USA</option></Select></div>
            </div>
            <Button className="w-full">Save</Button>
          </CardBody>
        </Card>

        {/* Three column */}
        <Card>
          <CardHeader title="Three Column" description="Compact grid layout" />
          <CardBody className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div><Label>SKU</Label><Input placeholder="AUR-001" /></div>
              <div><Label>Price</Label><Input type="number" placeholder="$0" /></div>
              <div><Label>Stock</Label><Input type="number" placeholder="0" /></div>
              <div><Label>Weight</Label><Input type="number" placeholder="0g" /></div>
              <div><Label>Length</Label><Input type="number" placeholder="0cm" /></div>
              <div><Label>Width</Label><Input type="number" placeholder="0cm" /></div>
            </div>
            <Button>Save product</Button>
          </CardBody>
        </Card>

        {/* Horizontal */}
        <Card>
          <CardHeader title="Horizontal Form" description="Labels on the left" />
          <CardBody className="space-y-4">
            {[
              { label: "Name", placeholder: "John Doe" },
              { label: "Email", placeholder: "john@doe.com" },
              { label: "Phone", placeholder: "+1 555 0142" },
              { label: "Role", placeholder: "Admin" },
            ].map((f) => (
              <div key={f.label} className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[120px_minmax(0,1fr)]">
                <Label className="mb-0">{f.label}</Label>
                <Input placeholder={f.placeholder} />
              </div>
            ))}
            <div className="flex justify-end"><Button>Save</Button></div>
          </CardBody>
        </Card>

        {/* Inline form */}
        <Card>
          <CardHeader title="Inline Form" description="Single row of fields" />
          <CardBody>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <div className="flex-1"><Label>Email</Label><Input type="email" placeholder="you@company.com" /></div>
              <div className="flex-1"><Label>Password</Label><Input type="password" placeholder="••••••••" /></div>
              <Button>Sign in</Button>
            </div>
          </CardBody>
        </Card>

        {/* Sectioned */}
        <Card>
          <CardHeader title="Sectioned Form" description="Group related fields" />
          <CardBody className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Personal info</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Input placeholder="First name" />
                <Input placeholder="Last name" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Input type="email" placeholder="Email" />
                <Input placeholder="Phone" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Address</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Input placeholder="Street" />
                <Input placeholder="City" />
              </div>
            </div>
            <div className="flex justify-end"><Button>Save all</Button></div>
          </CardBody>
        </Card>

        {/* Grid form */}
        <Card>
          <CardHeader title="Grid Form" description="Mixed-width fields in a grid" />
          <CardBody>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div className="sm:col-span-2"><Label>Full name</Label><Input placeholder="John Doe" /></div>
              <div className="sm:col-span-2"><Label>Email</Label><Input type="email" placeholder="john@doe.com" /></div>
              <div className="sm:col-span-1"><Label>Code</Label><Input placeholder="+91" /></div>
              <div className="sm:col-span-3"><Label>Phone</Label><Input placeholder="98200 41122" /></div>
              <div className="sm:col-span-4"><Label>Address</Label><Input placeholder="Street, City, Country" /></div>
            </div>
          </CardBody>
        </Card>

        {/* Wizard-like */}
        <Card className="lg:col-span-2">
          <CardHeader title="Wizard Form" description="Multi-step with progress" />
          <CardBody className="space-y-5">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-1 items-center">
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                    step >= s ? "border-brand-500 bg-brand-500 text-white" : "border-gray-200 text-gray-400 dark:border-gray-800"
                  )}>
                    {step > s ? <Check className="h-4 w-4" /> : s}
                  </div>
                  {s < 4 && <div className={cn("h-0.5 flex-1", step > s ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-800")} />}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/40">
              {step === 1 && (
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Username</Label><Input placeholder="aaroh" /></div>
                  <div><Label>Email</Label><Input type="email" placeholder="aaroh@nimbuspro.io" /></div>
                </div>
              )}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>First name</Label><Input placeholder="Aaroh" /></div>
                  <div><Label>Last name</Label><Input placeholder="Sharma" /></div>
                </div>
              )}
              {step === 3 && (
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Card number</Label><Input placeholder="4242 4242 4242 4242" /></div>
                  <div><Label>CVC</Label><Input placeholder="123" /></div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900 dark:text-white">Review your details</p>
                  <p className="text-gray-500 dark:text-gray-400">Username: aaroh</p>
                  <p className="text-gray-500 dark:text-gray-400">Email: aaroh@nimbuspro.io</p>
                  <p className="text-gray-500 dark:text-gray-400">Name: Aaroh Sharma</p>
                  <p className="text-gray-500 dark:text-gray-400">Card: •••• 4242</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" disabled={step === 1} onClick={() => setStep(step - 1)}><ChevronLeft className="h-4 w-4" /> Back</Button>
              <Badge tone="brand" variant="soft">Step {step} of 4</Badge>
              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)}>Next <ChevronRight className="h-4 w-4" /></Button>
              ) : (
                <Button><Check className="h-4 w-4" /> Submit</Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
