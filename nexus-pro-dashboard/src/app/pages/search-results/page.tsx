import { SearchResults } from "@/components/pages/search-results-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search results with filters.',
};

export default function Page() {
  return <SearchResults />;
}
