import { AuthPages } from "@/components/pages/auth-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your Nexus Pro password.',
};

export default function Page() {
  return <AuthPages mode="forgot" />;
}
