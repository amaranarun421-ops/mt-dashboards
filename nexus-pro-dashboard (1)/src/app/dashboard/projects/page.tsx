import { ProjectsDashboard } from "@/components/pages/projects-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Project Management Dashboard',
  description: 'Portfolio health, timelines, workload, and sprint metrics.',
};

export default function Page() {
  return <ProjectsDashboard />;
}
