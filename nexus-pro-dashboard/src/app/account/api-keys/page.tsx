import { ApiKeysPage } from "@/components/pages/api-keys-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'API Keys',
  description: 'Manage, scope, and revoke API keys.',
};

export default function Page() {
  return <ApiKeysPage />;
}
