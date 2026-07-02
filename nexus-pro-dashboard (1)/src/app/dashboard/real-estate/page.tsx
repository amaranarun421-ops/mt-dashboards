import { RealEstateDashboard } from "@/components/pages/realestate-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Real Estate Dashboard',
  description: 'Listings, agents, leads, viewings, and mortgage pipeline.',
};

export default function Page() {
  return <RealEstateDashboard />;
}
