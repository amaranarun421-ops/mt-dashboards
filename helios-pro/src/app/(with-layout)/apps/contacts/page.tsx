import ContactsClient from "./_client";

export const metadata = {
  title: "Contacts",
  description: "Manage customers, partners and team members in one place.",
};

export default function ContactsPage() {
  return <ContactsClient />;
}
