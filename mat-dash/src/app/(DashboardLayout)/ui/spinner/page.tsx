"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const SpinnerPage = () => {
  const sizes = [16, 20, 28, 36, 48];
  const colors = [
    { label: "Primary", cls: "text-primary" },
    { label: "Secondary", cls: "text-secondary" },
    { label: "Success", cls: "text-success" },
    { label: "Warning", cls: "text-warning" },
    { label: "Error", cls: "text-error" },
    { label: "Info", cls: "text-info" },
  ];

  return (
    <PageContainer
      title="Spinner"
      description="Loading indicators in multiple sizes and colors. Use during async operations to keep users informed."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Sizes">
          <div className="flex items-center gap-6">
            {sizes.map((s) => (
              <Icon key={s} icon="svg-spinners:90-ring" width={s} height={s} className="text-primary" />
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Color Variants">
          <div className="flex flex-wrap items-center gap-6">
            {colors.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <Icon icon="svg-spinners:90-ring" width={28} className={c.cls} />
                <span className="text-xs opacity-70">{c.label}</span>
              </div>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Spinner Styles">
          <div className="flex flex-wrap items-center gap-8">
            {[
              "svg-spinners:90-ring",
              "svg-spinners:ring-resize",
              "svg-spinners:bars-rotate-fade",
              "svg-spinners:blocks-wave",
              "svg-spinners:gooey-balls-1",
              "svg-spinners:pulse-rings-2",
            ].map((icon) => (
              <div key={icon} className="flex flex-col items-center gap-2">
                <Icon icon={icon} width={36} className="text-primary" />
                <span className="text-xs opacity-70">{icon.split(":")[1]}</span>
              </div>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Inside Button">
          <div className="flex flex-wrap gap-3">
            <Button disabled className="gap-2">
              <Icon icon="svg-spinners:90-ring" width={16} /> Loading...
            </Button>
            <Button variant="outline" disabled className="gap-2">
              <Icon icon="svg-spinners:90-ring" width={16} /> Please wait
            </Button>
            <Button variant="lightprimary" disabled className="gap-2">
              <Icon icon="svg-spinners:90-ring" width={16} /> Processing
            </Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Card Loading Skeleton">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                <div className="h-2 w-1/3 bg-muted animate-pulse rounded" />
              </div>
            </div>
            <div className="h-3 w-full bg-muted animate-pulse rounded" />
            <div className="h-3 w-5/6 bg-muted animate-pulse rounded" />
            <div className="h-3 w-4/6 bg-muted animate-pulse rounded" />
          </div>
        </DemoBlock>

        <DemoBlock title="Full Page Loader">
          <div className="flex flex-col items-center justify-center py-8">
            <Icon icon="svg-spinners:gooey-balls-1" width={56} className="text-primary" />
            <p className="text-sm opacity-70 mt-3">Loading dashboard...</p>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default SpinnerPage;
