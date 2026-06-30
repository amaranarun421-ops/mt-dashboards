"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface BackToDashboardProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

const BackToDashboard = ({ className = "", variant = "outline" }: BackToDashboardProps) => (
  <Link href="/" className={`absolute top-6 left-6 z-50 ${className}`}>
    <Button variant={variant} size="sm" className="gap-1.5 shadow-sm">
      <Icon icon="solar:alt-arrow-left-linear" width={16} />
      Back to Dashboard
    </Button>
  </Link>
);

export default BackToDashboard;
