import type { Metadata } from "next";
import { TwoStepClient } from "./_client";

export const metadata: Metadata = {
  title: "Two-step verification | Helios Pro",
  description:
    "Enter the 6-digit verification code from your authenticator app to complete sign-in.",
};

export default function TwoStepPage() {
  return <TwoStepClient />;
}
