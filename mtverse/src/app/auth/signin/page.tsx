"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { MTVLogo } from "@/components/mtv/logo";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back to MTVerse", {
        description: "You have been signed in successfully.",
      });
      router.push("/");
    }, 900);
  };

  return (
    <Card className="border-border/60 shadow-premium">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex justify-center">
          <MTVLogo showText={false} />
        </div>
        <div className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Sign in to your MTVerse workspace to continue</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Social sign-in */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: "Google", icon: "G" },
            { name: "GitHub", icon: "GH" },
            { name: "Microsoft", icon: "M" },
          ].map((s) => (
            <Button
              key={s.name}
              variant="outline"
              type="button"
              className="h-10 text-xs font-medium"
              onClick={() => toast.info(`Signing in with ${s.name}...`)}
            >
              <span className="mr-1.5 font-semibold text-sm">{s.icon}</span>
              <span className="hidden sm:inline">{s.name}</span>
            </Button>
          ))}
        </div>

        <div className="relative">
          <Separator />
          <span className="absolute inset-0 -top-2.5 mx-auto w-fit bg-card px-3 text-[11px] text-muted-foreground">
            or continue with email
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className="pl-9 h-10"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/forgot" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className="pl-9 pr-9 h-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" defaultChecked />
            <Label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">
              Keep me signed in for 30 days
            </Label>
          </div>

          <Button type="submit" className="w-full h-10" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" /> Signing in...
              </>
            ) : (
              <>
                Sign in <ArrowRight className="size-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-success shrink-0" />
          <span>Protected by 256-bit encryption. Your data is always secure.</span>
        </div>
      </CardContent>

      <CardFooter className="justify-center border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-medium text-primary hover:underline">
            Create one now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
