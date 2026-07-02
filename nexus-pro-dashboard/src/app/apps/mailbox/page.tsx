import { MailboxPage } from "@/components/pages/mailbox-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mailbox',
  description: 'Inbox, threads, labels, and compose.',
};

export default function Page() {
  return <MailboxPage />;
}
