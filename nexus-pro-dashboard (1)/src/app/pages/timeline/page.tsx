import { TimelinePage } from "@/components/pages/timeline-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'Vertical and horizontal timelines.',
};

export default function Page() {
  return <TimelinePage />;
}
