"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, Badge, Switch } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  Sparkles,
  X,
  Bell,
  Undo2,
} from "lucide-react";

type Tone = "info" | "success" | "warning" | "error" | "brand";
type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center";

const TONE_STYLES: Record<Tone, { card: string; icon: string; bar: string }> = {
  info: {
    card: "border-l-4 border-l-accent-500",
    icon: "text-accent-500",
    bar: "bg-accent-500",
  },
  success: {
    card: "border-l-4 border-l-success-500",
    icon: "text-success-500",
    bar: "bg-success-500",
  },
  warning: {
    card: "border-l-4 border-l-warning-500",
    icon: "text-warning-500",
    bar: "bg-warning-500",
  },
  error: {
    card: "border-l-4 border-l-error-500",
    icon: "text-error-500",
    bar: "bg-error-500",
  },
  brand: {
    card: "border-l-4 border-l-brand-500",
    icon: "text-brand-500",
    bar: "bg-brand-500",
  },
};

const TONE_ICON: Record<Tone, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  brand: Sparkles,
};

const POSITION_CLASS: Record<Position, string> = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
};

type Toast = {
  id: number;
  tone: Tone;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
  duration?: number;
};

let toastId = 0;

export default function ToastsPage() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [position, setPosition] = useState<Position>("top-right");
  const [autoDismiss, setAutoDismiss] = useState(true);
  const timersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const push = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = ++toastId;
      const toast: Toast = { id, dismissible: true, duration: 4000, ...t };
      setToasts((prev) => [...prev, toast]);
      if (autoDismiss && t.duration !== 0) {
        timersRef.current[id] = setTimeout(() => dismiss(id), toast.duration);
      }
    },
    [autoDismiss, dismiss]
  );

  // Clear timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  const pushInfo = () => push({ tone: "info", title: "Update available", description: "A new version of Nimbus Pro is ready to install." });
  const pushSuccess = () => push({ tone: "success", title: "Changes saved", description: "Your profile has been updated successfully." });
  const pushWarning = () => push({ tone: "warning", title: "Storage almost full", description: "You've used 92% of your 10 GB quota." });
  const pushError = () => push({ tone: "error", title: "Upload failed", description: "Network error. Please retry in a moment." });
  const pushBrand = () => push({ tone: "brand", title: "Welcome to Nimbus Pro", description: "Thanks for signing up — your trial starts now." });
  const pushWithAction = () =>
    push({
      tone: "info",
      title: "Project archived",
      description: "Nimbus Pro was moved to the archive.",
      action: {
        label: "Undo",
        onClick: () => push({ tone: "success", title: "Restored", description: "Project is back in your workspace." }),
      },
      duration: 6000,
    });
  const pushLongLived = () =>
    push({
      tone: "warning",
      title: "Connection lost",
      description: "Reconnecting… your work is saved locally.",
      duration: 0,
    });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Toasts"
        description="Transient notifications anchored to a screen corner — five tones, five positions, optional action button and auto-dismiss."
        breadcrumbs={[{ label: "UI Components" }, { label: "Toasts" }]}
      />

      {/* Toast viewport */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={cn("pointer-events-none fixed z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2", POSITION_CLASS[position])}
      >
        {toasts.map((t) => {
          const Icon = TONE_ICON[t.tone];
          const styles = TONE_STYLES[t.tone];
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-theme-lg animate-slide-up dark:border-gray-800 dark:bg-gray-900",
                styles.card
              )}
              role="status"
            >
              <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", styles.icon)} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.title}</p>
                {t.description && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{t.description}</p>}
                {t.action && (
                  <button
                    onClick={() => {
                      t.action?.onClick();
                      dismiss(t.id);
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Undo2 className="h-3 w-3" /> {t.action.label}
                  </button>
                )}
              </div>
              {t.dismissible && (
                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              {autoDismiss && t.duration !== 0 && (
                <span
                  className={cn("absolute bottom-0 left-0 h-0.5", styles.bar)}
                  style={{
                    animation: `toastProgress ${t.duration}ms linear forwards`,
                  }}
                />
              )}
              <style jsx>{`
                @keyframes toastProgress {
                  from { width: 100%; }
                  to { width: 0%; }
                }
              `}</style>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Tones */}
        <Card>
          <CardHeader title="Tones" description="Click to spawn a toast in the chosen corner" />
          <CardBody className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={pushInfo}>
                <Info className="h-3.5 w-3.5" /> Info
              </Button>
              <Button variant="secondary" size="sm" onClick={pushSuccess}>
                <CheckCircle2 className="h-3.5 w-3.5" /> Success
              </Button>
              <Button variant="secondary" size="sm" onClick={pushWarning}>
                <AlertTriangle className="h-3.5 w-3.5" /> Warning
              </Button>
              <Button variant="secondary" size="sm" onClick={pushError}>
                <XCircle className="h-3.5 w-3.5" /> Error
              </Button>
              <Button variant="secondary" size="sm" onClick={pushBrand}>
                <Sparkles className="h-3.5 w-3.5" /> Brand
              </Button>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-900/40">
              Each toast carries a tone-colored left border, matching icon, and a progress bar at the bottom that drains as the auto-dismiss timer runs.
            </div>
          </CardBody>
        </Card>

        {/* Position */}
        <Card>
          <CardHeader title="Position" description="Where on the viewport the toast appears" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(Object.keys(POSITION_CLASS) as Position[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPosition(p)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-xs font-semibold transition-all",
                    position === p
                      ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400"
                      : "border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:text-gray-300"
                  )}
                >
                  {p.replace("-", " ")}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Switch checked={autoDismiss} onChange={setAutoDismiss} size="sm" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Auto-dismiss after 4 seconds</span>
            </div>
          </CardBody>
        </Card>

        {/* With action */}
        <Card>
          <CardHeader title="With Action" description="Inline undo / retry button" />
          <CardBody className="space-y-3">
            <Button variant="outline" size="sm" onClick={pushWithAction}>
              <Undo2 className="h-3.5 w-3.5" /> Trigger &quot;Undo&quot; toast
            </Button>
            <p className="text-xs text-gray-500">
              Action buttons appear under the description. Clicking them dismisses the toast and runs the handler — perfect for undoing destructive actions.
            </p>
          </CardBody>
        </Card>

        {/* Without close / persistent */}
        <Card>
          <CardHeader title="Persistent Toast" description="No auto-dismiss until user closes it" />
          <CardBody className="space-y-3">
            <Button variant="outline" size="sm" onClick={pushLongLived}>
              <Bell className="h-3.5 w-3.5" /> Show persistent toast
            </Button>
            <p className="text-xs text-gray-500">
              Set <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">duration: 0</code> to keep the toast on screen. Useful for connection-loss or critical errors.
            </p>
          </CardBody>
        </Card>

        {/* Stack demo */}
        <Card>
          <CardHeader title="Stack & Order" description="Toasts queue vertically with consistent gap" />
          <CardBody className="space-y-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                pushInfo();
                setTimeout(pushSuccess, 200);
                setTimeout(pushWarning, 400);
              }}
            >
              <Sparkles className="h-3.5 w-3.5" /> Spawn 3 toasts
            </Button>
            <p className="text-xs text-gray-500">
              Newer toasts appear at the bottom of the stack. Dismissed ones are removed without shifting layout abruptly.
            </p>
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card>
          <CardHeader title="Anatomy & Tips" description="What makes a great toast" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Duration</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">4s default. Use 6s+ for toasts with actions so the user has time to read &amp; react.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">One action</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Toasts are ephemeral — keep to a single, optional action. Anything more belongs in a modal.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Accessibility</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Wrap the viewport in <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">aria-live=&quot;polite&quot;</code> so screen readers announce new toasts.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Avoid spam</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">If the same event fires repeatedly, replace the existing toast instead of stacking duplicates.</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Live count */}
        <Card>
          <CardHeader title="Active Toasts" description="Currently on screen" />
          <CardBody>
            <div className="flex items-center gap-4">
              <Badge tone={toasts.length > 0 ? "brand" : "gray"} variant="soft">
                {toasts.length} active
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setToasts([])} disabled={toasts.length === 0}>
                <X className="h-3.5 w-3.5" /> Clear all
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
