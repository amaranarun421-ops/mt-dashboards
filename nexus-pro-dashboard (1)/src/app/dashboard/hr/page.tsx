import { HrDashboard } from "@/components/pages/hr-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Human Resources Dashboard',
  description: 'Headcount, attendance, payroll, performance, and hiring.',
};

export default function Page() {
  return <HrDashboard />;
}
