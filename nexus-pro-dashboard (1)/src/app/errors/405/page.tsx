import { ErrorPages } from "@/components/pages/error-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '405 — Method Not Allowed',
  description: 'HTTP method not supported for this endpoint.',
};

export default function Page() {
  return <ErrorPages code="405" />;
}
