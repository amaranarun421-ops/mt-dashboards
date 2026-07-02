import { TableBasic } from "@/components/pages/table-basic-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Basic Tables',
  description: 'Simple structured tables with styling variants.',
};

export default function Page() {
  return <TableBasic />;
}
