import EmailClient from "./_client";

export const metadata = {
  title: "Email",
  description: "Inbox, threads and quick replies for your Helios Pro mailbox.",
};

export default function EmailPage() {
  return <EmailClient />;
}
