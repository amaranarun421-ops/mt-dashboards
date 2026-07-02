"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Something went wrong</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">An error occurred while loading this page.</p>
      <div className="mt-5 flex items-center gap-2">
        <Button onClick={reset} variant="outline" size="sm">Try again</Button>
        <Button asChild size="sm"><a href="/sales/overview">Back to overview</a></Button>
      </div>
    </div>
  );
}
