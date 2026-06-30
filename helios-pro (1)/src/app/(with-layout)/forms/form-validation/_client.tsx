"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { CheckIcon } from "@/components/Layouts/sidebar/icons";

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type FieldState = "untouched" | "valid" | "invalid";

type Field<T> = {
  value: T;
  error?: string;
  state: FieldState;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

export default function FormValidationClient() {
  const [name, setName] = useState<Field<string>>({ value: "", state: "untouched" });
  const [email, setEmail] = useState<Field<string>>({ value: "", state: "untouched" });
  const [username, setUsername] = useState<Field<string>>({ value: "", state: "untouched" });
  const [password, setPassword] = useState<Field<string>>({ value: "", state: "untouched" });
  const [confirm, setConfirm] = useState<Field<string>>({ value: "", state: "untouched" });
  const [website, setWebsite] = useState<Field<string>>({ value: "", state: "untouched" });
  const [age, setAge] = useState<Field<string>>({ value: "", state: "untouched" });

  /* validators */
  const validateName = (v: string): string | undefined => {
    if (!v.trim()) return "Name is required.";
    if (v.trim().length < 2) return "Name must be at least 2 characters.";
    return undefined;
  };
  const validateEmail = (v: string): string | undefined => {
    if (!v.trim()) return "Email is required.";
    if (!emailRegex.test(v)) return "Enter a valid email address.";
    return undefined;
  };
  const validateUsername = (v: string): string | undefined => {
    if (!v.trim()) return "Username is required.";
    if (!usernameRegex.test(v))
      return "3-20 chars, letters/numbers/underscore only.";
    return undefined;
  };
  const validatePassword = (v: string): string | undefined => {
    if (!v) return "Password is required.";
    if (v.length < 8) return "Must be at least 8 characters.";
    if (!/[A-Z]/.test(v)) return "Must include an uppercase letter.";
    if (!/\d/.test(v)) return "Must include a digit.";
    return undefined;
  };
  const validateConfirm = (v: string): string | undefined => {
    if (!v) return "Please confirm your password.";
    if (v !== password.value) return "Passwords do not match.";
    return undefined;
  };
  const validateWebsite = (v: string): string | undefined => {
    if (!v) return undefined; // optional field
    try {
      const url = new URL(v.startsWith("http") ? v : `https://${v}`);
      if (!url.hostname.includes(".")) return "Enter a valid URL.";
      return undefined;
    } catch {
      return "Enter a valid URL.";
    }
  };
  const validateAge = (v: string): string | undefined => {
    if (!v) return "Age is required.";
    const n = Number(v);
    if (Number.isNaN(n)) return "Must be a number.";
    if (n < 18) return "Must be 18 or older.";
    if (n > 120) return "Please enter a realistic age.";
    return undefined;
  };

  /* helpers */
  const makeValidated = <T,>(value: T, validator: (v: T) => string | undefined): Field<T> => {
    const err = validator(value);
    return err ? { value, error: err, state: "invalid" } : { value, state: "valid" };
  };

  const fieldClass = (s: FieldState) =>
    s === "invalid"
      ? `${inputClass} border-red ring-2 ring-red/20 focus:border-red focus:ring-red/20`
      : s === "valid"
        ? `${inputClass} border-primary ring-2 ring-primary/20 focus:border-primary focus:ring-primary/20`
        : inputClass;

  const StateIcon = ({ s }: { s: FieldState }) => (
    <span
      className={classNames(
        "absolute inset-y-0 right-3 flex items-center",
        s === "invalid" && "text-red",
        s === "valid" && "text-primary",
      )}
    >
      {s === "invalid" && (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
          <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
        </svg>
      )}
      {s === "valid" && <CheckIcon className="size-4" />}
    </span>
  );

  const wrap = (s: FieldState, children: React.ReactNode) => (
    <div className="relative">
      {children}
      {s !== "untouched" && <StateIcon s={s} />}
    </div>
  );

  const fields: Field<unknown>[] = [name, email, username, password, confirm, website, age];
  const validCount = fields.filter((f) => f.state === "valid").length;
  const invalidCount = fields.filter((f) => f.state === "invalid").length;

  const allValid = useMemo(
    () =>
      !validateName(name.value) &&
      !validateEmail(email.value) &&
      !validateUsername(username.value) &&
      !validatePassword(password.value) &&
      !validateConfirm(confirm.value) &&
      !validateWebsite(website.value) &&
      !validateAge(age.value),
    [name.value, email.value, username.value, password.value, confirm.value, website.value, age.value],
  );

  const submit = () => {
    setName(makeValidated(name.value, validateName));
    setEmail(makeValidated(email.value, validateEmail));
    setUsername(makeValidated(username.value, validateUsername));
    setPassword(makeValidated(password.value, validatePassword));
    setConfirm(makeValidated(confirm.value, validateConfirm));
    setWebsite(makeValidated(website.value, validateWebsite));
    setAge(makeValidated(age.value, validateAge));
  };

  return (
    <div>
      <PageHeader
        title="Form Validation"
        description="Real-time required, email, min-length, password-match, URL and numeric-range validation."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Form Validation" },
        ]}
        actions={
          <Badge variant={allValid ? "success" : invalidCount > 0 ? "danger" : "primary"} size="lg">
            <CheckIcon className="size-4" /> {validCount}/{fields.length} valid
          </Badge>
        }
      />

      {/* live summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: "Total fields", v: fields.length, c: "text-dark dark:text-white" },
          { l: "Valid", v: validCount, c: "text-primary" },
          { l: "Invalid", v: invalidCount, c: "text-red" },
          { l: "Untouched", v: fields.filter((f) => f.state === "untouched").length, c: "text-dark-5 dark:text-dark-6" },
        ].map((s) => (
          <Card key={s.l} padded className="!p-4">
            <p className="text-xs text-dark-5 dark:text-dark-6">{s.l}</p>
            <p className={classNames("mt-1 text-2xl font-bold", s.c)}>{s.v}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* identity */}
        <FormSection title="Identity" description="Required fields with min-length and email format rules." columns={1}>
          <FormField
            label="Full name"
            htmlFor="fv-name"
            required
            hint="Min 2 characters."
            error={name.state === "invalid" ? name.error : undefined}
          >
            {wrap(name.state, (
              <input
                id="fv-name"
                type="text"
                value={name.value}
                onChange={(e) => setName({ value: e.target.value, state: "untouched" })}
                onBlur={(e) => setName(makeValidated(e.target.value, validateName))}
                placeholder="Aarav Mehta"
                className={fieldClass(name.state)}
              />
            ))}
          </FormField>
          <FormField
            label="Email"
            htmlFor="fv-email"
            required
            hint="We never share your email."
            error={email.state === "invalid" ? email.error : undefined}
          >
            {wrap(email.state, (
              <input
                id="fv-email"
                type="email"
                value={email.value}
                onChange={(e) => setEmail({ value: e.target.value, state: "untouched" })}
                onBlur={(e) => setEmail(makeValidated(e.target.value, validateEmail))}
                placeholder="you@heliospro.io"
                className={fieldClass(email.state)}
              />
            ))}
          </FormField>
          <FormField
            label="Username"
            htmlFor="fv-user"
            required
            hint="3-20 chars, letters/numbers/underscore."
            error={username.state === "invalid" ? username.error : undefined}
          >
            {wrap(username.state, (
              <input
                id="fv-user"
                type="text"
                value={username.value}
                onChange={(e) => setUsername({ value: e.target.value, state: "untouched" })}
                onBlur={(e) => setUsername(makeValidated(e.target.value, validateUsername))}
                placeholder="aarav_m"
                className={fieldClass(username.state)}
              />
            ))}
          </FormField>
          <FormField
            label="Website"
            htmlFor="fv-web"
            hint="Optional — must be a valid URL."
            error={website.state === "invalid" ? website.error : undefined}
          >
            {wrap(website.state, (
              <input
                id="fv-web"
                type="text"
                value={website.value}
                onChange={(e) => setWebsite({ value: e.target.value, state: "untouched" })}
                onBlur={(e) => setWebsite(makeValidated(e.target.value, validateWebsite))}
                placeholder="heliospro.io"
                className={fieldClass(website.state)}
              />
            ))}
          </FormField>
        </FormSection>

        {/* password */}
        <FormSection title="Password" description="Strength + match validation with live feedback." columns={1}>
          <FormField
            label="Password"
            htmlFor="fv-pw"
            required
            hint="Min 8 chars, 1 uppercase + 1 digit."
            error={password.state === "invalid" ? password.error : undefined}
          >
            {wrap(password.state, (
              <input
                id="fv-pw"
                type="password"
                value={password.value}
                onChange={(e) => setPassword({ value: e.target.value, state: "untouched" })}
                onBlur={(e) => setPassword(makeValidated(e.target.value, validatePassword))}
                placeholder="••••••••"
                className={fieldClass(password.state)}
              />
            ))}
          </FormField>
          <FormField
            label="Confirm password"
            htmlFor="fv-conf"
            required
            hint="Must match the password above."
            error={confirm.state === "invalid" ? confirm.error : undefined}
          >
            {wrap(confirm.state, (
              <input
                id="fv-conf"
                type="password"
                value={confirm.value}
                onChange={(e) => setConfirm({ value: e.target.value, state: "untouched" })}
                onBlur={(e) => setConfirm(makeValidated(e.target.value, validateConfirm))}
                placeholder="••••••••"
                className={fieldClass(confirm.state)}
              />
            ))}
          </FormField>

          {/* numeric range */}
          <FormField
            label="Age"
            htmlFor="fv-age"
            required
            hint="Custom rule: must be between 18 and 120."
            error={age.state === "invalid" ? age.error : undefined}
          >
            {wrap(age.state, (
              <input
                id="fv-age"
                type="number"
                value={age.value}
                onChange={(e) => setAge({ value: e.target.value, state: "untouched" })}
                onBlur={(e) => setAge(makeValidated(e.target.value, validateAge))}
                placeholder="32"
                className={fieldClass(age.state)}
              />
            ))}
          </FormField>

          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            <p className="font-medium text-dark dark:text-white">Validation rules</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-primary">
              <li>Required — name, email, username, password, age</li>
              <li>Email format — RFC-style regex</li>
              <li>Min length — name 2, username 3, password 8</li>
              <li>Password match — confirm must equal password</li>
              <li>Custom URL — website (optional)</li>
              <li>Numeric range — age 18–120</li>
            </ul>
          </div>
        </FormSection>
      </div>

      {/* submit */}
      <Card className="mt-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-dark dark:text-white">
              {allValid
                ? "All fields valid — ready to submit."
                : invalidCount > 0
                  ? `${invalidCount} field${invalidCount === 1 ? "" : "s"} need attention.`
                  : "Fill in the form to validate it in real time."}
            </p>
            <p className="text-xs text-dark-5 dark:text-dark-6">
              Fields validate on blur; the submit button forces validation of every field.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="md"
              onClick={() => {
                setName({ value: "", state: "untouched" });
                setEmail({ value: "", state: "untouched" });
                setUsername({ value: "", state: "untouched" });
                setPassword({ value: "", state: "untouched" });
                setConfirm({ value: "", state: "untouched" });
                setWebsite({ value: "", state: "untouched" });
                setAge({ value: "", state: "untouched" });
              }}
            >
              Reset
            </Button>
            <Button variant="primary" size="md" onClick={submit}>
              Validate & submit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
