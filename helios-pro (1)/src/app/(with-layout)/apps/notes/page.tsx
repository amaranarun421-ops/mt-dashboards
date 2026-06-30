import NotesClient from "./_client";

export const metadata = {
  title: "Notes",
  description: "Capture ideas, checklists and meeting notes — color-coded for quick scanning.",
};

export default function NotesPage() {
  return <NotesClient />;
}
