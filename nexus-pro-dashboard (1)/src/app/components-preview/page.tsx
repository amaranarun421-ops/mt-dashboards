import { ComponentsPreviewPage } from "@/components/marketing/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components Preview",
  description: "Reusable premium component systems.",
};

export default function Page() {
  return <ComponentsPreviewPage />;
}
