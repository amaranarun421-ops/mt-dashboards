import { AuditLogsPage } from "@/components/pages/audit-logs-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Audit Logs',
  description: 'Filterable event log of actor, action, resource, and severity.',
};

export default function Page() {
  return <AuditLogsPage />;
}
