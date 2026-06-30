"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MTVLogo } from "@/components/mtv/logo";
import {
  Globe,
  Laptop,
  LogOut,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

type Session = {
  id: string;
  device: "Desktop" | "Mobile" | "Tablet";
  browser: string;
  os: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
};

const INITIAL_SESSIONS: Session[] = [
  {
    id: "s1",
    device: "Desktop",
    browser: "Chrome 132",
    os: "macOS Sonoma",
    location: "San Francisco, CA, USA",
    ip: "192.168.1.24",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "s2",
    device: "Mobile",
    browser: "Safari Mobile",
    os: "iOS 17.4",
    location: "San Francisco, CA, USA",
    ip: "10.0.4.118",
    lastActive: "2 minutes ago",
    current: false,
  },
  {
    id: "s3",
    device: "Laptop",
    browser: "Firefox 124",
    os: "Windows 11 Pro",
    location: "New York, NY, USA",
    ip: "172.16.0.42",
    lastActive: "1 hour ago",
    current: false,
  },
  {
    id: "s4",
    device: "Tablet",
    browser: "Chrome 132",
    os: "Android 14",
    location: "Austin, TX, USA",
    ip: "203.0.113.7",
    lastActive: "Yesterday at 6:42 PM",
    current: false,
  },
  {
    id: "s5",
    device: "Desktop",
    browser: "Edge 124",
    os: "Windows 11 Pro",
    location: "London, United Kingdom",
    ip: "198.51.100.23",
    lastActive: "3 days ago",
    current: false,
  },
];

const deviceIcon = {
  Desktop: Monitor,
  Laptop: Laptop,
  Mobile: Smartphone,
  Tablet: Tablet,
} as const;

export default function SessionsPage() {
  const [sessions, setSessions] = React.useState(INITIAL_SESSIONS);

  const revoke = (id: string) => {
    const s = sessions.find((x) => x.id === id);
    setSessions((prev) => prev.filter((x) => x.id !== id));
    toast.success(`Session on ${s?.browser ?? "device"} revoked`);
  };

  const signOutAll = () => {
    setSessions((prev) => prev.filter((s) => s.current));
    toast.success("Signed out of all other sessions");
  };

  return (
    <Card className="border-border/60 shadow-premium">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MTVLogo showText={false} />
            <CardTitle className="text-xl">Active sessions</CardTitle>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={signOutAll}
            disabled={sessions.length <= 1}
          >
            <LogOut className="size-4" />
            Sign out all
          </Button>
        </div>
        <CardDescription>
          Manage devices currently signed in to your MTVerse account. If you don&apos;t
          recognize a session, revoke it immediately.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="max-h-[28rem] overflow-y-auto pr-1 space-y-3">
          {sessions.map((s) => {
            const Icon = deviceIcon[s.device];
            return (
              <div
                key={s.id}
                className="rounded-xl border border-border bg-card p-4 hover:border-border/80 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">
                        {s.browser} · {s.os}
                      </p>
                      {s.current && (
                        <Badge className="bg-success/10 text-success border-success/20" variant="outline">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" />
                        {s.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Globe className="size-3" />
                        {s.ip}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-success" />
                        {s.lastActive}
                      </span>
                    </div>
                  </div>
                  {!s.current && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => revoke(s.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            );
          })}

          {sessions.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No active sessions.
            </div>
          )}
        </div>

        <Separator />

        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="size-3.5 mt-0.5 shrink-0" />
          <p>
            Sessions expire automatically after 30 days of inactivity. For your security,
            we recommend signing out of devices you no longer use.
          </p>
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <Link
          href="/signin"
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
