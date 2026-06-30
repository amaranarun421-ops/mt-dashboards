import FileManagerClient from "./_client";

export const metadata = {
  title: "File Manager",
  description: "Browse, share and manage files across your Helios Pro workspace.",
};

export default function FileManagerPage() {
  return <FileManagerClient />;
}
