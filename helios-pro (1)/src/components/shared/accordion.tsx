"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type AccordionItem = {
  value: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpen?: string[];
  className?: string;
  multiple?: boolean;
};

export function Accordion({
  items,
  defaultOpen = [],
  className,
  multiple = false,
}: AccordionProps) {
  const [open, setOpen] = React.useState<Set<string>>(new Set(defaultOpen));

  function toggle(value: string) {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = open.has(item.value);
        return (
          <div
            key={item.value}
            className={cn(
              "overflow-hidden rounded-xl border bg-white transition-all dark:bg-gray-dark",
              isOpen
                ? "border-primary/30 dark:border-primary/30"
                : "border-stroke dark:border-dark-3",
            )}
          >
            <button
              onClick={() => toggle(item.value)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
            >
              <div>
                <div className="text-sm font-semibold text-dark dark:text-white">
                  {item.title}
                </div>
                {item.description && (
                  <div className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                    {item.description}
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-md text-dark-5 transition-all dark:text-dark-6",
                  isOpen && "rotate-180 text-primary dark:text-primary-light",
                )}
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <div
              className="grid transition-all duration-300"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-0 text-sm text-dark-5 dark:text-dark-6">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
