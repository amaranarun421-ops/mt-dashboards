import { CalendarPage } from "@/components/pages/calendar-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'Schedule and manage events across month, week, and day views.',
};

export default function Page() {
  return <CalendarPage />;
}
