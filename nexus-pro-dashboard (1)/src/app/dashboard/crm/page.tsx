import { CrmDashboard } from "@/components/pages/crm-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'CRM Dashboard',
  description: 'Pipeline, deals, accounts, and contact activity.',
};

export default function Page() {
  return <CrmDashboard />;
}
