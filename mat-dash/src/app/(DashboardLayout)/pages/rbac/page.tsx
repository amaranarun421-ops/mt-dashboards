"use client";
import { useState, Fragment } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const roles = ["Admin", "Editor", "Viewer", "Manager"];
const permissions = [
  { module: "Dashboard", actions: ["view","create","edit","delete"], icon: "solar:widget-bold-duotone" },
  { module: "Users", actions: ["view","create","edit","delete"], icon: "solar:users-group-rounded-bold-duotone" },
  { module: "Products", actions: ["view","create","edit","delete"], icon: "solar:cart-large-2-bold-duotone" },
  { module: "Orders", actions: ["view","create","edit","delete"], icon: "solar:bill-list-bold-duotone" },
  { module: "Reports", actions: ["view","create","edit","delete"], icon: "solar:chart-2-bold-duotone" },
  { module: "Settings", actions: ["view","create","edit","delete"], icon: "solar:settings-bold-duotone" },
];

const users = [
  { name: "Sarah Johnson", img: 4, email: "sarah.j@acme.com", role: "Admin", status: "Active" },
  { name: "Michael Chen", img: 5, email: "m.chen@acme.com", role: "Editor", status: "Active" },
  { name: "Emily Rodriguez", img: 6, email: "emily.r@acme.com", role: "Viewer", status: "Active" },
  { name: "David Park", img: 7, email: "d.park@acme.com", role: "Manager", status: "Inactive" },
];

const RBACPage = () => {
  const [matrix, setMatrix] = useState<Record<string, boolean>>({
    "Dashboard.view.Admin": true, "Dashboard.create.Admin": true, "Dashboard.edit.Admin": true, "Dashboard.delete.Admin": true,
    "Dashboard.view.Editor": true, "Dashboard.create.Editor": true, "Dashboard.edit.Editor": false, "Dashboard.delete.Editor": false,
    "Dashboard.view.Viewer": true, "Dashboard.create.Viewer": false, "Dashboard.edit.Viewer": false, "Dashboard.delete.Viewer": false,
    "Dashboard.view.Manager": true, "Dashboard.create.Manager": true, "Dashboard.edit.Manager": true, "Dashboard.delete.Manager": false,
    "Users.view.Admin": true, "Users.create.Admin": true, "Users.edit.Admin": true, "Users.delete.Admin": true,
    "Users.view.Editor": false, "Users.create.Editor": false, "Users.edit.Editor": false, "Users.delete.Editor": false,
    "Users.view.Viewer": false, "Users.create.Viewer": false, "Users.edit.Viewer": false, "Users.delete.Viewer": false,
    "Users.view.Manager": true, "Users.create.Manager": false, "Users.edit.Manager": true, "Users.delete.Manager": false,
    "Products.view.Admin": true, "Products.create.Admin": true, "Products.edit.Admin": true, "Products.delete.Admin": true,
    "Products.view.Editor": true, "Products.create.Editor": true, "Products.edit.Editor": true, "Products.delete.Editor": false,
    "Products.view.Viewer": true, "Products.create.Viewer": false, "Products.edit.Viewer": false, "Products.delete.Viewer": false,
    "Products.view.Manager": true, "Products.create.Manager": true, "Products.edit.Manager": true, "Products.delete.Manager": true,
    "Orders.view.Admin": true, "Orders.create.Admin": true, "Orders.edit.Admin": true, "Orders.delete.Admin": true,
    "Orders.view.Editor": true, "Orders.create.Editor": true, "Orders.edit.Editor": true, "Orders.delete.Editor": false,
    "Orders.view.Viewer": true, "Orders.create.Viewer": false, "Orders.edit.Viewer": false, "Orders.delete.Viewer": false,
    "Orders.view.Manager": true, "Orders.create.Manager": true, "Orders.edit.Manager": true, "Orders.delete.Manager": true,
    "Reports.view.Admin": true, "Reports.create.Admin": true, "Reports.edit.Admin": true, "Reports.delete.Admin": true,
    "Reports.view.Editor": true, "Reports.create.Editor": false, "Reports.edit.Editor": false, "Reports.delete.Editor": false,
    "Reports.view.Viewer": true, "Reports.create.Viewer": false, "Reports.edit.Viewer": false, "Reports.delete.Viewer": false,
    "Reports.view.Manager": true, "Reports.create.Manager": true, "Reports.edit.Manager": true, "Reports.delete.Manager": false,
    "Settings.view.Admin": true, "Settings.create.Admin": true, "Settings.edit.Admin": true, "Settings.delete.Admin": true,
    "Settings.view.Editor": false, "Settings.create.Editor": false, "Settings.edit.Editor": false, "Settings.delete.Editor": false,
    "Settings.view.Viewer": false, "Settings.create.Viewer": false, "Settings.edit.Viewer": false, "Settings.delete.Viewer": false,
    "Settings.view.Manager": true, "Settings.create.Manager": false, "Settings.edit.Manager": true, "Settings.delete.Manager": false,
  });

  const toggle = (key: string) => setMatrix((m) => ({ ...m, [key]: !m[key] }));

  return (
    <PageContainer
      title="Role-Based Access Control"
      description="Define what each role can do across modules. Toggle permissions per action and role."
      actions={<Button className="gap-1.5"><Icon icon="solar:add-circle-bold" width={16} /> New Role</Button>}
    >
      <DemoBlock title="Users & Their Roles" className="mb-6">
        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-lightprimary/50">
                <TableHead className="text-primary">User</TableHead>
                <TableHead className="text-primary">Email</TableHead>
                <TableHead className="text-primary">Role</TableHead>
                <TableHead className="text-primary">Status</TableHead>
                <TableHead className="text-primary text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarImage src={`/images/profile/user-${u.img}.jpg`} /><AvatarFallback>{u.name[0]}</AvatarFallback></Avatar>
                      <span className="font-medium text-sm">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{u.email}</TableCell>
                  <TableCell><Badge variant="lightPrimary">{u.role}</Badge></TableCell>
                  <TableCell><Badge variant={u.status === "Active" ? "lightSuccess" : "lightError"}>{u.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8"><Icon icon="solar:pen-linear" width={16} /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DemoBlock>

      <DemoBlock title="Permission Matrix" description="Toggle what each role can do per module">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-defaultBorder">
                <th className="py-3 text-left font-semibold">Module</th>
                <th className="py-3 text-left font-semibold">Action</th>
                {roles.map((r) => <th key={r} className="py-3 px-3 text-center font-semibold">{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {permissions.map((p) => (
                <Fragment key={p.module}>
                  <tr className="bg-lightprimary/20">
                    <td rowSpan={4} className="py-3 pr-4 align-top">
                      <div className="flex items-center gap-2">
                        <Icon icon={p.icon} width={20} className="text-primary" />
                        <span className="font-semibold">{p.module}</span>
                      </div>
                    </td>
                  </tr>
                  {p.actions.map((a, i) => (
                    <tr key={`${p.module}-${a}`} className="border-b border-defaultBorder">
                      {i > 0 && <td className="hidden" />}
                      <td className="py-3 pr-4 capitalize opacity-80">{a}</td>
                      {roles.map((r) => (
                        <td key={r} className="py-3 px-3 text-center">
                          <Switch
                            checked={!!matrix[`${p.module}.${a}.${r}`]}
                            onCheckedChange={() => toggle(`${p.module}.${a}.${r}`)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </DemoBlock>
    </PageContainer>
  );
};

export default RBACPage;
