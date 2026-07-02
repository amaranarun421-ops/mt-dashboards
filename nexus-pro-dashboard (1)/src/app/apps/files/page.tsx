import { FilesPage } from "@/components/pages/files-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'File Manager',
  description: 'Folders, file grid, storage usage, and sharing.',
};

export default function Page() {
  return <FilesPage />;
}
