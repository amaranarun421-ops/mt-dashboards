"use client";

import Image from "next/image";
import Link from "next/link";

interface FullLogoProps {
  variant?: "default" | "light";
}

const FullLogo = ({ variant = "default" }: FullLogoProps) => {
  const isLight = variant === "light";
  return (
    <Link href={"/"} className="flex items-center gap-2.5">
      <Image
        src="/images/logos/mtverse-logo.png"
        alt="mtverse"
        width={32}
        height={32}
        className="rounded-lg shrink-0"
      />
      <span className={`text-xl font-bold tracking-tight lowercase ${isLight ? "text-white" : "text-charcoal dark:text-white"}`}>
        mt<span className={isLight ? "text-white/70" : "text-primary"}>verse</span>
      </span>
    </Link>
  );
};

export default FullLogo;
