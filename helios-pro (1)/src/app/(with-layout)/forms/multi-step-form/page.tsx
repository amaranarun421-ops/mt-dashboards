import MultiStepFormClient from "./_client";

export const metadata = {
  title: "Multi-Step Form",
  description:
    "Helios Pro — 4-step wizard (Account, Profile, Preferences, Review) with step indicator, per-step validation and a final summary.",
};

export default function MultiStepFormPage() {
  return <MultiStepFormClient />;
}
