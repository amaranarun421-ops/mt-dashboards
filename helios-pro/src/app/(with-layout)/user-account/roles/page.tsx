import RolesClient from "./_client";

export const metadata = {
  title: "Roles",
  description:
    "Helios Pro — view, create and edit workspace roles with member counts and scoped permissions.",
};

export default function RolesPage() {
  return <RolesClient />;
}
