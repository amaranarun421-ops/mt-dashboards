import NotificationsSettingsClient from "./_client";

export const metadata = {
  title: "Notifications settings",
  description:
    "Helios Pro — fine-tune per-channel notification preferences with a live preview for email, push, SMS, Slack and the daily digest.",
};

export default function NotificationsSettingsPage() {
  return <NotificationsSettingsClient />;
}
