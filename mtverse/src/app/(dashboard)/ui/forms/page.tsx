"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  User, MapPin, SlidersHorizontal, CheckCircle2, ChevronLeft, ChevronRight,
  Mail, Globe, Phone, Lock, Calendar, Send, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Address", icon: MapPin },
  { id: 3, name: "Preferences", icon: SlidersHorizontal },
  { id: 4, name: "Review", icon: CheckCircle2 },
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  street: string;
  city: string;
  country: string;
  zip: string;
  plan: string;
  volume: number;
  newsletter: boolean;
  terms: boolean;
  notes: string;
};

export default function FormsPage() {
  const [step, setStep] = React.useState(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState<FormState>({
    fullName: "Alex Morgan",
    email: "alex@mtverse.io",
    phone: "+1 (415) 555-0182",
    password: "",
    street: "742 Market Street, Suite 1200",
    city: "San Francisco",
    country: "United States",
    zip: "94102",
    plan: "pro",
    volume: 60,
    newsletter: true,
    terms: false,
    notes: "",
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const errors: Partial<Record<keyof FormState, string>> = {};
  if (step === 1) {
    if (!form.fullName.trim()) errors.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
    if (form.password.length > 0 && form.password.length < 8) errors.password = "Password must be at least 8 characters.";
  }
  if (step === 2) {
    if (!form.street.trim()) errors.street = "Street address is required.";
    if (!form.city.trim()) errors.city = "City is required.";
    if (!form.zip.trim()) errors.zip = "ZIP / Postal code is required.";
  }
  if (step === 4 && !form.terms) errors.terms = "You must accept the terms to continue.";

  const next = () => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the highlighted fields before continuing.");
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    if (!form.terms) {
      toast.error("Please accept the terms before submitting.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Account created for ${form.fullName}`, {
        description: `A confirmation email was sent to ${form.email}.`,
      });
      setStep(1);
    }, 1100);
  };

  const progress = (step / 4) * 100;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Advanced Forms"
        description="Multi-step form with progress indicator, validation, and full input coverage across the MTVerse design system."
        breadcrumbs={[{ label: "UI Library" }, { label: "Forms" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Checkout Wizard" description="Personal Info → Address → Preferences → Review" className="lg:col-span-2">
          <div className="space-y-6">
            {/* Stepper */}
            <div className="flex items-center justify-between">
              {steps.map((s, i) => {
                const active = step === s.id;
                const done = step > s.id;
                const Icon = s.icon;
                return (
                  <div key={s.id} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={
                          "flex size-9 items-center justify-center rounded-full border-2 transition-colors " +
                          (done
                            ? "border-success bg-success text-success-foreground"
                            : active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-muted-foreground")
                        }
                      >
                        {done ? <CheckCircle2 className="size-4" /> : <Icon className="size-4" />}
                      </div>
                      <span className={"text-[11px] font-medium " + (active || done ? "text-foreground" : "text-muted-foreground")}>
                        {s.name}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-2 bg-border rounded-full overflow-hidden">
                        <div
                          className={"h-full transition-all duration-500 " + (done ? "bg-success w-full" : "bg-transparent w-0")}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground">Step {step} of 4</span>
                <span className="font-medium">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>

            {/* Step content */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="size-3" />{errors.fullName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="size-3" />{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input id="phone" className="pl-9" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-9"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      aria-invalid={!!errors.password}
                    />
                  </div>
                  {errors.password ? (
                    <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="size-3" />{errors.password}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Leave blank to keep your current password.</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" value={form.street} onChange={(e) => set("street", e.target.value)} aria-invalid={!!errors.street} />
                  {errors.street && <p className="text-xs text-destructive">{errors.street}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={form.city} onChange={(e) => set("city", e.target.value)} aria-invalid={!!errors.city} />
                  {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" value={form.zip} onChange={(e) => set("zip", e.target.value)} aria-invalid={!!errors.zip} />
                  {errors.zip && <p className="text-xs text-destructive">{errors.zip}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Country</Label>
                  <Select value={form.country} onValueChange={(v) => set("country", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Japan", "Brazil"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-2">
                  <Label>Subscription Plan</Label>
                  <RadioGroup value={form.plan} onValueChange={(v) => set("plan", v)} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "starter", name: "Starter", price: "$0", desc: "For solo builders" },
                      { id: "pro", name: "Pro", price: "$29", desc: "For growing teams" },
                      { id: "enterprise", name: "Enterprise", price: "Custom", desc: "For orgs" },
                    ].map((p) => (
                      <label
                        key={p.id}
                        htmlFor={`plan-${p.id}`}
                        className={"flex flex-col gap-1 rounded-lg border p-3 cursor-pointer transition-colors " +
                          (form.plan === p.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-accent")}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem id={`plan-${p.id}`} value={p.id} />
                          <span className="text-sm font-semibold">{p.name}</span>
                          <Badge variant="outline" className="ml-auto">{p.price}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground pl-6">{p.desc}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Expected Monthly Volume</Label>
                    <Badge variant="outline">{form.volume}k requests</Badge>
                  </div>
                  <Slider value={[form.volume]} onValueChange={(v) => set("volume", v[0])} min={10} max={500} step={10} />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>10k</span><span>250k</span><span>500k</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <Switch id="newsletter" checked={form.newsletter} onCheckedChange={(v) => set("newsletter", v)} />
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletter" className="text-sm cursor-pointer">Product updates newsletter</Label>
                    <p className="text-xs text-muted-foreground">Monthly digest of new features, integrations, and best practices.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    rows={3}
                    placeholder="Anything we should know about your use case?"
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <User className="size-4 text-primary" /> Personal Info
                    <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs" onClick={() => setStep(1)}>Edit</Button>
                  </div>
                  <Separator />
                  <dl className="grid grid-cols-2 gap-y-2 text-xs">
                    <dt className="text-muted-foreground">Name</dt><dd>{form.fullName}</dd>
                    <dt className="text-muted-foreground">Email</dt><dd className="flex items-center gap-1"><Mail className="size-3" />{form.email}</dd>
                    <dt className="text-muted-foreground">Phone</dt><dd>{form.phone}</dd>
                  </dl>
                </div>
                <div className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <MapPin className="size-4 text-primary" /> Address
                    <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs" onClick={() => setStep(2)}>Edit</Button>
                  </div>
                  <Separator />
                  <p className="text-xs text-muted-foreground">
                    {form.street}, {form.city}, {form.zip}, {form.country}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <SlidersHorizontal className="size-4 text-primary" /> Preferences
                    <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs" onClick={() => setStep(3)}>Edit</Button>
                  </div>
                  <Separator />
                  <dl className="grid grid-cols-2 gap-y-2 text-xs">
                    <dt className="text-muted-foreground">Plan</dt><dd className="capitalize">{form.plan}</dd>
                    <dt className="text-muted-foreground">Volume</dt><dd>{form.volume}k / mo</dd>
                    <dt className="text-muted-foreground">Newsletter</dt><dd>{form.newsletter ? "Subscribed" : "Off"}</dd>
                  </dl>
                </div>
                <label className="flex items-start gap-2 rounded-lg border border-border p-3 cursor-pointer">
                  <Checkbox checked={form.terms} onCheckedChange={(v) => set("terms", v === true)} aria-invalid={!!errors.terms} />
                  <span className="text-xs text-muted-foreground">
                    I agree to the <a className="text-primary underline">Terms of Service</a> and <a className="text-primary underline">Privacy Policy</a>.
                  </span>
                </label>
                {errors.terms && <p className="text-xs text-destructive -mt-2">{errors.terms}</p>}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Button variant="ghost" onClick={back} disabled={step === 1}>
                <ChevronLeft className="size-4 mr-1" /> Back
              </Button>
              {step < 4 ? (
                <Button onClick={next}>
                  Continue <ChevronRight className="size-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={submitting}>
                  {submitting ? "Creating account..." : <>Create Account <Send className="size-4 ml-1" /></>}
                </Button>
              )}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Compact Signup" description="Single-screen variant with inline validation">
          <CompactSignup />
        </SectionCard>
      </div>

      <SectionCard title="Inline Field Variants" description="Common input configurations available across the kit.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cf-name">Name</Label>
            <Input id="cf-name" placeholder="Jordan Lee" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cf-url">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input id="cf-url" className="pl-9" placeholder="mtverse.io" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cf-date">Event Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input id="cf-date" type="date" className="pl-9" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cf-ok">Confirmed Email</Label>
            <Input id="cf-ok" defaultValue="alex@mtverse.io" className="border-success/40 focus-visible:ring-success/30" />
            <p className="text-xs text-success flex items-center gap-1"><CheckCircle2 className="size-3" />Email verified</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cf-err">Coupon Code</Label>
            <Input id="cf-err" defaultValue="SUMMER50" aria-invalid className="border-destructive/40 focus-visible:ring-destructive/30" />
            <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="size-3" />Code expired</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cf-disabled">Read-only ID</Label>
            <Input id="cf-disabled" defaultValue="USR-7842-A" disabled />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function CompactSignup() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = name.trim().length > 1 && validEmail && agree;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      toast.error("Please complete all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("You're on the list!", { description: `Confirmation sent to ${email}.` });
      setName(""); setEmail(""); setAgree(false);
    }, 900);
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="space-y-2">
        <Label htmlFor="cs-name">Full name</Label>
        <Input id="cs-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Lee" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cs-email">Work email</Label>
        <Input
          id="cs-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-invalid={email.length > 0 && !validEmail}
        />
        {email.length > 0 && !validEmail && (
          <p className="text-xs text-destructive">Enter a valid email address.</p>
        )}
      </div>
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} />
        <span>I agree to receive product updates and accept the Privacy Policy.</span>
      </label>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Subscribing..." : "Join the waitlist"}
      </Button>
    </form>
  );
}
