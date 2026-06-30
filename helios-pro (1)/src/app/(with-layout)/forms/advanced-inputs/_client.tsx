"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Progress } from "@/components/shared/progress";
import { InputIcon, CheckIcon } from "@/components/Layouts/sidebar/icons";

/* ---------- helpers ---------- */

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* phone mask: (415) 555-0123 */
function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 10);
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 10);
  let out = "";
  if (p1) out += `(${p1}`;
  if (p1.length === 3) out += ") ";
  if (p2) out += p2;
  if (p2.length === 3) out += "-";
  if (p3) out += p3;
  return out;
}

/* currency mask: $1,234.56 */
function maskCurrency(value: string) {
  const d = value.replace(/[^\d.]/g, "");
  const [intPart, decPart] = d.split(".");
  const intFmt = (intPart || "0").replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const dec = decPart ? `.${decPart.slice(0, 2)}` : "";
  return `$${intFmt}${dec}`;
}

type PwTone = "neutral" | "success" | "accent" | "warning" | "danger";

/* password strength scoring */
function scorePassword(pw: string): { score: number; label: string; tone: PwTone } {
  let score = 0;
  if (!pw) return { score: 0, label: "Empty", tone: "neutral" };
  if (pw.length >= 8) score += 25;
  if (pw.length >= 12) score += 10;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 20;
  if (/\d/.test(pw)) score += 20;
  if (/[^A-Za-z0-9]/.test(pw)) score += 25;
  score = Math.min(100, score);
  const label =
    score >= 90 ? "Very strong" : score >= 70 ? "Strong" : score >= 50 ? "Fair" : score >= 25 ? "Weak" : "Very weak";
  const tone: PwTone = score >= 70 ? "success" : score >= 50 ? "accent" : score >= 25 ? "warning" : "danger";
  return { score, label, tone };
}

const PW_PROGRESS_TONE: Record<PwTone, "primary" | "accent" | "success" | "danger"> = {
  neutral: "primary",
  success: "success",
  accent: "accent",
  warning: "accent",
  danger: "danger",
};

const COMBOBOX_OPTIONS = [
  "Aarav Mehta",
  "Daniel Okafor",
  "Emma Larsson",
  "Henrik Nielsen",
  "Ingrid Berg",
  "Layla Hassan",
  "Liam O'Connor",
  "Marcus Webb",
  "Mei Chen",
  "Noah Patel",
  "Priya Sharma",
  "Rafael Costa",
  "Sofia Rossi",
  "Tobias Frank",
  "Yuki Tanaka",
];

/* ---------- page ---------- */

