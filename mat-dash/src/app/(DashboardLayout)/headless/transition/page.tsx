"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const HeadlessTransitionPage = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  return (
    <PageContainer title="Headless Transition" description="Smooth enter/leave transitions for elements.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Fade Transition">
          <Button onClick={() => setShow1(!show1)} variant="outline">Toggle</Button>
          {show1 && (
            <div className="mt-4 p-4 rounded-lg bg-lightprimary text-primary text-sm animate-in fade-in duration-300">
              This content fades in and out smoothly.
            </div>
          )}
        </DemoBlock>

        <DemoBlock title="Slide Transition">
          <Button onClick={() => setShow2(!show2)} variant="outline">Toggle</Button>
          {show2 && (
            <div className="mt-4 p-4 rounded-lg bg-lightsuccess text-success text-sm animate-in slide-in-from-left duration-300">
              This slides in from the left.
            </div>
          )}
        </DemoBlock>

        <DemoBlock title="Zoom Transition">
          <Button onClick={() => setShow3(!show3)} variant="outline">Toggle</Button>
          {show3 && (
            <div className="mt-4 p-4 rounded-lg bg-lightwarning text-warning text-sm animate-in zoom-in duration-300">
              This zooms in from center.
            </div>
          )}
        </DemoBlock>

        <DemoBlock title="Transition Classes Reference">
          <div className="space-y-2 text-sm">
            {[
              "animate-in fade-in",
              "animate-in slide-in-from-top",
              "animate-in slide-in-from-bottom",
              "animate-in slide-in-from-left",
              "animate-in slide-in-from-right",
              "animate-in zoom-in",
              "animate-in spin-in",
              "animate-out fade-out",
            ].map((c) => (
              <div key={c} className="flex items-center justify-between p-2 rounded bg-lightgray dark:bg-dark">
                <code className="text-xs font-mono">{c}</code>
              </div>
            ))}
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessTransitionPage;
