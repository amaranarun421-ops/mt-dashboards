import { AuthTwofa } from "@/components/pages/auth-twofa-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Two-Factor Authentication',
  description: 'Enter your 6-digit authenticator code.',
};

export default function Page() {
  return <AuthTwofa />;
}
