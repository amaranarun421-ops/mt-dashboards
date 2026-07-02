import { FormValidation } from "@/components/pages/form-validation-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Form Validation',
  description: 'React Hook Form + Zod with inline errors.',
};

export default function Page() {
  return <FormValidation />;
}
