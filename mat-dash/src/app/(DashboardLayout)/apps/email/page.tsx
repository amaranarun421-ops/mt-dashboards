"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";

type Mail = { id: number; from: string; img: number; subject: string; preview: string; time: string; unread: boolean; starred: boolean; label?: string };

const folders = [
  { id: "inbox", name: "Inbox", icon: "solar:inbox-line-duotone", count: 12 },
  { id: "starred", name: "Starred", icon: "solar:star-line-duotone", count: 4 },
  { id: "sent", name: "Sent", icon: "solar:letter-sent-line-duotone", count: 0 },
  { id: "drafts", name: "Drafts", icon: "solar:document-add-line-duotone", count: 2 },
  { id: "spam", name: "Spam", icon: "solar:danger-triangle-line-duotone", count: 8 },
  { id: "trash", name: "Trash", icon: "solar:trash-bin-minimalistic-line-duotone", count: 0 },
];

const labels = [
  { name: "Work", color: "primary" },
  { name: "Personal", color: "secondary" },
  { name: "Important", color: "error" },
  { name: "Travel", color: "warning" },
];

const mails: Mail[] = [
  { id: 1, from: "Sarah Johnson", img: 4, subject: "Q3 Budget Approval", preview: "Hi team, I've reviewed the Q3 budget proposal and I have a few...", time: "10:42 AM", unread: true, starred: true, label: "Work" },
  { id: 2, from: "Michael Chen", img: 5, subject: "Design System v2", preview: "I've uploaded the new design system tokens. Please review when you...", time: "9:15 AM", unread: true, starred: false, label: "Work" },
  { id: 3, from: "Emily Rodriguez", img: 6, subject: "Your flight itinerary", preview: "Your flight to San Francisco has been confirmed. Booking ref: ABC123...", time: "Yesterday", unread: false, starred: true, label: "Travel" },
  { id: 4, from: "David Park", img: 7, subject: "Meeting notes", preview: "Thanks for the great discussion today. Here are the key takeaways...", time: "Yesterday", unread: false, starred: false, label: "Work" },
  { id: 5, from: "Lisa Anderson", img: 8, subject: "Welcome to the team!", preview: "A warm welcome to all our new hires. We're excited to have you...", time: "Mon", unread: true, starred: false },
  { id: 6, from: "James Wilson", img: 9, subject: "Invoice #2024-156", preview: "Please find attached the invoice for services rendered in May...", time: "Mon", unread: false, starred: false, label: "Important" },
  { id: 7, from: "Priya Patel", img: 10, subject: "Conference invite", preview: "You're invited to speak at ReactConf 2024. Would love to have you...", time: "Sun", unread: false, starred: true },
];

