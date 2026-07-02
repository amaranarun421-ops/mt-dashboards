import { LeadDetailPage } from "@/components/sales/detail-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Detail",
  description: "Sales lead detail with score, source, and activity history.",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LeadDetailPage id={id} />;
}