export default function AdvancedInputsClient() {
  /* input groups / masks */
  const [username, setUsername] = useState("aarav.m");
  const [website, setWebsite] = useState("heliospro.io");
  const [phone, setPhone] = useState("(415) 555-0123");
  const [amount, setAmount] = useState("$1,250.00");
  const [weight, setWeight] = useState("48");

  /* tags input */
  const [tags, setTags] = useState<string[]>(["design", "saas", "growth"]);
  const [tagDraft, setTagDraft] = useState("");
  const addTag = () => {
    const t = tagDraft.trim().toLowerCase().replace(/\s+/g, "-");
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagDraft("");
  };

  /* OTP */
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const setOtpAt = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    setOtp((prev) => prev.map((c, idx) => (idx === i ? digit : c)));
    if (digit && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const otpKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };
  const otpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text) {
      setOtp(text.split(""));
      otpRefs.current[Math.min(text.length, 5)]?.focus();
      e.preventDefault();
    }
  };
  const otpComplete = otp.every((c) => c !== "");

  /* password strength */
  const [pw, setPw] = useState("");
  const pwScore = useMemo(() => scorePassword(pw), [pw]);

  /* combobox */
  const [comboOpen, setComboOpen] = useState(false);
  const [comboValue, setComboValue] = useState("");
  const [comboSelected, setComboSelected] = useState<string | null>(null);
  const filtered = COMBOBOX_OPTIONS.filter((o) =>
    o.toLowerCase().includes(comboValue.toLowerCase()),
  );
  useEffect(() => {
    const onClick = () => setComboOpen(false);
    if (comboOpen) {
      window.addEventListener("click", onClick);
      return () => window.removeEventListener("click", onClick);
    }
  }, [comboOpen]);

  return (
    <div>
      <PageHeader
        title="Advanced Inputs"
        description="Input groups, masks, tags, OTP, password strength meter and an autocomplete combobox."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Advanced Inputs" },
        ]}
        actions={
          <Badge variant="accent" size="lg">
            <InputIcon className="size-4" /> 7 patterns
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* input groups */}
        <FormSection title="Input groups" description="Prefix, suffix and inline button groups." columns={1}>
          <FormField label="Username" htmlFor="ig-user" hint="Your handle on heliospro.io.">
            <div className="flex">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-stroke bg-gray-2 px-3 text-sm text-dark-5 dark:border-dark-3 dark:bg-dark-3 dark:text-dark-6">
                @
              </span>
              <input
                id="ig-user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`${inputClass} rounded-l-none`}
              />
            </div>
          </FormField>
          <FormField label="Website" htmlFor="ig-web">
            <div className="flex">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-stroke bg-gray-2 px-3 text-sm text-dark-5 dark:border-dark-3 dark:bg-dark-3 dark:text-dark-6">
                https://
              </span>
              <input
                id="ig-web"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={`${inputClass} rounded-l-none`}
              />
              <span className="inline-flex items-center rounded-r-lg border border-l-0 border-stroke bg-gray-2 px-3 text-sm text-dark-5 dark:border-dark-3 dark:bg-dark-3 dark:text-dark-6">
                /profile
              </span>
            </div>
          </FormField>
          <FormField label="Coupon code" htmlFor="ig-coupon" hint="Click Apply to validate.">
            <div className="flex gap-2">
              <input id="ig-coupon" placeholder="WELCOME10" className={inputClass} />
              <Button variant="primary" size="md" onClick={() => {}}>
                Apply
              </Button>
            </div>
          </FormField>
          <FormField label="Search" htmlFor="ig-search">
            <div className="flex">
              <input id="ig-search" placeholder="Search products..." className={`${inputClass} rounded-r-none`} />
              <button className="inline-flex items-center rounded-r-lg border border-l-0 border-stroke bg-primary px-4 text-sm font-medium text-white transition hover:bg-primary-dark dark:border-dark-3">
                Go
              </button>
            </div>
          </FormField>
        </FormSection>

        {/* masks */}
        <FormSection title="Masks" description="Auto-format phone numbers and currency as you type." columns={1}>
          <FormField label="Phone number" htmlFor="mask-phone" hint="Mask: (000) 000-0000">
            <input
              id="mask-phone"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField label="Amount (USD)" htmlFor="mask-currency" hint="Mask: $0,000.00">
            <input
              id="mask-currency"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(maskCurrency(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField label="Weight (kg)" htmlFor="mask-weight" hint="Numeric stepper with unit suffix.">
            <div className="flex">
              <button
                type="button"
                onClick={() => setWeight((w) => String(Math.max(0, Number(w || 0) - 1)))}
                className="inline-flex items-center rounded-l-lg border border-r-0 border-stroke bg-gray-2 px-3 text-dark-5 hover:bg-gray-3 dark:border-dark-3 dark:bg-dark-3 dark:text-dark-6"
              >
                −
              </button>
              <input
                id="mask-weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value.replace(/[^\d.]/g, ""))}
                className={`${inputClass} rounded-none text-center`}
              />
              <button
                type="button"
                onClick={() => setWeight((w) => String(Number(w || 0) + 1))}
                className="inline-flex items-center rounded-r-lg border border-l-0 border-stroke bg-gray-2 px-3 text-dark-5 hover:bg-gray-3 dark:border-dark-3 dark:bg-dark-3 dark:text-dark-6"
              >
                +
              </button>
            </div>
          </FormField>
          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            <p className="font-medium text-dark dark:text-white">Live preview</p>
            <p className="mt-1">Phone: <span className="font-mono text-primary">{phone || "—"}</span></p>
            <p>Amount: <span className="font-mono text-primary">{amount || "—"}</span></p>
          </div>
        </FormSection>

        {/* tags input */}
        <FormSection title="Tags input" description="Press Enter or click Add to commit a tag; click a tag to remove." columns={1}>
          <div className="rounded-lg border border-stroke bg-white p-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 dark:border-dark-3 dark:bg-dark-2">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary dark:bg-primary/15 dark:text-primary-light"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => setTags((p) => p.filter((x) => x !== t))}
                    className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full hover:bg-primary/20"
                    aria-label={`Remove tag ${t}`}
                  >
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                      <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                    </svg>
                  </button>
                </span>
              ))}
              <input
                value={tagDraft}
                onChange={(e) => setTagDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder={tags.length ? "Add another…" : "Add a tag and press Enter"}
                className="min-w-[160px] flex-1 bg-transparent text-sm text-dark outline-none placeholder:text-dark-6 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-dark-5 dark:text-dark-6">{tags.length} tag{tags.length === 1 ? "" : "s"} added.</p>
            <Button variant="outline" size="sm" onClick={addTag}>
              Add tag
            </Button>
          </div>
          <div className="rounded-lg bg-gray-2 p-3 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
            <p className="font-medium text-dark dark:text-white">Suggested</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["onboarding", "retention", "analytics", "billing", "api"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => !tags.includes(s) && setTags((p) => [...p, s])}
                  className="rounded-full border border-stroke px-2 py-0.5 text-xs text-dark-7 transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        </FormSection>

        {/* OTP */}
        <FormSection title="OTP input" description="6-digit verification code with paste support." columns={1}>
          <div className="flex gap-2" onPaste={otpPaste}>
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  otpRefs.current[i] = el;
                }}
                value={d}
                onChange={(e) => setOtpAt(i, e.target.value)}
                onKeyDown={(e) => otpKeyDown(i, e)}
                inputMode="numeric"
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
                className={classNames(
                  inputClass,
                  "h-12 w-12 flex-shrink-0 text-center text-lg font-semibold",
                  d && "border-primary ring-2 ring-primary/20",
                )}
              />
            ))}
          </div>
          {otpComplete ? (
            <p className="text-xs font-medium text-primary">Code complete — ready to verify.</p>
          ) : (
            <p className="text-xs text-dark-5 dark:text-dark-6">
              Enter the 6-digit code sent to your device. Try pasting “123456”.
            </p>
          )}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setOtp(["", "", "", "", "", ""])}>
              Clear
            </Button>
            <Button variant="primary" size="sm" disabled={!otpComplete}>
              Verify code
            </Button>
          </div>
        </FormSection>

        {/* password strength */}
        <FormSection title="Password strength meter" description="Live scoring with recommendations." columns={1}>
          <FormField label="New password" htmlFor="pw-strength" hint="Min 8 chars, mixed case, digits and symbols.">
            <input
              id="pw-strength"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter a password"
              className={inputClass}
            />
          </FormField>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-dark-5 dark:text-dark-6">Strength</span>
              <span
                className={classNames(
                  "font-semibold",
                  pwScore.tone === "success" && "text-primary",
                  pwScore.tone === "accent" && "text-accent-dark dark:text-accent-light",
                  pwScore.tone === "warning" && "text-accent-dark dark:text-accent-light",
                  pwScore.tone === "danger" && "text-red",
                  pwScore.tone === "neutral" && "text-dark-5 dark:text-dark-6",
                )}
              >
                {pwScore.label}
              </span>
            </div>
            <Progress value={pwScore.score} tone={PW_PROGRESS_TONE[pwScore.tone]} size="md" />
          </div>
          <ul className="grid grid-cols-1 gap-1 text-xs text-dark-5 dark:text-dark-6 sm:grid-cols-2">
            {[
              { ok: pw.length >= 8, label: "At least 8 characters" },
              { ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw), label: "Upper & lowercase" },
              { ok: /\d/.test(pw), label: "At least one digit" },
              { ok: /[^A-Za-z0-9]/.test(pw), label: "At least one symbol" },
            ].map((r) => (
              <li key={r.label} className={classNames("flex items-center gap-1.5", r.ok && "text-primary")}>
                <span
                  className={classNames(
                    "inline-flex size-4 items-center justify-center rounded-full",
                    r.ok ? "bg-primary text-white" : "bg-gray-3 text-dark-6 dark:bg-dark-3",
                  )}
                >
                  {r.ok ? <CheckIcon className="size-3" /> : <span className="size-1 rounded-full bg-current" />}
                </span>
                {r.label}
              </li>
            ))}
          </ul>
        </FormSection>

        {/* autocomplete combobox */}
        <FormSection title="Autocomplete combobox" description="Filter the dropdown by typing or pick from the list." columns={1}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <FormField label="Assignee" htmlFor="combo" hint="Search a Helios Pro team member.">
              <input
                id="combo"
                value={comboValue}
                onChange={(e) => {
                  setComboValue(e.target.value);
                  setComboOpen(true);
                }}
                onFocus={() => setComboOpen(true)}
                placeholder="Type a name…"
                className={inputClass}
              />
            </FormField>
            {comboOpen && (
              <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-stroke bg-white shadow-3 helios-scroll dark:border-dark-3 dark:bg-gray-dark">
                {filtered.length === 0 ? (
                  <p className="px-3 py-2 text-xs text-dark-5 dark:text-dark-6">No matches.</p>
                ) : (
                  filtered.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => {
                        setComboSelected(o);
                        setComboValue(o);
                        setComboOpen(false);
                      }}
                      className={classNames(
                        "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-gray-2 dark:hover:bg-dark-3",
                        comboSelected === o ? "text-primary" : "text-dark dark:text-white",
                      )}
                    >
                      <span>{o}</span>
                      {comboSelected === o && <span className="text-xs">Selected</span>}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          {comboSelected && (
            <div className="flex items-center justify-between rounded-lg bg-primary-subtle px-3 py-2 text-sm dark:bg-primary/15">
              <span className="text-primary">
                Selected: <span className="font-medium">{comboSelected}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setComboSelected(null);
                  setComboValue("");
                }}
                className="text-xs text-primary hover:underline"
              >
                Clear
              </button>
            </div>
          )}
        </FormSection>
      </div>

      <Card className="mt-6">
        <CardHeader title="Pattern cheat-sheet" subtitle="Where to reach for each pattern in your own forms." />
        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2 lg:grid-cols-3">
          {[
            { p: "Input groups", u: "Affixed units (@, $, /profile) or inline action buttons." },
            { p: "Masks", u: "Phone, currency, ZIP — keep formatting consistent." },
            { p: "Tags input", u: "Multi-value fields like skills, labels or topics." },
            { p: "OTP input", u: "Two-factor flows with paste-from-SMS support." },
            { p: "Password meter", u: "Live scoring drives users toward stronger passwords." },
            { p: "Combobox", u: "Searchable single-select with a filtered dropdown." },
          ].map((row) => (
            <div key={row.p} className="rounded-lg border border-stroke p-3 dark:border-dark-3">
              <p className="font-semibold text-dark dark:text-white">{row.p}</p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{row.u}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
