import type { Metadata } from "next";
import { SideRegisterClient } from "./_client";

export const metadata: Metadata = {
  title: "Sign up — split view | Helios Pro",
  description:
    "Create your Helios Pro account with a split-screen benefits panel and a focused sign-up form.",
};

export default function SideRegisterPage() {
  return <SideRegisterClient />;
}
