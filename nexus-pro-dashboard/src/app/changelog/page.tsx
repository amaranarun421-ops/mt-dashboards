import { ChangelogPage } from "@/components/marketing/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in every release.",
};

export default function Page() {
  return <ChangelogPage />;
}
