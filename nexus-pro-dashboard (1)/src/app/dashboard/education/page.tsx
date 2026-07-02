import { EducationDashboard } from "@/components/pages/education-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Education Dashboard',
  description: 'Courses, students, instructors, attendance, and grades.',
};

export default function Page() {
  return <EducationDashboard />;
}
