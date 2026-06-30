"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Input, Label, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Star, X, Plus, Phone, CreditCard, Palette, Check } from "lucide-react";

const PALETTE = [
  { name: "Emerald", hex: "#10b981" },
  { name: "Sky", hex: "#0ea5e9" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Orange", hex: "#f97316" },
  { name: "Teal", hex: "#14b8a6" },
  { name: "Lime", hex: "#84cc16" },
  { name: "Fuchsia", hex: "#d946ef" },
  { name: "Slate", hex: "#64748b" },
];

const COLORS_SHORT = ["#10b981", "#0ea5e9", "#8b5cf6", "#f43f5e", "#f59e0b", "#ec4899"];

export default function AdvancedFormPage() {
  const [tags, setTags] = useState<string[]>(["design", "ui", "ux"]);
  const [tagInput, setTagInput] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [slider, setSlider] = useState(40);
  const [color, setColor] = useState("#10b981");
  const [showPalette, setShowPalette] = useState(false);
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState("");
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);
  const [segmented, setSegmented] = useState("weekly");
  const [toggleGroup, setToggleGroup] = useState<string[]>(["email", "push"]);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags((p) => [...p, t]);
    setTagInput("");
  };

  const handleOtp = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  const formatPhone = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };

  const formatCard = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 16);
    return d.match(/.{1,4}/g)?.join(" ") ?? d;
  };

  const detectBrand = () => {
    const d = card.replace(/\s/g, "");
    if (/^4/.test(d)) return "VISA";
    if (/^5[1-5]/.test(d)) return "MASTERCARD";
    if (/^3[47]/.test(d)) return "AMEX";
    if (/^6/.test(d)) return "DISCOVER";
    return "";
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Advanced Inputs"
        description="Tags, OTP, sliders, color pickers, masked inputs, ratings, and segmented controls."
        breadcrumbs={[{ label: "Forms" }, { label: "Advanced" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Tags input */}
        <Card>
          <CardHeader title="Tags Input" description="Press Enter to add tags" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 p-2 dark:border-gray-800">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  {t}
                  <button onClick={() => setTags((p) => p.filter((x) => x !== t))} aria-label={`Remove ${t}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <div className="flex flex-1 items-center gap-1">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add tag..."
                  className="flex-1 border-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                />
                <button onClick={addTag} aria-label="Add tag" className="text-gray-400 hover:text-brand-500"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{tags.length} tags added · Press Backspace on empty input to remove the last tag</p>
          </CardBody>
        </Card>

        {/* OTP */}
        <Card>
          <CardHeader title="OTP / Verification Code" description="6-digit code input" />
          <CardBody>
            <div className="flex items-center justify-between gap-2">
              {otp.map((d, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  value={d}
                  onChange={(e) => handleOtp(i, e.target.value)}
                  maxLength={1}
                  inputMode="numeric"
                  className="h-14 w-12 rounded-lg border border-gray-200 text-center text-xl font-bold text-gray-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-gray-800 dark:text-white"
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">A 6-digit code was sent to your phone. Enter it above.</p>
            <Button variant="ghost" size="sm" className="mt-2">Resend code</Button>
          </CardBody>
        </Card>

        {/* Slider */}
        <Card>
          <CardHeader title="Slider / Range" description="Numeric range selector" />
          <CardBody className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <Label>Volume</Label>
                <span className="font-semibold text-brand-600 dark:text-brand-400">{slider}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-500 dark:bg-gray-800"
              />
              <div className="mt-1 flex justify-between text-[10px] text-gray-400">
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
            </div>
            <div>
              <Label>Budget range</Label>
              <div className="flex items-center gap-3">
                <Input type="number" defaultValue={500} />
                <span className="text-gray-400">—</span>
                <Input type="number" defaultValue={5000} />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <Label>Difficulty</Label>
                <Badge tone="warning" variant="soft">Hard</Badge>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setSlider(n * 20)}
                    className={cn("h-2 flex-1 rounded-full", n * 20 <= slider ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-800")}
                  />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Color picker */}
        <Card>
          <CardHeader title="Color Picker" description="Select a brand color" />
          <CardBody className="space-y-3">
            <div className="relative">
              <button
                onClick={() => setShowPalette((v) => !v)}
                className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 text-left dark:border-gray-800"
              >
                <div className="h-9 w-9 rounded-md border border-gray-200 dark:border-gray-800" style={{ backgroundColor: color }} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{PALETTE.find((p) => p.hex === color)?.name ?? "Custom"}</p>
                  <p className="font-mono text-xs uppercase text-gray-500 dark:text-gray-400">{color}</p>
                </div>
                <Palette className="h-4 w-4 text-gray-400" />
              </button>
              {showPalette && (
                <div className="absolute z-10 mt-2 w-full rounded-xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
                  <div className="grid grid-cols-6 gap-2">
                    {PALETTE.map((p) => (
                      <button
                        key={p.hex}
                        onClick={() => { setColor(p.hex); setShowPalette(false); }}
                        className="group relative aspect-square rounded-md border-2 transition-all"
                        style={{ backgroundColor: p.hex, borderColor: color === p.hex ? "white" : "transparent" }}
                        aria-label={p.name}
                      >
                        {color === p.hex && <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                    <Label className="mb-0">Custom</Label>
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-12 cursor-pointer rounded border-0 bg-transparent" />
                    <Input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 font-mono" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {COLORS_SHORT.map((c) => (
                <button key={c} onClick={() => setColor(c)} className={cn("h-8 w-8 rounded-md border-2", color === c ? "border-gray-900 dark:border-white" : "border-transparent")} style={{ backgroundColor: c }} aria-label={`Pick ${c}`} />
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Masked inputs */}
        <Card>
          <CardHeader title="Masked Inputs" description="Formatted phone and card numbers" />
          <CardBody className="space-y-4">
            <div>
              <Label>Phone number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} className="pl-9" placeholder="(415) 555-0142" />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Auto-formats to (XXX) XXX-XXXX</p>
            </div>
            <div>
              <Label>Card number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input value={card} onChange={(e) => setCard(formatCard(e.target.value))} className="pl-9 font-mono" placeholder="4242 4242 4242 4242" maxLength={19} />
                {detectBrand() && <span className="absolute right-3 top-1/2 -translate-y-1/2"><Badge tone="brand" variant="solid">{detectBrand()}</Badge></span>}
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Auto-detects card brand</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Expiry</Label>
                <Input placeholder="MM/YY" maxLength={5} className="font-mono" />
              </div>
              <div>
                <Label>CVC</Label>
                <Input placeholder="123" maxLength={4} className="font-mono" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader title="Rating" description="Star rating input" />
          <CardBody className="space-y-5">
            <div>
              <Label>Rate your experience</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(n)}
                    aria-label={`${n} stars`}
                  >
                    <Star className={cn("h-7 w-7 transition-colors", (hoverRating || rating) >= n ? "fill-warning-400 text-warning-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700")} />
                  </button>
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{hoverRating || rating}.0</span>
              </div>
            </div>
            <div>
              <Label>Difficulty</Label>
              <div className="flex gap-1.5">
                {["Easy", "Medium", "Hard", "Expert"].map((label, i) => (
                  <button
                    key={label}
                    onClick={() => setRating(i + 1)}
                    className={cn("rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                      rating === i + 1 ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Segmented & toggle group */}
        <Card className="lg:col-span-2">
          <CardHeader title="Segmented & Toggle Group" description="Single-select and multi-select button groups" />
          <CardBody className="space-y-5">
            <div>
              <Label>Delivery frequency</Label>
              <div className="flex flex-wrap items-center gap-1 rounded-lg border border-gray-200 p-1 dark:border-gray-800">
                {["daily", "weekly", "monthly", "quarterly"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSegmented(s)}
                    className={cn("flex-1 rounded-md px-3 py-2 text-xs font-semibold capitalize transition-colors",
                      segmented === s ? "bg-brand-500 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                    )}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div>
              <Label>Notification channels</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "email", label: "Email" },
                  { id: "push", label: "Push" },
                  { id: "sms", label: "SMS" },
                  { id: "inapp", label: "In-app" },
                ].map((c) => {
                  const on = toggleGroup.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => setToggleGroup((p) => on ? p.filter((x) => x !== c.id) : [...p, c.id])}
                      className={cn("flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors",
                        on ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-700 dark:bg-brand-500/15 dark:text-brand-300" : "border-gray-200 text-gray-500 hover:border-brand-300 dark:border-gray-800 dark:text-gray-400"
                      )}
                    >
                      <span className={cn("flex h-4 w-4 items-center justify-center rounded", on ? "bg-brand-500 text-white" : "border border-gray-300 dark:border-gray-700")}>
                        {on && <Check className="h-3 w-3" />}
                      </span>
                      {c.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{toggleGroup.length} channels selected</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
