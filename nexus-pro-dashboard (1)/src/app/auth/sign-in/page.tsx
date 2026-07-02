import { AuthPages } from "@/components/pages/auth-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Nexus Pro account.',
};

export default function Page() {
  return <AuthPages mode="signin" />;
}
