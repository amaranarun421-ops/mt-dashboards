import { UiTimeline } from "@/components/pages/ui-timeline-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'Activity timelines with variants.',
};

export default function Page() {
  return <UiTimeline />;
}
