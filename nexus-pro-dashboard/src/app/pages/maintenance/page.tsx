import { Maintenance } from "@/components/pages/maintenance-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Maintenance',
  description: 'Scheduled maintenance notice.',
};

export default function Page() {
  return <Maintenance />;
}
