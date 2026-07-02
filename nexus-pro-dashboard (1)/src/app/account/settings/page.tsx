import { SettingsPage } from "@/components/pages/settings-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Workspace, appearance, localization, and email settings.',
};

export default function Page() {
  return <SettingsPage />;
}
