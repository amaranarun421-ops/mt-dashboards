"use client";
import { useState, useEffect } from "react";
import { PageHeader, Card, CardHeader, CardBody, Progress, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Upload, RefreshCw } from "lucide-react";

type Tone = "brand" | "success" | "warning" | "error" | "purple" | "orange";

/* ---------- Tone lookup for gradient / circular / striped ---------- */
const TONE_GRADIENT: Record<Tone, string> = {
  brand: "from-brand-400 to-brand-600",
  success: "from-success-400 to-success-600",
  warning: "from-warning-400 to-warning-600",
  error: "from-error-400 to-error-600",
  purple: "from-purple-400 to-purple-600",
  orange: "from-orange-400 to-orange-600",
};

const TONE_SOLID: Record<Tone, string> = {
  brand: "bg-brand-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
};

const TONE_TEXT: Record<Tone, string> = {
  brand: "text-brand-600 dark:text-brand-400",
  success: "text-success-600 dark:text-success-400",
  warning: "text-warning-600 dark:text-warning-400",
  error: "text-error-600 dark:text-error-400",
  purple: "text-purple-600 dark:text-purple-400",
  orange: "text-orange-600 dark:text-orange-400",
};

const TONE_STROKE: Record<Tone, string> = {
  brand: "stroke-brand-500",
  success: "stroke-success-500",
  warning: "stroke-warning-500",
  error: "stroke-error-500",
  purple: "stroke-purple-500",
  orange: "stroke-orange-500",
};

const SIZES: { label: "sm" | "md" | "lg"; value: number }[] = [
  { label: "sm", value: 65 },
  { label: "md", value: 45 },
  { label: "lg", value: 78 },
];

const TONES: { key: Tone; label: string; value: number }[] = [
  { key: "brand", label: "Brand", value: 60 },
  { key: "success", label: "Success", value: 85 },
  { key: "warning", label: "Warning", value: 42 },
  { key: "error", label: "Error", value: 28 },
  { key: "purple", label: "Purple", value: 73 },
  { key: "orange", label: "Orange", value: 55 },
];

