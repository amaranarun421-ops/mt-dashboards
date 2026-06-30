import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import { PersonalInfoForm } from "./_components/personal-info";
import { UploadPhotoForm } from "./_components/upload-photo";

export const metadata: Metadata = {
  title: "Settings Page",
  description: "Legacy settings page — Helios Pro demo mode.",
};

// Demo user — Helios Pro ships in demo mode (no auth backend required).
const DEMO_USER = {
  name: "Helios Admin",
  email: "admin@helios.pro",
  bio: "Building delightful admin experiences with Helios Pro.",
  phoneNumber: "5550100",
  image: null as string | null,
};

export default function SettingsPage() {
  const user = DEMO_USER;
  return (
    <div className="mx-auto w-full max-w-270">
      <Breadcrumb pageName="Settings" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <PersonalInfoForm
            name={user.name}
            email={user.email}
            bio={user.bio}
            phoneNumber={user.phoneNumber}
          />
        </div>
        <div className="col-span-5 xl:col-span-2">
          <UploadPhotoForm initialImage={user.image} />
        </div>
      </div>
    </div>
  );
}
