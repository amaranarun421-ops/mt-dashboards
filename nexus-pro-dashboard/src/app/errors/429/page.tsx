import { ErrorPages } from "@/components/pages/error-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '429 — Too Many Requests',
  description: "You're being rate limited. Please slow down.",
};

export default function Page() {
  return <ErrorPages code="429" />;
}
