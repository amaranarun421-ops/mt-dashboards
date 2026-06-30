import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function MTVLogo({
  className,
  showText = true,
  variant = "default",
  size = 36,
}: {
  className?: string;
  showText?: boolean;
  variant?: "default" | "sidebar" | "light" | "dark";
  size?: number;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="" variant={variant} size={size} />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              "text-base font-bold tracking-tight",
              variant === "sidebar"
                ? "text-sidebar-foreground"
                : variant === "light"
                ? "text-white"
                : "text-foreground"
            )}
          >
            MTVerse
          </span>
          <span
            className={cn(
              "text-[10px] font-medium uppercase tracking-wider",
              variant === "sidebar"
                ? "text-sidebar-foreground/50"
                : variant === "light"
                ? "text-white/60"
                : "text-muted-foreground"
            )}
          >
            Enterprise Kit
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoMark({
  className,
  variant = "default",
  size = 36,
}: {
  className?: string;
  variant?: "default" | "sidebar" | "light" | "dark";
  size?: number;
}) {
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/sitelogo.png"
        alt="MTVerse logo"
        width={size}
        height={size}
        priority
        className="size-full object-contain rounded-lg"
      />
    </div>
  );
}
