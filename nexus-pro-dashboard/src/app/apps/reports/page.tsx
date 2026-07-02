import { ReportsPage } from "@/components/pages/reports-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Reports',
  description: 'Saved reports, scheduled exports, and report builder.',
};

export default function Page() {
  return <ReportsPage />;
}
