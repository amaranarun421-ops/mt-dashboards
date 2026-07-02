import { FormMask } from "@/components/pages/form-mask-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Input Mask',
  description: 'Phone, currency, card, date, and license key masks.',
};

export default function Page() {
  return <FormMask />;
}
