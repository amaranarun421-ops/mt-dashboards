import { ErrorPages } from "@/components/pages/error-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '500 — Server Error',
  description: 'Something went wrong on our side.',
};

export default function Page() {
  return <ErrorPages code="500" />;
}
