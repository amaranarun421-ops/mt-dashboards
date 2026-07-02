import { ErrorPages } from "@/components/pages/error-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Offline',
  description: "You're not connected to the internet.",
};

export default function Page() {
  return <ErrorPages code="offline" />;
}
