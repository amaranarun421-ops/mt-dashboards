import { FormEditor } from "@/components/pages/form-editor-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Rich Text Editor',
  description: 'Toolbar, slash commands, and markdown preview.',
};

export default function Page() {
  return <FormEditor />;
}
