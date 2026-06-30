import type { Metadata } from "next";
import { ForgotPasswordClient } from "./_client";

export const metadata: Metadata = {
  title: "Forgot password | Helios Pro",
  description:
    "Reset your Helios Pro password — enter your account email and we will send a secure reset link.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
