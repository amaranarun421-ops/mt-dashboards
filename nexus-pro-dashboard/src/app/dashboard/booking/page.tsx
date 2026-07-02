import { BookingDashboard } from "@/components/pages/booking-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Booking Dashboard',
  description: 'Bookings, availability, revenue, and staff schedule.',
};

export default function Page() {
  return <BookingDashboard />;
}
