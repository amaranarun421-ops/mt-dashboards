"use client";
import { useState } from "react";
import { PageHeader, Card, CardBody, Input, Label, Select, Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, User, Mail, CreditCard, Send } from "lucide-react";

const STEPS = [
  { id: 1, label: "Account", icon: User },
  { id: 2, label: "Personal", icon: Mail },
  { id: 3, label: "Payment", icon: CreditCard },
  { id: 4, label: "Review", icon: Check },
];

export default function MultiStepPage() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("pro");
  const [data, setData] = useState({
    username: "aaroh", email: "aaroh@nimbuspro.io", password: "••••••••",
    firstName: "Aaroh", lastName: "Sharma", country: "India", dob: "1992-04-12",
    card: "4242 4242 4242 4242", expiry: "08/28", cvc: "•••", nameOnCard: "Aaroh Sharma",
  });

  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="space-y-4">
      <PageHeader
        title="Multi-Step Form"
        description="A 4-step wizard with account, personal, payment, and review stages."
        breadcrumbs={[{ label: "Forms" }, { label: "Multi-Step" }]}
      />

      <Card>
        <CardBody className="space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all",
                    step > s.id ? "border-success-500 bg-success-500 text-white" :
                    step === s.id ? "border-brand-500 bg-brand-500 text-white" :
                    "border-gray-200 text-gray-400 dark:border-gray-800"
                  )}>
                    {step > s.id ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                  </div>
                  <span className={cn("text-xs font-semibold", step >= s.id ? "text-gray-900 dark:text-white" : "text-gray-400")}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("mx-3 h-0.5 flex-1 rounded-full", step > s.id ? "bg-success-500" : "bg-gray-200 dark:bg-gray-800")} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="min-h-[260px]">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"><User className="h-5 w-5" /></div>
                  <div><p className="text-sm font-semibold text-gray-900 dark:text-white">Account information</p><p className="text-xs text-gray-500 dark:text-gray-400">Set up your login credentials</p></div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><Label required>Username</Label><Input value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} /></div>
                  <div><Label required>Email</Label><Input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label required>Password</Label><Input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} /></div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400"><Mail className="h-5 w-5" /></div>
                  <div><p className="text-sm font-semibold text-gray-900 dark:text-white">Personal information</p><p className="text-xs text-gray-500 dark:text-gray-400">Tell us about yourself</p></div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><Label required>First name</Label><Input value={data.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })} /></div>
                  <div><Label required>Last name</Label><Input value={data.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })} /></div>
                  <div>
                    <Label required>Country</Label>
                    <Select value={data.country} onChange={(e) => setData({ ...data, country: e.target.value })}>
                      <option>India</option><option>United States</option><option>United Kingdom</option><option>Germany</option>
                    </Select>
                  </div>
                  <div><Label>Date of birth</Label><Input type="date" value={data.dob} onChange={(e) => setData({ ...data, dob: e.target.value })} /></div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400"><CreditCard className="h-5 w-5" /></div>
                  <div><p className="text-sm font-semibold text-gray-900 dark:text-white">Payment details</p><p className="text-xs text-gray-500 dark:text-gray-400">Choose a plan and enter card info</p></div>
                </div>
                <div>
                  <Label>Select a plan</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "free", label: "Free", price: "$0" },
                      { id: "pro", label: "Pro", price: "$49" },
                      { id: "enterprise", label: "Enterprise", price: "$199" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPlan(p.id)}
                        className={cn("rounded-xl border p-3 text-center transition-all",
                          plan === p.id ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-brand-300 dark:border-gray-800"
                        )}
                      >
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{p.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{p.price}/mo</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label required>Card number</Label><Input value={data.card} onChange={(e) => setData({ ...data, card: e.target.value })} className="font-mono" /></div>
                  <div><Label>Name on card</Label><Input value={data.nameOnCard} onChange={(e) => setData({ ...data, nameOnCard: e.target.value })} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Expiry</Label><Input value={data.expiry} onChange={(e) => setData({ ...data, expiry: e.target.value })} /></div>
                    <div><Label>CVC</Label><Input value={data.cvc} onChange={(e) => setData({ ...data, cvc: e.target.value })} /></div>
                  </div>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400"><Check className="h-5 w-5" /></div>
                  <div><p className="text-sm font-semibold text-gray-900 dark:text-white">Review and submit</p><p className="text-xs text-gray-500 dark:text-gray-400">Confirm your details below</p></div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Account", icon: User, items: [["Username", data.username], ["Email", data.email]] },
                    { label: "Personal", icon: Mail, items: [["Name", `${data.firstName} ${data.lastName}`], ["Country", data.country], ["DOB", data.dob]] },
                    { label: "Payment", icon: CreditCard, items: [["Plan", plan], ["Card", data.card], ["Expiry", data.expiry]] },
                  ].map((section) => (
                    <div key={section.label} className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <section.icon className="h-3.5 w-3.5" /> {section.label}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {section.items.map(([k, v]) => (
                          <div key={k}>
                            <p className="text-[11px] text-gray-400">{k}</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
            <Button variant="outline" disabled={step === 1} onClick={prev}><ChevronLeft className="h-4 w-4" /> Back</Button>
            <div className="flex items-center gap-2">
              <Badge tone="brand" variant="soft">Step {step} of 4</Badge>
            </div>
            {step < 4 ? (
              <Button onClick={next}>Continue <ChevronRight className="h-4 w-4" /></Button>
            ) : (
              <Button><Send className="h-4 w-4" /> Submit</Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
