import SupportTicketsClient from "./_client";

export const metadata = {
  title: "Support Tickets",
  description: "Triage, assign and resolve customer issues across channels.",
};

export default function SupportTicketsPage() {
  return <SupportTicketsClient />;
}
