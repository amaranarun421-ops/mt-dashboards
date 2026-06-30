import ProfileClient from "./_client";

export const metadata = {
  title: "Profile",
  description:
    "Helios Pro — your personal profile with cover image, bio, skills, social links, stats and recent activity.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
