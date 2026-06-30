import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";

export function UserAvatar({
  name = "Helios User",
  size = "md",
  className,
}: {
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return <Avatar name={name} size={size} tone="primary" className={className} />;
}
