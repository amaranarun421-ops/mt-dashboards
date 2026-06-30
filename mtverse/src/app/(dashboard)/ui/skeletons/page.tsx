"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function SkeletonsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Skeletons"
        description="Loading placeholders for text, cards, tables, lists, profiles, charts and dashboards."
        breadcrumbs={[{ label: "UI Library" }, { label: "Skeletons" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Text Skeleton" description="Paragraph and heading loading">
          <div className="space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <div className="pt-2 space-y-2">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Card Skeleton" description="Loading card with avatar and content">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2 space-y-0">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-2.5 w-20" />
              </div>
              <Skeleton className="size-8 rounded-md" />
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-2">
              <Skeleton className="h-2.5 w-full" />
              <Skeleton className="h-2.5 w-5/6" />
              <Skeleton className="h-2.5 w-2/3" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-7 w-20 rounded-md" />
                <Skeleton className="h-7 w-20 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </SectionCard>

        <SectionCard title="Table Skeleton" description="Loading data table rows" noBodyPadding>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5"><Skeleton className="h-3 w-16" /></TableHead>
                <TableHead><Skeleton className="h-3 w-12" /></TableHead>
                <TableHead><Skeleton className="h-3 w-14" /></TableHead>
                <TableHead className="pr-5 text-right"><Skeleton className="h-3 w-12 ml-auto" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  <TableCell className="pl-5 py-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-7 rounded-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-3 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                  <TableCell className="pr-5 text-right"><Skeleton className="h-3 w-14 ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard title="List Skeleton" description="Loading list of items">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-md" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2.5 w-48" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Profile Skeleton" description="Loading profile card">
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-lg" />
            <div className="flex items-start gap-3 -mt-12">
              <Skeleton className="size-20 rounded-full ring-4 ring-background" />
              <div className="space-y-2 mt-12 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-8 w-20 rounded-md mt-12" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Chart Skeleton" description="Loading chart placeholder">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24" />
            <div className="relative h-48 flex items-end gap-2 pt-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="flex-1 rounded-t"
                  style={{ height: `${30 + Math.sin(i * 0.8) * 25 + 25}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between">
              {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
                <Skeleton key={m} className="h-2.5 w-6" />
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Stat Card Skeleton" description="Loading KPI cards">
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-2.5 w-20" />
                  <Skeleton className="h-7 w-24" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-10 rounded-full" />
                    <Skeleton className="h-2.5 w-16" />
                  </div>
                  <Skeleton className="h-8 w-full rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Feed Skeleton" description="Loading social feed">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-8 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-2.5 w-16" />
                  </div>
                </div>
                <Skeleton className="h-2.5 w-full" />
                <Skeleton className="h-2.5 w-5/6" />
                <Skeleton className="h-32 w-full rounded-lg" />
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Dashboard Skeleton" description="Loading whole dashboard grid" className="lg:col-span-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
            <Skeleton className="lg:col-span-2 h-72 rounded-lg" />
            <Skeleton className="h-72 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
        </SectionCard>

        <SectionCard title="Comment Skeleton" description="Loading comment thread">
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Avatar><Skeleton className="size-8 rounded-full" /></Avatar>
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2.5 w-full" />
                  <Skeleton className="h-2.5 w-4/5" />
                  <div className="flex gap-3 pt-1">
                    <Skeleton className="h-2.5 w-8" />
                    <Skeleton className="h-2.5 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
