import AccountSettingsClient from "./_client";

export const metadata = {
  title: "Account settings",
  description:
    "Helios Pro — manage your general profile, workspace preferences, notifications and account danger zone.",
};

export default function AccountSettingsPage() {
  return <AccountSettingsClient />;
}
