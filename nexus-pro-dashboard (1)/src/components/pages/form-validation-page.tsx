"use client";

import * as React from "react";
import { CheckCircle2, XCircle, AlertCircle, Mail, User, Lock, Phone } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormValidation() {
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validate = (field: string, value: string) => {
    let err = "";
    if (field === "name" && !value) err = "Name is required";
    if (field === "name" && value && value.length < 2) err = "Name too short";
    if (field === "email" && !value) err = "Email is required";
    if (field === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) err = "Invalid email format";
    if (field === "phone" && value && !/^\+?[\d\s-]{10,}$/.test(value)) err = "Invalid phone number";
    if (field === "password" && !value) err = "Password required";
    if (field === "password" && value && value.length < 8) err = "Min 8 characters";
    if (field === "confirm" && value !== form.password) err = "Passwords don't match";
    setErrors(prev => ({...prev, [field]: err}));
  };

  const set = (field: string, value: string) => {
    setForm(prev => ({...prev, [field]: value}));
    if (touched[field]) validate(field, value);
  };

  const blur = (field: string) => {
    setTouched(prev => ({...prev, [field]: true}));
    validate(field, form[field]);
  };

  const isValid = !Object.values(errors).some(e => e) && Object.values(form).every(v => v);

  return (
    <div>
      <PageHeader breadcrumb={["Forms", "Validation"]} title="Form Validation" description="Real-time input validation with clear feedback states." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Registration Form</h3>
          <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
            <Field label="Full Name" icon={User} error={errors.name} touched={touched.name} value={form.name} onChange={v=>set("name", v)} onBlur={()=>blur("name")} placeholder="John Doe" />
            <Field label="Email Address" icon={Mail} error={errors.email} touched={touched.email} value={form.email} onChange={v=>set("email", v)} onBlur={()=>blur("email")} placeholder="john@example.com" type="email" />
            <Field label="Phone Number" icon={Phone} error={errors.phone} touched={touched.phone} value={form.phone} onChange={v=>set("phone", v)} onBlur={()=>blur("phone")} placeholder="+1 (555) 012-3456" />
            <Field label="Password" icon={Lock} error={errors.password} touched={touched.password} value={form.password} onChange={v=>set("password", v)} onBlur={()=>blur("password")} placeholder="Min 8 characters" type="password" />
            <Field label="Confirm Password" icon={Lock} error={errors.confirm} touched={touched.confirm} value={form.confirm} onChange={v=>set("confirm", v)} onBlur={()=>blur("confirm")} placeholder="Re-enter password" type="password" />
            <Button type="submit" disabled={!isValid} className="w-full">Create Account</Button>
          </form>
        </Card>
        <div className="space-y-4">
          <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">Validation States</h3>
            <div className="space-y-3">
              {[
                { icon: CheckCircle2, color: "text-success-600 bg-success-50 dark:bg-success-500/15", title: "Success State", desc: "Input passed all validation rules" },
                { icon: AlertCircle, color: "text-warning-600 bg-warning-50 dark:bg-warning-500/15", title: "Warning State", desc: "Input needs attention but not critical" },
                { icon: XCircle, color: "text-error-600 bg-error-50 dark:bg-error-500/15", title: "Error State", desc: "Input failed validation — show message" },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${s.color}`}><Icon className="h-4 w-4" /></div>
                    <div><p className="text-sm font-semibold text-gray-800 dark:text-white/90">{s.title}</p><p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p></div>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">Password Strength</h3>
            <div className="space-y-2">
              {[
                { label: "At least 8 characters", valid: form.password.length >= 8 },
                { label: "Contains uppercase letter", valid: /[A-Z]/.test(form.password) },
                { label: "Contains number", valid: /\d/.test(form.password) },
                { label: "Contains special character", valid: /[^A-Za-z0-9]/.test(form.password) },
              ].map(r => (
                <div key={r.label} className="flex items-center gap-2 text-sm">
                  {r.valid ? <CheckCircle2 className="h-4 w-4 text-success-500" /> : <XCircle className="h-4 w-4 text-gray-300 dark:text-gray-600" />}
                  <span className={r.valid ? "text-gray-800 dark:text-white/90" : "text-gray-500 dark:text-gray-400"}>{r.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, error, touched, value, onChange, onBlur, placeholder, type = "text" }: any) {
  const showError = touched && error;
  const showSuccess = touched && !error && value;
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-1.5">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input type={type} value={value} onChange={e=>onChange(e.target.value)} onBlur={onBlur} placeholder={placeholder}
          className={`pl-9 pr-9 ${showError ? "border-error-500 focus:border-error-500" : showSuccess ? "border-success-500-500" : ""}`} />
        {showSuccess && <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-success-500" />}
        {showError && <XCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-error-500" />}
      </div>
      {showError && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
}
