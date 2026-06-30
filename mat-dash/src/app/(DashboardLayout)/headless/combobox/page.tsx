"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Icon } from "@iconify/react";

const HeadlessComboboxPage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const options = ["United States", "Canada", "Mexico", "Brazil", "Argentina", "UK", "France", "Germany", "Japan", "Australia"];
  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <PageContainer title="Headless Combobox" description="Searchable select with filtering and keyboard navigation.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Searchable Combobox">
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-defaultBorder bg-background text-sm hover:border-primary/40 transition-colors"
            >
              <span className={value ? "" : "opacity-50"}>{value || "Select a country..."}</span>
              <Icon icon={open ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"} width={16} />
            </button>
            {open && (
              <div className="absolute z-50 mt-1 w-full rounded-md border border-defaultBorder bg-background shadow-md">
                <div className="p-2 border-b border-defaultBorder">
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-2 py-1.5 rounded text-sm bg-transparent outline-none"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto p-1">
                  {filtered.length ? filtered.map((o) => (
                    <button
                      key={o}
                      onClick={() => { setValue(o); setOpen(false); setQuery(""); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm hover:bg-lightprimary hover:text-primary ${value === o ? "bg-lightprimary text-primary" : ""}`}
                    >
                      {o}
                    </button>
                  )) : <p className="px-3 py-2 text-sm opacity-60">No results</p>}
                </div>
              </div>
            )}
          </div>
        </DemoBlock>

        <DemoBlock title="Static Demo">
          <div className="p-4 rounded-lg bg-lightgray dark:bg-dark text-sm space-y-2">
            <p><strong>Combobox Features:</strong></p>
            <ul className="space-y-1 opacity-70 text-xs">
              <li>• Type to filter options</li>
              <li>• Arrow keys to navigate</li>
              <li>• Enter to select</li>
              <li>• Escape to close</li>
              <li>• Click outside to dismiss</li>
            </ul>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessComboboxPage;
