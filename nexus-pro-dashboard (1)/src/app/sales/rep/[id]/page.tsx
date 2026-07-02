import { RepDetailPage } from "@/components/sales/detail-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rep Detail",
  description: "Rep performance with attainment history and pipeline composition.",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RepDetailPage id={id} />;
}
