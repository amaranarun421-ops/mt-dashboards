import { SalesPlaybooksPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playbooks",
  description: "Repeatable sales plays and battle cards.",
};

export default function Page() {
  return <SalesPlaybooksPage />;
}
