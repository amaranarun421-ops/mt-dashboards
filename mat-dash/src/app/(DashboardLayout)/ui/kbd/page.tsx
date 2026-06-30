"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Badge } from "@/components/ui/badge";

const KbdPage = () => (
  <PageContainer title="KBD" description="Keyboard key indicators for shortcuts and hotkeys.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Single Keys">
        <div className="flex flex-wrap gap-3">
          {["A", "B", "C", "Enter", "Space", "Tab", "Esc", "Shift"].map((k) => (
            <kbd key={k} className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-defaultBorder bg-lightgray dark:bg-dark px-2 text-sm font-mono font-medium shadow-sm">{k}</kbd>
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="Combinations">
        <div className="flex flex-wrap gap-3">
          {[
            { keys: ["⌘", "K"], label: "Search" },
            { keys: ["⌘", "S"], label: "Save" },
            { keys: ["⌘", "C"], label: "Copy" },
            { keys: ["⌘", "V"], label: "Paste" },
            { keys: ["⌘", "Z"], label: "Undo" },
            { keys: ["Ctrl", "Shift", "N"], label: "New" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {c.keys.map((k, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-muted-foreground text-xs">+</span>}
                    <kbd className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-defaultBorder bg-lightgray dark:bg-dark px-1.5 text-xs font-mono font-medium shadow-sm">{k}</kbd>
                  </span>
                ))}
              </div>
              <Badge variant="lightPrimary" className="text-[10px]">{c.label}</Badge>
            </div>
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="In Context" className="lg:col-span-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-lightgray dark:bg-dark">
            <span className="text-sm">Open search palette</span>
            <div className="flex items-center gap-1"><kbd className="inline-flex h-6 items-center rounded border border-defaultBorder bg-background px-1.5 text-xs font-mono">⌘</kbd><kbd className="inline-flex h-6 items-center rounded border border-defaultBorder bg-background px-1.5 text-xs font-mono">K</kbd></div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-lightgray dark:bg-dark">
            <span className="text-sm">Save changes</span>
            <div className="flex items-center gap-1"><kbd className="inline-flex h-6 items-center rounded border border-defaultBorder bg-background px-1.5 text-xs font-mono">⌘</kbd><kbd className="inline-flex h-6 items-center rounded border border-defaultBorder bg-background px-1.5 text-xs font-mono">S</kbd></div>
          </div>
        </div>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default KbdPage;
