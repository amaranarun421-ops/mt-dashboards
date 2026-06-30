"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const HeadlessFieldsetPage = () => (
  <PageContainer title="Headless Fieldset" description="Grouped form fields with legends for semantic structure.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Personal Information">
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-primary px-1">Personal Details</legend>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>First Name</Label><Input className="mt-1.5" placeholder="John" /></div>
            <div><Label>Last Name</Label><Input className="mt-1.5" placeholder="Doe" /></div>
          </div>
          <div><Label>Email</Label><Input type="email" className="mt-1.5" placeholder="john@example.com" /></div>
          <div><Label>Phone</Label><Input type="tel" className="mt-1.5" placeholder="+1 555 000 1234" /></div>
        </fieldset>
      </DemoBlock>

      <DemoBlock title="Address Information">
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-primary px-1">Address</legend>
          <div><Label>Street</Label><Input className="mt-1.5" placeholder="123 Main St" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>City</Label><Input className="mt-1.5" placeholder="San Francisco" /></div>
            <div><Label>State</Label><Input className="mt-1.5" placeholder="CA" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>ZIP</Label><Input className="mt-1.5" placeholder="94102" /></div>
            <div><Label>Country</Label><Input className="mt-1.5" placeholder="USA" /></div>
          </div>
          <Button size="sm" className="mt-2">Save Address</Button>
        </fieldset>
      </DemoBlock>

      <DemoBlock title="Disabled Fieldset" className="lg:col-span-2">
        <fieldset disabled className="space-y-4 opacity-60">
          <legend className="text-sm font-semibold text-muted-foreground px-1">Disabled Section</legend>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Field 1</Label><Input className="mt-1.5" placeholder="Disabled" /></div>
            <div><Label>Field 2</Label><Input className="mt-1.5" placeholder="Disabled" /></div>
          </div>
          <Button size="sm">Submit</Button>
        </fieldset>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default HeadlessFieldsetPage;
