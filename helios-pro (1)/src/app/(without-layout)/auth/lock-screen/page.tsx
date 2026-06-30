import type { Metadata } from "next";
import { LockScreenClient } from "./_client";

export const metadata: Metadata = {
  title: "Lock screen | Helios Pro",
  description:
    "Your Helios Pro session is locked. Enter your password to resume where you left off.",
};

export default function LockScreenPage() {
  return <LockScreenClient />;
}
