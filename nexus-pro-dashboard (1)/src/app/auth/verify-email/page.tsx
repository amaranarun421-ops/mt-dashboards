import { AuthVerify } from "@/components/pages/auth-verify-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Enter the 6-digit verification code.',
};

export default function Page() {
  return <AuthVerify />;
}
