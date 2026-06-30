import type { Metadata } from "next";
import { BoxedLoginClient } from "./_client";

export const metadata: Metadata = {
  title: "Sign in — boxed | Helios Pro",
  description:
    "Sign in to Helios Pro with a boxed card layout on a subtle dot-grid background.",
};

export default function BoxedLoginPage() {
  return <BoxedLoginClient />;
}
