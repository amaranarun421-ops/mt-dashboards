import { FeaturesPage } from "@/components/marketing/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description: "A complete dashboard foundation built to commercial standards.",
};

export default function Page() {
  return <FeaturesPage />;
}
