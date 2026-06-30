import TeamMembersClient from "./_client";

export const metadata = {
  title: "Team members",
  description:
    "Helios Pro — manage your workspace team, invite members, change roles and audit permissions.",
};

export default function TeamMembersPage() {
  return <TeamMembersClient />;
}
