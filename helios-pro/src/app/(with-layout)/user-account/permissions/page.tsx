import PermissionsClient from "./_client";

export const metadata = {
  title: "Permissions",
  description:
    "Helios Pro — role × module permission matrix with per-action View, Create, Edit and Delete toggles.",
};

export default function PermissionsPage() {
  return <PermissionsClient />;
}
