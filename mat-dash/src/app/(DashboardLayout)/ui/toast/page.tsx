"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

// Minimal toast implementation using local state (no external dep needed)
type Toast = { id: number; title: string; description?: string; variant: "default" | "success" | "warning" | "error" | "info" };

const ToastPage = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
  };

  const variantStyles: Record<Toast["variant"], { bg: string; icon: string; iconColor: string }> = {
    default: { bg: "bg-background border border-defaultBorder", icon: "solar:info-circle-bold-duotone", iconColor: "text-primary" },
    success: { bg: "bg-lightsuccess border border-success/20", icon: "solar:check-circle-bold-duotone", iconColor: "text-success" },
    warning: { bg: "bg-lightwarning border border-warning/20", icon: "solar:danger-triangle-bold-duotone", iconColor: "text-warning" },
    error: { bg: "bg-lighterror border border-error/20", icon: "solar:danger-bold-duotone", iconColor: "text-error" },
    info: { bg: "bg-lightinfo border border-info/20", icon: "solar:bell-bing-bold-duotone", iconColor: "text-info" },
  };

  return (
    <PageContainer
      title="Toast"
      description="Non-intrusive notifications that appear temporarily. Five variants with auto-dismiss and manual close."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Trigger Toasts" description="Click buttons to show different variants">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => push({ variant: "default", title: "Default Toast", description: "This is a default notification." })}>Default</Button>
            <Button variant="success" onClick={() => push({ variant: "success", title: "Success!", description: "Your changes have been saved." })}>Success</Button>
            <Button variant="warning" onClick={() => push({ variant: "warning", title: "Warning", description: "Your trial expires soon." })}>Warning</Button>
            <Button variant="destructive" onClick={() => push({ variant: "error", title: "Error", description: "Something went wrong." })}>Error</Button>
            <Button variant="lightinfo" onClick={() => push({ variant: "info", title: "Info", description: "New version available." })}>Info</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Static Examples" description="Visual reference of each variant">
          <div className="space-y-3">
            {(["default","success","warning","error","info"] as const).map((v) => {
              const s = variantStyles[v];
              return (
                <div key={v} className={`flex items-start gap-3 p-3.5 rounded-lg ${s.bg}`}>
                  <Icon icon={s.icon} width={22} className={`${s.iconColor} shrink-0`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold capitalize">{v} toast</p>
                    <p className="text-xs opacity-80 mt-0.5">This is a {v} notification message.</p>
                  </div>
                  <button onClick={() => {}} className="opacity-50 hover:opacity-100"><Icon icon="solar:close-circle-bold" width={18} /></button>
                </div>
              );
            })}
          </div>
        </DemoBlock>

        <DemoBlock title="With Action Button" description="Toast with inline action">
          <Button variant="outline" onClick={() => push({ variant: "info", title: "File deleted", description: "Tap undo to restore." })}>
            Trigger Action Toast
          </Button>
          <div className="mt-4 p-3.5 rounded-lg bg-lightinfo border border-info/20 flex items-start gap-3">
            <Icon icon="solar:bell-bing-bold-duotone" width={22} className="text-info shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold">File deleted</p>
              <p className="text-xs opacity-80 mt-0.5">The file was removed from your storage.</p>
            </div>
            <Button size="sm" variant="outline" className="border-info text-info hover:bg-info hover:text-white">Undo</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Positions" description="Where toasts appear on screen">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Top Left", icon: "solar:align-top-left-bold-duotone" },
              { label: "Top Center", icon: "solar:align-vertical-center-bold-duotone" },
              { label: "Top Right", icon: "solar:align-top-right-bold-duotone" },
              { label: "Bottom Left", icon: "solar:align-bottom-left-bold-duotone" },
              { label: "Bottom Center", icon: "solar:align-horizontal-center-bold-duotone" },
              { label: "Bottom Right", icon: "solar:align-bottom-right-bold-duotone" },
            ].map((p) => (
              <button key={p.label} className="flex flex-col items-center gap-2 p-3 rounded-lg border border-defaultBorder hover:bg-lightprimary hover:text-primary text-xs">
                <Icon icon={p.icon} width={22} />
                {p.label}
              </button>
            ))}
          </div>
        </DemoBlock>
      </div>

      {/* Live toast container */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
        {toasts.map((t) => {
          const s = variantStyles[t.variant];
          return (
            <div key={t.id} className={`flex items-start gap-3 p-3.5 rounded-lg shadow-md ${s.bg} animate-in slide-in-from-right-full`}>
              <Icon icon={s.icon} width={22} className={`${s.iconColor} shrink-0`} />
              <div className="flex-1">
                <p className="text-sm font-semibold">{t.title}</p>
                {t.description && <p className="text-xs opacity-80 mt-0.5">{t.description}</p>}
              </div>
              <button onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} className="opacity-50 hover:opacity-100">
                <Icon icon="solar:close-circle-bold" width={18} />
              </button>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default ToastPage;
