import { FinanceDashboard } from "@/components/pages/finance-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Finance Dashboard',
  description: 'Revenue, expenses, cash flow, runway, and reconciliation.',
};

export default function Page() {
  return <FinanceDashboard />;
}
