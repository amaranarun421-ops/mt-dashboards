import { ErrorPages } from "@/components/pages/error-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '404 — Not Found',
  description: "The page you're looking for doesn't exist.",
};

export default function Page() {
  return <ErrorPages code="404" />;
}
