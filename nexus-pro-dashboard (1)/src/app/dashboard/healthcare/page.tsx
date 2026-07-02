import { HealthcareDashboard } from "@/components/pages/healthcare-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Healthcare Dashboard',
  description: 'Patients, appointments, departments, beds, and queue status.',
};

export default function Page() {
  return <HealthcareDashboard />;
}
