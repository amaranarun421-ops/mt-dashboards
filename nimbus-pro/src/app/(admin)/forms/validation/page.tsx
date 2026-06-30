"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Input, Label, Button, Progress, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { AlertCircle, Check, Eye, EyeOff, Lock, Mail, Send, X } from "lucide-react";

type Errors = Record<string, string>;

export default function ValidationPage() {
  const [values, setValues] = useState({
    name: "", email: "", username: "", password: "", confirm: "", age: "", website: "", bio: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (touched[k]) validate();
  };

  const validate = () => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Name is required";
    else if (values.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    else if (values.name.trim().length > 50) e.name = "Name must be less than 50 characters";

    if (!values.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email address";

    if (!values.username.trim()) e.username = "Username is required";
    else if (!/^[a-z0-9_]{3,20}$/.test(values.username)) e.username = "3-20 chars: lowercase, numbers, underscore";

    if (!values.password) e.password = "Password is required";
    else if (values.password.length < 8) e.password = "Password must be at least 8 characters";

    if (!values.confirm) e.confirm = "Please confirm your password";
    else if (values.confirm !== values.password) e.confirm = "Passwords do not match";

    if (!values.age) e.age = "Age is required";
    else if (Number(values.age) < 18) e.age = "You must be at least 18 years old";
    else if (Number(values.age) > 120) e.age = "Please enter a valid age";

    if (values.website && !/^https?:\/\/.+\..+/.test(values.website)) e.website = "Enter a valid URL (https://...)";

    if (values.bio.length > 200) e.bio = "Bio must be less than 200 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onBlur = (k: string) => {
    setTouched((p) => ({ ...p, [k]: true }));
    validate();
  };

  const submit = () => {
    setTouched({ name: true, email: true, username: true, password: true, confirm: true, age: true, website: true, bio: true });
    if (validate()) setSubmitted(true);
  };

  const strength = (() => {
    if (!values.password) return 0;
    let s = 0;
    if (values.password.length >= 8) s += 25;
    if (/[A-Z]/.test(values.password)) s += 25;
    if (/[0-9]/.test(values.password)) s += 25;
    if (/[^A-Za-z0-9]/.test(values.password)) s += 25;
    return s;
  })();
  const strengthTone = strength < 50 ? "error" : strength < 100 ? "warning" : "success";
  const strengthLabel = strength < 50 ? "Weak" : strength < 100 ? "Fair" : "Strong";

  if (submitted) {
    return (
      <div className="space-y-4">
        <PageHeader title="Form Validation" breadcrumbs={[{ label: "Forms" }, { label: "Validation" }]} />
        <Card>
          <CardBody className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
              <Check className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Form submitted successfully!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">All fields passed validation.</p>
            </div>
            <Button variant="outline" onClick={() => {
              setSubmitted(false);
              setValues({ name: "", email: "", username: "", password: "", confirm: "", age: "", website: "", bio: "" });
              setTouched({});
              setErrors({});
            }}>Reset form</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Form Validation"
        description="Inline validation with rules: required, format, length, matching, and custom."
        breadcrumbs={[{ label: "Forms" }, { label: "Validation" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader title="Sign Up Form" description="Fill all fields and submit to validate" />
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label required>Full name</Label>
                <Input
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  onBlur={() => onBlur("name")}
                  error={!!errors.name && touched.name}
                  placeholder="John Doe"
                />
                {errors.name && touched.name && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> {errors.name}</p>
                )}
              </div>
              <div>
                <Label required>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    onBlur={() => onBlur("email")}
                    error={!!errors.email && touched.email}
                    className="pl-9"
                    placeholder="you@company.com"
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> {errors.email}</p>
                )}
              </div>
              <div>
                <Label required>Username</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">@</span>
                  <Input
                    value={values.username}
                    onChange={(e) => set("username", e.target.value)}
                    onBlur={() => onBlur("username")}
                    error={!!errors.username && touched.username}
                    className="pl-7"
                    placeholder="username"
                  />
                </div>
                {errors.username && touched.username ? (
                  <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> {errors.username}</p>
                ) : values.username && !errors.username && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-success-600 dark:text-success-400"><Check className="h-3 w-3" /> Username available</p>
                )}
              </div>
              <div>
                <Label required>Age</Label>
                <Input
                  type="number"
                  value={values.age}
                  onChange={(e) => set("age", e.target.value)}
                  onBlur={() => onBlur("age")}
                  error={!!errors.age && touched.age}
                  placeholder="25"
                />
                {errors.age && touched.age && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> {errors.age}</p>
                )}
              </div>
              <div>
                <Label required>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type={showPass ? "text" : "password"}
                    value={values.password}
                    onChange={(e) => set("password", e.target.value)}
                    onBlur={() => onBlur("password")}
                    error={!!errors.password && touched.password}
                    className="px-9"
                    placeholder="••••••••"
                  />
                  <button onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Toggle">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {values.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Strength</span>
                      <span className={cn("font-semibold",
                        strengthTone === "success" && "text-success-600 dark:text-success-400",
                        strengthTone === "warning" && "text-warning-600 dark:text-warning-400",
                        strengthTone === "error" && "text-error-600 dark:text-error-400"
                      )}>{strengthLabel}</span>
                    </div>
                    <Progress value={strength} tone={strengthTone as "success" | "warning" | "error"} size="sm" />
                  </div>
                )}
                {errors.password && touched.password && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> {errors.password}</p>
                )}
              </div>
              <div>
                <Label required>Confirm password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type={showPass ? "text" : "password"}
                    value={values.confirm}
                    onChange={(e) => set("confirm", e.target.value)}
                    onBlur={() => onBlur("confirm")}
                    error={!!errors.confirm && touched.confirm}
                    className="px-9"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirm && touched.confirm ? (
                  <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> {errors.confirm}</p>
                ) : values.confirm && values.confirm === values.password && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-success-600 dark:text-success-400"><Check className="h-3 w-3" /> Passwords match</p>
                )}
              </div>
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={values.website}
                onChange={(e) => set("website", e.target.value)}
                onBlur={() => onBlur("website")}
                error={!!errors.website && touched.website}
                placeholder="https://example.com"
              />
              {errors.website && touched.website && (
                <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> {errors.website}</p>
              )}
            </div>
            <div>
              <Label>Bio</Label>
              <Input
                value={values.bio}
                onChange={(e) => set("bio", e.target.value)}
                onBlur={() => onBlur("bio")}
                error={!!errors.bio && touched.bio}
                placeholder="Tell us about yourself"
              />
              <p className={cn("mt-1 text-xs", values.bio.length > 200 ? "text-error-600 dark:text-error-400" : "text-gray-500 dark:text-gray-400")}>{values.bio.length} / 200 characters</p>
            </div>
            <div className="flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
              <Button variant="outline">Cancel</Button>
              <Button onClick={submit}><Send className="h-4 w-4" /> Create account</Button>
            </div>
          </CardBody>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardHeader title="Validation Rules" description="Rules applied to this form" />
            <CardBody className="space-y-2 text-xs">
              {[
                { label: "Required", desc: "Name, email, username, password, age", tone: "brand" },
                { label: "Email format", desc: "Must match user@domain.tld", tone: "purple" },
                { label: "Min length", desc: "Password ≥ 8 chars", tone: "warning" },
                { label: "Max length", desc: "Bio ≤ 200 chars", tone: "warning" },
                { label: "Match", desc: "Confirm password", tone: "success" },
                { label: "Custom", desc: "Age ≥ 18, username regex", tone: "error" },
              ].map((r) => (
                <div key={r.label} className="flex items-start gap-2">
                  <Badge tone={r.tone as "brand" | "purple" | "warning" | "success" | "error"} variant="soft">{r.label}</Badge>
                  <p className="flex-1 text-gray-600 dark:text-gray-400">{r.desc}</p>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Live status" description="Validation summary" />
            <CardBody className="space-y-2 text-sm">
              {[
                { label: "Name", ok: !errors.name && touched.name },
                { label: "Email", ok: !errors.email && touched.email },
                { label: "Username", ok: !errors.username && touched.username },
                { label: "Password", ok: !errors.password && touched.password },
                { label: "Confirm", ok: !errors.confirm && touched.confirm },
                { label: "Age", ok: !errors.age && touched.age },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{f.label}</span>
                  {f.ok ? <Check className="h-4 w-4 text-success-500" /> : touched[f.label.toLowerCase() as keyof typeof touched] ? <X className="h-4 w-4 text-error-500" /> : <span className="text-xs text-gray-400">—</span>}
                </div>
              ))}
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
