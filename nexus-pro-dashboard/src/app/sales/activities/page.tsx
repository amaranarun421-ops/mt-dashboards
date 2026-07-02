import { SalesActivitiesPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities",
  description: "Calls, emails, meetings, notes, and deal events.",
};

export default function Page() {
  return <SalesActivitiesPage />;
}
