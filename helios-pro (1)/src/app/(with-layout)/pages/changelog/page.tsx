import ChangelogClient from "./_client";

export const metadata = {
  title: "Changelog",
  description:
    "Helios Pro changelog — every release, every change. Filter by version to see Added, Changed, Fixed and Removed items per release.",
};

export default function ChangelogPage() {
  return <ChangelogClient />;
}
