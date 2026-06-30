import ChatClient from "./_client";

export const metadata = {
  title: "Chat",
  description: "Real-time messaging with your Helios Pro team — DMs, channels and shared files.",
};

export default function ChatPage() {
  return <ChatClient />;
}
