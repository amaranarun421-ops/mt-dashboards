import { UiAvatarsPage } from "@/components/pages/ui-avatars-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Avatars',
  description: 'Sizes, groups, statuses, and fallbacks.',
};

export default function Page() {
  return <UiAvatarsPage />;
}
