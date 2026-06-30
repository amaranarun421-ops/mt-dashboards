"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const HeadlessTextareaPage = () => (
  <PageContainer title="Headless Textarea" description="Multi-line text inputs with resize, char count, and states.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Basic Textarea">
        <div className="space-y-2">
          <Label>Message</Label>
          <Textarea placeholder="Type your message..." rows={4} />
        </div>
      </DemoBlock>

      <DemoBlock title="With Character Count">
        <div className="space-y-2">
          <Label>Bio (max 280)</Label>
          <Textarea placeholder="Tell us about yourself..." rows={4} maxLength={280} />
          <p className="text-xs opacity-60 text-right">0 / 280</p>
        </div>
      </DemoBlock>

      <DemoBlock title="Disabled Textarea">
        <div className="space-y-2">
          <Label className="opacity-50">Disabled</Label>
          <Textarea placeholder="Cannot edit" rows={4} disabled />
        </div>
      </DemoBlock>

      <DemoBlock title="Error State">
        <div className="space-y-2">
          <Label className="text-error">Error</Label>
          <Textarea placeholder="Contains an error" rows={4} className="border-error text-error focus-visible:border-error" />
          <p className="text-xs text-error">Message is required.</p>
        </div>
      </DemoBlock>

      <DemoBlock title="Auto-resize" className="lg:col-span-2">
        <div className="space-y-2">
          <Label>Auto-growing Textarea</Label>
          <Textarea placeholder="This textarea grows as you type..." rows={2} className="field-sizing-content min-h-20" />
        </div>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default HeadlessTextareaPage;
