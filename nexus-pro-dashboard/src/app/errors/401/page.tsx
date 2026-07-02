import { ErrorPages } from "@/components/pages/error-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '401 — Unauthorized',
  description: 'Authentication required for this resource.',
};

export default function Page() {
  return <ErrorPages code="401" />;
}
