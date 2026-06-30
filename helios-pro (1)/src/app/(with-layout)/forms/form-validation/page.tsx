import FormValidationClient from "./_client";

export const metadata = {
  title: "Form Validation",
  description:
    "Helios Pro — real-time validation for required, email, min-length, password match, URL and numeric range fields.",
};

export default function FormValidationPage() {
  return <FormValidationClient />;
}
