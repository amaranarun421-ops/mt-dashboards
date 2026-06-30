import InvoicesClient from "./_client";

export const metadata = {
  title: "Invoices",
  description: "Track billing, manage outstanding balances and reconcile payments.",
};

export default function InvoicesPage() {
  return <InvoicesClient />;
}
