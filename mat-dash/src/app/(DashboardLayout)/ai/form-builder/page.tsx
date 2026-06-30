"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";

const AiFormBuilderPage = () => {
  const [prompt, setPrompt] = useState("Build a customer feedback form with rating, comments, and NPS score");
  const [generated, setGenerated] = useState(false);

  return (
    <PageContainer title="AI Form Builder" description="Describe the form you need. AI generates a complete form with appropriate fields.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DemoBlock title="Prompt" className="lg:col-span-1">
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} placeholder="Describe your form..." />
          <div className="mt-3">
            <Label className="text-xs">Form Style</Label>
            <Select defaultValue="vertical"><SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="vertical">Vertical (stacked)</SelectItem>
                <SelectItem value="horizontal">Horizontal (label-left)</SelectItem>
                <SelectItem value="grid">Grid (multi-column)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-3 gap-1.5" onClick={() => setGenerated(true)}>
            <Icon icon="solar:magic-stick-3-bold-duotone" width={16} /> Generate Form
          </Button>
        </DemoBlock>

        <div className="lg:col-span-2">
          {!generated ? (
            <DemoBlock title="Preview">
              <div className="text-center py-16 opacity-60">
                <Icon icon="solar:document-add-bold-duotone" width={56} className="mx-auto mb-3" />
                <p className="text-sm">Your generated form will appear here</p>
              </div>
            </DemoBlock>
          ) : (
            <DemoBlock title="Customer Feedback Form" description="Auto-generated based on your prompt">
              <form className="space-y-4">
                <div>
                  <Label>How would you rate our service? *</Label>
                  <div className="flex gap-2 mt-2">
                    {[1,2,3,4,5].map((s) => (
                      <button key={s} type="button" className="text-2xl text-warning hover:scale-110 transition-transform">
                        <Icon icon="solar:star-bold" width={28} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Overall, how likely are you to recommend us to a friend? (NPS) *</Label>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 11 }).map((_, i) => (
                      <button key={i} type="button" className={`h-10 w-10 rounded-md text-sm font-medium border ${i <= 6 ? "border-error/40 hover:bg-lighterror hover:text-error" : i <= 8 ? "border-warning/40 hover:bg-lightwarning hover:text-warning" : "border-success/40 hover:bg-lightsuccess hover:text-success"}`}>{i}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>What did you like most?</Label>
                  <Textarea placeholder="Tell us what worked well..." rows={3} className="mt-2" />
                </div>

                <div>
                  <Label>What can we improve?</Label>
                  <Textarea placeholder="Your suggestions help us grow..." rows={3} className="mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Name</Label><Input placeholder="Your name" className="mt-2" /></div>
                  <div><Label>Email</Label><Input type="email" placeholder="you@example.com" className="mt-2" /></div>
                </div>

                <Button className="w-full">Submit Feedback</Button>
              </form>
            </DemoBlock>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default AiFormBuilderPage;
