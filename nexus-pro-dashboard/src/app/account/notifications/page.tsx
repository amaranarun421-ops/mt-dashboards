import { NotificationsPage } from "@/components/pages/notifications-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Notification center, channels, and preferences.',
};

export default function Page() {
  return <NotificationsPage />;
}
