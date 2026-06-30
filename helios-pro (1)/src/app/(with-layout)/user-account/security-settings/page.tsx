import SecuritySettingsClient from "./_client";

export const metadata = {
  title: "Security settings",
  description:
    "Helios Pro — change your password, manage two-factor authentication, active sessions, API tokens and login history.",
};

export default function SecuritySettingsPage() {
  return <SecuritySettingsClient />;
}
