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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MTVLogo } from "@/components/mtv/logo";
import { Eye, EyeOff, Loader2, Lock, LogOut } from "lucide-react";

export default function LockPage() {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back, Alex! Session unlocked.");
    }, 1100);
  };

  return (
    <Card className="border-border/60 shadow-premium">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <MTVLogo showText={false} />
        </div>

        {now && (
          <div className="space-y-0.5">
            <p className="text-3xl font-bold tracking-tight tabular-nums">
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {now.toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-3 py-2">
          <Avatar className="size-20 ring-4 ring-primary/10">
            <AvatarFallback className="bg-mtv-gradient text-primary-foreground text-2xl font-semibold">
              AM
            </AvatarFallback>
          </Avatar>
          <div className="text-center space-y-0.5">
            <CardTitle className="text-xl">Alex Morgan</CardTitle>
            <CardDescription>alex.morgan@company.com</CardDescription>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password to unlock"
                className="pl-9 pr-9"
                autoComplete="current-password"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Unlocking...
              </>
            ) : (
              "Unlock"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="size-3.5" />
          Sign in as a different user
        </Link>
      </CardFooter>
    </Card>
  );
}
