import type { Metadata } from "next";
import { BoxedRegisterClient } from "./_client";

export const metadata: Metadata = {
  title: "Sign up — boxed | Helios Pro",
  description:
    "Create a Helios Pro account with a boxed card layout on a subtle dot-grid background.",
};

export default function BoxedRegisterPage() {
  return <BoxedRegisterClient />;
}
