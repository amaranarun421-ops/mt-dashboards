"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-error-500/10 text-error-500 mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Something went wrong</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        An error occurred while rendering this page. You can try again, or return to the dashboard.
      </p>
      <div className="mt-5 flex items-center gap-2">
        <Button onClick={reset} variant="outline" size="sm">Try again</Button>
        <Button asChild size="sm"><a href="/dashboard/ecommerce">Back to dashboard</a></Button>
      </div>
    </div>
  );
}
