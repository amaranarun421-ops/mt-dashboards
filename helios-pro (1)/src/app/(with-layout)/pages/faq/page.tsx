import FaqClient from "./_client";

export const metadata = {
  title: "FAQ",
  description:
    "Helios Pro FAQ — searchable, categorised answers on getting started, billing, security, integrations and the API.",
};

export default function FaqPage() {
  return <FaqClient />;
}
