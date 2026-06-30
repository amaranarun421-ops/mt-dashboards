"use client";
import { useState } from "react";
import { PageHeader, Card, CardBody, Badge, Button } from "@/components/ui";
import { ROLES } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Plus, Copy, Pencil, Users, Shield, Trash2, Crown, Eye, FileText,
  Headphones, CreditCard,
} from "lucide-react";

const TONE_BAR: Record<string, string> = {
  error: "from-error-500 to-error-400",
  warning: "from-warning-500 to-warning-400",
  brand: "from-brand-500 to-accent-500",
  purple: "from-purple-500 to-pink-500",
  success: "from-success-500 to-success-400",
  pink: "from-pink-500 to-rose-500",
  gray: "from-gray-500 to-gray-400",
};

const TONE_ICON_BG: Record<string, string> = {
  error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  pink: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

const ROLE_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  "Super Admin": Crown,
  Admin: Shield,
  Editor: FileText,
  Viewer: Eye,
  Billing: CreditCard,
  Support: Headphones,
};

export default function RolesPage() {
  const [roles] = useState(ROLES);

  const totalUsers = roles.reduce((s, r) => s + r.users, 0);
  const totalPerms = roles.reduce((s, r) => s + r.permissions, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Roles"
        description="Define roles with scoped permissions and assign them to your team members."
        breadcrumbs={[{ label: "Account" }, { label: "Roles" }]}
        actions={<Button><Plus className="h-4 w-4" /> Create role</Button>}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card><CardBody className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"><Shield className="h-5 w-5" /></div>
          <div><p className="text-xs text-gray-500">Total roles</p><p className="text-xl font-bold text-gray-900 dark:text-white">{roles.length}</p></div>
        </CardBody></Card>
        <Card><CardBody className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400"><Users className="h-5 w-5" /></div>
          <div><p className="text-xs text-gray-500">Assigned users</p><p className="text-xl font-bold text-gray-900 dark:text-white">{totalUsers}</p></div>
        </CardBody></Card>
        <Card><CardBody className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400"><Shield className="h-5 w-5" /></div>
          <div><p className="text-xs text-gray-500">Total permissions</p><p className="text-xl font-bold text-gray-900 dark:text-white">{totalPerms}</p></div>
        </CardBody></Card>
        <Card><CardBody className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400"><Crown className="h-5 w-5" /></div>
          <div><p className="text-xs text-gray-500">Admin roles</p><p className="text-xl font-bold text-gray-900 dark:text-white">2</p></div>
        </CardBody></Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((r) => {
          const Icon = ROLE_ICON[r.name] ?? Shield;
          return (
            <Card key={r.id} hover className="overflow-hidden p-0">
              <div className={cn("h-1.5 w-full bg-gradient-to-r", TONE_BAR[r.color])} />
              <CardBody className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", TONE_ICON_BG[r.color])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{r.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{r.desc}</p>
                    </div>
                  </div>
                  <Badge tone={r.color as "error" | "warning" | "brand" | "purple" | "success" | "pink"} variant="soft">{r.color}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/40">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Users</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{r.users}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/40">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Permissions</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{r.permissions}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                  <Button variant="outline" size="sm" className="flex-1"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                  <Button variant="outline" size="sm" className="flex-1"><Copy className="h-3.5 w-3.5" /> Duplicate</Button>
                  <Button variant="ghost" size="sm" className="text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </CardBody>
            </Card>
          );
        })}

        {/* Create card */}
        <Card className="flex min-h-[260px] flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 dark:border-gray-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <Plus className="h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Create new role</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Define a custom role with scoped permissions</p>
          </div>
          <Button size="sm"><Plus className="h-3.5 w-3.5" /> New role</Button>
        </Card>
      </div>
    </div>
  );
}
