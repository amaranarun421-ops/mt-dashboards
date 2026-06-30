"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const HeadlessButtonsPage = () => (
  <PageContainer title="Headless Buttons" description="Unstyled button primitives with full keyboard and ARIA support.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Basic Buttons">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-md bg-primary text-white text-sm hover:bg-primaryemphasis transition-colors">Primary</button>
          <button className="px-4 py-2 rounded-md border border-defaultBorder text-sm hover:bg-lightgray dark:hover:bg-dark transition-colors">Secondary</button>
          <button className="px-4 py-2 rounded-md text-sm hover:bg-lightgray dark:hover:bg-dark transition-colors">Ghost</button>
          <button className="px-4 py-2 rounded-md text-error text-sm hover:bg-lighterror transition-colors">Danger</button>
        </div>
      </DemoBlock>

      <DemoBlock title="With Icons">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-md bg-primary text-white text-sm flex items-center gap-2 hover:bg-primaryemphasis transition-colors"><Icon icon="solar:add-circle-bold" width={16} /> Add</button>
          <button className="px-4 py-2 rounded-md border border-defaultBorder text-sm flex items-center gap-2 hover:bg-lightgray dark:hover:bg-dark transition-colors"><Icon icon="solar:download-minimalistic-bold" width={16} /> Download</button>
          <button className="px-4 py-2 rounded-md text-sm flex items-center gap-2 text-error hover:bg-lighterror transition-colors"><Icon icon="solar:trash-bin-minimalistic-bold" width={16} /> Delete</button>
        </div>
      </DemoBlock>

      <DemoBlock title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-2.5 py-1.5 rounded text-xs bg-primary text-white">XS</button>
          <button className="px-3 py-1.5 rounded-sm text-sm bg-primary text-white">SM</button>
          <button className="px-4 py-2 rounded-md text-sm bg-primary text-white">MD</button>
          <button className="px-6 py-2.5 rounded-md text-base bg-primary text-white">LG</button>
        </div>
      </DemoBlock>

      <DemoBlock title="States">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-md bg-primary text-white text-sm">Normal</button>
          <button disabled className="px-4 py-2 rounded-md bg-primary text-white text-sm opacity-50 cursor-not-allowed">Disabled</button>
          <button className="px-4 py-2 rounded-md bg-primary text-white text-sm flex items-center gap-2"><Icon icon="svg-spinners:90-ring" width={14} /> Loading</button>
        </div>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default HeadlessButtonsPage;
