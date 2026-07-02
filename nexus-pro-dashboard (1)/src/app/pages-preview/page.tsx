import { PagesPreviewPage } from "@/components/marketing/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pages Preview",
  description: "Every route is a real, refresh-safe URL.",
};

export default function Page() {
  return <PagesPreviewPage />;
}
