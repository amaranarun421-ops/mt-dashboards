import { Security } from "@/components/pages/security-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Security',
  description: '2FA, passkeys, password change, and security log.',
};

export default function Page() {
  return <Security />;
}
