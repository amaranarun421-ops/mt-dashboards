"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { createPortal } from "react-dom";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: "left" | "right";
  width?: string;
  className?: string;
};

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = "right",
  width = "max-w-md",
  className,
}: DrawerProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0" style={{ zIndex: 9999 }}>
      <div
        className="absolute inset-0 bg-dark/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute top-0 bottom-0 flex w-full flex-col bg-white shadow-4 dark:bg-gray-dark",
          width,
          side === "right" ? "right-0" : "left-0",
          className,
        )}
        style={{
          animation:
            side === "right"
              ? "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              : "slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 border-b border-stroke px-5 py-4 dark:border-dark-3">
            <div>
              {title && (
                <h3 className="text-base font-semibold text-dark dark:text-white">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="grid size-8 shrink-0 place-items-center rounded-lg text-dark-5 transition hover:bg-gray-2 dark:hover:bg-white/5"
              aria-label="Close drawer"
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}
        <div className="helios-scroll flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-stroke bg-gray-2 px-5 py-3 dark:border-dark-3 dark:bg-dark-2">
            {footer}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>,
    document.body,
  );
}
