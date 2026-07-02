import { Sessions } from "@/components/pages/sessions-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Active Sessions',
  description: 'Devices, locations, and revoke actions.',
};

export default function Page() {
  return <Sessions />;
}
