import CommandMenuClient from "./_client";

export const metadata = {
  title: "Command Menu",
  description:
    "Helios Pro — command palette showcase: open with Cmd/Ctrl+K, search 100+ routes, navigate with the arrow keys and Enter.",
};

export default function CommandMenuPage() {
  return <CommandMenuClient />;
}
