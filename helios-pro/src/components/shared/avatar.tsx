import { cn } from "@/lib/utils";
import * as React from "react";

type Tone = "primary" | "accent" | "violet" | "info" | "rose" | "neutral" | "success" | "warning" | "danger";

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary text-white",
  accent: "bg-accent text-white",
  violet: "bg-violet text-white",
  info: "bg-blue text-white",
  rose: "bg-rose text-white",
  neutral: "bg-gray-4 text-white",
  success: "bg-green text-white",
  warning: "bg-accent text-white",
  danger: "bg-red text-white",
};

const sizeMap = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

type AvatarProps = {
  name?: string;
  src?: string;
  size?: keyof typeof sizeMap;
  tone?: Tone;
  className?: string;
  ring?: boolean;
};

const toneFromName = (name: string): Tone => {
  const tones: Tone[] = ["primary", "accent", "violet", "info", "rose", "neutral"];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return tones[sum % tones.length];
};

export function Avatar({
  name = "User",
  src,
  size = "md",
  tone,
  className,
  ring,
}: AvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const resolvedTone = tone || toneFromName(name);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
        sizeMap[size],
        !src && toneClasses[resolvedTone],
        ring && "ring-2 ring-white dark:ring-gray-dark",
        className,
      )}
      title={name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </span>
  );
}

export function AvatarGroup({
  names,
  max = 4,
  size = "sm",
}: {
  names: string[];
  max?: number;
  size?: keyof typeof sizeMap;
}) {
  const visible = names.slice(0, max);
  const extra = names.length - visible.length;
  return (
    <div className="flex items-center -space-x-2">
      {visible.map((n, i) => (
        <Avatar key={i} name={n} size={size} ring />
      ))}
      {extra > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-gray-3 font-semibold text-dark-7 ring-2 ring-white dark:bg-dark-3 dark:text-dark-6 dark:ring-gray-dark",
            sizeMap[size],
          )}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
