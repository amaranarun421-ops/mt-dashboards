import ActivityLogClient from "./_client";

export const metadata = {
  title: "Activity log",
  description:
    "Helios Pro — filter, search and audit every workspace event with a DataTable and a vertical Timeline view.",
};

export default function ActivityLogPage() {
  return <ActivityLogClient />;
}
