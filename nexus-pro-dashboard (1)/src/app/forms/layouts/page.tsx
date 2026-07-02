import { FormLayouts } from "@/components/pages/form-layouts-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Form Layouts',
  description: 'Profile, billing, organization, and address forms.',
};

export default function Page() {
  return <FormLayouts />;
}
