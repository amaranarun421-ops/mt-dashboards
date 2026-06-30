import ToastsClient from "./_client";

export const metadata = {
  title: "Toasts",
  description:
    "Helios Pro — toast notifications showcase: success, error, warning, info, loading and promise-driven toasts via sonner.",
};

export default function ToastsPage() {
  return <ToastsClient />;
}
