"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";

type Errors = { [k: string]: string | undefined };

const FormsValidationPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", age: "", website: "", agree: false });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    else if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be 8+ characters";
    else if (!/[A-Z]/.test(form.password)) e.password = "Add at least 1 uppercase letter";
    else if (!/[0-9]/.test(form.password)) e.password = "Add at least 1 number";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    if (form.age && (Number(form.age) < 18 || Number(form.age) > 120)) e.age = "Age must be between 18 and 120";
    if (form.website && !/^https?:\/\//.test(form.website)) e.website = "URL must start with http:// or https://";
    if (!form.agree) e.agree = "You must accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <PageContainer
      title="Form Validation"
      description="Client-side validation with inline error messages, success states, and password strength indicators."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Registration Form" description="Validates on submit">
          {submitted && (
            <div className="mb-4 p-3 rounded-lg bg-lightsuccess text-success flex items-center gap-2">
              <Icon icon="solar:check-circle-bold" width={20} /> Form submitted successfully!
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="John Doe" className={`mt-2 ${errors.name ? "border-error" : ""}`} />
              {errors.name && <p className="text-xs text-error mt-1 flex items-center gap-1"><Icon icon="solar:danger-bold" width={12} /> {errors.name}</p>}
            </div>
            <div>
              <Label>Email *</Label>
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john@example.com" className={`mt-2 ${errors.email ? "border-error" : ""}`} />
              {errors.email && <p className="text-xs text-error mt-1 flex items-center gap-1"><Icon icon="solar:danger-bold" width={12} /> {errors.email}</p>}
            </div>
            <div>
              <Label>Password *</Label>
              <Input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Min 8 chars" className={`mt-2 ${errors.password ? "border-error" : ""}`} />
              {form.password && (
                <div className="mt-2">
                  <div className="h-1.5 bg-lightgray dark:bg-dark rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        form.password.length >= 12 && /[A-Z]/.test(form.password) && /[0-9]/.test(form.password) && /[^a-zA-Z0-9]/.test(form.password) ? "bg-success w-full" :
                        form.password.length >= 8 && /[A-Z]/.test(form.password) && /[0-9]/.test(form.password) ? "bg-warning w-2/3" :
                        form.password.length >= 8 ? "bg-warning w-1/2" : "bg-error w-1/4"
                      }`}
                    />
                  </div>
                  <p className="text-xs opacity-70 mt-1">Strength: {form.password.length < 8 ? "Weak" : form.password.length >= 12 && /[A-Z]/.test(form.password) && /[0-9]/.test(form.password) ? "Strong" : "Medium"}</p>
                </div>
              )}
              {errors.password && <p className="text-xs text-error mt-1 flex items-center gap-1"><Icon icon="solar:danger-bold" width={12} /> {errors.password}</p>}
            </div>
            <div>
              <Label>Confirm Password *</Label>
              <Input type="password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} placeholder="Repeat password" className={`mt-2 ${errors.confirm ? "border-error" : ""}`} />
              {errors.confirm && <p className="text-xs text-error mt-1 flex items-center gap-1"><Icon icon="solar:danger-bold" width={12} /> {errors.confirm}</p>}
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="agree" checked={form.agree} onCheckedChange={(v) => set("agree", v)} className={errors.agree ? "border-error" : ""} />
              <div>
                <Label htmlFor="agree" className="font-normal text-sm">I agree to the Terms of Service and Privacy Policy *</Label>
                {errors.agree && <p className="text-xs text-error mt-1">{errors.agree}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </DemoBlock>

        <DemoBlock title="Live Validation" description="Validates as you type">
          <form className="space-y-4">
            <div>
              <Label>Age (optional)</Label>
              <Input type="number" value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="Must be 18-120" className={`mt-2 ${errors.age ? "border-error" : form.age ? "border-success" : ""}`} />
              {errors.age ? (
                <p className="text-xs text-error mt-1 flex items-center gap-1"><Icon icon="solar:danger-bold" width={12} /> {errors.age}</p>
              ) : form.age && Number(form.age) >= 18 && Number(form.age) <= 120 ? (
                <p className="text-xs text-success mt-1 flex items-center gap-1"><Icon icon="solar:check-circle-bold" width={12} /> Valid age</p>
              ) : null}
            </div>
            <div>
              <Label>Website (optional)</Label>
              <Input type="url" value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://example.com" className={`mt-2 ${errors.website ? "border-error" : form.website && /^https?:\/\//.test(form.website) ? "border-success" : ""}`} />
              {errors.website ? (
                <p className="text-xs text-error mt-1">{errors.website}</p>
              ) : form.website && /^https?:\/\//.test(form.website) ? (
                <p className="text-xs text-success mt-1 flex items-center gap-1"><Icon icon="solar:check-circle-bold" width={12} /> Valid URL</p>
              ) : null}
            </div>
            <div>
              <Label>Username (3-20 chars, alphanumeric)</Label>
              <Input placeholder="johndoe123" className="mt-2" />
              <p className="text-xs opacity-60 mt-1">Will be checked for availability as you type.</p>
            </div>
          </form>
        </DemoBlock>

        <DemoBlock title="Validation Summary" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-success/30 bg-lightsuccess p-4">
              <div className="flex items-center gap-2 text-success"><Icon icon="solar:check-circle-bold-duotone" width={20} /><span className="font-semibold text-sm">Success State</span></div>
              <p className="text-xs opacity-70 mt-2">Field is valid and ready for submission. Use border-success + green checkmark.</p>
            </div>
            <div className="rounded-lg border border-warning/30 bg-lightwarning p-4">
              <div className="flex items-center gap-2 text-warning"><Icon icon="solar:danger-triangle-bold-duotone" width={20} /><span className="font-semibold text-sm">Warning State</span></div>
              <p className="text-xs opacity-70 mt-2">Field has a non-blocking issue. Use border-warning + amber warning icon.</p>
            </div>
            <div className="rounded-lg border border-error/30 bg-lighterror p-4">
              <div className="flex items-center gap-2 text-error"><Icon icon="solar:danger-bold-duotone" width={20} /><span className="font-semibold text-sm">Error State</span></div>
              <p className="text-xs opacity-70 mt-2">Field failed validation. Use border-error + red icon + inline message.</p>
            </div>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default FormsValidationPage;