/* ---------- Striped progress (animated) ---------- */
function StripedProgress({ value, tone }: { value: number; tone: Tone }) {
  return (
    <div className="w-full">
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={cn("h-full rounded-full bg-stripes transition-all duration-500", TONE_SOLID[tone])}
          style={{ width: `${value}%` }}
        />
      </div>
      <style jsx>{`
        .bg-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.25) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.25) 50%,
            rgba(255, 255, 255, 0.25) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
          animation: stripes 1s linear infinite;
        }
        @keyframes stripes {
          from { background-position: 0 0; }
          to { background-position: 1rem 0; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Gradient progress ---------- */
function GradientProgress({ value, tone }: { value: number; tone: Tone }) {
  return (
    <div className="w-full">
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", TONE_GRADIENT[tone])}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ---------- Circular progress (SVG) ---------- */
function CircularProgress({
  value,
  tone,
  size = 120,
  stroke = 10,
  label,
}: {
  value: number;
  tone: Tone;
  size?: number;
  stroke?: number;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-gray-200 dark:stroke-gray-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className={cn("transition-all duration-700", TONE_STROKE[tone])}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-gray-900 dark:text-white">{value}%</span>
        {label && <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">{label}</span>}
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const [upload, setUpload] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setUpload((p) => {
        if (p >= 100) {
          setRunning(false);
          return 100;
        }
        return Math.min(100, p + Math.random() * 12);
      });
    }, 220);
    return () => clearInterval(id);
  }, [running]);

  const startUpload = () => {
    setUpload(0);
    setRunning(true);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Progress"
        description="Linear bars, sizes, tones, labels, gradients, animated stripes, and circular SVG progress indicators."
        breadcrumbs={[{ label: "UI Components" }, { label: "Progress" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Basic */}
        <Card>
          <CardHeader title="Basic Bar" description="The core Progress component" />
          <CardBody className="space-y-5">
            <Progress value={25} />
            <Progress value={50} />
            <Progress value={75} />
            <Progress value={100} />
            <Progress value={12} />
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader title="Sizes" description="sm, md (default), lg" />
          <CardBody className="space-y-6">
            {SIZES.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{s.label}</span>
                  <span className={cn("text-xs font-semibold", TONE_TEXT.brand)}>{s.value}%</span>
                </div>
                <Progress value={s.value} size={s.label} tone="brand" />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Tones */}
        <Card>
          <CardHeader title="Tones" description="Six color tones" />
          <CardBody className="space-y-5">
            {TONES.map((t) => (
              <div key={t.key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{t.label}</span>
                  <span className={cn("text-xs font-semibold", TONE_TEXT[t.key])}>{t.value}%</span>
                </div>
                <Progress value={t.value} tone={t.key} />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* With label & percentage */}
        <Card>
          <CardHeader title="With Label & Percentage" description="Inline context above the bar" />
          <CardBody className="space-y-5">
            {[
              { label: "Storage used", value: 68, sub: "6.8 GB of 10 GB" },
              { label: "Onboarding complete", value: 90, sub: "9 of 10 steps" },
              { label: "Monthly quota", value: 34, sub: "1,700 of 5,000 API calls" },
            ].map((row) => (
              <div key={row.label} className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{row.label}</span>
                  <span className="text-xs text-gray-500">{row.sub}</span>
                </div>
                <Progress value={row.value} tone="brand" showLabel />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Gradient */}
        <Card>
          <CardHeader title="Gradient" description="Soft two-stop gradient fills" />
          <CardBody className="space-y-5">
            {TONES.map((t) => (
              <div key={t.key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{t.label}</span>
                  <span className={cn("text-xs font-semibold", TONE_TEXT[t.key])}>{t.value}%</span>
                </div>
                <GradientProgress value={t.value} tone={t.key} />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Striped */}
        <Card>
          <CardHeader title="Striped & Animated" description="Diagonal stripes scrolling left-to-right" />
          <CardBody className="space-y-5">
            <StripedProgress value={75} tone="brand" />
            <StripedProgress value={55} tone="success" />
            <StripedProgress value={40} tone="warning" />
            <StripedProgress value={90} tone="purple" />
            <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-900/40">
              Stripes animate continuously to convey active processing — use sparingly to avoid distraction.
            </div>
          </CardBody>
        </Card>

        {/* Live upload demo */}
        <Card>
          <CardHeader
            title="Live Upload"
            description="A simulated async task with the bar bound to state"
            action={
              <Button size="sm" variant="secondary" onClick={startUpload} disabled={running}>
                {running ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                {running ? "Uploading…" : "Upload"}
              </Button>
            }
          />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">project-files.zip</span>
              <Badge tone={upload >= 100 ? "success" : running ? "brand" : "gray"} variant="soft">
                {upload >= 100 ? "Done" : running ? "Uploading" : "Idle"}
              </Badge>
            </div>
            <Progress value={Math.round(upload)} tone={upload >= 100 ? "success" : "brand"} size="lg" showLabel />
            <p className="text-xs text-gray-500">
              {upload >= 100
                ? "Upload complete — 4 files synced."
                : running
                ? `Transferring ${Math.round(upload)}% — ${(upload * 0.24).toFixed(1)} MB / 24 MB`
                : "Click Upload to begin."}
            </p>
          </CardBody>
        </Card>

        {/* Circular */}
        <Card>
          <CardHeader title="Circular Progress" description="SVG ring with center label" />
          <CardBody>
            <div className="flex flex-wrap items-center justify-center gap-8 py-4">
              <div className="flex flex-col items-center gap-2">
                <CircularProgress value={72} tone="brand" label="Storage" />
                <span className="text-xs font-medium text-gray-500">Brand · 72%</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CircularProgress value={88} tone="success" size={100} stroke={8} label="Health" />
                <span className="text-xs font-medium text-gray-500">Success · 88%</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CircularProgress value={34} tone="warning" size={90} stroke={9} label="Quota" />
                <span className="text-xs font-medium text-gray-500">Warning · 34%</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CircularProgress value={100} tone="purple" size={80} stroke={7} label="Synced" />
                <span className="text-xs font-medium text-gray-500">Complete · 100%</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card>
          <CardHeader title="Anatomy & Tips" description="When to use which style" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Linear bar</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Use for determinate tasks where the percentage is known. Combine with a label for context.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Striped / animated</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Reserve for long-running uploads or background syncs to signal liveness.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Circular</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Best for dashboard widgets &amp; small panels where vertical space is limited.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Indeterminate</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">If the total is unknown, use a Spinner instead of a partially-filled bar.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
