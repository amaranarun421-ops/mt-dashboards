import { FormSelect } from "@/components/pages/form-select-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Select & Multiselect',
  description: 'Single, multi, searchable, grouped, and async select.',
};

export default function Page() {
  return <FormSelect />;
}
