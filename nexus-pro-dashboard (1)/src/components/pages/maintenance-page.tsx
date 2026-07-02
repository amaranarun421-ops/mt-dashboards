import * as React from "react";
import { Wrench, RefreshCw, Clock, Mail } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export function Maintenance() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8 text-center">
      <div className="mb-8"><Logo /></div>
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-warning-50 text-warning-600 dark:bg-warning-500/15 mb-6">
        <Wrench className="h-12 w-12" />
      </div>
      <h1 className="font-bold text-4xl text-gray-800 dark:text-white/90 mb-3">Under Maintenance</h1>
      <p className="max-w-md text-gray-500 dark:text-gray-400 mb-8">We're performing scheduled maintenance to make Nexus Pro even better. We'll be back shortly. Thank you for your patience!</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="gap-1.5"><RefreshCw className="h-4 w-4" /> Refresh Page</Button>
        <Button variant="outline" className="gap-1.5"><Mail className="h-4 w-4" /> Contact Support</Button>
      </div>
      <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
        <Clock className="h-4 w-4" /> Estimated time: 30 minutes
      </div>
    </div>
  );
}
