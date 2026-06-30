import type { Metadata } from "next";
import { NotFoundClient } from "./_client";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Helios Pro",
  description:
    "The page you were looking for could not be found. Search the workspace or return to the dashboard.",
};

export default function NotFoundPage() {
  return <NotFoundClient />;
}
