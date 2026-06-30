import type { Metadata } from "next";
import { SignInClient } from "./_client";

export const metadata: Metadata = {
  title: "Sign in | Helios Pro",
  description:
    "Sign in to your Helios Pro account to access dashboards, apps and reports.",
};

export default function SignInPage() {
  return <SignInClient />;
}
