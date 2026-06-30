"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock, VariantRow, PropTable } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const ButtonPage = () => {
  const variants = [
    "default","secondary","success","warning","info","error",
    "outline","outlinesecondary","outlinesuccess","outlinewarning","outlineinfo","outlineerror",
    "lightprimary","lightsecondary","lightsuccess","lightwarning","lightinfo","lighterror",
    "ghost","ghostprimary","ghostsecondary","ghostsuccess","ghostwarning","ghosterror",
    "link","destructive",
  ] as const;

  return (
    <PageContainer
      title="Button"
      description="Trigger actions with clickable buttons. Supports 25+ variants, sizes, shapes, icons, and loading states."
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DemoBlock title="Variants" description="Solid color buttons for primary actions">
          <div className="flex flex-wrap gap-3">
            {(["default","secondary","success","warning","info","error","destructive"] as const).map((v) => (
              <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Outline" description="Bordered buttons for secondary actions">
          <div className="flex flex-wrap gap-3">
            {(["outline","outlinesecondary","outlinesuccess","outlinewarning","outlineinfo","outlineerror"] as const).map((v) => (
              <Button key={v} variant={v}>{v.replace("outline","Outline ")}</Button>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Light / Soft" description="Tinted background buttons">
          <div className="flex flex-wrap gap-3">
            {(["lightprimary","lightsecondary","lightsuccess","lightwarning","lightinfo","lighterror"] as const).map((v) => (
              <Button key={v} variant={v}>{v.replace("light","Light ")}</Button>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Ghost" description="Subtle hover-fill buttons">
          <div className="flex flex-wrap gap-3">
            {(["ghost","ghostprimary","ghostsecondary","ghostsuccess","ghostwarning","ghosterror","link"] as const).map((v) => (
              <Button key={v} variant={v}>{v.replace("ghost","Ghost ").replace("link","Link")}</Button>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Sizes" description="Default · Small · Large · Icon">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">Large</Button>
            <Button size="default">Default</Button>
            <Button size="sm">Small</Button>
            <Button size="icon" variant="outline"><Icon icon="solar:heart-bold" width={18} /></Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Pill Shape & Icons" description="Rounded pills with leading/trailing icons">
          <div className="flex flex-wrap gap-3">
            <Button shape="pill"><Icon icon="solar:add-circle-bold" /> Add New</Button>
            <Button shape="pill" variant="success"><Icon icon="solar:checklist-bold" /> Approve</Button>
            <Button shape="pill" variant="outline">Continue <Icon icon="solar:arrow-right-linear" /></Button>
            <Button shape="pill" variant="lighterror"><Icon icon="solar:trash-bin-minimalistic-bold" /> Delete</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="States" description="Disabled and icon-only">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline" size="icon"><Icon icon="solar:settings-bold" /></Button>
            <Button variant="lightprimary" size="icon"><Icon icon="solar:bell-bold" /></Button>
            <Button variant="destructive" size="icon"><Icon icon="solar:trash-bin-minimalistic-bold" /></Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Button Group" description="Group related actions together">
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex rounded-md overflow-hidden border border-defaultBorder">
              <Button variant="ghost" className="rounded-r-none border-r border-defaultBorder">Left</Button>
              <Button variant="ghost" className="rounded-none border-r border-defaultBorder">Middle</Button>
              <Button variant="ghost" className="rounded-l-none">Right</Button>
            </div>
            <div className="inline-flex rounded-full overflow-hidden">
              <Button variant="lightprimary" shape="pill" className="rounded-r-none">1</Button>
              <Button variant="default" shape="pill" className="rounded-none">2</Button>
              <Button variant="lightprimary" shape="pill" className="rounded-l-none">3</Button>
            </div>
          </div>
        </DemoBlock>
      </div>

      <DemoBlock title="Props" className="mt-6">
        <PropTable
          rows={[
            { prop: "variant", type: "'default' | 'outline' | 'ghost' | 'lightprimary' | ...", default: "'default'", description: "Visual style of the button." },
            { prop: "size", type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", description: "Button size." },
            { prop: "shape", type: "'pill'", default: "—", description: "Optional pill shape (fully rounded)." },
            { prop: "asChild", type: "boolean", default: "false", description: "Render as child (for Link composition)." },
            { prop: "disabled", type: "boolean", default: "false", description: "Disable the button." },
          ]}
        />
      </DemoBlock>
    </PageContainer>
  );
};

export default ButtonPage;
