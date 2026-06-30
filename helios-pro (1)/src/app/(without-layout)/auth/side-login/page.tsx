import type { Metadata } from "next";
import { SideLoginClient } from "./_client";

export const metadata: Metadata = {
  title: "Sign in — split view | Helios Pro",
  description:
    "Helios Pro sign-in with a split-screen marketing hero and a focused login form.",
};

export default function SideLoginPage() {
  return <SideLoginClient />;
}
