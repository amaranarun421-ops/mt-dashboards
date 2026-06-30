"use client";
import { PageHeader, Card, CardHeader, CardBody, Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

type Tone = "brand" | "success" | "warning" | "error" | "purple" | "orange" | "gray";

const TONE_BORDER: Record<Tone, string> = {
  brand: "border-brand-500 border-t-transparent",
  success: "border-success-500 border-t-transparent",
  warning: "border-warning-500 border-t-transparent",
  error: "border-error-500 border-t-transparent",
  purple: "border-purple-500 border-t-transparent",
  orange: "border-orange-500 border-t-transparent",
  gray: "border-gray-500 border-t-transparent",
};

const TONE_TEXT: Record<Tone, string> = {
  brand: "text-brand-500",
  success: "text-success-500",
  warning: "text-warning-500",
  error: "text-error-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
  gray: "text-gray-500",
};

const TONE_BG: Record<Tone, string> = {
  brand: "bg-brand-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  gray: "bg-gray-500",
};

/* ---------- Border spinner ---------- */
function BorderSpinner({ size = 24, tone = "brand", thickness = "border-2" }: { size?: number; tone?: Tone; thickness?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      style={{ width: size, height: size }}
      className={cn("inline-block animate-spin rounded-full", thickness, TONE_BORDER[tone])}
    />
  );
}

/* ---------- Dual ring spinner ---------- */
function DualRing({ size = 32, tone = "brand" }: { size?: number; tone?: Tone }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-block animate-spin rounded-full", TONE_TEXT[tone])}
      style={{
        width: size,
        height: size,
        borderColor: "currentColor",
        borderRightColor: "transparent",
        borderBottomColor: "currentColor",
        borderLeftColor: "currentColor",
        borderTopColor: "transparent",
        borderWidth: 2,
        borderStyle: "solid",
      }}
    />
  );
}

/* ---------- Dots spinner ---------- */
function DotsSpinner({ tone = "brand" }: { tone?: Tone }) {
  return (
    <span role="status" aria-label="Loading" className={cn("inline-flex items-center gap-1.5", TONE_TEXT[tone])}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-2.5 w-2.5 rounded-full bg-current"
          style={{
            animation: "spinnersBounce 1.4s ease-in-out infinite both",
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes spinnersBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </span>
  );
}

/* ---------- Pulse spinner ---------- */
function PulseSpinner({ size = 28, tone = "brand" }: { size?: number; tone?: Tone }) {
  return (
    <span role="status" aria-label="Loading" className="inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <span className={cn("absolute inline-block rounded-full opacity-60", TONE_BG[tone])} style={{ width: size, height: size, animation: "spinnersPulse 1.5s ease-in-out infinite" }} />
      <span className={cn("relative inline-block rounded-full", TONE_BG[tone])} style={{ width: size * 0.6, height: size * 0.6 }} />
      <style jsx>{`
        @keyframes spinnersPulse {
          0%, 100% { transform: scale(0.4); opacity: 0.8; }
          50% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </span>
  );
}

/* ---------- Bars spinner ---------- */
function BarsSpinner({ tone = "brand" }: { tone?: Tone }) {
  return (
    <span role="status" aria-label="Loading" className={cn("inline-flex items-end gap-1", TONE_TEXT[tone])} style={{ height: 28 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="inline-block w-1.5 rounded-sm bg-current"
          style={{
            height: "100%",
            transformOrigin: "bottom",
            animation: "spinnersBars 1s ease-in-out infinite",
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes spinnersBars {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </span>
  );
}

/* ---------- Mini ring (with label) ---------- */
function LoadingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-4 py-3 dark:border-gray-800">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}

export default function SpinnersPage() {
  const tones: Tone[] = ["brand", "success", "warning", "error", "purple", "orange"];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Spinners"
        description="Loading indicators in multiple designs — border ring, dual ring, dots, pulse, and bars — across sizes and tones."
        breadcrumbs={[{ label: "UI Components" }, { label: "Spinners" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Sizes */}
        <Card>
          <CardHeader title="Border Ring — Sizes" description="From 16px to 56px" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-6">
              {[16, 24, 32, 44, 56].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <BorderSpinner size={s} />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{s}px</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader title="Border Ring — Colors" description="Six tones + neutral gray" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-6">
              {tones.concat("gray").map((t) => (
                <div key={t} className="flex flex-col items-center gap-2">
                  <BorderSpinner size={32} tone={t} />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{t}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Dual ring */}
        <Card>
          <CardHeader title="Dual Ring" description="Two-tone rotating ring" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-6">
              {tones.slice(0, 4).map((t) => (
                <div key={t} className="flex flex-col items-center gap-2">
                  <DualRing size={36} tone={t} />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{t}</span>
                </div>
              ))}
              {[24, 36, 48].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <DualRing size={s} />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{s}px</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Dots */}
        <Card>
          <CardHeader title="Dots" description="Three bouncing dots — soft & friendly" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-8">
              {tones.slice(0, 4).map((t) => (
                <div key={t} className="flex flex-col items-center gap-2">
                  <DotsSpinner tone={t} />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{t}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Pulse */}
        <Card>
          <CardHeader title="Pulse" description="Sonar-style expanding ring" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-8">
              {tones.slice(0, 4).map((t) => (
                <div key={t} className="flex flex-col items-center gap-2">
                  <PulseSpinner size={36} tone={t} />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{t}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Bars */}
        <Card>
          <CardHeader title="Bars" description="Equalizer-style animated bars" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-8">
              {tones.slice(0, 4).map((t) => (
                <div key={t} className="flex flex-col items-center gap-2">
                  <BarsSpinner tone={t} />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{t}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Inline loading states */}
        <Card>
          <CardHeader title="Inline Loading States" description="Spinners inside buttons & rows" />
          <CardBody className="space-y-3">
            <LoadingRow label="Saving document">
              <BorderSpinner size={16} />
              <span className="text-xs text-gray-500">Saving…</span>
            </LoadingRow>
            <LoadingRow label="Fetching analytics">
              <DotsSpinner />
              <span className="text-xs text-gray-500">Crunching numbers</span>
            </LoadingRow>
            <LoadingRow label="Syncing files">
              <BarsSpinner tone="purple" />
              <span className="text-xs text-gray-500">3 of 12 files</span>
            </LoadingRow>
            <LoadingRow label="Connecting to server">
              <PulseSpinner size={24} tone="success" />
              <span className="text-xs text-gray-500">Establishing link</span>
            </LoadingRow>
            <div className="pt-2">
              <Button disabled variant="primary">
                <BorderSpinner size={14} tone="gray" />
                <span className="text-white">Please wait</span>
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Full-page loader */}
        <Card>
          <CardHeader title="Full-Page Loader" description="Centered, with optional label" />
          <CardBody>
            <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <div className="flex flex-col items-center gap-4">
                <DualRing size={48} />
                <div className="flex items-center gap-2">
                  <Badge tone="brand" variant="soft">Loading workspace</Badge>
                </div>
                <p className="text-xs text-gray-500">Preparing your dashboards…</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card>
          <CardHeader title="Choosing a Spinner" description="Match the spinner to the moment" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Border ring</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Default choice for buttons, rows & inline status. Compact & predictable.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Dots</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Friendlier — use for chat typing indicators and lightweight content fetches.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Bars</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Equalizer feel — good for media players and audio processing.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Pulse</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Live / connected states — pair with a status dot to imply realtime activity.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
