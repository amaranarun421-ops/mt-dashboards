import { ProfilePage } from "@/components/pages/profile-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your personal profile, activity, and connected accounts.',
};

export default function Page() {
  return <ProfilePage />;
}
