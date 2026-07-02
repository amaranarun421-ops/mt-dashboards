import { AuthPages } from "@/components/pages/auth-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your Nexus Pro account.',
};

export default function Page() {
  return <AuthPages mode="signup" />;
}
