"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { employees } from "../../data/tables";

const HoverTablePage = () => {
  return (
    <PageContainer
      title="Hover Table"
      description="Rows highlight on hover for better scannability. Best used on interactive tables."
    >
      <DemoBlock title="Employee Directory">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((e) => (
              <TableRow key={e.id} className="cursor-pointer hover:bg-lightprimary/50 dark:hover:bg-darkinfo/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarImage src={`/images/profile/user-${(e.id % 10) + 1}.jpg`} /><AvatarFallback>{e.name[0]}</AvatarFallback></Avatar>
                    <div>
                      <p className="font-medium text-sm">{e.name}</p>
                      <p className="text-xs opacity-60">{e.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{e.department}</TableCell>
                <TableCell>{e.role}</TableCell>
                <TableCell>
                  <Badge variant={e.status === "Active" ? "lightSuccess" : e.status === "On Leave" ? "lightWarning" : "lightError"}>{e.status}</Badge>
                </TableCell>
                <TableCell className="font-semibold">${e.salary.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 hover:opacity-100">
                    <button className="h-8 w-8 rounded-full hover:bg-lightprimary text-link hover:text-primary flex items-center justify-center"><Icon icon="solar:eye-linear" width={16} /></button>
                    <button className="h-8 w-8 rounded-full hover:bg-lightprimary text-link hover:text-primary flex items-center justify-center"><Icon icon="solar:pen-linear" width={16} /></button>
                    <button className="h-8 w-8 rounded-full hover:bg-lighterror text-error flex items-center justify-center"><Icon icon="solar:trash-bin-minimalistic-linear" width={16} /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoBlock>

      <DemoBlock title="Recent Activity" className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { user: "Sarah Johnson", img: 4, action: "Created", target: "Project Phoenix", time: "2 min ago", color: "success" },
              { user: "Michael Chen", img: 5, action: "Updated", target: "Design System v2", time: "15 min ago", color: "primary" },
              { user: "Emily Rodriguez", img: 6, action: "Deleted", target: "Old user records", time: "1 hour ago", color: "error" },
              { user: "David Park", img: 7, action: "Approved", target: "Q3 Budget", time: "3 hours ago", color: "success" },
              { user: "Lisa Anderson", img: 8, action: "Commented on", target: "Onboarding flow", time: "5 hours ago", color: "info" },
            ].map((a, i) => (
              <TableRow key={i} className="cursor-pointer hover:bg-lightgray/60 dark:hover:bg-dark/40">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8"><AvatarImage src={`/images/profile/user-${a.img}.jpg`} /><AvatarFallback>{a.user[0]}</AvatarFallback></Avatar>
                    <span className="text-sm font-medium">{a.user}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={`light${a.color.charAt(0).toUpperCase() + a.color.slice(1)}` as any}>{a.action}</Badge>
                </TableCell>
                <TableCell className="text-sm opacity-80">{a.target}</TableCell>
                <TableCell className="text-xs opacity-60">{a.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoBlock>
    </PageContainer>
  );
};

export default HoverTablePage;
