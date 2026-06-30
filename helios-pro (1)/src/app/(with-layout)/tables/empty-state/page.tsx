import type { Metadata } from "next";
import EmptyStateClient from "./_client";

export const metadata: Metadata = {
  title: "Empty States | Tables | Helios Pro",
  description: "Four table empty-state variants — no data, no results, error, and loading skeleton — in a tabbed switcher.",
};

export default function EmptyStatePage() {
  return <EmptyStateClient />;
}
