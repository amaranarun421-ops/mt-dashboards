"use client";
import { useState, useEffect } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const ProgressPage = () => {
  const [value, setValue] = useState(40);
  const [auto, setAuto] = useState(60);

  useEffect(() => {
    const id = setInterval(() => {
      setAuto((v) => (v >= 100 ? 0 : v + 4));
    }, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <PageContainer
      title="Progress Bar"
      description="Visualize completion of a task — uploads, downloads, profile completion, or any 0–100 metric."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Color Variants">
          <div className="space-y-4">
            <Progress value={70} variant="primary" />
            <Progress value={60} variant="secondary" />
            <Progress value={85} variant="success" />
            <Progress value={45} variant="warning" />
            <Progress value={30} variant="error" />
            <Progress value={55} variant="info" />
          </div>
        </DemoBlock>

        <DemoBlock title="Sizes" description="Height variants via className">
          <div className="space-y-4">
            <Progress value={40} className="h-1" />
            <Progress value={55} className="h-1.5" />
            <Progress value={70} className="h-2" />
            <Progress value={85} className="h-3" />
            <Progress value={95} className="h-4" />
          </div>
        </DemoBlock>

        <DemoBlock title="With Label">
          <div className="space-y-5">
            {[
              { label: "Profile completeness", value: 80, color: "primary" },
              { label: "Storage used", value: 65, color: "warning" },
              { label: "Monthly bandwidth", value: 45, color: "info" },
              { label: "API quota", value: 92, color: "error" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="opacity-80">{s.label}</span>
                  <span className="font-medium">{s.value}%</span>
                </div>
                <Progress value={s.value} variant={s.color as any} />
              </div>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Interactive">
          <div className="space-y-4">
            <Progress value={value} className="h-3" variant="primary" />
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-70">Drag to change</span>
              <span className="font-bold text-lg">{value}%</span>
            </div>
            <input type="range" min={0} max={100} value={value} onChange={(e) => setValue(+e.target.value)} className="w-full accent-primary" />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setValue(0)}>Reset</Button>
              <Button size="sm" onClick={() => setValue(100)}>Complete</Button>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Auto-animating" description="Useful for fake loading states">
          <div className="space-y-3">
            <Progress value={auto} className="h-2" variant="success" />
            <p className="text-xs opacity-70 text-center">Auto-incrementing demo (resets at 100%)</p>
          </div>
        </DemoBlock>

        <DemoBlock title="Upload Progress" description="Multi-file upload example">
          <div className="space-y-3">
            {[
              { name: "annual-report-2024.pdf", value: 100, icon: "solar:document-text-bold-duotone" },
              { name: "team-photo.jpg", value: 75, icon: "solar:gallery-bold-duotone" },
              { name: "presentation.pptx", value: 42, icon: "solar:document-add-bold-duotone" },
            ].map((f) => (
              <div key={f.name}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon icon={f.icon} width={18} className="text-primary" />
                  <span className="text-sm flex-1">{f.name}</span>
                  {f.value === 100 ? (
                    <Icon icon="solar:check-circle-bold" width={16} className="text-success" />
                  ) : (
                    <span className="text-xs opacity-70">{f.value}%</span>
                  )}
                </div>
                <Progress value={f.value} variant={f.value === 100 ? "success" : "primary"} className="h-1.5" />
              </div>
            ))}
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default ProgressPage;
