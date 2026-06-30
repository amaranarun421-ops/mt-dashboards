"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightprimary p-6">
      <BackToDashboard />
      <div className="text-center max-w-md">
        <div className="relative inline-block">
          <h1 className="text-[120px] md:text-[180px] font-bold leading-none bg-primary bg-clip-text text-transparent">404</h1>
          <div className="absolute top-4 right-0 animate-bounce">
            <Icon icon="solar:ghost-bold-duotone" width={48} className="text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-2">Page Not Found</h2>
        <p className="opacity-70 mt-2">Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
        <div className="flex gap-2 justify-center mt-6">
          <Button asChild className="gap-2"><Link href="/"><Icon icon="solar:home-2-bold" width={18} /> Back to Home</Link></Button>
          <Button variant="outline" asChild className="gap-2"><Link href="/pages/faq"><Icon icon="solar:headset-round-sound-bold" width={18} /> Contact Support</Link></Button>
        </div>
        <div className="mt-8 pt-6 border-t border-defaultBorder">
          <p className="text-xs opacity-60 mb-3">Or try one of these:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Dashboard","Settings","Profile","Pricing"].map((l) => (
              <Button key={l} variant="ghost" size="sm" asChild><Link href="/">{l}</Link></Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
