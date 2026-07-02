import { RolesPage } from "@/components/pages/roles-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Roles & Permissions',
  description: 'Role matrix, permission groups, and assignments.',
};

export default function Page() {
  return <RolesPage />;
}
