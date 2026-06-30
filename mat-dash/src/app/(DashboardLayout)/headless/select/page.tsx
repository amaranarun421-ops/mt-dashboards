"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const HeadlessSelectPage = () => (
  <PageContainer title="Headless Select" description="Custom-styled select dropdowns with keyboard support.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Basic Select">
        <div className="space-y-2">
          <Label>Country</Label>
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select country" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DemoBlock>

      <DemoBlock title="With Default Value">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select defaultValue="en">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DemoBlock>

      <DemoBlock title="Multiple Selects">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select><SelectTrigger className="w-full"><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>
              <SelectItem value="pst">PST</SelectItem><SelectItem value="est">EST</SelectItem><SelectItem value="gmt">GMT</SelectItem>
            </SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select><SelectTrigger className="w-full"><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>
              <SelectItem value="usd">USD ($)</SelectItem><SelectItem value="eur">EUR (€)</SelectItem><SelectItem value="gbp">GBP (£)</SelectItem>
            </SelectContent></Select>
          </div>
        </div>
      </DemoBlock>

      <DemoBlock title="Disabled Select">
        <div className="space-y-2">
          <Label>Disabled</Label>
          <Select disabled>
            <SelectTrigger className="w-full opacity-50 cursor-not-allowed"><SelectValue placeholder="Cannot select" /></SelectTrigger>
            <SelectContent />
          </Select>
        </div>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default HeadlessSelectPage;
