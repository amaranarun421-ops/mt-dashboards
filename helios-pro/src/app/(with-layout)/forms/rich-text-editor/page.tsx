import RichTextEditorClient from "./_client";

export const metadata = {
  title: "Rich Text Editor",
  description:
    "Helios Pro — UI-only rich text editor with a full toolbar (bold, italic, lists, headings, alignment, links).",
};

export default function RichTextEditorPage() {
  return <RichTextEditorClient />;
}
