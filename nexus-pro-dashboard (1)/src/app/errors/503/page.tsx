import { ErrorPages } from "@/components/pages/error-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '503 — Service Unavailable',
  description: "We're performing scheduled maintenance.",
};

export default function Page() {
  return <ErrorPages code="503" />;
}
