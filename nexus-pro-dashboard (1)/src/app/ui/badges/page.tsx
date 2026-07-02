import { UiBadgesPage } from "@/components/pages/ui-badges-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Badges & Chips',
  description: 'Status badges, count chips, and tag pills.',
};

export default function Page() {
  return <UiBadgesPage />;
}
