import type { Metadata } from "next";
import { SignUpClient } from "./_client";

export const metadata: Metadata = {
  title: "Sign up | Helios Pro",
  description:
    "Create a Helios Pro account to start illuminating data and empowering decisions.",
};

export default function SignUpPage() {
  return <SignUpClient />;
}
