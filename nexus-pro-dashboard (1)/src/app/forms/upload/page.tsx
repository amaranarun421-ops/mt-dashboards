import { FormUpload } from "@/components/pages/form-upload-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'File Upload',
  description: 'Drag-and-drop with preview and validation.',
};

export default function Page() {
  return <FormUpload />;
}
