import { ErrorPages } from "@/components/pages/error-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '403 — Forbidden',
  description: "You don't have permission to access this resource.",
};

export default function Page() {
  return <ErrorPages code="403" />;
}
