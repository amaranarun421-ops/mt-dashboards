import { TeamPage } from "@/components/pages/team-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Team',
  description: 'Members, invites, roles, and activity.',
};

export default function Page() {
  return <TeamPage />;
}
