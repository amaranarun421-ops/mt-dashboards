import { SalesTeamPerformancePage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Performance",
  description: "Rep leaderboard, win rates, and velocity.",
};

export default function Page() {
  return <SalesTeamPerformancePage />;
}
