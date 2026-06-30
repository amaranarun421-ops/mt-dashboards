"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { CreditCardIcon, CheckIcon } from "@/components/Layouts/sidebar/icons";

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type CardType = "visa" | "mastercard" | "amex" | "discover" | "unknown";

const CARD_PATTERNS: { type: CardType; pattern: RegExp; label: string; glyph: string }[] = [
  { type: "visa", pattern: /^4/, label: "Visa", glyph: "VISA" },
  { type: "mastercard", pattern: /^(5[1-5]|2[2-7])/, label: "Mastercard", glyph: "MC" },
  { type: "amex", pattern: /^3[47]/, label: "American Express", glyph: "AMEX" },
  { type: "discover", pattern: /^6(?:011|5)/, label: "Discover", glyph: "DISC" },
];

function detectCard(num: string): CardType {
  const clean = num.replace(/\s/g, "");
  const match = CARD_PATTERNS.find((c) => c.pattern.test(clean));
  return match?.type ?? "unknown";
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function formatCvc(value: string): string {
  return value.replace(/\D/g, "").slice(0, 4);
}

function luhnValid(num: string): boolean {
  const clean = num.replace(/\s/g, "");
  if (clean.length < 13) return false;
  let sum = 0;
  let dbl = false;
  for (let i = clean.length - 1; i >= 0; i--) {
    let d = Number(clean[i]);
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

export default function PaymentFormClient() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");
  const [saveCard, setSaveCard] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const cardType = useMemo(() => detectCard(cardNumber), [cardNumber]);
  const isCardValid = useMemo(() => luhnValid(cardNumber), [cardNumber]);
  const expiryValid = useMemo(() => {
    const m = /^(\d{2})\/(\d{2})$/.exec(expiry);
    if (!m) return false;
    const month = Number(m[1]);
    const year = 2000 + Number(m[2]);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const end = new Date(year, month, 0, 23, 59, 59);
    return end >= now;
  }, [expiry]);
  const cvcValid = cvc.length >= 3;
  const zipValid = /^[0-9A-Za-z -]{3,10}$/.test(zip);
  const nameValid = cardName.trim().length >= 2;

  const allValid = isCardValid && expiryValid && cvcValid && zipValid && nameValid;

  return (
    <div>
      <PageHeader
        title="Payment Form"
        description="UI-only card form with card-type detection, formatted inputs and validation hints."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Payment Form" },
        ]}
        actions={
          <Badge variant={allValid ? "success" : "primary"} size="lg">
            <CreditCardIcon className="size-4" /> {cardType === "unknown" ? "Card" : cardType.toUpperCase()}
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        {/* form */}
        <Card>
          <CardHeader
            title="Card details"
            subtitle="This is a UI-only form — no real charges are made."
            action={
              <Badge variant="outline" size="sm">
                UI-only
              </Badge>
            }
          />
          <FormSection title="Billing information" columns={1}>
            <FormField
              label="Name on card"
              htmlFor="pf-name"
              required
              hint="Exactly as it appears on the card."
              error={cardName && !nameValid ? "Enter the full name." : undefined}
            >
              <div className="relative">
                <input
                  id="pf-name"
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Aarav Mehta"
                  className={cardName && !nameValid ? `${inputClass} border-red ring-2 ring-red/20` : nameValid ? `${inputClass} border-primary ring-2 ring-primary/20` : inputClass}
                />
                {nameValid && <span className="absolute inset-y-0 right-3 flex items-center text-primary"><CheckIcon className="size-4" /></span>}
              </div>
            </FormField>
            <FormField
              label="Card number"
              htmlFor="pf-num"
              required
              hint={cardNumber ? `Detected: ${cardType === "unknown" ? "Unknown" : CARD_PATTERNS.find((c) => c.type === cardType)?.label}` : "16 digits, auto-formatted."}
              error={cardNumber && !isCardValid ? "Enter a valid card number." : undefined}
            >
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-dark-5 dark:text-dark-6">
                  <CreditCardIcon className="size-5" />
                </span>
                <input
                  id="pf-num"
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  className={`${cardNumber && !isCardValid ? `${inputClass} border-red pl-10 ring-2 ring-red/20` : isCardValid ? `${inputClass} border-primary pl-10 ring-2 ring-primary/20` : `${inputClass} pl-10`}`}
                />
                {cardType !== "unknown" && (
                  <span className="absolute inset-y-0 right-3 flex items-center text-xs font-bold text-dark dark:text-white">
                    {CARD_PATTERNS.find((c) => c.type === cardType)?.glyph}
                  </span>
                )}
              </div>
            </FormField>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <FormField
                label="Expiry"
                htmlFor="pf-exp"
                required
                hint="MM/YY"
                error={expiry && !expiryValid ? "Invalid" : undefined}
              >
                <input
                  id="pf-exp"
                  type="text"
                  inputMode="numeric"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="12/27"
                  className={expiry && !expiryValid ? `${inputClass} border-red ring-2 ring-red/20` : expiryValid ? `${inputClass} border-primary ring-2 ring-primary/20` : inputClass}
                />
              </FormField>
              <FormField
                label="CVC"
                htmlFor="pf-cvc"
                required
                hint="3-4 digits"
                error={cvc && !cvcValid ? "Invalid" : undefined}
              >
                <input
                  id="pf-cvc"
                  type="text"
                  inputMode="numeric"
                  value={cvc}
                  onChange={(e) => setCvc(formatCvc(e.target.value))}
                  placeholder="123"
                  className={cvc && !cvcValid ? `${inputClass} border-red ring-2 ring-red/20` : cvcValid ? `${inputClass} border-primary ring-2 ring-primary/20` : inputClass}
                />
              </FormField>
              <FormField
                label="Billing ZIP"
                htmlFor="pf-zip"
                required
                hint="Postal code"
                error={zip && !zipValid ? "Invalid" : undefined}
              >
                <input
                  id="pf-zip"
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.toUpperCase().slice(0, 10))}
                  placeholder="94107"
                  className={zip && !zipValid ? `${inputClass} border-red ring-2 ring-red/20` : zipValid ? `${inputClass} border-primary ring-2 ring-primary/20` : inputClass}
                />
              </FormField>
            </div>
            <FormField label="Country" htmlFor="pf-country">
              <select id="pf-country" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass}>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>France</option>
                <option>India</option>
                <option>Japan</option>
                <option>Australia</option>
              </select>
            </FormField>
            <label className="flex items-center gap-3 rounded-lg border border-stroke p-3 text-sm text-dark dark:border-dark-3 dark:text-white">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="size-4 rounded border-stroke accent-[var(--color-primary)]"
              />
              Save this card for future purchases
            </label>
          </FormSection>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <p className="text-xs text-dark-5 dark:text-dark-6">
              <CheckIcon className="mr-1 inline size-3 text-primary" />
              Secured with 256-bit TLS. UI-only — no real payment is processed.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="md">Cancel</Button>
              <Button variant="primary" size="md" disabled={!allValid} onClick={() => setSubmitted(true)}>
                Pay $129.00
              </Button>
            </div>
          </div>
        </Card>

        {/* preview + summary */}
        <div className="space-y-6">
          {/* card preview */}
          <div className="relative aspect-[1.586] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-dark via-dark-3 to-dark p-5 text-white shadow-card-2 dark:from-gray-dark dark:via-dark-3 dark:to-dark-2">
            <div className="absolute -right-12 -top-12 size-44 rounded-full bg-primary/30 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 size-44 rounded-full bg-accent/20 blur-2xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/60">Helios Pro</p>
                  <p className="mt-1 text-sm font-medium">Helios Pro Credit</p>
                </div>
                <span className="text-xs font-bold uppercase">
                  {cardType === "unknown" ? "Card" : CARD_PATTERNS.find((c) => c.type === cardType)?.label}
                </span>
              </div>
              {/* chip */}
              <div className="grid size-9 place-items-center rounded-md bg-gradient-to-br from-accent to-accent-dark">
                <div className="size-5 rounded-sm border border-white/40" />
              </div>
              <div>
                <p className="font-mono text-lg tracking-widest">
                  {cardNumber || "•••• •••• •••• ••••"}
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-white/50">Cardholder</p>
                    <p className="text-sm font-medium uppercase">{cardName || "Your name"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-white/50">Expires</p>
                    <p className="text-sm font-medium">{expiry || "MM/YY"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* validation checklist */}
          <Card>
            <CardHeader title="Validation checklist" subtitle="Each rule lights up green when satisfied." />
            <ul className="space-y-2 text-sm">
              {[
                { ok: nameValid, label: "Name on card (min 2 chars)" },
                { ok: isCardValid, label: "Card number passes Luhn check" },
                { ok: cardType !== "unknown" && cardNumber.length > 0, label: "Card type detected" },
                { ok: expiryValid, label: "Expiry MM/YY is in the future" },
                { ok: cvcValid, label: "CVC is 3-4 digits" },
                { ok: zipValid, label: "Billing ZIP / postal code" },
              ].map((r) => (
                <li key={r.label} className={classNames("flex items-center gap-2", r.ok ? "text-primary" : "text-dark-5 dark:text-dark-6")}>
                  <span
                    className={classNames(
                      "grid size-5 place-items-center rounded-full text-white",
                      r.ok ? "bg-primary" : "bg-gray-3 dark:bg-dark-3",
                    )}
                  >
                    {r.ok ? <CheckIcon className="size-3" /> : <span className="size-1 rounded-full bg-current" />}
                  </span>
                  {r.label}
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg bg-gray-2 p-2 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
              Try <span className="font-mono text-primary">4242 4242 4242 4242</span> (Visa),{" "}
              <span className="font-mono text-primary">5555 5555 5555 4444</span> (Mastercard), or{" "}
              <span className="font-mono text-primary">3782 822463 10005</span> (Amex) to see detection + Luhn work.
            </p>
          </Card>

          {/* accepted cards */}
          <Card>
            <CardHeader title="Accepted cards" subtitle="All major networks." />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CARD_PATTERNS.map((c) => (
                <div
                  key={c.type}
                  className={classNames(
                    "rounded-lg border-2 p-3 text-center transition",
                    cardType === c.type
                      ? "border-primary bg-primary-subtle/60 dark:bg-primary/10"
                      : "border-stroke dark:border-dark-3",
                  )}
                >
                  <p className="text-sm font-bold text-dark dark:text-white">{c.glyph}</p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">{c.label}</p>
                </div>
              ))}
              <div className="rounded-lg border-2 border-dashed border-stroke p-3 text-center dark:border-dark-3">
                <p className="text-sm font-bold text-dark-5 dark:text-dark-6">+ More</p>
                <p className="text-xs text-dark-5 dark:text-dark-6">Coming soon</p>
              </div>
            </div>
          </Card>

          {submitted && (
            <Card className="border-primary bg-primary-subtle/40 dark:bg-primary/10">
              <div className="flex items-start gap-3">
                <span className="grid size-9 flex-shrink-0 place-items-center rounded-full bg-primary text-white">
                  <CheckIcon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-dark dark:text-white">Payment captured (simulated)</p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">
                    $129.00 charged to {CARD_PATTERNS.find((c) => c.type === cardType)?.label ?? "card"} ending in{" "}
                    {cardNumber.replace(/\s/g, "").slice(-4)}.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
