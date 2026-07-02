import { DocsPage } from "@/components/marketing/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Everything you need to build, customize, and ship.",
};

export default function Page() {
  return <DocsPage />;
}
