import { NotesPage } from "@/components/pages/notes-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notebook sidebar, editor, tags, and pinned notes.',
};

export default function Page() {
  return <NotesPage />;
}
