"use client";

import * as React from "react";
import { useState } from "react";
import {
  Plus, ChevronLeft, ChevronRight, MoreVertical, Filter, TrendingUp,
  DollarSign, Target, Award, Clock, User, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, StatCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Deal = {
  id: string; company: string; initials: string; color: string;
  value: number; owner: string; ownerColor: string; daysInStage: number;
  probability: number; stage: string; contact: string;
};

type Stage = { id: string; title: string; color: string; accent: string };

const stages: Stage[] = [
  { id: "lead", title: "Lead", color: "bg-slate-400", accent: "text-slate-500" },
  { id: "qualified", title: "Qualified", color: "bg-sky-500", accent: "text-sky-600" },
  { id: "proposal", title: "Proposal", color: "bg-violet-500", accent: "text-violet-600" },
  { id: "negotiation", title: "Negotiation", color: "bg-amber-500", accent: "text-amber-600" },
  { id: "won", title: "Closed Won", color: "bg-emerald-500", accent: "text-emerald-600" },
  { id: "lost", title: "Closed Lost", color: "bg-rose-500", accent: "text-rose-600" },
];

const companyColors: Record<string, string> = {
  AC: "bg-rose-500/15 text-rose-600",
  GC: "bg-emerald-500/15 text-emerald-600",
  IN: "bg-sky-500/15 text-sky-600",
  UC: "bg-violet-500/15 text-violet-600",
  SI: "bg-amber-500/15 text-amber-600",
  WE: "bg-fuchsia-500/15 text-fuchsia-600",
  HO: "bg-teal-500/15 text-teal-600",
  LP: "bg-orange-500/15 text-orange-600",
  NB: "bg-cyan-500/15 text-cyan-600",
  VX: "bg-pink-500/15 text-pink-600",
  SK: "bg-indigo-500/15 text-indigo-600",
  MS: "bg-lime-500/15 text-lime-600",
};

const ownerColors: Record<string, string> = {
  AM: "bg-primary/15 text-primary",
  MH: "bg-emerald-500/15 text-emerald-600",
  JR: "bg-sky-500/15 text-sky-600",
  PS: "bg-amber-500/15 text-amber-600",
  LP: "bg-fuchsia-500/15 text-fuchsia-600",
};

const initialDeals: Deal[] = [
  { id: "D-2841", company: "Acme Corp", initials: "AC", color: companyColors.AC, value: 48000, owner: "AM", ownerColor: ownerColors.AM, daysInStage: 2, probability: 80, stage: "negotiation", contact: "priya@acme.co" },
  { id: "D-2840", company: "Globex Inc", initials: "GC", color: companyColors.GC, value: 28500, owner: "JR", ownerColor: ownerColors.JR, daysInStage: 5, probability: 60, stage: "proposal", contact: "kim@globex.io" },
  { id: "D-2839", company: "Initech", initials: "IN", color: companyColors.IN, value: 92000, owner: "AM", ownerColor: ownerColors.AM, daysInStage: 1, probability: 40, stage: "qualified", contact: "peter@initech.com" },
  { id: "D-2838", company: "Umbrella Co", initials: "UC", color: companyColors.UC, value: 18400, owner: "PS", ownerColor: ownerColors.PS, daysInStage: 12, probability: 30, stage: "lead", contact: "alex@umbrella.co" },
  { id: "D-2837", company: "Stark Industries", initials: "SI", color: companyColors.SI, value: 124000, owner: "AM", ownerColor: ownerColors.AM, daysInStage: 3, probability: 90, stage: "negotiation", contact: "tony@stark.io" },
  { id: "D-2836", company: "Wayne Ent", initials: "WE", color: companyColors.WE, value: 64200, owner: "JR", ownerColor: ownerColors.JR, daysInStage: 8, probability: 50, stage: "proposal", contact: "bruce@wayne.co" },
  { id: "D-2835", company: "Hooli", initials: "HO", color: companyColors.HO, value: 38900, owner: "PS", ownerColor: ownerColors.PS, daysInStage: 4, probability: 70, stage: "qualified", contact: "gavin@hooli.com" },
  { id: "D-2834", company: "Lumen Pharma", initials: "LP", color: companyColors.LP, value: 218000, owner: "AM", ownerColor: ownerColors.AM, daysInStage: 18, probability: 20, stage: "lead", contact: "sarah@lumen.bio" },
  { id: "D-2833", company: "Nimbus Tech", initials: "NB", color: companyColors.NB, value: 56000, owner: "JR", ownerColor: ownerColors.JR, daysInStage: 1, probability: 100, stage: "won", contact: "liam@nimbus.tech" },
  { id: "D-2832", company: "Vexa Labs", initials: "VX", color: companyColors.VX, value: 14200, owner: "PS", ownerColor: ownerColors.PS, daysInStage: 22, probability: 100, stage: "lost", contact: "max@vexa.ai" },
  { id: "D-2831", company: "Skyline Systems", initials: "SK", color: companyColors.SK, value: 78000, owner: "AM", ownerColor: ownerColors.AM, daysInStage: 6, probability: 65, stage: "proposal", contact: "nina@skyline.io" },
  { id: "D-2830", company: "Meridian Co", initials: "MS", color: companyColors.MS, value: 34500, owner: "JR", ownerColor: ownerColors.JR, daysInStage: 9, probability: 45, stage: "qualified", contact: "owen@meridian.co" },
];

const fmt = (n: number) => `$${(n / 1000).toFixed(1)}k`;
const fmtFull = (n: number) => `$${n.toLocaleString()}`;

export default function CRMPipelineApp() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [addOpen, setAddOpen] = useState<string | null>(null);
  const [newCompany, setNewCompany] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newOwner, setNewOwner] = useState("AM");
  const [newStage, setNewStage] = useState("lead");

  const dealsByStage = (stageId: string) => deals.filter((d) => d.stage === stageId);
  const valueByStage = (stageId: string) => dealsByStage(stageId).reduce((a, d) => a + d.value, 0);
  const weightedValue = (stageId: string) => dealsByStage(stageId).reduce((a, d) => a + (d.value * d.probability) / 100, 0);

  const totalPipeline = deals.filter((d) => !["won", "lost"].includes(d.stage)).reduce((a, d) => a + d.value, 0);
  const totalWon = deals.filter((d) => d.stage === "won").reduce((a, d) => a + d.value, 0);
  const totalLost = deals.filter((d) => d.stage === "lost").reduce((a, d) => a + d.value, 0);
  const winRate = deals.filter((d) => ["won", "lost"].includes(d.stage)).length > 0
    ? Math.round((deals.filter((d) => d.stage === "won").length / deals.filter((d) => ["won", "lost"].includes(d.stage)).length) * 100)
    : 0;
  const avgDeal = deals.length > 0 ? Math.round(deals.reduce((a, d) => a + d.value, 0) / deals.length) : 0;

  const move = (dealId: string, dir: -1 | 1) => {
    setDeals((prev) => {
      const deal = prev.find((d) => d.id === dealId);
      if (!deal) return prev;
      const idx = stages.findIndex((s) => s.id === deal.stage);
      const nextIdx = idx + dir;
      if (nextIdx < 0 || nextIdx >= stages.length) return prev;
      const nextStage = stages[nextIdx];
      toast.message(`Moved to ${nextStage.title}`, { description: `${deal.company} · ${fmtFull(deal.value)}` });
      return prev.map((d) => d.id === dealId ? {
        ...d, stage: nextStage.id, daysInStage: 0,
        probability: nextStage.id === "won" ? 100 : nextStage.id === "lost" ? 0 : Math.min(d.probability + 10, 95),
      } : d);
    });
  };

  const addDeal = () => {
    const value = parseFloat(newValue);
    if (!newCompany.trim() || !value) { toast.error("Company and value required"); return; }
    const initials = newCompany.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const deal: Deal = {
      id: `D-${Math.floor(Math.random() * 9000) + 1000}`, company: newCompany, initials,
      color: companyColors[initials] ?? "bg-muted text-muted-foreground", value,
      owner: newOwner, ownerColor: ownerColors[newOwner], daysInStage: 0,
      probability: newStage === "won" ? 100 : newStage === "lost" ? 0 : 20, stage: newStage,
      contact: `info@${newCompany.toLowerCase().replace(/\s+/g, "")}.com`,
    };
    setDeals([deal, ...deals]);
    setNewCompany(""); setNewValue(""); setNewOwner("AM"); setNewStage("lead");
    setAddOpen(null);
    toast.success("Deal added", { description: `${deal.company} · ${fmtFull(deal.value)}` });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Pipeline"
        description="Track deals from lead to close. Drag through stages to update."
        breadcrumbs={[{ label: "Apps" }, { label: "CRM Pipeline" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button size="sm" className="h-9" onClick={() => setAddOpen("lead")}><Plus className="size-4 mr-2" /> Add deal</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Pipeline" value={fmtFull(totalPipeline)} delta={18.4} deltaLabel="vs last month" icon={<DollarSign className="size-5" />} footer={`${deals.filter((d) => !["won", "lost"].includes(d.stage)).length} active deals`} />
        <StatCard label="Won (YTD)" value={fmtFull(totalWon)} delta={24.2} deltaLabel="vs last year" icon={<Award className="size-5" />} footer={`${deals.filter((d) => d.stage === "won").length} deals closed`} />
        <StatCard label="Win Rate" value={`${winRate}%`} delta={3.4} deltaLabel="vs last quarter" icon={<Target className="size-5" />} footer={`${deals.filter((d) => d.stage === "lost").length} lost deals`} />
        <StatCard label="Avg Deal Size" value={fmtFull(avgDeal)} delta={-4.2} deltaLabel="vs last month" icon={<TrendingUp className="size-5" />} footer="Across all stages" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
        {stages.map((stage, si) => {
          const list = dealsByStage(stage.id);
          const total = valueByStage(stage.id);
          const weighted = weightedValue(stage.id);
          return (
            <div key={stage.id} className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${stage.color}`} />
                    <span className="text-xs font-semibold">{stage.title}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="size-6 text-muted-foreground" onClick={() => setAddOpen(stage.id)}><Plus className="size-3.5" /></Button>
                </div>
                <div className="space-y-0.5">
                  <p className={`text-base font-bold ${stage.accent}`}>{fmt(total)}</p>
                  <p className="text-[10px] text-muted-foreground">{list.length} deals · {fmt(weighted)} weighted</p>
                </div>
              </div>
              <ScrollArea className="flex-1 max-h-[calc(100vh-440px)]">
                <div className="p-2 space-y-2">
                  {list.map((deal) => (
                    <div key={deal.id} className="group relative rounded-lg border border-border bg-background p-2.5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="size-7 shrink-0"><AvatarFallback className={`text-[10px] font-semibold ${deal.color}`}>{deal.initials}</AvatarFallback></Avatar>
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate">{deal.company}</p>
                            <p className="text-[9px] text-muted-foreground font-mono">{deal.id}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="size-5 text-muted-foreground shrink-0" onClick={() => toast.message("Deal menu")}><MoreVertical className="size-3" /></Button>
                      </div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold">{fmt(deal.value)}</span>
                        <Badge variant="outline" className={`text-[9px] ${deal.probability >= 80 ? "bg-success/10 text-success border-success/20" : deal.probability >= 50 ? "bg-warning/10 text-warning border-warning/20" : "bg-muted text-muted-foreground"}`}>{deal.probability}%</Badge>
                      </div>
                      <Progress value={deal.probability} className="h-1" />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="size-2.5" />{deal.daysInStage}d
                        </div>
                        <Avatar className="size-5"><AvatarFallback className={`text-[8px] font-semibold ${deal.ownerColor}`}>{deal.owner}</AvatarFallback></Avatar>
                      </div>
                      {/* Move buttons */}
                      <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                        {si > 0 && <Button size="icon" variant="secondary" className="size-5 shadow-md" onClick={() => move(deal.id, -1)}><ChevronLeft className="size-3" /></Button>}
                      </div>
                      <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                        {si < stages.length - 1 && <Button size="icon" variant="secondary" className="size-5 shadow-md" onClick={() => move(deal.id, 1)}><ChevronRight className="size-3" /></Button>}
                      </div>
                    </div>
                  ))}
                  {list.length === 0 && (
                    <button onClick={() => setAddOpen(stage.id)} className="w-full p-4 rounded-lg border border-dashed border-border text-[10px] text-muted-foreground hover:bg-accent/50">
                      No deals yet. <span className="text-primary font-medium">Add one</span>
                    </button>
                  )}
                </div>
              </ScrollArea>
            </div>
          );
        })}
      </div>

      {/* Bottom: leaderboard + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Sales rep leaderboard</h3>
              <p className="text-xs text-muted-foreground">By closed-won revenue this quarter</p>
            </div>
            <Badge variant="outline" className="text-[10px]">Q3 2024</Badge>
          </div>
          <div className="divide-y divide-border">
            {Object.entries(
              deals.filter((d) => d.stage === "won").reduce((acc, d) => { acc[d.owner] = (acc[d.owner] || 0) + d.value; return acc; }, {} as Record<string, number>)
            ).sort((a, b) => b[1] - a[1]).map(([owner, total], i) => (
              <div key={owner} className="flex items-center gap-3 p-3">
                <span className={`size-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? "bg-amber-500/20 text-amber-600" : i === 1 ? "bg-slate-400/20 text-slate-500" : i === 2 ? "bg-orange-700/20 text-orange-700" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
                <Avatar className="size-8"><AvatarFallback className={`text-[10px] font-semibold ${ownerColors[owner] ?? "bg-muted text-muted-foreground"}`}>{owner}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{owner === "AM" ? "Alex Morgan" : owner === "MH" ? "Marcus Holloway" : owner === "JR" ? "Jordan Reyes" : "Priya Sharma"}</p>
                  <p className="text-[10px] text-muted-foreground">{deals.filter((d) => d.owner === owner && d.stage === "won").length} deals won</p>
                </div>
                <span className="text-sm font-bold">{fmtFull(total)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-base font-semibold">Pipeline health</h3>
            <p className="text-xs text-muted-foreground">Conversion metrics</p>
          </div>
          <div className="p-4 space-y-3">
            {stages.filter((s) => !["won", "lost"].includes(s.id)).map((s) => {
              const count = dealsByStage(s.id).length;
              const total = valueByStage(s.id);
              const maxVal = Math.max(...stages.map((x) => valueByStage(x.id)), 1);
              return (
                <div key={s.id}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="flex items-center gap-1.5"><span className={`size-1.5 rounded-full ${s.color}`} />{s.title}</span>
                    <span className="text-muted-foreground">{count} · {fmt(total)}</span>
                  </div>
                  <Progress value={(total / maxVal) * 100} className="h-1.5" />
                </div>
              );
            })}
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-muted/50">
                <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Building2 className="size-2.5" />Total deals</p>
                <p className="text-base font-bold">{deals.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/50">
                <p className="text-[10px] text-muted-foreground flex items-center gap-1"><User className="size-2.5" />Active owners</p>
                <p className="text-base font-bold">{new Set(deals.map((d) => d.owner)).size}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!addOpen} onOpenChange={(o) => setAddOpen(o ? addOpen : null)}>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle>Add new deal</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Company</Label>
              <Input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} placeholder="e.g. Acme Corp" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Deal value ($)</Label>
                <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} type="number" placeholder="0" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Owner</Label>
                <Select value={newOwner} onValueChange={setNewOwner}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">Alex Morgan</SelectItem>
                    <SelectItem value="MH">Marcus Holloway</SelectItem>
                    <SelectItem value="JR">Jordan Reyes</SelectItem>
                    <SelectItem value="PS">Priya Sharma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Stage</Label>
              <Select value={newStage} onValueChange={setNewStage}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {stages.map((s) => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(null)}>Cancel</Button>
            <Button onClick={addDeal}><Plus className="size-4 mr-2" /> Add deal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
