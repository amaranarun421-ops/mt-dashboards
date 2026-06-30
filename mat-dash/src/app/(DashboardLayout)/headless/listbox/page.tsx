"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Icon } from "@iconify/react";

const HeadlessListboxPage = () => {
  const [selected, setSelected] = useState("Option 1");
  const [open, setOpen] = useState(false);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

  return (
    <PageContainer title="Headless Listbox" description="Selectable list with single and multi-select support.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Single Select Listbox">
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-defaultBorder bg-background text-sm hover:border-primary/40">
              <span>{selected}</span>
              <Icon icon={open ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"} width={16} />
            </button>
            {open && (
              <div className="absolute z-50 mt-1 w-full rounded-md border border-defaultBorder bg-background shadow-md p-1">
                {options.map((o) => (
                  <button
                    key={o}
                    onClick={() => { setSelected(o); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-sm hover:bg-lightprimary hover:text-primary ${selected === o ? "bg-lightprimary text-primary" : ""}`}
                  >
                    {o}
                    {selected === o && <Icon icon="solar:check-circle-bold" width={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </DemoBlock>

        <DemoBlock title="Static List">
          <ul className="rounded-md border border-defaultBorder overflow-hidden">
            {options.map((o, i) => (
              <li key={o}>
                <button className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${i === 0 ? "bg-lightprimary text-primary" : "hover:bg-lightgray dark:hover:bg-dark"} ${i > 0 ? "border-t border-defaultBorder" : ""}`}>
                  {o}
                  {i === 0 && <Icon icon="solar:check-circle-bold" width={16} />}
                </button>
              </li>
            ))}
          </ul>
        </DemoBlock>

        <DemoBlock title="With Icons" className="lg:col-span-2">
          <ul className="rounded-md border border-defaultBorder overflow-hidden">
            {[
              { icon: "solar:user-bold", label: "Profile", color: "primary" },
              { icon: "solar:bell-bold", label: "Notifications", color: "warning" },
              { icon: "solar:shield-check-bold", label: "Security", color: "success" },
              { icon: "solar:settings-bold", label: "Settings", color: "info" },
            ].map((item, i) => (
              <li key={item.label}>
                <button className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-lightgray dark:hover:bg-dark ${i > 0 ? "border-t border-defaultBorder" : ""}`}>
                  <Icon icon={item.icon} width={18} className={`text-${item.color}`} /> {item.label}
                </button>
              </li>
            ))}
          </ul>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessListboxPage;
