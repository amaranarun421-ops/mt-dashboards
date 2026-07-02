import { AccountDetailPage } from "@/components/sales/detail-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Detail",
  description: "Account overview with open deals, contacts, and activity.",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AccountDetailPage id={id} />;
}
