import { ErrorPages } from "@/components/pages/error-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '408 — Request Timeout',
  description: 'The request took too long to process.',
};

export default function Page() {
  return <ErrorPages code="408" />;
}
