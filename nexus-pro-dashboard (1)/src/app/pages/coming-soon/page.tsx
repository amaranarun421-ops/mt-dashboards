import { ComingSoon } from "@/components/pages/coming-soon-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'Product launch countdown.',
};

export default function Page() {
  return <ComingSoon />;
}
