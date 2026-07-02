import { UiPagination } from "@/components/pages/ui-pagination-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pagination',
  description: 'Page navigation patterns.',
};

export default function Page() {
  return <UiPagination />;
}
