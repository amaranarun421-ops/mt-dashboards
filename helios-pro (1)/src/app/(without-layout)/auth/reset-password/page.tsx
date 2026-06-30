import type { Metadata } from "next";
import { ResetPasswordClient } from "./_client";

export const metadata: Metadata = {
  title: "Reset password | Helios Pro",
  description:
    "Choose a new password for your Helios Pro account. The strength meter shows how secure your new password is.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
