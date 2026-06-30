import FileUploadClient from "./_client";

export const metadata = {
  title: "File Upload",
  description:
    "Helios Pro — drag-drop zone, file list with progress, multi-file, image preview grid and avatar upload with crop UI.",
};

export default function FileUploadPage() {
  return <FileUploadClient />;
}
