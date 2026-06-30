"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const WidgetsBannersPage = () => (
  <PageContainer title="Widget Banners" description="Promotional, alert, and CTA banner widgets for dashboards and pages.">
    <div className="space-y-4">
      {/* Gradient hero banner */}
      <div className="rounded-2xl bg-primary p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Upgrade to Pro Today</h2>
          <p className="opacity-90 mt-1">Unlock 50+ pages, advanced charts, and priority support.</p>
        </div>
        <Button className="bg-white text-primary hover:bg-white/90">Upgrade Now</Button>
      </div>

      {/* Promo banner */}
      <div className="rounded-2xl bg-dark dark:bg-darkgray p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Icon icon="solar:gift-bold-duotone" width={48} className="text-warning" />
          <div>
            <h3 className="text-xl font-bold">Refer a friend, get $50</h3>
            <p className="opacity-80 text-sm">Both you and your friend earn credits when they sign up.</p>
          </div>
        </div>
        <Button variant="outline" className="border-white text-white hover:bg-white/30 hover:text-white">Get my link</Button>
      </div>

      {/* Alert banner */}
      <div className="rounded-2xl bg-lightwarning border border-warning/30 p-5 flex items-start gap-3">
        <Icon icon="solar:danger-triangle-bold-duotone" width={28} className="text-warning shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-warning">Action Required</h4>
          <p className="text-sm opacity-80 mt-0.5">Your subscription expires in 3 days. Renew now to avoid service interruption.</p>
        </div>
        <Button variant="warning" size="sm">Renew</Button>
      </div>

      {/* Success banner */}
      <div className="rounded-2xl bg-lightsuccess border border-success/30 p-5 flex items-start gap-3">
        <Icon icon="solar:check-circle-bold-duotone" width={28} className="text-success shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-success">Payment Successful!</h4>
          <p className="text-sm opacity-80 mt-0.5">Your subscription has been renewed. A receipt was sent to your email.</p>
        </div>
        <Button variant="success" size="sm">View Receipt</Button>
      </div>

      {/* Info banner */}
      <div className="rounded-2xl bg-lightinfo border border-info/30 p-5 flex items-start gap-3">
        <Icon icon="solar:bell-bing-bold-duotone" width={28} className="text-info shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-info">New Feature Available</h4>
          <p className="text-sm opacity-80 mt-0.5">AI-powered insights are now live in your dashboard. Try them out!</p>
        </div>
        <Button variant="info" size="sm">Try Now</Button>
      </div>

      {/* Image banner */}
      <div className="rounded-2xl overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/backgrounds/profilebg.jpg" alt="" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center p-8">
          <div className="text-white">
            <h3 className="text-2xl font-bold">Summer Sale</h3>
            <p className="opacity-90 mt-1">Up to 50% off all annual plans</p>
            <Button className="mt-3 bg-white text-dark hover:bg-white/90">Shop Sale</Button>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
);

export default WidgetsBannersPage;
