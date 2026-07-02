"use client";

import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function UiAlertsPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Alerts & Toasts"]} title="Alerts & Toasts" description="Inline messages and transient notifications." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6 space-y-3"><h3 className="mb-2 text-base font-semibold">Alert Variants</h3><Alert><CheckCircle2 className="h-4 w-4" /><AlertTitle>Success</AlertTitle><AlertDescription>Your changes have been saved successfully.</AlertDescription></Alert><Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>Something went wrong. Please try again.</AlertDescription></Alert><Alert><Info className="h-4 w-4" /><AlertTitle>Info</AlertTitle><AlertDescription>A new version is available for download.</AlertDescription></Alert><Alert><AlertTriangle className="h-4 w-4" /><AlertTitle>Warning</AlertTitle><AlertDescription>Your subscription expires in 3 days.</AlertDescription></Alert></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Toast Notifications</h3><p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Click below to trigger different toast types.</p><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => toast.success("Saved successfully!")}>Success Toast</Button><Button variant="outline" onClick={() => toast.error("Failed to save.")}>Error Toast</Button><Button variant="outline" onClick={() => toast.info("New update available.")}>Info Toast</Button><Button variant="outline" onClick={() => toast.warning("Storage almost full.")}>Warning Toast</Button></div><div className="mt-6"><h4 className="mb-3 text-sm font-semibold">Dismissible Alert</h4><Alert className="relative pr-10"><Info className="h-4 w-4" /><AlertTitle>Did you know?</AlertTitle><AlertDescription>You can customize every color in the design system.</AlertDescription><button className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:text-white/90"><X className="h-4 w-4" /></button></Alert></div></Card>
      </div>
    </div>
  );
}