const EmailPage = () => {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [activeMail, setActiveMail] = useState<number>(1);
  const [selected, setSelected] = useState<number[]>([]);

  const mail = mails.find((m) => m.id === activeMail)!;

  return (
    <PageContainer title="Email" description="Full-featured email client with folders, labels, and reading pane.">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 h-[calc(100vh-220px)] rounded-xl overflow-hidden border border-defaultBorder bg-background">
        {/* Folders */}
        <div className="border-r border-defaultBorder p-3 hidden lg:block">
          <Button className="w-full gap-2 mb-4"><Icon icon="solar:pen-2-bold" width={16} /> Compose</Button>
          <nav className="space-y-1">
            {folders.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFolder(f.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-lightprimary hover:text-primary transition-colors ${activeFolder === f.id ? "bg-lightprimary text-primary font-medium" : ""}`}
              >
                <Icon icon={f.icon} width={18} />
                <span className="flex-1 text-left">{f.name}</span>
                {f.count > 0 && <Badge variant={f.id === "spam" ? "lightError" : "lightPrimary"} className="text-[10px]">{f.count}</Badge>}
              </button>
            ))}
          </nav>
          <div className="mt-6">
            <p className="text-xs font-semibold opacity-60 uppercase mb-2 px-3">Labels</p>
            <div className="space-y-1">
              {labels.map((l) => (
                <button key={l.name} className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-lightprimary hover:text-primary text-sm">
                  <span className={`h-2.5 w-2.5 rounded-full bg-${l.color}`} />
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mail list */}
        <div className="border-r border-defaultBorder flex flex-col">
          <div className="p-3 border-b border-defaultBorder flex items-center gap-2">
            <Checkbox />
            <Button size="icon" variant="ghost" className="h-8 w-8"><Icon icon="solar:refresh-bold" width={16} /></Button>
            <Button size="icon" variant="ghost" className="h-8 w-8"><Icon icon="solar:archive-bold" width={16} /></Button>
            <Button size="icon" variant="ghost" className="h-8 w-8"><Icon icon="solar:trash-bin-minimalistic-bold" width={16} /></Button>
          </div>
          <SimpleBar className="flex-1">
            {mails.map((m) => (
              <div
                key={m.id}
                onClick={() => setActiveMail(m.id)}
                className={`w-full p-3 flex gap-3 text-left border-b border-defaultBorder hover:bg-lightprimary/30 transition-colors cursor-pointer ${activeMail === m.id ? "bg-lightprimary/50" : ""}`}
              >
                <Checkbox checked={selected.includes(m.id)} onCheckedChange={() => setSelected((s) => s.includes(m.id) ? s.filter((x) => x !== m.id) : [...s, m.id])} onClick={(e) => e.stopPropagation()} />
                <Avatar className="h-10 w-10"><AvatarImage src={`/images/profile/user-${m.img}.jpg`} /><AvatarFallback>{m.from[0]}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${m.unread ? "font-semibold" : ""}`}>{m.from}</p>
                    <span className="text-xs opacity-60 shrink-0 ml-2">{m.time}</span>
                  </div>
                  <p className={`text-sm truncate ${m.unread ? "font-medium" : "opacity-80"}`}>{m.subject}</p>
                  <p className="text-xs opacity-60 truncate mt-0.5">{m.preview}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {m.starred && <Icon icon="solar:star-bold" className="text-warning" width={12} />}
                    {m.label && <Badge variant="lightPrimary" className="text-[10px]">{m.label}</Badge>}
                    {m.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                </div>
              </div>
            ))}
          </SimpleBar>
        </div>

        {/* Reading pane */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="p-4 border-b border-defaultBorder flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10"><AvatarImage src={`/images/profile/user-${mail.img}.jpg`} /><AvatarFallback>{mail.from[0]}</AvatarFallback></Avatar>
              <div>
                <p className="font-semibold text-sm">{mail.from}</p>
                <p className="text-xs opacity-60">to me · {mail.time}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="h-9 w-9"><Icon icon="solar:star-bold" className={mail.starred ? "text-warning" : ""} width={18} /></Button>
              <Button size="icon" variant="ghost" className="h-9 w-9"><Icon icon="solar:reply-bold" width={18} /></Button>
              <Button size="icon" variant="ghost" className="h-9 w-9"><Icon icon="solar:share-bold" width={18} /></Button>
              <Button size="icon" variant="ghost" className="h-9 w-9"><Icon icon="solar:trash-bin-minimalistic-bold" width={18} /></Button>
            </div>
          </div>

          <SimpleBar className="flex-1 p-6">
            <h2 className="text-xl font-semibold mb-4">{mail.subject}</h2>
            <div className="prose prose-sm max-w-none text-sm opacity-80 space-y-3">
              <p>Hi team,</p>
              <p>{mail.preview}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Looking forward to your feedback.</p>
              <p>Best regards,<br />{mail.from}</p>
            </div>
          </SimpleBar>

          <div className="p-3 border-t border-defaultBorder flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:reply-bold" width={14} /> Reply</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:forward-bold" width={14} /> Forward</Button>
            <Button variant="lightprimary" size="sm" className="gap-1.5 ml-auto"><Icon icon="solar:archive-bold" width={14} /> Archive</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default EmailPage;
