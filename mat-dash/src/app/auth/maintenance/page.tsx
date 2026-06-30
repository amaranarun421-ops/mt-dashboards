"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightprimary p-6">
      <BackToDashboard />
      <div className="text-center max-w-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/backgrounds/maintenance.svg" alt="Maintenance" className="w-72 mx-auto mb-6" />
        <h1 className="text-3xl font-bold">We'll be back soon</h1>
        <p className="opacity-70 mt-3">We're performing scheduled maintenance to make mtverse even better. We expect to be back online in a couple of hours. Thanks for your patience!</p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {[{ v: "02", l: "Hours" }, { v: "45", l: "Minutes" }, { v: "30", l: "Seconds" }].map((t) => (
            <div key={t.l} className="rounded-xl bg-background p-4 shadow-xs">
              <p className="text-3xl font-bold text-primary">{t.v}</p>
              <p className="text-xs opacity-70">{t.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3 justify-center">
          <Button variant="outline" asChild className="gap-2"><Link href="/"><Icon icon="solar:home-2-bold" width={18} /> Home</Link></Button>
          <Button asChild className="gap-2"><a href="mailto:support@mtverse.io"><Icon icon="solar:letter-bold" width={18} /> Contact Us</a></Button>
        </div>

        <div className="mt-8 pt-6 border-t border-defaultBorder">
          <p className="text-sm opacity-70 mb-3">Follow us for updates:</p>
          <div className="flex gap-2 justify-center">
            {["solar:twitter-logo-bold","solar:facebook-logo-bold","solar:instagram-logo-bold","solar:linkedin-logo-bold"].map((i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full bg-background hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                <Icon icon={i} width={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
