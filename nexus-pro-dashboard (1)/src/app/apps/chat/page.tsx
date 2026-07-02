import { ChatPage } from "@/components/pages/chat-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Real-time team messaging with threads, attachments, and reactions.',
};

export default function Page() {
  return <ChatPage />;
}
