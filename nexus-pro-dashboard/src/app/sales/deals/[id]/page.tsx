import { DealDetailPage } from "@/components/sales/detail-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deal Detail",
  description: "Sales deal detail with timeline, contacts, and risk factors.",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DealDetailPage id={id} />;
}
