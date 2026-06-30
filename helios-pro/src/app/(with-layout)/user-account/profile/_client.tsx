"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Modal } from "@/components/shared/modal";
import { Progress } from "@/components/shared/progress";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import { User, CheckSquareIcon, EditIcon } from "@/components/Layouts/sidebar/icons";
import {
  profileUser,
  profileStats,
  skills,
  skillBadges,
  socialLinks,
  profileActivity,
  type ProfileActivity,
} from "@/data/user-account/profile";

const statTone: Record<string, string> = {
  primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
  accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
  info: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light",
  rose: "bg-rose-subtle text-rose dark:bg-rose/15 dark:text-rose-light",
};

const activityToFeed = (a: ProfileActivity) => ({
  id: a.id,
  user: a.user,
  action: a.action,
  target: a.target,
  time: a.time,
  tone: a.tone,
});

export default function ProfileClient() {
  const [editOpen, setEditOpen] = useState(false);
  const [bio, setBio] = useState(profileUser.bio);
  const [name, setName] = useState(profileUser.name);
  const [role, setRole] = useState(profileUser.role);
  const [location, setLocation] = useState(profileUser.location);
  const [website, setWebsite] = useState(profileUser.website);
  const [following, setFollowing] = useState(false);

  return (
    <div>
      <PageHeader
        title="Profile"
        description="Your personal profile, skills and recent activity across Helios Pro."
        breadcrumbs={[
          { label: "User & Account" },
          { label: "Profile" },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => setFollowing((f) => !f)}>
              {following ? "Following" : "Follow"}
            </Button>
            <Button onClick={() => setEditOpen(true)}>
              <EditIcon className="size-4" />
              Edit profile
            </Button>
          </>
        }
      />

      {/* Cover + avatar + identity */}
      <Card padded={false} className="overflow-hidden p-0">
        <div className="relative h-44 sm:h-56 md:h-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileUser.cover}
            alt="Cover"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute right-3 top-3 flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/85 backdrop-blur dark:bg-dark-2/85">
              Change cover
            </Button>
          </div>
        </div>
        <div className="px-5 pb-5 md:px-7 md:pb-7">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <Avatar
                name={profileUser.name}
                src={profileUser.avatarSrc}
                size="xl"
                className="size-24 ring-4 ring-white dark:ring-gray-dark sm:size-28"
              />
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-dark dark:text-white md:text-2xl">
                    {profileUser.name}
                  </h2>
                  <Badge variant="primary">{profileUser.role}</Badge>
                </div>
                <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                  {profileUser.handle} · {profileUser.email}
                </p>
                <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                  {profileUser.location} · {profileUser.timezone} · Joined {profileUser.joinedAt}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-dark-7 dark:text-dark-6">
            {profileUser.bio}
          </p>

          {/* Social links */}
          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white px-3 py-1.5 text-xs font-medium text-dark-7 transition hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:text-primary-light"
              >
                <span className={`size-2 rounded-full ${statTone[s.tone]?.split(" ")[0]}`} />
                {s.label}
                <span className="text-dark-5 dark:text-dark-6">· {s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {profileStats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-dark-5 dark:text-dark-6">{s.label}</p>
                <p className="mt-1 text-2xl font-bold text-dark dark:text-white">{s.value}</p>
                <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{s.sub}</p>
              </div>
              <span className={`grid size-10 place-items-center rounded-xl ${statTone[s.tone]}`}>
                <User className="size-5" />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader
              title="About"
              subtitle="A short summary of who you are and what you do at Helios Pro."
              action={<Badge variant="outline">Public</Badge>}
            />
            <p className="text-sm leading-relaxed text-dark-7 dark:text-dark-6">
              {profileUser.bio}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-stroke pt-5 dark:border-dark-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-dark-5 dark:text-dark-6">Full name</p>
                <p className="mt-1 text-sm font-medium text-dark dark:text-white">{profileUser.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-dark-5 dark:text-dark-6">Role</p>
                <p className="mt-1 text-sm font-medium text-dark dark:text-white">{profileUser.role}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-dark-5 dark:text-dark-6">Email</p>
                <p className="mt-1 text-sm font-medium text-dark dark:text-white">{profileUser.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-dark-5 dark:text-dark-6">Website</p>
                <p className="mt-1 text-sm font-medium text-primary dark:text-primary-light">{profileUser.website}</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Recent activity"
              subtitle="Your last actions across dashboards, projects and tasks."
              action={<Button variant="ghost" size="sm">View all</Button>}
            />
            <ActivityFeed items={profileActivity.map(activityToFeed)} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Skills" subtitle="Strengths ranked by your peers" />
            <ul className="space-y-3">
              {skills.map((s) => (
                <li key={s.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-dark dark:text-white">{s.name}</span>
                    <span className="text-dark-5 dark:text-dark-6">{s.level}%</span>
                  </div>
                  <Progress value={s.level} tone="primary" size="sm" />
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Tools & tech" subtitle="Tools you work with day to day" />
            <div className="flex flex-wrap gap-2">
              {skillBadges.map((b) => (
                <Badge key={b} variant="neutral" size="md">
                  {b}
                </Badge>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Verification"
              subtitle="Ways you've verified your identity"
              action={<CheckSquareIcon className="size-5 text-primary" />}
            />
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-dark-7 dark:text-dark-6">Email address</span>
                <Badge variant="success">Verified</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-dark-7 dark:text-dark-6">Phone number</span>
                <Badge variant="success">Verified</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-dark-7 dark:text-dark-6">Two-factor auth</span>
                <Badge variant="success">Enabled</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-dark-7 dark:text-dark-6">Domain (heliospro.io)</span>
                <Badge variant="warning">Pending</Badge>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit profile"
        description="Update your public profile information. Changes are visible to your team."
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditOpen(false)}>
              <CheckSquareIcon className="size-4" />
              Save changes
            </Button>
          </>
        }
      >
        <FormSection title="Basic information" description="" columns={2} className="border-0 p-0 shadow-none">
          <FormField label="Full name" htmlFor="prof-name">
            <input
              id="prof-name"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField label="Role / title" htmlFor="prof-role">
            <input
              id="prof-role"
              className={inputClass}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </FormField>
          <FormField label="Location" htmlFor="prof-location">
            <input
              id="prof-location"
              className={inputClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormField>
          <FormField label="Website" htmlFor="prof-website">
            <input
              id="prof-website"
              className={inputClass}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </FormField>
          <FormField label="Bio" htmlFor="prof-bio" hint="Up to 280 characters">
            <textarea
              id="prof-bio"
              rows={4}
              className={`${inputClass} resize-none`}
              value={bio}
              maxLength={280}
              onChange={(e) => setBio(e.target.value)}
            />
          </FormField>
        </FormSection>
      </Modal>
    </div>
  );
}
