import { FormWizard } from "@/components/pages/form-wizard-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Multi-Step Wizard',
  description: 'Onboarding wizard with progress and review.',
};

export default function Page() {
  return <FormWizard />;
}
