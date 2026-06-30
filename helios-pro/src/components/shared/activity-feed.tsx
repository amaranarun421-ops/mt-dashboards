import { cn } from "@/lib/utils";
import * as React from "react";
import { Avatar } from "./avatar";

type Activity = {
  id: string;
  user: string;
  avatarSrc?: string;
  action: string;
  target?: string;
  time: string;
  tone?: "primary" | "accent" | "violet" | "info" | "rose" | "success" | "danger";
};

const toneDot: Record<string, string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  violet: "bg-violet",
  info: "bg-blue",
  rose: "bg-rose",
  success: "bg-green",
  danger: "bg-red",
};

export function ActivityFeed({
  items,
  className,
  compact,
}: {
  items: Activity[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <ol className={cn("relative space-y-5", className)}>
      {items.map((a, i) => (
        <li key={a.id} className="relative flex gap-3 pl-1">
          {i !== items.length - 1 && (
            <span
              className="absolute left-[18px] top-9 h-[calc(100%-12px)] w-px bg-stroke dark:bg-dark-3"
              aria-hidden
            />
          )}
          <Avatar name={a.user} src={a.avatarSrc} size="sm" />
          <div className="min-w-0 flex-1">
            <p className={cn("text-dark dark:text-white", compact ? "text-xs" : "text-sm")}>
              <span className="font-semibold">{a.user}</span>{" "}
              <span className="text-dark-5 dark:text-dark-6">{a.action}</span>{" "}
              {a.target && (
                <span className="font-medium text-primary dark:text-primary-light">
                  {a.target}
                </span>
              )}
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs text-dark-5 dark:text-dark-6">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  toneDot[a.tone || "primary"],
                )}
              />
              <span>{a.time}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
