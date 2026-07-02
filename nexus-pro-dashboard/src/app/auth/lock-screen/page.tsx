import { AuthLock } from "@/components/pages/auth-lock-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Lock Screen',
  description: 'Unlock your session.',
};

export default function Page() {
  return <AuthLock />;
}
